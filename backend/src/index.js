import {json,fail,text,parse,num,now,one,all,run,token,code,hash,password,checkPassword,equal,audit,limited,settings,readBody,validatePack,packInfo,studentPack,publicClass} from './common.js';
import {teacher,classAccess,student,summary,signedIn,google} from './auth.js';
import {ownPack,packList,graded,rowsOf,dashboard,notify} from './data.js';
export {ClassRoom} from './room.js';

const routes=new Map();
const on=(path,fn)=>routes.set(path,fn);
async function challenge(env,c,id){const row=await one(env,"SELECT * FROM challenges WHERE id=? AND class_code=?",Number(id)||0,c.code);if(!row)fail("Tantangan tidak ditemukan.",404);return {...row,t:{...parse(row.data),id:row.id,kode_main:row.main_code}};}
async function storeChallenge(env,row,t){await run(env,"UPDATE challenges SET data=? WHERE id=?",JSON.stringify(t),row.id);}
async function admin(env,req){const value=req.headers.get('Authorization')?.replace(/^Bearer /i,'')||'';if(!env.ADMIN_TOKEN||env.ADMIN_TOKEN.length<32||!equal(await hash(value),await hash(env.ADMIN_TOKEN)))fail("Kunci admin tidak valid.",403);}
async function unique(env,table,column,n=6,digits=false){for(let i=0;i<12;i++){const v=digits?String(crypto.getRandomValues(new Uint32Array(1))[0]%900000+100000):code(n);if(!await one(env,`SELECT 1 FROM ${table} WHERE ${column}=?`,v))return v;}fail("Gagal membuat kode. Coba lagi.",503);}
on('/akun/daftar',async(env,b,req)=>{
 await limited(env,req,'signup',10);if(b.lama)fail("Akun situs asal tidak dapat dipindahkan otomatis. Buat akun baru di server ini.");
 const g=b.cara==='google'?await google(env,b.cred):null,email=g?.email||text(b.email,254).toLowerCase(),nama=text(b.nama||g?.nama,60),wa=text(b.wa,20);
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||nama.length<2)fail("Isi email dan nama yang benar.");
 if(!g&&(typeof b.sandi!=='string'||b.sandi.length<8||b.sandi.length>200))fail("Kata sandi harus 8–200 karakter.");
 if(await one(env,'SELECT 1 FROM teachers WHERE email=?',email))fail("Email sudah terdaftar. Silakan masuk.",409);
 const st=env.AUTO_APPROVE==='true'?'seumur':'menunggu';
 const r=await run(env,'INSERT INTO teachers(email,nama,wa,sekolah,password,google_sub,status,created) VALUES(?,?,?,?,?,?,?,?)',email,nama,wa,text(b.sekolah,80),g?null:await password(b.sandi),g?.sub||null,st,now());
 return signedIn(env,await one(env,'SELECT * FROM teachers WHERE id=?',r.meta.last_row_id));
});
on('/akun/masuk',async(env,b,req)=>{
 await limited(env,req,'login',20);const t=await one(env,'SELECT * FROM teachers WHERE email=?',text(b.email,254).toLowerCase());
 const ok=await checkPassword(String(b.sandi||'').slice(0,200),t?.password||'0000000000000000:invalid');
 if(!t||!ok)fail("Email atau kata sandi salah.",401);if(t.status==='blokir')fail("Akun dinonaktifkan pengelola.",403,'blokir');return signedIn(env,t);
});
on('/akun/google',async(env,b,req)=>{await limited(env,req,'google',20);const g=await google(env,b.cred);let t=await one(env,'SELECT * FROM teachers WHERE google_sub=? OR email=?',g.sub,g.email);if(!t)return {perlu:true,email:g.email,nama:g.nama};if(t.google_sub!==g.sub)fail("Email sudah memiliki akun kata sandi. Gunakan metode masuk semula; akun tidak ditautkan otomatis.",409);if(t.status==='blokir')fail("Akun dinonaktifkan.",403);return signedIn(env,t);});
on('/akun/saya',async(env,b)=>{const t=await teacher(env,b,true);return {guru:await summary(env,t),setelan:settings(env),bayar:await all(env,'SELECT t,nominal,ket FROM payments WHERE teacher_id=? ORDER BY t DESC',t.id)};});
on('/akun/keluar',async(env,b)=>{if(b.lic?.sess)await run(env,'DELETE FROM auth_sessions WHERE hash=?',await hash(b.lic.sess));return {ok:true};});
on('/akun/ubah',async(env,b)=>{const t=await teacher(env,b,true);if(text(b.nama,60).length<2)fail("Nama minimal dua karakter.");await run(env,'UPDATE teachers SET nama=?,wa=?,sekolah=? WHERE id=?',text(b.nama,60),text(b.wa,20),text(b.sekolah,80),t.id);return {ok:true};});
on('/akun/sandi',async(env,b)=>{const t=await teacher(env,b,true);if(t.password&&!await checkPassword(String(b.lama||''),t.password))fail("Kata sandi lama tidak sesuai.",403);if(typeof b.baru!=='string'||b.baru.length<8||b.baru.length>200)fail("Kata sandi minimal 8 karakter.");await env.DB.batch([env.DB.prepare('UPDATE teachers SET password=? WHERE id=?').bind(await password(b.baru),t.id),env.DB.prepare('DELETE FROM auth_sessions WHERE teacher_id=? AND hash<>?').bind(t.id,await hash(b.lic.sess))]);return {ok:true};});
on('/guru/kelas',async(env,b)=>{const t=await teacher(env,b);return {kelas:(await all(env,'SELECT * FROM classes WHERE teacher_id=?',t.id)).map(publicClass),maks_kelas:t.maks_kelas};});
on('/guru/soal/ambil',async(env,b)=>{const t=await teacher(env,b);return {paket:parse(t.draft,null),diubah:t.draft_at,pk:t.draft_pk,pjudul:parse(t.draft).judul||''};});
on('/guru/soal/simpan',async(env,b)=>{const t=await teacher(env,b),pk=validatePack(b.paket),at=now();await run(env,'UPDATE teachers SET draft=?,draft_pk=?,draft_at=? WHERE id=?',JSON.stringify(pk),text(b.pk,10),at,t.id);return {ok:true,diubah:at};});
on('/paket/daftar',async(env,b)=>({paket:await packList(env,await teacher(env,b))}));
on('/paket/simpan',async(env,b)=>{
 const t=await teacher(env,b),pk=validatePack(b.paket);let kd=text(b.kode,10).toUpperCase();
 if(kd){await ownPack(env,t,kd);await run(env,'UPDATE packs SET data=?,updated=? WHERE code=?',JSON.stringify(pk),now(),kd);}
 else{if((await one(env,'SELECT count(*) n FROM packs WHERE teacher_id=?',t.id)).n>=100)fail("Batas 100 paket tercapai.");kd=await unique(env,'packs','code');await run(env,'INSERT INTO packs(code,teacher_id,data,updated) VALUES(?,?,?,?)',kd,t.id,JSON.stringify(pk),now());}
 return {kode:kd,ok:true};
});
on('/paket/ambil',async(env,b)=>{const p=await ownPack(env,await teacher(env,b),b.kode);return {paket:parse(p.data),judul:parse(p.data).judul,kode:p.code};});
on('/paket/publik',async(env,b)=>{const p=await ownPack(env,await teacher(env,b),b.kode);await run(env,'UPDATE packs SET public=? WHERE code=?',b.publik?1:0,p.code);return {ok:true};});
on('/paket/hapus',async(env,b)=>{const t=await teacher(env,b),p=await ownPack(env,t,b.kode);await run(env,'DELETE FROM packs WHERE code=?',p.code);await audit(env,t.id,'paket.hapus',p.code);return {ok:true};});
on('/paket/hasil',async(env,b)=>{
 const t=await teacher(env,b),p=await ownPack(env,t,b.kode),pk=parse(p.data),records=await all(env,'SELECT r.*,c.name class_name,u.name student_name,u.absen FROM records r JOIN classes c ON c.code=r.class_code JOIN students u ON u.id=r.student_id WHERE c.teacher_id=? ORDER BY r.created DESC',t.id);
 const sesi=[],questions={};for(const r of records){const d=parse(r.data),s=d.sesi;if(!s||s.pk!==p.code)continue;sesi.push({kelas:r.class_code,kelas_nama:r.class_name,murid:r.student_id,nama:r.student_name,absen:r.absen,nilai:s.nilai,t:s.t,lama:!!(s.pv&&s.pv<p.updated)});for(const j of d.jawaban||[]){const q=questions[j.m+'|'+j.s]||(questions[j.m+'|'+j.s]={q:j.q,n:0,b:0});q.n++;q.b+=j.ok;}}
 return {judul:pk.judul,info:packInfo(pk),sesi,soal:Object.values(questions)};
});
on('/bank/cari',async(env,b)=>{const t=await teacher(env,b),rows=await all(env,'SELECT p.*,t.nama guru FROM packs p JOIN teachers t ON t.id=p.teacher_id WHERE p.bank=1 ORDER BY p.updated DESC LIMIT 500');let list=rows.filter(p=>{const d=parse(p.data);return (!b.q||JSON.stringify(d).toLowerCase().includes(text(b.q,100).toLowerCase()))&&(!b.jenjang||String(d.jenjang||'').toLowerCase().includes(text(b.jenjang,10).toLowerCase()));});if(b.urut==='populer')list.sort((a,b)=>b.uses-a.uses);return {paket:list.map(p=>({kode:p.code,judul:parse(p.data).judul,info:packInfo(parse(p.data)),guru:p.guru,pakai:p.uses,milik:p.teacher_id===t.id}))};});
on('/bank/ambil',async(env,b)=>{await teacher(env,b);const p=await one(env,'SELECT * FROM packs WHERE code=? AND bank=1',text(b.kode,10));if(!p)fail("Paket bank tidak ditemukan.",404);if(b.pakai)await run(env,'UPDATE packs SET uses=uses+1 WHERE code=?',p.code);return {paket:parse(p.data),judul:parse(p.data).judul};});
on('/bank/terbit',async(env,b)=>{const p=await ownPack(env,await teacher(env,b),b.kode);await run(env,'UPDATE packs SET bank=? WHERE code=?',b.bank?1:0,p.code);return {ok:true};});
on('/kelas/buat',async(env,b)=>{
 const t=await teacher(env,b);if(!/^\d{6}$/.test(String(b.pin)))fail("PIN harus enam angka.");if(!text(b.nama,40))fail("Isi nama kelas.");
 if((await one(env,'SELECT count(*) n FROM classes WHERE teacher_id=?',t.id)).n>=t.maks_kelas)fail("Batas jumlah kelas tercapai.",403);
 let pk;if(b.paket_kode)pk=parse((await ownPack(env,t,b.paket_kode)).data);else pk=validatePack(b.paket);
 const kd=await unique(env,'classes','code'),at=now(),data=JSON.stringify(pk);
 await env.DB.batch([env.DB.prepare('INSERT INTO classes(code,teacher_id,name,guru,pin,pack_code,pack,updated) VALUES(?,?,?,?,?,?,?,?)').bind(kd,t.id,text(b.nama,40),text(b.guru||t.nama,80),await password(String(b.pin)),text(b.paket_kode,10),data,at),env.DB.prepare('INSERT INTO pack_versions(class_code,version,data) VALUES(?,?,?)').bind(kd,at,data)]);
 return {kode:kd};
});
on('/kelas/paket',async(env,b)=>{const {c,t}=await classAccess(env,b);let p=b.paket?validatePack(b.paket):null;if(b.paket_kode){const pp=await ownPack(env,t,b.paket_kode);if(!p)p=parse(pp.data);}if(!p)fail("Paket soal diperlukan.");const at=Math.max(now(),c.updated+1),data=JSON.stringify(p);await env.DB.batch([env.DB.prepare('UPDATE classes SET pack=?,pack_code=?,updated=? WHERE code=?').bind(data,text(b.paket_kode,10),at,c.code),env.DB.prepare('INSERT INTO pack_versions(class_code,version,data) VALUES(?,?,?)').bind(c.code,at,data)]);return {ok:true,diubah:at};});
on('/kelas/paket/ambil',async(env,b)=>{const {c}=await classAccess(env,b);return {...publicClass(c),paket:parse(c.pack)};});
on('/kelas/ubah',async(env,b)=>{const {c}=await classAccess(env,b);if(!text(b.nama,40))fail("Isi nama kelas.");await run(env,'UPDATE classes SET name=? WHERE code=?',text(b.nama,40),c.code);return {ok:true};});
on('/kelas/kunci',async(env,b)=>{const {c}=await classAccess(env,b);await run(env,'UPDATE classes SET locked=? WHERE code=?',b.on?1:0,c.code);return {ok:true};});
on('/kelas/rekap',async(env,b)=>{const {c}=await classAccess(env,b);if(!b.rekap||JSON.stringify(b.rekap).length>30000)fail("Pengaturan rekap tidak valid.");await run(env,'UPDATE classes SET rekap=? WHERE code=?',JSON.stringify(b.rekap),c.code);return {rekap:b.rekap};});
on('/dashboard',async(env,b)=>{const {c}=await classAccess(env,b,true);return dashboard(env,c);});
on('/murid/masuk',async(env,b,req)=>{
 await limited(env,req,'join',60);const c=await one(env,'SELECT * FROM classes WHERE code=?',text(b.kode,10).toUpperCase());if(!c)fail("Kelas tidak ditemukan.",404);
 if(!text(b.nama,60)||!Number.isInteger(b.absen)||b.absen<1||b.absen>1000)fail("Isi nama dan nomor absen 1–1000.");
 let u=await one(env,'SELECT * FROM students WHERE class_code=? AND absen=?',c.code,b.absen),raw=String(b.token||'');
 if(u){if(u.blocked)fail("Murid dinonaktifkan oleh guru.",403,'blokir');if(!raw||!equal(await hash(raw),u.token_hash))fail("Absen ini sudah terdaftar di perangkat lain. Minta guru menghapus/memulihkan pendaftaran sebelum pindah perangkat.",409);}
 else{if(c.locked)fail("Kelas dikunci guru. Minta guru membuka pendaftaran.",403);raw=token();await run(env,'INSERT INTO students(class_code,name,absen,token_hash,active) VALUES(?,?,?,?,?)',c.code,text(b.nama,60),b.absen,await hash(raw),now());u=await one(env,'SELECT * FROM students WHERE class_code=? AND absen=?',c.code,b.absen);}
 await run(env,'UPDATE students SET active=? WHERE id=?',now(),u.id);return {kelas:publicClass(c),token:raw,nama:u.name,absen:u.absen,paket:studentPack(parse(c.pack)),paket_kode:c.pack_code,diubah:c.updated};
});
on('/murid/blokir',async(env,b)=>{const {c,t}=await classAccess(env,b);await run(env,'UPDATE students SET blocked=? WHERE id=? AND class_code=?',b.on?1:0,Number(b.id),c.code);await audit(env,t.id,'murid.blokir',b.id);if(b.on)await notify(env,c.code,{t:'kick',id:Number(b.id)});return {ok:true};});
on('/murid/hapus',async(env,b)=>{const {c,t}=await classAccess(env,b),ids=(Array.isArray(b.ids)?b.ids:[b.id]).map(Number).filter(n=>n>0).slice(0,300);if(!ids.length)fail("Pilih murid.");await env.DB.batch(ids.map(id=>env.DB.prepare('DELETE FROM students WHERE id=? AND class_code=?').bind(id,c.code)));for(const id of ids)await notify(env,c.code,{t:'kick',id});await audit(env,t.id,'murid.hapus',ids.join(','));return {ok:true};});
on('/catat',async(env,b)=>{
 const {c,u}=await student(env,b);if(!text(b.cid,100))fail("ID pengiriman diperlukan.");let pk=parse(c.pack),ch=null;
 if(b.sesi?.tantangan){const row=await challenge(env,c,b.sesi.tantangan);ch=row.t;pk=parse(row.pack);if(!await one(env,'SELECT 1 FROM starts WHERE challenge_id=? AND student_id=?',ch.id,u.id))fail("Mulai tantangan sebelum mengirim jawaban.",403);}
 else if(b.sesi?.pv&&Number(b.sesi.pv)!==c.updated){const version=await one(env,'SELECT data FROM pack_versions WHERE class_code=? AND version=?',c.code,Number(b.sesi.pv));if(!version)fail("Versi soal tidak tersedia.",409);pk=parse(version.data);}
 const d=graded(pk,b,ch);if(d.sesi){d.sesi.pk=text(b.sesi.pk||c.pack_code,10);d.sesi.pv=Number(b.sesi.pv)||c.updated;if(ch)d.sesi.telat=now()>Math.min(ch.selesai,(ch.go||now())+ch.menit*60000)+120000?1:0;}
 const cid=ch?.sekali?'challenge-'+ch.id+'-'+(ch.round||0):text(b.cid,100);
 const inserted=await run(env,'INSERT INTO records(class_code,student_id,cid,data,created) VALUES(?,?,?,?,?) ON CONFLICT(student_id,cid) DO NOTHING',c.code,u.id,cid,JSON.stringify(d),now());await run(env,'UPDATE students SET active=? WHERE id=?',now(),u.id);
 const stored=inserted.meta.changes?d:parse((await one(env,'SELECT data FROM records WHERE student_id=? AND cid=?',u.id,cid)).data);
 if(inserted.meta.changes&&stored.sesi)await notify(env,c.code,{t:'ev',id:u.id,nama:u.name,k:ch?'tantangan':'kuis',m:stored.sesi.nama,n:stored.sesi.nilai,at:now()});
 return {ok:true,nilai:stored.sesi?.nilai,duplikat:!inserted.meta.changes};
});
on('/murid/riwayat',async(env,b)=>{const {u}=await student(env,b),rs=await all(env,'SELECT data FROM records WHERE student_id=? ORDER BY created DESC LIMIT 150',u.id);return {riwayat:rs.map(r=>parse(r.data).sesi).filter(Boolean).map(s=>({t:s.t,m:s.nama,n:s.nilai,b:s.benar,tot:s.total,k:s.tantangan?'tantangan':'kuis',j:s.nama,pk:s.pk}))};});
on('/tantangan/simpan',async(env,b)=>{
 const {c}=await classAccess(env,b),v=b.t;if(!v||!text(v.judul,100)||!(Number(v.selesai)>Number(v.mulai))||!Number.isFinite(v.mulai)||!Number.isFinite(v.selesai))fail("Isi judul dan rentang waktu yang benar.");
 const t={...v,judul:text(v.judul,100),menit:num(v.menit,1,180),jumlah:num(v.jumlah,1,100),aktif:v.aktif===undefined?true:!!v.aktif};
 if(v.id){const old=await challenge(env,c,v.id);Object.assign(t,{go:old.t.go||0,akhir:old.t.akhir||0,round:old.t.round||0});await run(env,'UPDATE challenges SET data=?,pack=? WHERE id=?',JSON.stringify(t),c.pack,old.id);return {id:old.id,kode_main:old.main_code};}
 const kd=await unique(env,'challenges','main_code',6,true),r=await run(env,'INSERT INTO challenges(class_code,data,pack,main_code) VALUES(?,?,?,?)',c.code,JSON.stringify(t),c.pack,kd);return {id:r.meta.last_row_id,kode_main:kd};
});
on('/tantangan/daftar',async(env,b)=>{const {c,u}=await student(env,b),rs=await all(env,'SELECT * FROM challenges WHERE class_code=? ORDER BY id DESC',c.code),records=await all(env,'SELECT data FROM records WHERE student_id=? ORDER BY created DESC',u.id);const list=[];for(const row of rs){const t={...parse(row.data),id:row.id,kode_main:row.main_code};if(!t.aktif)continue;const st=await one(env,'SELECT started FROM starts WHERE challenge_id=? AND student_id=?',t.id,u.id);const ss=records.map(r=>parse(r.data).sesi).find(s=>s?.tantangan===t.id&&(s.round||0)===(t.round||0));if(ss)t.sudah={nilai:t.hasil?ss.nilai:null,benar:ss.benar,total:ss.total};if(st)t.dimulai=st.started;list.push(t);}return {now:now(),tantangan:list};});
on('/tantangan/mulai',async(env,b)=>{
 const {c,u}=await student(env,b),row=await challenge(env,c,b.id),t=row.t,at=now();
 if(!t.aktif||t.akhir||at>t.selesai||at<t.mulai)fail("Tantangan belum dibuka atau sudah ditutup.",403);
 if(t.serentak&&!t.go)return {tunggu:true,now:at};
 let start=await one(env,'SELECT * FROM starts WHERE challenge_id=? AND student_id=?',t.id,u.id);if(!start){const seed=crypto.getRandomValues(new Uint32Array(1))[0];await run(env,'INSERT OR IGNORE INTO starts(challenge_id,student_id,started,seed) VALUES(?,?,?,?)',t.id,u.id,t.serentak?t.go:at,seed);start=await one(env,'SELECT * FROM starts WHERE challenge_id=? AND student_id=?',t.id,u.id);}
 const batas=Math.min(t.selesai,(t.serentak?t.go:start.started)+t.menit*60000);if(at>batas)fail("Waktu pengerjaan sudah habis.",403);
 if(t.sekali&&await one(env,'SELECT 1 FROM records WHERE student_id=? AND cid=?',u.id,'challenge-'+t.id+'-'+(t.round||0)))fail("Tantangan sudah dikirim.",409);
 return {now:at,mulai:t.serentak?t.go:start.started,batas,seed:t.serentak?t.id*7919+13:start.seed,rahasia:parse(row.pack).mapel.filter(m=>m.rahasia)};
});
on('/tantangan/go',async(env,b)=>{const {c}=await classAccess(env,b),row=await challenge(env,c,b.id),t=row.t;if(!['mulai','akhiri','ulang'].includes(b.aksi))fail("Aksi tidak valid.");if(b.aksi==='mulai'){t.go=now();t.akhir=0;t.aktif=true;}if(b.aksi==='akhiri')t.akhir=now();if(b.aksi==='ulang'){t.go=0;t.akhir=0;t.round=(t.round||0)+1;await run(env,'DELETE FROM starts WHERE challenge_id=?',t.id);}await storeChallenge(env,row,t);await notify(env,c.code,{t:'go',id:t.id,k:b.aksi,at:now()});return {ok:true,now:now()};});
on('/tantangan/hapus',async(env,b)=>{const {c}=await classAccess(env,b);await run(env,'DELETE FROM challenges WHERE id=? AND class_code=?',Number(b.id),c.code);return {ok:true};});
on('/tantangan/koreksi',async(env,b)=>{const {c,t}=await classAccess(env,b),ch=await challenge(env,c,b.id),rs=await all(env,'SELECT * FROM records WHERE class_code=?',c.code);const stm=[];for(const r of rs){const d=parse(r.data);if(d.sesi?.tantangan!==ch.id)continue;const updated=graded(parse(c.pack),d,ch.t);updated.sesi={...d.sesi,...updated.sesi};stm.push(env.DB.prepare('UPDATE records SET data=? WHERE id=? AND class_code=?').bind(JSON.stringify(updated),r.id,c.code));}if(stm.length)await env.DB.batch(stm);await audit(env,t.id,'tantangan.koreksi',ch.id);return {ok:true,jumlah:stm.length};});
on('/main/cek',async(env,b)=>{const row=await one(env,'SELECT * FROM challenges WHERE main_code=?',text(b.kode,6));if(!row)fail("Kode main tidak ditemukan.",404);const c=await one(env,'SELECT * FROM classes WHERE code=?',row.class_code),t=parse(row.data);if(!t.aktif||t.akhir||now()>t.selesai)fail("Sesi main sudah ditutup.",404);return {kelas:publicClass(c),tantangan:{...t,id:row.id,kode_main:row.main_code},now:now()};});
on('/pendamping/buat',async(env,b)=>{const {c}=await classAccess(env,b);if(!text(b.nama,60))fail("Isi nama pendamping.");const kd=code(10),r=await run(env,'INSERT INTO companions(class_code,name,invite_hash,invite_code) VALUES(?,?,?,?)',c.code,text(b.nama,60),await hash(kd),kd);return {ok:true,id:r.meta.last_row_id,kode:kd};});
on('/pendamping/masuk',async(env,b)=>{const p=await one(env,'SELECT * FROM companions WHERE invite_hash=? AND revoked=0',await hash(text(b.kode,12).toUpperCase()));if(!p||p.used)fail("Undangan tidak berlaku atau sudah dipakai. Minta undangan baru dari guru.",403,'pdp');const raw=token(),r=await run(env,'UPDATE companions SET used=1,token_hash=?,active=? WHERE id=? AND used=0',await hash(raw),now(),p.id);if(!r.meta.changes)fail("Undangan sudah dipakai.",409);const c=await one(env,'SELECT * FROM classes WHERE code=?',p.class_code);return {token:raw,nama:p.name,kelas:publicClass(c)};});
on('/pendamping/cabut',async(env,b)=>{const {c}=await classAccess(env,b);await run(env,'UPDATE companions SET revoked=1 WHERE id=? AND class_code=?',Number(b.id),c.code);return {ok:true};});
on('/admin/guru',async(env,b,req)=>{await admin(env,req);return {guru:await all(env,'SELECT id,email,nama,wa,sekolah,status,sampai,maks_kelas,created FROM teachers ORDER BY id DESC')};});
on('/admin/aktivasi',async(env,b,req)=>{await admin(env,req);const st=b.status||'seumur';if(!['aktif','seumur','menunggu','blokir'].includes(st))fail("Status tidak valid.");if(st==='aktif'&&Number(b.sampai)<=now())fail("Tanggal akhir harus di masa depan.");await run(env,'UPDATE teachers SET status=?,sampai=?,maks_kelas=? WHERE id=?',st,st==='seumur'?0:num(b.sampai,0,9e15),num(b.maks_kelas||20,1,100),Number(b.id));if(b.nominal)await run(env,'INSERT INTO payments(teacher_id,t,nominal,ket) VALUES(?,?,?,?)',Number(b.id),now(),num(b.nominal,0,1e10),text(b.ket,200));await audit(env,'admin','akun.aktivasi',b.id);return {ok:true};});
on('/admin/sandi',async(env,b,req)=>{await admin(env,req);if(typeof b.sandi!=='string'||b.sandi.length<8||b.sandi.length>200)fail("Kata sandi baru 8–200 karakter.");await env.DB.batch([env.DB.prepare('UPDATE teachers SET password=? WHERE id=?').bind(await password(b.sandi),Number(b.id)),env.DB.prepare('DELETE FROM auth_sessions WHERE teacher_id=?').bind(Number(b.id))]);await audit(env,'admin','akun.reset_sandi',b.id);return {ok:true};});

