import {test,after} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {skey} from '../src/common.js';
const adminKey='integration-only-'+crypto.randomUUID();
const mf=new Miniflare(convertV4MiniflareOptions({
 modules:true,scriptPath:new URL('../.test-worker/index.js',import.meta.url).pathname,
 compatibilityDate:'2026-10-01',d1Databases:['DB'],durableObjects:{ROOMS:{className:'ClassRoom',useSQLite:true}},
 bindings:{ALLOWED_ORIGINS:'https://school.example',ADMIN_TOKEN:adminKey,AUTO_APPROVE:'false'}
}));
after(async()=>mf.dispose());
let total=0;
async function call(path,data,expected=200,admin=false,origin='https://school.example'){
 const r=await mf.dispatchFetch('https://api.example'+path,{method:data===undefined?'GET':'POST',headers:{'Content-Type':'application/json',Origin:origin,...(admin?{Authorization:'Bearer '+adminKey}:{})},...(data===undefined?{}:{body:JSON.stringify(data)})});
 const j=await r.json();assert.equal(r.status,expected,path+': '+JSON.stringify(j));total++;return j;
}
const pass='test-password-strong';
const pk={judul:'Paket integrasi',guru:'Guru A',jenjang:'SD Kelas 5',mapel:[{id:'mtk',nama:'Matematika',warna:'#ef4444',waktu:30,jumlah:2,soal:[{q:'2 + 3 = ...',opsi:['4','5','6','7'],jawab:1},{q:'Ibu kota Indonesia?',tipe:'isian',kunci:'Jakarta',bahas:'Jakarta'}]}]};
test('Alur lengkap API, isolasi akun, nilai, tantangan dan WebSocket',async t=>{
 const db=await mf.getD1Database('DB');
 const schema=await readFile(new URL('../migrations/0001_initial.sql',import.meta.url),'utf8');
 await db.exec(schema.replace(/\n/g,' '));
 const auth=await call('/akun/daftar',{email:'guru-a@example.com',nama:'Guru A',wa:'628123456789',sandi:pass});
 const authB=await call('/akun/daftar',{email:'guru-b@example.com',nama:'Guru B',sandi:pass});
 const lic={sess:auth.sess},licB={sess:authB.sess};
 await t.test('Akun menunggu dan aktivasi hanya oleh admin',async()=>{
  assert.equal(auth.guru.status,'menunggu');await call('/guru/kelas',{lic},403);
  await call('/admin/guru',{},403);await call('/admin/aktivasi',{id:auth.guru.id,status:'seumur'},200,true);
  await call('/admin/aktivasi',{id:authB.guru.id,status:'seumur'},200,true);
  await call('/akun/masuk',{email:'guru-a@example.com',sandi:'wrong'},401);
  const logged=await call('/akun/masuk',{email:'guru-a@example.com',sandi:pass});assert.equal(logged.guru.nama,'Guru A');
  await call('/akun/ubah',{lic,nama:'Guru A',wa:'628123456789',sekolah:'SD Uji'});
  await call('/akun/saya',{lic});await call('/akun/google',{cred:'invalid'},400);
 });
 const saved=await call('/paket/simpan',{lic,paket:pk});const packCode=saved.kode;
 const made=await call('/kelas/buat',{lic,nama:'Kelas 5A',pin:'123456',paket_kode:packCode});const kode=made.kode;
 const staff={lic,kode,pin:'123456'};
 await t.test('Paket, draft, bank soal dan kepemilikan kelas',async()=>{
  assert.equal((await call('/paket/daftar',{lic})).paket.length,1);
  await call('/guru/soal/simpan',{lic,paket:pk,pk:packCode});assert.equal((await call('/guru/soal/ambil',{lic})).paket.judul,pk.judul);
  const unsafe=structuredClone(pk);unsafe.mapel[0].warna='\"><img onerror=alert(1)>';await call('/paket/simpan',{lic,paket:unsafe},400);
  const badURL=structuredClone(pk);badURL.mapel[0].materi=[{judul:'link',jenis:'link',url:'javascript:alert(1)'}];await call('/paket/simpan',{lic,paket:badURL},400);
  await call('/paket/ambil',{lic,kode:packCode});await call('/paket/ambil',{lic:licB,kode:packCode},403);
  await call('/dashboard',{lic:licB,kode,pin:'123456'},403);await call('/dashboard',{lic,kode,pin:'000000'},403);
  await call('/bank/terbit',{lic,kode:packCode,bank:true});assert.equal((await call('/bank/cari',{lic:licB,q:'integrasi'})).paket.length,1);
  await call('/bank/ambil',{lic:licB,kode:packCode,pakai:true});
  await call('/paket/publik',{lic,kode:packCode,publik:true});await call('/paket/'+packCode);
  const cls=await call('/kelas/'+kode);assert.equal(cls.paket.mapel.length,1);assert.equal((await call('/kelas/'+kode+'?v='+cls.diubah)).sama,true);
  await call('/kelas/paket/ambil',staff);await call('/kelas/ubah',{...staff,nama:'Kelas 5A Uji'});await call('/kelas/rekap',{...staff,rekap:{kktp:75}});
 });
 const joined=await call('/murid/masuk',{kode,nama:'Murid Satu',absen:1});const learner={kode,token:joined.token};
 const joined2=await call('/murid/masuk',{kode,nama:'Murid Dua',absen:2});
 const payload={...learner,cid:'offline-retry-1',sesi:{mapel:'mtk',nama:'Matematika',benar:2,total:2,nilai:100,durasi:10,t:Date.now(),pk:packCode,pv:joined.diubah,dunia:'kota'},jawaban:[{m:'mtk',s:skey(pk.mapel[0].soal[0]),q:'fake',p:0,k:0,ok:1,t:Date.now()},{m:'mtk',s:skey(pk.mapel[0].soal[1]),p:0,k:0,ok:1,j:{r:'Jakarta',c:1},t:Date.now()}],materi:[{mapel:'mtk',idx:0,t:Date.now()}]};
 await t.test('Token murid, koreksi nilai server dan pengiriman ulang offline',async()=>{
  await call('/murid/masuk',{kode,nama:'Peniru',absen:1},409);
  await call('/murid/masuk',{kode,nama:'Murid Satu',absen:1,token:joined.token});
  await call('/catat',{...payload,token:'forged'},401);
  assert.equal((await call('/catat',payload)).nilai,50);const replay=structuredClone(payload);replay.jawaban[0].p=1;assert.equal((await call('/catat',replay)).nilai,50);
  const dash=await call('/dashboard',staff);assert.equal(dash.sesi.length,1);assert.equal(dash.sesi[0][6],50);assert.equal(dash.jawaban.length,2);assert.equal(dash.materi.length,1);
  await call('/murid/riwayat',learner);assert.equal((await call('/paket/hasil',{lic,kode:packCode})).sesi.length,1);
  await call('/kelas/kunci',{...staff,on:true});await call('/murid/masuk',{kode,nama:'Murid Baru',absen:3},403);await call('/kelas/kunci',{...staff,on:false});
 });
 const ch=await call('/tantangan/simpan',{...staff,t:{judul:'Kuis serentak',mapel:'mtk',mapel_nama:'Matematika',jumlah:2,menit:5,mulai:Date.now()-1000,selesai:Date.now()+600000,serentak:true,sekali:true,hasil:1,aktif:true}});
 let ws1,ws2,teacherSocket;const events1=[],events2=[],staffEvents=[];
 async function connect(query,events){const r=await mf.dispatchFetch('https://api.example/kelas?kode='+kode+query,{headers:{Upgrade:'websocket',Origin:'https://school.example'}});assert.equal(r.status,101);const ws=r.webSocket;ws.accept();ws.addEventListener('message',e=>events.push(JSON.parse(e.data)));return ws;}
 async function until(fn){for(let i=0;i<80;i++){if(fn())return;await new Promise(r=>setTimeout(r,25));}assert.ok(fn(),'WebSocket event timed out');}
 await t.test('WebSocket memerlukan identitas dan meneruskan pemain, gerakan dan aba-aba',async()=>{
  const bad=await mf.dispatchFetch('https://api.example/kelas?kode='+kode+'&token=fake',{headers:{Upgrade:'websocket'}});assert.equal(bad.status,401);
  ws1=await connect('&token='+joined.token,events1);ws2=await connect('&token='+joined2.token,events2);
  ws1.send(JSON.stringify({t:'hi',z:'kota',p:[1,0,2,0],o:{atasan:'a_sd'},sc:{lv:2}}));
  ws2.send(JSON.stringify({t:'hi',z:'kota',p:[3,0,4,0],o:{atasan:'a_sd'},sc:{lv:1}}));
  // Different sockets can deliver hi in either order. Both peers must see
  // the other player, through either the initial snapshot or a join event.
  const sawPeer=events=>events.some(e=>e.t==='join'||e.t==='all'&&e.list.length>0);
  await until(()=>sawPeer(events1)&&sawPeer(events2));
  ws1.send(JSON.stringify({t:'p',p:[5,0,6,0]}));await until(()=>events2.some(e=>e.t==='p'&&e.p[0]===5));
  teacherSocket=await connect('&guru=1',staffEvents);teacherSocket.send(JSON.stringify({t:'auth',lic,pin:'123456',mode:'obs'}));await until(()=>staffEvents.some(e=>e.t==='ok'));
  ws1.send(JSON.stringify({t:'siap',id:ch.id}));await until(()=>staffEvents.some(e=>e.t==='roster'&&e.list.some(p=>p.siap===ch.id)));
 });
 await t.test('Tantangan tersimpan, ruang tunggu, mulai, sekali kirim dan koreksi ulang',async()=>{
  await call('/main/cek',{kode:ch.kode_main});await call('/tantangan/daftar',learner);
  assert.equal((await call('/tantangan/mulai',{...learner,id:ch.id})).tunggu,true);
  await call('/tantangan/go',{...staff,id:ch.id,aksi:'mulai'});await until(()=>events1.some(e=>e.t==='go'&&e.k==='mulai'));
  const start=await call('/tantangan/mulai',{...learner,id:ch.id});assert.ok(start.batas>start.now);
  const submission={...payload,cid:'challenge-1',sesi:{...payload.sesi,tantangan:ch.id}};
  await call('/catat',submission);await call('/catat',{...submission,cid:'another-id'});
  const dash=await call('/dashboard',staff);assert.equal(dash.sesi.filter(s=>s[10]===ch.id).length,1);
  await call('/tantangan/mulai',{...learner,id:ch.id},409);await call('/tantangan/koreksi',{...staff,id:ch.id});
  await call('/tantangan/go',{...staff,id:ch.id,aksi:'akhiri'});await call('/tantangan/go',{...staff,id:ch.id,aksi:'ulang'});
 });
 await t.test('Mapel rahasia tidak muncul di paket publik',async()=>{
  const secret=structuredClone(pk);secret.mapel.push({id:'secret',nama:'Rahasia',rahasia:true,soal:[{q:'Rahasia?',opsi:['A','B'],jawab:0}]});
  await call('/kelas/paket',{...staff,paket:secret,paket_kode:packCode});assert.equal((await call('/kelas/'+kode)).paket.mapel.some(m=>m.rahasia),false);
 });
 await t.test('Pendamping dibatasi ke kelas dan hanya membaca',async()=>{
  const invite=await call('/pendamping/buat',{...staff,nama:'Pendamping'}),p=await call('/pendamping/masuk',{kode:invite.kode});
  await call('/dashboard',{kode,lic:{pdp:p.token}});await call('/kelas/kunci',{kode,lic:{pdp:p.token},on:true},403);
  await call('/pendamping/masuk',{kode:invite.kode},403);await call('/pendamping/cabut',{...staff,id:invite.id});await call('/dashboard',{kode,lic:{pdp:p.token}},403);
 });
 await t.test('Blokir, CORS dan sandi baru',async()=>{
  const uid=(await call('/dashboard',staff)).murid[0].id;await call('/murid/blokir',{...staff,id:uid,on:true});await call('/catat',{...payload,cid:'blocked'},403);await call('/murid/blokir',{...staff,id:uid,on:false});
  await call('/setelan',undefined,403,false,'https://evil.example');
  await call('/akun/sandi',{lic,lama:pass,baru:pass+'-new'});await call('/akun/masuk',{email:'guru-a@example.com',sandi:pass},401);await call('/akun/masuk',{email:'guru-a@example.com',sandi:pass+'-new'});
  await call('/tantangan/hapus',{...staff,id:ch.id});await call('/murid/hapus',{...staff,id:uid});
  const unused=await call('/paket/simpan',{lic,paket:pk});await call('/paket/hapus',{lic,kode:unused.kode});
 });
 for(const ws of [ws1,ws2,teacherSocket])try{ws.close();}catch{}
 console.log('Verified API requests:',total);
});
