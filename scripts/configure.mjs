import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const argv=process.argv.slice(2),option=name=>argv[argv.indexOf(name)+1];
try{
 if(!argv.includes('--api')||!argv.includes('--site'))throw new Error('Gunakan: node scripts/configure.mjs --api https://SERVER.workers.dev --site https://USERNAME.github.io/REPO/');
 const api=new URL(option('--api')),site=new URL(option('--site'));
 if(api.protocol!=='https:'||site.protocol!=='https:')throw new Error('Alamat produksi harus menggunakan https://');
 const config={independentBackend:true,apiBaseUrl:api.origin,realtimeUrl:api.origin.replace(/^https:/,'wss:'),billingUrl:'',adminWhatsApp:''};
 await writeFile(path.join(root,'docs/config.js'),'/* Pengaturan publik. Jangan menaruh secret di sini. */\nwindow.ZUPERVERSE_CONFIG = '+JSON.stringify(config,null,2)+';\n');
 const file=path.join(root,'backend/wrangler.jsonc');const w=JSON.parse(await readFile(file,'utf8'));
 w.vars.ALLOWED_ORIGINS=[site.origin,'http://localhost:8787','http://127.0.0.1:8787'].join(',');
 await writeFile(file,JSON.stringify(w,null,2)+'\n');
 console.log('Konfigurasi selesai. Commit docs/config.js, lalu deploy ulang backend agar izin origin ikut diterapkan.');
 console.log('Origin website:',site.origin);console.log('Server:',api.origin);
}catch(e){console.error(e.message);process.exitCode=1;}
