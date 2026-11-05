import {all,one,run,parse,text,num,fail,now,packInfo,skey,credit,publicClass} from './common.js';
export async function ownPack(env,t,kode){const p=await one(env,"SELECT * FROM packs WHERE code=?",text(kode,10).toUpperCase());if(!p)fail("Paket tidak ditemukan.",404);if(p.teacher_id!==t.id)fail("Paket bukan milik akun ini.",403);return p;}
export async function packList(env,t){
 const rows=await all(env,"SELECT * FROM packs WHERE teacher_id=? ORDER BY updated DESC",t.id),classes=await all(env,"SELECT code,name,pack_code FROM classes WHERE teacher_id=?",t.id);
 const records=await all(env,"SELECT r.student_id,r.data FROM records r JOIN classes c ON c.code=r.class_code WHERE c.teacher_id=?",t.id);
 return rows.map(p=>{const pk=parse(p.data),rs=records.filter(r=>parse(r.data).sesi?.pk===p.code);return {kode:p.code,judul:pk.judul,info:packInfo(pk),diubah:p.updated,publik:!!p.public,bank:!!p.bank,bank_pakai:p.uses,dibuka:p.views,kelas:classes.filter(c=>c.pack_code===p.code).map(c=>({kode:c.code,nama:c.name})),murid:new Set(rs.map(r=>r.student_id)).size,sesi:rs.length};});
}
export function graded(pk,payload,challenge=null){
 const output={jawaban:[],materi:[]};const lookup=new Map();
 for(const m of pk.mapel)for(const s of m.soal)lookup.set(m.id+'|'+skey(s),s);
 const seen=new Set(),B={pg:1,bs:1,isian:1,jodoh:1,urut:1,sebagian:1,...(challenge?.bobot||{})};let score=0,max=0,correct=0,known=0;
 const logs=Array.isArray(payload.jawaban)?payload.jawaban:[];if(logs.length>1200)fail("Terlalu banyak jawaban.");
 for(const j of logs){
  const key=text(j.m,60)+'|'+text(j.s,100);if(payload.sesi&&seen.has(key))continue;seen.add(key);
  const s=lookup.get(key);const raw=s&&(!s.tipe||s.tipe==='pg'||s.tipe==='bs')?j.p:j.j?.r;
  const c=s?credit(s,raw,!!B.sebagian):num(j.ok,0,1),w=s?num(s.skor||B[s.tipe||'pg'],0,100):1;
  const out={m:text(j.m,60),s:text(j.s,100),q:text(s?.q||j.q,300),p:Number.isInteger(j.p)?j.p:-1,k:s?num(s.jawab,0,7):num(j.k,0,7),ok:c===1?1:0,d:num(j.d,0,86400),t:num(j.t,0,now()+60000)};
  if(j.j&&typeof j.j==='object')out.j={r:j.j.r,c};
  output.jawaban.push(out);if(s)known++;score+=w*c;max+=w;correct+=out.ok;
 }
 if(payload.sesi){const a=payload.sesi,generated=/^_(petualangan|dtk:|psr:)/.test(String(a.mapel));
  if(!generated&&(!logs.length||known!==output.jawaban.length))fail("Jawaban tidak cocok dengan versi soal. Hubungi guru.",409);
  const total=Math.max(num(a.total,1,1200),output.jawaban.length);output.sesi={...a,mapel:text(a.mapel,60),nama:text(a.nama,100),benar:generated?num(a.benar,0,total):correct,total,nilai:generated?num(a.nilai,0,100):num(Math.round((challenge&&max?score/max:correct/total)*100),0,100),durasi:num(a.durasi,0,86400),t:num(a.t,0,now()+60000),dunia:text(a.dunia,30),tantangan:challenge?.id||null,round:challenge?.round||0,skor:generated?null:score,maks:generated?null:(challenge?max:total),lari:num(a.lari,0,100000),clientReported:generated};
 }
 if(Array.isArray(payload.materi))output.materi=payload.materi.slice(0,300).map(m=>({mapel:text(m.mapel,60),idx:num(m.idx,0,1000),t:num(m.t,0,now()+60000)}));
 return output;
}
export function rowsOf(records){
 const sesi=[],jawaban=[],materi=[];
 for(const row of records){const d=parse(row.data),s=d.sesi,uid=row.student_id,sid=s?row.id:0;
  if(s){sesi.push([row.id,uid,s.mapel,s.nama,s.benar,s.total,s.nilai,s.durasi,s.t,s.dunia,s.tantangan||0,s.telat||0,s.pk||'',s.pv||0,s.skor??null,s.maks??null,s.lari||0]);
   if(s.mapel==='_gabung'){const groups={};for(const j of d.jawaban||[]){const g=groups[j.m]||(groups[j.m]={n:0,ok:0});g.n++;g.ok+=j.ok;}for(const [m,g] of Object.entries(groups))sesi.push([row.id+':'+m,uid,m,m,g.ok,g.n,Math.round(g.ok/g.n*100),s.durasi,s.t,s.dunia,0,s.telat||0,s.pk||'',s.pv||0,g.ok,g.n,0]);}
  }
  for(const j of d.jawaban||[])jawaban.push([uid,j.m,j.s,j.q,j.p,j.k,j.ok,j.d,j.t,sid,j.j?JSON.stringify(j.j):null]);
  for(const m of d.materi||[])materi.push([uid,m.mapel,m.idx,m.t]);
 }
 return {sesi,jawaban,materi};
}
export async function dashboard(env,c){
 const records=await all(env,"SELECT * FROM records WHERE class_code=? ORDER BY created,id",c.code);
 const students=await all(env,"SELECT id,name,absen,active,blocked FROM students WHERE class_code=? ORDER BY absen",c.code);
 const challenges=await all(env,"SELECT id,data,main_code FROM challenges WHERE class_code=? ORDER BY id DESC",c.code);
 const starts=await all(env,"SELECT s.challenge_id,s.student_id,s.started FROM starts s JOIN challenges t ON t.id=s.challenge_id WHERE t.class_code=?",c.code);
 const comps=await all(env,"SELECT id,name,invite_code,active,used FROM companions WHERE class_code=? AND revoked=0",c.code);
 const packs=await all(env,"SELECT code,data FROM packs WHERE teacher_id=?",c.teacher_id);
 return {kelas:publicClass(c),paket:parse(c.pack),murid:students.map(u=>({id:u.id,nama:u.name,absen:u.absen,aktif:u.active,blokir:!!u.blocked})),...rowsOf(records),tantangan:challenges.map(t=>({...parse(t.data),id:t.id,kode_main:t.main_code})),tmulai:starts.map(s=>[s.challenge_id,s.student_id,s.started]),pendamping:comps.map(p=>({id:p.id,nama:p.name,kode:p.invite_code,aktif:p.active,dipakai:!!p.used})),pnama:Object.fromEntries(packs.map(p=>[p.code,parse(p.data).judul])),now:now()};
}
export async function notify(env,code,event){if(!env.ROOMS)return;try{const id=env.ROOMS.idFromName(code);await env.ROOMS.get(id).fetch(new Request('https://internal/event',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(event)}));}catch{/* Clients also refresh using the REST endpoints. */}}
