export const json = (data, status=200) => new Response(JSON.stringify(data), {status, headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}});
export function fail(message, status=400, kode="") { const e=new Error(message); e.status=status; e.kode=kode; throw e; }
export const text = (v, n=200) => String(v??"").trim().slice(0,n);
export const parse = (v, fallback={}) => {try{return JSON.parse(v)}catch{return fallback}};
export const num = (v, min=0, max=1e12) => Math.max(min,Math.min(max,Number(v)||0));
export const now = () => Date.now();
export const one = (env, sql, ...args) => env.DB.prepare(sql).bind(...args).first();
export const all = async (env, sql, ...args) => (await env.DB.prepare(sql).bind(...args).all()).results;
export const run = (env, sql, ...args) => env.DB.prepare(sql).bind(...args).run();
export function token(bytes=32){const a=crypto.getRandomValues(new Uint8Array(bytes));return [...a].map(x=>x.toString(16).padStart(2,"0")).join("");}
export function code(n=6){const abc="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",b=crypto.getRandomValues(new Uint8Array(n));return [...b].map(x=>abc[x%abc.length]).join("");}
export async function hash(s){return [...new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(String(s))))].map(x=>x.toString(16).padStart(2,"0")).join("");}
export async function password(p, salt=token(16)){
 const k=await crypto.subtle.importKey("raw",new TextEncoder().encode(p),"PBKDF2",false,["deriveBits"]);
 const bits=await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt:new TextEncoder().encode(salt),iterations:100000},k,256);
 return salt+":"+[...new Uint8Array(bits)].map(x=>x.toString(16).padStart(2,"0")).join("");
}
export function equal(a,b){a=String(a||"");b=String(b||"");let d=a.length^b.length;for(let i=0;i<Math.max(a.length,b.length);i++)d|=(a.charCodeAt(i)||0)^(b.charCodeAt(i)||0);return d===0;}
export async function checkPassword(p, stored){if(!stored)return false;return equal(await password(p,stored.split(":")[0]),stored);}
export async function audit(env, actor, action, target){await run(env,"INSERT INTO audit(actor,action,target,t) VALUES(?,?,?,?)",String(actor),action,String(target),now());}
export async function limited(env, req, action, limit=30){
 const key=await hash((req.headers.get("CF-Connecting-IP")||"local")+":"+action),window=Math.floor(now()/60000);
 const r=await one(env,"INSERT INTO limits(key,window,count) VALUES(?,?,1) ON CONFLICT(key) DO UPDATE SET count=CASE WHEN window=excluded.window THEN count+1 ELSE 1 END,window=excluded.window RETURNING count",key,window);
 if(r.count>limit)fail("Terlalu banyak percobaan. Tunggu satu menit.",429);
}
export function settings(env){return {sandi:true,google:env.GOOGLE_CLIENT_ID||"",wa:env.ADMIN_WA||"",beli:env.BILLING_URL||"",harga:"",info:"Server mandiri. Aktivasi akun dilakukan oleh pengelola.",mandiri:true};}
export async function readBody(req){
 if(!req.body)return {};
 const reader=req.body.getReader();let size=0;const parts=[];
 for(;;){const {value,done}=await reader.read();if(done)break;size+=value.length;if(size>2097152){await reader.cancel();fail("Data maksimal 2 MB.",413)}parts.push(value);}
 const out=new Uint8Array(size);let offset=0;for(const p of parts){out.set(p,offset);offset+=p.length;}
 try{const j=JSON.parse(new TextDecoder().decode(out));if(!j||Array.isArray(j)||typeof j!=="object")fail("Data JSON harus berupa objek.");return j;}catch(e){if(e.status)throw e;fail("JSON tidak valid.");}
}
export function validatePack(p){
 if(!p||!Array.isArray(p.mapel)||!p.mapel.length||p.mapel.length>12)fail("Paket harus berisi 1–12 mapel.");
 const out=structuredClone(p);out.judul=text(out.judul||"Paket Soal",120);let n=0;const ids=new Set();
 for(let i=0;i<out.mapel.length;i++){
  const m=out.mapel[i];m.id=text(m.id||"mapel_"+(i+1),60);if(!/^[A-Za-z0-9_:.-]+$/.test(m.id))fail("ID mapel hanya boleh huruf, angka, titik, garis atau titik dua.");if(ids.has(m.id))fail("ID mapel harus unik.");ids.add(m.id);m.nama=text(m.nama||"Mapel "+(i+1),80);
  if(m.warna&&!/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(m.warna))fail("Warna mapel harus berupa kode hex, misalnya #ef4444.");
  for(const a of m.materi||[])if(a.url&&!safeURL(a.url))fail("Alamat materi harus menggunakan HTTP/HTTPS atau path lokal.");
  if(!Array.isArray(m.soal)||!m.soal.length)fail("Setiap mapel harus memiliki soal.");n+=m.soal.length;
  for(const s of m.soal){if(!s||!text(s.q,5000))fail("Pertanyaan tidak boleh kosong.");if(s.gambar&&!safeURL(s.gambar,true))fail("Alamat gambar tidak valid.");if(!s.tipe||s.tipe==="pg"||s.tipe==="bs"){if(!Array.isArray(s.opsi)||s.opsi.length<2||s.opsi.length>8||!s.opsi.every(v=>typeof v==='string')||!Number.isInteger(s.jawab)||s.jawab<0||s.jawab>=s.opsi.length)fail("Pilihan atau kunci jawaban tidak valid.");}else if(!["isian","jodoh","urut"].includes(s.tipe))fail("Jenis soal tidak dikenal.");}
 }
 if(n>1200)fail("Maksimal 1200 soal per paket.");return out;
}
function safeURL(value,image=false){const s=String(value).trim();return /^https?:\/\//i.test(s)||/^\.?\.?\//.test(s)||(image&&/^data:image\/(png|jpeg|webp|gif);base64,/i.test(s));}
export function packInfo(pk){return {jenjang:pk.jenjang||"",mapel:pk.mapel.length,soal:pk.mapel.reduce((n,m)=>n+m.soal.length,0),nama:pk.mapel.map(m=>m.nama)};}
export function studentPack(pk){const p=structuredClone(pk);p.mapel=p.mapel.filter(m=>!m.rahasia);if(!p.mapel.length)p.mapel=[{id:"_latihan",nama:"Latihan",warna:"#64748b",soal:[{q:"Tunggu tantangan dari guru.",opsi:["Siap!","Oke"],jawab:0}]}];return p;}
export function publicClass(c){return {kode:c.code,nama:c.name,guru:c.guru,paket_kode:c.pack_code,diubah:c.updated,kunci:!!c.locked,rekap:parse(c.rekap)};}
export function skey(s){const t=String(s.q)+"|"+(s.opsi?s.opsi.join("|"):JSON.stringify(s.pasangan||s.urutan||s.kunci||""));let h=5381;for(let i=0;i<t.length;i++)h=((h<<5)+h+t.charCodeAt(i))|0;return(h>>>0).toString(36);}
const norm = v => String(v??"").toLowerCase().replace(/\s+/g," ").trim().replace(/[.!?;:]+$/,"").trim().replace(/(\d),(\d)/g,"$1.$2");
export function credit(s,r,partial=true){
 if(r==null||r===-1)return 0;
 if(!s.tipe||s.tipe==="pg"||s.tipe==="bs")return Number.isInteger(r)&&r===s.jawab?1:0;
 if(s.tipe==="isian")return String(s.kunci||"").split("|").map(norm).includes(norm(r))?1:0;
 let count=0,n=0;
 if(s.tipe==="jodoh"&&Array.isArray(r)){n=(s.pasangan||[]).length;count=(s.pasangan||[]).filter((p,i)=>r[i]!=null&&norm(r[i])===norm(p[1])).length;}
 if(s.tipe==="urut"&&Array.isArray(r)){n=(s.urutan||[]).length;const seen=new Set();count=(s.urutan||[]).filter((p,i)=>Number.isInteger(r[i])&&r[i]>=0&&r[i]<n&&!seen.has(r[i])&&(seen.add(r[i]),norm(s.urutan[r[i]])===norm(p))).length;}
 return n?(count===n?1:partial?count/n:0):0;
}