function cors(req,env){const origin=req.headers.get('Origin'),own=new URL(req.url).origin,allowed=String(env.ALLOWED_ORIGINS||'').split(',').map(x=>x.trim());if(origin&&origin!==own&&!allowed.includes(origin))fail("Alamat website belum diizinkan oleh server (CORS).",403);return origin;}
export default {
 async fetch(req,env,ctx){
  let origin;
  try{
   origin=cors(req,env);const url=new URL(req.url),path=url.pathname.replace(/\/$/,'')||'/';
   if(req.method==='OPTIONS')return new Response(null,{status:204,headers:{'Access-Control-Allow-Origin':origin||url.origin,'Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type,Authorization','Vary':'Origin'}});
   if(path==='/kelas'&&req.headers.get('Upgrade')?.toLowerCase()==='websocket'){
    await limited(env,req,'websocket',120);const kd=text(url.searchParams.get('kode'),10).toUpperCase();if(!await one(env,'SELECT 1 FROM classes WHERE code=?',kd))fail("Kelas tidak ditemukan.",404);
    const id=env.ROOMS.idFromName(kd),headers=new Headers(req.headers);headers.set('X-Class-Code',kd);return env.ROOMS.get(id).fetch(new Request(req,{headers}));
   }
   let data;
   if(req.method==='GET'&&(path==='/health'||(path==='/'&&!req.headers.get('Accept')?.includes('text/html')))){await one(env,'SELECT 1 AS ok');data={ok:true,service:'ZuperVerse backend mandiri',version:'1.0.0'};}
   else if(req.method==='GET'&&path==='/setelan')data=settings(env);
   else if(req.method==='GET'&&/^\/kelas\/[A-Z0-9]{4,10}$/i.test(path)){
    const c=await one(env,'SELECT * FROM classes WHERE code=?',path.split('/')[2].toUpperCase());if(!c)fail("Kelas tidak ditemukan.",404);const same=String(c.updated)===url.searchParams.get('v');data={...publicClass(c),sama:same,...(!same?{paket:studentPack(parse(c.pack))}:{})};
   }else if(req.method==='GET'&&/^\/paket\/[A-Z0-9]{4,10}$/i.test(path)){
    const p=await one(env,'SELECT * FROM packs WHERE code=? AND public=1',path.split('/')[2].toUpperCase());if(!p)fail("Kode latihan tidak ditemukan.",404);await run(env,'UPDATE packs SET views=views+1 WHERE code=?',p.code);data={paket:studentPack(parse(p.data)),judul:parse(p.data).judul};
   }else if(routes.has(path)){
    if(req.method!=='POST')fail("Gunakan POST.",405);const b=await readBody(req);data=await routes.get(path)(env,b,req,ctx);
   }else if(req.method==='GET'&&env.ASSETS&&(path==='/'||['/admin','/setup','/guru','/privasi','/ketentuan'].includes(path)||path.includes('.')||path.startsWith('/assets/')||path.startsWith('/img/')))return env.ASSETS.fetch(req);
   else fail("Alamat tidak ditemukan.",404);
   const response=json(data);if(origin){response.headers.set('Access-Control-Allow-Origin',origin);response.headers.set('Vary','Origin');}return response;
  }catch(e){if(!e.status)console.error('Backend error:',e.message);const response=json({error:e.status?e.message:'Server gagal memproses data. Periksa log Worker dan migrasi database.',kode:e.kode||''},e.status||500);if(origin){response.headers.set('Access-Control-Allow-Origin',origin);response.headers.set('Vary','Origin');}return response;}
 }
};
