import {one,run,all,now,text,token,hash,password,checkPassword,fail,settings} from './common.js';
export function status(t){if(t.status==="blokir"||t.status==="menunggu"||t.status==="seumur")return t.status;return t.sampai&&t.sampai<now()?"habis":t.status;}
export async function teacher(env,b,allowPending=false){
 const raw=b.lic?.sess;if(!raw)fail("Silakan masuk sebagai guru.",403,"lisensi");
 const t=await one(env,"SELECT t.* FROM teachers t JOIN auth_sessions s ON s.teacher_id=t.id WHERE s.hash=? AND s.expires>?",await hash(raw),now());
 if(!t)fail("Sesi berakhir. Silakan masuk kembali.",403,"lisensi");
 const st=status(t);if(st==="blokir"||(!allowPending&&["menunggu","habis"].includes(st)))fail(st==="menunggu"?"Akun menunggu aktivasi pengelola.":"Akun belum aktif.",403,st);
 return t;
}
export async function classAccess(env,b,readOnly=false){
 const c=await one(env,"SELECT * FROM classes WHERE code=?",text(b.kode,10).toUpperCase());if(!c)fail("Kelas tidak ditemukan.",404);
 if(b.lic?.pdp&&readOnly){const p=await one(env,"SELECT * FROM companions WHERE token_hash=? AND class_code=? AND revoked=0",await hash(b.lic.pdp),c.code);if(!p)fail("Akses pendamping tidak berlaku.",403,"pdp");await run(env,"UPDATE companions SET active=? WHERE id=?",now(),p.id);return {c,t:null,p};}
 const t=await teacher(env,b);if(c.teacher_id!==t.id)fail("Kelas bukan milik akun ini.",403);
 if(!await checkPassword(String(b.pin||""),c.pin))fail("PIN kelas tidak benar.",403);
 return {c,t};
}
export async function student(env,b){
 const c=await one(env,"SELECT * FROM classes WHERE code=?",text(b.kode,10).toUpperCase());if(!c)fail("Kelas tidak ditemukan.",404);
 const u=await one(env,"SELECT * FROM students WHERE class_code=? AND token_hash=?",c.code,await hash(b.token||""));if(!u)fail("Identitas murid tidak dikenali. Masuk kelas lagi.",401);
 if(u.blocked)fail("Akses kelas dinonaktifkan guru.",403,"blokir");
 const t=await one(env,"SELECT * FROM teachers WHERE id=?",c.teacher_id);if(!t||["blokir","habis"].includes(status(t)))fail("Kelas sedang tidak aktif.",403);
 return {c,u};
}
export async function summary(env,t){return {id:t.id,nama:t.nama,email:t.email,wa:t.wa,sekolah:t.sekolah,status:status(t),sampai:t.sampai,tenggang_sampai:t.sampai,maks_kelas:t.maks_kelas,maks_perangkat:10,kelas:(await one(env,"SELECT count(*) n FROM classes WHERE teacher_id=?",t.id)).n,perangkat:(await one(env,"SELECT count(*) n FROM auth_sessions WHERE teacher_id=? AND expires>?",t.id,now())).n,sandi:!!t.password,google:!!t.google_sub};}
export async function signedIn(env,t){const raw=token();await run(env,"INSERT INTO auth_sessions(hash,teacher_id,expires,created) VALUES(?,?,?,?)",await hash(raw),t.id,now()+30*86400000,now());await run(env,"DELETE FROM auth_sessions WHERE expires<? OR (teacher_id=? AND hash NOT IN (SELECT hash FROM auth_sessions WHERE teacher_id=? ORDER BY created DESC LIMIT 10))",now(),t.id,t.id);return {guru:await summary(env,t),sess:raw,setelan:settings(env)};}
let jwks;
export async function google(env,credential){
 if(!env.GOOGLE_CLIENT_ID)fail("Login Google belum diatur. Gunakan email dan kata sandi.",400);
 try{
  const [h,p,s]=String(credential||"").split('.');const decode=x=>Uint8Array.from(atob(x.replace(/-/g,'+').replace(/_/g,'/')),c=>c.charCodeAt(0));
  const header=JSON.parse(new TextDecoder().decode(decode(h))),claims=JSON.parse(new TextDecoder().decode(decode(p)));
  if(header.alg!=="RS256"||claims.aud!==env.GOOGLE_CLIENT_ID||!['accounts.google.com','https://accounts.google.com'].includes(claims.iss)||!claims.email_verified||!Number.isFinite(claims.exp)||!Number.isFinite(claims.iat)||!claims.sub||claims.exp*1000<now()||claims.iat*1000>now()+60000)throw new Error();
  if(!jwks||jwks.expires<now()||!jwks.keys.some(k=>k.kid===header.kid)){const res=await fetch('https://www.googleapis.com/oauth2/v3/certs');if(!res.ok)throw new Error();const maxAge=Number(res.headers.get('Cache-Control')?.match(/max-age=(\d+)/)?.[1])||300;jwks={keys:(await res.json()).keys,expires:now()+Math.min(maxAge,21600)*1000};}
  const jwk=jwks.keys.find(k=>k.kid===header.kid);if(!jwk)throw new Error();
  const key=await crypto.subtle.importKey('jwk',jwk,{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['verify']);
  if(!await crypto.subtle.verify('RSASSA-PKCS1-v1_5',key,decode(s),new TextEncoder().encode(h+'.'+p)))throw new Error();
  return {sub:String(claims.sub),email:text(claims.email,254).toLowerCase(),nama:text(claims.name,60)};
 }catch{fail("Identitas Google tidak valid atau sudah kedaluwarsa.",401);}
}
