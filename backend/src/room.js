import {one,hash,text,num,parse,now,fail} from './common.js';
import {student,classAccess,status} from './auth.js';

const EMOTES=['👋','😀','👍','🎉','❤️','🤔','😮','💪','Ayo ke gedung mapel!','Ayo belajar bareng!','Selamat ya!','Aku butuh bantuan','Ikuti aku!','Terima kasih!'];
const point = p => Array.isArray(p)&&p.length===4?p.map(x=>num(x,-100000,100000)):[0,0,0,0];
const outfit = o => Object.fromEntries(Object.entries(o||{}).slice(0,12).filter(([k,v])=>/^[a-z]+$/.test(k)&&typeof v==='string').map(([k,v])=>[k,text(v,30)]));
const stats = s => ({lv:num(s?.lv,1,10000),bh:num(s?.bh,0,1e6),g:num(s?.g,0,10000)});
export class ClassRoom {
 constructor(ctx,env){this.ctx=ctx;this.env=env;}
 send(ws,d){try{ws.send(JSON.stringify(d));}catch{}}
 attachment(ws){try{return ws.deserializeAttachment()||{};}catch{return {};}}
 peers(){return this.ctx.getWebSockets().map(ws=>({ws,a:this.attachment(ws)})).filter(x=>x.a.auth);}
 broadcast(d,filter=()=>true,except=null){for(const x of this.peers())if(x.ws!==except&&filter(x.a))this.send(x.ws,d);}
 public(a){return {id:a.id,nama:a.nama,absen:a.absen||0,g:!!a.g,z:a.z||'',p:a.p||[0,0,0,0],o:a.o||{},sc:a.sc||{lv:1},lv:a.sc?.lv||1,st:a.st||null,siap:a.siap||0};}
 roster(){this.broadcast({t:'roster',list:this.peers().filter(x=>!x.a.obs).map(x=>this.public(x.a))});}
 sync(ws,a){const list=this.peers().filter(x=>x.ws!==ws&&!x.a.obs&&x.a.z===a.z).map(x=>this.public(x.a));this.send(ws,{t:'all',me:a.id,list});}
 async fetch(req){
  const url=new URL(req.url);
  if(req.method==='POST'&&url.pathname==='/event'){
   const d=await req.json();
   if(d.t==='kick'){
    for(const x of this.peers())if(x.a.id===Number(d.id)&&!x.a.g){this.send(x.ws,{t:'go',id:-Number(d.id),k:'akhiri'});try{x.ws.close(4001,'Akses dihentikan guru');}catch{}}
    this.broadcast({t:'left',id:Number(d.id)});this.roster();
   }else if(d.t==='ev')this.broadcast(d,a=>a.obs||a.g);
   else if(d.t==='go')this.broadcast(d);
   return new Response('ok');
  }
  if(req.headers.get('Upgrade')?.toLowerCase()!=='websocket')return new Response('WebSocket required',{status:426});
  if(this.ctx.getWebSockets().length>=220)return new Response('Kelas penuh',{status:503});
  const kode=req.headers.get('X-Class-Code');let a;
  if(url.searchParams.get('guru')==='1'){a={kode,pending:true,auth:false,created:now(),count:0,window:0};const alarm=await this.ctx.storage.getAlarm();if(!alarm||alarm>now()+21000)await this.ctx.storage.setAlarm(now()+21000);}
  else{
   try{const raw=url.searchParams.get('token')||'',{u}=await student(this.env,{kode,token:raw});a={kode,auth:true,id:u.id,nama:u.name,absen:u.absen,g:false,obs:false,hash:await hash(raw),checked:now(),sc:{lv:1},z:'',p:[0,0,0,0],count:0,window:0};}
   catch(e){return new Response(e.message,{status:e.status||403});}
   for(const x of this.peers())if(!x.a.g&&x.a.id===a.id)try{x.ws.close(4000,'Perangkat lain terhubung');}catch{}
  }
  const pair=new WebSocketPair(),[client,server]=Object.values(pair);this.ctx.acceptWebSocket(server);server.serializeAttachment(a);
  return new Response(null,{status:101,webSocket:client});
 }
 async recheck(a){
  if(now()-(a.checked||0)<15000)return true;
  if(!a.g){const u=await one(this.env,'SELECT * FROM students WHERE id=? AND class_code=? AND token_hash=?',a.id,a.kode,a.hash);if(!u||u.blocked)return false;}
  else if(a.pdp){if(!await one(this.env,'SELECT 1 FROM companions WHERE token_hash=? AND class_code=? AND revoked=0',a.hash,a.kode))return false;}
  else{const t=await one(this.env,'SELECT t.* FROM teachers t JOIN auth_sessions s ON s.teacher_id=t.id WHERE s.hash=? AND s.expires>?',a.hash,now());if(!t||['blokir','menunggu','habis'].includes(status(t)))return false;}
  a.checked=now();return true;
 }
 async webSocketMessage(ws,message){
  const a=this.attachment(ws);
  try{
   if(typeof message!=='string'||message.length>8192){ws.close(1009,'Pesan terlalu besar');return;}
   const sec=Math.floor(now()/1000);a.count=a.window===sec?(a.count||0)+1:1;a.window=sec;if(a.count>40){ws.close(1008,'Terlalu banyak pesan');return;}
   const d=JSON.parse(message);
   if(!a.auth){
    if(!a.pending||now()-a.created>20000||d.t!=='auth')fail('Guru belum terautentikasi.',403);
    const {t,p}=await classAccess(this.env,{kode:a.kode,lic:d.lic,pin:d.pin},d.mode==='obs');
    Object.assign(a,{auth:true,pending:false,id:t?-t.id:-1000000-p.id,nama:t?.nama||p.name,g:true,obs:d.mode!=='play',pdp:!!p,hash:await hash(p?d.lic.pdp:d.lic.sess),checked:now(),z:'',p:[0,0,0,0],sc:{lv:1}});
    ws.serializeAttachment(a);this.send(ws,{t:'ok',id:a.id});this.roster();return;
   }
   if(!await this.recheck(a)){this.send(ws,{t:'err',msg:'Akses telah berakhir.'});ws.close(4001,'Akses berakhir');return;}
   if(d.t==='hi'||d.t==='z'){
    const old=a.z;a.z=text(d.z,80);a.o=outfit(d.o);a.p=point(d.p);a.sc=stats(d.sc);
    if(old!==a.z)this.broadcast({t:'left',id:a.id},p=>p.z===old,ws);
    ws.serializeAttachment(a);this.sync(ws,a);if(!a.obs)this.broadcast({t:'join',...this.public(a)},p=>p.z===a.z,ws);this.roster();return;
   }
   if(d.t==='p'&&!a.obs){a.p=point(d.p);this.broadcast({t:'p',id:a.id,p:a.p},p=>p.z===a.z,ws);}
   else if(d.t==='o'&&!a.obs){a.o=outfit(d.o);this.broadcast({t:'o',id:a.id,o:a.o},p=>p.z===a.z,ws);}
   else if(d.t==='e'&&!a.obs&&EMOTES.includes(d.e))this.broadcast({t:'e',id:a.id,e:d.e},p=>p.z===a.z,ws);
   else if(d.t==='sc'){a.sc=stats(d.sc);ws.serializeAttachment(a);this.roster();return;}
   else if(d.t==='siap'){a.siap=num(d.id,0,1e9);ws.serializeAttachment(a);this.roster();return;}
   else if(d.t==='st'&&!a.g){a.st={s:text(d.s,30),m:text(d.m,100),q:d.q?Object.fromEntries(['i','n','j','b','s','h'].map(k=>[k,num(d.q[k],0,1e6)])):null};this.broadcast({t:'st',id:a.id,st:a.st},p=>p.obs||p.g,ws);}
   else if(d.t==='ann'&&a.g&&!a.pdp)this.broadcast({t:'ann',nama:a.nama,text:text(d.text,300),at:now()});
   else if(d.t==='call'&&a.g&&!a.pdp)this.broadcast({t:'call',nama:a.nama,z:a.z});
   else if(d.t==='go'&&a.g&&!a.pdp){
    if(Number(d.id)>0){const ch=await one(this.env,'SELECT data FROM challenges WHERE id=? AND class_code=?',Number(d.id),a.kode),t=parse(ch?.data);if(ch&&((d.k==='mulai'&&t.go)||(d.k==='akhiri'&&t.akhir)))this.broadcast({t:'go',id:Number(d.id),k:d.k});}
    // Blocking a student is performed by the authenticated REST endpoint.
   }
   // Client-reported score events are not trusted; /catat sends saved results.
   ws.serializeAttachment(a);
  }catch(e){this.send(ws,{t:'err',msg:e.status?e.message:'Pesan tidak valid.'});if(!a.auth)try{ws.close(4001,'Autentikasi gagal');}catch{}}
 }
 webSocketClose(ws,code,reason){const a=this.attachment(ws);try{ws.serializeAttachment({...a,auth:false});ws.close(code,reason);}catch{}if(a.auth&&!a.obs)this.broadcast({t:'left',id:a.id},()=>true,ws);this.roster();}
 webSocketError(ws){try{ws.close(1011,'Koneksi terputus');}catch{}}
 async alarm(){let next=0;for(const ws of this.ctx.getWebSockets()){const a=this.attachment(ws);if(!a.auth&&a.pending){if(now()-a.created>=20000){try{ws.close(4001,'Batas waktu autentikasi');}catch{}}else next=Math.min(next||Infinity,a.created+21000);}}if(next)await this.ctx.storage.setAlarm(next);}
}
