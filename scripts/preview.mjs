import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const proc=spawn(process.execPath,[path.join(root,'backend/node_modules/wrangler/bin/wrangler.js'),'dev','--ip','0.0.0.0','--port',String(process.env.PORT||4173),'--local'],{cwd:path.join(root,'backend'),stdio:'inherit'});
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>proc.kill(signal));proc.on('exit',c=>process.exit(c||0));
