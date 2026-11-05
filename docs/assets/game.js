
(function(){
"use strict";
var $=function(id){return document.getElementById(id)};
function lsGet(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function clone(o){return JSON.parse(JSON.stringify(o))}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function today(){var d=new Date();return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function seeded(s){return function(){s=(s*16807)%2147483647;return (s-1)/2147483646}}
var isTouch=!!((window.matchMedia&&matchMedia("(pointer:coarse)").matches)||("ontouchstart" in window));
if(isTouch)document.body.classList.add("touch");

/* =================================================================
   PAKET SOAL CONTOH
   ================================================================= */
var DEFAULT_PACK={judul:"Paket Contoh ZuperVerse",guru:"Tim Zuperguru",jenjang:"Umum (SD sampai SMA/SMK)",mapel:[
 {id:"numerasi",nama:"Numerasi",warna:"#ef4444",waktu:30,jumlah:5,materi:[{judul:"Ringkasan: Pecahan, Persen, dan Rata-rata",jenis:"teks",isi:"Pecahan senilai adalah pecahan yang nilainya sama walaupun angkanya berbeda. Caranya: kalikan atau bagi pembilang dan penyebut dengan bilangan yang sama.\nContoh: 3/4 = 6/8 = 9/12.\n\nPersen artinya per seratus. 20% sama dengan 20/100. Untuk mencari 20% dari 50.000, hitung 20/100 × 50.000 = 10.000.\n\nRata-rata = jumlah semua data dibagi banyak data. Contoh: rata-rata 6, 8, dan 10 adalah (6 + 8 + 10) : 3 = 8."}],soal:[
  {q:"Hasil dari 125 + 378 adalah ...",opsi:["493","503","513","403"],jawab:1,bahas:"125 + 378 = 503."},
  {q:"Ibu membeli 3 kotak kue. Setiap kotak berisi 12 kue. Berapa jumlah kue seluruhnya?",opsi:["15","24","36","48"],jawab:2,bahas:"3 × 12 = 36 kue."},
  {q:"Keliling persegi dengan sisi 9 cm adalah ...",opsi:["18 cm","27 cm","36 cm","81 cm"],jawab:2,bahas:"Keliling persegi = 4 × sisi = 4 × 9 = 36 cm."},
  {q:"Pecahan 3/4 senilai dengan ...",opsi:["6/8","3/8","4/3","9/16"],jawab:0,bahas:"3/4 dikali 2/2 menjadi 6/8."},
  {q:"Jika 2x + 5 = 17, nilai x adalah ...",opsi:["5","6","7","11"],jawab:1,bahas:"2x = 17 − 5 = 12, maka x = 6."},
  {q:"Diskon 20% dari harga Rp50.000 adalah ...",opsi:["Rp5.000","Rp10.000","Rp20.000","Rp40.000"],jawab:1,bahas:"20% × 50.000 = 10.000."},
  {q:"Rata-rata dari 6, 8, dan 10 adalah ...",opsi:["7","8","9","24"],jawab:1,bahas:"(6 + 8 + 10) : 3 = 24 : 3 = 8."}]},
 {id:"literasi",nama:"Literasi",warna:"#3b82f6",waktu:30,jumlah:5,materi:[{judul:"Ringkasan: Fakta, Opini, dan Ide Pokok",jenis:"teks",isi:"Fakta adalah informasi yang benar-benar terjadi dan bisa dibuktikan. Contoh: Gunung Inerie terletak di Pulau Flores.\n\nOpini adalah pendapat seseorang yang belum tentu sama dengan pendapat orang lain. Opini sering ditandai kata menurutku, sebaiknya, mungkin, atau paling.\n\nIde pokok paragraf biasanya terdapat pada kalimat utama, yaitu di awal atau di akhir paragraf."}],soal:[
  {q:"Sinonim kata 'gembira' adalah ...",opsi:["sedih","senang","marah","takut"],jawab:1,bahas:"Gembira bermakna sama dengan senang."},
  {q:"Kalimat berikut yang merupakan opini adalah ...",opsi:["Gunung Inerie terletak di Flores.","Menurutku, pantai itu paling indah.","Air mendidih pada suhu 100°C.","Satu minggu ada tujuh hari."],jawab:1,bahas:"Kata 'menurutku' menandakan pendapat pribadi (opini)."},
  {q:"Ide pokok paragraf biasanya terdapat pada ...",opsi:["kalimat utama","kalimat penjelas","judul","tanda baca"],jawab:0,bahas:"Ide pokok dinyatakan dalam kalimat utama."},
  {q:"Antonim kata 'rajin' adalah ...",opsi:["pintar","malas","tekun","giat"],jawab:1,bahas:"Lawan kata rajin adalah malas."},
  {q:"Teks yang bertujuan meyakinkan atau mengajak pembaca disebut teks ...",opsi:["narasi","deskripsi","persuasi","prosedur"],jawab:2,bahas:"Teks persuasi berisi ajakan atau bujukan."},
  {q:"Penulisan huruf kapital yang benar adalah ...",opsi:["saya tinggal di kupang.","Saya tinggal di Kupang.","saya Tinggal di kupang.","Saya Tinggal Di Kupang."],jawab:1,bahas:"Huruf kapital dipakai di awal kalimat dan nama tempat."}]},
 {id:"ipa",nama:"IPA",warna:"#22c55e",waktu:30,jumlah:5,materi:[{judul:"Ringkasan: Fotosintesis dan Wujud Zat",jenis:"teks",isi:"Fotosintesis adalah proses tumbuhan hijau membuat makanan sendiri. Bahannya air, karbon dioksida, dan cahaya matahari. Hasilnya gula (makanan) dan oksigen.\n\nPerubahan wujud zat:\n• Mencair: padat menjadi cair\n• Membeku: cair menjadi padat\n• Menguap: cair menjadi gas\n• Mengembun: gas menjadi cair"}],soal:[
  {q:"Proses tumbuhan membuat makanan sendiri disebut ...",opsi:["respirasi","fotosintesis","evaporasi","transpirasi"],jawab:1,bahas:"Fotosintesis memerlukan cahaya matahari, air, dan karbon dioksida."},
  {q:"Planet yang paling dekat dengan Matahari adalah ...",opsi:["Venus","Bumi","Merkurius","Mars"],jawab:2,bahas:"Merkurius adalah planet terdekat dari Matahari."},
  {q:"Perubahan wujud dari cair menjadi gas disebut ...",opsi:["membeku","mencair","menguap","mengembun"],jawab:2,bahas:"Contohnya air yang dipanaskan berubah menjadi uap."},
  {q:"Organ tubuh yang berfungsi memompa darah adalah ...",opsi:["paru-paru","jantung","hati","ginjal"],jawab:1,bahas:"Jantung memompa darah ke seluruh tubuh."},
  {q:"Satuan gaya dalam Sistem Internasional adalah ...",opsi:["Joule","Newton","Watt","Pascal"],jawab:1,bahas:"Satuan gaya adalah Newton (N)."},
  {q:"Hewan yang hanya memakan tumbuhan disebut ...",opsi:["karnivora","herbivora","omnivora","pengurai"],jawab:1,bahas:"Herbivora adalah pemakan tumbuhan, misalnya sapi dan kambing."}]},
 {id:"ips",nama:"IPS & PPKn",warna:"#f97316",waktu:30,jumlah:5,soal:[
  {q:"Ibu kota Provinsi Nusa Tenggara Timur adalah ...",opsi:["Kupang","Ende","Maumere","Labuan Bajo"],jawab:0,bahas:"Ibu kota NTT adalah Kupang."},
  {q:"Bunyi sila pertama Pancasila adalah ...",opsi:["Persatuan Indonesia","Ketuhanan Yang Maha Esa","Kemanusiaan yang adil dan beradab","Keadilan sosial bagi seluruh rakyat Indonesia"],jawab:1,bahas:"Sila pertama: Ketuhanan Yang Maha Esa."},
  {q:"Proklamasi kemerdekaan Indonesia dibacakan pada tahun ...",opsi:["1942","1945","1950","1959"],jawab:1,bahas:"Proklamasi dibacakan pada 17 Agustus 1945."},
  {q:"Semboyan negara Indonesia adalah ...",opsi:["Tut Wuri Handayani","Bhinneka Tunggal Ika","Garuda Pancasila","Merdeka atau Mati"],jawab:1,bahas:"Bhinneka Tunggal Ika berarti berbeda-beda tetapi tetap satu."},
  {q:"Kegiatan menghasilkan barang atau jasa disebut ...",opsi:["konsumsi","distribusi","produksi","promosi"],jawab:2,bahas:"Produksi adalah kegiatan menghasilkan barang atau jasa."},
  {q:"Danau tiga warna yang terkenal di Pulau Flores adalah ...",opsi:["Danau Toba","Danau Kelimutu","Danau Poso","Danau Sentani"],jawab:1,bahas:"Danau Kelimutu berada di Kabupaten Ende."}]},
 {id:"inggris",nama:"Bahasa Inggris",warna:"#a855f7",waktu:30,jumlah:5,soal:[
  {q:"'Apple' dalam bahasa Indonesia adalah ...",opsi:["jeruk","apel","pisang","anggur"],jawab:1,bahas:"Apple = apel."},
  {q:"Choose the correct sentence.",opsi:["She go to school.","She goes to school.","She going to school.","She gone to school."],jawab:1,bahas:"Subjek she memakai kata kerja + s/es: goes."},
  {q:"What is the opposite of 'hot'?",opsi:["warm","cold","big","fast"],jawab:1,bahas:"Hot (panas) lawannya cold (dingin)."},
  {q:"'Good morning' diucapkan pada waktu ...",opsi:["pagi","siang","sore","malam"],jawab:0,bahas:"Good morning = selamat pagi."},
  {q:"I ___ a student.",opsi:["am","is","are","be"],jawab:0,bahas:"Subjek I memakai 'am'."},
  {q:"How many legs does a cat have?",opsi:["two","three","four","six"],jawab:2,bahas:"Kucing memiliki empat (four) kaki."}]},
 {id:"informatika",nama:"Informatika",warna:"#14b8a6",waktu:30,jumlah:5,soal:[
  {q:"Perangkat yang digunakan untuk mengetik pada komputer adalah ...",opsi:["mouse","keyboard","monitor","speaker"],jawab:1,bahas:"Keyboard adalah perangkat input untuk mengetik."},
  {q:"Langkah-langkah logis dan berurutan untuk menyelesaikan masalah disebut ...",opsi:["algoritma","aplikasi","internet","virus"],jawab:0,bahas:"Algoritma adalah urutan langkah penyelesaian masalah."},
  {q:"Contoh perangkat output adalah ...",opsi:["scanner","mikrofon","printer","keyboard"],jawab:2,bahas:"Printer mengeluarkan hasil cetak (output)."},
  {q:"Kata sandi yang paling aman adalah ...",opsi:["123456","namaku","Rata#2026!kopi","password"],jawab:2,bahas:"Sandi kuat memadukan huruf besar, kecil, angka, dan simbol."},
  {q:"1 byte terdiri dari ... bit.",opsi:["2","4","8","16"],jawab:2,bahas:"1 byte = 8 bit."},
  {q:"Sikap yang tepat saat menerima pesan berantai yang belum jelas kebenarannya adalah ...",opsi:["langsung disebarkan","cek kebenarannya dulu","hapus semua kontak","balas dengan marah"],jawab:1,bahas:"Selalu periksa kebenaran informasi sebelum menyebarkannya."}]}
]};
(function(){var T={numerasi:["Operasi hitung bilangan","Operasi hitung bilangan","Keliling bangun datar","Pecahan dan persen","Persamaan sederhana","Pecahan dan persen","Pengolahan data"],
 literasi:["Kosakata","Fakta dan opini","Ide pokok paragraf","Kosakata","Jenis teks","Ejaan dan tanda baca"],
 ipa:["Makhluk hidup","Bumi dan antariksa","Zat dan energi","Makhluk hidup","Zat dan energi","Makhluk hidup"],
 ips:["Geografi Indonesia","Pancasila dan kebinekaan","Sejarah kemerdekaan","Pancasila dan kebinekaan","Kegiatan ekonomi","Geografi Indonesia"],
 inggris:["Kosakata (vocabulary)","Tata bahasa (grammar)","Kosakata (vocabulary)","Ungkapan sehari-hari","Tata bahasa (grammar)","Kosakata (vocabulary)"],
 informatika:["Sistem komputer","Berpikir komputasional","Sistem komputer","Literasi digital","Sistem komputer","Literasi digital"]};
 DEFAULT_PACK.mapel.forEach(function(m){var t=T[m.id];if(t)m.soal.forEach(function(x,i){if(t[i])x.tp=t[i]})})})();
var MAX_MAPEL=12;

var JENIS={video:{ic:"🎬",nm:"Video"},link:{ic:"🔗",nm:"Link / Drive"},gambar:{ic:"🖼️",nm:"Gambar"},teks:{ic:"📄",nm:"Teks"}};
function ytId(u){var m=String(u||"").match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);return m?m[1]:null}
function ytStart(u){var m=String(u||"").match(/[?&](?:t|start)=(\d+)/);return m?+m[1]:0}
/* link gambar: Google Drive otomatis diubah jadi gambar langsung (tanpa menyimpan file di database) */
function driveId(u){u=String(u||"");var m=u.match(/drive\.google\.com\/(?:file\/d\/|open\?(?:.*&)?id=|uc\?(?:.*&)?id=|thumbnail\?(?:.*&)?id=)([A-Za-z0-9_-]{20,})/)||u.match(/docs\.google\.com\/uc\?(?:.*&)?id=([A-Za-z0-9_-]{20,})/)||u.match(/lh3\.googleusercontent\.com\/d\/([A-Za-z0-9_-]{20,})/);return m?m[1]:null}
function imgUrl(u){u=String(u||"").trim();var id=driveId(u);return id?"https://drive.google.com/thumbnail?id="+id+"&sz=w1200":u}
function driveEmbed(u){u=String(u||"");var m=u.match(/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)/);if(m)return"https://drive.google.com/file/d/"+m[1]+"/preview";m=u.match(/docs\.google\.com\/(presentation|document|spreadsheets)\/d\/([A-Za-z0-9_-]+)/);if(m)return"https://docs.google.com/"+m[1]+"/d/"+m[2]+(m[1]==="presentation"?"/embed":"/preview");return null}
/* ---------- JENIS SOAL: pilihan ganda, benar/salah, isian singkat, menjodohkan, mengurutkan ---------- */
var TIPE={pg:"🔘 Pilihan ganda",bs:"✅ Benar / Salah",isian:"✍️ Isian singkat",jodoh:"🔗 Menjodohkan",urut:"🔢 Mengurutkan"};
function qChoice(s){return!s.tipe||s.tipe==="pg"||s.tipe==="bs"}
function normAns(t){return String(t==null?"":t).toLowerCase().replace(/\s+/g," ").trim().replace(/[.!?;:]+$/,"").trim().replace(/(\d),(\d)/g,"$1.$2")}
function kunciList(s){return String(s.kunci||"").split("|").map(normAns).filter(Boolean)}
function checkAns(s,r){if(r==null)return false;
 if(s.tipe==="isian")return kunciList(s).indexOf(normAns(r))>=0;
 if(s.tipe==="jodoh")return s.pasangan.every(function(p,i){return r[i]!=null&&normAns(r[i])===normAns(p[1])});
 if(s.tipe==="urut")return r.length===s.urutan.length&&r.every(function(k,i){return normAns(s.urutan[k])===normAns(s.urutan[i])});
 return r===s.jawab}
function keyText(s){if(s.tipe==="isian")return String(s.kunci).split("|")[0];if(s.tipe==="jodoh")return s.pasangan.map(function(p){return p[0]+" → "+p[1]}).join(" • ");if(s.tipe==="urut")return s.urutan.map(function(t,i){return(i+1)+". "+t}).join("   ");return s.opsi[s.jawab]}
function ansText(s,r){if(r==null)return"-";if(s.tipe==="isian")return String(r);if(s.tipe==="jodoh")return s.pasangan.map(function(p,i){return p[0]+" → "+(r[i]||"?")}).join(" • ");if(s.tipe==="urut")return r.map(function(k,i){return(i+1)+". "+s.urutan[k]}).join("   ");return s.opsi[r]}
/* tampilan menjawab untuk isian / menjodohkan / mengurutkan */
function renderQ(s,box,o){box.innerHTML="";var w=document.createElement("div");w.className="qx";box.appendChild(w);
 var go=document.createElement("button");go.className="btn green qgo";go.textContent=o.label||"✔ Jawab";go.disabled=true;var get;
 if(s.tipe==="isian"){var inp=document.createElement("input");inp.className="gin qin";inp.placeholder="Ketik jawabanmu di sini...";inp.setAttribute("autocomplete","off");inp.setAttribute("autocapitalize","off");if(o.prev!=null)inp.value=o.prev;w.appendChild(inp);
  var u1=function(){go.disabled=!inp.value.trim()};inp.oninput=u1;inp.onkeydown=function(e){e.stopPropagation();if(e.key==="Enter"&&!go.disabled){e.preventDefault();go.click()}};u1();get=function(){return inp.value.trim()};setTimeout(function(){try{inp.focus()}catch(e){}},60)}
 else if(s.tipe==="jodoh"){var rights=shuffle(s.pasangan.map(function(p){return p[1]})),sels=[];w.innerHTML='<div class="mut qhint">Pilih pasangan yang tepat untuk setiap baris.</div>';
  var u2=function(){go.disabled=sels.some(function(x){return!x.value})};
  s.pasangan.forEach(function(p,i){var row=document.createElement("div");row.className="qjo";var l=document.createElement("b");l.textContent=p[0];var ar=document.createElement("span");ar.textContent="→";ar.className="mut";
   var sel=document.createElement("select");sel.className="gin";sel.innerHTML='<option value="">— pilih —</option>'+rights.map(function(t){return'<option value="'+esc(t)+'">'+esc(t)+'</option>'}).join("");if(o.prev&&o.prev[i]!=null)sel.value=o.prev[i];sel.onchange=u2;sels.push(sel);row.appendChild(l);row.appendChild(ar);row.appendChild(sel);w.appendChild(row)});
  u2();get=function(){return sels.map(function(x){return x.value})}}
 else{var pool=shuffle(s.urutan.map(function(t,i){return i})),pick=o.prev?o.prev.slice():[];
  var draw=function(){w.innerHTML='<div class="mut qhint">Ketuk pilihan sesuai urutan yang benar. Ketuk urutanmu untuk membatalkan.</div>';var a=document.createElement("div");a.className="qur qur-a";
   pick.forEach(function(k,n){var c=document.createElement("button");c.type="button";c.className="qchip on";c.textContent=(n+1)+". "+s.urutan[k];c.onclick=function(){pick.splice(n,1);draw()};a.appendChild(c)});
   if(!pick.length)a.innerHTML='<span class="mut" style="font-size:13px">Urutanmu muncul di sini</span>';w.appendChild(a);
   var b=document.createElement("div");b.className="qur";pool.forEach(function(k){if(pick.indexOf(k)>=0)return;var c=document.createElement("button");c.type="button";c.className="qchip";c.textContent=s.urutan[k];c.onclick=function(){pick.push(k);SFX.click();draw()};b.appendChild(c)});w.appendChild(b);
   go.disabled=pick.length!==s.urutan.length};
  draw();get=function(){return pick.slice()}}
 box.appendChild(go);
 go.onclick=function(){if(go.disabled)return;var r=get();if(!o.keep)qLock(box);o.onDone(r)}}
function qLock(box){Array.prototype.forEach.call(box.querySelectorAll("input,select,button"),function(x){x.disabled=true})}
/* ---------- editor: isian per jenis soal ---------- */
function soalFieldsHTML(s,j){var h='';
 if(!s.tipe||s.tipe==="pg"){h+='<div class="ogrid">';for(var oi=0;oi<4;oi++){h+='<label class="oin'+(s.jawab===oi?" ok":"")+'"><input type="radio" name="j'+j+'" data-jk="1" data-si="'+j+'" value="'+oi+'"'+(s.jawab===oi?" checked":"")+'><b>'+String.fromCharCode(65+oi)+'</b><input type="text" data-oi="'+oi+'" data-si="'+j+'" value="'+esc(s.opsi[oi])+'" placeholder="Pilihan '+String.fromCharCode(65+oi)+(oi>1?" (boleh kosong)":"")+'"></label>'}h+='</div>'}
 else if(s.tipe==="bs"){h+='<div class="mut" style="font-size:12px;margin-top:6px">Tulis pernyataan di kolom pertanyaan, lalu tandai apakah pernyataan itu benar atau salah.</div><div class="ogrid">'+["Benar","Salah"].map(function(t,oi){return'<label class="oin'+(s.jawab===oi?" ok":"")+'"><input type="radio" name="j'+j+'" data-jk="1" data-si="'+j+'" value="'+oi+'"'+(s.jawab===oi?" checked":"")+'><b>'+(oi?"✗":"✓")+'</b><span style="padding:6px 4px;font-weight:800">Pernyataan ini '+t.toUpperCase()+'</span></label>'}).join("")+'</div>'}
 else if(s.tipe==="isian"){h+='<label class="fld" style="margin-top:8px">Jawaban benar<input data-sk="kunci" data-si="'+j+'" value="'+esc(s.kunci)+'" placeholder="Contoh: 36"></label><div class="mut" style="font-size:12px;margin-top:4px">Huruf besar/kecil dan spasi tidak dipermasalahkan. Kalau ada beberapa jawaban yang diterima, pisahkan dengan tanda | , contoh: <b>36|tiga puluh enam</b></div>'}
 else if(s.tipe==="jodoh"){h+='<div class="mut" style="font-size:12px;margin-top:6px">Isi pasangan yang benar (minimal 2). Di game, kolom kanan diacak dan murid memilih pasangannya.</div>';s.pasangan.forEach(function(p,k){h+='<div class="ogrid" style="grid-template-columns:1fr auto 1fr;align-items:center;margin-top:4px"><input class="gin" data-jo="'+k+'" data-js="0" data-si="'+j+'" value="'+esc(p[0])+'" placeholder="Kiri '+(k+1)+'"><span class="mut">→</span><input class="gin" data-jo="'+k+'" data-js="1" data-si="'+j+'" value="'+esc(p[1])+'" placeholder="Pasangan '+(k+1)+'"></div>'})}
 else if(s.tipe==="urut"){h+='<div class="mut" style="font-size:12px;margin-top:6px">Tulis langkah atau urutan yang <b>benar</b> dari atas ke bawah (minimal 2). Di game, urutannya diacak.</div>';s.urutan.forEach(function(t,k){h+='<div style="display:flex;gap:6px;align-items:center;margin-top:4px"><b style="width:22px;text-align:right">'+(k+1)+'.</b><input class="gin" style="flex:1" data-ur="'+k+'" data-si="'+j+'" value="'+esc(t)+'" placeholder="Urutan ke-'+(k+1)+(k>1?" (boleh kosong)":"")+'"></div>'})}
 return h}
function padSoal(s){if(!s.tipe)s.tipe="pg";if(!Array.isArray(s.opsi))s.opsi=[];s.opsi=s.opsi.slice(0,4);while(s.opsi.length<4)s.opsi.push("");if(typeof s.jawab!=="number")s.jawab=0;if(s.bahas==null)s.bahas="";if(s.tp==null)s.tp="";if(s.gambar==null)s.gambar="";if(s.skor==null)s.skor="";if(s.kunci==null)s.kunci="";
 if(!Array.isArray(s.pasangan))s.pasangan=[];s.pasangan=s.pasangan.slice(0,6).map(function(p){return[String(p&&p[0]||""),String(p&&p[1]||"")]});while(s.pasangan.length<5)s.pasangan.push(["",""]);
 if(!Array.isArray(s.urutan))s.urutan=[];s.urutan=s.urutan.slice(0,8).map(String);while(s.urutan.length<6)s.urutan.push("");return s}
function normSoal(s){var tp=TIPE[s.tipe]?s.tipe:"pg",r={q:String(s.q||"").trim()};
 if(tp==="bs"){r.tipe="bs";r.opsi=["Benar","Salah"];r.jawab=s.jawab===1?1:0}
 else if(tp==="isian"){r.tipe="isian";r.kunci=String(s.kunci||"").split("|").map(function(x){return x.trim()}).filter(Boolean).join("|")}
 else if(tp==="jodoh"){r.tipe="jodoh";r.pasangan=(s.pasangan||[]).map(function(p){return[String(p[0]||"").trim(),String(p[1]||"").trim()]}).filter(function(p){return p[0]&&p[1]})}
 else if(tp==="urut"){r.tipe="urut";r.urutan=(s.urutan||[]).map(function(t){return String(t||"").trim()}).filter(Boolean)}
 else{var opsi=[],map={};(s.opsi||[]).forEach(function(t,i){t=String(t==null?"":t).trim();if(t){map[i]=opsi.length;opsi.push(t)}});r.opsi=opsi;r.jawab=map[s.jawab]!==undefined?map[s.jawab]:-1}
 if(s.bahas&&String(s.bahas).trim())r.bahas=String(s.bahas).trim();if(s.tp&&String(s.tp).trim())r.tp=String(s.tp).trim().slice(0,80);if(s.gambar&&String(s.gambar).trim())r.gambar=imgUrl(s.gambar);if(+s.skor>0)r.skor=Math.min(100,Math.round(+s.skor*10)/10);return r}
function validSoal(s,p){
 if(s.tp!=null){var tpv=String(s.tp).trim().slice(0,80);if(tpv)s.tp=tpv;else delete s.tp}
 if(s.skor!=null&&s.skor!==""){var sk=+s.skor;if(sk>0)s.skor=Math.min(100,Math.round(sk*10)/10);else delete s.skor}else delete s.skor;
 if(s.tipe==="bs"){s.opsi=["Benar","Salah"];if(s.jawab!==0&&s.jawab!==1){if(s.jawab===true||/^b/i.test(String(s.jawab)))s.jawab=0;else if(s.jawab===false||/^s/i.test(String(s.jawab)))s.jawab=1;else throw new Error(p+": tandai pernyataan benar atau salah.")}return}
 if(s.tipe==="isian"){if(Array.isArray(s.kunci))s.kunci=s.kunci.join("|");s.kunci=String(s.kunci==null?(s.jawaban||""):s.kunci).trim();if(!s.kunci)throw new Error(p+": isi jawaban benar untuk soal isian.");delete s.opsi;return}
 if(s.tipe==="jodoh"){if(!Array.isArray(s.pasangan))throw new Error(p+": soal menjodohkan butuh daftar pasangan.");s.pasangan=s.pasangan.map(function(x){return Array.isArray(x)?[String(x[0]||"").trim(),String(x[1]||"").trim()]:[String(x&&(x.kiri||x.a)||"").trim(),String(x&&(x.kanan||x.b)||"").trim()]}).filter(function(x){return x[0]&&x[1]});if(s.pasangan.length<2||s.pasangan.length>6)throw new Error(p+": isi 2 sampai 6 pasangan.");delete s.opsi;return}
 if(s.tipe==="urut"){if(!Array.isArray(s.urutan))throw new Error(p+": soal mengurutkan butuh daftar urutan.");s.urutan=s.urutan.map(function(t){return String(t||"").trim()}).filter(Boolean);if(s.urutan.length<2||s.urutan.length>8)throw new Error(p+": isi 2 sampai 8 urutan.");delete s.opsi;return}
 delete s.tipe;
 if(!Array.isArray(s.opsi)||s.opsi.length<2||s.opsi.length>4)throw new Error(p+": pilihan jawaban harus 2 sampai 4.");
 s.opsi=s.opsi.map(String);
 if(typeof s.jawab!=="number"||s.jawab<0||s.jawab>=s.opsi.length)throw new Error(p+": tandai jawaban yang benar.")}
/* ---------- 🔊 SUARA PEMBACA (memakai suara bawaan perangkat, gratis & bisa offline) ---------- */
var TTS={ok:typeof window!=="undefined"&&"speechSynthesis" in window&&typeof SpeechSynthesisUtterance!=="undefined",voice:null};
function ttsVoice(){if(!TTS.ok)return null;if(TTS.voice)return TTS.voice;var vs=speechSynthesis.getVoices()||[];TTS.voice=vs.filter(function(v){return/^id(-|_|$)/i.test(v.lang)})[0]||vs.filter(function(v){return/indones/i.test(v.name)})[0]||null;return TTS.voice}
if(TTS.ok&&speechSynthesis.addEventListener)speechSynthesis.addEventListener("voiceschanged",function(){TTS.voice=null;ttsVoice()});
function speak(txt){if(!TTS.ok||!txt)return;try{speechSynthesis.cancel();String(txt).replace(/\s+/g," ").match(/[^.!?]{1,220}[.!?]?/g).forEach(function(part){var u=new SpeechSynthesisUtterance(part.trim());u.lang="id-ID";var v=ttsVoice();if(v)u.voice=v;u.rate=(P.settings.ttsRate||0.95);speechSynthesis.speak(u)})}catch(e){}}
function stopSpeak(){if(TTS.ok)try{speechSynthesis.cancel()}catch(e){}}
function soalSpeech(s){var t=s.q;if(s.tipe==="bs")t+=". Benar atau salah?";else if(qChoice(s))t+=". "+s.opsi.map(function(o,i){return"Pilihan "+String.fromCharCode(65+i)+": "+o}).join(". ");else if(s.tipe==="jodoh")t+=". Pasangkan: "+s.pasangan.map(function(p){return p[0]}).join(", ");else if(s.tipe==="urut")t+=". Urutkan: "+s.urutan.join(", ");return t}
function validate(d){
 if(d&&typeof d==="object"){var dk=dtkCleanList(d.detektif);if(dk)d.detektif=dk;else delete d.detektif}
 if(!d||typeof d!=="object")throw new Error("Paket harus berupa objek JSON.");
 if(!Array.isArray(d.mapel)||!d.mapel.length)throw new Error('Paket harus punya daftar "mapel" minimal 1.');
 if(d.mapel.length>MAX_MAPEL)throw new Error("Maksimal "+MAX_MAPEL+" mapel (gedung) per paket.");
 d.pengaturan=cleanPeta(d.pengaturan);
 d.judul=String(d.judul||"Paket Soal");d.guru=String(d.guru||"");d.jenjang=String(d.jenjang||"");
 var ids={};
 d.mapel.forEach(function(m,i){
  var nm='Mapel ke-'+(i+1);
  if(!m.nama||!String(m.nama).trim())throw new Error(nm+': nama mapel wajib diisi.');
  m.nama=String(m.nama).trim();nm='Mapel "'+m.nama+'"';
  var id=m.id?String(m.id):m.nama.toLowerCase().replace(/[^a-z0-9]+/g,"-")||("m"+i);
  while(ids[id])id+="-"+i;ids[id]=1;m.id=id;
  if(!m.warna||!/^#[0-9a-fA-F]{6}$/.test(m.warna))m.warna="#2e7df6";
  m.waktu=Math.max(5,Math.min(300,+m.waktu||30));
  m.jumlah=Math.max(1,Math.min(100,+m.jumlah||10));
  if(!Array.isArray(m.soal)||!m.soal.length)throw new Error(nm+": belum ada soal.");
  m.soal.forEach(function(s,j){
   var p=nm+", soal no. "+(j+1);
   if(!s||!s.q||!String(s.q).trim())throw new Error(p+": pertanyaan masih kosong.");
   s.q=String(s.q);if(s.tipe&&!TIPE[s.tipe])s.tipe="pg";validSoal(s,p);
  });
  if(m.materi!=null){if(!Array.isArray(m.materi))throw new Error(nm+': "materi" harus berupa daftar.');if(m.materi.length>20)throw new Error(nm+": maksimal 20 materi.");
   m.materi.forEach(function(t,k){var p=nm+", materi no. "+(k+1);if(!t||typeof t!=="object")throw new Error(p+": format salah.");
    t.jenis=JENIS[t.jenis]?t.jenis:(t.url?(ytId(t.url)?"video":"link"):"teks");t.judul=String(t.judul||"").trim()||"Materi "+(k+1);
    if(t.jenis==="teks"){t.isi=String(t.isi||"").trim().slice(0,6000);if(!t.isi)throw new Error(p+": isi teks masih kosong.")}
    else{t.url=String(t.url||"").trim();if(!/^https?:\/\//i.test(t.url))throw new Error(p+': link harus diawali http:// atau https://');if(t.isi!=null)t.isi=String(t.isi).slice(0,2000)}
   })}
  m.wajibMateri=!!m.wajibMateri&&!!(m.materi&&m.materi.length);
 });
 return d;
}

/* =================================================================
   KATALOG LEMARI
   ================================================================= */
var CATS=[{id:"atasan",nama:"Atasan",ic:"👕"},{id:"bawahan",nama:"Bawahan",ic:"👖"},{id:"rambut",nama:"Rambut",ic:"💇"},{id:"wrambut",nama:"Warna Rambut",ic:"🎨"},{id:"topi",nama:"Topi",ic:"🧢"},{id:"wajah",nama:"Wajah",ic:"👓"},{id:"leher",nama:"Leher",ic:"🧣"},{id:"punggung",nama:"Punggung",ic:"🎒"},{id:"kulit",nama:"Kulit",ic:"✋"}];
var ITEMS=[
 {id:"a_sd",cat:"atasan",nama:"Seragam SD",ic:"🏫",v:{s:"seragam",c:"#f5f5f5",tie:"#c62828",pants:"b2"}},
 {id:"a_smp",cat:"atasan",nama:"Seragam SMP",ic:"🏫",v:{s:"seragam",c:"#f5f5f5",tie:"#1a237e",pants:"b1"}},
 {id:"a_sma",cat:"atasan",nama:"Seragam SMA/SMK",ic:"🏫",v:{s:"seragam",c:"#f5f5f5",tie:"#616161",pants:"b3"}},
 {id:"a_kb",cat:"atasan",nama:"Kaos Biru",ic:"👕",v:{s:"kaos",c:"#2e7df6"}},
 {id:"a_km",cat:"atasan",nama:"Kaos Merah",ic:"👕",v:{s:"kaos",c:"#e53935"}},
 {id:"a_kh",cat:"atasan",nama:"Kaos Hijau",ic:"👕",v:{s:"kaos",c:"#2ebd59"}},
 {id:"a_kk",cat:"atasan",nama:"Kaos Kuning",ic:"👕",v:{s:"kaos",c:"#facc15"},price:20},
 {id:"a_ku",cat:"atasan",nama:"Kaos Ungu",ic:"👕",v:{s:"kaos",c:"#a855f7"},price:20},
 {id:"a_pramuka",cat:"atasan",nama:"Pramuka",ic:"⚜️",v:{s:"pramuka",c:"#a1887f",pants:"b4"},price:50},
 {id:"a_jaket",cat:"atasan",nama:"Jaket Oranye",ic:"🧥",v:{s:"jaket",c:"#fb8c00"},price:70},
 {id:"a_olahraga",cat:"atasan",nama:"Baju Olahraga",ic:"⚽",v:{s:"olahraga",c:"#1e88e5"},price:60},
 {id:"a_hoodie",cat:"atasan",nama:"Hoodie Hitam",ic:"🧥",v:{s:"hoodie",c:"#263238"},price:90,lv:2},
 {id:"a_batik",cat:"atasan",nama:"Batik",ic:"🎨",v:{s:"batik",c:"#8d4a1f"},price:120,lv:3},
 {id:"a_ikat",cat:"atasan",nama:"Tenun Ikat",ic:"🧶",v:{s:"ikat",c:"#7f1d1d"},price:150,lv:3},
 {id:"a_jas",cat:"atasan",nama:"Jas Ilmuwan",ic:"🥼",v:{s:"jas",c:"#fafafa"},price:180,lv:5},
 {id:"b1",cat:"bawahan",nama:"Biru Dongker",v:"#1a237e"},{id:"b2",cat:"bawahan",nama:"Merah",v:"#c62828"},{id:"b3",cat:"bawahan",nama:"Abu-abu",v:"#757575"},{id:"b4",cat:"bawahan",nama:"Coklat",v:"#5d4037"},
 {id:"b5",cat:"bawahan",nama:"Jeans",v:"#3f6fa8",price:30},{id:"b6",cat:"bawahan",nama:"Hitam",v:"#212121",price:20},{id:"b7",cat:"bawahan",nama:"Krem",v:"#d7c4a3",price:30},
 {id:"r_pendek",cat:"rambut",nama:"Pendek",ic:"👦",v:"pendek"},{id:"r_poni",cat:"rambut",nama:"Poni",ic:"🧒",v:"poni"},{id:"r_panjang",cat:"rambut",nama:"Panjang",ic:"👩",v:"panjang"},{id:"r_kuncir",cat:"rambut",nama:"Kuncir",ic:"👧",v:"kuncir"},{id:"r_botak",cat:"rambut",nama:"Plontos",ic:"🧑‍🦲",v:"botak"},
 {id:"r_jabrik",cat:"rambut",nama:"Jabrik",ic:"⚡",v:"jabrik",price:40},{id:"r_kribo",cat:"rambut",nama:"Kribo",ic:"🌀",v:"kribo",price:60},
 {id:"w1",cat:"wrambut",nama:"Hitam",v:"#1d1410"},{id:"w2",cat:"wrambut",nama:"Coklat",v:"#5a3825"},{id:"w3",cat:"wrambut",nama:"Pirang",v:"#e6c35c",price:30},{id:"w4",cat:"wrambut",nama:"Merah",v:"#b33a2b",price:40},{id:"w5",cat:"wrambut",nama:"Biru",v:"#3a6fd8",price:60,lv:3},{id:"w6",cat:"wrambut",nama:"Ungu",v:"#8a4fd1",price:60,lv:3},
 {id:"t0",cat:"topi",nama:"Tanpa Topi",ic:"🚫",v:"none"},{id:"t_pet",cat:"topi",nama:"Topi Pet",ic:"🧢",v:"pet",price:40},{id:"t_caping",cat:"topi",nama:"Caping",ic:"👒",v:"caping",price:40},{id:"t_koki",cat:"topi",nama:"Topi Koki",ic:"👨‍🍳",v:"koki",price:60},
 {id:"t_helm",cat:"topi",nama:"Helm Proyek",ic:"⛑️",v:"helm",price:80,lv:2},{id:"t_wisuda",cat:"topi",nama:"Toga",ic:"🎓",v:"wisuda",price:120,lv:4},{id:"t_mahkota",cat:"topi",nama:"Mahkota Juara",ic:"👑",v:"mahkota",price:300,lv:7},
 {id:"f0",cat:"wajah",nama:"Polos",ic:"🙂",v:"none"},{id:"f_kc",cat:"wajah",nama:"Kacamata",ic:"👓",v:"kacamata",price:30},{id:"f_kh",cat:"wajah",nama:"Kacamata Hitam",ic:"🕶️",v:"hitam",price:60},
 {id:"l0",cat:"leher",nama:"Tidak Ada",ic:"🚫",v:"none"},{id:"l_syal",cat:"leher",nama:"Syal",ic:"🧣",v:"syal",price:30},{id:"l_medali",cat:"leher",nama:"Medali Emas",ic:"🏅",v:"medali",price:100,lv:3},
 {id:"p0",cat:"punggung",nama:"Tidak Ada",ic:"🚫",v:"none"},{id:"p_tas",cat:"punggung",nama:"Ransel",ic:"🎒",v:"ransel",price:40},{id:"p_jubah",cat:"punggung",nama:"Jubah Pahlawan",ic:"🦸",v:"jubah",price:150,lv:3},{id:"p_sayap",cat:"punggung",nama:"Sayap",ic:"👼",v:"sayap",price:300,lv:6},
 {id:"a_astro",cat:"atasan",nama:"Baju Astronot",ic:"👨‍🚀",v:{s:"astronot",c:"#f5f5f5",pants:"b8"},price:120,lv:2},
 {id:"b8",cat:"bawahan",nama:"Putih",v:"#eceff1"},
 {id:"t_astro",cat:"topi",nama:"Helm Astronot",ic:"🧑‍🚀",v:"helmastro",price:90,lv:2},
 {id:"p_jet",cat:"punggung",nama:"Jetpack",ic:"🚀",v:"jetpack",price:200,lv:4},
 {id:"a_selam",cat:"atasan",nama:"Baju Selam",ic:"🤿",v:{s:"selam",c:"#1e293b",pants:"b6"},price:120,lv:2},
 {id:"t_selam",cat:"topi",nama:"Masker Selam",ic:"🥽",v:"selam",price:70},
 {id:"p_tabung",cat:"punggung",nama:"Tabung Oksigen",ic:"🫧",v:"tabung",price:120,lv:2},
 {id:"a_ranger",cat:"atasan",nama:"Seragam Ranger",ic:"🧭",v:{s:"ranger",c:"#8d7b4f",pants:"b4"},price:110,lv:2},
 {id:"t_ranger",cat:"topi",nama:"Topi Rimba",ic:"🤠",v:"ranger",price:60},
 {id:"l_teropong",cat:"leher",nama:"Teropong",ic:"🔭",v:"teropong",price:70},
 {id:"t_udeng",cat:"topi",nama:"Udeng Bali",ic:"🎀",v:"udeng",price:60,lv:2},
 {id:"a_yukata",cat:"atasan",nama:"Yukata",ic:"👘",v:{s:"yukata",c:"#1e3a8a",pants:"b1"},price:130,lv:3},
 {id:"t_baret",cat:"topi",nama:"Baret",ic:"🎨",v:"baret",price:50},
 {id:"l_kamera",cat:"leher",nama:"Kamera",ic:"📷",v:"kamera",price:80},
 {id:"k1",cat:"kulit",nama:"Kuning Langsat",v:"#ffdbac"},{id:"k2",cat:"kulit",nama:"Sawo Terang",v:"#f1c27d"},{id:"k3",cat:"kulit",nama:"Sawo Matang",v:"#c68642"},{id:"k4",cat:"kulit",nama:"Coklat",v:"#8d5524"},{id:"k5",cat:"kulit",nama:"Coklat Gelap",v:"#5c3a1e"}
];
var IT={};ITEMS.forEach(function(i){IT[i.id]=i});
function iv(id,def){var i=IT[id];return i?i.v:def}

/* =================================================================
   PEMAIN & PROGRES
   ================================================================= */
var DEF_OUTFIT={kulit:"k2",rambut:"r_pendek",wrambut:"w1",topi:"t0",atasan:"a_sd",bawahan:"b2",wajah:"f0",leher:"l0",punggung:"p0"};
function defPlayer(){return{name:"",xp:0,level:1,coins:60,best:{},outfit:clone(DEF_OUTFIT),owned:[],
 stats:{done:{},read:{},kristal:0,zones:{},facts:{},angkasa:0,worlds:{},kol:{},books:0,helped:0,maxCombo:0,perfect:0,correct:0,answered:0,daily:{d:"",n:0}},claimed:{},notified:{},history:[],
 settings:{gfx:"tinggi",sound:true},tipsShown:false}}
function merge(def,src){if(!src||typeof src!=="object")return def;Object.keys(src).forEach(function(k){var a=def[k],b=src[k];if(a&&typeof a==="object"&&!Array.isArray(a)&&b&&typeof b==="object"&&!Array.isArray(b))def[k]=merge(a,b);else if(b!==undefined)def[k]=b});return def}
var LS_P="zd2_player",LS_D="zd2_pack";
var P=merge(defPlayer(),lsGet(LS_P,null));
Object.keys(DEF_OUTFIT).forEach(function(k){if(!IT[P.outfit[k]])P.outfit[k]=DEF_OUTFIT[k]});
/* kemajuan gedung per dunia (nilai & laporan guru tetap per mapel) */
if(!P.stats.wdone){P.stats.wdone={kota:clone(P.stats.done||{})};if(P.stats.angkasa)P.stats.wdone.angkasa=clone(P.stats.done||{})}
function wDone(w,id){return!!((P.stats.wdone[w]||{})[id])}
function wCount(w){return data.mapel.filter(function(m){return wDone(w,m.id)}).length}
function save(){lsSet(LS_P,P)}
var data=lsGet(LS_D,null);
/* 🔒 gedung "khusus tantangan" tidak tampil di dunia; soalnya hanya dipakai saat tantangan */
function playPack(pk){if(!pk||!pk.mapel||!pk.mapel.some(function(m){return m.rahasia}))return pk;var o={};for(var k in pk)o[k]=pk[k];var L=pk.mapel.filter(function(m){return!m.rahasia});
 o.mapel=L.length?L:[{id:"_latihan",nama:"Latihan",warna:"#64748b",waktu:30,jumlah:1,soal:[{q:"Gedung latihan belum tersedia. Tunggu tantangan dari gurumu, ya!",opsi:["Siap!","Oke"],jawab:0}]}];return o}
function hasLvl(v){if(v===true)return 1;if(v===false||v==null||v==="")return 0;var n=parseInt(v,10);return n>=0&&n<=3?n:0}
var dataFull=null;try{dataFull=validate(data);data=playPack(dataFull)}catch(e){data=validate(clone(DEFAULT_PACK));dataFull=data}
function owned(it){return !it.price||P.owned.indexOf(it.id)>=0}
function need(l){return 60+l*40}

/* =================================================================
   SUARA
   ================================================================= */
var actx=null;
function tone(f,d,type,vol,delay){if(!P.settings.sound)return;try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();var t=actx.currentTime+(delay||0),o=actx.createOscillator(),g=actx.createGain();o.type=type||"sine";o.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(vol||.1,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(actx.destination);o.start(t);o.stop(t+d+.02)}catch(e){}}
var SFX={
 ok:function(){tone(660,.12,"triangle");tone(880,.16,"triangle",.1,.1)},
 no:function(){tone(200,.25,"square",.06)},
 coin:function(){tone(988,.08,"square",.05);tone(1319,.14,"square",.05,.07)},
 lvl:function(){[523,659,784,1047].forEach(function(f,i){tone(f,.18,"triangle",.1,i*.11)})},
 click:function(){tone(520,.05,"sine",.06)},
 jump:function(){tone(330,.12,"sine",.06);tone(500,.08,"sine",.04,.05)},
 honk:function(){tone(420,.18,"sawtooth",.04);tone(420,.18,"sawtooth",.04,.25)},
 win:function(){[784,988,1175,1568].forEach(function(f,i){tone(f,.22,"triangle",.1,i*.12)})}
};

/* =================================================================
   TOAST
   ================================================================= */
function toast(msg,ms){var t=document.createElement("div");t.className="toast";t.textContent=msg;$("toasts").appendChild(t);setTimeout(function(){t.remove()},ms||2600);while($("toasts").children.length>3)$("toasts").firstChild.remove()}

/* =================================================================
   THREE.JS SETUP
   ================================================================= */
var canvas=$("c"),renderer;
try{renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true,powerPreference:"high-performance"})}
catch(e){$("nogl").style.display="block";renderer=null}
var scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(60,1,0.1,900);
var FOGC=0xcfeaff;scene.fog=new THREE.Fog(FOGC,110,330);scene.background=new THREE.Color(FOGC);
var hemi=new THREE.HemisphereLight(0xffffff,0x7a9a6a,0.75);scene.add(hemi);
var sun=new THREE.DirectionalLight(0xfff4e0,0.9);sun.position.set(40,70,25);
sun.shadow.mapSize.set(isTouch?1024:2048,isTouch?1024:2048);var sc=sun.shadow.camera;sc.left=-55;sc.right=55;sc.top=55;sc.bottom=-55;sc.near=1;sc.far=200;sun.shadow.bias=-0.0005;
scene.add(sun);scene.add(sun.target);

var MC={};
function M(c){var k=String(c);if(!MC[k]){MC[k]=new THREE.MeshLambertMaterial({color:new THREE.Color(c)});MC[k].userData.bake=true}return MC[k]}
var MBC={};
function MB(c){var k=String(c);if(!MBC[k])MBC[k]=new THREE.MeshBasicMaterial({color:new THREE.Color(c)});return MBC[k]}
var G={box:new THREE.BoxGeometry(1,1,1),plane:new THREE.PlaneGeometry(1,1)};
function flatGeo(g){var n=g.index?g.toNonIndexed():g;n.computeVertexNormals();return n}
G.ico=flatGeo(new THREE.IcosahedronGeometry(1,0));
G.pine=flatGeo(new THREE.ConeGeometry(1,1,7));
G.roof=flatGeo(new THREE.ConeGeometry(1,1,4));
G.mount=flatGeo(new THREE.ConeGeometry(1,1,7));
G.wheel=new THREE.CylinderGeometry(0.45,0.45,0.36,14);
G.sph=new THREE.SphereGeometry(1,12,8);
function cyl(rt,rb,h,s){var k="c"+rt+"_"+rb+"_"+h+"_"+s;return G[k]||(G[k]=new THREE.CylinderGeometry(rt,rb,h,s))}
function mesh(geo,col,x,y,z,parent,shadow){var m=new THREE.Mesh(geo,typeof col==="object"?col:M(col));m.position.set(x||0,y||0,z||0);m.castShadow=shadow!==false;m.receiveShadow=true;if(parent)parent.add(m);return m}
function B(w,h,d,c,x,y,z,p,shadow){var m=mesh(G.box,c,x,y,z,p,shadow);m.scale.set(w,h,d);return m}

/* teks di kanvas */
var FONT="Fredoka, Nunito, 'Trebuchet MS', sans-serif";
function rr(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function canvasTex(lines,w,h,o){o=o||{};var c=document.createElement("canvas");c.width=w;c.height=h;var g=c.getContext("2d");
 if(o.bg){g.fillStyle=o.bg;rr(g,4,4,w-8,h-8,o.rad||24);g.fill()}
 if(o.border){g.lineWidth=o.bw||8;g.strokeStyle=o.border;rr(g,6,6,w-12,h-12,o.rad||24);g.stroke()}
 g.textAlign="center";g.textBaseline="middle";
 lines.forEach(function(L){var sz=L.s;g.font="bold "+sz+"px "+FONT;while(g.measureText(L.t).width>w-36&&sz>12){sz-=2;g.font="bold "+sz+"px "+FONT}
  if(L.sh){g.fillStyle="rgba(0,0,0,.35)";g.fillText(L.t,w/2+2,L.y+3)}g.fillStyle=L.c||"#fff";g.fillText(L.t,w/2,L.y)});
 var t=new THREE.CanvasTexture(c);t.anisotropy=4;return t}
function textPlane(lines,w,h,pw,ph,o){var m=new THREE.Mesh(new THREE.PlaneGeometry(pw,ph),new THREE.MeshBasicMaterial({map:canvasTex(lines,w,h,o),transparent:!!(o&&o.transparent)}));m.rotation.y=Math.PI;return m}
function sprite(lines,w,h,sw,sh,o){var sp=new THREE.Sprite(new THREE.SpriteMaterial({map:canvasTex(lines,w,h,o),transparent:true,depthWrite:false}));sp.scale.set(sw,sh,1);return sp}

/* =================================================================
   DUNIA
   ================================================================= */
var ROADS=[-57,-19,19,57],BLK=[-38,0,38],BOUND=88;
var COL=[],CIRC=[],LOTCOL=[],LOTCIRC=[],INTER=[],animated=[];
function inBlock(x,z){for(var i=0;i<3;i++)for(var j=0;j<3;j++)if(Math.abs(x-BLK[i])<15&&Math.abs(z-BLK[j])<15)return true;return false}
function groundAt(x,z){if(typeof ARENA!=="undefined"&&ARENA&&!ARENA.done){var ag=arenaGround(x,z);return ag!=null?ag:-300}if(typeof LOBI!=="undefined"&&LOBI){var lg=lobiGround(x,z);if(lg!=null)return lg}return CUR.w==="kota"&&inBlock(x,z)?0.3:0}

/* langit */
var sky=new THREE.Mesh(new THREE.SphereGeometry(700,32,16),new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,fog:false,
 uniforms:{top:{value:new THREE.Color(0x3d8fe0)},bot:{value:new THREE.Color(FOGC)}},
 vertexShader:"varying vec3 vP;void main(){vec4 w=modelMatrix*vec4(position,1.0);vP=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}",
 fragmentShader:"uniform vec3 top;uniform vec3 bot;varying vec3 vP;void main(){float h=normalize(vP-cameraPosition).y;gl_FragColor=vec4(mix(bot,top,clamp(h*1.8+0.05,0.0,1.0)),1.0);}"}));
scene.add(sky);
var sunDisc=new THREE.Mesh(new THREE.CircleGeometry(22,24),new THREE.MeshBasicMaterial({color:0xfff6c8,fog:false}));scene.add(sunDisc);

/* tanah */
function buildGroundKota(){
 var c=document.createElement("canvas");c.width=c.height=128;var g=c.getContext("2d");g.fillStyle="#7cc35b";g.fillRect(0,0,128,128);
 for(var i=0;i<900;i++){g.fillStyle=Math.random()<.5?"rgba(40,110,30,.18)":"rgba(200,240,140,.16)";g.fillRect(Math.random()*128,Math.random()*128,2,3)}
 var t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(160,160);
 var gr=new THREE.Mesh(new THREE.PlaneGeometry(1400,1400),new THREE.MeshLambertMaterial({map:t}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;scene.add(gr);
}

function roadTex(){var c=document.createElement("canvas");c.width=64;c.height=128;var g=c.getContext("2d");
 g.fillStyle="#44474f";g.fillRect(0,0,64,128);
 for(var i=0;i<300;i++){g.fillStyle="rgba(255,255,255,"+(Math.random()*.06)+")";g.fillRect(Math.random()*64,Math.random()*128,2,2)}
 g.fillStyle="#e9e9e9";g.fillRect(3,0,2,128);g.fillRect(59,0,2,128);
 g.fillStyle="#f2f2f2";g.fillRect(31,8,2,48);g.fillRect(31,72,2,48);
 var t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=8;return t}
function buildRoads(){
 var base=roadTex();
 ROADS.forEach(function(c){[0,1].forEach(function(h){
  var t=base.clone();t.needsUpdate=true;t.repeat.set(1,122/10);
  var m=new THREE.Mesh(new THREE.PlaneGeometry(8,122),new THREE.MeshLambertMaterial({map:t}));
  m.rotation.x=-Math.PI/2;if(h)m.rotation.z=Math.PI/2;
  m.position.set(h?0:c,h?0.025:0.02,h?c:0);m.receiveShadow=true;scene.add(m)})});
 ROADS.forEach(function(x){ROADS.forEach(function(z){var m=new THREE.Mesh(G.plane,M("#44474f"));m.scale.set(8,8,1);m.rotation.x=-Math.PI/2;m.position.set(x,0.04,z);m.receiveShadow=true;scene.add(m)})});
 [[19,0,0],[-19,0,0],[0,19,1],[0,-19,1],[19,38,0],[-19,-38,0],[38,19,1],[-38,-19,1]].forEach(function(a){for(var i=-3;i<=3;i++){if(a[2])B(3,0.03,0.6,"#f4f4f4",a[0],0.05,a[1]+i*1.1,scene,false);else B(0.6,0.03,3,"#f4f4f4",a[0]+i*1.1,0.05,a[1],scene,false)}});
}
function lamp(x,z){mesh(cyl(0.12,0.16,5,6),"#37474f",x,2.8,z,scene);B(0.55,0.14,0.55,"#37474f",x,5.32,z,scene);var l=new THREE.Mesh(G.box,MB("#fff3b0"));l.scale.set(0.42,0.3,0.42);l.position.set(x,5.08,z);scene.add(l);CIRC.push({x:x,z:z,r:0.3})}
function buildBlocks(){
 BLK.forEach(function(bx){BLK.forEach(function(bz){
  var center=bx===0&&bz===0;
  B(30,0.3,30,"#cdc6b6",bx,0.15,bz,scene,false);
  B(30.2,0.12,30.2,"#9e978a",bx,0.06,bz,scene,false);
  if(!center)B(26,0.04,26,"#80c65e",bx,0.31,bz,scene,false);
  [[-1,-1],[1,-1],[1,1],[-1,1]].forEach(function(q){lamp(bx+q[0]*14,bz+q[1]*14)});
 })});
 var tc=document.createElement("canvas");tc.width=tc.height=64;var g=tc.getContext("2d");g.fillStyle="#e8dcc4";g.fillRect(0,0,64,64);g.strokeStyle="rgba(150,130,100,.35)";g.lineWidth=2;for(var i=0;i<=64;i+=16){g.beginPath();g.moveTo(i,0);g.lineTo(i,64);g.stroke();g.beginPath();g.moveTo(0,i);g.lineTo(64,i);g.stroke()}
 var t=new THREE.CanvasTexture(tc);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(13,13);
 var p=new THREE.Mesh(new THREE.PlaneGeometry(26,26),new THREE.MeshLambertMaterial({map:t}));p.rotation.x=-Math.PI/2;p.position.y=0.31;p.receiveShadow=true;scene.add(p);
}
function bench(x,z,ry,par){var g=new THREE.Group();B(2.4,0.15,0.7,"#8d5a2b",0,0.75,0,g);B(2.4,0.6,0.12,"#8d5a2b",0,1.15,0.32,g);B(0.12,0.7,0.6,"#37474f",-1,0.38,0,g);B(0.12,0.7,0.6,"#37474f",1,0.38,0,g);g.position.set(x,groundAt(x,z),z);g.rotation.y=ry||0;(par||scene).add(g);return g}
var water,drops=[],flag;
function buildPlaza(){
 var y=0.3;
 mesh(cyl(3.3,3.5,0.9,28),"#b9b2a3",0,y+0.45,0,scene);
 water=new THREE.Mesh(cyl(2.95,2.95,0.1,28),new THREE.MeshLambertMaterial({color:0x4fc3f7,transparent:true,opacity:.85}));water.position.y=y+0.85;scene.add(water);
 mesh(cyl(0.45,0.6,2.4,10),"#b9b2a3",0,y+1.6,0,scene);mesh(cyl(1.4,0.8,0.35,18),"#b9b2a3",0,y+2.85,0,scene);
 for(var i=0;i<10;i++){var d=new THREE.Mesh(G.box,MB("#b3e5fc"));d.scale.setScalar(0.16);scene.add(d);drops.push({m:d,a:i/10*Math.PI*2,t:Math.random()})}
 CIRC.push({x:0,z:0,r:3.6});
 /* bendera merah putih */
 mesh(cyl(0.09,0.12,10,8),"#eeeeee",-10,y+5,-10,scene);B(1.4,0.6,1.4,"#9e9e9e",-10,y+0.3,-10,scene);
 flag=new THREE.Group();B(2.6,0.75,0.05,"#e53935",1.3,0.37,0,flag);B(2.6,0.75,0.05,"#fafafa",1.3,-0.38,0,flag);flag.position.set(-10,y+9,-10);flag.userData.dyn=true;scene.add(flag);
 CIRC.push({x:-10,z:-10,r:0.9});
 bench(7,4,Math.PI/2);bench(-7,4,-Math.PI/2);bench(7,-4,Math.PI/2);bench(-7,-4,-Math.PI/2);
 CIRC.push({x:7.2,z:4,r:0.8},{x:-7.2,z:4,r:0.8},{x:7.2,z:-4,r:0.8},{x:-7.2,z:-4,r:0.8});
 /* gapura */
 B(1.3,6.4,1.3,"#c62828",-5,y+3.2,12,scene);B(1.3,6.4,1.3,"#c62828",5,y+3.2,12,scene);B(12,1.4,1.5,"#b71c1c",0,y+6.9,12,scene);B(13,0.4,2,"#7f1d1d",0,y+7.8,12,scene);
 var sg=textPlane([{t:"SELAMAT DATANG",s:58,y:64,c:"#fff8e1",sh:1}],512,128,10,2.5,{});sg.position.set(0,y+6.9,11.2);scene.add(sg);
 var sg2=textPlane([{t:"KOTA ILMU",s:58,y:64,c:"#fff8e1",sh:1}],512,128,10,2.5,{});sg2.rotation.y=0;sg2.position.set(0,y+6.9,12.8);scene.add(sg2);
 CIRC.push({x:-5,z:12,r:1},{x:5,z:12,r:1});
 /* papan misi */
 var bx=8.5,bz=-9;B(0.25,3.2,0.25,"#6d4c41",bx-1.9,y+1.6,bz,scene);B(0.25,3.2,0.25,"#6d4c41",bx+1.9,y+1.6,bz,scene);B(4.4,2.6,0.25,"#8d6e63",bx,y+2.4,bz,scene);
 var mp=textPlane([{t:"📜 PAPAN MISI",s:46,y:52,c:"#3a2600"},{t:"Klaim hadiahmu di sini",s:28,y:110,c:"#5d4037"}],512,160,4,1.25,{bg:"#ffe9b0",rad:18});mp.position.set(bx,y+2.6,bz-0.14);scene.add(mp);
 COL.push({x1:bx-2.2,x2:bx+2.2,z1:bz-0.25,z2:bz+0.25});
 INTER.push({type:"board",x:bx,z:bz-1.8,r:2.6,label:"Lihat Papan Misi"});
 /* kios lemari */
 var kx=-8.5,kz=-9,k=new THREE.Group();
 B(4.2,1.2,1.6,"#ffffff",0,0.6,0,k);B(4.4,0.15,1.8,"#8d6e63",0,1.25,0,k);B(0.18,3.4,0.18,"#90a4ae",-2,1.7,-0.7,k);B(0.18,3.4,0.18,"#90a4ae",2,1.7,-0.7,k);B(0.18,3.4,0.18,"#90a4ae",-2,1.7,0.7,k);B(0.18,3.4,0.18,"#90a4ae",2,1.7,0.7,k);
 for(var s=0;s<6;s++)B(0.74,0.12,2.2,s%2?"#ffffff":"#e53935",-1.85+s*0.74,3.45,0,k);
 B(0.6,0.8,0.08,"#2e7df6",-1,1.7,0.2,k);B(0.6,0.8,0.08,"#ef4444",0,1.7,0.2,k);B(0.6,0.8,0.08,"#22c55e",1,1.7,0.2,k);
 var kt=textPlane([{t:"👕 LEMARI GAYA",s:46,y:64,c:"#fff"}],512,128,3.6,0.9,{bg:"#2e7df6",rad:16});kt.position.set(0,2.75,-0.8);k.add(kt);
 k.position.set(kx,y,kz);scene.add(k);
 COL.push({x1:kx-2.2,x2:kx+2.2,z1:kz-0.9,z2:kz+0.9});
 INTER.push({type:"shop",x:kx,z:kz-2.2,r:2.6,label:"Buka Lemari Gaya"});
 /* tanaman pot */
 [[-11,8],[11,8],[-11,-1],[11,-1]].forEach(function(q){mesh(cyl(0.6,0.45,0.8,10),"#a1663a",q[0],y+0.4,q[1],scene);var b=mesh(G.ico,"#43a047",q[0],y+1.2,q[1],scene);b.scale.setScalar(0.8);CIRC.push({x:q[0],z:q[1],r:0.7})});
}

/* pohon */
var rnd=seeded(1234);
function tree(x,z,type,s,par,circs){s=s||1;var g=new THREE.Group();
 if(type===0){mesh(cyl(0.22,0.32,2.2,6),"#7b4f2c",0,1.1,0,g);var c=mesh(G.ico,["#3e9b3a","#4caf50","#5cb85c","#2e8b3a"][Math.floor(rnd()*4)],0,2.9,0,g);c.scale.set(1.7,1.5,1.7);var c2=mesh(G.ico,"#55b84f",0.55,3.65,0.2,g);c2.scale.setScalar(1.0)}
 else if(type===1){mesh(cyl(0.2,0.28,1.4,6),"#6d4527",0,0.7,0,g);[[1.9,2.1,1.6],[1.5,1.9,2.8],[1.05,1.6,3.9]].forEach(function(a){var m=mesh(G.pine,"#2f7d43",0,a[2],0,g);m.scale.set(a[0],a[1],a[0])})}
 else{/* kelapa */var tr=mesh(cyl(0.16,0.24,5,6),"#8d6e4a",0,2.5,0,g);tr.rotation.z=0.12;for(var i=0;i<6;i++){var l=B(0.4,0.08,2.6,"#3f9b3a",0,0,0,g);var a=i/6*Math.PI*2;l.position.set(0.3+Math.sin(a)*1.1,5.1,Math.cos(a)*1.1);l.rotation.y=a;l.rotation.x=0.35}mesh(G.sph,"#6d4c2a",0.32,4.9,0,g).scale.setScalar(0.35)}
 g.scale.setScalar(s);g.position.set(x,groundAt(x,z),z);g.rotation.y=rnd()*6.28;(par||scene).add(g);
 if(Math.abs(x)<BOUND+2&&Math.abs(z)<BOUND+2)(circs||CIRC).push({x:x,z:z,r:0.45*s});return g}
function okNature(x,z){if(Math.abs(x)<63&&Math.abs(z)<63)return false;if(Math.abs(x)<20&&z>60&&z<88)return false;if(Math.hypot(x+75,z)<13)return false;return true}
function buildNature(){
 var n=0,tries=0;while(n<170&&tries<2000){tries++;var a=rnd()*Math.PI*2,r=66+rnd()*120,x=Math.sin(a)*r,z=Math.cos(a)*r;if(!okNature(x,z))continue;tree(x,z,rnd()<.45?1:(rnd()<.15?2:0),0.9+rnd()*0.6);n++}
 for(var i=0;i<16;i++){var a2=i/16*Math.PI*2+rnd()*.2,r2=220+rnd()*60,h=60+rnd()*70,w=60+rnd()*40;var m=mesh(G.mount,["#5f8f55","#6b9a5c","#557f4b"][i%3],Math.sin(a2)*r2,h/2,Math.cos(a2)*r2,scene,false);m.scale.set(w,h,w);
  var cap=mesh(G.mount,"#f5f5f5",Math.sin(a2)*r2,h-h*0.11,Math.cos(a2)*r2,scene,false);cap.scale.set(w*0.24,h*0.22,w*0.24)}
 /* danau */
 var pond=new THREE.Mesh(new THREE.CircleGeometry(9,32),new THREE.MeshLambertMaterial({color:0x3fa9e8,transparent:true,opacity:.92}));pond.rotation.x=-Math.PI/2;pond.scale.set(1,1.4,1);pond.position.set(-75,0.06,0);scene.add(pond);
 var shore=new THREE.Mesh(new THREE.CircleGeometry(10.2,32),M("#d8c79a"));shore.rotation.x=-Math.PI/2;shore.scale.set(1,1.4,1);shore.position.set(-75,0.04,0);scene.add(shore);
 for(var k=0;k<14;k++){var aa=k/14*Math.PI*2,rx=-75+Math.cos(aa)*10.4,rz=Math.sin(aa)*14;var rk=mesh(G.ico,"#9e9e9e",rx,0.3,rz,scene);rk.scale.set(0.6+rnd()*.5,0.4+rnd()*.3,0.6+rnd()*.5)}
 B(1.6,0.2,7,"#8d6e4a",-66,0.35,0,scene);B(0.2,0.8,0.2,"#6d4c41",-66.7,0.2,-3,scene);B(0.2,0.8,0.2,"#6d4c41",-65.3,0.2,-3,scene);
 for(var e=0;e<12;e++){var ee=e/12*Math.PI*2;CIRC.push({x:-75+Math.cos(ee)*7.5,z:Math.sin(ee)*11.5,r:3})}
 /* lapangan sepak bola */
 var fz=75;B(34,0.06,22,"#56b046",0,0.03,fz,scene,false);
 for(var st=0;st<8;st++)B(34/8,0.065,22,st%2?"#5fbb4f":"#56b046",-17+34/16+st*34/8,0.035,fz,scene,false);
 var L="#ffffff";B(30,0.08,0.18,L,0,0.08,fz-9.5,scene,false);B(30,0.08,0.18,L,0,0.08,fz+9.5,scene,false);B(0.18,0.08,19,L,-15,0.08,fz,scene,false);B(0.18,0.08,19,L,15,0.08,fz,scene,false);B(0.18,0.08,19,L,0,0.08,fz,scene,false);
 var ring=new THREE.Mesh(new THREE.RingGeometry(2.8,3.05,32),MB("#ffffff"));ring.rotation.x=-Math.PI/2;ring.position.set(0,0.09,fz);scene.add(ring);
 [-15,15].forEach(function(gx){var sgn=gx<0?-1:1;B(0.15,2.4,0.15,"#fff",gx,1.2,fz-3,scene);B(0.15,2.4,0.15,"#fff",gx,1.2,fz+3,scene);B(0.15,0.15,6.15,"#fff",gx,2.4,fz,scene);var net=new THREE.Mesh(G.box,new THREE.MeshLambertMaterial({color:0xffffff,transparent:true,opacity:.35}));net.scale.set(1.4,0.08,6);net.position.set(gx+sgn*0.7,2.4,fz);scene.add(net);CIRC.push({x:gx,z:fz-3,r:0.3},{x:gx,z:fz+3,r:0.3})});
 var ball=mesh(G.sph,"#ffffff",3,0.5,fz+2,scene);ball.scale.setScalar(0.5);ball.userData.dyn=true;animated.push(function(t){ball.rotation.y=t*0.001});
 var ft=textPlane([{t:"⚽ LAPANGAN OLAHRAGA",s:44,y:64,c:"#fff"}],512,128,8,2,{bg:"#2e7d32",rad:14});ft.position.set(0,3.4,fz-11.6);scene.add(ft);B(0.2,3,0.2,"#5d4037",-3.8,1.5,fz-11.5,scene);B(0.2,3,0.2,"#5d4037",3.8,1.5,fz-11.5,scene);
 /* pagar kayu keliling kota luar */
 /* awan */
 for(var j=0;j<20;j++){var cg=new THREE.Group();var nb=3+Math.floor(rnd()*3);for(var q=0;q<nb;q++){var cm=mesh(G.ico,"#ffffff",q*3-nb*1.5,rnd()*1.5,rnd()*2,cg,false);cm.scale.set(3+rnd()*2,2+rnd(),2.5+rnd())}
  cg.position.set((rnd()-.5)*500,55+rnd()*30,(rnd()-.5)*500);cg.userData.sp=1+rnd()*1.5;cg.userData.dyn=true;scene.add(cg);clouds.push(cg)}
}
var clouds=[];


/* gabungkan objek statis per material agar ringan di HP */
function bake(root){root.updateMatrixWorld(true);var groups={},rm=[];
 (function walk(o){if(o.userData&&o.userData.dyn&&o!==root)return;if(o.isMesh&&o.material&&o.material.userData&&o.material.userData.bake){var k=o.material.uuid;(groups[k]=groups[k]||{mat:o.material,list:[]}).list.push(o);rm.push(o)}o.children.slice().forEach(walk)})(root);
 rm.forEach(function(o){o.parent.remove(o)});
 Object.keys(groups).forEach(function(k){var gr=groups[k],total=0;var geos=gr.list.map(function(o){var g=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();g.applyMatrix4(o.matrixWorld);total+=g.attributes.position.count;return g});
  var Pp=new Float32Array(total*3),Nn=new Float32Array(total*3),off=0;geos.forEach(function(g){Pp.set(g.attributes.position.array,off*3);Nn.set(g.attributes.normal.array,off*3);off+=g.attributes.position.count;g.dispose()});
  var bg=new THREE.BufferGeometry();bg.setAttribute("position",new THREE.BufferAttribute(Pp,3));bg.setAttribute("normal",new THREE.BufferAttribute(Nn,3));bg.computeBoundingSphere();
  var m=new THREE.Mesh(bg,gr.mat);m.castShadow=true;m.receiveShadow=true;root.add(m)});
}
/* =================================================================
   GEDUNG MAPEL & RUMAH (dibangun ulang saat paket berubah)
   ================================================================= */
var SLOT_BLOCKS=[[-38,38],[0,38],[38,38],[-38,0],[38,0],[-38,-38],[0,-38],[38,-38]];
var lotGroup=null,schools=[],houseCount=0;
function bestText(m){var b=P.best[m.id],n=Math.min(m.jumlah,m.soal.length),mt=(m.materi||[]).length;return(b!=null?"Terbaik "+b+"/"+n+(b>=n?" ⭐":""):m.soal.length+" soal")+(mt?" • 📺 "+mt+" materi":"")+(b==null?" • Baru":"")}
function schoolLabel(m){return sprite([{t:m.nama,s:60,y:66,c:"#fff",sh:1},{t:bestText(m),s:32,y:128,c:"#ffd54a"}],512,170,8.5,2.8,{bg:"rgba(20,22,48,0.82)",border:m.warna,bw:8,rad:30})}
function makeSchool(m,sx,sz,i){
 var g=new THREE.Group(),W=11,D=10,H=8.2,col=m.warna,cream=["#f5efe2","#eef3f7","#f7efe9"][i%3];
 B(W,H,D,cream,0,H/2,0,g);
 B(W+0.12,0.5,D+0.12,col,0,H*0.5,0,g);
 B(W+0.5,0.9,D+0.5,col,0,H+0.45,0,g);
 B(W-0.6,0.4,D-0.6,"#9aa0a6",0,H+0.5,0,g);
 B(W+0.2,0.4,D+0.2,"#9e978a",0,0.2,0,g);
 /* jendela depan & belakang */
 [-D/2-0.06,D/2+0.06].forEach(function(fz,fi){[2.3,5.8].forEach(function(wy,fl){[-4,-2.2,2.2,4].forEach(function(wx){if(fl===0&&fi===0&&Math.abs(wx)<3)return;
  B(1.3,1.5,0.1,"#9fd3f2",wx,wy,fz,g);B(1.5,0.14,0.3,"#ffffff",wx,wy-0.82,fz,g);B(0.08,1.5,0.12,"#ffffff",wx,wy,fz+(fi?0.02:-0.02),g)})})});
 /* jendela samping */
 [-W/2-0.06,W/2+0.06].forEach(function(fx){[2.3,5.8].forEach(function(wy){[-2.5,0,2.5].forEach(function(wz){B(0.1,1.5,1.3,"#9fd3f2",fx,wy,wz,g)})})});
 /* pintu portal */
 B(3.8,4.6,0.4,col,0,2.3,-D/2-0.1,g);
 var portal=new THREE.Mesh(G.plane,new THREE.MeshBasicMaterial({color:new THREE.Color(col).lerp(new THREE.Color("#ffffff"),.35),transparent:true,opacity:.8}));portal.scale.set(2.8,3.9,1);portal.rotation.y=Math.PI;portal.position.set(0,2.05,-D/2-0.32);g.add(portal);
 var glow=new THREE.Mesh(G.plane,new THREE.MeshBasicMaterial({color:new THREE.Color(col),transparent:true,opacity:.35,depthWrite:false}));glow.scale.set(3.6,0.05,1);glow.rotation.x=-Math.PI/2;glow.position.set(0,0.45,-D/2-1.6);glow.scale.set(3.4,2.4,1);g.add(glow);
 /* kanopi & tangga */
 B(5.2,0.3,2.2,col,0,4.85,-D/2-1.05,g);B(0.2,4.5,0.2,"#eceff1",-2.4,2.6,-D/2-2,g);B(0.2,4.5,0.2,"#eceff1",2.4,2.6,-D/2-2,g);
 B(4.6,0.25,1.4,"#bdbdbd",0,0.43,-D/2-0.8,g);
 /* papan nama di dinding */
 var sign=textPlane([{t:"GEDUNG "+m.nama.toUpperCase(),s:54,y:64,c:"#fff",sh:1}],768,128,8.4,1.4,{bg:col,rad:18});sign.position.set(0,H-0.9,-D/2-0.08);g.add(sign);
 /* AC & tangki di atap */
 B(1.2,0.8,1,"#cfd8dc",-3,H+1.3,2,g);B(1.6,1.4,1.6,"#90a4ae",3,H+1.6,1.5,g);
 /* tiang bendera kecil & taman */
 [-4.6,4.6].forEach(function(tx){var bb=mesh(G.ico,"#4caf50",tx,1.2,-D/2-1.2,g);bb.scale.set(0.9,0.75,0.9)});
 var lab=schoolLabel(m);lab.position.set(0,H+3.4,0);g.add(lab);
 g.position.set(sx,0.3,sz);lotGroup.add(g);
 LOTCOL.push({x1:sx-W/2,x2:sx+W/2,z1:sz-D/2,z2:sz+D/2});
 LOTCIRC.push({x:sx-2.4,z:sz-D/2-2,r:0.3},{x:sx+2.4,z:sz-D/2-2,r:0.3});
 var dz={type:"door",m:m,x:sx,z:sz-D/2-1.7,r:2.5,label:"Masuk Gedung "+m.nama,color:col};INTER.push(dz);
 schools.push({m:m,g:g,label:lab,portal:portal,glow:glow,i:i,ly:8.2+3.4});
 if(rnd()<.8)tree(sx+(i%2?-5.3:5.3),sz+6.5,0,0.8,lotGroup,LOTCIRC);
}
var WALL=["#ffe0b2","#c8e6c9","#bbdefb","#f8bbd0","#fff9c4","#d7ccc8","#e1bee7","#ffccbc"],ROOF=["#c62828","#6d4c41","#37474f","#2e7d32","#ad1457","#ef6c00"];
function makeHouse(sx,sz,i,r){
 var g=new THREE.Group(),two=r()<.4,W=8,D=7,H=two?6.4:4,wall=WALL[Math.floor(r()*WALL.length)],roof=ROOF[Math.floor(r()*ROOF.length)];
 B(W,H,D,wall,0,H/2,0,g);B(W+0.2,0.35,D+0.2,"#a1887f",0,0.17,0,g);
 var rf=mesh(G.roof,roof,0,H+1.45,0,g);rf.scale.set((W+1.4)/Math.SQRT2,2.9,(D+1.4)/Math.SQRT2);rf.rotation.y=Math.PI/4;
 B(1.5,2.5,0.14,"#6d4c41",0,1.25,-D/2-0.05,g);B(0.14,0.14,0.08,"#ffd54a",0.5,1.25,-D/2-0.14,g);B(2.2,0.15,1,"#8d6e63",0,2.65,-D/2-0.5,g);
 [[-2.6,2],[2.6,2]].concat(two?[[-2.6,4.8],[0,4.8],[2.6,4.8]]:[]).forEach(function(w){B(1.4,1.2,0.12,"#9fd3f2",w[0],w[1],-D/2-0.05,g);B(1.6,0.14,0.3,"#ffffff",w[0],w[1]-0.66,-D/2-0.1,g);B(0.1,1.2,0.14,"#ffffff",w[0],w[1],-D/2-0.08,g)});
 [-W/2-0.05,W/2+0.05].forEach(function(fx){B(0.12,1.2,1.4,"#9fd3f2",fx,2,0,g)});
 B(0.9,1.8,0.9,"#8d6e63",W/4,H+1.8,D/6,g);
 /* pagar & taman */
 B(2.8,0.8,0.12,"#fafafa",-2.9,0.4,-D/2-3.2,g);B(2.8,0.8,0.12,"#fafafa",2.9,0.4,-D/2-3.2,g);
 B(1.4,0.04,3,"#bdbdbd",0,0.03,-D/2-1.6,g);
 for(var f=0;f<5;f++){B(0.35,0.35,0.35,["#e91e63","#ffeb3b","#ff5722","#9c27b0"][f%4],-3.8+f*0.4,0.2,-D/2-2.6,g);B(0.35,0.35,0.35,["#ffeb3b","#e91e63","#03a9f4","#ff5722"][f%4],2.2+f*0.4,0.2,-D/2-2.6,g)}
 B(0.2,1,0.2,"#5d4037",-3.8,0.5,-D/2-2.2,g);B(0.6,0.45,0.4,"#1e88e5",-3.8,1.15,-D/2-2.2,g);
 g.position.set(sx,0.3,sz);lotGroup.add(g);
 LOTCOL.push({x1:sx-W/2,x2:sx+W/2,z1:sz-D/2,z2:sz+D/2},{x1:sx-4.3,x2:sx-1.5,z1:sz-D/2-3.3,z2:sz-D/2-3.1},{x1:sx+1.5,x2:sx+4.3,z1:sz-D/2-3.3,z2:sz-D/2-3.1});
 tree(sx+(i%2?-5:5),sz+5,r()<.5?0:2,0.85,lotGroup,LOTCIRC);
 if(i%2===0&&r()<.6){var car=makeCar(r()<.5?"sedan":"angkot",pick(["#e53935","#fafafa","#1e88e5","#43a047","#ffb300","#212121"]));car.rotation.y=Math.PI/2;car.position.set(sx+7,0.3,sz+1);lotGroup.add(car);LOTCOL.push({x1:sx+6,x2:sx+8,z1:sz-1.3,z2:sz+3.3})}
 houseCount++;
}
function buildLots(){rebuildLotsAny()}
function buildKotaLots(){
 if(lotGroup){scene.remove(lotGroup);lotGroup.traverse(function(o){if(o.material&&o.material.map)o.material.map.dispose()})}
 lotGroup=new THREE.Group();lotGroup.userData.dyn=true;scene.add(lotGroup);LOTCOL=[];LOTCIRC=[];schools=[];houseCount=0;
 INTER=INTER.filter(function(x){return x.type!=="door"});
 var r=seeded(777),slots=[];SLOT_BLOCKS.forEach(function(b){slots.push([b[0]-7,b[1]],[b[0]+7,b[1]])});
 slots.forEach(function(s,i){if(i<data.mapel.length)makeSchool(data.mapel[i],s[0],s[1],i);else makeHouse(s[0],s[1],i,r)});
 bake(lotGroup);drawMinimapBase();
}
function refreshLabels(){schools.forEach(function(s){s.g.remove(s.label);s.label.material.map.dispose();s.label=schoolLabel(s.m);s.label.position.set(0,s.ly||11.6,0);s.g.add(s.label)})}

/* =================================================================
   KENDARAAN
   ================================================================= */
function makeCar(type,color){
 var g=new THREE.Group(),L=4.2;
 if(type==="bus"){L=7.6;B(7.6,2.5,2.4,"#fbc02d",0,1.6,0,g);B(6.4,0.8,2.42,"#9fd3f2",-0.4,2.15,0,g);B(0.1,0.9,2.1,"#9fd3f2",3.81,2.1,0,g);B(7.62,0.22,2.42,"#212121",0,1.1,0,g);B(7.6,0.2,2.3,"#f9a825",0,2.95,0,g);
  var bs=textPlane([{t:"BUS SEKOLAH",s:40,y:32,c:"#212121"}],256,64,3.6,0.6,{});bs.rotation.y=0;bs.position.set(0,0.55+0.1,1.215);bs.position.y=0.7;g.add(bs);var bs2=bs.clone();bs2.rotation.y=Math.PI;bs2.position.z=-1.215;g.add(bs2);
  [-2.6,2.6].forEach(function(x){[-1.1,1.1].forEach(function(z){var w=mesh(G.wheel,"#1b1b1b",x,0.45,z,g);w.rotation.x=Math.PI/2})})}
 else if(type==="angkot"){L=4.6;B(4.6,1.9,2.1,color,0,1.3,0,g);B(3.4,0.62,2.12,"#9fd3f2",-0.35,1.7,0,g);B(0.1,0.75,1.8,"#9fd3f2",2.31,1.7,0,g);B(4.62,0.16,2.12,"#ffffff",0,0.95,0,g);B(4,0.12,1.6,"#424242",-0.2,2.32,0,g);
  [-1.5,1.5].forEach(function(x){[-1,1].forEach(function(z){var w=mesh(G.wheel,"#1b1b1b",x,0.45,z,g);w.rotation.x=Math.PI/2})})}
 else{B(4.2,0.9,2,color,0,0.8,0,g);B(2.3,0.82,1.82,"#9fd3f2",-0.25,1.65,0,g);B(2.45,0.14,1.88,color,-0.25,2.1,0,g);B(0.12,0.82,1.9,color,0.9,1.65,0,g);B(0.12,0.82,1.9,color,-1.4,1.65,0,g);
  [-1.3,1.3].forEach(function(x){[-0.95,0.95].forEach(function(z){var w=mesh(G.wheel,"#1b1b1b",x,0.45,z,g);w.rotation.x=Math.PI/2})})}
 var hx=L/2+0.02;[-0.65,0.65].forEach(function(z){var h=new THREE.Mesh(G.box,MB("#fff59d"));h.scale.set(0.08,0.25,0.4);h.position.set(hx,0.85,z);g.add(h);var t=new THREE.Mesh(G.box,MB("#ff5252"));t.scale.set(0.08,0.25,0.35);t.position.set(-hx,0.85,z);g.add(t)});
 B(0.2,0.3,type==="bus"?2.42:2.04,"#9e9e9e",hx,0.5,0,g);B(0.2,0.3,type==="bus"?2.42:2.04,"#9e9e9e",-hx,0.5,0,g);
 g.userData.len=L;return g}
var cars=[];
function route(R,inner){var a=inner?R-2:R+2;var pts=[[a,a],[a,-a],[-a,-a],[-a,a]];return inner?pts:pts.slice().reverse()}
function buildCars(){
 var defs=[[19,1,"sedan","#e53935",0],[19,1,"angkot","#1e63c4",2],[19,0,"sedan","#fafafa",1],[19,0,"bus","",3],[57,1,"sedan","#43a047",0],[57,1,"angkot","#1e63c4",2],[57,0,"sedan","#ff9800",1],[57,0,"sedan","#263238",3],[57,1,"bus","",1]];
 defs.forEach(function(d,i){var g=makeCar(d[2],d[3]);g.userData.dyn=true;scene.add(g);var c={g:g,route:route(d[0],d[1]),seg:d[4],t:i*3%10,speed:6+((i*7)%4),v:0,honkT:0,block:0};cars.push(c);placeCar(c,0)});
}
function placeCar(c,dt){
 var a=c.route[c.seg],b=c.route[(c.seg+1)%4],dx=b[0]-a[0],dz=b[1]-a[1],L=Math.hypot(dx,dz),ux=dx/L,uz=dz/L;
 var px=a[0]+ux*c.t,pz=a[1]+uz*c.t,blocked=false,byPlayer=false;
 if(dt>0){
  var qx=pos.x-px,qz=pos.z-pz,fw=qx*ux+qz*uz,side=Math.abs(qx*uz-qz*ux),half=c.g.userData.len/2;
  if(fw>0&&fw<half+4.5&&side<2.2&&pos.y<2){blocked=true;byPlayer=true}
  for(var i=0;i<cars.length;i++){var o=cars[i];if(o===c)continue;var ox=o.g.position.x-px,oz=o.g.position.z-pz,of=ox*ux+oz*uz,os=Math.abs(ox*uz-oz*ux);if(of>0&&of<half+o.g.userData.len/2+2.5&&os<1.3){blocked=true;break}}
  c.v+=((blocked?0:c.speed)-c.v)*Math.min(1,dt*(blocked?7:1.2));if(c.v<0.05&&blocked)c.v=0;
  c.t+=c.v*dt;if(c.t>=L){c.t-=L;c.seg=(c.seg+1)%4;return placeCar(c,0)}
  if(byPlayer){c.block+=dt;if(c.block>1.2&&performance.now()>c.honkT){c.honkT=performance.now()+4000;if(Math.hypot(qx,qz)<14&&!c.g.userData.quiet)SFX.honk()}}else c.block=0;
  px=a[0]+ux*c.t;pz=a[1]+uz*c.t;
 }
 c.g.position.set(px,0,pz);
 var target=Math.atan2(-uz,ux),cur=c.g.rotation.y,d=target-cur;while(d>Math.PI)d-=Math.PI*2;while(d<-Math.PI)d+=Math.PI*2;
 c.g.rotation.y=dt>0?cur+d*Math.min(1,dt*6):target;
 c.ux=ux;c.uz=uz;
}

/* =================================================================
   AVATAR
   ================================================================= */
function buildAvatar(o){
 var g=new THREE.Group();
 var skin=iv(o.kulit,"#ffdbac"),hairC=iv(o.wrambut,"#1d1410"),top=iv(o.atasan,{s:"kaos",c:"#2e7df6"}),pants=iv(o.bawahan,"#1a237e");
 var hair=iv(o.rambut,"pendek"),hat=iv(o.topi,"none"),face=iv(o.wajah,"none"),neck=iv(o.leher,"none"),back=iv(o.punggung,"none");
 var tc=top.c,long=top.s==="jaket"||top.s==="hoodie"||top.s==="jas"||top.s==="batik"||top.s==="ikat"||top.s==="astronot"||top.s==="selam"||top.s==="ranger"||top.s==="yukata",astroS=top.s==="astronot";
 var legL=new THREE.Group(),legR=new THREE.Group(),armL=new THREE.Group(),armR=new THREE.Group(),head=new THREE.Group();
 legL.position.set(-0.4,1.35,0);legR.position.set(0.4,1.35,0);
 [legL,legR].forEach(function(l){B(0.72,1.15,0.72,pants,0,-0.55,0,l);B(0.78,0.24,0.95,top.s==="olahraga"?"#fafafa":astroS?"#b0bec5":"#262626",0,-1.2,0.06,l)});
 if(top.s==="olahraga"){B(0.74,0.5,0.74,"#fafafa",0,-0.85,0,legL);B(0.74,0.5,0.74,"#fafafa",0,-0.85,0,legR)}
 armL.position.set(-1.06,2.85,0);armR.position.set(1.06,2.85,0);
 [armL,armR].forEach(function(a){if(long){B(0.62,1.25,0.62,tc,0,-0.6,0,a);B(0.56,0.4,0.56,astroS?"#cfd8dc":skin,0,-1.4,0,a)}else{B(0.64,0.6,0.64,tc,0,-0.28,0,a);B(0.56,1.0,0.56,skin,0,-1.08,0,a)}});
 var torso=B(1.5,1.6,0.82,tc,0,2.15,0,g);
 if(top.s==="seragam"){B(0.22,0.95,0.05,top.tie,0,2.35,0.43,g);B(0.32,0.12,0.06,top.tie,0,2.84,0.43,g);B(0.32,0.3,0.04,"#e0e0e0",0.42,2.5,0.42,g);B(1.52,0.16,0.84,"#1f1f1f",0,1.42,0,g);B(0.18,0.12,0.86,"#ffd54a",0,1.42,0.01,g)}
 else if(top.s==="pramuka"){B(0.36,0.32,0.04,"#8d6e63",-0.38,2.45,0.42,g);B(0.36,0.32,0.04,"#8d6e63",0.38,2.45,0.42,g);B(1.0,0.22,0.86,"#c62828",0,2.86,0,g);B(0.5,0.6,0.05,"#c62828",0,2.55,0.43,g);B(0.24,0.18,0.06,"#fafafa",0,2.32,0.45,g);B(1.52,0.16,0.84,"#3e2723",0,1.42,0,g)}
 else if(top.s==="jaket"){B(0.07,1.55,0.04,"#424242",0,2.15,0.43,g);B(1.54,0.3,0.86,"#e65100",0,1.45,0,g);B(0.3,0.3,0.04,"#e65100",-0.45,2.2,0.43,g)}
 else if(top.s==="hoodie"){B(1.3,0.85,0.45,tc,0,3.15,-0.58,g);B(0.8,0.4,0.04,"#37474f",0,1.8,0.43,g);B(0.05,0.5,0.04,"#eceff1",-0.2,2.6,0.43,g);B(0.05,0.5,0.04,"#eceff1",0.2,2.6,0.43,g)}
 else if(top.s==="batik"||top.s==="ikat"){var pc=top.s==="batik"?"#e0b04a":"#fbbf24",pc2=top.s==="batik"?"#4e2a10":"#1f2937";for(var by=0;by<4;by++)for(var bx=0;bx<4;bx++){B(0.2,0.2,0.03,(bx+by)%2?pc:pc2,-0.54+bx*0.36,1.6+by*0.36,0.42,g)}if(top.s==="ikat"){B(1.52,0.18,0.84,"#fbbf24",0,2.0,0,g);B(1.52,0.18,0.84,"#fbbf24",0,2.6,0,g)}}
 else if(top.s==="jas"){B(1.56,0.55,0.88,tc,0,1.15,0,g);B(0.42,1.4,0.05,"#90caf9",0,2.2,0.43,g);B(0.3,0.25,0.04,"#e0e0e0",-0.45,1.9,0.44,g);B(0.06,0.3,0.05,"#1e88e5",-0.45,2.05,0.46,g)}
 else if(top.s==="olahraga"){B(1.52,0.22,0.84,"#fafafa",0,2.6,0,g);B(0.5,0.5,0.04,"#fafafa",0,2.05,0.42,g)}
 else if(astroS){B(0.75,0.5,0.05,"#cfd8dc",0,2.3,0.43,g);[["#ef4444",-0.2],["#22c55e",0],["#3b82f6",0.2]].forEach(function(q){var l=new THREE.Mesh(G.box,MB(q[0]));l.scale.set(0.12,0.12,0.03);l.position.set(q[1],2.38,0.47);g.add(l)});B(1.54,0.2,0.86,"#90a4ae",0,1.45,0,g);B(0.3,0.16,0.05,"#e53935",-0.45,2.72,0.43,g);B(0.3,0.16,0.05,"#fafafa",-0.45,2.56,0.43,g);B(1.3,1.3,0.45,"#e0e0e0",0,2.25,-0.62,g)}
 else if(top.s==="selam"){[-0.74,0.74].forEach(function(x){B(0.06,1.6,0.84,"#06b6d4",x,2.15,0,g)});B(0.06,1.3,0.04,"#facc15",0,2.25,0.42,g);B(1.52,0.14,0.84,"#06b6d4",0,2.9,0,g)}
 else if(top.s==="ranger"){B(0.36,0.32,0.04,"#6f5f3a",-0.38,2.45,0.42,g);B(0.36,0.32,0.04,"#6f5f3a",0.38,2.45,0.42,g);B(0.2,0.24,0.05,"#facc15",-0.38,2.75,0.43,g);B(1.52,0.16,0.84,"#3f3a2a",0,1.42,0,g);B(0.9,0.2,0.86,"#6f5f3a",0,2.88,0,g)}
 else if(top.s==="yukata"){var c1=B(0.18,1.3,0.04,"#f8fafc",-0.22,2.35,0.43,g);c1.rotation.z=-0.45;var c2=B(0.18,1.3,0.04,"#f8fafc",0.22,2.35,0.43,g);c2.rotation.z=0.45;B(1.54,0.36,0.86,"#dc2626",0,1.75,0,g);for(var yd=0;yd<6;yd++)B(0.12,0.12,0.03,"#bfdbfe",-0.5+(yd%3)*0.5,2.1+Math.floor(yd/3)*0.6,0.42,g)}
 else{B(0.6,0.12,0.04,"#ffffff",0,2.9,0.42,g)}
 head.position.set(0,3.58,0);
 B(1.2,1.2,1.2,skin,0,0,0,head);
 B(0.17,0.22,0.05,"#1b1b1b",-0.26,0.08,0.61,head);B(0.17,0.22,0.05,"#1b1b1b",0.26,0.08,0.61,head);
 B(0.06,0.06,0.03,"#ffffff",-0.22,0.14,0.64,head);B(0.06,0.06,0.03,"#ffffff",0.3,0.14,0.64,head);
 B(0.42,0.08,0.05,"#7a3b2e",0,-0.26,0.61,head);B(0.08,0.08,0.05,"#7a3b2e",-0.24,-0.21,0.61,head);B(0.08,0.08,0.05,"#7a3b2e",0.24,-0.21,0.61,head);
 B(0.2,0.12,0.04,"#f48fb1",-0.42,-0.1,0.61,head);B(0.2,0.12,0.04,"#f48fb1",0.42,-0.1,0.61,head);
 B(0.12,0.3,0.24,skin,-0.64,0,0,head);B(0.12,0.3,0.24,skin,0.64,0,0,head);
 var H=hairC;
 if(hair!=="botak"){
  if(hair==="kribo"){var k=mesh(G.ico,H,0,0.7,-0.05,head);k.scale.set(0.95,0.7,0.95);B(1.4,1.0,0.5,H,0,0.15,-0.55,head)}
  else{B(1.28,0.34,1.28,H,0,0.64,0,head);B(1.28,0.75,0.2,H,0,0.25,-0.6,head);B(0.12,0.5,1.0,H,-0.63,0.32,-0.1,head);B(0.12,0.5,1.0,H,0.63,0.32,-0.1,head)}
  if(hair==="poni"||hair==="panjang"||hair==="kuncir")B(1.28,0.26,0.16,H,0,0.46,0.6,head);
  if(hair==="panjang"){B(1.3,1.7,0.26,H,0,-0.3,-0.6,head);B(0.15,1.2,0.9,H,-0.64,-0.1,-0.12,head);B(0.15,1.2,0.9,H,0.64,-0.1,-0.12,head)}
  if(hair==="kuncir"){B(0.4,0.9,0.4,H,0,0.1,-0.9,head);B(0.44,0.14,0.44,"#e91e63",0,0.5,-0.85,head)}
  if(hair==="jabrik"){for(var sp=0;sp<7;sp++){var cn=mesh(G.pine,H,-0.45+(sp%4)*0.3,0.95,-0.35+Math.floor(sp/4)*0.5,head);cn.scale.set(0.22,0.55,0.22);cn.rotation.z=(sp%3-1)*0.25}}
 }
 if(hat==="pet"){B(1.34,0.42,1.34,"#1565c0",0,0.8,0,head);B(1.1,0.08,0.7,"#0d47a1",0,0.62,0.9,head);B(0.2,0.06,0.2,"#fafafa",0,1.03,0,head)}
 else if(hat==="caping"){var cp=mesh(G.pine,"#d7b56d",0,1.05,0,head);cp.scale.set(1.45,0.75,1.45);B(1.0,0.1,1.0,"#a1887f",0,0.68,0,head)}
 else if(hat==="koki"){mesh(cyl(0.62,0.62,0.9,14),"#fafafa",0,1.05,0,head);var pf=mesh(G.sph,"#fafafa",0,1.6,0,head);pf.scale.set(0.75,0.45,0.75)}
 else if(hat==="helm"){var hm=mesh(new THREE.SphereGeometry(0.78,14,8,0,Math.PI*2,0,Math.PI/2),"#fdd835",0,0.5,0,head);B(1.7,0.08,1.7,"#fbc02d",0,0.52,0.1,head);B(0.2,0.4,1.2,"#f9a825",0,0.95,0,head)}
 else if(hat==="wisuda"){B(1.3,0.38,1.3,"#212121",0,0.78,0,head);var bd=B(1.85,0.09,1.85,"#212121",0,1.0,0,head);bd.rotation.y=Math.PI/4;B(0.06,0.6,0.06,"#ffd54a",0.75,0.72,0.3,head);B(0.16,0.16,0.16,"#ffd54a",0,1.07,0,head)}
 else if(hat==="mahkota"){mesh(new THREE.CylinderGeometry(0.68,0.68,0.36,8,1,true),new THREE.MeshLambertMaterial({color:0xffd54a,side:THREE.DoubleSide}),0,0.86,0,head);for(var cr=0;cr<5;cr++){var aa=cr/5*Math.PI*2,cc=mesh(G.pine,"#ffd54a",Math.sin(aa)*0.6,1.2,Math.cos(aa)*0.6,head);cc.scale.set(0.15,0.4,0.15)}B(0.18,0.18,0.06,"#e53935",0,0.86,0.68,head)}
 else if(hat==="selam"){B(1.26,0.16,1.26,"#111827",0,0.1,0,head);B(0.95,0.42,0.08,"#111827",0,0.1,0.64,head);var gl2=new THREE.Mesh(G.box,new THREE.MeshLambertMaterial({color:0x7fe3ff,transparent:true,opacity:.6}));gl2.scale.set(0.82,0.32,0.04);gl2.position.set(0,0.1,0.69);head.add(gl2);mesh(cyl(0.07,0.07,1.1,8),"#facc15",0.66,0.55,0.1,head);B(0.12,0.12,0.3,"#facc15",0.66,-0.05,0.25,head)}
 else if(hat==="ranger"){mesh(cyl(1.1,1.1,0.08,18),"#8d6e3f",0,0.7,0,head);mesh(cyl(0.62,0.7,0.5,14),"#8d6e3f",0,0.98,0,head);mesh(cyl(0.71,0.71,0.12,14),"#3f3a2a",0,0.82,0,head)}
 else if(hat==="udeng"){B(1.3,0.3,1.3,"#f8fafc",0,0.55,0,head);B(1.32,0.08,1.32,"#d4a017",0,0.45,0,head);var kn=mesh(G.pine,"#f8fafc",0,0.9,0.45,head);kn.scale.set(0.28,0.5,0.14);kn.rotation.x=0.3}
 else if(hat==="baret"){var bt=mesh(G.sph,"#1f2937",0.12,0.72,0,head);bt.scale.set(0.8,0.24,0.8);bt.rotation.z=-0.2;mesh(cyl(0.04,0.04,0.15,6),"#1f2937",0.12,0.98,0,head)}
 if(hat==="helmastro"){var hb=new THREE.Mesh(G.sph,new THREE.MeshLambertMaterial({color:0xcfefff,transparent:true,opacity:.3,depthWrite:false}));hb.position.y=0.08;head.add(hb);mesh(cyl(0.82,0.86,0.3,18),"#cfd8dc",0,-0.66,0,head)}
 if(face==="kacamata"||face==="hitam"){var fr=face==="hitam"?"#111":"#333",ln=face==="hitam"?"#111":"#cfe9ff";[-0.27,0.27].forEach(function(x){B(0.4,0.32,0.05,fr,x,0.08,0.63,head);B(0.32,0.24,0.03,ln,x,0.08,0.66,head)});B(0.16,0.06,0.04,fr,0,0.12,0.64,head);B(0.06,0.06,0.6,fr,-0.62,0.1,0.35,head);B(0.06,0.06,0.6,fr,0.62,0.1,0.35,head)}
 g.add(head);
 if(neck==="syal"){B(1.15,0.3,0.98,"#e53935",0,2.95,0,g);B(0.26,0.8,0.08,"#e53935",0.35,2.5,0.46,g);B(0.26,0.12,0.09,"#fafafa",0.35,2.2,0.46,g)}
 else if(neck==="medali"){var r1=B(0.08,0.62,0.04,"#1e88e5",-0.18,2.65,0.44,g);r1.rotation.z=0.35;var r2=B(0.08,0.62,0.04,"#e53935",0.18,2.65,0.44,g);r2.rotation.z=-0.35;var md=mesh(cyl(0.22,0.22,0.06,16),"#ffd54a",0,2.28,0.46,g);md.rotation.x=Math.PI/2}
 else if(neck==="teropong"){B(0.06,0.9,0.04,"#3f3a2a",-0.3,2.7,0.43,g).rotation.z=0.5;B(0.06,0.9,0.04,"#3f3a2a",0.3,2.7,0.43,g).rotation.z=-0.5;[-0.15,0.15].forEach(function(x){var tb=mesh(cyl(0.12,0.12,0.4,8),"#1f2937",x,2.3,0.55,g);tb.rotation.x=Math.PI/2})}
 else if(neck==="kamera"){B(0.06,0.9,0.04,"#111",-0.3,2.7,0.43,g).rotation.z=0.5;B(0.06,0.9,0.04,"#111",0.3,2.7,0.43,g).rotation.z=-0.5;B(0.6,0.4,0.25,"#1f2937",0,2.3,0.52,g);var ln=mesh(cyl(0.13,0.13,0.2,10),"#475569",0,2.3,0.72,g);ln.rotation.x=Math.PI/2}
 var cape=null;
 if(back==="tabung"){mesh(cyl(0.32,0.32,1.6,12),"#facc15",0,2.2,-0.72,g);mesh(G.sph,"#facc15",0,3.0,-0.72,g).scale.setScalar(0.32);mesh(cyl(0.1,0.1,0.3,8),"#475569",0,3.35,-0.72,g)}
 else if(back==="ransel"){B(1.15,1.25,0.5,"#ef6c00",0,2.2,-0.66,g);B(0.85,0.5,0.15,"#e65100",0,1.85,-0.95,g);B(0.14,1.2,0.1,"#5d4037",-0.45,2.3,0.43,g);B(0.14,1.2,0.1,"#5d4037",0.45,2.3,0.43,g)}
 else if(back==="jubah"){cape=new THREE.Group();cape.position.set(0,2.95,-0.45);B(1.55,2.3,0.08,"#c62828",0,-1.15,0,cape);B(1.6,0.2,0.2,"#ffd54a",0,0,0.05,cape);g.add(cape)}
 else if(back==="sayap"){cape=new THREE.Group();cape.position.set(0,2.5,-0.5);[-1,1].forEach(function(s){var w=new THREE.Group();w.position.set(s*0.3,0,0);for(var f=0;f<3;f++){var fb=B(1.5-f*0.3,0.42,0.08,"#ffffff",s*(0.75-f*0.15),0.55-f*0.38,0,w)}w.rotation.y=s*0.45;w.rotation.z=s*0.25;cape.add(w)});g.add(cape)}
 var flame=null;if(back==="jetpack"){[-0.33,0.33].forEach(function(x){mesh(cyl(0.3,0.3,1.4,12),"#b0bec5",x,2.25,-0.78,g);mesh(new THREE.ConeGeometry(0.3,0.4,12),"#e53935",x,3.15,-0.78,g);mesh(cyl(0.2,0.28,0.3,10),"#455a64",x,1.4,-0.78,g)});
  flame=new THREE.Group();[-0.33,0.33].forEach(function(x){var f=new THREE.Mesh(new THREE.ConeGeometry(0.22,0.9,10),new THREE.MeshBasicMaterial({color:0xffa94d}));f.rotation.x=Math.PI;f.position.set(x,0.85,-0.78);flame.add(f)});flame.visible=false;g.add(flame)}
 g.add(legL,legR,armL,armR);
 g.userData={legL:legL,legR:legR,armL:armL,armR:armR,head:head,cape:cape,flame:flame};
 g.scale.setScalar(0.62);
 return g;
}
function nameTag(name,color,w){w=w||2.4;return sprite([{t:name,s:44,y:40,c:"#fff"}],320,80,w/0.62,w/4/0.62,{bg:"rgba(15,18,45,.75)",border:color||"rgba(255,255,255,.4)",bw:5,rad:22})}
function animAvatar(av,moving,walk,air,t,talk){
 var u=av.userData,sw=moving?Math.sin(walk)*0.8:0;
 if(air){u.legL.rotation.x=-0.5;u.legR.rotation.x=0.3;u.armL.rotation.x=-2.6;u.armR.rotation.x=-2.6}
 else{u.legL.rotation.x=sw;u.legR.rotation.x=-sw;u.armL.rotation.x=-sw;u.armR.rotation.x=talk?-1.9+Math.sin(t/180)*0.4:sw}
 u.armL.rotation.z=0;u.armR.rotation.z=0;
 u.head.rotation.y=moving?0:Math.sin(t/1400)*0.15;
 if(u.flame)u.flame.visible=!!air;
 if(u.cape)u.cape.rotation.x=moving?0.35+Math.sin(walk*0.5)*0.08:0.08+Math.sin(t/600)*0.03;
}

/* =================================================================
   NPC & BUKU
   ================================================================= */
var NPC_DEF=[
 {n:"Pak Budi",x:4.5,z:-10,ic:"👨",o:{kulit:"k3",rambut:"r_pendek",wrambut:"w1",topi:"t_pet",atasan:"a_kb",bawahan:"b6",wajah:"f_kc",leher:"l0",punggung:"p0"}},
 {n:"Bu Sari",x:-11,z:6,ic:"👩",o:{kulit:"k2",rambut:"r_panjang",wrambut:"w2",topi:"t0",atasan:"a_batik",bawahan:"b4",wajah:"f0",leher:"l0",punggung:"p0"}},
 {n:"Kak Rina",x:24,z:8,ic:"👧",o:{kulit:"k1",rambut:"r_kuncir",wrambut:"w1",topi:"t0",atasan:"a_sma",bawahan:"b3",wajah:"f0",leher:"l0",punggung:"p_tas"}},
 {n:"Om Yosef",x:-24,z:-30,ic:"🧔",o:{kulit:"k4",rambut:"r_kribo",wrambut:"w1",topi:"t_caping",atasan:"a_ikat",bawahan:"b6",wajah:"f0",leher:"l0",punggung:"p0"}},
 {n:"Adik Toni",x:10,z:24,ic:"👦",o:{kulit:"k3",rambut:"r_poni",wrambut:"w1",topi:"t0",atasan:"a_sd",bawahan:"b2",wajah:"f0",leher:"l0",punggung:"p_tas"}},
 {n:"Mama Lena",x:-30,z:52,ic:"👩",o:{kulit:"k4",rambut:"r_panjang",wrambut:"w1",topi:"t0",atasan:"a_km",bawahan:"b4",wajah:"f0",leher:"l_syal",punggung:"p0"}},
 {n:"Kakek Petrus",x:20,z:63,ic:"👴",o:{kulit:"k3",rambut:"r_botak",wrambut:"w1",topi:"t_caping",atasan:"a_kh",bawahan:"b7",wajah:"f_kc",leher:"l0",punggung:"p0"}},
 {n:"Pak Polisi Dani",x:52,z:-24,ic:"👮",o:{kulit:"k2",rambut:"r_pendek",wrambut:"w1",topi:"t_pet",atasan:"a_pramuka",bawahan:"b4",wajah:"f_kh",leher:"l0",punggung:"p0"}}
];
var NPC_LINES=["Halo, {n}! Aku sedang bingung dengan soal ini. Kamu mau bantu?","Wah, kebetulan ada pelajar! Bisa bantu aku menjawab pertanyaan ini?","Anakku bertanya soal ini tadi pagi, tapi aku lupa jawabannya. Tolong bantu ya!","Tebak-tebakan dulu! Kalau benar, aku kasih koin.","Aku sedang latihan untuk lomba cerdas cermat. Mau jadi temanku belajar?"];
var npcs=[],books=[];
function buildNPCs(list){(list||NPC_DEF).forEach(function(d){var g=d.robot?buildRobot(d.col):buildAvatar(d.o);var tag=nameTag(d.n,"#fbbf24",2.4);tag.position.set(0,6.0,0);g.add(tag);
 var mk=sprite([{t:"!",s:110,y:70,c:"#3a2600"}],128,140,1.3/0.62,1.42/0.62,{bg:"#fbbf24",rad:60});mk.position.set(0,7.3,0);mk.scale.set(0.85/0.62,0.93/0.62,1);g.add(mk);
 g.position.set(d.x,groundAt(d.x,d.z),d.z);g.rotation.y=Math.PI;g.userData.dyn=true;scene.add(g);
 var n={d:d,g:g,mk:mk,cool:0,phase:Math.random()*6};npcs.push(n);CIRC.push({x:d.x,z:d.z,r:0.8});
 INTER.push({type:"npc",npc:n,x:d.x,z:d.z,r:3,label:"Bicara dengan "+d.n})})}
var BOOK_POS=[[11,-12],[-12,11],[0,-12.5],[24,-24],[-24,24],[38,10],[-38,-10],[0,48],[0,-28],[-66,30],[66,-30],[6,80],[-75,-17],[72,72],[-72,-72],[45,-52],[-45,52],[70,10]];
var BOOK_COL=["#ef4444","#3b82f6","#22c55e","#a855f7","#f97316","#14b8a6"];
function buildBooks(list,kind){kind=kind||"buku";(list||BOOK_POS).forEach(function(p,i){var g=new THREE.Group();if(kind==="kristal"){var cr=new THREE.Mesh(G.octa,new THREE.MeshLambertMaterial({color:0x67e8f9,emissive:0x0e7490}));cr.scale.set(0.6,0.95,0.6);g.add(cr)}
 else if(kind==="mutiara"){var sh=new THREE.Mesh(G.hemi,new THREE.MeshLambertMaterial({color:0xf9a8d4,emissive:0x5b2140}));sh.scale.set(0.7,0.3,0.6);sh.rotation.x=Math.PI;sh.position.y=-0.2;g.add(sh);var pr=new THREE.Mesh(G.sph,new THREE.MeshLambertMaterial({color:0xffffff,emissive:0x8a8a9a}));pr.scale.setScalar(0.32);pr.position.y=0.05;g.add(pr)}
 else if(kind==="daun"){var lf=new THREE.Mesh(G.sph,new THREE.MeshLambertMaterial({color:0xfacc15,emissive:0x8a5a00}));lf.scale.set(0.45,0.8,0.08);g.add(lf);var stm=new THREE.Mesh(G.box,M("#a16207"));stm.scale.set(0.06,0.4,0.06);stm.position.y=-0.85;g.add(stm)}
 else if(kind==="wastra"){["#b91c1c","#facc15","#1e3a8a"].forEach(function(c,k){var cl=new THREE.Mesh(G.box,new THREE.MeshLambertMaterial({color:new THREE.Color(c),emissive:new THREE.Color(c).multiplyScalar(.25)}));cl.scale.set(0.9,0.22,0.7);cl.position.y=-0.25+k*0.24;g.add(cl)})}
 else if(kind==="prangko"){var pa=new THREE.Mesh(G.box,new THREE.MeshLambertMaterial({color:0xffffff,emissive:0x555555}));pa.scale.set(0.85,1.05,0.05);g.add(pa);var pi=new THREE.Mesh(G.box,new THREE.MeshLambertMaterial({color:0x3b82f6,emissive:0x0b2a66}));pi.scale.set(0.62,0.8,0.06);g.add(pi);var ps=new THREE.Mesh(G.box,MB("#facc15"));ps.scale.set(0.3,0.3,0.07);g.add(ps)}
 else{B(0.9,1.15,0.3,BOOK_COL[i%6],0,0,0,g);B(0.8,1.05,0.32,"#fffde7",0.04,0,0,g);B(0.12,1.15,0.31,"#1f2937",-0.42,0,0,g)}
 var halo=new THREE.Mesh(new THREE.RingGeometry(0.7,1.0,24),new THREE.MeshBasicMaterial({color:0xfff176,transparent:true,opacity:.5,side:THREE.DoubleSide,depthWrite:false}));halo.rotation.x=-Math.PI/2;halo.position.y=-1.05;g.add(halo);
 var y0=groundAt(p[0],p[1])+1.4;g.position.set(p[0],y0,p[1]);g.userData.dyn=true;scene.add(g);books.push({g:g,y0:y0,x:p[0],z:p[1],t:0,kind:kind})})}

/* =================================================================
   MISI
   ================================================================= */
function dailyN(){return P.stats.daily.d===today()?P.stats.daily.n:0}
var MISSIONS=[
 {id:"m1",ic:"🏫",nama:"Langkah Pertama",desc:"Selesaikan kuis di satu gedung mapel",target:function(){return 1},get:function(){return Object.keys(P.stats.done).length},reward:50},
 {id:"m3",ic:"📖",nama:"Kolektor Buku",desc:"Kumpulkan 10 Buku Ilmu yang tersebar di kota",target:function(){return 10},get:function(){return P.stats.books},reward:80},
 {id:"m10",ic:"📺",nama:"Pelajar Teliti",desc:"Pelajari materi di Ruang Materi gedung mapel",target:function(){return Math.min(3,totalMateri())},get:function(){return readCount()},reward:90,hide:function(){return totalMateri()===0}},
 {id:"m4",ic:"💬",nama:"Penolong Warga",desc:"Bantu 3 warga menjawab pertanyaan dengan benar",target:function(){return 3},get:function(){return P.stats.helped},reward:100},
 {id:"m5",ic:"🔥",nama:"Combo Api",desc:"Jawab 5 soal benar berturut-turut",target:function(){return 5},get:function(){return P.stats.maxCombo},reward:100},
 {id:"m2",ic:"🗺️",nama:"Penjelajah Kota",desc:"Selesaikan kuis di semua gedung mapel",target:function(){return data.mapel.length},get:function(){return data.mapel.filter(function(m){return P.stats.done[m.id]}).length},reward:200},
 {id:"m6",ic:"💯",nama:"Nilai Sempurna",desc:"Raih nilai 100 di satu gedung",target:function(){return 1},get:function(){return P.stats.perfect},reward:150},
 {id:"m9",ic:"🤝",nama:"Sahabat Warga",desc:"Bantu warga sebanyak 10 kali",target:function(){return 10},get:function(){return P.stats.helped},reward:200},
 {id:"m7",ic:"🧠",nama:"Pelajar Rajin",desc:"Jawab total 50 soal dengan benar",target:function(){return 50},get:function(){return P.stats.correct},reward:250},
 {id:"m8",ic:"⭐",nama:"Bintang Kota",desc:"Capai Level 5",target:function(){return 5},get:function(){return P.level},reward:300},
 {id:"m11",ic:"💎",nama:"Kristal Bintang",desc:"Kumpulkan 10 Kristal Bintang di dunia Angkasa",target:function(){return 10},get:function(){return P.stats.kristal||0},reward:100,hide:function(){return!P.stats.angkasa}},
 {id:"m12",ic:"🪐",nama:"Penjelajah Tata Surya",desc:"Kunjungi Stasiun Orbit, Bulan, dan Mars",target:function(){return ZONE_ORDER.length},get:function(){return ZONE_ORDER.filter(function(z){return(P.stats.zones||{})[z]}).length},reward:200,hide:function(){return!P.stats.angkasa}},
 {id:"m13",ic:"🔭",nama:"Ilmuwan Cilik",desc:"Baca 6 papan \"Tahukah kamu?\" di dunia Angkasa",target:function(){return 6},get:function(){return Object.keys(P.stats.facts||{}).filter(function(k){return ZONE_ORDER.indexOf(k.split(":")[0])>=0}).length},reward:120,hide:function(){return!P.stats.angkasa}},
 {id:"d1",ic:"📅",daily:true,nama:"Misi Harian",desc:"Jawab 10 soal benar hari ini",target:function(){return 10},get:dailyN,reward:60}
];
function totalMateri(){var n=0;data.mapel.forEach(function(m){n+=(m.materi||[]).length});return n}
function readCount(){var n=0;data.mapel.forEach(function(m){(m.materi||[]).forEach(function(t,i){if(P.stats.read[m.id+":"+i])n++})});return n}
function vis(){return MISSIONS.filter(function(m){return!m.hide||!m.hide()})}
function mkey(m){return m.daily?m.id+"@"+today():m.id}
function mState(m){var t=m.target(),g=Math.min(m.get(),t);return{t:t,g:g,done:g>=t,claimed:!!P.claimed[mkey(m)]}}
function checkMissions(){var any=false;vis().forEach(function(m){var s=mState(m),k=mkey(m);if(s.done&&!s.claimed){any=true;if(!P.notified[k]){P.notified[k]=1;toast("🎯 Misi selesai: "+m.nama+"! Klaim di Papan Misi",3200);SFX.win()}}});$("misiDot").classList.toggle("on",any);updTracker();save()}
function updTracker(){var cur=null;var VL=vis();for(var i=0;i<VL.length;i++){var s=mState(VL[i]);if(!s.claimed){cur={m:VL[i],s:s};break}}
 if(!cur){$("tkN").textContent="Semua misi selesai! 🏆";$("tkD").textContent="Tunggu misi harian besok";$("tkP").style.width="100%";return}
 $("tkN").textContent=cur.m.ic+" "+cur.m.nama;$("tkD").textContent=cur.s.done?"✅ Selesai! Ketuk untuk klaim 🪙"+cur.m.reward:cur.m.desc+" ("+cur.s.g+"/"+cur.s.t+")";$("tkP").style.width=(cur.s.g/cur.s.t*100)+"%"}
function claim(id){var m=MISSIONS.filter(function(x){return x.id===id})[0];var s=mState(m);if(!s.done||s.claimed)return;P.claimed[mkey(m)]=1;addCoins(m.reward);addXp(40);SFX.coin();toast("🪙 +"+m.reward+" koin dari misi "+m.nama);checkMissions();renderMisi()}

/* =================================================================
   PROGRES
   ================================================================= */
function addCoins(n){P.coins+=n;hud()}
function addXp(n){P.xp+=n;var up=0;while(P.xp>=need(P.level)){P.xp-=need(P.level);P.level++;up++}
 if(up){var bonus=20*P.level;P.coins+=bonus;setTimeout(function(){SFX.lvl();toast("⬆️ Naik ke Level "+P.level+"! Bonus 🪙"+bonus,3200);var un=ITEMS.filter(function(i){return i.lv===P.level});if(un.length)toast("🔓 Item baru terbuka: "+un.map(function(i){return i.nama}).join(", "),3600)},400)}
 hud();return up}
function hud(){var top=iv(P.outfit.atasan,{c:"#2e7df6"});$("hName").textContent=P.name||"Pemain";$("hAv").textContent=(P.name||"?").charAt(0).toUpperCase();$("hAv").style.background=top.c;$("hAv").style.color=(top.c==="#f5f5f5"||top.c==="#fafafa"||top.c==="#facc15")?"#1f2550":"#fff";
 $("hLv").textContent=P.level;$("hXpT").textContent=P.xp+"/"+need(P.level);$("hXp").style.width=Math.min(100,P.xp/need(P.level)*100)+"%";$("hCoin").textContent=P.coins;$("lCoin").textContent=P.coins}

/* =================================================================
   STATE
   ================================================================= */
var mode="landing";/* landing | lemari | play | menu */
var pos=new THREE.Vector3(0,0.3,-6),vy=0,onGround=true,walk=0,avatar=null,avTag=null,heading=0;
var yaw=Math.PI,pitch=0.32,camDist=11,camWant=11,camOcc=99,FOG0={n:110,f:330},camPos=new THREE.Vector3(0,30,-80),camLook=new THREE.Vector3();
function rebuildAvatar(){var ry=avatar?avatar.rotation.y:0;if(avatar)scene.remove(avatar);avatar=buildAvatar(P.outfit);avTag=nameTag(P.name||"Pemain",iv(P.outfit.atasan,{c:"#fff"}).c,1.7);avTag.position.set(0,5.7,0);avatar.add(avTag);avatar.rotation.y=ry;avatar.position.copy(pos);avatar.userData.dyn=true;scene.add(avatar);avatar.visible=mode!=="landing";rtOutfit()}
function setMode(m){mode=m;$("act").style.display="none"}

/* =================================================================
   INPUT
   ================================================================= */
var keys={},joy={x:0,y:0},jumpReq=false;
function typing(e){var t=e.target&&e.target.tagName;return t==="INPUT"||t==="TEXTAREA"||t==="SELECT"}
window.addEventListener("keydown",function(e){if(typing(e))return;keys[e.code]=true;
 if(e.code==="Space"&&mode==="play"){jumpReq=true;e.preventDefault()}
 if(e.code==="KeyE"&&mode==="play"&&curInter)doInter(curInter);
 if(e.code==="KeyM"&&mode==="play")openMisi();
 if(e.code==="Escape"){closeTop()}
 if(mode==="quiz"&&!Q.locked&&/^Digit[1-4]$/.test(e.code)){var b=$("qOpts").children[+e.code.slice(5)-1];if(b)b.click()}
 if(mode==="quiz"&&Q.locked&&(e.code==="Enter"||e.code==="Space")){$("qNext").click();e.preventDefault()}});
window.addEventListener("keyup",function(e){keys[e.code]=false});
window.addEventListener("blur",function(){keys={}});
var drag=null,ptrs={},pinch=null;
/* 🔭 batas zoom: lebih jauh di dunia biasa, terbatas di lobi/arena; HP lebih jauh karena layarnya sempit */
function zInLomba(){return!!((typeof ARENA!=="undefined"&&ARENA)||(typeof LOBI!=="undefined"&&LOBI)||(typeof DROP!=="undefined"&&DROP))}
function zMax(){if(zInLomba())return 34;var m=(isTouch||window.innerWidth<700)?80:70;return lowGfx?Math.min(m,48):m}
function zSet(v){camWant=Math.max(5,Math.min(zMax(),v))}
/* dua jari di layar = cubit untuk zoom kamera (seperti roda mouse di laptop) */
function pinchDist(){var k=Object.keys(ptrs);if(k.length<2)return 0;var a=ptrs[k[0]],b=ptrs[k[1]];return Math.hypot(a.x-b.x,a.y-b.y)}
canvas.addEventListener("pointerdown",function(e){ptrs[e.pointerId]={x:e.clientX,y:e.clientY};try{canvas.setPointerCapture(e.pointerId)}catch(_){}
 if(Object.keys(ptrs).length>=2){drag=null;pinch={d:pinchDist(),c:camWant}}else drag={id:e.pointerId,x:e.clientX,y:e.clientY}});
canvas.addEventListener("pointermove",function(e){if(ptrs[e.pointerId]){ptrs[e.pointerId].x=e.clientX;ptrs[e.pointerId].y=e.clientY}
 if(pinch){var d=pinchDist();if(d>0&&pinch.d>0){zSet(pinch.c*pinch.d/d)}return}
 if(!drag||drag.id!==e.pointerId)return;var dx=e.clientX-drag.x,dy=e.clientY-drag.y;drag.x=e.clientX;drag.y=e.clientY;
 if(mode==="lemari"&&avatar){avatar.rotation.y+=dx*0.012;return}
 yaw-=dx*0.006;pitch=Math.max(0.05,Math.min(1.15,pitch+dy*0.005))});
function endDrag(e){delete ptrs[e.pointerId];if(Object.keys(ptrs).length<2)pinch=null;if(drag&&drag.id===e.pointerId)drag=null}
canvas.addEventListener("pointerup",endDrag);canvas.addEventListener("pointercancel",endDrag);
canvas.addEventListener("wheel",function(e){zSet(camWant*(1+Math.max(-0.25,Math.min(0.25,e.deltaY*0.0012))))},{passive:true});
/* cadangan cubit lewat touch event (untuk browser di dalam aplikasi seperti WhatsApp yang kadang tidak mengirim pointer jari kedua) */
var tPinch=null,tDist=function(t){return Math.hypot(t[0].clientX-t[1].clientX,t[0].clientY-t[1].clientY)};
canvas.addEventListener("touchstart",function(e){if(e.touches.length>=2)tPinch={d:tDist(e.touches),c:camWant}},{passive:true});
canvas.addEventListener("touchmove",function(e){if(!tPinch||pinch||e.touches.length<2)return;var d=tDist(e.touches);if(d>0&&tPinch.d>0)zSet(tPinch.c*tPinch.d/d)},{passive:true});
canvas.addEventListener("touchend",function(e){if(e.touches.length<2)tPinch=null},{passive:true});canvas.addEventListener("touchcancel",function(){tPinch=null},{passive:true});
/* tombol ＋ / － zoom di layar HP: tekan sekali atau tahan */
(function(){var zt=null,stop=function(){clearInterval(zt);zt=null};Array.prototype.forEach.call(document.querySelectorAll("#zoomB button"),function(b){var dir=+b.dataset.z;
 b.addEventListener("pointerdown",function(e){e.preventDefault();e.stopPropagation();stop();var f=function(){zSet(camWant*(1+dir*0.05))};f();zt=setInterval(f,60)});
 ["pointerup","pointercancel","pointerleave"].forEach(function(ev){b.addEventListener(ev,stop)})})})();
var joyEl=$("joy"),knob=$("knob"),joyId=null;
joyEl.addEventListener("pointerdown",function(e){joyId=e.pointerId;try{joyEl.setPointerCapture(e.pointerId)}catch(_){}moveJoy(e);e.preventDefault()});
joyEl.addEventListener("pointermove",function(e){if(e.pointerId===joyId)moveJoy(e)});
function endJoy(e){if(e.pointerId===joyId){joyId=null;joy.x=joy.y=0;knob.style.left="38px";knob.style.top="38px"}}
joyEl.addEventListener("pointerup",endJoy);joyEl.addEventListener("pointercancel",endJoy);
function moveJoy(e){var r=joyEl.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),d=Math.hypot(dx,dy),m=48;if(d>m){dx=dx/d*m;dy=dy/d*m}knob.style.left=(38+dx)+"px";knob.style.top=(38+dy)+"px";joy.x=dx/m;joy.y=-dy/m}
$("jump").addEventListener("pointerdown",function(e){jumpReq=true;e.preventDefault()});
$("actBtn").addEventListener("click",function(){if(curInter)doInter(curInter)});

/* =================================================================
   FISIKA & INTERAKSI
   ================================================================= */
/* jarak kamera maksimum sebelum menabrak bangunan (kotak tabrakan dianggap setinggi ±8) */
function camBlock(x,y,z,yw,pt,dist){var dx=Math.sin(yw)*Math.cos(pt),dy=Math.sin(pt),dz=Math.cos(yw)*Math.cos(pt),best=99,lists=[COL,LOTCOL];
 for(var L=0;L<2;L++){var A=lists[L];for(var i=0;i<A.length;i++){var a=A[i];if(a.x2-a.x1<1.6||a.z2-a.z1<1.6)continue;
  var cx=(a.x1+a.x2)/2,cz=(a.z1+a.z2)/2;if(Math.abs(cx-x)>dist+30||Math.abs(cz-z)>dist+30)continue;
  if(x>a.x1&&x<a.x2&&z>a.z1&&z<a.z2)continue;
  var t0=0,t1=dist,ok=true,ax=[[x,dx,a.x1,a.x2],[z,dz,a.z1,a.z2]];
  for(var q=0;q<2&&ok;q++){var o=ax[q][0],d=ax[q][1],lo=ax[q][2],hi=ax[q][3];if(Math.abs(d)<1e-6){if(o<lo||o>hi)ok=false}else{var ta=(lo-o)/d,tb=(hi-o)/d;if(ta>tb){var tt=ta;ta=tb;tb=tt}t0=Math.max(t0,ta);t1=Math.min(t1,tb);if(t0>t1)ok=false}}
  if(ok&&t0<best&&y+dy*t0<8)best=t0}}
 return best<99?best-0.6:99}
function pushOut(p,r){
 var lists=[COL,LOTCOL];for(var L=0;L<2;L++){var A=lists[L];for(var i=0;i<A.length;i++){var a=A[i];if(p.x>a.x1-r&&p.x<a.x2+r&&p.z>a.z1-r&&p.z<a.z2+r){var dl=p.x-(a.x1-r),dr=(a.x2+r)-p.x,dt=p.z-(a.z1-r),db=(a.z2+r)-p.z,mn=Math.min(dl,dr,dt,db);if(mn===dl)p.x=a.x1-r;else if(mn===dr)p.x=a.x2+r;else if(mn===dt)p.z=a.z1-r;else p.z=a.z2+r}}}
 var cl=[CIRC,LOTCIRC];for(var C=0;C<2;C++){var A2=cl[C];for(var j=0;j<A2.length;j++){var c=A2[j],dx=p.x-c.x,dz=p.z-c.z,d=Math.hypot(dx,dz),rr2=c.r+r;if(d<rr2&&d>0.0001){p.x=c.x+dx/d*rr2;p.z=c.z+dz/d*rr2}}}
 for(var k=0;k<cars.length;k++){var cg=cars[k].g,len=cg.userData.len,ux=cars[k].ux||1,uz=cars[k].uz||0;
  var qx=p.x-cg.position.x,qz=p.z-cg.position.z,f=qx*ux+qz*uz,s=qx*uz-qz*ux,hl=len/2+r,hw=1.15+r;
  if(Math.abs(f)<hl&&Math.abs(s)<hw&&p.y<2.6){if(hl-Math.abs(f)<hw-Math.abs(s)){f=f<0?-hl:hl}else{s=s<0?-hw:hw}p.x=cg.position.x+f*ux+s*uz;p.z=cg.position.z+f*uz-s*ux}}
 if(CUR.r){var dd=Math.hypot(p.x,p.z);if(dd>CUR.r){p.x*=CUR.r/dd;p.z*=CUR.r/dd}}else{p.x=Math.max(-BOUND,Math.min(BOUND,p.x));p.z=Math.max(-BOUND,Math.min(BOUND,p.z))}
}
var curInter=null;
function findInter(){var best=null,bd=1e9;INTER.forEach(function(it){var d=Math.hypot(pos.x-it.x,pos.z-it.z);if(d<it.r&&d<bd){if(it.type==="npc"&&it.npc.cool>performance.now())return;best=it;bd=d}});return best}
function doInter(it){SFX.click();if(it.type==="peti"){petiOpen(it);return}if(it.type==="door"&&advLock(it.m)){toast("🔒 Gedung "+it.m.nama+" tidak dibuka di tantangan ini. Cari gedung mapel lain!",3000);return}if(it.type==="door"&&ZN&&!zoneIn(it.x,it.z)){toast("🌀 Gedung ini di luar zona aman. Masuk ke lingkaran biru dulu!",3000);return}if(GURU&&it.type==="door"){if((it.m.materi||[]).length){openGedung(it.m);$("gdQuiz").style.display="none"}else toast("👩‍🏫 Mode guru: gedung ini hanya berisi soal untuk murid.",3000);return}if(GURU&&it.type==="npc"){toast("👩‍🏫 Mode guru: pertanyaan warga hanya untuk murid.",3000);return}if(it.type==="door")openGedung(it.m);else if(it.type==="npc")openNpc(it.npc);else if(it.type==="board")openMisi();else if(it.type==="shop")openLemari(false);else if(it.type==="rocket")openZones(CUR.w);else if(it.type==="fact")openFact(it);else if(it.type==="dtk")dtkOpen(it.k)}

/* =================================================================
   LOOP
   ================================================================= */
var t0=performance.now(),frame=0,lowGfx=false;
function resize(){if(!renderer)return;var w=window.innerWidth,h=window.innerHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}
window.addEventListener("resize",resize);
function applyGfx(){if(!renderer)return;lowGfx=P.settings.gfx==="rendah";var dpr=window.devicePixelRatio||1;renderer.setPixelRatio(lowGfx?Math.min(dpr,1):Math.min(dpr,isTouch?1.5:2));renderer.shadowMap.enabled=!lowGfx;sun.castShadow=!lowGfx;
 scene.traverse(function(o){if(o.material){(Array.isArray(o.material)?o.material:[o.material]).forEach(function(m){m.needsUpdate=true})}});
 var en=ENVS[CUR.env||"kota"];FOG0.n=en.near*(lowGfx?.75:1);FOG0.f=en.far*(lowGfx?.75:1);scene.fog.near=FOG0.n;scene.fog.far=FOG0.f;resize();
 Array.prototype.forEach.call(document.querySelectorAll("[data-gfx]"),function(b){b.className="btn sm "+(b.dataset.gfx===P.settings.gfx?"yel":"gray")})}
function loop(now){
 requestAnimationFrame(loop);
 var dt=Math.min((now-t0)/1000,0.05);t0=now;frame++;if(mode==="pause")dt=0;
 clouds.forEach(function(c){c.position.x+=c.userData.sp*dt*2;if(c.position.x>260)c.position.x=-260});
 if(water)water.material.opacity=0.8+Math.sin(now/500)*0.06;
 drops.forEach(function(d){d.t=(d.t+dt*0.9)%1;var r=d.t*2.6,h=Math.sin(d.t*Math.PI)*1.6;d.m.position.set(Math.sin(d.a)*r,3.3+h-d.t*1.2,Math.cos(d.a)*r)});
 if(flag)flag.rotation.y=Math.sin(now/700)*0.25;
 animated.forEach(function(f){f(now)});
 schools.forEach(function(s,i){s.portal.material.opacity=0.65+Math.sin(now/350+i)*0.15;s.glow.material.opacity=0.25+Math.sin(now/350+i)*0.12});
 books.forEach(function(b){if(b.t>now){b.g.visible=false;return}b.g.visible=true;b.g.rotation.y+=dt*1.8;b.g.position.y=b.y0+Math.sin(now/400+b.x)*0.25;
  if(mode==="play"&&!GURU&&Math.hypot(pos.x-b.x,pos.z-b.z)<1.7&&Math.abs(pos.y-b.y0)<3){b.t=now+120000;var kk=KOL[b.kind]||KOL.buku,kn=kolAdd(b.kind);toast(kk.ic+" "+kk.nama+" ditemukan! +5 koin ("+kn+")");addCoins(5);addXp(5);SFX.coin();checkMissions()}});
 cars.forEach(function(c){placeCar(c,dt)});
 rtTick(dt,now);if(ZN)zoneFrame(dt,now);if(ARENA)arenaTick(dt);if(DTK)dtkTick();
 npcs.forEach(function(n){var near=avatar&&Math.hypot(pos.x-n.d.x,pos.z-n.d.z)<7&&mode!=="landing";
  if(near){var ta=Math.atan2(pos.x-n.d.x,pos.z-n.d.z),d=ta-n.g.rotation.y;while(d>Math.PI)d-=Math.PI*2;while(d<-Math.PI)d+=Math.PI*2;n.g.rotation.y+=d*Math.min(1,dt*5)}
  animAvatar(n.g,false,0,false,now+n.phase*1000,near&&n.cool<now);n.mk.visible=n.cool<now;n.mk.position.y=7.3+Math.sin(now/300+n.phase)*0.25});

 if(avatar){
  var moving=false;
  if(mode==="play"&&ARENA&&ARENA.kind==="lk"){moving=lkMove(dt);curInter=null;$("act").style.display="none"}
  else if(mode==="play"){
   var ix=(keys.KeyD||keys.ArrowRight?1:0)-(keys.KeyA||keys.ArrowLeft?1:0)+joy.x,iy=(keys.KeyW||keys.ArrowUp?1:0)-(keys.KeyS||keys.ArrowDown?1:0)+joy.y;
   var len=Math.hypot(ix,iy);if(len>1){ix/=len;iy/=len;len=1}
   moving=len>0.08;
   var run=keys.ShiftLeft||keys.ShiftRight||len>0.95&&isTouch;
   if(moving){var fx=-Math.sin(yaw),fz=-Math.cos(yaw),rx=Math.cos(yaw),rz=-Math.sin(yaw),mx=fx*iy+rx*ix,mz=fz*iy+rz*ix,sp=(run?15:9)*Math.min(1,len*1.2);
    if(CUR.swim&&!ARENA)sp*=0.85;if(ZN&&ZN.out)sp*=0.6;pos.x+=mx*sp*dt;pos.z+=mz*sp*dt;heading=Math.atan2(mx,mz);walk+=dt*(run?14:10)}
   else walk*=0.85;
   if(jumpReq&&(onGround||CUR.swim&&!ARENA&&vy<2.5&&pos.y<16)){vy=ARENA?10.5:CUR.jv;onGround=false;SFX.jump()}jumpReq=false;
   vy-=(ARENA?30:CUR.g)*dt;if(CUR.swim&&!ARENA&&vy<-3.5)vy=-3.5;if(DROP)dropTick(dt);pos.y+=vy*dt;var gy=groundAt(pos.x,pos.z);if(pos.y<=gy){pos.y=gy;vy=0;onGround=true}else if(pos.y-gy>0.05&&vy<0&&onGround&&pos.y-gy<0.4){pos.y=gy}
   if(!LOBI&&!ARENA&&!(DROP&&pos.y>8))pushOut(pos,0.6);lobiClamp();if(ARENA)arenaClamp();
   curInter=LOBI||DROP||ARENA?null:findInter();
   if(curInter){$("act").style.display="block";$("actBtn").innerHTML=(isTouch?"":"<kbd>E</kbd> ")+esc(curInter.label)}else $("act").style.display="none";
  }
  if(mode==="lemari")avatar.rotation.y+=dt*0.4;
  else{var dr=heading-avatar.rotation.y;while(dr>Math.PI)dr-=Math.PI*2;while(dr<-Math.PI)dr+=Math.PI*2;avatar.rotation.y+=dr*Math.min(1,dt*12)}
  avatar.position.set(pos.x,pos.y+(moving&&onGround?Math.abs(Math.sin(walk))*0.08:0),pos.z);
  animAvatar(avatar,moving&&onGround,walk,!onGround,now,false);
 }
 /* kamera */
 var tgt=new THREE.Vector3(),cp=new THREE.Vector3(),k=1-Math.pow(0.0015,dt);
 if(mode==="landing"){var a=now/9000;cp.set(Math.sin(a)*82,38,Math.cos(a)*82);tgt.set(0,4,0);k=1-Math.pow(0.2,dt)}
 else if(mode==="lemari"){var wide=window.innerWidth>760,ly=yaw,dd=wide?7:9.5;cp.set(pos.x+Math.sin(ly)*dd,pos.y+2.6,pos.z+Math.cos(ly)*dd);var rxv=Math.cos(ly),rzv=-Math.sin(ly);
  tgt.set(pos.x+(wide?rxv*2.1:0),pos.y+(wide?1.7:-0.6),pos.z+(wide?rzv*2.1:0))}
 else if(ARENA&&ARENA.kind==="lk"){var LA=ARENA,por=window.innerWidth<window.innerHeight,fv=por?74:62;if(Math.abs(camera.fov-fv)>0.5){camera.fov=fv;camera.updateProjectionMatrix()}
  cp.set(LA.O.x+(LA.lx-LA.O.x)*0.5,pos.y+(por?8.2:6.6),pos.z+(por?12.5:10));tgt.set(LA.O.x+(LA.lx-LA.O.x)*0.7,pos.y+1,pos.z-14);k=1-Math.pow(0.000001,dt)}
 else{if(camWant>zMax())camWant=zMax();camDist+=(camWant-camDist)*Math.min(1,dt*9);
  var lomba=zInLomba(),zs=lomba?0:Math.max(0,Math.min(1,(camDist-13)/(zMax()-13))),pe=pitch+(Math.max(pitch,1.2)-pitch)*Math.min(1,zs*1.6)*Math.min(1,zs*1.6)*(3-2*Math.min(1,zs*1.6)),cd=camDist;
  /* kamera maju bila terhalang gedung (dicek tiap 3 frame, hanya di dunia biasa) */
  if(!lomba&&frame%3===0){var occ=camBlock(pos.x,pos.y+2.2,pos.z,yaw,pe,camDist);camOcc=occ<camOcc?occ:Math.min(99,camOcc+dt*3*12)}else if(lomba)camOcc=99;
  if(camOcc<cd)cd=Math.max(4,camOcc);
  tgt.set(pos.x,pos.y+2.2,pos.z);cp.set(pos.x+Math.sin(yaw)*Math.cos(pe)*cd,pos.y+2.2+Math.sin(pe)*cd,pos.z+Math.cos(yaw)*Math.cos(pe)*cd);if(cp.y<0.8)cp.y=0.8;
  /* kabut menjauh saat zoom out agar pemandangan jauh terlihat */
  var fz=lomba?0:Math.max(0,camDist-13);if(!CUR.swim){scene.fog.near=FOG0.n+fz*2.6;scene.fog.far=FOG0.f+fz*5.5}}
 camPos.lerp(cp,k);camLook.lerp(tgt,k);camera.position.copy(camPos);camera.lookAt(camLook);
 sky.position.copy(camera.position);stars.position.copy(camera.position);sunDisc.position.set(camera.position.x+200,camera.position.y+260,camera.position.z+120);sunDisc.lookAt(camera.position);
 var fc=mode==="landing"?new THREE.Vector3(0,0,0):pos;sun.position.set(fc.x+40,70,fc.z+25);sun.target.position.set(fc.x,0,fc.z);
 if(frame%4===0&&$("mm").classList.contains("on"))drawMinimap();
 if(renderer)renderer.render(scene,camera);
}

/* =================================================================
   MINIMAP
   ================================================================= */
var mmBase=null;
function mmXY(x,z){return[(x+BOUND)/(BOUND*2)*280,(z+BOUND)/(BOUND*2)*280]}
function drawMinimapBase(){var c=document.createElement("canvas");c.width=c.height=280;var g=c.getContext("2d");
 if(CUR.w!=="kota"){var bgc=ZONES[CUR.z].mm||["#222","#666"];g.fillStyle=bgc[0];g.fillRect(0,0,280,280);var o=mmXY(0,0);g.fillStyle=bgc[1];g.beginPath();g.arc(o[0],o[1],CUR.r/(BOUND*2)*280,0,7);g.fill();
  LOTCOL.concat(COL).forEach(function(a){var p=mmXY(a.x1,a.z1),q=mmXY(a.x2,a.z2);g.fillStyle="rgba(255,255,255,.35)";g.fillRect(p[0],p[1],q[0]-p[0],q[1]-p[1])});
  schools.forEach(function(s){var p=mmXY(s.g.position.x,s.g.position.z);g.fillStyle=s.m.warna;g.beginPath();g.arc(p[0],p[1],6/(BOUND*2)*280,0,7);g.fill()});
  INTER.forEach(function(it){if(it.type!=="rocket")return;var p=mmXY(it.x,it.z+3.6);g.fillStyle="#fbbf24";g.beginPath();g.arc(p[0],p[1],5,0,7);g.fill()});mmBase=c;return}
 g.fillStyle="#5d9e4c";g.fillRect(0,0,280,280);
 g.fillStyle="#cdc6b6";BLK.forEach(function(bx){BLK.forEach(function(bz){var p=mmXY(bx-15,bz-15);g.fillRect(p[0],p[1],30/176*280,30/176*280)})});
 g.fillStyle="#555";ROADS.forEach(function(r){var a=mmXY(r-4,-61),b=mmXY(r+4,61);g.fillRect(a[0],a[1],b[0]-a[0],b[1]-a[1]);a=mmXY(-61,r-4);b=mmXY(61,r+4);g.fillRect(a[0],a[1],b[0]-a[0],b[1]-a[1])});
 LOTCOL.forEach(function(a){var p=mmXY(a.x1,a.z1),q=mmXY(a.x2,a.z2);g.fillStyle="#9e9e9e";g.fillRect(p[0],p[1],q[0]-p[0],q[1]-p[1])});
 schools.forEach(function(s){var p=mmXY(s.g.position.x-5.5,s.g.position.z-5),q=mmXY(s.g.position.x+5.5,s.g.position.z+5);g.fillStyle=s.m.warna;g.fillRect(p[0],p[1],q[0]-p[0],q[1]-p[1])});
 var pd=mmXY(-75,0);g.fillStyle="#3fa9e8";g.beginPath();g.ellipse(pd[0],pd[1],9/176*280,12.6/176*280,0,0,7);g.fill();
 var f=mmXY(-17,64),f2=mmXY(17,86);g.fillStyle="#3f9b3a";g.fillRect(f[0],f[1],f2[0]-f[0],f2[1]-f[1]);
 var fo=mmXY(0,0);g.fillStyle="#4fc3f7";g.beginPath();g.arc(fo[0],fo[1],5,0,7);g.fill();
 mmBase=c}
function drawMinimap(){var g=$("mm").getContext("2d");if(!mmBase)return;
 /* peta berputar mengikuti kamera */
 g.save();g.clearRect(0,0,280,280);g.beginPath();g.arc(140,140,138,0,7);g.clip();g.fillStyle="#2d5a27";g.fillRect(0,0,280,280);
 g.translate(140,140);g.rotate(yaw);var me=mmXY(pos.x,pos.z);var S=2.2;g.scale(S,S);g.translate(-me[0],-me[1]);
 g.drawImage(mmBase,0,0);
 books.forEach(function(b){if(b.t>performance.now())return;var p=mmXY(b.x,b.z);g.fillStyle="#fff176";g.fillRect(p[0]-2,p[1]-2,4,4)});
 npcs.forEach(function(n){if(n.cool>performance.now())return;var p=mmXY(n.d.x,n.d.z);g.fillStyle="#fbbf24";g.beginPath();g.arc(p[0],p[1],3,0,7);g.fill();g.strokeStyle="#3a2600";g.lineWidth=1;g.stroke()});
 cars.forEach(function(c){var p=mmXY(c.g.position.x,c.g.position.z);g.fillStyle="#fff";g.fillRect(p[0]-1.5,p[1]-1.5,3,3)});
 g.restore();
 g.save();g.translate(140,140);g.rotate(Math.PI-heading+yaw);g.fillStyle="#fff";g.strokeStyle="#1f2550";g.lineWidth=3;g.beginPath();g.moveTo(0,-11);g.lineTo(8,8);g.lineTo(0,4);g.lineTo(-8,8);g.closePath();g.fill();g.stroke();g.restore();
 g.strokeStyle="rgba(255,255,255,.5)";g.lineWidth=4;g.beginPath();g.arc(140,140,136,0,7);g.stroke();
 g.fillStyle="#fff";g.font="bold 20px sans-serif";g.textAlign="center";
 /* penanda utara */
 g.fillText("U",140+Math.sin(yaw)*118,140-Math.cos(yaw)*118+7)}

/* =================================================================
   🕵️ DETEKTIF KOTA ILMU (literasi): baca teks di lokasi, jawab soal
   pemahaman untuk mendapat petunjuk, lalu simpulkan siapa pelakunya.
   ================================================================= */
var DTK_SKILL={tersurat:"Informasi tersurat",tersirat:"Menyimpulkan (tersirat)",opini:"Fakta & opini",pokok:"Ide pokok & tujuan teks",kata:"Makna kata",sebab:"Sebab-akibat & urutan",hoaks:"Literasi digital"};
var DTK_CASES=[
 {id:"piala",ic:"🏆",judul:"Misteri Piala yang Hilang",lv:"SD kelas 4–6",
  intro:"Piala juara cerdas cermat hilang dari lemari kaca ruang guru! Kepala Sekolah meminta bantuanmu. Datangi 4 lokasi 🔍, baca setiap teks dengan teliti, dan kumpulkan petunjuk. Setelah itu, tentukan siapa yang membawa piala.",
  attrs:{sepatu:"Sepatu",tas:"Tas",tugas:"Tugas hari Selasa",inisial:"Inisial"},
  tersangka:[{nama:"Dodi",ic:"👦",a:{sepatu:"merah",tas:"biru",tugas:"petugas kebersihan",inisial:"D"}},
   {nama:"Dewi",ic:"👧",a:{sepatu:"hitam",tas:"biru",tugas:"petugas kebersihan",inisial:"D"}},
   {nama:"Rina",ic:"👧",a:{sepatu:"merah",tas:"hijau",tugas:"latihan menari",inisial:"R"}},
   {nama:"Bima",ic:"👦",a:{sepatu:"merah",tas:"biru",tugas:"latihan menari",inisial:"B"}}],
  pelaku:0,
  petunjuk:[
   {ic:"📋",nama:"Papan Pengumuman",sumber:"Pengumuman sekolah",teks:"PENGUMUMAN. Piala juara lomba cerdas cermat disimpan di lemari kaca ruang guru pada hari Senin. Pada Selasa siang, piala itu tidak ada di tempatnya. Lemari tidak rusak sedikit pun. Siapa pun yang mengetahui keberadaan piala, harap melapor kepada Kepala Sekolah.",
    soal:[{q:"Kapan piala diketahui tidak ada di tempatnya?",opsi:["Senin pagi","Selasa siang","Rabu sore","Minggu malam"],jawab:1,bahas:"Teks menyebut: \"Pada Selasa siang, piala itu tidak ada di tempatnya.\"",skill:"tersurat"},
     {q:"Lemari tidak rusak sedikit pun. Apa yang paling tepat disimpulkan?",opsi:["Lemari dibuka paksa","Lemari dibuka dengan kunci","Piala jatuh sendiri","Piala tidak pernah disimpan"],jawab:1,bahas:"Kalau lemari tidak rusak, berarti lemari dibuka dengan cara biasa, yaitu memakai kunci.",skill:"tersirat"}],
    clue:"Lemari dibuka dengan kunci, bukan dirusak.",c:{}},
   {ic:"🧑‍🔧",nama:"Pak Bento (penjaga)",sumber:"Kesaksian penjaga sekolah",teks:"\"Selasa pukul sebelas, saya melihat seorang anak bersepatu merah keluar dari ruang guru sambil membawa tas biru. Menurut saya, anak itu kelihatan terburu-buru.\"",
    soal:[{q:"Kalimat yang berupa OPINI adalah ...",opsi:["Saya melihat seorang anak keluar dari ruang guru.","Anak itu bersepatu merah.","Menurut saya, anak itu kelihatan terburu-buru.","Anak itu membawa tas biru."],jawab:2,bahas:"Opini adalah pendapat pribadi. Ciri katanya: \"menurut saya\". Kalimat lain adalah fakta yang dilihat langsung.",skill:"opini"},
     {q:"Warna tas yang dibawa anak itu adalah ...",opsi:["merah","hijau","biru","hitam"],jawab:2,bahas:"Pak Bento berkata anak itu \"membawa tas biru\". Merah adalah warna sepatunya.",skill:"tersurat"}],
    clue:"Anak yang keluar dari ruang guru bersepatu merah dan membawa tas biru.",c:{sepatu:"merah",tas:"biru"}},
   {ic:"🗓️",nama:"Jadwal di Dinding",sumber:"Jadwal kegiatan",teks:"JADWAL SELASA. Pukul 10.00–12.00: kelas 6 latihan menari di aula. Pukul 10.30–11.30: petugas kebersihan kelas 5 membersihkan ruang guru. Pukul 11.30: kunci ruang guru dikembalikan kepada Pak Bento.",
    soal:[{q:"Siapa yang berada di ruang guru pada pukul 11.00?",opsi:["Kelas 6 yang latihan menari","Petugas kebersihan kelas 5","Kepala Sekolah","Tidak ada siapa pun"],jawab:1,bahas:"Petugas kebersihan bertugas pukul 10.30–11.30, jadi pukul 11.00 mereka ada di ruang guru.",skill:"tersurat"},
     {q:"Latihan menari berlangsung di aula pukul 10.00–12.00. Artinya, penari kelas 6 ...",opsi:["kemungkinan tidak berada di ruang guru pukul 11","pasti berada di ruang guru","sedang libur","ikut membersihkan ruang guru"],jawab:0,bahas:"Penari sedang berada di aula, jadi kemungkinan besar mereka tidak di ruang guru pada pukul 11.",skill:"tersirat"}],
    clue:"Pukul 11.00, yang bertugas di ruang guru adalah petugas kebersihan.",c:{tugas:"petugas kebersihan"}},
   {ic:"✉️",nama:"Surat Kecil",sumber:"Surat yang ditemukan",teks:"\"Pak Bento, kuncinya sudah saya kembalikan. Si kuning berkilau saya bawa pulang dulu untuk digosok supaya mengilap saat upacara hari Senin. — D\"",
    soal:[{q:"\"Si kuning berkilau\" dalam surat itu maksudnya ...",opsi:["kunci","piala","sepatu","tas"],jawab:1,bahas:"Benda kuning berkilau yang digosok agar mengilap untuk upacara adalah piala.",skill:"kata"},
     {q:"Penulis surat berinisial ...",opsi:["B","R","D","S"],jawab:2,bahas:"Di akhir surat tertulis \"— D\".",skill:"tersurat"}],
    clue:"Penulis surat berinisial D dan membawa piala pulang untuk digosok.",c:{inisial:"D"}}],
  akhir:"Dodi, petugas kebersihan, membawa piala pulang untuk digosok sebelum upacara, tetapi lupa meminta izin. Piala kembali dan makin mengilap!",pesan:"Selalu minta izin sebelum meminjam barang milik orang lain."},
 {id:"pohon",ic:"🌳",judul:"Penanam Pohon Misterius",lv:"SD kelas 3–5",
  intro:"Lima pohon mangga muda tiba-tiba tumbuh di Taman Kota! Wali kota ingin memberi penghargaan kepada penanamnya, tetapi tidak ada yang tahu siapa dia. Kumpulkan petunjuk dari 4 lokasi 🔍, lalu temukan sang Pahlawan Hijau.",
  attrs:{alat:"Alat yang dibawa",waktu:"Waktu bermain di taman",seragam:"Kegiatan"},
  tersangka:[{nama:"Ayu",ic:"👧",a:{alat:"sekop",waktu:"sore",seragam:"Pramuka"}},
   {nama:"Beni",ic:"👦",a:{alat:"ember",waktu:"sore",seragam:"Pramuka"}},
   {nama:"Cici",ic:"👧",a:{alat:"sekop",waktu:"pagi",seragam:"Pramuka"}},
   {nama:"Doni",ic:"👦",a:{alat:"sekop",waktu:"sore",seragam:"klub sepak bola"}}],
  pelaku:0,
  petunjuk:[
   {ic:"📰",nama:"Koran Kota Ilmu",sumber:"Berita koran",teks:"Warga Kota Ilmu dikejutkan oleh lima pohon mangga muda yang tiba-tiba tumbuh di Taman Kota. Pohon-pohon itu ditanam dengan rapi dan diberi pagar bambu kecil. Sampai hari ini, belum ada yang tahu siapa penanamnya.",
    soal:[{q:"Ide pokok berita tersebut adalah ...",opsi:["Ada pohon mangga baru di Taman Kota yang penanamnya belum diketahui","Pagar bambu mudah dibuat","Warga Kota Ilmu suka makan mangga","Taman Kota akan ditutup"],jawab:0,bahas:"Seluruh berita membahas pohon mangga baru di Taman Kota dan penanamnya yang masih misteri.",skill:"pokok"},
     {q:"Berapa pohon yang ditanam?",opsi:["Tiga","Empat","Lima","Enam"],jawab:2,bahas:"Teks menyebut \"lima pohon mangga muda\".",skill:"tersurat"}],
    clue:"Penanamnya bekerja rapi dan memberi pagar bambu kecil.",c:{}},
   {ic:"🍧",nama:"Bu Sari (penjual es)",sumber:"Kesaksian penjual es",teks:"\"Kemarin sore, sekitar pukul empat, saya melihat seorang anak menggali tanah dengan sekop di dekat air mancur. Menurut saya, dia anak paling rajin di kota ini.\"",
    soal:[{q:"Kalimat yang berupa OPINI adalah ...",opsi:["Kemarin sore saya melihat seorang anak.","Anak itu menggali tanah dengan sekop.","Kejadiannya sekitar pukul empat.","Menurut saya, dia anak paling rajin di kota ini."],jawab:3,bahas:"\"Menurut saya ...\" adalah pendapat Bu Sari, bukan fakta yang bisa dibuktikan.",skill:"opini"},
     {q:"Alat apa yang dipakai anak itu?",opsi:["Ember","Sekop","Gunting","Sapu"],jawab:1,bahas:"Bu Sari melihat anak itu \"menggali tanah dengan sekop\".",skill:"tersurat"}],
    clue:"Penanam memakai sekop dan menanam pada sore hari.",c:{alat:"sekop",waktu:"sore"}},
   {ic:"🚿",nama:"Botol Penyiram",sumber:"Catatan di botol",teks:"\"Jangan lupa disiram setiap sore sepulang latihan baris-berbaris, ya! Salam tunas kelapa.\"",
    soal:[{q:"Salam \"tunas kelapa\" menunjukkan bahwa penulis adalah anggota ...",opsi:["klub sepak bola","Pramuka","paduan suara","klub sains"],jawab:1,bahas:"Tunas kelapa adalah lambang Pramuka. Latihan baris-berbaris juga kegiatan Pramuka.",skill:"tersirat"},
     {q:"Kata \"disiram\" dalam catatan itu artinya ...",opsi:["diberi air","dipotong","dicabut","dipindahkan"],jawab:0,bahas:"Menyiram tanaman berarti memberinya air.",skill:"kata"}],
    clue:"Penulis catatan adalah anggota Pramuka.",c:{seragam:"Pramuka"}},
   {ic:"🪧",nama:"Poster Balai Kota",sumber:"Poster ajakan",teks:"GERAKAN SATU ANAK SATU POHON! Ayo tanam pohon agar Kota Ilmu semakin sejuk dan hijau. Bibit gratis bisa diambil di Balai Kota setiap hari Sabtu.",
    soal:[{q:"Tujuan poster tersebut adalah ...",opsi:["Mengajak warga menanam pohon","Menjual bibit pohon","Memberi tahu jadwal libur","Melarang warga ke taman"],jawab:0,bahas:"Kata \"Ayo tanam pohon\" menunjukkan poster ini bertujuan mengajak.",skill:"pokok"},
     {q:"Di mana bibit gratis bisa diambil?",opsi:["Taman Kota","Sekolah","Balai Kota","Pasar"],jawab:2,bahas:"Teks menyebut bibit gratis diambil \"di Balai Kota\".",skill:"tersurat"}],
    clue:"Penanam ikut Gerakan Satu Anak Satu Pohon agar kota lebih sejuk.",c:{}}],
  akhir:"Ayu menanam pohon setiap sore sepulang latihan Pramuka agar Taman Kota lebih sejuk. Wali kota memberinya piagam Pahlawan Hijau!",pesan:"Kebaikan kecil yang dilakukan dengan tekun membawa manfaat besar."},
 {id:"hoaks",ic:"📱",judul:"Kabar Libur Palsu",lv:"SD kelas 5 – SMP",
  intro:"Semalam, pesan \"BESOK SEKOLAH LIBUR!!!\" menyebar di grup kelas. Pagi ini banyak murid tidak datang. Ternyata kabar itu salah! Temukan siapa yang pertama kali menyebarkannya dan mengapa ia salah paham.",
  attrs:{kelas:"Kelas",sumber:"Sumber info",jam:"Waktu mengirim"},
  tersangka:[{nama:"Gilang",ic:"👦",a:{kelas:"5B",sumber:"foto poster",jam:"malam"}},
   {nama:"Hana",ic:"👧",a:{kelas:"5A",sumber:"foto poster",jam:"malam"}},
   {nama:"Indra",ic:"👦",a:{kelas:"5B",sumber:"grup keluarga",jam:"malam"}},
   {nama:"Joko",ic:"👦",a:{kelas:"5B",sumber:"foto poster",jam:"pagi"}}],
  pelaku:0,
  petunjuk:[
   {ic:"💬",nama:"Pesan Berantai",sumber:"Pesan di grup kelas",teks:"\"‼️ BESOK SEKOLAH LIBUR!!! Sebarkan ke semua teman sekarang juga!!! Jangan tanya-tanya lagi ya!!!\"",
    soal:[{q:"Ciri yang membuat pesan ini patut diragukan adalah ...",opsi:["Tidak menyebut sumber resmi dan memaksa untuk segera disebarkan","Memakai bahasa Indonesia","Dikirim lewat ponsel","Berisi kata \"sekolah\""],jawab:0,bahas:"Pesan hoaks biasanya tidak jelas sumbernya, memakai banyak tanda seru, dan memaksa pembaca segera menyebarkan.",skill:"hoaks"},
     {q:"Pesan itu meminta pembaca untuk ...",opsi:["bertanya kepada guru","segera menyebarkan ke teman","menghapus pesan","datang lebih pagi"],jawab:1,bahas:"Pesan itu menulis \"Sebarkan ke semua teman sekarang juga!!!\"",skill:"tersurat"}],
    clue:"Pesan tidak menyebut sumber resmi. Perlu dicari siapa pengirim pertamanya.",c:{}},
   {ic:"📋",nama:"Pengumuman Resmi",sumber:"Pengumuman Kepala Sekolah",teks:"Diberitahukan bahwa kegiatan belajar pada hari Kamis tetap berlangsung seperti biasa. Libur hari Kamis hanya berlaku untuk SD Tunas Harapan karena gedungnya sedang diperbaiki.",
    soal:[{q:"Sekolah yang libur pada hari Kamis adalah ...",opsi:["Semua sekolah di Kota Ilmu","SD Tunas Harapan","Sekolah kita","Tidak ada"],jawab:1,bahas:"Pengumuman menyebut libur \"hanya berlaku untuk SD Tunas Harapan\".",skill:"tersurat"},
     {q:"Mengapa SD Tunas Harapan libur?",opsi:["Gedungnya sedang diperbaiki","Ada hari raya","Gurunya sedang rapat","Hujan deras"],jawab:0,bahas:"Penyebabnya tertulis jelas: \"karena gedungnya sedang diperbaiki\".",skill:"sebab"}],
    clue:"Libur hari Kamis sebenarnya hanya untuk SD Tunas Harapan, bukan sekolah kita.",c:{}},
   {ic:"🕖",nama:"Riwayat Grup Kelas",sumber:"Catatan waktu pesan",teks:"19.05 – Pesan \"BESOK LIBUR\" pertama kali masuk ke grup kelas 5B. 19.20 – Pesan diteruskan ke grup kelas 5A. 19.30 – Wali kelas 5A bertanya, \"Dari mana sumbernya?\"",
    soal:[{q:"Grup mana yang PERTAMA kali menerima pesan?",opsi:["Grup kelas 5A","Grup kelas 5B","Grup keluarga","Grup guru"],jawab:1,bahas:"Pukul 19.05 pesan masuk ke grup 5B, lebih dulu daripada grup 5A (19.20).",skill:"sebab"},
     {q:"Pesan pertama dikirim pada waktu ...",opsi:["pagi hari","siang hari","malam hari (sekitar pukul 19.05)","dini hari"],jawab:2,bahas:"Pukul 19.05 adalah malam hari.",skill:"tersurat"}],
    clue:"Pesan pertama masuk ke grup kelas 5B pada malam hari (19.05).",c:{kelas:"5B",jam:"malam"}},
   {ic:"🏪",nama:"Bu Lina (pemilik warung)",sumber:"Kesaksian pemilik warung",teks:"\"Tadi sore, ada anak berbaju olahraga kelas 5B memotret poster di depan SD Tunas Harapan. Poster itu bertuliskan KAMIS LIBUR. Sepertinya anak itu tidak membaca nama sekolah di bagian bawah poster.\"",
    soal:[{q:"Mengapa anak itu kemungkinan salah paham?",opsi:["Ia tidak membaca nama sekolah di bagian bawah poster","Poster itu kosong","Ia tidak punya ponsel","Warung sedang tutup"],jawab:0,bahas:"Bu Lina menduga anak itu \"tidak membaca nama sekolah\", sehingga mengira semua sekolah libur.",skill:"tersirat"},
     {q:"Di mana poster itu dipasang?",opsi:["Di depan SD Tunas Harapan","Di sekolah kita","Di dalam warung","Di Balai Kota"],jawab:0,bahas:"Teks menyebut poster \"di depan SD Tunas Harapan\".",skill:"tersurat"}],
    clue:"Pengirim mendapat info dari foto poster di depan SD Tunas Harapan.",c:{sumber:"foto poster"}}],
  akhir:"Gilang tidak bermaksud berbohong. Ia memotret poster sekolah lain, tidak membaca sampai tuntas, lalu buru-buru menyebarkannya ke grup kelas.",pesan:"Baca informasi sampai tuntas dan cek sumber resmi sebelum membagikannya."}];
var DTK=null,DTK_POS=[[-16.5,-16.5],[16.5,-16.5],[16.5,16.5],[-16.5,16.5],[-19,2]];
function dtkOk(){if(ARENA||WAIT||DROP||LOBI||GURU||PSR){toast("Selesaikan dulu lomba atau tantangan yang sedang berjalan.",3000);return false}return true}
function openDtk(){if(!dtkOk())return;var el=$("ovDtk");el._v="pick";dtkRender();el.classList.add("show");if(mode==="play")setMode("menu")}
function dtkStart(i){dtkStartCase(dtkAll()[i])}
function dtkStartCase(C){if(!C)return;if(!dtkOk())return;$("ovDtk").classList.remove("show");
 if(mode==="landing"){quickEnter()}if(CUR.w!=="kota"){loadWorld("kota");pos.set(CUR.spawn[0],CUR.spawn[1],CUR.spawn[2])}
 dtkClear();DTK={c:C,st:C.petunjuk.map(function(){return{tr:0,got:false,help:false}}),wrong:0,acc:0,sk:{},mk:[],t0:Date.now()};
 C.petunjuk.forEach(function(L,k){var p=DTK_POS[k%DTK_POS.length],x=p[0],z=p[1],y=groundAt(x,z);if(y<-50)y=0;
  var g=new THREE.Group();g.position.set(x,y,z);var col=new THREE.Mesh(new THREE.CylinderGeometry(0.35,0.35,6,12),new THREE.MeshBasicMaterial({color:0xfbbf24,transparent:true,opacity:0.55}));col.position.y=3;g.add(col);
  var ring=new THREE.Mesh(new THREE.RingGeometry(1.6,2.1,32),new THREE.MeshBasicMaterial({color:0xfbbf24,side:THREE.DoubleSide,transparent:true,opacity:0.8}));ring.rotation.x=-Math.PI/2;ring.position.y=0.08;g.add(ring);
  var tag=nameTag("🔍 "+L.nama,"#fbbf24",3.4);tag.position.set(0,7.2,0);g.add(tag);g.userData.dyn=true;scene.add(g);
  var it={type:"dtk",k:k,x:x,z:z,r:3,label:"🔍 Periksa: "+L.nama};INTER.push(it);DTK.mk.push({g:g,col:col,ring:ring,it:it})});
 DTK.anim=function(t){if(!DTK)return;DTK.mk.forEach(function(m,k){m.col.material.opacity=0.4+0.25*Math.sin(t/300+k);m.ring.rotation.z=t/900})};animated.push(DTK.anim);
 dtkHud();var el=$("ovDtk");el._v="intro";dtkRender();el.classList.add("show");setMode("menu")}
function dtkClear(){if(!DTK)return;dtkFlush();DTK.mk.forEach(function(m){scene.remove(m.g);m.g.traverse(function(x){if(x.material&&x.material.map)x.material.map.dispose()});var j=INTER.indexOf(m.it);if(j>=0)INTER.splice(j,1)});var a=animated.indexOf(DTK.anim);if(a>=0)animated.splice(a,1);DTK=null;$("dtkBar").style.display="none";document.body.classList.remove("dtkOn");curInter=null}
function dtkGot(){return DTK?DTK.st.filter(function(s){return s.got}).length:0}
function dtkMark(k){var m=DTK.mk[k],s=DTK.st[k],c=s.got?0x22c55e:s.tr?0xef4444:0xfbbf24;m.col.material.color.setHex(c);m.ring.material.color.setHex(c);m.it.label=(s.got?"✅ Baca lagi: ":"🔍 Periksa: ")+DTK.c.petunjuk[k].nama}
function dtkHud(){var b=$("dtkBar");if(!DTK){b.style.display="none";return}var n=DTK.c.petunjuk.length,g=dtkGot();
 document.body.classList.add("dtkOn");b.innerHTML='<span>🕵️ <i class="dtkT">'+esc(DTK.c.judul)+' • </i><b>🔎 '+g+'/'+n+'</b><span id="dtkNear"></span></span><button class="btn sm gray" data-dk="note">📒</button><button class="btn sm '+(g>=Math.min(3,n)?"yel":"gray")+'" data-dk="acc">⚖️<i class="dtkT"> Tuduh</i></button><button class="btn sm gray" data-dk="out" aria-label="Keluar kasus">✖</button>';b.style.display="flex";dtkNear()}
function dtkNear(){var el=$("dtkNear");if(!el||!DTK)return;var best=null,bd=1e9;DTK.mk.forEach(function(m,k){if(DTK.st[k].got)return;var d=Math.hypot(m.it.x-pos.x,m.it.z-pos.z);if(d<bd){bd=d;best=m}});
 var tl="";if(DTK.tan&&DTK.batas){var sx=Math.max(0,Math.round((DTK.batas-srv())/1000));tl=" • ⏱ "+Math.floor(sx/60)+":"+("0"+sx%60).slice(-2)}
 if(!best){el.textContent=" • semua petunjuk terkumpul!"+tl;return}var dx=best.it.x-pos.x,dz=best.it.z-pos.z,fw=dx*-Math.sin(yaw)+dz*-Math.cos(yaw),rt=dx*Math.cos(yaw)+dz*-Math.sin(yaw),an=Math.atan2(rt,fw),ix=((Math.round(an/(Math.PI/4))%8)+8)%8,arr=["⬆️","↗️","➡️","↘️","⬇️","↙️","⬅️","↖️"][ix];el.textContent=" • "+arr+" "+Math.round(bd)+" m"+tl}
function startDtkTan(t,r){var C=dtkFind(String(t.mapel||"").slice(5));if(!C){toast("❌ Kasus tantangan tidak ditemukan. Minta guru mengirim soal terbaru ke kelas.",5000);return}
 Q={tan:t,finished:false,t0:Date.now()};dtkStartCase(C);if(!DTK)return;DTK.tan=t;DTK.batas=r&&r.batas||(srv()+(t.menit||15)*60000);dtkHud()}
function dtkTanFinish(solved){if(!DTK||DTK.done)return;DTK.done=true;var C=DTK.c,t=DTK.tan,nb=0,nn=0;Object.keys(DTK.sk).forEach(function(k){nb+=DTK.sk[k].b;nn+=DTK.sk[k].n});
 var nilai=Math.max(0,Math.min(100,Math.round((nn?nb/nn*70:0)+(solved?Math.max(0,30-10*DTK.acc):0)))),star=solved?(DTK.wrong===0&&DTK.acc===0?3:(DTK.wrong<=2&&DTK.acc<=1?2:1)):0,kn=10+star*15;addCoins(kn);addXp(20+star*15);
 if(solved){P.dtk=P.dtk||{};P.dtk[C.id]=Math.max(P.dtk[C.id]||0,star)}P.history.unshift({t:Date.now(),mapel:"🕵️ "+C.judul,paket:"Tantangan Detektif",benar:nb,total:nn,nilai:nilai,k:"tantangan",w:CUR.w});P.history=P.history.slice(0,300);save();
 if(solved)DTK_OUT.push({m:("_dtk:"+C.id).slice(0,60),s:"win",q:("Kasus terpecahkan: "+C.judul).slice(0,300),p:-1,k:0,ok:1,d:star,t:Date.now()});
 var jw=DTK_OUT.splice(0,100),el=$("ovDtk");if(Q&&Q.tan===t)Q.finished=true;
 if(CL)queue({sesi:{mapel:t.mapel,nama:C.judul,benar:nb,total:Math.max(1,nn),nilai:nilai,durasi:Math.round((Date.now()-DTK.t0)/1000),t:Date.now(),tt:srv(),dunia:CUR.w,tantangan:t.id},jawaban:jw});
 try{rtSend({t:"ev",k:"kuis",m:C.judul,n:nilai})}catch(e){}
 el._res={star:star,kn:kn,xp:20+star*15,sk:DTK.sk,wrong:DTK.wrong,nilai:nilai,solved:solved};el._v="end";dtkRender();el.classList.add("show");setMode("menu")}
function dtkTick(){if(!DTK)return;if(DTK.tan&&!DTK.done&&srv()>DTK.batas){toast("⏰ Waktu tantangan habis! Nilaimu dikirim.",3000);dtkTanFinish(false);return}if(CUR.w!=="kota"){dtkClear();return}if(performance.now()-(DTK.nt||0)>300){DTK.nt=performance.now();dtkNear()}}
function dtkOpen(k){if(!DTK)return;var el=$("ovDtk");el._v="read";el._k=k;el._ans=null;dtkRender();el.classList.add("show");setMode("menu")}
function dtkMatch(t,c){return Object.keys(c).every(function(k){return t.a[k]===c[k]})}
function dtkRender(){var el=$("ovDtk"),v=el._v,b=$("dtkBody"),h="",C=DTK&&DTK.c;
 if(v==="pick"){h='<div class="mut">Baca teks di setiap lokasi, jawab pertanyaannya untuk mendapat petunjuk, lalu simpulkan siapa pelakunya. Melatih membaca: informasi tersurat, menyimpulkan, fakta &amp; opini, dan ide pokok.</div>'+
  dtkAll().map(function(c,i){return'<button class="dtkc'+(c.guru?' dtkg':'')+'" data-dk="start" data-v="'+i+'"><span>'+esc(c.ic)+'</span><b>'+esc(c.judul)+(c.guru?' <i class="mnnew" style="background:#22c55e">DARI GURUMU</i>':'')+'</b><small>'+esc(c.lv||"")+' • '+c.petunjuk.length+' lokasi'+(P.dtk&&P.dtk[c.id]?' • '+"⭐".repeat(P.dtk[c.id]):'')+'</small></button>'}).join("")}
 else if(v==="intro"){h='<div class="dtkst"><div style="font-size:42px">'+C.ic+'</div><h3>'+esc(C.judul)+'</h3><p>'+esc(C.intro)+'</p><p class="mut" style="font-size:13px">🧭 Ikuti panah di bar atas. Lokasi petunjuk ditandai tiang kuning bercahaya 🔍.</p><button class="btn yel" data-dk="close">🔍 Mulai menyelidiki</button></div>'}
 else if(v==="read"){var k=el._k,L=C.petunjuk[k],s=DTK.st[k],q=L.soal[Math.min(s.tr,L.soal.length-1)],an=el._ans;
  h='<div class="dtksrc">'+L.ic+' <b>'+esc(L.nama)+'</b> <span class="mut">• '+esc(L.sumber)+'</span></div><div class="dtktx">'+esc(L.teks)+'</div>';
  if(s.got&&an==null){h+='<div class="dtkclue">🔎 Petunjuk: '+esc(L.clue)+'</div><div class="row"><button class="btn" data-dk="close">Tutup</button></div>'}
  else{h+='<div class="dtkq"><span class="dtkskill">'+esc(DTK_SKILL[q.skill]||"Membaca")+'</span><b>'+esc(q.q)+'</b></div><div class="dtkop">'+q.opsi.map(function(o,i){var cl=an==null?"":i===q.jawab?" ok":i===an?" no":"";return'<button class="opt'+cl+'" data-dk="ans" data-v="'+i+'"'+(an!=null?" disabled":"")+'>'+String.fromCharCode(65+i)+'. '+esc(o)+'</button>'}).join("")+'</div>';
   if(an!=null){var okA=an===q.jawab;h+='<div class="dtkfb '+(okA?"ok":"no")+'">'+(okA?"✅ Tepat! ":"❌ Kurang tepat. ")+esc(q.bahas)+'</div>';
    if(s.got)h+='<div class="dtkclue">🔎 Petunjuk didapat'+(s.help?" (dibantu)":"")+': '+esc(L.clue)+'</div>';else h+='<div class="mut" style="font-size:13px;margin-top:6px">Baca lagi teksnya dengan teliti. Kamu bisa mencoba dengan pertanyaan lain.</div>';
    h+='<div class="row">'+(s.got?'<button class="btn yel" data-dk="close">Lanjut menyelidiki ➜</button>':'<button class="btn yel" data-dk="retry">🔁 Coba lagi</button><button class="btn gray" data-dk="close">Nanti</button>')+'</div>'}}}
 else if(v==="note"){h='<h3 style="margin:4px 0">📒 Catatan detektif</h3>'+(dtkGot()?'<ol class="dtkn">'+C.petunjuk.map(function(L,k){return DTK.st[k].got?'<li>'+L.ic+' '+esc(L.clue)+'</li>':''}).join("")+'</ol>':'<div class="mut">Belum ada petunjuk. Datangi tiang kuning 🔍.</div>')+'<h3 style="margin:12px 0 4px">🧑‍🤝‍🧑 Para tersangka</h3>'+dtkSusp(false)+'<div class="row"><button class="btn" data-dk="close">Tutup</button></div>'}
 else if(v==="acc"){h='<h3 style="margin:4px 0">⚖️ Siapa pelakunya?</h3><div class="mut" style="font-size:13px">Cocokkan petunjuk di catatanmu dengan ciri setiap tersangka.</div><ol class="dtkn">'+C.petunjuk.map(function(L,k){return DTK.st[k].got?'<li>'+esc(L.clue)+'</li>':''}).join("")+'</ol>'+dtkSusp(true)+(el._msg?'<div class="dtkfb no">'+el._msg+'</div>':'')+'<div class="row"><button class="btn gray" data-dk="close">Kembali menyelidiki</button></div>'}
 else if(v==="end"){var r=el._res,t=C.tersangka[C.pelaku];h='<div class="dtkst"><div style="font-size:44px">'+(r.solved===false?"⏰":"🎉")+'</div><h3>'+(r.solved===false?"Waktu habis!":"Kasus terpecahkan!")+'</h3>'+(r.nilai!=null?'<div class="dtkclue" style="font-size:18px">📤 Nilai tantangan: <b>'+r.nilai+'</b>'+(CL?' • terkirim ke guru':'')+'</div>':'')+'<div style="font-size:30px">'+"⭐".repeat(r.star)+'<span style="opacity:.25">'+"⭐".repeat(3-r.star)+'</span></div><p>'+(r.solved===false?"Kasus belum terpecahkan. Petunjuk yang kamu dapat tetap dihitung.":'<b>'+t.ic+' '+esc(t.nama)+'</b>. '+esc(C.akhir))+'</p><p class="dtkclue">💡 Pesan: '+esc(C.pesan)+'</p>'+
  '<div class="dtksk">'+Object.keys(r.sk).map(function(k){var o=r.sk[k];return'<div><span>'+esc(DTK_SKILL[k]||k)+'</span><b>'+o.b+'/'+o.n+'</b></div>'}).join("")+'</div><p class="mut" style="font-size:13px">🪙 +'+r.kn+' koin • ✨ +'+r.xp+' XP'+(r.wrong?' • '+r.wrong+' jawaban kurang tepat':'')+'</p><div class="row" style="justify-content:center">'+(r.nilai!=null?'':'<button class="btn yel" data-dk="pickagain">🕵️ Kasus lain</button>')+'<button class="btn gray" data-dk="done">Selesai</button></div></div>'}
 b.innerHTML=h;$("dtkTitle").textContent=v==="pick"?"🕵️ Detektif Kota Ilmu":C?C.ic+" "+C.judul:"🕵️ Detektif"}
function dtkSusp(pick){var C=DTK.c,ks=Object.keys(C.attrs);return'<div class="dtksus">'+C.tersangka.map(function(t,i){return'<div class="dtkt"><div class="dtkth"><span>'+t.ic+'</span><b>'+esc(t.nama)+'</b></div>'+ks.map(function(k){return'<div class="dtka"><small>'+esc(C.attrs[k])+'</small>'+esc(t.a[k])+'</div>'}).join("")+(pick?'<button class="btn sm yel" data-dk="pick" data-v="'+i+'">Dia pelakunya</button>':'')+'</div>'}).join("")+'</div>'}
function dtkAnswer(i){var el=$("ovDtk"),k=el._k,L=DTK.c.petunjuk[k],s=DTK.st[k],q=L.soal[Math.min(s.tr,L.soal.length-1)],ok=i===q.jawab;el._ans=i;
 dtkLog(k,q,ok,Math.min(s.tr,L.soal.length-1));var o=DTK.sk[q.skill]||(DTK.sk[q.skill]={b:0,n:0});o.n++;if(ok){o.b++;s.got=true;try{SFX.ok()}catch(e){}}else{DTK.wrong++;s.tr++;try{SFX.no()}catch(e){}if(s.tr>=L.soal.length){s.got=true;s.help=true}}
 P.stats.answered++;if(ok)P.stats.correct++;save();dtkMark(k);dtkHud();dtkRender()}
function dtkPick(i){var el=$("ovDtk"),C=DTK.c,t=C.tersangka[i];
 if(i===C.pelaku){var miss=C.petunjuk.some(function(L,k){return!DTK.st[k].got&&Object.keys(L.c).length});var others=C.tersangka.filter(function(x,j){return j!==i&&C.petunjuk.every(function(L,k){return!DTK.st[k].got||dtkMatch(x,L.c)})});
  if(others.length&&miss){DTK.acc++;el._msg="🤔 "+esc(t.nama)+" memang cocok dengan petunjukmu, tetapi "+others.map(function(x){return esc(x.nama)}).join(" dan ")+" juga cocok. Petunjukmu belum cukup untuk memastikan. Cari petunjuk lain dulu!";dtkRender();return}
  dtkWin();return}
 DTK.acc++;try{SFX.no()}catch(e){}var why="";C.petunjuk.some(function(L,k){if(!DTK.st[k].got)return false;return Object.keys(L.c).some(function(a){if(t.a[a]!==L.c[a]){why="Petunjuk menyebut <b>"+esc(C.attrs[a].toLowerCase())+": "+esc(L.c[a])+"</b>, tetapi "+esc(C.attrs[a].toLowerCase())+" "+esc(t.nama)+": <b>"+esc(t.a[a])+"</b>.";return true}return false})});
 el._msg=why?"❌ "+esc(t.nama)+" tidak cocok. "+why+" Periksa lagi catatanmu!":"🤔 Petunjukmu belum cukup untuk menuduh "+esc(t.nama)+". Cari petunjuk lain dulu!";dtkRender()}
function dtkWin(){if(DTK.tan){dtkTanFinish(true);return}var C=DTK.c,star=DTK.wrong===0&&DTK.acc===0?3:(DTK.wrong<=2&&DTK.acc<=1?2:1),kn=30+star*20,xp=40+star*20;addCoins(kn);addXp(xp);P.dtk=P.dtk||{};P.dtk[C.id]=Math.max(P.dtk[C.id]||0,star);
 var nb=0,nn=0;Object.keys(DTK.sk).forEach(function(k){nb+=DTK.sk[k].b;nn+=DTK.sk[k].n});P.history.unshift({t:Date.now(),mapel:"🕵️ Detektif: "+C.judul,paket:"Detektif Kota Ilmu",benar:nb,total:nn,nilai:nn?Math.round(nb/nn*100):0,k:"kuis",w:CUR.w});P.history=P.history.slice(0,300);save();try{SFX.win()}catch(e){}
 if(CL){DTK_OUT.push({m:("_dtk:"+C.id).slice(0,60),s:"win",q:("Kasus terpecahkan: "+C.judul).slice(0,300),p:-1,k:0,ok:1,d:star,t:Date.now()});dtkFlush()}
 var el=$("ovDtk");el._res={star:star,kn:kn,xp:xp,sk:DTK.sk,wrong:DTK.wrong};el._v="end";dtkRender()}
/* ---------- 🕵️ Kasus Detektif buatan guru (disimpan di paket soal) ---------- */
var DTK_SK_KEYS=["tersurat","tersirat","opini","pokok","kata","sebab","hoaks"];
function dtkCheck(c0){var err=[],S=function(v,n){return String(v==null?"":v).trim().slice(0,n)};if(!c0||typeof c0!=="object")return{err:["Format kasus bukan objek JSON."]};
 var c={id:S(c0.id,24).replace(/[^a-z0-9_-]/gi,"")||("g"+Date.now().toString(36)),ic:S(c0.ic,8)||"🕵️",judul:S(c0.judul,70),lv:S(c0.lv||c0.jenjang,40),intro:S(c0.intro,700),akhir:S(c0.akhir,500),pesan:S(c0.pesan,200),guru:true};
 if(!c.judul)err.push("Judul kasus kosong.");if(!c.intro)err.push("Cerita pembuka (intro) kosong.");
 var at={};Object.keys(c0.attrs||{}).slice(0,4).forEach(function(k){var kk=String(k).toLowerCase().replace(/[^a-z0-9]/g,"").slice(0,16);if(kk)at[kk]=S(c0.attrs[k],30)||kk});c.attrs=at;var AK=Object.keys(at);
 if(AK.length<2)err.push("Minimal 2 ciri tersangka (attrs).");
 var mapA=function(o){var r={};Object.keys(o||{}).forEach(function(k){var kk=String(k).toLowerCase().replace(/[^a-z0-9]/g,"").slice(0,16);if(at[kk]!=null)r[kk]=S(o[k],40)});return r};
 c.tersangka=(Array.isArray(c0.tersangka)?c0.tersangka:[]).slice(0,5).map(function(t){return{nama:S(t&&t.nama,24),ic:S(t&&t.ic,8)||"🧑",a:mapA(t&&t.a)}}).filter(function(t){return t.nama});
 if(c.tersangka.length<3)err.push("Minimal 3 tersangka.");
 c.tersangka.forEach(function(t){AK.forEach(function(k){if(!t.a[k])err.push("Tersangka "+t.nama+" belum punya ciri \""+at[k]+"\".")})});
 var pl=c0.pelaku;if(typeof pl==="string"){var pi=c.tersangka.map(function(t){return t.nama.toLowerCase()}).indexOf(pl.trim().toLowerCase());pl=pi}c.pelaku=+pl;
 if(!(c.pelaku>=0&&c.pelaku<c.tersangka.length))err.push("Pelaku (nomor urut tersangka, mulai 0) tidak valid.");
 c.petunjuk=(Array.isArray(c0.petunjuk)?c0.petunjuk:[]).slice(0,5).map(function(L,k){L=L||{};var r={ic:S(L.ic,8)||"🔍",nama:S(L.nama,40)||("Lokasi "+(k+1)),sumber:S(L.sumber,60),teks:S(L.teks,800),clue:S(L.clue,200),c:mapA(L.c)};
  r.soal=(Array.isArray(L.soal)?L.soal:[]).slice(0,3).map(function(q){q=q||{};var op=(Array.isArray(q.opsi)?q.opsi:[]).slice(0,4).map(function(x){return S(x,160)}).filter(Boolean),j=+q.jawab;return{q:S(q.q,300),opsi:op,jawab:j>=0&&j<op.length?j:-1,bahas:S(q.bahas,400),skill:["tersurat","tersirat","opini","pokok","kata","sebab","hoaks"].indexOf(q.skill)>=0?q.skill:"tersirat"}}).filter(function(q){return q.q&&q.opsi.length>=2&&q.jawab>=0});
  if(!r.teks)err.push("Lokasi "+(k+1)+": teks bacaan kosong.");if(!r.soal.length)err.push("Lokasi "+(k+1)+": belum ada soal yang lengkap (pertanyaan, 2–4 pilihan, kunci).");if(!r.clue)err.push("Lokasi "+(k+1)+": petunjuk (clue) kosong.");return r});
 if(c.petunjuk.length<3)err.push("Minimal 3 lokasi petunjuk.");
 if(!err.length){var m=c.tersangka.filter(function(t){return c.petunjuk.every(function(L){return Object.keys(L.c).every(function(k){return t.a[k]===L.c[k]})})});
  if(m.length!==1)err.push(m.length?"Petunjuk belum cukup: "+m.map(function(t){return t.nama}).join(", ")+" sama-sama cocok. Tambahkan ciri pada petunjuk (c) agar hanya pelaku yang cocok.":"Tidak ada tersangka yang cocok dengan semua petunjuk. Periksa nilai ciri di petunjuk (c) dan di tersangka.");
  else if(c.tersangka.indexOf(m[0])!==c.pelaku)err.push("Yang cocok dengan semua petunjuk adalah "+m[0].nama+", bukan pelaku yang ditulis.")}
 if(!c.akhir)c.akhir="Kasus terpecahkan! Kerja bagus, detektif.";return{c:c,err:err}}
function dtkCleanList(L){if(!Array.isArray(L))return undefined;var o=[];L.slice(0,20).forEach(function(c){var r=dtkCheck(c);if(!r.err.length)o.push(r.c)});return o.length?o:undefined}
function dtkAll(){return((data&&data.detektif)||[]).concat(DTK_CASES)}
function dtkFind(id){var L=((DB_&&DB_.paket&&DB_.paket.detektif)||[]).concat((data&&data.detektif)||[],DTK_CASES);return L.filter(function(c){return c.id===id})[0]||null}
function dtkPrompt(){var t=$("dkT")?$("dkT").value.trim():"",j=$("dkJ")?$("dkJ").value.trim():"SD kelas 5",tp=$("dkP")?$("dkP").value.trim():"";
 return"Buatkan 1 kasus detektif untuk melatih literasi membaca murid "+j+(tp?" dengan tema/topik \""+tp+"\"":"")+"."+(t?"\nGunakan teks bacaan berikut sebagai bahan (boleh dipecah menjadi beberapa teks pendek di lokasi berbeda):\n\"\"\"\n"+t+"\n\"\"\"":"")+
 "\n\nAturan:\n- Ceritanya ramah anak: tidak ada kekerasan atau kejahatan berat. 'Pelaku' sebaiknya karena salah paham, lupa izin, atau berbuat baik diam-diam.\n- Ada 4 lokasi petunjuk. Setiap lokasi berisi teks pendek (2–4 kalimat) seperti kesaksian, berita, surat, jadwal, poster, atau pesan, sesuai jenjang.\n- Setiap lokasi punya 2 soal pilihan ganda (4 pilihan, tepat 1 benar) tentang teks itu, masing-masing dengan pembahasan singkat. Isi \"skill\" dengan salah satu: tersurat, tersirat, opini (fakta & opini), pokok (ide pokok/tujuan teks), kata (makna kata), sebab (sebab-akibat/urutan), hoaks (literasi digital).\n- Ada 3 ciri tersangka (attrs) dan 4 tersangka. Setiap lokasi memberi petunjuk (clue) dan batasan ciri (c) yang sesuai dengan teksnya. Gabungan semua batasan harus membuat HANYA SATU tersangka yang cocok, yaitu pelakunya. Minimal 2 lokasi punya batasan ciri.\n- Nilai ciri di \"c\" harus ditulis persis sama dengan nilai ciri tersangka.\n\nKeluarkan HANYA JSON valid tanpa teks lain, dengan format persis seperti ini:\n"+
 '{\n  "judul": "Judul kasus",\n  "ic": "🔍",\n  "lv": "'+j+'",\n  "intro": "Cerita pembuka 2–3 kalimat dan tugas detektif",\n  "attrs": {"ciri1": "Nama ciri 1", "ciri2": "Nama ciri 2", "ciri3": "Nama ciri 3"},\n  "tersangka": [\n    {"nama": "Nama", "ic": "👦", "a": {"ciri1": "nilai", "ciri2": "nilai", "ciri3": "nilai"}}\n  ],\n  "pelaku": 0,\n  "petunjuk": [\n    {"ic": "📋", "nama": "Nama lokasi/saksi", "sumber": "Jenis teks", "teks": "Teks bacaan", "soal": [\n      {"q": "Pertanyaan", "opsi": ["A", "B", "C", "D"], "jawab": 0, "bahas": "Pembahasan", "skill": "tersurat"},\n      {"q": "Pertanyaan", "opsi": ["A", "B", "C", "D"], "jawab": 1, "bahas": "Pembahasan", "skill": "tersirat"}\n    ], "clue": "Petunjuk yang didapat", "c": {"ciri1": "nilai"}}\n  ],\n  "akhir": "Penjelasan akhir cerita",\n  "pesan": "Pesan moral singkat"\n}\n\nKeterangan: "pelaku" adalah nomor urut tersangka dimulai dari 0. Buat tepat 4 tersangka dan 4 lokasi.'}
var DK={err:[],prev:null};
function guruDtkHTML(){var L=(draft.detektif||[]),h='<div class="mut">Buat kasus <b>🕵️ Detektif Kota Ilmu</b> dari bacaan kelas Anda dengan bantuan AI (ChatGPT, Gemini, atau Claude). Kasus tersimpan bersama paket soal: setelah <b>💾 Simpan</b> dan dikirim ke kelas, murid melihatnya paling atas di menu Detektif, dan hasil membacanya masuk ke dashboard (🌟 Penguasaan → 📖 Membaca).</div>';
 h+='<h3 class="hsub">Kasus saya ('+L.length+')</h3>'+(L.length?L.map(function(c,i){return'<div class="hk"><div><b>'+esc(c.ic+" "+c.judul)+'</b> <span class="mut">• '+esc(c.lv||"")+' • '+c.petunjuk.length+' lokasi • pelaku: '+esc(c.tersangka[c.pelaku].nama)+'</span></div><div class="row" style="margin:0"><button class="btn sm green" data-act="dkplay" data-v="'+i+'">🎮 Coba</button><button class="btn sm gray" data-act="dkjson" data-v="'+i+'">✏️ Ubah</button><button class="btn sm red" data-act="dkdel" data-v="'+i+'">Hapus</button></div></div>'}).join(""):'<div class="mut">Belum ada kasus buatan Anda. Murid tetap bisa memainkan 3 kasus bawaan.</div>');
 h+='<div class="acard"><h4><span class="anum">1</span>Isi bahan kasus</h4><label class="fld">Teks bacaan (opsional, tempel dari buku atau LKPD)<textarea class="gta" id="dkT" rows="4" style="font-family:var(--fb)" placeholder="Tempel teks bacaan di sini. Kosongkan bila ingin AI membuat cerita sendiri dari tema."></textarea></label><div class="gtop"><label class="fld">Tema / topik<input id="dkP" placeholder="Contoh: menjaga kebersihan sungai"></label><label class="fld">Jenjang<input id="dkJ" value="SD kelas 5"></label></div></div>';
 h+='<div class="acard"><h4><span class="anum">2</span>Salin perintah, lalu tempel ke AI</h4><div class="row"><button class="btn yel" data-act="dkcp">📋 Salin perintah</button><a class="btn sm gray" href="https://chatgpt.com" target="_blank" rel="noopener">ChatGPT ↗</a><a class="btn sm gray" href="https://gemini.google.com" target="_blank" rel="noopener">Gemini ↗</a><a class="btn sm gray" href="https://claude.ai" target="_blank" rel="noopener">Claude ↗</a></div></div>';
 h+='<div class="acard"><h4><span class="anum">3</span>Tempel jawaban AI di sini</h4><textarea class="gta" id="dkIn" rows="6" spellcheck="false" placeholder="Tempel seluruh jawaban AI (JSON kasus) di sini"></textarea><div class="row"><button class="btn green" data-act="dkadd">✔ Periksa &amp; tambahkan kasus</button></div>'+(DK.err.length?'<div class="note" style="border-color:#f87171"><b>Perlu diperbaiki:</b><ul style="margin:4px 0 0;padding-left:18px">'+DK.err.map(function(e){return'<li>'+esc(e)+'</li>'}).join("")+'</ul><span class="mut">Minta AI memperbaikinya, misalnya: "Perbaiki JSON kasus agar ' + 'hanya satu tersangka cocok dengan semua petunjuk", lalu tempel lagi.</span></div>':'')+'</div>';
 return h}
function dkParse(tx){var s=String(tx||"").trim();var a=s.indexOf("{"),b=s.lastIndexOf("}");if(a<0||b<a)throw new Error("Tidak menemukan JSON. Pastikan menyalin seluruh jawaban AI.");return JSON.parse(s.slice(a,b+1))}
function dkAct(a,b){
 if(a==="dkcp"){copyText(dtkPrompt());gmsg("📋 Perintah tersalin. Tempel ke AI, lalu salin jawabannya ke langkah 3.","#7dffa0");return true}
 if(a==="dkadd"){var tx=$("dkIn").value;DK.err=[];var o;try{o=dkParse(tx)}catch(e){DK.err=["JSON tidak terbaca: "+e.message];renderGuru();return true}
  var r=dtkCheck(o);if(r.err.length){DK.err=r.err;renderGuru();$("dkIn").value=tx;return true}
  draft.detektif=draft.detektif||[];var ix=DK.edit!=null?DK.edit:-1;if(ix>=0)draft.detektif[ix]=r.c;else draft.detektif.push(r.c);DK.edit=null;dirty=true;renderGuru();gmsg("✔ Kasus \""+r.c.judul+"\" siap. Tekan 💾 Simpan agar tersimpan dan bisa dikirim ke kelas.","#7dffa0");return true}
 if(a==="dkdel"){var i=+b.dataset.v,c=draft.detektif[i];ask('Kasus "'+c.judul+'" akan dihapus.',function(){draft.detektif.splice(i,1);dirty=true;renderGuru()},{t:"Hapus kasus?",ok:"Hapus",danger:true});return true}
 if(a==="dkjson"){var j=+b.dataset.v;DK.edit=j;DK.err=[];renderGuru();$("dkIn").value=JSON.stringify(draft.detektif[j],null,2);$("dkIn").focus();gmsg("✏️ Ubah JSON kasus di langkah 3, lalu tekan ✔ Periksa & tambahkan kasus.","var(--yel)");return true}
 if(a==="dkplay"){var c2=draft.detektif[+b.dataset.v];if(dirty&&!applyDraft())return true;$("ovGuru").classList.remove("show");if(mode==="menu")setMode("play");dtkStartCase(c2);return true}
 return false}
/* catatan hasil membaca ke kelas */
var DTK_OUT=[];
function dtkLog(k,q,ok,tr){if(!CL||!DTK)return;DTK_OUT.push({m:("_dtk:"+DTK.c.id).slice(0,60),s:"d"+k+"t"+tr,q:String(q.q).slice(0,300),p:-1,k:q.jawab,ok:ok?1:0,d:0,t:Date.now()})}
function dtkFlush(){if(!DTK_OUT.length||!CL)return;var L=DTK_OUT.splice(0,100);try{queue({jawaban:L})}catch(e){}}

$("ovDtk").addEventListener("click",function(e){var b=e.target.closest("[data-dk]");if(!b)return;var a=b.dataset.dk,el=this;
 if(a==="start"){dtkStart(+b.dataset.v);return}
 if(a==="ans"){dtkAnswer(+b.dataset.v);return}
 if(a==="retry"){el._ans=null;dtkRender();return}
 if(a==="pick"){dtkPick(+b.dataset.v);return}
 if(a==="pickagain"){dtkClear();el._v="pick";dtkRender();return}
 if(a==="done"){dtkClear();el.classList.remove("show");if(mode==="menu")setMode("play");return}
 if(a==="close"){el._msg="";el.classList.remove("show");if(mode==="menu")setMode("play");return}});
$("dtkClose").onclick=function(){var el=$("ovDtk");if(el._v==="end")dtkClear();el._msg="";el.classList.remove("show");if(mode==="menu")setMode("play")};
$("dtkBar").addEventListener("click",function(e){var b=e.target.closest("[data-dk]");if(!b||!DTK)return;var a=b.dataset.dk,el=$("ovDtk");
 if(a==="out"){if(DTK.tan&&!DTK.done){ask("Nilaimu dihitung dari petunjuk yang sudah didapat lalu dikirim ke guru. Kasus dianggap belum terpecahkan.",function(){dtkTanFinish(false)},{ic:"📤",t:"Kirim dan akhiri tantangan?",ok:"Kirim",no:"Lanjut menyelidiki"});return}ask("Keluar dari kasus ini? Petunjuk yang sudah dikumpulkan akan hilang.",function(){dtkClear()},{ic:"🕵️",t:"Keluar kasus?",ok:"Keluar",no:"Lanjut menyelidiki"});return}
 el._msg="";el._v=a;if(a==="acc"&&dtkGot()<Math.min(3,DTK.c.petunjuk.length)){toast("🔎 Kumpulkan minimal 3 petunjuk dulu sebelum menuduh.",2500);return}dtkRender();el.classList.add("show");if(mode==="play")setMode("menu")});

/* =================================================================
   🏪 PASAR NUSANTARA (numerasi): melayani pembeli di warung.
   Menghitung total, kembalian, diskon, timbangan, dan pecahan
   adalah permainannya sendiri.
   ================================================================= */
var PSR_SKILL={total:"Menjumlah & mengalikan harga",kembali:"Uang kembalian",diskon:"Persen & diskon",timbang:"Satuan berat",pecahan:"Pecahan",untung:"Untung & rugi"};
var PSR_LV={mudah:{nm:"Mudah",lv:"SD kelas 1–3",ic:"🥥",n:8,sk:["total","kembali","timbang","pecahan","total","kembali","timbang","kembali"]},
 sedang:{nm:"Sedang",lv:"SD kelas 4–6",ic:"🌽",n:8,sk:["total","kembali","diskon","timbang","pecahan","diskon","kembali","total"]},
 sulit:{nm:"Sulit",lv:"SMP",ic:"☕",n:8,sk:["total","kembali","diskon","timbang","untung","diskon","pecahan","untung"]}};
var PSR_ITEM=[["🥥","es kelapa",5000],["🌽","jagung bakar",3000],["🍌","pisang goreng",1500],["🍰","kue lapis",2500],["☕","kopi Flores",4000],["🍠","ubi rebus",2000],["🥟","lemper",2000],["🍵","teh manis",3500],["🍢","sate ikan",1000],["🥭","mangga",6000]];
var PSR_CUST=[["👩","Bu Ani"],["👨","Pak Made"],["🧑","Kak Yosef"],["👧","Nona Ina"],["👴","Opa Lukas"],["👵","Oma Rosa"],["👦","Adik Bima"],["🧕","Mbak Sari"]];
var PSR_W=[50,100,200,500,1000],PSR_M=[500,1000,2000,5000,10000,20000];
function psrRng(seed){var x=(seed>>>0)||123456789;return function(){x^=x<<13;x>>>=0;x^=x>>>17;x^=x<<5;x>>>=0;return x/4294967296}}
function rp(n){return"Rp"+Math.round(n).toLocaleString("id-ID")}
function gr(g){return g>=1000?(g%1000?String(g/1000).replace(".",",")+" kg":(g/1000)+" kg"):g+" g"}
function psrGen(lv,seed){var R=psrRng(seed),pk=function(a){return a[Math.floor(R()*a.length)]},ri=function(a,b){return a+Math.floor(R()*(b-a+1))},L=PSR_LV[lv]||PSR_LV.sedang,out=[];
 L.sk.forEach(function(sk,i){var c=pk(PSR_CUST),r={sk:sk,c:c,i:i};
  if(sk==="total"){var n=lv==="mudah"?2:3,its=[],used={};while(its.length<n){var it=pk(PSR_ITEM);if(used[it[1]])continue;used[it[1]]=1;its.push({ic:it[0],n:it[1],h:it[2],q:lv==="mudah"?1:ri(1,lv==="sulit"?4:3)})}
   r.items=its;r.need=its.reduce(function(a,x){return a+x.h*x.q},0);r.input="pad";r.say="Saya beli "+its.map(function(x){return x.q+" "+x.n}).join(", ")+". Berapa semuanya?";
   r.ex=its.map(function(x){return x.q+" × "+rp(x.h)+" = "+rp(x.h*x.q)}).join("; ")+". Jumlahnya "+rp(r.need)+".";r.untung=Math.round(r.need*0.1)}
  else if(sk==="kembali"){var it2=pk(PSR_ITEM),q=lv==="mudah"?ri(1,2):ri(1,4),tot=it2[2]*q,bayar=[5000,10000,20000,50000,100000].filter(function(v){return v>tot})[lv==="mudah"?0:ri(0,1)]||100000;
   r.items=[{ic:it2[0],n:it2[1],h:it2[2],q:q}];r.pay=bayar;r.need=bayar-tot;r.input="money";r.say=q+" "+it2[1]+", ya. Ini uangnya "+rp(bayar)+".";
   r.ex="Total belanja "+q+" × "+rp(it2[2])+" = "+rp(tot)+". Kembalian = "+rp(bayar)+" − "+rp(tot)+" = "+rp(r.need)+".";r.untung=Math.round(tot*0.1)}
  else if(sk==="diskon"){var h=pk([20000,25000,40000,50000,60000,80000]),pc=lv==="sulit"?pk([15,25,30,35]):pk([10,20,25,50]),it3=pk(PSR_ITEM);
   r.items=[{ic:"🧺",n:"keranjang "+it3[1],h:h,q:1}];r.need=h-h*pc/100;r.input="pad";r.disc=pc;r.say="Katanya hari ini ada diskon "+pc+"% untuk keranjang "+it3[1]+" "+rp(h)+". Jadi saya bayar berapa?";
   r.ex="Diskon "+pc+"% × "+rp(h)+" = "+rp(h*pc/100)+". Yang dibayar "+rp(h)+" − "+rp(h*pc/100)+" = "+rp(r.need)+".";r.untung=Math.round(r.need*0.1)}
  else if(sk==="timbang"){var opts=lv==="mudah"?[[500,"½ kg"],[1000,"1 kg"],[250,"¼ kg"],[1500,"1½ kg"]]:lv==="sedang"?[[750,"¾ kg"],[1250,"1¼ kg"],[350,"350 gram"],[1500,"1,5 kg"],[650,"0,65 kg"]]:[[1250,"1,25 kg"],[850,"0,85 kg"],[1750,"1¾ kg"],[2050,"2,05 kg"],[450,"0,45 kg"]];
   var o=pk(opts),ws=pk(["gula aren","beras","kopi bubuk","kacang tanah","jagung pipil"]);r.need=o[0];r.input="scale";r.say="Tolong timbangkan "+ws+" "+o[1]+", ya.";r.ex=o[1]+" = "+o[0]+" gram (1 kg = 1.000 gram). Contoh susunan anak timbangan: "+psrWsum(o[0])+".";r.untung=ri(5,9)*500}
  else if(sk==="pecahan"){var P=lv==="mudah"?pk([[4,1,"¼"],[2,1,"½"],[4,3,"¾"],[8,4,"½"]]):pk([[8,3,"3/8"],[6,4,"2/3"],[8,6,"3/4"],[12,9,"3/4"],[6,2,"1/3"],[10,4,"2/5"]]),kue=pk(["kue lapis","martabak","bolu pandan","pizza jagung"]);
   r.pie={n:P[0]};r.need=P[1];r.input="pie";r.say=kue.charAt(0).toUpperCase()+kue.slice(1)+" ini dipotong "+P[0]+" bagian. Saya mau "+P[2]+" bagian, ya.";r.ex=P[2]+" dari "+P[0]+" potong = "+P[1]+" potong ("+P[2]+" × "+P[0]+" = "+P[1]+").";r.untung=ri(4,8)*500}
  else if(sk==="untung"){var b=pk([8000,10000,12000,15000,20000]),pp=pk([10,20,25,50]),j=b+b*pp/100,it4=pk(PSR_ITEM);r.items=[{ic:it4[0],n:it4[1]+" (1 kodi)",h:b,q:1}];r.need=j;r.input="pad";
   r.say="Kamu kulakan "+it4[1]+" seharga "+rp(b)+". Kalau ingin untung "+pp+"%, berapa harga jualnya?";r.ex="Untung "+pp+"% × "+rp(b)+" = "+rp(b*pp/100)+". Harga jual = "+rp(b)+" + "+rp(b*pp/100)+" = "+rp(j)+".";r.untung=Math.round(b*pp/100)}
  out.push(r)});return out}
function psrWsum(g){var s=[],x=g;[1000,500,200,100,50].forEach(function(w){while(x>=w){s.push(gr(w));x-=w}});return s.join(" + ")}
var PSR=null;
function psrOk(){if(ARENA||WAIT||DROP||LOBI||GURU||DTK){toast("Selesaikan dulu permainan atau tantangan yang sedang berjalan.",3000);return false}return true}
function openPsr(){if(!psrOk())return;var el=$("ovPsr");el._v="pick";psrRender();el.classList.add("show");if(mode==="play")setMode("menu")}
function psrStart(lv,o){o=o||{};if(mode==="landing")quickEnter();PSR={lv:lv,R:psrGen(lv,o.seed||Date.now()),k:0,laba:0,b:0,sk:{},ans:null,cur:0,tray:[],tan:o.tan||null,batas:o.batas||0,t0:Date.now(),out:[]};var el=$("ovPsr");el._v="play";psrRender();el.classList.add("show");setMode("menu");psrTimer()}
function psrTimer(){clearInterval(PSR&&PSR.tm);if(!PSR||!PSR.tan)return;PSR.tm=setInterval(function(){if(!PSR){return}var e=$("psrT");if(e){var sx=Math.max(0,Math.round((PSR.batas-srv())/1000));e.textContent="⏱ "+Math.floor(sx/60)+":"+("0"+sx%60).slice(-2)}if(!PSR.done&&srv()>PSR.batas){toast("⏰ Waktu habis! Nilaimu dikirim.",3000);psrEnd()}},500)}
function psrPie(n,sel){var h='<svg viewBox="-110 -110 220 220" class="psrpie">';for(var i=0;i<n;i++){var a0=i/n*Math.PI*2-Math.PI/2,a1=(i+1)/n*Math.PI*2-Math.PI/2,x0=Math.cos(a0)*100,y0=Math.sin(a0)*100,x1=Math.cos(a1)*100,y1=Math.sin(a1)*100;
 h+='<path data-ps="pie" data-v="'+i+'" d="M0,0 L'+x0.toFixed(1)+','+y0.toFixed(1)+' A100,100 0 '+(1/n>0.5?1:0)+',1 '+x1.toFixed(1)+','+y1.toFixed(1)+' Z" fill="'+(sel[i]?"#f59e0b":"#fde68a")+'" stroke="#78350f" stroke-width="3"/>'}return h+'</svg>'}
function psrRender(){var el=$("ovPsr"),v=el._v,b=$("psrBody"),h="";
 if(v==="pick"){h='<div class="mut">Layani pembeli di warungmu: hitung total belanja, uang kembalian, diskon, timbangan, dan potongan kue. Jawaban tepat = pembeli senang dan warungmu untung!</div>'+Object.keys(PSR_LV).map(function(k){var L=PSR_LV[k];return'<button class="dtkc psrc" data-ps="start" data-v="'+k+'"><span>'+L.ic+'</span><b>Tingkat '+L.nm+'</b><small>'+L.lv+' • '+L.n+' pembeli • '+L.sk.filter(function(x,i,a){return a.indexOf(x)===i}).map(function(x){return PSR_SKILL[x]}).join(", ")+(P.psr&&P.psr[k]?' • '+"⭐".repeat(P.psr[k]):'')+'</small></button>'}).join("")}
 else if(v==="play"){var r=PSR.R[PSR.k],n=PSR.R.length;
  h='<div class="psrtop"><span>🧑‍🌾 Pembeli <b>'+(PSR.k+1)+'/'+n+'</b></span><span>💰 Laba <b>'+rp(PSR.laba)+'</b></span>'+(PSR.tan?'<span id="psrT">⏱</span>':'')+'</div>';
  h+='<div class="psrstall"><div class="psrcust">'+r.c[0]+'</div><div class="psrsay"><b>'+esc(r.c[1])+'</b><span>'+esc(r.say)+'</span></div></div>';
  if(r.items)h+='<div class="psritems">'+r.items.map(function(x){return'<div><span>'+x.ic+'</span><b>'+esc(x.n)+'</b><small>'+rp(x.h)+(x.q>1?' × '+x.q:'')+'</small></div>'}).join("")+'</div>';
  h+='<div class="psrsk">'+esc(PSR_SKILL[r.sk])+'</div>';
  var done=PSR.ans!=null;
  if(r.input==="pad")h+='<div class="psrdisp">'+(r.sk==="pecahan"?"":"Rp")+'<b>'+(PSR.cur?PSR.cur.toLocaleString("id-ID"):"0")+'</b></div>'+(done?'':'<div class="psrpad">'+["1","2","3","4","5","6","7","8","9","000","0","⌫"].map(function(k){return'<button data-ps="pad" data-v="'+k+'">'+k+'</button>'}).join("")+'</div>');
  else if(r.input==="money")h+='<div class="psrdisp">Kembalian: <b>'+rp(PSR.cur)+'</b></div>'+(done?'':'<div class="psrmoney">'+PSR_M.map(function(m){return'<button data-ps="money" data-v="'+m+'"><span>'+(m>=1000?"💵":"🪙")+'</span>'+rp(m)+'</button>'}).join("")+'<button data-ps="reset" class="gray">↩ Ulang</button></div>');
  else if(r.input==="scale")h+='<div class="psrscale"><div class="psrpan" style="--t:'+Math.max(-14,Math.min(14,(PSR.cur-r.need)/60))+'deg"><span>⚖️</span><b>'+gr(PSR.cur)+'</b><small>'+(PSR.tray.length?PSR.tray.map(gr).join(" + "):"belum ada anak timbangan")+'</small></div></div>'+(done?'':'<div class="psrmoney">'+PSR_W.map(function(w){return'<button data-ps="w" data-v="'+w+'"><span>🔩</span>'+gr(w)+'</button>'}).join("")+'<button data-ps="reset" class="gray">↩ Ulang</button></div>');
  else if(r.input==="pie"){PSR.sel=PSR.sel||{};var ns=Object.keys(PSR.sel).filter(function(k){return PSR.sel[k]}).length;h+='<div class="psrpiew">'+psrPie(r.pie.n,PSR.sel)+'<div class="psrdisp">Dipilih: <b>'+ns+'</b> dari '+r.pie.n+' potong</div></div>'}
  if(!done)h+='<div class="row" style="justify-content:center"><button class="btn green" data-ps="serah">🤝 Serahkan</button></div>';
  else{var okA=PSR.ans;h+='<div class="dtkfb '+(okA?"ok":"no")+'">'+(okA?"😊 Pas! Terima kasih. Warungmu untung "+rp(r.untung)+". ":"😕 Kurang tepat. ")+'<br><b>Cara menghitung:</b> '+esc(r.ex)+'</div><div class="row" style="justify-content:center"><button class="btn yel" data-ps="next">'+(PSR.k+1<n?"Pembeli berikutnya ➜":"Tutup warung 🏁")+'</button></div>'}
  h+='<div class="row" style="justify-content:flex-end;margin-top:4px"><button class="btn sm gray" data-ps="quit">'+(PSR.tan?"📤 Kirim & akhiri":"✖ Keluar")+'</button></div>'}
 else if(v==="end"){var e=el._res;h='<div class="dtkst"><div style="font-size:44px">'+(e.timeout?"⏰":"🏪")+'</div><h3>'+(e.timeout?"Waktu habis!":"Warung tutup!")+'</h3><div style="font-size:30px">'+"⭐".repeat(e.star)+'<span style="opacity:.25">'+"⭐".repeat(3-e.star)+'</span></div><p>Melayani tepat <b>'+e.b+' dari '+e.n+'</b> pembeli • 💰 Laba hari ini <b>'+rp(e.laba)+'</b></p>'+(e.nilai!=null?'<div class="dtkclue" style="font-size:18px">📤 Nilai tantangan: <b>'+e.nilai+'</b>'+(CL?' • terkirim ke guru':'')+'</div>':'')+
  '<div class="dtksk">'+Object.keys(e.sk).map(function(k){var o=e.sk[k];return'<div><span>'+esc(PSR_SKILL[k])+'</span><b>'+o.b+'/'+o.n+'</b></div>'}).join("")+'</div><p class="mut" style="font-size:13px">🪙 +'+e.kn+' koin • ✨ +'+e.xp+' XP</p><div class="row" style="justify-content:center">'+(e.nilai!=null?'':'<button class="btn yel" data-ps="again">🔁 Main lagi</button>')+'<button class="btn gray" data-ps="done">Selesai</button></div></div>'}
 b.innerHTML=h;$("psrTitle").textContent="🏪 Pasar Nusantara"+(PSR&&v!=="pick"?" • "+PSR_LV[PSR.lv].nm:"")}
function psrSerah(){var r=PSR.R[PSR.k],ok;if(r.input==="pie"){ok=Object.keys(PSR.sel||{}).filter(function(k){return PSR.sel[k]}).length===r.need}else ok=Math.round(PSR.cur)===Math.round(r.need);
 PSR.ans=ok;var o=PSR.sk[r.sk]||(PSR.sk[r.sk]={b:0,n:0});o.n++;if(ok){o.b++;PSR.b++;PSR.laba+=r.untung;try{SFX.ok()}catch(e){}}else{try{SFX.no()}catch(e){}}P.stats.answered++;if(ok)P.stats.correct++;
 if(CL)PSR.out.push({m:("_psr:"+PSR.lv).slice(0,60),s:("p"+PSR.k+"_"+r.sk).slice(0,20),q:String(r.say).slice(0,300),p:-1,k:0,ok:ok?1:0,d:0,t:Date.now()});psrRender()}
function psrEnd(){if(!PSR||PSR.done)return;PSR.done=true;clearInterval(PSR.tm);var n=PSR.R.length,b=PSR.b,star=b>=n-1?3:b>=Math.ceil(n*0.6)?2:1,kn=b*6+(star===3?20:0),xp=15+b*8,el=$("ovPsr");addCoins(kn);addXp(xp);P.psr=P.psr||{};P.psr[PSR.lv]=Math.max(P.psr[PSR.lv]||0,star);
 var nilai=PSR.tan?Math.round(b/n*100):null;P.history.unshift({t:Date.now(),mapel:"🏪 Pasar Nusantara ("+PSR_LV[PSR.lv].nm+")",paket:PSR.tan?"Tantangan Pasar":"Pasar Nusantara",benar:b,total:n,nilai:Math.round(b/n*100),k:PSR.tan?"tantangan":"kuis",w:CUR.w});P.history=P.history.slice(0,300);save();
 var jw=PSR.out.splice(0,100);if(CL){if(PSR.tan)queue({sesi:{mapel:("_psr:"+PSR.lv).slice(0,60),nama:"Pasar Nusantara ("+PSR_LV[PSR.lv].nm+")",benar:b,total:n,nilai:nilai,durasi:Math.round((Date.now()-PSR.t0)/1000),t:Date.now(),tt:srv(),dunia:CUR.w,tantangan:PSR.tan.id},jawaban:jw});else if(jw.length)queue({jawaban:jw})}
 if(PSR.tan&&Q&&Q.tan===PSR.tan)Q.finished=true;try{if(PSR.tan)rtSend({t:"ev",k:"kuis",m:"Pasar Nusantara",n:nilai})}catch(e){}
 el._res={star:star,b:b,n:n,laba:PSR.laba,sk:PSR.sk,kn:kn,xp:xp,nilai:nilai,timeout:PSR.tan&&srv()>PSR.batas};el._v="end";psrRender();el.classList.add("show");setMode("menu")}
function startPsrTan(t,r){var lv=String(t.mapel||"").slice(5);if(!PSR_LV[lv])lv="sedang";Q={tan:t,finished:false,t0:Date.now()};psrStart(lv,{seed:(t.id||1)*7919+13,tan:t,batas:r&&r.batas||(srv()+(t.menit||15)*60000)})}
$("ovPsr").addEventListener("click",function(e){var b=e.target.closest("[data-ps]");if(!b)return;var a=b.dataset.ps,el=this;
 if(a==="start"){psrStart(b.dataset.v);return}
 if(!PSR&&a!=="done")return;
 if(a==="pad"&&PSR.ans==null){var k=b.dataset.v,s=String(PSR.cur||"");if(k==="⌫")s=s.slice(0,-1);else s=(s+k).replace(/^0+/,"");if(s.length>9)return;PSR.cur=+s||0;psrRender();return}
 if(a==="money"&&PSR.ans==null){PSR.cur+=+b.dataset.v;psrRender();return}
 if(a==="w"&&PSR.ans==null){var w=+b.dataset.v;PSR.tray.push(w);PSR.cur+=w;psrRender();return}
 if(a==="reset"&&PSR.ans==null){PSR.cur=0;PSR.tray=[];psrRender();return}
 if(a==="pie"&&PSR.ans==null){PSR.sel=PSR.sel||{};var i=b.dataset.v;PSR.sel[i]=!PSR.sel[i];psrRender();return}
 if(a==="serah"&&PSR.ans==null){psrSerah();return}
 if(a==="next"){if(PSR.k+1>=PSR.R.length){psrEnd();return}PSR.k++;PSR.ans=null;PSR.cur=0;PSR.tray=[];PSR.sel={};psrRender();return}
 if(a==="quit"){if(PSR.tan){ask("Nilaimu dihitung dari pembeli yang sudah dilayani, lalu dikirim ke guru.",function(){psrEnd()},{ic:"📤",t:"Kirim dan akhiri tantangan?",ok:"Kirim",no:"Lanjut berjualan"});return}PSR=null;el.classList.remove("show");if(mode==="menu")setMode("play");return}
 if(a==="again"){var lv=PSR.lv;PSR=null;psrStart(lv);return}
 if(a==="done"){if(PSR)clearInterval(PSR.tm);PSR=null;el.classList.remove("show");if(mode==="menu")setMode("play");return}});
$("psrClose").onclick=function(){var el=$("ovPsr");if(PSR&&PSR.tan&&!PSR.done){toast("Tekan 📤 Kirim & akhiri untuk menyelesaikan tantangan.",2500);return}if(PSR)clearInterval(PSR.tm);if(el._v==="end")PSR=null;else if(PSR&&!PSR.tan)PSR=null;el.classList.remove("show");if(mode==="menu")setMode("play")};

/* =================================================================
   🌟 LAPISAN BELAJAR: pembahasan saat salah, ulangi soal yang salah
   (berjarak: besok, 3 hari, 7 hari), dan peta penguasaan per mapel.
   Hanya untuk LATIHAN. Tantangan/ujian tidak pernah dicatat di sini.
   ================================================================= */
var BEL_DAY=86400000,BEL_GAP=[1,3,7];
function belDb(){var b=lsGet("zv_bel",null);if(!b||typeof b!=="object"||!b.q)b={q:{}};return b}
function belDay0(t){var d=new Date(t);d.setHours(0,0,0,0);return d.getTime()}
function belKey(mid,s){return mid+"|"+skey(s)}
function belFindMid(s){var k=skey(s),f=null;(data.mapel||[]).some(function(m){if(m.soal.some(function(x){return skey(x)===k})){f=m.id;return true}return false});return f}
function belRec(s,mid,ok){try{if(!s||!s.q)return;if(!mid||String(mid).charAt(0)==="_")mid=belFindMid(s);if(!mid)return;
 var B=belDb(),k=belKey(mid,s),now=Date.now(),e=B.q[k]||{m:mid,b:-1,d:0,c:0,w:0};e.m=mid;e.l=ok?1:0;e.t=now;
 if(ok){e.c=(e.c||0)+1;if(e.b>=0&&e.d<=now){e.b++;if(e.b>=BEL_GAP.length)e.b=-2;else e.d=belDay0(now)+BEL_GAP[e.b]*BEL_DAY}else if(e.b===-1)e.b=-2}
 else{e.w=(e.w||0)+1;e.b=0;e.d=belDay0(now)+BEL_DAY}
 B.q[k]=e;var ks=Object.keys(B.q);if(ks.length>900){ks.sort(function(a,b){return B.q[a].t-B.q[b].t});ks.slice(0,ks.length-900).forEach(function(x){delete B.q[x]})}
 lsSet("zv_bel",B);return mid}catch(er){}return null}
function belEntry(mid,s,B){return(B||belDb()).q[belKey(mid,s)]||null}
function belIsDue(e,now){return!!e&&e.b>=0&&e.d<=(now||Date.now())}
function belDueList(mid){var B=belDb(),now=Date.now(),L=[];(data.mapel||[]).forEach(function(m){if(mid&&m.id!==mid)return;m.soal.forEach(function(x){if(belIsDue(belEntry(m.id,x,B),now))L.push({m:m,s:x})})});return L}
function belStat(m,B){var r={ok:0,ul:0,bl:0,n:m.soal.length,due:0},now=Date.now();m.soal.forEach(function(x){var e=belEntry(m.id,x,B);if(!e)r.bl++;else if(e.b>=0){r.ul++;if(belIsDue(e,now))r.due++}else if(e.l)r.ok++;else r.ul++});return r}
function belPrac(){var A=ARENA;if(A&&A.kind==="lk")return!A.t;if(A)return!!(Q&&Q.tan&&Q.tan.lat);return!(Q&&Q.tan)}
var belT=null;
function belShow(s,ok,li){if(ok||!s)return;var BG=(data.pengaturan&&data.pengaturan.bahasG)||"";if(BG==="bs")return;var ch=qChoice(s),key=ch?(s.tipe==="bs"?s.opsi[s.jawab]:(AR_L[li!=null?li:s.jawab]||"")+". "+s.opsi[s.jawab]):keyText(s),bh=BG?"":(s.bahas||"");
 var el=$("belCard");el.innerHTML='💡 Jawaban benar: <span class="bk">'+esc(String(key).slice(0,120))+'</span>'+(bh?'<div style="margin-top:4px">'+esc(String(bh).slice(0,260))+'</div>':'')+'<div class="mut" style="font-size:11px;margin-top:4px">🔁 Soal ini akan muncul lagi besok supaya makin ingat.</div>';
 el.classList.add("show");clearTimeout(belT);belT=setTimeout(function(){el.classList.remove("show")},bh?6500:4000)}
var BEL_OUT=[];
function belFlush(){if(!BEL_OUT.length||!CL)return;var L=BEL_OUT.splice(0,100);try{queue({jawaban:L})}catch(e){}}
var BEL_SW={};
function belGame(s,mp,ok,li,pk){if(!belPrac())return;var mid=belRec(s,mp&&mp.id?mp.id:(mp||(Q&&Q.tan&&Q.tan.mapel)),ok);belShow(s,ok,li);if(!ok&&mid)BEL_SW[mid]=(BEL_SW[mid]||0)+1;
 if(CL&&mid&&qChoice(s)){BEL_OUT.push({m:mid,s:skey(s),q:String(s.q).slice(0,300),p:pk==null?-1:pk,k:s.jawab,ok:ok?1:0,d:0,t:Date.now()});if(BEL_OUT.length>=20)belFlush()}}
function belSaran(){var L=Object.keys(BEL_SW).filter(function(id){return BEL_SW[id]>=2}).map(function(id){return(data.mapel||[]).filter(function(m){return m.id===id&&(m.materi||[]).length})[0]}).filter(Boolean);BEL_SW={};return L.length?" 📖 Tips: pelajari lagi materi di gedung "+L.map(function(m){return m.nama}).join(", ")+", lalu tekan 🔁 Ulangi sekarang di menu Main.":""}
function belUlangHTML(){var L=belDueList();if(!L.length)return"";return'<div class="ulbar"><div>🔁 Ada <b style="color:var(--yel)">'+L.length+' soal</b> yang perlu diulang hari ini<small>Soal yang dulu salah, diulang supaya benar-benar ingat. Bonus koin!</small></div><button class="btn yel sm" data-ulang="1">Ulangi sekarang ➜</button></div>'}
function belStart(mid){var L=belDueList(mid);if(!L.length){toast("🎉 Tidak ada soal yang perlu diulang saat ini.",2500);return}L=shuffle(L).slice(0,10);
 Q={log:[],t0:Date.now(),type:"mapel",ul:true,ulm:L.map(function(x){return x.m}),m:{id:"_ulang",nama:"Ulangi Soal",waktu:45,jumlah:L.length,soal:[]},list:L.map(function(x){return x.s}),i:0,benar:0,hearts:3,combo:0,maxCombo:0,coins:0,xp:0,locked:false,up:0};
 setMode("quiz");$("ovQuiz").classList.add("show");showQ()}
/* 📖 kartu konsep: salah berulang (2x di soal yang sama, atau 2x di TP yang sama dalam satu kuis) -> ajak membuka materi */
function belKonsep(s,mid){var m=(data.mapel||[]).filter(function(x){return x.id===mid})[0];if(!m||!(m.materi||[]).length)return;var e=belEntry(mid,s),tp=s.tp&&String(s.tp).trim();
 Q.tpw=Q.tpw||{};if(tp)Q.tpw[tp]=(Q.tpw[tp]||0)+1;if(!((e&&e.w>=2)||(tp&&Q.tpw[tp]>=2)))return;
 var d=document.createElement("div");d.className="konsep";d.innerHTML='<b>📖 Yuk pahami lagi konsepnya!</b><span>'+(e&&e.w>=2?"Soal ini sudah "+e.w+" kali kurang tepat.":"Kamu kurang tepat 2 kali di TP <b>"+esc(tp)+"</b>.")+' Buka materi gedung '+esc(m.nama)+' sebentar, lalu lanjutkan kuis.</span><button class="btn sm yel" type="button">📖 Buka materi</button>';
 d.querySelector("button").onclick=function(){belMat(m)};$("qBahas").appendChild(d)}
function belMat(m){Q.matBack=true;$("ovQuiz").classList.remove("show");curGedung=m;setMode("menu");$("gdTitle").textContent="📖 Materi "+m.nama;$("gdQuiz").style.display="none";renderGedung();$("ovGedung").classList.add("show");if(m.materi.length===1)viewMat(0)}
function belMatBack(){if(!Q||!Q.matBack)return false;Q.matBack=false;if(Q.finished)return false;setMode("quiz");$("ovQuiz").classList.add("show");return true}
function belFinish(){stopSpeak();clearInterval(qTimer);$("ovQuiz").classList.remove("show");Q.finished=true;setMode("play");var n=Q.list.length,b=Q.benar,kn=b*8;addCoins(kn);addXp(10+b*6);P.history.unshift({t:Date.now(),mapel:"Ulangi Soal",paket:data.judul,benar:b,total:n,nilai:Math.round(b/n*100),k:"kuis",w:CUR.w});P.history=P.history.slice(0,300);save();
 if(CL&&Q.log.length)queue({jawaban:Q.log});var sisa=belDueList().length;
 zDlg({ic:b===n?"🌟":"🔁",t:"Latihan ulang selesai!",m:"Benar "+b+" dari "+n+" soal • 🪙 +"+kn+" koin. "+(b?b+" soal naik level ingatan dan akan dicek lagi beberapa hari lagi. ":"")+(n-b?(n-b)+" soal diulang lagi besok. ":"")+(sisa?"Masih ada "+sisa+" soal untuk diulang hari ini.":""),ok:sisa?"Ulangi lagi":"Oke",no:sisa?"Nanti":null,alert:!sisa,cb:function(v){if(v&&sisa)belStart()}})}
function belTpStat(m,B){var T={},o=[];m.soal.forEach(function(x){var t=x.tp&&String(x.tp).trim();if(!t)return;if(!T[t]){T[t]={tp:t,ok:0,ul:0,n:0};o.push(T[t])}var e=belEntry(m.id,x,B);T[t].n++;if(e){if(e.b>=0||!e.l)T[t].ul++;else T[t].ok++}});return o}
function kuasaHTML(){var B=belDb(),h='<div class="mut">Peta penguasaanmu di perangkat ini. Soal yang salah akan diulang besok, 3 hari, lalu 7 hari lagi sampai benar-benar dikuasai. 🌟</div>'+belUlangHTML(),tot={ok:0,n:0};
 data.mapel.forEach(function(m){var r=belStat(m,B);tot.ok+=r.ok;tot.n+=r.n;var pc=function(v){return r.n?v/r.n*100:0};
  h+='<div class="kua"><div class="kh"><span><i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:'+m.warna+'"></i> '+esc(m.nama)+'</span><span style="color:var(--yel)">'+Math.round(pc(r.ok))+'% 🌟</span></div><div class="kbar"><i style="width:'+pc(r.ok)+'%;background:#22c55e"></i><i style="width:'+pc(r.ul)+'%;background:#fbbf24"></i></div><div class="kl">🟢 '+r.ok+' dikuasai • 🟡 '+r.ul+' sedang diulang • ⚪ '+r.bl+' belum dicoba'+(r.due?' • <a href="#" data-ulang="'+esc(m.id)+'" style="color:var(--yel)">🔁 ulangi '+r.due+' soal</a>':'')+'</div>'+belTpStat(m,B).map(function(t){var p=t.n?Math.round(t.ok/t.n*100):0;return'<div class="ktp"><span>🎯 '+esc(t.tp)+'</span><div class="kbar" style="height:8px;margin:3px 0 0"><i style="width:'+p+'%;background:#22c55e"></i><i style="width:'+(t.n?t.ul/t.n*100:0)+'%;background:#fbbf24"></i></div><small>'+p+'%</small></div>'}).join("")+'</div>'});
 return'<div class="rstat"><div><b>'+tot.ok+'</b>Soal dikuasai</div><div><b>'+(tot.n?Math.round(tot.ok/tot.n*100):0)+'%</b>Penguasaan</div><div><b>'+belDueList().length+'</b>Perlu diulang hari ini</div></div>'+h}

/* =================================================================
   KUIS
   ================================================================= */
var Q={locked:true},qTimer=null;
function openQuiz(o){
 var m,list;
 if(o.type==="mapel"){m=o.m;var nq=Math.min(m.jumlah,m.soal.length),due=shuffle(belDueList(m.id).map(function(x){return x.s})).slice(0,Math.ceil(nq/2));list=due.concat(shuffle(m.soal.filter(function(x){return due.indexOf(x)<0}))).slice(0,nq)}
 else{m=pick(data.mapel);list=[pick(m.soal)]}
 Q={log:[],t0:Date.now(),type:o.type,m:m,npc:o.npc,list:list,i:0,benar:0,hearts:o.type==="mapel"?3:1,combo:0,maxCombo:0,coins:0,xp:0,locked:false};
 setMode("quiz");$("ovQuiz").classList.add("show");showQ();
}
function heartsTxt(){if(Q.ul)return"🔁 "+(Q.i+1)+"/"+Q.list.length;return Q.type==="mapel"?(Q.hearts>0?new Array(Q.hearts+1).join("❤️"):"💔"):""}
function showQ(){
 var s=Q.list[Q.i],m=Q.m;
 $("qTitle").textContent=Q.ul?"🔁 Ulangi Soal • "+Q.ulm[Q.i].nama:(Q.type==="mapel"?"🏫 Gedung ":"💬 "+Q.npc.d.n+" • ")+m.nama;
 $("qHeart").textContent=heartsTxt();
 $("qNo").textContent=Q.type==="mapel"?"Soal "+(Q.i+1)+" dari "+Q.list.length:"Pertanyaan warga";
 $("qCombo").textContent=Q.combo>1?"🔥 Combo x"+Q.combo:"";
 $("qText").textContent=s.q;
 var img=$("qImg");if(s.gambar){img.src=imgUrl(s.gambar);img.style.display="block"}else{img.removeAttribute("src");img.style.display="none"}
 $("qBahas").style.display="none";$("qNext").style.display="none";
 var box=$("qOpts");box.innerHTML="";Q.locked=false;Q.qT=performance.now();$("qTip").textContent=(!Q.ul&&Q.type==="mapel"&&belIsDue(belEntry(m.id,s))?"🔁 Soal ulangan • ":"")+(s.tipe&&s.tipe!=="pg"?TIPE[s.tipe]:"");
 if(!qChoice(s))renderQ(s,box,{onDone:function(r){answer(null,checkAns(s,r),r)}});
 else{var order=s.tipe==="bs"?s.opsi.map(function(t,i){return{t:t,ok:i===s.jawab,i:i}}):shuffle(s.opsi.map(function(t,i){return{t:t,ok:i===s.jawab,i:i}}));
 order.forEach(function(o,i){var b=document.createElement("button");b.className="opt";b.textContent=(s.tipe==="bs"?(i?"✗  ":"✓  "):String.fromCharCode(65+i)+".  ")+o.t;b._ok=o.ok;b._i=o.i;b.onclick=function(){answer(b,o.ok)};box.appendChild(b)})}
 if(P.settings.ttsAuto)setTimeout(qSpeak,250);
 var total=m.waktu*1000,start=performance.now();clearInterval(qTimer);var bar=$("qTimer");bar.style.width="100%";bar.style.background="#4de08a";
 qTimer=setInterval(function(){var left=Math.max(0,total-(performance.now()-start)),pc=left/total*100;bar.style.width=pc+"%";bar.style.background=pc<30?"#ef4444":pc<60?"#fbbf24":"#4de08a";if(left<=0){clearInterval(qTimer);answer(null,false)}},100);
}
function answer(btn,ok,resp){
 if(Q.locked)return;stopSpeak();Q.locked=true;clearInterval(qTimer);var s=Q.list[Q.i],ch=qChoice(s);if(!ch)qLock($("qOpts"));
 var BG0=(data.pengaturan&&data.pengaturan.bahasG)||"";Array.prototype.forEach.call($("qOpts").children,function(b){if(b._ok&&(BG0!=="bs"||b===btn))b.classList.add("ok");else if(b===btn)b.classList.add("no")});
 P.stats.answered++;
 var qmid=Q.ul?Q.ulm[Q.i].id:Q.m.id;belRec(s,qmid,ok);if(Q.ul&&ok&&belEntry(qmid,s)&&belEntry(qmid,s).b!==0)Q.up++;
 Q.log.push({m:qmid,s:skey(s),q:String(s.q).slice(0,300),p:resp!==undefined?(ok?0:1):(btn?btn._i:-1),k:ch?s.jawab:0,ok:ok?1:0,d:Math.round((performance.now()-Q.qT)/100)/10,t:Date.now()});
 if(ok){Q.benar++;Q.combo++;Q.maxCombo=Math.max(Q.maxCombo,Q.combo);P.stats.maxCombo=Math.max(P.stats.maxCombo,Q.combo);P.stats.correct++;
  if(P.stats.daily.d!==today())P.stats.daily={d:today(),n:0};P.stats.daily.n++;
  Q.coins+=10+Math.min(Q.combo-1,5)*2;Q.xp+=20+Math.min(Q.combo-1,5)*3;SFX.ok()}
 else{if(!Q.ul)Q.hearts--;Q.combo=0;SFX.no()}
 $("qHeart").textContent=heartsTxt();$("qCombo").textContent=Q.combo>1?"🔥 Combo x"+Q.combo:"";
 var bh=$("qBahas"),BG=(data.pengaturan&&data.pengaturan.bahasG)||"";bh.textContent=(ok?"✅ Benar! ":(btn||resp!==undefined?"❌ Kurang tepat. ":"⏰ Waktu habis. "))+(BG!=="bs"&&!ch&&!ok?"Jawaban benar: "+keyText(s)+". ":"")+(BG?"":(s.bahas||""));bh.style.display="block";
 if(!ok&&Q.type==="mapel")belKonsep(s,qmid);
 var last=Q.type!=="mapel"||Q.i>=Q.list.length-1||Q.hearts<=0;$("qNext").textContent=last?(Q.type==="mapel"?"Lihat Hasil ➜":"Selesai ➜"):"Lanjut ➜";$("qNext").style.display="inline-flex";
 save();
}
$("qNext").onclick=function(){if(Q.type==="ujian"){if(!Q.finished)uNext();return}if(!Q.locked||Q.finished)return;if(Q.type!=="mapel")return finishNpc();if(Q.ul&&Q.i>=Q.list.length-1)return belFinish();if(Q.hearts<=0||Q.i>=Q.list.length-1)return finishMapel();Q.i++;showQ()};
var lastResult=null;
function finishMapel(){stopSpeak();
 clearInterval(qTimer);$("ovQuiz").classList.remove("show");Q.finished=true;setMode("menu");
 var m=Q.m,total=Q.list.length,score=Math.round(Q.benar/total*100),alive=Q.hearts>0,perfect=Q.benar===total;
 var bonus=perfect?30:0;Q.coins+=bonus;Q.xp+=bonus+(alive?20:0);
 P.coins+=Q.coins;if(alive){P.stats.done[m.id]=1;(P.stats.wdone[CUR.w]=P.stats.wdone[CUR.w]||{})[m.id]=1}if(perfect)P.stats.perfect++;
 if(P.best[m.id]==null||Q.benar>P.best[m.id])P.best[m.id]=Q.benar;
 var tNow=Date.now();P.history.unshift({t:tNow,mapel:m.nama,paket:data.judul,benar:Q.benar,total:total,nilai:score,k:"kuis",w:CUR.w});P.history=P.history.slice(0,300);
 var up=addXp(Q.xp);save();refreshLabels();
 $("rIcon").textContent=!alive?"💔":perfect?"🏆":score>=70?"🎉":"💪";
 $("rTitle").textContent=!alive?"Nyawa habis!":perfect?"Sempurna!":score>=70?"Hebat!":"Terus berlatih!";
 $("rSub").textContent="Gedung "+m.nama+" • Benar "+Q.benar+" dari "+total+(Q.maxCombo>1?" • Combo terbaik x"+Q.maxCombo:"");
 $("rScore").textContent=score;$("rCoin").textContent="+"+Q.coins;$("rXp").textContent="+"+Q.xp;
 $("rExtra").textContent=(perfect?"Bonus nilai sempurna +30. ":"")+(!alive?"Coba lagi untuk menyelesaikan gedung ini.":"");
 lastResult={m:m,score:score,benar:Q.benar,total:total};rtSend({t:"ev",k:"kuis",m:m.nama,n:score});
 if(CL){var base=$("rExtra").textContent;$("rExtra").textContent=base+" 📤 Mengirim nilai ke guru...";queue({sesi:{mapel:m.id,nama:m.nama,benar:Q.benar,total:total,nilai:score,durasi:Math.round((Date.now()-Q.t0)/1000),t:tNow,dunia:CUR.w},jawaban:Q.log}).then(function(){$("rExtra").textContent=base+(outbox.length?" ⏳ Nilai disimpan dan akan dikirim ke guru saat ada internet.":" ✅ Nilai sudah tercatat di dashboard guru.")})}
 $("rWa").style.display="none";$("ovResult").classList.add("show");if(perfect)SFX.win();else SFX.coin();
 var d={x:pos.x,z:pos.z};var door=INTER.filter(function(i){return i.type==="door"&&i.m===m})[0];if(door){pos.x=door.x+(door.ox||0)*3.2;pos.z=door.z+(door.oz==null?-1:door.oz)*3.2}
 checkMissions();
}
function finishNpc(){
 $("ovQuiz").classList.remove("show");Q.finished=true;setMode("play");var n=Q.npc;if(CL)queue({jawaban:Q.log});if(n.peti){petiDone(n.peti,!!Q.benar);save();checkMissions();return}
 if(Q.benar){P.stats.helped++;addCoins(25);addXp(30);n.cool=performance.now()+60000;toast("🙏 "+n.d.n+": Terima kasih banyak! +25 koin");SFX.coin()}
 else{n.cool=performance.now()+20000;toast(n.d.n+": Tidak apa-apa, coba lagi nanti ya!")}
 save();checkMissions();
}
$("rClose").onclick=function(){$("ovResult").classList.remove("show");setMode("play")};
$("rAgain").onclick=function(){$("ovResult").classList.remove("show");openQuiz({type:"mapel",m:lastResult.m})};
$("rWa").onclick=function(){if(!lastResult)return;var r=lastResult,d=new Date();
 var txt="📋 *Hasil ZuperVerse*\nNama: "+(P.name||"-")+"\nPaket: "+data.judul+(data.guru?" ("+data.guru+")":"")+"\nMapel: "+r.m.nama+"\nBenar: "+r.benar+" dari "+r.total+"\nNilai: *"+r.score+"*\nLevel: "+P.level+"\nWaktu: "+d.toLocaleDateString("id-ID")+" "+d.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"});
 window.open("https://wa.me/?text="+encodeURIComponent(txt),"_blank")};

/* =================================================================
   NPC DIALOG
   ================================================================= */
var curNpc=null;
function openNpc(n){curNpc=n;setMode("menu");$("nAv").textContent=n.d.ic;$("nName").textContent=n.d.n;$("nLine").textContent=pick(NPC_LINES).replace("{n}",P.name||"teman");$("ovNpc").classList.add("show")}
$("nNo").onclick=function(){$("ovNpc").classList.remove("show");setMode("play");curNpc.cool=performance.now()+8000};
$("nYes").onclick=function(){$("ovNpc").classList.remove("show");openQuiz({type:"npc",npc:curNpc})};

/* =================================================================
   RUANG MATERI (gedung)
   ================================================================= */
var curGedung=null;
function matKey(m,i){return m.id+":"+i}
function quizBtn(m){var mats=m.materi||[],seen=mats.filter(function(_,j){return P.stats.read[matKey(m,j)]}).length,lock=m.wajibMateri&&seen<mats.length,b=$("gdQuiz");b.disabled=lock;b.textContent=lock?"🔒 Pelajari semua materi dulu ("+seen+"/"+mats.length+")":"✏️ Mulai Kuis ("+Math.min(m.jumlah,m.soal.length)+" soal)";return seen}
function openGedung(m){$("gdQuiz").style.display=GURU?"none":"";if(!(m.materi||[]).length){openQuiz({type:"mapel",m:m});return}curGedung=m;setMode("menu");$("gdTitle").textContent="🏫 Gedung "+m.nama;renderGedung();$("ovGedung").classList.add("show")}
function renderGedung(){var m=curGedung,mats=m.materi;
 $("gdView").innerHTML="";$("gdView").style.display="none";$("gdList").style.display="block";$("gdBack").style.display="none";
 $("gdList").innerHTML=mats.map(function(t,i){var s=!!P.stats.read[matKey(m,i)],J=JENIS[t.jenis]||JENIS.link;return'<div class="mat'+(s?" seen":"")+'" data-mat="'+i+'"><div class="ic">'+J.ic+'</div><div class="bd"><div class="nm">'+esc(t.judul)+'</div><div class="ds">'+J.nm+(s?" • ✅ sudah dipelajari":" • 🪙 +5 saat pertama dibuka")+'</div></div><button class="btn sm">Buka</button></div>'}).join("");
 var seen=quizBtn(m);
 $("gdSub").textContent=(m.wajibMateri?"Guru meminta kamu mempelajari semua materi sebelum kuis. ":"Pelajari materi dulu agar lebih siap menjawab soal. ")+seen+" dari "+mats.length+" materi sudah dipelajari."}
function viewMat(i){var m=curGedung,t=m.materi[i],h='<h3 style="font-family:var(--fh);margin:12px 0 0">'+(JENIS[t.jenis]||JENIS.link).ic+" "+esc(t.judul)+'</h3>',yt;
 if(t.jenis==="video"&&(yt=ytId(t.url))){var st=ytStart(t.url);h+='<div class="vid"><iframe src="https://www.youtube-nocookie.com/embed/'+yt+'?rel=0&modestbranding=1&playsinline=1'+(st?"&start="+st:"")+'" title="'+esc(t.judul)+'" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><div class="row"><a class="btn gray sm" href="'+esc(t.url)+'" target="_blank" rel="noopener">Video tidak bisa diputar? Buka di YouTube ↗</a></div>'}
 else if(t.jenis==="video"&&/\.(mp4|webm|ogg)(\?|$)/i.test(t.url)){h+='<div class="vid"><video src="'+esc(t.url)+'" controls playsinline></video></div>'}
 else if(t.jenis==="gambar"){h+='<img class="mimg" src="'+esc(imgUrl(t.url))+'" alt="'+esc(t.judul)+'">'}
 else if(t.jenis!=="teks"){var em=driveEmbed(t.url);if(em)h+='<div class="vid" style="padding-top:75%"><iframe src="'+esc(em)+'" allow="autoplay; fullscreen" allowfullscreen></iframe></div>';h+='<div class="row"><a class="btn yel" href="'+esc(t.url)+'" target="_blank" rel="noopener">🔗 Buka materi di tab baru ↗</a></div>'}
 if(t.isi)h+=(TTS.ok?'<div class="row" style="margin-top:8px"><button class="btn sm yel" data-spk="1">🔊 Bacakan</button><button class="btn sm gray" data-spk="0">⏹ Berhenti</button></div>':'')+'<div class="mtext"><p>'+esc(t.isi).replace(/\n{2,}/g,"</p><p>").replace(/\n/g,"<br>")+'</p></div>';
 $("gdList").style.display="none";var v=$("gdView");v.innerHTML=h;v.style.display="block";$("gdBack").style.display="inline-flex";
 var k=matKey(m,i);if(!P.stats.read[k]){P.stats.read[k]=Date.now();addCoins(5);addXp(10);SFX.coin();toast("📺 Materi baru dipelajari! +5 koin");save();checkMissions();if(CL)queue({materi:[{mapel:m.id,idx:i,t:Date.now()}]})}
 var sn=quizBtn(m);$("gdSub").textContent=sn+" dari "+m.materi.length+" materi sudah dipelajari."}
$("gdList").addEventListener("click",function(e){var c=e.target.closest("[data-mat]");if(c){SFX.click();viewMat(+c.dataset.mat)}});
$("gdBack").onclick=function(){stopSpeak();renderGedung()};
$("gdView").addEventListener("click",function(e){var b=e.target.closest("[data-spk]");if(!b)return;if(b.dataset.spk==="1"){var mt=$("gdView").querySelector(".mtext"),hd=$("gdView").querySelector("h3");speak((hd?hd.textContent.replace(/^\S+\s/,"")+". ":"")+(mt?mt.innerText||mt.textContent:""))}else stopSpeak()});
function closeGedung(){stopSpeak();$("gdView").innerHTML="";$("ovGedung").classList.remove("show")}
$("gdClose").onclick=function(){closeGedung();if(belMatBack())return;setMode("play")};
$("gdQuiz").onclick=function(){if(this.disabled)return;var m=curGedung;closeGedung();openQuiz({type:"mapel",m:m})};

/* =================================================================
   PAPAN MISI
   ================================================================= */
var misiTab="misi";
function openMisi(){setMode("menu");misiTab="misi";renderMisi();$("ovMisi").classList.add("show")}
function renderMisi(){
 Array.prototype.forEach.call(document.querySelectorAll("[data-mt]"),function(b){b.classList.toggle("on",b.dataset.mt===misiTab)});
 var h="";
 if(misiTab==="misi"){vis().forEach(function(m){var s=mState(m);h+='<div class="mis'+(s.claimed?" done":"")+'"><div class="ic">'+m.ic+'</div><div class="bd"><div class="nm">'+esc(m.nama)+(m.daily?' <span style="font-size:11px;color:var(--yel)">• HARIAN</span>':"")+'</div><div class="ds">'+esc(m.desc)+'</div><div class="pbar"><i style="width:'+(s.g/s.t*100)+'%"></i></div><div class="rw">🪙 '+m.reward+' • '+s.g+'/'+s.t+'</div></div>'+(s.claimed?'<span style="font-weight:900;color:var(--green)">✔</span>':s.done?'<button class="btn yel sm" data-claim="'+m.id+'">Klaim</button>':'')+'</div>'})}
 else if(misiTab==="profil"){var t=P.stats;h='<div class="rstat"><div><b>'+P.level+'</b>Level</div><div><b>'+P.coins+'</b>Koin</div><div><b>'+t.correct+'</b>Jawaban Benar</div><div><b>'+t.books+'</b>Buku</div><div><b>'+t.helped+'</b>Warga Dibantu</div><div><b>'+t.maxCombo+'</b>Combo Terbaik</div></div>';
  h+='<div class="mut" style="margin-top:14px">Paket aktif: <b>'+esc(data.judul)+'</b>'+(data.guru?" oleh "+esc(data.guru):"")+'</div><div class="hist" style="margin-top:8px">';data.mapel.forEach(function(m){h+='<div><span><i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:'+m.warna+'"></i> '+esc(m.nama)+'</span><span>'+(P.best[m.id]!=null?"Terbaik "+P.best[m.id]+"/"+Math.min(m.jumlah,m.soal.length):"Belum dicoba")+'</span></div>'});h+="</div>"}
 else if(misiTab==="lencana"){h=badgesHTML()}
 else if(misiTab==="kuasa"){h=kuasaHTML()}
 else{h=riwayatHTML();if(CL&&!RW.busy&&Date.now()-RW.at>60000)rwLoad()}
 $("mBody").innerHTML=h;
}
$("mBody").addEventListener("click",function(e){var ul=e.target.closest("[data-ulang]");if(ul){e.preventDefault();$("ovMisi").classList.remove("show");belStart(ul.dataset.ulang==="1"?null:ul.dataset.ulang);return}var ce=e.target.closest("[data-cert]");if(ce){printBadgeCert(ce.dataset.cert);return}var f=e.target.closest("[data-rwf]");if(f){RW.f=f.dataset.rwf;renderMisi();return}var b=e.target.closest("[data-claim]");if(b)claim(b.dataset.claim)});
/* ---------- 📊 RIWAYATKU (murid) ---------- */
var RW={list:null,at:0,busy:false,err:"",f:"semua",kode:""};
function rwLoad(){if(!CL||!API_URL)return;RW.busy=true;api("/murid/riwayat",{kode:CL.kode,token:CL.token}).then(function(r){RW.busy=false;RW.list=r.riwayat||[];RW.kode=CL.kode;RW.at=Date.now();RW.err="";if($("ovMisi").classList.contains("show")&&misiTab==="riwayat")renderMisi()},function(e){RW.busy=false;RW.at=Date.now();RW.err=e.message;if($("ovMisi").classList.contains("show")&&misiTab==="riwayat")renderMisi()})}
function rwData(){var pend={},by={},out=[];outbox.forEach(function(o){if(o.sesi&&o.sesi.t)pend[o.sesi.t]=1});
 P.history.forEach(function(r){var e={t:r.t,m:r.mapel,pk:r.paket||"",b:r.benar,tot:r.total,n:r.nilai,k:r.k||"kuis",j:r.j||"",w:r.w||"",src:"hp",pend:!!pend[r.t]};by[r.t]=e;out.push(e)});
 if(CL&&RW.list&&RW.kode===CL.kode)RW.list.forEach(function(r){if(by[r.t]){by[r.t].ok=1;if(!by[r.t].pk&&r.pk)by[r.t].pk=r.pk;return}out.push({t:r.t,m:r.m,pk:r.pk,b:r.b,tot:r.tot,n:r.n,k:r.k,j:r.j,w:r.w,src:"server"})});
 return out.sort(function(a,b){return b.t-a.t})}
function riwayatHTML(){var all=rwData(),L=all.filter(function(e){return RW.f==="semua"||e.k===RW.f}),sc=L.filter(function(e){return e.n!=null}),h="";
 if(!all.length)return'<div class="mut">Belum ada riwayat. Selesaikan kuis di gedung mapel'+(CL?' atau tantangan dari guru':'')+' untuk melihat nilaimu di sini.</div>'+(CL&&RW.busy?'<div class="mut" style="margin-top:6px">Memuat riwayat dari kelas...</div>':'');
 var days={};L.forEach(function(e){days[new Date(e.t).toDateString()]=1});
 h+='<div class="rstat"><div><b>'+L.length+'</b>'+(RW.f==="tantangan"?"Tantangan":"Kuis")+' dikerjakan</div><div><b>'+(sc.length?avg(sc.map(function(e){return e.n})):"-")+'</b>Rata-rata nilai</div><div><b>'+(sc.length?Math.max.apply(null,sc.map(function(e){return e.n})):"-")+'</b>Nilai terbaik</div><div><b>'+Object.keys(days).length+'</b>Hari belajar</div></div>';
 h+='<div class="tabs" style="margin-top:12px">'+[["semua","Semua"],["kuis","✏️ Kuis"],["tantangan","⚡ Tantangan"]].map(function(x){return'<button class="tab'+(RW.f===x[0]?" on":"")+'" data-rwf="'+x[0]+'">'+x[1]+'</button>'}).join("")+'</div>';
 var last=sc.slice(0,15).reverse();if(last.length>=2)h+='<div style="margin-top:10px;background:rgba(255,255,255,.04);border-radius:14px;padding:6px">'+svgLine(last.map(function(e){var d=new Date(e.t);return{v:e.n,lbl:d.getDate()+"/"+(d.getMonth()+1)}}),{w:Math.max(320,Math.min(600,(window.innerWidth||600)-70)),h:180,label:"Perkembangan nilai"})+'<div class="mut" style="font-size:12px;text-align:center">Perkembangan '+last.length+' nilai terakhir</div></div>';
 var per={};sc.slice().reverse().forEach(function(e){var o=per[e.m]||(per[e.m]={n:0,first:e.n,last:e.n,best:e.n});o.n++;o.last=e.n;if(e.n>o.best)o.best=e.n});
 var ks=Object.keys(per);if(ks.length)h+='<h4 style="margin:14px 0 6px">📚 Per mapel</h4><div class="tbl-wrap"><table class="dt"><tr><th>Mapel</th><th>Dicoba</th><th>Pertama</th><th>Terakhir</th><th>Terbaik</th><th></th></tr>'+ks.map(function(k){var o=per[k],d=o.last-o.first;return'<tr><td><b>'+esc(k)+'</b></td><td>'+o.n+'×</td><td>'+o.first+'</td><td>'+o.last+'</td><td><b>'+o.best+'</b></td><td>'+(o.n<2?'':d>0?'<span style="color:#4ade80">▲ naik '+d+'</span>':d<0?'<span style="color:#fca5a5">▼ turun '+(-d)+'</span>':'<span class="mut">tetap</span>')+'</td></tr>'}).join("")+'</table></div>';
 h+='<h4 style="margin:14px 0 6px">🕘 Semua riwayat</h4><div class="hist">'+L.slice(0,150).map(function(e){var d=new Date(e.t);return'<div><span>'+(e.k==="tantangan"?'⚡ <b>'+esc(e.j||"Tantangan")+'</b> • ':'')+esc(e.m)+'<br><small class="mut">'+d.toLocaleDateString("id-ID",{weekday:"short",day:"numeric",month:"short"})+" "+d.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"})+(e.pk?' • 📦 '+esc(e.pk):'')+(e.pend?' • <span style="color:var(--yel)">⏳ belum terkirim</span>':e.src==="server"?' • ☁️ dari perangkat lain':'')+'</small></span><span style="text-align:right"><b>'+(e.n==null?'✅':e.n)+'</b><br><small class="mut">'+(e.n==null?'terkirim':e.b+'/'+e.tot)+'</small></span></div>'}).join("")+'</div>';
 if(CL)h+='<div class="mut" style="font-size:12px;margin-top:8px">'+(RW.busy?'Memuat riwayat dari kelas...':RW.err?'⚠️ Riwayat dari kelas belum bisa dimuat ('+esc(RW.err)+'). Yang tampil adalah riwayat di HP ini.':'Termasuk nilai yang kamu kerjakan di perangkat lain dengan akun kelas yang sama.')+'</div>';
 return h}
function goFull(){try{var el=document.documentElement,f=el.requestFullscreen||el.webkitRequestFullscreen;if(!f)return;var r=f.call(el);if(r&&r.catch)r.catch(function(){})}catch(e){}}
function isFull(){return!!(document.fullscreenElement||document.webkitFullscreenElement)}
function toggleFull(){try{if(isFull())(document.exitFullscreen||document.webkitExitFullscreen).call(document);else goFull()}catch(e){toast("Layar penuh tidak didukung di perangkat ini")}}
function updFullBtn(){var b=$("pFull");if(!b)return;var ok=!!(document.fullscreenEnabled||document.webkitFullscreenEnabled);b.style.display=ok?"":"none";if(!ok)$("pRiw").style.gridColumn="1/-1";b.textContent=isFull()?"⛶ Keluar Layar Penuh":"⛶ Layar Penuh"}
/* versi terpasang: langsung layar penuh pada ketukan/klik pertama (browser mewajibkan ada sentuhan/klik dulu) */
var fsArmed=false;
function fsArm(){if(fsArmed||!isStandalone())return;fsArmed=true;var go=function(e){if(e.type==="keydown"&&(e.key==="Escape"||e.key==="F11"))return;off();if(!isFull())goFull()},off=function(){document.removeEventListener("pointerup",go,true);document.removeEventListener("keydown",go,true)};document.addEventListener("pointerup",go,true);document.addEventListener("keydown",go,true)}
function updFsBtn(){var b=$("fsBtn");if(!b)return;var fine=!(window.matchMedia&&window.matchMedia("(pointer: coarse)").matches);b.classList.toggle("show",isStandalone()&&fine&&!isFull()&&!!(document.fullscreenEnabled||document.webkitFullscreenEnabled))}
$("fsBtn").onclick=function(e){e.stopPropagation();goFull()};
document.addEventListener("fullscreenchange",updFsBtn);document.addEventListener("webkitfullscreenchange",updFsBtn);
fsArm();updFsBtn();
document.addEventListener("fullscreenchange",updFullBtn);document.addEventListener("webkitfullscreenchange",updFullBtn);updFullBtn();
$("pFull").onclick=function(){toggleFull()};
$("pRiw").onclick=function(){resumeGame();setMode("menu");misiTab="riwayat";renderMisi();$("ovMisi").classList.add("show")};
Array.prototype.forEach.call(document.querySelectorAll("[data-mt]"),function(b){b.onclick=function(){misiTab=b.dataset.mt;renderMisi()}});
$("mClose").onclick=function(){$("ovMisi").classList.remove("show");setMode("play")};
$("bMisi").onclick=function(){if(mode==="play")openMisi()};
$("tracker").onclick=function(){if(mode==="play")openMisi()};

/* =================================================================
   LEMARI
   ================================================================= */
var lCat="atasan",lSetup=false;
function openLemari(setup){lSetup=setup;setMode("lemari");$("lemari").classList.add("show");$("lNameWrap").style.display=setup?"block":"none";$("lName").value=CL?CL.nama:(P.name||"");$("lName").readOnly=!!CL;
 $("lTitle").textContent=setup?"✨ Buat Karaktermu":"👕 Lemari Gaya";$("lDone").textContent=setup?"▶ Masuk Kota":"Selesai";
 if(avatar){avatar.visible=true;avatar.rotation.y=yaw}renderLemari();hud()}
function renderLemari(){
 $("lTabs").innerHTML=CATS.map(function(c){return'<button class="ltab'+(c.id===lCat?" on":"")+'" data-cat="'+c.id+'">'+c.ic+" "+c.nama+"</button>"}).join("");
 $("lItems").innerHTML=ITEMS.filter(function(i){return i.cat===lCat}).map(function(i){
  var on=P.outfit[i.cat]===i.id,own=owned(i),lock=i.lv&&P.level<i.lv&&!own,col=typeof i.v==="string"&&i.v.charAt(0)==="#"?i.v:(i.v&&i.v.c?i.v.c:"#3a4180");
  var pr=own?"":(lock?"🔒 Lv"+i.lv:"🪙"+i.price);
  return'<div class="it'+(on?" on":"")+(lock?" lock":"")+'" data-it="'+i.id+'"><div class="sw" style="background:'+col+'">'+(i.ic||"")+'</div>'+esc(i.nama)+(pr?'<span class="pr">'+pr+'</span>':"")+'</div>'}).join("");
}
$("lTabs").addEventListener("click",function(e){var b=e.target.closest("[data-cat]");if(b){lCat=b.dataset.cat;renderLemari();SFX.click()}});
$("lItems").addEventListener("click",function(e){var b=e.target.closest("[data-it]");if(!b)return;var it=IT[b.dataset.it];
 if(!owned(it)){if(it.lv&&P.level<it.lv){toast("🔒 Butuh Level "+it.lv+" untuk "+it.nama);SFX.no();return}
  if(P.coins<it.price){toast("🪙 Koin kurang. Butuh "+it.price+", kamu punya "+P.coins);SFX.no();return}
  P.coins-=it.price;P.owned.push(it.id);SFX.coin();toast("🛍️ "+it.nama+" dibeli!")}else SFX.click();
 P.outfit[it.cat]=it.id;
 if(it.cat==="atasan"&&it.v.pants&&IT[it.v.pants])P.outfit.bawahan=it.v.pants;
 save();rebuildAvatar();renderLemari();hud()});
$("lDone").onclick=function(){
 if(lSetup){var n=$("lName").value.trim();if(!n){toast("✏️ Tulis namamu dulu ya");$("lName").focus();return}P.name=n;save();$("lemari").classList.remove("show");rebuildAvatar();startPlay();return}
 $("lemari").classList.remove("show");setMode("play")};
$("lName").addEventListener("input",function(){P.name=this.value.trim();if(avatar){avatar.remove(avTag);avTag=nameTag(P.name||"Pemain",iv(P.outfit.atasan,{c:"#fff"}).c,1.7);avTag.position.set(0,5.7,0);avatar.add(avTag)}hud()});
$("bLemari").onclick=function(){if(mode==="play")openLemari(false)};

/* =================================================================
   PENGATURAN & NAVIGASI
   ================================================================= */
function ttsLbl(){$("sTts").textContent=!TTS.ok?"🔇 Pembaca soal tidak didukung":P.settings.ttsAuto?"🗣️ Bacakan soal otomatis: Nyala":"🗣️ Bacakan soal otomatis: Mati";$("sTts").disabled=!TTS.ok}
$("sTts").onclick=function(){P.settings.ttsAuto=!P.settings.ttsAuto;save();ttsLbl();if(P.settings.ttsAuto)speak("Soal akan dibacakan otomatis.");else stopSpeak()};
function qSpeak(){if(!Q||!Q.list)return;var it=Q.list[Q.i],s=it&&(it.s||it);if(!s)return;var opts=[].map.call(document.querySelectorAll("#qOpts .opt"),function(b){return b.textContent.replace(/^([A-D])\.\s+/,"Pilihan $1: ").replace(/^[✓✗]\s+/,"")});
 speak(qChoice(s)?s.q+(s.tipe==="bs"?". Benar atau salah?":". "+opts.join(". ")):soalSpeech(s))}
$("qSpk").onclick=function(){if(!TTS.ok){toast("Perangkat ini belum mendukung pembaca suara.");return}qSpeak()};
function openSet(){setMode("menu");ttsLbl();$("sMp").textContent=P.settings.mp!==false?"👥 Main bersama: Nyala":"👤 Main bersama: Mati";$("sSound").textContent=P.settings.sound?"🔊 Suara: Nyala":"🔇 Suara: Mati";applyGfx();$("ovSet").classList.add("show")}
$("bSet").onclick=function(){if(mode==="play")openSet()};
$("sClose").onclick=function(){$("ovSet").classList.remove("show");setMode("play")};
Array.prototype.forEach.call(document.querySelectorAll("[data-gfx]"),function(b){b.onclick=function(){P.settings.gfx=b.dataset.gfx;save();applyGfx()}});
$("sSound").onclick=function(){P.settings.sound=!P.settings.sound;save();openSet()};
$("sHome").onclick=function(){$("ovSet").classList.remove("show");goLanding()};
$("sGuru").onclick=function(){$("ovSet").classList.remove("show");openGuru()};
$("sReset").onclick=function(){ask("Semua koin, level, item, dan misi di perangkat ini akan dihapus.",function(){try{localStorage.removeItem(LS_P)}catch(e){}location.reload()},{t:"Hapus semua progres?",ok:"Hapus",danger:true})};
$("bMap").onclick=function(){$("mm").classList.toggle("on")};
$("bWorld").onclick=function(){if(mode==="play")openWorld()};
function closeTop(){if($("tourDim").style.display==="block"){$("tourSkip").click();return}if($("ovLic").classList.contains("show"))return $("licClose").click();if($("emoPanel").classList.contains("show"))return $("emoPanel").classList.remove("show");if($("ovOnline").classList.contains("show"))return $("oClose").click();if($("ovTanRes").classList.contains("show"))return $("trClose").click();if($("ovTan").classList.contains("show"))return $("tClose").click();if($("ovFact").classList.contains("show"))return $("fOk").click();if($("ovZone").classList.contains("show"))return $("zClose").click();if($("ovWorld").classList.contains("show"))return $("wClose").click();if($("ovJoin").classList.contains("show"))return $("jClose").click();if($("ovDash").classList.contains("show"))return $("dClose").click();if($("ovGedung").classList.contains("show"))return $("gdClose").click();if($("ovGuru").classList.contains("show"))return $("gClose").click();if($("ovMisi").classList.contains("show"))return $("mClose").click();if($("ovSet").classList.contains("show"))return $("sClose").click();if($("ovResult").classList.contains("show"))return $("rClose").click();if($("ovNpc").classList.contains("show"))return $("nNo").click();if($("lemari").classList.contains("show")&&!lSetup)return $("lDone").click();if($("ovPause").classList.contains("show"))return resumeGame();if(mode==="play")openPause()}
function landingStats(){try{pdpUI()}catch(e){}var n=0;data.mapel.forEach(function(m){n+=m.soal.length});$("stMapel").textContent=data.mapel.length;$("stSoal").textContent=n;$("stMisi").textContent=vis().length;$("stItem").textContent=ITEMS.length}
function goLanding(){setMode("landing");$("hud").classList.remove("show");$("lemari").classList.remove("show");$("landing").classList.remove("hide");if(avatar)avatar.visible=false;landingStats()}
function enterGame(){if(!renderer){toast("Perangkat ini belum mendukung grafis 3D");return}if(isStandalone()&&!isFull())goFull();
 tone(1,0.01);$("landing").classList.add("hide");pos.set(CUR.spawn[0],CUR.spawn[1],CUR.spawn[2]);heading=0;yaw=Math.PI;
 if(!avatar)rebuildAvatar();avatar.visible=true;avatar.position.copy(pos);
 if(!P.name||!P.tipsShown)openLemari(true);else startPlay()}
function startPlay(){setMode("play");$("hud").classList.add("show");hud();checkMissions();goMulai();
 if(!P.tipsShown){P.tipsShown=true;save();setTimeout(function(){toast(isTouch?"🕹️ Joystick kiri untuk berjalan, seret layar untuk memutar kamera, cubit dua jari untuk zoom":"🕹️ Gunakan WASD untuk berjalan, seret mouse untuk kamera",4000)},400);setTimeout(function(){if(!LOBI&&!DROP)toast("🏫 Masuk ke gedung mapel untuk menjawab soal!",4000)},2600);setTimeout(function(){if(!LOBI&&!DROP)toast("❗ Warga bertanda seru butuh bantuanmu",4000)},4800)}
 else toast("👋 Selamat datang kembali, "+P.name+"!")}
var WORLDS=[
 {id:"kota",nama:"Kota Ilmu",ic:"🏙️",desc:"Kota hidup dengan gedung-gedung mapel, rumah warga, mobil, angkot, dan bus sekolah.",bg:"linear-gradient(135deg,#38bdf8,#16a34a)",ok:true},
 {id:"samudra",nama:"Samudra",ic:"🐠",desc:"Berenang di Terumbu Karang, Kapal Karam, Palung Laut Dalam, dan Istana Kerang.",bg:"linear-gradient(135deg,#06b6d4,#1e3a8a)",ok:true},
 {id:"angkasa",nama:"Angkasa",ic:"🚀",desc:"Stasiun Orbit, Bulan, dan Mars. Rasakan gravitasi berbeda di setiap wilayah!",bg:"linear-gradient(135deg,#8b5cf6,#111827)",ok:true},
 {id:"rimba",nama:"Rimba",ic:"🌳",desc:"Menjelajah Hutan Tropis, Air Terjun, Pulau Komodo, dan Gua Kapur bersama ranger.",bg:"linear-gradient(135deg,#22c55e,#14532d)",ok:true},
 {id:"nusantara",nama:"Nusantara",ic:"🏝️",desc:"Berlayar dengan pinisi ke Flores, Bali, Toraja, Raja Ampat, dan Jakarta.",bg:"linear-gradient(135deg,#f97316,#9f1239)",ok:true},
 {id:"mancanegara",nama:"Mancanegara",ic:"🌏",desc:"Terbang ke Jepang, Mesir, Paris, dan Tiongkok. Lihat Fuji, piramida, Eiffel, dan Tembok Besar.",bg:"linear-gradient(135deg,#eab308,#92400e)",ok:true}];
function renderWorlds(el){el.innerHTML=WORLDS.map(function(w){var al=worldAllowed(w.id);return'<button class="world'+(w.ok&&al?" ok":" soon")+'" data-world="'+w.id+'" style="background:'+w.bg+'"><span class="wb">'+(!al?"🔒 Tidak dipakai guru":w.ok?"✔ Bisa dimainkan":"Segera hadir")+'</span><div class="wi">'+w.ic+'</div><h3>'+esc(w.nama)+'</h3><p>'+esc(w.desc)+'</p>'+(w.ok?'<p style="margin-top:6px;font-weight:800;color:#fde68a">🏫 '+wCount(w.id)+'/'+data.mapel.length+' gedung selesai di dunia ini</p>':'')+''+(w.ok?'<span class="go">▶ Masuk</span>':'')+'</button>'}).join("")}
function pickWorld(e){var b=e.target.closest("[data-world]");if(!b)return;var w=WORLDS.filter(function(x){return x.id===b.dataset.world})[0];
 if(!w.ok){toast("🚧 Dunia "+w.nama+" sedang dibangun. Segera hadir!");return}
 if(!worldAllowed(w.id)){toast("🔒 Dunia "+w.nama+" tidak dipakai oleh gurumu untuk paket soal ini.",3500);SFX.no();return}
 if(WDEF[w.id]){openZones(w.id);return}
 $("ovWorld").classList.remove("show");if(CUR.w!=="kota"){travelTo("kota","kota");return}afterTravel()}
renderWorlds($("worldsLanding"));renderWorlds($("worldsOv"));
$("worldsLanding").addEventListener("click",pickWorld);$("worldsOv").addEventListener("click",pickWorld);
$("wClose").onclick=function(){$("ovWorld").classList.remove("show");if(mode==="menu")setMode("play")};
function openWorld(){if(mode==="play")setMode("menu");renderWorlds($("worldsOv"));$("ovWorld").classList.add("show")}
$("lpPlay").onclick=openMain;$("navPlay").onclick=openMain;
$("lpBuat").onclick=function(){if(LIC)openGuru();else openGuruFree()};
$("navGuru").onclick=function(){openGuru()};
$("lpGuru").onclick=function(e){if(e)e.preventDefault();openGuru()};$("lpGuru2").onclick=function(){openGuru()};

/* =================================================================
   MODE GURU
   ================================================================= */
var draft=null,gSel=0,gTab="editor",dirty=false;
function padDraft(d){d.mapel.forEach(function(m){if(!Array.isArray(m.materi))m.materi=[];m.materi.forEach(function(t){if(t.url==null)t.url="";if(t.isi==null)t.isi="";if(!t.jenis)t.jenis="video"});m.soal.forEach(padSoal)});return d}
function normalize(d){var o=clone(d);o.mapel.forEach(function(m){m.materi=(m.materi||[]).map(function(t){var r={judul:String(t.judul||"").trim(),jenis:t.jenis||"link"};if(r.jenis!=="teks")r.url=String(t.url||"").trim();if(String(t.isi||"").trim())r.isi=String(t.isi).trim();return r}).filter(function(r){return r.url||r.isi||r.judul});if(!m.materi.length){delete m.materi;delete m.wajibMateri}m.soal=m.soal.map(normSoal).filter(function(r){return!soalKosong(r)})});return o}
/* soal yang belum diisi sama sekali (misalnya kotak soal baru) diabaikan saat menyimpan */
function soalKosong(r){if(r.q||r.gambar)return false;if(r.tipe==="isian")return!r.kunci;if(r.tipe==="jodoh")return!(r.pasangan&&r.pasangan.length);if(r.tipe==="urut")return!(r.urutan&&r.urutan.length);if(r.tipe==="bs")return true;return!(r.opsi&&r.opsi.length)}
function exportPack(){var o=normalize(draft);return{judul:o.judul,guru:o.guru,jenjang:o.jenjang,pengaturan:cleanPeta(o.pengaturan),detektif:o.detektif&&o.detektif.length?o.detektif:undefined,mapel:o.mapel.map(function(m){var r={nama:m.nama,warna:m.warna,waktu:m.waktu,jumlah:m.jumlah};if(m.rahasia)r.rahasia=true;if(m.materi&&m.materi.length){r.materi=m.materi;if(m.wajibMateri)r.wajibMateri=true}r.soal=m.soal;return r})}}
function gmsg(t,c){$("gMsg").textContent=t;$("gMsg").style.color=c||"var(--mut)"}
/* ✏️ VERSI GRATIS Mode Guru: buat soal & coba main sepuasnya, berbagi ke murid perlu langganan */
var GFREE=false;
function isFree(){return!LIC}
function openGuruFree(){GFREE=true;lsSet("zv_gfree",1);$("ovLic").classList.remove("show");openGuruPanel();gmsg("🆓 Versi gratis: buat soal sepuasnya, tekan 💾 Simpan, lalu 🎮 Coba main. Soal tersimpan di perangkat ini.","#7dffa0")}
var FLOCK={kelas:["📲","Bagikan ke murid","Buat kelas, kirim link ke murid lewat WhatsApp, dan nilai murid tercatat otomatis."],
 tan:["⚡","Tantangan & Ujian","Satu kelas main bareng: Lari Kilat, Jatuh Bangun, Jembatan Juara, kuis berwaktu, sampai ujian STS/SAS dengan papan peringkat di proyektor."],
 paket:["📚","Paket Saya","Simpan banyak paket soal di akun, buka dari HP atau laptop mana pun, dan bagikan link latihan mandiri."],
 bank:["🌐","Bank Soal bersama","Pakai ribuan soal buatan guru lain, atau bagikan paket milik Anda."],
 nilai:["📊","Nilai & Rekap","Nilai murid, rekap rapor, analisis soal, unduh Excel/PDF, dan pantau murid secara langsung."]};
function freeLockHTML(k){var f=FLOCK[k]||FLOCK.kelas;return'<div class="flock"><div class="fic">🔒</div><h3>'+f[0]+' '+f[1]+'</h3><p>'+f[2]+'</p>'+
 '<ul><li>Fitur ini khusus guru <b>berlangganan</b>.</li><li>Soal yang sudah Anda buat <b>tidak hilang</b>: otomatis pindah ke akun setelah berlangganan.</li><li>Murid tetap bermain <b>gratis</b>, tanpa akun.</li></ul>'+
 '<div class="row"><button class="btn yel" data-act="fsub">⭐ Aktifkan langganan</button><button class="btn green" data-act="fplay">🎮 Coba mainkan soal saya</button></div></div>'}
function freeLock(k){if(!$("ovGuru").classList.contains("show")){fSub();return}gTab=FLOCK[k]&&k!=="nilai"?k:gTab;if(k==="nilai"){$("gBody").innerHTML=freeLockHTML("nilai");return}renderGuru()}
function fSub(){if(dirty)applyDraft();$("ovGuru").classList.remove("show");openLic();lmsg("✅ Soal yang Anda buat aman di perangkat ini dan otomatis pindah ke akun setelah Anda masuk.","#7dffa0")}
function fPlay(){if(dirty&&!applyDraft())return;$("ovGuru").classList.remove("show");if(mode==="menu")setMode("play");openMain();toast("🎮 Pilih mode, lalu pilih soal buatan Anda. Selamat mencoba!",4000)}
function freeMigrate(){if(!LIC||!lsGet("zv_gfree",0))return;lsSet("zv_gfree",0);GFREE=false;setTimeout(function(){if(!LIC||PKCUR||!lsGet("zv_soal_t",0)||lsGet("zv_soal_src","guru")!=="guru")return;pkSave(false,true).then(function(){gmsg("✔ Soal dari versi gratis sudah tersimpan di akun Anda (📚 Paket Saya). Sekarang bisa dibagikan ke murid.","#7dffa0")},function(){})},1800)}
function openGuruPanel(){licBanner();var gw=$("gWho");if(gw){gw.textContent=LIC&&LIC.nama?"🔑 "+LIC.nama:(isFree()?"🆓 Versi gratis":"");gw.title=gw.textContent}$("gLogout").style.display=isFree()?"none":"";draft=padDraft(clone(dataFull||data));gSel=0;gTab="home";dirty=false;gmsg("Selamat datang! Mulai dari langkah yang ditandai kuning.");renderGuru();$("ovGuru").classList.add("show");if(mode==="play")setMode("menu");if(!lsGet("zv_tour_guru",0))setTimeout(startTour,400);cloudLoad();freeMigrate()}
$("gClose").onclick=function(){var go=function(){$("ovGuru").classList.remove("show");if(mode==="menu")setMode("play")};if(dirty)ask("Ada perubahan yang belum disimpan. Kalau ditutup sekarang, perubahan itu hilang.",go,{ic:"💾",t:"Tutup tanpa menyimpan?",ok:"Tutup saja",no:"Kembali"});else go()};
Array.prototype.forEach.call(document.querySelectorAll("[data-gt]"),function(b){b.onclick=function(){gTab=b.dataset.gt;renderGuru()}});
function newSoal(tp){return padSoal({tipe:tp||"pg",q:"",opsi:["","","",""],jawab:0,bahas:"",gambar:""})}
var COLORS=["#ef4444","#3b82f6","#22c55e","#f97316","#a855f7","#14b8a6","#ec4899","#eab308","#6366f1","#84cc16","#06b6d4","#f43f5e"];
function renderGuru(){
 Array.prototype.forEach.call(document.querySelectorAll("[data-gt]"),function(b){var g=b.dataset.gt;b.classList.toggle("on",g===gTab||(g==="more"&&G_MORE.indexOf(gTab)>=0)||(g==="editor"&&gTab==="ai"))});
 var h="",body=$("gBody");$("gSave").style.display=(gTab==="editor"||gTab==="ai"||gTab==="peta")?"":"none";
 if(gTab==="ai"||G_MORE.indexOf(gTab)>=0)h+='<button class="btn sm gray gback" data-gtgo="'+(gTab==="ai"?"editor":"more")+'">⟵ Kembali ke '+(gTab==="ai"?"✏️ Soal":"⋯ Lainnya")+'</button>';
 if(gTab==="home"){h+=homeTabHTML()}
 else if(gTab==="more"){h+=moreTabHTML()}
 else if(gTab==="tan"){h+=isFree()?freeLockHTML("tan"):guruTanHTML()}
 else if(gTab==="editor"){
  if(gSel>=draft.mapel.length)gSel=Math.max(0,draft.mapel.length-1);var ADV=!!lsGet("zv_gadv",0);
  var m=draft.mapel[gSel];
  h+='<div class="soalway" id="soalWays"><b>Tambah soal dengan cepat:</b><button class="btn sm" data-gtgo="ai">🤖 Buat dengan AI</button><button class="btn sm yel" data-act="impopen">📥 Impor dari Word/Excel</button><button class="btn sm gray" data-gtgo="bank">🌐 Ambil dari Bank Soal</button><span class="mut" style="font-size:12px">atau ketik langsung di bawah ini</span></div>';
  h+='<div class="pkbar">'+(PKCUR?'📚 Paket: <b>'+esc(PKCUR.judul||draft.judul)+'</b> <span class="mut">• ikut tersimpan di Paket Saya setiap kali Anda menekan 💾 Simpan</span>'+(ADV?' <button class="btn sm" data-act="pksavenew" title="Simpan soal ini sebagai paket terpisah, paket lama tidak berubah">📄 Jadikan paket baru</button>':''):'📚 <span class="mut">Tekan <b>💾 Simpan</b> di bawah, soal otomatis masuk ke Paket Saya.</span>')+'<span style="flex:1"></span><button class="btn sm '+(ADV?"yel":"gray")+'" data-act="advtog" title="Warna gedung, waktu per soal, jumlah soal tiap main, materi, pembahasan, dan gambar">⚙️ Pengaturan lanjutan: '+(ADV?"tampil":"sembunyi")+'</button></div>';
  h+='<div class="gtop"><label class="fld">Judul paket<input data-pk="judul" value="'+esc(draft.judul)+'" placeholder="Contoh: Latihan PTS Kelas 5"></label><label class="fld">Nama guru<input data-pk="guru" value="'+esc(draft.guru)+'" placeholder="Nama Anda"></label><label class="fld">Jenjang / kelas<input data-pk="jenjang" value="'+esc(draft.jenjang)+'" placeholder="Contoh: SD Kelas 5"></label></div>';
  if(ADV)h+='<label class="mut" style="display:flex;gap:8px;align-items:center;margin-top:8px;font-weight:800;font-size:13px"><input type="checkbox" data-pset="bukaSemuaWilayah"'+(draft.pengaturan&&draft.pengaturan.bukaSemuaWilayah?" checked":"")+'> Buka semua wilayah di setiap dunia sejak awal (tanpa syarat menyelesaikan gedung) <button type="button" class="qh" data-help="buka">?</button></label>';
  var BGv=(draft.pengaturan&&draft.pengaturan.bahasG)||"";
  h+='<details class="tsk etools"><summary>🖨️ Cetak soal &amp; 💡 pengaturan pembahasan <span class="mut">'+({"":"latihan: kunci + pembahasan ditampilkan",kunci:"latihan: kunci saja",bs:"latihan: benar/salah saja"}[BGv])+'</span></summary>'+
   '<label class="fld" style="margin-top:8px">Saat murid latihan di gedung, setelah menjawab tampilkan<select data-pbahas="1"><option value=""'+(BGv===""?" selected":"")+'>✅ Benar/salah + kunci + pembahasan</option><option value="kunci"'+(BGv==="kunci"?" selected":"")+'>✅ Benar/salah + kunci (tanpa pembahasan)</option><option value="bs"'+(BGv==="bs"?" selected":"")+'>✅ Benar/salah saja (kunci &amp; pembahasan disembunyikan)</option></select></label>'+
   '<div class="mut" style="font-size:12px;margin-top:4px">Untuk tantangan/ujian, atur di formulir tantangan: "Setelah selesai, murid melihat". Pengaturan ini ikut terkirim ke kelas saat Anda menekan 💾 Simpan lalu "Ya, kirim".</div>'+
   '<div class="row" style="margin-top:10px;align-items:center"><label class="fld" style="flex-direction:row;align-items:center;gap:8px;margin:0">Mapel<select id="cetakM"><option value="">Semua mapel</option>'+draft.mapel.map(function(mm,ix){return'<option value="'+ix+'"'+(ix===gSel?"":"")+'>'+esc(mm.nama||("Mapel "+(ix+1)))+'</option>'}).join("")+'</select></label></div>'+
   '<div class="row" style="margin-top:8px"><button class="btn sm" data-act="cetak" data-v="murid">🖨️ Lembar soal (murid)</button><button class="btn sm yel" data-act="cetak" data-v="guru">🖨️ Soal + kunci + pembahasan</button><button class="btn sm gray" data-act="cetakw" data-v="murid">⬇ Word lembar soal</button><button class="btn sm gray" data-act="cetakw" data-v="guru">⬇ Word + kunci &amp; pembahasan</button></div>'+
   '<div class="mut" style="font-size:12px;margin-top:4px">Cetak membuka halaman siap cetak; pilih <b>Simpan sebagai PDF</b> untuk menyimpan. File Word bisa diedit lagi.</div></details>';
  h+='<div class="gcols"><div class="gside" id="gSide">'+sideHTML()+'</div><div>';
  if(m){
   h+='<div class="mrow'+(ADV?'':' simple')+'"><label class="fld"><span>Nama mapel / topik (jadi nama gedung) <button type="button" class="qh" data-help="mapel">?</button></span><input data-mk="nama" value="'+esc(m.nama)+'"></label>'+(ADV?'<label class="fld">Warna<input type="color" data-mk="warna" value="'+esc(m.warna)+'"></label><label class="fld"><span>Waktu/soal (detik) <button type="button" class="qh" data-help="detik">?</button></span><input type="number" min="5" max="300" data-mk="waktu" value="'+m.waktu+'"></label><label class="fld"><span>Soal tiap main <button type="button" class="qh" data-help="sesi">?</button></span><input type="number" min="1" max="100" data-mk="jumlah" value="'+m.jumlah+'"></label>':'')+'<button class="btn red sm" data-act="delm">🗑 Hapus mapel</button></div>';
   h+='<label class="rhs'+(m.rahasia?' on':'')+'"><input type="checkbox" data-mk="rahasia"'+(m.rahasia?" checked":"")+'><span>🔒 <b>Khusus tantangan (rahasia)</b><small>Gedung ini tidak muncul di dunia game dan soalnya tidak bisa dilatih bebas. Soal baru dikirim ke HP murid saat tantangan yang memakai mapel ini dimulai. Cocok untuk soal ulangan, STS, dan SAS.</small></span></label>';
   h+='<div class="mut" style="margin-top:8px;font-size:12px">'+(ADV?'"Soal tiap main" = berapa soal diacak setiap kali murid masuk gedung. ':'')+'Tandai jawaban benar dengan menekan bulatan di samping pilihan.</div>';
   var h0=h.length;
   if(!ADV&&!m.materi.length)h+='<div class="row"><button class="btn sm gray" data-act="addmat">📚 Tambah materi belajar (opsional)</button></div>';
   else{h+='<div class="scard" style="border-color:rgba(251,191,36,.6)"><div class="sh"><span>📚 Materi Belajar <button type="button" class="qh" data-help="materi">?</button> <small class="mut">(opsional: video YouTube, link, Google Drive, gambar, teks)</small></span><label style="font-size:13px;font-weight:800;display:flex;gap:6px;align-items:center"><input type="checkbox" data-mk="wajibMateri"'+(m.wajibMateri?" checked":"")+'> Wajib dipelajari sebelum kuis <button type="button" class="qh" data-help="wajib">?</button></label></div>';
   m.materi.forEach(function(t,k){h+='<div class="mrow2"><label class="fld">Jenis<select data-tk="jenis" data-ti="'+k+'">'+Object.keys(JENIS).map(function(j){return'<option value="'+j+'"'+(t.jenis===j?" selected":"")+'>'+JENIS[j].ic+" "+JENIS[j].nm+'</option>'}).join("")+'</select></label><label class="fld">Judul<input data-tk="judul" data-ti="'+k+'" value="'+esc(t.judul)+'" placeholder="Judul materi"></label>'+(t.jenis==="teks"?'<span></span>':'<label class="fld">Link<input data-tk="url" data-ti="'+k+'" value="'+esc(t.url)+'" placeholder="'+(t.jenis==="video"?"https://youtu.be/...":t.jenis==="gambar"?"Link gambar atau link Google Drive":"https://drive.google.com/... atau link lain")+'"></label>')+'<button class="btn red sm" data-act="delmat" data-ti="'+k+'">🗑</button></div><label class="fld" style="margin-top:6px">'+(t.jenis==="teks"?"Isi materi":"Keterangan (opsional)")+'<textarea data-tk="isi" data-ti="'+k+'" rows="'+(t.jenis==="teks"?5:2)+'">'+esc(t.isi)+'</textarea></label>'});
   h+='<div class="row"><button class="btn sm yel" data-act="addmat">＋ Tambah materi</button>'+(m.materi.length?'':'<span class="mut" style="font-size:12px">Belum ada materi. Murid langsung masuk ke kuis.</span>')+'</div></div>'}
   if(!ADV&&m.materi.length){var inner=h.slice(h0);h=h.slice(0,h0)+'<details class="mdet"'+(G_MATOPEN?" open":"")+'><summary>📚 Materi belajar ('+m.materi.length+')'+(m.wajibMateri?' • wajib dibaca':'')+' <span class="mut">ketuk untuk melihat atau mengubah</span></summary>'+inner+'</details>'}
   m.soal.forEach(function(s,j){
    h+='<div class="scard"><div class="sh"><span>Soal '+(j+1)+(j===0?' <button type="button" class="qh" data-help="soal">?</button>':'')+' <select class="tsel" data-sk="tipe" data-si="'+j+'">'+Object.keys(TIPE).map(function(k){return'<option value="'+k+'"'+((s.tipe||"pg")===k?" selected":"")+'>'+TIPE[k]+'</option>'}).join("")+'</select>'+(j===0?' <button type="button" class="qh" data-help="tipe">?</button>':'')+'</span><span><button class="btn gray sm" data-act="dups" data-si="'+j+'">⧉ Salin</button> <button class="btn red sm" data-act="dels" data-si="'+j+'">🗑</button></span></div>';
    h+='<label class="fld">'+(s.tipe==="bs"?"Pernyataan":s.tipe==="jodoh"?"Petunjuk (contoh: Pasangkan hewan dengan jenis makanannya!)":s.tipe==="urut"?"Petunjuk (contoh: Urutkan langkah membuat teh!)":"Pertanyaan")+'<textarea data-sk="q" data-si="'+j+'" rows="2">'+esc(s.q)+'</textarea></label>';
    h+=imgRowHTML(s,j);
    h+=soalFieldsHTML(s,j);
    h+='<label class="fld bahasf"><span>💡 Pembahasan <small class="mut" style="font-weight:600">(opsional)</small></span><textarea data-sk="bahas" data-si="'+j+'" rows="2" placeholder="Contoh: 3/4 + 1/4 = 4/4 = 1, jadi jawabannya B.">'+esc(s.bahas)+'</textarea></label>';
    h+='<label class="fld tpf"><span>🎯 Tujuan Pembelajaran (TP) <small class="mut" style="font-weight:600;font-size:11px">opsional • untuk peta penguasaan &amp; deskripsi rapor</small></span><input data-sk="tp" data-si="'+j+'" list="tpList" maxlength="80" value="'+esc(s.tp||"")+'" placeholder="Contoh: Pecahan senilai"></label>';
    if(ADV||s.skor)h+='<div class="ogrid sk2"><label class="fld"><span>Skor soal <button type="button" class="qh" data-help="skor">?</button></span><input type="number" min="0" max="100" step="0.5" data-sk="skor" data-si="'+j+'" value="'+esc(s.skor)+'" placeholder="otomatis"></label></div>';h+='</div>'});
   var tps={};m.soal.forEach(function(x){if(x.tp&&String(x.tp).trim())tps[String(x.tp).trim()]=1});h+='<datalist id="tpList">'+Object.keys(tps).map(function(t){return'<option value="'+esc(t)+'">'}).join("")+'</datalist>';
   h+='<div class="row"><button class="btn" data-act="adds">＋ Tambah soal</button><span class="mut">'+m.soal.length+' soal di mapel ini</span></div>';
  }else h+='<div class="note">Belum ada mapel. Tekan "＋ Mapel" untuk menambah.</div>';
  h+='</div></div>';
 }
 else if(isFree()&&FLOCK[gTab]){h+=freeLockHTML(gTab)}
 else if(gTab==="kelas"){h+=kelasTabHTML()}
 else if(gTab==="paket"){h+=paketTabHTML()}
 else if(gTab==="peta"){h+=petaTabHTML()}
 else if(gTab==="bank"){h+=bankTabHTML()}
 else if(gTab==="dtk"){h+=guruDtkHTML()}
 else if(gTab==="save"){
  h+='<div class="mut">Soal tersimpan otomatis di perangkat ini dan di akun Anda (ikut ke HP atau laptop lain setelah masuk dengan akun yang sama). Gunakan halaman ini untuk membuat file cadangan tambahan atau berbagi soal dengan guru lain.</div>';
  h+='<div class="acard"><h4>💾 Cadangkan soal</h4><div class="mut">Unduh file cadangan, lalu simpan di HP, laptop, atau Google Drive. Kalau HP rusak atau ganti perangkat, soal Anda tidak hilang.</div><div class="row"><button class="btn green" data-act="jdown">⬇ Unduh file cadangan soal</button></div></div>';
  h+='<div class="acard"><h4>📂 Buka file soal</h4><div class="mut">Buka file cadangan milik Anda atau file soal yang dikirim guru lain.</div><div class="row"><button class="btn" data-act="fadd">＋ Tambahkan ke soal saya</button><button class="btn gray" data-act="frep">↺ Ganti semua soal saya</button></div><input type="file" id="gFile" accept=".json,application/json" style="display:none"></div>';
  h+='<div class="acard"><h4>👥 Berbagi soal dengan guru lain</h4><div class="mut">Unduh file cadangan, lalu kirim lewat WhatsApp atau Google Drive. Guru lain cukup membukanya lewat <b>Buka file soal</b> di perangkat mereka.</div></div>';
  h+='<div class="acard"><h4>📚 Paket Saya &amp; 🔗 link latihan</h4><div class="mut">Semua paket soal yang pernah disimpan, beserta link latihan mandiri dan hasil murid per paket, sekarang ada di tab <b>📚 Paket Saya</b>.</div><div class="row"><button class="btn yel" data-gtgo="paket">📚 Buka Paket Saya</button></div></div>';
 }
 else if(gTab==="ai"){
  h+='<div class="mut">Buat soal dan materi otomatis dengan ChatGPT, Gemini, atau Claude. Ikuti 3 langkah berikut.</div>';
  h+='<div class="acard"><h4><span class="anum">1</span>Isi topik soal</h4><div class="gtop" style="margin-top:6px"><label class="fld">Mapel / topik<input id="aiM" value="Matematika - Pecahan"></label><label class="fld">Jenjang / kelas<input id="aiJ" value="SD Kelas 5"></label><label class="fld">Jumlah soal<input id="aiN" type="number" value="10" min="1" max="50"></label></div><label class="fld" style="margin-top:8px">Jenis soal<select id="aiT"><option value="pg">Pilihan ganda saja</option><option value="campur">Campuran (pilihan ganda, benar/salah, isian, menjodohkan, mengurutkan)</option><option value="bs">Benar / Salah saja</option><option value="isian">Isian singkat saja</option></select></label><label class="fld" style="margin-top:8px">Catatan tambahan (opsional)<input id="aiC" placeholder="Contoh: konteks kehidupan sehari-hari di NTT, tingkat HOTS"></label></div>';
  h+='<div class="acard"><h4><span class="anum">2</span>Salin perintah, lalu tempel ke AI</h4><div class="mut">Tekan <b>Salin perintah</b>, buka salah satu AI di bawah, tempel (tahan lalu pilih Tempel / Ctrl+V), lalu kirim.</div><div class="row"><button class="btn yel" data-act="cpai">📋 Salin perintah</button><a class="btn sm gray" href="https://chatgpt.com" target="_blank" rel="noopener">ChatGPT ↗</a><a class="btn sm gray" href="https://gemini.google.com" target="_blank" rel="noopener">Gemini ↗</a><a class="btn sm gray" href="https://claude.ai" target="_blank" rel="noopener">Claude ↗</a></div><details style="margin-top:6px"><summary class="mut" style="cursor:pointer">Lihat isi perintah</summary><textarea class="gta" id="aiOut" readonly style="min-height:160px;margin-top:6px"></textarea></details></div>';
  h+='<div class="acard"><h4><span class="anum">3</span>Tempel jawaban AI di sini</h4><div class="mut">Salin <b>seluruh</b> jawaban AI (biasanya ada tombol "Copy" atau "Salin" di bawah jawabannya), lalu tempel di kotak ini.</div><textarea class="gta" id="aiIn" spellcheck="false" placeholder="Tempel jawaban AI di sini..." style="min-height:140px;margin-top:6px"></textarea><div class="row"><button class="btn green" data-act="aiadd">✔ Masukkan soal ke paket saya</button><button class="btn sm gray" data-act="airep">Ganti semua soal dengan hasil AI</button></div><div class="mut" style="font-size:12px">Setelah dimasukkan, soal langsung muncul di tab ✏️ Buat Soal dan bisa diperiksa atau diubah. Periksa kembali kunci jawabannya sebelum dipakai, karena AI kadang keliru.</div></div>';
 }
 else{
  h+='<div class="row" style="margin-top:0"><button class="btn yel" data-act="tour">▶ Mulai tur singkat Mode Guru</button></div>';
  h+='<div class="flow" style="margin-top:8px">'+[
   ["1","Siapkan soal","Di tab ✏️ Soal, tambah mapel (1 mapel = 1 gedung di game), tulis soal, lalu tandai jawaban benar. Bisa juga dengan 🤖 AI atau 📥 Impor dari Word/Excel."],
   ["2","Simpan","Tekan tombol hijau 💾 Simpan di bawah. Gedung di game langsung berubah dan soal tersimpan di Paket Saya."],
   ["3","Buat kelas","Di tab 📲 Kelas &amp; Murid, buat kelas dengan PIN, lalu bagikan link kelas ke murid lewat WhatsApp."],
   ["4","Pantau nilai","Buka 📊 Dashboard untuk melihat nilai, analisis soal, tantangan, rapor, dan murid yang sedang online."]
  ].map(function(s){return'<div class="step"><div class="n">'+s[0]+'</div><h4>'+s[1]+'</h4><p>'+s[2]+'</p></div>'}).join("")+'</div>';
  h+='<div class="note"><b>Tips:</b><br>• Materi (video YouTube, link Google Drive, gambar, atau ringkasan teks) bisa ditambahkan di setiap mapel. Centang "Wajib dipelajari" agar murid membaca materi dulu sebelum kuis.<br>• Setiap kali Anda menekan Simpan, soal juga tersimpan di akun Anda. Di laptop atau HP lain, cukup masuk dengan kode lisensi dan nomor WA yang sama, soal langsung muncul.<br>• Sudah punya soal di Word atau Excel? Tekan <b>📥 Impor soal</b> di tab ✏️ Buat Soal. Soal dibaca otomatis, diperiksa di layar pratinjau, lalu masuk ke gedung pilihan Anda.<br>• Kalau soal diubah setelah kelas dibuat, tekan <b>⬆ Kirim paket terbaru</b> di Kelas Online agar murid mendapat soal baru.<br>• Semua paket yang pernah disimpan ada di <b>📚 Paket Saya</b>: buka lagi, pakai di kelas lain, buat link latihan, dan lihat hasil murid per paket.<br>• Murid bisa menekan <b>📲 Pasang di HP</b> di halaman awal. Setelah itu game bisa dibuka tanpa sinyal, dan nilainya dikirim otomatis saat ada sinyal.<br>• Tekan tombol <b>?</b> kecil di samping isian untuk melihat penjelasannya.</div>';
 }
 body.innerHTML=h;
 if(gTab==="ai")updAi();
 if(isFree())return;
 if(gTab==="bank"&&!BANK.list&&!BANK.busy)bankLoad();
 if(gTab==="paket"&&!PKL.busy){PKL.busy=true;setTimeout(function(){PKL.busy=false},400);pkLoad()}
}
/* ---------- 🏠 BERANDA GURU & menu Lainnya (tampilan sederhana untuk guru pemula) ---------- */
var G_MORE=["peta","bank","save","help","dtk"],KNEW="",G_MATOPEN=false;
function soalSiap(){return!!PKCUR||!!(data&&data.judul&&data.judul!=="Paket Contoh ZuperVerse")}
function homeTabHTML(){var gk=lsGet(LS_GK,[]),nS=0;data.mapel.forEach(function(m){nS+=m.soal.length});
 var st=[soalSiap(),gk.length>0,gk.some(function(c){return c.shared})],nx=st.indexOf(false);
 var h='<div class="hhello">Halo, <b>'+esc(LIC&&LIC.nama?LIC.nama:"Bapak/Ibu Guru")+'</b> 👋 <span class="mut">'+(nx<0?"Semua langkah sudah beres. Murid tinggal bermain!":"Ikuti 3 langkah ini agar murid bisa mulai bermain.")+'</span></div>';
 var steps=[["✏️","Siapkan soal",st[0]?esc(data.judul)+" • "+data.mapel.length+" gedung, "+nS+" soal":"Masih memakai soal contoh","editor","Siapkan soal"],
  ["🏫","Buat kelas",st[1]?gk.length+" kelas: "+gk.slice(0,2).map(function(c){return esc(c.nama)}).join(", ")+(gk.length>2?", …":""):"Belum ada kelas","kelas","Buat kelas"],
  ["📤","Bagikan link ke murid",st[2]?"Link sudah dibagikan":"Kirim link kelas lewat WhatsApp","kelas","Bagikan link"]];
 h+='<div class="hsteps" id="homeSteps">'+steps.map(function(x,i){var cls=st[i]?"done":i===nx?"now":"";return'<div class="hstep '+cls+'"><div class="hn">'+(st[i]?"✔":(i+1))+'</div><div class="hb"><b>'+x[0]+' '+x[1]+'</b><small>'+x[2]+'</small></div>'+(i===nx?'<button class="btn sm yel" data-gtgo="'+x[3]+'">'+x[4]+' ➜</button>':'')+'</div>'}).join("")+'</div>';
 h+='<div class="hgrid h4">';
 h+='<div class="hcard" data-gtgo="editor"><div class="hic">✏️</div><h3>Siapkan Soal</h3><p>Ketik sendiri, buat dengan AI, atau impor dari Word/Excel.</p><div class="hmini"><button class="btn sm" data-gtgo="ai">🤖 Dengan AI</button><button class="btn sm" data-act="impopen">📥 Impor</button></div></div>';
 h+='<div class="hcard" data-gtgo="kelas"><div class="hic">📲</div><h3>Bagikan ke Murid</h3><p>Buat kelas, lalu kirim link ke murid lewat WhatsApp. Murid tidak perlu akun.</p></div>';
 h+='<div class="hcard hcard-tan" data-gtgo="tan"><div class="hic">⚡</div><h3>Tantangan &amp; Ujian</h3><p>Kuis berwaktu, lomba kelas, ujian STS/SAS, dan battle petualangan ala battle royale.</p></div>';
 h+='<div class="hcard" data-act="hnilai"><div class="hic">📊</div><h3>Lihat Nilai</h3><p>Nilai, rekap rapor, analisis nilai, dan pantau murid secara langsung.</p></div>';
 h+='</div>';
 if(gk.length){h+='<h3 class="hsub">Kelas saya</h3>'+gk.slice(0,4).map(function(c,i){return'<div class="hk"><div><b>'+esc(c.nama)+'</b> <span class="mut">kode</span> <b style="color:var(--yel);letter-spacing:1px">'+esc(c.kode)+'</b></div><div class="row" style="margin:0"><button class="btn sm green" data-act="kdash" data-ki="'+i+'">📊 Nilai</button><button class="btn sm" data-act="kwa" data-ki="'+i+'">📤 Kirim link</button></div></div>'}).join("")+(gk.length>4?'<div class="mut" style="font-size:12px;margin-top:4px">Kelas lainnya ada di tab 📲 Kelas &amp; Murid.</div>':'')}
 h+='<div class="mut" style="font-size:12px;margin-top:12px">Peta dunia, Bank Soal, cadangan, dan panduan ada di tab <b>⋯ Lainnya</b>. <button class="btn sm gray" data-act="tour">▶ Tur singkat</button></div>';
 return h}
function moreTabHTML(){var it=[["ai","🤖","Buat soal dengan AI","Soal dan ringkasan materi otomatis lewat ChatGPT, Gemini, atau Claude."],["imp","📥","Impor soal","Ambil soal dari file Word, Excel, CSV, atau teks yang ditempel."],["peta","🗺️","Atur peta","Pilih dunia dan wilayah, letak setiap gedung, dan titik awal murid."],["bank","🌐","Bank Soal bersama","Cari dan pakai paket soal buatan guru lain, atau bagikan milik Anda."],["dtk","🕵️","Kasus Detektif (AI)","Buat kasus membaca dari bacaan kelas Anda, dimainkan murid di mode Detektif."],["save","💾","Cadangan & pindah perangkat","Unduh file cadangan soal atau buka file soal dari guru lain."],["help","📘","Panduan & tur","Langkah singkat, tips, dan tur Mode Guru."]];
 return'<div class="hgrid">'+it.map(function(x){return'<div class="hcard sm" '+(x[0]==="imp"?'data-act="impopen"':'data-gtgo="'+x[0]+'"')+'><div class="hic">'+x[1]+'</div><h3>'+x[2]+'</h3><p>'+x[3]+'</p></div>'}).join("")+'</div>'}
var G_TANK=0;
function guruTanHTML(){var gk=lsGet(LS_GK,[]),h='<div class="tmhero"><div><h2>⚡ Tantangan &amp; Ujian</h2><div class="mut">Kuis berwaktu, lomba kelas dengan lobi dan terjun parasut, ujian STS/SAS, sampai battle petualangan dengan zona menyempit. Pilih kelas, lalu pilih jenisnya.</div></div></div>';
 if(!gk.length)return h+'<div class="note">Buat kelas dulu supaya murid bisa ikut tantangan. <button class="btn sm yel" data-gtgo="kelas">📲 Buat kelas</button></div>';
 if(G_TANK>=gk.length)G_TANK=0;
 h+='<div class="row" style="align-items:center"><label class="fld" style="flex-direction:row;align-items:center;gap:8px">Kelas<select id="gtK" class="gin" style="width:auto">'+gk.map(function(c,i){return'<option value="'+i+'"'+(i===G_TANK?" selected":"")+'>'+esc(c.nama)+' ('+esc(c.kode)+')</option>'}).join("")+'</select></label><span style="flex:1"></span><button class="btn sm" data-act="gtlist">📋 Kelola tantangan &amp; hasil</button><button class="btn sm gray" data-act="gtlive">🟢 Pantau langsung</button></div>';
 return h+tanPicker("act")+'<div class="mut" style="font-size:12px;margin-top:8px">Setelah diterbitkan, tantangan serentak dikendalikan dari kartu tantangan: lihat jumlah murid yang siap, tekan ▶ Mulai, ⏹ Akhiri, dan tayangkan 📺 papan peringkat di proyektor.</div>'}
function homeAct(a,b){
 if(a==="gtmode"||a==="gtlist"||a==="gtlive"){var gk=lsGet(LS_GK,[]),c=gk[G_TANK];if(!c){gTab="kelas";renderGuru();return true}needPin(c,gk,function(){openDash(c.kode,c.pin,false,{tab:a==="gtlive"?"live":"tan",mode:a==="gtmode"?b.dataset.m:null})});return true}
 if(a==="advtog"){lsSet("zv_gadv",lsGet("zv_gadv",0)?0:1);renderGuru();return true}
 if(a==="hnilai"){var gk=lsGet(LS_GK,[]);if(!gk.length){gTab="kelas";renderGuru();gmsg("Buat kelas dulu, lalu bagikan link ke murid. Setelah murid bermain, nilainya muncul di sini.","var(--yel)");return true}
  if(gk.length===1){var c=gk[0];needPin(c,gk,function(){openDash(c.kode,c.pin,false)});return true}
  gTab="kelas";renderGuru();gmsg("Pilih kelas, lalu tekan 📊 Lihat nilai.","var(--yel)");return true}
 return false}
/* satu tombol Simpan: terapkan ke game + simpan ke Paket Saya + tawarkan kirim ke kelas */
function guruSimpan(){if(!applyDraft())return;if(gTab==="editor")renderGuru();if(isFree()){gmsg("✔ Tersimpan di perangkat ini! Tekan 🎮 Coba main di atas untuk memainkan soal Anda.","#7dffa0");return}if(!LIC||!API_URL)return;var jd=data.judul;
 pkSave(false,true).then(function(kd){gmsg("✔ Tersimpan di Paket Saya: "+jd+". Gedung di game sudah diperbarui.","#7dffa0");if(gTab==="editor")renderGuru();offerPush(kd)},function(){})}
function gkPaket(c){if(c.pk!=null)return Promise.resolve(c.pk);return api("/kelas/"+c.kode).then(function(k){c.pk=k.paket_kode||"";return c.pk},function(){return null})}
function offerPush(kd){if(!kd)return;var gk=lsGet(LS_GK,[]);if(!gk.length)return;
 Promise.all(gk.map(gkPaket)).then(function(){lsSet(LS_GK,gk);var cs=gk.filter(function(c){return c.pk===kd});if(!cs.length)return;
  ask("Murid di "+cs.map(function(c){return c.nama}).join(", ")+" masih memakai soal versi sebelumnya. Kirim soal terbaru sekarang?",function(){pushKelas(gk,cs,kd)},{ic:"📲",t:"Kirim ke murid?",ok:"Ya, kirim",no:"Nanti saja"})})}
function pushKelas(gk,cs,kd){var ok=[],i=0,pk=exportPack();
 (function step(){if(i>=cs.length){if(ok.length)gmsg("✔ Soal terbaru terkirim ke "+ok.join(", ")+". Murid mendapat soal baru saat membuka game.","#7dffa0");return}var c=cs[i++];
  needPin(c,gk,function(){gmsg("Mengirim ke "+c.nama+"...");api("/kelas/paket",{lic:licBody(),kode:c.kode,pin:c.pin,paket:pk,paket_kode:kd}).then(function(){ok.push(c.nama);step()},function(e){if(e.status===403&&/PIN/i.test(e.message)){c.pin="";lsSet(LS_GK,gk)}gmsg("❌ "+c.nama+": "+e.message,"#ff8a80");step()})})})()}
var IMG_OPEN={};
function imgLive(inp,j){var row=inp.closest(".imgrow");if(!row)return;var v=inp.value.trim(),pv=row.querySelector(".imgprev"),msg=row.querySelector(".imgmsg");
 if(!v){pv.innerHTML="<span>🖼️</span>";return}if(!/^https?:\/\//i.test(v)){msg.innerHTML="⚠️ Link harus diawali https://";return}
 pv.innerHTML='<img alt="">';var im=pv.querySelector("img");msg.textContent="⏳ Memuat gambar...";im.onload=function(){msg.innerHTML=driveId(v)?"✔ Link Google Drive dikenali dan ditampilkan sebagai gambar.":"✔ Gambar berhasil dimuat."};im.onerror=function(){msg.innerHTML=driveId(v)?"⚠️ Gambar Drive belum bisa dibuka. Pastikan akses berbagi: <b>Siapa saja yang memiliki link</b>.":"⚠️ Gambar tidak bisa dibuka. Pastikan link mengarah langsung ke file gambar."};im.src=imgUrl(v)}
function imgRowHTML(s,j){var has=String(s.gambar||"").trim(),open=has||IMG_OPEN[gSel+":"+j];
 if(!open)return'<div class="row" style="margin-top:6px"><button class="btn sm gray" data-act="imgadd" data-si="'+j+'">🖼️ Tambah gambar</button></div>';
 return'<div class="imgrow"><div class="imgprev">'+(has?'<img src="'+esc(imgUrl(has))+'" alt="" data-ip="'+j+'">':'<span>🖼️</span>')+'</div><div style="flex:1;min-width:0"><label class="fld">Link gambar (boleh link Google Drive)<input data-sk="gambar" data-si="'+j+'" value="'+esc(s.gambar)+'" placeholder="Tempel link Google Drive atau link gambar"></label><div class="mut imgmsg" data-im="'+j+'" style="font-size:12px;margin-top:4px">'+(driveId(has)?'✔ Link Google Drive dikenali dan ditampilkan sebagai gambar.':'Di Google Drive: klik kanan gambar → <b>Bagikan</b> → ubah akses jadi <b>Siapa saja yang memiliki link</b> → <b>Salin link</b>, lalu tempel di sini.')+'</div></div><button class="btn red sm" data-act="imgdel" data-si="'+j+'" title="Hapus gambar">✕</button></div>'}
function sideHTML(){return draft.mapel.map(function(m,i){return'<button class="mb'+(i===gSel?" on":"")+'" data-act="selm" data-mi="'+i+'"><i style="background:'+esc(m.warna)+'"></i>'+(m.rahasia?'🔒 ':'')+esc(m.nama||"(tanpa nama)")+'<small>'+m.soal.length+'</small></button>'}).join("")+(draft.mapel.length<MAX_MAPEL?'<button class="mb" data-act="addm" style="justify-content:center;border-style:dashed">＋ Mapel</button>':"")}
function updAi(){var m=$("aiM").value,j=$("aiJ").value,n=$("aiN").value,c=$("aiC").value,tp=$("aiT")?$("aiT").value:"pg";
 var jenis={pg:"pilihan ganda",campur:"campuran",bs:"benar/salah",isian:"isian singkat"}[tp],aturan={pg:"Setiap soal memiliki 4 pilihan jawaban, tepat 1 jawaban benar, dan pembahasan singkat. Acak posisi jawaban benar.",
  campur:"Gunakan campuran jenis soal: sekitar separuh pilihan ganda, sisanya dibagi rata antara benar/salah, isian singkat, menjodohkan, dan mengurutkan. Setiap soal punya pembahasan singkat. Acak posisi jawaban benar pada pilihan ganda.",
  bs:"Setiap soal berupa pernyataan yang harus dinilai benar atau salah. Buat jumlah pernyataan benar dan salah kira-kira seimbang. Setiap soal punya pembahasan singkat.",
  isian:"Setiap soal dijawab dengan jawaban singkat (1 sampai 3 kata atau angka). Tulis beberapa variasi jawaban yang diterima dipisah tanda |. Setiap soal punya pembahasan singkat."}[tp];
 var contoh={pg:'        {\"q\": \"teks pertanyaan\", \"opsi\": [\"pilihan A\", \"pilihan B\", \"pilihan C\", \"pilihan D\"], \"jawab\": 0, \"bahas\": \"penjelasan singkat\", \"tp\": \"nama TP singkat\"}',
  bs:'        {\"tipe\": \"bs\", \"q\": \"pernyataan\", \"jawab\": 0, \"bahas\": \"penjelasan singkat\", \"tp\": \"nama TP singkat\"}',
  isian:'        {\"tipe\": \"isian\", \"q\": \"pertanyaan\", \"kunci\": \"jawaban|variasi jawaban\", \"bahas\": \"penjelasan singkat\", \"tp\": \"nama TP singkat\"}'};
 contoh.campur=[contoh.pg,contoh.bs,contoh.isian,'        {\"tipe\": \"jodoh\", \"q\": \"Pasangkan yang sesuai!\", \"pasangan\": [[\"kiri 1\", \"kanan 1\"], [\"kiri 2\", \"kanan 2\"], [\"kiri 3\", \"kanan 3\"]], \"bahas\": \"penjelasan singkat\", \"tp\": \"nama TP singkat\"}','        {\"tipe\": \"urut\", \"q\": \"Urutkan dengan benar!\", \"urutan\": [\"langkah 1\", \"langkah 2\", \"langkah 3\", \"langkah 4\"], \"bahas\": \"penjelasan singkat\", \"tp\": \"nama TP singkat\"}'].join(",\n");
 var ket={pg:"Keterangan: \"jawab\" adalah nomor urut pilihan yang benar, dimulai dari 0 (0 = A, 1 = B, 2 = C, 3 = D).",bs:"Keterangan: \"jawab\": 0 berarti pernyataan BENAR, 1 berarti pernyataan SALAH.",isian:"Keterangan: \"kunci\" berisi jawaban benar; pisahkan variasi jawaban yang juga diterima dengan tanda |."};
 ket.campur=ket.pg+"\n"+ket.bs+"\n"+ket.isian+"\nSoal menjodohkan (\"jodoh\") berisi 2 sampai 6 pasangan [kiri, kanan] yang benar. Soal mengurutkan (\"urut\") berisi 2 sampai 8 langkah dalam urutan yang BENAR.";
 $("aiOut").value="Buatkan "+n+" soal "+jenis+" untuk mapel/topik \""+m+"\" jenjang "+j+"."+(c?" Catatan: "+c+".":"")+"\n"+aturan+" Gunakan bahasa Indonesia yang sesuai usia murid. Kelompokkan soal ke dalam 2 sampai 4 Tujuan Pembelajaran (TP) sesuai Kurikulum Merdeka, lalu isi \"tp\" pada setiap soal dengan nama TP yang singkat (2 sampai 6 kata, contoh: \"Pecahan senilai\"). Gunakan nama TP yang persis sama untuk soal-soal dalam TP yang sama. Sertakan juga 1 materi ringkasan berjenis teks (1 sampai 3 paragraf) untuk dipelajari murid sebelum kuis.\n\nKeluarkan HANYA JSON valid tanpa teks lain, dengan format persis seperti ini:\n{\n  \"judul\": \""+m+" - "+j+"\",\n  \"guru\": \"\",\n  \"jenjang\": \""+j+"\",\n  \"mapel\": [\n    {\n      \"nama\": \""+m+"\",\n      \"warna\": \"#3b82f6\",\n      \"waktu\": 30,\n      \"jumlah\": "+Math.min(10,+n||10)+",\n      \"materi\": [{\"judul\": \"Ringkasan materi\", \"jenis\": \"teks\", \"isi\": \"ringkasan materi\"}],\n      \"soal\": [\n"+contoh[tp]+"\n      ]\n    }\n  ]\n}\n\n"+ket[tp]}
/* ---------- 📥 IMPOR SOAL dari Word / Excel / CSV / teks tempel (tanpa library, berjalan di browser) ---------- */
var IMP={view:"pick",items:[],groups:[],raw:"",fname:"",flt:"all",msg:""};
/* --- pembaca ZIP (docx/xlsx adalah file zip) --- */
function impZip(buf){var u=new Uint8Array(buf),dv=new DataView(buf),n=u.length,e=-1;
 for(var i=n-22;i>=Math.max(0,n-66000);i--){if(dv.getUint32(i,true)===0x06054b50){e=i;break}}
 if(e<0)throw new Error("File tidak bisa dibuka. Pastikan formatnya .docx atau .xlsx. File .doc/.xls lama perlu disimpan ulang dulu (Simpan Sebagai .docx/.xlsx).");
 var cnt=dv.getUint16(e+10,true),off=dv.getUint32(e+16,true),fs={},td=new TextDecoder();
 for(var k=0;k<cnt&&off+46<=n;k++){if(dv.getUint32(off,true)!==0x02014b50)break;
  var meth=dv.getUint16(off+10,true),csz=dv.getUint32(off+20,true),nl=dv.getUint16(off+28,true),xl=dv.getUint16(off+30,true),cl=dv.getUint16(off+32,true),lo=dv.getUint32(off+42,true);
  var name=td.decode(u.subarray(off+46,off+46+nl)),ds=lo+30+dv.getUint16(lo+26,true)+dv.getUint16(lo+28,true);
  fs[name]={m:meth,d:u.subarray(ds,ds+csz)};off+=46+nl+xl+cl}
 return fs}
function impZipText(fs,name){var f=fs[name];if(!f)return Promise.resolve(null);
 if(f.m===0)return Promise.resolve(new TextDecoder().decode(f.d));
 if(f.m!==8)return Promise.reject(new Error("Format file tidak didukung."));
 if(typeof DecompressionStream==="undefined")return Promise.reject(new Error("Browser ini belum bisa membaca file Word/Excel. Perbarui Chrome, atau salin isi soal lalu tempel di kotak \"Tempel teks soal\"."));
 return new Response(new Blob([f.d]).stream().pipeThrough(new DecompressionStream("deflate-raw"))).text()}
function impXml(s){return new DOMParser().parseFromString(s,"application/xml")}
function impKids(el,ln){var r=[];if(!el)return r;for(var c=el.firstChild;c;c=c.nextSibling)if(c.nodeType===1&&(!ln||c.localName===ln))r.push(c);return r}
function impKid(el,ln){return impKids(el,ln)[0]||null}
function impAttr(el,ln){if(!el||!el.attributes)return null;for(var i=0;i<el.attributes.length;i++){var a=el.attributes[i];if(a.localName===ln)return a.value}return null}
function impClean(t){return String(t==null?"":t).replace(/\u00a0/g," ").replace(/[\u200b\ufeff]/g,"").replace(/\t+/g," ").replace(/ {2,}/g," ").trim()}
function impNorm(t){return impClean(t).toLowerCase().replace(/[.:*()\[\]]/g,"").replace(/\s+/g," ").trim()}
/* --- Word (.docx): paragraf, penomoran otomatis, huruf tebal/garis bawah/stabilo, tabel --- */
function impNumDefs(x){if(!x)return null;var root=x.documentElement,abs={},nm={},ov={};
 impKids(root,"abstractNum").forEach(function(a){var L={};impKids(a,"lvl").forEach(function(l){var il=+impAttr(l,"ilvl")||0;L[il]={fmt:impAttr(impKid(l,"numFmt"),"val")||"decimal",txt:impAttr(impKid(l,"lvlText"),"val")||"",start:+(impAttr(impKid(l,"start"),"val")||1)}});abs[impAttr(a,"abstractNumId")]=L});
 impKids(root,"num").forEach(function(n){var id=impAttr(n,"numId");nm[id]=impAttr(impKid(n,"abstractNumId"),"val");impKids(n,"lvlOverride").forEach(function(o){var so=impKid(o,"startOverride");if(so){ov[id]=ov[id]||{};ov[id][+impAttr(o,"ilvl")||0]=+impAttr(so,"val")}})});
 return{abs:abs,nm:nm,ov:ov}}
function impFmtNum(n,f){if(f==="lowerLetter"||f==="upperLetter"){var s="";n=Math.max(1,n);while(n>0){n--;s=String.fromCharCode(97+n%26)+s;n=Math.floor(n/26)}return f==="upperLetter"?s.toUpperCase():s}
 if(f==="lowerRoman"||f==="upperRoman"){var v=[1000,900,500,400,100,90,50,40,10,9,5,4,1],r=["m","cm","d","cd","c","xc","l","xl","x","ix","v","iv","i"],o="";v.forEach(function(x,i){while(n>=x){o+=r[i];n-=x}});return f==="upperRoman"?o.toUpperCase():o}
 return String(n)}
function impNumPrefix(D,C,numId,il){if(!D||!numId||numId==="0")return"";var A=D.abs[D.nm[numId]];if(!A||!A[il])return"";var L=A[il];if(L.fmt==="bullet"||L.fmt==="none")return"";
 var c=C[numId]=C[numId]||{},st=function(l){return D.ov[numId]&&D.ov[numId][l]!=null?D.ov[numId][l]:(A[l]?A[l].start:1)};
 c[il]=c[il]==null?st(il):c[il]+1;Object.keys(c).forEach(function(k){if(+k>il)delete c[k]});
 var t=L.txt.replace(/%(\d)/g,function(m,d){var l=+d-1;return impFmtNum(c[l]!=null?c[l]:st(l),A[l]?A[l].fmt:"decimal")});return t?t+" ":""}
function impRunFlags(r){var p=impKid(r,"rPr"),f={b:0,u:0,h:0,c:0};if(!p)return f;
 var on=function(ln){var e=impKid(p,ln);if(!e)return 0;var v=impAttr(e,"val");return v==="0"||v==="false"||v==="none"?0:1};
 f.b=on("b");f.u=on("u");var hl=impKid(p,"highlight"),sh=impKid(p,"shd");f.h=(hl&&impAttr(hl,"val")!=="none")||(sh&&/^[0-9A-F]{6}$/i.test(impAttr(sh,"fill")||"")&&!/^(FFFFFF|auto)$/i.test(impAttr(sh,"fill")))?1:0;
 var co=impKid(p,"color");f.c=co&&/^[0-9A-F]{6}$/i.test(impAttr(co,"val")||"")&&!/^(000000|auto)$/i.test(impAttr(co,"val"))?1:0;return f}
function impParaLines(p,D,C){var segs=[{t:"",n:0,b:0,u:0,h:0,c:0}],pp=impKid(p,"pPr"),np=pp&&impKid(pp,"numPr"),pre="";
 if(np){var nid=impAttr(impKid(np,"numId"),"val"),il=impAttr(impKid(np,"ilvl"),"val");if(nid==null&&D&&D.st){var ps0=impAttr(impKid(pp,"pStyle"),"val");if(D.st[ps0])nid=D.st[ps0].id}pre=impNumPrefix(D,C,nid,+(il||0))}
 else if(D&&D.st&&pp){var ps=impAttr(impKid(pp,"pStyle"),"val");if(ps&&D.st[ps])pre=impNumPrefix(D,C,D.st[ps].id,D.st[ps].il)}
 (function walk(el){impKids(el).forEach(function(c){var ln=c.localName;
  if(ln==="r"){var f=impRunFlags(c);impKids(c).forEach(function(x){var s=segs[segs.length-1];
   if(x.localName==="t"){var tx=x.textContent,k=tx.replace(/\s/g,"").length;s.t+=tx;s.n+=k;s.b+=f.b*k;s.u+=f.u*k;s.h+=f.h*k;s.c+=f.c*k}
   else if(x.localName==="tab")s.t+=" ";else if(x.localName==="br"||x.localName==="cr")segs.push({t:"",n:0,b:0,u:0,h:0,c:0})})}
  else if(ln==="pPr"||ln==="rPr"||ln==="del"||ln==="moveFrom")return;
  else walk(c)})})(p);
 return segs.map(function(s,i){var n=s.n||1;return{t:(i===0?pre:"")+s.t,f:{b:s.b/n,u:s.u/n,h:s.h/n,c:s.c/n}}})}
function impCellText(tc,D,C){var out=[];impKids(tc).forEach(function(c){if(c.localName==="p")impParaLines(c,D,C).forEach(function(l){if(impClean(l.t))out.push(l)});else if(c.localName==="tbl"||c.localName==="sdt"){}});return out}
function impDocx(fs){return Promise.all([impZipText(fs,"word/document.xml"),impZipText(fs,"word/numbering.xml"),impZipText(fs,"word/styles.xml")]).then(function(r){
 if(!r[0])throw new Error("Isi dokumen Word tidak ditemukan. Pastikan file berformat .docx.");
 var doc=impXml(r[0]),D=impNumDefs(r[1]?impXml(r[1]):null),C={},lines=[],tables=[];
 if(D&&r[2]){D.st={};var sx=impXml(r[2]),base={};impKids(sx.documentElement,"style").forEach(function(st){var id=impAttr(st,"styleId"),pp=impKid(st,"pPr"),np=pp&&impKid(pp,"numPr"),bo=impKid(st,"basedOn");if(bo)base[id]=impAttr(bo,"val");if(np){var ni=impAttr(impKid(np,"numId"),"val");if(ni&&ni!=="0")D.st[id]={id:ni,il:+(impAttr(impKid(np,"ilvl"),"val")||0)}}});
  Object.keys(base).forEach(function(id){var b=base[id],g=0;while(!D.st[id]&&b&&g++<8){if(D.st[b])D.st[id]=D.st[b];b=base[b]}})}
 var body=impKid(doc.documentElement,"body");
 (function walk(el){impKids(el).forEach(function(c){var ln=c.localName;
  if(ln==="p")impParaLines(c,D,C).forEach(function(l){lines.push(l)});
  else if(ln==="tbl"){var rows=impKids(c,"tr").map(function(tr){return impKids(tr,"tc").map(function(tc){return impCellText(tc,D,C)})});
   var flat=rows.map(function(r){return r.map(function(cell){return cell.map(function(l){return impClean(l.t)}).join(" ")})});
   if(impHdrFind(flat)){tables.push({rows:flat});return}
   rows.forEach(function(r){var cells=r.filter(function(cell){return cell.length});
    if(cells.length>1&&cells[0].length===1&&/^\d{1,3}\s*[.)]?$/.test(impClean(cells[0][0].t))){var no=impClean(cells[0][0].t).replace(/[.)\s]/g,"");cells.shift();cells[0]=cells[0].slice();cells[0][0]={t:no+". "+cells[0][0].t,f:cells[0][0].f}}
    cells.forEach(function(cell){cell.forEach(function(l){lines.push(l)})})})}
  else if(ln==="sdt")walk(impKid(c,"sdtContent"));
  else if(ln==="customXml"||ln==="smartTag")walk(c)})})(body);
 return{lines:lines,tables:tables}})}
/* --- Excel (.xlsx) --- */
function impColIdx(ref){var m=String(ref||"").match(/^([A-Z]+)/i);if(!m)return-1;var s=m[1].toUpperCase(),n=0;for(var i=0;i<s.length;i++)n=n*26+s.charCodeAt(i)-64;return n-1}
function impXlsx(fs){return Promise.all([impZipText(fs,"xl/workbook.xml"),impZipText(fs,"xl/_rels/workbook.xml.rels"),impZipText(fs,"xl/sharedStrings.xml")]).then(function(r){
 if(!r[0])throw new Error("Isi file Excel tidak ditemukan. Pastikan file berformat .xlsx.");
 var wb=impXml(r[0]),rel={},ss=[];
 if(r[1])impKids(impXml(r[1]).documentElement,"Relationship").forEach(function(x){rel[impAttr(x,"Id")]=impAttr(x,"Target")});
 if(r[2])impKids(impXml(r[2]).documentElement,"si").forEach(function(si){var t="";(function w(e){impKids(e).forEach(function(c){if(c.localName==="t")t+=c.textContent;else if(c.localName!=="rPh")w(c)})})(si);ss.push(t)});
 var sheets=impKids(impKid(wb.documentElement,"sheets"),"sheet").map(function(s){var tg=rel[impAttr(s,"id")]||"";tg=tg.replace(/^\/?xl\//,"").replace(/^\//,"");return{name:impAttr(s,"name")||"Sheet",path:"xl/"+tg}});
 return Promise.all(sheets.map(function(s){return impZipText(fs,s.path)})).then(function(xs){return sheets.map(function(s,i){var rows=[];if(!xs[i])return{name:s.name,rows:rows};
  var sd=impKid(impXml(xs[i]).documentElement,"sheetData");impKids(sd,"row").forEach(function(row){var ri=(+impAttr(row,"r")||rows.length+1)-1,arr=[];
   impKids(row,"c").forEach(function(c,k){var ci=impColIdx(impAttr(c,"r"));if(ci<0)ci=k;var t=impAttr(c,"t"),v=impKid(c,"v"),val="";
    if(t==="s")val=ss[+(v?v.textContent:0)]||"";else if(t==="inlineStr"){var is=impKid(c,"is");val=is?is.textContent:""}else if(t==="b")val=v&&v.textContent==="1"?"TRUE":"FALSE";else val=v?v.textContent:"";
    if(t!=="s"&&t!=="inlineStr"&&t!=="str"&&/^-?\d+\.\d{6,}$/.test(val))val=String(+(+val).toFixed(6));arr[ci]=val});
   for(var q=0;q<arr.length;q++)if(arr[q]==null)arr[q]="";rows[ri]=arr});
  for(var z=0;z<rows.length;z++)if(!rows[z])rows[z]=[];return{name:s.name,rows:rows}})})})}
/* --- CSV --- */
function impCsv(txt){var first=(txt.split(/\r?\n/)[0]||""),cnt=function(ch){return first.split(ch).length},d=[";",",","\t"].sort(function(a,b){return cnt(b)-cnt(a)})[0];
 var rows=[],row=[],f="",q=false;for(var i=0;i<txt.length;i++){var ch=txt[i];
  if(q){if(ch==='"'){if(txt[i+1]==='"'){f+='"';i++}else q=false}else f+=ch}
  else if(ch==='"')q=true;else if(ch===d){row.push(f);f=""}else if(ch==="\n"||ch==="\r"){if(ch==="\r"&&txt[i+1]==="\n")i++;row.push(f);rows.push(row);row=[];f=""}else f+=ch}
 if(f||row.length){row.push(f);rows.push(row)}return rows}
/* --- tabel (Excel / CSV / tabel Word berjudul kolom) --- */
function impHdrMap(row){var mp={op:[]},any=false;(row||[]).forEach(function(c,i){var h=impNorm(c),m;if(!h)return;
 if(/^(mapel|mata pelajaran|pelajaran|topik|materi|subtema|tema)$/.test(h))mp.mapel=i;
 else if(/^(tipe|jenis|jenis soal|tipe soal|bentuk soal|bentuk)$/.test(h))mp.tipe=i;
 else if(/^(soal|pertanyaan|butir soal|teks soal|pernyataan|question|soal pertanyaan|isi soal)$/.test(h)){mp.soal=i;any=true}
 else if((m=h.match(/^(?:opsi|pilihan|option|pilihan jawaban|jawaban|jwb|opsi jawaban)?\s*([a-h])$/)))mp.op[m[1].charCodeAt(0)-97]=i;
 else if(/^(kunci|kunci jawaban|jawaban benar|jawaban yang benar|jawaban|key|kunci jwb|answer)$/.test(h))mp.kunci=i;
 else if(/^(pembahasan|bahas|penjelasan|alasan|keterangan)$/.test(h))mp.bahas=i;
 else if(/^(tp|tujuan pembelajaran|tujuan)$/.test(h))mp.tp=i;
 else if(/^(gambar|link gambar|url gambar|image|foto)$/.test(h))mp.gambar=i});return any?mp:null}
function impHdrFind(rows){for(var i=0;i<Math.min(6,rows.length);i++){var m=impHdrMap(rows[i]);if(m){m.row=i;return m}}return null}
function impRowsToRaw(rows,mp,defMapel){var out=[];for(var i=mp.row+1;i<rows.length;i++){var r=rows[i]||[],g=function(k){return k==null?"":impClean(r[k])},q=g(mp.soal);if(!q)continue;
 var opts=[];mp.op.forEach(function(ci,k){if(ci==null)return;var t=g(ci);if(t)opts.push({t:t,f:null,L:String.fromCharCode(65+k)})});
 out.push({no:out.length+1,q:q,opts:opts,key:g(mp.kunci)||null,hint:g(mp.tipe),bahas:g(mp.bahas),tp:g(mp.tp).slice(0,80),gambar:g(mp.gambar),mapel:g(mp.mapel)||defMapel||"",lines:[],src:"tabel"})}return out}
/* --- pengenal pola teks --- */
var IMP_RX={
 q:/^(?:no(?:mor)?\.?\s*|soal\s*(?:no\.?\s*)?)?\(?(\d{1,3})\s*[.)](?!\d)\s*(.*)$/i,
 opt:/^\(?([A-Ha-h])\s*[.)]\s*(.+)$/,
 key:/^(?:kunci(?:\s*jawaban)?|jawaban(?:\s*(?:benar|yang\s*benar))?|jawab|jwb|key|answer|ans)\s*[:=\-–]\s*(.+)$/i,
 bahas:/^(?:pembahasan|penjelasan|bahas|alasan)\s*[:=\-–]\s*(.*)$/i,
 tp:/^(?:tp|tujuan\s*pembelajaran)\s*(?:\d+(?:\.\d+)*)?\s*[:=\-–.]\s*(.+)$/i,
 mapel:/^(?:mata\s*pelajaran|mapel|pelajaran|topik)\s*[:\-–]\s*(.+)$/i,
 secA:/^((?:[IVX]{1,4}|[A-H])[.)]\s*)?(soal\s+)?(bagian\s+\S+\s*[:.\-]?\s*)?[^a-z]*$/,
 secB:/^((?:[IVX]{1,4}|[A-H])[.)]\s*)?(soal\s+|bagian\s+\S+\s*[:.\-]?\s*)?(bentuk\s+)?(pilihan\s*ganda|isian(\s*singkat)?|uraian(\s*singkat)?|esai|essay|benar\s*(atau|\/|-|–)\s*salah|menjodohkan|jodohkan|mengurutkan)\s*[:.!]?\s*$/i,
 instr:/^(berilah|pilihlah|isilah|jawablah|jodohkan|pasangkan|tulislah|lengkapilah|kerjakan|silanglah|lingkarilah|bacalah)\b/i,
 junk:/^((halaman|hal\.?|page)\s*\d+(\s*(dari|of)\s*\d+)?|\d{1,3}|[-–_=.*•]{3,}|selamat mengerjakan.*)$/i,
 sec:/(pilihan\s*ganda|isian(\s*singkat)?|uraian|esai|essay|benar\s*(?:atau|\/|-|–)\s*salah|menjodohkan|jodohkan|mengurutkan|^b\s*\/\s*s$)/i,
 stim:/^(?:(?:bacalah|perhatikan|cermatilah|simaklah|baca)\b.{0,80}\b(?:teks|bacaan|cerita|wacana|paragraf|puisi|tabel|data|kutipan|berikut)|.{0,40}untuk\s+(?:menjawab\s+)?soal\s+(?:nomor|no\.?))/i,
 pair:/\s(?:=|→|->|—>|–>|⇒)\s|\s[–—-]\s/,
 gf:/^\d+\s*(poin|point|points|pts|nilai)$/i,
 gfJunk:/^(kirim|submit|kosongkan (formulir|pilihan)|clear (form|selection)|halaman \d+ dari \d+|page \d+ of \d+|jangan pernah mengirimkan sandi|never submit passwords|konten ini tidak dibuat|this content is neither|formulir google|google (formulir|forms)|laporkan penyalahgunaan|report abuse|\* (menunjukkan|wajib|indicates|required)|wajib diisi|lainnya:?|other:?|jawaban anda|your answer|pilih|choose|berikutnya|next|kembali|back)$/i};
function impSecType(t){t=t.toLowerCase();if(/pilihan\s*ganda/.test(t))return"pg";if(/benar|b\s*\/\s*s/.test(t))return"bs";if(/jodoh/.test(t))return"jodoh";if(/urut/.test(t))return"urut";if(/isian|uraian|esai|essay/.test(t))return"isian";return""}
function impSplitInline(s){var re=/(^|\s)\(?([A-Ha-h])[.)]\s+/g,m,hits=[];while((m=re.exec(s))){hits.push({i:m.index+m[1].length,L:m[2],e:re.lastIndex})}
 var start=-1;for(var k=0;k<hits.length;k++){if(/[Aa]/.test(hits[k].L)&&hits[k+1]&&hits[k+1].L.toLowerCase()==="b"&&(hits[k+1].L===hits[k+1].L.toUpperCase())===(hits[k].L===hits[k].L.toUpperCase())){start=k;break}}
 if(start<0)return null;var seq=[hits[start]];for(var j=start+1;j<hits.length;j++){var exp=String.fromCharCode(seq[seq.length-1].L.charCodeAt(0)+1);if(hits[j].L===exp)seq.push(hits[j])}
 if(seq.length<2)return null;var opts=seq.map(function(h,x){return{t:impClean(s.slice(h.e,x+1<seq.length?seq[x+1].i:s.length)),L:h.L.toUpperCase(),f:null}});
 return{q:impClean(s.slice(0,seq[0].i)),opts:opts}}
function impMark(t){var m=false,o=t.replace(/\s*(\(\s*(benar|kunci|jawaban|✓|√)\s*\)|[✓✔√]|\*{1,2})\s*$/i,function(){m=true;return""}).replace(/^\s*(\*{1,2}|[✓✔√])\s*/,function(){m=true;return""});return{t:impClean(o),m:m}}
function impParseLines(lines){var L=[];lines.forEach(function(x){var t=impClean(x.t);if(t)L.push({t:t,f:x.f||null})});
 if(L.filter(function(x){return IMP_RX.gf.test(x.t)}).length>=2)return impParseGForm(L);
 var items=[],cur=null,mapel="",sec="",keyMode=false,stim=null,keyTab=[],tpSec="";
 var flush=function(){if(cur){items.push(cur);cur=null}};
 var isPairQ=function(){return cur&&(sec==="jodoh"||/pasang|jodoh/i.test(cur.q))};
 L.forEach(function(x){var t=x.t,m;
  if(keyMode){if((m=t.match(IMP_RX.mapel))){keyMode=false}else{impKeyEntries(t,keyTab);return}}
  if(/^kunci(\s*jawaban)?(\s*soal)?\s*[:\-]?\s*$/i.test(t)||(/^kunci\s*jawaban/i.test(t)&&(t.match(/\d{1,3}\s*[.)\-:=]?\s*\(?[A-Ea-e]\)?(?![A-Za-z])/g)||[]).length>=2)){flush();keyMode=true;impKeyEntries(t.replace(/^kunci(\s*jawaban)?\s*[:\-]?/i,""),keyTab);return}
  if((m=t.match(IMP_RX.tp))){flush();tpSec=impClean(m[1]).slice(0,80);return}
  if((m=t.match(IMP_RX.mapel))){flush();tpSec="";mapel=impClean(m[1].split(/\s{2,}|\s+(?=(?:kelas|semester|hari|tanggal|waktu|nama|tahun)\b)/i)[0]).slice(0,40);stim=null;return}
  if(IMP_RX.junk.test(t))return;
  if(t.length<70&&IMP_RX.sec.test(t)&&(IMP_RX.secA.test(t)||IMP_RX.secB.test(t))){flush();sec=impSecType(t);stim=null;return}
  if(IMP_RX.stim.test(t)&&(!cur||cur.opts.length||cur.key)){flush();var rg=t.match(/(?:nomor|no\.?)\s*(\d{1,3})\s*(?:-|–|s\.?\s*d\.?|sampai|hingga|dan)\s*(\d{1,3})/i);stim={text:t,lines:[],a:rg?+rg[1]:0,b:rg?+rg[2]:0,used:0};return}
  if((m=t.match(IMP_RX.q))&&!(isPairQ()&&!cur.opts.length&&IMP_RX.pair.test(" "+m[2]+" "))&&!(cur&&!cur.q&&!cur.opts.length)){
   flush();cur={no:+m[1],q:m[2],opts:[],key:null,bahas:"",tp:tpSec,lines:[],hint:sec,mapel:mapel,mode:"",src:"teks"};
   var sp=impSplitInline(cur.q);if(sp&&sp.q){cur.q=sp.q;cur.opts=sp.opts}
   if(stim){var inR=stim.a?(cur.no>=stim.a&&cur.no<=stim.b):stim.used===0;if(inR){cur.stim=stim;stim.used++}if(!stim.a||cur.no>=stim.b)stim=stim.a&&cur.no<stim.b?stim:null}
   return}
  if(!cur){if(stim)stim.lines.push(t);return}
  if((m=t.match(IMP_RX.key))){cur.key=impClean(m[1]);cur.mode="";return}
  if((m=t.match(IMP_RX.bahas))){cur.bahas=impClean(m[1]);cur.mode="bahas";return}
  if(cur.mode==="bahas"){cur.bahas=impClean(cur.bahas+" "+t);return}
  if((m=t.match(IMP_RX.opt))&&!(m[1].toLowerCase()!=="a"&&!cur.opts.length&&!cur.q)){
   var sp2=impSplitInline(t);if(sp2&&!sp2.q){sp2.opts.forEach(function(o){var mk=impMark(o.t);cur.opts.push({t:mk.t,L:o.L,f:null,mark:mk.m})})}
   else{var mk=impMark(m[2]);cur.opts.push({t:mk.t,L:m[1].toUpperCase(),f:x.f,mark:mk.m})}return}
  if(cur.opts.length&&/^\(?[A-Ha-h]\)?\.?$/.test(t)){cur.key=t.replace(/[().]/g,"");return}
  if(!cur.q&&!cur.opts.length){cur.q=t;return}
  if(!cur.opts.length){if(IMP_RX.pair.test(" "+t+" ")||isPairQ()){cur.lines.push(t);return}var sp3=impSplitInline(t);if(sp3&&!sp3.q){cur.opts=sp3.opts;return}if(cur.lines.length)cur.lines.push(t);else cur.q+="\n"+t;return}
  if(IMP_RX.instr.test(t)||/:$/.test(t))return;
  var last=cur.opts[cur.opts.length-1];if(last&&!cur.key&&t.length<120&&!/[?!]$/.test(t))last.t=impClean(last.t+" "+t)});
 flush();
 var used={},hasK=function(it){if(it.opts.some(function(o){return o.mark}))return true;return["h","u","b","c"].some(function(a){return it.opts.filter(function(o){return o.f&&o.f[a]>=0.6}).length===1})};
 keyTab.forEach(function(k){var cs=items.filter(function(it,ix){return it.no===k.no&&!it.key&&!used[ix]}),isL=/^[A-H]$/.test(k.v);
  var c=cs.filter(function(it){return isL?it.opts.length>=2&&!hasK(it):!it.opts.length})[0]||cs.filter(function(it){return isL?it.opts.length>=2:true})[0]||cs[0];if(c){c.key=k.v;used[items.indexOf(c)]=1}});
 return items}
function impKeyEntries(t,tab){t=impClean(t).replace(/^(?:[IVX]{1,4}|[A-H])[.)]\s*(?=\d)/,"").replace(/^[A-Za-z ]{2,30}:\s*/,"");if(!t)return;var re=/(\d{1,3})\s*[.)\-:=]?\s*\(?([A-Ha-h])\)?(?![A-Za-z0-9])/g,m,hits=[],cov=0;while((m=re.exec(t))){hits.push({no:+m[1],v:m[2].toUpperCase()});cov+=m[0].length}
 if(hits.length&&(hits.length>1||cov>=t.replace(/[\s,;|]/g,"").length*0.6)){hits.forEach(function(h){tab.push(h)});return}
 var re2=/(\d{1,3})\s*[.)\-:=]\s*(.+?)(?=\s+\d{1,3}\s*[.)]\s|$)/g,n2=0;while((m=re2.exec(t))){if(m.index===0||n2){tab.push({no:+m[1],v:impClean(m[2])});n2++}}}
function impParseGForm(L){var items=[],cur=null;
 for(var i=0;i<L.length;i++){var t=L[i].t;if(IMP_RX.gf.test(t))continue;
  if(L[i+1]&&IMP_RX.gf.test(L[i+1].t)){if(cur)items.push(cur);cur={no:items.length+1,q:t.replace(/\s*\*\s*$/,""),opts:[],key:null,bahas:"",lines:[],hint:"",mapel:"",src:"gform"};continue}
  if(!cur)continue;if(IMP_RX.gfJunk.test(t)||/^(jangan pernah mengirimkan sandi|never submit passwords|konten ini tidak dibuat|this content is neither|laporkan penyalahgunaan|report abuse|formulir ini dibuat|this form was created)/i.test(t)){continue}
  cur.opts.push({t:t,L:String.fromCharCode(65+cur.opts.length),f:null})}
 if(cur)items.push(cur);return items}
/* --- ubah hasil baca menjadi soal ZuperVerse --- */
function impTipeHint(h){h=String(h||"").toLowerCase().trim();if(!h)return"";if(/^(pg|pilihan ganda|pilgan|ganda|mc|multiple)/.test(h))return"pg";if(/^(bs|b\/s|b-s|benar|true)/.test(h))return"bs";if(/jodoh|pasang|match/.test(h))return"jodoh";if(/urut|order|sequence/.test(h))return"urut";if(/isian|isi|singkat|uraian|esai|essay|short/.test(h))return"isian";return""}
function impPairSplit(t){var m=String(t).match(/^(.+?)\s*(?:=|→|->|—>|–>|⇒|\.{3,}|…|\s[–—-]\s)\s*(.+)$/);return m?[impClean(m[1].replace(/^\(?\d{1,2}[.)]\s*/,"")),impClean(m[2])]:null}
function impBuild(r){var warn=[],tp=impTipeHint(r.hint),q=String(r.q||"").split("\n").map(impClean).filter(Boolean).join("\n"),opts=r.opts.slice(),key=r.key?impClean(r.key):"";
 if(r.stim){q=impClean(r.stim.text)+(r.stim.lines.length?"\n"+r.stim.lines.join("\n"):"")+"\n\n"+q;warn.push("Soal ini memakai bacaan bersama. Bacaannya ikut ditempel di depan soal, periksa apakah terlalu panjang.")}
 var bsQ=/\(\s*b\s*[\/\-–]\s*s\s*\)|\bb\s*[\/\-–]\s*s\s*$|benar\s+atau\s+salah\s*[?.!]*$/i;
 if(!tp){if(opts.length===2&&/^benar$/i.test(opts[0].t)&&/^salah$/i.test(opts[1].t))tp="bs";
  else if(opts.length>=2&&/pasang|jodoh/i.test(q)&&opts.every(function(o){return impPairSplit(o.t)}))tp="jodoh";
  else if((r.lines||[]).length>=2&&(r.lines||[]).every(function(l){return impPairSplit(l)}))tp="jodoh";
  else if(opts.length>=2&&/\burutkan\b|susunlah.{0,40}urut|urutan\s+yang\s+(benar|tepat)/i.test(q))tp="urut";
  else if(opts.length>=2)tp="pg";
  else if(/^(benar|salah|betul|true|false)$/i.test(key)||(bsQ.test(q)&&/^(b|s)$/i.test(key)))tp="bs";
  else if(/^(b|s)$/i.test(key)&&r.src==="tabel"){tp="bs";warn.push("Kunci hanya B atau S tanpa pilihan, jadi dianggap soal Benar/Salah.")}
  else tp="isian"}
 if(tp!=="jodoh"&&r.lines&&r.lines.length)q=q+"\n"+r.lines.join("\n");
 var s={tipe:tp,q:q.replace(bsQ,"").trim()||q,bahas:r.bahas||"",tp:r.tp||"",gambar:/^https?:\/\//i.test(r.gambar||"")?r.gambar:""};
 if(tp==="pg"){var keyIdx=-1,km;
  if(key){if((km=key.match(/^\(?([A-Ha-h])\)?(?:[.)\s]|$)/))){keyIdx=opts.map(function(o){return o.L}).indexOf(km[1].toUpperCase());if(keyIdx<0)keyIdx=km[1].toUpperCase().charCodeAt(0)-65}
   else{var nk=normAns(key);keyIdx=opts.map(function(o){return normAns(o.t)}).indexOf(nk)}}
  if(keyIdx<0||keyIdx>=opts.length){var mk=opts.map(function(o,i){return o.mark?i:-1}).filter(function(i){return i>=0});if(mk.length===1)keyIdx=mk[0]}
  if((keyIdx<0||keyIdx>=opts.length)&&opts.length>=2){["h","u","b","c"].some(function(a){var hit=opts.map(function(o,i){return o.f&&o.f[a]>=0.6?i:-1}).filter(function(i){return i>=0});if(hit.length===1){keyIdx=hit[0];return true}})}
  if(key&&(keyIdx<0||keyIdx>=opts.length))warn.push("Kunci \""+key+"\" tidak cocok dengan pilihan yang ada.");
  if(opts.length>4){var keep=[];if(keyIdx>=0&&keyIdx<opts.length)keep.push(keyIdx);for(var i=0;i<opts.length&&keep.length<4;i++)if(keep.indexOf(i)<0)keep.push(i);keep.sort(function(a,b){return a-b});
   warn.push("Ada "+opts.length+" pilihan. Game memakai maksimal 4, jadi pilihan "+opts.map(function(o,i){return keep.indexOf(i)<0?o.L:null}).filter(Boolean).join(", ")+" dibuang.");keyIdx=keep.indexOf(keyIdx);opts=keep.map(function(i){return opts[i]})}
  s.opsi=opts.map(function(o){return o.t});s.jawab=keyIdx>=0&&keyIdx<opts.length?keyIdx:-1}
 else if(tp==="bs"){var kb=key,j=-1;if(!kb&&opts.length===2){var e=["h","u","b","c"].map(function(a){return opts.map(function(o,i){return o.f&&o.f[a]>=0.6||o.mark?i:-1}).filter(function(i){return i>=0})}).filter(function(h){return h.length===1})[0];if(e)j=e[0]}
  if(/^(b|benar|betul|true|t|ya|y)\.?$/i.test(kb))j=0;else if(/^(s|salah|false|f|tidak)\.?$/i.test(kb))j=1;else if(/^\(?a\)?$/i.test(kb)&&opts.length===2)j=0;
  s.opsi=["Benar","Salah"];s.jawab=j}
 else if(tp==="isian"){s.kunci=key;if(opts.length)warn.push("Pilihan jawaban diabaikan karena soal dibaca sebagai isian singkat.")}
 else if(tp==="jodoh"){var src=opts.length?opts.map(function(o){return o.t}):(r.lines||[]);s.pasangan=src.map(impPairSplit).filter(Boolean);
  if(!s.pasangan.length&&src.length)warn.push("Tulis pasangan dengan format: kiri = kanan.")}
 else if(tp==="urut"){var items=opts.length?opts.map(function(o){return o.t}):(r.lines||[]).slice(),seq=null;
  if(key){var tok=key.toUpperCase().replace(/[^A-H0-9]+/g," ").trim().split(" ");if(tok.length===1&&/^[A-H]{2,8}$/.test(tok[0]))tok=tok[0].split("");
   var ix=tok.map(function(x){return/^\d+$/.test(x)?+x-1:opts.map(function(o){return o.L}).indexOf(x)});if(ix.length===items.length&&ix.every(function(v,i){return v>=0&&v<items.length&&ix.indexOf(v)===i}))seq=ix}
  if(seq)items=seq.map(function(i){return items[i]});else if(!(r.src==="tabel"&&!key))warn.push(key?"Urutan pada kunci \""+key+"\" tidak terbaca. Pastikan langkah di bawah sudah dalam urutan yang benar.":"Tidak ada kunci urutan, jadi urutan ditulis dianggap sudah benar. Periksa lagi.");
  s.urutan=items}
 return{s:padSoal(s),warn:warn,err:"",use:true,mapel:r.mapel||"",no:r.no,src:r.src}}
function impCheck(it){var n=normSoal(it.s),e="";if(!n.q)e="Pertanyaan masih kosong.";
 else{try{validSoal(clone(n),"x")}catch(er){e=String(er.message).replace(/^x:\s*/,"");e=e.charAt(0).toUpperCase()+e.slice(1)}}
 if(/tandai jawaban yang benar/i.test(e))e="Kunci jawaban belum ditemukan. Pilih jawaban yang benar.";
 if(/tandai pernyataan/i.test(e))e="Kunci belum ditemukan. Tandai pernyataan ini Benar atau Salah.";
 if(/isi jawaban benar/i.test(e))e="Kunci jawaban belum ada. Isi jawaban yang benar.";
 it.err=e;return!e}
/* --- alur: file / teks → daftar soal --- */
function impRawText(lines){return lines.map(function(x){var t=impClean(x.t);if(!t)return"";var f=x.f;if(f&&(f.b>=0.6||f.u>=0.6||f.h>=0.6)&&IMP_RX.opt.test(t))t+="   [ditandai: "+(f.h>=0.6?"stabilo":f.u>=0.6?"garis bawah":"tebal")+"]";return t}).filter(Boolean).join("\n")}
function impFromParsed(raws,rawText,fname){IMP.items=raws.map(impBuild);IMP.items.forEach(impCheck);IMP.raw=rawText;IMP.fname=fname;IMP.flt="all";
 var base=impClean(String(fname||"").replace(/\.[a-z0-9]+$/i,"").replace(/[_-]+/g," ")).slice(0,40)||"Soal Impor",keys=[];
 IMP.items.forEach(function(it){var k=it.mapel||"";if(keys.indexOf(k)<0)keys.push(k)});
 IMP.groups=keys.map(function(k){var nm=k||base,ex=-1;draft.mapel.forEach(function(m,i){if(ex<0&&impNorm(m.nama)===impNorm(nm))ex=i});return{key:k,target:ex,name:nm}});
 IMP.view=IMP.items.length?"rev":"pick";
 IMP.msg=IMP.items.length?"":"Belum ada soal yang terbaca dari "+(fname?"file ini":"teks ini")+". Pastikan setiap soal diberi nomor (1. 2. 3.) dan pilihan diberi huruf (A. B. C. D.), atau gunakan tombol 🤖 Rapikan dengan AI.";
 if(!IMP.items.length&&rawText)IMP.view="pick";impRender()}
function impFile(f){if(!f)return;var nm=f.name||"file",ext=(nm.match(/\.([a-z0-9]+)$/i)||[])[1];ext=ext?ext.toLowerCase():"";
 if(ext==="doc"||ext==="xls"){IMP.msg="File ."+ext+" adalah format lama. Buka file di Word/Excel, pilih Simpan Sebagai (Save As), lalu pilih format ."+ext+"x. Setelah itu impor file barunya.";IMP.raw="";impRender();return}
 if(f.size>15*1024*1024){IMP.msg="File terlalu besar (maksimal 15 MB). Hapus gambar di dalam dokumen atau bagi menjadi beberapa file.";impRender();return}
 IMP.msg="⏳ Membaca "+nm+"...";impRender();
 var rd=new FileReader();rd.onerror=function(){IMP.msg="File tidak bisa dibaca.";impRender()};
 if(ext==="csv"||ext==="txt"){rd.onload=function(){var tx=String(rd.result||"");if(ext==="csv"){var rows=impCsv(tx),mp=impHdrFind(rows);if(mp){impFromParsed(impRowsToRaw(rows,mp,""),rows.map(function(r){return r.join(" | ")}).join("\n"),nm);return}impFromParsed(impParseLines(rows.map(function(r){return{t:r.join(" ")}})),tx,nm);return}
  var ls=tx.split(/\r?\n/).map(function(t){return{t:t}});impFromParsed(impParseLines(ls),tx,nm)};rd.readAsText(f);return}
 rd.onload=function(){var fs;try{fs=impZip(rd.result)}catch(e){IMP.msg=e.message;impRender();return}
  var isX=ext==="xlsx"||ext==="xlsm"||(!ext&&fs["xl/workbook.xml"]),isD=ext==="docx"||(!ext&&fs["word/document.xml"]);
  if(fs["xl/workbook.xml"]&&!fs["word/document.xml"])isX=true,isD=false;if(fs["word/document.xml"])isD=true,isX=false;
  if(!isX&&!isD){IMP.msg="Format file belum didukung. Gunakan .docx (Word), .xlsx (Excel), .csv, atau .txt.";impRender();return}
  (isX?impXlsx(fs).then(function(sh){var raws=[],txtL=[],raw=[],hs=sh.filter(function(s){return impHdrFind(s.rows)});
    sh.forEach(function(s){var mp=impHdrFind(s.rows);raw.push(s.rows.map(function(r){return r.join(" | ")}).join("\n"));
     if(mp){raws=raws.concat(impRowsToRaw(s.rows,mp,hs.length>1&&mp.mapel==null?s.name:""))}else if(!hs.length)s.rows.forEach(function(r){txtL.push({t:r.filter(function(c){return impClean(c)}).join(" ")})})});
    if(txtL.length)raws=raws.concat(impParseLines(txtL));raws.forEach(function(r,i){r.no=r.no||i+1});impFromParsed(raws,raw.join("\n\n"),nm)})
   :impDocx(fs).then(function(d){var raws=[];d.tables.forEach(function(t){var mp=impHdrFind(t.rows);raws=raws.concat(impRowsToRaw(t.rows,mp,""))});raws=raws.concat(impParseLines(d.lines));
    var rawT=impRawText(d.lines)+(d.tables.length?"\n\n"+d.tables.map(function(t){return t.rows.map(function(r){return r.join(" | ")}).join("\n")}).join("\n\n"):"");impFromParsed(raws,rawT,nm)})
  ).catch(function(e){IMP.msg="❌ "+(e&&e.message||"File tidak bisa dibaca.");impRender()})};
 rd.readAsArrayBuffer(f)}
/* --- unduh template Excel & contoh Word (zip dibuat sendiri) --- */
function impCrc(u){var t=impCrc.t;if(!t){t=impCrc.t=new Uint32Array(256);for(var n=0;n<256;n++){var c=n;for(var k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}}var c=-1;for(var i=0;i<u.length;i++)c=t[(c^u[i])&255]^(c>>>8);return(c^-1)>>>0}
function impZipMake(files,mime){var en=new TextEncoder(),parts=[],cen=[],off=0;
 files.forEach(function(f){var nm=en.encode(f[0]),d=en.encode(f[1]),crc=impCrc(d),h=new DataView(new ArrayBuffer(30)),c=new DataView(new ArrayBuffer(46));
  h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(6,0x0800,true);h.setUint16(12,0x21,true);h.setUint32(14,crc,true);h.setUint32(18,d.length,true);h.setUint32(22,d.length,true);h.setUint16(26,nm.length,true);
  c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x0800,true);c.setUint16(14,0x21,true);c.setUint32(16,crc,true);c.setUint32(20,d.length,true);c.setUint32(24,d.length,true);c.setUint16(28,nm.length,true);c.setUint32(42,off,true);
  parts.push(new Uint8Array(h.buffer),nm,d);cen.push(new Uint8Array(c.buffer),nm);off+=30+nm.length+d.length});
 var cs=0;cen.forEach(function(b){cs+=b.length});var e=new DataView(new ArrayBuffer(22));e.setUint32(0,0x06054b50,true);e.setUint16(8,files.length,true);e.setUint16(10,files.length,true);e.setUint32(12,cs,true);e.setUint32(16,off,true);
 return new Blob(parts.concat(cen,[new Uint8Array(e.buffer)]),{type:mime})}
function impX(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
function impDl(blob,name){var u=document.createElement("a");u.href=URL.createObjectURL(blob);u.download=name;document.body.appendChild(u);u.click();setTimeout(function(){URL.revokeObjectURL(u.href);u.remove()},800)}
function impSheetXml(rows,widths,hdr){var col=function(i){var s="";i++;while(i>0){var m=(i-1)%26;s=String.fromCharCode(65+m)+s;i=Math.floor((i-1)/26)}return s};
 return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetPr><pageSetUpPr fitToPage="1"/></sheetPr><sheetViews><sheetView workbookViewId="0"'+(hdr?' tabSelected="1"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView>':'/>')+'</sheetViews><cols>'+widths.map(function(w,i){return'<col min="'+(i+1)+'" max="'+(i+1)+'" width="'+w+'" customWidth="1"'+(hdr?' style="2"':'')+'/>'}).join("")+'</cols><sheetData>'+
 rows.map(function(r,ri){return'<row r="'+(ri+1)+'">'+r.map(function(v,ci){if(v===""||v==null)return"";return'<c r="'+col(ci)+(ri+1)+'" t="inlineStr" s="'+(hdr&&ri===0?1:2)+'"><is><t xml:space="preserve">'+impX(v)+'</t></is></c>'}).join("")+'</row>'}).join("")+'</sheetData></worksheet>'}
function impTplXlsx(){var H=["Mapel","Tipe","Soal","A","B","C","D","E","F","Kunci","Pembahasan"],R=[H,
 ["Matematika","PG","Hasil dari 3/4 + 1/4 adalah ...","1/2","1","2","3/4","","","B","3/4 + 1/4 = 4/4 = 1"],
 ["Matematika","PG","Bilangan prima terbesar yang kurang dari 10 adalah ...","5","9","7","3","","","C","9 bukan bilangan prima karena habis dibagi 3."],
 ["IPA","PG","Hewan pemakan tumbuhan disebut ...","Karnivora","Herbivora","Omnivora","Insektivora","","","B",""],
 ["IPA","BS","Matahari terbit dari arah barat.","","","","","","","Salah","Matahari terbit dari arah timur."],
 ["IPS","Isian","Ibu kota Provinsi Nusa Tenggara Timur adalah ...","","","","","","","Kupang",""],
 ["IPS","Jodoh","Pasangkan rumah adat dengan daerah asalnya!","Mbaru Niang = NTT","Tongkonan = Sulawesi Selatan","Honai = Papua","Rumah Gadang = Sumatra Barat","","","",""],
 ["Bahasa Indonesia","Urut","Urutkan langkah menulis surat pribadi!","Menulis tempat dan tanggal","Menulis salam pembuka","Menulis isi surat","Menulis salam penutup","","","",""]],
 P=[["Petunjuk mengisi template impor soal ZuperVerse"],[""],
 ["1. Satu baris = satu soal. Baris pertama (judul kolom) jangan dihapus."],
 ["2. Kolom Mapel: nama mapel/topik. Soal dengan mapel sama masuk ke gedung yang sama."],
 ["3. Kolom Tipe: PG (pilihan ganda), BS (benar/salah), Isian, Jodoh (menjodohkan), Urut (mengurutkan). Boleh dikosongkan, tipe ditebak otomatis."],
 ["4. PG: isi pilihan di kolom A sampai D (maksimal 4 pilihan), lalu tulis huruf jawaban benar di kolom Kunci, misalnya B."],
 ["5. BS: tulis pernyataan di kolom Soal, lalu Benar atau Salah di kolom Kunci."],
 ["6. Isian: tulis jawaban benar di kolom Kunci. Beberapa jawaban yang diterima dipisah tanda | , misalnya 36|tiga puluh enam."],
 ["7. Jodoh: tulis setiap pasangan di kolom A sampai F dengan format kiri = kanan (2 sampai 6 pasangan)."],
 ["8. Urut: tulis langkah di kolom A sampai F sesuai urutan yang BENAR. Di game, urutannya diacak."],
 ["9. Kolom Pembahasan boleh dikosongkan."],[""],
 ["Setelah selesai: simpan file (.xlsx), buka ZuperVerse → Mode Guru → Buat Soal → 📥 Impor soal, lalu pilih file ini."]];
 var styles='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF2E7DF6"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/><xf numFmtId="49" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>';
 impDl(impZipMake([
  ["[Content_Types].xml",'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>'],
  ["_rels/.rels",'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'],
  ["xl/workbook.xml",'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Soal" sheetId="1" r:id="rId1"/><sheet name="Petunjuk" sheetId="2" r:id="rId2"/></sheets></workbook>'],
  ["xl/_rels/workbook.xml.rels",'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'],
  ["xl/styles.xml",styles],
  ["xl/worksheets/sheet1.xml",impSheetXml(R,[16,8,46,20,20,20,20,14,14,10,34],true)],
  ["xl/worksheets/sheet2.xml",impSheetXml(P,[120],false)]],"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"),"template-impor-soal-zuperverse.xlsx")}
function impTplDocx(){var P=[["CONTOH FORMAT SOAL UNTUK IMPOR ZUPERVERSE",1],["Catatan: setiap soal diberi nomor, pilihan diberi huruf A sampai D. Kunci boleh ditulis di bawah soal, ditebalkan pada pilihan yang benar, atau ditulis di bagian Kunci Jawaban paling bawah. Hapus catatan ini dan ganti dengan soal Anda.",0],["",0],
 ["Mapel: Matematika",1],["1. Hasil dari 3/4 + 1/4 adalah ...",0],["A. 1/2",0],["B. 1",0],["C. 2",0],["D. 3/4",0],["Kunci: B",0],["Pembahasan: 3/4 + 1/4 = 4/4 = 1",0],["",0],
 ["2. Bilangan prima terbesar yang kurang dari 10 adalah ...",0],["A. 5",0],["B. 9",0],["C. 7",2],["D. 3",0],["",0],
 ["Mapel: IPA",1],["3. Matahari terbit dari arah barat. (B/S)",0],["Kunci: Salah",0],["",0],
 ["4. Hewan pemakan tumbuhan disebut ...",0],["A. Karnivora   B. Herbivora   C. Omnivora   D. Insektivora",0],["",0],
 ["Mapel: IPS",1],["5. Ibu kota Provinsi Nusa Tenggara Timur adalah ...",0],["Kunci: Kupang",0],["",0],
 ["6. Pasangkan rumah adat dengan daerah asalnya!",0],["Mbaru Niang = NTT",0],["Tongkonan = Sulawesi Selatan",0],["Honai = Papua",0],["",0],
 ["7. Urutkan langkah menulis surat pribadi!",0],["A. Menulis isi surat",0],["B. Menulis tempat dan tanggal",0],["C. Menulis salam penutup",0],["D. Menulis salam pembuka",0],["Kunci: B, D, A, C",0],["",0],
 ["Kunci Jawaban",1],["4. B",0]];
 var body=P.map(function(p){return'<w:p>'+(p[0]?'<w:r>'+(p[1]?'<w:rPr><w:b/></w:rPr>':'')+'<w:t xml:space="preserve">'+impX(p[0])+'</w:t></w:r>':'')+'</w:p>'}).join("");
 impDl(impZipMake([
  ["[Content_Types].xml",'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>'],
  ["_rels/.rels",'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'],
  ["word/document.xml",'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'+body+'<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr></w:body></w:document>']],"application/vnd.openxmlformats-officedocument.wordprocessingml.document"),"contoh-format-soal-zuperverse.docx")}
/* --- tampilan --- */
function impOpen(){IMP.view="pick";IMP.msg="";IMP.items=[];IMP.groups=[];IMP.raw="";IMP.fname="";impRender();$("ovImp").classList.add("show")}
function impClose(){$("ovImp").classList.remove("show")}
function impStat(){var ok=0,bad=0,wr=0,use=0;IMP.items.forEach(function(it){if(it.err)bad++;else{if(it.warn.length)wr++;else ok++;if(it.use)use++}});return{ok:ok,bad:bad,wr:wr,use:use}}
function impBadge(it){return it.err?'<span class="badge b-no">✖ perlu diperbaiki</span>':it.warn.length?'<span class="badge b-mid">⚠ periksa</span>':'<span class="badge b-ok">✔ siap</span>'}
function impItemHTML(it,i){var s=it.s,tp=s.tipe||"pg",h='<div class="impi'+(it.err?" bad":"")+(it.use?"":" off")+'" data-ii="'+i+'" style="'+(IMP.flt==="bad"&&!it.err&&!it.warn.length?"display:none":"")+'">';
 h+='<div class="impih"><label class="impuse"><input type="checkbox" data-f="use"'+(it.use?" checked":"")+'> <b>Soal '+(it.no||i+1)+'</b></label><select class="tsel" data-f="tipe">'+Object.keys(TIPE).map(function(k){return'<option value="'+k+'"'+(tp===k?" selected":"")+'>'+TIPE[k]+'</option>'}).join("")+'</select><span class="impst">'+impBadge(it)+'</span></div>';
 h+='<div class="impmsg">'+(it.err?'<div class="ie">✖ '+esc(it.err)+'</div>':'')+it.warn.map(function(w){return'<div class="iw">⚠ '+esc(w)+'</div>'}).join("")+'</div>';
 h+='<textarea class="gin" data-f="q" rows="'+Math.min(6,Math.max(2,Math.ceil(String(s.q).length/70)+String(s.q).split("\n").length-1))+'">'+esc(s.q)+'</textarea>';
 if(tp==="pg")h+='<div class="impo">'+[0,1,2,3].map(function(k){return'<label class="oin'+(s.jawab===k?" ok":"")+'"><input type="radio" name="ij'+i+'" data-f="j" value="'+k+'"'+(s.jawab===k?" checked":"")+'><b>'+String.fromCharCode(65+k)+'</b><input type="text" data-f="o" data-oi="'+k+'" value="'+esc(s.opsi[k])+'" placeholder="Pilihan '+String.fromCharCode(65+k)+(k>1?" (boleh kosong)":"")+'"></label>'}).join("")+'</div>';
 else if(tp==="bs")h+='<div class="impo">'+["Benar","Salah"].map(function(t,k){return'<label class="oin'+(s.jawab===k?" ok":"")+'"><input type="radio" name="ij'+i+'" data-f="j" value="'+k+'"'+(s.jawab===k?" checked":"")+'><b>'+(k?"✗":"✓")+'</b><span style="padding:6px 4px;font-weight:800">'+t.toUpperCase()+'</span></label>'}).join("")+'</div>';
 else if(tp==="isian")h+='<label class="fld" style="margin-top:6px">Jawaban benar (beberapa jawaban dipisah | )<input data-f="kunci" value="'+esc(s.kunci)+'" placeholder="Contoh: Kupang"></label>';
 else if(tp==="jodoh")h+='<label class="fld" style="margin-top:6px">Pasangan, satu per baris: kiri = kanan (2 sampai 6)<textarea class="gin" data-f="pairs" rows="3">'+esc(s.pasangan.filter(function(p){return p[0]||p[1]}).map(function(p){return p[0]+" = "+p[1]}).join("\n"))+'</textarea></label>';
 else h+='<label class="fld" style="margin-top:6px">Urutan yang BENAR, satu per baris (2 sampai 8)<textarea class="gin" data-f="urut" rows="3">'+esc(s.urutan.filter(Boolean).join("\n"))+'</textarea></label>';
 h+='<input class="gin impb" data-f="bahas" value="'+esc(s.bahas)+'" placeholder="Pembahasan (opsional)">';
 return h+'</div>'}
function impFoot(){var st=impStat(),n=0;IMP.items.forEach(function(it){if(it.use&&!it.err)n++});var b=$("impAdd");if(b){b.textContent="✔ Tambahkan "+n+" soal ke paket";b.disabled=!n}
 var s=$("impSum");if(s)s.innerHTML='<b>'+IMP.items.length+'</b> soal terbaca • <span style="color:#86efac">'+st.ok+' siap</span>'+(st.wr?' • <span style="color:#fde68a">'+st.wr+' perlu dicek</span>':'')+(st.bad?' • <span style="color:#fca5a5">'+st.bad+' perlu diperbaiki</span>':'');
 var nb=$("impNote");if(nb)nb.textContent=st.bad?st.bad+" soal bertanda merah belum ikut dimasukkan. Perbaiki di bawah atau biarkan saja.":""}
function impRender(){var el=$("impBody");if(!el)return;var h="";
 if(IMP.view==="pick"){
  h+='<div class="mut">Pindahkan soal yang sudah Anda punya ke ZuperVerse tanpa mengetik ulang. Soal dibaca langsung di perangkat ini.</div>';
  if(IMP.msg)h+='<div class="note">'+esc(IMP.msg)+'</div>';
  h+='<div class="acard"><h4><span class="anum">1</span>Pilih file soal</h4><div class="row" style="margin-top:4px"><button class="btn yel" data-ia="file">📄 Pilih file Word / Excel</button><input type="file" id="impFile" accept=".docx,.xlsx,.xlsm,.csv,.txt,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv,text/plain" style="display:none"></div>';
  h+='<div class="mut" style="font-size:12px;margin-top:6px">Format: .docx (Word), .xlsx (Excel), .csv, .txt. File .doc/.xls lama: buka di Word/Excel lalu Simpan Sebagai .docx/.xlsx dulu.</div>';
  h+='<div class="row" style="margin-top:6px"><button class="btn sm gray" data-ia="tplx">⬇ Unduh template Excel</button><button class="btn sm gray" data-ia="tpld">⬇ Unduh contoh format Word</button></div></div>';
  h+='<div class="acard"><h4><span class="anum">2</span>Atau tempel teks soal</h4><div class="mut" style="font-size:13px">Salin soal dari mana saja (Word, PDF, WhatsApp, atau Google Form), lalu tempel di sini. <b>Dari Google Form:</b> buka formnya, tekan Ctrl+A lalu Ctrl+C, kemudian tempel.</div><textarea class="gta" id="impTxt" spellcheck="false" style="min-height:150px;margin-top:6px;color:#e5e7ff;font-family:inherit;font-size:13px" placeholder="1. Ibu kota NTT adalah ...&#10;A. Ende&#10;B. Kupang&#10;C. Maumere&#10;D. Bajawa&#10;Kunci: B">'+esc(IMP.pasted||"")+'</textarea><div class="row"><button class="btn green" data-ia="txt">🔎 Baca teks</button></div></div>';
  h+='<details class="acard"><summary style="cursor:pointer;font-weight:900">📖 Cara menulis soal agar terbaca</summary><div class="mut" style="font-size:13px;line-height:1.6;margin-top:6px">• Setiap soal diawali nomor: <b>1.</b> atau <b>1)</b>. Penomoran otomatis Word juga terbaca.<br>• Pilihan diawali huruf: <b>A.</b> <b>a)</b> <b>(a)</b>, satu per baris atau berderet dalam satu baris.<br>• Kunci: tulis <b>Kunci: B</b> di bawah soal, <b>tebalkan / garis bawahi / stabilo</b> pilihan yang benar, atau buat bagian <b>Kunci Jawaban</b> di akhir (1. B 2. C ...).<br>• Benar/Salah: tambahkan <b>(B/S)</b> di akhir pernyataan dan <b>Kunci: Benar</b> atau <b>Kunci: Salah</b>.<br>• Isian: soal tanpa pilihan dengan <b>Kunci: jawabannya</b>.<br>• Menjodohkan: kata "pasangkan" di soal, lalu baris <b>kiri = kanan</b>.<br>• Mengurutkan: kata "urutkan" di soal, pilihan A–D, lalu <b>Kunci: B, D, A, C</b>.<br>• Beberapa mapel dalam satu file: tulis <b>Mapel: IPA</b> sebelum soal-soalnya.</div></details>';
  if(IMP.raw)h+='<div class="row"><button class="btn sm" data-ia="ai">🤖 Rapikan dengan AI</button></div>';
 }
 else if(IMP.view==="rev"){var st=impStat();
  h+='<div class="imptop"><div><div style="font-weight:900">📄 '+esc(IMP.fname||"Teks tempel")+'</div><div class="mut" id="impSum" style="font-size:13px"></div></div><div class="row" style="margin-top:0"><button class="btn sm gray" data-ia="back">⟵ Pilih file lain</button><button class="btn sm" data-ia="ai" title="Untuk dokumen yang berantakan atau banyak soal tidak terbaca">🤖 Rapikan dengan AI</button></div></div>';
  if(st.bad>IMP.items.length/2)h+='<div class="note">Banyak soal belum terbaca sempurna. Kalau format dokumen tidak beraturan, coba <b>🤖 Rapikan dengan AI</b>: perintah sudah berisi teks soal Anda, tinggal disalin ke ChatGPT/Gemini/Claude.</div>';
  h+='<div class="impg">'+IMP.groups.map(function(g,gi){var n=IMP.items.filter(function(it){return(it.mapel||"")===g.key}).length;return'<div class="impgr"><span>📚 '+(g.key?'<b>'+esc(g.key)+'</b> ':'')+'<span class="mut">('+n+' soal)</span> masuk ke</span><select class="gin" data-g="'+gi+'" data-gf="t">'+draft.mapel.map(function(m,mi){return'<option value="'+mi+'"'+(g.target===mi?" selected":"")+'>Gedung: '+esc(m.nama)+'</option>'}).join("")+'<option value="-1"'+(g.target<0?" selected":"")+'>＋ Mapel baru</option></select>'+(g.target<0?'<input class="gin" data-g="'+gi+'" data-gf="n" value="'+esc(g.name)+'" placeholder="Nama mapel baru" maxlength="40">':'')+'</div>'}).join("")+'</div>';
  h+='<div class="row"><button class="btn sm '+(IMP.flt==="all"?"yel":"gray")+'" data-ia="fall">Semua soal</button><button class="btn sm '+(IMP.flt==="bad"?"yel":"gray")+'" data-ia="fbad">Perlu dicek / diperbaiki</button></div>';
  h+='<div id="impList">'+IMP.items.map(impItemHTML).join("")+'</div>';
  h+='<div class="impfoot"><div class="mut" id="impNote" style="font-size:12px;flex:1"></div><button class="btn green" id="impAdd" data-ia="add">✔ Tambahkan</button></div>';
 }
 else if(IMP.view==="ai"){var big=IMP.raw.length>18000;
  h+='<div class="mut">Untuk dokumen yang formatnya tidak beraturan. AI akan merapikan soal Anda menjadi format ZuperVerse.</div>';
  if(big)h+='<div class="note">Teks soal cukup panjang ('+Math.round(IMP.raw.length/1000)+' ribu huruf). Kalau jawaban AI terpotong, bagi dokumen menjadi beberapa bagian lalu impor satu per satu.</div>';
  h+='<div class="acard"><h4><span class="anum">1</span>Salin perintah, lalu tempel ke AI</h4><div class="row"><button class="btn yel" data-ia="cpai">📋 Salin perintah</button><a class="btn sm gray" href="https://chatgpt.com" target="_blank" rel="noopener">ChatGPT ↗</a><a class="btn sm gray" href="https://gemini.google.com" target="_blank" rel="noopener">Gemini ↗</a><a class="btn sm gray" href="https://claude.ai" target="_blank" rel="noopener">Claude ↗</a></div><details style="margin-top:6px"><summary class="mut" style="cursor:pointer">Lihat isi perintah</summary><textarea class="gta" id="impAiOut" readonly style="min-height:140px;margin-top:6px">'+esc(impAiPrompt())+'</textarea></details></div>';
  h+='<div class="acard"><h4><span class="anum">2</span>Tempel jawaban AI di sini</h4><textarea class="gta" id="impAiIn" spellcheck="false" placeholder="Tempel seluruh jawaban AI di sini..." style="min-height:130px;margin-top:6px"></textarea><div class="row"><button class="btn green" data-ia="aiin">✔ Periksa hasil AI</button><button class="btn sm gray" data-ia="back">⟵ Kembali</button></div><div class="mut" style="font-size:12px">Hasil AI ditampilkan dulu di layar pratinjau sebelum dimasukkan, jadi Anda bisa memeriksa kuncinya.</div></div>';
 }
 el.innerHTML=h;if(IMP.view==="rev")impFoot()}
function impAiPrompt(){return"Ubah kumpulan soal berikut menjadi JSON untuk aplikasi kuis. Jangan mengubah isi soal, pilihan, atau kunci jawaban. Kalau kunci jawaban tidak ada, tentukan jawaban yang benar. Pilihan ganda maksimal 4 pilihan (kalau ada pilihan E, buang satu pilihan yang salah). Pilihan yang diberi tanda [ditandai: tebal/garis bawah/stabilo] biasanya adalah kunci jawaban. Lewati soal uraian panjang yang tidak bisa dijawab singkat. Kalau soal memakai bacaan bersama, tulis bacaan singkatnya di awal pertanyaan.\n\nKeluarkan HANYA JSON valid tanpa teks lain, dengan format:\n{\n  \"mapel\": [\n    {\n      \"nama\": \"nama mapel\",\n      \"soal\": [\n        {\"q\": \"teks pertanyaan\", \"opsi\": [\"pilihan A\", \"pilihan B\", \"pilihan C\", \"pilihan D\"], \"jawab\": 0, \"bahas\": \"\"},\n        {\"tipe\": \"bs\", \"q\": \"pernyataan\", \"jawab\": 0},\n        {\"tipe\": \"isian\", \"q\": \"pertanyaan\", \"kunci\": \"jawaban|variasi jawaban\"},\n        {\"tipe\": \"jodoh\", \"q\": \"Pasangkan!\", \"pasangan\": [[\"kiri 1\", \"kanan 1\"], [\"kiri 2\", \"kanan 2\"]]},\n        {\"tipe\": \"urut\", \"q\": \"Urutkan!\", \"urutan\": [\"langkah 1\", \"langkah 2\", \"langkah 3\"]}\n      ]\n    }\n  ]\n}\nKeterangan: \"jawab\" pada pilihan ganda adalah nomor pilihan benar mulai dari 0 (0 = A, 1 = B, 2 = C, 3 = D). Pada benar/salah, 0 = BENAR dan 1 = SALAH. Kalau soal berasal dari beberapa mapel, buat beberapa objek mapel.\n\nSOAL:\n"+String(IMP.raw||"").slice(0,60000)}
function impAiIn(tx){var t=String(tx||""),i=t.indexOf("{"),j=t.lastIndexOf("}");if(i<0||j<=i){gmsgImp("Jawaban AI belum lengkap. Pastikan seluruh jawaban tersalin.");return}
 var pk;try{pk=JSON.parse(t.slice(i,j+1))}catch(e){gmsgImp("Jawaban AI belum lengkap atau terpotong. Minta AI membuat ulang dengan soal lebih sedikit.");return}
 if(Array.isArray(pk))pk={mapel:pk};if(pk.nama&&pk.soal)pk={mapel:[pk]};if(!pk.mapel||!pk.mapel.length){gmsgImp("Tidak ada soal di jawaban AI.");return}
 var raws=[];pk.mapel.forEach(function(m){(m.soal||[]).forEach(function(s){raws.push(s?{s:s,mapel:String(m.nama||"").slice(0,40)}:null)})});
 var raw=IMP.raw,fn=IMP.fname;IMP.items=raws.filter(Boolean).map(function(r,k){var s=clone(r.s),tp=TIPE[s.tipe]?s.tipe:"pg";s.tipe=tp;s.q=String(s.q||"");if(tp==="isian"&&Array.isArray(s.kunci))s.kunci=s.kunci.join("|");if(tp==="jodoh"&&Array.isArray(s.pasangan))s.pasangan=s.pasangan.map(function(x){return Array.isArray(x)?x:[x&&(x.kiri||x.a)||"",x&&(x.kanan||x.b)||""]});
  if(tp==="pg"){s.opsi=(s.opsi||[]).map(String);if(typeof s.jawab!=="number")s.jawab=-1}if(tp==="bs"&&s.jawab!==0&&s.jawab!==1)s.jawab=/^b/i.test(String(s.jawab))||s.jawab===true?0:/^s/i.test(String(s.jawab))||s.jawab===false?1:-1;
  var w=[];if(tp==="pg"&&s.opsi.length>4){w.push("AI membuat lebih dari 4 pilihan. Pilihan setelah D dibuang.");if(s.jawab>3)s.jawab=-1}
  var it={s:padSoal(s),warn:w,err:"",use:true,mapel:r.mapel,no:k+1,src:"ai"};impCheck(it);return it});
 IMP.raw=raw;IMP.fname=(fn||"Teks tempel")+" (dirapikan AI)";var keys=[];IMP.items.forEach(function(it){if(keys.indexOf(it.mapel)<0)keys.push(it.mapel)});
 IMP.groups=keys.map(function(k){var nm=k||"Soal Impor",ex=-1;draft.mapel.forEach(function(m,i){if(ex<0&&impNorm(m.nama)===impNorm(nm))ex=i});return{key:k,target:ex,name:nm}});IMP.view="rev";IMP.flt="all";impRender()}
function gmsgImp(t){var a=$("impAiIn");if(a){a.style.borderColor="#ef4444"}zDlg({ic:"⚠️",t:"Belum bisa dibaca",m:t,ok:"OK",alert:true})}
function impAddAll(){var tot=0,first=-1,need=IMP.groups.filter(function(g){return g.target<0&&IMP.items.some(function(it){return it.use&&!it.err&&(it.mapel||"")===g.key})}).length;
 if(draft.mapel.length+need>MAX_MAPEL){zDlg({ic:"🏢",t:"Gedung penuh",m:"Satu paket maksimal "+MAX_MAPEL+" mapel (gedung). Gabungkan sebagian soal ke gedung yang sudah ada.",ok:"OK",alert:true});return}
 IMP.groups.forEach(function(g){var its=IMP.items.filter(function(it){return it.use&&!it.err&&(it.mapel||"")===g.key});if(!its.length)return;var mi=g.target;
  if(mi<0){draft.mapel.push({nama:impClean(g.name).slice(0,40)||"Soal Impor",warna:COLORS[draft.mapel.length%COLORS.length],waktu:30,jumlah:Math.min(10,its.length),materi:[],soal:[]});mi=draft.mapel.length-1}
  var m=draft.mapel[mi];m.soal=m.soal.filter(function(s){return String(s.q||"").trim()});its.forEach(function(it){m.soal.push(padSoal(clone(normSoal(it.s))))});tot+=its.length;if(first<0)first=mi});
 if(!tot)return;dirty=true;impClose();gTab="editor";gSel=first<0?0:first;var ok=applyDraft();if(ok)gSel=Math.min(gSel,draft.mapel.length-1);renderGuru();
 if(ok)gmsg("✔ "+tot+" soal berhasil diimpor dan tersimpan. Periksa sekilas sebelum dipakai di kelas.","#7dffa0")}
function impItem(el){var c=el.closest("[data-ii]");return c?IMP.items[+c.dataset.ii]:null}
function impRefresh(card,it){impCheck(it);var st=card.querySelector(".impst");if(st)st.innerHTML=impBadge(it);var ms=card.querySelector(".impmsg");if(ms)ms.innerHTML=(it.err?'<div class="ie">✖ '+esc(it.err)+'</div>':'')+it.warn.map(function(w){return'<div class="iw">⚠ '+esc(w)+'</div>'}).join("");card.classList.toggle("bad",!!it.err);card.classList.toggle("off",!it.use);impFoot()}
(function(){var ov=$("ovImp");if(!ov)return;$("impClose").onclick=impClose;
 ov.addEventListener("click",function(e){var b=e.target.closest("[data-ia]");if(!b)return;var a=b.dataset.ia;
  if(a==="file")$("impFile").click();
  else if(a==="tplx")impTplXlsx();else if(a==="tpld")impTplDocx();
  else if(a==="txt"){var t=$("impTxt").value;IMP.pasted=t;if(!t.trim()){IMP.msg="Tempel dulu teks soal di kotak.";impRender();return}impFromParsed(impParseLines(t.split(/\r?\n/).map(function(x){return{t:x}})),t,"")}
  else if(a==="back"){IMP.view="pick";IMP.msg="";impRender()}
  else if(a==="ai"){if(!IMP.raw){var tt=$("impTxt");if(tt&&tt.value.trim())IMP.raw=tt.value}IMP.view="ai";impRender()}
  else if(a==="cpai"){var tx=impAiPrompt();var done=function(){b.textContent="✔ Tersalin! Tempel ke AI";setTimeout(function(){b.textContent="📋 Salin perintah"},2500)};if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(tx).then(done,function(){var o=$("impAiOut");o.parentNode.open=true;o.select();try{document.execCommand("copy");done()}catch(er){}});else{var o=$("impAiOut");o.parentNode.open=true;o.select();try{document.execCommand("copy");done()}catch(er){}}}
  else if(a==="aiin")impAiIn($("impAiIn").value);
  else if(a==="fall"||a==="fbad"){IMP.flt=a==="fbad"?"bad":"all";impRender()}
  else if(a==="add")impAddAll()});
 ov.addEventListener("change",function(e){var t=e.target;if(t.id==="impFile"){var f=t.files[0];t.value="";impFile(f);return}
  if(t.dataset.g!=null){var g=IMP.groups[+t.dataset.g];if(t.dataset.gf==="t"){g.target=+t.value;impRender()}return}
  var it=impItem(t);if(!it)return;var f2=t.dataset.f,card=t.closest("[data-ii]");
  if(f2==="use"){it.use=t.checked;impRefresh(card,it);return}
  if(f2==="tipe"){var s=it.s,old=s.tipe||"pg",nt=t.value;s.tipe=nt;
   if(nt==="bs"&&old!=="bs"){s.jawab=-1}if(nt==="pg"&&old!=="pg"){s.jawab=-1;if(old==="urut")s.opsi=s.urutan.filter(Boolean).slice(0,4).concat(["","","",""]).slice(0,4)}
   if(nt==="urut"&&old==="pg")s.urutan=s.opsi.filter(Boolean).concat(["","","","","",""]).slice(0,Math.max(6,s.opsi.length));if(nt==="isian"&&old==="pg"&&s.jawab>=0)s.kunci=s.opsi[s.jawab]||"";
   if(nt==="jodoh"&&old==="pg"){var pr=s.opsi.map(impPairSplit).filter(Boolean);if(pr.length)s.pasangan=pr}
   padSoal(s);it.warn=[];impCheck(it);card.outerHTML=impItemHTML(it,IMP.items.indexOf(it));impFoot();return}
  if(f2==="j"){it.s.jawab=+t.value;Array.prototype.forEach.call(card.querySelectorAll(".oin"),function(l,k){l.classList.toggle("ok",k===it.s.jawab)});impRefresh(card,it)}});
 ov.addEventListener("input",function(e){var t=e.target;if(t.dataset.g!=null&&t.dataset.gf==="n"){IMP.groups[+t.dataset.g].name=t.value;return}var it=impItem(t);if(!it)return;var f=t.dataset.f,s=it.s,card=t.closest("[data-ii]");
  if(f==="q")s.q=t.value;else if(f==="o")s.opsi[+t.dataset.oi]=t.value;else if(f==="kunci")s.kunci=t.value;else if(f==="bahas")s.bahas=t.value;
  else if(f==="pairs"){s.pasangan=t.value.split(/\n/).map(impPairSplit).filter(Boolean);padSoal(s)}
  else if(f==="urut"){s.urutan=t.value.split(/\n/).map(impClean).filter(Boolean);padSoal(s)}else return;
  if(f!=="bahas")it.warn=it.warn.filter(function(w){return!/kunci|urutan|pasangan|pilihan/i.test(w)});impRefresh(card,it)})})();

var gBody=$("gBody");
gBody.addEventListener("change",function(e){if(e.target.id==="gtK")G_TANK=+e.target.value;if(e.target.dataset&&e.target.dataset.pbahas){draft.pengaturan=draft.pengaturan||{};if(e.target.value)draft.pengaturan.bahasG=e.target.value;else delete draft.pengaturan.bahasG;draft.pengaturan=cleanPeta(draft.pengaturan);dirty=true;gmsg("Pengaturan pembahasan diubah. Tekan 💾 Simpan agar berlaku (dan pilih \"Ya, kirim\" untuk kelas).","var(--yel)")}});
/* ---------- 🖨️ CETAK / UNDUH SOAL: lembar murid & versi guru (kunci + pembahasan) ---------- */
function soalRows(guru){var pk;try{pk=normalize(draft)}catch(e){pk=draft}var sel=$("cetakM")?$("cetakM").value:"",ms=pk.mapel.filter(function(m,ix){return sel===""||+sel===ix}),rows=[],no=0,AB="ABCDEFGH";
 var rnd=function(arr,seed){var a=arr.slice(),x=seed||7;for(var i=a.length-1;i>0;i--){x=(x*9301+49297)%233280;var j=Math.floor(x/233280*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a};
 ms.forEach(function(m){if(ms.length>1||pk.mapel.length>1)rows.push({t:"Mapel: "+m.nama,k:"h"});m.soal.forEach(function(s){if(!s.q&&!s.gambar)return;no++;var tp=s.tipe||"pg";
  rows.push({t:no+". "+String(s.q||"")+(tp==="bs"?"  (Benar / Salah)":""),k:"q",img:s.gambar||""});
  if(tp==="pg"||!s.tipe)(s.opsi||[]).forEach(function(o,i){rows.push({t:AB[i]+". "+o,k:"o",b:guru&&i===s.jawab})});
  else if(tp==="isian")rows.push({t:"Jawab: ...................................................",k:"o"});
  else if(tp==="jodoh"){var R2=rnd((s.pasangan||[]).map(function(p){return p[1]}),no*31);(s.pasangan||[]).forEach(function(p,i){rows.push({t:(i+1)+". "+p[0]+"      ....      "+AB.toLowerCase()[i]+". "+(R2[i]||""),k:"o"})})}
  else if(tp==="urut"){var R3=rnd(s.urutan||[],no*17);rows.push({t:"Urutkan: "+R3.map(function(x,i){return AB[i]+". "+x}).join("   "),k:"o"})}
  if(guru){rows.push({t:"Kunci: "+(tp==="jodoh"?(s.pasangan||[]).map(function(p){return p[0]+" = "+p[1]}).join("; "):tp==="urut"?(s.urutan||[]).join(" → "):tp==="isian"?String(s.kunci||"").split("|").join(" / "):(s.opsi&&s.jawab>=0?AB[s.jawab]+". "+s.opsi[s.jawab]:"-")),k:"k"});if(s.bahas)rows.push({t:"Pembahasan: "+s.bahas,k:"p"})}
  rows.push({t:"",k:"s"})})});
 return{pk:pk,rows:rows,no:no,judul:pk.judul+(sel!==""&&ms[0]?" • "+ms[0].nama:"")}}
function soalCetak(v,word){var guru=v==="guru",D=soalRows(guru);if(!D.no){gmsg("Belum ada soal untuk dicetak.","#ff8a80");return}
 var head=guru?"KUNCI JAWABAN & PEMBAHASAN":"LEMBAR SOAL",fn=(D.judul.replace(/[^A-Za-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,40)||"soal").toLowerCase()+(guru?"-kunci-pembahasan":"-lembar-soal");
 if(word){var P=[{t:head,k:"T"},{t:D.judul+(D.pk.guru?" • "+D.pk.guru:""),k:"i"}];if(!guru)P.push({t:"Nama: ............................   Kelas: ..........   No. absen: ......",k:"n"});P.push({t:"",k:"s"});
  D.rows.forEach(function(r){P.push(r);if(r.img)P.push({t:"(gambar: "+r.img+")",k:"p"})});
  var run=function(t,o){return'<w:r><w:rPr>'+(o.b?'<w:b/>':'')+(o.i?'<w:i/>':'')+(o.c?'<w:color w:val="'+o.c+'"/>':'')+(o.sz?'<w:sz w:val="'+o.sz+'"/>':'')+'</w:rPr><w:t xml:space="preserve">'+impX(t)+'</w:t></w:r>'};
  var body=P.map(function(r){var o=r.k==="T"?{b:1,sz:32}:r.k==="h"?{b:1,sz:26,c:"1E3A8A"}:r.k==="q"?{b:1}:r.k==="k"?{b:1,c:"15803D"}:r.k==="p"?{i:1,c:"475569"}:r.k==="i"?{c:"475569"}:r.b?{b:1,c:"15803D"}:{};return'<w:p>'+(r.k==="o"?'<w:pPr><w:ind w:left="400"/></w:pPr>':r.k==="k"||r.k==="p"?'<w:pPr><w:ind w:left="400"/></w:pPr>':'')+(r.t?run(r.t+(r.b?"  ✓":""),o):'')+'</w:p>'}).join("");
  impDl(impZipMake([
   ["[Content_Types].xml",'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>'],
   ["_rels/.rels",'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'],
   ["word/document.xml",'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'+body+'<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr></w:body></w:document>']],"application/vnd.openxmlformats-officedocument.wordprocessingml.document"),fn+".docx");gmsg("✔ File Word diunduh.","#7dffa0");return}
 var h='<style>body{font-family:Arial,Helvetica,sans-serif;font-size:12pt;color:#111;margin:18mm}h1{font-size:16pt;margin:0 0 4px}.i{color:#475569;font-size:10pt;margin-bottom:10px}.id{border:1px solid #cbd5e1;padding:8px 10px;margin:8px 0 14px;font-size:11pt}.h{font-weight:bold;font-size:13pt;color:#1e3a8a;margin:14px 0 6px;border-bottom:2px solid #1e3a8a}.q{font-weight:bold;margin-top:8px;page-break-inside:avoid}.o{margin-left:22px}.o.b{color:#15803d;font-weight:bold}.k{margin-left:22px;color:#15803d;font-weight:bold}.p{margin-left:22px;color:#475569;font-style:italic}img{max-width:60%;max-height:55mm;display:block;margin:6px 0 4px 22px}@page{size:A4;margin:0}</style>';
 h+='<h1>'+head+'</h1><div class="i">'+esc(D.judul)+(D.pk.guru?' • '+esc(D.pk.guru):'')+' • '+D.no+' soal</div>'+(guru?'':'<div class="id">Nama: ....................................... &nbsp; Kelas: ............ &nbsp; No. absen: ......</div>');
 D.rows.forEach(function(r){if(r.k==="s")return;h+='<div class="'+r.k+(r.b?' b':'')+'">'+esc(r.t)+(r.b?' ✓':'')+'</div>'+(r.img?'<img src="'+esc(imgUrl(r.img))+'" alt="">':'')});
 printDoc(h)}
gBody.addEventListener("keydown",function(e){if(e.target.id==="bankQ"&&e.key==="Enter"){e.preventDefault();BANK.q=e.target.value.trim();bankLoad()}});
gBody.addEventListener("input",function(e){var t=e.target,d=t.dataset;if(t.id==="bankQ")return;if(t.id==="pkQ"){PKL.q=t.value;var qq=t.value.trim().toLowerCase();Array.prototype.forEach.call(gBody.querySelectorAll(".pkc"),function(c){c.style.display=!qq||c.dataset.jd.indexOf(qq)>=0?"":"none"});return}if(gTab==="ai"){updAi();return}if(gTab!=="editor")return;var m=draft.mapel[gSel];
 if(d.pset){draft.pengaturan=draft.pengaturan||{};draft.pengaturan[d.pset]=t.checked}
 else if(d.pk){draft[d.pk]=t.value}
 else if(d.tk){m.materi[+d.ti][d.tk]=t.value;if(d.tk==="jenis"){renderGuru();return}}
 else if(d.mk){m[d.mk]=t.type==="number"?+t.value:t.type==="checkbox"?t.checked:t.value;if(d.mk==="rahasia"&&!t.checked)delete m.rahasia;if(d.mk==="nama"||d.mk==="warna"||d.mk==="rahasia")$("gSide").innerHTML=sideHTML();if(d.mk==="rahasia"){var lb=t.closest(".rhs");if(lb)lb.classList.toggle("on",t.checked)}}
 else if(d.sk){m.soal[+d.si][d.sk]=t.value;if(d.sk==="gambar")imgLive(t,+d.si);if(d.sk==="tipe"){var so=m.soal[+d.si];if(t.value==="bs"&&so.jawab>1)so.jawab=0;dirty=true;renderGuru();gmsg("Jenis soal diganti. Lengkapi isiannya, lalu Simpan.","var(--yel)");return}}
 else if(d.jo!==undefined){m.soal[+d.si].pasangan[+d.jo][+d.js]=t.value}
 else if(d.ur!==undefined){m.soal[+d.si].urutan[+d.ur]=t.value}
 else if(d.oi!==undefined&&t.type==="text"){m.soal[+d.si].opsi[+d.oi]=t.value}
 dirty=true;gmsg("Ada perubahan yang belum disimpan.","var(--yel)")});
gBody.addEventListener("change",function(e){var t=e.target,d=t.dataset;if(gTab==="peta"){if(d.pset){draft.pengaturan=draft.pengaturan||{};draft.pengaturan[d.pset]=t.checked;draft.pengaturan=cleanPeta(draft.pengaturan);dirty=true;gmsg("Peta diubah. Tekan Simpan.","var(--yel)");return}petaInput(t);return}if(d.jk&&gTab==="editor"){var s=draft.mapel[gSel].soal[+d.si];s.jawab=+t.value;dirty=true;
 Array.prototype.forEach.call(t.closest(".ogrid").querySelectorAll(".oin"),function(l,i){l.classList.toggle("ok",i===s.jawab)})}});
gBody.addEventListener("click",function(e){var md=e.target.closest(".mdet>summary");if(md){G_MATOPEN=!md.parentNode.open;return}var gg=e.target.closest("[data-act],[data-gtgo]");if(gg&&gg.dataset.gtgo!=null&&gg.dataset.act==null){gTab=gg.dataset.gtgo;PKL.view=null;renderGuru();return}var b=e.target.closest("[data-act]");if(!b)return;var a=b.dataset.act,m=draft.mapel[gSel];if(a==="impopen"){impOpen();return}if(a==="imgadd"){IMG_OPEN[gSel+":"+b.dataset.si]=1;renderGuru();var ii=gBody.querySelector('[data-sk="gambar"][data-si="'+b.dataset.si+'"]');if(ii)ii.focus();return}if(a==="imgdel"){var so=m.soal[+b.dataset.si];so.gambar="";delete IMG_OPEN[gSel+":"+b.dataset.si];dirty=true;renderGuru();gmsg("Gambar dihapus. Tekan 💾 Simpan.","var(--yel)");return}if(a==="fsub"){fSub();return}if(dkAct(a,b))return;if(a==="fplay"){fPlay();return}if(isFree()&&(a==="hnilai"||a==="gtmode"||a==="gtlist"||a==="gtlive")){freeLock(a==="hnilai"?"nilai":"tan");return}if(homeAct(a,b))return;if(isFree()&&/^(k|pk|bank|lt|mkkelas)/.test(a)){freeLock(/^(pk|lt)/.test(a)?"paket":/^b/.test(a)?"bank":"kelas");return}if(kelasAct(a,b)||pkAct(a,b)||bankAct(a,b))return;
 if(a==="selm"){gSel=+b.dataset.mi;renderGuru()}
 else if(a==="addm"){draft.mapel.push({nama:"Mapel Baru "+(draft.mapel.length+1),warna:COLORS[draft.mapel.length%COLORS.length],waktu:30,jumlah:10,materi:[],soal:[newSoal()]});gSel=draft.mapel.length-1;dirty=true;renderGuru()}
 else if(a==="delm"){if(draft.mapel.length<=1){gmsg("Paket minimal punya 1 mapel.","#ff8a80");return}ask('Mapel "'+m.nama+'" beserta semua soalnya akan dihapus dari editor.',function(){draft.mapel.splice(gSel,1);gSel=Math.max(0,gSel-1);dirty=true;renderGuru()},{t:"Hapus mapel ini?",ok:"Hapus",danger:true})}
 else if(a==="addmat"){m.materi.push({judul:"",jenis:"video",url:"",isi:""});dirty=true;renderGuru()}
 else if(a==="delmat"){m.materi.splice(+b.dataset.ti,1);dirty=true;renderGuru()}
 else if(a==="adds"){m.soal.push(newSoal());dirty=true;renderGuru();var cards=gBody.querySelectorAll(".scard");if(cards.length)cards[cards.length-1].scrollIntoView({behavior:"smooth",block:"center"})}
 else if(a==="dels"){if(m.soal.length<=1){gmsg("Mapel minimal punya 1 soal.","#ff8a80");return}m.soal.splice(+b.dataset.si,1);dirty=true;renderGuru()}
 else if(a==="dups"){var si=+b.dataset.si;m.soal.splice(si+1,0,clone(m.soal[si]));dirty=true;renderGuru()}
 else if(a==="jfile"){$("gFile").click()}
 else if(a==="jdown"){var out=normalize(draft);var blob=new Blob([JSON.stringify(exportPack(),null,2)],{type:"application/json"}),u=document.createElement("a");u.href=URL.createObjectURL(blob);u.download=((out.judul||"paket").toLowerCase().replace(/[^a-z0-9]+/g,"-")||"paket")+".json";document.body.appendChild(u);u.click();u.remove();setTimeout(function(){URL.revokeObjectURL(u.href)},2000)}
 else if(a==="cpai"){copyText($("aiOut").value)}
 else if(a==="cetak"||a==="cetakw"){soalCetak(b.dataset.v,a==="cetakw")}
 else if(a==="aiadd"||a==="airep"){var tx=$("aiIn").value;if(!tx.trim()){gmsg("Tempel dulu jawaban AI di kotak langkah 3.","#ff8a80");return}if(applyPackText(tx,a==="aiadd")){$("aiIn").value="";gTab="editor";gSel=0;if(a==="aiadd"){gSel=draft.mapel.length-1;draft.mapel.forEach(function(m,ix){if(AI_LAST&&m.nama===AI_LAST)gSel=ix})}renderGuru();gmsg("✔ Soal dari AI sudah masuk dan tersimpan. Periksa kembali kunci jawabannya, ya.","#7dffa0")}}
 else if(a==="fadd"||a==="frep"){fileMode=a==="fadd";$("gFile").click()}
 else if(a==="gokelas"){gTab="kelas";renderGuru()}
 else if(a==="ltnew"||a==="ltupd"){var e0=null;try{validate(normalize(draft))}catch(er){e0=er}if(e0){gmsg("❌ "+e0.message,"#ff8a80");return}if(dirty)applyDraft();var kd0=a==="ltupd"?b.dataset.kd:null;
  gmsg(kd0?"Memperbarui link...":"Membuat link...");api("/paket/simpan",{lic:licBody(),paket:exportPack(),kode:kd0}).then(function(r){gmsg(kd0?"✔ Link "+r.kode+" sekarang berisi soal terbaru.":"✔ Link latihan dibuat! Kode: "+r.kode,"#7dffa0");ltLoad()},function(er){gmsg("❌ "+er.message,"#ff8a80")})}
 else if(a==="ltcopy"){copyText(ltLink(b.dataset.kd))}
 else if(a==="ltwa"){window.open("https://wa.me/?text="+encodeURIComponent("🎮 Ayo berlatih di ZuperVerse!\nPaket: "+(b.dataset.jd||"")+"\nKode latihan: *"+b.dataset.kd+"*\n\nBuka link ini:\n"+ltLink(b.dataset.kd)),"_blank")}
 else if(a==="ltdel"){ask("Link latihan "+b.dataset.kd+" akan dihapus. Murid tidak bisa membukanya lagi.",function(){api("/paket/hapus",{lic:licBody(),kode:b.dataset.kd}).then(ltLoad,function(er){gmsg("❌ "+er.message,"#ff8a80")})},{t:"Hapus link latihan?",ok:"Hapus",danger:true})}
 else if(a==="tour"){startTour()}
});
var fileMode=true;
function ltLink(kd){return location.origin+location.pathname+(API_URL&&API_URL!==API_DEFAULT?"?api="+encodeURIComponent(API_URL):"")+"#s="+kd}
function ltLoad(){var el=$("ltList");if(!el)return;if(!API_URL||!LIC){el.textContent="Server kelas belum terhubung.";return}
 api("/paket/daftar",{lic:licBody()}).then(function(r){var el2=$("ltList");if(!el2)return;var L=r.paket||[];
  el2.innerHTML=L.length?L.map(function(x){return'<div class="scard"><div class="sh"><span>'+esc(x.judul)+'</span><span style="font-family:var(--fh);font-size:22px;color:var(--yel);letter-spacing:2px">'+esc(x.kode)+'</span></div><div class="mut" style="font-size:12px">Diperbarui '+fmtT(x.diubah)+' • dibuka '+(x.dibuka||0)+' kali</div><div class="row" style="margin-top:4px"><button class="btn sm" data-act="ltcopy" data-kd="'+esc(x.kode)+'">📋 Salin link</button><button class="btn sm green" data-act="ltwa" data-kd="'+esc(x.kode)+'" data-jd="'+esc(x.judul)+'">📤 Kirim ke WA</button><button class="btn sm yel" data-act="ltupd" data-kd="'+esc(x.kode)+'">⬆ Perbarui dengan soal terbaru</button><button class="btn sm gray" data-act="ltdel" data-kd="'+esc(x.kode)+'">🗑</button></div></div>'}).join(""):"Belum ada link latihan."},function(e){var el2=$("ltList");if(el2)el2.textContent="❌ "+e.message})}
var AI_LAST="";
function applyPackText(tx,add){AI_LAST="";try{var t=String(tx),i=t.indexOf("{"),j=t.lastIndexOf("}");if(i<0)throw new Error("Teks yang ditempel bukan soal dari AI. Pastikan seluruh jawaban AI ikut tersalin.");if(j<=i)throw new Error("Jawaban AI belum lengkap atau terpotong. Minta AI membuat ulang dengan jumlah soal lebih sedikit, lalu salin seluruh jawabannya.");
  var pk;try{pk=JSON.parse(t.slice(i,j+1))}catch(e){throw new Error("Jawaban AI belum lengkap atau terpotong. Minta AI membuat ulang dengan jumlah soal lebih sedikit, lalu salin seluruh jawabannya.")}
  if(Array.isArray(pk))pk={mapel:pk};if(pk.nama&&pk.soal)pk={mapel:[pk]};
  if(add){var cur=normalize(draft),ml=cur.mapel.filter(function(m){return m.soal.length||(m.materi&&m.materi.length)}),nk=function(x){return String(x||"").trim().toLowerCase()};
   (pk.mapel||[]).forEach(function(nm){var ex=ml.filter(function(m){return nk(m.nama)===nk(nm.nama)})[0];if(ex&&Array.isArray(nm.soal)){ex.soal=ex.soal.concat(nm.soal);AI_LAST=ex.nama}else{ml.push(nm);AI_LAST=nm.nama}});
   pk={judul:cur.judul,guru:cur.guru,jenjang:cur.jenjang,pengaturan:cur.pengaturan,mapel:ml}}
  validate(pk);draft=padDraft(pk);if(!add)pkSetCur(null);dirty=true;applyDraft();return true}catch(err){gmsg("❌ "+err.message,"#ff8a80");return false}}
gBody.addEventListener("change",function(e){if(e.target.id!=="gFile")return;var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(){if(applyPackText(r.result,fileMode))gmsg("✔ File soal berhasil dibuka dan disimpan.","#7dffa0");renderGuru()};r.readAsText(f);e.target.value=""});
/* ---------- 📚 PAKET SAYA: riwayat paket soal guru ---------- */
var PKCUR=lsGet("zv_pk_cur",null),PKL={list:null,err:"",q:"",pick:null,view:null,busy:false},pkNoSync=false;
function pkSetCur(o){PKCUR=o&&o.kode?{kode:o.kode,judul:o.judul||""}:null;lsSet("zv_pk_cur",PKCUR)}
function pkInfoTxt(i){if(!i)return"";return(i.jenjang?esc(i.jenjang)+" • ":"")+i.mapel+" mapel • "+i.soal+" soal"}
function pkFind(kd){return(PKL.list||[]).filter(function(x){return x.kode===kd})[0]}
function pkLoad(){if(!LIC||!API_URL){PKL.err="Server belum terhubung.";pkRender();return}
 api("/paket/daftar",{lic:licBody()}).then(function(r){PKL.list=r.paket||[];PKL.err="";if(PKCUR&&!pkFind(PKCUR.kode))pkSetCur(null);else if(PKCUR){var c=pkFind(PKCUR.kode);if(c.judul!==PKCUR.judul)pkSetCur(c)}pkRender()},function(e){PKL.err=e.message;pkRender();if(e.status===403)licFail(e.message)})}
function pkRender(){if(gTab!=="paket"||!$("ovGuru").classList.contains("show"))return;var el=$("pkBody");if(!el){renderGuru();return}el.innerHTML=PKL.view?pkHasilHTML():pkListHTML()}
function paketTabHTML(){return'<div id="pkBody">'+(PKL.view?pkHasilHTML():pkListHTML())+'</div>'}
function pkCurCard(){var o=normalize(draft),n=0;o.mapel.forEach(function(m){n+=m.soal.length});
 var h='<div class="acard" style="margin-top:0;border-color:rgba(251,191,36,.55)"><h4>✏️ Soal di editor sekarang</h4><div style="font-weight:800;font-size:16px">'+esc(o.judul||"(tanpa judul)")+'</div><div class="mut" style="font-size:13px">'+(o.jenjang?esc(o.jenjang)+" • ":"")+o.mapel.length+' mapel • '+n+' soal</div>';
 h+=PKCUR?'<div class="mut" style="margin-top:6px">✅ Tersimpan di Paket Saya. Setiap kali Anda menekan <b>💾 Simpan</b>, paket ini ikut diperbarui.</div><div class="row"><button class="btn sm" data-act="pksavenew">💾 Simpan sebagai paket baru</button><button class="btn sm gray" data-act="pkblank">＋ Mulai paket kosong</button></div>'
  :'<div class="mut" style="margin-top:6px">⚠️ Soal ini belum tersimpan di Paket Saya.</div><div class="row"><button class="btn green" data-act="pksave">💾 Simpan ke Paket Saya</button><button class="btn sm gray" data-act="pkblank">＋ Mulai paket kosong</button></div>';
 return h+'</div>'}
function pkListHTML(){var h='<div class="mut" style="margin-bottom:8px">Semua paket soal yang pernah Anda simpan. Buka lagi untuk diedit, pakai di kelas, atau lihat hasil murid per paket. Tersimpan di akun Anda, jadi bisa dibuka dari perangkat lain.</div>'+pkCurCard();
 if(PKL.err)return h+'<div class="note">❌ '+esc(PKL.err)+'</div>';
 if(!PKL.list)return h+'<div class="mut">Memuat Paket Saya...</div>';
 var L=PKL.list,q=PKL.q.trim().toLowerCase();
 h+='<div class="row" style="justify-content:space-between;margin-top:14px"><h3 style="font-family:var(--fh);margin:0">📚 Paket Saya <small class="mut">('+L.length+'/100)</small></h3>'+(L.length>4?'<input class="gin" id="pkQ" placeholder="🔎 Cari judul paket..." value="'+esc(PKL.q)+'" style="max-width:240px">':'')+'</div>';
 if(!L.length)return h+'<div class="note">Belum ada paket. Tekan <b>💾 Simpan ke Paket Saya</b> di atas untuk menyimpan soal yang sedang dibuka.</div>';
 var gk=lsGet(LS_GK,[]),shown=0;
 L.forEach(function(x){if(q&&String(x.judul).toLowerCase().indexOf(q)<0)return;shown++;var cur=PKCUR&&PKCUR.kode===x.kode;
  h+='<div class="scard pkc" data-jd="'+esc(String(x.judul).toLowerCase())+'"'+(cur?' style="border-color:rgba(251,191,36,.7)"':'')+'><div class="sh"><span>📦 '+esc(x.judul)+(cur?' <span class="badge b-mid">sedang dibuka di editor</span>':'')+'</span><small class="mut">Disimpan '+fmtT(x.diubah)+'</small></div>';
  h+='<div class="mut" style="font-size:13px">'+pkInfoTxt(x.info)+(x.info&&x.info.nama&&x.info.nama.length?' • '+x.info.nama.slice(0,4).map(esc).join(", ")+(x.info.nama.length>4?", ...":""):"")+'</div>';
  h+='<div class="pkst">'+(x.kelas.length?'<span class="badge b-ok">🏫 Dipakai: '+x.kelas.map(function(k){return esc(k.nama)}).join(", ")+'</span>':'')+(x.murid?'<span class="badge b-mid">👥 '+x.murid+' murid mengerjakan • '+x.sesi+' kali</span>':'<span class="badge b-na">Belum ada hasil murid</span>')+(x.bank?'<span class="badge b-ok">🌐 Di Bank Soal • dipakai '+(x.bank_pakai||0)+' guru</span>':'')+(x.publik?'<span class="badge b-mid">🔗 Link latihan: <b>'+esc(x.kode)+'</b> • dibuka '+(x.dibuka||0)+'×</span>':'')+'</div>';
  h+='<div class="row" style="margin-top:6px"><button class="btn sm" data-act="pkopen" data-kd="'+x.kode+'">✏️ Buka &amp; edit</button><button class="btn sm yel" data-act="pkuse" data-kd="'+x.kode+'">🏫 Pakai di kelas</button><button class="btn sm green" data-act="pkplay" data-kd="'+x.kode+'">🎮 Coba mainkan</button><button class="btn sm" data-act="pkhasil" data-kd="'+x.kode+'">📊 Lihat hasil</button><button class="btn sm gray" data-act="pklink" data-kd="'+x.kode+'">🔗 Link latihan</button><button class="btn sm '+(x.bank?'yel':'gray')+'" data-act="'+(x.bank?'pkbank0':'pkbank1')+'" data-kd="'+x.kode+'">'+(x.bank?'🌐 Tarik dari Bank Soal':'🌐 Bagikan ke Bank Soal')+'</button><button class="btn sm gray" data-act="pkdup" data-kd="'+x.kode+'">📄 Duplikat</button><button class="btn sm gray" data-act="pkdel" data-kd="'+x.kode+'" title="Hapus paket">🗑</button></div>';
  if(PKL.pick&&PKL.pick.kd===x.kode){
   if(PKL.pick.t==="use")h+='<div class="pkpick"><b>Pakai paket ini di kelas:</b> '+(gk.length?gk.map(function(c,i){return'<button class="btn sm yel" data-act="pkusek" data-kd="'+x.kode+'" data-ki="'+i+'">🏫 '+esc(c.nama)+'</button>'}).join(" "):'<span class="mut">Belum ada kelas. Buat kelas dulu di tab 📲 Kelas &amp; Murid.</span>')+'<div class="mut" style="font-size:12px;margin-top:4px">Soal kelas langsung diganti dengan paket ini. Murid mendapat soal baru saat membuka game (atau begitu ada sinyal).</div></div>';
   else if(PKL.pick.t==="link")h+='<div class="pkpick">'+(x.publik?'<b>🔗 Link latihan aktif.</b> Murid bisa berlatih lewat kode <b style="color:var(--yel);letter-spacing:2px">'+esc(x.kode)+'</b> tanpa masuk kelas (nilai tidak tercatat).<div class="row"><button class="btn sm" data-act="ltcopy" data-kd="'+x.kode+'">📋 Salin link</button><button class="btn sm green" data-act="ltwa" data-kd="'+x.kode+'" data-jd="'+esc(x.judul)+'">📤 Kirim ke WA</button><button class="btn sm gray" data-act="pkpub0" data-kd="'+x.kode+'">Matikan link</button></div>'
    :'Link latihan membuat paket ini bisa dibuka murid lewat kode 6 huruf <b>tanpa masuk kelas</b>. Nilainya <b>tidak tercatat</b> di dashboard.<div class="row"><button class="btn sm yel" data-act="pkpub1" data-kd="'+x.kode+'">🔗 Aktifkan link latihan</button></div>')+'</div>';
  }
  h+='</div>'});
 if(!shown)h+='<div class="mut">Tidak ada paket dengan judul itu.</div>';
 return h}
function pkHasilHTML(){var V=PKL.view,K=dState.kktp||75;var h='<div class="row" style="margin-top:0"><button class="btn sm gray" data-act="pkback">← Kembali ke Paket Saya</button></div>';
 if(!V.data)return h+'<div class="mut" style="margin-top:8px">'+(V.err?'❌ '+esc(V.err):'Memuat hasil...')+'</div>';
 var D=V.data,S=D.sesi||[];h+='<h3 style="font-family:var(--fh);margin:10px 0 2px">📊 Hasil: '+esc(D.judul)+'</h3><div class="mut" style="font-size:13px">'+pkInfoTxt(D.info)+' • KKTP '+K+'</div>';
 if(!S.length)return h+'<div class="note">Belum ada murid yang mengerjakan paket ini. Hasil muncul setelah paket dipakai di kelas dan murid mengerjakan kuis atau tantangan.</div>';
 var mu={},kel={};S.forEach(function(s){var key=s.kelas+":"+s.murid,o=mu[key]||(mu[key]={nama:s.nama||"(murid dihapus)",absen:s.absen,kelas:s.kelas_nama,n:0,best:0,first:null,last:null,lt:0,lama:0});o.n++;if(s.nilai>o.best)o.best=s.nilai;if(s.t>=o.lt){o.lt=s.t;o.last=s.nilai}o.first=s.nilai;if(s.lama)o.lama++;
  var k=kel[s.kelas]||(kel[s.kelas]={nama:s.kelas_nama,m:{}});k.m[key]=1});
 var arr=Object.keys(mu).map(function(k){return mu[k]}),bests=arr.map(function(u){return u.best}),tn=bests.filter(function(v){return v>=K}).length,lama=S.filter(function(s){return s.lama}).length;
 h+='<div class="tiles"><div class="tile"><b>'+arr.length+'</b><span>Murid mengerjakan</span></div><div class="tile"><b>'+S.length+'</b><span>Kali dikerjakan</span></div><div class="tile"><b>'+avg(bests)+'</b><span>Rata-rata nilai terbaik</span></div><div class="tile"><b>'+Math.round(tn/arr.length*100)+'%</b><span>Tuntas (≥ '+K+')</span></div></div>';
 if(lama)h+='<div class="note" style="margin-top:8px">⚠️ '+lama+' nilai dikerjakan dengan <b>soal versi lama</b> (murid sedang offline saat soal diganti). Nilai itu ditandai 🕓 di tabel.</div>';
 h+='<h4 style="margin:14px 0 6px">🏫 Per kelas</h4><div class="tbl-wrap"><table class="dt"><tr><th>Kelas</th><th>Murid</th><th>Rata-rata terbaik</th><th>Tuntas</th></tr>'+Object.keys(kel).map(function(k){var ks=Object.keys(kel[k].m).map(function(x){return mu[x].best});return'<tr><td><b>'+esc(kel[k].nama)+'</b></td><td>'+ks.length+'</td><td>'+avg(ks)+'</td><td>'+ks.filter(function(v){return v>=K}).length+' / '+ks.length+'</td></tr>'}).join("")+'</table></div>';
 arr.sort(function(a,b){return(a.kelas>b.kelas?1:a.kelas<b.kelas?-1:0)||((a.absen||0)-(b.absen||0))});
 h+='<h4 style="margin:14px 0 6px">👥 Per murid</h4><div class="tbl-wrap" style="max-height:340px"><table class="dt"><tr><th>Kelas</th><th>Absen</th><th>Nama</th><th>Dikerjakan</th><th>Nilai awal</th><th>Terakhir</th><th>Terbaik</th><th>Status</th></tr>'+arr.map(function(u){return'<tr><td>'+esc(u.kelas)+'</td><td>'+(u.absen||"-")+'</td><td><b>'+esc(u.nama)+'</b>'+(u.lama?' <span title="Ada nilai dengan soal versi lama">🕓</span>':'')+'</td><td>'+u.n+'×</td><td>'+u.first+'</td><td>'+u.last+'</td><td><b>'+u.best+'</b></td><td>'+(u.best>=K?'<span class="badge b-ok">✓ Tuntas</span>':'<span class="badge b-no">! Belum tuntas</span>')+'</td></tr>'}).join("")+'</table></div>';
 var sq=(D.soal||[]).filter(function(x){return x.n>=1}).map(function(x){return{q:x.q,n:x.n,p:Math.round(x.b/x.n*100)}}).sort(function(a,b){return a.p-b.p||b.n-a.n}).slice(0,10);
 if(sq.length)h+='<h4 style="margin:14px 0 6px">🧩 Soal paling sering salah</h4>'+sq.map(function(x,i){return'<div class="ostat" style="grid-template-columns:28px 1fr 130px"><b>'+(i+1)+'</b><span>'+esc(x.q)+'</span><span><div class="hbar" title="'+x.p+'% benar"><i style="width:'+x.p+'%"></i></div><small class="mut">'+x.p+'% benar dari '+x.n+' jawaban</small></span></div>'}).join("");
 return h}
/* simpan soal editor ke Paket Saya */
function pkSave(asNew,quiet){var e0=null;try{validate(normalize(draft))}catch(er){e0=er}if(e0){gmsg("❌ "+e0.message,"#ff8a80");return Promise.reject(e0)}
 if(dirty){pkNoSync=true;applyDraft();pkNoSync=false}
 var kd=asNew?null:(PKCUR&&PKCUR.kode),pk=exportPack();
 if(!quiet)gmsg("Menyimpan ke Paket Saya...");
 return api("/paket/simpan",{lic:licBody(),paket:pk,kode:kd}).catch(function(e){if(kd&&e.status===404)return api("/paket/simpan",{lic:licBody(),paket:pk});throw e}).then(function(r){pkSetCur({kode:r.kode,judul:pk.judul});cloudSave(true);if(!quiet)gmsg("✔ Tersimpan di Paket Saya: "+pk.judul,"#7dffa0");if(gTab==="paket")pkLoad();return r.kode},function(e){gmsg("❌ "+e.message,"#ff8a80");throw e})}
/* dipakai saat kirim soal ke kelas: pastikan soal tercatat di Paket Saya agar hasil per paket terekam */
function pkEnsure(){if(!LIC||!API_URL)return Promise.resolve("");return pkSave(false,true).catch(function(){return""})}
function pkGet(kd){return api("/paket/ambil",{lic:licBody(),kode:kd})}
function pkOpen(kd,play){var go=function(){gmsg("Membuka paket...");pkGet(kd).then(function(r){try{validate(r.paket);draft=padDraft(clone(r.paket));pkSetCur({kode:r.kode,judul:r.judul});pkNoSync=true;var ok=applyDraft();pkNoSync=false;if(!ok)return;
  if(play){$("ovGuru").classList.remove("show");if(mode==="landing")enterGame();else{setMode("play");$("hud").classList.add("show")}toast("🎮 Mencoba paket \""+r.judul+"\". Gedung mapel di kota sudah memakai soal paket ini.",4500)}
  else{gTab="editor";gSel=0;renderGuru();gmsg("✔ Paket \""+r.judul+"\" dibuka di editor. Perubahan ikut tersimpan ke paket ini setiap Simpan.","#7dffa0")}}catch(e){gmsg("❌ "+e.message,"#ff8a80")}},function(e){gmsg("❌ "+e.message,"#ff8a80")})};
 if(dirty)ask("Ada perubahan di editor yang belum disimpan. Kalau paket lain dibuka, perubahan itu hilang.",go,{ic:"💾",t:"Buka paket lain?",ok:"Buka saja",no:"Kembali"});else go()}
function pkAct(a,b){var kd=b.dataset.kd,x=kd&&pkFind(kd);
 if(a==="pksave"||a==="pksavenew"){pkSave(a==="pksavenew").catch(function(){});return true}
 if(a==="pkblank"){var go=function(){draft=padDraft({judul:"Paket baru",guru:draft.guru||"",jenjang:draft.jenjang||"",mapel:[{nama:"Mapel 1",warna:COLORS[0],waktu:30,jumlah:10,materi:[],soal:[newSoal()]}]});pkSetCur(null);dirty=true;gTab="editor";gSel=0;renderGuru();gmsg("Paket kosong siap. Tulis soal, lalu tekan 💾 Simpan. Jangan lupa simpan ke Paket Saya.","var(--yel)")};
  if(dirty)ask("Ada perubahan di editor yang belum disimpan. Kalau mulai paket kosong, perubahan itu hilang.",go,{ic:"💾",t:"Mulai paket kosong?",ok:"Mulai",no:"Kembali"});else go();return true}
 if(a==="pkopen"||a==="pkplay"){pkOpen(kd,a==="pkplay");return true}
 if(a==="pkuse"||a==="pklink"){var t=a==="pkuse"?"use":"link";PKL.pick=PKL.pick&&PKL.pick.kd===kd&&PKL.pick.t===t?null:{kd:kd,t:t};pkRender();return true}
 if(a==="pkusek"){var gk=lsGet(LS_GK,[]),c=gk[+b.dataset.ki];if(!c)return true;needPin(c,gk,function(){gmsg("Memasang paket di kelas "+c.nama+"...");api("/kelas/paket",{lic:licBody(),kode:c.kode,pin:c.pin,paket_kode:kd}).then(function(){PKL.pick=null;gmsg("✔ Kelas "+c.nama+" sekarang memakai paket \""+(x?x.judul:kd)+"\".","#7dffa0");pkLoad()},function(e){if(e.status===403&&/PIN/i.test(e.message)){c.pin="";lsSet(LS_GK,gk)}gmsg("❌ "+e.message,"#ff8a80")})});return true}
 if(a==="pkpub1"||a==="pkpub0"){api("/paket/publik",{lic:licBody(),kode:kd,publik:a==="pkpub1"}).then(function(){gmsg(a==="pkpub1"?"✔ Link latihan aktif. Kode: "+kd:"Link latihan dimatikan.","#7dffa0");pkLoad()},function(e){gmsg("❌ "+e.message,"#ff8a80")});return true}
 if(a==="pkhasil"){PKL.view={kode:kd,data:null};pkRender();var el=$("gBody");if(el)el.scrollTop=0;api("/paket/hasil",{lic:licBody(),kode:kd}).then(function(r){if(PKL.view&&PKL.view.kode===kd){PKL.view.data=r;pkRender()}},function(e){if(PKL.view){PKL.view.err=e.message;pkRender()}});return true}
 if(a==="pkback"){PKL.view=null;pkRender();return true}
 if(a==="pkdup"){gmsg("Menduplikat paket...");pkGet(kd).then(function(r){var pk=r.paket;pk.judul=(pk.judul||"Paket")+" (salinan)";return api("/paket/simpan",{lic:licBody(),paket:pk})}).then(function(){gmsg("✔ Paket diduplikat. Salinannya ada di daftar.","#7dffa0");pkLoad()},function(e){gmsg("❌ "+e.message,"#ff8a80")});return true}
 if(a==="pkdel"){ask("Paket \""+(x?x.judul:kd)+"\" akan dihapus dari Paket Saya"+(x&&x.publik?" dan link latihannya ikut mati":"")+". Nilai murid tetap aman di dashboard kelas, tetapi hasil per paket ini tidak bisa dilihat lagi.",function(){api("/paket/hapus",{lic:licBody(),kode:kd}).then(function(){if(PKCUR&&PKCUR.kode===kd)pkSetCur(null);gmsg("Paket dihapus.");pkLoad()},function(e){gmsg("❌ "+e.message,"#ff8a80")})},{t:"Hapus paket?",ok:"Hapus",danger:true});return true}
 return false}
/* ---------- 🌐 BANK SOAL BERSAMA ---------- */
var BANK={list:null,err:"",q:"",jj:"",urut:"populer",open:null,prev:{},busy:false,t:null};
function bankLoad(){if(!LIC||!API_URL){BANK.err="Server belum terhubung.";bankRender();return}BANK.busy=true;bankRender();
 api("/bank/cari",{lic:licBody(),q:BANK.q,jenjang:BANK.jj,urut:BANK.urut}).then(function(r){BANK.busy=false;BANK.list=r.paket||[];BANK.err="";bankRender()},function(e){BANK.busy=false;BANK.err=e.message;bankRender();if(e.status===403)licFail(e.message)})}
function bankRender(){if(gTab!=="bank"||!$("ovGuru").classList.contains("show"))return;var el=$("bankList");if(el)el.innerHTML=bankListHTML()}
function bankTabHTML(){var h='<div class="mut" style="margin-bottom:8px">Kumpulan paket soal yang dibagikan guru-guru pengguna ZuperVerse. Cari menurut topik atau jenjang, lihat isinya, lalu simpan ke Paket Saya dengan sekali klik. Ingin berbagi? Buka <b>📚 Paket Saya</b> dan tekan <b>🌐 Bagikan ke Bank Soal</b>.</div>';
 h+='<div class="row" style="margin-top:0"><input class="gin" id="bankQ" placeholder="🔎 Cari topik, contoh: pecahan, ekosistem, teks narasi" value="'+esc(BANK.q)+'" style="flex:1;min-width:220px"><button class="btn" data-act="bankcari">Cari</button></div>';
 h+='<div class="row" style="margin-top:6px">'+[["","Semua jenjang"],["sd","SD"],["smp","SMP"],["sma","SMA/SMK"]].map(function(x){return'<button class="btn sm '+(BANK.jj===x[0]?"yel":"gray")+'" data-act="bankjj" data-jj="'+x[0]+'">'+x[1]+'</button>'}).join("")+'<span style="flex:1"></span><button class="btn sm '+(BANK.urut==="populer"?"yel":"gray")+'" data-act="bankurut" data-u="populer">🔥 Terpopuler</button><button class="btn sm '+(BANK.urut==="baru"?"yel":"gray")+'" data-act="bankurut" data-u="baru">🆕 Terbaru</button></div>';
 return h+'<div id="bankList" style="margin-top:10px">'+bankListHTML()+'</div>'}
function bankListHTML(){if(BANK.err)return'<div class="note">❌ '+esc(BANK.err)+'</div>';if(!BANK.list)return'<div class="mut">Memuat bank soal...</div>';
 if(!BANK.list.length)return'<div class="note">'+(BANK.q||BANK.jj?'Belum ada paket yang cocok. Coba kata kunci lain.':'Bank soal masih kosong. Jadilah guru pertama yang berbagi lewat 📚 Paket Saya → 🌐 Bagikan ke Bank Soal.')+'</div>';
 return BANK.list.map(function(x){var i=x.info||{},pv=BANK.prev[x.kode];
  var h='<div class="scard"><div class="sh"><span>📦 '+esc(x.judul)+(x.milik?' <span class="badge b-mid">milik Anda</span>':'')+'</span><small class="mut">👥 dipakai '+x.pakai+' guru</small></div>';
  h+='<div class="mut" style="font-size:13px">'+(i.jenjang?esc(i.jenjang)+" • ":"")+(i.mapel||0)+' mapel • '+(i.soal||0)+' soal • oleh '+esc(x.guru)+'</div>'+(i.nama&&i.nama.length?'<div class="pkst">'+i.nama.slice(0,6).map(function(n){return'<span class="badge b-na">'+esc(n)+'</span>'}).join("")+'</div>':'');
  h+='<div class="row" style="margin-top:6px"><button class="btn sm gray" data-act="bankprev" data-kd="'+x.kode+'">'+(BANK.open===x.kode?"🔼 Tutup contoh soal":"👁 Lihat contoh soal")+'</button><button class="btn sm green" data-act="banksave" data-kd="'+x.kode+'">📥 Simpan ke Paket Saya</button><button class="btn sm" data-act="bankedit" data-kd="'+x.kode+'">✏️ Buka di editor</button></div>';
  if(BANK.open===x.kode)h+='<div class="pkpick">'+(!pv?'Memuat...':pv.err?'❌ '+esc(pv.err):bankPrevHTML(pv.paket))+'</div>';
  return h+'</div>'}).join("")}
function bankPrevHTML(pk){var h='',n=0;pk.mapel.forEach(function(m){if(n>=6)return;h+='<div style="font-weight:800;margin-top:6px">📚 '+esc(m.nama)+' <small class="mut">('+m.soal.length+' soal'+(m.materi&&m.materi.length?' • '+m.materi.length+' materi':'')+')</small></div>';
  m.soal.slice(0,3).forEach(function(s){if(n>=6)return;n++;h+='<div class="mut" style="font-size:13px;margin:3px 0 0 10px">• '+(s.tipe&&s.tipe!=="pg"?'<b>'+TIPE[s.tipe]+'</b> ':'')+esc(String(s.q).slice(0,140))+(s.opsi&&!s.tipe?' <i>('+s.opsi.map(esc).join(" / ")+')</i>':'')+'</div>'})});
 return h+'<div class="mut" style="font-size:12px;margin-top:6px">Periksa kembali kunci jawaban sebelum dipakai di kelas.</div>'}
function bankGet(kd,pakai){return api("/bank/ambil",{lic:licBody(),kode:kd,pakai:!!pakai})}
function bankAct(a,b){var kd=b.dataset.kd;
 if(a==="bankcari"){var q=$("bankQ");BANK.q=q?q.value.trim():"";bankLoad();return true}
 if(a==="bankjj"){BANK.jj=b.dataset.jj;renderGuru();return true}
 if(a==="bankurut"){BANK.urut=b.dataset.u;renderGuru();return true}
 if(a==="bankprev"){if(BANK.open===kd){BANK.open=null;bankRender();return true}BANK.open=kd;bankRender();if(!BANK.prev[kd]||BANK.prev[kd].err)bankGet(kd,false).then(function(r){BANK.prev[kd]={paket:r.paket};bankRender()},function(e){BANK.prev[kd]={err:e.message};bankRender()});return true}
 if(a==="banksave"){gmsg("Menyimpan ke Paket Saya...");bankGet(kd,true).then(function(r){var pk=r.paket;validate(pk);return api("/paket/simpan",{lic:licBody(),paket:pk}).then(function(){gmsg("✔ \""+r.judul+"\" tersimpan di Paket Saya. Buka tab 📚 Paket Saya untuk memakainya.","#7dffa0");PKL.list=null})}).catch(function(e){gmsg("❌ "+e.message,"#ff8a80")});return true}
 if(a==="bankedit"){var go=function(){gmsg("Membuka paket...");bankGet(kd,true).then(function(r){validate(r.paket);draft=padDraft(clone(r.paket));pkSetCur(null);pkNoSync=true;var ok=applyDraft();pkNoSync=false;if(ok){gTab="editor";gSel=0;renderGuru();gmsg("✔ Paket \""+r.judul+"\" dibuka di editor. Simpan ke Paket Saya agar bisa dipakai di kelas.","#7dffa0")}}).catch(function(e){gmsg("❌ "+e.message,"#ff8a80")})};
  if(dirty)ask("Ada perubahan di editor yang belum disimpan. Kalau paket lain dibuka, perubahan itu hilang.",go,{ic:"💾",t:"Buka paket dari bank?",ok:"Buka saja",no:"Kembali"});else go();return true}
 if(a==="pkbank1"||a==="pkbank0"){var x=pkFind(kd);var send=function(){api("/bank/terbit",{lic:licBody(),kode:kd,bank:a==="pkbank1"}).then(function(){gmsg(a==="pkbank1"?"🌐 Paket dibagikan ke Bank Soal. Terima kasih sudah berbagi!":"Paket ditarik dari Bank Soal.","#7dffa0");BANK.list=null;pkLoad()},function(e){gmsg("❌ "+e.message,"#ff8a80")})};
  if(a==="pkbank1")ask("Paket \""+(x?x.judul:kd)+"\" akan bisa dilihat dan disalin oleh guru lain pengguna ZuperVerse, beserta nama Anda sebagai pembuat. Anda bisa menariknya kapan saja. Perubahan yang Anda simpan nanti juga ikut terlihat di bank soal.",send,{ic:"🌐",t:"Bagikan ke Bank Soal?",ok:"Ya, bagikan"});else send();return true}
 return false}
/* ---------- bantuan ❓ ---------- */
var HELP={peta2:"Semua murid berkumpul di lobi di atas peta ini, lalu terjun ke peta yang sama. Untuk Battle Petualangan, murid tidak bisa pindah dunia selama sesi. Pilih Bebas agar murid tetap di tempatnya masing-masing.",kat:"Pilih Asesmen Harian, STS, atau SAS agar nilainya masuk ke tab 📋 Rekap Nilai dan dihitung sebagai nilai rapor sesuai bobot yang Anda atur. Latihan tidak ikut dihitung ke nilai rapor (kecuali diatur lain).",skor:"Skor (bobot) soal ini saat dipakai di tantangan atau asesmen. Kosongkan agar mengikuti bobot jenis soal yang diatur di tantangan (bawaan: 1). Contoh: soal sulit diberi skor 3, soal mudah skor 1. Nilai akhir tetap skala 0–100.",tipe:"Pilih jenis soal. Pilihan ganda: murid memilih 1 jawaban. Benar/Salah: murid menilai sebuah pernyataan. Isian singkat: murid mengetik jawaban (huruf besar/kecil tidak dipermasalahkan). Menjodohkan: murid memasangkan kolom kiri dengan kanan. Mengurutkan: murid menyusun langkah sesuai urutan yang benar.",buka:"Biasanya wilayah ketiga di setiap dunia baru terbuka setelah murid menyelesaikan gedung di wilayah sebelumnya. Centang ini kalau ingin murid bebas ke mana saja sejak awal.",
 detik:"Batas waktu menjawab setiap soal, dalam detik. Contoh: 30 berarti murid punya 30 detik untuk tiap soal. Untuk soal cerita yang panjang, beri waktu lebih lama, misalnya 60.",
 sesi:"Jumlah soal yang dikerjakan setiap kali murid masuk gedung. Soal diambil acak dari semua soal di mapel ini. Contoh: ada 20 soal dan Soal/sesi = 5, maka setiap kali masuk murid mendapat 5 soal acak yang berbeda.",
 mapel:"Setiap mapel atau topik menjadi satu gedung di dalam game, dan nama ini tertulis di papan gedungnya. Contoh: Pecahan, Ekosistem, atau Teks Narasi.",
 wajib:"Kalau dicentang, murid harus membuka semua materi di gedung ini dulu sebelum tombol Mulai Kuis bisa ditekan.",
 materi:"Bahan belajar yang bisa dibuka murid di dalam gedung sebelum kuis: video YouTube, link (Google Drive, website), gambar, atau ringkasan teks yang Anda tulis sendiri.",
 soal:"Tulis pertanyaan, lalu isi 2 sampai 4 pilihan jawaban. Klik bulatan di sebelah kiri pilihan untuk menandai jawaban yang BENAR (kotaknya berubah hijau). Pembahasan akan ditampilkan ke murid setelah menjawab."};
document.addEventListener("click",function(e){var q=e.target.closest(".qh"),hp=$("helpPop");if(q){e.preventDefault();e.stopPropagation();var r=q.getBoundingClientRect();hp.textContent=HELP[q.dataset.help]||"";hp.style.display="block";var w=Math.min(300,window.innerWidth-20);hp.style.left=Math.max(10,Math.min(window.innerWidth-w-10,r.left-w/2))+"px";hp.style.top=(r.bottom+8+hp.offsetHeight>window.innerHeight?r.top-hp.offsetHeight-8:r.bottom+8)+"px";return}if(!e.target.closest("#helpPop"))hp.style.display="none"},true);
/* ---------- tur Mode Guru ---------- */
var TOUR=[
 {t:"Selamat datang di Mode Guru! 👋",x:"Tur singkat ini (kurang dari 1 menit) menunjukkan cara menyiapkan soal dan membagikannya ke murid. Tekan Lanjut."},
 {el:"#homeSteps",tab:"home",t:"🏠 Beranda: 3 langkah",x:"Mulai dari sini. Langkah yang perlu dikerjakan berikutnya ditandai kuning: siapkan soal, buat kelas, lalu bagikan link ke murid."},
 {el:"#soalWays",tab:"editor",t:"✏️ Soal: pilih caranya",x:"Ketik soal sendiri di bawah, buat dengan AI, impor dari file Word/Excel, atau ambil dari Bank Soal guru lain."},
 {el:"#gSide",tab:"editor",t:"Satu mapel = satu gedung",x:"Setiap mapel atau topik di daftar ini menjadi satu gedung di dalam game. Tekan ＋ Mapel untuk menambah gedung baru."},
 {el:"#gBody .scard",tab:"editor",t:"Tulis soal & tandai jawaban benar",x:"Isi pertanyaan dan pilihan jawaban, lalu klik bulatan di samping pilihan yang BENAR. Kotaknya berubah hijau."},
 {el:"#gSave",tab:"editor",t:"Tekan 💾 Simpan",x:"Satu tombol untuk semuanya: gedung di game langsung berubah, soal tersimpan di Paket Saya, dan kalau sudah ada kelas, Anda ditawari mengirim soal terbaru ke murid."},
 {el:'[data-gt="kelas"]',tab:"kelas",t:"📲 Kelas & Murid",x:"Buat kelas dengan PIN, lalu kirim link ke murid lewat WhatsApp. Nilai murid tercatat otomatis dan bisa dilihat lewat 📊 Lihat nilai."},
 {el:'[data-gt="tan"]',tab:"tan",t:"⚡ Tantangan & Ujian",x:"Buat kuis berwaktu, lomba kelas dengan lobi dan terjun parasut, ujian STS/SAS, atau battle petualangan. Semua dikendalikan dari sini."},
 {el:'[data-gt="more"]',tab:"more",t:"Selesai! 🎉",x:"Fitur lain seperti peta dunia, Bank Soal, cadangan, dan panduan ada di ⋯ Lainnya. Tur ini bisa diulang dari Beranda."}];
var tourI=0;
function startTour(){tourI=0;$("tourDim").style.display="block";showTour()}
function endTour(){$("tourDim").style.display="none";lsSet("zv_tour_guru",1)}
function showTour(){var st=TOUR[tourI];if(st.tab&&gTab!==st.tab){gTab=st.tab;renderGuru()}
 $("tourN").textContent="Langkah "+(tourI+1)+" dari "+TOUR.length;$("tourT").textContent=st.t;$("tourX").textContent=st.x;$("tourBack").style.visibility=tourI?"visible":"hidden";$("tourNext").textContent=tourI===TOUR.length-1?"Selesai ✔":"Lanjut ➜";
 var el=st.el?document.querySelector(st.el):null,hole=$("tourHole"),card=$("tourCard"),W=window.innerWidth,H=window.innerHeight;
 if(el){if(el.scrollIntoView)el.scrollIntoView({block:"nearest"});var r=el.getBoundingClientRect(),pad=6,top=Math.max(4,r.top-pad),hh=Math.min(r.height+pad*2,H*0.5);hole.style.display="block";hole.style.left=(r.left-pad)+"px";hole.style.top=top+"px";hole.style.width=(r.width+pad*2)+"px";hole.style.height=hh+"px";
  var cw=Math.min(340,W*0.9),below=top+hh+12,ch=card.offsetHeight||180;card.style.left=Math.max(10,Math.min(W-cw-10,r.left))+"px";card.style.top=(below+ch<H?below:Math.max(10,top-ch-12))+"px"}
 else{hole.style.display="block";hole.style.left=W/2+"px";hole.style.top=H/2+"px";hole.style.width="0px";hole.style.height="0px";card.style.left=Math.max(10,(W-Math.min(340,W*0.9))/2)+"px";card.style.top=Math.max(10,H/2-100)+"px"}}
$("tourNext").onclick=function(){if(tourI>=TOUR.length-1){endTour();return}tourI++;showTour()};
$("tourBack").onclick=function(){if(tourI>0){tourI--;showTour()}};
$("tourSkip").onclick=endTour;
window.addEventListener("resize",function(){if($("tourDim").style.display==="block")showTour()});
function copyText(t){if(!t){gmsg("Belum ada teks untuk disalin.","#ff8a80");return}var done=function(){gmsg("📋 Tersalin!","#7dffa0")};
 if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(done,fallback);else fallback();
 function fallback(){var ta=document.createElement("textarea");ta.value=t;document.body.appendChild(ta);ta.select();try{document.execCommand("copy");done()}catch(e){gmsg("Salin manual: tekan lama pada teks.","var(--yel)")}ta.remove()}}
/* soal guru ikut tersimpan di akun (server) */
var cloudT=null;
function cloudSave(noPk){lsSet("zv_soal_t",Date.now());lsSet("zv_soal_src","guru");if(!LIC||!API_URL)return;var syncPk=!noPk&&!pkNoSync;clearTimeout(cloudT);cloudT=setTimeout(function(){var base=$("gMsg").textContent,pk=exportPack(),cur=PKCUR;
 if(syncPk&&cur)api("/paket/simpan",{lic:licBody(),paket:pk,kode:cur.kode}).then(function(){if(cur.judul!==pk.judul)pkSetCur({kode:cur.kode,judul:pk.judul})},function(e){if(e.status===404&&PKCUR&&PKCUR.kode===cur.kode)pkSetCur(null)});
 api("/guru/soal/simpan",{lic:licBody(),paket:pk,pk:cur?cur.kode:""}).then(function(r){lsSet("zv_soal_t",r.diubah);if($("ovGuru").classList.contains("show")&&!dirty)gmsg(base.replace(/\s*☁️.*$/,"")+(syncPk&&cur?" ☁️ Juga tersimpan di akun Anda dan di Paket Saya.":" ☁️ Juga tersimpan di akun Anda, jadi bisa dibuka dari perangkat lain."),"#7dffa0")},function(e){if($("ovGuru").classList.contains("show"))gmsg(base+" ⚠️ Belum tersimpan di akun ("+e.message+"). Soal tetap aman di perangkat ini.","var(--yel)")})},800)}
function cloudLoad(){if(!LIC||!API_URL)return;api("/guru/soal/ambil",{lic:licBody()}).then(function(r){var locT=lsGet("zv_soal_t",0),src=lsGet("zv_soal_src","guru");
 if(!r.paket){if(locT&&src==="guru")cloudSave();return}
 if(dirty||!(r.diubah>locT||src==="luar"))return;
 try{var pk=validate(r.paket);dataFull=pk;data=playPack(pk);lsSet(LS_D,pk);buildLots();landingStats();draft=padDraft(clone(pk));lsSet("zv_soal_t",r.diubah);lsSet("zv_soal_src","guru");pkSetCur(r.pk?{kode:r.pk,judul:r.pjudul}:null);if($("ovGuru").classList.contains("show")){renderGuru();gmsg("☁️ Soal dari akun Anda dimuat (terakhir disimpan "+fmtT(r.diubah)+").","#7dffa0")}}catch(e){}},function(){})}
function applyDraft(){try{var pk=validate(normalize(draft));dataFull=pk;data=playPack(pk);lsSet(LS_D,pk);buildLots();landingStats();checkMissions();dirty=false;draft=padDraft(clone(pk));gmsg("✔ Tersimpan! Kota sekarang punya "+data.mapel.length+" gedung mapel"+(pk.mapel.length>data.mapel.length?" (+"+(pk.mapel.length-data.mapel.length)+" khusus tantangan, tidak tampil di dunia)":"")+".","#7dffa0");cloudSave();return true}catch(e){gmsg("❌ "+e.message,"#ff8a80");return false}}
$("gSave").onclick=guruSimpan;

/* =================================================================
   LINK PAKET (#p=) & ?paket=
   ================================================================= */
function b64u(bytes){var s="";for(var i=0;i<bytes.length;i+=8192)s+=String.fromCharCode.apply(null,bytes.subarray(i,i+8192));return btoa(s).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}
function unb64u(t){t=t.replace(/-/g,"+").replace(/_/g,"/");while(t.length%4)t+="=";var s=atob(t),b=new Uint8Array(s.length);for(var i=0;i<s.length;i++)b[i]=s.charCodeAt(i);return b}
function encodePack(o){var bytes=new TextEncoder().encode(JSON.stringify(o));
 if(window.CompressionStream&&window.Response){return new Response(new Blob([bytes]).stream().pipeThrough(new CompressionStream("deflate"))).arrayBuffer().then(function(ab){return"z"+b64u(new Uint8Array(ab))})}
 return Promise.resolve("b"+b64u(bytes))}
function decodePack(t){var k=t.charAt(0),bytes=unb64u(t.slice(1));
 if(k==="z"){if(!window.DecompressionStream)return Promise.reject(new Error("Browser terlalu lama untuk membuka link ini. Perbarui Chrome."));return new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate"))).text().then(JSON.parse)}
 return Promise.resolve(JSON.parse(new TextDecoder().decode(bytes)))}
function usePack(pk,src,kk,quiet){try{validate(pk);dataFull=pk;data=playPack(pk);lsSet(LS_D,pk);lsSet("zv_soal_src","luar");lsSet("zv_pack_k",kk||"");buildLots();landingStats();var n=0;pk.mapel.forEach(function(m){n+=m.soal.length});
 var pb=$("packbar");pb.style.display="block";pb.innerHTML="📦 Paket soal dari guru: <b>"+esc(pk.judul)+"</b>"+(pk.guru?" oleh "+esc(pk.guru):"")+(pk.jenjang?" • "+esc(pk.jenjang):"")+"<br><small>"+pk.mapel.length+" gedung mapel • "+n+" soal • "+esc(src)+"</small>";
 if(mode==="play"&&!quiet)toast("📦 Paket soal baru dimuat: "+pk.judul)}catch(e){toast("❌ Paket soal tidak valid: "+e.message,5000)}}
function loadFromUrl(){
 var mm=(location.search.match(/[?&]main=(\d{6})/)||(location.hash||"").match(/^#main=(\d{6})/));if(mm){try{history.replaceState(null,"",location.pathname+location.search.replace(/[?&]main=\d{6}/,"").replace(/^&/,"?"))}catch(e){}setTimeout(function(){mainJoin(mm[1])},300)}
 if(/^#gratis\b/.test(location.hash||"")){try{history.replaceState(null,"",location.pathname+location.search)}catch(e){}setTimeout(function(){if(LIC)openGuru();else openGuruFree()},900)}
 if(/^#lari\b/.test(location.hash||"")){try{history.replaceState(null,"",location.pathname+location.search)}catch(e){}setTimeout(function(){if(mode==="landing")lariGratis();else openLari()},900)}
 var h=location.hash||"",mk=h.match(/^#k=([A-Za-z0-9]{4,10})/),mpd=h.match(/^#pdp=([A-Za-z0-9]{6,12})/);if(mpd){try{history.replaceState(null,"",location.pathname+location.search)}catch(e){}setTimeout(function(){pdpJoin(mpd[1].toUpperCase())},300)}if(mk){var kk=mk[1].toUpperCase();if(CL&&CL.kode===kk)refreshClass();else openJoin(kk)}
 var ms=h.match(/^#s=([A-Za-z0-9]{4,10})/);if(ms&&API_URL){api("/paket/"+ms[1].toUpperCase()).then(function(r){usePack(r.paket,"latihan "+(r.judul||ms[1]));toast("📚 Paket latihan \""+(r.judul||ms[1])+"\" dimuat. Tekan Main untuk mulai berlatih!",4500)},function(e){toast("❌ Kode latihan: "+e.message,5000)})}
 if(h.indexOf("#p=")===0){decodePack(h.slice(3)).then(function(pk){usePack(pk,"dari link")}).catch(function(e){toast("❌ Link paket rusak: "+e.message,5000)})}
 var q=new URLSearchParams(location.search).get("paket");if(q){fetch(q).then(function(r){if(!r.ok)throw new Error("file tidak ditemukan ("+r.status+")");return r.json()}).then(function(pk){usePack(pk,"dari file "+q)}).catch(function(e){toast("❌ Gagal memuat paket: "+e.message,5000)})}
}
window.addEventListener("hashchange",loadFromUrl);

/* =================================================================
   KELAS ONLINE (murid) - masuk kelas, kirim nilai, antrean offline
   ================================================================= */
var API_DEFAULT=String((window.ZUPERVERSE_CONFIG||{}).apiBaseUrl||"");/* isi dengan alamat Worker setelah di-deploy, contoh: https://zuperverse-api.namaakun.workers.dev */
var API_URL=(new URLSearchParams(location.search).get("api")||lsGet("zd2_api","")||API_DEFAULT).replace(/\/+$/,"");
var LS_CL="zd2_kelas",LS_OUT="zd2_outbox",LS_GK="zd2_guru_kelas";
var CL=lsGet(LS_CL,null),outbox=lsGet(LS_OUT,[]);
function api(path,body){
 if(!API_URL)return Promise.reject(new Error("Server kelas belum dihubungkan"));if(typeof fetch!=="function")return Promise.reject(new Error("Tidak bisa terhubung ke server. Periksa internet."));
 var ctrl=window.AbortController?new AbortController():null,tm=setTimeout(function(){if(ctrl)ctrl.abort()},15000);
 var opt=body?{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)}:{};if(ctrl)opt.signal=ctrl.signal;
 return fetch(API_URL+path,opt).then(function(r){clearTimeout(tm);return r.json().catch(function(){return{}}).then(function(j){if(!r.ok){if(r.status===404&&j.error==="Alamat tidak ditemukan")j.error="Fitur ini butuh server (API) versi terbaru. Pasang ulang file zuperverse-api.js terbaru di Cloudflare (Edit code lalu Deploy), lalu coba lagi.";var e=new Error(j.error||("Server menjawab "+r.status));e.status=r.status;e.kode=j.kode||"";if(j.kode==="blokir"&&CL&&!GURU&&path!=="/murid/masuk")setTimeout(function(){kickedOut()},0);if(j.kode==="pdp"&&PDP_ON)setTimeout(function(){pdpOff(j.error)},0);throw e}return j})},
  function(e){clearTimeout(tm);throw new Error(e&&e.name==="AbortError"?"Koneksi terlalu lama. Coba lagi.":"Tidak bisa terhubung ke server. Periksa internet.")})}
function skey(s){var t=String(s.q)+"|"+(s.opsi?s.opsi.join("|"):JSON.stringify(s.pasangan||s.urutan||s.kunci||"")),h=5381;for(var i=0;i<t.length;i++)h=((h<<5)+h+t.charCodeAt(i))|0;return(h>>>0).toString(36)}
function queue(b){if(!CL)return Promise.resolve();if(b.sesi){b.sesi.pk=CL.pk||"";b.sesi.pv=CL.pv||0}b.cid=Date.now().toString(36)+Math.random().toString(36).slice(2,8);outbox.push(b);if(outbox.length>400)outbox=outbox.slice(-400);lsSet(LS_OUT,outbox);updSync();return flush()}
var flushP=null;
function flush(){if(flushP)return flushP;if(!CL||!API_URL||!outbox.length){updSync();return Promise.resolve()}
 function next(){if(!CL||!outbox.length)return Promise.resolve();var body=Object.assign({},outbox[0],{kode:CL.kode,token:CL.token});
  return api("/catat",body).then(function(){outbox.shift();lsSet(LS_OUT,outbox);updSync();return next()},function(e){if(e.status===400||e.status===401){outbox.shift();lsSet(LS_OUT,outbox);if(e.status===401)toast("⚠️ Akun kelasmu tidak dikenali. Masuk kelas lagi ya.",4500);return next()}})}
 flushP=next().then(function(){flushP=null;updSync()},function(){flushP=null;updSync()});return flushP}
setInterval(flush,30000);window.addEventListener("online",flush);
function updSync(){var el=$("hKelas");if(!CL){el.style.display="none";return}el.style.display="block";el.textContent="🏫 "+CL.kelas+(outbox.length?" • ⏳ "+outbox.length+" belum terkirim":" • ✅ tersinkron")}
function updClassUI(){var jb=$("joinBox"),ic=$("inClass");
 if(CL){jb.style.display="none";ic.style.display="block";ic.innerHTML="🏫 Kamu terdaftar di kelas <b>"+esc(CL.kelas)+"</b>"+(CL.guru?" ("+esc(CL.guru)+")":"")+ " sebagai <b>"+esc(CL.nama)+"</b>, absen "+CL.absen+'. <button class="btn sm gray" id="lpLeave" style="margin-left:6px">Keluar kelas</button>'+(CL.pv?'<div class="mut" style="font-size:12px;margin-top:4px">📥 Soal dari guru diperbarui '+fmtT(CL.pv)+(CL.pt?' • dicek '+fmtT(CL.pt):'')+'</div>':'');
  $("lpLeave").onclick=function(){ask("Nilai yang sudah terkirim tetap tersimpan di dashboard guru.",function(){CL=null;lsSet(LS_CL,null);outbox=[];lsSet(LS_OUT,outbox);TAN.list=[];updTanUI();rtClose();RT.stop=false;updClassUI();toast("Kamu sudah keluar dari kelas")},{ic:"🚪",t:"Keluar dari kelas "+CL.kelas+"?",ok:"Keluar"})}}
 else{jb.style.display="block";ic.style.display="none"}updSync()}
function jmsg(t,c){$("jMsg").textContent=t;$("jMsg").style.color=c||"var(--mut)"}
function openJoin(kode){$("jKode").value=String(kode||"").trim().toUpperCase();$("jNama").value=CL?CL.nama:(P.name||"");$("jAbsen").value=CL?CL.absen:"";jmsg(API_URL?"":"Server kelas belum dipasang oleh pengelola aplikasi.",API_URL?"":"#ff8a80");$("ovJoin").classList.add("show");setTimeout(function(){($("jKode").value?$("jNama"):$("jKode")).focus()},50)}
$("jClose").onclick=function(){$("ovJoin").classList.remove("show");if(MAINP){MAINP=null;$("ovJoin").querySelector("h2").textContent="🏫 Masuk Kelas"}};
$("lpJoin").onclick=function(){var kd=$("lpKode").value.trim().toUpperCase(),msg=$("lpJoinMsg"),btn=this;if(!kd){msg.textContent="Ketik kode dari gurumu dulu.";return}if(/^\d{6}$/.test(kd.replace(/[\s-]/g,""))){mainJoin(kd.replace(/[\s-]/g,""),msg,btn);return}if(!API_URL){openJoin(kd);return}
 btn.disabled=true;msg.textContent="Memeriksa kode...";
 api("/kelas/"+kd).then(function(){btn.disabled=false;msg.textContent="";openJoin(kd)},function(e){if(e.status!==404){btn.disabled=false;msg.textContent="❌ "+e.message;return}
  api("/paket/"+kd).then(function(r){btn.disabled=false;msg.textContent="";usePack(r.paket,"latihan "+(r.judul||kd));toast("📚 Paket latihan \""+(r.judul||kd)+"\" dimuat. Selamat berlatih!",4000);openWorld()},function(e2){btn.disabled=false;msg.textContent=e2.status===404?"❌ Kode tidak ditemukan. Periksa lagi kodenya.":"❌ "+e2.message})})};
$("lpKode").addEventListener("keydown",function(e){if(e.key==="Enter")openJoin(this.value)});
$("jGo").onclick=function(){var kode=$("jKode").value.trim().toUpperCase(),nama=$("jNama").value.trim(),absen=parseInt($("jAbsen").value,10),btn=this;
 if(!kode||!nama||!absen){jmsg("Lengkapi kode kelas, nama, dan nomor absen.","#ff8a80");return}
 if(!API_URL){jmsg("Server kelas belum dipasang oleh pengelola aplikasi.","#ff8a80");return}
 jmsg("Menghubungkan ke kelas...");btn.disabled=true;
 api("/murid/masuk",{kode:kode,nama:nama,absen:absen,token:CL&&CL.kode===kode?CL.token:""}).then(function(r){btn.disabled=false;
  CL={kode:r.kelas.kode,kelas:r.kelas.nama,guru:r.kelas.guru,token:r.token,nama:r.nama,absen:r.absen,pk:r.paket_kode||"",pv:r.diubah||0,pt:Date.now()};lsSet(LS_CL,CL);
  usePack(r.paket,"kelas "+r.kelas.nama,r.kelas.kode);P.name=r.nama;save();if(avatar)rebuildAvatar();
  $("ovJoin").classList.remove("show");updClassUI();flush();tanLoad();RT.stop=false;rtClose();toast("✅ Berhasil masuk kelas "+r.kelas.nama);if(MAINP&&MAINP.kelas.kode===r.kelas.kode){mainGo();return}if(mode==="landing")openWorld()},
 function(e){btn.disabled=false;jmsg("❌ "+e.message,"#ff8a80")})};
/* cek soal terbaru dari guru: saat game dibuka, saat sinyal kembali, dan berkala. Kalau soal belum berubah, paket tidak diunduh ulang. */
var rcBusy=false;
function inQuiz(){return mode==="quiz"&&Q&&!Q.finished}
function refreshClass(){if(!CL||!API_URL||rcBusy)return;if(inQuiz()){setTimeout(refreshClass,20000);return}rcBusy=true;var mine=lsGet("zv_pack_k","")===CL.kode&&CL.pv;
 api("/kelas/"+CL.kode+(mine?"?v="+CL.pv:"")).then(function(k){rcBusy=false;if(!CL)return;CL.kelas=k.nama;CL.guru=k.guru;CL.pt=Date.now();
  if(!k.sama&&k.paket){if(inQuiz()){lsSet(LS_CL,CL);setTimeout(refreshClass,20000);return}var baru=CL.pv&&k.diubah&&k.diubah!==CL.pv;usePack(k.paket,"kelas "+k.nama,CL.kode,true);CL.pk=k.paket_kode||"";CL.pv=k.diubah||0;if(baru)toast("📥 Soal baru dari guru sudah dimuat!",4500)}
  lsSet(LS_CL,CL);updClassUI();tanLoad()},function(){rcBusy=false})}
window.addEventListener("online",function(){setTimeout(refreshClass,1500)});
document.addEventListener("visibilitychange",function(){if(!document.hidden&&CL&&Date.now()-(CL.pt||0)>120000)refreshClass()});
setInterval(function(){if(CL&&!document.hidden&&Date.now()-(CL.pt||0)>300000)refreshClass()},60000);

/* =================================================================
   KELAS ONLINE (guru) - dashboard nilai & analisis
   ================================================================= */
function classLink(kode){return location.origin+location.pathname+(API_URL&&API_URL!==API_DEFAULT?"?api="+encodeURIComponent(API_URL):"")+"#k="+kode}
function apiField(){return'<div class="row"><input class="gin" id="apiIn" value="'+esc(API_URL)+'" placeholder="https://zuperverse-api.namaakun.workers.dev" style="flex:1;min-width:220px"><button class="btn sm" data-act="apiset">Simpan alamat</button></div>'}
function kelasTabHTML(){var h="";
 if(!API_URL){return'<div class="note"><b>Server kelas belum dihubungkan.</b><br>Kelas membutuhkan server kecil (Cloudflare Worker + database D1) yang dipasang sekali oleh pengelola aplikasi. Setelah terpasang, tempel alamat servernya di bawah ini.</div>'+apiField()}
 var gk=lsGet(LS_GK,[]);syncGK();
 h+='<div class="mut">Murid tidak perlu akun. Buat kelas, bagikan link ke murid, dan nilai mereka tercatat otomatis.</div>';
 if(gk.length){h+='<h3 style="font-family:var(--fh);margin:12px 0 4px">Kelas saya</h3>';
  gk.forEach(function(c,i){var nw=KNEW===c.kode;h+='<div class="scard'+(nw?' knew':'')+'"><div class="sh"><span>'+esc(c.nama)+'</span><span style="font-family:var(--fh);font-size:22px;color:var(--yel);letter-spacing:2px">'+esc(c.kode)+'</span></div>';
   if(nw)h+='<div class="note" style="margin-top:0">🎉 <b>Kelas siap!</b> Langkah terakhir: kirim link ini ke murid. Murid cukup membukanya, lalu mengisi nama panggilan dan nomor absen.<input class="gin" readonly value="'+esc(classLink(c.kode))+'" style="margin-top:6px" onclick="this.select()"></div>';
   h+='<div class="row" style="margin-top:4px"><button class="btn sm green" data-act="kwa" data-ki="'+i+'">📤 Kirim link ke WA</button><button class="btn sm" data-act="klink" data-ki="'+i+'">📋 Salin link</button><button class="btn sm yel" data-act="kdash" data-ki="'+i+'">📊 Lihat nilai</button></div>';
   h+='<div class="row kmore" style="margin-top:4px"><button class="btn sm gray" data-act="kpush" data-ki="'+i+'" title="Kirim soal yang sedang terbuka di ✏️ Soal ke kelas ini">📲 Kirim soal terbaru</button><button class="btn sm gray" data-act="kambil" data-ki="'+i+'">📥 Ambil soal kelas ini</button><button class="btn sm gray" data-act="kren" data-ki="'+i+'">✏️ Ubah nama</button><button class="btn sm gray" data-act="kforget" data-ki="'+i+'">Lupakan</button></div></div>'})}
 h+='<div class="scard"><div class="sh">'+(gk.length?'＋ Buat kelas lain':'🏫 Buat kelas pertama Anda')+'</div><div class="gtop"><label class="fld">Nama kelas<input id="kNama" placeholder="Contoh: Kelas 5A SD Inpres Rata"></label><label class="fld">Nama guru<input id="kGuru" value="'+esc(draft.guru||(LIC&&LIC.nama)||"")+'"></label><label class="fld">PIN guru (6 angka, untuk membuka nilai)<span class="pwbox"><input id="kPin" type="password" inputmode="numeric" maxlength="10" autocomplete="new-password"><button type="button" class="eyeb" title="Tampilkan" aria-label="Tampilkan">👁️</button></span></label></div><div class="mut" style="font-size:12px;margin-top:6px">Kelas memakai soal yang sedang terbuka di ✏️ Soal: <b>'+esc(draft.judul||"")+'</b>.</div><div class="row"><button class="btn yel" data-act="mkkelas">🏫 Buat Kelas</button></div></div>';
 h+='<details class="scard"><summary style="cursor:pointer;font-weight:900">🔑 Buka kelas dari perangkat lain</summary><div class="gtop" style="margin-top:8px"><label class="fld">Kode kelas<input id="oKode" style="text-transform:uppercase"></label><label class="fld">PIN guru<span class="pwbox"><input id="oPin" type="password" inputmode="numeric" autocomplete="off"><button type="button" class="eyeb" title="Tampilkan" aria-label="Tampilkan">👁️</button></span></label><span></span></div><div class="row"><button class="btn green" data-act="kopen">📊 Buka nilai kelas</button></div></details>';
 h+='<div class="mut" style="font-size:12px;margin-top:12px">⭐ Akun atas nama <b>'+esc(LIC?LIC.nama:"-")+'</b> • batas '+(LIC&&LIC.maks?LIC.maks:10)+' kelas</div>';
 h+='<details style="margin-top:6px"><summary class="mut" style="cursor:pointer;font-size:12px">Alamat server</summary>'+apiField()+'</details>';
 return h}
function kelasAct(a,b){
 var gk=lsGet(LS_GK,[]),c=gk[+b.dataset.ki];
 if(a==="apiset"){var v=$("apiIn").value.trim().replace(/\/+$/,"");if(v&&!/^https:\/\//i.test(v)){gmsg("Alamat harus diawali https://","#ff8a80");return true}API_URL=v;lsSet("zd2_api",v);if(!v){gmsg("Alamat server dihapus.");renderGuru();return true}gmsg("Mengecek server...");api("/").then(function(){gmsg("✔ Server terhubung.","#7dffa0");renderGuru()},function(e){gmsg("❌ "+e.message,"#ff8a80")});return true}
 if(a==="mkkelas"){var nm=$("kNama").value.trim(),gu=$("kGuru").value.trim(),pin=$("kPin").value.trim();if(!nm){gmsg("Isi nama kelas.","#ff8a80");return true}if(!/^\d{6,10}$/.test(pin)){gmsg("PIN harus 6 sampai 10 angka.","#ff8a80");return true}
  try{validate(normalize(draft))}catch(er){gmsg("❌ "+er.message,"#ff8a80");return true}if(dirty)applyDraft();
  gmsg("Membuat kelas...");var pkdC="";pkEnsure().then(function(pkd){pkdC=pkd;return api("/kelas/buat",{lic:licBody(),nama:nm,guru:gu,pin:pin,paket:exportPack(),paket_kode:pkd})}).then(function(r){var g=lsGet(LS_GK,[]);g.unshift({kode:r.kode,nama:nm,pin:pin,pk:pkdC||""});lsSet(LS_GK,g);KNEW=r.kode;renderGuru();gmsg("✔ Kelas dibuat! Kode kelas: "+r.kode+". Sekarang kirim link ke murid.","#7dffa0")},function(e){gmsg("❌ "+e.message,"#ff8a80")});return true}
 if(a==="klink"){copyText(classLink(c.kode));c.shared=1;lsSet(LS_GK,gk);return true}
 if(a==="kwa"){window.open("https://wa.me/?text="+encodeURIComponent("🎮 Ayo masuk kelas "+c.nama+" di ZuperVerse!\nKode kelas: *"+c.kode+"*\n\nBuka link ini, lalu isi nama panggilan dan nomor absenmu:\n"+classLink(c.kode)),"_blank");c.shared=1;lsSet(LS_GK,gk);if(gTab==="home")renderGuru();return true}
 if(a==="kpush"){needPin(c,gk,function(){try{validate(normalize(draft))}catch(er){gmsg("❌ "+er.message,"#ff8a80");return true}if(dirty)applyDraft();gmsg("Mengirim soal...");var pkdP="";pkEnsure().then(function(pkd){pkdP=pkd;return api("/kelas/paket",{lic:licBody(),kode:c.kode,pin:c.pin,paket:exportPack(),paket_kode:pkd})}).then(function(){c.pk=pkdP;lsSet(LS_GK,gk);gmsg("✔ Soal kelas "+c.nama+" diperbarui. Murid mendapat soal baru saat membuka game.","#7dffa0")},function(e){gmsg("❌ "+e.message,"#ff8a80")})});return true}
 if(a==="kambil"){ask("Soal di editor akan diganti dengan soal yang sedang dipakai kelas "+c.nama+".",function(){gmsg("Mengambil soal kelas...");api("/kelas/paket/ambil",{lic:licBody(),kode:c.kode,pin:c.pin}).then(function(k){try{validate(k.paket);draft=padDraft(clone(k.paket));pkSetCur(k.paket_kode?{kode:k.paket_kode,judul:k.paket.judul}:null);c.pk=k.paket_kode||"";lsSet(LS_GK,gk);pkNoSync=true;var okA=applyDraft();pkNoSync=false;if(okA){gTab="editor";gSel=0;renderGuru();gmsg("✔ Soal kelas "+c.nama+" dimuat ke editor.","#7dffa0")}}catch(e){gmsg("❌ "+e.message,"#ff8a80")}},function(e){gmsg("❌ "+e.message,"#ff8a80")})},{ic:"📥",t:"Ambil soal kelas ini?",ok:"Ya, ambil"});return true}
 if(a==="kdash"){needPin(c,gk,function(){openDash(c.kode,c.pin,false)});return true}
 if(a==="licout"){licOut();return true}
 if(a==="kren"){zDlg({ic:"✏️",t:"Ubah nama kelas",m:"Nama baru untuk kelas "+c.nama+" (kode "+c.kode+"). Kode dan link kelas tidak berubah, murid tidak perlu masuk ulang.",input:true,val:c.nama,ph:"Contoh: Kelas 5A",ok:"Simpan",cb:function(v){v=String(v||"").trim().slice(0,40);if(!v||v===true||v===c.nama)return;needPin(c,gk,function(){api("/kelas/ubah",{lic:licBody(),kode:c.kode,pin:c.pin,nama:v}).then(function(){c.nama=v;lsSet(LS_GK,gk);if(DB_&&DB_.kelas&&DB_.kelas.kode===c.kode)DB_.kelas.nama=v;renderGuru();toast("✔ Nama kelas diganti menjadi "+v,3000)},function(er){info(er.message)})})}});return true}
 if(a==="kforget"){ask("Kelas "+c.nama+" hanya dihapus dari daftar di perangkat ini. Data murid dan nilai di server tetap aman.",function(){gk.splice(+b.dataset.ki,1);lsSet(LS_GK,gk);renderGuru()},{t:"Hapus dari daftar?",ok:"Hapus",danger:true});return true}
 if(a==="kopen"){var ko=$("oKode").value.trim().toUpperCase(),kp=$("oPin").value.trim();if(!ko||!kp){gmsg("Isi kode kelas dan PIN.","#ff8a80");return true}openDash(ko,kp,true);return true}
 return false}

/* ---------- Lisensi guru ---------- */
var LYNK_URL=String((window.ZUPERVERSE_CONFIG||{}).billingUrl||""),ADMIN_WA=String((window.ZUPERVERSE_CONFIG||{}).adminWhatsApp||"");
var LS_LIC="zv_lic",LIC=lsGet(LS_LIC,null),DEV=lsGet("zv_dev",null),licStep=1,gkSynced=false;
if(!DEV||!/^[a-f0-9]{32}$/.test(DEV)){DEV="";var ra=new Uint8Array(16);(window.crypto||{getRandomValues:function(a){for(var i=0;i<a.length;i++)a[i]=Math.floor(Math.random()*256);return a}}).getRandomValues(ra);for(var di=0;di<16;di++)DEV+=("0"+ra[di].toString(16)).slice(-2);lsSet("zv_dev",DEV)}
function licBody(){if(PDP_ON&&PDP)return{pdp:PDP.token};if(!LIC)return null;return LIC.sess?{sess:LIC.sess,dev:DEV}:{kode:LIC.kode,dev:DEV}}
/* ---------- 👥 GURU PENDAMPING (tanpa lisensi, satu kelas, hak terbatas) ---------- */
var PDP=lsGet("zv_pdp",null),PDP_ON=false;
function devEnsure(){if(DEV)return DEV;var ra=new Uint8Array(16);(window.crypto||{getRandomValues:function(a){for(var i=0;i<a.length;i++)a[i]=Math.floor(Math.random()*256);return a}}).getRandomValues(ra);DEV="";for(var di=0;di<16;di++)DEV+=("0"+ra[di].toString(16)).slice(-2);lsSet("zv_dev",DEV);return DEV}
function pdpLink(kode){return location.origin+location.pathname.replace(/index\.html$/,"")+(API_URL&&API_URL!==API_DEFAULT?"?api="+encodeURIComponent(API_URL):"")+"#pdp="+kode}
function pdpJoin(kode){api("/pendamping/masuk",{kode:kode,dev:devEnsure()}).then(function(r){PDP={token:r.token,nama:r.nama,kelas:r.kelas};lsSet("zv_pdp",PDP);pdpUI();toast("👥 Selamat datang, "+r.nama+"! Anda guru pendamping kelas "+r.kelas.nama+".",4000);pdpOpen()},function(e){zDlg({ic:"👥",t:"Undangan pendamping",m:e.message,ok:"Oke",alert:true})})}
function pdpOpen(){if(!PDP)return;PDP_ON=true;document.body.classList.add("pdp");openDash(PDP.kelas.kode,"",false)}
function pdpOff(msg){PDP_ON=false;document.body.classList.remove("pdp");if(msg){PDP=null;lsSet("zv_pdp",null);$("ovDash").classList.remove("show");try{clearInterval(dTimer);lvClose()}catch(e){}zDlg({ic:"👥",t:"Akses pendamping berakhir",m:msg,ok:"Oke",alert:true})}pdpUI()}
function pdpUI(){var el=$("pdpBox");if(!el)return;if(!PDP){el.style.display="none";return}el.style.display="";el.innerHTML='<b>👥 Guru pendamping</b> • '+esc(PDP.nama)+' • kelas <b>'+esc(PDP.kelas.nama)+'</b><div class="row" style="margin-top:8px"><button class="btn sm yel" id="pdpGo">📊 Buka dashboard kelas</button><button class="btn sm gray" id="pdpOut">Keluar</button></div>';
 $("pdpGo").onclick=pdpOpen;$("pdpOut").onclick=function(){ask("Akses pendamping di perangkat ini akan dihapus. Untuk masuk lagi, Anda perlu undangan baru dari guru kelas.",function(){PDP=null;lsSet("zv_pdp",null);pdpUI()},{ic:"👥",t:"Keluar sebagai pendamping?",ok:"Keluar",danger:true})}}
function pdpTab(){var L=DB_.pendamping||[];var h='<div class="scard" style="margin-top:0"><div class="sh"><span>👥 Guru pendamping kelas ini</span></div><div class="mut" style="font-size:13px">Guru pendamping bisa membantu tanpa lisensi dan tanpa PIN: melihat nilai, rekap &amp; analisis, memantau Live, menekan ▶ Mulai / ⏹ Akhiri tantangan, mengeluarkan penyusup, dan mengunci kelas. Mereka <b>tidak bisa</b> membuat kelas, membuat atau mengubah tantangan, mengubah soal, menghapus murid, atau melihat kode lisensi Anda. Satu undangan hanya bisa dipakai di satu perangkat.</div>';
 h+='<div class="row" style="margin-top:10px"><input class="gin" id="pdpNama" maxlength="40" placeholder="Nama guru pendamping, misalnya Bu Sari (wali kelas)" style="flex:1;min-width:220px"><button class="btn yel" data-dact="pdpadd">＋ Undang pendamping</button></div></div>';
 if(!L.length)return h+'<div class="mut" style="margin-top:10px">Belum ada guru pendamping.</div>';
 return h+L.map(function(x){var ln=pdpLink(x.kode);return'<div class="scard"><div class="sh"><span>👤 '+esc(x.nama)+'</span><span class="badge '+(x.dipakai?'b-ok">✓ Sudah dipakai':'b-na">Belum dibuka')+'</span></div><div class="mut" style="font-size:12px">'+(x.aktif?'Terakhir aktif '+fmtT(x.aktif):'Belum pernah membuka dashboard')+'</div><div class="row" style="margin-top:6px;align-items:center"><code style="flex:1;min-width:200px;word-break:break-all;font-size:12px;background:rgba(0,0,0,.25);padding:6px 8px;border-radius:8px">'+esc(ln)+'</code><button class="btn sm" data-dact="pdpcopy" data-ln="'+esc(ln)+'">📋 Salin link</button><button class="btn sm green" data-dact="pdpwa" data-ln="'+esc(ln)+'" data-nm="'+esc(x.nama)+'">📤 Kirim ke WA</button><button class="btn sm red" data-dact="pdpdel" data-pid="'+x.id+'" data-nm="'+esc(x.nama)+'">Cabut akses</button></div></div>'}).join("")}
function lmsg(t,c){$("licMsg").textContent=t;$("licMsg").style.color=c||"var(--mut)"}
/* ---------- 👤 Akun guru: Google / email + kata sandi, langganan tahunan ---------- */
var SETL=null,GCRED=null,licCara="email",licJenis="baru",licInfoG={};
function setlLoad(){if(!API_URL)return Promise.resolve({});return api("/setelan").then(function(r){SETL=r;return r},function(){return SETL||{}})}
function waAdm(){return(SETL&&SETL.wa)||ADMIN_WA}
function fmtTgl(ms){try{return new Date(ms).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"})}catch(e){return new Date(ms).toISOString().slice(0,10)}}
function sisaHari(ms){return Math.ceil((ms-Date.now())/86400000)}
var AK_ST={aktif:["✅ Aktif","ak-ok"],segera:["⏳ Segera berakhir","ak-mid"],tenggang:["⚠️ Masa tenggang","ak-mid"],habis:["⛔ Langganan berakhir","ak-no"],menunggu:["⏳ Menunggu aktivasi","ak-mid"],seumur:["♾️ Seumur hidup","ak-ok"],lama:["🔑 Kode akses lama","ak-mid"],blokir:["🚫 Diblokir","ak-no"]};
function licSave(g,sess){LIC={sess:sess||(LIC&&LIC.sess),nama:g.nama,email:g.email,st:g.status,sampai:g.sampai,tg:g.tenggang_sampai,maks:g.maks_kelas};lsSet(LS_LIC,LIC)}
function licDone(r){licSave(r.guru,r.sess);gkSynced=false;$("ovLic").classList.remove("show");if(LIC.st==="menunggu"){openAkun();return}toast("🔑 Selamat datang, "+LIC.nama+"!");openGuruPanel()}
function licOut(){ask((dirty?"Ada perubahan soal di editor yang belum disimpan dan akan hilang. ":"")+"Mode Guru di perangkat ini akan dikunci lagi. Anda bisa masuk kembali kapan saja dengan akun yang sama.",function(){if(LIC&&LIC.sess)api("/akun/keluar",{lic:licBody()}).catch(function(){});LIC=null;lsSet(LS_LIC,null);["ovGuru","ovDash","ovAkun"].forEach(function(i){$(i).classList.remove("show")});if(mode==="menu")setMode("play");toast("🚪 Anda sudah logout dari Mode Guru")},{ic:"🚪",t:"Logout dari Mode Guru?",ok:"Logout",danger:true})}
function openGuru(){if(LIC&&!LIC.sess){var old=LIC;LIC=null;lsSet(LS_LIC,null);openLic("Login dengan kode akses sudah tidak berlaku. Pindahkan akun Anda sekali saja: semua kelas dan nilai tetap utuh.",{kode:old.kode,nama:old.nama});return}if(LIC){if(LIC.st==="menunggu"){openAkun();recheckLic();return}openGuruPanel();recheckLic();return}openLic()}
function licView(v){$("licA").style.display=v==="a"?"block":"none";$("licB").style.display=v==="b"?"block":"none";$("licC").style.display=v==="c"?"block":"none"}
function openLic(msg,pindah){licView("a");$("licPw").value="";lmsg(msg||(API_URL?"":"Server belum terhubung."),msg?"#ff8a80":"");$("ovLic").classList.add("show");if(mode==="play")setMode("menu");
 setlLoad().then(function(S){$("licToDaftar").style.display=S.sandi===false&&!S.google?"none":"";
  if(S.harga)$("licInfo").innerHTML='Mode Guru (editor soal, kelas online, dan dashboard nilai) hanya untuk guru yang sudah membeli langganan: <b>'+esc(S.harga)+'</b>. Murid tetap bermain <b>gratis</b> dengan kode kelas dari guru.';
  if(S.beli){$("licBeli").href=S.beli;$("licBeli2").href=S.beli}var w=waAdm();if(w){$("licWaAdmin").href="https://wa.me/"+w+"?text="+encodeURIComponent("Halo admin ZuperVerse, saya ingin bertanya tentang langganan Mode Guru.");$("licWaAdmin").style.display="inline-flex"}
  licGsi();if(pindah){licJenis="lama";licDaftarUI(S.google?"pilih":"email",{lama:pindah});if(msg)lmsg(msg,"#fde68a")}})}
function licGsi(){var w=$("licGWrap"),S=SETL||{};if(!S.google){w.style.display="none";$("licOr").style.display="none";return}w.style.display="";$("licOr").style.display="";
 var go=function(){var G=window.google;try{G.accounts.id.initialize({client_id:S.google,callback:function(r){licGoogle(r.credential)},ux_mode:"popup",auto_select:false,cancel_on_tap_outside:true});$("licG").innerHTML="";G.accounts.id.renderButton($("licG"),{theme:"filled_blue",size:"large",text:"signin_with",shape:"pill",locale:"id",width:Math.max(220,Math.min(320,(w.clientWidth||300)-10))})}catch(e){$("licG").innerHTML='<div class="mut" style="font-size:12px">Tombol Google gagal dimuat. Silakan pakai email.</div>'}};
 if(window.google&&window.google.accounts&&window.google.accounts.id){go();return}
 if(document.getElementById("gsiJs")){var t=0,iv=setInterval(function(){if(window.google&&window.google.accounts){clearInterval(iv);go()}else if(++t>40)clearInterval(iv)},250);return}
 var sc=document.createElement("script");sc.id="gsiJs";sc.src="https://accounts.google.com/gsi/client";sc.async=true;sc.onload=go;sc.onerror=function(){$("licG").innerHTML='<div class="mut" style="font-size:12px">Tombol Google gagal dimuat (periksa internet). Silakan pakai email.</div>'};document.head.appendChild(sc)}
function licGoogle(cred){GCRED=cred;lmsg("Memeriksa akun Google...");api("/akun/google",{cred:cred,dev:devEnsure()}).then(function(r){if(r.perlu){lmsg("");licChoice("google",r)}else licDone(r)},function(e){lmsg("❌ "+e.message,"#ff8a80")})}
function licJ(){return licJenis}
function licChoice(cara,info){if((window.ZUPERVERSE_CONFIG||{}).independentBackend){licJenis="baru";licDaftarUI(cara,info||{});return}licCara=cara;licInfoG=info||{};licView("c");lmsg("");$("licCHead").innerHTML=cara==="google"?'Akun Google <b>'+esc(licInfoG.email||"")+'</b> belum terdaftar.':'Pendaftaran akun Mode Guru.'}
Array.prototype.forEach.call(document.querySelectorAll("#licC [data-ch]"),function(b){b.onclick=function(){var c=b.dataset.ch;
 if(c==="beli"){var buyUrl=(SETL&&SETL.beli)||LYNK_URL;if(!buyUrl){lmsg("Alamat langganan belum diatur oleh pengelola situs.","#fde68a");return}window.open(buyUrl,"_blank","noopener");lmsg("Setelah membayar, kembali ke sini lalu pilih ✅ Sudah beli.","#fde68a");return}
 if(c==="gratis"){openGuruFree();return}
 if(c==="coba"){$("ovLic").classList.remove("show");if(mode==="menu")setMode("play");toast("🎮 Silakan main gratis! Untuk masuk kelas, pakai kode kelas dari guru.",4500);return}
 licJenis=c;licDaftarUI(licCara,licInfoG)}});
$("licCBack").onclick=function(){licView("a");lmsg("");licGsi()};
function licDaftarUI(cara,info){info=info||{};licCara=cara;licView("b");lmsg("");
 if(cara==="google")$("licBHead").innerHTML='Akun Google <b>'+esc(info.email||"")+'</b> belum terdaftar. Lengkapi data berikut sekali saja.';
 else if(cara==="pilih")$("licBHead").innerHTML='Paling mudah: klik <b>Kembali</b> lalu tombol <b>Masuk dengan Google</b>, kemudian pilih ⭐ Saya pelanggan lama. Atau buat akun dengan email + kata sandi di bawah ini.';
 else $("licBHead").innerHTML='Buat akun dengan email dan kata sandi.'+(SETL&&SETL.google?' Punya akun Google (Gmail / belajar.id)? Lebih mudah klik <b>Kembali</b> lalu <b>Masuk dengan Google</b>.':'');
 if(cara==="pilih")licCara="email";
 $("licBEm").style.display=licCara==="google"?"none":"";if(info.nama&&!$("licBNama").value)$("licBNama").value=info.nama;
 if(info.lama){licJenis="lama";if(info.lama.kode)$("licBKode").value=info.lama.kode;if(info.lama.nama&&!$("licBNama").value)$("licBNama").value=info.lama.nama}
 $("licBLama").style.display=licJenis==="lama"?"block":"none";$("licBBuktiL").style.display=(licJenis==="lama"||(window.ZUPERVERSE_CONFIG||{}).independentBackend)?"none":"";
 if(licJenis==="lama")$("licBHead").innerHTML=(cara==="google"?'Akun Google <b>'+esc(info.email||"")+'</b> akan dihubungkan dengan akun lama Anda.':'Buat akun email untuk menggantikan kode akses lama Anda.')+' Semua kelas dan nilai ikut pindah.'}
$("licToDaftar").onclick=function(){licChoice("email",{})};
$("licBack").onclick=function(){licView("a");lmsg("");licGsi()};
$("licGo").onclick=function(){var btn=this,em=$("licEm").value.trim(),pw=$("licPw").value;if(!API_URL){lmsg("Server belum terhubung.","#ff8a80");return}if(!em||!pw){lmsg("Isi email dan kata sandi.","#ff8a80");return}
 btn.disabled=true;lmsg("Memeriksa...");api("/akun/masuk",{email:em,sandi:pw,dev:devEnsure()}).then(function(r){btn.disabled=false;licDone(r)},function(e){btn.disabled=false;lmsg("❌ "+e.message,"#ff8a80")})};
$("licPw").addEventListener("keydown",function(e){if(e.key==="Enter")$("licGo").click()});
$("licDaftar").onclick=function(){var btn=this,b={cara:licCara,dev:devEnsure(),nama:$("licBNama").value.trim(),wa:$("licBWa").value.trim(),sekolah:$("licBSek").value.trim()};
 if(licCara==="google"){if(!GCRED){lmsg("Silakan klik tombol Google lagi.","#ff8a80");return}b.cred=GCRED}
 else{b.email=$("licBEmail").value.trim();b.sandi=$("licBPw").value;if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(b.email)){lmsg("Alamat email tidak valid.","#ff8a80");return}if(b.sandi.length<8){lmsg("Kata sandi minimal 8 karakter.","#ff8a80");return}if(b.sandi!==$("licBPw2").value){lmsg("Ulangi kata sandi belum sama.","#ff8a80");return}}
 if(b.nama.length<2||b.wa.replace(/\D/g,"").length<10){lmsg("Isi nama lengkap dan nomor WhatsApp yang benar.","#ff8a80");return}
 if(licJ()!=="lama"&&!(window.ZUPERVERSE_CONFIG||{}).independentBackend){b.bukti=$("licBBukti").value.trim();if(b.bukti.length<4){lmsg("Isi bukti pembelian: email atau nomor WA yang dipakai saat membeli di Lynk. Belum membeli? Tekan Kembali lalu pilih 🛒 Belum, saya mau beli dulu.","#ff8a80");return}}
 if(licJ()==="lama"){var kd=$("licBKode").value.trim().toUpperCase();if(!kd){lmsg("Isi kode akses lama Anda.","#ff8a80");return}b.lama={kode:kd,wa:$("licBWaL").value.trim()||b.wa}}
 btn.disabled=true;lmsg(b.lama?"Memindahkan akun lama...":"Mendaftarkan akun...");
 api("/akun/daftar",b).then(function(r){btn.disabled=false;if(b.lama)LIC=null;licDone(r);if(b.lama)toast("⭐ Akun lama berhasil dipindahkan. Semua kelas dan nilai tetap ada.",5000)},function(e){btn.disabled=false;lmsg("❌ "+e.message,"#ff8a80")})};
function recheckLic(){if(!LIC||!API_URL)return;
 if(LIC.sess){api("/akun/saya",{lic:licBody()}).then(function(r){if(!LIC)return;var was=LIC.st;licSave(r.guru);licBanner();if(LIC.st==="menunggu"&&$("ovGuru").classList.contains("show")){$("ovGuru").classList.remove("show");openAkun()}else if(was==="menunggu"&&LIC.st!=="menunggu"&&$("ovAkun").classList.contains("show"))akRender(r)},function(e){if(e.status===403&&e.kode!=="habis"&&e.kode!=="menunggu")licFail(e.message,e.kode)});return}
 $("ovGuru").classList.remove("show");openGuru()}
function licFail(m,kode){if(kode==="habis"){if(LIC){LIC.st="habis";lsSet(LS_LIC,LIC);licBanner()}toast("⛔ "+m,6000);return}if(kode==="menunggu"){if(LIC){LIC.st="menunggu";lsSet(LS_LIC,LIC)}$("ovGuru").classList.remove("show");openAkun();return}
 LIC=null;lsSet(LS_LIC,null);["ovGuru","ovDash","ovAkun"].forEach(function(i){$(i).classList.remove("show")});openLic(m)}
/* spanduk status langganan di atas Mode Guru */
function licBanner(){var el=$("gLicBan");if(!el)return;var h="";if(!LIC){h='<div class="gban free"><span>🆓 <b>Versi gratis</b>: buat soal &amp; coba main sepuasnya. Membagikan ke murid perlu akun guru aktif.</span><span style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn sm green" data-ban="fplay">🎮 Coba main</button><button class="btn sm yel" data-ban="fsub">⭐ Aktivasi Guru</button></span></div>'}else if(LIC&&!PDP_ON){var st=LIC.st;
 if(!LIC.sess)h='<div class="gban inf"><span>⭐ Login dengan kode akses akan dihentikan. Pindahkan akun Anda ke login Google/email (sekitar 1 menit, semua kelas dan nilai tetap utuh).</span><button class="btn sm yel" data-ban="pindah">Pindahkan akun</button></div>';
 else if(st==="segera")h='<div class="gban mid"><span>⏳ Langganan berakhir dalam <b>'+sisaHari(LIC.sampai)+' hari</b> ('+fmtTgl(LIC.sampai)+').</span><button class="btn sm yel" data-ban="akun">Perpanjang</button></div>';
 else if(st==="tenggang")h='<div class="gban mid"><span>⚠️ Langganan berakhir '+fmtTgl(LIC.sampai)+'. Masa tenggang sampai <b>'+fmtTgl(LIC.tg)+'</b>.</span><button class="btn sm yel" data-ban="akun">Perpanjang</button></div>';
 else if(st==="habis")h='<div class="gban no"><span>⛔ Langganan berakhir. Nilai dan rekap tetap bisa dilihat dan diunduh. Untuk membuat kelas, tantangan, dan mengubah soal, perpanjang langganan.</span><button class="btn sm yel" data-ban="akun">Perpanjang</button></div>'}
 el.innerHTML=h}
$("gLicBan").onclick=function(e){var b=e.target.closest("[data-ban]");if(!b)return;if(b.dataset.ban==="fplay"){fPlay();return}if(b.dataset.ban==="fsub"){fSub();return}if(b.dataset.ban==="akun")openAkun();else{$("ovGuru").classList.remove("show");openLic("",{kode:LIC&&LIC.kode,nama:LIC&&LIC.nama})}};
$("gAkun").onclick=function(){if(isFree()){fSub();return}openAkun()};
/* ⭐ Akun & Langganan */
function openAkun(){$("ovAkun").classList.add("show");if(mode==="play")setMode("menu");var el=$("akBody");
 if(!LIC){el.innerHTML='<div class="mut">Belum masuk.</div>';return}
 if(!LIC.sess){el.innerHTML='<div class="note">Anda masih memakai <b>kode akses lama</b>. Pindahkan ke akun Google/email agar akun lebih aman dan langganan bisa diperpanjang dengan mudah. Semua kelas, murid, nilai, dan soal tetap utuh.</div><div class="row"><button class="btn yel" id="akPindah">⭐ Pindahkan akun sekarang</button><button class="btn sm red" id="akOut">🚪 Logout</button></div>';
  $("akPindah").onclick=function(){$("ovAkun").classList.remove("show");$("ovGuru").classList.remove("show");openLic("",{kode:LIC.kode,nama:LIC.nama})};$("akOut").onclick=licOut;return}
 el.innerHTML='<div class="mut">Memuat...</div>';
 api("/akun/saya",{lic:licBody()}).then(function(r){licSave(r.guru);licBanner();akRender(r)},function(e){if(e.status===403&&e.kode==="lisensi"){$("ovAkun").classList.remove("show");licFail(e.message);return}el.innerHTML='<div class="mut">❌ '+esc(e.message)+'</div><div class="row"><button class="btn sm" id="akRe">🔄 Coba lagi</button></div>';$("akRe").onclick=openAkun})}
function akRender(r){var g=r.guru,S=r.setelan||{},st=AK_ST[g.status]||[g.status,"ak-mid"],el=$("akBody"),wa=S.wa||waAdm(),h="";
 var waTxt=function(t){return"https://wa.me/"+wa+"?text="+encodeURIComponent(t)};
 h+='<div class="scard" style="margin-top:0"><div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:center"><div><div style="font-weight:900;font-size:17px">'+esc(g.nama)+'</div><div class="mut" style="font-size:13px">'+esc(g.email)+(g.google?' • Google':'')+'</div></div><span class="akst '+st[1]+'">'+st[0]+'</span></div>';
 if(g.sampai>0)h+='<div class="akrow"><span>Berlaku sampai</span><b>'+fmtTgl(g.sampai)+(sisaHari(g.sampai)>0?' (sisa '+sisaHari(g.sampai)+' hari)':'')+'</b></div>';
 if(g.status==="tenggang"||g.status==="habis")h+='<div class="akrow"><span>Masa tenggang</span><b>sampai '+fmtTgl(g.tenggang_sampai)+'</b></div>';
 h+='<div class="akrow"><span>Kelas</span><b>'+g.kelas+' dari '+g.maks_kelas+'</b></div><div class="akrow"><span>Perangkat</span><b>'+g.perangkat+' dari '+g.maks_perangkat+'</b></div></div>';
 if(g.status==="menunggu"&&(window.ZUPERVERSE_CONFIG||{}).independentBackend){h+='<div class="scard"><div class="sh">⏳ Menunggu aktivasi pengelola</div><p>Akun Anda sudah dibuat di server sekolah. Hubungi pengelola untuk mengaktifkan Mode Guru melalui panel admin, lalu tekan tombol berikut.</p><button class="btn yel" id="akCek">🔄 Cek status</button></div>';}
 else if(g.status==="menunggu"){
  h+='<div class="scard"><div class="sh">⏳ Akun menunggu aktivasi</div><div class="note" style="margin:0 0 8px">Mode Guru khusus pelanggan. Akun diaktifkan admin <b>setelah pembayaran langganan dicek</b>. Belum membeli? Tekan 🛒 Bayar atau hubungi admin.</div><ol style="margin:4px 0 0 18px;padding:0;line-height:1.6;font-size:14px"><li>Lakukan pembayaran langganan'+(S.harga?': <b>'+esc(S.harga)+'</b>':'')+'.'+(S.info?'<div class="mut" style="white-space:pre-line;font-size:13px">'+esc(S.info)+'</div>':'')+'</li><li>Kirim konfirmasi ke admin lewat WhatsApp.</li><li>Setelah admin mengaktifkan, klik <b>Cek status</b>. Mode Guru langsung terbuka.</li></ol>';
  h+='<div class="row"><a class="btn green" target="_blank" rel="noopener" href="'+esc(waTxt("Halo admin ZuperVerse, saya sudah mendaftar Mode Guru dan ingin mengaktifkan langganan.\nNama: "+g.nama+"\nEmail: "+g.email+"\nBukti pembayaran saya lampirkan."))+'">💬 Konfirmasi via WhatsApp</a>'+'<a class="btn yel" target="_blank" rel="noopener" href="'+esc(S.beli||LYNK_URL)+'">🛒 Bayar</a>'+'<button class="btn" id="akCek">🔄 Cek status</button></div></div>'}
 else if(g.status!=="seumur"&&g.status!=="lama"){
  h+='<div class="scard"><div class="sh">🔁 Perpanjang langganan</div><div class="mut" style="font-size:13px">Perpanjangan dihitung dari tanggal habis, jadi memperpanjang lebih awal tidak mengurangi masa aktif.'+(S.harga?' Biaya: <b>'+esc(S.harga)+'</b>.':'')+'</div>'+(S.info?'<div class="mut" style="white-space:pre-line;font-size:13px;margin-top:6px">'+esc(S.info)+'</div>':'');
  h+='<div class="row"><a class="btn green" target="_blank" rel="noopener" href="'+esc(waTxt("Halo admin ZuperVerse, saya ingin memperpanjang langganan Mode Guru 1 tahun.\nNama: "+g.nama+"\nEmail: "+g.email+(g.sampai>0?"\nBerlaku sampai: "+fmtTgl(g.sampai):"")))+'">💬 Perpanjang via WhatsApp</a>'+'<a class="btn yel" target="_blank" rel="noopener" href="'+esc(S.beli||LYNK_URL)+'">🛒 Bayar</a>'+'</div></div>'}
 if(r.bayar&&r.bayar.length)h+='<div class="scard"><div class="sh">🧾 Riwayat pembayaran</div>'+r.bayar.map(function(b){return'<div class="akrow"><span>'+fmtTgl(b.t)+' • '+esc(b.ket||"")+'</span><b>'+(b.nominal?"Rp"+Number(b.nominal).toLocaleString("id-ID"):"-")+'</b></div>'}).join("")+'</div>';
 h+='<div class="scard"><div class="sh">👤 Profil</div><label class="fld">Nama lengkap<input class="gin" id="akNama" maxlength="60" value="'+esc(g.nama)+'"></label><label class="fld" style="margin-top:6px">Nomor WhatsApp<input class="gin" id="akWa" maxlength="20" inputmode="tel" value="'+esc(g.wa)+'"></label><label class="fld" style="margin-top:6px">Nama sekolah<input class="gin" id="akSek" maxlength="80" value="'+esc(g.sekolah||"")+'"></label><div class="row"><button class="btn sm" id="akSimpan">💾 Simpan profil</button></div></div>';
 h+='<div class="scard"><div class="sh">🔒 '+(g.sandi?'Ganti kata sandi':'Buat kata sandi (opsional)')+'</div>'+(g.sandi?'':'<div class="mut" style="font-size:12px">Agar bisa masuk dengan email + kata sandi tanpa Google.</div>')+(g.sandi?'<label class="fld">Kata sandi lama<span class="pwbox"><input class="gin" id="akPwL" type="password" autocomplete="current-password"><button type="button" class="eyeb">👁️</button></span></label>':'')+'<label class="fld" style="margin-top:6px">Kata sandi baru (minimal 8 karakter)<span class="pwbox"><input class="gin" id="akPwB" type="password" autocomplete="new-password"><button type="button" class="eyeb">👁️</button></span></label><div class="row"><button class="btn sm" id="akPwGo">🔒 Simpan kata sandi</button></div></div>';
 h+='<div id="akMsg" class="mut" style="min-height:18px;margin-top:6px"></div><div class="row" style="justify-content:space-between">'+(g.status!=="menunggu"?'<button class="btn yel" id="akGuru">👩‍🏫 Buka Mode Guru</button>':'<span></span>')+'<button class="btn sm red" id="akOut">🚪 Logout</button></div>';
 el.innerHTML=h;var am=function(t,c){$("akMsg").textContent=t;$("akMsg").style.color=c||"var(--mut)"};
 if($("akCek"))$("akCek").onclick=function(){am("Memeriksa...");api("/akun/saya",{lic:licBody()}).then(function(x){licSave(x.guru);if(x.guru.status==="menunggu"){akRender(x);$("akMsg").textContent="Belum diaktifkan. Hubungi pengelola situs untuk aktivasi akun.";return}toast("✅ Akun sudah aktif. Selamat datang!");$("ovAkun").classList.remove("show");openGuruPanel()},function(e){am("❌ "+e.message,"#ff8a80")})};
 if($("akGuru"))$("akGuru").onclick=function(){$("ovAkun").classList.remove("show");if(!$("ovGuru").classList.contains("show"))openGuruPanel()};
 $("akOut").onclick=licOut;
 $("akSimpan").onclick=function(){api("/akun/ubah",{lic:licBody(),nama:$("akNama").value.trim(),wa:$("akWa").value.trim(),sekolah:$("akSek").value.trim()}).then(function(){LIC.nama=$("akNama").value.trim();lsSet(LS_LIC,LIC);am("✔ Profil tersimpan.","#7dffa0")},function(e){am("❌ "+e.message,"#ff8a80")})};
 $("akPwGo").onclick=function(){var b=$("akPwB").value;if(b.length<8){am("Kata sandi baru minimal 8 karakter.","#ff8a80");return}api("/akun/sandi",{lic:licBody(),lama:$("akPwL")?$("akPwL").value:"",baru:b}).then(function(){am("✔ Kata sandi tersimpan.","#7dffa0");$("akPwB").value="";if($("akPwL"))$("akPwL").value=""},function(e){am("❌ "+e.message,"#ff8a80")})}}
$("akClose").onclick=function(){$("ovAkun").classList.remove("show");if(mode==="menu"&&!$("ovGuru").classList.contains("show"))setMode("play")};
function needPin(c,gk,fn){if(c.pin){fn();return}zDlg({ic:"🔒",t:"PIN guru",m:"Masukkan PIN guru untuk kelas "+c.nama+".",input:true,pw:true,num:true,ph:"PIN 6 angka",ok:"Lanjut",cb:function(v){if(!v||!String(v).trim())return;c.pin=String(v).trim();lsSet(LS_GK,gk);fn()}})}
function syncGK(){if(gkSynced||!LIC||!API_URL)return;gkSynced=true;api("/guru/kelas",{lic:licBody()}).then(function(r){var gk=lsGet(LS_GK,[]),ch=false;LIC.maks=r.maks_kelas;lsSet(LS_LIC,LIC);
 r.kelas.forEach(function(k){if(!gk.some(function(c){return c.kode===k.kode})){gk.push({kode:k.kode,nama:k.nama,pin:""});ch=true}});if(ch){lsSet(LS_GK,gk);if(gTab==="kelas"&&$("ovGuru").classList.contains("show"))renderGuru()}},function(e){gkSynced=false;if(e.status===403)licFail(e.message,e.kode)})}
$("licClose").onclick=function(){$("ovLic").classList.remove("show");if(mode==="menu")setMode("play")};
$("gLogout").onclick=function(){licOut()};


var DB_=null,dTimer=null,dState={kode:"",pin:"",tab:"murid",mapel:"",kktp:lsGet("zd2_kktp",75),murid:null,dunia:"",paket:"",per:0,tedit:null,tf:null,topen:null};
function avg(a){return a.length?Math.round(a.reduce(function(x,y){return x+y},0)/a.length):null}
function fmtT(t){return new Date(t).toLocaleString("id-ID",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}
function openDash(kode,pin,saveGK,opt){$("ovGuru").classList.remove("show");$("ovDash").classList.add("show");dState.kode=kode;dState.pin=pin;dState.murid=null;dState.mapel="";dState.tedit=null;dState.tf=null;dState.topen=null;DB_=null;if(opt){if(opt.tab)dState.tab=opt.tab;if(opt.mode&&TMODE[opt.mode])dState.tf=Object.assign({mode:opt.mode},TMODE[opt.mode].tf)}
 $("dTitle").textContent="📊 Dashboard Kelas";$("dSub").textContent="Memuat data...";$("dTiles").innerHTML="";$("dBody").innerHTML="";loadDash(saveGK);
 clearInterval(dTimer);dTimer=setInterval(function(){if($("ovDash").classList.contains("show")&&!document.hidden&&dState.tab!=="live")loadDash(false,true)},180000)}
function loadDash(saveGK,quiet){return api("/dashboard",{lic:licBody(),kode:dState.kode,pin:dState.pin}).then(function(r){r.murid=r.murid||[];r.blok=r.murid.filter(function(u){return u.blokir});r.murid=r.murid.filter(function(u){return!u.blokir});DB_=r;if(quiet&&(dState.tab==="live"||dState.tab==="tan"&&(dState.tf||dState.tedit)))return;
  if(saveGK){var gk=lsGet(LS_GK,[]);if(!gk.some(function(c){return c.kode===r.kelas.kode})){gk.unshift({kode:r.kelas.kode,nama:r.kelas.nama,pin:dState.pin});lsSet(LS_GK,gk)}}renderDash()},
 function(e){if(!quiet)$("dSub").textContent="❌ "+e.message})}
$("dClose").onclick=function(){$("ovDash").classList.remove("show");clearInterval(dTimer);lvClose();if(PDP_ON){pdpOff();return}if(draft){gTab="kelas";renderGuru();$("ovGuru").classList.add("show")}};
$("dRefresh").onclick=function(){$("dSub").textContent="Memuat ulang...";loadDash(false)};
function dModel(){DF=dFilt();var r=DB_,pk;try{pk=validate(clone(r.paket))}catch(e){pk={mapel:[]}}
 var ms=pk.mapel.map(function(m){return{id:m.id,nama:m.nama,m:m}});
 DF.sesi.forEach(function(s){if(!ms.some(function(x){return x.id===s[2]}))ms.push({id:s[2],nama:String(s[2]).indexOf("_dtk:")===0?String(s[3]||"🕵️ Detektif"):String(s[2]).indexOf("_psr:")===0?"🏪 "+String(s[3]||"Pasar Nusantara"):s[3]+" (paket lama)",m:null})});
 var sel=dState.mapel,inSel=function(id){return!sel||id===sel};
 var murid=r.murid.map(function(u){return{id:u.id,nama:u.nama,absen:u.absen,aktif:u.aktif,per:{},sesi:[],mat:0}}),byId={};murid.forEach(function(u){byId[u.id]=u});
 DF.sesi.slice().sort(function(a,b){return a[8]-b[8]}).forEach(function(s){var u=byId[s[1]];if(!u)return;var o={mapel:s[2],nilai:s[6],benar:s[4],total:s[5],t:s[8]};u.sesi.push(o);
  var p=u.per[s[2]]||(u.per[s[2]]={first:o.nilai,best:o.nilai,n:0,list:[]});p.n++;p.best=Math.max(p.best,o.nilai);p.list.push(o.nilai)});
 DF.materi.forEach(function(x){var u=byId[x[0]];if(u&&inSel(x[1]))u.mat++});
 murid.forEach(function(u){var ks=Object.keys(u.per).filter(inSel);u.tried=ks.length>0;u.attempts=ks.reduce(function(a,k){return a+u.per[k].n},0);
  u.first=u.tried?avg(ks.map(function(k){return u.per[k].first})):null;u.best=u.tried?avg(ks.map(function(k){return u.per[k].best})):null;u.tuntas=u.best!=null&&u.best>=dState.kktp});
 return{ms:ms,murid:murid,byId:byId,pk:pk}}
function dItems(M,sel){var first={},items={},lookup={};
 M.pk.mapel.forEach(function(m){m.soal.forEach(function(s){lookup[m.id+"|"+skey(s)]=s})});
 DF.jawaban.slice().sort(function(a,b){return a[8]-b[8]}).forEach(function(j){if(sel&&j[1]!==sel)return;if(String(j[1]).indexOf("_dtk:")===0||String(j[1]).indexOf("_psr:")===0)return;var key=j[1]+"|"+j[2],fk=key+"|"+j[0];if(first[fk])return;first[fk]=1;
  var it=items[key]||(items[key]={mapel:j[1],q:j[3],kunci:j[5],n:0,ok:0,opt:{},det:0,who:[],s:lookup[key]||null});it.n++;it.ok+=j[6];it.opt[j[4]]=(it.opt[j[4]]||0)+1;it.det+=j[7];it.who.push([j[0],j[6]])});
 var tot={};Object.keys(items).forEach(function(k){items[k].who.forEach(function(w){var t=tot[w[0]]||(tot[w[0]]={ok:0,n:0});t.ok+=w[1];t.n++})});
 var ranked=Object.keys(tot).sort(function(a,b){return tot[b].ok/tot[b].n-tot[a].ok/tot[a].n}),g=Math.max(1,Math.round(ranked.length*0.27)),up={},lo={};
 if(ranked.length>=4){ranked.slice(0,g).forEach(function(id){up[id]=1});ranked.slice(-g).forEach(function(id){lo[id]=1})}
 return Object.keys(items).map(function(k){var it=items[k];it.p=it.ok/it.n;it.det=it.det/it.n;
  var U=it.who.filter(function(w){return up[w[0]]}),L=it.who.filter(function(w){return lo[w[0]]}),sm=function(a){return a.reduce(function(x,w){return x+w[1]},0)/a.length};
  it.D=(U.length&&L.length)?sm(U)-sm(L):null;
  it.strong=Object.keys(it.opt).filter(function(o){return+o>=0&&+o!==it.kunci&&it.opt[o]>(it.opt[it.kunci]||0)}).map(Number);return it}).sort(function(a,b){return a.p-b.p})}
function pLabel(p){return p>0.7?["Mudah","b-ok"]:p>=0.3?["Sedang","b-mid"]:["Sukar","b-no"]}
function dLabel(D){if(D==null)return["Data kurang","b-na"];return D>=0.4?["Sangat baik","b-ok"]:D>=0.3?["Baik","b-ok"]:D>=0.2?["Cukup","b-mid"]:["Perlu revisi","b-no"]}
function mapName(M,id){var m=M.ms.filter(function(x){return x.id===id})[0];return m?m.nama:id}
function renderDash(){if(!DB_)return;var r=DB_,M=dModel(),k=r.kelas,mu=M.murid,K=dState.kktp,sel=dState.mapel;
 $("dTitle").textContent="📊 "+k.nama;if(PDP_ON&&dState.tab==="pdp")dState.tab="murid";
 $("dSub").innerHTML=(DB_.peran&&DB_.peran.pendamping?"<b style='color:#fde68a'>👥 Mode guru pendamping • "+esc(DB_.peran.pendamping)+"</b> • ":"")+"Kode kelas <b style='color:var(--yel);letter-spacing:1px'>"+esc(k.kode)+"</b>"+(k.guru?" • "+esc(k.guru):"")+" • Diperbarui pukul "+new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"})+" (otomatis tiap 3 menit, atau tekan ↻ Muat ulang)"+(dState.dunia||dState.per||dState.paket?" • <b style='color:#fde68a'>Filter: "+esc(filtLabel())+"</b>":"")+(function(){var n=DB_.sesi.filter(function(s){return s[13]}).length;return n?" • <span title='Murid mengerjakan saat offline, sebelum soal baru sempat terunduh' style='color:#fca5a5'>🕓 "+n+" nilai dengan soal versi lama</span>":""})();
 var dws={};DB_.sesi.forEach(function(s){if(s[9])dws[s[9]]=1});$("dDunia").innerHTML='<option value="">Semua dunia</option>'+WORLDS.filter(function(w){return dws[w.id]||w.id===dState.dunia}).map(function(w){return'<option value="'+w.id+'"'+(w.id===dState.dunia?" selected":"")+'>'+w.ic+" "+esc(w.nama)+'</option>'}).join("");$("dPer").value=String(dState.per||0);
 var pks={},pre=false,pn=DB_.pnama||{};DB_.sesi.forEach(function(s){if(s[12])pks[s[12]]=1;else pre=true});if(DB_.kelas.paket_kode)pks[DB_.kelas.paket_kode]=1;
 $("dPaket").innerHTML='<option value="">Semua paket</option>'+Object.keys(pks).map(function(k){return'<option value="'+esc(k)+'"'+(k===dState.paket?" selected":"")+'>'+(k===DB_.kelas.paket_kode?"▶ ":"")+esc(pn[k]||("Paket "+k))+'</option>'}).join("")+(pre?'<option value="-"'+(dState.paket==="-"?" selected":"")+'>Sebelum riwayat paket</option>':'');
 $("dMapel").innerHTML='<option value="">Semua mapel</option>'+M.ms.map(function(m){return'<option value="'+esc(m.id)+'"'+(m.id===sel?" selected":"")+'>'+esc(m.nama)+'</option>'}).join("");$("dKktp").value=K;
 var tried=mu.filter(function(u){return u.tried}),tu=tried.filter(function(u){return u.tuntas}).length,bests=tried.map(function(u){return u.best});
 var nj=DF.jawaban.filter(function(j){return!sel||j[1]===sel}).length,nm=mu.reduce(function(a,u){return a+u.mat},0);
 $("dTiles").innerHTML=[[mu.length,"Murid terdaftar"],[tried.length+" / "+mu.length,"Sudah mengerjakan"],[bests.length?avg(bests):"-","Rata-rata nilai terbaik"],[tried.length?Math.round(tu/tried.length*100)+"%":"-","Tuntas (KKTP "+K+")"],[nj,"Jawaban tercatat"],[nm,"Materi dibuka"]].map(function(t){return'<div class="tile"><b>'+t[0]+'</b><span>'+t[1]+'</span></div>'}).join("");
 Array.prototype.forEach.call(document.querySelectorAll("[data-dt]"),function(b){b.classList.toggle("on",b.dataset.dt===dState.tab)});
 var h="";
 if(dState.tab==="murid"){
  var du=dState.murid&&M.byId[dState.murid];
  if(du){h+='<div class="scard" style="margin-top:0;margin-bottom:10px"><div class="sh"><span>👤 '+esc(du.nama)+' • absen '+du.absen+'</span><span><button class="btn sm yel" data-dact="print" data-mid="'+du.id+'">🖨 Cetak rapor</button> <button class="btn sm gray" data-dact="closemu">Tutup</button></span></div>';
   var ks=Object.keys(du.per);h+=ks.length?ks.map(function(kk){var p=du.per[kk];return'<div class="ostat" style="grid-template-columns:minmax(120px,1fr) 2fr 90px"><span>'+esc(mapName(M,kk))+'</span><span>'+p.list.join(" → ")+'</span><b>Terbaik '+p.best+'</b></div>'}).join(""):'<div class="mut">Belum mengerjakan kuis.</div>';
   var rs=DF.sesi.filter(function(s){return s[1]===du.id}).slice(0,12);if(rs.length)h+='<h4 style="margin:12px 0 4px">🕘 Riwayat pengerjaan terakhir</h4>'+rs.map(function(s){return'<div class="ostat" style="grid-template-columns:110px minmax(120px,1fr) minmax(100px,1fr) 70px"><span class="mut">'+fmtT(s[8])+'</span><span>'+(s[10]?'⚡ ':'')+esc(s[3])+'</span><span class="mut">'+esc(paketName(s[12]||"-"))+(s[13]?' <span class="badge b-no" title="Dikerjakan dengan soal versi lama (murid sedang offline saat soal diganti)">🕓 soal lama</span>':'')+'</span><b>'+s[6]+'</b></div>'}).join("");
   h+='</div>'}
  h+=kunciBar();dState.msel=dState.msel||{};var nSel=mu.filter(function(u){return dState.msel[u.id]}).length;
  h+='<div class="row own" style="margin:0 0 6px;align-items:center"><label class="mut" style="display:flex;gap:6px;align-items:center;font-weight:800;font-size:13px"><input type="checkbox" data-mselall'+(mu.length&&nSel===mu.length?" checked":"")+'> Pilih semua</label><button class="btn sm red" data-dact="mdelsel"'+(nSel?'':' disabled')+'>🗑 Hapus terpilih ('+nSel+')</button><span class="mut" style="font-size:12px">Centang murid yang salah daftar atau ganti HP, lalu hapus sekaligus. Murid bisa langsung masuk lagi dengan nomor absen yang sama.</span></div>';
  h+='<div class="tbl-wrap"><table class="dt"><tr><th class="own" style="width:30px"></th><th>Absen</th><th>Nama</th><th>Percobaan</th><th>Nilai awal</th><th>Nilai terbaik</th><th>Status</th><th>Materi dibuka</th><th>Terakhir aktif</th><th></th></tr>';
  mu.forEach(function(u){var st=!u.tried?'<span class="badge b-na">Belum mengerjakan</span>':u.tuntas?'<span class="badge b-ok">✓ Tuntas</span>':'<span class="badge b-no">! Belum tuntas</span>';
   h+='<tr class="cl" data-mu="'+u.id+'"><td class="own"><input type="checkbox" data-msel="'+u.id+'"'+(dState.msel[u.id]?" checked":"")+'></td><td>'+u.absen+'</td><td><b>'+esc(u.nama)+'</b></td><td>'+u.attempts+'</td><td>'+(u.first==null?"-":u.first)+'</td><td><b>'+(u.best==null?"-":u.best)+'</b></td><td>'+st+'</td><td>'+u.mat+'</td><td>'+(u.aktif?fmtT(u.aktif):"-")+'</td><td style="white-space:nowrap"><button class="btn sm red" data-dact="mkick" data-mid="'+u.id+'" title="Keluarkan murid ini dari kelas">🚫 Keluarkan</button> <button class="btn sm gray own" data-del="'+u.id+'" title="Hapus murid ini beserta nilainya">🗑</button></td></tr>'});
  if(!mu.length)h+='<tr><td colspan="10" class="mut">Belum ada murid. Bagikan link kelas ke murid.</td></tr>';
  h+='</table></div>'+blokList()+'<div style="display:none"></div><div class="mut" style="margin-top:6px;font-size:12px">Nilai awal = nilai percobaan pertama (gambaran kemampuan awal). Nilai terbaik = nilai tertinggi dari semua percobaan. Klik baris murid untuk melihat perkembangannya.</div>'}
 else if(dState.tab==="mapel"){
  h='<div class="tbl-wrap"><table class="dt"><tr><th>Mapel</th><th>Peserta</th><th>Rata-rata terbaik</th><th></th><th>Tertinggi</th><th>Terendah</th><th>Tuntas</th><th>Materi dibuka</th></tr>';
  M.ms.forEach(function(m){var vals=mu.filter(function(u){return u.per[m.id]}).map(function(u){return u.per[m.id].best}),a=avg(vals),tn=vals.filter(function(v){return v>=K}).length,matN=m.m&&m.m.materi?m.m.materi.length:0,vs={};
   DF.materi.forEach(function(x){if(x[1]===m.id)vs[x[0]]=1});
   h+='<tr><td><b>'+esc(m.nama)+'</b></td><td>'+vals.length+' / '+mu.length+'</td><td><b>'+(a==null?"-":a)+'</b></td><td style="min-width:150px">'+(a==null?"":'<div class="hbar" title="Rata-rata '+a+', KKTP '+K+'"><i style="width:'+a+'%"></i><span class="kk" style="left:'+K+'%"></span></div>')+'</td><td>'+(vals.length?Math.max.apply(null,vals):"-")+'</td><td>'+(vals.length?Math.min.apply(null,vals):"-")+'</td><td>'+(vals.length?Math.round(tn/vals.length*100)+"%":"-")+'</td><td>'+(matN?Object.keys(vs).length+" murid":'<span class="mut">Tidak ada materi</span>')+'</td></tr>'});
  h+='</table></div><div class="mut" style="margin-top:6px;font-size:12px">Garis kuning pada batang menandai batas KKTP ('+K+').</div>'}
 else if(dState.tab==="soal"){
  var its=dItems(M,sel);
  if(!its.length)h='<div class="mut">Belum ada jawaban'+(sel?" untuk mapel ini":"")+'.</div>';
  else{h='<div class="mut" style="margin-bottom:10px;line-height:1.5">Dihitung dari jawaban <b>pertama</b> setiap murid. <b>Tingkat kesukaran</b> = persentase murid yang menjawab benar (Mudah di atas 70%, Sedang 30-70%, Sukar di bawah 30%). <b>Daya beda</b> membandingkan 27% murid kelompok atas dan bawah (perlu minimal 4 murid). Soal diurutkan dari yang tersulit.</div>';
   its.forEach(function(it){var pl=pLabel(it.p),dl=dLabel(it.D),opts=it.s?(qChoice(it.s)?it.s.opsi:["Benar • kunci: "+keyText(it.s),"Salah"]):null,nOpt=opts?opts.length:Math.max(4,it.kunci+1);
    h+='<div class="item"><div class="mut" style="font-size:12px">'+esc(mapName(M,it.mapel))+' • '+it.n+' murid menjawab • rata-rata '+it.det.toFixed(1)+' detik</div><div class="iq">'+esc(it.q)+'</div><div class="row" style="margin-top:6px"><span class="badge '+pl[1]+'">Kesukaran: '+pl[0]+' ('+Math.round(it.p*100)+'% benar)</span><span class="badge '+dl[1]+'">Daya beda: '+dl[0]+(it.D!=null?" ("+it.D.toFixed(2)+")":"")+'</span></div>';
    for(var o=0;o<nOpt;o++){var c=it.opt[o]||0,pc=Math.round(c/it.n*100),key=o===it.kunci;
     h+='<div class="ostat'+(key?" key":"")+'"><span>'+String.fromCharCode(65+o)+'. '+esc(opts?opts[o]:"Pilihan "+String.fromCharCode(65+o))+(key?' <span class="badge b-ok">✓ kunci</span>':(it.strong.indexOf(o)>=0?' <span class="badge b-no">⚠ dipilih lebih banyak dari kunci</span>':''))+'</span><div class="hbar" title="'+c+' murid ('+pc+'%)"><i style="width:'+pc+'%"></i></div><span>'+c+' ('+pc+'%)</span></div>'}
    if(it.opt[-1]){var tp=Math.round(it.opt[-1]/it.n*100);h+='<div class="ostat"><span>⏰ Waktu habis</span><div class="hbar"><i style="width:'+tp+'%;background:#9ca3af"></i></div><span>'+it.opt[-1]+' ('+tp+'%)</span></div>'}
    h+='</div>'})}}
 else if(dState.tab==="tan"){h=tanTab(M)}
 else if(dState.tab==="cert"){h=certTab(M)}
 else if(dState.tab==="pdp"){h=pdpTab()}
 else if(dState.tab==="rank"){h=rankTab(M)}
 else if(dState.tab==="rekap"){h=rekapTab(M)}
 else if(dState.tab==="anal"){h=analisisTab(M)}
 else if(dState.tab==="kuasa"){h=kuasaTab(M)}
 else if(dState.tab==="live"){h=liveTab()}
 else if(dState.tab==="tren"){h=trenTab(M)}
 else{
  var its2=dItems(M,sel),low=mu.filter(function(u){return u.tried&&!u.tuntas}).sort(function(a,b){return a.best-b.best}),none=mu.filter(function(u){return!u.tried}),high=mu.filter(function(u){return u.best!=null&&u.best>=90});
  REM_LOW={nama:low.map(function(u){return u.nama}),mapel:sel?mapName(M,sel):""};h='<div class="rec"><h4>🎯 Perlu bimbingan (remedial)</h4>'+(low.length?low.map(function(u){return esc(u.nama)+" ("+u.best+")"}).join(", ")+'<br><span class="mut">Saran: ajak mempelajari ulang materi di gedung terkait, bahas soal yang paling sering salah, lalu minta mengulang kuis. Di HP murid, soal yang salah otomatis muncul lagi lewat 🔁 Latihan Ulang sampai dikuasai.</span><div class="row"><button class="btn sm green" data-dact="remwa">📤 Kirim ajakan latihan ulang (WA)</button></div>':'Tidak ada murid di bawah KKTP.')+'</div>';
  h+='<div class="rec"><h4>⏳ Belum mengerjakan</h4>'+(none.length?none.map(function(u){return esc(u.nama)}).join(", "):'Semua murid sudah mengerjakan.')+'</div>';
  h+='<div class="rec"><h4>🚀 Siap pengayaan</h4>'+(high.length?high.map(function(u){return esc(u.nama)+" ("+u.best+")"}).join(", ")+'<br><span class="mut">Saran: berikan soal tantangan (HOTS) atau libatkan sebagai tutor sebaya.</span>':'Belum ada murid dengan nilai 90 ke atas.')+'</div>';
  var hard=its2.filter(function(i){return i.p<0.5}).slice(0,6);
  h+='<div class="rec"><h4>📚 Soal yang perlu dibahas ulang di kelas</h4>'+(hard.length?'<ol style="margin:0;padding-left:20px">'+hard.map(function(i){return'<li>'+esc(i.q)+' <span class="mut">('+Math.round(i.p*100)+'% benar)</span></li>'}).join("")+'</ol>':'Tidak ada soal dengan persentase benar di bawah 50%.')+'</div>';
  var rev=its2.filter(function(i){return(i.D!=null&&i.D<0.2&&i.n>=4)||i.strong.length});
  h+='<div class="rec"><h4>🛠️ Soal yang sebaiknya ditinjau</h4>'+(rev.length?'<ol style="margin:0;padding-left:20px">'+rev.slice(0,8).map(function(i){return'<li>'+esc(i.q)+'</li>'}).join("")+'</ol><span class="mut">Alasannya: daya beda rendah, atau ada pilihan salah yang dipilih lebih banyak daripada kunci. Periksa kembali kunci jawaban dan kejelasan kalimat soal.</span>':'Belum ada soal yang perlu ditinjau.')+'</div>';
  var tm=0;M.pk.mapel.forEach(function(m){if(!sel||m.id===sel)tm+=(m.materi||[]).length});
  if(tm){var nomat=mu.filter(function(u){return u.tried&&!u.tuntas&&u.mat===0});h+='<div class="rec"><h4>📺 Penggunaan materi</h4>'+(nomat.length?'Murid belum tuntas yang belum membuka materi: '+nomat.map(function(u){return esc(u.nama)}).join(", ")+'.<br><span class="mut">Pertimbangkan mencentang "Wajib dipelajari sebelum kuis" di Editor Soal.</span>':'Murid yang belum tuntas sudah membuka materi.')+'</div>'}
  h+='<div class="mut" style="font-size:12px">Rekomendasi ini bersifat bantuan. Keputusan tindak lanjut tetap di tangan guru, disesuaikan dengan pengamatan di kelas.</div>'}
 $("dBody").innerHTML=h;if(dState.tab==="live")lvRender()}
Array.prototype.forEach.call(document.querySelectorAll("[data-dt]"),function(b){b.onclick=function(){dState.tab=b.dataset.dt;renderDash()}});
$("dMapel").onchange=function(){dState.mapel=this.value;renderDash()};
$("dKktp").oninput=function(){var v=Math.max(0,Math.min(100,+this.value||0));dState.kktp=v;lsSet("zd2_kktp",v);renderDash()};
$("dBody").addEventListener("click",function(e){var ms=e.target.closest("[data-msel],[data-mselall]");if(ms){dState.msel=dState.msel||{};if(ms.hasAttribute("data-mselall")){var on=ms.checked;dState.msel={};if(on)dModel().murid.forEach(function(u){dState.msel[u.id]=1})}else{if(ms.checked)dState.msel[+ms.dataset.msel]=1;else delete dState.msel[+ms.dataset.msel]}renderDash();return}if(e.target.closest("td.own"))return;var del=e.target.closest("[data-del]");
 if(del){var id=+del.dataset.del,u=DB_.murid.concat(DB_.blok||[]).filter(function(x){return x.id===id})[0];if(u)ask(u.nama+" (absen "+u.absen+") beserta semua nilainya akan dihapus dari kelas ini. Ini tidak bisa dibatalkan.",function(){api("/murid/hapus",{lic:licBody(),kode:dState.kode,pin:dState.pin,id:id}).then(function(){dState.murid=null;return loadDash(false)},function(er){info(er.message)})},{t:"Hapus murid?",ok:"Hapus",danger:true});return}
 var da=e.target.closest("[data-dact]");if(da){if(rkpAct(da.dataset.dact,da)||tanAct(da.dataset.dact,da))return;if(da.dataset.dact==="closemu"){dState.murid=null;renderDash()}return}
 var row=e.target.closest("[data-mu]");if(row){dState.murid=+row.dataset.mu;if(dState.tab==="rank"||dState.tab==="rekap")dState.tab="murid";renderDash();$("dBody").scrollTop=0}});
$("dExport").onclick=function(){if(!DB_)return;var M=dModel(),K=dState.kktp,rows=xlTop("REKAP NILAI KELAS",["Kelas: "+DB_.kelas.nama+" • Kode "+DB_.kelas.kode+(DB_.kelas.guru?" • Guru: "+DB_.kelas.guru:""),"KKTP "+K+(dState.dunia||dState.per||dState.paket?" • Filter: "+filtLabel():"")+" • Diunduh "+new Date().toLocaleString("id-ID")]),hr=rows.length;
 var head=["No","Absen","Nama"];M.ms.forEach(function(m){head.push(m.nama+" (awal)",m.nama+" (terbaik)")});head.push("Rata-rata terbaik","Status","Materi dibuka","Terakhir aktif");rows.push(head.map(function(h){return{v:h,s:3}}));
 M.murid.forEach(function(u,ix){var row=[{v:ix+1,s:5},{v:u.absen,s:5},{v:u.nama,s:4}];M.ms.forEach(function(m){var p=u.per[m.id];row.push(p?numS(p.first,K):{v:"-",s:5},p?numS(p.best,K):{v:"-",s:5})});var a=avg(Object.keys(u.per).map(function(k){return u.per[k].best}));
  row.push(a==null?{v:"-",s:7}:{v:a,s:a<K?6:7},{v:a==null?"Belum mengerjakan":(a>=K?"Tuntas":"Belum tuntas"),s:4},{v:u.mat,s:5},{v:u.aktif?fmtT(u.aktif):"-",s:4});rows.push(row)});
 var W=[5,7,24];M.ms.forEach(function(){W.push(11,11)});W.push(12,16,10,18);
 var it=[["No","Mapel","Soal","Jumlah menjawab","Persen benar","Kesukaran","Daya beda","Rata-rata detik","Catatan"].map(function(h){return{v:h,s:3}})];
 dItems(M,"").forEach(function(i,ix){var pc=Math.round(i.p*100);it.push([{v:ix+1,s:5},{v:mapName(M,i.mapel),s:4},{v:i.q,s:4},{v:i.n,s:5},{v:pc,s:pc<50?6:5},{v:pLabel(i.p)[0],s:4},{v:i.D==null?"-":dLabel(i.D)[0],s:4},{v:Math.round(i.det),s:5},{v:i.strong.length?"Ada pengecoh yang dipilih lebih banyak dari kunci":"",s:4}])});
 var r2=xlTop("ANALISIS BUTIR SOAL",["Kelas: "+DB_.kelas.nama+" • Persen benar di bawah 50 ditandai merah"]),h2=r2.length;r2=r2.concat(it);
 xlBook([{name:"Nilai Murid",rows:rows,widths:W,freeze:hr+1,land:true,tab:true},{name:"Analisis Soal",rows:r2,widths:[5,16,60,10,10,12,12,10,40],freeze:h2+1,land:true}],"rekap-nilai-kelas-"+DB_.kelas.kode+".xlsx")};
function xlTop(title,subs){var r=[[{v:title,s:1}]];(subs||[]).forEach(function(x){if(x)r.push([{v:x,s:2}])});r.push([]);return r}
function xlStat(rows,lbls,vals,K){if(!vals.length)return;var a=avg(vals);rows.push([]);rows.push([null,null,{v:"Ringkasan",s:8}]);[["Rata-rata",a],["Tertinggi",Math.max.apply(null,vals)],["Terendah",Math.min.apply(null,vals)],["Jumlah tuntas (KKTP "+K+")",vals.filter(function(v){return v>=K}).length],["Persen tuntas (%)",Math.round(vals.filter(function(v){return v>=K}).length/vals.length*100)],["Jumlah peserta",vals.length]].forEach(function(x){rows.push([null,null,{v:x[0],s:4},{v:x[1],s:typeof x[1]==="number"?7:4}])})}

/* =================================================================
   TANTANGAN / UJIAN (murid)
   ================================================================= */
var TAN={list:[],off:0},tanSeen=lsGet("zv_tan_seen",{});
function srv(){return Date.now()+TAN.off}
function tanStatus(t){var n=srv();if(t.sudah&&t.sekali)return"sudah";
 if(t.serentak){if(n>t.selesai||(t.akhir&&n>t.akhir))return t.sudah?"sudah":"tutup";if(!t.go)return"tunggu";if(t.dimulai&&t.sekali&&t.dimulai>=t.go&&n>Math.min(t.selesai,t.go+t.menit*60000))return"habis";if(n>Math.min(t.selesai,t.go+t.menit*60000))return t.sudah?"sudah":"tutup";return"buka"}
 if(n<t.mulai)return"nanti";if(n>t.selesai)return t.sudah?"sudah":"tutup";if(t.dimulai&&t.sekali&&n>Math.min(t.selesai,t.dimulai+t.menit*60000))return"habis";return"buka"}
function tanLoad(){if(!CL||!API_URL)return Promise.resolve();return api("/tantangan/daftar",{kode:CL.kode,token:CL.token}).then(function(r){TAN.off=r.now-Date.now();TAN.list=r.tantangan||[];updTanUI()}).catch(function(){})}
var TINV={};
function tanInvite(){if(!CL||WAIT||LOBI||ADV&&!ADV.done||mode!=="play")return;var t=TAN.list.filter(function(x){return x.serentak&&!x.go&&!x.akhir&&!TINV[x.id]&&tanStatus(x)==="tunggu"})[0];if(!t)return;TINV[t.id]=1;
 ask("Gurumu membuka \""+t.judul+"\". Masuk ke lobi sekarang dan tunggu aba-aba mulai bersama teman?",function(){mainEnter(t)},{ic:(TMODE[tanModeOf(t)]||TMODE.kuis).ic,t:"Ajakan dari guru",ok:"🛫 Masuk lobi",no:"Nanti"})}
function updTanUI(){setTimeout(tanInvite,600);var open=CL?TAN.list.filter(function(t){var s=tanStatus(t);return s==="buka"||s==="tunggu"}):[],b=$("hTan");b.style.display=open.length?"block":"none";b.textContent="⚡ "+open.length+" Tantangan";$("pTan").style.display=CL&&TAN.list.length?"block":"none";
 open.forEach(function(t){if(!tanSeen[t.id]){tanSeen[t.id]=1;lsSet("zv_tan_seen",tanSeen);if(mode==="play"||mode==="menu")toast("⚡ Tantangan dari guru: "+t.judul+". Ketuk tombol ⚡ di kanan atas.",5000)}});
 if($("ovTan").classList.contains("show"))renderTan()}
setInterval(function(){if(CL&&!document.hidden&&mode!=="quiz"&&mode!=="landing")tanLoad()},120000);
function fmtD(t){return new Date(t).toLocaleString("id-ID",{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}
function openTan(){if(mode==="play")setMode("menu");$("ovTan").classList.add("show");renderTan();tanLoad()}
function renderTan(){$("tSub").textContent=CL?"🏫 "+CL.kelas+". Kerjakan sendiri dengan jujur dan teliti, ya!":"Masuk kelas dulu untuk melihat tantangan dari guru.";
 if(!TAN.list.length){$("tList").innerHTML='<div class="mut" style="margin-top:12px">Belum ada tantangan dari gurumu.</div>';return}
 $("tList").innerHTML=TAN.list.map(function(t){var st=tanStatus(t),pt=t.jenis==="petualangan",m=pt?{nama:""}:(data.mapel.filter(function(x){return x.id===t.mapel})[0]||{nama:t.mapel_nama||"",luar:1});
  var badge={sudah:"✅ Sudah dikerjakan",nanti:"⏳ Dibuka "+fmtD(t.mulai),tutup:"🔒 Sudah berakhir",habis:"⌛ Waktumu sudah habis",buka:t.serentak?"🟢 Sudah dimulai guru":"🟢 Sedang dibuka",tunggu:"🟡 Menunggu guru memulai"}[st];if(pt&&st==="sudah")badge="✅ Sudah ikut";
  var res=pt?(t.sudah?'<div class="mut" style="margin-top:6px">Kamu sudah ikut petualangan ini'+(t.sudah.nilai!=null?' • capaian '+t.sudah.nilai+'%':'')+'.</div>':''):t.sudah&&t.sudah.nilai!=null?'<div style="margin-top:6px;font-weight:800">Nilaimu: <span style="color:var(--yel);font-size:20px">'+t.sudah.nilai+'</span> (benar '+t.sudah.benar+' dari '+t.sudah.total+')</div>':(t.sudah?'<div class="mut" style="margin-top:6px">Jawabanmu sudah terkirim. Nilai akan disampaikan gurumu.</div>':'');
  var btn=st==="tunggu"?(m?'<div class="row"><button class="btn yel" data-tan="'+t.id+'">🚪 Masuk Ruang Tunggu</button><span class="mut" style="font-size:12px">Tantangan dimulai bersamaan saat guru menekan Mulai.</span></div>':'<div style="color:#fca5a5;margin-top:6px;font-weight:800">Soal mapel ini belum ada di perangkatmu. Tutup lalu buka lagi game supaya paket soal terbaru terunduh.</div>'):st==="buka"?(m?'<div class="row"><button class="btn yel" data-tan="'+t.id+'">'+(pt?"🗺️ Ikut Petualangan":t.dimulai&&t.sekali?"▶ Lanjutkan Tantangan":t.sudah?"↺ Kerjakan Lagi":"▶ Mulai Tantangan")+'</button></div>':'<div style="color:#fca5a5;margin-top:6px;font-weight:800">Soal mapel ini belum ada di perangkatmu. Tutup lalu buka lagi game supaya paket soal terbaru terunduh.</div>'):'';
  return'<div class="scard"><div class="sh"><span>'+(pt?'🗺️ ':'⚡ ')+esc(t.judul)+'</span><span class="badge '+(st==="buka"?"b-ok":st==="sudah"||st==="tunggu"?"b-mid":"b-na")+'">'+badge+'</span></div><div class="mut">'+(pt?'🗺️ Sesi petualangan bersama • '+t.menit+' menit'+(advTarget(t)?' • 🎯 target '+advTarget(t).n+' '+ADV_LBL[advTarget(t).k]:'')+' • ditutup '+fmtD(t.selesai):'📚 '+esc(t.mapel_nama||(m?m.nama:t.mapel))+' • '+t.jumlah+' soal • '+t.menit+' menit • ditutup '+fmtD(t.selesai)+(t.sekali?' • hanya sekali':' • boleh diulang'))+'</div>'+res+btn+'</div>'}).join("")}
$("tList").addEventListener("click",function(e){var b=e.target.closest("[data-tan]");if(!b)return;var t=TAN.list.filter(function(x){return x.id===+b.dataset.tan})[0];if(!t)return;
 var go=function(){b.disabled=true;api("/tantangan/mulai",{kode:CL.kode,token:CL.token,id:t.id}).then(function(r){TAN.off=r.now-Date.now();$("ovTan").classList.remove("show");if(r.tunggu){waitEnter(t);return}tanStart(t,r)},function(er){b.disabled=false;toast("❌ "+er.message,4000);tanLoad()})};
 if(tanStatus(t)==="tunggu"||t.jenis==="petualangan"){go();return}
 if(t.dimulai&&t.sekali)go();else ask("📝 "+t.jumlah+" soal, waktu "+t.menit+" menit\n⏱️ Waktu tetap berjalan walaupun game ditutup"+(t.sekali?"\n⚠️ Hanya bisa dikerjakan SEKALI":"")+"\n\nSudah siap?",go,{ic:"⚡",t:"Mulai \""+t.judul+"\"?",ok:"▶ Mulai",no:"Nanti"})});
$("tClose").onclick=function(){$("ovTan").classList.remove("show");if(mode==="menu")setMode("play")};
/* ---------- 🤸 JATUH BANGUN: arena lomba serentak (gaya party game, versi belajar) ---------- */
var ARENA=null,AR_PREV=null,AR_Y=64,AR_C=["#ef4444","#3b82f6","#22c55e","#f59e0b"],AR_L="ABCD",AR_REV=5000,AR_LEAD=7000;
function arTime(s){return Math.max(10000,Math.min(20000,8000+String(s.q||"").length*55+(s.opsi||[]).join("").length*25))}
function arTileMat(c){return new THREE.MeshLambertMaterial({color:new THREE.Color(c)})}
function arLabel(txt,w,d,col){var tx=canvasTex([{t:txt,s:txt.length>2?150:260,y:128,c:"#ffffff"}],512,256,{}),pl=new THREE.Mesh(new THREE.PlaneGeometry(w*0.8,d*0.4),new THREE.MeshBasicMaterial({map:tx,transparent:true,depthWrite:false}));pl.rotation.x=-Math.PI/2;return pl}
var AR_T=4,AR_TH=9,AR_TD=34,AR_TC=["#e2e8f0","#bae6fd","#c4b5fd","#fde68a"];
function arTO(k){var A=ARENA;return{x:A.O.x,y:A.O.y+k*AR_TH,z:A.O.z-k*AR_TD}}
function arBuild(O){var g=new THREE.Group();g.position.set(O.x,O.y,O.z);g.userData.dyn=true;var tiers=[];
 for(var k=0;k<AR_T;k++){var tg=new THREE.Group();tg.position.set(0,k*AR_TH,-k*AR_TD);g.add(tg);
  [[0,-13.5,32,5],[0,13.5,32,5],[-13.5,0,5,22],[13.5,0,5,22]].forEach(function(s){B(s[2],1,s[3],AR_TC[k],s[0],-0.5,s[1],tg)});
  for(var i=0;i<16;i++){var a=i/16*Math.PI*2,x=Math.max(-16,Math.min(16,Math.sin(a)*21)),z=Math.max(-16,Math.min(16,Math.cos(a)*21));B(0.35,1.2,0.35,k===AR_T-1?"#f59e0b":"#fbbf24",x,0.6,z,tg)}
  if(!k)mesh(cyl(10,3,6,6),"#4c1d95",0,-5,0,tg,false);
  var sg=sprite([{t:k===AR_T-1?"👑 PUNCAK":"LANTAI "+(k+1),s:72,y:66,c:k===AR_T-1?"#fde68a":"#ffffff"}],460,132,6,1.75,{bg:"rgba(15,18,45,.82)",border:k===AR_T-1?"#facc15":"#22d3ee",bw:6,rad:24});sg.position.set(-12.5,3.4,13.5);tg.add(sg);
  if(k===AR_T-1){var cr=new THREE.Group();cr.position.set(12.5,3.2,-12.5);tg.add(cr);mesh(cyl(1.4,1.4,0.8,8),"#facc15",0,0,0,cr);for(var q=0;q<5;q++){var aa=q/5*Math.PI*2;mesh(G.sph,"#facc15",Math.sin(aa)*1.3,0.8,Math.cos(aa)*1.3,cr).scale.setScalar(0.32)}}
  var tiles=[];
  [[-5.5,-5.5],[5.5,-5.5],[-5.5,5.5],[5.5,5.5]].forEach(function(p,i){var m=B(10.6,1,10.6,"#888",p[0],-0.5,p[1],tg);m.material=arTileMat(AR_C[i]);tiles.push({m:m,x:p[0],z:p[1],w:11,d:11,lay:4,slot:i,y:0,drop:false,on:false,lab:null})});
  [[-5.5,0],[5.5,0]].forEach(function(p,i){var m=B(10.6,1,21.6,"#888",p[0],-0.5,p[1],tg);m.material=arTileMat(i?"#ef4444":"#22c55e");m.visible=false;tiles.push({m:m,x:p[0],z:p[1],w:11,d:22,lay:2,slot:i,y:-40,drop:true,on:false,lab:null})});
  tiers.push({g:tg,tiles:tiles})}
 var pool=new THREE.Mesh(new THREE.CircleGeometry(30,32),new THREE.MeshBasicMaterial({color:"#22d3ee",transparent:true,opacity:0.5,depthWrite:false}));pool.rotation.x=-Math.PI/2;pool.position.y=-14;g.add(pool);
 var board=sprite([{t:"JATUH BANGUN",s:64,y:90,c:"#fde68a"},{t:"Bersiap...",s:44,y:170,c:"#ffffff"}],1024,260,22,5.6,{bg:"rgba(15,18,45,.9)",border:"#22d3ee",bw:10,rad:34});board.position.set(0,(AR_T-1)*AR_TH+7,-(AR_T-1)*AR_TD-22);g.add(board);
 scene.add(g);return{g:g,tiers:tiers,board:board}}
function arBoard(l1,l2){var A=ARENA;if(!A)return;var key=l1+"|"+l2;if(A.bk===key)return;A.bk=key;var p=A.parts,ns=sprite([{t:l1,s:58,y:88,c:"#fde68a"},{t:l2,s:40,y:172,c:"#ffffff"}],1024,260,22,5.6,{bg:"rgba(15,18,45,.9)",border:"#22d3ee",bw:10,rad:34});ns.position.copy(p.board.position);p.g.remove(p.board);if(p.board.material.map)p.board.material.map.dispose();p.g.add(ns);p.board=ns}
function startArena(t,r){if(!lobiOk()){startUjian(t,r);return}
 var MP=tanMapels(t),parts=[],pool=data.mapel;
 if(r&&r.rahasia&&r.rahasia.length){try{var rp=validate({judul:"r",mapel:clone(r.rahasia)});pool=rp.mapel.concat(data.mapel.filter(function(x){return!rp.mapel.some(function(y){return y.id===x.id})}))}catch(e){}}
 if(MP)MP.list.forEach(function(x){var mm=pool.filter(function(y){return y.id===x.id})[0];if(mm)parts.push({m:mm,n:x.n})});
 if(!parts.length){var m0=pool.filter(function(x){return x.id===t.mapel})[0];if(m0)parts.push({m:m0,n:t.jumlah})}
 var rf=rngSeed(((t.id||1)*7919+13)>>>0),list=[];
 parts.forEach(function(pp){var src=pp.m.soal.filter(function(s){return qChoice(s)&&s.opsi&&s.opsi.length>=2&&s.opsi.length<=4});if(t.acak)src=sshuf(src,rf);src.slice(0,pp.n).forEach(function(s){list.push({s:s,mp:pp.m,ord:s.opsi.map(function(o,i){return i})})})});
 var multi=parts.length>1;if(multi&&MP.urut!=="mapel")list=sshuf(list,rf);list=list.slice(0,30);
 if(!list.length){toast("Mapel tantangan ini belum punya soal pilihan ganda atau benar/salah untuk Jatuh Bangun.",5000);return}
 var m=multi?{id:"_gabung",nama:parts.map(function(pp){return pp.m.nama}).join(" + ")}:parts[0].m;
 Q={log:[],t0:Date.now(),type:"ujian",m:m,multi:multi,tan:t,batas:r.batas,list:list,i:0,pick:{},dt:{},locked:false,finished:false,arena:1,tier:0};
 Q.svK=ujKey(t);Q.svSig="ar:"+list.map(function(it){return skey(it.s)}).join(",");var sv=lsGet(Q.svK,null);if(sv&&sv.batas===r.batas&&sv.sig===Q.svSig&&sv.pick){Q.pick=sv.pick;Q.dt=sv.dt||{};Q.t0=sv.t0||Q.t0;Q.tier=Math.max(0,Math.min(AR_T-1,sv.tier||0))}
 var at=(r.mulai||srv())+AR_LEAD;list.forEach(function(it){it.a0=at;it.a1=at+arTime(it.s);it.a2=it.a1+AR_REV;at=it.a2});
 if(ARENA)arenaLeave(true);
 var Z=CUR.spawn||[0,0,0],O={x:Z[0],y:AR_Y,z:Z[2]+40},pv=AR_PREV||{x:pos.x,y:pos.y,z:pos.z,h:heading};AR_PREV=null;
 ARENA={id:t.id,t:t,O:O,list:list,k:-1,lk:-1,ph:"",seen:{},parts:arBuild(O),prev:pv,done:false,hk:"",cd:camWant,tier:Q.tier,fly:null,down:false,endT:0};camDist=camWant=Math.max(camWant,window.innerWidth<700?24:20);
 arPlace(ARENA.tier);
 $("hud").classList.add("show");setMode("play");arHudEl().style.display="block";lobiHud();rtHello("z");rtZ();try{SFX.win()}catch(e){}
 toast("🤸 Jawab benar untuk naik lantai, salah akan jatuh ke bawah!",3500)}
function arPlace(k){var o=arTO(k);pos.x=o.x+(Math.random()-0.5)*16;pos.z=o.z+13.5+(Math.random()-0.5)*2;pos.y=o.y+0.3;vy=0;heading=Math.PI;yaw=0;pitch=0.72;if(camPos)camPos.set(pos.x,pos.y+10,pos.z+14)}
function arHudEl(){var e=$("arHud");if(!e){e=document.createElement("div");e.id="arHud";e.className="glass";e.style.display="none";$("hud").appendChild(e)}return e}
function arSetQ(k){var A=ARENA,it=A.list[k],n=it.s.opsi.length,lay=n===2?2:4,bs=it.s.tipe==="bs";Q.i=k;
 A.parts.tiers.forEach(function(T){T.tiles.forEach(function(tl){var on=tl.lay===lay&&tl.slot<n;if(tl.lab){T.g.remove(tl.lab);if(tl.lab.material.map)tl.lab.material.map.dispose();tl.lab=null}
  if(on){tl.m.visible=true;tl.drop=false;tl.on=true;var col=lay===2&&bs?(tl.slot?"#ef4444":"#22c55e"):AR_C[tl.slot];tl.m.material.color.set(col);if(tl.m.material.emissive)tl.m.material.emissive.set("#000000");
   var lab=arLabel(lay===2&&bs?(tl.slot?"SALAH":"BENAR"):AR_L[tl.slot],tl.w,lay===2?11:tl.d,col);lab.position.set(tl.x,tl.y+0.04,tl.z);T.g.add(lab);tl.lab=lab}
  else{tl.drop=true;tl.on=false}})});
 arBoard("SOAL "+(k+1)+" DARI "+A.list.length,String(it.s.q).slice(0,70)+(String(it.s.q).length>70?"…":""));ujSave()}
function arTierAt(x,z){var A=ARENA;for(var k=0;k<AR_T;k++){var o=arTO(k);if(Math.abs(x-o.x)<=16.2&&Math.abs(z-o.z)<=16.2)return k}return -1}
function arTileAt(x,z,k){var A=ARENA;if(!A)return null;if(k==null)k=arTierAt(x,z);if(k<0)return null;var o=arTO(k),dx=x-o.x,dz=z-o.z,T=A.parts.tiers[k];for(var i=0;i<T.tiles.length;i++){var t=T.tiles[i];if(t.on&&!t.drop&&Math.abs(dx-t.x)<=t.w/2&&Math.abs(dz-t.z)<=t.d/2)return t}return null}
function arenaGround(x,z){var A=ARENA;if(!A||A.done)return null;if(A.kind==="jb")return jbGround(x,z);if(A.fly)return null;var k=arTierAt(x,z);if(k<0)return null;var o=arTO(k),dx=x-o.x,dz=z-o.z;
 if(Math.abs(dx)<11&&Math.abs(dz)<11){if(A.k<0)return o.y;var t=arTileAt(x,z,k);return t&&t.y>-0.3?o.y:null}return o.y}
function arenaClamp(){var A=ARENA;if(!A||A.kind==="jb"||A.fly)return;var o=arTO(A.tier),dx=pos.x-o.x,dz=pos.z-o.z,m=15.6;
 if(pos.y>=o.y-1){if(dx>m)pos.x=o.x+m;if(dx<-m)pos.x=o.x-m;if(dz>m)pos.z=o.z+m;if(dz<-m)pos.z=o.z-m}
 if(pos.y<o.y-8){var nt=A.down?Math.max(0,A.tier-1):A.tier,wasTop=A.tier;A.down=false;A.tier=nt;Q.tier=nt;arPlace(nt);ujSave();toast(nt<wasTop?"⬇️ Jatuh ke Lantai "+(nt+1)+"!":"💦 Byuur! Kembali ke Lantai "+(nt+1)+".",2000)}}
function arFly(toK,up){var A=ARENA,o=arTO(toK);A.fly={x0:pos.x,y0:pos.y,z0:pos.z,x1:o.x+(Math.random()-0.5)*12,y1:o.y+0.3,z1:o.z+13.5,t0:performance.now(),dur:up?1500:1100,up:up,k:toK}}
function arLock(k){var A=ARENA,it=A.list[k],s=it.s,ot=arTO(A.tier),st=pos.y>=ot.y-0.6?arTileAt(pos.x,pos.z,A.tier):null,p=st?st.slot:null;
 if(A.seen[k]){if(p!=null)Q.pick[k]=p;else delete Q.pick[k];Q.dt[k]=Math.round((it.a1-it.a0)/100)/10;belGame(s,it.mp,p===s.jawab,null,p)}
 A.parts.tiers.forEach(function(T){T.tiles.forEach(function(tl){if(!tl.on)return;if(tl.slot!==s.jawab)tl.drop=true;else if(tl.m.material.emissive)tl.m.material.emissive.set("#3f3f00")})});
 if(A.seen[k]){
  if(p===s.jawab){try{SFX.ok()}catch(e){}if(A.tier<AR_T-1){var nt=A.tier+1;lobiBig(nt===AR_T-1?"👑 NAIK KE PUNCAK!":"⬆️ BANGUN! Lantai "+(nt+1));setTimeout(function(){if(ARENA&&!ARENA.done)arFly(nt,true)},500)}else lobiBig("⭐ Bertahan di Puncak!")}
  else if(p!=null){try{SFX.no()}catch(e){}A.down=A.tier>0;lobiBig(A.tier>0?"❌ JATUH!":"❌ Runtuh!")}
  else{try{SFX.no()}catch(e){}if(A.tier>0){lobiBig("⏰ Tidak memilih, turun!");var dk=A.tier-1;setTimeout(function(){if(ARENA&&!ARENA.done)arFly(dk,false)},500)}else lobiBig("⏰ Tidak memilih")}}
 setTimeout(function(){lobiBig(null)},1500);
 arBoard("JAWABAN: "+(s.tipe==="bs"?s.opsi[s.jawab].toUpperCase():AR_L[s.jawab]+". "+String(s.opsi[s.jawab]).slice(0,40)),s.bahas&&hasLvl(Q.tan.hasil)===1?String(s.bahas).slice(0,70):"Bersiap untuk soal berikutnya");ujSave()}
function arHud(k,ph,now){var A=ARENA,L=A.list,e=arHudEl(),h,sc=0;Object.keys(Q.pick).forEach(function(i){var it=L[i];if(it&&Q.pick[i]===it.s.jawab&&(+i<k||ph==="buka"))sc++});
 var up=0,dn=0,my=arTO(A.tier).y;Object.keys(RT.peers||{}).forEach(function(id){var p=RT.peers[id];if(!p||p.guru||!p.tgt)return;if(p.tgt[1]>my+4)up++;else if(p.tgt[1]<my-4)dn++});
 var lv='<span class="arlv'+(A.tier===AR_T-1?" top":"")+'">'+(A.tier===AR_T-1?"👑 Puncak":"🏔️ Lantai "+(A.tier+1)+"/"+AR_T)+'</span>'+(up||dn?'<span>⬆️'+up+' ⬇️'+dn+'</span>':'');
 if(A.endT){h='<div class="arh"><b>🤸 Jatuh Bangun</b>'+lv+'</div><div class="arq">'+(A.tier===AR_T-1?"👑 Kamu juara di PUNCAK!":"🏁 Lomba selesai! Kamu di Lantai "+(A.tier+1)+".")+'</div>'}
 else if(k<0){var left=Math.max(0,Math.ceil((L[0].a0-now)/1000));h='<div class="arh"><b>🤸 Jatuh Bangun</b>'+lv+'<span>'+L.length+' soal</span></div><div class="arq">Bersiap! Soal pertama dalam <b>'+left+'</b> detik</div><div class="mut" style="font-size:12px">Berdiri di lantai warna jawaban. Benar: naik lantai. Salah: lantai runtuh dan kamu jatuh ke bawah!</div>'}
 else{var it=L[k],s=it.s,bs=s.tipe==="bs",tl=ph==="tanya"?Math.max(0,Math.ceil((it.a1-now)/1000)):0;
  h='<div class="arh"><b>Soal '+(k+1)+'/'+L.length+'</b>'+lv+'<span>⭐ '+sc+'</span><span class="art'+(ph==="tanya"&&tl<=3?" hot":"")+'">'+(ph==="tanya"?"⏱ "+tl:"✔")+'</span></div><div class="arq">'+esc(s.q)+'</div><div class="aro">'+s.opsi.map(function(o,i){var c=bs?(i?"#ef4444":"#22c55e"):AR_C[i],win=ph!=="tanya"&&i===s.jawab,lose=ph!=="tanya"&&i!==s.jawab;return'<div class="ar1'+(win?" win":"")+(lose?" lose":"")+'" style="--c:'+c+'"><i>'+(bs?(i?"S":"B"):AR_L[i])+'</i>'+esc(o)+'</div>'}).join("")+'</div>'}
 if(h!==A.hk){A.hk=h;e.innerHTML=h}}
function arenaTick(dt){var A=ARENA;if(!A||A.done)return;if(A.kind==="jb"){jbTick(dt);return}if(A.kind==="lk"){lkTick(dt);return}var now=srv(),L=A.list,k=-1,ph="siap";
 if(A.fly){var F=A.fly,u=Math.min(1,(performance.now()-F.t0)/F.dur);pos.x=F.x0+(F.x1-F.x0)*u;pos.z=F.z0+(F.z1-F.z0)*u;pos.y=F.y0+(F.y1-F.y0)*u+Math.sin(u*Math.PI)*(F.up?10:4);vy=0;heading=Math.PI;
  if(u>=1){A.fly=null;A.tier=F.k;Q.tier=F.k;pos.y=F.y1;ujSave();if(F.up){try{SFX.win()}catch(e){}}}}
 for(var i=0;i<L.length;i++){if(now<L[i].a0)break;k=i;ph=now<L[i].a1?"tanya":"buka"}
 if(k>=0&&k===L.length-1&&now>=L[k].a2&&!A.fly){if(!A.endT){A.endT=now;lobiBig(A.tier===AR_T-1?"👑 JUARA PUNCAK!":"🏁 SELESAI!");try{SFX.win()}catch(e){}}else if(now-A.endT>2800){arenaFinish();return}}
 if(k!==A.k){A.k=k;if(k>=0)arSetQ(k)}
 if(k>=0&&ph==="tanya")A.seen[k]=1;
 if(k>=0&&ph==="buka"&&A.lk!==k){A.lk=k;arLock(k)}
 A.ph=ph;
 A.parts.tiers.forEach(function(T){T.tiles.forEach(function(tl){var tg=tl.drop?-40:0;if(Math.abs(tl.y-tg)>0.01){tl.y+=(tg-tl.y)*Math.min(1,dt*(tl.drop?1.6:5));tl.m.position.y=tl.y-0.5;if(tl.lab)tl.lab.position.y=tl.y+0.04;if(tl.drop&&tl.y<-35&&!tl.on)tl.m.visible=false}})});
 arHud(k,ph,now);if(Q&&Q.batas&&now>Q.batas+4000)arenaFinish()}
function arenaFinish(){var A=ARENA;if(!A||A.done)return;A.done=true;if(Q&&Q.arena&&!Q.finished&&Q.tan&&Q.tan.lat){latihanSelesai()}else if(Q&&Q.arena&&!Q.finished){Q.i=A.kind==="jb"?Math.min(A.c,A.N-1):A.kind==="lk"?Math.max(0,Math.min(A.k,A.N-1)):Math.max(0,A.k);finishUjian()}arenaLeave(true)}
function arenaLeave(quiet){var A=ARENA;if(!A)return;belFlush();scene.remove(A.parts.g);A.parts.g.traverse(function(x){if(x.material&&x.material.map)x.material.map.dispose()});var pv=A.prev;if(A.cd)camDist=camWant=Math.min(A.cd,46);if(A.kind==="lk"){(A.hid||[]).forEach(function(c){c.visible=true});try{setEnv(A.env0||"kota")}catch(e){}document.body.classList.remove("inrun");if(avatar)avatar.scale.y=1;if(typeof avTag!=="undefined"&&avTag)avTag.visible=true;if(A.fov){camera.fov=A.fov;camera.updateProjectionMatrix()}var en=ENVS[CUR.env||"kota"];FOG0.n=en.near*(lowGfx?.75:1);FOG0.f=en.far*(lowGfx?.75:1);scene.fog.near=FOG0.n;scene.fog.far=FOG0.f}ARENA=null;
 var e=$("arHud");if(e)e.style.display="none";lobiBig(null);if(pv){pos.x=pv.x;pos.z=pv.z;pos.y=groundAt(pv.x,pv.z);heading=pv.h||0;vy=0;if(camPos)camPos.set(pos.x,pos.y+8,pos.z+12)}lobiHud();rtHello("z");if(!quiet)toast("Kamu keluar dari arena.",2000)}

/* ---------- 🏃 LARI KILAT: lari otomatis 4 lajur, masuk gerbang jawaban yang benar ---------- */
var LK_W=2.6,LK_N=4,LK_V0=13,LK_VMAX=19,LK_VR=7.5,LK_G=34,LK_JV=11.5;
function lkLaneX(A,l){return A.O.x+(l-(LK_N-1)/2)*LK_W}
function lkRoadTex(){var c=document.createElement("canvas");c.width=256;c.height=256;var g=c.getContext("2d");g.fillStyle="#4b5563";g.fillRect(0,0,256,256);
 g.fillStyle="#6b7280";for(var i=0;i<40;i++){g.fillRect(Math.random()*256,Math.random()*256,3,3)}
 g.fillStyle="#f8fafc";for(var l=1;l<LK_N;l++){var x=l*256/LK_N;g.fillRect(x-3,0,6,120)}g.fillStyle="#facc15";g.fillRect(0,0,8,256);g.fillRect(248,0,8,256);
 var t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(1,30);return t}
var LK_TEMA=[{id:"kota",nm:"🏙️ Kota",env:"kota",gr:"#7cc56b"},{id:"desa",nm:"🌾 Desa",env:"kota",gr:"#6aa84f"},{id:"pantai",nm:"🏖️ Pantai",env:"kota",gr:"#f2d38b"},{id:"angkasa",nm:"🚀 Luar Angkasa",env:"orbit",gr:"#3f3f5a"}];
function lkSide(A,sg,i){var T=LK_TEMA[A.tema].id,sd=i%2?1:-1;while(sg.children.length){var c=sg.children.pop();if(c.material&&c.material.map&&c.isSprite)c.material.map.dispose()}
 var r=(i*7+A.k*3+Math.floor(A.dist))%6,pal=["#f87171","#60a5fa","#fbbf24","#a78bfa","#34d399","#fb923c"];
 var palm=function(){var tr=mesh(cyl(0.18,0.28,4.2,6),"#8d6e4a",0,2.1,0,sg);tr.rotation.z=0.12*sd;for(var j=0;j<5;j++){var l=B(2.6,0.12,0.7,"#16a34a",Math.cos(j*1.26)*1.1,4.3,Math.sin(j*1.26)*1.1,sg,false);l.rotation.y=-j*1.26;l.rotation.z=-0.35}};
 var tree=function(){mesh(cyl(0.25,0.3,2,6),"#7c4a1e",0,1,0,sg);mesh(G.sph,"#22c55e",0,2.8,0,sg).scale.set(1.6,1.6,1.6)};
 if(T==="kota"){if(r<2)tree();else{var h=4+r;B(5,h,5,pal[(i+A.k)%6],0,h/2,0,sg);B(5.4,0.6,5.4,"#334155",0,h+0.3,0,sg,false);for(var w=0;w<2;w++)B(0.1,1,1,"#bae6fd",-sd*2.55,1.6+w*1.8,-1+w*2,sg,false)}}
 else if(T==="desa"){if(r<2){B(5.5,0.15,9,"#a3c43a",0,0.08,0,sg,false);for(var p=0;p<6;p++)B(0.15,0.6,0.15,"#65a30d",-2+p*0.8,0.4,(p%3-1)*2.5,sg,false)}else if(r<4){B(4,0.8,4,"#7c4a1e",0,0.4,0,sg);B(3.6,2.4,3.6,"#d6a76b",0,2,0,sg);var rf=mesh(cyl(0.01,3.3,1.8,4),"#b45309",0,4.1,0,sg);rf.rotation.y=Math.PI/4;B(0.9,1.3,0.1,"#5b3a1a",-sd*1.81,1.6,0,sg,false)}else palm()}
 else if(T==="pantai"){if(sd<0){if(r<3)palm();else{mesh(cyl(0.06,0.06,2.6,5),"#f8fafc",0,1.3,0,sg);mesh(cyl(0.05,1.6,0.7,8),pal[r%6],0,2.7,0,sg);B(1.6,0.12,0.9,"#fde68a",0.8,0.2,0.8,sg,false)}}else{if(r<3)palm();else{var sb=B(0.5,0.12,2.2,pal[(r+2)%6],0,1.1,0,sg);sb.rotation.x=1.2;mesh(G.sph,"#a8a29e",1.2,0.3,0.6,sg).scale.set(0.6,0.4,0.5)}}}
 else{if(r<2){mesh(G.sph,"#6b7280",0,0.4,0,sg).scale.set(1.8,0.9,1.5);mesh(G.sph,"#4b5563",1.6,0.3,1,sg).scale.set(0.9,0.5,0.8)}else if(r<4){mesh(cyl(0.12,0.12,5,6),"#cbd5e1",0,2.5,0,sg);var dsh=mesh(cyl(1.2,0.2,0.5,10),"#e2e8f0",0,5.1,0,sg);dsh.rotation.x=0.6;mesh(G.sph,"#ef4444",0,5.6,0,sg,false).scale.setScalar(0.18)}else{for(var q=0;q<3;q++){var cr=mesh(cyl(0.01,0.35,1.6+q*0.5,5),["#a78bfa","#22d3ee","#f472b6"][q],q*0.6-0.6,0.8+q*0.25,q%2,sg,false);cr.rotation.z=(q-1)*0.3}}}}
function lkTema(A,t){if(A.tema===t)return;A.tema=t;var T=LK_TEMA[t];A.parts.ground.material.color.set(T.gr);A.parts.sea.visible=T.id==="pantai";A.parts.side.forEach(function(sg){lkSide(A,sg,sg.userData.i)});try{setEnv(T.env)}catch(e){}scene.fog.near=60;scene.fog.far=170;lobiBig(T.nm+"!");setTimeout(function(){if(ARENA===A&&A.ph==="lari")lobiBig(null)},1100)}
function lkBuild(O){var g=new THREE.Group();g.userData.dyn=true;scene.add(g);
 var ground=new THREE.Mesh(new THREE.PlaneGeometry(420,420),M("#7cc56b"));ground.rotation.x=-Math.PI/2;ground.position.set(O.x,O.y-0.06,O.z);ground.receiveShadow=true;g.add(ground);
 var rt=lkRoadTex(),road=new THREE.Mesh(new THREE.PlaneGeometry(LK_N*LK_W+0.6,240),new THREE.MeshLambertMaterial({map:rt}));road.rotation.x=-Math.PI/2;road.position.set(O.x,O.y-0.02,O.z);road.receiveShadow=true;g.add(road);
 [-1,1].forEach(function(sd){B(0.6,0.5,240,"#e5e7eb",O.x+sd*(LK_N*LK_W/2+0.6),O.y+0.2,O.z,g,false)});
 var side=[],pal=["#f87171","#60a5fa","#fbbf24","#a78bfa","#34d399","#fb923c"];
 for(var i=0;i<16;i++){var sd=i%2?1:-1,sg=new THREE.Group();g.add(sg);var k=Math.floor(i/2);
  if(i%3===0){mesh(cyl(0.25,0.3,2,6),"#7c4a1e",0,1,0,sg);mesh(G.sph||new THREE.SphereGeometry(1,8,6),"#22c55e",0,2.8,0,sg).scale.set(1.6,1.6,1.6)}
  else{var h=4+((i*37)%5);B(5,h,5,pal[i%pal.length],0,h/2,0,sg);B(5.4,0.6,5.4,"#334155",0,h+0.3,0,sg,false);for(var w=0;w<2;w++)B(0.1,1,1,"#bae6fd",-sd*2.55,1.6+w*1.8,-1+w*2,sg,false)}
  sg.position.set(O.x+sd*(LK_N*LK_W/2+5+(i%3)*1.5),O.y,O.z-k*14);sg.userData.i=i;side.push(sg)}
 var sea=new THREE.Mesh(new THREE.PlaneGeometry(160,420),new THREE.MeshLambertMaterial({color:"#38bdf8",transparent:true,opacity:0.9}));sea.rotation.x=-Math.PI/2;sea.position.set(O.x-(LK_N*LK_W/2+95),O.y-0.03,O.z);sea.visible=false;g.add(sea);
 var shield=new THREE.Mesh(new THREE.SphereGeometry(1.5,16,10),new THREE.MeshBasicMaterial({color:"#22d3ee",transparent:true,opacity:0.22,depthWrite:false}));shield.visible=false;g.add(shield);
 var goose=new THREE.Group();g.add(goose);B(1.1,0.9,1.5,"#ffffff",0,0.9,0,goose);B(0.35,1.1,0.35,"#ffffff",0,1.8,-0.6,goose);B(0.4,0.4,0.6,"#ffffff",0,2.35,-0.75,goose);B(0.25,0.18,0.45,"#f97316",0,2.3,-1.2,goose,false);
 B(0.12,0.12,0.12,"#111827",0.2,2.45,-0.95,goose,false);B(0.12,0.12,0.12,"#111827",-0.2,2.45,-0.95,goose,false);var gl1=B(0.15,0.6,0.15,"#f97316",0.3,0.3,0,goose,false),gl2=B(0.15,0.6,0.15,"#f97316",-0.3,0.3,0,goose,false);
 goose.position.set(O.x,O.y,O.z+30);
 return{g:g,ground:ground,road:road,rt:rt,side:side,goose:goose,gl:[gl1,gl2],objs:[],gate:null,sea:sea,shield:shield}}
function lkMk(A,type,lane,z){var P=A.parts,g=new THREE.Group(),x=lkLaneX(A,lane),y=A.O.y,o={type:type,lane:lane,z:z,g:g,hit:false};
 if(type==="koin"){var c=mesh(cyl(0.45,0.45,0.12,12),"#facc15",0,1.1,0,g,false);c.rotation.x=Math.PI/2;o.c=c}
 else if(type==="palang"){B(LK_W*0.86,0.25,0.25,"#ef4444",0,0.85,0,g);B(0.2,0.9,0.2,"#f8fafc",-LK_W*0.38,0.45,0,g);B(0.2,0.9,0.2,"#f8fafc",LK_W*0.38,0.45,0,g);B(LK_W*0.86,0.12,0.26,"#f8fafc",0,0.6,0,g,false)}
 else if(type==="atas"){B(LK_W*0.9,0.5,0.4,"#f59e0b",0,2.0,0,g);B(0.22,2.3,0.22,"#64748b",-LK_W*0.42,1.15,0,g);B(0.22,2.3,0.22,"#64748b",LK_W*0.42,1.15,0,g);var t=sprite([{t:"RUNDUK",s:46,y:44,c:"#1f2937"}],256,64,1.8,0.45,{bg:"rgba(0,0,0,0)"});t.position.set(0,2.0,0.25);g.add(t)}
 else if(type==="gerobak"){var cl=["#2563eb","#16a34a","#db2777","#7c3aed"][lane%4];B(LK_W*0.85,2.2,3.6,cl,0,1.3,0,g);B(LK_W*0.86,0.5,3.62,"#f8fafc",0,2.2,0,g,false);B(LK_W*0.7,0.9,0.1,"#bae6fd",0,1.7,-1.81,g,false);[-1,1].forEach(function(s){[-1.2,1.2].forEach(function(zz){mesh(cyl(0.4,0.4,0.3,10),"#111827",s*LK_W*0.4,0.4,zz,g,false).rotation.z=Math.PI/2})})}
 else if(type==="pu"){o.kind=lane.kind||"magnet";var PU={papan:["🛹","#06b6d4"],magnet:["🧲","#ef4444"],kilat:["⚡","#facc15"]}[o.kind]||["⭐","#ffffff"];lane=lane.l;x=lkLaneX(A,lane);o.lane=lane;var bx=B(1.1,1.1,1.1,PU[1],0,1.3,0,g);bx.material=new THREE.MeshLambertMaterial({color:PU[1],emissive:PU[1],emissiveIntensity:0.35});o.c=bx;var em=sprite([{t:PU[0],s:110,y:64,c:"#fff"}],128,128,1.5,1.5,{bg:"rgba(0,0,0,0)"});em.position.set(0,2.6,0);g.add(em);o.em=em}
 else if(type==="finis"){B(LK_N*LK_W+1,0.6,0.6,"#111827",0,5,0,g);B(0.5,5,0.5,"#f8fafc",-(LK_N*LK_W/2+0.5),2.5,0,g);B(0.5,5,0.5,"#f8fafc",LK_N*LK_W/2+0.5,2.5,0,g);var f=sprite([{t:"🏁 FINISH",s:84,y:80,c:"#fde68a"}],640,130,9,1.8,{bg:"rgba(15,18,45,.92)",border:"#facc15",bw:8,rad:26});f.position.set(0,6.4,0);g.add(f);x=A.O.x}
 g.position.set(x,y,z);P.g.add(g);P.objs.push(o);return o}
function lkGate(A,k,z){var it=A.list[k],s=it.s,n=s.opsi.length,bs=s.tipe==="bs",P=A.parts,g=new THREE.Group(),y=A.O.y,lanes=[];
 for(var l=0;l<LK_N;l++){var slot=n===2?(l<2?0:1):(l<n?l:-1);lanes.push(slot)}
 var done={};lanes.forEach(function(slot,l){var x=lkLaneX(A,l)-A.O.x;
  if(slot<0){B(LK_W*0.9,3.2,1,"#64748b",x,1.6,0,g);return}
  var col=bs?(slot?"#ef4444":"#22c55e"):AR_C[slot];
  B(LK_W*0.95,0.03,8,col,x,0.03,4,g,false).material.transparent=true;
  B(0.25,3.6,0.25,"#f8fafc",x-LK_W*0.46,1.8,0,g);B(0.25,3.6,0.25,"#f8fafc",x+LK_W*0.46,1.8,0,g);
  if(n===2&&done[slot])return;done[slot]=1;var cx=n===2?(lkLaneX(A,slot*2)+lkLaneX(A,slot*2+1))/2-A.O.x:x,wd=n===2?LK_W*2:LK_W;
  var sp=sprite([{t:bs?(slot?"SALAH":"BENAR"):AR_L[slot],s:bs?70:96,y:bs?62:80,c:"#ffffff"}],n===2?440:220,110,wd*0.95,wd*0.95*110/(n===2?440:220),{bg:col,border:"#ffffff",bw:6,rad:18});sp.position.set(cx,3.9,0);g.add(sp)});
 g.position.set(A.O.x,y,z);P.g.add(g);return{g:g,z:z,k:k,lanes:lanes,passed:false}}
function lkClear(A,o){A.parts.g.remove(o.g);o.g.traverse(function(x){if(x.material&&x.material.map&&x.isSprite)x.material.map.dispose()})}
function lkSpawn(A,z0,z1,dense){/* isi rintangan & koin antara z0 (dekat) dan z1 (jauh) */
 var z=z0;while(z>z1){var r=A.rnd(),lane=Math.floor(A.rnd()*LK_N);
  if(r<0.06&&dense&&A.dist>40){var kinds=["papan","magnet","kilat"];lkMk(A,"pu",{l:lane,kind:kinds[Math.floor(A.rnd()*3)]},z);z-=10}
  else if(r<0.42){for(var c=0;c<5;c++)lkMk(A,"koin",lane,z-c*2.2);z-=12}
  else if(r<0.62&&dense){lkMk(A,"palang",lane,z);var l2=(lane+1+Math.floor(A.rnd()*3))%LK_N;if(A.rnd()<0.5)lkMk(A,"palang",l2,z);z-=14}
  else if(r<0.78&&dense){lkMk(A,"atas",lane,z);z-=14}
  else if(dense){var bl=[lane];if(A.rnd()<0.55)bl.push((lane+2)%LK_N);bl.forEach(function(b){lkMk(A,"gerobak",b,z)});for(var c2=0;c2<4;c2++)lkMk(A,"koin",(lane+1)%LK_N,z+3-c2*2.2);z-=18}
  else z-=8}}
function startLari(t,r,lat){if(!lobiOk()){if(t)startUjian(t,r);return}
 var list=[],m,multi=false,parts=[];
 if(t){var MP=tanMapels(t),pool=data.mapel;
  if(r&&r.rahasia&&r.rahasia.length){try{var rp=validate({judul:"r",mapel:clone(r.rahasia)});pool=rp.mapel.concat(data.mapel.filter(function(x){return!rp.mapel.some(function(y){return y.id===x.id})}))}catch(e){}}
  if(MP)MP.list.forEach(function(x){var mm=pool.filter(function(y){return y.id===x.id})[0];if(mm)parts.push({m:mm,n:x.n})});
  if(!parts.length){var m0=pool.filter(function(x){return x.id===t.mapel})[0];if(m0)parts.push({m:m0,n:t.jumlah})}
  var rf=rngSeed(((t.id||1)*7919+47)>>>0);
  parts.forEach(function(pp){var src=pp.m.soal.filter(function(s){return qChoice(s)&&s.opsi&&s.opsi.length>=2&&s.opsi.length<=4});if(t.acak)src=sshuf(src,rf);src.slice(0,pp.n).forEach(function(s){list.push({s:s,mp:pp.m})})});
  multi=parts.length>1;if(multi&&MP.urut!=="mapel")list=sshuf(list,rf);list=list.slice(0,30);
  m=multi?{id:"_gabung",nama:parts.map(function(pp){return pp.m.nama}).join(" + ")}:(parts[0]&&parts[0].m)}
 else{m=lat.m;list=shuffle(m.soal.filter(function(s){return qChoice(s)&&s.opsi&&s.opsi.length>=2&&s.opsi.length<=4})).slice(0,10).map(function(s){return{s:s,mp:m}})}
 if(!list.length){toast("Belum ada soal pilihan ganda atau benar/salah untuk Lari Kilat.",5000);return}
 var k0=0;
 if(t){Q={log:[],t0:Date.now(),type:"ujian",m:m,multi:multi,tan:t,batas:r.batas,list:list,i:0,pick:{},dt:{},locked:false,finished:false,arena:1};
  Q.svK=ujKey(t);Q.svSig="lk:"+list.map(function(it){return skey(it.s)}).join(",");var sv=lsGet(Q.svK,null);if(sv&&sv.batas===r.batas&&sv.sig===Q.svSig&&sv.pick){Q.pick=sv.pick;Q.dt=sv.dt||{};Q.t0=sv.t0||Q.t0;k0=Math.min(list.length-1,(sv.i||0)+(sv.pick[sv.i]!=null?1:0))}}
 if(ARENA)arenaLeave(true);
 var Z=CUR.spawn||[0,0,0],O={x:Z[0],y:AR_Y,z:Z[2]},pv=AR_PREV||{x:pos.x,y:pos.y,z:pos.z,h:heading};AR_PREV=null;
 var seed=(t?(t.id||1)*31:1)+(Date.now()%9973);
 ARENA={kind:"lk",id:t?t.id:0,t:t,lat:lat||null,O:O,list:list,N:list.length,k:k0,ph:"mulai",phT:0,parts:lkBuild(O),prev:pv,done:false,hk:"",cd:camWant,
  lane:1.5|0,lx:0,v:0,dist:0,vy:0,y:0,slide:0,stun:0,gap:12,koin:0,benar:0,salah:0,spawnZ:O.z-30,gateZ:null,qT0:0,res:null,fin:false,endT:0,rnd:rngSeed(seed>>>0),fov:camera.fov,score:0,tema:0,env0:CUR.env||"kota",pw:{papan:0,magnet:0,kilat:0}};
 var A=ARENA;A.hid=[];scene.children.forEach(function(c){if(c===A.parts.g||c===avatar||c.isLight||c===sky||c===stars||c===sunDisc||c===camera||(sun&&c===sun.target))return;if(c.visible){c.visible=false;A.hid.push(c)}});A.lane=1;A.lx=lkLaneX(A,1);pos.x=A.lx;pos.y=O.y;pos.z=O.z;vy=0;heading=Math.PI;
 Object.keys(Q&&Q.pick||{}).forEach(function(i){if(t&&+i<k0){var it=list[i];if(it&&Q.pick[i]===it.s.jawab)A.benar++}});
 lkSpawn(A,O.z-30,O.z-150,true);A.spawnZ=O.z-150;
 FOG0.n=60;FOG0.f=170;scene.fog.near=60;scene.fog.far=170;
 document.body.classList.add("inrun");$("hud").classList.add("show");setMode("play");arHudEl().style.display="block";lobiHud();if(t){rtHello("z");rtZ()}
 A.phT=performance.now();lobiBig("3");try{SFX.click()}catch(e){}
 toast(isTouch?"👆 Geser kiri/kanan pindah lajur, geser atas lompat, geser bawah merunduk. Masuk gerbang jawaban yang benar!":"⌨️ ←/→ pindah lajur, ↑/Spasi lompat, ↓ merunduk. Masuk gerbang jawaban yang benar!",5000)}
function lkInput(d){var A=ARENA;if(!A||A.kind!=="lk"||A.done||A.ph==="mulai")return;
 if(d==="kiri"&&A.lane>0){A.lane--;try{SFX.click()}catch(e){}}
 else if(d==="kanan"&&A.lane<LK_N-1){A.lane++;try{SFX.click()}catch(e){}}
 else if(d==="atas"&&A.y<=0.01){A.vy=LK_JV;A.slide=0;try{SFX.jump()}catch(e){}}
 else if(d==="bawah"){A.slide=0.75;if(A.y>0.01)A.vy=Math.min(A.vy,-16)}}
window.addEventListener("keydown",function(e){var A=ARENA;if(!A||A.kind!=="lk"||mode!=="play"||typing(e))return;
 var c=e.code,d=c==="ArrowLeft"||c==="KeyA"?"kiri":c==="ArrowRight"||c==="KeyD"?"kanan":c==="ArrowUp"||c==="KeyW"||c==="Space"?"atas":c==="ArrowDown"||c==="KeyS"?"bawah":null;if(d){e.preventDefault();e.stopPropagation();if(!e.repeat)lkInput(d)}},true);
(function(){var sx=0,sy=0,on=false,used=false;
 document.addEventListener("touchstart",function(e){if(!ARENA||ARENA.kind!=="lk")return;if(e.target.closest&&e.target.closest("button,.ov,#arHud"))return;var t=e.touches[0];sx=t.clientX;sy=t.clientY;on=true;used=false},{passive:true});
 document.addEventListener("touchmove",function(e){if(!on||used||!ARENA||ARENA.kind!=="lk")return;var t=e.touches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))<28)return;used=true;lkInput(Math.abs(dx)>Math.abs(dy)?(dx<0?"kiri":"kanan"):(dy<0?"atas":"bawah"))},{passive:true});
 document.addEventListener("touchend",function(){on=false},{passive:true})})();
function lkMove(dt){var A=ARENA;if(jumpReq){jumpReq=false;lkInput("atas")}
 if(A.done||A.ph==="mulai"){pos.x=A.lx;return false}
 var tx=lkLaneX(A,A.lane);A.lx+=(tx-A.lx)*Math.min(1,dt*14);
 if(A.y>0||A.vy>0){A.vy-=LK_G*dt;A.y+=A.vy*dt;if(A.y<=0){A.y=0;A.vy=0}}
 if(A.slide>0)A.slide-=dt;
 var vt=A.ph==="baca"?LK_VR:Math.min(LK_VMAX,LK_V0+A.k*0.35);if(A.pw.kilat>0&&A.ph!=="baca")vt*=1.45;if(A.stun>0){A.stun-=dt;vt*=0.35}if(A.ph==="akhir"&&A.endT)vt=Math.max(0,A.v-dt*20);
 A.v+=(vt-A.v)*Math.min(1,dt*(A.stun>0?8:2.2));var dz=A.v*dt;A.dist+=dz;
 pos.x=A.lx;pos.z-=dz;pos.y=A.O.y+A.y;heading=Math.PI;walk+=dt*(8+A.v*0.6);
 if(avatar)avatar.scale.y=A.slide>0?0.55:1;if(typeof avTag!=="undefined"&&avTag)avTag.visible=false;
 return A.v>0.5&&A.y<=0}
function lkHit(A,o){if(A.pw.kilat>0){o.hit=true;lkClear(A,o);return}if(A.pw.papan>0){o.hit=true;A.pw.papan=0;lkClear(A,o);try{SFX.coin()}catch(e){}lobiBig("🛹 Terlindungi!");setTimeout(function(){if(ARENA===A&&A.ph!=="akhir")lobiBig(null)},700);return}o.hit=true;A.stun=0.9;A.gap=Math.max(2.2,A.gap-4);A.score=Math.max(0,A.score-20);lkClear(A,o);try{SFX.no()}catch(e){}lobiBig("💥 Aduh!");setTimeout(function(){if(ARENA===A&&A.ph!=="akhir")lobiBig(null)},700)}
function lkPower(A,kind){A.pw[kind]=kind==="papan"?20:kind==="magnet"?10:5;try{SFX.win()}catch(e){}var nm={papan:"🛹 Papan pelindung!",magnet:"🧲 Magnet koin!",kilat:"⚡ Lari kilat!"}[kind];lobiBig(nm);setTimeout(function(){if(ARENA===A&&(A.ph==="lari"||A.ph==="baca"))lobiBig(null)},900)}
function lkReadT(s){return Math.max(4.5,Math.min(11,3+String(s.q||"").length/16+(s.opsi||[]).join("").length/30))}
function lkTick(dt){var A=ARENA,now=performance.now(),P=A.parts;if(A.done)return;
 if(A.ph==="mulai"){var el=(now-A.phT)/1000,n=3-Math.floor(el);if(n>0)lobiBig(String(n));else{lobiBig("🏃 LARI!");try{SFX.win()}catch(e){}A.ph="lari";A.phT=now;setTimeout(function(){if(ARENA===A&&A.ph==="lari")lobiBig(null)},900)}}
 else if(A.ph==="lari"&&(now-A.phT)/1000>(A.k===0&&!A.res?3:5)){lkAsk(A)}
 else if(A.ph==="hasil"&&(now-A.phT)/1000>1.3){lobiBig(null);if(A.k<A.N&&A.k>0&&A.k%2===0)lkTema(A,(A.k/2)%LK_TEMA.length);if(A.k>=A.N){A.ph="akhir";A.phT=now;var fz=pos.z-A.v*3.2-14;lkMk(A,"finis",0,fz);A.finZ=fz}else{A.ph="lari";A.phT=now}}
 /* gerbang */
 if(A.gate&&!A.gate.passed&&pos.z<=A.gate.z){var G=A.gate;G.passed=true;var it=A.list[G.k],slot=G.lanes[A.lane],ok=slot===it.s.jawab;
  if(Q&&A.t){if(slot!=null&&slot>=0)Q.pick[G.k]=slot;Q.dt[G.k]=Math.round((now-A.qT0)/100)/10;Q.i=G.k;ujSave()}
  belGame(it.s,it.mp||(A.lat&&A.lat.m),ok,null,slot!=null&&slot>=0?slot:null);A.res=ok;if(ok){A.benar++;A.score+=100;A.koin+=5;A.gap=Math.min(14,A.gap+3);try{SFX.ok()}catch(e){}var bonus=A.rnd()<0.5?["papan","magnet","kilat"][Math.floor(A.rnd()*3)]:null;lobiBig("✅ Benar! +5 🪙"+(bonus?" "+{papan:"🛹",magnet:"🧲",kilat:"⚡"}[bonus]:""));if(bonus){A.pw[bonus]=bonus==="papan"?20:bonus==="magnet"?10:5}}
  else{A.salah++;A.stun=1.1;A.gap=Math.max(2.2,A.gap-5);try{SFX.no()}catch(e){}lobiBig("❌ "+(it.s.tipe==="bs"?it.s.opsi[it.s.jawab].toUpperCase():AR_L[it.s.jawab]+". "+String(it.s.opsi[it.s.jawab]).slice(0,22)))}
  A.k=G.k+1;A.ph="hasil";A.phT=now;A.gateZ=null}
 if(A.gate&&A.gate.passed&&pos.z<A.gate.z-20){P.g.remove(A.gate.g);A.gate=null}
 /* finis */
 if(A.ph==="akhir"&&A.finZ!=null&&pos.z<=A.finZ&&!A.endT){A.endT=now;lobiBig(A.benar===A.N?"🏆 SEMPURNA!":"🏁 FINISH!");try{SFX.win()}catch(e){}}
 if(A.endT&&now-A.endT>2600){lkEnd();return}
 /* isi lintasan di depan */
 var ahead=pos.z-150;if(A.spawnZ>ahead&&A.ph!=="akhir"){var z1=A.spawnZ-40,blockFrom=A.gateZ!=null?A.gateZ+26:null,blockTo=A.gateZ!=null?A.gateZ-6:null;
  if(blockFrom!=null&&A.spawnZ>blockTo&&z1<blockFrom){lkSpawn(A,A.spawnZ,Math.max(z1,blockFrom),true);var cz=Math.min(A.spawnZ,blockFrom);for(var l=0;l<LK_N;l++){if(A.gate&&A.gate.lanes[l]<0)continue;for(var c=0;c<3;c++)lkMk(A,"koin",l,cz-4-c*2.2)}lkSpawn(A,blockTo,z1,true)}
  else lkSpawn(A,A.spawnZ,z1,A.ph!=="baca"||true);A.spawnZ=z1}
 /* tabrakan & koin */
 var hb=A.slide>0?1.0:1.9,pz=A.pz==null?pos.z:A.pz;A.pz=pos.z;
 for(var i=P.objs.length-1;i>=0;i--){var o=P.objs[i];if(o.z>pos.z+12){lkClear(A,o);P.objs.splice(i,1);continue}if(o.hit)continue;
  var near=(function(oz){return function(d){return oz<=pz+d&&oz>=pos.z-d}})(o.z);
  if(o.type==="koin"&&o.c)o.c.rotation.z+=dt*4;
  if(o.type==="pu"){o.c.rotation.y+=dt*2;o.c.position.y=1.3+Math.sin(now/250)*0.2;if(near(1.2)&&Math.abs(lkLaneX(A,o.lane)-A.lx)<1.25&&A.y<2.8){o.hit=true;lkClear(A,o);lkPower(A,o.kind)}continue}
  if(o.type==="koin"&&A.pw.magnet>0&&o.z<pos.z+2&&o.z>pos.z-16){var gp=o.g.position,tx2=A.lx,ty2=A.O.y+A.y,tz2=pos.z;gp.x+=(tx2-gp.x)*Math.min(1,dt*9);gp.y+=(ty2-gp.y)*Math.min(1,dt*9);gp.z+=(tz2-gp.z)*Math.min(1,dt*9);if(Math.abs(gp.z-tz2)<1.4&&Math.abs(gp.x-tx2)<1.4){o.hit=true;A.koin++;A.score+=10;lkClear(A,o);try{if(A.koin%3===0)SFX.coin()}catch(e){}}continue}
  var dx=Math.abs(lkLaneX(A,o.lane)-A.lx);
  if(o.type==="koin"){if(near(1.1)&&dx<1.2&&A.y<2.2){o.hit=true;A.koin++;A.score+=10;lkClear(A,o);try{if(A.koin%3===0)SFX.coin()}catch(e){}}continue}
  if(o.type==="finis")continue;
  var dep=o.type==="gerobak"?1.9:0.35;if(near(dep)&&dx<1.25){
   if(o.type==="palang"&&A.y>0.95)continue;if(o.type==="atas"&&hb<1.5)continue;if(A.stun>0)continue;lkHit(A,o)}}
 /* pemandangan bergerak */
 P.side.forEach(function(sg){if(sg.position.z>pos.z+16){sg.position.z-=8*14;lkSide(A,sg,sg.userData.i)}});
 ["papan","magnet","kilat"].forEach(function(k2){if(A.pw[k2]>0)A.pw[k2]=Math.max(0,A.pw[k2]-dt)});
 P.shield.visible=A.pw.papan>0||A.pw.kilat>0;if(P.shield.visible){P.shield.position.set(A.lx,A.O.y+A.y+1.4,pos.z);P.shield.material.color.set(A.pw.kilat>0?"#facc15":"#22d3ee");P.shield.scale.y=A.slide>0?0.6:1}
 P.sea.position.z=pos.z;
 P.ground.position.z=pos.z;P.road.position.z=pos.z-60;P.rt.offset.y=-(A.dist/8)%1;
 if(A.stun<=0)A.gap=Math.min(14,A.gap+dt*0.6);
 var gz=pos.z+A.gap;P.goose.position.set(P.goose.position.x+(A.lx-P.goose.position.x)*Math.min(1,dt*3),A.O.y,gz);var ph=now/90;P.gl[0].position.z=Math.sin(ph)*0.3;P.gl[1].position.z=-Math.sin(ph)*0.3;
 if(A.gap<4&&Math.floor(now/600)!==A.honk){A.honk=Math.floor(now/600);try{SFX.no()}catch(e){}}
 A.score+=dt*A.v*0.5;
 lkHud(now);if(Q&&A.t&&Q.batas&&srv()>Q.batas+4000)arenaFinish()}
function lkAsk(A){var it=A.list[A.k],T=lkReadT(it.s),D=6+LK_VR*T+Math.max(0,A.v-LK_VR)*1.2;A.gateZ=pos.z-D;
 for(var i=A.parts.objs.length-1;i>=0;i--){var o=A.parts.objs[i];if(o.z<A.gateZ+26&&o.z>A.gateZ-6){lkClear(A,o);A.parts.objs.splice(i,1)}}
 A.gate=lkGate(A,A.k,A.gateZ);for(var l=0;l<LK_N;l++){if(A.gate.lanes[l]<0)continue;for(var c=0;c<3;c++)lkMk(A,"koin",l,A.gateZ+18-c*2.2)}
 A.ph="baca";A.phT=performance.now();A.qT0=A.phT;try{SFX.click()}catch(e){}}
function lkHud(now){var A=ARENA,e=arHudEl(),h,kk=Math.min(A.k,A.N-1),meter=Math.round(A.dist);
 var bd=["papan","magnet","kilat"].filter(function(k2){return A.pw[k2]>0}).map(function(k2){return'<span class="lkpw">'+{papan:"🛹",magnet:"🧲",kilat:"⚡"}[k2]+" "+Math.ceil(A.pw[k2])+"s</span>"}).join("");
 var top='<div class="arh"><b>🏃 Lari Kilat</b>'+bd+'<span>Soal '+(Math.min(A.k+(A.ph==="baca"?1:0),A.N)||1)+'/'+A.N+'</span><span>⭐ '+A.benar+'</span><span>🪙 '+A.koin+'</span><span>📏 '+meter+' m</span></div>';
 if(A.ph==="baca"&&A.gate){var it=A.list[A.gate.k],s=it.s,bs=s.tipe==="bs",left=Math.max(0,Math.ceil((pos.z-A.gate.z)/Math.max(1,A.v)));
  h=top+'<div class="arq">'+esc(s.q)+'</div><div class="aro">'+s.opsi.map(function(o,i){var c=bs?(i?"#ef4444":"#22c55e"):AR_C[i];return'<div class="ar1" style="--c:'+c+'"><i>'+(bs?(i?"S":"B"):AR_L[i])+'</i>'+esc(o)+'</div>'}).join("")+'</div><div class="mut" style="font-size:12px">'+(A.gap<5?"🪿 Angsanya mengejar! ":"")+'Gerbang dalam '+left+' detik: pindah ke lajur jawabanmu</div>'}
 else if(A.ph==="mulai")h=top+'<div class="arq">Bersiap...</div><div class="mut" style="font-size:12px">'+(isTouch?"Geser kiri/kanan untuk pindah lajur, atas untuk lompat, bawah untuk merunduk.":"←/→ pindah lajur, ↑ atau Spasi lompat, ↓ merunduk.")+'</div>';
 else if(A.ph==="akhir")h=top+'<div class="arq">'+(A.endT?"🏁 Selesai! "+A.benar+" dari "+A.N+" benar":"Lari ke garis FINISH!")+'</div>';
 else h=top+'<div class="arq">'+(A.gap<5?"🪿 Awas, angsanya mengejar!":"Kumpulkan koin, hindari rintangan!")+'</div><div class="mut" style="font-size:12px">Soal berikutnya segera muncul</div>';
 if(h!==A.hk){A.hk=h;e.innerHTML=h}}
function lkEnd(){var A=ARENA;if(!A||A.done)return;
 if(A.t){if(Q)Q.lk=Math.round(A.score);document.body.classList.remove("inrun");if(avatar)avatar.scale.y=1;arenaFinish();return}
 A.done=true;var b=A.benar,n=A.N,kn=A.koin,sc=Math.round(A.score);addCoins(kn);addXp(10+b*5);
 P.stats.lari=(P.stats.lari||0)+1;if(!P.stats.lariBest||sc>P.stats.lariBest)P.stats.lariBest=sc;save();
 document.body.classList.remove("inrun");if(avatar)avatar.scale.y=1;arenaLeave(true);lkResult(A,sc)}
function lkShareUrl(){return location.origin+location.pathname.replace(/index\.html$/,"")+"#lari"}
function lkResult(A,sc){var el=$("ovLari"),b=A.benar,n=A.N,rek=P.stats.lariBest===sc,guru=!LIC&&!PDP;
 var h='<div class="lrres"><div style="font-size:54px;line-height:1">'+(b===n?"🏆":"🏃")+'</div><h3 style="margin:6px 0 2px">'+(b===n?"Sempurna!":"Lari Kilat selesai!")+'</h3><div class="mut">'+esc(A.lat&&A.lat.m?A.lat.m.nama:"")+'</div>'
  +'<div class="lrst"><div><b>'+b+'/'+n+'</b>soal benar</div><div><b>🪙 '+A.koin+'</b>koin</div><div><b>'+Math.round(A.dist)+' m</b>jarak</div><div><b>'+sc+'</b>skor'+(rek?' 🎉 rekor!':'')+'</div></div>'
  +'<div class="mut" style="font-size:12px">Rekor terbaikmu: <b>'+(P.stats.lariBest||sc)+'</b></div>'
  +'<div class="row" style="justify-content:center"><button class="btn green" data-lra="lagi">▶ Main lagi</button><button class="btn" data-lra="wa">📤 Tantang teman via WA</button></div>'
  +'<div class="row" style="justify-content:center;margin-top:6px"><button class="btn sm gray" data-lra="ganti">📚 Ganti soal</button><button class="btn sm gray" data-lra="tutup">Jelajah ZuperVerse</button></div>'
  +(guru?'<div class="lrcta">👩‍🏫 <b>Bapak/Ibu guru?</b> Pakai soal Anda sendiri, murid lari bersamaan, dan nilainya otomatis masuk dashboard.<div class="row" style="justify-content:center;margin-top:8px"><a class="btn sm yel" href="guru.html#harga" target="_blank" rel="noopener">Lihat langganan guru ➜</a></div></div>':'')+'</div>';
 el.querySelector(".lrPick").style.display="none";var r=el.querySelector(".lrRes");r.innerHTML=h;r.style.display="block";el._last=A.lat;el._sc=sc;el._b=b;el._n=n;el.classList.add("show");setMode("menu")}
/* 🎮 menu "Main Sekarang": pilih mode */
function openMain(){if(ARENA||WAIT||DROP||LOBI){toast("Selesaikan dulu lomba atau tantangan yang sedang berjalan.",3000);return}$("mnUlang").innerHTML=belUlangHTML();$("ovMain").classList.add("show");if(mode==="play")setMode("menu")}
function quickEnter(){if(mode!=="landing")return;$("landing").classList.add("hide");if(!P.name)P.name="Pemain";if(!avatar)rebuildAvatar();avatar.visible=true;pos.set(CUR.spawn[0],CUR.spawn[1],CUR.spawn[2]);$("hud").classList.add("show");hud();setMode("play")}
/* latihan solo Jatuh Bangun / Jembatan Juara (tidak dinilai) */
function startLatihan(kind,m){var id=900000+Math.floor(Math.random()*90000),now=srv();
 var t={id:id,lat:true,judul:(kind==="arena"?"Jatuh Bangun":"Jembatan Juara")+" • "+m.nama,mapel:m.id,mapel_nama:m.nama,jumlah:kind==="arena"?8:6,acak:1,hasil:1,serentak:1,jenis:kind};
 var r={mulai:now,batas:now+20*60000,now:now};
 if(mode==="menu")setMode("play");
 if(m.id==="_campur"){var mm={id:"_campur",nama:m.nama,warna:"#facc15",soal:shuffle(m.soal.slice())};var keep=data.mapel;data.mapel=data.mapel.concat([mm]);try{if(kind==="arena")startArena(t,r);else startJembatan(t,r)}finally{data.mapel=keep}}
 else{if(kind==="arena")startArena(t,r);else startJembatan(t,r)}
 if(Q&&Q.tan===t){Q.svK=null}}
function latihanSelesai(){var A=ARENA,b=0,n=Q.list.length;Object.keys(Q.pick).forEach(function(i){var it=Q.list[i];if(it&&Q.pick[i]===it.s.jawab)b++});Q.finished=true;
 var kind=Q.tan.jenis,mid=Q.tan.mapel;var kn=b*5;addCoins(kn);addXp(10+b*5);save();var top=kind==="arena"&&A&&A.tier===AR_T-1;
 setTimeout(function(){zDlg({ic:b===n?"🏆":kind==="arena"?"🤸":"🌉",t:(kind==="arena"?"Jatuh Bangun":"Jembatan Juara")+" selesai!",m:"Benar "+b+" dari "+n+" soal • 🪙 +"+kn+" koin"+(top?" • 👑 Kamu sampai di Puncak!":"")+belSaran(),ok:"Main lagi",no:"Selesai",cb:function(){var ms=$("ovLari")._ms||[],mm=ms.filter(function(x){return x.id===mid})[0];if(mm)startLatihan(kind,mm);else openLari(kind)}})},300)}
/* 🎁 versi gratis: langsung main dari halaman depan atau link #lari */
function lariGratis(){if(!renderer){toast("Perangkat ini belum mendukung grafis 3D");return}$("landing").classList.add("hide");if(!P.name)P.name="Pemain";
 if(!avatar)rebuildAvatar();avatar.visible=true;pos.set(CUR.spawn[0],CUR.spawn[1],CUR.spawn[2]);$("hud").classList.add("show");hud();setMode("play");openLari()}
/* pilih mapel untuk latihan Lari Kilat */
function openLari(kind){kind=kind||"lari";var ms=data.mapel.filter(function(m){return m.soal.some(function(s){return qChoice(s)&&s.opsi&&s.opsi.length>=2&&s.opsi.length<=4})});
 if(!ms.length){toast("Belum ada soal pilihan ganda atau benar/salah untuk Lari Kilat.",4000);return}
 if(ms.length>1){var all=[];ms.forEach(function(m){all=all.concat(m.soal)});ms=[{id:"_campur",nama:"🎲 Campur semua mapel",warna:"#facc15",soal:all}].concat(ms)}
 var el=$("ovLari");el._kind=kind;$("lrTitle").textContent={lari:"🏃 Lari Kilat",arena:"🤸 Jatuh Bangun",jembatan:"🌉 Jembatan Juara"}[kind];
 $("lrDesc").innerHTML={lari:'Lari otomatis, kumpulkan koin, hindari rintangan, dan masuk ke <b>gerbang jawaban yang benar</b> sebelum angsa menyusul! Ambil 🛹 papan pelindung, 🧲 magnet, dan ⚡ lari kilat di jalan. Pilih soalnya:',arena:'Menara 4 lantai. Berdiri di lantai warna jawabanmu sebelum waktu habis. <b>Benar naik satu lantai, salah jatuh!</b> Pilih soalnya:',jembatan:'Berdiri diam 2 detik di lantai jawabanmu. <b>Benar membuka jembatan</b> ke pulau berikutnya, salah dapat soal pengganti. Pilih soalnya:'}[kind];
 el.querySelector(".lrList").innerHTML=ms.map(function(m,i){return'<button class="btn" data-lr="'+i+'" style="justify-content:flex-start;border-left:6px solid '+(m.warna||"#3b82f6")+'">'+esc(m.nama)+'</button>'}).join("");
 el.querySelector(".lrPick").style.display="block";el.querySelector(".lrRes").style.display="none";el._ms=ms;el.classList.add("show");if(mode==="play")setMode("menu")}

/* ---------- 🌉 JEMBATAN JUARA: pulau bertingkat, benar maju, salah tertahan (soal pengganti) ---------- */
var JB_D=36,JB_H=2.2,JB_HOLD=2000,JB_T=25000,JB_L=9;
function jbIslO(i){var A=ARENA;return{x:A.O.x,y:A.O.y+i*JB_H,z:A.O.z-i*JB_D}}
function jbTiles(ig){var tiles=[];[[-5.5,-5.5],[5.5,-5.5],[-5.5,5.5],[5.5,5.5]].forEach(function(p,i){var m=B(10.6,1,10.6,"#888",p[0],-0.5,p[1],ig);m.material=arTileMat(AR_C[i]);tiles.push({m:m,x:p[0],z:p[1],w:11,d:11,lay:4,slot:i,y:0,drop:false,on:false,lab:null})});
 [[-5.5,0],[5.5,0]].forEach(function(p,i){var m=B(10.6,1,21.6,"#888",p[0],-0.5,p[1],ig);m.material=arTileMat(i?"#ef4444":"#22c55e");m.visible=false;tiles.push({m:m,x:p[0],z:p[1],w:11,d:22,lay:2,slot:i,y:-40,drop:true,on:false,lab:null})});return tiles}
function jbBuild(O,N){var g=new THREE.Group();g.position.set(O.x,O.y,O.z);g.userData.dyn=true;var isl=[];
 for(var i=0;i<=N;i++){var ig=new THREE.Group();ig.position.set(0,i*JB_H,-i*JB_D);g.add(ig);
  if(i===N){mesh(cyl(12,8,2,24),"#fde68a",0,-1,0,ig);mesh(cyl(9,3,7,10),"#a16207",0,-5.5,0,ig,false);var cr=new THREE.Group();cr.position.set(0,5,0);ig.add(cr);mesh(cyl(1.6,1.6,0.9,8),"#facc15",0,0,0,cr);for(var k=0;k<5;k++){var a=k/5*Math.PI*2;mesh(G.sph,"#facc15",Math.sin(a)*1.5,0.9,Math.cos(a)*1.5,cr).scale.setScalar(0.35)}
   var fs=sprite([{t:"🏆 FINISH",s:90,y:80,c:"#fde68a"}],512,160,8,2.5,{bg:"rgba(15,18,45,.85)",border:"#facc15",bw:8,rad:28});fs.position.set(0,9.5,0);ig.add(fs);isl.push({g:ig,fin:true,cr:cr});break}
  B(22,1,5,"#e2e8f0",0,-0.5,13.5,ig);mesh(cyl(8,3,5,6),"#6d28d9",0,-4.5,1,ig,false);
  [[-11.2,-11.2],[11.2,-11.2],[-11.2,15.8],[11.2,15.8]].forEach(function(p){B(0.4,1.4,0.4,"#fbbf24",p[0],0.7,p[1],ig)});
  var num=sprite([{t:"PULAU "+(i+1),s:70,y:64,c:"#ffffff"}],420,128,5,1.5,{bg:"rgba(15,18,45,.8)",border:"#22d3ee",bw:6,rad:24});num.position.set(-9,3,14);ig.add(num);
  var br=new THREE.Group();br.position.set(0,0,-11);ig.add(br);var plank=B(4,0.5,JB_L,"#b45309",0,-0.25,-JB_L/2,br);B(0.25,1,JB_L,"#78350f",-2,0.4,-JB_L/2,br);B(0.25,1,JB_L,"#78350f",2,0.4,-JB_L/2,br);br.rotation.x=Math.atan2(JB_H,JB_L);br.scale.z=0.001;br.visible=false;
  isl.push({g:ig,tiles:jbTiles(ig),br:br,brs:0,solved:false})}
 scene.add(g);return{g:g,isl:isl}}
function startJembatan(t,r){if(!lobiOk()){startUjian(t,r);return}
 var MP=tanMapels(t),parts=[],pool=data.mapel;
 if(r&&r.rahasia&&r.rahasia.length){try{var rp=validate({judul:"r",mapel:clone(r.rahasia)});pool=rp.mapel.concat(data.mapel.filter(function(x){return!rp.mapel.some(function(y){return y.id===x.id})}))}catch(e){}}
 if(MP)MP.list.forEach(function(x){var mm=pool.filter(function(y){return y.id===x.id})[0];if(mm)parts.push({m:mm,n:x.n})});
 if(!parts.length){var m0=pool.filter(function(x){return x.id===t.mapel})[0];if(m0)parts.push({m:m0,n:t.jumlah})}
 var okS=function(s){return qChoice(s)&&s.opsi&&s.opsi.length>=2&&s.opsi.length<=4},rf=rngSeed(((t.id||1)*7919+29)>>>0),list=[],all=[];
 parts.forEach(function(pp){var src=pp.m.soal.filter(okS);src.forEach(function(s){all.push({s:s,mp:pp.m})});if(t.acak)src=sshuf(src,rf);src.slice(0,pp.n).forEach(function(s){list.push({s:s,mp:pp.m,ord:s.opsi.map(function(o,i){return i})})})});
 var multi=parts.length>1;if(multi&&MP.urut!=="mapel")list=sshuf(list,rf);list=list.slice(0,15);
 if(!list.length){toast("Mapel tantangan ini belum punya soal pilihan ganda atau benar/salah untuk Jembatan Juara.",5000);return}
 var m=multi?{id:"_gabung",nama:parts.map(function(pp){return pp.m.nama}).join(" + ")}:parts[0].m;
 Q={log:[],t0:Date.now(),type:"ujian",m:m,multi:multi,tan:t,batas:r.batas,list:list,i:0,pick:{},dt:{},locked:false,finished:false,arena:1};
 Q.svK=ujKey(t);Q.svSig="jb:"+list.map(function(it){return skey(it.s)}).join(",");var sv=lsGet(Q.svK,null),c0=0;if(sv&&sv.batas===r.batas&&sv.sig===Q.svSig&&sv.pick){Q.pick=sv.pick;Q.dt=sv.dt||{};Q.t0=sv.t0||Q.t0;c0=Math.max(0,Math.min(list.length,sv.i||0))}
 if(ARENA)arenaLeave(true);
 var Z=CUR.spawn||[0,0,0],O={x:Z[0],y:AR_Y,z:Z[2]+40},pv=AR_PREV||{x:pos.x,y:pos.y,z:pos.z,h:heading};AR_PREV=null;
 ARENA={kind:"jb",id:t.id,t:t,O:O,list:list,all:all,rq:sshuf(all,rngSeed((Date.now()%100000)+7)),ri:0,N:list.length,c:c0,q:null,qT0:0,hold:null,lockT:0,parts:jbBuild(O,list.length),prev:pv,done:false,hk:"",cd:camWant,fin:false};
 for(var i=0;i<c0;i++){var I=ARENA.parts.isl[i];I.solved=true;I.brs=1;I.br.visible=true;I.br.scale.z=1}
 camDist=camWant=Math.max(camWant,window.innerWidth<700?24:20);jbSpawn();
 $("hud").classList.add("show");setMode("play");arHudEl().style.display="block";lobiHud();rtHello("z");rtZ();try{SFX.win()}catch(e){}
 toast(c0?"▶ Lanjut dari Pulau "+(c0+1)+".":"🌉 Jawab benar untuk membuka jembatan ke pulau berikutnya!",3500)}
function jbSpawn(){var A=ARENA,o=jbIslO(Math.min(A.c,A.N));pos.x=o.x+(Math.random()-0.5)*12;pos.z=o.z+(A.c>=A.N?6:14);pos.y=o.y+0.3;vy=0;heading=Math.PI;yaw=0;pitch=0.7;if(camPos)camPos.set(pos.x,pos.y+10,pos.z+14)}
function jbNextItem(cur){var A=ARENA;for(var n=0;n<A.rq.length+1;n++){var it=A.rq[A.ri%A.rq.length];A.ri++;if(!cur||it.s!==cur.s||A.rq.length<2){var s=it.s,ord=s.opsi.map(function(o,i){return i});if(s.tipe!=="bs")ord=sshuf(ord,Math.random);return{s:s,mp:it.mp,ord:ord,first:false}}}return null}
function jbSetQ(){var A=ARENA,I=A.parts.isl[A.c],it=A.q,n=it.s.opsi.length,lay=n===2?2:4,bs=it.s.tipe==="bs";Q.i=A.c;
 I.tiles.forEach(function(tl){var on=tl.lay===lay&&tl.slot<n;if(tl.lab){I.g.remove(tl.lab);if(tl.lab.material.map)tl.lab.material.map.dispose();tl.lab=null}
  if(on){tl.m.visible=true;tl.drop=false;tl.on=true;var col=lay===2&&bs?(tl.slot?"#ef4444":"#22c55e"):AR_C[tl.slot];tl.m.material.color.set(col);if(tl.m.material.emissive)tl.m.material.emissive.set("#000000");
   var lab=arLabel(lay===2&&bs?(tl.slot?"SALAH":"BENAR"):AR_L[tl.slot],tl.w,lay===2?11:tl.d,col);lab.position.set(tl.x,tl.y+0.04,tl.z);I.g.add(lab);tl.lab=lab}else{tl.drop=true;tl.on=false}});
 A.qT0=srv();A.hold=null;A.lockT=0;ujSave()}
function jbOnIsl(x,z){var A=ARENA,i=Math.round(-(z-A.O.z)/JB_D);return Math.max(0,Math.min(A.N,i))}
function jbTileAt(I,dx,dz){for(var i=0;i<I.tiles.length;i++){var t=I.tiles[i];if(t.on&&!t.drop&&Math.abs(dx-t.x)<=t.w/2&&Math.abs(dz-t.z)<=t.d/2)return t}return null}
function jbGround(x,z){var A=ARENA,i0=jbOnIsl(x,z);for(var i=Math.max(0,i0-1);i<=Math.min(A.N,i0+1);i++){var o=jbIslO(i),dx=x-o.x,dz=z-o.z,I=A.parts.isl[i];
  if(I.fin){if(dx*dx+dz*dz<=144)return o.y;continue}
  if(Math.abs(dx)<=11&&dz>=11&&dz<=16)return o.y;
  if(Math.abs(dx)<11&&Math.abs(dz)<11){if(i!==A.c||!A.q)return o.y;var t=jbTileAt(I,dx,dz);if(t&&t.y>-0.3)return o.y;continue}
  if((I.solved||i<A.c)&&I.brs>0.95&&Math.abs(dx)<=2&&dz<=-11&&dz>=-11-JB_L)return o.y+(-11-dz)/JB_L*JB_H}
 return null}
function jbCommit(slot){var A=ARENA,it=A.q,s=it.s,I=A.parts.isl[A.c],cs=it.ord.indexOf(s.jawab),ok=slot!=null&&slot===cs;
 if(it.first){if(slot!=null)Q.pick[A.c]=it.ord[slot];else delete Q.pick[A.c];Q.dt[A.c]=Math.round((srv()-A.qT0)/100)/10}belGame(s,it.mp,ok,cs,slot!=null?it.ord[slot]:null);
 I.tiles.forEach(function(tl){if(!tl.on)return;if(tl.slot!==cs)tl.drop=true;else if(tl.m.material.emissive)tl.m.material.emissive.set("#3f3f00")});
 A.lockT=srv();A.hold=null;
 if(ok){try{SFX.ok()}catch(e){}lobiBig("✅ Benar!");setTimeout(function(){lobiBig(null)},1300);I.solved=true;I.br.visible=true;A.c++;A.q=null;A.lockT=0;ujSave();toast(A.c>=A.N?"🏆 Seberangi jembatan terakhir menuju FINISH!":"🌉 Jembatan terbuka! Seberangi ke Pulau "+(A.c+1)+".",2500)}
 else{try{SFX.no()}catch(e){}lobiBig(slot==null?"⏰ Waktu habis":"❌ Runtuh!");setTimeout(function(){lobiBig(null)},1300);A.wrong=it;ujSave()}}
function jbHud(now){var A=ARENA,e=arHudEl(),h,sc=0;Object.keys(Q.pick).forEach(function(i){var it=A.list[i];if(it&&Q.pick[i]===it.s.jawab)sc++});
 var ahead=0;Object.keys(RT.peers||{}).forEach(function(id){var p=RT.peers[id];if(p&&!p.guru&&p.tgt&&p.tgt[2]<pos.z-6)ahead++});
 var top='<div class="arh"><b>🌉 Pulau '+Math.min(A.c+1,A.N)+'/'+A.N+'</b><span>⭐ '+sc+' benar</span>'+(ahead?'<span>🏃 '+ahead+' di depanmu</span>':'');
 if(A.fin){h=top+'</div><div class="arq">🏆 Kamu sampai di FINISH!</div>'}
 else if(!A.q||A.lockT){var msg=A.c>=A.N?"Seberangi jembatan menuju 🏆 FINISH":A.lockT&&A.wrong?"Lantai runtuh! Soal pengganti segera muncul…":jbOnIsl(pos.x,pos.z)<A.c?"✅ Benar! Seberangi jembatan ke Pulau "+(A.c+1):"Masuk ke lantai jawaban Pulau "+(A.c+1);h=top+'</div><div class="arq">'+msg+'</div>'}
 else{var it=A.q,s=it.s,bs=s.tipe==="bs",tl=Math.max(0,Math.ceil((A.qT0+JB_T-now)/1000)),hp=A.hold?Math.min(1,(now-A.hold.t0)/JB_HOLD):0;
  h=top+'<span class="art'+(tl<=5?" hot":"")+'">⏱ '+tl+'</span></div><div class="arq">'+(it.first?'':'<small style="color:#fde68a">🔁 Soal pengganti • </small>')+esc(s.q)+'</div><div class="aro">'+it.ord.map(function(oi,j){var c=bs?(j?"#ef4444":"#22c55e"):AR_C[j];return'<div class="ar1'+(A.hold&&A.hold.slot===j?" win":"")+'" style="--c:'+c+'"><i>'+(bs?(j?"S":"B"):AR_L[j])+'</i>'+esc(s.opsi[oi])+'</div>'}).join("")+'</div><div class="mut" style="font-size:12px;margin-top:4px">'+(A.hold?'🔒 Mengunci jawaban '+(bs?(A.hold.slot?"SALAH":"BENAR"):AR_L[A.hold.slot])+'… '+Math.round(hp*100)+'%':'Berdiri diam 2 detik di lantai jawabanmu untuk mengunci.')+'</div>'}
 if(h!==A.hk){A.hk=h;e.innerHTML=h}}
function jbTick(dt){var A=ARENA;if(!A||A.done)return;var now=srv();
 if(!A.fin&&A.c>=A.N&&jbOnIsl(pos.x,pos.z)===A.N&&pos.y>=jbIslO(A.N).y-0.6){A.fin=true;try{SFX.win()}catch(e){}lobiBig("🏆 FINISH!");setTimeout(function(){lobiBig(null);arenaFinish()},3200)}
 if(!A.fin&&A.c<A.N){var oc=jbIslO(A.c),onI=jbOnIsl(pos.x,pos.z)===A.c&&pos.y>=oc.y-0.6&&pos.z-oc.z<=16.5;
  if(!A.q&&!A.lockT&&onI&&pos.z-oc.z<11.5){var first=Q.pick[A.c]===undefined&&!Q.dt[A.c];A.q=first?{s:A.list[A.c].s,mp:A.list[A.c].mp,ord:A.list[A.c].ord,first:true}:jbNextItem(null);jbSetQ()}
  if(A.lockT&&A.wrong&&now-A.lockT>2400){A.lockT=0;var w=A.wrong;A.wrong=null;A.q=jbNextItem(w);jbSetQ()}
  if(A.q&&!A.lockT){var I=A.parts.isl[A.c],t=pos.y>=oc.y-0.6?jbTileAt(I,pos.x-oc.x,pos.z-oc.z):null;
   if(t){if(!A.hold||A.hold.slot!==t.slot)A.hold={slot:t.slot,t0:now};else if(now-A.hold.t0>=JB_HOLD)jbCommit(t.slot)}else A.hold=null;
   if(A.q&&!A.lockT&&now-A.qT0>JB_T)jbCommit(null)}}
 var c0=Math.max(0,A.c-1);for(var i=c0;i<=Math.min(A.N-1,A.c);i++){var I2=A.parts.isl[i];I2.tiles.forEach(function(tl){var tg=tl.drop?-40:0;if(Math.abs(tl.y-tg)>0.01){tl.y+=(tg-tl.y)*Math.min(1,dt*(tl.drop?1.6:5));tl.m.position.y=tl.y-0.5;if(tl.lab)tl.lab.position.y=tl.y+0.04}});
  if(I2.solved&&I2.brs<1){I2.brs=Math.min(1,I2.brs+dt*1.5);I2.br.scale.z=Math.max(0.001,I2.brs)}}
 var oo=jbIslO(Math.min(A.c,A.N));if(pos.y<oo.y-10){jbSpawn();toast("💦 Byuur! Kembali ke tepi Pulau "+Math.min(A.c+1,A.N)+".",1800)}
 jbHud(now);if(Q&&Q.batas&&now>Q.batas+1500)arenaFinish()}
/* ---------- 🌀 ZONA AMAN MENYEMPIT & 🎁 PETI HADIAH (sesi petualangan) ---------- */
var ZN=null;
function znHash(s){var h=2166136261;s=String(s);for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function zoneStart(){zoneStop();if(!ADV||ADV.done||!ADV.t||+ADV.t.menit<4)return;var D=ADV.t.menit*60000;ZN={D:D,S:ADV.batas-D,id:ADV.id,open:{},chests:[],out:false,warnT:0,lastPh:-1,dropped:{}};zoneRebuild();toast("🌀 Zona aman akan menyempit! Ikuti panah biru dan cari 🎁 peti hadiah yang jatuh dari langit.",5500)}
function zoneStop(){if(!ZN)return;zoneClear();ZN=null;var a=$("znHud"),w=$("znWarn");if(a)a.style.display="none";if(w)w.style.display="none"}
function zoneClear(){if(!ZN)return;if(ZN.wall)scene.remove(ZN.wall);if(ZN.next)scene.remove(ZN.next);ZN.chests.forEach(function(c){if(c.g)scene.remove(c.g);var i=INTER.indexOf(c.it);if(i>=0)INTER.splice(i,1)});ZN.chests=[]}
function zoneRebuild(){if(!ZN)return;zoneClear();var rf=rngSeed(znHash(ZN.id+":"+CUR.z+":"+ADV.batas)),doors=INTER.filter(function(i){return i.type==="door"&&!advLock(i.m)});
 var lim=CUR.r||BOUND,c0={x:0,z:0},fin=doors.length?doors[Math.floor(rf()*doors.length)]:{x:(rf()-0.5)*lim,z:(rf()-0.5)*lim};
 var cF={x:fin.x*0.85,z:fin.z*0.85},R0=lim*1.5,P=[0.30,0.55,0.80],RR=[R0,R0*0.62,R0*0.4,Math.max(16,lim*0.24)],T=Math.min(30000,ZN.D*0.08);
 ZN.ph=P.map(function(f,i){return{t:ZN.S+f*ZN.D,dur:T,r0:RR[i],r1:RR[i+1],c0:{x:c0.x+(cF.x-c0.x)*(i/3),z:c0.z+(cF.z-c0.z)*(i/3)},c1:{x:c0.x+(cF.x-c0.x)*((i+1)/3),z:c0.z+(cF.z-c0.z)*((i+1)/3)}}});
 ZN.R0=R0;ZN.c0=c0;
 var mat=new THREE.MeshBasicMaterial({color:"#3b82f6",transparent:true,opacity:0.3,side:THREE.DoubleSide,depthWrite:false});ZN.wall=new THREE.Mesh(new THREE.CylinderGeometry(1,1,60,72,1,true),mat);ZN.wall.position.y=28;ZN.wall.userData.dyn=true;scene.add(ZN.wall);
 var nm=new THREE.MeshBasicMaterial({color:"#ffffff",transparent:true,opacity:0.55,side:THREE.DoubleSide,depthWrite:false});ZN.next=new THREE.Mesh(new THREE.CylinderGeometry(1,1,1.2,72,1,true),nm);ZN.next.position.y=0.6;ZN.next.userData.dyn=true;scene.add(ZN.next);
 // jadwal peti hadiah
 var n=Math.max(2,Math.min(8,Math.round(ADV.t.menit/2)));for(var k=0;k<n;k++){var tt=ZN.S+(k+0.6)/n*ZN.D*0.88,zc=zoneAt(tt),a=rf()*Math.PI*2,d=Math.sqrt(rf())*zc.r*0.7,x=zc.x+Math.sin(a)*d,z=zc.z+Math.cos(a)*d;
  if(CUR.r){var dd=Math.hypot(x,z);if(dd>CUR.r-4){x*=(CUR.r-4)/dd;z*=(CUR.r-4)/dd}}else{x=Math.max(-BOUND+4,Math.min(BOUND-4,x));z=Math.max(-BOUND+4,Math.min(BOUND-4,z))}
  var key=CUR.z+":"+k;if(ZN.open[key])continue;ZN.chests.push({k:key,t:tt,x:x,z:z,g:null,it:null,landed:false})}}
function zoneAt(t){var ph=ZN.ph,c=ZN.c0,r=ZN.R0,nx=null;for(var i=0;i<ph.length;i++){var p=ph[i];if(t<p.t){nx=p;break}var f=Math.min(1,(t-p.t)/p.dur);r=p.r0+(p.r1-p.r0)*f;c={x:p.c0.x+(p.c1.x-p.c0.x)*f,z:p.c0.z+(p.c1.z-p.c0.z)*f};if(f<1){nx=p;break}}
 return{x:c.x,z:c.z,r:r,nx:nx}}
function zoneIn(x,z){if(!ZN)return true;var zc=zoneAt(srv());return Math.hypot(x-zc.x,z-zc.z)<=zc.r}
function petiMesh(){var g=new THREE.Group();B(1.6,1,1.1,"#92400e",0,0.5,0,g);B(1.7,0.18,1.2,"#fbbf24",0,1.02,0,g);B(1.66,0.45,1.16,"#b45309",0,1.3,0,g);B(0.3,0.4,0.08,"#fde68a",0,0.95,0.6,g);
 var beam=new THREE.Mesh(new THREE.CylinderGeometry(0.55,0.55,70,10,1,true),new THREE.MeshBasicMaterial({color:"#fde047",transparent:true,opacity:0.32,side:THREE.DoubleSide,depthWrite:false}));beam.position.y=35;g.add(beam);
 var ch=new THREE.Group();var cn=new THREE.Mesh(new THREE.SphereGeometry(1.6,12,6,0,Math.PI*2,0,Math.PI/2),new THREE.MeshLambertMaterial({color:"#ef4444",side:THREE.DoubleSide}));ch.add(cn);ch.position.y=4.2;g.add(ch);
 g.userData={beam:beam,chute:ch,dyn:true};return g}
function zoneFrame(dt,now){if(!ZN||!ADV||ADV.done)return;var t=srv(),zc=zoneAt(t);
 ZN.wall.scale.set(zc.r,1,zc.r);ZN.wall.position.x=zc.x;ZN.wall.position.z=zc.z;
 if(zc.nx){ZN.next.visible=true;ZN.next.scale.set(zc.nx.r1,1,zc.nx.r1);ZN.next.position.x=zc.nx.c1.x;ZN.next.position.z=zc.nx.c1.z}else ZN.next.visible=false;
 var dx=pos.x-zc.x,dz=pos.z-zc.z,dist=Math.hypot(dx,dz),out=dist>zc.r;
 if(out!==ZN.out){ZN.out=out;$("znWarn").style.display=out?"block":"none";if(out)toast("⚠️ Kamu di luar zona aman! Gerakanmu melambat dan gedung di luar zona terkunci.",3000)}
 // panah & info
 var h=$("znHud");h.style.display="flex";var tx=out?zc.x:(zc.nx?zc.nx.c1.x:zc.x),tz=out?zc.z:(zc.nx?zc.nx.c1.z:zc.z),ex=tx-pos.x,ez=tz-pos.z,ed=Math.hypot(ex,ez);
 var fx=ex*-Math.sin(yaw)+ez*-Math.cos(yaw),rx=ex*Math.cos(yaw)+ez*-Math.sin(yaw),ang=Math.atan2(rx,fx);
 var nxt=zc.nx?(t<zc.nx.t?"🌀 Menyempit dalam "+fmtLeft(zc.nx.t-t):"🌀 Zona sedang menyempit!"):"🌀 Zona terakhir";
 var tgtD=out?Math.round(dist-zc.r):(zc.nx&&Math.hypot(pos.x-zc.nx.c1.x,pos.z-zc.nx.c1.z)>zc.nx.r1?Math.round(Math.hypot(pos.x-zc.nx.c1.x,pos.z-zc.nx.c1.z)-zc.nx.r1):0);
 $("znArr").style.transform="rotate("+ang+"rad)";$("znArr").style.opacity=tgtD>0?1:0.25;$("znTxt").innerHTML=nxt+'<br><small>'+(out?"⚠️ Masuk zona: "+tgtD+" m":tgtD>0?"Zona berikutnya: "+tgtD+" m":"✅ Kamu di zona aman")+'</small>';
 h.classList.toggle("out",out);
 // peti
 ZN.chests.forEach(function(c){if(t<c.t)return;if(!c.g){c.g=petiMesh();c.g.position.set(c.x,Math.max(0,60-(t-c.t)/1000*9),c.z);scene.add(c.g);if(!ZN.dropped[c.k]){ZN.dropped[c.k]=1;toast("🎁 Peti hadiah jatuh dari langit! Cari cahaya kuning.",3500);try{SFX.coin()}catch(e){}}}
  var gy=groundAt(c.x,c.z),y=Math.max(gy,60-(t-c.t)/1000*9);c.g.position.y=y;
  if(!c.landed&&y<=gy+0.01){c.landed=true;c.g.userData.chute.visible=false;c.it={type:"peti",x:c.x,z:c.z,r:2.8,label:"🎁 Buka peti hadiah",peti:c};INTER.push(c.it)}
  c.g.userData.beam.material.opacity=0.22+0.12*Math.sin(now/300);c.g.rotation.y+=dt*(c.landed?0.6:1.5)})}
function petiOpen(it){var c=it.peti;if(!c||!ZN||ZN.open[c.k])return;if(!zoneIn(c.x,c.z)){toast("🌀 Peti ini sudah di luar zona aman.",2500);return}
 openQuiz({type:"npc",npc:{d:{n:"🎁 Peti Hadiah",ic:"🎁"},cool:0,peti:c}})}
function petiDone(c,ok){if(!ZN)return;ZN.open[c.k]=1;if(c.g)scene.remove(c.g);var i=INTER.indexOf(c.it);if(i>=0)INTER.splice(i,1);ZN.chests=ZN.chests.filter(function(x){return x!==c});
 if(ok){addCoins(40);addXp(30);toast("🎁 Peti terbuka! +40 koin dan +30 XP",3500);try{SFX.win()}catch(e){}}else toast("🔒 Jawaban kurang tepat, peti terkunci lagi. Cari peti berikutnya!",3500);hud()}

/* ---------- 🛫 LOBI 3D & TERJUN PARASUT (ala battle royale, versi belajar) ---------- */
var LOBI=null,DROP=null,LOBI_Y=92,LOBI_R=13;
/* peta pilihan guru: pindah dunia seketika sebelum lobi dibuat */
function lobiPeta(t){var z=t&&t.peta;if(!z||z===CUR.z)return;var w=z==="kota"?"kota":(ZONES[z]&&ZONES[z].w);if(!w)return;try{loadWorld(w,z==="kota"?"kota":z);pos.set(CUR.spawn[0],CUR.spawn[1],CUR.spawn[2])}catch(e){try{loadWorld("kota","kota")}catch(e2){}}}
/* 🎮 KODE MAIN: murid memasukkan 6 angka atau membuka link → langsung masuk lobi */
var MAINP=null;
function mainJoin(code,msg,btn){var say=function(t){if(msg)msg.textContent=t;else toast(t,4000)};if(!API_URL){say("Server belum terhubung.");return}if(btn)btn.disabled=true;say("🎮 Memeriksa kode main...");
 api("/main/cek",{kode:code}).then(function(r){if(btn)btn.disabled=false;say("");MAINP={kelas:r.kelas,t:r.tantangan};TAN.off=r.now-Date.now();
  if(CL&&CL.kode===r.kelas.kode){mainGo();return}
  openJoin(r.kelas.kode);var h2=$("ovJoin").querySelector("h2");if(h2)h2.textContent="🎮 "+r.tantangan.judul;jmsg("🏫 "+r.kelas.nama+(r.kelas.guru?" • "+r.kelas.guru:"")+". Isi nama panggilan dan nomor absen, lalu kamu langsung masuk lobi.","#a5f3fc")},
  function(e){if(btn)btn.disabled=false;say("❌ "+e.message)})}
function mainGo(){if(!MAINP)return;var t=MAINP.t;MAINP=null;var h2=$("ovJoin").querySelector("h2");if(h2)h2.textContent="🏫 Masuk Kelas";
 Array.prototype.forEach.call(document.querySelectorAll(".ov.show"),function(x){x.classList.remove("show")});
 if(mode==="landing"||!$("landing").classList.contains("hide")){if(!renderer){toast("Perangkat ini belum mendukung grafis 3D");return}$("landing").classList.add("hide");pos.set(CUR.spawn[0],CUR.spawn[1],CUR.spawn[2]);heading=0;yaw=Math.PI;if(!avatar)rebuildAvatar();avatar.visible=true;P.tipsShown=true;save();startPlay()}
 setTimeout(function(){mainEnter(t)},400)}
function mainEnter(t){if(!CL)return;api("/tantangan/mulai",{kode:CL.kode,token:CL.token,id:t.id}).then(function(r){TAN.off=r.now-Date.now();if(r.tunggu){waitEnter(t);return}tanStart(t,r)},function(er){toast("❌ "+er.message,4500);tanLoad()});tanLoad()}
function mainLink(code){return location.origin+location.pathname.replace(/index\.html$/,"")+"?main="+code+(API_URL&&API_URL!==API_DEFAULT?"&api="+encodeURIComponent(API_URL):"")}
function lobiOk(){return!!(avatar&&mode!=="landing"&&scene)}
function lobiBuild(O,t){var g=new THREE.Group();g.position.set(O.x,O.y,O.z);g.userData.dyn=true;
 mesh(cyl(LOBI_R+1.5,LOBI_R-2,3.2,28),"#8d6e63",0,-1.7,0,g);mesh(cyl(LOBI_R+1.5,LOBI_R+1.5,0.5,28),"#7cc576",0,0,0,g).position.y=-0.2;
 mesh(cyl(LOBI_R-4,2,6,10),"#6d4c41",0,-6,0,g);
 for(var i=0;i<20;i++){var a=i/20*Math.PI*2,x=Math.sin(a)*(LOBI_R+0.9),z=Math.cos(a)*(LOBI_R+0.9);B(0.25,1.3,0.25,"#fbbf24",x,0.6,z,g);var nx=Math.sin(a+Math.PI/20)*(LOBI_R+0.9),nz=Math.cos(a+Math.PI/20)*(LOBI_R+0.9),r=B(0.15,0.15,(LOBI_R+0.9)*0.33,"#f59e0b",(x+nx)/2,1.15,(z+nz)/2,g);r.rotation.y=a+Math.PI/20+Math.PI/2}
 // landasan bergaris & lingkaran lompat
 B(5,0.06,LOBI_R*1.6,"#475569",0,0.08,0,g,false);for(var k=-4;k<=4;k++)B(0.5,0.08,1.2,"#f8fafc",0,0.1,k*2.4,g,false);
 var ring=mesh(new THREE.RingGeometry(2.2,2.8,32),MB("#22d3ee"),0,0.12,-LOBI_R+3.5,g);ring.rotation.x=-Math.PI/2;
 // pesawat
 var pl=new THREE.Group();pl.position.set(-7.5,1.6,-4);pl.rotation.y=Math.PI*0.62;g.add(pl);
 mesh(cyl(1.1,1.1,7,12),"#e2e8f0",0,0,0,pl).rotation.x=Math.PI/2;mesh(G.sph,"#e2e8f0",0,0,3.5,pl).scale.set(1.1,1.1,1.4);mesh(cyl(0.2,1.1,2,12),"#cbd5e1",0,0,-4.4,pl).rotation.x=-Math.PI/2;
 B(9,0.2,1.6,"#2563eb",0,-0.2,0.4,pl);B(3.4,0.18,1,"#2563eb",0,0.3,-4.6,pl);B(0.18,1.6,1.1,"#ef4444",0,1,-4.6,pl);B(0.8,0.5,0.1,"#38bdf8",0,0.45,4.25,pl);
 for(var w=-1;w<=1;w+=2){mesh(cyl(0.18,0.18,0.9,8),"#334155",w*1.6,-1.1,1.4,pl);mesh(G.wheel,"#111827",w*1.6,-1.5,1.4,pl).rotation.z=Math.PI/2}
 // bendera & balon hias
 [[9,8],[-6,-9],[6,-8]].forEach(function(p,i){B(0.15,4,0.15,"#e5e7eb",p[0],2,p[1],g);var f=B(1.4,0.9,0.06,["#ef4444","#22c55e","#a855f7"][i],p[0]+0.75,3.5,p[1],g);f.castShadow=false});
 // awan di sekitar pulau
 for(var c=0;c<14;c++){var ca=c/14*Math.PI*2+Math.random()*0.3,cr=LOBI_R+8+Math.random()*16,cl=new THREE.Group();cl.position.set(Math.sin(ca)*cr,-6-Math.random()*10,Math.cos(ca)*cr);for(var q=0;q<4;q++){var s=mesh(G.sph,MB("#ffffff"),(q-1.5)*2.2,Math.random()*0.8,Math.random()*1.4,cl,false);s.scale.setScalar(1.8+Math.random()*1.6)}g.add(cl)}
 var sign=null;
 scene.add(g);return{g:g,sign:sign,ring:ring}}
function lobiSign(t,n,go){return sprite([{t:"⚡ "+String(t.judul||"Tantangan").slice(0,34),s:46,y:52,c:"#fde68a"},{t:go?"BERSIAP TERJUN!":"Menunggu guru menekan Mulai",s:40,y:112,c:"#fff"},{t:"👥 "+Math.max(1,n)+" teman siap",s:36,y:168,c:"#a5f3fc"}],640,210,11,3.6,{bg:"rgba(15,18,45,.86)",border:"#fbbf24",bw:8,rad:30})}
function lobiEnter(t){if(LOBI)lobiLeave(true);lobiPeta(t);var Z=CUR.spawn||[0,0,0],O={x:Z[0],y:LOBI_Y,z:Z[2]};
 LOBI={id:t.id,t:t,O:O,prev:{x:pos.x,y:pos.y,z:pos.z,h:heading},n:0,on:true,parts:lobiBuild(O,t)};
 pos.x=O.x+(Math.random()-0.5)*6;pos.z=O.z-1+(Math.random()-0.5)*3;pos.y=O.y+0.2;vy=0;heading=Math.PI;yaw=0;pitch=0.36;
 if(camPos)camPos.set(pos.x,pos.y+8,pos.z+12);
 $("hud").classList.add("show");setMode("play");lobiHud();rtHello("z");toast("🛫 Kamu di lobi. Tunggu guru menekan Mulai.",3000)}
function lobiHud(){var b=$("lobiBar");document.body.classList.toggle("inlobi",!!(LOBI||DROP||ARENA));if(!b)return;if(!LOBI&&!DROP){b.style.display="none";return}b.style.display="flex";
 if(DROP){$("lobiTxt").innerHTML="<b>🪂 Terjun!</b><small>Arahkan dengan joystick</small>";$("lobiOut").style.display="none";return}
 $("lobiTxt").innerHTML="<b>🛫 "+esc(LOBI.t.judul)+"</b><small>👥 "+Math.max(1,LOBI.n)+" siap • ⏳ menunggu guru</small>";$("lobiOut").style.display=""}
function lobiCount(n){if(!LOBI)return;LOBI.n=n;lobiHud()}
function lobiBig(txt){var e=$("lobiBig");if(!e)return;if(!txt){e.style.display="none";return}e.textContent=txt;e.style.display="block";e.classList.remove("pop");void e.offsetWidth;e.classList.add("pop")}
function lobiRemove(){if(!LOBI)return;var p=LOBI.parts;scene.remove(p.g);p.g.traverse(function(x){if(x.material&&x.material.map)x.material.map.dispose()})}
function lobiLeave(quiet){if(!LOBI)return;var pv=LOBI.prev;lobiRemove();LOBI=null;pos.x=pv.x;pos.y=pv.y;pos.z=pv.z;heading=pv.h;vy=0;if(camPos)camPos.set(pos.x,pos.y+8,pos.z+12);lobiBig(null);lobiHud();rtHello("z");if(!quiet)toast("Kamu keluar dari lobi.",2000)}
/* guru menekan Mulai: hitung mundur, lalu semua terjun */
function lobiDrop(after){if(!LOBI){after();return}var L=LOBI,adv=L.t.jenis==="petualangan",ang=Math.random()*Math.PI*2,sp=adv?3+Math.random()*3:1.2;
 L.on=false;lobiRemove();LOBI=null;rtHello("z");
 pos.y=L.O.y+2;vy=9;onGround=false;setMode("play");$("hud").classList.add("show");
 var chute=new THREE.Group(),cn=mesh(new THREE.SphereGeometry(2.6,14,8,0,Math.PI*2,0,Math.PI/2),MB("#f97316"),0,0,0,chute,false);cn.material=new THREE.MeshLambertMaterial({color:"#f97316",side:THREE.DoubleSide});
 for(var i=0;i<6;i++){var s=mesh(G.sph,MB(i%2?"#ffffff":"#2563eb"),Math.sin(i/6*6.28)*2.2,0.6,Math.cos(i/6*6.28)*2.2,chute,false);s.scale.set(0.9,0.5,0.9)}
 [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(o){var ln=B(0.04,3.2,0.04,"#e5e7eb",o[0]*1.1,-1.6,o[1]*1.1,chute,false);ln.rotation.z=-o[0]*0.3;ln.rotation.x=o[1]*0.3});
 chute.position.set(0,7.2,0);chute.visible=false;avatar.add(chute);
 DROP={after:after,t0:performance.now(),chute:chute,open:false,vx:Math.sin(ang)*sp,vz:Math.cos(ang)*sp,landed:false,adv:adv,tid:L.id};
 lobiBig(null);lobiHud();try{SFX.jump()}catch(e){}
 DROP.safe=setTimeout(function(){if(DROP&&!DROP.landed){pos.y=groundAt(pos.x,pos.z);vy=0;dropLand()}},16000)}
function dropTick(dt){if(!DROP||DROP.landed)return;var gy=groundAt(pos.x,pos.z),h=pos.y-gy;
 if(!DROP.open&&(h<24||performance.now()-DROP.t0>3000)&&vy<0){DROP.open=true;DROP.chute.visible=true;try{SFX.click()}catch(e){}}
 vy=CUR.swim?(DROP.open?-9:Math.min(vy,-16)):Math.max(vy,DROP.open?-9:-30);pitch+=(0.95-pitch)*Math.min(1,dt*2);pos.x+=DROP.vx*dt;pos.z+=DROP.vz*dt;
 if(DROP.chute.visible){DROP.chute.rotation.z=Math.sin(performance.now()/500)*0.08}
 if(onGround||h<=0.05)dropLand()}
function dropLand(){if(!DROP||DROP.landed)return;DROP.landed=true;clearTimeout(DROP.safe);var d=DROP;if(d.chute.parent)d.chute.parent.remove(d.chute);try{SFX.coin()}catch(e){}
 lobiBig("🎯 Mendarat!");setTimeout(function(){lobiBig(null)},900);DROP=null;lobiHud();rtHello("z");setTimeout(function(){try{d.after()}catch(e){}},d.adv?200:700)}
function lobiGround(x,z){if(!LOBI||!LOBI.on)return null;var dx=x-LOBI.O.x,dz=z-LOBI.O.z;return dx*dx+dz*dz<=(LOBI_R+0.6)*(LOBI_R+0.6)?LOBI.O.y:null}
function lobiClamp(){if(!LOBI||!LOBI.on)return;var dx=pos.x-LOBI.O.x,dz=pos.z-LOBI.O.z,d=Math.hypot(dx,dz),m=LOBI_R-0.4;if(d>m){pos.x=LOBI.O.x+dx/d*m;pos.z=LOBI.O.z+dz/d*m}if(pos.y<LOBI.O.y-4){pos.x=LOBI.O.x;pos.z=LOBI.O.z;pos.y=LOBI.O.y+1;vy=0}}
function lobiCalm(t){return!!t&&t.jenis!=="petualangan"&&(t.kategori==="sts"||t.kategori==="sas")}
function tanCurId(){if(LOBI)return LOBI.id;if(ARENA)return ARENA.id;if(DROP&&DROP.tid)return DROP.tid;if(ADV&&!ADV.done)return ADV.id;if(Q&&Q.type==="ujian"&&!Q.finished&&Q.tan&&Q.tan.id)return Q.tan.id;return null}
function lobiZone(){if(LOBI)return"lobi"+LOBI.id;if(ARENA)return"ar"+ARENA.id;var id=tanCurId();return id?("tg"+id+CUR.z).slice(0,20):CUR.z}
function rtZ(){if(!RT.on)return;try{rtHello("z");updOnline()}catch(e){}}
function inTanZone(z){return/^(lobi|tg)\d/.test(z||"")}
function lobiOff(){return LOBI?LOBI.O:ARENA?ARENA.O:null}

/* ---------- ⏳ ruang tunggu tantangan serentak ---------- */
var WAIT=null;
function waitEnter(t){WAIT={id:t.id,t:t,tm:null,go:false};if(lobiOk()&&P.settings.lobi!==false){lobiEnter(t);rtSend({t:"siap",id:t.id});waitUpd();waitPoll();SFX.click();return}setMode("menu");$("wTitle").textContent="⚡ "+t.judul;$("wInfo").textContent="📚 "+(t.mapel_nama||"")+" • "+t.jumlah+" soal • "+t.menit+" menit";$("wCount").textContent="";$("wBig").textContent="⏳";$("wMsg").textContent="Menunggu guru menekan Mulai...";$("ovWait").classList.add("show");rtSend({t:"siap",id:t.id});waitUpd();waitPoll();SFX.click()}
function waitUpd(){if(!WAIT||WAIT.go)return;var n=RT.roster.filter(function(r){return!r.g&&r.siap===WAIT.id}).length;if(LOBI)lobiCount(n);$("wCount").textContent=RT.on?"👥 "+Math.max(1,n)+" teman sudah di ruang tunggu":"📡 Tetap di sini. Tantangan akan dimulai otomatis."}
function waitPoll(){if(!WAIT)return;clearTimeout(WAIT.tm);WAIT.tm=setTimeout(function(){if(!WAIT||WAIT.go)return;rtSend({t:"siap",id:WAIT.id});api("/tantangan/mulai",{kode:CL.kode,token:CL.token,id:WAIT.id}).then(function(r){if(!WAIT||WAIT.go)return;if(r.tunggu)waitPoll();else waitGo(r)},function(er){toast("❌ "+er.message,4000);waitLeave()})},RT.on?25000:8000)}
function waitLeave(){if(!WAIT)return;clearTimeout(WAIT.tm);WAIT=null;rtSend({t:"siap",id:0});if(LOBI)lobiLeave(true);$("ovWait").classList.remove("show");if(mode==="menu")setMode("play")}
function waitGo(pre){if(!WAIT||WAIT.go)return;WAIT.go=true;clearTimeout(WAIT.tm);var t=WAIT.t,n=3;$("wMsg").textContent="Bersiap!";$("wCount").textContent="";
 if(LOBI){$("lobiTxt").innerHTML="<b>🚀 Guru menekan Mulai!</b><small>Bersiap terjun…</small>";$("lobiOut").style.display="none"}
 var tick=function(){if(!WAIT)return;$("wBig").textContent=n>0?String(n):"Mulai!";if(LOBI)lobiBig(n>0?String(n):(t.jenis==="arena"?"🤸 KE ARENA!":t.jenis==="jembatan"?"🌉 AYO!":t.jenis==="lari"?"🏃 SIAP LARI!":t.jenis==="detektif"?"🕵️ SELIDIKI!":t.jenis==="pasar"?"🏪 BUKA WARUNG!":lobiCalm(t)?"✏️ Mulai!":"🪂 TERJUN!"));try{n>0?SFX.click():SFX.win()}catch(e){}if(n-->0){setTimeout(tick,900);return}
  var run=function(r){if(!WAIT)return;TAN.off=r.now-Date.now();WAIT=null;rtSend({t:"siap",id:0});$("ovWait").classList.remove("show");if(LOBI){if(t.jenis==="detektif"||t.jenis==="pasar"){lobiLeave(true);lobiBig(null);tanStart(t,r)}else if((t.jenis==="arena"||t.jenis==="jembatan"||t.jenis==="lari")&&mode!=="landing"){AR_PREV=LOBI.prev;lobiRemove();LOBI=null;lobiBig(null);tanStart(t,r)}else if(lobiCalm(t)||mode==="landing"){lobiLeave(true);lobiBig(null);tanStart(t,r)}else lobiDrop(function(){tanStart(t,r)})}else tanStart(t,r)};
  if(pre&&!pre.tunggu)setTimeout(function(){run(pre)},500);else api("/tantangan/mulai",{kode:CL.kode,token:CL.token,id:t.id}).then(function(r){if(r.tunggu){WAIT.go=false;$("wBig").textContent="⏳";$("wMsg").textContent="Menunggu guru menekan Mulai...";waitPoll();return}run(r)},function(er){toast("❌ "+er.message,4000);waitLeave()})};
 tick()}
$("arClose").onclick=function(){$("ovAdvRes").classList.remove("show");setMode("play")};
$("lobiOut").onclick=function(){$("wLeave").onclick()};
$("wLeave").onclick=function(){ask("Kamu bisa kembali ke ruang tunggu lewat tombol ⚡ Tantangan.",waitLeave,{ic:"🚪",t:"Keluar dari ruang tunggu?",ok:"Keluar",no:"Tetap menunggu"})};
function tanStart(t,r){if(t.jenis==="petualangan")startPetualangan(t,r);else if(t.jenis==="arena")startArena(t,r);else if(t.jenis==="jembatan")startJembatan(t,r);else if(t.jenis==="lari")startLari(t,r);else if(t.jenis==="detektif")startDtkTan(t,r);else if(t.jenis==="pasar")startPsrTan(t,r);else startUjian(t,r)}
/* ---------- 🗺️ SESI PETUALANGAN BERWAKTU ---------- */
var ADV=null,ADV_LBL={gedung:"gedung selesai",benar:"jawaban benar",koin:"koin"};
function advTarget(t){var m=String(t&&t.target||"").match(/^(gedung|benar|koin):(\d+)$/);return m?{k:m[1],n:+m[2]}:null}
function advBase(){var g=0;Object.keys(P.stats.wdone||{}).forEach(function(w){g+=Object.keys(P.stats.wdone[w]).length});return{g:g,b:P.stats.correct||0,a:P.stats.answered||0,c:P.coins||0}}
function advProg(){var n=advBase();return{g:Math.max(0,n.g-ADV.b0.g),b:Math.max(0,n.b-ADV.b0.b),a:Math.max(0,n.a-ADV.b0.a),c:Math.max(0,n.c-ADV.b0.c)}}
function advVal(p,k){return k==="gedung"?p.g:k==="koin"?p.c:p.b}
function startPetualangan(t,r){TAN.off=r.now-Date.now();ADV={t:t,id:t.id,batas:r.batas,t0:Date.now(),b0:advBase(),tg:advTarget(t),done:false};rtZ();
 Array.prototype.forEach.call(document.querySelectorAll(".ov.show"),function(x){x.classList.remove("show")});if(mode!=="landing"){setMode("play");$("hud").classList.add("show")}else enterGame();
 toast("🗺️ Petualangan dimulai! "+(ADV.tg?"Target: "+ADV.tg.n+" "+ADV_LBL[ADV.tg.k]+". ":"")+"Waktumu "+t.menit+" menit.",5000);try{SFX.win()}catch(e){}advTick();setTimeout(zoneStart,1200)}
function advTick(){var el=$("hAdv");if(!ADV||ADV.done){if(el)el.style.display="none";return}var left=ADV.batas-srv(),p=advProg(),tg=ADV.tg;
 el.style.display="block";el.textContent="⏱ "+fmtLeft(left)+(tg?" • 🎯 "+Math.min(advVal(p,tg.k),tg.n)+"/"+tg.n:" • ✅ "+p.b);el.classList.toggle("low",left<60000);
 if(tg&&!ADV.hit&&advVal(p,tg.k)>=tg.n){ADV.hit=true;toast("🎯 Target tercapai! Terus kumpulkan poin sampai waktu habis.",4500);try{SFX.win()}catch(e){}}
 if(left<=0)advEnd("waktu")}
setInterval(advTick,1000);
function advEnd(why){if(!ADV||ADV.done)return;ADV.done=true;rtZ();zoneStop();var p=advProg(),tg=ADV.tg,t=ADV.t,tNow=Date.now();
 if(mode==="quiz"&&Q&&!Q.finished){clearInterval(qTimer);Q.finished=true;$("ovQuiz").classList.remove("show")}
 Array.prototype.forEach.call(document.querySelectorAll(".ov.show"),function(x){x.classList.remove("show")});stopSpeak();setMode("menu");
 var nilai=tg?Math.min(100,Math.round(advVal(p,tg.k)/tg.n*100)):(p.a?Math.round(p.b/p.a*100):0);
 rtSend({t:"ev",k:"petualangan",m:t.judul,n:nilai});
 P.history.unshift({t:tNow,mapel:"Sesi petualangan",paket:data.judul,benar:p.b,total:p.a,nilai:nilai,k:"tantangan",j:t.judul,w:CUR.w});P.history=P.history.slice(0,300);save();
 queue({sesi:{mapel:"_petualangan",nama:t.judul,benar:p.b,total:p.a,nilai:nilai,durasi:Math.round((tNow-ADV.t0)/1000),t:tNow,tt:srv(),dunia:CUR.w,tantangan:t.id}});
 $("arIcon").textContent=tg?(advVal(p,tg.k)>=tg.n?"🏆":"💪"):"🗺️";$("arTitle").textContent=why==="guru"?"⏹ Guru mengakhiri petualangan":"⏰ Waktu petualangan habis!";
 $("arSub").textContent=t.judul+(tg?" • target "+tg.n+" "+ADV_LBL[tg.k]+(advVal(p,tg.k)>=tg.n?" ✅ TERCAPAI":" • belum tercapai"):"");
 $("arStat").innerHTML='<div><b>'+p.g+'</b>Gedung selesai</div><div><b>'+p.b+'</b>Jawaban benar</div><div><b>+'+p.c+'</b>Koin</div>'+(tg?'<div><b>'+nilai+'%</b>Capaian target</div>':'');
 $("ovAdvRes").classList.add("show");ADV=null;advTick();try{SFX.win()}catch(e){}checkMissions()}
function kickedOut(){if(!CL)return;var kn=CL.kelas;try{if(LOBI)lobiLeave(true)}catch(e){}try{if(ARENA){ARENA.done=true;arenaLeave(true)}}catch(e){}try{if(Q&&Q.type==="ujian"&&!Q.finished){Q.finished=true;clearInterval(qTimer);$("ovQuiz").classList.remove("show")}}catch(e){}try{if(ADV&&!ADV.done){ADV.done=true;zoneStop()}}catch(e){}try{if(WAIT)WAIT=null;var ow=$("ovWait");if(ow)ow.classList.remove("show")}catch(e){}
 CL=null;lsSet(LS_CL,null);outbox=[];lsSet(LS_OUT,outbox);TAN.list=[];try{updTanUI()}catch(e){}rtClose();RT.stop=false;try{updClassUI()}catch(e){}try{lobiHud()}catch(e){}
 zDlg({ic:"🚫",t:"Kamu dikeluarkan dari kelas",m:"Guru mengeluarkanmu dari kelas "+(kn||"")+". Kamu masih bisa bermain sendiri. Bila ini keliru, hubungi gurumu.",ok:"Oke",alert:true})}
function rtTanGo(d){if(d.k==="akhiri"&&ARENA&&ARENA.id===d.id){arenaFinish();return}if(d.id<0){if(!GURU&&CL&&RT.me!=null&&-d.id===+RT.me)kickedOut();return}if(d.k==="akhiri"&&ADV&&ADV.id===d.id&&!ADV.done){advEnd("guru");if(CL)tanLoad();return}if(d.k==="mulai"){if(WAIT&&WAIT.id===d.id)waitGo(null);else if(CL)tanLoad()}
 else{if(WAIT&&WAIT.id===d.id){toast("⏹ Guru mengakhiri tantangan ini.",4000);waitLeave()}
  else if(mode==="quiz"&&Q&&Q.type==="ujian"&&Q.tan&&Q.tan.id===d.id&&!Q.finished){toast("⏹ Guru mengakhiri tantangan. Jawabanmu langsung dikirim.",4500);finishUjian()}if(CL)tanLoad()}}
$("hTan").onclick=openTan;$("pTan").onclick=function(){resumeGame();openTan()};
function rngSeed(seed){var s=seed>>>0;return function(){s=(s+0x6D2B79F5)>>>0;var x=Math.imul(s^(s>>>15),1|s);x=(x+Math.imul(x^(x>>>7),61|x))^x;return((x^(x>>>14))>>>0)/4294967296}}
function sshuf(a,rf){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(rf()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function fmtLeft(ms){var s=Math.ceil(Math.max(0,ms)/1000),m=Math.floor(s/60);return m+":"+("0"+(s%60)).slice(-2)}
/* ---------- tantangan beberapa mapel sekaligus ---------- */
function tanMapelPct(R){var sids={},out={};Object.keys(R.by).forEach(function(k){sids[R.by[k].sid]=1});DB_.jawaban.forEach(function(j){if(!sids[j[9]])return;var o=out[j[9]]=out[j[9]]||{},q=o["_"+j[1]]=o["_"+j[1]]||{n:0,ok:0};q.n++;q.ok+=j[6]});
 Object.keys(out).forEach(function(sid){var o=out[sid];Object.keys(o).forEach(function(k){if(k.charAt(0)==="_"){o[k.slice(1)]=Math.round(o[k].ok/o[k].n*100);delete o[k]}})});return out}
function tanMapels(t){var v=t&&t.mapels;if(!v)return null;if(typeof v==="string"){try{v=JSON.parse(v)}catch(e){return null}}return v&&Array.isArray(v.list)&&v.list.length?v:null}
function advLock(m){if(!ADV||ADV.done||!ADV.t)return false;var MP=tanMapels(ADV.t);return!!(MP&&!MP.list.some(function(x){return x.id===m.id}))}
/* ---------- penskoran asesmen: bobot per jenis soal / per soal + nilai sebagian ---------- */
var BOBOT0={pg:1,bs:1,isian:1,jodoh:1,urut:1,sebagian:1};
function tanBobot(t){var b=t&&t.bobot;if(typeof b==="string"){try{b=JSON.parse(b)}catch(e){b=null}}return Object.assign({},BOBOT0,b&&typeof b==="object"?b:{})}
function soalW(s,B){var w=+s.skor;if(w>0)return w;var v=B[s.tipe||"pg"];return v!=null&&!isNaN(+v)?+v:1}
function partCredit(s,r,B){if(r==null)return 0;if(qChoice(s))return r===s.jawab?1:0;if(checkAns(s,r))return 1;if(!B.sebagian)return 0;
 if(s.tipe==="jodoh"){var n=s.pasangan.length,c=0;s.pasangan.forEach(function(p,i){if(r[i]!=null&&normAns(r[i])===normAns(p[1]))c++});return n?c/n:0}
 if(s.tipe==="urut"){var n2=s.urutan.length,c2=0;(r||[]).forEach(function(k,i){if(i<n2&&s.urutan[k]!=null&&normAns(s.urutan[k])===normAns(s.urutan[i]))c2++});return n2?c2/n2:0}
 return 0}
var KAT={latihan:"Latihan",harian:"Asesmen Harian",sts:"STS (Tengah Semester)",sas:"SAS (Akhir Semester)"},KATS={latihan:"LAT",harian:"AH",sts:"STS",sas:"SAS"};
function startUjian(t,r){var MP=tanMapels(t),parts=[],pool=data.mapel;
 if(r&&r.rahasia&&r.rahasia.length){try{var rp=validate({judul:"r",mapel:clone(r.rahasia)});pool=rp.mapel.concat(data.mapel.filter(function(x){return!rp.mapel.some(function(y){return y.id===x.id})}))}catch(e){}}
 if(MP)MP.list.forEach(function(x){var mm=pool.filter(function(y){return y.id===x.id})[0];if(mm)parts.push({m:mm,n:x.n})});
 if(!parts.length){var m0=pool.filter(function(x){return x.id===t.mapel})[0];if(m0)parts.push({m:m0,n:t.jumlah})}
 if(!parts.length){toast("Soal mapel ini belum tersedia.");return}
 var rf=rngSeed(r.seed),list=[];
 parts.forEach(function(pp){var src=t.acak?sshuf(pp.m.soal,rf):pp.m.soal.slice();src.slice(0,Math.min(pp.n,src.length)).forEach(function(s){var ord=qChoice(s)?s.opsi.map(function(o,i){return i}):[];list.push({s:s,mp:pp.m,ord:s.tipe==="bs"?ord:(t.acak?sshuf(ord,rf):ord)})})});
 var multi=parts.length>1;if(multi&&MP.urut!=="mapel")list=sshuf(list,rf);
 var m=multi?{id:"_gabung",nama:parts.map(function(pp){return pp.m.nama}).join(" + ")}:parts[0].m;
 Q={log:[],t0:Date.now(),type:"ujian",m:m,multi:multi,tan:t,batas:r.batas,list:list,i:0,pick:{},dt:{},locked:false,finished:false};rtZ();
 /* ▶ lanjutkan jawaban bila murid keluar/tutup game lalu kembali (di perangkat yang sama, waktu tetap berjalan) */
 Q.svK=ujKey(t);Q.svSig=list.map(function(it){return skey(it.s)}).join(",");var sv=lsGet(Q.svK,null);
 if(sv&&sv.batas===r.batas&&sv.sig===Q.svSig&&sv.pick){Q.pick=sv.pick;Q.dt=sv.dt||{};Q.t0=sv.t0||Q.t0;Q.i=Math.max(0,Math.min(list.length-1,sv.i||0));var nj=Object.keys(Q.pick).length;if(nj)setTimeout(function(){toast("▶ Melanjutkan: "+nj+" dari "+list.length+" soal sudah kamu jawab sebelumnya.",4000)},400)}
 setMode("quiz");$("ovQuiz").classList.add("show");$("qExit").textContent="✕ Akhiri";showU();
 clearInterval(qTimer);var bar=$("qTimer"),tot=Math.max(1000,r.batas-r.now);
 qTimer=setInterval(function(){ujSave();var left=Q.batas-srv(),pc=Math.max(0,Math.min(100,left/tot*100));bar.style.width=pc+"%";bar.style.background=pc<15?"#ef4444":pc<40?"#fbbf24":"#4de08a";$("qCombo").textContent="⏱ Sisa waktu "+fmtLeft(left);
  if(left<=0){clearInterval(qTimer);toast("⏰ Waktu habis! Jawabanmu langsung dikirim.",3500);finishUjian()}},250)}
function showU(){if(P.settings.ttsAuto)setTimeout(qSpeak,250);var it=Q.list[Q.i],s=it.s;$("qTitle").textContent="⚡ "+Q.tan.judul;$("qHeart").textContent="";$("qNo").textContent="Soal "+(Q.i+1)+" dari "+Q.list.length+(Q.multi?" • 📚 "+it.mp.nama:"")+" • terjawab "+Object.keys(Q.pick).length;$("qText").textContent=s.q;
 var img=$("qImg");if(s.gambar){img.src=imgUrl(s.gambar);img.style.display="block"}else{img.removeAttribute("src");img.style.display="none"}
 $("qBahas").style.display="none";var box=$("qOpts");box.innerHTML="";Q.qT=performance.now();$("qTip").textContent=s.tipe&&s.tipe!=="pg"?TIPE[s.tipe]:"";
 if(!qChoice(s)){var pv=Q.pick[Q.i];renderQ(s,box,{label:pv?"💾 Simpan perubahan":"💾 Simpan jawaban",keep:true,prev:pv?pv.r:null,onDone:function(r){Q.pick[Q.i]={r:r,ok:checkAns(s,r)};$("qNext").style.display="inline-flex";$("qNo").textContent="Soal "+(Q.i+1)+" dari "+Q.list.length+" • terjawab "+Object.keys(Q.pick).length;SFX.click();toast("💾 Jawaban disimpan",1200)}})}
 else it.ord.forEach(function(oi,k){var b=document.createElement("button");b.className="opt"+(Q.pick[Q.i]===oi?" sel":"");b.textContent=String.fromCharCode(65+k)+".  "+s.opsi[oi];b._ok=oi===s.jawab;b._i=oi;
  b.onclick=function(){if(Q.finished)return;Q.pick[Q.i]=oi;Array.prototype.forEach.call(box.children,function(x){x.classList.toggle("sel",x===b)});$("qNext").style.display="inline-flex";$("qNo").textContent="Soal "+(Q.i+1)+" dari "+Q.list.length+" • terjawab "+Object.keys(Q.pick).length;SFX.click()};box.appendChild(b)});
 var last=Q.i>=Q.list.length-1;$("qNext").textContent=last?"Kirim Jawaban ✔":"Lanjut ➜";$("qNext").style.display=Q.pick[Q.i]!=null?"inline-flex":"none"}
function uNext(){stopSpeak();Q.dt[Q.i]=(Q.dt[Q.i]||0)+(performance.now()-Q.qT)/1000;if(Q.i>=Q.list.length-1){finishUjian();return}Q.i++;showU()}
function ujKey(t){return"zv_uj_"+(CL?CL.kode:"")+"_"+t.id}
function ujSave(){if(!Q||Q.type!=="ujian"||Q.finished||!Q.svK)return;var js=JSON.stringify([Q.pick,Q.i,Q.tier]);if(js===Q._sv)return;Q._sv=js;lsSet(Q.svK,{batas:Q.batas,sig:Q.svSig,pick:Q.pick,dt:Q.dt,i:Q.i,t0:Q.t0,tier:Q.tier||0})}
try{document.addEventListener("visibilitychange",function(){ujSave()});window.addEventListener("pagehide",function(){ujSave()})}catch(e){}
function finishUjian(){if(Q.finished)return;Q.finished=true;rtZ();try{if(Q.svK)localStorage.removeItem(Q.svK)}catch(e){}clearInterval(qTimer);$("ovQuiz").classList.remove("show");$("qExit").textContent="✕ Keluar";if(Q.dt&&Q.qT&&Q.pick[Q.i]!=null)Q.dt[Q.i]=(Q.dt[Q.i]||0)+(performance.now()-Q.qT)/1000;
 var t=Q.tan,m=Q.m,tot=Q.list.length,ben=0,rev=[];
 var B=tanBobot(t),skor=0,maks=0;
 Q.list.forEach(function(it,i){var p=Q.pick[i],obj=p!=null&&typeof p==="object",ok=obj?p.ok:p===it.s.jawab;if(ok)ben++;var w=soalW(it.s,B),cr=p==null?0:partCredit(it.s,obj?p.r:p,B);skor+=w*cr;maks+=w;it.cr=cr;var lg={m:(it.mp||m).id,s:skey(it.s),q:String(it.s.q).slice(0,300),p:p==null?-1:(obj?(ok?0:1):p),k:qChoice(it.s)?it.s.jawab:0,ok:ok?1:0,d:Math.round((Q.dt[i]||0)*10)/10,t:Date.now()};if(obj)lg.j={r:p.r,c:Math.round(cr*1000)/1000};Q.log.push(lg);rev.push({s:it.s,p:obj?p.r:p,ok:ok,cr:cr})});
 skor=Math.round(skor*100)/100;var score=maks?Math.round(skor/maks*100):Math.round(ben/tot*100),coins=ben*5,tNow=Date.now();rtSend({t:"ev",k:"tantangan",m:t.judul,n:score});P.history.unshift({t:tNow,mapel:m.nama,paket:data.judul,benar:t.hasil?ben:null,total:tot,nilai:t.hasil?score:null,k:"tantangan",j:t.judul,w:CUR.w});P.history=P.history.slice(0,300);P.coins+=coins;P.stats.answered+=tot;P.stats.correct+=ben;addXp(ben*10);save();hud();
 var HL=hasLvl(t.hasil);setMode("menu");$("trIcon").textContent=HL?(score>=80?"🏆":score>=60?"🎉":"💪"):"✅";$("trTitle").textContent=HL?"Tantangan selesai!":"Jawaban terkirim!";
 $("trSub").textContent=t.judul+" • "+m.nama+" • terjawab "+Object.keys(Q.pick).length+" dari "+tot+" soal";
 $("trStat").innerHTML=HL?'<div><b>'+score+'</b>Nilai</div><div><b>'+ben+'/'+tot+'</b>Benar</div><div><b>+'+coins+'</b>Koin</div>':'<div><b>+'+coins+'</b>Koin</div>';
 $("trReview").innerHTML=HL===2?'<div class="mut" style="margin-top:10px;text-align:center">🔒 Soal dan kunci jawaban tidak ditampilkan agar soal tetap rahasia.</div>':HL===1||HL===3?'<h3 style="font-family:var(--fh);margin:14px 0 6px">'+(HL===3?"🔑 Kunci jawaban":"📝 Pembahasan")+'</h3>'+rev.map(function(x,i){var s=x.s;return'<div class="item"><div class="iq">'+(i+1)+'. '+esc(s.q)+'</div><div style="margin-top:4px">'+(x.ok?'<span class="badge b-ok">✓ Benar</span>':x.cr>0?'<span class="badge b-mid">◐ Sebagian benar ('+Math.round(x.cr*100)+'%)</span>':'<span class="badge b-no">✗ '+(x.p==null?"Tidak dijawab":"Kurang tepat")+'</span>')+' Jawabanmu: <b>'+(x.p==null?"-":esc(ansText(s,x.p)))+'</b>'+(x.ok?'':' • Kunci: <b>'+esc(keyText(s))+'</b>')+'</div>'+(s.bahas&&HL===1?'<div class="mut" style="margin-top:4px">💡 '+esc(s.bahas)+'</div>':'')+'</div>'}).join(""):'<div class="mut" style="margin-top:10px;text-align:center">Gurumu akan menyampaikan nilainya nanti.</div>';
 $("trSync").textContent="📤 Mengirim jawaban ke guru...";$("ovTanRes").classList.add("show");if(t.hasil&&score>=80)SFX.win();else SFX.coin();
 queue({sesi:{mapel:m.id,nama:m.nama,benar:ben,total:tot,nilai:score,skor:skor,maks:maks,durasi:Math.round((Date.now()-Q.t0)/1000),t:tNow,tt:srv(),dunia:CUR.w,tantangan:t.id,lari:Q.lk||0},jawaban:Q.log}).then(function(){$("trSync").textContent=outbox.length?"⏳ Jawaban disimpan dan akan dikirim otomatis saat ada internet.":"✅ Jawaban sudah diterima guru.";tanLoad()})}
$("trClose").onclick=function(){$("ovTanRes").classList.remove("show");setMode("play")};

/* =================================================================
   DASHBOARD GURU: filter, tantangan, perkembangan, rapor
   ================================================================= */
var DF={sesi:[],jawaban:[],materi:[]};
function worldName(id){var w=WORLDS.filter(function(x){return x.id===id})[0];return w?w.ic+" "+w.nama:(id?id:"Tidak tercatat")}
function dFilt(){var r=DB_,since=dState.per?(r.now||Date.now())-dState.per*86400000:0,du=dState.dunia,pk=dState.paket,sd={};
 var sesi=r.sesi.filter(function(s){if(s[2]==="_petualangan")return false;var ok=s[8]>=since&&(!du||s[9]===du)&&(!pk||(pk==="-"?!s[12]:s[12]===pk));if(ok)sd[s[0]]=1;return ok&&s[2]!=="_gabung"});
 var jaw=r.jawaban.filter(function(j){return j[8]>=since&&(!(du||pk)||(j[9]&&sd[j[9]]))});
 var mat=r.materi.filter(function(x){return x[3]>=since});return{sesi:sesi,jawaban:jaw,materi:mat}}
function paketName(k){if(!k)return"";if(k==="-")return"Sebelum riwayat paket";var pn=DB_&&DB_.pnama||{};return pn[k]||("Paket "+k)}
function filtLabel(){return(dState.paket?paketName(dState.paket)+" • ":"")+(dState.dunia?worldName(dState.dunia):"Semua dunia")+" • "+(dState.per?dState.per+" hari terakhir":"Semua waktu")}
function toLocalInput(t){var d=new Date(t),p=function(n){return("0"+n).slice(-2)};return d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate())+"T"+p(d.getHours())+":"+p(d.getMinutes())}
function tanStat(t){var n=DB_.now||Date.now();if(t.aktif&&t.serentak){if(t.akhir||n>t.selesai||(t.go&&n>t.go+t.menit*60000))return["Selesai","b-na"];if(!t.go)return["Menunggu dimulai","b-mid"];return["Berlangsung","b-ok"]}return!t.aktif?["Nonaktif","b-na"]:n<t.mulai?["Terjadwal","b-mid"]:n>t.selesai?["Selesai","b-na"]:["Berlangsung","b-ok"]}
function tanRes(t,M){var by={};DB_.sesi.forEach(function(s){if(s[10]!==t.id)return;var o={nilai:s[6],benar:s[4],total:s[5],durasi:s[7],t:s[8],telat:s[11],sid:s[0],lari:s[16]||0};var c=by[s[1]];
  if(!c||(t.sekali?o.t<c.t:o.nilai>c.nilai))by[s[1]]=o});
 var run={};(DB_.tmulai||[]).forEach(function(x){if(x[0]===t.id&&!by[x[1]]){var bt=Math.min(t.selesai,x[2]+t.menit*60000);if((DB_.now||Date.now())<bt)run[x[1]]=bt}});return{by:by,run:run}}
function tanPeserta(t,R){R=R||tanRes(t);var j={};(DB_.tmulai||[]).forEach(function(x){if(x[0]===t.id)j[x[1]]=1});Object.keys(R.by).forEach(function(k){j[k]=1});Object.keys(R.run).forEach(function(k){j[k]=1});
 var mu=(DB_.murid||[]).slice().sort(function(a,b){return a.absen-b.absen});return{ya:mu.filter(function(u){return j[u.id]}),no:mu.filter(function(u){return!j[u.id]})}}
/* 🔁 koreksi ulang: hitung ulang nilai tantangan memakai kunci jawaban terbaru di paket kelas */
function tanKoreksi(t){var M=dModel(),B=tanBobot(t),byK={},byQ={};M.pk.mapel.forEach(function(m){m.soal.forEach(function(so){var x={s:so,q:String(so.q).slice(0,300)};byK[m.id+"|"+skey(so)]=x;if(!byQ[m.id+"|"+x.q])byQ[m.id+"|"+x.q]=x})});
 var ses=DB_.sesi.filter(function(z){return z[10]===t.id}),sid={},per={};ses.forEach(function(z){sid[z[0]]=z});DB_.jawaban.forEach(function(j){if(sid[j[9]])(per[j[9]]=per[j[9]]||[]).push(j)});
 var ch={},jw=[],out=[],up=0,dn=0,lama=0,mu={};
 ses.forEach(function(z){var dS=0,dB=0;(per[z[0]]||[]).forEach(function(j){var x=byK[j[1]+"|"+j[2]]||byQ[j[1]+"|"+j[3]];if(!x)return;var so=x.s,w=soalW(so,B),oOk=j[6]?1:0,nOk,oCr,nCr;
   if(qChoice(so)){nOk=j[4]>=0&&j[4]===so.jawab?1:0;oCr=oOk;nCr=nOk}
   else{var jj=null;try{jj=j[10]?JSON.parse(j[10]):null}catch(e){}if(!jj||jj.r==null){lama++;return}nOk=checkAns(so,jj.r)?1:0;nCr=partCredit(so,jj.r,B);oCr=jj.c!=null?+jj.c:oOk}
   if(nOk!==oOk||Math.abs(nCr-oCr)>1e-6){dS+=w*(nCr-oCr);dB+=nOk-oOk;ch[x.q]=1;var jo={sesi:z[0],s:j[2],ok:nOk,k:qChoice(so)?so.jawab:0};if(!qChoice(so))jo.j={r:jj.r,c:Math.round(nCr*1000)/1000};jw.push(jo);mu[z[1]]=1}});
  if(dS||dB){var benar=Math.max(0,z[4]+dB),skor=z[14]!=null?Math.max(0,Math.round((z[14]+dS)*100)/100):null,maks=z[15]||0,nil=maks&&skor!=null?Math.round(skor/maks*100):(z[5]?Math.round(benar/z[5]*100):0);nil=Math.max(0,Math.min(100,nil));if(nil>z[6])up++;else if(nil<z[6])dn++;out.push({id:z[0],nilai:nil,benar:benar,skor:skor})}});
 return{sesi:out,jawaban:jw,soal:Object.keys(ch).length,up:up,dn:dn,lama:lama,murid:Object.keys(mu).length}}
function tanKoreksiGo(t){var r=tanKoreksi(t),note=r.lama?" Catatan: "+r.lama+" jawaban isian/menjodohkan/mengurutkan dikirim sebelum fitur ini ada, jadi tidak bisa dikoreksi ulang.":"";
 if(!r.jawaban.length){info("Tidak ada nilai yang berubah. Pastikan kunci jawaban sudah diperbaiki di editor soal, lalu tekan 💾 Simpan dan pilih \"Ya, kirim\" ke kelas ini sebelum koreksi ulang."+note,{ic:"🔁",t:"Koreksi ulang"});return}
 ask(r.soal+" soal berubah penilaiannya, mengenai jawaban "+r.murid+" murid. Nilai berubah: "+r.up+" naik, "+r.dn+" turun"+(r.murid>r.up+r.dn?", "+(r.murid-r.up-r.dn)+" tetap":"")+". Rekap, analisis, dan papan peringkat ikut berubah."+note,function(){api("/tantangan/koreksi",{lic:licBody(),kode:dState.kode,pin:dState.pin,id:t.id,sesi:r.sesi,jawaban:r.jawaban}).then(function(){toast("🔁 Nilai "+r.sesi.length+" murid sudah dikoreksi ulang",3500);return loadDash(false)},function(e){info(e.message)})},{ic:"🔁",t:"Koreksi ulang \""+t.judul+"\"?",ok:"Simpan nilai baru"})}
function tf(id,def){return dState.tf&&dState.tf[id]!=null?dState.tf[id]:def}
var TMODE={
 kuis:{ph:"Asesmen Harian Pecahan",ic:"🎯",nm:"Kuis Berwaktu",c:"#3b82f6",ds:"Latihan atau asesmen harian. Murid mengerjakan sendiri dalam rentang waktu, nilai dan pembahasan langsung tampil.",tags:["Terjadwal","Masuk rekap (Harian)"],tf:{tJenis:"ujian",tKat:"harian",tSerentak:false,tSekali:true,tAcak:true,tHasil:true,tMenit:20}},
 lomba:{ph:"Lomba Cepat Perkalian",ic:"🏁",nm:"Lomba Kelas",c:"#f59e0b",ds:"Semua murid berkumpul di lobi Pulau Langit, terjun dengan parasut, lalu adu cepat menjawab. Tayangkan papan peringkat di proyektor.",tags:["Serentak","Lobi + parasut","Papan peringkat"],tf:{tJenis:"ujian",tKat:"latihan",tSerentak:true,tSekali:true,tAcak:true,tHasil:true,tMenit:10}},
 ujian:{ph:"STS Matematika Ganjil",ic:"📝",nm:"Ujian STS / SAS",c:"#a855f7",ds:"Serentak dan tenang: soal diacak, sekali kerja, nilai disembunyikan dari murid, dan otomatis masuk rekap nilai rapor.",tags:["Serentak","Tanpa terjun","Masuk rapor"],tf:{tJenis:"ujian",tKat:"sts",tSerentak:true,tSekali:true,tAcak:true,tHasil:false,tMenit:60}},
 battle:{ph:"Battle Nusantara Jumat",ic:"🪂",nm:"Battle Petualangan",c:"#22c55e",ds:"Lobi, terjun parasut, zona aman menyempit, dan peti hadiah. Murid bertualang dan menaklukkan gedung mapel sebelum waktu habis.",tags:["Serentak","Zona menyempit","Peti hadiah"],tf:{tJenis:"petualangan",tMenit:20}},
 arena:{ph:"Jatuh Bangun Pecahan",ic:"🤸",nm:"Jatuh Bangun",c:"#06b6d4",ds:"Menara 4 lantai di arena 3D. Soal muncul bersamaan, murid lari ke lantai warna jawaban A/B/C/D. Benar: dilontarkan naik satu lantai. Salah: lantai runtuh dan jatuh ke bawah. Siapa bertahan di 👑 Puncak?",tags:["Serentak","Menara 3D","PG & Benar/Salah","Latihan & lomba, bukan ujian"],tf:{tJenis:"ujian",tKat:"latihan",tSerentak:true,tSekali:true,tAcak:true,tHasil:1,tMenit:10}},
 lari:{ph:"Lari Kilat Pecahan",ic:"🏃",nm:"Lari Kilat",c:"#22c55e",ds:"Murid berlari otomatis di lintasan 4 lajur, menghindari rintangan dan mengumpulkan koin. Setiap soal muncul gerbang A/B/C/D, murid pindah ke lajur jawabannya. Salah? Tersandung dan dikejar angsa!",tags:["Serentak","Lari seru","PG & Benar/Salah","Latihan & lomba, bukan ujian"],tf:{tJenis:"ujian",tKat:"latihan",tSerentak:true,tSekali:true,tAcak:true,tHasil:1,tMenit:10}},
 pasar:{ph:"Pasar Nusantara Kelas 5A",ic:"🏪",nm:"Pasar Nusantara",c:"#eab308",ds:"Satu kelas berjualan serentak dengan pembeli yang sama: hitung total, kembalian, diskon, timbangan, dan pecahan. Nilai = persentase pembeli yang dilayani dengan tepat.",tags:["Serentak","Numerasi","Papan peringkat"],tf:{tJenis:"ujian",tKat:"latihan",tSerentak:true,tSekali:true,tAcak:false,tHasil:1,tMenit:15}},
 detektif:{ph:"Detektif Kelas 5A: Misteri Piala",ic:"🕵️",nm:"Detektif Kota Ilmu",c:"#a855f7",ds:"Satu kelas memecahkan kasus serentak: baca teks di 4 lokasi, jawab soal pemahaman untuk mendapat petunjuk, lalu tentukan pelakunya. Nilai = ketelitian membaca + kasus terpecahkan.",tags:["Serentak","Literasi membaca","Papan peringkat"],tf:{tJenis:"ujian",tKat:"latihan",tSerentak:true,tSekali:true,tAcak:false,tHasil:1,tMenit:15}},
 jembatan:{ph:"Jembatan Juara Pecahan",ic:"🌉",nm:"Jembatan Juara",c:"#f97316",ds:"Lintasan pulau-pulau di langit. Jawab benar, jembatan ke pulau berikutnya terbuka. Salah, lantai runtuh dan murid mendapat soal pengganti sampai berhasil. Siapa paling cepat sampai FINISH?",tags:["Serentak","Benar maju, salah tertahan","PG & Benar/Salah","Latihan & lomba, bukan ujian"],tf:{tJenis:"ujian",tKat:"latihan",tSerentak:true,tSekali:true,tAcak:true,tHasil:1,tMenit:15}}};
function petaSelHTML(M,ed,MD){var def=MD==="battle"||MD==="lomba"?"kota":"",cur=tf("tPeta",ed?(ed.peta||""):def),pk={mapel:M.pk.mapel,pengaturan:M.pk.pengaturan},opts=[["","📍 Bebas (di tempat murid berada)",-1],["kota","🏙️ Kota Ilmu",M.pk.mapel.length]];
 Object.keys(WDEF).forEach(function(w){if(!worldAllowed(w,pk))return;usedZones(w,pk).forEach(function(z){opts.push([z,WDEF[w].ic+" "+WDEF[w].nama+" • "+ZONES[z].nama,zoneMapelFor(pk,z).length])})});
 var sel=opts.filter(function(o){return o[0]===cur})[0];
 return'<div class="gtop"><label class="fld"><span>🗺️ Peta tantangan <button type="button" class="qh" data-help="peta2">?</button></span><select id="tPeta">'+opts.map(function(o){return'<option value="'+o[0]+'"'+(o[0]===cur?" selected":"")+'>'+esc(o[1])+(o[2]>=0?" ("+o[2]+" gedung)":"")+'</option>'}).join("")+'</select></label></div>'+(MD==="battle"&&sel&&sel[2]===0?'<div class="note" style="margin-top:4px">⚠️ Wilayah ini belum punya gedung mapel. Pilih wilayah lain atau atur letak gedung di menu 🗺️ Atur peta.</div>':'')}
function kodeShow(t){var o=$("ovKode");lvConnect();var c=String(t.kode_main).replace(/(\d{3})(\d{3})/,"$1 $2"),host=location.host+location.pathname.replace(/index\.html$/,"");
 o.innerHTML='<button class="btn gray kclose" id="kClose">✕ Tutup</button><div class="kbox"><div class="kjud">'+esc((TMODE[tanModeOf(t)]||TMODE.kuis).ic+" "+t.judul)+'</div><div class="kstep">Buka <b>'+esc(host)+'</b> lalu masukkan kode main</div><div class="kcode">'+esc(c)+'</div><div class="kstep">atau buka link: <b>'+esc(mainLink(t.kode_main).replace(/^https?:\/\//,""))+'</b></div><div class="kready">👥 <b class="tsiap" data-tid="'+t.id+'">'+lvSiap(t.id)+'</b> murid sudah di lobi</div>'+(t.go?'':'<button class="btn yel lg" data-kgo="'+t.id+'">▶ Mulai sekarang</button>')+'</div>';
 o.classList.add("show");$("kClose").onclick=function(){o.classList.remove("show")};var gb=o.querySelector("[data-kgo]");if(gb)gb.onclick=function(){o.classList.remove("show");var b0=document.querySelector('[data-dact="tgo"][data-tid="'+t.id+'"]');if(b0)b0.click()}}
function mpCur(){dState.tf=dState.tf||{};if(!dState.tf.tMp){var ed=dState.tedit?(DB_.tantangan||[]).filter(function(t){return t.id===dState.tedit})[0]:null,bt=$("tJenis")?$("tJenis").value==="petualangan":tanModeOf(ed)==="battle";dState.tf.tMp=Object.assign({},mpSel(dModel(),ed,bt))}return dState.tf.tMp}
function mpSel(M,ed,battle){var tfv=dState.tf&&dState.tf.tMp;if(tfv)return tfv;var MP=tanMapels(ed),r={};
 if(MP)MP.list.forEach(function(x){r[x.id]=x.n});else if(ed&&!battle&&ed.mapel)r[ed.mapel]=ed.jumlah;else if(battle)M.pk.mapel.forEach(function(m){r[m.id]=1});else if(M.pk.mapel[0])r[M.pk.mapel[0].id]=Math.min(10,M.pk.mapel[0].soal.length);
 dState.tf=dState.tf||{};dState.tf.tMp=r;dState.tf.tUrut=dState.tf.tUrut||(MP&&MP.urut)||"acak";return r}
function psrPickHTML(ed){var cur=tf("tPsr",ed&&String(ed.mapel).indexOf("_psr:")===0?String(ed.mapel).slice(5):"sedang");
 return'<div class="gtop"><label class="fld" style="grid-column:1/-1">Tingkat kesulitan<select id="tPsr">'+Object.keys(PSR_LV).map(function(k){var L=PSR_LV[k];return'<option value="'+k+'"'+(k===cur?" selected":"")+'>'+L.ic+' '+L.nm+' • '+L.lv+' ('+L.sk.filter(function(x,i,a){return a.indexOf(x)===i}).map(function(x){return PSR_SKILL[x]}).join(", ")+')</option>'}).join("")+'</select></label></div><div class="mut" style="font-size:12px;margin-top:4px">Soal dibuat otomatis. Semua murid mendapat pembeli dan angka yang sama agar adil di papan peringkat.</div>'}
function dtkPickHTML(M,ed){var L=(M.pk.detektif||[]).concat(DTK_CASES),cur=tf("tDtk",ed&&String(ed.mapel).indexOf("_dtk:")===0?String(ed.mapel).slice(5):(L[0]&&L[0].id));
 return'<div class="gtop"><label class="fld" style="grid-column:1/-1">Kasus yang dipecahkan<select id="tDtk">'+L.map(function(c){return'<option value="'+esc(c.id)+'"'+(c.id===cur?" selected":"")+'>'+esc(c.ic+" "+c.judul)+(c.guru?" • buatan Anda":" • bawaan")+' ('+c.petunjuk.length+' lokasi)</option>'}).join("")+'</select></label></div><div class="mut" style="font-size:12px;margin-top:4px">Buat kasus dari bacaan kelas Anda di Mode Guru → ⋯ Lainnya → 🕵️ Kasus Detektif (AI), lalu Simpan dan kirim ke kelas agar muncul di sini.</div>'}
function mapelPickHTML(M,ed,battle){var sel=mpSel(M,ed,battle),ids=Object.keys(sel),tot=0;ids.forEach(function(k){tot+=+sel[k]||0});
 var h='<div class="mpick"><div class="mph"><b>'+(battle?"🏫 Gedung mapel yang dibuka":"📚 Mapel &amp; jumlah soal")+'</b><span class="mut">'+(battle?ids.length+" dari "+M.pk.mapel.length+" gedung dibuka":ids.length+" mapel • total <b id=\"mpTot\">"+tot+"</b> soal")+'</span><span style="flex:1"></span><button type="button" class="btn sm gray" data-dact="mpall">Pilih semua</button><button type="button" class="btn sm gray" data-dact="mpnone">Kosongkan</button></div><div class="mpgrid">';
 M.pk.mapel.forEach(function(m){if(battle&&m.rahasia)return;var on=sel[m.id]!=null,n=on?sel[m.id]:Math.min(battle?1:5,m.soal.length);h+='<label class="mprow'+(on?" on":"")+'"><input type="checkbox" data-mp="'+esc(m.id)+'"'+(on?" checked":"")+'><i style="background:'+esc(m.warna)+'"></i><span class="mpn">'+(m.rahasia?'🔒 ':'')+esc(m.nama)+'<small>'+m.soal.length+' soal'+(m.rahasia?' • rahasia':'')+'</small></span>'+(battle?'':'<input type="number" class="gin" min="1" max="'+m.soal.length+'" data-mpn="'+esc(m.id)+'" value="'+n+'"'+(on?"":" disabled")+'>')+'</label>'});
 h+='</div>';if(!battle&&ids.length>1)h+='<div class="tseg" style="margin-top:6px"><label class="'+(dState.tf.tUrut!=="mapel"?"on":"")+'"><input type="radio" name="tUrutR" data-urut="acak"'+(dState.tf.tUrut!=="mapel"?" checked":"")+'><span>🔀 <b>Acak campur</b><small>Soal dari semua mapel diacak jadi satu. Cocok untuk lomba.</small></span></label><label class="'+(dState.tf.tUrut==="mapel"?"on":"")+'"><input type="radio" name="tUrutR" data-urut="mapel"'+(dState.tf.tUrut==="mapel"?" checked":"")+'><span>📑 <b>Urut per mapel</b><small>Soal mapel pertama dulu, lalu mapel berikutnya. Cocok untuk ulangan tematik.</small></span></label></div>';
 if(battle)h+='<div class="mut" style="font-size:12px;margin-top:4px">Gedung yang tidak dicentang terkunci selama battle, jadi murid fokus ke materi yang sedang dibahas.</div>';
 return h+'</div>'}
function tanModeOf(t){if(!t)return dState.tf&&dState.tf.mode||null;if(t.jenis==="petualangan")return"battle";if(t.jenis==="arena")return"arena";if(t.jenis==="jembatan")return"jembatan";if(t.jenis==="lari")return"lari";if(t.jenis==="detektif")return"detektif";if(t.jenis==="pasar")return"pasar";if(t.kategori==="sts"||t.kategori==="sas")return"ujian";return t.serentak?"lomba":"kuis"}
function tanPicker(kind){var at=kind==="act"?'data-act="gtmode"':'data-dact="tmode"';return'<div class="tmpick own"><h3>⚡ Buat tantangan baru <small class="mut">pilih jenisnya</small></h3><div class="tmgrid">'+Object.keys(TMODE).map(function(k){var m=TMODE[k];return'<button class="tmcard" '+at+' data-m="'+k+'" style="--mc:'+m.c+'"><span class="tmic">'+m.ic+'</span><b>'+m.nm+'</b><span class="tmds">'+m.ds+'</span><span class="tmtags">'+m.tags.map(function(x){return'<i>'+x+'</i>'}).join("")+'</span></button>'}).join("")+'</div></div>'}
function tanTab(M){var r=DB_,K=dState.kktp,list=r.tantangan||[],ed=dState.tedit?list.filter(function(t){return t.id===dState.tedit})[0]:null,h="";
 var now=Date.now(),st=Math.floor(now/60000)*60000,eod=new Date();eod.setHours(23,59,0,0);var se=eod.getTime()-st<3600000?st+86400000:eod.getTime();
 var mOpts=M.pk.mapel.map(function(m){return'<option value="'+esc(m.id)+'"'+(tf("tMapel",ed?ed.mapel:"")===m.id?" selected":"")+'>'+esc(m.nama)+' ('+m.soal.length+' soal)</option>'}).join("");
  var MD=tanModeOf(ed),showForm=!!(ed||MD);
 if(!showForm)h+=tanPicker("dact");
 else{var mm=TMODE[MD]||TMODE.kuis,jn=MD==="battle"?"petualangan":"ujian",tgt=advTarget(ed)||{k:"",n:3};
 var ck=function(id,lbl,def){return'<label class="mut" style="display:flex;gap:8px;align-items:center;font-weight:800;margin-top:6px"><input type="checkbox" id="'+id+'"'+(tf(id,def)?" checked":"")+'> '+lbl+'</label>'};
 h+='<div class="scard tform own" id="tForm" style="margin-top:0;border-color:'+mm.c+'"><div class="tmhead" style="--mc:'+mm.c+'"><span class="tmic">'+mm.ic+'</span><div style="flex:1"><b>'+(ed?"✏️ Ubah: ":"Buat ")+mm.nm+'</b><div class="mut" style="font-size:13px">'+mm.ds+'</div></div>'+(ed?'':'<button class="btn sm gray" data-dact="tcancel">↺ Ganti jenis</button>')+'</div><input type="hidden" id="tJenis" value="'+jn+'">';
 if(jn==="petualangan")h+='<div class="note" style="margin-top:8px">🗺️ Murid masuk ruang tunggu, lalu bertualang bersama selama durasi yang ditentukan setelah Anda menekan ▶ Mulai. Mereka bebas menjelajah dan mengerjakan gedung mapel. Saat waktu habis, game berhenti dan hasilnya terkirim ke dashboard.</div><div class="gtop"><label class="fld">Judul<input id="tJudul" value="'+esc(tf("tJudul",ed?ed.judul:""))+'" placeholder="Contoh: '+esc(mm.ph||"Petualangan Nusantara Jumat")+'"></label><label class="fld">Target (opsional)<select id="tTarget"><option value="">Tanpa target</option>'+Object.keys(ADV_LBL).map(function(k){return'<option value="'+k+'"'+(tf("tTarget",tgt.k)===k?" selected":"")+'>Kumpulkan '+ADV_LBL[k]+'</option>'}).join("")+'</select></label><label class="fld">Jumlah target<input id="tTargetN" type="number" min="1" max="999" value="'+esc(tf("tTargetN",tgt.n))+'"></label></div>'+mapelPickHTML(M,ed,true);
 else h+='<div class="gtop" style="margin-top:6px"><label class="fld" style="grid-column:1/-1">Judul<input id="tJudul" value="'+esc(tf("tJudul",ed?ed.judul:""))+'" placeholder="Contoh: '+esc(mm.ph||"Ulangan Harian Pecahan")+'"></label></div>'+(MD==="detektif"?dtkPickHTML(M,ed):MD==="pasar"?psrPickHTML(ed):mapelPickHTML(M,ed,false));
 if(jn!=="petualangan"){var kopt=MD==="ujian"?["sts","sas"]:["latihan","harian"],kt=tf("tKat",ed?(ed.kategori||"latihan"):mm.tf.tKat),BB=tanBobot(ed);if(kopt.indexOf(kt)<0)kopt=kopt.concat([kt]);
  h+='<div class="gtop"><label class="fld"><span>Jenis asesmen <button type="button" class="qh" data-help="kat">?</button></span><select id="tKat">'+kopt.map(function(k){return'<option value="'+k+'"'+(kt===k?" selected":"")+'>'+KAT[k]+'</option>'}).join("")+'</select></label></div>';
  var ser=!!tf("tSerentak",ed?!!ed.serentak:mm.tf.tSerentak);
  if(MD==="jembatan")h+='<div class="note" style="margin-top:8px;border-color:rgba(249,115,22,.6)">🌉 <b>Selalu serentak.</b> Setelah Anda menekan ▶ Mulai, murid berlomba melewati pulau demi pulau (satu soal per pulau, maksimal 15). Jawaban dikunci dengan berdiri 2 detik di lantai jawaban. Benar: jembatan terbuka. Salah: lantai runtuh dan murid mendapat <b>soal pengganti</b> sampai berhasil. <b>Nilai = jawaban benar pada percobaan pertama</b>; soal pengganti hanya untuk maju. Hanya soal pilihan ganda (2–4 pilihan) dan benar/salah yang dipakai. Atur durasi lomba di bawah.</div><input type="radio" name="tStart" id="tSerentak" checked style="display:none">';else if(MD==="lari")h+='<div class="note" style="margin-top:8px;border-color:rgba(34,197,94,.6)">🏃 <b>Selalu serentak.</b> Setelah Anda menekan ▶ Mulai, setiap murid berlari di lintasannya sendiri. Soal muncul di atas layar, lalu murid pindah ke lajur gerbang jawabannya. Hanya soal <b>pilihan ganda (2–4 pilihan)</b> dan <b>benar/salah</b> yang dipakai (maksimal 30). Nilai tetap persentase jawaban benar.</div><input type="radio" name="tStart" id="tSerentak" checked style="display:none">';else if(MD==="arena")h+='<div class="note" style="margin-top:8px;border-color:rgba(6,182,212,.6)">🤸 <b>Selalu serentak.</b> Murid menunggu di lobi, lalu masuk arena bersamaan saat Anda menekan ▶ Mulai. Setiap soal tampil sekitar 10–20 detik, murid berdiri di lantai warna jawabannya, lalu lantai yang salah runtuh. Hanya soal <b>pilihan ganda (2–4 pilihan)</b> dan <b>benar/salah</b> yang dipakai. Durasi otomatis disesuaikan dengan jumlah soal.</div><input type="radio" name="tStart" id="tSerentak" checked style="display:none">';else
  h+='<div class="tseg"><label class="'+(ser?"on":"")+'"><input type="radio" name="tStart" id="tSerentak"'+(ser?" checked":"")+'><span>⏱️ <b>Serentak</b><small>Murid berkumpul di lobi Pulau Langit, mulai bersamaan saat Anda menekan ▶ Mulai'+(MD==="ujian"?"":", lalu terjun dengan parasut")+'.</small></span></label><label class="'+(ser?"":"on")+'"><input type="radio" name="tStart" id="tTerjadwal"'+(ser?"":" checked")+'><span>📅 <b>Terjadwal</b><small>Murid mengerjakan sendiri kapan saja dalam rentang waktu yang ditentukan.</small></span></label></div>'}
 h+='<div class="gtop"><label class="fld">Durasi '+(jn==="petualangan"?"petualangan":"pengerjaan")+' (menit)';
 h+='<input id="tMenit" type="number" min="1" max="300" value="'+esc(tf("tMenit",ed?ed.menit:20))+'"></label><label class="fld">Dibuka mulai<input id="tMulai" type="datetime-local" value="'+esc(tf("tMulai",toLocalInput(ed?ed.mulai:st)))+'"></label><label class="fld">Ditutup pada<input id="tSelesai" type="datetime-local" value="'+esc(tf("tSelesai",toLocalInput(ed?ed.selesai:se)))+'"></label></div>';
 if(jn==="petualangan"||tf("tSerentak",ed?!!ed.serentak:mm.tf.tSerentak))h+=petaSelHTML(M,ed,MD);
 if(jn!=="petualangan"){var BB2=tanBobot(ed);h+='';
  h+='<details class="tsk"><summary>⚖️ Penskoran <span class="mut">bobot per jenis soal: PG '+tf("tBpg",BB2.pg)+' • B/S '+tf("tBbs",BB2.bs)+' • Isian '+tf("tBisian",BB2.isian)+' • Jodoh '+tf("tBjodoh",BB2.jodoh)+' • Urut '+tf("tBurut",BB2.urut)+(tf("tSebagian",!!BB2.sebagian)?' • nilai sebagian aktif':'')+'</span></summary><div class="mut" style="font-size:12px;margin:6px 0">Skor murid = jumlah skor soal yang benar ÷ skor maksimal × 100. Soal yang diberi <b>Skor soal</b> sendiri di editor (⚙️ Pengaturan lanjutan) memakai skor itu.</div><div class="bgrid">'+[["tBpg","🔘 Pilihan ganda",BB2.pg],["tBbs","✅ Benar/Salah",BB2.bs],["tBisian","✍️ Isian",BB2.isian],["tBjodoh","🔗 Menjodohkan",BB2.jodoh],["tBurut","🔢 Mengurutkan",BB2.urut]].map(function(x){return'<label class="fld">'+x[1]+'<input id="'+x[0]+'" type="number" min="0" max="100" step="0.5" value="'+esc(tf(x[0],x[2]))+'"></label>'}).join("")+'</div>'+ck("tSebagian","Nilai sebagian untuk menjodohkan &amp; mengurutkan (benar 3 dari 4 pasangan = 3/4 skor)",!!BB2.sebagian)+'</details>';
  var sk=tf("tSekali",ed?!!ed.sekali:mm.tf.tSekali),ac=tf("tAcak",ed?!!ed.acak:mm.tf.tAcak),hs=hasLvl(tf("tHasil",ed?ed.hasil:mm.tf.tHasil));
  h+='<details class="tsk"><summary>⚙️ Pengaturan lain <span class="mut">'+(ac?"diacak":"tidak diacak")+' • '+(sk?"sekali kerja":"boleh diulang")+' • '+["hasil disembunyikan","nilai + kunci + pembahasan","nilai saja","nilai + kunci"][hs]+'</span></summary>'+ck("tAcak","Acak urutan soal dan pilihan jawaban (setiap murid mendapat urutan berbeda)",ac)+ck("tSekali","Hanya boleh dikerjakan sekali (cocok untuk ulangan)",sk)+'<label class="fld" style="margin-top:8px">Setelah selesai, murid melihat<select id="tHasil"><option value="1"'+(hs===1?" selected":"")+'>📝 Nilai + kunci + pembahasan</option><option value="3"'+(hs===3?" selected":"")+'>🔑 Nilai + kunci (tanpa pembahasan)</option><option value="2"'+(hs===2?" selected":"")+'>🔢 Nilai saja (soal &amp; kunci tidak ditampilkan)</option><option value="0"'+(hs===0?" selected":"")+'>🙈 Tidak ada, hanya "Jawaban terkirim"</option></select></label>'+'</details>'}
 h+='<div class="row"><button class="btn yel tpub" data-dact="tsave">'+(ed?"💾 Simpan perubahan":"⚡ Terbitkan "+mm.nm)+'</button><button class="btn gray" data-dact="tcancel">Batal</button><span class="mut" id="tMsg"></span></div>';
 h+='<div class="mut" style="font-size:12px;margin-top:6px">Murid melihat tombol ⚡ Tantangan di pojok kanan atas game ketika tantangan dibuka. Soal diambil dari paket kelas, jadi setelah mengubah soal, tekan 💾 Simpan lalu pilih "Ya, kirim" agar kelas memakai soal terbaru.</div></div>'}
 if(list.length)h+='<h3 style="font-family:var(--fh);margin:16px 0 4px">📋 Daftar tantangan kelas ini</h3>';
 if(!list.length)return h+'<div class="mut" style="margin-top:12px">Belum ada tantangan untuk kelas ini.</div>';
 list.forEach(function(t){var s=tanStat(t),R=tanRes(t,M),PS=tanPeserta(t,R),ids=Object.keys(R.by),vals=ids.map(function(id){return R.by[id].nilai}),a=avg(vals),tn=vals.filter(function(v){return v>=K}).length,nRun=Object.keys(R.run).length,open=dState.topen===t.id;
  var ptg=t.jenis==="petualangan"?advTarget(t):null;
  var tmd=TMODE[tanModeOf(t)]||TMODE.kuis;h+='<div class="scard tcard '+s[1]+'" style="--mc:'+tmd.c+'"><div class="sh"><span><span class="tcic">'+tmd.ic+'</span> '+esc(t.judul)+' <small class="mut">'+tmd.nm+'</small></span><span class="badge '+s[1]+'">'+s[0]+'</span></div><div class="mut">'+(t.jenis==="petualangan"?'🗺️ Sesi petualangan • '+t.menit+' menit'+(ptg?' • 🎯 target '+ptg.n+' '+ADV_LBL[ptg.k]+' (nilai = % capaian target)':' • nilai = % jawaban benar')+' • '+fmtD(t.mulai)+' sampai '+fmtD(t.selesai):(t.kategori&&t.kategori!=="latihan"?'<b style="color:#fde68a">🏷️ '+esc(KAT[t.kategori]||t.kategori)+'</b> • ':'')+'📚 '+esc(t.mapel_nama||mapName(M,t.mapel))+' • '+t.jumlah+' soal • '+t.menit+' menit • '+fmtD(t.mulai)+' sampai '+fmtD(t.selesai)+(t.sekali?" • sekali":" • boleh diulang")+(t.acak?" • diacak":"")+(hasLvl(t.hasil)===2?" • nilai saja":hasLvl(t.hasil)===3?" • tanpa pembahasan":hasLvl(t.hasil)?"":" • nilai disembunyikan"))+'</div>';
  h+='<div class="tiles" style="margin:8px 0"><div class="tile"><b>'+PS.ya.length+'</b><span>Peserta • '+ids.length+' selesai</span></div><div class="tile"><b>'+(a==null?"-":a)+'</b><span>Rata-rata</span></div><div class="tile"><b>'+(vals.length?Math.max.apply(null,vals)+" / "+Math.min.apply(null,vals):"-")+'</b><span>Tertinggi / terendah</span></div><div class="tile"><b>'+(vals.length?Math.round(tn/vals.length*100)+"%":"-")+'</b><span>Tuntas (KKTP '+K+')</span></div>'+(nRun?'<div class="tile"><b>'+nRun+'</b><span>Sedang mengerjakan</span></div>':'')+'</div>';
  if(t.serentak&&t.aktif&&t.kode_main&&tanStat(t)[0]!=="Selesai")h+='<div class="kmain"><div><small>🎮 KODE MAIN</small><b>'+esc(String(t.kode_main).replace(/(\d{3})(\d{3})/,"$1 $2"))+'</b></div><div class="mut" style="font-size:12px;flex:1;min-width:180px">Murid membuka game lalu memasukkan kode ini, atau cukup membuka link, dan langsung masuk lobi.'+(t.peta?' 🗺️ Peta: <b>'+esc(t.peta==="kota"?"Kota Ilmu":(ZONES[t.peta]?ZONES[t.peta].nama:t.peta))+'</b>':'')+'</div><div class="row" style="margin:0"><button class="btn sm yel" data-dact="tkshow" data-tid="'+t.id+'">📺 Tampilkan kode</button><button class="btn sm" data-dact="tklink" data-tid="'+t.id+'">📋 Salin link</button><button class="btn sm green" data-dact="tkwa" data-tid="'+t.id+'">📤 Kirim ke WA</button></div></div>';
  if(t.serentak&&t.aktif)h+=serPanel(t);
  h+='<div class="row" style="margin-top:0"><button class="btn sm green" data-dact="topen" data-tid="'+t.id+'">'+(open?"▲ Tutup hasil":"📋 Lihat hasil")+'</button>'+(ids.length?'<button class="btn sm yel" data-dact="trank" data-tid="'+t.id+'">🏆 Papan peringkat</button>'+(t.jenis!=="petualangan"?'<button class="btn sm own" data-dact="tkoreksi" data-tid="'+t.id+'" title="Hitung ulang nilai setelah kunci jawaban diperbaiki">🔁 Koreksi ulang</button>':''):'')+'<button class="btn sm own" data-dact="tedit" data-tid="'+t.id+'">✏️ Ubah</button><button class="btn sm own" data-dact="ttoggle" data-tid="'+t.id+'">'+(t.aktif?"⏸ Tutup sementara":"▶ Buka lagi")+'</button><button class="btn sm" data-dact="tcsv" data-tid="'+t.id+'">⬇ Excel</button><button class="btn sm gray own" data-dact="tdel" data-tid="'+t.id+'">🗑 Hapus</button></div>';
  var TMP=tanMapels(t),PCT=TMP&&TMP.list.length>1?tanMapelPct(R):null;
  if(open){h+='<div class="tbl-wrap" style="margin-top:8px"><table class="dt"><tr><th>Absen</th><th>Nama</th><th>Nilai</th>'+(PCT?TMP.list.map(function(x){return'<th title="Persentase benar">'+esc(mapName(M,x.id))+'</th>'}).join(""):'')+'<th>Benar</th><th>Durasi</th><th>Dikirim</th><th>Keterangan</th></tr>';
   if(!PS.ya.length)h+='<tr><td colspan="9" class="mut">Belum ada murid yang ikut tantangan ini.</td></tr>';PS.ya.forEach(function(u){var x=R.by[u.id];h+='<tr><td>'+u.absen+'</td><td><b>'+esc(u.nama)+'</b></td><td><b>'+(x?x.nilai:"-")+'</b></td>'+(PCT?TMP.list.map(function(mm){var v=x&&PCT[x.sid]&&PCT[x.sid][mm.id];return'<td'+(v!=null&&v<dState.kktp?' style="color:#fca5a5"':'')+'>'+(v==null?"-":v)+'</td>'}).join(""):'')+'<td>'+(x?x.benar+"/"+x.total:"-")+'</td><td>'+(x?Math.round(x.durasi/60)+" mnt":"-")+'</td><td>'+(x?fmtT(x.t):"-")+'</td><td>'+(x?(x.telat?'<span class="badge b-mid">⚠ Terlambat</span>':(x.nilai>=K?'<span class="badge b-ok">✓ Tuntas</span>':'<span class="badge b-no">Belum tuntas</span>')):R.run[u.id]?'<span class="badge b-mid">⏳ Sedang mengerjakan</span>':'<span class="badge b-na">⚠ Tidak mengirim jawaban</span>')+'</td></tr>'});
   h+='</table></div>';if(PS.no.length)h+='<details class="mut" style="margin-top:6px;font-size:12px"><summary style="cursor:pointer">🚫 Tidak ikut tantangan ini: '+PS.no.length+' murid</summary><div style="margin-top:4px">'+PS.no.map(function(u){return u.absen+'. '+esc(u.nama)}).join(", ")+'</div></details>';
   var sids={};ids.forEach(function(id){sids[R.by[id].sid]=1});var it={};DB_.jawaban.forEach(function(j){if(!sids[j[9]])return;var o=it[j[2]]||(it[j[2]]={q:j[3],n:0,ok:0});o.n++;o.ok+=j[6]});
   var hard=Object.keys(it).map(function(k){return it[k]}).filter(function(o){return o.n}).sort(function(a,b){return a.ok/a.n-b.ok/b.n}).slice(0,5);
   if(hard.length)h+='<div class="rec" style="margin-top:8px"><h4>📚 Soal tersulit di tantangan ini</h4><ol style="margin:0;padding-left:20px">'+hard.map(function(o){return'<li>'+esc(o.q)+' <span class="mut">('+Math.round(o.ok/o.n*100)+'% benar)</span></li>'}).join("")+'</ol></div>'}
  h+='</div>'});
 return h}
function svgLine(pts,o){o=o||{};var W=o.w||600,H=o.h||200,pl=34,pr=26,pt=12,pb=28,n=pts.length,xs=function(i){return pl+(n<=1?(W-pl-pr)/2:i*(W-pl-pr)/(n-1))},ys=function(v){return pt+(100-v)*(H-pt-pb)/100};
 var s='<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;height:auto;display:block" role="img" aria-label="'+esc(o.label||"Grafik")+'">';
 [0,25,50,75,100].forEach(function(v){s+='<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+ys(v)+'" y2="'+ys(v)+'" stroke="'+(o.grid||"rgba(255,255,255,.12)")+'"/><text x="'+(pl-6)+'" y="'+(ys(v)+4)+'" font-size="11" text-anchor="end" fill="'+(o.ink||"#a5b4fc")+'">'+v+'</text>'});
 if(o.kk!=null)s+='<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+ys(o.kk)+'" y2="'+ys(o.kk)+'" stroke="#f59e0b" stroke-dasharray="6 4" stroke-width="2"/><text x="'+(pl+4)+'" y="'+(ys(o.kk)+14)+'" font-size="11" text-anchor="start" fill="#f59e0b">KKTP '+o.kk+'</text>';
 if(o.bars){var mx=Math.max.apply(null,o.bars.concat([1])),bw=Math.max(6,Math.min(36,(W-pl-pr)/Math.max(1,n)*0.5));o.bars.forEach(function(b,i){var hh=b/mx*(H-pt-pb)*0.45;s+='<rect x="'+(xs(i)-bw/2)+'" y="'+(H-pb-hh)+'" width="'+bw+'" height="'+hh+'" rx="3" fill="'+(o.barCol||"rgba(96,165,250,.28)")+'"/>'})}
 var d=pts.map(function(p,i){return p.v==null?null:(xs(i)+","+ys(p.v))}).filter(Boolean);if(d.length>1)s+='<polyline points="'+d.join(" ")+'" fill="none" stroke="'+(o.col||"#4ade80")+'" stroke-width="3" stroke-linejoin="round"/>';
 pts.forEach(function(p,i){if(p.v==null)return;s+='<circle cx="'+xs(i)+'" cy="'+ys(p.v)+'" r="4.5" fill="'+(o.col||"#4ade80")+'"/><text x="'+xs(i)+'" y="'+(ys(p.v)-9)+'" font-size="11" text-anchor="middle" font-weight="700" fill="'+(o.ink2||"#fff")+'">'+p.v+'</text>';
  if(p.lbl&&(n<=12||i%Math.ceil(n/12)===0))s+='<text x="'+xs(i)+'" y="'+(H-8)+'" font-size="11" text-anchor="middle" fill="'+(o.ink||"#a5b4fc")+'">'+esc(p.lbl)+'</text>'});
 return s+'</svg>'}
function spark(vals){if(!vals.length)return"";var W=110,H=28,n=vals.length,xs=function(i){return n<=1?W/2:3+i*(W-6)/(n-1)},ys=function(v){return H-3-v*(H-6)/100};
 return'<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'"><polyline points="'+vals.map(function(v,i){return xs(i)+","+ys(v)}).join(" ")+'" fill="none" stroke="#60a5fa" stroke-width="2"/><circle cx="'+xs(n-1)+'" cy="'+ys(vals[n-1])+'" r="3" fill="#fbbf24"/></svg>'}
function weekStart(t){var d=new Date(t);d.setHours(0,0,0,0);var w=(d.getDay()+6)%7;d.setDate(d.getDate()-w);return d.getTime()}
function trenTab(M){var sel=dState.mapel,K=dState.kktp,ss=DF.sesi.filter(function(s){return!sel||s[2]===sel}),h="";
 if(!ss.length)return'<div class="mut">Belum ada nilai untuk filter ini ('+esc(filtLabel())+').</div>';
 var wk={};ss.forEach(function(s){var k=weekStart(s[8]),o=wk[k]||(wk[k]={v:[],m:{}});o.v.push(s[6]);o.m[s[1]]=1});
 var keys=Object.keys(wk).map(Number).sort(function(a,b){return a-b}).slice(-12);
 var pts=keys.map(function(k){return{v:avg(wk[k].v),lbl:new Date(k).toLocaleDateString("id-ID",{day:"numeric",month:"short"})}});
 h+='<div class="scard" style="margin-top:0"><div class="sh"><span>📈 Rata-rata nilai kelas per minggu</span><span class="mut" style="font-size:12px">'+esc((sel?mapName(M,sel):"Semua mapel")+" • "+filtLabel())+'</span></div>'+svgLine(pts,{kk:K,bars:keys.map(function(k){return wk[k].v.length}),label:"Rata-rata nilai per minggu"})+'<div class="mut" style="font-size:12px">Garis hijau = rata-rata nilai semua percobaan di minggu itu (minggu dimulai hari Senin). Batang biru = banyaknya kuis yang dikerjakan. Garis putus-putus = KKTP.</div></div>';
 h+='<div class="tbl-wrap" style="margin-top:10px;max-height:none"><table class="dt"><tr><th>Minggu mulai</th><th>Kuis dikerjakan</th><th>Murid aktif</th><th>Rata-rata nilai</th></tr>'+keys.slice().reverse().map(function(k){return'<tr><td>'+new Date(k).toLocaleDateString("id-ID",{weekday:"short",day:"numeric",month:"long"})+'</td><td>'+wk[k].v.length+'</td><td>'+Object.keys(wk[k].m).length+'</td><td><b>'+avg(wk[k].v)+'</b></td></tr>'}).join("")+'</table></div>';
 var since=dState.per?(DB_.now||Date.now())-dState.per*86400000:0,dw={};DB_.sesi.forEach(function(s){if(s[8]<since||(sel&&s[2]!==sel))return;var k=s[9]||"",o=dw[k]||(dw[k]={v:[],m:{}});o.v.push(s[6]);o.m[s[1]]=1});
 h+='<h3 style="font-family:var(--fh);margin:16px 0 6px">🌍 Per dunia</h3><div class="tbl-wrap" style="max-height:none"><table class="dt"><tr><th>Dunia</th><th>Kuis dikerjakan</th><th>Murid</th><th>Rata-rata nilai</th><th></th></tr>'+Object.keys(dw).sort(function(a,b){return dw[b].v.length-dw[a].v.length}).map(function(k){var a=avg(dw[k].v);return'<tr><td><b>'+esc(worldName(k))+'</b></td><td>'+dw[k].v.length+'</td><td>'+Object.keys(dw[k].m).length+'</td><td><b>'+a+'</b></td><td style="min-width:140px"><div class="hbar"><i style="width:'+a+'%"></i><span class="kk" style="left:'+K+'%"></span></div></td></tr>'}).join("")+'</table></div><div class="mut" style="font-size:12px;margin-top:4px">Nilai yang dikirim sebelum pembaruan ini tercatat sebagai "Tidak tercatat".</div>';
 var by={};ss.slice().sort(function(a,b){return a[8]-b[8]}).forEach(function(s){(by[s[1]]=by[s[1]]||[]).push(s[6])});
 h+='<h3 style="font-family:var(--fh);margin:16px 0 6px">👥 Perkembangan tiap murid</h3><div class="tbl-wrap"><table class="dt"><tr><th>Absen</th><th>Nama</th><th>Kuis</th><th>Nilai pertama</th><th>Nilai terakhir</th><th>Perubahan</th><th>Tren</th></tr>';
 M.murid.forEach(function(u){var v=by[u.id]||[],d=v.length>1?v[v.length-1]-v[0]:null;h+='<tr class="cl" data-mu="'+u.id+'"><td>'+u.absen+'</td><td><b>'+esc(u.nama)+'</b></td><td>'+v.length+'</td><td>'+(v.length?v[0]:"-")+'</td><td><b>'+(v.length?v[v.length-1]:"-")+'</b></td><td>'+(d==null?"-":d>0?'<span class="badge b-ok">▲ +'+d+'</span>':d<0?'<span class="badge b-no">▼ '+d+'</span>':'<span class="badge b-na">= 0</span>')+'</td><td>'+spark(v.slice(-15))+'</td></tr>'});
 return h+'</table></div>'}

/* ---------- rapor murid (cetak / PDF) ---------- */
function raporOne(u,M){var K=dState.kktp,k=DB_.kelas,ss=DF.sesi.filter(function(s){return s[1]===u.id}).sort(function(a,b){return a[8]-b[8]});
 var rows=M.ms.map(function(m){var p=u.per[m.id];if(!p)return{nama:m.nama,none:true};return{nama:m.nama,n:p.n,first:p.first,best:p.best,rata:avg(p.list)}}).filter(function(x){return!x.none||M.pk.mapel.some(function(m){return m.nama===x.nama})});
 var tried=rows.filter(function(x){return!x.none}),tuntas=tried.filter(function(x){return x.best>=K}),kurang=tried.filter(function(x){return x.best<K}),belum=rows.filter(function(x){return x.none});
 var tans=(DB_.tantangan||[]).map(function(t){var x=tanRes(t,M).by[u.id];return x?{judul:t.judul,mapel:t.mapel_nama||mapName(M,t.mapel),nilai:x.nilai,t:x.t}:null}).filter(Boolean);
 var wrong={};DF.jawaban.filter(function(j){return j[0]===u.id}).sort(function(a,b){return a[8]-b[8]}).forEach(function(j){wrong[j[1]+"|"+j[2]]={q:j[3],m:j[1],ok:j[6]}});
 var wl=Object.keys(wrong).map(function(x){return wrong[x]}).filter(function(x){return!x.ok}).slice(0,6);
 var nm=esc(u.nama),desc="Ananda "+nm+" telah mengerjakan "+ss.length+" kuis"+(tans.length?" dan "+tans.length+" tantangan":"")+". ";
 if(tuntas.length)desc+="Sudah mencapai KKTP pada "+tuntas.map(function(x){return esc(x.nama)}).join(", ")+". ";
 if(kurang.length)desc+="Masih perlu bimbingan pada "+kurang.map(function(x){return esc(x.nama)+" (nilai terbaik "+x.best+")"}).join(", ")+". ";
 if(belum.length)desc+="Belum mengerjakan "+belum.map(function(x){return esc(x.nama)}).join(", ")+". ";
 var up=ss.length>1?ss[ss.length-1][6]-ss[0][6]:0;if(ss.length>1)desc+=up>0?"Nilainya menunjukkan peningkatan dari percobaan awal. ":up<0?"Nilai terakhirnya lebih rendah daripada percobaan awal, perlu perhatian. ":"";
 var bestAvg=avg(tried.map(function(x){return x.best}));
 var h='<section class="rp"><div class="rh"><div><div class="rk">LAPORAN HASIL BELAJAR</div><h1>'+nm+'</h1><div>Nomor absen '+u.absen+' • '+esc(k.nama)+(k.guru?' • Guru: '+esc(k.guru):'')+'</div></div><div class="rlogo">Zuper<b>Verse</b><small>'+esc(filtLabel())+'<br>Dicetak '+new Date().toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"})+'</small></div></div>';
 h+='<div class="rt"><div><b>'+(bestAvg==null?"-":bestAvg)+'</b><span>Rata-rata nilai terbaik</span></div><div><b>'+tuntas.length+' / '+rows.length+'</b><span>Mapel tuntas (KKTP '+K+')</span></div><div><b>'+ss.length+'</b><span>Kuis dikerjakan</span></div><div><b>'+u.mat+'</b><span>Materi dibuka</span></div></div>';
 h+='<h2>Nilai per mata pelajaran</h2><table><tr><th>Mapel</th><th>Percobaan</th><th>Nilai awal</th><th>Nilai terbaik</th><th>Rata-rata</th><th>Keterangan</th></tr>'+rows.map(function(x){return x.none?'<tr><td>'+esc(x.nama)+'</td><td>0</td><td>-</td><td>-</td><td>-</td><td>Belum mengerjakan</td></tr>':'<tr><td>'+esc(x.nama)+'</td><td>'+x.n+'</td><td>'+x.first+'</td><td><b>'+x.best+'</b></td><td>'+x.rata+'</td><td>'+(x.best>=K?"✓ Tuntas":"Perlu bimbingan")+'</td></tr>'}).join("")+'</table>';
 if(tans.length)h+='<h2>Tantangan / ulangan</h2><table><tr><th>Judul</th><th>Mapel</th><th>Nilai</th><th>Tanggal</th></tr>'+tans.map(function(x){return'<tr><td>'+esc(x.judul)+'</td><td>'+esc(x.mapel)+'</td><td><b>'+x.nilai+'</b></td><td>'+new Date(x.t).toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"})+'</td></tr>'}).join("")+'</table>';
 if(ss.length>1)h+='<h2>Perkembangan nilai</h2><div class="rg">'+svgLine(ss.slice(-20).map(function(s){return{v:s[6],lbl:new Date(s[8]).toLocaleDateString("id-ID",{day:"numeric",month:"short"})}}),{kk:K,w:640,h:190,grid:"#e5e7eb",ink:"#64748b",ink2:"#1f2937",col:"#2563eb",label:"Perkembangan nilai"})+'</div>';
 if(wl.length)h+='<h2>Soal yang perlu dipelajari lagi</h2><ol>'+wl.map(function(x){return'<li>'+esc(x.q)+' <i>('+esc(mapName(M,x.m))+')</i></li>'}).join("")+'</ol>';
 h+='<h2>Deskripsi</h2><p class="rd">'+desc+'</p><h2>Catatan guru</h2><div class="rn" contenteditable="true"></div>';
 h+='<div class="rs"><div>Mengetahui,<br>Orang tua / wali<br><br><br><br>(..............................)</div><div>Guru kelas<br><br><br><br><br>'+(k.guru?esc(k.guru):'(..............................)')+'</div></div></section>';return h}
function printRapor(ids){var M=dModel(),list=M.murid.filter(function(u){return ids.indexOf(u.id)>=0});if(!list.length){info("Belum ada murid.");return}
 var css='*{box-sizing:border-box}body{font-family:Arial,Helvetica,sans-serif;color:#1f2937;margin:0;background:#f1f5f9}.bar{position:sticky;top:0;background:#1e293b;color:#fff;padding:10px 16px;display:flex;gap:10px;align-items:center;justify-content:space-between;font-size:14px}.bar button{background:#22c55e;color:#fff;border:0;border-radius:8px;padding:9px 16px;font-weight:700;cursor:pointer;font-size:14px}'+
  '.rp{background:#fff;max-width:800px;margin:16px auto;padding:28px 32px;border-radius:8px;page-break-after:always}.rp:last-child{page-break-after:auto}.rh{display:flex;justify-content:space-between;gap:16px;border-bottom:3px solid #2563eb;padding-bottom:12px}.rk{font-size:12px;letter-spacing:2px;color:#2563eb;font-weight:700}h1{margin:4px 0;font-size:26px}.rlogo{text-align:right;font-size:20px;font-weight:800;color:#2563eb}.rlogo b{color:#f59e0b}.rlogo small{display:block;font-size:11px;color:#64748b;font-weight:400;margin-top:4px}'+
  '.rt{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:16px 0}.rt div{border:1px solid #cbd5e1;border-radius:8px;padding:10px}.rt b{display:block;font-size:22px;color:#1e3a8a}.rt span{font-size:11px;color:#64748b}h2{font-size:15px;margin:18px 0 6px;color:#1e3a8a}table{width:100%;border-collapse:collapse;font-size:13px}th,td{border:1px solid #cbd5e1;padding:6px 8px;text-align:left}th{background:#eff6ff}.rg{border:1px solid #e5e7eb;border-radius:8px;padding:6px}ol{font-size:13px;line-height:1.5;padding-left:20px}.rd{font-size:13px;line-height:1.6;margin:0}.rn{min-height:70px;border:1px dashed #94a3b8;border-radius:6px;padding:8px;font-size:13px}.rs{display:flex;justify-content:space-between;margin-top:26px;font-size:13px;text-align:center}.rs div{width:45%}'+
  '@media print{body{background:#fff}.bar{display:none}.rp{margin:0;max-width:none;border-radius:0;padding:10mm 4mm}@page{size:A4;margin:12mm}}';
 var html='<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Rapor '+esc(DB_.kelas.nama)+'</title><style>'+css+'</style></head><body><div class="bar"><span>Rapor '+list.length+' murid • tulis catatan guru di kotak putus-putus bila perlu</span><button onclick="window.print()">🖨 Cetak / Simpan PDF</button></div>'+list.map(function(u){return raporOne(u,M)}).join("")+'</body></html>';
 var w=null;try{w=window.open("","_blank")}catch(e){}
 if(w&&w.document){w.document.open();w.document.write(html);w.document.close();return}
 var fr=document.createElement("iframe");fr.style.cssText="position:fixed;right:0;bottom:0;width:0;height:0;border:0";document.body.appendChild(fr);fr.contentDocument.open();fr.contentDocument.write(html);fr.contentDocument.close();setTimeout(function(){try{fr.contentWindow.focus();fr.contentWindow.print()}catch(e){}setTimeout(function(){fr.remove()},60000)},400)}
function tanSave(){var g=function(id){return $(id)},pt=g("tJenis")&&g("tJenis").value==="petualangan";if(pt)return advSave();var MM=dModel(),selM=(dState.tf&&dState.tf.tMp)||{},lst=MM.pk.mapel.filter(function(x){return selM[x.id]!=null}).map(function(x){return{id:x.id,n:Math.max(1,Math.min(x.soal.length,+selM[x.id]||1)),nama:x.nama}}),m=lst.length?MM.pk.mapel.filter(function(x){return x.id===lst[0].id})[0]:null,mp=m?m.id:"",tot=lst.reduce(function(a,x){return a+x.n},0),ms=new Date(g("tMulai").value).getTime(),me=new Date(g("tSelesai").value).getTime(),msg=function(t,c){$("tMsg").textContent=t;$("tMsg").style.color=c||""};
 var t={id:dState.tedit||null,judul:g("tJudul").value.trim(),mapel:mp,mapel_nama:lst.map(function(x){return x.nama}).join(" + ").slice(0,80),jumlah:Math.min(100,tot),mapels:lst.length>1?{list:lst.map(function(x){return{id:x.id,n:x.n}}),urut:dState.tf&&dState.tf.tUrut==="mapel"?"mapel":"acak"}:null,menit:+g("tMenit").value,mulai:ms,selesai:me,serentak:g("tSerentak").checked,acak:g("tAcak").checked,sekali:g("tSekali").checked,hasil:hasLvl(g("tHasil")?g("tHasil").value:1),kategori:g("tKat")?g("tKat").value:"latihan",peta:g("tPeta")&&g("tSerentak").checked?g("tPeta").value:"",bobot:{pg:+g("tBpg").value||0,bs:+g("tBbs").value||0,isian:+g("tBisian").value||0,jodoh:+g("tBjodoh").value||0,urut:+g("tBurut").value||0,sebagian:g("tSebagian").checked}};
 if(dState.tedit){var old=(DB_.tantangan||[]).filter(function(x){return x.id===dState.tedit})[0];if(old)t.aktif=!!old.aktif}
 var MDs=dState.tf&&dState.tf.mode||(dState.tedit?tanModeOf((DB_.tantangan||[]).filter(function(x){return x.id===dState.tedit})[0]):null);
 if(MDs==="pasar"){var plv=g("tPsr")?g("tPsr").value:"sedang";if(!PSR_LV[plv])plv="sedang";t.jenis="pasar";t.serentak=true;t.mapel="_psr:"+plv;t.mapel_nama="🏪 Pasar Nusantara ("+PSR_LV[plv].nm+")";t.jumlah=PSR_LV[plv].n;t.mapels=null;t.menit=Math.max(t.menit||1,5);m={id:t.mapel};tot=t.jumlah}
 if(MDs==="detektif"){var cid=g("tDtk")?g("tDtk").value:"",DC=((MM.pk.detektif||[]).concat(DTK_CASES)).filter(function(c){return c.id===cid})[0];if(!DC){msg("Pilih kasus Detektif.","#fca5a5");return}
  t.jenis="detektif";t.serentak=true;t.mapel=("_dtk:"+DC.id).slice(0,60);t.mapel_nama=("🕵️ "+DC.judul).slice(0,80);t.jumlah=DC.petunjuk.length;t.mapels=null;t.menit=Math.max(t.menit||1,5);m={id:t.mapel};tot=t.jumlah}
 if(MDs==="jembatan"){t.jenis="jembatan";t.serentak=true;var nJ=0;lst.forEach(function(x){var mm=MM.pk.mapel.filter(function(y){return y.id===x.id})[0];if(mm)nJ+=Math.min(x.n,mm.soal.filter(function(so){return(!so.tipe||so.tipe==="pg"||so.tipe==="bs")&&so.opsi&&so.opsi.length>=2&&so.opsi.length<=4}).length)});if(!nJ){msg("Mapel yang dipilih belum punya soal pilihan ganda (2–4 pilihan) atau benar/salah untuk Jembatan Juara.","#fca5a5");return}t.menit=Math.max(t.menit||1,3)}
 if(MDs==="lari"){t.jenis="lari";t.serentak=true;var nL=0;lst.forEach(function(x){var mm=MM.pk.mapel.filter(function(y){return y.id===x.id})[0];if(mm)nL+=Math.min(x.n,mm.soal.filter(function(so){return(!so.tipe||so.tipe==="pg"||so.tipe==="bs")&&so.opsi&&so.opsi.length>=2&&so.opsi.length<=4}).length)});if(!nL){msg("Mapel yang dipilih belum punya soal pilihan ganda (2–4 pilihan) atau benar/salah untuk Lari Kilat.","#fca5a5");return}t.menit=Math.max(t.menit||1,Math.ceil((Math.min(30,nL)*22+30)/60)+2)}
 if(MDs==="arena"){t.jenis="arena";t.serentak=true;var nCh=0;lst.forEach(function(x){var mm=MM.pk.mapel.filter(function(y){return y.id===x.id})[0];if(mm)nCh+=Math.min(x.n,mm.soal.filter(function(so){return(!so.tipe||so.tipe==="pg"||so.tipe==="bs")&&so.opsi&&so.opsi.length>=2&&so.opsi.length<=4}).length)});
  if(!nCh){msg("Mapel yang dipilih belum punya soal pilihan ganda (2–4 pilihan) atau benar/salah untuk Jatuh Bangun.","#fca5a5");return}t.menit=Math.max(t.menit||1,Math.ceil((Math.min(30,nCh)*26+20)/60))}
 if(!t.judul){msg("Isi judul tantangan.","#fca5a5");return}if(!m){msg("Centang minimal satu mapel.","#fca5a5");return}
 if((MDs==="arena"||MDs==="lari"||MDs==="jembatan")&&!dState._gameOk&&(t.kategori==="sts"||t.kategori==="sas"||lst.some(function(x){var mm=MM.pk.mapel.filter(function(y){return y.id===x.id})[0];return mm&&mm.rahasia}))){zDlg({ic:"⚠️",t:"Mode game bukan untuk ujian",m:TMODE[MDs].nm+" menampilkan jawaban benar setiap soal kepada semua murid (lantai runtuh / gerbang terbuka). Untuk STS, SAS, atau soal rahasia, gunakan mode 📝 Ujian STS / SAS agar kunci tetap tertutup. Tetap terbitkan sebagai "+TMODE[MDs].nm+"?",ok:"Tetap terbitkan",no:"Batal",cb:function(v){if(v){dState._gameOk=true;tanSave();dState._gameOk=false}}});return}if(tot>100){msg("Total soal maksimal 100.","#fca5a5");return}if(!(ms&&me&&me>ms)){msg("Waktu ditutup harus setelah waktu dibuka.","#fca5a5");return}
 msg("Menyimpan...");api("/tantangan/simpan",{lic:licBody(),kode:dState.kode,pin:dState.pin,t:t}).then(function(){dState.tedit=null;dState.tf=null;return loadDash(false)}).then(function(){toast("⚡ Tantangan tersimpan. Murid akan melihatnya saat tantangan dibuka.",4000)},function(e){msg("❌ "+e.message,"#fca5a5")})}
function advSave(){var g=function(id){return $(id)},ms=new Date(g("tMulai").value).getTime(),me=new Date(g("tSelesai").value).getTime(),msg=function(t,c){$("tMsg").textContent=t;$("tMsg").style.color=c||""},tk=g("tTarget").value,tn=Math.max(1,+g("tTargetN").value||1);
 var t={id:dState.tedit||null,jenis:"petualangan",judul:g("tJudul").value.trim(),mapel:"_petualangan",mapel_nama:"Sesi petualangan",jumlah:1,menit:+g("tMenit").value,mulai:ms,selesai:me,serentak:true,acak:false,sekali:false,hasil:true,target:tk?tk+":"+tn:null,peta:g("tPeta")?g("tPeta").value:""};(function(){var MM=dModel(),sm=(dState.tf&&dState.tf.tMp)||null;if(sm){var l2=MM.pk.mapel.filter(function(x){return sm[x.id]!=null});if(l2.length&&l2.length<MM.pk.mapel.length)t.mapels={list:l2.map(function(x){return{id:x.id,n:1}}),urut:"acak"}}})();
 if(dState.tedit){var old=(DB_.tantangan||[]).filter(function(x){return x.id===dState.tedit})[0];if(old)t.aktif=!!old.aktif}
 if(!t.judul){msg("Isi judul petualangan.","#fca5a5");return}if(!(ms&&me&&me>ms)){msg("Waktu ditutup harus setelah waktu dibuka.","#fca5a5");return}
 msg("Menyimpan...");api("/tantangan/simpan",{lic:licBody(),kode:dState.kode,pin:dState.pin,t:t}).then(function(){dState.tedit=null;dState.tf=null;return loadDash(false)}).then(function(){toast("🗺️ Sesi petualangan siap. Minta murid masuk ruang tunggu, lalu tekan ▶ Mulai.",4500)},function(e){msg("❌ "+e.message,"#fca5a5")})}
function tanCsv(t){var M=dModel(),R=tanRes(t,M),K=dState.kktp,PS=tanPeserta(t,R),TMP=tanMapels(t),PCT=TMP&&TMP.list.length>1?tanMapelPct(R):null;
 var rows=xlTop("HASIL TANTANGAN: "+String(t.judul).toUpperCase(),["Kelas: "+DB_.kelas.nama+(DB_.kelas.guru?" • Guru: "+DB_.kelas.guru:"")+(t.kategori&&t.kategori!=="latihan"?" • "+(KAT[t.kategori]||t.kategori):""),(t.jenis==="petualangan"?"Sesi petualangan":"Mapel: "+(t.mapel_nama||mapName(M,t.mapel))+" • "+t.jumlah+" soal")+" • "+t.menit+" menit • Dibuka "+fmtD(t.mulai)+" s.d. "+fmtD(t.selesai),"KKTP "+K+" • Diunduh "+new Date().toLocaleString("id-ID")]),hr=rows.length;
 var head=["No","Absen","Nama","Nilai"].concat(PCT?TMP.list.map(function(x){return mapName(M,x.id)+" (% benar)"}):[],["Benar","Jumlah soal","Durasi (menit)","Dikirim","Keterangan"]);rows.push(head.map(function(h){return{v:h,s:3}}));
 var vals=[];PS.ya.forEach(function(u,ix){var x=R.by[u.id];if(x)vals.push(x.nilai);rows.push([{v:ix+1,s:5},{v:u.absen,s:5},{v:u.nama,s:4},x?{v:x.nilai,s:x.nilai<K?6:7}:{v:"-",s:5}].concat(PCT?TMP.list.map(function(mm){var v=x&&PCT[x.sid]&&PCT[x.sid][mm.id];return v==null?{v:"-",s:5}:numS(v,K)}):[],[x?{v:x.benar,s:5}:{v:"-",s:5},x?{v:x.total,s:5}:{v:"-",s:5},x?{v:Math.round(x.durasi/60),s:5}:{v:"-",s:5},{v:x?fmtT(x.t):"-",s:4},{v:x?(x.telat?"Terlambat":x.nilai>=K?"Tuntas":"Belum tuntas"):R.run[u.id]?"Sedang mengerjakan":"Tidak mengirim jawaban",s:4}]))});
 if(!PS.ya.length)rows.push([{v:"Belum ada murid yang ikut tantangan ini.",s:10}]);
 xlStat(rows,null,vals,K);
 if(PS.no.length){rows.push([]);rows.push([null,null,{v:"Tidak ikut tantangan ini ("+PS.no.length+" murid)",s:8}]);PS.no.forEach(function(u){rows.push([{v:"",s:0},{v:u.absen,s:5},{v:u.nama,s:4}])})}
 var W=[5,7,24,8].concat(PCT?TMP.list.map(function(){return 14}):[],[8,10,11,18,22]),sheets=[{name:"Hasil",rows:rows,widths:W,freeze:hr+1,land:true,tab:true}];
 var sids={};Object.keys(R.by).forEach(function(id){sids[R.by[id].sid]=1});var it={},ord=[];DB_.jawaban.forEach(function(j){if(!sids[j[9]])return;var o=it[j[2]];if(!o){o=it[j[2]]={q:j[3],m:j[1],n:0,ok:0};ord.push(j[2])}o.n++;o.ok+=j[6]});
 if(ord.length){var r2=xlTop("ANALISIS SOAL: "+t.judul,["Persen benar di bawah 50 ditandai merah: soal sulit atau kuncinya perlu dicek"]),h2=r2.length;r2.push(["No","Mapel","Soal","Menjawab","Benar","Persen benar"].map(function(h){return{v:h,s:3}}));
  ord.map(function(k){return it[k]}).sort(function(a,b){return a.ok/a.n-b.ok/b.n}).forEach(function(o,ix){var pc=Math.round(o.ok/o.n*100);r2.push([{v:ix+1,s:5},{v:mapName(M,o.m),s:4},{v:o.q,s:4},{v:o.n,s:5},{v:o.ok,s:5},{v:pc,s:pc<50?6:9}])});
  sheets.push({name:"Analisis Soal",rows:r2,widths:[5,16,64,10,8,12],freeze:h2+1,land:true})}
 xlBook(sheets,("hasil-"+String(t.judul).replace(/[^A-Za-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,40)+"-"+DB_.kelas.kode).toLowerCase()+".xlsx")}
/* ---------- 📋 REKAP NILAI ASESMEN & 📐 ANALISIS NILAI (unduh Excel / PDF) ---------- */
var RKP={set:false,an:"rapor"};
function rkpSet(){var d={bobot:{harian:50,sts:25,sas:25,latihan:0},kktp:dState.kktp,aturan:"pertama",nol:0,latihan:0,sekolah:"",mapel:"",semester:"",tahun:"",kepsek:"",nipks:"",nipguru:""},r=DB_&&DB_.kelas&&DB_.kelas.rekap;
 if(r){Object.keys(d).forEach(function(k){if(k!=="bobot"&&k!=="kktp"&&r[k]!=null)d[k]=r[k]});if(r.bobot)Object.keys(d.bobot).forEach(function(k){if(r.bobot[k]!=null)d.bobot[k]=+r.bobot[k]})}
 d.kktp=dState.kktp;return d}
function r1(v){return Math.round(v*10)/10}
function nf(v){return v==null?"-":typeof v==="number"?String(v).replace(".",","):v}
function rkpData(M){var S=rkpSet(),cats=["harian","sts","sas"].concat(S.latihan?["latihan"]:[]);
 var as=(DB_.tantangan||[]).filter(function(t){return t.jenis!=="petualangan"&&cats.indexOf(t.kategori||"latihan")>=0}).slice().sort(function(a,b){var o={harian:0,latihan:1,sts:2,sas:3},x=o[a.kategori||"latihan"]-o[b.kategori||"latihan"];return x||a.mulai-b.mulai}),cnt={},tot={},nowT=Date.now();
 as.forEach(function(t){var c=t.kategori||"latihan";tot[c]=(tot[c]||0)+1});
 as.forEach(function(t){var c=t.kategori||"latihan";cnt[c]=(cnt[c]||0)+1;t._lbl=KATS[c]+(tot[c]>1||c==="harian"||c==="latihan"?cnt[c]:"")});
 var by={};DB_.sesi.forEach(function(s){if(!s[10])return;var k=s[10]+":"+s[1];(by[k]=by[k]||[]).push({nilai:s[6],benar:s[4],total:s[5],skor:s[14],maks:s[15],t:s[8],telat:s[11],sid:s[0]})});
 var pickV=function(tid,mid){var L=by[tid+":"+mid];if(!L||!L.length)return null;L=L.slice().sort(function(a,b){return a.t-b.t});
  if(S.aturan==="terbaik")return L.reduce(function(a,b){return b.nilai>a.nilai?b:a});if(S.aturan==="terakhir")return L[L.length-1];return L[0]};
 as.forEach(function(t){t._n=M.murid.filter(function(u){return by[t.id+":"+u.id]}).length;t._live=t.selesai>nowT});
 var rows=M.murid.map(function(u){var v={},cat={},miss=0;as.forEach(function(t){v[t.id]=pickV(t.id,u.id);if(!v[t.id]&&t._n&&!t._live)miss++});
  cats.forEach(function(c){var L=as.filter(function(t){return(t.kategori||"latihan")===c});if(!L.length){cat[c]=null;return}var vals=[];L.forEach(function(t){var x=v[t.id];if(x)vals.push(x.nilai);else if(S.nol&&t._n&&!t._live)vals.push(0)});cat[c]=vals.length?r1(vals.reduce(function(a,b){return a+b},0)/vals.length):null});
  var sw=0,sv=0;cats.forEach(function(c){var w=+S.bobot[c]||0;if(w>0&&cat[c]!=null){sw+=w;sv+=w*cat[c]}});
  return{u:u,v:v,cat:cat,na:sw?r1(sv/sw):null,miss:miss}});
 var rk=rows.filter(function(r){return r.na!=null}).sort(function(a,b){return b.na-a.na});rk.forEach(function(r,i){r.rank=i&&rk[i-1].na===r.na?rk[i-1].rank:i+1});
 return{S:S,cats:cats.filter(function(c){return as.some(function(t){return(t.kategori||"latihan")===c})}),as:as,rows:rows}}
function rkpFormula(D){var S=D.S,parts=D.cats.filter(function(c){return(+S.bobot[c]||0)>0}).map(function(c){return(c==="harian"?"Rata-rata Harian":c==="latihan"?"Rata-rata Latihan":KATS[c])+" "+S.bobot[c]+"%"});return parts.length?parts.join(" + "):"belum ada bobot"}
function catLbl(c){return c==="harian"?"Rata-rata AH":c==="latihan"?"Rata-rata LAT":KATS[c]}
function rkpCell(x,K){if(!x)return'<td class="mut">-</td>';return'<td'+(x.nilai<K?' style="color:#fca5a5;font-weight:800"':'')+' title="'+(x.maks?'Skor '+x.skor+' dari '+x.maks:x.benar+'/'+x.total+' benar')+(x.telat?' • terlambat':'')+'">'+x.nilai+(x.telat?'<sup>⚠</sup>':'')+'</td>'}
function rekapTab(M){var D=rkpData(M),S=D.S,K=S.kktp,h='';
 h+='<div class="row" style="margin-top:0;align-items:center"><button class="btn sm own '+(RKP.set?"yel":"gray")+'" data-dact="rkpset">⚙️ Pengaturan rekap</button><span style="flex:1"></span><button class="btn sm green" data-dact="rkpxls">⬇ Unduh Excel</button><button class="btn sm yel" data-dact="rkppdf">🖨 Cetak / Simpan PDF</button></div>';
 if(RKP.set)h+=rkpSetHTML(S);
 h+='<div class="note" style="margin-top:8px">📐 <b>Nilai rapor</b> = '+esc(rkpFormula(D))+' • percobaan yang dipakai: <b>'+({pertama:"pertama",terbaik:"terbaik",terakhir:"terakhir"}[S.aturan])+'</b> • KKTP <b>'+K+'</b>'+(S.nol?' • asesmen yang tidak diikuti dihitung 0':' • asesmen yang tidak diikuti tidak dihitung')+'</div>';
 if(!D.as.length)return h+'<div class="scard"><b>Belum ada asesmen.</b><div class="mut" style="margin-top:6px">Buka tab <b>⚡ Tantangan</b>, buat tantangan baru, lalu pilih <b>Jenis asesmen</b>: Asesmen Harian, STS, atau SAS. Setelah murid mengerjakan, nilainya otomatis muncul di sini.</div><div class="row"><button class="btn sm yel" data-dact="rkptan">⚡ Buat asesmen</button></div></div>';
 h+='<div class="tbl-wrap" style="margin-top:8px"><table class="dt rkp"><tr><th>No</th><th>Absen</th><th>Nama</th>'+D.as.map(function(t){return'<th title="'+esc(t.judul)+' • '+esc(KAT[t.kategori||"latihan"])+' • '+fmtD(t.mulai)+'">'+esc(t._lbl)+'</th>'}).join("")+D.cats.map(function(c){return'<th class="rc">'+catLbl(c)+'</th>'}).join("")+'<th class="rc">Nilai rapor</th><th>Rank</th><th>Keterangan</th></tr>';
 D.rows.forEach(function(r,i){var u=r.u;h+='<tr class="cl" data-mu="'+u.id+'"><td>'+(i+1)+'</td><td>'+u.absen+'</td><td><b>'+esc(u.nama)+'</b></td>'+D.as.map(function(t){return rkpCell(r.v[t.id],K)}).join("")+D.cats.map(function(c){var v=r.cat[c];return'<td class="rc"'+(v!=null&&v<K?' style="color:#fca5a5"':'')+'>'+nf(v)+'</td>'}).join("")+'<td class="rc"><b'+(r.na!=null&&r.na<K?' style="color:#fca5a5"':'')+'>'+nf(r.na)+'</b></td><td>'+(r.rank||"-")+'</td><td>'+(r.na==null?'<span class="badge b-na">Belum ada nilai</span>':r.na>=K?'<span class="badge b-ok">✓ Tuntas</span>':'<span class="badge b-no">Belum tuntas</span>')+(r.miss&&r.na!=null?' <span class="badge b-mid" title="Belum mengikuti '+r.miss+' asesmen">⚠ '+r.miss+' belum ikut</span>':'')+'</td></tr>'});
 var colVals=function(f){return D.rows.map(f).filter(function(v){return v!=null})},sumRow=function(lbl,fn){return'<tr class="rsum"><td colspan="3"><b>'+lbl+'</b></td>'+D.as.map(function(t){var L=colVals(function(r){return r.v[t.id]?r.v[t.id].nilai:null});return'<td>'+(L.length?nf(fn(L)):"-")+'</td>'}).join("")+D.cats.map(function(c){var L=colVals(function(r){return r.cat[c]});return'<td class="rc">'+(L.length?nf(fn(L)):"-")+'</td>'}).join("")+(function(){var L=colVals(function(r){return r.na});return'<td class="rc"><b>'+(L.length?nf(fn(L)):"-")+'</b></td>'})()+'<td colspan="2"></td></tr>'};
 h+=sumRow("Rata-rata",function(L){return r1(L.reduce(function(a,b){return a+b},0)/L.length)})+sumRow("Tertinggi",function(L){return Math.max.apply(null,L)})+sumRow("Terendah",function(L){return Math.min.apply(null,L)})+sumRow("Tuntas",function(L){return Math.round(L.filter(function(v){return v>=K}).length/L.length*100)+"%"});
 h+='</table></div><div class="mut" style="font-size:12px;margin-top:6px">Arahkan kursor ke judul kolom untuk melihat nama asesmen. Angka merah = di bawah KKTP. ⚠ = dikirim terlambat. Asesmen yang masih dibuka atau belum dikerjakan siapa pun tidak dihitung 0. Keterangan kolom: '+D.as.map(function(t){return'<b>'+esc(t._lbl)+'</b> '+esc(t.judul)}).join(" • ")+'.</div>';
 return h}
function rkpSetHTML(S){var inp=function(id,lbl,v,ph){return'<label class="fld">'+lbl+'<input id="'+id+'" value="'+esc(v||"")+'" placeholder="'+esc(ph||"")+'"></label>'};
 return'<div class="scard" id="rkpForm"><div class="sh"><span>⚙️ Pengaturan rekap nilai</span></div><div class="mut" style="font-size:12px">Bobot nilai rapor (dalam persen, total boleh berapa saja, otomatis dinormalkan):</div><div class="bgrid" style="grid-template-columns:repeat(4,1fr)"><label class="fld">Asesmen Harian<input id="rpBh" type="number" min="0" max="100" value="'+S.bobot.harian+'"></label><label class="fld">STS<input id="rpBs" type="number" min="0" max="100" value="'+S.bobot.sts+'"></label><label class="fld">SAS<input id="rpBa" type="number" min="0" max="100" value="'+S.bobot.sas+'"></label><label class="fld">Latihan<input id="rpBl" type="number" min="0" max="100" value="'+S.bobot.latihan+'"></label></div>'+
 '<div class="gtop" style="margin-top:6px"><label class="fld">Nilai yang dipakai bila murid mengerjakan lebih dari sekali<select id="rpAt">'+[["pertama","Percobaan pertama (disarankan untuk ujian)"],["terbaik","Nilai terbaik"],["terakhir","Percobaan terakhir"]].map(function(x){return'<option value="'+x[0]+'"'+(S.aturan===x[0]?" selected":"")+'>'+x[1]+'</option>'}).join("")+'</select></label></div>'+
 '<label class="mut" style="display:flex;gap:8px;align-items:center;font-weight:800;margin-top:6px"><input type="checkbox" id="rpNol"'+(S.nol?" checked":"")+'> Asesmen yang tidak diikuti murid dihitung 0</label><label class="mut" style="display:flex;gap:8px;align-items:center;font-weight:800;margin-top:6px"><input type="checkbox" id="rpLat"'+(S.latihan?" checked":"")+'> Ikutkan tantangan Latihan di rekap</label>'+
 '<div class="mut" style="font-size:12px;margin-top:10px">Identitas untuk kop dan tanda tangan laporan (Excel/PDF):</div><div class="gtop">'+inp("rpSek","Nama sekolah",S.sekolah,"SD Inpres Rata")+inp("rpMap","Mata pelajaran",S.mapel,"Contoh: Matematika")+inp("rpSem","Semester",S.semester,"Ganjil")+'</div><div class="gtop">'+inp("rpThn","Tahun ajaran",S.tahun,"2026/2027")+inp("rpKs","Kepala sekolah",S.kepsek,"")+inp("rpNks","NIP kepala sekolah",S.nipks,"")+'</div><div class="gtop">'+inp("rpNg","NIP guru",S.nipguru,"")+'<span></span><span></span></div>'+
 '<div class="row"><button class="btn green" data-dact="rkpsave">💾 Simpan pengaturan</button><span class="mut" id="rpMsg" style="font-size:12px">KKTP diambil dari isian KKTP di bagian atas dashboard ('+S.kktp+').</span></div></div>'}
function rkpSave(){var g=function(id){return $(id)},o={bobot:{harian:+g("rpBh").value||0,sts:+g("rpBs").value||0,sas:+g("rpBa").value||0,latihan:+g("rpBl").value||0},kktp:dState.kktp,aturan:g("rpAt").value,nol:g("rpNol").checked,latihan:g("rpLat").checked,sekolah:g("rpSek").value.trim(),mapel:g("rpMap").value.trim(),semester:g("rpSem").value.trim(),tahun:g("rpThn").value.trim(),kepsek:g("rpKs").value.trim(),nipks:g("rpNks").value.trim(),nipguru:g("rpNg").value.trim()};
 $("rpMsg").textContent="Menyimpan...";api("/kelas/rekap",{lic:licBody(),kode:dState.kode,pin:dState.pin,rekap:o}).then(function(r){DB_.kelas.rekap=r.rekap;RKP.set=false;renderDash();toast("✔ Pengaturan rekap tersimpan",2500)},function(e){$("rpMsg").textContent="❌ "+e.message})}
/* ---------- analisis ---------- */
function anSources(D){var o=[["rapor","Nilai rapor (gabungan)"]];D.cats.forEach(function(c){o.push(["cat:"+c,(c==="harian"?"Rata-rata Asesmen Harian":c==="latihan"?"Rata-rata Latihan":KAT[c])])});D.as.forEach(function(t){o.push(["t:"+t.id,t._lbl+" • "+t.judul])});return o}
function anVals(D,src){return D.rows.map(function(r){var v=src==="rapor"?r.na:src.indexOf("cat:")===0?r.cat[src.slice(4)]:(r.v[+src.slice(2)]?r.v[+src.slice(2)].nilai:null);return{u:r.u,v:v,r:r}}).filter(function(x){return x.v!=null})}
function stdev0(L){if(L.length<2)return 0;var m=L.reduce(function(a,b){return a+b},0)/L.length;return Math.sqrt(L.reduce(function(a,b){return a+(b-m)*(b-m)},0)/(L.length-1))}
function modus(L){var c={},best=null,n=0;L.forEach(function(v){var k=Math.round(v);c[k]=(c[k]||0)+1;if(c[k]>n){n=c[k];best=k}});return n>1?best:"-"}
function anBands(K){var b=[["Sangat baik",90,100,"#22c55e"],["Baik",80,89.99,"#4ade80"]];if(K<80)b.push(["Cukup",K,79.99,"#facc15"]);b.push(["Perlu bimbingan",0,Math.min(K,80)-0.01,"#f87171"]);return b}
function anStats(X,K){var L=X.map(function(x){return x.v}),s=L.slice().sort(function(a,b){return a-b}),n=L.length;if(!n)return null;var mean=r1(L.reduce(function(a,b){return a+b},0)/n),med=n%2?s[(n-1)/2]:r1((s[n/2-1]+s[n/2])/2);
 var hi=s[n-1],lo=s[0],tn=L.filter(function(v){return v>=K}).length;return{n:n,mean:mean,med:med,mod:modus(L),sd:r1(stdev0(L)),hi:hi,lo:lo,range:r1(hi-lo),tn:tn,pt:Math.round(tn/n*100),his:X.filter(function(x){return x.v===hi}).map(function(x){return x.u.nama}),los:X.filter(function(x){return x.v===lo}).map(function(x){return x.u.nama})}}
var AN_BINS=[["0–39",0,39.99],["40–49",40,49.99],["50–59",50,59.99],["60–69",60,69.99],["70–79",70,79.99],["80–89",80,89.99],["90–100",90,100]];
function anItems(D,tid){var t=D.as.filter(function(x){return x.id===tid})[0];if(!t)return null;var pairs=[];D.rows.forEach(function(r){var x=r.v[tid];if(x)pairs.push({mid:r.u.id,sid:x.sid,n:x.nilai})});if(!pairs.length)return[];
 var sid={};pairs.forEach(function(p){sid[p.sid]=p});var so=pairs.slice().sort(function(a,b){return b.n-a.n}),g=Math.max(1,Math.round(so.length*0.27)),up={},lo={};so.slice(0,g).forEach(function(p){up[p.sid]=1});so.slice(-g).forEach(function(p){lo[p.sid]=1});
 var it={},ord=[];DB_.jawaban.forEach(function(j){if(!sid[j[9]])return;var k=j[2];var o=it[k];if(!o){o=it[k]={q:j[3],n:0,ok:0,un:0,uok:0,ln:0,lok:0,picks:{}};ord.push(k)}o.n++;o.ok+=j[6];if(up[j[9]]){o.un++;o.uok+=j[6]}if(lo[j[9]]){o.ln++;o.lok+=j[6]}if(!j[6]&&j[4]>=0)o.picks[j[4]]=(o.picks[j[4]]||0)+1});
 var pk=null;try{pk=validate(clone(DB_.paket))}catch(e){}var smap={};if(pk)pk.mapel.forEach(function(m){m.soal.forEach(function(s){smap[skey(s)]=s})});
 return ord.map(function(k){var o=it[k],P=o.n?o.ok/o.n:0,Dd=(o.un?o.uok/o.un:0)-(o.ln?o.lok/o.ln:0),s=smap[k];
  var tk=P>0.7?"Mudah":P>=0.3?"Sedang":"Sukar",db=Dd>=0.4?"Sangat baik":Dd>=0.3?"Baik":Dd>=0.2?"Cukup":"Perlu revisi",rek=Dd<0.2||P<0.15||P>0.95?(P>0.95?"Terlalu mudah, bisa diganti":Dd<0?"Periksa kunci jawaban":"Revisi soal"):"Pertahankan";
  return{k:k,q:o.q,tipe:s?(s.tipe||"pg"):"pg",n:o.n,P:Math.round(P*100)/100,D:Math.round(Dd*100)/100,tk:tk,db:db,rek:rek}})}
function anInterpret(st,K,items,lbl){if(!st)return"";var s=[];s.push("Rata-rata kelas untuk "+lbl+" adalah "+nf(st.mean)+(st.mean>=K?", sudah mencapai":", masih di bawah")+" KKTP "+K+".");
 s.push(st.tn+" dari "+st.n+" murid ("+st.pt+"%) tuntas"+(st.n-st.tn?", sehingga "+(st.n-st.tn)+" murid perlu remedial atau bimbingan.":"."));
 s.push("Nilai berkisar "+nf(st.lo)+" sampai "+nf(st.hi)+" dengan simpangan baku "+nf(st.sd)+(st.sd>=15?", artinya kemampuan murid cukup beragam sehingga perlu pembelajaran berdiferensiasi.":st.sd<=7?", artinya kemampuan murid relatif merata.":"."));
 if(items&&items.length){var sk=items.filter(function(i){return i.tk==="Sukar"}).length,rv=items.filter(function(i){return i.rek!=="Pertahankan"}).length;s.push("Dari "+items.length+" soal, "+sk+" tergolong sukar dan "+rv+" perlu ditinjau ulang (lihat tabel analisis butir soal).")}
 return s.join(" ")}
function analisisTab(M){var D=rkpData(M),K=D.S.kktp,src=RKP.an,opts=anSources(D);if(!opts.some(function(o){return o[0]===src}))src=RKP.an="rapor";
 var h='<div class="row" style="margin-top:0;align-items:center"><label class="fld" style="flex-direction:row;align-items:center;gap:8px">Data yang dianalisis<select id="anSrc">'+opts.map(function(o){return'<option value="'+o[0]+'"'+(o[0]===src?" selected":"")+'>'+esc(o[1])+'</option>'}).join("")+'</select></label><span style="flex:1"></span><button class="btn sm green" data-dact="anxls">⬇ Unduh Excel</button><button class="btn sm yel" data-dact="anpdf">🖨 Cetak / Simpan PDF</button></div>';
 if(!D.as.length)return h+'<div class="note">Belum ada asesmen. Buat tantangan dengan <b>Jenis asesmen</b> Harian, STS, atau SAS di tab ⚡ Tantangan, lalu analisisnya muncul di sini.</div>';
 var lbl=(opts.filter(function(o){return o[0]===src})[0]||["",""])[1],X=anVals(D,src),st=anStats(X,K);
 if(!st)return h+'<div class="note">Belum ada nilai untuk data ini.</div>';
 h+='<div class="tiles" style="margin-top:6px">'+[[st.n+" / "+D.rows.length,"Peserta"],[nf(st.mean),"Rata-rata"],[nf(st.med),"Median"],[st.mod,"Modus"],[nf(st.sd),"Simpangan baku"],['<em style="font-style:normal;color:#4ade80">'+nf(st.hi)+'</em>',"Tertinggi • "+esc(st.his.slice(0,2).join(", "))+(st.his.length>2?" +"+(st.his.length-2):"")],['<em style="font-style:normal;color:#fca5a5">'+nf(st.lo)+'</em>',"Terendah • "+esc(st.los.slice(0,2).join(", "))+(st.los.length>2?" +"+(st.los.length-2):"")],[nf(st.range),"Rentang"],[st.pt+"%","Tuntas ("+st.tn+" murid)"]].map(function(t){return'<div class="tile"><b>'+t[0]+'</b><span>'+t[1]+'</span></div>'}).join("")+'</div>';
 var items=src.indexOf("t:")===0?anItems(D,+src.slice(2)):null;
 h+='<div class="rec"><h4>🧭 Kesimpulan otomatis</h4><div>'+esc(anInterpret(st,K,items,lbl))+'</div></div>';
 var bins=AN_BINS.map(function(b){var c=X.filter(function(x){return x.v>=b[1]&&x.v<=b[2]}).length;return{l:b[0],v:c,c:b[2]<K?"#f87171":"#4ade80",t:c+" murid"}});
 h+='<div class="g2r"><div class="scard"><div class="sh"><span>📊 Distribusi frekuensi</span></div>'+svgBars(bins,{w:520,h:220,label:"Distribusi nilai"})+'<div class="tbl-wrap"><table class="dt"><tr><th>Interval</th><th>Frekuensi</th><th>Persen</th></tr>'+bins.map(function(b){return'<tr><td>'+b.l+'</td><td>'+b.v+'</td><td>'+Math.round(b.v/st.n*100)+'%</td></tr>'}).join("")+'</table></div></div>';
 var bands=anBands(K);h+='<div class="scard"><div class="sh"><span>🎯 Kategori capaian</span></div>'+bands.map(function(b){var L=X.filter(function(x){return x.v>=b[1]&&x.v<=b[2]});return'<div class="anb"><div class="sh" style="margin:0"><span><i style="background:'+b[3]+'"></i>'+b[0]+' <small class="mut">('+Math.round(b[1])+'–'+Math.floor(b[2])+')</small></span><b>'+L.length+' murid • '+Math.round(L.length/st.n*100)+'%</b></div><div class="mut" style="font-size:12px">'+(L.length?L.map(function(x){return esc(x.u.nama)+" ("+x.v+")"}).join(", "):"-")+'</div></div>'}).join("")+'</div></div>';
 if(D.as.length>1){var per=D.as.map(function(t){var L=D.rows.map(function(r){return r.v[t.id]?r.v[t.id].nilai:null}).filter(function(v){return v!=null});return{t:t,L:L}}).filter(function(x){return x.L.length});
  h+='<div class="scard"><div class="sh"><span>📈 Perbandingan antar asesmen</span><small class="mut">rata-rata kelas</small></div>'+svgBars(per.map(function(x){var a=r1(x.L.reduce(function(p,q){return p+q},0)/x.L.length);return{l:x.t._lbl,v:Math.round(a),c:a>=K?"#4ade80":"#f87171",t:x.t.judul}}),{w:Math.max(520,per.length*80+60),h:230,max:100,kk:K,label:"Rata-rata per asesmen"})+'<div class="tbl-wrap"><table class="dt"><tr><th>Asesmen</th><th>Peserta</th><th>Rata-rata</th><th>Tertinggi</th><th>Terendah</th><th>Tuntas</th></tr>'+per.map(function(x){var L=x.L;return'<tr><td><b>'+esc(x.t._lbl)+'</b> '+esc(x.t.judul)+'</td><td>'+L.length+'</td><td>'+nf(r1(L.reduce(function(p,q){return p+q},0)/L.length))+'</td><td>'+Math.max.apply(null,L)+'</td><td>'+Math.min.apply(null,L)+'</td><td>'+Math.round(L.filter(function(v){return v>=K}).length/L.length*100)+'%</td></tr>'}).join("")+'</table></div></div>'}
 if(src.indexOf("t:")===0){var ta=D.as.filter(function(x){return x.id===+src.slice(2)})[0],TM=tanMapels(ta);if(TM&&TM.list.length>1){var PC=tanMapelPct(tanRes(ta,M)),rows2=TM.list.map(function(mm){var L=Object.keys(PC).map(function(sid){return PC[sid][mm.id]}).filter(function(v){return v!=null});return{l:mapName(M,mm.id),L:L}}).filter(function(x){return x.L.length});
  if(rows2.length)h+='<div class="scard"><div class="sh"><span>📚 Capaian per mapel</span><small class="mut">rata-rata persentase jawaban benar</small></div>'+svgBars(rows2.map(function(x){var a=Math.round(x.L.reduce(function(p,q){return p+q},0)/x.L.length);return{l:x.l,v:a,c:a>=K?"#4ade80":"#f87171"}}),{w:Math.max(480,rows2.length*110+60),h:220,max:100,kk:K,label:"Capaian per mapel"})+'<div class="mut" style="font-size:12px">Mapel dengan batang merah perlu diperkuat. Rincian per murid ada di kartu tantangan → 📋 Lihat hasil.</div></div>'}}
 var rem=X.filter(function(x){return x.v<K}).sort(function(a,b){return a.v-b.v}),enr=X.filter(function(x){return x.v>=90}).sort(function(a,b){return b.v-a.v});
 h+='<div class="g2r"><div class="scard"><div class="sh"><span>🤝 Perlu remedial ('+rem.length+')</span><small class="mut">di bawah KKTP '+K+'</small></div>'+(rem.length?rem.map(function(x){return'<div class="ostat" style="grid-template-columns:1fr 60px"><span>'+esc(x.u.nama)+' <small class="mut">absen '+x.u.absen+'</small></span><b style="text-align:right;color:#fca5a5">'+x.v+'</b></div>'}).join(""):'<div class="mut">Semua murid tuntas 🎉</div>')+'</div><div class="scard"><div class="sh"><span>🚀 Pengayaan ('+enr.length+')</span><small class="mut">nilai ≥ 90</small></div>'+(enr.length?enr.map(function(x){return'<div class="ostat" style="grid-template-columns:1fr 60px"><span>'+esc(x.u.nama)+' <small class="mut">absen '+x.u.absen+'</small></span><b style="text-align:right;color:#4ade80">'+x.v+'</b></div>'}).join(""):'<div class="mut">Belum ada.</div>')+'</div></div>';
 if(items){h+='<h3 style="font-family:var(--fh);margin:14px 0 6px">🔍 Analisis butir soal</h3>';if(!items.length)h+='<div class="mut">Belum ada jawaban tercatat.</div>';else h+='<div class="tbl-wrap"><table class="dt"><tr><th>No</th><th>Soal</th><th>Jenis</th><th>Menjawab</th><th>Tingkat kesukaran (P)</th><th>Daya beda (D)</th><th>Rekomendasi</th></tr>'+items.map(function(i,n){return'<tr><td>'+(n+1)+'</td><td style="max-width:320px">'+esc(String(i.q).slice(0,140))+'</td><td>'+esc((TIPE[i.tipe]||"").replace(/^\S+\s/,""))+'</td><td>'+i.n+'</td><td><b>'+i.P.toFixed(2)+'</b> <span class="badge '+(i.tk==="Sukar"?"b-no":i.tk==="Sedang"?"b-mid":"b-ok")+'">'+i.tk+'</span></td><td><b>'+i.D.toFixed(2)+'</b> <span class="badge '+(i.db==="Perlu revisi"?"b-no":i.db==="Cukup"?"b-mid":"b-ok")+'">'+i.db+'</span></td><td>'+(i.rek==="Pertahankan"?'✓ Pertahankan':'<b style="color:#fde68a">'+esc(i.rek)+'</b>')+'</td></tr>'}).join("")+'</table></div><div class="mut" style="font-size:12px;margin-top:6px">P = proporsi murid yang menjawab benar (P &gt; 0,70 mudah; 0,30–0,70 sedang; &lt; 0,30 sukar). D = selisih proporsi benar kelompok atas dan bawah (27% nilai tertinggi dan terendah); D ≥ 0,40 sangat baik, 0,30–0,39 baik, 0,20–0,29 cukup, &lt; 0,20 perlu revisi. D negatif biasanya tanda kunci jawaban perlu diperiksa.</div>'}
 else h+='<div class="mut" style="font-size:12px;margin-top:8px">Pilih satu asesmen di "Data yang dianalisis" untuk melihat analisis butir soal (tingkat kesukaran dan daya beda).</div>';
 return h}
/* ---------- Excel (.xlsx) ---------- */
function xlCol(i){var s="";i++;while(i>0){var m=(i-1)%26;s=String.fromCharCode(65+m)+s;i=Math.floor((i-1)/26)}return s}
function xlSheet(sh){var rows=sh.rows,W=sh.widths||[],out='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetPr><pageSetUpPr fitToPage="1"/></sheetPr><sheetViews><sheetView workbookViewId="0"'+(sh.tab?' tabSelected="1"':'')+(sh.freeze?'><pane ySplit="'+sh.freeze+'" topLeftCell="A'+(sh.freeze+1)+'" activePane="bottomLeft" state="frozen"/></sheetView>':'/>')+'</sheetViews>';
 if(W.length)out+='<cols>'+W.map(function(w,i){return'<col min="'+(i+1)+'" max="'+(i+1)+'" width="'+w+'" customWidth="1"/>'}).join("")+'</cols>';
 out+='<sheetData>'+rows.map(function(r,ri){return'<row r="'+(ri+1)+'"'+(r&&r.ht?' ht="'+r.ht+'" customHeight="1"':'')+'>'+(r&&r.c||r||[]).map(function(c,ci){if(c==null||c==="")return"";var o=typeof c==="object"?c:{v:c},ref=xlCol(ci)+(ri+1),st=o.s!=null?' s="'+o.s+'"':'';
  if(o.v==null||o.v==="")return'<c r="'+ref+'"'+st+'/>';if(typeof o.v==="number"&&isFinite(o.v))return'<c r="'+ref+'"'+st+'><v>'+o.v+'</v></c>';return'<c r="'+ref+'"'+st+' t="inlineStr"><is><t xml:space="preserve">'+impX(o.v)+'</t></is></c>'}).join("")+'</row>'}).join("")+'</sheetData>';
 if(sh.merge&&sh.merge.length)out+='<mergeCells count="'+sh.merge.length+'">'+sh.merge.map(function(m){return'<mergeCell ref="'+m+'"/>'}).join("")+'</mergeCells>';
 return out+'<pageMargins left="0.5" right="0.5" top="0.6" bottom="0.6" header="0.3" footer="0.3"/><pageSetup paperSize="9" orientation="'+(sh.land?"landscape":"portrait")+'" fitToWidth="1" fitToHeight="0"/></worksheet>'}
/* gaya: 0 biasa, 1 judul besar, 2 subjudul, 3 kepala tabel, 4 sel teks, 5 sel angka, 6 angka merah, 7 angka tebal, 8 teks tebal, 9 angka hijau, 10 teks miring kecil */
var XL_STY='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="7"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="15"/><color rgb="FF1E3A8A"/><name val="Calibri"/></font><font><sz val="10"/><color rgb="FF475569"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFB91C1C"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FF15803D"/><name val="Calibri"/></font></fonts><fills count="4"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF1E3A8A"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFEFF6FF"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left style="thin"><color rgb="FFCBD5E1"/></left><right style="thin"><color rgb="FFCBD5E1"/></right><top style="thin"><color rgb="FFCBD5E1"/></top><bottom style="thin"><color rgb="FFCBD5E1"/></bottom><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="11">'+
 '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>'+
 '<xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/>'+
 '<xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/>'+
 '<xf numFmtId="0" fontId="3" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>'+
 '<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>'+
 '<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center"/></xf>'+
 '<xf numFmtId="0" fontId="5" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center"/></xf>'+
 '<xf numFmtId="0" fontId="4" fillId="3" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center"/></xf>'+
 '<xf numFmtId="0" fontId="4" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
 '<xf numFmtId="0" fontId="6" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center"/></xf>'+
 '<xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment wrapText="1" vertical="top"/></xf>'+
 '</cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>';
function xlBook(sheets,fname){var CT='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>'+sheets.map(function(s,i){return'<Override PartName="/xl/worksheets/sheet'+(i+1)+'.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'}).join("")+'</Types>';
 var nm=function(n){return impX(String(n).replace(/[\\\/\?\*\[\]:]/g," ").slice(0,31))};
 var files=[["[Content_Types].xml",CT],["_rels/.rels",'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'],
  ["xl/workbook.xml",'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>'+sheets.map(function(s,i){return'<sheet name="'+nm(s.name)+'" sheetId="'+(i+1)+'" r:id="rId'+(i+1)+'"/>'}).join("")+'</sheets></workbook>'],
  ["xl/_rels/workbook.xml.rels",'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+sheets.map(function(s,i){return'<Relationship Id="rId'+(i+1)+'" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet'+(i+1)+'.xml"/>'}).join("")+'<Relationship Id="rId'+(sheets.length+1)+'" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'],
  ["xl/styles.xml",XL_STY]];
 sheets.forEach(function(s,i){if(i===0)s.tab=true;files.push(["xl/worksheets/sheet"+(i+1)+".xml",xlSheet(s)])});
 impDl(impZipMake(files,"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"),fname)}
function rkpHead(S,title){var k=DB_.kelas,r=[[{v:title,s:1}]];if(S.sekolah)r.push([{v:S.sekolah,s:2}]);r.push([{v:"Kelas: "+k.nama+(S.mapel?" • Mata pelajaran: "+S.mapel:"")+(S.semester?" • Semester: "+S.semester:"")+(S.tahun?" • Tahun ajaran: "+S.tahun:""),s:2}]);r.push([{v:"Guru: "+(k.guru||"-")+" • KKTP "+S.kktp+" • Diunduh "+new Date().toLocaleString("id-ID"),s:2}]);return r}
function numS(v,K){return v==null?{v:"-",s:5}:{v:v,s:v<K?6:5}}
function rkpSheetRows(D){var S=D.S,K=S.kktp,rows=rkpHead(S,"REKAP NILAI ASESMEN");rows.push([{v:"Nilai rapor = "+rkpFormula(D)+" • nilai yang dipakai: percobaan "+S.aturan+(S.nol?" • asesmen tidak diikuti = 0":""),s:2}]);rows.push([]);
 var hr=rows.length,head=["No","Absen","Nama"].concat(D.as.map(function(t){return t._lbl}),D.cats.map(catLbl),["Nilai Rapor","Peringkat","Keterangan"]);rows.push(head.map(function(h){return{v:h,s:3}}));
 D.rows.forEach(function(r,i){rows.push([{v:i+1,s:5},{v:r.u.absen,s:5},{v:r.u.nama,s:4}].concat(D.as.map(function(t){var x=r.v[t.id];return x?numS(x.nilai,K):{v:"-",s:5}}),D.cats.map(function(c){return numS(r.cat[c],K)}),[r.na==null?{v:"-",s:7}:{v:r.na,s:r.na<K?6:7},{v:r.rank||"-",s:5},{v:r.na==null?"Belum ada nilai":(r.na>=K?"Tuntas":"Belum tuntas")+(r.miss?" ("+r.miss+" asesmen belum diikuti)":""),s:4}]))});
 var agg=function(lbl,fn,pc){var row=[{v:"",s:8},{v:"",s:8},{v:lbl,s:8}];var col=function(L){L=L.filter(function(v){return v!=null});return L.length?fn(L):"-"};
  D.as.forEach(function(t){row.push({v:col(D.rows.map(function(r){return r.v[t.id]?r.v[t.id].nilai:null})),s:7})});D.cats.forEach(function(c){row.push({v:col(D.rows.map(function(r){return r.cat[c]})),s:7})});row.push({v:col(D.rows.map(function(r){return r.na})),s:7});row.push({v:"",s:8});row.push({v:"",s:8});return row};
 rows.push(agg("Rata-rata",function(L){return r1(L.reduce(function(a,b){return a+b},0)/L.length)}));rows.push(agg("Tertinggi",function(L){return Math.max.apply(null,L)}));rows.push(agg("Terendah",function(L){return Math.min.apply(null,L)}));rows.push(agg("Tuntas (%)",function(L){return Math.round(L.filter(function(v){return v>=K}).length/L.length*100)}));
 rows.push([]);rows.push([{v:"Keterangan kolom:",s:2}]);D.as.forEach(function(t){rows.push([{v:t._lbl+" = "+t.judul+" ("+KAT[t.kategori||"latihan"]+", "+fmtD(t.mulai)+")",s:2}])});
 rows.push([]);var nc=head.length;rows.push([{v:"Mengetahui,",s:0}].concat(new Array(Math.max(1,nc-4)).fill(""),[{v:"Guru Kelas / Mata Pelajaran",s:0}]));rows.push([{v:"Kepala Sekolah",s:0}]);rows.push([]);rows.push([]);rows.push([{v:S.kepsek||"(....................................)",s:8}].concat(new Array(Math.max(1,nc-4)).fill(""),[{v:DB_.kelas.guru||"(....................................)",s:8}]));rows.push([{v:S.nipks?"NIP. "+S.nipks:"",s:0}].concat(new Array(Math.max(1,nc-4)).fill(""),[{v:S.nipguru?"NIP. "+S.nipguru:"",s:0}]));
 return{rows:rows,hr:hr,nc:nc}}
function rkpXls(){var M=dModel(),D=rkpData(M);if(!D.as.length){info("Belum ada asesmen untuk direkap.");return}var R=rkpSheetRows(D),W=[5,7,24].concat(D.as.map(function(){return 8}),D.cats.map(function(){return 11}),[11,10,30]);
 var sheets=[{name:"Rekap Nilai",rows:R.rows,widths:W,freeze:R.hr+1,land:true}];
 var an=anSheet(D,"rapor","Nilai rapor (gabungan)");if(an)sheets.push(an);
 D.as.forEach(function(t){var a=anSheet(D,"t:"+t.id,t._lbl+" • "+t.judul,true);if(a)sheets.push(a)});
 xlBook(sheets,"rekap-nilai-"+DB_.kelas.kode+".xlsx");toast("⬇ File Excel rekap nilai diunduh",2500)}
function anSheet(D,src,lbl,short){var K=D.S.kktp,X=anVals(D,src),st=anStats(X,K);if(!st)return null;var rows=rkpHead(D.S,"ANALISIS NILAI • "+lbl);rows.push([]);
 rows.push([{v:"Statistik",s:3},{v:"Nilai",s:3}]);[["Peserta",st.n],["Rata-rata",st.mean],["Median",st.med],["Modus",st.mod],["Simpangan baku",st.sd],["Nilai tertinggi",st.hi],["Nilai terendah",st.lo],["Rentang",st.range],["Jumlah tuntas",st.tn],["Persentase tuntas",st.pt+"%"]].forEach(function(x){rows.push([{v:x[0],s:4},typeof x[1]==="number"?{v:x[1],s:5}:{v:String(x[1]),s:4}])});
 rows.push([{v:"Tertinggi diraih",s:4},{v:st.his.join(", "),s:4}]);rows.push([{v:"Terendah diraih",s:4},{v:st.los.join(", "),s:4}]);rows.push([]);
 var items=src.indexOf("t:")===0?anItems(D,+src.slice(2)):null;rows.push([{v:"Kesimpulan: "+anInterpret(st,K,items,lbl),s:10}]);rows.push([]);
 rows.push([{v:"Interval",s:3},{v:"Frekuensi",s:3},{v:"Persen",s:3}]);AN_BINS.forEach(function(b){var c=X.filter(function(x){return x.v>=b[1]&&x.v<=b[2]}).length;rows.push([{v:b[0],s:4},{v:c,s:5},{v:Math.round(c/st.n*100)+"%",s:4}])});rows.push([]);
 rows.push([{v:"Kategori capaian",s:3},{v:"Jumlah",s:3},{v:"Persen",s:3},{v:"Nama murid",s:3}]);anBands(K).forEach(function(b){var L=X.filter(function(x){return x.v>=b[1]&&x.v<=b[2]});rows.push([{v:b[0]+" ("+Math.round(b[1])+"–"+Math.floor(b[2])+")",s:4},{v:L.length,s:5},{v:Math.round(L.length/st.n*100)+"%",s:4},{v:L.map(function(x){return x.u.nama+" ("+x.v+")"}).join(", "),s:4}])});rows.push([]);
 var rem=X.filter(function(x){return x.v<K}).sort(function(a,b){return a.v-b.v});rows.push([{v:"Perlu remedial (< KKTP "+K+")",s:3},{v:"Nilai",s:3}]);(rem.length?rem:[{u:{nama:"Semua tuntas"},v:null}]).forEach(function(x){rows.push([{v:x.u.nama,s:4},x.v==null?{v:"",s:4}:{v:x.v,s:6}])});rows.push([]);
 if(items&&items.length){rows.push(["No","Soal","Jenis","Menjawab","P (kesukaran)","Tingkat","D (daya beda)","Kategori daya beda","Rekomendasi"].map(function(h){return{v:h,s:3}}));items.forEach(function(i,n){rows.push([{v:n+1,s:5},{v:String(i.q),s:4},{v:(TIPE[i.tipe]||"").replace(/^\S+\s/,""),s:4},{v:i.n,s:5},{v:i.P,s:5},{v:i.tk,s:4},{v:i.D,s:5},{v:i.db,s:4},{v:i.rek,s:4}])})}
 return{name:(short?"Analisis ":"Analisis ")+(src==="rapor"?"Rapor":lbl.split(" • ")[0]),rows:rows,widths:[26,44,14,11,14,12,14,18,26]}}
function anXls(){var M=dModel(),D=rkpData(M),src=RKP.an,o=anSources(D).filter(function(x){return x[0]===src})[0];if(!o){info("Belum ada data.");return}var a=anSheet(D,src,o[1]);if(!a){info("Belum ada nilai untuk data ini.");return}
 xlBook([a],"analisis-nilai-"+DB_.kelas.kode+".xlsx");toast("⬇ File Excel analisis diunduh",2500)}
/* ---------- PDF (cetak) ---------- */
var RPDF_CSS='*{box-sizing:border-box}body{font-family:Arial,Helvetica,sans-serif;color:#0f172a;margin:0;background:#e2e8f0;font-size:12px}.bar{position:sticky;top:0;background:#1e293b;color:#fff;padding:10px 16px;display:flex;justify-content:space-between;align-items:center;font-size:14px;z-index:2}.bar button{background:#22c55e;color:#fff;border:0;border-radius:8px;padding:9px 16px;font-weight:700;cursor:pointer;font-size:14px}.pg{background:#fff;margin:16px auto;padding:22px 26px;border-radius:6px;max-width:1080px}.kop{text-align:center;border-bottom:3px double #1e3a8a;padding-bottom:8px;margin-bottom:10px}.kop h1{font-size:18px;margin:0;color:#1e3a8a;letter-spacing:.5px}.kop h2{font-size:14px;margin:4px 0 0;font-weight:700}.idt{display:grid;grid-template-columns:repeat(3,1fr);gap:2px 16px;margin:8px 0 10px;font-size:12px}.idt b{display:inline-block;min-width:96px}table{width:100%;border-collapse:collapse;font-size:11px;margin:6px 0 10px}th,td{border:1px solid #94a3b8;padding:4px 5px;text-align:center}th{background:#1e3a8a;color:#fff}td.l{text-align:left}tr.s td{background:#eff6ff;font-weight:700}.no{color:#b91c1c;font-weight:700}.ok{color:#15803d;font-weight:700}.f{font-size:11px;color:#334155;margin:4px 0}.t{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin:8px 0}.t div{border:1px solid #cbd5e1;border-radius:6px;padding:6px 8px}.t b{display:block;font-size:17px;color:#1e3a8a}.t span{font-size:10px;color:#475569}.box{border:1px solid #cbd5e1;border-radius:6px;padding:8px 10px;margin:8px 0;background:#f8fafc}h3{font-size:13px;margin:12px 0 4px;color:#1e3a8a}.g2{display:grid;grid-template-columns:1fr 1fr;gap:12px}.ttd{display:flex;justify-content:space-between;margin-top:22px;font-size:12px}.ttd div{width:42%;text-align:center}.ttd .nm{margin-top:56px;font-weight:700;text-decoration:underline}svg text{font-family:Arial,sans-serif}@media print{body{background:#fff}.bar{display:none}.pg{margin:0;max-width:none;padding:0;border-radius:0}.brk{page-break-before:always}}';
function lightSvg(s){return s.replace(/fill="#fff"/g,'fill="#0f172a"').replace(/#a5b4fc/g,"#475569").replace(/#c7d2fe/g,"#334155").replace(/rgba\(255,255,255,\.12\)/g,"#e2e8f0")}
function rkpKop(S,title){var k=DB_.kelas;return'<div class="kop">'+(S.sekolah?'<h1>'+esc(S.sekolah.toUpperCase())+'</h1>':'')+'<h2>'+esc(title)+'</h2></div><div class="idt"><div><b>Kelas</b>: '+esc(k.nama)+'</div><div><b>Mata pelajaran</b>: '+esc(S.mapel||"-")+'</div><div><b>Semester</b>: '+esc(S.semester||"-")+'</div><div><b>Tahun ajaran</b>: '+esc(S.tahun||"-")+'</div><div><b>Guru</b>: '+esc(k.guru||"-")+'</div><div><b>KKTP</b>: '+S.kktp+'</div></div>'}
function rkpTtd(S){var tg=new Date().toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"});return'<div class="ttd"><div>Mengetahui,<br>Kepala Sekolah<div class="nm">'+esc(S.kepsek||"(..............................)")+'</div>'+(S.nipks?'NIP. '+esc(S.nipks):'')+'</div><div>........................, '+tg+'<br>Guru Kelas / Mata Pelajaran<div class="nm">'+esc(DB_.kelas.guru||"(..............................)")+'</div>'+(S.nipguru?'NIP. '+esc(S.nipguru):'')+'</div></div>'}
function rkpPdf(){var M=dModel(),D=rkpData(M),S=D.S,K=S.kktp;if(!D.as.length){info("Belum ada asesmen untuk direkap.");return}
 var c=function(v){return v==null?'<td>-</td>':'<td class="'+(v<K?"no":"")+'">'+nf(v)+'</td>'};
 var t='<table><tr><th>No</th><th>Absen</th><th>Nama</th>'+D.as.map(function(a){return'<th>'+esc(a._lbl)+'</th>'}).join("")+D.cats.map(function(x){return'<th>'+catLbl(x)+'</th>'}).join("")+'<th>Nilai Rapor</th><th>Rank</th><th>Ket.</th></tr>'+
  D.rows.map(function(r,i){return'<tr><td>'+(i+1)+'</td><td>'+r.u.absen+'</td><td class="l">'+esc(r.u.nama)+'</td>'+D.as.map(function(a){return c(r.v[a.id]?r.v[a.id].nilai:null)}).join("")+D.cats.map(function(x){return c(r.cat[x])}).join("")+'<td class="'+(r.na!=null&&r.na<K?"no":"ok")+'">'+nf(r.na)+'</td><td>'+(r.rank||"-")+'</td><td>'+(r.na==null?"-":r.na>=K?"Tuntas":"Belum")+'</td></tr>'}).join("");
 var agg=function(lbl,fn){var col=function(L){L=L.filter(function(v){return v!=null});return L.length?nf(fn(L)):"-"};return'<tr class="s"><td colspan="3" class="l">'+lbl+'</td>'+D.as.map(function(a){return'<td>'+col(D.rows.map(function(r){return r.v[a.id]?r.v[a.id].nilai:null}))+'</td>'}).join("")+D.cats.map(function(x){return'<td>'+col(D.rows.map(function(r){return r.cat[x]}))+'</td>'}).join("")+'<td>'+col(D.rows.map(function(r){return r.na}))+'</td><td colspan="2"></td></tr>'};
 t+=agg("Rata-rata",function(L){return r1(L.reduce(function(a,b){return a+b},0)/L.length)})+agg("Tertinggi",function(L){return Math.max.apply(null,L)})+agg("Terendah",function(L){return Math.min.apply(null,L)})+agg("Tuntas",function(L){return Math.round(L.filter(function(v){return v>=K}).length/L.length*100)+"%"})+'</table>';
 var html='<!doctype html><html lang="id"><head><meta charset="utf-8"><title>Rekap Nilai '+esc(DB_.kelas.nama)+'</title><style>'+RPDF_CSS+'@page{size:A4 landscape;margin:12mm}</style></head><body><div class="bar"><span>Rekap nilai asesmen</span><button onclick="window.print()">🖨 Cetak / Simpan PDF</button></div><div class="pg">'+rkpKop(S,"REKAP NILAI ASESMEN")+'<div class="f">Nilai rapor = '+esc(rkpFormula(D))+' • nilai yang dipakai: percobaan '+esc(S.aturan)+(S.nol?' • asesmen yang tidak diikuti dihitung 0':'')+'</div>'+t+'<div class="f"><b>Keterangan:</b> '+D.as.map(function(a){return'<b>'+esc(a._lbl)+'</b> = '+esc(a.judul)+' ('+fmtD(a.mulai)+')'}).join("; ")+'. Angka merah = di bawah KKTP.</div>'+rkpTtd(S)+'</div></body></html>';
 printDoc(html)}
function anPdf(){var M=dModel(),D=rkpData(M),S=D.S,K=S.kktp,src=RKP.an,o=anSources(D).filter(function(x){return x[0]===src})[0];if(!o){info("Belum ada data.");return}var X=anVals(D,src),st=anStats(X,K);if(!st){info("Belum ada nilai untuk data ini.");return}
 var items=src.indexOf("t:")===0?anItems(D,+src.slice(2)):null,bins=AN_BINS.map(function(b){var c=X.filter(function(x){return x.v>=b[1]&&x.v<=b[2]}).length;return{l:b[0],v:c,c:b[2]<K?"#f87171":"#4ade80"}});
 var h=rkpKop(S,"ANALISIS NILAI")+'<div class="f"><b>Data:</b> '+esc(o[1])+'</div><div class="t">'+[[st.n+" / "+D.rows.length,"Peserta"],[nf(st.mean),"Rata-rata"],[nf(st.med),"Median"],[st.mod,"Modus"],[nf(st.sd),"Simpangan baku"],[nf(st.hi),"Tertinggi ("+esc(st.his.slice(0,2).join(", "))+")"],[nf(st.lo),"Terendah ("+esc(st.los.slice(0,2).join(", "))+")"],[nf(st.range),"Rentang"],[st.tn,"Murid tuntas"],[st.pt+"%","Persentase tuntas"]].map(function(x){return'<div><b>'+x[0]+'</b><span>'+x[1]+'</span></div>'}).join("")+'</div>';
 h+='<div class="box"><b>Kesimpulan:</b> '+esc(anInterpret(st,K,items,o[1]))+'</div>';
 h+='<div class="g2"><div><h3>Distribusi frekuensi</h3>'+lightSvg(svgBars(bins.map(function(b){return{l:b.l,v:b.v,c:b.c}}),{w:480,h:210}))+'<table><tr><th>Interval</th><th>Frekuensi</th><th>Persen</th></tr>'+bins.map(function(b){return'<tr><td>'+b.l+'</td><td>'+b.v+'</td><td>'+Math.round(b.v/st.n*100)+'%</td></tr>'}).join("")+'</table></div><div><h3>Kategori capaian</h3><table><tr><th>Kategori</th><th>Jumlah</th><th>Nama murid</th></tr>'+anBands(K).map(function(b){var L=X.filter(function(x){return x.v>=b[1]&&x.v<=b[2]});return'<tr><td class="l">'+b[0]+'<br><small>'+Math.round(b[1])+'–'+Math.floor(b[2])+'</small></td><td>'+L.length+' ('+Math.round(L.length/st.n*100)+'%)</td><td class="l">'+esc(L.map(function(x){return x.u.nama+" ("+x.v+")"}).join(", ")||"-")+'</td></tr>'}).join("")+'</table>';
 var rem=X.filter(function(x){return x.v<K}).sort(function(a,b){return a.v-b.v});h+='<h3>Perlu remedial ('+rem.length+')</h3><div class="f">'+(rem.length?esc(rem.map(function(x){return x.u.nama+" ("+x.v+")"}).join(", ")):"Semua murid tuntas.")+'</div>';
 var enr=X.filter(function(x){return x.v>=90});h+='<h3>Pengayaan ('+enr.length+')</h3><div class="f">'+(enr.length?esc(enr.map(function(x){return x.u.nama+" ("+x.v+")"}).join(", ")):"-")+'</div></div></div>';
 if(D.as.length>1&&src==="rapor"){var per=D.as.map(function(t){var L=D.rows.map(function(r){return r.v[t.id]?r.v[t.id].nilai:null}).filter(function(v){return v!=null});return{t:t,L:L}}).filter(function(x){return x.L.length});
  h+='<h3>Perbandingan antar asesmen</h3>'+lightSvg(svgBars(per.map(function(x){var a=x.L.reduce(function(p,q){return p+q},0)/x.L.length;return{l:x.t._lbl,v:Math.round(a),c:a>=K?"#4ade80":"#f87171"}}),{w:Math.max(520,per.length*80+60),h:220,max:100,kk:K}))}
 if(items&&items.length)h+='<div class="brk"></div><h3>Analisis butir soal</h3><table><tr><th>No</th><th>Soal</th><th>Jenis</th><th>n</th><th>P</th><th>Tingkat</th><th>D</th><th>Daya beda</th><th>Rekomendasi</th></tr>'+items.map(function(i,n){return'<tr><td>'+(n+1)+'</td><td class="l">'+esc(String(i.q).slice(0,160))+'</td><td>'+esc((TIPE[i.tipe]||"").replace(/^\S+\s/,""))+'</td><td>'+i.n+'</td><td>'+i.P.toFixed(2)+'</td><td>'+i.tk+'</td><td>'+i.D.toFixed(2)+'</td><td>'+i.db+'</td><td class="l">'+esc(i.rek)+'</td></tr>'}).join("")+'</table><div class="f">P &gt; 0,70 mudah; 0,30–0,70 sedang; &lt; 0,30 sukar. D ≥ 0,40 sangat baik; 0,30–0,39 baik; 0,20–0,29 cukup; &lt; 0,20 perlu revisi (kelompok atas/bawah 27%).</div>';
 h+=rkpTtd(S);
 printDoc('<!doctype html><html lang="id"><head><meta charset="utf-8"><title>Analisis Nilai '+esc(DB_.kelas.nama)+'</title><style>'+RPDF_CSS+'@page{size:A4;margin:12mm}</style></head><body><div class="bar"><span>Analisis nilai</span><button onclick="window.print()">🖨 Cetak / Simpan PDF</button></div><div class="pg">'+h+'</div></body></html>')}
var REM_LOW={nama:[],mapel:""},KUA_MU=null,KUA_V="mapel";
/* 🌟 Penguasaan per murid: dihitung dari jawaban TERAKHIR setiap murid untuk setiap soal */
function kuaData(M){var sel=dState.mapel,ms=M.pk.mapel.filter(function(m){return(!sel||m.id===sel)&&m.soal.length}),keys={},last={};
 ms.forEach(function(m){m.soal.forEach(function(x){keys[m.id+"|"+skey(x)]={m:m,s:x}})});
 DF.jawaban.slice().sort(function(a,b){return a[8]-b[8]}).forEach(function(j){var k=j[1]+"|"+j[2];if(!keys[k])return;last[j[0]+"#"+k]=j[6]?1:0});
 var rows=M.murid.slice().sort(function(a,b){return(a.absen||0)-(b.absen||0)}).map(function(u){var per={},tot={ok:0,ul:0,n:0},wr=[];
  ms.forEach(function(m){var r={ok:0,ul:0,n:m.soal.length};m.soal.forEach(function(x){var k=m.id+"|"+skey(x),v=last[u.id+"#"+k];if(v===1)r.ok++;else if(v===0){r.ul++;wr.push(keys[k])}});per[m.id]=r;if(r.ok+r.ul){tot.ok+=r.ok;tot.ul+=r.ul;tot.n+=r.n}});
  return{u:u,per:per,tot:tot,wr:wr,pct:tot.n?Math.round(tot.ok/tot.n*100):0,tried:tot.ok+tot.ul>0}});
 var hard={};rows.forEach(function(r){r.wr.forEach(function(x){var k=x.m.id+"|"+skey(x.s);(hard[k]=hard[k]||{x:x,n:0,who:[]}).n++;hard[k].who.push(r.u.nama)})});
 return{ms:ms,rows:rows,hard:Object.keys(hard).map(function(k){return hard[k]}).sort(function(a,b){return b.n-a.n})}}
function kuaTp(M,D){var T={},L=[];D.ms.forEach(function(m){m.soal.forEach(function(x){var t=x.tp&&String(x.tp).trim();if(!t)return;var id=m.id+"|"+t;if(!T[id]){T[id]={id:id,tp:t,m:m,keys:{}};L.push(T[id])}T[id].keys[m.id+"|"+skey(x)]=1})});
 var last={};DF.jawaban.slice().sort(function(a,b){return a[8]-b[8]}).forEach(function(j){last[j[0]+"#"+j[1]+"|"+j[2]]=j[6]?1:0});
 D.rows.forEach(function(r){r.tp={};L.forEach(function(t){var o={ok:0,ul:0,n:0};Object.keys(t.keys).forEach(function(k){o.n++;var v=last[r.u.id+"#"+k];if(v===1)o.ok++;else if(v===0)o.ul++});r.tp[t.id]=o})});return L}
function kuaDesc(r,L,K,multi){var ok=[],bb=[];L.forEach(function(t){var o=r.tp[t.id];if(!o||!(o.ok+o.ul))return;var nm=t.tp.charAt(0).toLowerCase()+t.tp.slice(1)+(multi?" ("+t.m.nama+")":"");if(o.ok/o.n*100>=K)ok.push(nm);else bb.push(nm)});
 if(!ok.length&&!bb.length)return"";var j=function(a){return a.length>1?a.slice(0,-1).join(", ")+" dan "+a[a.length-1]:a[0]};
 return"Ananda "+r.u.nama+(ok.length?" sudah menguasai "+j(ok):"")+(ok.length&&bb.length?", dan ":"")+(bb.length?(ok.length?"perlu bimbingan dalam ":" perlu bimbingan dalam ")+j(bb):"")+"."}
function kuasaTab(M){var K=dState.kktp,D=kuaData(M),h='<div class="mut" style="font-size:13px">🌟 <b>Dikuasai</b> = jawaban terakhir murid untuk soal itu benar. <b>Perlu diulang</b> = jawaban terakhirnya salah. Kolom Total hanya menghitung mapel yang sudah dilatih. Dihitung dari latihan di gedung, Mode Seru, dan tantangan. Di HP murid, soal yang salah otomatis muncul lagi lewat 🔁 Latihan Ulang.</div>';
 if(!D.ms.length)return h+'<div class="note">Belum ada mapel dengan soal.</div>';
 var TL=kuaTp(M,D);h+='<div class="row" style="align-items:center;margin-top:8px"><b>Tampilan:</b><button class="btn sm'+(KUA_V==="mapel"?" yel":" gray")+'" data-dact="kuav" data-v="mapel">📚 Per mapel</button><button class="btn sm'+(KUA_V==="tp"?" yel":" gray")+'" data-dact="kuav" data-v="tp">🎯 Per TP &amp; deskripsi rapor</button><button class="btn sm'+(KUA_V==="dtk"?" yel":" gray")+'" data-dact="kuav" data-v="dtk">📖 Membaca (Detektif)</button><button class="btn sm'+(KUA_V==="psr"?" yel":" gray")+'" data-dact="kuav" data-v="psr">🏪 Berhitung (Pasar)</button></div>';
 if(KUA_V==="dtk")return h+kuaDtkHTML(M,D,K);
 if(KUA_V==="psr")return h+kuaPsrHTML(M,D,K);
 var tr=D.rows.filter(function(r){return r.tried});if(!tr.length)return h+'<div class="note">Belum ada jawaban murid. Setelah murid berlatih, peta penguasaan muncul di sini.</div>';
 if(KUA_V==="tp")return h+kuaTpHTML(M,D,TL,K);
 var avgP=Math.round(tr.reduce(function(a,r){return a+r.pct},0)/tr.length),tun=tr.filter(function(r){return r.pct>=K}),ul=tr.reduce(function(a,r){return a+r.tot.ul},0);
 h+='<div class="tiles" style="margin-top:8px">'+[[avgP+"%","Rata-rata penguasaan"],[tun.length+" / "+tr.length,"Murid menguasai ≥ "+K+"%"],[ul,"Soal perlu diulang (total)"],[D.rows.length-tr.length,"Belum berlatih"]].map(function(x){return'<div class="tile"><b>'+x[0]+'</b><span>'+x[1]+'</span></div>'}).join("")+'</div>';
 var col=function(r){if(!r||!(r.ok+r.ul))return'<td class="mut" style="text-align:center">—</td>';var p=Math.round(r.ok/r.n*100),c=p>=K?"#16a34a":p>=50?"#ca8a04":"#dc2626";return'<td style="text-align:center"><b style="display:inline-block;min-width:44px;padding:2px 6px;border-radius:8px;background:'+c+';color:#fff">'+p+'%</b>'+(r.ul?'<div class="mut" style="font-size:11px">🔁 '+r.ul+'</div>':'')+'</td>'};
 h+='<div class="tbl-wrap" style="margin-top:10px"><table class="dt"><tr><th>Abs</th><th>Murid</th>'+D.ms.map(function(m){return'<th>'+esc(m.nama)+'</th>'}).join("")+'<th>Total</th><th></th></tr>'+
  D.rows.map(function(r){return'<tr><td>'+esc(r.u.absen)+'</td><td><b>'+esc(r.u.nama)+'</b></td>'+D.ms.map(function(m){return col(r.per[m.id])}).join("")+col({ok:r.tot.ok,ul:r.tot.ul,n:r.tot.n})+'<td>'+(r.wr.length?'<button class="btn sm gray" data-dact="kuamu" data-v="'+r.u.id+'">Lihat</button>':'')+'</td></tr>'}).join("")+'</table></div>';
 if(KUA_MU!=null){var R=D.rows.filter(function(r){return r.u.id===KUA_MU})[0];if(R)h+='<div class="rec"><h4>🔁 Soal yang perlu diulang: '+esc(R.u.nama)+' ('+R.wr.length+')</h4><ol style="margin:0;padding-left:20px">'+R.wr.slice(0,30).map(function(x){return'<li>'+esc(String(x.s.q).slice(0,160))+' <span class="mut">• '+esc(x.m.nama)+' • kunci: '+esc(String(keyText(x.s)).slice(0,60))+'</span></li>'}).join("")+'</ol></div>'}
 var low=tr.filter(function(r){return r.pct<K});REM_LOW={nama:low.map(function(r){return r.u.nama}),mapel:dState.mapel?mapName(M,dState.mapel):""};
 h+='<div class="rec"><h4>🤝 Belum menguasai ('+low.length+')</h4>'+(low.length?low.map(function(r){return esc(r.u.nama)+" ("+r.pct+"%)"}).join(", ")+'<div class="row"><button class="btn sm green" data-dact="remwa">📤 Kirim ajakan latihan ulang (WA)</button></div>':'Semua murid yang sudah berlatih menguasai ≥ '+K+'% soal. 🎉')+'</div>';
 var hd=D.hard.slice(0,8);h+='<div class="rec"><h4>📚 Soal yang paling banyak belum dikuasai</h4>'+(hd.length?'<ol style="margin:0;padding-left:20px">'+hd.map(function(x){return'<li>'+esc(String(x.x.s.q).slice(0,160))+' <span class="mut">• '+x.n+' murid: '+esc(x.who.slice(0,6).join(", "))+(x.who.length>6?", …":"")+'</span></li>'}).join("")+'</ol><span class="mut">Saran: bahas soal-soal ini bersama di kelas sebelum murid mengulang.</span>':'Belum ada.')+'</div>';
 return h}
function kuaTpHTML(M,D,L,K){var h="";if(!L.length)return h+'<div class="note">Soal belum diberi label <b>🎯 TP</b>. Isi kolom TP di setiap soal (Editor Soal), atau buat soal lewat 🤖 AI / 📥 Impor yang sekarang otomatis mengisi TP. Setelah disimpan dan dikirim ke kelas, penguasaan per TP muncul di sini.</div>';
 var L0=L.length;L=L.filter(function(t){return D.rows.some(function(r){var o=r.tp[t.id];return o&&o.ok+o.ul})});if(!L.length)return h+'<div class="note">Ada '+L0+' TP di soal, tetapi belum ada murid yang menjawab soal ber-TP. Setelah murid berlatih, penguasaan per TP muncul di sini.</div>';
 var mm={};L.forEach(function(t){mm[t.m.id]=1});var multi=Object.keys(mm).length>1,tr=D.rows.filter(function(r){return r.tried});
 var bars=L.map(function(t){var ps=tr.map(function(r){var o=r.tp[t.id];return o&&o.ok+o.ul?o.ok/o.n*100:null}).filter(function(v){return v!=null});var a=ps.length?Math.round(ps.reduce(function(x,y){return x+y},0)/ps.length):0;t.avg=a;t.np=ps.length;return{l:(multi?t.m.nama.slice(0,10)+": ":"")+t.tp.slice(0,22),v:a,c:a>=K?"#4ade80":"#f87171",t:t.tp}});
 h+='<div class="scard" style="margin-top:8px"><div class="sh"><span>🎯 Penguasaan kelas per TP</span><small class="mut">rata-rata murid yang sudah berlatih</small></div>'+svgBars(bars,{w:Math.max(520,bars.length*90+60),h:230,max:100,kk:K,label:"Penguasaan per TP"})+'</div>';
 var weak=L.filter(function(t){return t.np&&t.avg<K}).sort(function(a,b){return a.avg-b.avg});
 h+='<div class="rec"><h4>🧭 TP yang perlu diperkuat</h4>'+(weak.length?weak.map(function(t){return esc((multi?t.m.nama+": ":"")+t.tp)+' <span class="mut">('+t.avg+'%)</span>'}).join(", ")+'<br><span class="mut">Saran: ajarkan ulang TP ini bersama di kelas, lalu minta murid berlatih di gedung terkait.</span>':'Semua TP sudah dikuasai rata-rata kelas ≥ '+K+'%. 🎉')+'</div>';
 var col=function(o){if(!o||!(o.ok+o.ul))return'<td class="mut" style="text-align:center">—</td>';var p=Math.round(o.ok/o.n*100),c=p>=K?"#16a34a":p>=50?"#ca8a04":"#dc2626";return'<td style="text-align:center"><b style="display:inline-block;min-width:44px;padding:2px 6px;border-radius:8px;background:'+c+';color:#fff">'+p+'%</b></td>'};
 h+='<div class="tbl-wrap" style="margin-top:10px"><table class="dt"><tr><th>Abs</th><th>Murid</th>'+L.map(function(t){return'<th title="'+esc(t.m.nama)+'">'+esc((multi?t.m.nama.slice(0,8)+": ":"")+t.tp)+'</th>'}).join("")+'</tr>'+D.rows.map(function(r){return'<tr><td>'+esc(r.u.absen)+'</td><td><b>'+esc(r.u.nama)+'</b></td>'+L.map(function(t){return col(r.tp[t.id])}).join("")+'</tr>'}).join("")+'</table></div>';
 var ds=D.rows.map(function(r){return{r:r,d:kuaDesc(r,L,K,multi)}}).filter(function(x){return x.d});KUA_DESC=ds;
 h+='<div class="rec"><h4>📝 Deskripsi capaian (draf rapor)</h4><div class="mut" style="font-size:12px">Disusun otomatis dari penguasaan per TP (batas tuntas '+K+'%). Silakan sesuaikan sebelum ditulis di rapor.</div>'+(ds.length?'<div class="row"><button class="btn sm yel" data-dact="kuacopy">📋 Salin semua deskripsi</button><button class="btn sm green" data-dact="kuaxls">⬇ Unduh Excel</button></div><ol style="margin:6px 0 0;padding-left:20px">'+ds.map(function(x){return'<li style="margin-bottom:4px">'+esc(x.d)+'</li>'}).join("")+'</ol>':'<div>Belum ada murid yang berlatih pada soal ber-TP.</div>')+'</div>';
 return h}
var KUA_DESC=[];
function kuaPsrHTML(M,D,K){var ag={},sk={},lvs={};DF.jawaban.forEach(function(j){var mp=String(j[1]);if(mp.indexOf("_psr:")!==0)return;var m=String(j[2]).match(/^p\d+_([a-z]+)$/);if(!m||!PSR_SKILL[m[1]])return;var u=j[0],k=m[1];
  var a=(ag[u]=ag[u]||{}),o=a[k]||(a[k]={b:0,n:0});o.n++;if(j[6])o.b++;var t=sk[k]||(sk[k]={b:0,n:0});t.n++;if(j[6])t.b++;(lvs[u]=lvs[u]||{})[mp.slice(5)]=1});
 var keys=Object.keys(PSR_SKILL).filter(function(k){return sk[k]}),h='<div class="mut" style="font-size:13px;margin-top:8px">🏪 Keterampilan berhitung dari mode <b>Pasar Nusantara</b> (latihan dan tantangan). Persentase = jawaban tepat dari semua pembeli yang dilayani.</div>';
 if(!keys.length)return h+'<div class="note">Belum ada murid yang bermain Pasar Nusantara. Minta murid membuka <b>▶ Main → 🏪 Pasar Nusantara</b> setelah masuk kelas, atau buat tantangan Pasar Nusantara.</div>';
 var bars=keys.map(function(k){var a=Math.round(sk[k].b/sk[k].n*100);return{l:PSR_SKILL[k],v:a,c:a>=K?"#4ade80":"#f87171",t:sk[k].b+"/"+sk[k].n}});
 h+='<div class="scard" style="margin-top:8px"><div class="sh"><span>🏪 Keterampilan berhitung kelas</span><small class="mut">% tepat</small></div>'+svgBars(bars,{w:Math.max(520,bars.length*100+60),h:230,max:100,kk:K,label:"Keterampilan berhitung"})+'</div>';
 var weak=keys.filter(function(k){return sk[k].b/sk[k].n*100<K}).sort(function(a,b){return sk[a].b/sk[a].n-sk[b].b/sk[b].n});
 h+='<div class="rec"><h4>🧭 Keterampilan yang perlu dilatih</h4>'+(weak.length?weak.map(function(k){return esc(PSR_SKILL[k])+' <span class="mut">('+Math.round(sk[k].b/sk[k].n*100)+'%)</span>'}).join(", ")+'<br><span class="mut">Saran: latih konsepnya bersama di kelas dengan benda nyata (uang mainan, timbangan, potongan kue), lalu minta murid bermain lagi.</span>':'Semua keterampilan rata-rata kelas ≥ '+K+'%. 🎉')+'</div>';
 var col=function(o){if(!o)return'<td class="mut" style="text-align:center">—</td>';var p=Math.round(o.b/o.n*100),c=p>=K?"#16a34a":p>=50?"#ca8a04":"#dc2626";return'<td style="text-align:center"><b style="display:inline-block;min-width:44px;padding:2px 6px;border-radius:8px;background:'+c+';color:#fff">'+p+'%</b><div class="mut" style="font-size:11px">'+o.b+'/'+o.n+'</div></td>'};
 h+='<div class="tbl-wrap" style="margin-top:10px"><table class="dt"><tr><th>Abs</th><th>Murid</th>'+keys.map(function(k){return'<th>'+esc(PSR_SKILL[k])+'</th>'}).join("")+'<th>Tingkat</th></tr>'+D.rows.map(function(r){var a=ag[r.u.id]||{};return'<tr><td>'+esc(r.u.absen)+'</td><td><b>'+esc(r.u.nama)+'</b></td>'+keys.map(function(k){return col(a[k])}).join("")+'<td class="mut" style="font-size:12px">'+Object.keys(lvs[r.u.id]||{}).map(function(x){return PSR_LV[x]?PSR_LV[x].nm:x}).join(", ")+'</td></tr>'}).join("")+'</table></div>';
 return h}
function kuaDtkHTML(M,D,K){var ag={},win={},sk={};DF.jawaban.forEach(function(j){var mp=String(j[1]);if(mp.indexOf("_dtk:")!==0)return;var C=dtkFind(mp.slice(5));if(!C)return;var u=j[0];
  if(j[2]==="win"){(win[u]=win[u]||{})[C.id]=Math.max((win[u]||{})[C.id]||0,+j[7]||1);return}var m=String(j[2]).match(/^d(\d+)t(\d+)$/);if(!m)return;var L=C.petunjuk[+m[1]],q=L&&L.soal[+m[2]];if(!q)return;
  var a=(ag[u]=ag[u]||{}),o=a[q.skill]||(a[q.skill]={b:0,n:0});o.n++;if(j[6])o.b++;var t=sk[q.skill]||(sk[q.skill]={b:0,n:0});t.n++;if(j[6])t.b++});
 var keys=DTK_SK_KEYS.filter(function(k){return sk[k]});var h='<div class="mut" style="font-size:13px;margin-top:8px">📖 Keterampilan membaca dari mode <b>🕵️ Detektif Kota Ilmu</b> (kasus bawaan dan kasus buatan Anda). Persentase = jawaban benar dari semua percobaan.</div>';
 if(!keys.length)return h+'<div class="note">Belum ada murid yang memainkan Detektif. Minta murid membuka <b>▶ Main → 🕵️ Detektif Kota Ilmu</b> setelah masuk kelas. Buat kasus dari bacaan kelas Anda di Mode Guru → ⋯ Lainnya → 🕵️ Kasus Detektif.</div>';
 var bars=keys.map(function(k){var a=Math.round(sk[k].b/sk[k].n*100);return{l:DTK_SKILL[k],v:a,c:a>=K?"#4ade80":"#f87171",t:sk[k].b+"/"+sk[k].n}});
 h+='<div class="scard" style="margin-top:8px"><div class="sh"><span>📖 Keterampilan membaca kelas</span><small class="mut">% jawaban benar</small></div>'+svgBars(bars,{w:Math.max(520,bars.length*100+60),h:230,max:100,kk:K,label:"Keterampilan membaca"})+'</div>';
 var weak=keys.filter(function(k){return sk[k].b/sk[k].n*100<K}).sort(function(a,b){return sk[a].b/sk[a].n-sk[b].b/sk[b].n});
 h+='<div class="rec"><h4>🧭 Keterampilan yang perlu dilatih</h4>'+(weak.length?weak.map(function(k){return esc(DTK_SKILL[k])+' <span class="mut">('+Math.round(sk[k].b/sk[k].n*100)+'%)</span>'}).join(", ")+'<br><span class="mut">Saran: buat kasus Detektif baru dengan lebih banyak soal jenis ini, atau bahas strateginya bersama di kelas.</span>':'Semua keterampilan rata-rata kelas ≥ '+K+'%. 🎉')+'</div>';
 var col=function(o){if(!o)return'<td class="mut" style="text-align:center">—</td>';var p=Math.round(o.b/o.n*100),c=p>=K?"#16a34a":p>=50?"#ca8a04":"#dc2626";return'<td style="text-align:center"><b style="display:inline-block;min-width:44px;padding:2px 6px;border-radius:8px;background:'+c+';color:#fff">'+p+'%</b><div class="mut" style="font-size:11px">'+o.b+'/'+o.n+'</div></td>'};
 h+='<div class="tbl-wrap" style="margin-top:10px"><table class="dt"><tr><th>Abs</th><th>Murid</th>'+keys.map(function(k){return'<th>'+esc(DTK_SKILL[k])+'</th>'}).join("")+'<th>Kasus selesai</th></tr>'+D.rows.map(function(r){var a=ag[r.u.id]||{},w=win[r.u.id]||{},wk=Object.keys(w);return'<tr><td>'+esc(r.u.absen)+'</td><td><b>'+esc(r.u.nama)+'</b></td>'+keys.map(function(k){return col(a[k])}).join("")+'<td style="text-align:center">'+(wk.length?wk.length+' <span class="mut" style="font-size:11px">'+wk.map(function(id){return"⭐".repeat(w[id])}).join(" ")+'</span>':'<span class="mut">—</span>')+'</td></tr>'}).join("")+'</table></div>';
 return h}
function rkpAct(a,b){
 if(a==="kuav"){KUA_V=b.dataset.v;renderDash();return true}
 if(a==="kuacopy"){copyText(KUA_DESC.map(function(x){return x.r.u.absen+". "+x.d}).join("\n"));toast("📋 Deskripsi capaian tersalin",2000);return true}
 if(a==="kuaxls"){xlBook([{name:"Deskripsi",widths:[6,26,110],freeze:1,tab:true,rows:[[{v:"Absen",s:1},{v:"Nama",s:1},{v:"Deskripsi capaian",s:1}]].concat(KUA_DESC.map(function(x){return[x.r.u.absen,x.r.u.nama,x.d]}))}],"deskripsi-capaian-"+DB_.kelas.kode+".xlsx");return true}
 if(a==="kuamu"){var v=+b.dataset.v;KUA_MU=KUA_MU===v?null:v;renderDash();return true}
 if(a==="remwa"){var L=REM_LOW.nama;if(!L.length)return true;var lk=location.origin+location.pathname.replace(/index\.html$/,"")+"#k="+dState.kode;
  window.open("https://wa.me/?text="+encodeURIComponent("📚 *Latihan ulang ZuperVerse*\nUntuk: "+L.join(", ")+(REM_LOW.mapel?"\nMapel: "+REM_LOW.mapel:"")+"\n\nAyo perbaiki nilaimu! Caranya:\n1. Buka "+lk+"\n2. Masuk gedung "+(REM_LOW.mapel||"mapel")+" dan kerjakan lagi soalnya.\n3. Tekan ▶ Main → 🔁 *Ulangi sekarang* setiap hari. Soal yang salah akan muncul lagi sampai kamu benar-benar paham. 💪"),"_blank");return true}
 if(a==="rkpset"){RKP.set=!RKP.set;renderDash();return true}
 if(a==="rkpsave"){rkpSave();return true}
 if(a==="rkpxls"){rkpXls();return true}
 if(a==="rkppdf"){rkpPdf();return true}
 if(a==="anxls"){anXls();return true}
 if(a==="anpdf"){anPdf();return true}
 if(a==="rkptan"){dState.tab="tan";dState.tf={tKat:"harian"};renderDash();var f=$("tForm");if(f)f.open=true;return true}
 return false}

function tanAct(a,b){var id=+b.dataset.tid,t=(DB_.tantangan||[]).filter(function(x){return x.id===id})[0];
 if(a==="tsave"){tanSave();return true}
 if(a==="mpall"||a==="mpnone"){var MM=dModel(),bt=$("tJenis")&&$("tJenis").value==="petualangan",r0={};if(a==="mpall")MM.pk.mapel.forEach(function(m){r0[m.id]=bt?1:Math.min(5,m.soal.length)});dState.tf=dState.tf||{};dState.tf.tMp=r0;renderDash();return true}
 if(a==="tklink"&&t){copyText(mainLink(t.kode_main));toast("📋 Link kode main tersalin",2000);return true}
 if(a==="tkwa"&&t){window.open("https://wa.me/?text="+encodeURIComponent("🎮 Ayo main \""+t.judul+"\" di ZuperVerse!\nKode main: *"+String(t.kode_main).replace(/(\d{3})(\d{3})/,"$1 $2")+"*\n\nKlik link ini dan kamu langsung masuk lobi:\n"+mainLink(t.kode_main)),"_blank");return true}
 if(a==="tkshow"&&t){kodeShow(t);return true}
 if(a==="tmode"){dState.tedit=null;dState.tf=Object.assign({mode:b.dataset.m},TMODE[b.dataset.m].tf);renderDash();var fm=$("tForm");if(fm&&fm.scrollIntoView)fm.scrollIntoView({block:"start"});return true}
 if(a==="tcancel"){dState.tedit=null;dState.tf=null;renderDash();return true}
 if(a==="topen"){dState.topen=dState.topen===id?null:id;renderDash();return true}
 if(a==="tedit"){dState.tedit=id;dState.tf=null;renderDash();var f=$("tForm");if(f)f.scrollIntoView&&f.scrollIntoView({block:"start"});return true}
 if(a==="tcsv"&&t){tanCsv(t);return true}
 if((a==="tgo"||a==="tend"||a==="tulang")&&t){var aksi=a==="tgo"?"mulai":a==="tend"?"akhiri":"ulang",run=function(){api("/tantangan/go",{lic:licBody(),kode:dState.kode,pin:dState.pin,id:t.id,aksi:aksi}).then(function(){if(aksi!=="ulang")lvSendGo(t.id,aksi);toast(aksi==="mulai"?"▶ Tantangan dimulai! Semua murid di ruang tunggu mulai bersamaan.":aksi==="akhiri"?"⏹ Tantangan diakhiri. Jawaban murid dikirim otomatis.":"↺ Tantangan disiapkan ulang.",4500);return loadDash(false)},function(e){info(e.message)})};
  if(aksi==="mulai"){var n=lvSiap(t.id);ask((n?n+" murid sudah di ruang tunggu.":"Belum ada murid di ruang tunggu.")+" Murid lain tetap bisa masuk setelah dimulai, tetapi sisa waktunya mengikuti waktu bersama.",run,{ic:"▶️",t:"Mulai \""+t.judul+"\" sekarang?",ok:"▶ Mulai"})}
  else if(aksi==="akhiri")ask("Semua murid yang sedang mengerjakan langsung mengirim jawabannya.",run,{ic:"⏹",t:"Akhiri tantangan sekarang?",ok:"Akhiri",danger:true});else run();return true}
 if(a==="ttoggle"&&t){var o={jenis:t.jenis||"ujian",target:t.target||null,serentak:!!t.serentak,id:t.id,judul:t.judul,mapel:t.mapel,mapel_nama:t.mapel_nama,jumlah:t.jumlah,menit:t.menit,mulai:t.mulai,selesai:t.selesai,acak:!!t.acak,sekali:!!t.sekali,hasil:hasLvl(t.hasil),aktif:!t.aktif,kategori:t.kategori||"latihan",bobot:t.bobot?tanBobot(t):null,peta:t.peta||"",mapels:tanMapels(t)};
  api("/tantangan/simpan",{lic:licBody(),kode:dState.kode,pin:dState.pin,t:o}).then(function(){return loadDash(false)},function(e){info(e.message)});return true}
 if(a==="tdel"&&t){ask("Nilai murid tetap tersimpan sebagai latihan biasa.",function(){api("/tantangan/hapus",{lic:licBody(),kode:dState.kode,pin:dState.pin,id:id}).then(function(){return loadDash(false)},function(e){info(e.message)})},{t:"Hapus tantangan \""+t.judul+"\"?",ok:"Hapus",danger:true});return true}
 if(a==="print"){printRapor([+b.dataset.mid]);return true}
 if(a==="certprint"){certPrint();return true}
 if(a==="rkcsv"){rkCsv();return true}
 if(a==="rkprint"){rkPrint();return true}
 if(a==="lvann"){var tx=$("lvAnn").value.trim();if(!tx){toast("Tulis pengumuman dulu");return true}if(!LV.on){toast("Belum terhubung ke server main bersama");return true}try{LV.ws.send(JSON.stringify({t:"ann",text:tx}))}catch(e){}$("lvAnn").value="";return true}
 if(a==="lvplay"){startGuruPlay();return true}
 if(a==="mdelsel"){var ids=Object.keys(dState.msel||{}).map(Number).filter(function(id){return DB_.murid.some(function(u){return u.id===id})});if(!ids.length)return true;var nm=DB_.murid.filter(function(u){return ids.indexOf(u.id)>=0}).map(function(u){return u.absen+". "+u.nama});
  ask(ids.length+" murid beserta semua nilainya akan dihapus: "+nm.slice(0,8).join(", ")+(nm.length>8?", dan "+(nm.length-8)+" lainnya":"")+". Mereka bisa masuk lagi dengan nomor absen yang sama. Ini tidak bisa dibatalkan.",function(){api("/murid/hapus",{lic:licBody(),kode:dState.kode,pin:dState.pin,ids:ids}).then(function(){dState.msel={};toast("🗑 "+ids.length+" murid dihapus",3000);return loadDash(false)},function(er){info(er.message)})},{t:"Hapus "+ids.length+" murid?",ok:"Hapus",danger:true});return true}
 if(a==="tkoreksi"&&t){tanKoreksiGo(t);return true}
 if(a==="pdpadd"){var nm=($("pdpNama").value||"").trim();if(!nm){toast("Isi nama guru pendamping dulu");return true}api("/pendamping/buat",{lic:licBody(),kode:dState.kode,pin:dState.pin,nama:nm}).then(function(){toast("✔ Undangan untuk "+nm+" dibuat. Kirim link-nya lewat WA.",3500);return loadDash(false)},function(er){info(er.message)});return true}
 if(a==="pdpcopy"){var ln=b.dataset.ln;try{navigator.clipboard.writeText(ln).then(function(){toast("📋 Link disalin")},function(){prompt("Salin link ini:",ln)})}catch(e){prompt("Salin link ini:",ln)}return true}
 if(a==="pdpwa"){window.open("https://wa.me/?text="+encodeURIComponent("Halo "+b.dataset.nm+", Anda diundang menjadi *guru pendamping* kelas *"+(DB_.kelas.nama)+"* di ZuperVerse.\n\nBuka link ini di HP/laptop Anda (hanya bisa dipakai di satu perangkat):\n"+b.dataset.ln),"_blank");return true}
 if(a==="pdpdel"){var pid=+b.dataset.pid,pn=b.dataset.nm;ask(pn+" tidak bisa lagi membuka dashboard kelas ini. Anda bisa mengundangnya lagi kapan saja.",function(){api("/pendamping/cabut",{lic:licBody(),kode:dState.kode,pin:dState.pin,id:pid}).then(function(){toast("Akses "+pn+" dicabut");return loadDash(false)},function(er){info(er.message)})},{ic:"👥",t:"Cabut akses "+pn+"?",ok:"Cabut",danger:true});return true}
 if(a==="mkick"){mKick(+b.dataset.mid);return true}
 if(a==="munkick"){var uu=(DB_.blok||[]).filter(function(x){return x.id===+b.dataset.mid})[0];api("/murid/blokir",{lic:licBody(),kode:dState.kode,pin:dState.pin,id:+b.dataset.mid,on:false}).then(function(){toast("↩ "+(uu?uu.nama:"Murid")+" dipulihkan dan bisa masuk lagi",3000);return loadDash(false)},function(er){info(er.message)});return true}
 if(a==="kkunci"){var on=b.dataset.on==="1";api("/kelas/kunci",{lic:licBody(),kode:dState.kode,pin:dState.pin,on:on}).then(function(){toast(on?"🔒 Kelas dikunci. Murid baru tidak bisa masuk.":"🔓 Kelas dibuka untuk murid baru.",3500);return loadDash(false)},function(er){info(er.message)});return true}
 if(a==="trank"){var tr=(DB_.tantangan||[]).filter(function(x){return x.id===+b.dataset.tid})[0];if(!tr)return true;var go=function(){LV.fixed=tr.id;var el2=$("lvBig");el2.classList.add("show");lvBigRender();try{(el2.requestFullscreen||el2.webkitRequestFullscreen).call(el2)}catch(e){}};
  if(!tr.hasil&&tr.jenis!=="petualangan")zDlg({ic:"🏆",t:"Tampilkan papan peringkat?",m:"Nilai tantangan ini disembunyikan dari murid. Bila ditayangkan di proyektor, semua murid akan melihat nilai dan peringkat. Tetap tampilkan?",ok:"Ya, tampilkan",no:"Batal",cb:function(v){if(v)go()}});else go();return true}
 if(a==="lvbig"){LV.fixed=null;var el=$("lvBig");el.classList.add("show");lvBigRender();clearInterval(LV.bigT);LV.bigT=setInterval(function(){if(!$("lvBig").classList.contains("show")){clearInterval(LV.bigT);return}if(!LV.fixed)loadDash(false,true).then(function(){lvBigRender()},function(){})},20000);try{(el.requestFullscreen||el.webkitRequestFullscreen).call(el)}catch(e){}return true}
 return false}
$("dBody").addEventListener("change",function(e){var el=e.target;if(el.id==="rkBasis"){RK.basis=el.value;renderDash();return}if(el.id==="anSrc"){RKP.an=el.value;renderDash();return}if(el.id==="tJenis"){dState.tf=dState.tf||{};dState.tf.tJenis=el.value;renderDash();var f=$("tForm");if(f)f.open=true;return}
 if(el.id==="tKat"){var kv=el.value,set=function(id,v){var x=$(id);if(x){x.checked=v;dState.tf=dState.tf||{};dState.tf[id]=v}};dState.tf=dState.tf||{};dState.tf.tKat=kv;if(kv!=="latihan"){set("tSekali",true);set("tAcak",true)}if(kv==="sts"||kv==="sas"){var xh=$("tHasil");if(xh)xh.value="0";dState.tf.tHasil="0";set("tSerentak",true)}var jj=$("tJudul");if(jj&&!jj.value.trim()){jj.value=kv==="sts"?"Sumatif Tengah Semester":kv==="sas"?"Sumatif Akhir Semester":kv==="harian"?"Asesmen Harian ":"";dState.tf.tJudul=jj.value}}if(dState.tab!=="cert")return;
 if(el.id==="cJenis"){CERT.jenis=el.value;CERT.sel=null;renderDash();return}if(el.id==="cTan"){CERT.f.tan=+el.value;CERT.sel=null;renderDash();return}
 if(el.id==="cAll"){certCand(dModel()).forEach(function(c){CERT.sel[c.u.id]=el.checked?1:0});renderDash();return}
 if(el.dataset.csel){CERT.sel[+el.dataset.csel]=el.checked?1:0;var b=$("dBody").querySelector('[data-dact="certprint"]');if(b)b.textContent="🖨 Cetak sertifikat ("+Object.keys(CERT.sel).filter(function(k){return CERT.sel[k]}).length+")"}});
$("dBody").addEventListener("input",function(e){var el=e.target;if(el.dataset&&el.dataset.mpn!=null){dState.tf=dState.tf||{};var r2=mpCur();if(r2[el.dataset.mpn]==null)return;r2[el.dataset.mpn]=Math.max(1,Math.min(+el.max||100,+el.value||1));dState.tf.tMp=r2;var tt=0;Object.keys(r2).forEach(function(k){tt+=+r2[k]||0});var te=$("mpTot");if(te)te.textContent=tt;return}if(dState.tab==="cert"){var mp={cTempat:"tempat",cTtd:"ttd",cJab:"jab",cKs:"ks"}[el.id];if(mp){CERT.f[mp]=el.value;return}}if(!el.id||!/^t[A-Z]/.test(el.id))return;dState.tf=dState.tf||{};dState.tf[el.id]=el.type==="checkbox"?el.checked:el.value});
$("dBody").addEventListener("change",function(e){var el=e.target;if(el.dataset&&el.dataset.mp!=null){dState.tf=dState.tf||{};var r1=mpCur(),MM=dModel(),mm1=MM.pk.mapel.filter(function(x){return x.id===el.dataset.mp})[0];if(el.checked)r1[el.dataset.mp]=$("tJenis")&&$("tJenis").value==="petualangan"?1:Math.min(5,mm1?mm1.soal.length:5);else delete r1[el.dataset.mp];dState.tf.tMp=r1;renderDash();return}if(el.name==="tUrutR"){dState.tf=dState.tf||{};dState.tf.tUrut=el.dataset.urut;renderDash();return}if(el.name==="tStart"){dState.tf=dState.tf||{};dState.tf.tSerentak=el.id==="tSerentak";renderDash();return}if(!el.id||!/^t[A-Z]/.test(el.id))return;dState.tf=dState.tf||{};dState.tf[el.id]=el.type==="checkbox"?el.checked:el.value});
$("dDunia").onchange=function(){dState.dunia=this.value;renderDash()};
$("dPaket").onchange=function(){dState.paket=this.value;renderDash()};
$("dPer").onchange=function(){dState.per=+this.value||0;renderDash()};
$("dPrint").onclick=function(){if(!DB_)return;printRapor(DB_.murid.map(function(u){return u.id}))};

/* =================================================================
   SISTEM DUNIA & WILAYAH (Kota Ilmu, Angkasa: Orbit, Bulan, Mars)
   ================================================================= */
var ENVS={
 kota:{top:0x3d8fe0,bot:0xcfeaff,fog:0xcfeaff,near:110,far:330,hs:0xffffff,hg:0x7a9a6a,hi:.75,sc:0xfff4e0,si:.9,disc:0xfff6c8,stars:false},
 orbit:{top:0x02030c,bot:0x0d1640,fog:0x060a1e,near:200,far:800,hs:0xc7d4ff,hg:0x262a44,hi:.62,sc:0xffffff,si:1.15,disc:0xffffff,stars:true},
 bulan:{top:0x000000,bot:0x0b0b1a,fog:0x07070e,near:180,far:700,hs:0xdde1f2,hg:0x2c2c33,hi:.52,sc:0xffffff,si:1.2,disc:0xffffff,stars:true},
 mars:{top:0xb06238,bot:0xe9b088,fog:0xd8966a,near:70,far:290,hs:0xffd9bd,hg:0x6b2e1a,hi:.72,sc:0xffe2c4,si:.85,disc:0xfff0dd,stars:false}};
var stars=(function(){var n=1600,p=new Float32Array(n*3);for(var i=0;i<n;i++){var u=Math.random()*2-1,a=Math.random()*Math.PI*2,r=Math.sqrt(1-u*u);p[i*3]=Math.cos(a)*r*620;p[i*3+1]=Math.abs(u)*620*(Math.random()<.85?1:-1);p[i*3+2]=Math.sin(a)*r*620}
 var g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(p,3));var s=new THREE.Points(g,new THREE.PointsMaterial({color:0xffffff,size:2,sizeAttenuation:false,fog:false,transparent:true,opacity:.9}));s.visible=false;scene.add(s);return s})();
var KEEP=[sky,sunDisc,hemi,sun,sun.target,stars];
var CUR={w:"kota",z:"kota",env:"kota",g:30,jv:10.5,r:0,spawn:[0,0.3,-6]};
var floaters=[];
function setEnv(k){var e=ENVS[k];CUR.env=k;var u=sky.material.uniforms;u.top.value.setHex(e.top);u.bot.value.setHex(e.bot);scene.fog.color.setHex(e.fog);scene.background.setHex(e.fog);
 hemi.color.setHex(e.hs);hemi.groundColor.setHex(e.hg);hemi.intensity=e.hi;sun.color.setHex(e.sc);sun.intensity=e.si;sunDisc.material.color.setHex(e.disc);sunDisc.visible=!e.nodisc;stars.visible=e.stars}
function clearWorld(){var keepGeo=Object.keys(G).map(function(k){return G[k]});
 scene.children.slice().forEach(function(o){if(KEEP.indexOf(o)>=0||o===avatar)return;scene.remove(o);
  o.traverse(function(x){if(x.geometry&&keepGeo.indexOf(x.geometry)<0)x.geometry.dispose();var ms=x.material?(Array.isArray(x.material)?x.material:[x.material]):[];ms.forEach(function(m){if(m.map)m.map.dispose()})})});
 COL.length=0;CIRC.length=0;LOTCOL=[];LOTCIRC=[];INTER=[];animated.length=0;cars.length=0;npcs.length=0;books.length=0;clouds.length=0;drops.length=0;floaters.length=0;water=null;flag=null;schools=[];lotGroup=null;curInter=null}
var KOTA={nama:"Kota Ilmu",g:30,jv:10.5,r:0,bound:88,spawn:[0,0.3,-6],build:function(){setEnv("kota");buildGroundKota();buildRoads();buildBlocks();buildPlaza();buildNature();buildCars();buildNPCs(NPC_DEF);buildBooks(BOOK_POS,"buku");buildLots()}};
var ZONE_ORDER=["orbit","bulan","mars"];
var ZONES={
 orbit:{nama:"Stasiun Orbit",ic:"🛰️",desc:"Pusat dunia Angkasa. Bumi terlihat besar di bawah stasiun.",g:30,jv:10.5,r:40,bound:46,spawn:[0,0,-15],bg:"linear-gradient(135deg,#1e3a8a,#0b1026)",build:function(){buildOrbit()}},
 bulan:{nama:"Bulan",ic:"🌕",desc:"Gravitasi hanya sekitar 1/6 Bumi. Lompatanmu jadi sangat tinggi!",g:5,jv:8.5,r:66,bound:72,spawn:[0,0,-15],bg:"linear-gradient(135deg,#9ca3af,#111827)",build:function(){buildBulan()}},
 mars:{nama:"Mars",ic:"🔴",desc:"Planet merah dengan gurun berdebu dan kubah habitat.",g:11.4,jv:10,r:66,bound:72,spawn:[0,0,-15],bg:"linear-gradient(135deg,#ea580c,#7c2d12)",build:function(){buildMars()}}};
/* ---------- 🗺️ PETA PILIHAN GURU: dunia, wilayah, letak gedung, titik awal ---------- */
function PG(pk){var d=pk||data;return d&&d.pengaturan||{}}
function cleanPeta(p){if(!p||typeof p!=="object")return undefined;if(typeof WDEF==="undefined"||!WDEF||typeof ZONES==="undefined"||!ZONES){var r=JSON.parse(JSON.stringify(p));return Object.keys(r).length?r:undefined}var o={};if(p.bukaSemuaWilayah)o.bukaSemuaWilayah=true;if(p.bahasG==="kunci"||p.bahasG==="bs")o.bahasG=p.bahasG;
 if(Array.isArray(p.dunia)){var dw=p.dunia.filter(function(w){return WDEF[w]});if(dw.length<Object.keys(WDEF).length)o.dunia=dw}
 if(p.wilayah&&typeof p.wilayah==="object"){var wl={};Object.keys(p.wilayah).forEach(function(w){if(!WDEF[w]||!Array.isArray(p.wilayah[w]))return;var zs=p.wilayah[w].filter(function(z){return WDEF[w].zones.indexOf(z)>=0});if(zs.length&&zs.length<WDEF[w].zones.length)wl[w]=zs});if(Object.keys(wl).length)o.wilayah=wl}
 if(p.tempat&&typeof p.tempat==="object"){var tp={};Object.keys(p.tempat).forEach(function(w){if(!WDEF[w]||!p.tempat[w]||typeof p.tempat[w]!=="object")return;var m={};Object.keys(p.tempat[w]).forEach(function(id){var z=p.tempat[w][id];if(WDEF[w].zones.indexOf(z)>=0)m[String(id).slice(0,60)]=z});if(Object.keys(m).length)tp[w]=m});if(Object.keys(tp).length)o.tempat=tp}
 if(p.mulai&&ZONES[p.mulai])o.mulai=p.mulai;
 return Object.keys(o).length?o:undefined}
function worldAllowed(w,pk){var d=PG(pk).dunia;return w==="kota"||!d||d.indexOf(w)>=0}
function usedZones(w,pk){if(!WDEF[w])return[];var wl=PG(pk).wilayah,zs=WDEF[w].zones;return wl&&wl[w]&&wl[w].length?zs.filter(function(z){return wl[w].indexOf(z)>=0}):zs.slice()}
function zoneUsed(z,pk){var Z=ZONES[z];return!!Z&&worldAllowed(Z.w,pk)&&usedZones(Z.w,pk).indexOf(z)>=0}
function zoneList(z){return usedZones(ZONES[z].w)}
function zoneMapelFor(pk,z){var w=ZONES[z].w,zs=usedZones(w,pk),i=zs.indexOf(z);if(i<0||!worldAllowed(w,pk))return[];var tp=(PG(pk).tempat||{})[w]||{},free=[],out=[];
 pk.mapel.forEach(function(m){var t=tp[m.id];if(t&&zs.indexOf(t)>=0){if(t===z)out.push(m)}else free.push(m)});
 var n=free.length,k=zs.length;free.forEach(function(m,j){if(Math.floor(j*k/n)===i)out.push(m)});
 return pk.mapel.filter(function(m){return out.indexOf(m)>=0})}
function zoneMapel(z){return zoneMapelFor(data,z)}
function zoneLock(z){if(!zoneUsed(z))return"Wilayah ini tidak dipakai oleh gurumu.";var zs=zoneList(z),i=zs.indexOf(z);if(i<2||(data.pengaturan&&data.pengaturan.bukaSemuaWilayah))return null;
 var pz=zs[i-1],bm=zoneMapel(pz),need=Math.min(2,bm.length),done=bm.filter(function(m){return wDone(ZONES[z].w,m.id)}).length;return done<need?"Selesaikan "+need+" gedung di "+ZONES[pz].nama+" untuk membuka "+ZONES[z].nama+" ("+done+"/"+need+")":null}
/* titik awal pilihan guru: dipakai sekali saat mulai bermain */
var mulaiDone=false;
function goMulai(){if(mulaiDone)return;mulaiDone=true;var z=PG().mulai;if(!z||!zoneUsed(z)||CUR.z===z||zoneLock(z))return;setTimeout(function(){if(mode!=="play")return;toast("🧭 Gurumu memilih titik awal: "+ZONES[z].ic+" "+ZONES[z].nama,3500);travelTo(ZONES[z].w,z)},900)}
/* ---------- editor tab 🗺️ Peta ---------- */
function petaTabHTML(){var pk=null;try{pk=validate(normalize(draft))}catch(e){}
 if(!pk)return'<div class="note">Lengkapi dulu soal di tab ✏️ Buat Soal (setiap mapel minimal 1 soal yang valid), lalu kembali ke sini untuk mengatur peta.</div>';
 var p=draft.pengaturan||{},h='<div class="mut">Atur di dunia dan wilayah mana murid belajar, serta di wilayah mana setiap gedung mapel berdiri. Pengaturan ini ikut tersimpan di paket soal, jadi berlaku untuk kelas yang memakai paket ini.</div>';
 h+='<label class="mut" style="display:flex;gap:8px;align-items:center;margin-top:10px;font-weight:800"><input type="checkbox" data-pset="bukaSemuaWilayah"'+(p.bukaSemuaWilayah?" checked":"")+'> 🔓 Buka semua wilayah sejak awal (tanpa syarat menyelesaikan gedung)</label>';
 h+='<h3 style="font-family:var(--fh);margin:14px 0 6px">1. Dunia yang dipakai</h3><div class="mut" style="font-size:12px;margin-bottom:6px">🏙️ Kota Ilmu selalu tersedia sebagai kota awal. Dunia yang tidak dicentang tampil terkunci bagi murid.</div><div class="pgrid">';
 Object.keys(WDEF).forEach(function(w){var W=WDEF[w],on=worldAllowed(w,draft);h+='<label class="pw'+(on?" on":"")+'"><input type="checkbox" data-pw="'+w+'"'+(on?" checked":"")+'><span class="pwi">'+W.ic+'</span><b>'+esc(W.nama)+'</b><small>'+W.zones.length+' wilayah</small></label>'});
 h+='</div>';
 h+='<h3 style="font-family:var(--fh);margin:16px 0 6px">2. Wilayah &amp; letak gedung</h3><div class="mut" style="font-size:12px;margin-bottom:6px">Centang wilayah yang dipakai, lalu pilih wilayah untuk setiap gedung. Pilihan "Otomatis" membagi gedung secara merata ke wilayah yang dipakai.</div>';
 Object.keys(WDEF).filter(function(w){return worldAllowed(w,draft)}).forEach(function(w){var W=WDEF[w],used=usedZones(w,draft),tp=(p.tempat||{})[w]||{};
  h+='<div class="scard"><div class="sh"><span>'+W.ic+' '+esc(W.nama)+'</span><small class="mut">'+used.length+' dari '+W.zones.length+' wilayah dipakai</small></div><div class="row" style="margin-top:2px">'+W.zones.map(function(z){var on=used.indexOf(z)>=0;return'<label class="pz'+(on?" on":"")+'"><input type="checkbox" data-pz="'+w+'|'+z+'"'+(on?" checked":"")+'> '+ZONES[z].ic+' '+esc(ZONES[z].nama)+'</label>'}).join("")+'</div>';
  h+='<div class="tbl-wrap" style="margin-top:8px"><table class="dt"><tr><th>Gedung mapel</th><th>Letak di wilayah</th></tr>'+pk.mapel.map(function(m){return'<tr><td><i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:'+esc(m.warna)+'"></i> '+esc(m.nama)+'</td><td><select class="gin" data-pm="'+w+'|'+esc(m.id)+'"><option value="">Otomatis</option>'+used.map(function(z){return'<option value="'+z+'"'+(tp[m.id]===z?" selected":"")+'>'+ZONES[z].ic+' '+esc(ZONES[z].nama)+'</option>'}).join("")+'</select></td></tr>'}).join("")+'</table></div>';
  h+='<div class="pprev">'+used.map(function(z){var ms=zoneMapelFor({mapel:pk.mapel,pengaturan:draft.pengaturan},z);return'<div><b>'+ZONES[z].ic+' '+esc(ZONES[z].nama)+'</b>: '+(ms.length?ms.map(function(m){return esc(m.nama)}).join(", "):'<span class="mut">tidak ada gedung</span>')+'</div>'}).join("")+'</div></div>'});
 var opts='<option value="">🏙️ Kota Ilmu (bawaan)</option>';Object.keys(WDEF).filter(function(w){return worldAllowed(w,draft)}).forEach(function(w){usedZones(w,draft).forEach(function(z){opts+='<option value="'+z+'"'+(p.mulai===z?" selected":"")+'>'+WDEF[w].ic+' '+esc(WDEF[w].nama)+' • '+esc(ZONES[z].nama)+'</option>'})});
 h+='<h3 style="font-family:var(--fh);margin:16px 0 6px">3. Titik awal murid</h3><label class="fld" style="max-width:420px">Saat mulai bermain, murid langsung dibawa ke<select data-pmulai="1">'+opts+'</select></label>';
 h+='<div class="mut" style="font-size:12px;margin-top:6px">Kalau titik awal masih terkunci (karena syarat gedung), murid tetap mulai di Kota Ilmu. Centang "Buka semua wilayah" agar titik awal selalu bisa dituju.</div>';
 h+='<div class="note" style="margin-top:12px">Tekan <b>💾 Simpan</b> di bawah, lalu <b>⬆ Kirim paket terbaru</b> (atau 🏫 Pakai di kelas) supaya peta baru dipakai murid.</div>';
 return h}
function petaInput(t){var d=t.dataset,p=draft.pengaturan=draft.pengaturan||{};
 if(d.pw){var all=Object.keys(WDEF),cur=p.dunia?p.dunia.slice():all.slice();if(t.checked){if(cur.indexOf(d.pw)<0)cur.push(d.pw)}else cur=cur.filter(function(w){return w!==d.pw});p.dunia=cur.length===all.length?undefined:cur;if(p.mulai&&ZONES[p.mulai]&&!worldAllowed(ZONES[p.mulai].w,draft))delete p.mulai}
 else if(d.pz){var a=d.pz.split("|"),w=a[0],z=a[1],zs=usedZones(w,draft);if(t.checked){if(zs.indexOf(z)<0)zs.push(z)}else{if(zs.length<=1){t.checked=true;gmsg("Setiap dunia yang dipakai minimal punya 1 wilayah.","#ff8a80");return true}zs=zs.filter(function(x){return x!==z})}
  p.wilayah=p.wilayah||{};p.wilayah[w]=WDEF[w].zones.filter(function(x){return zs.indexOf(x)>=0});if(p.wilayah[w].length===WDEF[w].zones.length)delete p.wilayah[w];
  if(p.tempat&&p.tempat[w])Object.keys(p.tempat[w]).forEach(function(id){if(zs.indexOf(p.tempat[w][id])<0)delete p.tempat[w][id]});if(p.mulai===z&&!t.checked)delete p.mulai}
 else if(d.pm){var b=d.pm.split("|"),w2=b[0],id=b.slice(1).join("|");p.tempat=p.tempat||{};p.tempat[w2]=p.tempat[w2]||{};if(t.value)p.tempat[w2][id]=t.value;else delete p.tempat[w2][id]}
 else if(d.pmulai){if(t.value)p.mulai=t.value;else delete p.mulai}
 else return false;
 draft.pengaturan=cleanPeta(p);dirty=true;gmsg("Peta diubah. Tekan Simpan.","var(--yel)");renderGuru();return true}
function loadWorld(w,z){clearWorld();var Z=w==="kota"?KOTA:ZONES[z];CUR.w=w;CUR.z=w==="kota"?"kota":z;CUR.g=Z.g;CUR.jv=Z.jv;CUR.r=Z.r||0;CUR.swim=!!Z.swim;BOUND=Z.bound;CUR.spawn=Z.spawn;
 rnd=seeded(1234);Z.build();bake(scene);applyGfx();pos.set(Z.spawn[0],Z.spawn[1],Z.spawn[2]);vy=0;onGround=true;heading=0;yaw=Math.PI;if(avatar)avatar.position.copy(pos);
 if(w!=="kota"){P.stats.zones=P.stats.zones||{};P.stats.zones[z]=1;P.stats.worlds=P.stats.worlds||{};P.stats.worlds[w]=1;if(w==="angkasa")P.stats.angkasa=1}P.where={w:w,z:CUR.z};save();updWorldHud();if(ZN)setTimeout(zoneRebuild,60);$("jump").textContent=CUR.swim?"RENANG":"LOMPAT";if(RT.on){rtClearPeers();rtHello("z")}checkMissions()}
function updWorldHud(){var el=$("hWorld");if(!el)return;el.textContent=CUR.w==="kota"?"🏙️ Kota Ilmu":ZONES[CUR.z].ic+" "+ZONES[CUR.z].nama}
function rebuildLotsAny(){if(CUR.w==="kota")buildKotaLots();else buildSpaceLots()}

/* ---------- tekstur ---------- */
function noiseTex(base,specks,rep,n,sz){var c=document.createElement("canvas");c.width=c.height=sz||128;var g=c.getContext("2d"),S=c.width;g.fillStyle=base;g.fillRect(0,0,S,S);
 for(var i=0;i<(n||900);i++){g.fillStyle=specks[i%specks.length];var r=Math.random()*3+1;g.fillRect(Math.random()*S,Math.random()*S,r,r)}
 var t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rep,rep);return t}
function moonTex(){var c=document.createElement("canvas");c.width=c.height=256;var g=c.getContext("2d");g.fillStyle="#9a9aa0";g.fillRect(0,0,256,256);
 for(var i=0;i<1500;i++){g.fillStyle=Math.random()<.5?"rgba(60,60,70,.18)":"rgba(230,230,240,.14)";g.fillRect(Math.random()*256,Math.random()*256,2,2)}
 for(var k=0;k<14;k++){var x=Math.random()*256,y=Math.random()*256,r=4+Math.random()*12;g.strokeStyle="rgba(210,210,220,.35)";g.lineWidth=2;g.beginPath();g.arc(x,y,r,0,7);g.stroke();g.fillStyle="rgba(70,70,80,.25)";g.beginPath();g.arc(x+1,y+1,r*.8,0,7);g.fill()}
 var t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(30,30);return t}
function earthTex(){var c=document.createElement("canvas");c.width=512;c.height=256;var g=c.getContext("2d");var gr=g.createLinearGradient(0,0,0,256);gr.addColorStop(0,"#1d4ed8");gr.addColorStop(.5,"#1e66d0");gr.addColorStop(1,"#1d4ed8");g.fillStyle=gr;g.fillRect(0,0,512,256);
 var land=["#3f9b46","#4caf50","#8d7a4a","#6aa84f"];for(var i=0;i<26;i++){var x=Math.random()*512,y=40+Math.random()*176;g.fillStyle=land[i%4];for(var j=0;j<9;j++){g.beginPath();g.arc(x+(Math.random()-.5)*60,y+(Math.random()-.5)*36,8+Math.random()*20,0,7);g.fill()}}
 g.fillStyle="#f8fafc";g.fillRect(0,0,512,14);g.fillRect(0,242,512,14);
 for(var k=0;k<60;k++){g.fillStyle="rgba(255,255,255,"+(.35+Math.random()*.4)+")";g.beginPath();g.ellipse(Math.random()*512,Math.random()*256,10+Math.random()*30,4+Math.random()*8,0,0,7);g.fill()}
 return new THREE.CanvasTexture(c)}
function gridTex(bg,line,rep){var c=document.createElement("canvas");c.width=c.height=128;var g=c.getContext("2d");g.fillStyle=bg;g.fillRect(0,0,128,128);g.strokeStyle=line;g.lineWidth=3;g.strokeRect(2,2,124,124);g.lineWidth=1;g.beginPath();g.moveTo(64,0);g.lineTo(64,128);g.moveTo(0,64);g.lineTo(128,64);g.stroke();
 g.fillStyle="rgba(255,255,255,.08)";g.fillRect(8,8,48,48);g.fillRect(72,72,48,48);var t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rep,rep);t.anisotropy=8;return t}
G.octa=flatGeo(new THREE.OctahedronGeometry(1,0));

/* ---------- robot NPC ---------- */
function buildRobot(col){var g=new THREE.Group(),legL=new THREE.Group(),legR=new THREE.Group(),armL=new THREE.Group(),armR=new THREE.Group(),head=new THREE.Group();col=col||"#2e7df6";
 legL.position.set(-0.4,1.35,0);legR.position.set(0.4,1.35,0);[legL,legR].forEach(function(l){B(0.6,1.15,0.6,"#90a4ae",0,-0.55,0,l);B(0.82,0.3,0.95,"#455a64",0,-1.2,0.05,l)});
 armL.position.set(-1.08,2.85,0);armR.position.set(1.08,2.85,0);[armL,armR].forEach(function(a){B(0.48,1.3,0.48,"#b0bec5",0,-0.6,0,a);B(0.62,0.36,0.62,col,0,-1.35,0,a)});
 B(1.6,1.6,1,col,0,2.15,0,g);B(0.95,0.62,0.06,"#263238",0,2.3,0.52,g);
 ["#22c55e","#fbbf24","#ef4444"].forEach(function(c2,i){var l=new THREE.Mesh(G.box,MB(c2));l.scale.set(0.16,0.16,0.04);l.position.set(-0.28+i*0.28,2.3,0.56);g.add(l)});
 head.position.set(0,3.6,0);B(1.3,1.0,1.1,"#cfd8dc",0,0,0,head);var vz=new THREE.Mesh(G.box,MB("#22d3ee"));vz.scale.set(1.0,0.38,0.06);vz.position.set(0,0.05,0.56);head.add(vz);
 mesh(cyl(0.05,0.05,0.6,6),"#455a64",0,0.8,0,head);var bulb=new THREE.Mesh(G.sph,MB("#ff5252"));bulb.scale.setScalar(0.15);bulb.position.y=1.15;head.add(bulb);
 g.add(head,legL,legR,armL,armR);g.userData={legL:legL,legR:legR,armL:armL,armR:armR,head:head,cape:null};g.scale.setScalar(0.62);return g}
var ASTRO={kulit:"k2",rambut:"r_pendek",wrambut:"w1",topi:"t_astro",atasan:"a_astro",bawahan:"b8",wajah:"f0",leher:"l0",punggung:"p0"};
function astro(kulit,rambut){var o=clone(ASTRO);o.kulit=kulit;o.rambut=rambut;return o}

/* ---------- kelengkapan wilayah: roket, papan misi, kios, fakta ---------- */
var FACTS={
 orbit:["Stasiun Antariksa Internasional (ISS) mengelilingi Bumi kira-kira setiap 90 menit. Karena itu, astronot bisa melihat matahari terbit sekitar 16 kali dalam sehari.",
  "Astronot di stasiun antariksa melayang bukan karena tidak ada gravitasi, melainkan karena mereka terus 'jatuh' mengelilingi Bumi bersama stasiunnya. Gerakan ini disebut orbit.",
  "Bumi adalah satu-satunya planet yang diketahui memiliki kehidupan. Sekitar 71% permukaannya tertutup air."],
 bulan:["Gravitasi Bulan kira-kira 1/6 gravitasi Bumi. Murid yang timbangannya menunjukkan 60 kg di Bumi hanya akan menunjukkan sekitar 10 kg di Bulan.",
  "Bulan tidak memancarkan cahaya sendiri. Cahaya Bulan yang kita lihat pada malam hari adalah pantulan cahaya Matahari.",
  "Bulan hampir tidak punya udara, jadi tidak ada angin. Jejak kaki astronot di Bulan bisa bertahan sangat lama.",
  "Kawah-kawah di Bulan terbentuk karena tumbukan meteorit selama miliaran tahun."],
 mars:["Mars disebut Planet Merah karena tanahnya banyak mengandung besi oksida, zat yang juga membuat besi berkarat berwarna kemerahan.",
  "Gravitasi Mars sekitar 38% gravitasi Bumi, jadi kamu bisa melompat kira-kira dua setengah kali lebih tinggi daripada di Bumi.",
  "Olympus Mons di Mars adalah salah satu gunung berapi terbesar di Tata Surya. Tingginya lebih dari dua kali tinggi Gunung Everest.",
  "Satu hari di Mars disebut sol, lamanya sekitar 24 jam 37 menit. Mars juga punya dua bulan kecil bernama Phobos dan Deimos."]};
function rocketModel(){var rk=new THREE.Group();mesh(cyl(1.2,1.3,7,16),"#fafafa",0,4.4,0,rk);var n=mesh(new THREE.ConeGeometry(1.2,2.6,16),"#e53935",0,9.2,0,rk);
 mesh(cyl(1.22,1.22,0.5,16),"#2e7df6",0,3,0,rk);mesh(cyl(1.22,1.22,0.25,16),"#e53935",0,6.6,0,rk);mesh(cyl(0.75,1.05,1.1,12),"#455a64",0,0.55,0,rk);
 var w=mesh(cyl(0.45,0.45,0.12,16),"#7fd6ff",0,6,1.2,rk);w.rotation.x=Math.PI/2;
 for(var i=0;i<4;i++){var a=i/4*Math.PI*2,f=B(0.14,2.2,1.5,"#e53935",Math.sin(a)*1.6,1.6,Math.cos(a)*1.6,rk);f.rotation.y=a}return rk}
function spaceKit(o){var W=WDEF[CUR.w]||WDEF.angkasa,tech=W.tech,px=o.pad[0],pz=o.pad[1],lz=pz-6,iz=pz-3.6;
 if(W.padWater){W_disc("#8d6e4a",6.9,px,pz+0.8,0.05);var pool=W_disc("#2f9fd8",6.1,px,pz+0.8,0.08,.88);B(2.2,0.3,3.2,"#8d6e4a",px,0.2,pz-6.4,scene);CIRC.push({x:px,z:pz+0.8,r:6.6});lz=pz-8.6;iz=pz-6.2;
  var vh=W.veh();vh.position.set(px,0,pz+1);vh.userData.dyn=true;scene.add(vh);animated.push(function(t){vh.position.y=Math.sin(t*0.0015)*0.12;vh.rotation.x=Math.sin(t*0.0011)*0.03})}
 else{mesh(cyl(5,5.3,0.4,28),W.pad||"#37474f",px,0.2,pz,scene);var rg=new THREE.Mesh(new THREE.RingGeometry(4.2,4.7,32),MB("#fbbf24"));rg.rotation.x=-Math.PI/2;rg.position.set(px,0.42,pz);scene.add(rg);
  var vh2=W.veh();vh2.position.set(px,0.4,pz);scene.add(vh2);CIRC.push({x:px,z:pz,r:CUR.w==="mancanegara"?2.4:1.9});if(CUR.w==="mancanegara")CIRC.push({x:px+4,z:pz,r:1.2},{x:px-4,z:pz,r:1.2})}
 B(0.2,2.6,0.2,"#90a4ae",px-3,1.3,lz,scene);B(0.2,2.6,0.2,"#90a4ae",px+3,1.3,lz,scene);
 var rl=textPlane([{t:W.pl,s:44,y:64,c:"#fff"}],512,128,6,1.5,{bg:W.pc,rad:16});rl.position.set(px,2.5,lz-0.05);scene.add(rl);CIRC.push({x:px-3,z:lz,r:0.3},{x:px+3,z:lz,r:0.3});
 INTER.push({type:"rocket",x:px,z:iz,r:3.2,label:W.naik});
 var bx=o.board[0],bz=o.board[1];
 if(tech){B(4.6,0.3,0.8,"#37474f",bx,0.15,bz,scene);var holo=new THREE.Mesh(G.box,new THREE.MeshBasicMaterial({color:new THREE.Color(W.sc),transparent:true,opacity:.22,depthWrite:false}));holo.scale.set(4.2,2.6,0.08);holo.position.set(bx,2,bz);scene.add(holo);
  var mp=textPlane([{t:"📜 PAPAN MISI",s:46,y:52,c:"#e0f7ff"},{t:"Klaim hadiahmu di sini",s:28,y:112,c:"#a5f3fc"}],512,160,4,1.25,{transparent:true});mp.position.set(bx,2,bz-0.1);scene.add(mp)}
 else{B(0.25,3.2,0.25,"#5d4037",bx-2,1.6,bz,scene);B(0.25,3.2,0.25,"#5d4037",bx+2,1.6,bz,scene);B(4.6,2.4,0.2,"#8d6e4a",bx,2.2,bz,scene);var rf0=mesh(G.hip,"#6d4c41",bx,3.75,bz,scene);rf0.scale.set(2.6,0.7,0.5);
  var mp2=textPlane([{t:"📜 PAPAN MISI",s:46,y:52,c:"#fff7e0"},{t:"Klaim hadiahmu di sini",s:28,y:112,c:"#fde68a"}],512,160,4,1.25,{bg:"#5d4037",rad:12});mp2.position.set(bx,2.2,bz-0.12);scene.add(mp2)}
 COL.push({x1:bx-2.3,x2:bx+2.3,z1:bz-0.4,z2:bz+0.4});INTER.push({type:"board",x:bx,z:bz-1.9,r:2.6,label:"Lihat Papan Misi"});
 var kx=o.shop[0],kz=o.shop[1];
 if(tech){B(3.8,1.2,1.4,"#eceff1",kx,0.6,kz,scene);B(4,0.15,1.6,W.sc,kx,1.25,kz,scene);B(0.18,3.2,0.18,"#90a4ae",kx-1.8,1.6,kz,scene);B(0.18,3.2,0.18,"#90a4ae",kx+1.8,1.6,kz,scene);B(4,0.2,1.8,W.pc,kx,3.25,kz,scene);
  B(0.7,1.1,0.4,"#fafafa",kx,1.9,kz,scene);var sh=new THREE.Mesh(G.sph,new THREE.MeshLambertMaterial({color:0xcfefff,transparent:true,opacity:.5}));sh.scale.setScalar(0.42);sh.position.set(kx,2.75,kz);scene.add(sh)}
 else{B(3.8,1.1,1.4,"#a1887f",kx,0.55,kz,scene);B(0.18,3.2,0.18,"#5d4037",kx-1.8,1.6,kz,scene);B(0.18,3.2,0.18,"#5d4037",kx+1.8,1.6,kz,scene);var aw=B(4.4,0.15,2.2,W.sc,kx,3.3,kz,scene);aw.rotation.x=-0.15;
  ["#b91c1c","#1d4ed8","#facc15"].forEach(function(c,i){B(0.7,0.9,0.06,c,kx-1.1+i*1.1,2.3,kz+0.4,scene)});B(3.6,0.06,0.06,"#5d4037",kx,2.8,kz+0.4,scene)}
 var kt=textPlane([{t:"👕 LEMARI KOSTUM",s:44,y:64,c:"#fff"}],512,128,3.6,0.9,{bg:tech?"#2e7df6":W.pc,rad:16});kt.position.set(kx,tech?2.75:3.7,kz-(tech?0.95:1.15));scene.add(kt);
 COL.push({x1:kx-2,x2:kx+2,z1:kz-0.8,z2:kz+0.8});INTER.push({type:"shop",x:kx,z:kz-2.2,r:2.6,label:"Buka Lemari Kostum"});
 var F=FACTS[CUR.z],fc=W.fc;o.facts.forEach(function(f,i){var fx=f[0],fz=f[1];mesh(cyl(0.15,0.2,2.4,8),"#90a4ae",fx,1.2,fz,scene);B(3.4,1.1,0.16,fc[0],fx,2.7,fz,scene);
  var fp=textPlane([{t:"💡 TAHUKAH KAMU?",s:46,y:64,c:"#fff"}],512,128,3.1,0.8,{bg:fc[1],rad:16});fp.position.set(fx,2.7,fz-0.1);scene.add(fp);
  CIRC.push({x:fx,z:fz,r:0.4});INTER.push({type:"fact",fact:F[i%F.length],fk:CUR.z+":"+i,x:fx,z:fz-1.6,r:2.4,label:"Baca: Tahukah kamu?"})})}
function okSpot(x,z,res){for(var i=0;i<res.length;i++){var c=res[i];if(Math.hypot(x-c[0],z-c[1])<c[2])return false}if(Math.abs(Math.abs(x)-40)<5&&Math.abs(z)<46)return false;if(Math.abs(Math.abs(z)-40)<5&&Math.abs(x)<46)return false;return true}
var DOME_POS=[[18.4,18.4],[-18.4,18.4],[-18.4,-18.4],[18.4,-18.4]];
function resv(extra){var r=[[0,0,12],[0,30,9],[-8,-4,5],[8,-4,5]];DOME_POS.forEach(function(p){r.push([p[0],p[1],11])});return r.concat(extra||[])}
function makeRover(col){var g=new THREE.Group();B(3.4,0.8,2.2,col,0,1.05,0,g);B(1.6,0.9,1.9,"#cfd8dc",-0.4,1.9,0,g);B(1.5,0.6,1.92,"#7fd6ff",-0.45,1.95,0,g);B(2.6,0.08,2.6,"#1e40af",0.7,1.6,0,g);mesh(cyl(0.04,0.04,1.2,6),"#455a64",-1.2,2.8,0.6,g);
 [-1.2,0,1.2].forEach(function(x){[-1.25,1.25].forEach(function(z){var w=mesh(G.wheel,"#3a3a3a",x,0.5,z,g);w.rotation.x=Math.PI/2})});g.userData.len=3.6;return g}
function addRovers(cols){cols.forEach(function(col,i){var g=makeRover(col);g.userData.dyn=true;scene.add(g);var c={g:g,route:route(40,i%2===0),seg:i%4,t:i*7%20,speed:4+i,v:0,honkT:0,block:0};cars.push(c);placeCar(c,0)})}
function addShuttle(rad,h,sp,off,col){var g=new THREE.Group();B(4,1,1.6,"#fafafa",0,0,0,g);B(1.4,0.8,1.4,"#7fd6ff",1.6,0.5,0,g);var w=B(2.4,0.12,5,col||"#cfd8dc",-0.6,-0.2,0,g);B(1,1.2,0.12,col||"#cfd8dc",-1.8,0.7,0,g);
 var fl=new THREE.Mesh(new THREE.ConeGeometry(0.4,1.4,10),new THREE.MeshBasicMaterial({color:0xffa94d}));fl.rotation.z=Math.PI/2;fl.position.set(-2.7,0,0);g.add(fl);
 g.userData.dyn=true;scene.add(g);animated.push(function(t){var a=t*sp+off;g.position.set(Math.sin(a)*rad,h+Math.sin(t*0.001+off)*2,Math.cos(a)*rad);g.rotation.y=a+Math.PI;fl.scale.setScalar(0.85+Math.sin(t*0.03)*0.15)})}

/* ---------- Wilayah 1: Stasiun Orbit ---------- */
function buildOrbit(){setEnv("orbit");
 var deck=new THREE.Mesh(new THREE.CylinderGeometry(46,46,1,8),[M("#3d4357"),new THREE.MeshLambertMaterial({map:gridTex("#585f7a","#7b84a6",14)}),M("#2b3042")]);deck.position.y=-0.5;deck.receiveShadow=true;scene.add(deck);
 var inner=new THREE.Mesh(new THREE.CircleGeometry(14,40),M("#6b7394"));inner.rotation.x=-Math.PI/2;inner.position.y=0.02;inner.receiveShadow=true;scene.add(inner);
 var pr=new THREE.Mesh(new THREE.RingGeometry(14,14.6,40),MB("#22d3ee"));pr.rotation.x=-Math.PI/2;pr.position.y=0.03;scene.add(pr);
 var R=46*0.97;for(var k=0;k<8;k++){var a1=k/8*Math.PI*2,a2=(k+1)/8*Math.PI*2,x1=Math.sin(a1)*R,z1=Math.cos(a1)*R,x2=Math.sin(a2)*R,z2=Math.cos(a2)*R,dx=x2-x1,dz=z2-z1,L=Math.hypot(dx,dz);
  B(0.35,1.5,0.35,"#90a4ae",x1,0.75,z1,scene);[1.35,0.7].forEach(function(hy){var r1=B(L,0.14,0.14,"#b0bec5",(x1+x2)/2,hy,(z1+z2)/2,scene);r1.rotation.y=Math.atan2(-dz,dx)});
  var lt=new THREE.Mesh(G.box,MB("#22d3ee"));lt.scale.set(0.4,0.15,0.4);lt.position.set(x1,1.55,z1);scene.add(lt)}
 for(var b=0;b<4;b++){var ba=b/4*Math.PI*2+Math.PI/8,beam=B(3,1.5,40,"#2b3042",Math.sin(ba)*20,-1.8,Math.cos(ba)*20,scene,false);beam.rotation.y=ba}
 mesh(cyl(3,3.4,14,18),"#cfd8dc",0,7,0,scene);var top=mesh(G.sph,"#eceff1",0,14,0,scene);top.scale.set(3,1.6,3);
 [5,9.5].forEach(function(hy){var wl=new THREE.Mesh(cyl(3.08,3.08,0.6,18),MB("#7fd6ff"));wl.position.y=hy;scene.add(wl)});
 var ring=new THREE.Mesh(new THREE.TorusGeometry(7.5,0.55,8,48),M("#90a4ae"));ring.position.y=11.5;ring.rotation.x=Math.PI/2;ring.userData.dyn=true;scene.add(ring);
 for(var sp=0;sp<4;sp++){var spk=new THREE.Mesh(G.box,M("#b0bec5"));spk.scale.set(15,0.3,0.3);spk.rotation.y=sp/4*Math.PI;ring.add(spk);spk.position.z=0;spk.rotation.x=0}
 animated.push(function(t){ring.rotation.z=t*0.00035});CIRC.push({x:0,z:0,r:3.8});
 [[34,0],[-34,0]].forEach(function(p){var g=new THREE.Group();var c=mesh(cyl(2.6,2.6,11,18),"#eceff1",0,3,0,g);c.rotation.x=Math.PI/2;[-5.6,5.6].forEach(function(z){var e=mesh(cyl(2.2,2.6,0.6,18),"#b0bec5",0,3,z,g);e.rotation.x=Math.PI/2});
  for(var w=-3;w<=3;w+=2){var wn=new THREE.Mesh(G.box,MB("#7fd6ff"));wn.scale.set(0.12,0.8,1.2);wn.position.set(p[0]>0?-2.62:2.62,3.4,w);g.add(wn)}
  B(0.5,1.6,0.5,"#78909c",0,0.4,-3.5,g);B(0.5,1.6,0.5,"#78909c",0,0.4,3.5,g);var nm=B(4.6,0.12,1.4,"#2e7df6",0,5.7,0,g);
  g.position.set(p[0],0,p[1]);scene.add(g);COL.push({x1:p[0]-2.8,x2:p[0]+2.8,z1:p[1]-6,z2:p[1]+6})});
 [[28,-28],[-28,-28]].forEach(function(p){mesh(cyl(0.25,0.3,4,8),"#90a4ae",p[0],2,p[1],scene);for(var s=-1;s<=1;s+=2){var pn=B(5,0.12,3,"#1e3a8a",p[0]+s*2.8,4,p[1],scene);pn.rotation.z=s*0.15;B(5.1,0.14,0.12,"#cfd8dc",p[0]+s*2.8,4.02,p[1],scene)}CIRC.push({x:p[0],z:p[1],r:0.5})});
 var earth=new THREE.Mesh(new THREE.SphereGeometry(150,48,32),new THREE.MeshBasicMaterial({map:earthTex(),fog:false}));earth.position.set(0,-175,-250);earth.userData.dyn=true;scene.add(earth);animated.push(function(t){earth.rotation.y=t*0.00002});
 var moon=new THREE.Mesh(new THREE.SphereGeometry(16,24,16),new THREE.MeshBasicMaterial({map:moonTex(),fog:false}));moon.position.set(260,140,200);moon.userData.dyn=true;scene.add(moon);
 addShuttle(75,16,0.00012,0,"#cfd8dc");addShuttle(95,26,-0.00009,2,"#fbbf24");
 spaceKit({pad:[0,30],board:[-8,-4],shop:[8,-4],facts:[[-22,4],[22,4],[0,-30]]});
 buildNPCs([
  {n:"Komandan Sari",x:5,z:-10,ic:"👩‍🚀",o:astro("k2","r_panjang")},
  {n:"Robo-7",x:-6,z:9,ic:"🤖",robot:true,col:"#2e7df6"},
  {n:"Dr. Yohanes",x:24,z:-10,ic:"🧑‍🔬",o:{kulit:"k4",rambut:"r_kribo",wrambut:"w1",topi:"t0",atasan:"a_jas",bawahan:"b6",wajah:"f_kc",leher:"l0",punggung:"p0"}},
  {n:"Kadet Rani",x:-24,z:-10,ic:"👧",o:astro("k3","r_kuncir")}]);
 buildBooks([[0,-22],[14,6],[-14,6],[30,16],[-30,16],[-8,24],[8,24],[-30,-14],[30,-14]],"kristal");
 buildLots()}

/* ---------- Wilayah 2: Bulan ---------- */
function buildBulan(){setEnv("bulan");
 var gr=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshLambertMaterial({map:moonTex()}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;scene.add(gr);
 var res=resv([[-22,4,5],[22,4,5],[0,-30,5],[-30,-34,5],[34,-30,8],[-36,22,7],[0,-15,13]]);
 var made=0,tries=0;while(made<45&&tries<600){tries++;var a=rnd()*Math.PI*2,d=8+rnd()*190,x=Math.sin(a)*d,z=Math.cos(a)*d,r=2+rnd()*(d>70?14:3.5);if(d<70&&!okSpot(x,z,res.concat([])))continue;
  var rim=mesh(new THREE.TorusGeometry(r,r*0.16,6,28),"#a3a3aa",x,0,z,scene);rim.rotation.x=Math.PI/2;rim.scale.z=0.55;var fl=new THREE.Mesh(new THREE.CircleGeometry(r*0.95,28),M("#7c7c84"));fl.rotation.x=-Math.PI/2;fl.position.set(x,0.03,z);fl.receiveShadow=true;scene.add(fl);made++}
 for(var i=0;i<40;i++){var a2=rnd()*Math.PI*2,d2=10+rnd()*120,x2=Math.sin(a2)*d2,z2=Math.cos(a2)*d2;if(d2<68&&!okSpot(x2,z2,res))continue;var s=0.5+rnd()*1.6,rk=mesh(G.ico,["#8e8e96","#a1a1a9","#77777f"][i%3],x2,s*0.4,z2,scene);rk.scale.set(s,s*0.7,s*1.1);if(d2<70)CIRC.push({x:x2,z:z2,r:s*0.9})}
 var L=new THREE.Group();B(3,1.8,3,"#d4a017",0,2.2,0,L);B(2.2,1.2,2.2,"#cfd8dc",0,3.7,0,L);[[-1.8,-1.8],[1.8,-1.8],[1.8,1.8],[-1.8,1.8]].forEach(function(q){var lg=B(0.15,2.2,0.15,"#9e9e9e",q[0],1,q[1],L);lg.rotation.z=q[0]>0?-0.3:0.3;B(0.7,0.1,0.7,"#9e9e9e",q[0]*1.15,0.05,q[1]*1.15,L)});
 var dish=mesh(new THREE.SphereGeometry(0.8,12,6,0,Math.PI*2,0,Math.PI/2),"#eceff1",0.8,4.6,0,L);dish.rotation.x=Math.PI;L.position.set(34,0,-30);scene.add(L);CIRC.push({x:34,z:-30,r:3.2});
 mesh(cyl(0.08,0.08,4,8),"#eeeeee",29.5,2,-30,scene);var fg=new THREE.Group();B(1.8,0.55,0.04,"#e53935",0.9,0.27,0,fg);B(1.8,0.55,0.04,"#fafafa",0.9,-0.28,0,fg);fg.position.set(29.5,3.4,-30);scene.add(fg);CIRC.push({x:29.5,z:-30,r:0.4});
 [[-36,22]].forEach(function(p){var g=new THREE.Group();var c=mesh(cyl(2.4,2.4,9,16),"#e0e0e0",0,2.6,0,g);c.rotation.x=Math.PI/2;var dm=mesh(G.sph,"#eceff1",0,2.6,5,g);dm.scale.setScalar(2.6);for(var s2=-1;s2<=1;s2+=2){var pn=B(5,0.12,3,"#1e3a8a",s2*5.5,3.5,0,g);pn.rotation.z=s2*0.2}g.position.set(p[0],0,p[1]);scene.add(g);COL.push({x1:p[0]-2.6,x2:p[0]+2.6,z1:p[1]-4.6,z2:p[1]+7.6})});
 var earth=new THREE.Mesh(new THREE.SphereGeometry(42,40,28),new THREE.MeshBasicMaterial({map:earthTex(),fog:false}));earth.position.set(-260,190,-430);earth.userData.dyn=true;scene.add(earth);animated.push(function(t){earth.rotation.y=t*0.00003});
 addRovers(["#f5f5f5","#fbbf24"]);addShuttle(120,40,0.0001,1,"#cfd8dc");
 spaceKit({pad:[0,30],board:[-8,-4],shop:[8,-4],facts:[[-22,4],[22,4],[0,-30],[-30,-34]]});
 buildNPCs([
  {n:"Astronot Bima",x:5,z:-10,ic:"👨‍🚀",o:astro("k3","r_pendek")},
  {n:"Robo-Lunar",x:-12,z:10,ic:"🤖",robot:true,col:"#9ca3af"},
  {n:"Kak Wulan",x:26,z:-6,ic:"👩‍🚀",o:astro("k1","r_panjang")},
  {n:"Pak Tarno",x:-26,z:-20,ic:"🧑‍🚀",o:astro("k4","r_botak")}]);
 buildBooks([[0,-22],[16,4],[-16,4],[50,10],[-50,-10],[10,52],[-12,-52],[34,-52],[-52,30],[52,-34]],"kristal");
 buildLots()}

/* ---------- Wilayah 3: Mars ---------- */
function buildMars(){setEnv("mars");
 var gr=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshLambertMaterial({map:noiseTex("#c8693d",["rgba(120,40,20,.25)","rgba(240,170,120,.2)","rgba(90,30,15,.18)"],50,1500)}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;scene.add(gr);
 var res=resv([[-22,4,5],[22,4,5],[0,-30,5],[-30,-34,5],[-34,24,9],[34,-30,9],[0,-15,5]]);
 for(var i=0;i<34;i++){var a=rnd()*Math.PI*2,d=90+rnd()*200,dn=mesh(G.ico,["#c1663b","#b55a32","#d0784a"][i%3],Math.sin(a)*d,0,Math.cos(a)*d,scene);dn.scale.set(18+rnd()*28,4+rnd()*10,18+rnd()*28)}
 for(var m=0;m<9;m++){var a3=m/9*Math.PI*2+rnd()*.3,d3=230+rnd()*60,h=30+rnd()*40,r3=25+rnd()*20;mesh(cyl(r3*0.8,r3,h,9),"#9e4a2b",Math.sin(a3)*d3,h/2,Math.cos(a3)*d3,scene,false);mesh(cyl(r3*0.8,r3*0.8,2,9),"#b9603a",Math.sin(a3)*d3,h+1,Math.cos(a3)*d3,scene,false)}
 for(var k=0;k<45;k++){var a2=rnd()*Math.PI*2,d2=10+rnd()*110,x2=Math.sin(a2)*d2,z2=Math.cos(a2)*d2;if(d2<68&&!okSpot(x2,z2,res))continue;var s=0.5+rnd()*1.8,rk=mesh(G.ico,["#7a2f17","#93401f","#a5512b"][k%3],x2,s*0.4,z2,scene);rk.scale.set(s,s*0.75,s);if(d2<70)CIRC.push({x:x2,z:z2,r:s*0.9})}
 var gh=new THREE.Group();mesh(cyl(7,7.3,1,24),"#8d6e63",0,0.5,0,gh);var gg=new THREE.Mesh(new THREE.SphereGeometry(7,24,12,0,Math.PI*2,0,Math.PI/2),new THREE.MeshLambertMaterial({color:0xd8f3ff,transparent:true,opacity:.35,depthWrite:false}));gg.position.y=1;gh.add(gg);
 for(var p=0;p<9;p++){var pa=p/9*Math.PI*2,pl=mesh(G.ico,["#2e7d32","#43a047","#66bb6a"][p%3],Math.sin(pa)*3.8,2,Math.cos(pa)*3.8,gh);pl.scale.set(1,1.3,1)}mesh(G.ico,"#ef5350",0,2.2,0,gh).scale.setScalar(0.8);
 var ghl=textPlane([{t:"🌱 KEBUN MARS",s:46,y:64,c:"#fff"}],512,128,4.4,1.1,{bg:"#2e7d32",rad:16});ghl.position.set(0,6.5,-7.2);gh.add(ghl);B(0.2,6,0.2,"#90a4ae",-2.4,3.2,-7.1,gh);B(0.2,6,0.2,"#90a4ae",2.4,3.2,-7.1,gh);
 gh.position.set(-34,0,24);scene.add(gh);CIRC.push({x:-34,z:24,r:7.4});
 [[34,-30]].forEach(function(q){for(var r=0;r<3;r++)for(var c=0;c<2;c++){mesh(cyl(0.12,0.15,1.6,6),"#90a4ae",q[0]-4+r*4,0.8,q[1]-2+c*4,scene);var pn=B(3.4,0.1,2.4,"#1e3a8a",q[0]-4+r*4,1.7,q[1]-2+c*4,scene);pn.rotation.x=-0.35}COL.push({x1:q[0]-6,x2:q[0]+6,z1:q[1]-4,z2:q[1]+4})});
 var dr=new THREE.Group();B(0.9,0.5,0.9,"#eceff1",0,0,0,dr);var rots=[];[-1,1].forEach(function(s2){var rot=B(2.6,0.04,0.2,"#424242",0,0.45+s2*0.15,0,dr);rots.push(rot)});mesh(cyl(0.04,0.04,0.6,6),"#424242",0,0.3,0,dr);
 dr.userData.dyn=true;scene.add(dr);animated.push(function(t){var a4=t*0.00025;dr.position.set(Math.sin(a4)*30,7+Math.sin(t*0.002)*1.2,Math.cos(a4*1.3)*30);rots[0].rotation.y=t*0.05;rots[1].rotation.y=-t*0.05});
 var n=500,pp=new Float32Array(n*3);for(var q2=0;q2<n;q2++){pp[q2*3]=(Math.random()-.5)*160;pp[q2*3+1]=Math.random()*14;pp[q2*3+2]=(Math.random()-.5)*160}
 var dg=new THREE.BufferGeometry();dg.setAttribute("position",new THREE.BufferAttribute(pp,3));var dust=new THREE.Points(dg,new THREE.PointsMaterial({color:0xf3c19a,size:0.25,transparent:true,opacity:.6}));dust.userData.dyn=true;scene.add(dust);
 animated.push(function(t){dust.position.x=((t*0.002)%40)-20;dust.position.z=Math.sin(t*0.0002)*6});
 [[0.9,"#a1887f",[-240,160,-380]],[0.6,"#8d6e63",[200,120,-300]]].forEach(function(mo){var s3=new THREE.Mesh(G.ico,new THREE.MeshBasicMaterial({color:new THREE.Color(mo[1]),fog:false}));s3.scale.setScalar(mo[0]*10);s3.position.set(mo[2][0],mo[2][1],mo[2][2]);s3.userData.dyn=true;scene.add(s3)});
 addRovers(["#eceff1","#ef6c00"]);
 spaceKit({pad:[0,30],board:[-8,-4],shop:[8,-4],facts:[[-22,4],[22,4],[0,-30],[-30,-34]]});
 buildNPCs([
  {n:"Ilmuwan Dewi",x:5,z:-10,ic:"👩‍🔬",o:astro("k2","r_kuncir")},
  {n:"Robo-Mars",x:-12,z:10,ic:"🤖",robot:true,col:"#ef6c00"},
  {n:"Pilot Agus",x:26,z:-6,ic:"👨‍🚀",o:astro("k3","r_jabrik")},
  {n:"Kak Maria",x:-26,z:-20,ic:"🧑‍🚀",o:astro("k4","r_panjang")}]);
 buildBooks([[0,-22],[16,4],[-16,4],[50,10],[-50,-10],[10,52],[-12,-52],[34,-52],[-52,40],[52,-34]],"kristal");
 buildLots()}

/* ---------- gedung mapel berbentuk kubah ---------- */
function makeDome(m,x,z,i){var g=new THREE.Group(),col=m.warna,R=6,base=CUR.z==="mars"?"#efe3da":"#eceff1";
 mesh(cyl(R+0.3,R+0.6,1.2,28),"#78909c",0,0.6,0,g);
 mesh(new THREE.SphereGeometry(R,28,14,0,Math.PI*2,0,Math.PI/2),base,0,1.2,0,g);
 var band=mesh(new THREE.TorusGeometry(R*0.94,0.28,8,40),col,0,3.2,0,g);band.rotation.x=Math.PI/2;
 for(var w=0;w<6;w++){var a=w/6*Math.PI*2+Math.PI/6;if(Math.abs(Math.cos(a))>0.95&&Math.cos(a)>0)continue;var wn=new THREE.Mesh(G.box,MB("#7fd6ff"));wn.scale.set(1,0.6,0.1);wn.position.set(Math.sin(a)*R*0.86,2.2,Math.cos(a)*R*0.86);wn.rotation.y=a;g.add(wn)}
 B(3.8,4.4,3.2,"#cfd8dc",0,2.4,R-0.3,g);B(4.2,0.45,3.4,col,0,4.75,R-0.3,g);B(4.2,0.3,0.3,col,0,0.45,R+1.3,g);
 var portal=new THREE.Mesh(G.plane,new THREE.MeshBasicMaterial({color:new THREE.Color(col).lerp(new THREE.Color("#ffffff"),.35),transparent:true,opacity:.8}));portal.scale.set(2.6,3.5,1);portal.position.set(0,2.15,R+1.33);g.add(portal);
 var glow=new THREE.Mesh(G.plane,new THREE.MeshBasicMaterial({color:new THREE.Color(col),transparent:true,opacity:.35,depthWrite:false}));glow.scale.set(3.4,2.6,1);glow.rotation.x=-Math.PI/2;glow.position.set(0,0.05,R+3);g.add(glow);
 var sign=textPlane([{t:"GEDUNG "+m.nama.toUpperCase(),s:54,y:64,c:"#fff",sh:1}],768,128,6.6,1.1,{bg:col,rad:18});sign.rotation.y=0;sign.position.set(0,5.6,R+1.0);g.add(sign);
 mesh(cyl(0.08,0.08,2,6),"#90a4ae",0,R+2,0,g);var dsh=mesh(new THREE.SphereGeometry(0.9,12,6,0,Math.PI*2,0,Math.PI/2),"#fafafa",0,R+3,0,g);dsh.rotation.x=Math.PI*0.8;
 var lab=schoolLabel(m);lab.position.set(0,R+5,0);g.add(lab);
 g.position.set(x,0,z);g.lookAt(0,0,0);lotGroup.add(g);
 var dl=Math.hypot(x,z)||1,dx=-x/dl,dz=-z/dl;
 LOTCIRC.push({x:x,z:z,r:R+0.5},{x:x+dx*(R+0.4),z:z+dz*(R+0.4),r:2.1});
 INTER.push({type:"door",m:m,x:x+dx*(R+3.4),z:z+dz*(R+3.4),r:2.6,label:"Masuk Gedung "+m.nama,ox:dx,oz:dz});
 schools.push({m:m,g:g,label:lab,portal:portal,glow:glow,i:i,ly:R+5})}
function buildSpaceLots(){
 if(lotGroup){scene.remove(lotGroup);lotGroup.traverse(function(o){if(o.material&&o.material.map)o.material.map.dispose()})}
 lotGroup=new THREE.Group();lotGroup.userData.dyn=true;scene.add(lotGroup);LOTCOL=[];LOTCIRC=[];schools=[];
 INTER=INTER.filter(function(x){return x.type!=="door"});
 zoneMapel(CUR.z).forEach(function(m,i){var p=DOME_POS[i%4];if(CUR.w==="angkasa")makeDome(m,p[0],p[1],i);else makeGedung(m,p[0],p[1],i)});
 bake(lotGroup);drawMinimapBase()}

/* =================================================================
   DUNIA BARU: Samudra, Rimba, Nusantara, Mancanegara
   ================================================================= */
G.hip=flatGeo(new THREE.ConeGeometry(Math.SQRT2,1,4).rotateY(Math.PI/4));
G.mans=flatGeo(new THREE.CylinderGeometry(0.72*Math.SQRT2,Math.SQRT2,1,4).rotateY(Math.PI/4));
G.hemi=new THREE.SphereGeometry(1,16,8,0,Math.PI*2,0,Math.PI/2);
function E(top,bot,fog,near,far,hs,hg,hi,sc,si,x){var o={top:top,bot:bot,fog:fog,near:near,far:far,hs:hs,hg:hg,hi:hi,sc:sc,si:si,disc:0xfff6c8,stars:false};for(var k in x||{})o[k]=x[k];return o}
Object.assign(ENVS,{
 karang:E(0x63d6f2,0x0e6a8f,0x1b8db0,18,125,0xc8f7ff,0x2a6a7a,.72,0xfff4e0,.75,{nodisc:true}),
 kapal:E(0x2f8fb8,0x06304a,0x0f5878,14,100,0xa6def0,0x1c3f4f,.72,0xcdeffa,.6,{nodisc:true}),
 palung:E(0x0a2a44,0x01060d,0x03141f,8,72,0x6688bb,0x0a1420,.5,0x88aaff,.35,{nodisc:true}),
 hutan:E(0x5aa9d6,0xd8f0d0,0xb9d9b2,40,210,0xf0fff0,0x3d6b35,.78,0xfff4d6,.85),
 airterjun:E(0x4a9be0,0xdff4ff,0xd4ecf4,60,270,0xf4fbff,0x4f7a45,.78,0xfff6e0,.9),
 komodo:E(0x3b8fe0,0xf6e7c1,0xf0dfb8,80,330,0xfff8e8,0x9a7a40,.75,0xffeac2,1),
 flores:E(0x3d8fe0,0xd4ecff,0xc8e2f2,70,310,0xffffff,0x5a8a4a,.75,0xfff4e0,.9),
 bali:E(0x3b7fd0,0xffdcb0,0xf5d8b6,70,310,0xfff3e3,0x6b8a4a,.75,0xffe2b8,.95),
 toraja:E(0x5b8fc8,0xe0ecf2,0xcfdde6,50,250,0xf5f9ff,0x4f7a45,.75,0xfff4e0,.85),
 jepang:E(0x7fb6f0,0xffe6ee,0xf5e1ea,80,340,0xffffff,0x6b9a5c,.78,0xfff4ea,.9),
 mesir:E(0x2f80e0,0xf7e2b0,0xf0d9a5,110,560,0xfff8ea,0xa88a50,.62,0xfff0d0,.95),
 paris:E(0x6a9fd8,0xf3e3d3,0xe5dcd2,70,300,0xffffff,0x7a7a70,.75,0xfff2e2,.9)});

var KOL={buku:{nama:"Buku Ilmu",ic:"📖"},kristal:{nama:"Kristal Bintang",ic:"💎"},mutiara:{nama:"Mutiara",ic:"🦪"},daun:{nama:"Daun Emas",ic:"🍃"},wastra:{nama:"Kain Tenun",ic:"🧶"},prangko:{nama:"Perangko Dunia",ic:"✉️"}};
function kolN(k){if(k==="kristal")return P.stats.kristal||0;if(k==="buku")return P.stats.books||0;return(P.stats.kol||{})[k]||0}
function kolAdd(k){if(k==="kristal")P.stats.kristal=(P.stats.kristal||0)+1;else if(k==="buku")P.stats.books++;else{P.stats.kol=P.stats.kol||{};P.stats.kol[k]=(P.stats.kol[k]||0)+1}return kolN(k)}

/* ---------- kendaraan antarwilayah ---------- */
function kapalSelam(){var g=new THREE.Group();var b=mesh(cyl(1.3,1.3,6,16),"#facc15",0,2.1,0,g);b.rotation.z=Math.PI/2;[-3,3].forEach(function(x){var s=mesh(G.sph,"#facc15",x,2.1,0,g);s.scale.setScalar(1.3)});
 B(1.8,1.4,1.2,"#f59e0b",0.4,3.7,0,g);mesh(cyl(0.1,0.1,1.4,6),"#475569",0.9,4.9,0,g);B(0.5,0.16,0.16,"#475569",1.1,5.55,0,g);
 [-1.4,0,1.4].forEach(function(x){[-1,1].forEach(function(s){var w=mesh(cyl(0.34,0.34,0.12,12),MB("#7fd6ff"),x,2.25,s*1.28,g);w.rotation.x=Math.PI/2})});
 B(0.15,1.8,0.3,"#475569",-4.35,2.1,0,g);B(0.15,0.3,1.8,"#475569",-4.35,2.1,0,g);B(1,0.12,2.6,"#f59e0b",-3.4,2.1,0,g);
 B(0.6,0.9,2.6,"#475569",-1.8,0.45,0,g);B(0.6,0.9,2.6,"#475569",1.8,0.45,0,g);return g}
function jipRanger(){var g=new THREE.Group();B(3.8,1,2,"#4d7c0f",0,1.15,0,g);B(1.5,0.6,1.9,"#4d7c0f",1.15,1.85,0,g);B(0.1,0.8,1.8,"#7fd6ff",0.45,2.1,0,g);
 [[-1.6,-0.9],[-1.6,0.9],[0.4,-0.9],[0.4,0.9]].forEach(function(p){B(0.1,1.2,0.1,"#365314",p[0],2.2,p[1],g)});B(2.2,0.1,2,"#365314",-0.6,2.8,0,g);
 var sp=mesh(G.wheel,"#262626",-2.05,1.4,0,g);sp.rotation.z=Math.PI/2;B(0.5,0.3,2.1,"#262626",1.95,0.85,0,g);
 [-1.2,1.2].forEach(function(x){[-1.05,1.05].forEach(function(z){var w=mesh(G.wheel,"#262626",x,0.5,z,g);w.rotation.x=Math.PI/2})});
 var tx=textPlane([{t:"RANGER",s:56,y:40,c:"#fff"}],256,80,1.6,0.5,{bg:"#365314",rad:10});tx.position.set(0,1.2,1.02);tx.rotation.y=0;g.add(tx);return g}
function triSail(w,h,col){var s=new THREE.Shape();s.moveTo(0,0);s.lineTo(w,0);s.lineTo(0,h);s.lineTo(0,0);return new THREE.Mesh(new THREE.ShapeGeometry(s),new THREE.MeshLambertMaterial({color:new THREE.Color(col||"#f5f0e1"),side:THREE.DoubleSide}))}
function pinisi(){var g=new THREE.Group();B(8,1.3,2.6,"#7c4a24",0,0.65,0,g);var bw=B(2.4,1,2.2,"#7c4a24",4.3,1.15,0,g);bw.rotation.z=0.35;B(8.2,0.16,2.5,"#c8a372",0,1.36,0,g);
 B(2.2,1.4,2.3,"#a0703f",-3,2.1,0,g);B(2.6,0.2,2.6,"#7c4a24",-3,2.9,0,g);B(8,0.12,0.12,"#e2c38b",0,1.7,1.3,g);B(8,0.12,0.12,"#e2c38b",0,1.7,-1.3,g);
 mesh(cyl(0.12,0.16,9,8),"#5d4037",1.4,5.8,0,g);mesh(cyl(0.12,0.16,8,8),"#5d4037",-1.2,5.3,0,g);var bs=mesh(cyl(0.07,0.09,3.4,6),"#5d4037",6,2.1,0,g);bs.rotation.z=Math.PI/2-0.3;
 [[1.4,1.7,2.6,4.4],[-1.2,1.7,2.4,4.0],[1.4,6.3,1.8,2.8],[-1.2,5.9,1.6,2.4]].forEach(function(s){var sl=triSail(s[2],s[3]);sl.position.set(s[0]-0.1,s[1],0);sl.scale.x=-1;g.add(sl)});
 [[4.6,6.6],[3.6,5.2],[2.6,3.8]].forEach(function(s,i){var sl=triSail(s[0],s[1]);sl.position.set(1.6,1.8,0.04*(i+1));g.add(sl)});
 var fl=B(0.8,0.5,0.04,"#e53935",1.8,10.4,0,g);B(0.8,0.25,0.05,"#fafafa",1.8,10.15,0,g);return g}
function pesawat(){var g=new THREE.Group();var f=mesh(cyl(0.95,0.95,9,14),"#f8fafc",0,2.2,0,g);f.rotation.z=Math.PI/2;var n=mesh(G.sph,"#f8fafc",4.5,2.2,0,g);n.scale.set(1.6,0.95,0.95);
 var t=mesh(G.pine,"#f8fafc",-5.4,2.4,0,g);t.scale.set(0.95,1.8,0.95);t.rotation.z=Math.PI/2;B(1.8,2.2,0.15,"#2563eb",-5,3.6,0,g);B(1.4,0.12,3.6,"#e5e7eb",-5,2.6,0,g);
 B(2.4,0.16,11,"#e5e7eb",0.3,1.8,0,g);[-2.8,2.8].forEach(function(z){var e=mesh(cyl(0.45,0.45,1.6,12),"#94a3b8",0.8,1.25,z,g);e.rotation.z=Math.PI/2});
 B(6.5,0.32,1.94,"#1e3a8a",0.6,2.65,0,g);B(9,0.18,1.93,"#2563eb",0,1.75,0,g);B(1,0.5,1.7,"#1e293b",4.6,2.7,0,g);
 [[3,0],[-1,-1],[-1,1]].forEach(function(p){mesh(cyl(0.08,0.08,1,6),"#475569",p[0],0.8,p[1],g);var w=mesh(cyl(0.3,0.3,0.2,10),"#1f2937",p[0],0.3,p[1],g);w.rotation.x=Math.PI/2});return g}
function rocketVeh(){return rocketModel()}

var WDEF={
 angkasa:{nama:"Angkasa",ic:"🚀",peta:"🪐 Peta Tata Surya",mut:"Pilih wilayah tujuan roketmu. Gedung mapel tersebar di setiap wilayah, dan gravitasinya berbeda-beda.",go:"🚀 Terbang ke sini",tv:"🚀 Meluncur ke ",kol:"kristal",zones:["orbit","bulan","mars"],veh:rocketVeh,pl:"🚀 LANDASAN ROKET",pc:"#1e3a8a",naik:"Naik Roket (pindah wilayah)",tech:true,fc:["#4c1d95","#7c3aed"],sc:"#22d3ee"},
 samudra:{nama:"Samudra",ic:"🐠",peta:"🌊 Peta Samudra",mut:"Pilih tujuan kapal selammu. Di dalam air kamu bisa berenang: ketuk tombol lompat berkali-kali untuk naik.",go:"🤿 Menyelam ke sini",tv:"🤿 Menyelam ke ",kol:"mutiara",zones:["karang","kapal","palung"],veh:kapalSelam,pl:"🚢 DERMAGA KAPAL SELAM",pc:"#0e7490",naik:"Naik Kapal Selam (pindah wilayah)",tech:true,fc:["#0c4a6e","#0284c7"],sc:"#22d3ee",pad:"#64748b"},
 rimba:{nama:"Rimba",ic:"🌳",peta:"🗺️ Peta Rimba",mut:"Pilih tujuan jip rangermu. Kenali tumbuhan dan satwa khas Indonesia di setiap wilayah.",go:"🚙 Jelajahi",tv:"🚙 Menuju ",kol:"daun",zones:["hutan","airterjun","komodo"],veh:jipRanger,pl:"🚙 POS JIP RANGER",pc:"#365314",naik:"Naik Jip Ranger (pindah wilayah)",fc:["#14532d","#16a34a"],sc:"#16a34a",pad:"#8d6e4a"},
 nusantara:{nama:"Nusantara",ic:"🏝️",peta:"🧭 Peta Nusantara",mut:"Berlayar dengan kapal pinisi ke berbagai daerah Indonesia. Kenali rumah adat dan budayanya.",go:"⛵ Berlayar ke sini",tv:"⛵ Berlayar ke ",kol:"wastra",zones:["flores","bali","toraja"],veh:pinisi,pl:"⛵ DERMAGA PINISI",pc:"#9a3412",naik:"Naik Kapal Pinisi (pindah wilayah)",fc:["#7c2d12","#ea580c"],sc:"#ea580c",padWater:true},
 mancanegara:{nama:"Mancanegara",ic:"🌏",peta:"✈️ Peta Dunia",mut:"Terbang ke negara lain dan kenali bangunan terkenal serta budayanya.",go:"✈️ Terbang ke sini",tv:"✈️ Terbang ke ",kol:"prangko",zones:["jepang","mesir","paris"],veh:pesawat,pl:"✈️ BANDARA MINI",pc:"#1d4ed8",naik:"Naik Pesawat (pindah wilayah)",fc:["#78350f","#d97706"],sc:"#d97706",pad:"#475569"}};
ZONES.orbit.w=ZONES.bulan.w=ZONES.mars.w="angkasa";
ZONES.orbit.mm=["#0b1026","#585f7a"];ZONES.bulan.mm=["#2a2a30","#8e8e96"];ZONES.mars.mm=["#6b2e1a","#c8693d"];
ZONES.orbit.hello="Gedung mapel ada di dalam kubah.";ZONES.bulan.hello="Coba lompat, gravitasinya rendah!";ZONES.mars.hello="Gravitasi Mars sekitar 38% Bumi.";
function ZD(w,nama,ic,desc,bg,mm,hello,build,x){var o={w:w,nama:nama,ic:ic,desc:desc,bg:bg,mm:mm,hello:hello,build:build,g:30,jv:10.5,r:66,bound:72,spawn:[0,0,-15]};for(var k in x||{})o[k]=x[k];return o}
var SWIM={g:7,jv:6,swim:true};
Object.assign(ZONES,{
 karang:ZD("samudra","Terumbu Karang","🪸","Laut dangkal penuh karang warna-warni, ikan badut, dan penyu.","linear-gradient(135deg,#22d3ee,#0e7490)",["#0e5f7a","#d9c9a0"],"Ketuk tombol RENANG (atau Spasi) berkali-kali untuk naik!",function(){buildKarang()},SWIM),
 kapal:ZD("samudra","Kapal Karam","⚓","Bangkai kapal tua yang kini menjadi rumah bagi karang dan ikan.","linear-gradient(135deg,#0284c7,#0c4a6e)",["#083a52","#b8a882"],"Bangkai kapal ada di sisi barat. Hati-hati, airnya lebih gelap.",function(){buildKapal()},SWIM),
 palung:ZD("samudra","Palung Laut Dalam","🦑","Laut terdalam yang gelap gulita. Hewan-hewannya bercahaya sendiri!","linear-gradient(135deg,#1e3a8a,#020617)",["#020c14","#22324a"],"Di sini gelap. Ikuti cahaya hewan-hewan laut dalam!",function(){buildPalung()},SWIM),
 hutan:ZD("rimba","Hutan Tropis","🌴","Hutan hujan lebat dengan pohon raksasa, bunga rafflesia, dan burung rangkong.","linear-gradient(135deg,#22c55e,#14532d)",["#1f4d1c","#3f7a35"],"Cari bunga rafflesia, bunga terbesar di dunia!",function(){buildHutan()}),
 airterjun:ZD("rimba","Air Terjun","💦","Air terjun tinggi, kolam jernih, dan pelangi di antara tebing.","linear-gradient(135deg,#38bdf8,#166534)",["#244f2a","#4e8a45"],"Air terjun ada di utara. Lihat pelanginya!",function(){buildAirTerjun()}),
 komodo:ZD("rimba","Pulau Komodo","🦎","Padang sabana tempat tinggal komodo, kadal terbesar di dunia.","linear-gradient(135deg,#eab308,#7c2d12)",["#7a6531","#c9a959"],"Komodo itu satwa liar. Amati dari jarak aman, ya!",function(){buildKomodo()}),
 flores:ZD("nusantara","Flores","🌋","Danau tiga warna Kelimutu, rumah kerucut Mbaru Niang, dan sawah lingko.","linear-gradient(135deg,#16a34a,#0f766e)",["#2f5d2a","#5b8f4a"],"Kunjungi Danau Kelimutu tiga warna dan sawah lingko.",function(){buildFlores()}),
 bali:ZD("nusantara","Bali","🛕","Pura bertingkat, candi bentar, penjor, dan pantai berpasir putih.","linear-gradient(135deg,#f97316,#be123c)",["#4d6b30","#7a9a4a"],"Om Swastiastu! Lihat candi bentar dan pura bertingkat.",function(){buildBali()}),
 toraja:ZD("nusantara","Toraja","🏘️","Rumah adat tongkonan beratap perahu di pegunungan Sulawesi Selatan.","linear-gradient(135deg,#b91c1c,#422006)",["#3b5d2e","#5f8a45"],"Lihat deretan tongkonan dan lumbung alang di utara.",function(){buildToraja()}),
 jepang:ZD("mancanegara","Jepang","🗾","Gunung Fuji, pohon sakura, pagoda, dan kereta cepat Shinkansen.","linear-gradient(135deg,#f472b6,#be123c)",["#557a4a","#8fb27a"],"Konnichiwa! Lihat Gunung Fuji di kejauhan.",function(){buildJepang()}),
 mesir:ZD("mancanegara","Mesir","🐫","Piramida Giza, Sphinx, Sungai Nil, dan kafilah unta.","linear-gradient(135deg,#f59e0b,#78350f)",["#a07a3a","#e2c58b"],"Ahlan wa sahlan! Piramida terlihat di selatan.",function(){buildMesir()}),
 paris:ZD("mancanegara","Paris","🗼","Menara Eiffel, Arc de Triomphe, dan kafe di tepi jalan.","linear-gradient(135deg,#60a5fa,#1e3a8a)",["#5f6670","#b5aea3"],"Bonjour! Menara Eiffel ada di depanmu.",function(){buildParis()})});

Object.assign(FACTS,{
 karang:["Indonesia berada di Segitiga Terumbu Karang (Coral Triangle), wilayah laut yang memiliki jenis karang paling banyak di dunia.",
  "Karang sebenarnya adalah kumpulan hewan kecil bernama polip. Warnanya berasal dari alga kecil yang hidup di dalam tubuhnya dan membantu menyediakan makanan.",
  "Ikan badut hidup di antara tentakel anemon laut. Lapisan lendir di tubuhnya melindunginya dari sengatan anemon.",
  "Penyu laut bisa hidup puluhan tahun. Penyu betina biasanya kembali bertelur di pantai tempat ia dulu menetas."],
 kapal:["Benda terasa lebih ringan di dalam air karena ada gaya angkat ke atas yang disebut gaya apung. Prinsip ini dikenal sebagai Hukum Archimedes.",
  "Kapal selam bisa menyelam dan naik dengan mengatur isi tangki pemberatnya. Saat tangki diisi air, kapal selam tenggelam; saat air dipompa keluar dan diganti udara, kapal selam naik.",
  "Bangkai kapal lama-lama bisa menjadi terumbu karang buatan karena karang dan hewan laut menempel di badannya. Contohnya bangkai kapal USAT Liberty di Tulamben, Bali.",
  "Air laut terasa asin karena mengandung garam terlarut, sebagian besar natrium klorida, yang terbawa dari batuan di daratan oleh sungai selama jutaan tahun."],
 palung:["Palung Mariana di Samudra Pasifik adalah bagian laut terdalam di dunia. Kedalamannya hampir 11.000 meter.",
  "Semakin dalam, cahaya matahari semakin sedikit. Di bawah sekitar 1.000 meter laut benar-benar gelap, sehingga banyak hewan membuat cahayanya sendiri. Kemampuan ini disebut bioluminesensi.",
  "Tekanan air bertambah besar semakin dalam kita menyelam. Setiap turun sekitar 10 meter, tekanannya bertambah kira-kira sebesar tekanan udara di permukaan laut (1 atmosfer).",
  "Di dasar laut dalam ada cerobong hidrotermal yang menyemburkan air panas kaya mineral. Di sekitarnya hidup cacing tabung dan bakteri yang tidak memerlukan cahaya matahari."],
 hutan:["Hutan hujan tropis Indonesia termasuk yang terluas di dunia dan menjadi rumah bagi orangutan, harimau sumatra, dan burung rangkong.",
  "Rafflesia arnoldii yang tumbuh di hutan Sumatra adalah bunga tunggal terbesar di dunia. Diameternya bisa mencapai sekitar 1 meter.",
  "Tumbuhan hijau membuat makanannya sendiri melalui fotosintesis: memakai cahaya matahari, air, dan karbon dioksida, lalu melepaskan oksigen.",
  "Burung cenderawasih dari Papua dijuluki 'burung surga' karena bulunya sangat indah. Burung jantan menari untuk menarik perhatian betina."],
 airterjun:["Air terjun bisa dimanfaatkan untuk Pembangkit Listrik Tenaga Air (PLTA). Energi gerak air yang jatuh memutar turbin yang menghasilkan listrik.",
  "Siklus air: air menguap karena panas matahari, mengembun menjadi awan, lalu turun sebagai hujan dan mengalir kembali ke sungai dan laut.",
  "Akar pohon di hutan membantu menyerap air hujan dan menahan tanah, sehingga mencegah banjir dan tanah longsor.",
  "Pelangi dapat terlihat di dekat air terjun karena cahaya matahari dibiaskan dan dipantulkan oleh butiran air, lalu terurai menjadi berbagai warna."],
 komodo:["Komodo (Varanus komodoensis) adalah kadal terbesar di dunia. Panjangnya bisa mencapai sekitar 3 meter.",
  "Di alam liar, komodo hanya hidup di beberapa pulau di Nusa Tenggara Timur, seperti Pulau Komodo, Pulau Rinca, dan bagian barat Pulau Flores.",
  "Taman Nasional Komodo ditetapkan sebagai Situs Warisan Dunia UNESCO pada tahun 1991.",
  "Pantai Merah Muda di kawasan Komodo berwarna merah muda karena pasirnya bercampur pecahan cangkang hewan laut kecil berwarna merah bernama foraminifera."],
 flores:["Danau Kelimutu di Kabupaten Ende memiliki tiga danau kawah yang warnanya bisa berubah-ubah, misalnya dari hijau toska menjadi cokelat atau hitam.",
  "Mbaru Niang adalah rumah adat berbentuk kerucut di Kampung Wae Rebo, Manggarai. Rumah ini bertingkat lima dan pada tahun 2012 mendapat penghargaan pelestarian budaya dari UNESCO.",
  "Sawah lingko di Manggarai berbentuk seperti jaring laba-laba. Pembagian petaknya dari titik tengah mengikuti aturan adat pembagian tanah.",
  "Tenun ikat adalah kain tradisional NTT. Motifnya dibuat dengan mengikat benang sebelum dicelup pewarna, lalu ditenun."],
 bali:["Subak adalah sistem pengairan sawah tradisional Bali yang diatur bersama oleh para petani. Subak diakui UNESCO sebagai Warisan Budaya Dunia pada tahun 2012.",
  "Candi bentar adalah gapura terbelah dua yang sering menjadi pintu masuk pura dan bangunan di Bali.",
  "Penjor adalah hiasan bambu melengkung yang dipasang di depan rumah saat hari raya Galungan dan Kuningan.",
  "Tari Kecak dibawakan oleh puluhan penari laki-laki yang duduk melingkar sambil menyerukan 'cak-cak-cak' tanpa iringan gamelan."],
 toraja:["Tongkonan adalah rumah adat Toraja di Sulawesi Selatan. Atapnya melengkung seperti perahu, dan rumah ini biasanya dibangun menghadap ke utara.",
  "Di depan tongkonan sering dipasang deretan tanduk kerbau. Banyaknya tanduk menunjukkan banyaknya upacara adat yang pernah diadakan keluarga pemiliknya.",
  "Alang adalah lumbung padi khas Toraja. Bentuknya mirip tongkonan tetapi lebih kecil, dan biasanya berdiri berhadapan dengan tongkonan.",
  "Ukiran Toraja umumnya berwarna merah, hitam, kuning, dan putih. Setiap motif ukiran memiliki nama dan makna tersendiri."],
 jepang:["Gunung Fuji adalah gunung tertinggi di Jepang, tingginya sekitar 3.776 meter. Gunung ini adalah gunung berapi yang masih aktif.",
  "Bunga sakura mekar pada musim semi, sekitar bulan Maret sampai April. Orang Jepang biasa berpiknik di bawah pohon sakura; tradisi ini disebut hanami.",
  "Kereta cepat Shinkansen mulai beroperasi pada tahun 1964. Kini sebagian keretanya bisa melaju lebih dari 300 km per jam.",
  "Jepang sering mengalami gempa bumi karena berada di pertemuan beberapa lempeng tektonik, sama seperti Indonesia yang berada di Cincin Api Pasifik."],
 mesir:["Piramida Agung Giza dibangun sekitar 4.500 tahun lalu sebagai makam Firaun Khufu. Inilah satu-satunya dari Tujuh Keajaiban Dunia Kuno yang masih berdiri.",
  "Sungai Nil termasuk sungai terpanjang di dunia, panjangnya sekitar 6.650 km. Sejak dahulu, banjir tahunan Sungai Nil menyuburkan lahan pertanian di Mesir.",
  "Bangsa Mesir kuno menulis dengan hieroglif, yaitu tulisan berupa gambar. Mereka juga membuat kertas dari tanaman papirus.",
  "Sphinx Agung Giza adalah patung berbadan singa dan berkepala manusia yang dipahat langsung dari batu kapur."],
 paris:["Menara Eiffel dibangun untuk Pameran Dunia tahun 1889. Tingginya sekitar 330 meter, dan dulu menjadi bangunan tertinggi di dunia.",
  "Menara Eiffel terbuat dari besi. Pada musim panas besinya memuai, sehingga puncaknya bisa bergeser dan tingginya bertambah sekitar 15 cm.",
  "Museum Louvre di Paris adalah salah satu museum terbesar di dunia. Di sana tersimpan lukisan Mona Lisa karya Leonardo da Vinci.",
  "Prancis terkenal dengan roti panjang bernama baguette. Pada tahun 2022, keahlian dan budaya membuat baguette diakui UNESCO sebagai Warisan Budaya Takbenda."]});

/* ---------- misi tiap dunia ---------- */
function worldFacts(w){var zs=WDEF[w].zones;return Object.keys(P.stats.facts||{}).filter(function(k){return zs.indexOf(k.split(":")[0])>=0}).length}
function worldZones(w){return WDEF[w].zones.filter(function(z){return(P.stats.zones||{})[z]}).length}
function seen(w){return!!(P.stats.worlds&&P.stats.worlds[w])}
(function(){var M2=[];
 [["samudra","🦪","Pemburu Mutiara","Kumpulkan 10 Mutiara di dunia Samudra","🐠","Penjelajah Samudra","Kunjungi Terumbu Karang, Kapal Karam, dan Palung Laut","🔬","Ahli Kelautan"],
  ["rimba","🍃","Pengumpul Daun Emas","Kumpulkan 10 Daun Emas di dunia Rimba","🌳","Penjelajah Rimba","Kunjungi Hutan Tropis, Air Terjun, dan Pulau Komodo","🦎","Sahabat Satwa"],
  ["nusantara","🧶","Kolektor Tenun","Kumpulkan 10 Kain Tenun di dunia Nusantara","🏝️","Keliling Nusantara","Kunjungi Flores, Bali, dan Toraja","🏛️","Duta Budaya"],
  ["mancanegara","✉️","Filatelis Cilik","Kumpulkan 10 Perangko Dunia di dunia Mancanegara","🌏","Keliling Dunia","Kunjungi Jepang, Mesir, dan Paris","🗺️","Warga Dunia"]].forEach(function(d){var w=d[0],h=function(){return!seen(w)};
  M2.push({id:"w_"+w+"_k",ic:d[1],nama:d[2],desc:d[3],target:function(){return 10},get:function(){return kolN(WDEF[w].kol)},reward:100,hide:h},
   {id:"w_"+w+"_z",ic:d[4],nama:d[5],desc:d[6],target:function(){return 3},get:function(){return worldZones(w)},reward:200,hide:h},
   {id:"w_"+w+"_f",ic:d[7],nama:d[8],desc:"Baca 6 papan \"Tahukah kamu?\" di dunia "+WDEF[w].nama,target:function(){return 6},get:function(){return worldFacts(w)},reward:120,hide:h})});
 var di=MISSIONS.length-1;Array.prototype.splice.apply(MISSIONS,[di,0].concat(M2))})();

/* ---------- pakaian NPC ---------- */
function OF(k,r,topi,atasan,bawahan,x){var o={kulit:k,rambut:r,wrambut:"w1",topi:topi||"t0",atasan:atasan||"a_kb",bawahan:bawahan||"b6",wajah:"f0",leher:"l0",punggung:"p0"};for(var q in x||{})o[q]=x[q];return o}
function diver(k,r){return OF(k,r,"t_selam","a_selam","b6",{punggung:"p_tabung"})}
function ranger(k,r){return OF(k,r,"t_ranger","a_ranger","b4",{punggung:"p_tas",leher:"l_teropong"})}
var NPC_SPOTS=[[5,-10],[-12,10],[26,-6],[-26,-20]];
function npcs4(list){buildNPCs(list.map(function(d,i){d.x=NPC_SPOTS[i][0];d.z=NPC_SPOTS[i][1];return d}))}
var BK_STD=[[0,-22],[16,4],[-16,4],[50,10],[-50,-10],[10,52],[-12,-52],[34,-52],[-52,30],[52,-34],[28,-28],[-28,28]];
function bkFree(res){return BK_STD.filter(function(p){return(res||[]).every(function(c){return Math.hypot(p[0]-c[0],p[1]-c[1])>c[2]})}).slice(0,10)}
var KIT={pad:[0,30],board:[-8,-4],shop:[8,-4],facts:[[-22,4],[22,4],[0,-30],[-30,-34]]};

/* ---------- pembantu umum ---------- */
function W_ground(col,specks,rep){var gr=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshLambertMaterial({map:noiseTex(col,specks,rep||50,1500)}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;scene.add(gr);return gr}
function W_mounts(cols,n,r0,r1,h0,h1,snow){for(var i=0;i<n;i++){var a=i/n*Math.PI*2+rnd()*.3,r=r0+rnd()*(r1-r0),h=h0+rnd()*(h1-h0),w=Math.min(h*(0.8+rnd()*.5),r-95);var m=mesh(G.mount,cols[i%cols.length],Math.sin(a)*r,h/2,Math.cos(a)*r,scene,false);m.scale.set(w,h,w);
 if(snow){var c=mesh(G.mount,snow,Math.sin(a)*r,h-h*0.11,Math.cos(a)*r,scene,false);c.scale.set(w*0.24,h*0.22,w*0.24)}}}
function W_scatter(n,rmin,rmax,res,fn){var made=0,t=0;while(made<n&&t<n*25){t++;var a=rnd()*Math.PI*2,d=rmin+rnd()*(rmax-rmin),x=Math.sin(a)*d,z=Math.cos(a)*d;if(d<70&&!okSpot(x,z,res))continue;fn(x,z,d,made);made++}}
function W_plane(col,w,d,x,z,y,op){var m=new THREE.Mesh(new THREE.PlaneGeometry(w,d),op?new THREE.MeshLambertMaterial({color:new THREE.Color(col),transparent:true,opacity:op}):M(col));m.rotation.x=-Math.PI/2;m.position.set(x,y||0.04,z);m.receiveShadow=true;scene.add(m);return m}
function W_disc(col,r,x,z,y,op){var m=new THREE.Mesh(new THREE.CircleGeometry(r,32),op?new THREE.MeshLambertMaterial({color:new THREE.Color(col),transparent:true,opacity:op}):M(col));m.rotation.x=-Math.PI/2;m.position.set(x,y||0.05,z);m.receiveShadow=true;scene.add(m);return m}
function rock(x,z,s,col,par,circ){var r=mesh(G.ico,col||"#8d8d8d",x,s*0.35,z,par||scene);r.scale.set(s,s*0.7,s*1.1);r.rotation.y=rnd()*3;if(circ!==false)CIRC.push({x:x,z:z,r:s*0.9});return r}
/* letakkan grup menghadap pusat; tambahkan lingkaran tabrakan lokal [lx,lz,r] */
function placeFacing(g,x,z,circs,par){g.position.set(x,0,z);g.lookAt(0,0,0);(par||scene).add(g);var d=Math.hypot(x,z)||1,dx=-x/d,dz=-z/d;
 (circs||[]).forEach(function(c){CIRC.push({x:x+c[0]*dz+c[1]*dx,z:z-c[0]*dx+c[1]*dz,r:c[2]})});return g}
function strut(x1,y1,z1,x2,y2,z2,r1,r2,col,par){var dx=x2-x1,dy=y2-y1,dz=z2-z1,L=Math.hypot(dx,dy,dz);var m=mesh(new THREE.CylinderGeometry(r2,r1,L,4),col,(x1+x2)/2,(y1+y2)/2,(z1+z2)/2,par);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),new THREE.Vector3(dx/L,dy/L,dz/L));return m}
function walkers(models,R,speed){models.forEach(function(g,i){g.userData.dyn=true;g.userData.quiet=true;scene.add(g);var c={g:g,route:route(R,i%2===0),seg:i%4,t:i*9%20,speed:speed*(0.8+0.15*i),v:0,honkT:0,block:0};cars.push(c);placeCar(c,0)})}

/* ---------- laut ---------- */
var CORAL_C=["#ff6f61","#ff9f43","#f368e0","#feca57","#a29bfe","#ff7aa2","#48dbfb","#1dd1a1"];
function coral(x,z,s,glow){var g=new THREE.Group(),c=CORAL_C[Math.floor(rnd()*CORAL_C.length)],t=Math.floor(rnd()*4),mt=glow?MB(c):c;
 if(t===0){for(var i=0;i<5;i++){var b=mesh(cyl(0.12,0.2,1.6,5),mt,(rnd()-.5)*.6,0.7,(rnd()-.5)*.6,g);b.rotation.z=(rnd()-.5)*1.1;b.rotation.x=(rnd()-.5)*1.1}}
 else if(t===1){var h=mesh(G.hemi,mt,0,0,0,g);h.scale.set(1.1,0.8,1.1)}
 else if(t===2){var f=B(1.8,1.6,0.08,mt,0,0.9,0,g);f.rotation.y=rnd()*3;B(0.2,0.4,0.2,mt,0,0.1,0,g)}
 else{for(var j=0;j<4;j++){var hh=[0.8,1.2,1.6][j%3];mesh(cyl(0.18,0.22,hh,6),mt,(rnd()-.5)*0.8,hh/2,(rnd()-.5)*0.8,g)}}
 g.scale.setScalar(s);g.position.set(x,0,z);scene.add(g);return g}
function fishMesh(col,s,stripe){var g=new THREE.Group();var b=mesh(G.sph,col,0,0,0,g,false);b.scale.set(0.7,0.42,0.22);var t=mesh(G.pine,col,-0.85,0,0,g,false);t.scale.set(0.34,0.5,0.1);t.rotation.z=-Math.PI/2;
 if(stripe){B(0.12,0.8,0.46,stripe,0.2,0,0,g,false);B(0.1,0.6,0.4,stripe,-0.35,0,0,g,false)}
 [-1,1].forEach(function(sd){var e=mesh(G.sph,"#111",0.45,0.1,sd*0.17,g,false);e.scale.setScalar(0.07)});g.scale.setScalar(s||1);return g}
function W_school(cx,cz,rad,y,n,col,sp,s,stripe){var grp=new THREE.Group();grp.userData.dyn=true;for(var i=0;i<n;i++){var f=fishMesh(col,s,stripe);f.position.set((rnd()-.5)*3.5,(rnd()-.5)*1.8,(rnd()-.5)*3.5);grp.add(f)}scene.add(grp);var off=rnd()*6;
 animated.push(function(t){var a=t*sp+off;grp.position.set(cx+Math.sin(a)*rad,y+Math.sin(t*0.0011+off)*1.2,cz+Math.cos(a)*rad);grp.rotation.y=a+(sp>0?0:Math.PI)});return grp}
function turtle(rad,y,sp,off){var g=new THREE.Group();var sh=mesh(G.sph,"#6b8e23",0,0,0,g,false);sh.scale.set(1.3,0.45,1);var pl=mesh(G.sph,"#4e6b1d",0,0.12,0,g,false);pl.scale.set(1.0,0.38,0.8);
 var hd=mesh(G.sph,"#a3b18a",1.45,0,0,g,false);hd.scale.set(0.4,0.3,0.3);var fl=[];[[0.6,1],[0.6,-1],[-0.8,1],[-0.8,-1]].forEach(function(p){var f=B(0.5,0.08,0.9,"#a3b18a",p[0],0,p[1]*1.1,g,false);fl.push(f)});
 g.userData.dyn=true;scene.add(g);animated.push(function(t){var a=t*sp+off;g.position.set(Math.sin(a)*rad,y+Math.sin(t*0.0008+off)*1.5,Math.cos(a)*rad);g.rotation.y=a;fl.forEach(function(f,i){f.rotation.x=Math.sin(t*0.004+i)*0.5})});return g}
function jelly(x,z,y,col,glow){var g=new THREE.Group();var bell=new THREE.Mesh(G.hemi,glow?new THREE.MeshBasicMaterial({color:new THREE.Color(col),transparent:true,opacity:.8}):new THREE.MeshLambertMaterial({color:new THREE.Color(col),transparent:true,opacity:.6}));bell.scale.set(0.8,0.7,0.8);g.add(bell);
 for(var i=0;i<6;i++){var a=i/6*Math.PI*2,tn=new THREE.Mesh(G.box,glow?MB(col):M(col));tn.scale.set(0.05,1.4,0.05);tn.position.set(Math.sin(a)*0.45,-0.7,Math.cos(a)*0.45);g.add(tn)}
 g.position.set(x,y,z);g.userData.dyn=true;scene.add(g);var off=rnd()*6;animated.push(function(t){g.position.y=y+Math.sin(t*0.0012+off)*1.6;bell.scale.y=0.7+Math.sin(t*0.004+off)*0.12});return g}
var kelps=[];
function kelp(x,z,h){var g=new THREE.Group();for(var i=0;i<h;i++){var l=B(0.35,1,0.1,i%2?"#3f9b4a":"#2e7d32",Math.sin(i*0.7)*0.15,i*0.95+0.5,0,g);l.rotation.y=i*0.6}g.position.set(x,0,z);g.userData.dyn=true;g.userData.off=rnd()*6;scene.add(g);kelps.push(g);return g}
function W_kelpAnim(){var list=kelps.slice();kelps.length=0;animated.push(function(t){for(var i=0;i<list.length;i++){var g=list[i];g.rotation.z=Math.sin(t*0.0012+g.userData.off)*0.12;g.rotation.x=Math.cos(t*0.001+g.userData.off)*0.08}})}
function W_bubbles(n,spread,top,col){var p=new Float32Array(n*3);for(var i=0;i<n;i++){p[i*3]=(Math.random()-.5)*spread;p[i*3+1]=Math.random()*top;p[i*3+2]=(Math.random()-.5)*spread}
 var g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(p,3));var pts=new THREE.Points(g,new THREE.PointsMaterial({color:col||0xe0fbff,size:0.35,transparent:true,opacity:.7}));pts.userData.dyn=true;scene.add(pts);var fr=0;
 animated.push(function(){if((fr++)%2)return;for(var i=0;i<n;i++){p[i*3+1]+=0.06;if(p[i*3+1]>top)p[i*3+1]=0}g.attributes.position.needsUpdate=true});return pts}
function W_seaSurface(y,op){var s=new THREE.Mesh(new THREE.PlaneGeometry(700,700),new THREE.MeshBasicMaterial({color:0xcff8ff,transparent:true,opacity:op||.35,side:THREE.DoubleSide,depthWrite:false}));s.rotation.x=Math.PI/2;s.position.y=y;scene.add(s)}
function W_rays(n){for(var i=0;i<n;i++){var r=new THREE.Mesh(G.plane,new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.07,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending}));r.scale.set(4+rnd()*4,40,1);r.position.set((rnd()-.5)*110,18,(rnd()-.5)*110);r.rotation.set(0.25,rnd()*3,0.15);scene.add(r)}}
function anemone(x,z,col){var g=new THREE.Group();mesh(cyl(0.5,0.6,0.5,10),"#7c3aed",0,0.25,0,g);for(var i=0;i<14;i++){var a=i/14*Math.PI*2,r=0.2+(i%3)*0.12,tn=mesh(G.pine,col||"#c084fc",Math.sin(a)*r,0.8,Math.cos(a)*r,g);tn.scale.set(0.08,0.8,0.08);tn.rotation.set(Math.cos(a)*0.4,0,-Math.sin(a)*0.4)}g.position.set(x,0,z);scene.add(g);CIRC.push({x:x,z:z,r:0.6});return g}
function seaRes(){return resv([[-22,4,5],[22,4,5],[0,-30,5],[-30,-34,5],[0,-15,6]].concat(NPC_SPOTS.map(function(p){return[p[0],p[1],3]})))}

function buildKarang(){setEnv("karang");W_ground("#cbb98c",["rgba(150,130,95,.3)","rgba(235,225,195,.3)"],45);W_seaSurface(34);W_rays(12);
 var res=seaRes();W_scatter(70,6,64,res,function(x,z,d){var s=0.8+rnd()*1.4;coral(x,z,s);if(d<68)CIRC.push({x:x,z:z,r:0.7*s})});
 W_scatter(60,72,180,[],function(x,z){coral(x,z,1.5+rnd()*3)});
 W_scatter(26,8,64,res,function(x,z){kelp(x,z,5+Math.floor(rnd()*6))});W_kelpAnim();
 [[50,-26],[-50,26],[30,-50]].forEach(function(p){if(okSpot(p[0],p[1],res))anemone(p[0],p[1])});
 W_scatter(18,10,64,res,function(x,z){rock(x,z,0.8+rnd()*1.5,"#a8a29e")});
 W_mounts(["#3e7a8a","#2f6a7a","#4a8898"],14,170,230,30,60);
 W_school(0,0,30,6,9,"#fb923c",0.00018,0.8,"#ffffff");W_school(10,-10,44,9,12,"#38bdf8",-0.00014,0.7);W_school(-20,20,22,4,8,"#facc15",0.00022,0.6,"#1e3a8a");W_school(0,0,55,12,14,"#a78bfa",-0.0001,0.6);
 turtle(36,7,0.00009,0);turtle(52,11,-0.00007,2);
 var manta=new THREE.Group();var mb=mesh(G.ico,"#334155",0,0,0,manta,false);mb.scale.set(1.6,0.25,3.2);B(3,0.05,0.12,"#334155",-2.6,0,0,manta,false);manta.userData.dyn=true;scene.add(manta);
 animated.push(function(t){var a=t*0.00006;manta.position.set(Math.sin(a)*60,16,Math.cos(a)*60);manta.rotation.y=a;manta.rotation.z=Math.sin(t*0.002)*0.15});
 W_bubbles(260,120,32);
 spaceKit(KIT);
 npcs4([{n:"Penyelam Dina",ic:"🤿",o:diver("k2","r_panjang")},{n:"Robo-Selam",ic:"🤖",robot:true,col:"#06b6d4"},{n:"Kak Reza",ic:"🤿",o:diver("k3","r_pendek")},{n:"Peneliti Sinta",ic:"👩‍🔬",o:diver("k1","r_kuncir")}]);
 buildBooks(bkFree([]),"mutiara");buildLots()}

function buildKapal(){setEnv("kapal");W_ground("#c9b98f",["rgba(120,110,80,.3)","rgba(230,220,190,.25)"],45);W_seaSurface(40,.25);W_rays(8);
 /* bangkai kapal */
 var sh=new THREE.Group(),wood="#5b4636",dark="#3e2f24";B(24,4,6,wood,0,2,0,sh);B(24.2,0.5,6.2,dark,0,4.1,0,sh);var bw=B(5,4,5,wood,12.5,2.6,0,sh);bw.rotation.z=0.4;B(5,5,5.4,wood,-11,4,0,sh);
 for(var k=-9;k<=9;k+=3)B(0.3,4.2,6.3,dark,k,2.1,0,sh);var m1=mesh(cyl(0.3,0.35,12,8),dark,3,9,0,sh);m1.rotation.z=0.5;var m2=mesh(cyl(0.3,0.35,6,8),dark,-5,6.5,0,sh);m2.rotation.z=-0.2;
 B(5,0.15,0.2,dark,5.5,12.5,0,sh).rotation.z=0.5;for(var c=-6;c<=6;c+=4){var cn=mesh(cyl(0.25,0.3,1.4,8),"#374151",c,3,3.4,sh);cn.rotation.x=Math.PI/2}
 for(var cc=0;cc<16;cc++){var cg=coral(-10+rnd()*20,(rnd()-.5)*5,0.6+rnd()*0.6);cg.position.y=4.3;sh.add(cg)}
 var sx=-54,sz=-14,ang=1.2;sh.position.set(sx,-0.6,sz);sh.rotation.set(0,ang,0.18);scene.add(sh);
 for(var q=-10;q<=10;q+=5){CIRC.push({x:sx+q*Math.cos(ang),z:sz-q*Math.sin(ang),r:3.4})}
 var lb=textPlane([{t:"⚓ BANGKAI KAPAL TUA",s:44,y:64,c:"#fff"}],512,128,5,1.25,{bg:"#0c4a6e",rad:16});var lg=new THREE.Group();lg.add(lb);B(0.2,3,0.2,"#475569",-2,-1.5,0,lg);B(0.2,3,0.2,"#475569",2,-1.5,0,lg);placeFacing(lg,-42,-12,[[0,0,0.6]]);lg.position.y=3;lb.rotation.y=0;
 /* peti harta, jangkar, tong */
 var ch=new THREE.Group();B(1.8,1,1.2,"#7c4a24",0,0.5,0,ch);var lid=B(1.8,0.25,1.2,"#92400e",0,1.15,-0.3,ch);lid.rotation.x=-0.6;B(1.9,0.15,1.25,"#fbbf24",0,0.7,0,ch);var gl=mesh(G.sph,MB("#fde047"),0,1.0,0.1,ch);gl.scale.set(0.7,0.2,0.4);placeFacing(ch,50,22,[[0,0,1.2]]);
 var an=new THREE.Group();mesh(cyl(0.18,0.18,4,8),"#4b5563",0,2,0,an);var ab=mesh(new THREE.TorusGeometry(1.4,0.18,6,16,Math.PI),"#4b5563",0,0.9,0,an);ab.rotation.z=Math.PI;B(2,0.25,0.25,"#4b5563",0,3.4,0,an);var ar=mesh(new THREE.TorusGeometry(0.4,0.1,6,12),"#4b5563",0,4.3,0,an);an.rotation.z=0.5;an.position.set(52,0,-28);scene.add(an);CIRC.push({x:52,z:-28,r:1.5});
 [[48,-20],[55,-36],[-46,40]].forEach(function(p){var b=mesh(cyl(0.6,0.6,1.3,10),"#6b4f35",p[0],0.4,p[1],scene);b.rotation.z=Math.PI/2;b.rotation.y=rnd()*3;CIRC.push({x:p[0],z:p[1],r:0.9})});
 var res=seaRes().concat([[sx,sz,15],[50,22,3],[52,-28,3]]);
 W_scatter(40,6,64,res,function(x,z,d){var s=0.7+rnd()*1.1;coral(x,z,s);if(d<68)CIRC.push({x:x,z:z,r:0.7*s})});W_scatter(30,72,170,[],function(x,z){rock(x,z,2+rnd()*5,"#4b6370",scene,false)});
 W_scatter(20,8,64,res,function(x,z){kelp(x,z,7+Math.floor(rnd()*7))});W_kelpAnim();W_scatter(14,10,64,res,function(x,z){rock(x,z,0.8+rnd()*1.6,"#78716c")});
 W_mounts(["#285a6a","#1f4d5c"],14,160,220,30,60);
 [[30,10,8],[-20,30,10],[20,-40,7],[-35,-5,12],[44,44,9],[-10,-45,6]].forEach(function(p,i){jelly(p[0],p[1],p[2],i%2?"#f9a8d4":"#c4b5fd")});
 W_school(-54,-14,16,7,10,"#fde047",0.0002,0.7);W_school(0,0,48,10,12,"#93c5fd",-0.00012,0.7);W_school(20,20,25,5,8,"#f87171",0.00016,0.8);
 W_bubbles(200,120,38);spaceKit(KIT);
 npcs4([{n:"Kapten Hasan",ic:"🧔",o:diver("k3","r_botak")},{n:"Penyelam Andi",ic:"🤿",o:diver("k4","r_pendek")},{n:"Kak Lia",ic:"🤿",o:diver("k2","r_kuncir")},{n:"Robo-Selam",ic:"🤖",robot:true,col:"#0ea5e9"}]);
 buildBooks(bkFree([[sx,sz,15]]),"mutiara");buildLots()}

function buildPalung(){setEnv("palung");W_ground("#2a3442",["rgba(10,15,25,.4)","rgba(80,100,130,.2)"],40);
 var res=seaRes().concat([[50,-24,4],[54,20,4],[-52,24,4],[-50,-30,4]]);
 for(var i=0;i<22;i++){var a=i/22*Math.PI*2,r=78+rnd()*30,h=40+rnd()*50,cl=mesh(G.ico,["#1e293b","#172033","#243045"][i%3],Math.sin(a)*r,h/2-6,Math.cos(a)*r,scene,false);cl.scale.set(16+rnd()*14,h,16+rnd()*14)}
 [[50,-24],[54,20],[-52,24],[-50,-30]].forEach(function(p){var g=new THREE.Group();mesh(cyl(0.8,1.6,4,8),"#1f2937",0,2,0,g);mesh(cyl(0.6,0.9,2,8),"#111827",0,5,0,g);var hot=mesh(cyl(0.5,0.5,0.2,8),MB("#fb923c"),0,6.05,0,g);
  for(var k=0;k<8;k++){var tw=mesh(cyl(0.12,0.14,1.6,6),"#f1f5f9",Math.sin(k)*2.2,0.8,Math.cos(k)*2.2,g);var tip=mesh(G.sph,MB("#ef4444"),Math.sin(k)*2.2,1.7,Math.cos(k)*2.2,g);tip.scale.setScalar(0.22)}
  g.position.set(p[0],0,p[1]);scene.add(g);CIRC.push({x:p[0],z:p[1],r:1.8});
  var n=60,pp=new Float32Array(n*3);for(var q=0;q<n;q++){pp[q*3]=(Math.random()-.5)*1.4;pp[q*3+1]=Math.random()*16;pp[q*3+2]=(Math.random()-.5)*1.4}var gg=new THREE.BufferGeometry();gg.setAttribute("position",new THREE.BufferAttribute(pp,3));
  var sm=new THREE.Points(gg,new THREE.PointsMaterial({color:0x9ca3af,size:0.6,transparent:true,opacity:.5}));sm.position.set(p[0],6,p[1]);sm.userData.dyn=true;scene.add(sm);var fr=0;
  animated.push(function(){if((fr++)%2)return;for(var q=0;q<n;q++){pp[q*3+1]+=0.08;pp[q*3]+=(Math.random()-.5)*0.05;if(pp[q*3+1]>16){pp[q*3+1]=0;pp[q*3]=(Math.random()-.5)*1.4}}gg.attributes.position.needsUpdate=true})});
 W_scatter(55,6,64,res,function(x,z,d){var s=0.6+rnd()*0.9;coral(x,z,s,true);if(d<68)CIRC.push({x:x,z:z,r:0.6*s})});
 W_scatter(16,10,64,res,function(x,z){rock(x,z,1+rnd()*2,"#334155")});
 [[30,10,8,"#22d3ee"],[-20,30,10,"#a78bfa"],[20,-40,7,"#f472b6"],[-35,-5,12,"#34d399"],[44,44,9,"#60a5fa"],[-10,-45,6,"#fbbf24"],[0,40,14,"#22d3ee"],[-44,-44,10,"#f472b6"]].forEach(function(p){jelly(p[0],p[1],p[2],p[3],true)});
 /* ikan sungut (anglerfish) */
 [[24,6,0.00011],[40,10,-0.00008],[14,4,0.00016]].forEach(function(q,i){var g=new THREE.Group();var b=mesh(G.sph,"#3f3f46",0,0,0,g,false);b.scale.set(1.2,0.9,0.8);for(var t2=0;t2<5;t2++){var th=mesh(G.pine,"#e5e7eb",0.95,-0.25,-0.4+t2*0.2,g,false);th.scale.set(0.06,0.25,0.06);th.rotation.z=Math.PI}
  var st=B(0.06,1.2,0.06,"#52525b",0.6,1.1,0,g,false);st.rotation.z=-0.6;var lure=mesh(G.sph,MB("#a5f3fc"),1.3,1.6,0,g,false);lure.scale.setScalar(0.22);var tl=mesh(G.pine,"#3f3f46",-1.3,0,0,g,false);tl.scale.set(0.5,0.7,0.15);tl.rotation.z=-Math.PI/2;
  g.userData.dyn=true;scene.add(g);var off=i*2;animated.push(function(t){var a=t*q[2]+off;g.position.set(Math.sin(a)*q[0],q[1]+Math.sin(t*0.001+off),Math.cos(a)*q[0]);g.rotation.y=a+(q[2]>0?0:Math.PI);lure.material.color.setHSL(0.52,1,0.6+Math.sin(t*0.005+off)*0.15)})});
 W_school(0,0,36,9,10,"#67e8f9",0.00015,0.5);W_school(-10,10,52,13,12,"#c4b5fd",-0.0001,0.5);
 var sub=kapalSelam();sub.scale.setScalar(0.7);var lamp=new THREE.Mesh(G.sph,MB("#fef08a"));lamp.scale.setScalar(0.5);lamp.position.set(3.4,2.1,0);sub.add(lamp);sub.userData.dyn=true;scene.add(sub);
 animated.push(function(t){var a=t*0.00005+1;sub.position.set(Math.sin(a)*58,18,Math.cos(a)*58);sub.rotation.y=a});
 W_bubbles(160,110,30,0x7dd3fc);spaceKit(KIT);
 npcs4([{n:"Dr. Rahma",ic:"👩‍🔬",o:diver("k2","r_panjang")},{n:"Robo-Dalam",ic:"🤖",robot:true,col:"#7c3aed"},{n:"Penyelam Yoga",ic:"🤿",o:diver("k4","r_jabrik")},{n:"Kak Fira",ic:"🤿",o:diver("k3","r_kuncir")}]);
 buildBooks(bkFree([[50,-24,4],[54,20,4],[-52,24,4],[-50,-30,4]]),"mutiara");buildLots()}

/* ---------- rimba ---------- */
function tropTree(x,z,s,circ){var g=new THREE.Group();mesh(cyl(0.45,0.8,10,7),"#6d4c41",0,5,0,g);for(var i=0;i<4;i++){var f=B(0.18,2.2,1.6,"#5d4037",0,1.1,0,g);f.rotation.y=i*Math.PI/2+0.4;f.position.set(Math.sin(i*Math.PI/2+0.4)*0.8,1.1,Math.cos(i*Math.PI/2+0.4)*0.8)}
 [[0,10.5,0,3.6,1.8],[1.8,9.6,1,2.6,1.5],[-1.8,9.8,-0.8,2.8,1.5],[0.5,12,-1,2.4,1.3]].forEach(function(c,i){var m=mesh(G.ico,["#2e7d32","#388e3c","#1b5e20","#43a047"][i],c[0],c[1],c[2],g);m.scale.set(c[3],c[4],c[3])});
 var v=B(0.1,6,0.1,"#4d7c0f",1.4,6,0.3,g);v.rotation.z=0.1;g.scale.setScalar(s);g.position.set(x,0,z);g.rotation.y=rnd()*6;scene.add(g);if(circ!==false)CIRC.push({x:x,z:z,r:0.9*s});return g}
function fern(x,z,s){var g=new THREE.Group();for(var i=0;i<7;i++){var l=B(0.3,0.06,1.6,i%2?"#4caf50":"#388e3c",0,0.5,0.7,g);var p=new THREE.Group();p.add(l);p.rotation.y=i/7*Math.PI*2;p.rotation.x=0;l.rotation.x=-0.5;g.add(p)}g.scale.setScalar(s);g.position.set(x,0,z);scene.add(g)}
function rafflesia(x,z){var g=new THREE.Group();for(var i=0;i<5;i++){var a=i/5*Math.PI*2,p=mesh(G.sph,"#b91c1c",Math.sin(a)*1.1,0.25,Math.cos(a)*1.1,g);p.scale.set(0.8,0.22,0.8);for(var k=0;k<3;k++){var sp=B(0.15,0.05,0.15,"#fde2e2",Math.sin(a)*(0.8+k*0.3),0.45,Math.cos(a)*(0.8+k*0.3)+0.1*(k-1),g)}}
 mesh(cyl(0.7,0.6,0.6,12),"#7f1d1d",0,0.45,0,g);mesh(cyl(0.5,0.5,0.1,12),"#450a0a",0,0.76,0,g);g.position.set(x,0,z);scene.add(g);CIRC.push({x:x,z:z,r:1.6});
 var sg=textPlane([{t:"🌺 RAFFLESIA ARNOLDII",s:40,y:64,c:"#fff"}],512,128,3.6,0.9,{bg:"#7f1d1d",rad:14});var sgp=new THREE.Group();sgp.add(sg);sg.rotation.y=0;sg.position.y=1.6;B(0.12,1.2,0.12,"#5d4037",0,0.6,0,sgp);placeFacing(sgp,x*0.93,z*0.93)}
function hornbill(rad,h,sp,off){var g=new THREE.Group();B(1.4,0.6,0.6,"#111827",0,0,0,g,false);B(0.9,0.12,0.5,"#f8fafc",-1,0,0,g,false);var hd=B(0.5,0.5,0.45,"#111827",0.85,0.25,0,g,false);var bk=mesh(G.pine,"#f59e0b",1.55,0.25,0,g,false);bk.scale.set(0.18,0.9,0.18);bk.rotation.z=-Math.PI/2;B(0.5,0.18,0.3,"#dc2626",1.15,0.52,0,g,false);
 var wl=B(0.8,0.08,1.6,"#111827",0,0.1,0.9,g,false),wr=B(0.8,0.08,1.6,"#111827",0,0.1,-0.9,g,false);g.userData.dyn=true;scene.add(g);
 animated.push(function(t){var a=t*sp+off;g.position.set(Math.sin(a)*rad,h+Math.sin(t*0.001+off)*2,Math.cos(a)*rad);g.rotation.y=a+(sp>0?0:Math.PI);var f=Math.sin(t*0.012+off)*0.6;wl.rotation.x=f;wr.rotation.x=-f})}
function butterflies(n,R){var list=[];for(var i=0;i<n;i++){var g=new THREE.Group(),c=["#f59e0b","#3b82f6","#ec4899","#facc15"][i%4];var l=B(0.4,0.02,0.35,MB(c),0,0,0.2,g,false),r=B(0.4,0.02,0.35,MB(c),0,0,-0.2,g,false);g.userData={l:l,r:r,x:(rnd()-.5)*R,z:(rnd()-.5)*R,o:rnd()*6,dyn:true};scene.add(g);list.push(g)}
 animated.push(function(t){list.forEach(function(g){var u=g.userData,a=t*0.0004+u.o;g.position.set(u.x+Math.sin(a)*4,1.6+Math.sin(t*0.002+u.o)*0.6,u.z+Math.cos(a*1.3)*4);g.rotation.y=a;var f=Math.sin(t*0.03+u.o)*0.9;u.l.rotation.x=f;u.r.rotation.x=-f})})}
function landRes(extra){return resv([[-22,4,5],[22,4,5],[0,-30,5],[-30,-34,5],[0,-15,6]].concat(NPC_SPOTS.map(function(p){return[p[0],p[1],3]})).concat(extra||[]))}
function buildHutan(){setEnv("hutan");W_ground("#3f6b2f",["rgba(30,60,20,.35)","rgba(120,90,40,.25)","rgba(90,140,60,.25)"],45);
 var raf=[[52,-26],[-50,40],[52,24]];var res=landRes(raf.map(function(p){return[p[0],p[1],5]}).concat([[-46,-4,5]]));
 W_scatter(40,8,64,res,function(x,z){tropTree(x,z,0.8+rnd()*0.5)});W_scatter(110,70,200,[],function(x,z){tropTree(x,z,1+rnd()*0.8,false)});
 W_scatter(50,6,64,res,function(x,z){fern(x,z,0.8+rnd()*0.6)});
 raf.forEach(function(p){rafflesia(p[0],p[1])});
 W_mounts(["#2f5d2a","#3d6b35","#24502a"],14,200,260,50,90);
 hornbill(40,22,0.00012,0);hornbill(60,26,-0.0001,2);hornbill(25,18,0.00016,4);butterflies(14,90);
 var og=new THREE.Group();B(1.2,1.4,0.9,"#c2410c",0,0.9,0,og);var oh=B(0.9,0.8,0.8,"#c2410c",0,2,0,og);B(0.6,0.4,0.1,"#fed7aa",0,1.9,0.42,og);[-1,1].forEach(function(s){var a=B(0.3,1.6,0.3,"#c2410c",s*0.85,1.3,0,og);a.rotation.z=s*0.4});var ot=tropTree(-46,-4,1,true);og.position.set(-46,6.2,-2.6);og.rotation.y=Math.PI;scene.add(og);
 var ls=textPlane([{t:"🦧 ORANGUTAN",s:44,y:64,c:"#fff"}],512,128,3,0.75,{bg:"#9a3412",rad:14});var lgp=new THREE.Group();ls.rotation.y=0;ls.position.y=1.6;lgp.add(ls);B(0.12,1.2,0.12,"#5d4037",0,0.6,0,lgp);placeFacing(lgp,-41,-4);
 spaceKit(KIT);
 npcs4([{n:"Ranger Budi",ic:"🧑‍🌾",o:ranger("k3","r_pendek")},{n:"Peneliti Nisa",ic:"👩‍🔬",o:ranger("k2","r_panjang")},{n:"Pak Lukas",ic:"👨",o:OF("k4","r_kribo","t_caping","a_kh","b4")},{n:"Kak Tomi",ic:"🧒",o:ranger("k1","r_jabrik")}]);
 buildBooks(bkFree(raf.map(function(p){return[p[0],p[1],4]}).concat([[-46,-4,5]])),"daun");buildLots()}

function waterTex(){var c=document.createElement("canvas");c.width=64;c.height=256;var g=c.getContext("2d");g.fillStyle="#bfe9ff";g.fillRect(0,0,64,256);for(var i=0;i<70;i++){g.fillStyle="rgba(255,255,255,"+(.3+Math.random()*.6)+")";g.fillRect(Math.random()*64,Math.random()*256,1+Math.random()*3,10+Math.random()*40)}
 var t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(3,2);return t}
function buildAirTerjun(){setEnv("airterjun");W_ground("#4f8a45",["rgba(30,70,20,.3)","rgba(150,190,90,.25)"],45);
 var cz=-70;for(var i=-6;i<=6;i++){if(Math.abs(i)<=1)continue;var cl=mesh(G.ico,["#78716c","#6b625a","#57534e"][(i+6)%3],i*14,14,cz-4-rnd()*6,scene,false);cl.scale.set(10+rnd()*4,18+rnd()*10,10)}
 B(150,34,8,"#6b625a",0,17,cz-8,scene,false);for(var t=-5;t<=5;t++){if(Math.abs(t)<=1)continue;tropTree(t*12,cz+2-rnd()*3,1.1,false)}
 var wt=waterTex(),wf=new THREE.Mesh(new THREE.PlaneGeometry(12,32),new THREE.MeshBasicMaterial({map:wt,transparent:true,opacity:.92}));wf.position.set(0,16.5,cz+4);wf.userData.dyn=true;scene.add(wf);animated.push(function(t){wt.offset.y=(t*0.0012)%1});
 B(14,1.2,4,"#57534e",0,32.6,cz+2.5,scene,false);B(20,33,6,"#6b625a",0,16.5,cz,scene,false);
 var pz=-55,pool=W_disc("#38bdf8",10,0,pz,0.06,.88);var shore=W_disc("#a8a29e",11.2,0,pz,0.04);for(var e=0;e<16;e++){var ee=e/16*Math.PI*2;rock(Math.cos(ee)*10.8,pz+Math.sin(ee)*10.8,0.9+rnd()*0.7,"#9ca3af",scene,false);CIRC.push({x:Math.cos(ee)*7,z:pz+Math.sin(ee)*7,r:3.4})}
 var n=180,pp=new Float32Array(n*3);for(var q=0;q<n;q++){pp[q*3]=(Math.random()-.5)*14;pp[q*3+1]=Math.random()*6;pp[q*3+2]=cz+2+Math.random()*8}var mg=new THREE.BufferGeometry();mg.setAttribute("position",new THREE.BufferAttribute(pp,3));
 var mist=new THREE.Points(mg,new THREE.PointsMaterial({color:0xffffff,size:0.7,transparent:true,opacity:.5}));mist.userData.dyn=true;scene.add(mist);animated.push(function(t){mist.position.y=Math.sin(t*0.002)*0.3;mist.position.x=Math.sin(t*0.0013)*0.6});
 ["#ef4444","#f97316","#facc15","#22c55e","#3b82f6","#8b5cf6"].forEach(function(c,i){var r=new THREE.Mesh(new THREE.TorusGeometry(16-i*0.7,0.32,6,40,Math.PI),new THREE.MeshBasicMaterial({color:new THREE.Color(c),transparent:true,opacity:.35,depthWrite:false}));r.position.set(0,0,pz-2);scene.add(r)});
 var st=new THREE.Group();B(1.4,0.3,24,"#78350f",0,0.15,0,st);for(var k=-11;k<=11;k+=2.2)B(1.6,0.08,0.2,"#92400e",0,0.32,k,st);st.position.set(-24,0,-48);st.rotation.y=0.6;
 var res=landRes([[0,pz,13]]);W_scatter(28,8,64,res,function(x,z){tree(x,z,rnd()<.5?0:1,1+rnd()*0.5)});W_scatter(80,70,190,[[0,-80,40]],function(x,z){tropTree(x,z,1+rnd()*0.6,false)});
 W_scatter(40,6,64,res,function(x,z){fern(x,z,0.7+rnd()*0.6)});W_scatter(14,8,64,res,function(x,z){rock(x,z,0.7+rnd()*1.2,"#a8a29e")});
 W_mounts(["#3d6b35","#4f7a45"],12,200,260,50,80);hornbill(35,24,0.00013,1);butterflies(12,80);
 var sg=textPlane([{t:"💦 AIR TERJUN",s:48,y:64,c:"#fff"}],512,128,4,1,{bg:"#0369a1",rad:14});var sgp=new THREE.Group();sg.rotation.y=0;sg.position.y=1.8;sgp.add(sg);B(0.14,1.4,0.14,"#5d4037",-1.4,0.7,0,sgp);B(0.14,1.4,0.14,"#5d4037",1.4,0.7,0,sgp);placeFacing(sgp,8,-42,[[0,0,0.5]]);
 spaceKit(KIT);
 npcs4([{n:"Ranger Wati",ic:"👩‍🌾",o:ranger("k2","r_kuncir")},{n:"Pemandu Dedi",ic:"🧑",o:ranger("k3","r_pendek")},{n:"Kak Elsa",ic:"👧",o:OF("k1","r_panjang","t_caping","a_kh","b5")},{n:"Pak Harun",ic:"👴",o:OF("k4","r_botak","t_ranger","a_ranger","b4")}]);
 buildBooks(bkFree([[0,pz,13]]),"daun");buildLots()}

function lontar(x,z,s,circ){var g=new THREE.Group();mesh(cyl(0.28,0.4,9,7),"#6b5a46",0,4.5,0,g);for(var i=0;i<12;i++){var a=i/12*Math.PI*2,f=mesh(G.pine,"#557a2c",Math.sin(a)*0.9,9.3,Math.cos(a)*0.9,g);f.scale.set(0.9,1.4,0.15);f.rotation.set(Math.cos(a)*1.1,a,-Math.sin(a)*0.2)}
 mesh(G.sph,"#4b3b2a",0,9,0,g).scale.setScalar(0.6);g.scale.setScalar(s);g.position.set(x,0,z);scene.add(g);if(circ!==false)CIRC.push({x:x,z:z,r:0.5*s});return g}
function komodoModel(){var g=new THREE.Group(),c="#6b6b4f";B(2.4,0.6,0.95,c,0,0.55,0,g);var hd=B(0.9,0.45,0.62,c,1.55,0.6,0,g);B(0.4,0.3,0.5,"#5a5a40",2.1,0.55,0,g);var tg=B(0.5,0.04,0.08,"#facc15",2.5,0.5,0,g);
 var tl=mesh(G.pine,c,-2.2,0.5,0,g);tl.scale.set(0.42,2.4,0.3);tl.rotation.z=Math.PI/2;[[0.8,0.55],[0.8,-0.55],[-0.8,0.55],[-0.8,-0.55]].forEach(function(p){var l=B(0.25,0.5,0.25,c,p[0],0.25,p[1],g);B(0.4,0.1,0.35,"#4b4b35",p[0]+0.1,0.03,p[1],g)});
 g.userData.len=4.4;g.userData.tongue=tg;return g}
function rusa(x,z){var g=new THREE.Group(),c="#a16207";B(1.8,0.9,0.7,c,0,1.4,0,g);B(0.4,0.9,0.35,c,0.9,2.1,0,g);B(0.7,0.4,0.4,c,1.25,2.5,0,g);[[0.7,0.25],[0.7,-0.25],[-0.7,0.25],[-0.7,-0.25]].forEach(function(p){B(0.18,1,0.18,"#854d0e",p[0],0.5,p[1],g)});
 [-1,1].forEach(function(s){var a=B(0.06,0.7,0.06,"#e7e5e4",1.0,3.0,s*0.18,g);a.rotation.x=s*0.3;B(0.4,0.05,0.05,"#e7e5e4",1.05,3.2,s*0.26,g)});g.position.set(x,0,z);g.rotation.y=rnd()*6;scene.add(g);CIRC.push({x:x,z:z,r:1})}
function seaEdge(sand,z0){W_plane(sand,900,24,0,z0+11,0.05);var sea=W_plane("#1fa2c8",900,500,0,z0+22+250,0.07,.9);var foam=W_plane("#e0f7ff",900,1.2,0,z0+22.4,0.08,.8);return sea}
function buildKomodo(){setEnv("komodo");W_ground("#b5a36c",["rgba(120,100,50,.3)","rgba(210,195,140,.3)","rgba(110,125,60,.25)"],45);seaEdge("#f4c2c2",48);
 for(var i=0;i<14;i++){var a=Math.PI+(i/13-.5)*Math.PI*1.6,r=150+rnd()*60,h=30+rnd()*40,m=mesh(G.ico,["#8a7a3a","#7a8a3a","#9a8a4a"][i%3],Math.sin(a)*r,0,Math.cos(a)*r,scene,false);m.scale.set(45+rnd()*30,h,45+rnd()*30)}
 var res=landRes([[52,24,4],[-50,-28,4],[-52,20,3],[54,-26,6]]);
 W_scatter(22,8,64,res,function(x,z){lontar(x,z,0.8+rnd()*0.4)});W_scatter(40,70,170,[[0,120,70]],function(x,z){if(z<60)lontar(x,z,1+rnd()*0.5,false)});
 W_scatter(40,6,64,res,function(x,z){var gt=mesh(G.pine,"#7d8f35",x,0.35,z,scene);gt.scale.set(0.35,0.7,0.35)});W_scatter(14,8,64,res,function(x,z){rock(x,z,0.6+rnd()*1.2,"#a8a29e")});
 var ks=[komodoModel(),komodoModel(),komodoModel()];walkers(ks,40,1.6);animated.push(function(t){ks.forEach(function(k,i){k.userData.tongue.visible=Math.sin(t*0.004+i*2)>0.6})});
 [[52,24,2.6],[-50,-28,0.4]].forEach(function(p){var k=komodoModel();k.position.set(p[0],0,p[1]);k.rotation.y=p[2];scene.add(k);CIRC.push({x:p[0],z:p[1],r:1.8})});
 rusa(-52,20);
 var hut=new THREE.Group();B(5,0.4,4,"#78350f",0,1.2,0,hut);[[-2.2,-1.7],[2.2,-1.7],[-2.2,1.7],[2.2,1.7]].forEach(function(p){B(0.25,2.6,0.25,"#5d4037",p[0],1.3,p[1],hut)});var rf=mesh(G.hip,"#a16207",0,4,0,hut);rf.scale.set(3.2,1.8,2.6);B(4.6,1.8,0.12,"#92400e",0,2.3,-1.9,hut);
 var hs=textPlane([{t:"🦎 POS JAGA RANGER",s:40,y:64,c:"#fff"}],512,128,3.8,0.95,{bg:"#365314",rad:14});hs.rotation.y=0;hs.position.set(0,3.4,2.1);hut.add(hs);placeFacing(hut,54,-26,[[0,0,3]]);
 var ws=textPlane([{t:"⚠️ SATWA LIAR — JAGA JARAK",s:38,y:64,c:"#fff"}],512,128,4.2,1,{bg:"#b45309",rad:14});var wsg=new THREE.Group();ws.rotation.y=0;ws.position.y=1.8;wsg.add(ws);B(0.14,1.4,0.14,"#5d4037",0,0.7,0,wsg);placeFacing(wsg,0,-24);
 spaceKit(KIT);
 npcs4([{n:"Ranger Fransiskus",ic:"🧑‍🌾",o:ranger("k4","r_pendek")},{n:"Pemandu Maria",ic:"👩",o:ranger("k3","r_panjang")},{n:"Pak Kornelis",ic:"👨",o:OF("k4","r_kribo","t_caping","a_ikat","b6")},{n:"Kak Yuli",ic:"👧",o:OF("k3","r_kuncir","t0","a_ranger","b4")}]);
 buildBooks(bkFree([[52,24,4],[-50,-28,4],[54,-26,6]]),"daun");buildLots()}

/* ---------- gaya gedung mapel per dunia (depan = +z lokal) ---------- */
var GSTYLE={};
GSTYLE.samudra=function(g,col){var R=6;mesh(cyl(R+0.3,R+0.7,1,24),"#c9b48a",0,0.5,0,g);
 var gl=new THREE.Mesh(new THREE.SphereGeometry(R,24,12,0,Math.PI*2,0,Math.PI/2),new THREE.MeshLambertMaterial({color:0xc4f4ff,transparent:true,opacity:.38,depthWrite:false}));gl.position.y=1;g.add(gl);
 for(var k=0;k<3;k++){var a=mesh(new THREE.TorusGeometry(R,0.14,6,24,Math.PI),col,0,1,0,g);a.rotation.y=k*Math.PI/3}var bd=mesh(new THREE.TorusGeometry(R,0.3,6,32),col,0,1.1,0,g);bd.rotation.x=Math.PI/2;
 for(var c=0;c<6;c++){var cr=mesh(G.ico,CORAL_C[c],Math.sin(c)*3,1.6,Math.cos(c)*3-0.5,g);cr.scale.set(0.8,1.1,0.8)}var kp=mesh(G.sph,"#fde68a",0,R+1,0,g);kp.scale.set(0.8,0.4,0.8);
 B(3.6,4,3,"#dfe7ea",0,2.4,R-0.2,g);B(4,0.45,3.2,col,0,4.6,R-0.2,g);
 [[-4.5,4.2],[4.5,4.2],[-6.2,0],[6.2,0]].forEach(function(p,i){var cc=mesh(G.pine,CORAL_C[(i+3)%8],p[0],0.9,p[1],g);cc.scale.set(0.6,1.8,0.6)});
 return{R:R+0.7,F:R+1.3,sy:5.5,ly:R+4.5}};
GSTYLE.rimba=function(g,col){[-4.2,-1.4,1.4,4.2].forEach(function(x){[-3.4,3.4].forEach(function(z){B(0.4,1.4,0.4,"#5d4037",x,0.7,z,g)})});B(9.6,0.35,7.6,"#6d4c41",0,1.45,0,g);
 B(8.8,3.4,7,"#a1703f",0,3.3,0,g);for(var k=0;k<5;k++)B(8.84,0.06,7.04,"#7b5230",0,1.9+k*0.62,0,g);
 [-2.9,2.9].forEach(function(x){B(1.2,1,0.1,"#3e2723",x,3.4,3.52,g);B(0.5,1.05,0.08,"#8d5a2b",x-0.85,3.4,3.55,g);B(0.5,1.05,0.08,"#8d5a2b",x+0.85,3.4,3.55,g)});
 B(9.2,0.35,7.4,col,0,5.15,0,g);var rf=mesh(G.hip,"#b08d57",0,6.95,0,g);rf.scale.set(5.6,3.6,4.6);var rr2=mesh(G.hip,"#9c7b47",0,8.4,0,g);rr2.scale.set(2.2,1.2,1.8);
 B(2.6,0.25,0.9,"#6d4c41",0,1.0,4.05,g);B(2.6,0.25,0.9,"#6d4c41",0,0.55,4.75,g);B(2.6,0.25,0.9,"#6d4c41",0,0.12,5.4,g);
 return{R:6.1,F:3.52,py:2.95,ph:2.4,pw:2.1,sy:4.62,ly:11.5}};
function mbaruNiang(g,col){mesh(cyl(5,5.2,1.4,16),"#5d4037",0,0.7,0,g);var c=mesh(new THREE.ConeGeometry(5.9,11,16),"#8a6a3a",0,6.9,0,g);
 for(var k=1;k<=4;k++){var r=5.9*(1-k*2.2/11),t=mesh(new THREE.TorusGeometry(r,0.13,4,24),"#5b4424",0,1.4+k*2.2,0,g);t.rotation.x=Math.PI/2}
 var b=mesh(new THREE.TorusGeometry(5.65,0.28,6,32),col||"#7f1d1d",0,1.6,0,g);b.rotation.x=Math.PI/2;mesh(cyl(0.12,0.16,1.6,6),"#3e2723",0,13,0,g);
 B(2.6,2.8,1.6,"#6d4c41",0,1.4,5.2,g);B(2.9,0.3,1.8,"#3e2723",0,2.9,5.2,g);return{R:6.1,F:6.0,py:1.45,ph:2.3,pw:1.7,sy:3.75,ly:14.5}}
GSTYLE.flores=function(g,col){return mbaruNiang(g,col)};
GSTYLE.bali=function(g,col){B(10,1,9,"#a8998a",0,0.5,0,g);B(3,0.5,1.2,"#a8998a",0,0.25,5.1,g);B(8,3.4,7,"#b5562f",0,2.7,0,g);B(8.1,0.3,7.1,"#e8e0d0",0,1.15,0,g);B(8.2,0.35,7.2,"#e8e0d0",0,4.4,0,g);
 [[-4,-3.5],[4,-3.5],[-4,3.5],[4,3.5]].forEach(function(p){B(0.6,3.6,0.6,"#e8e0d0",p[0],2.7,p[1],g)});B(8.3,0.4,7.3,col,0,4.75,0,g);
 [[5.4,2.2,4.8,4.95],[4.0,1.8,3.6,6.75],[2.8,1.5,2.5,8.3],[1.7,1.2,1.5,9.6]].forEach(function(t,i){var rf=mesh(G.hip,"#2b2420",0,t[3]+t[1]/2,0,g);rf.scale.set(t[0],t[1],t[2]);if(i>0)B(t[0]*0.7,0.5,t[2]*0.7,"#5c4033",0,t[3]-0.1,0,g)});
 mesh(G.sph,"#d4a017",0,10.9,0,g).scale.setScalar(0.35);
 [-2.6,2.6].forEach(function(x){B(1.6,1.8,1.3,"#b5562f",x,1.9,4.5,g);B(1.4,0.3,1.15,"#e8e0d0",x,2.95,4.5,g);B(1.15,1.1,0.95,"#b5562f",x,3.65,4.5,g);B(0.9,0.25,0.75,"#e8e0d0",x,4.32,4.5,g);B(0.65,0.8,0.55,"#b5562f",x,4.85,4.5,g);var tp=mesh(G.pine,"#e8e0d0",x,5.6,4.5,g);tp.scale.set(0.35,0.7,0.35)});
 return{R:6.7,F:3.52,py:2.4,ph:2.7,pw:2.0,sy:5.3,sz:4.98,ly:12.5,circ:[[-2.6,4.5,1],[2.6,4.5,1]]}};
function tongkonan(g,col,noSign){[-1.8,0,1.8].forEach(function(x){[-2.8,0,2.8].forEach(function(z){B(0.45,2.2,0.45,"#3b2417",x,1.1,z,g)})});B(5.4,0.3,7.4,"#3b2417",0,2.25,0,g);
 B(5,2.8,7,"#3b2417",0,3.8,0,g);var pc=["#b91c1c","#111111","#eab308","#f5f5f5"];for(var r=0;r<3;r++)for(var c=0;c<6;c++)B(0.7,0.7,0.04,pc[(r+c)%4],-2.0+c*0.8,2.85+r*0.85,3.52,g);
 for(var s=0;s<4;s++){B(0.04,0.4,6.8,pc[s],-2.52,2.7+s*0.75,0,g);B(0.04,0.4,6.8,pc[s],2.52,2.7+s*0.75,0,g)}
 for(var k=-5;k<=5;k++){var zz=k/5*6.8,yb=5.6+2.6*Math.pow(k/5,2);[-1,1].forEach(function(sd){var pl=B(3.6,0.28,1.45,"#3a2e22",sd*1.45,yb,zz,g);pl.rotation.z=-sd*0.62})}
 B(4.4,1.4,0.15,col||"#b91c1c",0,5.95,3.62,g);B(0.5,7.6,0.5,"#3b2417",-3.9,3.8,5.9,g);
 for(var h=0;h<5;h++){[-1,1].forEach(function(sd){var hn=B(1.4,0.16,0.16,"#e7e0cf",-3.9+sd*0.62,2.6+h*0.55,6.2,g);hn.rotation.z=sd*0.45})}
 [0,1,2].forEach(function(i){B(1.6,0.14,0.6,"#5d4037",0.8,0.5+i*0.6,4.1+i*-0.25,g)});return{R:6.2,F:3.52,py:3.3,ph:2.0,pw:1.5,sy:4.95,sz:3.72,ly:12,circ:[[-3.9,5.9,0.5]]}}
GSTYLE.toraja=function(g,col){return tongkonan(g,col)};
GSTYLE.jepang=function(g,col){B(9.6,0.6,8.4,"#9e9e9e",0,0.3,0,g);B(8.4,3.2,7.2,"#f5f0e6",0,2.2,0,g);
 [-4.2,-1.4,1.4,4.2].forEach(function(x){[-3.6,3.6].forEach(function(z){B(0.3,3.2,0.3,"#4e342e",x,2.2,z,g)})});B(8.5,0.25,7.3,"#4e342e",0,3.7,0,g);B(8.5,0.2,7.3,"#4e342e",0,1.0,0,g);
 [-2.8,2.8].forEach(function(x){for(var i=0;i<3;i++)B(0.04,1.8,0.04,"#4e342e",x-0.5+i*0.5,2.4,3.62,g);B(1.6,0.04,0.04,"#4e342e",x,2.4,3.62,g)});
 B(8.6,0.3,7.4,col,0,3.95,0,g);var r1=mesh(G.hip,"#37474f",0,5.3,0,g);r1.scale.set(5.8,2.4,5.0);B(3.6,0.8,3,"#f5f0e6",0,6.5,0,g);var r2=mesh(G.hip,"#37474f",0,7.5,0,g);r2.scale.set(3.3,1.6,2.8);
 [[-5.6,4.8],[5.6,4.8],[-5.6,-4.8],[5.6,-4.8]].forEach(function(p){var u=B(0.9,0.2,0.25,"#37474f",p[0]*0.98,4.3,p[1]*0.98,g);u.rotation.z=p[0]>0?0.5:-0.5});
 var tz=5.6;[-2.6,2.6].forEach(function(x){B(0.8,0.3,0.8,"#9ca3af",x,0.15,tz,g);mesh(cyl(0.15,0.2,1,6),"#9ca3af",x,0.8,tz,g);B(0.8,0.6,0.8,"#d1d5db",x,1.6,tz,g);B(0.4,0.3,0.82,MB("#fde68a"),x,1.6,tz,g);var lr=mesh(G.hip,"#9ca3af",x,2.15,tz,g);lr.scale.set(0.7,0.5,0.7)});
 return{R:6.3,F:3.62,py:2.2,ph:2.6,pw:2.3,sy:4.32,sz:3.7,ly:11,circ:[[-2.6,tz,0.5],[2.6,tz,0.5]]}};
GSTYLE.mesir=function(g,col){B(11,0.8,9,"#d9b77a",0,0.4,0,g);B(9.6,5.6,6.6,"#d4af72",0,3.6,-0.6,g);B(10,0.5,7,"#c99d5c",0,6.6,-0.6,g);
 for(var k=0;k<15;k++)B(0.38,0.5,0.05,k%2?col:"#3b2f1e",-4.2+k*0.6,5.3,2.73,g);
 [-3.6,-1.5,1.5,3.6].forEach(function(x){mesh(cyl(0.45,0.5,5,12),"#e0c48c",x,3.3,3.6,g);mesh(cyl(0.75,0.5,0.6,12),col,x,6.0,3.6,g)});B(9.4,0.6,1.2,"#c99d5c",0,6.6,3.6,g);B(9.6,0.3,4.2,"#d4af72",0,7.05,1.9,g);
 return{R:7,F:4.1,pz:2.72,py:2.6,ph:3.4,pw:2.0,sy:6.6,sz:4.24,ly:12,circ:[[-3.6,3.6,0.6],[-1.5,3.6,0.6],[1.5,3.6,0.6],[3.6,3.6,0.6]]}};
function hausBody(g,col,floors){var H=2.6+floors*1.6;B(9,H,7,"#eadfc8",0,H/2,0,g);B(9.05,2.6,7.05,"#d9cdb3",0,1.3,0,g);B(9.3,0.35,7.3,"#cfc2a6",0,H+0.15,0,g);
 for(var f=0;f<floors;f++){var y=3.6+f*1.6;[-3,-1,1,3].forEach(function(x){B(1,1.2,0.06,"#3b4a5a",x,y,3.52,g);B(1.3,0.1,0.4,"#111",x,y-0.62,3.7,g);B(1,1.2,0.06,"#3b4a5a",x,y,-3.52,g)});[-2,0,2].forEach(function(z){B(0.06,1.2,1,"#3b4a5a",4.52,y,z,g);B(0.06,1.2,1,"#3b4a5a",-4.52,y,z,g)})}
 var mr=mesh(G.mans,"#5b6b7a",0,H+0.3+1.3,0,g);mr.scale.set(4.7,2.6,3.7);[-2.2,0,2.2].forEach(function(x){B(0.9,1,0.6,"#eadfc8",x,H+1.4,3.1,g);B(0.5,0.6,0.62,"#3b4a5a",x,H+1.4,3.12,g)});
 [-3,3].forEach(function(x){B(0.6,1.4,0.6,"#b0745a",x,H+3.2,0,g)});if(col)B(3.4,0.12,1.5,col,0,2.65,4.2,g).rotation.x=0.22;return H}
GSTYLE.paris=function(g,col){var H=hausBody(g,col,2);return{R:6,F:3.54,py:1.4,ph:2.2,pw:1.8,sy:3.35,sz:3.6,ly:H+6}};

function makeGedung(m,x,z,i){var g=new THREE.Group(),col=m.warna,st=GSTYLE[CUR.z]||GSTYLE[CUR.w],o=st(g,col,i);
 var pw=o.pw||2.6,ph=o.ph||3.5,py=o.py||2.15,pz=o.pz||o.F;
 var portal=new THREE.Mesh(G.plane,new THREE.MeshBasicMaterial({color:new THREE.Color(col).lerp(new THREE.Color("#ffffff"),.35),transparent:true,opacity:.8}));portal.scale.set(pw,ph,1);portal.position.set(0,py,pz+0.04);g.add(portal);
 var glow=new THREE.Mesh(G.plane,new THREE.MeshBasicMaterial({color:new THREE.Color(col),transparent:true,opacity:.35,depthWrite:false}));glow.scale.set(3.4,2.6,1);glow.rotation.x=-Math.PI/2;glow.position.set(0,0.06,o.F+2);g.add(glow);
 var sign=textPlane([{t:"GEDUNG "+m.nama.toUpperCase(),s:54,y:64,c:"#fff",sh:1}],768,128,6.6,1.1,{bg:col,rad:18});sign.rotation.y=0;sign.position.set(0,o.sy,(o.sz||o.F)+0.08);g.add(sign);
 var lab=schoolLabel(m);lab.position.set(0,o.ly,0);g.add(lab);
 g.position.set(x,0,z);g.lookAt(0,0,0);lotGroup.add(g);
 var dl=Math.hypot(x,z)||1,dx=-x/dl,dz=-z/dl;
 LOTCIRC.push({x:x,z:z,r:o.R},{x:x+dx*o.F,z:z+dz*o.F,r:1.6});(o.circ||[]).forEach(function(c){LOTCIRC.push({x:x+c[0]*dz+c[1]*dx,z:z-c[0]*dx+c[1]*dz,r:c[2]})});
 INTER.push({type:"door",m:m,x:x+dx*(o.F+3.2),z:z+dz*(o.F+3.2),r:2.6,label:"Masuk Gedung "+m.nama,ox:dx,oz:dz});
 schools.push({m:m,g:g,label:lab,portal:portal,glow:glow,i:i,ly:o.ly})}

/* ---------- nusantara ---------- */
function lingkoTex(){var c=document.createElement("canvas");c.width=c.height=256;var g=c.getContext("2d"),gs=["#7cb342","#8bc34a","#689f38","#9ccc65"];g.fillStyle="#6d8f3a";g.fillRect(0,0,256,256);
 for(var i=0;i<18;i++){g.fillStyle=gs[i%4];g.beginPath();g.moveTo(128,128);g.arc(128,128,126,i/18*Math.PI*2,(i+1)/18*Math.PI*2);g.closePath();g.fill()}
 g.strokeStyle="rgba(110,80,40,.8)";g.lineWidth=2;for(var r=20;r<128;r+=22){g.beginPath();g.arc(128,128,r,0,7);g.stroke()}for(var k=0;k<18;k++){var a=k/18*Math.PI*2;g.beginPath();g.moveTo(128,128);g.lineTo(128+Math.cos(a)*126,128+Math.sin(a)*126);g.stroke()}
 return new THREE.CanvasTexture(c)}
function signPost(txt,bg,x,z,w){var s=textPlane([{t:txt,s:40,y:64,c:"#fff"}],512,128,w||4.4,(w||4.4)/4,{bg:bg,rad:14});var sg=new THREE.Group();s.rotation.y=0;s.position.y=1.9;sg.add(s);B(0.14,1.5,0.14,"#5d4037",-(w||4.4)/2+0.4,0.75,0,sg);B(0.14,1.5,0.14,"#5d4037",(w||4.4)/2-0.4,0.75,0,sg);placeFacing(sg,x,z,[[0,0,0.6]]);return sg}
function terraces(x,z,w,steps,dir,cols){for(var k=0;k<steps;k++){var h=(k+1)*1.1;B(w,h,7,cols[k%cols.length],x,h/2,z+dir*k*7,scene,false);var wtr=W_plane("#a7d3c2",w*0.96,6.4,x,z+dir*k*7,h+0.03,.35)}}
function buildFlores(){setEnv("flores");W_ground("#5b8f4a",["rgba(40,80,30,.3)","rgba(150,190,90,.25)"],45);
 W_mounts(["#3f6b35","#4a7a3d","#365e2e"],16,180,250,50,100);var vk=mesh(G.mount,"#5d6b4a",-150,40,-170,scene,false);vk.scale.set(120,80,120);
 var lakes=[[-52,-4,"#2ec4b6","Tiwu Nuwa Muri Koo Fai"],[-48,14,"#1f7a5a","Tiwu Ata Polo"],[-54,-22,"#2b2522","Tiwu Ata Mbupu"]];
 lakes.forEach(function(l){W_disc("#8a7d6a",6.4,l[0],l[1],0.04);W_disc(l[2],5.2,l[0],l[1],0.07,.95);for(var e=0;e<10;e++){var a=e/10*Math.PI*2;rock(l[0]+Math.cos(a)*6,l[1]+Math.sin(a)*6,0.5+rnd()*0.4,"#9ca3af",scene,false)}CIRC.push({x:l[0],z:l[1],r:5.6})});
 signPost("🌋 DANAU KELIMUTU (3 WARNA)","#0f766e",-40,4,5);
 var lk=new THREE.Mesh(new THREE.CircleGeometry(12,48),new THREE.MeshLambertMaterial({map:lingkoTex()}));lk.rotation.x=-Math.PI/2;lk.position.set(50,0.05,22);lk.receiveShadow=true;scene.add(lk);signPost("🌾 SAWAH LINGKO","#4d7c0f",44,8,3.6);
 for(var v=0;v<7;v++){var a=Math.PI*0.75+v/6*Math.PI*0.5,r=80+(v%2)*8,g=new THREE.Group();mbaruNiang(g,"#7f1d1d");g.scale.setScalar(0.9);placeFacing(g,Math.sin(a)*r,Math.cos(a)*r)}
 var cp=new THREE.Group();mesh(cyl(3,3.4,0.8,16),"#78716c",0,0.4,0,cp);mesh(cyl(1.2,1.4,0.6,10),"#a8a29e",0,1.1,0,cp);placeFacing(cp,-30,60);
 var res=landRes([[-52,4,22],[50,22,13],[54,-26,4]]);W_scatter(26,8,64,res,function(x,z){tree(x,z,rnd()<.4?2:0,0.9+rnd()*0.5)});W_scatter(70,72,180,[],function(x,z){tree(x,z,rnd()<.5?1:0,1.2+rnd()*0.6)});
 W_scatter(12,8,64,res,function(x,z){rock(x,z,0.6+rnd(),"#a8a29e")});
 var tn=new THREE.Group();B(3.2,0.2,1.6,"#78350f",0,1.0,0,tn);[[-1.4,-0.6],[1.4,-0.6],[-1.4,0.6],[1.4,0.6]].forEach(function(p){B(0.15,1,0.15,"#5d4037",p[0],0.5,p[1],tn)});
 [["#7f1d1d",0.2],["#1e3a8a",0.4],["#a16207",0.6]].forEach(function(c){B(2.6,0.12,1.2,c[0],0,1.05+c[1]*0.4,0,tn)});placeFacing(tn,54,-26,[[0,0,1.8]]);signPost("🧶 TENUN IKAT NTT","#7f1d1d",50,-18,3.6);
 spaceKit(KIT);
 npcs4([{n:"Bapa Yohanes",ic:"👨",o:OF("k4","r_kribo","t_caping","a_ikat","b6")},{n:"Mama Maria",ic:"👩",o:OF("k4","r_panjang","t0","a_ikat","b2")},{n:"Kak Rian",ic:"🧑",o:OF("k3","r_jabrik","t0","a_kb","b5")},{n:"Adik Ani",ic:"👧",o:OF("k3","r_kuncir","t0","a_sd","b2")}]);
 buildBooks(bkFree([[-52,4,22],[50,22,13],[54,-26,4]]),"wastra");buildLots()}
function penjor(x,z){var g=new THREE.Group();var segs=8,px=0,py=0,ang=0;for(var i=0;i<segs;i++){var L=1.3,m=mesh(cyl(0.07,0.1,L,6),"#c8b273",0,0,0,g);ang=i<4?0:(i-3)*0.28;var nx=px+Math.sin(ang)*L,ny=py+Math.cos(ang)*L;m.position.set((px+nx)/2,(py+ny)/2,0);m.rotation.z=-ang;px=nx;py=ny;if(i>3){var lf=B(0.5,0.05,0.2,"#e9d8a6",px,py-0.3,0,g);lf.rotation.z=0.4}}
 var hang=B(0.3,1.2,0.3,"#e9d8a6",px,py-0.8,0,g);mesh(G.sph,"#f59e0b",px,py-1.5,0,g).scale.setScalar(0.25);B(0.8,0.6,0.8,"#c8b273",0,0.3,0,g);g.position.set(x,0,z);scene.add(g);CIRC.push({x:x,z:z,r:0.5});return g}
function meru(x,z,tiers,s){var g=new THREE.Group();B(4.4,1.4,4.4,"#9e8e7e",0,0.7,0,g);B(2.8,2.2,2.8,"#b5562f",0,2.5,0,g);for(var t=0;t<tiers;t++){var w=2.6-t*0.32,y=3.8+t*1.05;var rf=mesh(G.hip,"#2b2420",0,y+0.35,0,g);rf.scale.set(w,0.7,w);B(0.9,0.4,0.9,"#5c4033",0,y+0.85,0,g)}
 mesh(G.sph,"#d4a017",0,3.8+tiers*1.05+0.4,0,g).scale.setScalar(0.3);g.scale.setScalar(s||1);placeFacing(g,x,z,[[0,0,2.6*(s||1)]]);return g}
function candiBentar(x,z,s){var g=new THREE.Group();[-1,1].forEach(function(sd){var cx=sd*3.4;[[3,3,2.6,"#b5562f"],[2.6,0.5,2.3,"#e8e0d0"],[2.4,2.4,2.1,"#b5562f"],[2,0.4,1.8,"#e8e0d0"],[1.7,2,1.5,"#b5562f"],[1.3,0.4,1.2,"#e8e0d0"],[1,1.6,0.9,"#b5562f"]].reduce(function(y,b){B(b[0],b[1],b[2],b[3],cx,y+b[1]/2,0,g);return y+b[1]},0);var tp=mesh(G.pine,"#e8e0d0",cx,10.1,0,g);tp.scale.set(0.5,1.2,0.5)});
 g.scale.setScalar(s||1);placeFacing(g,x,z,[[-3.4*(s||1),0,1.6*(s||1)],[3.4*(s||1),0,1.6*(s||1)]]);return g}
function buildBali(){setEnv("bali");W_ground("#6f9a45",["rgba(40,80,30,.3)","rgba(170,200,100,.25)"],45);seaEdge("#f1e1b8",48);
 for(var k=0;k<4;k++)terraces(-90+k*60,-78,58,6,-1,["#7cb342","#8bc34a","#9ccc65"]);W_mounts(["#4f7a45","#5a8a4a"],8,230,280,60,110);var ag=mesh(G.mount,"#5d6b5a",60,60,-260,scene,false);ag.scale.set(150,120,150);
 candiBentar(0,-50,1);meru(52,-28,5,1.1);meru(56,-12,3,0.8);
 [[-6,-24],[6,-24],[-6,-36],[6,-36],[-6,-44],[6,-44]].forEach(function(p){penjor(p[0],p[1])});
 var res=landRes([[0,-50,8],[52,-28,6],[56,-12,4],[0,-34,7]]);W_scatter(20,8,58,res,function(x,z){tree(x,z,rnd()<.6?2:0,0.9+rnd()*0.5)});
 for(var c=-60;c<=60;c+=9)tree(c+rnd()*3,52+rnd()*6,2,1+rnd()*0.3);W_scatter(60,72,180,[[0,120,60]],function(x,z){if(z<45)tree(x,z,rnd()<.5?2:0,1.1+rnd()*0.5,null,[])});
 W_scatter(10,8,58,res,function(x,z){rock(x,z,0.5+rnd()*0.8,"#a8a29e")});
 var bl=new THREE.Group();[[-1.6,-1.6],[1.6,-1.6],[-1.6,1.6],[1.6,1.6]].forEach(function(p){B(0.3,2.6,0.3,"#8d6e4a",p[0],1.3,p[1],bl)});B(4,0.4,4,"#a8998a",0,0.2,0,bl);var br=mesh(G.hip,"#2b2420",0,3.6,0,bl);br.scale.set(2.8,1.6,2.8);placeFacing(bl,-52,26,[[0,0,2.6]]);signPost("🎶 BALE BANJAR","#9a3412",-46,20,3.4);
 signPost("🛕 PURA & MERU","#9a3412",44,-22,3.4);
 spaceKit(KIT);
 npcs4([{n:"Bli Wayan",ic:"👨",o:OF("k3","r_pendek","t_udeng","a_batik","b6")},{n:"Kak Ni Luh",ic:"👩",o:OF("k3","r_panjang","t0","a_batik","b7")},{n:"Pak Ketut",ic:"👴",o:OF("k4","r_botak","t_udeng","a_kh","b6")},{n:"Kak Komang",ic:"🧑",o:OF("k2","r_jabrik","t_udeng","a_kk","b5")}]);
 buildBooks(bkFree([[0,-50,8],[52,-28,6],[56,-12,4]]),"wastra");buildLots()}
function kerbau(){var g=new THREE.Group(),c="#3f3f46";B(2.6,1.3,1.3,c,0,1.45,0,g);B(0.9,0.8,0.8,c,1.6,1.65,0,g);B(0.4,0.4,0.6,"#52525b",2.1,1.5,0,g);[-1,1].forEach(function(s){var h=B(1.3,0.16,0.16,"#d6d3c4",1.6,2.15,s*0.6,g);h.rotation.x=s*0.5;h.rotation.y=s*0.3});
 [[0.9,0.45],[0.9,-0.45],[-0.9,0.45],[-0.9,-0.45]].forEach(function(p){B(0.3,0.9,0.3,"#27272a",p[0],0.45,p[1],g)});g.userData.len=3.2;return g}
function buildToraja(){setEnv("toraja");W_ground("#5f8a45",["rgba(40,80,30,.3)","rgba(150,190,90,.25)"],45);
 W_mounts(["#3d6b35","#4a7a3d","#2f5d2a"],16,170,240,60,110);
 for(var i=-2;i<=2;i++){var g=new THREE.Group();tongkonan(g,"#b91c1c");g.position.set(i*13,0,-80);scene.add(g);var al=new THREE.Group();tongkonan(al,"#b91c1c");al.scale.setScalar(0.55);al.position.set(i*13,0,-60);al.rotation.y=Math.PI;scene.add(al);CIRC.push({x:i*13,z:-60,r:3.2})}
 signPost("🏘️ DERETAN TONGKONAN & ALANG","#7f1d1d",-30,-52,5);
 terraces(70,-60,40,5,1,["#7cb342","#8bc34a"]);terraces(-70,-60,40,5,1,["#8bc34a","#7cb342"]);
 var kb=[kerbau(),kerbau()];walkers(kb,40,1.2);
 var res=landRes([[0,-60,32],[-30,-52,4]]);W_scatter(22,8,64,res,function(x,z){var b=new THREE.Group();for(var k=0;k<7;k++){var s=mesh(cyl(0.12,0.15,6+rnd()*3,6),"#7c9a3a",(rnd()-.5)*1.4,3.5,(rnd()-.5)*1.4,b);s.rotation.z=(rnd()-.5)*0.2}var tp=mesh(G.ico,"#6b8e23",0,7,0,b);tp.scale.set(2,1.4,2);b.position.set(x,0,z);scene.add(b);CIRC.push({x:x,z:z,r:1.2})});
 W_scatter(60,72,180,[[0,-80,40]],function(x,z){tree(x,z,rnd()<.5?1:0,1.1+rnd()*0.6,null,[])});W_scatter(10,8,64,res,function(x,z){rock(x,z,0.6+rnd(),"#a8a29e")});
 var cf=new THREE.Group();B(3,1,1.6,"#78350f",0,0.5,0,cf);[["#3e2723",-0.8],["#5d4037",0],["#3e2723",0.8]].forEach(function(c){mesh(cyl(0.35,0.4,0.5,10),c[0],c[1],1.25,0,cf)});placeFacing(cf,52,24,[[0,0,1.6]]);signPost("☕ KOPI TORAJA","#78350f",46,14,3.4);
 spaceKit(KIT);
 npcs4([{n:"Ambe' Lukas",ic:"👨",o:OF("k3","r_pendek","t0","a_batik","b6")},{n:"Indo' Rina",ic:"👩",o:OF("k3","r_panjang","t0","a_ikat","b2")},{n:"Kak Daniel",ic:"🧑",o:OF("k2","r_jabrik","t_pet","a_km","b5")},{n:"Adik Rosa",ic:"👧",o:OF("k3","r_kuncir","t0","a_smp","b1")}]);
 buildBooks(bkFree([[0,-60,32]]),"wastra");buildLots()}

/* ---------- mancanegara ---------- */
function sakura(x,z,s,circ){var g=new THREE.Group();var tr=mesh(cyl(0.25,0.4,3,6),"#5d4037",0,1.5,0,g);[[0,3.6,0,2],[1.2,3.2,0.5,1.4],[-1.1,3.3,-0.4,1.5],[0.2,4.4,-0.6,1.3]].forEach(function(c,i){var m=mesh(G.ico,["#f9a8d4","#fbcfe8","#f472b6","#fce7f3"][i],c[0],c[1],c[2],g);m.scale.set(c[3],c[3]*0.8,c[3])});
 g.scale.setScalar(s);g.position.set(x,0,z);g.rotation.y=rnd()*6;scene.add(g);if(circ!==false)CIRC.push({x:x,z:z,r:0.45*s});return g}
function pagoda(x,z){var g=new THREE.Group();B(6,0.8,6,"#9e9e9e",0,0.4,0,g);for(var k=0;k<5;k++){var s=4.2-k*0.55,y=0.8+k*2.2;B(s,1.6,s,"#b91c1c",0,y+0.8,0,g);var rf=mesh(G.hip,"#263238",0,y+1.95,0,g);rf.scale.set(s*0.85,0.7,s*0.85)}
 mesh(cyl(0.1,0.15,3.4,6),"#d4a017",0,13.5,0,g);for(var r=0;r<5;r++){var rg=mesh(new THREE.TorusGeometry(0.3,0.06,4,10),"#d4a017",0,12.4+r*0.5,0,g);rg.rotation.x=Math.PI/2}placeFacing(g,x,z,[[0,0,3.6]]);return g}
function toro(x,z){var g=new THREE.Group();B(0.8,0.3,0.8,"#9ca3af",0,0.15,0,g);mesh(cyl(0.15,0.2,1,6),"#9ca3af",0,0.8,0,g);B(0.8,0.6,0.8,"#d1d5db",0,1.6,0,g);B(0.4,0.3,0.82,MB("#fde68a"),0,1.6,0,g);var r=mesh(G.hip,"#9ca3af",0,2.15,0,g);r.scale.set(0.7,0.5,0.7);g.position.set(x,0,z);scene.add(g);CIRC.push({x:x,z:z,r:0.5})}
function shinkansen(){var g=new THREE.Group();B(10,2.2,2.4,"#f8fafc",0,1.6,0,g);var n=mesh(G.sph,"#f8fafc",5,1.4,0,g);n.scale.set(3,1.1,1.2);var tl=mesh(G.sph,"#f8fafc",-5,1.4,0,g);tl.scale.set(1.5,1.1,1.2);
 B(13,0.3,2.45,"#1d4ed8",0,1.2,0,g);B(9,0.5,2.45,"#1e293b",0,2.1,0,g);B(1.2,0.5,1.6,"#1e293b",6.4,2.0,0,g);[-3.5,0,3.5].forEach(function(x){[-0.9,0.9].forEach(function(z){var w=mesh(G.wheel,"#334155",x,0.45,z,g);w.rotation.x=Math.PI/2})});g.userData.len=14;return g}
function buildJepang(){setEnv("jepang");W_ground("#7fa86a",["rgba(60,100,50,.3)","rgba(170,210,140,.25)"],45);
 var fm=new THREE.MeshLambertMaterial({color:0x5b6b8a,fog:false}),fj=new THREE.Mesh(new THREE.ConeGeometry(150,110,40),fm);fj.position.set(0,55,-360);scene.add(fj);var fs=new THREE.Mesh(new THREE.ConeGeometry(52,38,40),new THREE.MeshLambertMaterial({color:0xf8fafc,fog:false}));fs.position.set(0,91,-360);scene.add(fs);
 W_mounts(["#6b8a7a","#5a7a6a"],10,220,280,40,70);
 pagoda(52,-26);var res=landRes([[52,-26,6],[-52,25,9]]);
 var tg=new THREE.Group();for(var t=0;t<4;t++){var zz=t*3.2;[-1.8,1.8].forEach(function(x){mesh(cyl(0.18,0.2,3.6,8),"#dc2626",x,1.8,zz,tg)});B(5,0.3,0.45,"#212121",0,3.75,zz,tg);B(4.4,0.25,0.3,"#dc2626",0,3.1,zz,tg)}
 placeFacing(tg,-57,28,[[-1.8,0,0.35],[1.8,0,0.35],[-1.8,3.2,0.35],[1.8,3.2,0.35],[-1.8,6.4,0.35],[1.8,6.4,0.35],[-1.8,9.6,0.35],[1.8,9.6,0.35]]);signPost("⛩️ GERBANG TORII","#b91c1c",-48,10,3.4);
 [[-10,-26],[10,-26],[-10,-34],[10,-34]].forEach(function(p){toro(p[0],p[1])});
 W_scatter(26,8,64,res,function(x,z){sakura(x,z,0.9+rnd()*0.4)});W_scatter(60,72,180,[[0,-200,80]],function(x,z){sakura(x,z,1.1+rnd()*0.5,false)});
 walkers([shinkansen()],40,9);
 var n=220,pp=new Float32Array(n*3);for(var q=0;q<n;q++){pp[q*3]=(Math.random()-.5)*120;pp[q*3+1]=Math.random()*12;pp[q*3+2]=(Math.random()-.5)*120}var pg=new THREE.BufferGeometry();pg.setAttribute("position",new THREE.BufferAttribute(pp,3));var pet=new THREE.Points(pg,new THREE.PointsMaterial({color:0xfbcfe8,size:0.3,transparent:true,opacity:.9}));pet.userData.dyn=true;scene.add(pet);var fr=0;
 animated.push(function(){if((fr++)%2)return;for(var q=0;q<n;q++){pp[q*3+1]-=0.03;pp[q*3]+=0.02;if(pp[q*3+1]<0){pp[q*3+1]=12;pp[q*3]=(Math.random()-.5)*120}}pg.attributes.position.needsUpdate=true});
 spaceKit(KIT);
 npcs4([{n:"Kenji",ic:"👦",o:OF("k1","r_pendek","t0","a_yukata","b1")},{n:"Yuki",ic:"👧",o:OF("k1","r_kuncir","t0","a_yukata","b1")},{n:"Pak Tanaka",ic:"👴",o:OF("k1","r_botak","t0","a_jas","b6",{wajah:"f_kc"})},{n:"Kak Sari (pelajar)",ic:"👩",o:OF("k2","r_panjang","t0","a_hoodie","b5")}]);
 buildBooks(bkFree([[52,-26,6],[-52,28,9]]),"prangko");buildLots()}
function pyramid(x,z,b,h,col){var p=mesh(G.hip,col||"#c49a5a",x,h/2,z,scene,false);p.scale.set(b/2,h,b/2);return p}
function unta(){var g=new THREE.Group(),c="#c2955a";var b=mesh(G.sph,c,0,2.2,0,g);b.scale.set(1.4,0.7,0.6);var hp=mesh(G.sph,c,-0.1,2.9,0,g);hp.scale.set(0.6,0.5,0.45);var nk=B(0.35,1.4,0.35,c,1.3,2.8,0,g);nk.rotation.z=-0.5;B(0.8,0.4,0.4,c,1.85,3.45,0,g);
 [[0.8,0.35],[0.8,-0.35],[-0.8,0.35],[-0.8,-0.35]].forEach(function(p){B(0.22,1.8,0.22,"#a87b45",p[0],0.9,p[1],g)});B(1,0.12,0.8,"#b91c1c",-0.1,2.95,0,g);g.userData.len=3.4;return g}
function buildMesir(){setEnv("mesir");W_ground("#cfae72",["rgba(160,120,70,.3)","rgba(235,215,165,.3)"],45);
 pyramid(-50,-180,80,52);pyramid(30,-210,70,46);pyramid(90,-170,36,24);[-10,10,30].forEach(function(x){pyramid(x+80,-130,10,7,"#cfae72")});
 for(var i=0;i<12;i++){var a=i/12*Math.PI*2,r=180+rnd()*80;if(Math.cos(a)<-0.4)continue;var d=mesh(G.ico,"#d9b97a",Math.sin(a)*r,0,Math.cos(a)*r,scene,false);d.scale.set(50+rnd()*30,10+rnd()*12,40+rnd()*30)}
 W_plane("#6b8e23",30,900,80,0,0.04);W_plane("#2f8fc0",80,900,135,0,0.06,.92);for(var p=-200;p<=200;p+=12)tree(74+rnd()*6,p+rnd()*4,2,1+rnd()*0.4,null,[]);
 var sx=new THREE.Group(),c="#d6b57a";B(3.6,3,10,c,0,1.5,-1,sx);B(1.2,1,4,c,-1.2,0.5,5.5,sx);B(1.2,1,4,c,1.2,0.5,5.5,sx);B(2.6,3,2.8,c,0,4.2,3.4,sx);var nm=mesh(G.hip,"#c9a463",0,5.3,3.2,sx);nm.scale.set(1.9,1.6,1.6);B(3.2,2.2,0.6,"#c9a463",0,3.9,2.1,sx);B(1.4,0.6,0.1,"#a3804a",0,3.6,4.82,sx);
 placeFacing(sx,54,-26,[[0,-3,2.4],[0,1.5,2.4],[0,5,2]]);signPost("🦁 SPHINX AGUNG","#92400e",48,-12,3.4);
 var ob=new THREE.Group();B(1.6,0.6,1.6,"#c9a463",0,0.3,0,ob);mesh(cyl(0.45,0.7,9,4),"#d8b878",0,5,0,ob);var pt=mesh(G.hip,"#d4a017",0,10.1,0,ob);pt.scale.set(0.48,1.2,0.48);placeFacing(ob,-52,24,[[0,0,1.2]]);signPost("🗿 OBELISK","#92400e",-48,14,3);
 var pr=new THREE.Group();B(6,1.6,3,"#6b8e23",0,0.8,0,pr);for(var k=0;k<10;k++){var st=mesh(cyl(0.05,0.05,2.4,4),"#4d7c0f",-2.6+k*0.58,2.4,(rnd()-.5)*2,pr);var tf=mesh(G.ico,"#65a30d",st.position.x,3.7,st.position.z,pr);tf.scale.set(0.4,0.2,0.4)}placeFacing(pr,52,22,[[0,0,3.2]]);signPost("📜 TANAMAN PAPIRUS","#4d7c0f",48,11,3.6);
 walkers([unta(),unta(),unta()],40,1.8);
 var res=landRes([[54,-26,8],[-52,24,4],[52,22,5]]);W_scatter(12,8,62,res,function(x,z){tree(x,z,2,0.9+rnd()*0.4)});W_scatter(18,8,64,res,function(x,z){rock(x,z,0.5+rnd(),"#cfae72")});
 spaceKit(KIT);
 npcs4([{n:"Ahmed",ic:"👦",o:OF("k3","r_pendek","t0","a_kk","b7")},{n:"Fatma",ic:"👧",o:OF("k3","r_panjang","t0","a_ku","b6")},{n:"Pemandu Omar",ic:"👨",o:OF("k3","r_botak","t_ranger","a_jas","b7",{wajah:"f_kh"})},{n:"Kak Laila",ic:"👩",o:OF("k2","r_kuncir","t0","a_jaket","b5")}]);
 buildBooks(bkFree([[54,-26,8],[-52,24,4],[52,22,5]]),"prangko");buildLots()}
function eiffel(x,z){var g=new THREE.Group(),c="#5b4a36",B1=7.5,B2=3.2,B3=1.5;
 [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(function(s){strut(s[0]*B1,0,s[1]*B1,s[0]*B2,16,s[1]*B2,0.75,0.45,c,g);strut(s[0]*B2,16,s[1]*B2,s[0]*B3,30,s[1]*B3,0.45,0.3,c,g);B(1.4,0.8,1.4,"#6b7280",s[0]*B1,0.4,s[1]*B1,g);
  for(var k=1;k<4;k++){var t=k/4,x1=s[0]*(B1+(B2-B1)*t),z1=s[1]*(B1+(B2-B1)*t),y1=16*t,t2=(k+1)/4,x2=s[0]*(B1+(B2-B1)*t2),z2=s[1]*(B1+(B2-B1)*t2);strut(x1,y1,z1,-s[0]*0+x2*0+x1,y1+4,-z1,0.12,0.12,c,g);strut(x1,y1,z1,-x1,y1+4,z1,0.12,0.12,c,g)}});
 [[0,1],[0,-1],[1,0],[-1,0]].forEach(function(d){var ar=mesh(new THREE.TorusGeometry(5,0.25,4,16,Math.PI),c,d[0]*5.6,15,d[1]*5.6,g);ar.rotation.z=Math.PI;if(d[0])ar.rotation.y=Math.PI/2});
 B(9.4,1,9.4,c,0,16,0,g);B(10,0.3,10,"#4b3a26",0,16.6,0,g);B(4.4,0.8,4.4,c,0,30,0,g);strut(0,30,0,0,48,0,1.5,0.4,c,g);B(1.4,1.2,1.4,c,0,44,0,g);mesh(cyl(0.08,0.12,5,6),"#9ca3af",0,50.5,0,g);
 g.position.set(x,0,z);scene.add(g);[[1,1],[1,-1],[-1,1],[-1,-1]].forEach(function(s){CIRC.push({x:x+s[0]*B1,z:z+s[1]*B1,r:1.5})});return g}
function arcTriomphe(x,z){var g=new THREE.Group(),c="#e8dcc2";[-3.6,3.6].forEach(function(px){B(3.2,10,5,c,px,5,0,g)});B(10.4,4,5,c,0,12,0,g);B(10.8,0.4,5.4,"#d6c8a8",0,10.1,0,g);B(10.8,0.5,5.4,"#d6c8a8",0,14.2,0,g);
 var ar=mesh(new THREE.TorusGeometry(2,0.3,4,12,Math.PI),"#d6c8a8",0,8,2.55,g);var ar2=mesh(new THREE.TorusGeometry(2,0.3,4,12,Math.PI),"#d6c8a8",0,8,-2.55,g);
 placeFacing(g,x,z,[[-3.6,0,2.4],[3.6,0,2.4]]);return g}
function lampu(x,z){mesh(cyl(0.08,0.12,3.6,6),"#1f2937",x,1.8,z,scene);var l=mesh(G.sph,MB("#fde68a"),x,3.7,z,scene);l.scale.setScalar(0.3);B(0.5,0.1,0.5,"#1f2937",x,3.95,z,scene);CIRC.push({x:x,z:z,r:0.25})}
function buildParis(){setEnv("paris");W_ground("#8a857f",["rgba(80,80,80,.3)","rgba(220,215,205,.3)"],60);
 eiffel(0,-56);signPost("🗼 MENARA EIFFEL","#1e3a8a",14,-47,3.6);arcTriomphe(54,22);signPost("🏛️ ARC DE TRIOMPHE","#1e3a8a",48,10,3.8);
 for(var i=0;i<16;i++){var a=i/16*Math.PI*2,r=78;if(Math.abs(Math.sin(a))<0.25&&Math.cos(a)<0)continue;var h=new THREE.Group();hausBody(h,null,3+(i%2));placeFacing(h,Math.sin(a)*r,Math.cos(a)*r)}
 [[-48,-20],[-48,0],[-48,20],[48,-20],[48,-40],[20,48],[-20,48],[0,-48]].forEach(function(p){lampu(p[0],p[1])});
 var cf=new THREE.Group();[[-2,0],[2,0],[0,2.5]].forEach(function(p,i){mesh(cyl(0.6,0.6,0.08,12),"#f5f5f4",p[0],1.0,p[1],cf);mesh(cyl(0.05,0.05,1,6),"#1f2937",p[0],0.5,p[1],cf);var um=mesh(new THREE.ConeGeometry(1.4,0.6,8),["#dc2626","#1d4ed8","#dc2626"][i],p[0],2.6,p[1],cf);mesh(cyl(0.04,0.04,2.4,6),"#1f2937",p[0],1.6,p[1],cf)});
 placeFacing(cf,-52,-10,[[-2,0,0.8],[2,0,0.8],[0,2.5,0.8]]);signPost("☕ CAFÉ","#9f1239",-48,-1,2.6);
 var res=landRes([[0,-56,12],[54,22,7],[-52,-10,5]]);W_scatter(18,8,62,res,function(x,z){tree(x,z,0,0.9+rnd()*0.3)});
 var cs=[makeCar("sedan","#1d4ed8"),makeCar("sedan","#f8fafc"),makeCar("sedan","#dc2626")];cs.forEach(function(g,i){g.userData.dyn=true;scene.add(g);var c={g:g,route:route(40,i%2===0),seg:i%4,t:i*7,speed:5+i,v:0,honkT:0,block:0};cars.push(c);placeCar(c,0)});
 spaceKit(KIT);
 npcs4([{n:"Pierre",ic:"👦",o:OF("k1","r_pendek","t_baret","a_jaket","b5",{leher:"l_syal"})},{n:"Amélie",ic:"👧",o:OF("k1","r_panjang","t_baret","a_km","b6")},{n:"Madame Claire",ic:"👩",o:OF("k2","r_kuncir","t0","a_hoodie","b6",{wajah:"f_kc"})},{n:"Kak Rudi (pelajar)",ic:"🧑",o:OF("k3","r_jabrik","t0","a_kb","b5",{leher:"l_kamera"})}]);
 buildBooks(bkFree([[0,-56,12],[54,22,7],[-52,-10,5]]),"prangko");buildLots()}

/* =================================================================
   WILAYAH TAMBAHAN: Istana Kerang, Gua Kapur, Raja Ampat, Jakarta, Tiongkok
   ================================================================= */
Object.assign(ENVS,{
 istana:E(0x7ee0f0,0x2a4f9a,0x3d7fb8,16,115,0xe6dcff,0x34507a,.75,0xfff0f6,.75,{nodisc:true}),
 gua:E(0x1a140f,0x0b0806,0x17110c,10,85,0xc9a27a,0x2a1d12,.55,0xffc98a,.35,{nodisc:true}),
 rajaampat:E(0x2f86e0,0xd6f3ff,0xc4ebf7,90,360,0xffffff,0x5aa0a0,.78,0xfff4e0,1),
 jakarta:E(0x5b9de6,0xe8eef5,0xdde4ea,80,330,0xffffff,0x6b8a5a,.75,0xfff4e0,.9),
 tiongkok:E(0x6fa3d8,0xeef3e6,0xe1e8d8,70,320,0xffffff,0x5f7f4f,.75,0xfff2e0,.9)});
WDEF.samudra.zones.push("istana");WDEF.rimba.zones.push("gua");WDEF.nusantara.zones.push("rajaampat","jakarta");WDEF.mancanegara.zones.push("tiongkok");
Object.assign(ZONES,{
 istana:ZD("samudra","Istana Kerang","🐚","Istana dari kerang raksasa, tempat kima, kuda laut, dan bintang laut.","linear-gradient(135deg,#f0abfc,#3b82f6)",["#2a4f7a","#e3c9b8"],"Lihat kima, kerang raksasa yang dilindungi!",function(){buildIstana()},SWIM),
 gua:ZD("rimba","Gua Kapur","🦇","Gua batu kapur dengan stalaktit, stalagmit, sungai bawah tanah, dan kelelawar.","linear-gradient(135deg,#a16207,#1c1917)",["#1c1712","#4a3b2c"],"Di dalam gua gelap. Ikuti lampu-lampu di jalan setapak.",function(){buildGua()}),
 rajaampat:ZD("nusantara","Raja Ampat","🛶","Gugusan pulau karst di laut biru Papua Barat Daya, surga terumbu karang dunia.","linear-gradient(135deg,#06b6d4,#0f766e)",["#1d8fb0","#e8dcb5"],"Lihat pulau-pulau karst yang menjulang dari laut biru.",function(){buildRajaAmpat()}),
 jakarta:ZD("nusantara","Jakarta","🏛️","Monas, Kota Tua, ondel-ondel, bajaj, dan gedung-gedung tinggi.","linear-gradient(135deg,#ef4444,#f8fafc)",["#5b7a4a","#a8b8a0"],"Monas ada di depanmu, Kota Tua di sebelah timur.",function(){buildJakarta()}),
 tiongkok:ZD("mancanegara","Tiongkok","🐼","Tembok Besar, gerbang paifang, lampion merah, dan panda di hutan bambu.","linear-gradient(135deg,#dc2626,#facc15)",["#4f6f40","#9fb88a"],"Nǐ hǎo! Tembok Besar membentang di utara.",function(){buildTiongkok()})});
Object.assign(FACTS,{
 istana:["Kima atau kerang raksasa bisa tumbuh lebih dari 1 meter dan hidup lebih dari 100 tahun. Di Indonesia, kima termasuk hewan yang dilindungi.",
  "Mutiara terbentuk ketika benda asing masuk ke dalam tubuh kerang, lalu kerang melapisinya dengan zat bernama nakre, lapis demi lapis.",
  "Bintang laut tidak punya otak dan tidak punya darah. Bintang laut juga bisa menumbuhkan kembali lengannya yang putus.",
  "Pada kuda laut, yang mengandung dan melahirkan anak-anaknya adalah kuda laut jantan."],
 gua:["Stalaktit tumbuh menggantung dari langit-langit gua, sedangkan stalagmit tumbuh dari lantai gua. Keduanya terbentuk dari endapan kapur yang terbawa tetesan air.",
  "Stalaktit tumbuh sangat lambat, rata-rata hanya sekitar 1 cm dalam 100 tahun. Karena itu, jangan pernah mematahkannya.",
  "Kelelawar mencari makan pada malam hari dan menemukan arah dengan ekolokasi, yaitu mengeluarkan suara lalu mendengar pantulannya.",
  "Gua-gua di Maros-Pangkep, Sulawesi Selatan, menyimpan lukisan cadas yang termasuk tertua di dunia. Salah satunya berumur lebih dari 51.000 tahun."],
 rajaampat:["Raja Ampat di Provinsi Papua Barat Daya terdiri atas sekitar 1.500 pulau kecil, gosong, dan karang.",
  "Perairan Raja Ampat memiliki lebih dari 550 jenis karang keras, kira-kira tiga perempat dari seluruh jenis karang di dunia.",
  "Nama Raja Ampat berasal dari legenda empat raja yang memerintah di empat pulau besar: Waigeo, Batanta, Salawati, dan Misool.",
  "Cenderawasih merah hanya ditemukan di beberapa pulau di Raja Ampat, seperti Waigeo dan Batanta."],
 jakarta:["Monumen Nasional (Monas) tingginya 132 meter. Di puncaknya ada lidah api yang dilapisi emas sebagai lambang semangat perjuangan.",
  "Monas dibangun untuk memperingati perjuangan kemerdekaan Indonesia. Pembangunannya dimulai tahun 1961 dan dibuka untuk umum tahun 1975.",
  "Ondel-ondel adalah boneka besar khas Betawi yang biasa diarak dalam perayaan dan pesta rakyat.",
  "Kota Tua Jakarta dulu adalah pusat kota Batavia. Gedung Museum Sejarah Jakarta (Museum Fatahillah) dulunya balai kota Batavia."],
 tiongkok:["Tembok Besar Tiongkok dibangun bertahap selama lebih dari 2.000 tahun untuk melindungi wilayah dari serangan dari utara.",
  "Menurut pengukuran pemerintah Tiongkok tahun 2012, panjang seluruh Tembok Besar beserta cabang-cabangnya sekitar 21.000 km.",
  "Kertas pertama kali dikembangkan di Tiongkok. Cai Lun menyempurnakan cara pembuatannya sekitar tahun 105 Masehi.",
  "Panda raksasa hidup di hutan bambu pegunungan Tiongkok, dan sebagian besar makanannya adalah bambu."]});
/* misi "kunjungi semua wilayah" mengikuti jumlah wilayah */
MISSIONS.forEach(function(m){var mm=/^w_(\w+)_z$/.exec(m.id);if(!mm)return;var w=mm[1];m.target=function(){return WDEF[w].zones.length};m.desc="Kunjungi "+WDEF[w].zones.map(function(z){return ZONES[z].nama}).join(", ")});

/* ---------- gaya gedung baru ---------- */
GSTYLE.rajaampat=GSTYLE.rimba;
GSTYLE.jakarta=function(g,col){B(10,0.8,8.4,"#9ca3af",0,0.4,0,g);B(9.4,0.25,2.4,"#d6c7a1",0,0.92,3.5,g);
 for(var i=-4;i<=4;i++){if(Math.abs(i)<1)continue;B(0.12,0.9,0.12,"#ffffff",i,1.45,4.6,g)}B(9.4,0.12,0.14,"#ffffff",-0,1.9,4.6,g);
 B(8.6,3.2,5.4,"#fef3c7",0,2.5,-0.6,g);[-3.6,-1.2,1.2,3.6].forEach(function(x){B(0.3,3.2,0.3,"#14532d",x,2.5,4.5,g)});
 [-3,3].forEach(function(x){B(1.4,1.6,0.08,"#166534",x,2.6,2.12,g);B(1.2,1.4,0.06,"#bbf7d0",x,2.6,2.15,g)});
 var rf=mesh(G.hip,"#7f1d1d",0,5.6,0.4,g);rf.scale.set(6.2,2.4,5.6);B(10.6,0.15,0.3,"#ffffff",0,4.15,5.3,g);for(var t=-5;t<=5;t+=0.5){var tt=mesh(G.pine,"#ffffff",t,3.9,5.3,g);tt.scale.set(0.16,0.4,0.08);tt.rotation.z=Math.PI}
 B(8.8,0.3,0.2,col,0,4.4,2.2,g);return{R:6.6,F:4.75,pz:2.15,py:2.05,ph:2.6,pw:1.8,sy:3.6,sz:4.75,ly:11}};
GSTYLE.tiongkok=function(g,col){B(10,1,8.4,"#9ca3af",0,0.5,0,g);B(3,0.5,1,"#9ca3af",0,0.25,4.7,g);B(8.4,3.4,6.6,"#fef2f2",0,2.7,0,g);
 [-4,-2,2,4].forEach(function(x){mesh(cyl(0.25,0.25,3.4,10),"#b91c1c",x,2.7,3.6,g)});[-4,4].forEach(function(x){mesh(cyl(0.25,0.25,3.4,10),"#b91c1c",x,2.7,-3.3,g)});
 [-2.8,2.8].forEach(function(x){B(1.4,1.4,0.06,"#7f1d1d",x,2.8,3.32,g)});B(9,0.4,7.6,"#b91c1c",0,4.6,0.2,g);
 var r1=mesh(G.hip,"#eab308",0,5.9,0.2,g);r1.scale.set(6.4,2.2,5.4);B(4,1,3.2,"#b91c1c",0,7.2,0,g);var r2=mesh(G.hip,"#eab308",0,8.3,0,g);r2.scale.set(3.6,1.4,2.8);
 [[-6,4.9],[6,4.9],[-6,-4.5],[6,-4.5]].forEach(function(p){var u=B(1.2,0.25,0.3,"#ca8a04",p[0]*0.96,5,p[1]*0.96,g);u.rotation.z=p[0]>0?0.45:-0.45});
 [-2.6,2.6].forEach(function(x){var l=mesh(G.sph,MB("#ef4444"),x,4.0,4.2,g);l.scale.set(0.45,0.55,0.45);B(0.06,0.4,0.06,"#facc15",x,3.45,4.2,g)});
 B(8.6,0.3,0.2,col,0,4.6,3.95,g);return{R:6.6,F:3.32,py:2.15,ph:2.6,pw:2.0,sy:4.6,sz:4.0,ly:11.5,circ:[[-2,3.6,0.4],[2,3.6,0.4]]}};

/* ---------- Istana Kerang ---------- */
function kima(x,z,s){var g=new THREE.Group();var lo=mesh(G.hemi,"#c4b5fd",0,0.4,0,g);lo.scale.set(1.6,0.9,1.1);lo.rotation.x=Math.PI;var up=mesh(G.hemi,"#a78bfa",0,0.5,-0.4,g);up.scale.set(1.6,0.9,1.1);up.rotation.x=-0.6;
 for(var k=0;k<5;k++){B(0.12,0.5,1.1,"#7c3aed",-1.2+k*0.6,0.2,0,g)}mesh(G.sph,"#14b8a6",0,0.45,0.1,g).scale.set(1.3,0.18,0.8);g.scale.setScalar(s);g.position.set(x,0,z);g.rotation.y=rnd()*6;scene.add(g);CIRC.push({x:x,z:z,r:1.6*s});return g}
function bintangLaut(x,z,col){var g=new THREE.Group();for(var i=0;i<5;i++){var a=i/5*Math.PI*2,l=B(0.9,0.12,0.28,col,Math.cos(a)*0.45,0.06,Math.sin(a)*0.45,g);l.rotation.y=-a}mesh(G.sph,col,0,0.08,0,g).scale.set(0.3,0.1,0.3);g.position.set(x,0,z);g.rotation.y=rnd()*6;scene.add(g)}
function kudaLaut(rad,y,sp,off,col){var g=new THREE.Group();var b=mesh(G.sph,col,0,0,0,g,false);b.scale.set(0.3,0.6,0.25);var hd=mesh(G.sph,col,0.1,0.6,0,g,false);hd.scale.set(0.35,0.2,0.18);var sn=B(0.4,0.1,0.1,col,0.45,0.6,0,g,false);
 var tl=mesh(new THREE.TorusGeometry(0.2,0.07,6,12,Math.PI*1.5),col,-0.05,-0.75,0,g,false);g.userData.dyn=true;scene.add(g);
 animated.push(function(t){var a=t*sp+off;g.position.set(Math.sin(a)*rad,y+Math.sin(t*0.002+off)*0.8,Math.cos(a)*rad);g.rotation.y=a+Math.PI/2})}
function buildIstana(){setEnv("istana");W_ground("#d9c3a8",["rgba(160,130,100,.3)","rgba(250,235,220,.3)"],45);W_seaSurface(34,.3);W_rays(10);
 var pal=new THREE.Group();mesh(cyl(18,20,3,24),"#e9d5c3",0,1.5,0,pal);mesh(cyl(12,14,6,20),"#fbcfe8",0,6,0,pal);
 [[0,0,9,26],[-9,4,5,18],[9,4,5,18],[-15,-2,3.4,12],[15,-2,3.4,12],[-5,-8,3,14],[5,-8,3,14]].forEach(function(t,i){mesh(cyl(t[2]*0.55,t[2]*0.7,t[3]*0.45,14),i%2?"#f9a8d4":"#fde68a",t[0],3+t[3]*0.22,t[1],pal);var cn=mesh(G.pine,i%2?"#f472b6":"#f59e0b",t[0],3+t[3]*0.45+t[3]*0.25,t[1],pal);cn.scale.set(t[2]*0.6,t[3]*0.5,t[2]*0.6);
  for(var r=0;r<3;r++){var rg=mesh(new THREE.TorusGeometry(t[2]*0.55-r*0.6,0.15,4,16),"#ffffff",t[0],3+t[3]*0.45+r*t[3]*0.12,t[1],pal);rg.rotation.x=Math.PI/2}});
 var gate=mesh(new THREE.TorusGeometry(3.4,0.6,8,20,Math.PI),"#f0abfc",0,3,12.8,pal);mesh(G.sph,MB("#fff7ed"),0,8.5,0,pal).scale.setScalar(1.6);
 pal.position.set(0,0,-74);scene.add(pal);CIRC.push({x:0,z:-74,r:19});signPost("🐚 ISTANA KERANG","#9d174d",8,-50,3.8);
 var res=seaRes().concat([[0,-70,24]]);
 [[50,-24],[-50,26],[52,24],[-46,-30]].forEach(function(p,i){kima(p[0],p[1],1.2+i*0.15)});signPost("🦪 KIMA (DILINDUNGI)","#6d28d9",44,-16,3.6);
 W_scatter(26,6,64,res,function(x,z){bintangLaut(x,z,["#f97316","#ef4444","#f59e0b","#ec4899"][Math.floor(rnd()*4)])});
 W_scatter(45,6,64,res,function(x,z,d){var s=0.7+rnd()*1.1;coral(x,z,s);if(d<68)CIRC.push({x:x,z:z,r:0.7*s})});W_scatter(18,8,64,res,function(x,z){kelp(x,z,5+Math.floor(rnd()*5))});W_kelpAnim();
 W_mounts(["#4a6aa0","#3d5a90"],14,170,230,30,60);
 kudaLaut(30,6,0.00018,0,"#fbbf24");kudaLaut(22,8,-0.00022,2,"#f472b6");kudaLaut(40,10,0.00012,4,"#fb923c");
 W_school(0,0,36,8,10,"#f9a8d4",0.00015,0.6);W_school(10,10,50,12,12,"#a5f3fc",-0.0001,0.6);turtle(46,9,0.00008,1);
 W_bubbles(220,120,32);spaceKit(KIT);
 npcs4([{n:"Penyelam Nadia",ic:"🤿",o:diver("k2","r_panjang")},{n:"Robo-Selam",ic:"🤖",robot:true,col:"#ec4899"},{n:"Penyelam Tio",ic:"🤿",o:diver("k3","r_jabrik")},{n:"Peneliti Ayu",ic:"👩‍🔬",o:diver("k1","r_kuncir")}]);
 buildBooks(bkFree([[50,-24,3],[-50,26,3],[52,24,3],[-46,-30,3]]),"mutiara");buildLots()}

/* ---------- Gua Kapur ---------- */
function buildGua(){setEnv("gua");W_ground("#4a3b2c",["rgba(20,14,8,.4)","rgba(120,95,70,.25)"],40);
 var ceil=new THREE.Mesh(new THREE.PlaneGeometry(400,400),M("#2a2016"));ceil.rotation.x=Math.PI/2;ceil.position.y=24;ceil.castShadow=false;scene.add(ceil);
 for(var i=0;i<26;i++){var a=i/26*Math.PI*2,r=74+rnd()*10,h=30,wl=mesh(G.ico,["#3a2d20","#4a3b2c","#2f241a"][i%3],Math.sin(a)*r,h/2-4,Math.cos(a)*r,scene,false);wl.scale.set(14+rnd()*8,h,14+rnd()*8)}
 var res=landRes([[52,-26,5],[0,-56,8]].concat([-60,-45,-30,-15,0,15,30,45,60].map(function(z){return[-50,z,9]})));
 W_scatter(70,4,70,[],function(x,z){var l=0.8+rnd()*4,st=mesh(G.pine,"#d6c3a5",x,24-l/2,z,scene,false);st.scale.set(0.3+rnd()*0.4,l,0.3+rnd()*0.4);st.rotation.x=Math.PI});
 W_scatter(40,8,64,res,function(x,z,d){var l=0.6+rnd()*2.6,sg=mesh(G.pine,"#c9b28f",x,l/2,z,scene);sg.scale.set(0.35+rnd()*0.4,l,0.35+rnd()*0.4);if(d<68)CIRC.push({x:x,z:z,r:0.5})});
 for(var c=0;c<4;c++){var cx=[30,-34,40,-20][c],cz=[40,-46,-44,46][c];mesh(G.pine,"#d6c3a5",cx,12,cz,scene).scale.set(1.4,24,1.4);if(Math.hypot(cx,cz)<68)CIRC.push({x:cx,z:cz,r:1.4})}
 var riv=W_plane("#1e6f8a",14,160,-50,0,0.06,.85);for(var b=-70;b<=70;b+=10){rock(-57+rnd()*2,b,0.8+rnd()*0.6,"#5c4a38",scene,false);rock(-43-rnd()*2,b+5,0.8+rnd()*0.6,"#5c4a38",scene,false)}
 for(var q=-66;q<=66;q+=7){if(Math.abs(q-12)<5)continue;CIRC.push({x:-50,z:q,r:6.4})}
 var br=new THREE.Group();B(16,0.4,3,"#78350f",0,1.2,0,br);[-7,7].forEach(function(x){B(0.3,1.6,0.3,"#5d4037",x,0.6,-1.4,br);B(0.3,1.6,0.3,"#5d4037",x,0.6,1.4,br)});br.position.set(-50,0,12);scene.add(br);
 var boat=new THREE.Group();B(3.6,0.6,1.3,"#92400e",0,0.3,0,boat);B(0.3,0.2,1.4,"#78350f",1.2,0.65,0,boat);boat.position.set(-50,0.1,-20);boat.rotation.y=Math.PI/2;boat.userData.dyn=true;scene.add(boat);animated.push(function(t){boat.position.y=0.1+Math.sin(t*0.002)*0.08});
 signPost("🌊 SUNGAI BAWAH TANAH","#0e7490",-38,-6,4.2);
 [[-8,-24],[8,-24],[-8,-40],[8,-40],[20,10],[-20,10],[30,-10],[-28,-12],[14,30],[-14,30]].forEach(function(p){mesh(cyl(0.08,0.1,2.4,6),"#3f3f46",p[0],1.2,p[1],scene);var l=mesh(G.sph,MB("#fbbf24"),p[0],2.5,p[1],scene);l.scale.setScalar(0.32);var hl=new THREE.Mesh(new THREE.CircleGeometry(2.2,16),new THREE.MeshBasicMaterial({color:0xfbbf24,transparent:true,opacity:.12,depthWrite:false}));hl.rotation.x=-Math.PI/2;hl.position.set(p[0],0.05,p[1]);scene.add(hl);CIRC.push({x:p[0],z:p[1],r:0.25})});
 var wall=new THREE.Group();B(12,7,1,"#6b5643",0,3.5,0,wall);var art=textPlane([{t:"✋  🐗  ✋",s:90,y:90,c:"#b45309"},{t:"Replika lukisan cadas",s:30,y:180,c:"#78350f"}],512,220,9,3.9,{bg:"#c8a982",rad:20});art.rotation.y=0;art.position.set(0,3.6,0.52);wall.add(art);placeFacing(wall,0,-56,[[-4,0,1],[0,0,1],[4,0,1]]);
 var bats=[];for(var k=0;k<14;k++){var bt=new THREE.Group(),bw=B(0.9,0.04,0.35,"#111827",0,0,0,bt,false);mesh(G.sph,"#1f2937",0,0,0,bt,false).scale.setScalar(0.18);bt.userData={w:bw,o:rnd()*6,r:10+rnd()*30,h:14+rnd()*8,s:(rnd()<.5?1:-1)*(0.0004+rnd()*0.0004),dyn:true};scene.add(bt);bats.push(bt)}
 animated.push(function(t){bats.forEach(function(b){var u=b.userData,a=t*u.s+u.o;b.position.set(Math.sin(a)*u.r,u.h+Math.sin(t*0.003+u.o),Math.cos(a)*u.r);b.rotation.y=a+(u.s>0?0:Math.PI);u.w.scale.x=0.6+Math.abs(Math.sin(t*0.02+u.o))*0.8})});
 var dr=new Float32Array(120*3);for(var d=0;d<120;d++){dr[d*3]=(Math.random()-.5)*120;dr[d*3+1]=Math.random()*24;dr[d*3+2]=(Math.random()-.5)*120}var dg=new THREE.BufferGeometry();dg.setAttribute("position",new THREE.BufferAttribute(dr,3));var drops=new THREE.Points(dg,new THREE.PointsMaterial({color:0x9bd3e6,size:0.18,transparent:true,opacity:.7}));drops.userData.dyn=true;scene.add(drops);var fr=0;
 animated.push(function(){if((fr++)%2)return;for(var d=0;d<120;d++){dr[d*3+1]-=0.4;if(dr[d*3+1]<0)dr[d*3+1]=24}dg.attributes.position.needsUpdate=true});
 spaceKit(KIT);
 npcs4([{n:"Peneliti Gua Andi",ic:"🧑‍🔬",o:OF("k3","r_pendek","t_helm","a_ranger","b4",{punggung:"p_tas"})},{n:"Ranger Sari",ic:"👩‍🌾",o:ranger("k2","r_kuncir")},{n:"Pemandu Daeng Rudi",ic:"👨",o:OF("k4","r_botak","t_helm","a_jaket","b6")},{n:"Kak Nia",ic:"👧",o:OF("k2","r_panjang","t_helm","a_kh","b5")}]);
 buildBooks(bkFree([[-50,0,10],[-50,30,10],[-50,-30,10],[0,-56,8]]),"daun");buildLots()}

/* ---------- Raja Ampat ---------- */
function karst(x,z,s){var g=new THREE.Group();var b=mesh(G.ico,"#8a8f7a",0,s*0.9,0,g,false);b.scale.set(s*0.75,s*1.1,s*0.75);var tp=mesh(G.ico,"#2f7d43",0,s*1.75,0,g,false);tp.scale.set(s*0.95,s*0.55,s*0.95);var nk=mesh(cyl(s*0.45,s*0.6,s*0.5,8),"#6b7060",0,s*0.15,0,g,false);
 g.position.set(x,0,z);g.rotation.y=rnd()*6;scene.add(g);return g}
function cenderawasih(rad,h,sp,off){var g=new THREE.Group();B(0.7,0.4,0.4,"#7f1d1d",0,0,0,g,false);B(0.35,0.35,0.35,"#fde047",0.45,0.15,0,g,false);B(0.35,0.3,0.36,"#065f46",0.55,0.12,0,g,false);
 var pl=B(1.4,0.08,0.6,"#dc2626",-0.9,-0.1,0,g,false);B(1.6,0.02,0.04,"#111",-1.3,-0.2,0.15,g,false);B(1.6,0.02,0.04,"#111",-1.3,-0.2,-0.15,g,false);
 var wl=B(0.5,0.06,1,"#7f1d1d",0,0.1,0.6,g,false),wr=B(0.5,0.06,1,"#7f1d1d",0,0.1,-0.6,g,false);g.userData.dyn=true;scene.add(g);
 animated.push(function(t){var a=t*sp+off;g.position.set(Math.sin(a)*rad,h+Math.sin(t*0.001+off)*1.5,Math.cos(a)*rad);g.rotation.y=a+(sp>0?0:Math.PI);var f=Math.sin(t*0.014+off)*0.6;wl.rotation.x=f;wr.rotation.x=-f;pl.rotation.z=Math.sin(t*0.003)*0.1})}
function buildRajaAmpat(){setEnv("rajaampat");var sea=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshLambertMaterial({color:0x22b8cf}));sea.rotation.x=-Math.PI/2;sea.position.y=-0.02;scene.add(sea);
 var lag=new THREE.Mesh(new THREE.RingGeometry(68,90,48),new THREE.MeshLambertMaterial({color:0x5eead4,transparent:true,opacity:.85}));lag.rotation.x=-Math.PI/2;lag.position.y=0.01;scene.add(lag);
 var sand=new THREE.Mesh(new THREE.CircleGeometry(72,64),new THREE.MeshLambertMaterial({map:noiseTex("#efe3c0",["rgba(200,180,140,.3)","rgba(255,250,235,.3)"],30,1200)}));sand.rotation.x=-Math.PI/2;sand.position.y=0.03;sand.receiveShadow=true;scene.add(sand);
 var grass=new THREE.Mesh(new THREE.CircleGeometry(40,48),M("#5e8f3e"));grass.rotation.x=-Math.PI/2;grass.position.y=0.05;grass.receiveShadow=true;scene.add(grass);
 for(var i=0;i<34;i++){var a=rnd()*Math.PI*2,r=95+rnd()*160;karst(Math.sin(a)*r,Math.cos(a)*r,6+rnd()*12)}
 var jt=new THREE.Group();B(3,0.3,30,"#a16207",0,1,0,jt);for(var p=-14;p<=14;p+=3.5){B(0.3,1.4,0.3,"#713f12",-1.4,0.4,p,jt);B(0.3,1.4,0.3,"#713f12",1.4,0.4,p,jt)}jt.position.set(56,0,-50);jt.rotation.y=0.8;scene.add(jt);
 for(var h=0;h<5;h++){var hs=new THREE.Group();[-1.6,1.6].forEach(function(x){[-1.4,1.4].forEach(function(z){B(0.25,2.2,0.25,"#713f12",x,1.1,z,hs)})});B(4,0.25,3.4,"#a16207",0,2.2,0,hs);B(3.4,2,2.8,"#d6b37a",0,3.3,0,hs);var rf=mesh(G.hip,"#7c5a2e",0,5.1,0,hs);rf.scale.set(2.4,1.4,2);var ang=Math.PI*0.15+h*0.32,rr=80;placeFacing(hs,Math.sin(ang)*rr,Math.cos(ang)*rr)}
 [[60,30],[-62,-24],[-30,62]].forEach(function(p,i){var k=new THREE.Group();var hl=B(3.4,0.4,0.9,["#f97316","#facc15","#22c55e"][i],0,0.3,0,k);B(0.06,0.06,2.6,"#713f12",0,0.7,0,k).rotation.x=0.3;k.position.set(p[0],0.05,p[1]);k.rotation.y=rnd()*3;scene.add(k);CIRC.push({x:p[0],z:p[1],r:1.6})});
 var res=landRes([[60,30,3],[-62,-24,3],[-30,62,3]]);W_scatter(26,8,64,res,function(x,z){tree(x,z,2,0.9+rnd()*0.5)});W_scatter(10,8,40,res,function(x,z){tree(x,z,0,0.9+rnd()*0.4)});
 W_scatter(10,8,64,res,function(x,z){rock(x,z,0.6+rnd(),"#a8a29e")});
 var vp=new THREE.Group();B(6,0.3,4,"#a16207",0,3,0,vp);[[-2.6,-1.6],[2.6,-1.6],[-2.6,1.6],[2.6,1.6]].forEach(function(q){B(0.3,3,0.3,"#713f12",q[0],1.5,q[1],vp)});B(6,0.1,0.1,"#713f12",0,3.9,1.9,vp);[0,1,2].forEach(function(s){B(1.4,0.2,0.8,"#a16207",3.6+s*0.0,0.5+s*0.9,-1.0+s*0.9,vp)});placeFacing(vp,-52,10,[[0,0,3.4]]);signPost("🌅 TITIK PANDANG PIANEMO","#0f766e",-44,4,4.4);
 cenderawasih(30,16,0.00013,0);cenderawasih(48,20,-0.0001,3);
 spaceKit(KIT);
 npcs4([{n:"Bapak Yohan",ic:"👨",o:OF("k5","r_kribo","t_caping","a_kh","b6")},{n:"Mama Ester",ic:"👩",o:OF("k5","r_kribo","t0","a_ikat","b2")},{n:"Kakak Daud (pemandu selam)",ic:"🤿",o:diver("k5","r_kribo")},{n:"Adik Sara",ic:"👧",o:OF("k5","r_kuncir","t0","a_sd","b2")}]);
 buildBooks(bkFree([[60,30,3],[-62,-24,3],[-30,62,3],[-52,10,5]]),"wastra");buildLots()}

/* ---------- Jakarta ---------- */
function bajaj(){var g=new THREE.Group();B(2.4,1.5,1.4,"#f97316",-0.2,1.2,0,g);B(0.9,1.3,1.3,"#f97316",1.2,1.1,0,g);B(0.1,0.8,1.2,"#7fd6ff",1.62,1.4,0,g);B(2.6,0.1,1.5,"#1f2937",0,2.0,0,g);
 [[1.3,0],[-0.9,0.65],[-0.9,-0.65]].forEach(function(p){var w=mesh(G.wheel,"#1f2937",p[0],0.4,p[1],g);w.rotation.x=Math.PI/2;w.scale.setScalar(0.85)});g.userData.len=3.2;return g}
function ondel(x,z,col,face){var g=new THREE.Group();mesh(cyl(0.9,1.2,3.6,12),col,0,1.8,0,g);B(2.2,0.4,0.5,"#facc15",0,3.2,0,g);var hd=mesh(G.sph,face,0,4.3,0,g);hd.scale.set(0.8,0.95,0.75);
 for(var k=0;k<9;k++){var a=k/9*Math.PI*2,h=mesh(cyl(0.05,0.05,1.6,4),k%2?"#ef4444":"#facc15",Math.sin(a)*0.5,5.6,Math.cos(a)*0.5,g);h.rotation.set(Math.cos(a)*0.4,0,-Math.sin(a)*0.4)}
 B(0.18,0.1,0.05,"#111",-0.25,4.5,0.75,g);B(0.18,0.1,0.05,"#111",0.25,4.5,0.75,g);B(0.4,0.1,0.05,"#7f1d1d",0,4.0,0.74,g);placeFacing(g,x,z,[[0,0,1.3]]);return g}
function buildJakarta(){setEnv("jakarta");W_ground("#6f9a50",["rgba(50,90,40,.3)","rgba(150,190,110,.25)"],45);
 W_plane("#c7c2b8",8,76,0,0,0.04);W_plane("#c7c2b8",76,8,0,0,0.045);[[-40,0,8,88],[40,0,8,88],[0,-40,88,8],[0,40,88,8]].forEach(function(r){W_plane("#4b5563",r[2],r[3],r[0],r[1],0.06)});
 var mo=new THREE.Group();B(22,1.2,22,"#e5e7eb",0,0.6,0,mo);B(16,5,16,"#f3f4f6",0,3.6,0,mo);var cw=mesh(cyl(9,5,3,4),"#e5e7eb",0,7.6,0,mo);cw.rotation.y=Math.PI/4;
 mesh(cyl(1.4,2.6,34,4),"#f8fafc",0,26,0,mo).rotation.y=Math.PI/4;mesh(cyl(2.6,2.2,2,4),"#e5e7eb",0,43.6,0,mo).rotation.y=Math.PI/4;var fl=mesh(G.pine,"#facc15",0,46.8,0,mo);fl.scale.set(1.3,4.4,1.3);var fb=mesh(G.sph,"#eab308",0,45.2,0,mo);fb.scale.set(1.4,0.8,1.4);
 mo.position.set(0,0,-58);scene.add(mo);CIRC.push({x:0,z:-58,r:11});signPost("🏛️ MONUMEN NASIONAL (MONAS)","#b91c1c",10,-42,5);
 var kt=new THREE.Group();B(16,7,8,"#f8fafc",0,3.5,0,kt);B(16.4,0.4,8.4,"#d4d4d4",0,7.2,0,kt);var rf=mesh(G.hip,"#b45309",0,8.6,0,kt);rf.scale.set(8.4,2.6,4.4);B(2.6,3,2.6,"#f8fafc",0,10.6,0,kt);mesh(G.hemi,"#b45309",0,12.1,0,kt).scale.set(1.4,1.2,1.4);
 for(var w=-6;w<=6;w+=2){B(1,1.6,0.08,"#1e3a8a",w,2.2,4.02,kt);B(1,1.6,0.08,"#1e3a8a",w,5.2,4.02,kt)}B(2,3,0.1,"#7c2d12",0,1.5,4.05,kt);placeFacing(kt,54,-24,[[-5,0,3.5],[0,0,3.5],[5,0,3.5]]);signPost("🏛️ MUSEUM FATAHILLAH (KOTA TUA)","#78350f",46,-12,5);
 ondel(-50,22,"#b91c1c","#dc2626");ondel(-46,28,"#1d4ed8","#fef3c7");signPost("🎭 ONDEL-ONDEL BETAWI","#b91c1c",-40,16,4);
 for(var s=0;s<18;s++){var a=s/18*Math.PI*2,r=96+rnd()*40,hh=20+rnd()*45,bw=8+rnd()*8,bld=B(bw,hh,bw,["#cbd5e1","#94a3b8","#e2e8f0","#7dd3fc"][s%4],Math.sin(a)*r,hh/2,Math.cos(a)*r,scene,false);
  for(var f=4;f<hh;f+=4){B(bw+0.1,0.6,bw+0.1,"#1e3a8a",Math.sin(a)*r,f,Math.cos(a)*r,scene,false)}}
 var cs=[bajaj(),bajaj(),makeCar("bus",""),makeCar("sedan","#ffffff")];cs.forEach(function(g,i){g.userData.dyn=true;scene.add(g);var c={g:g,route:route(40,i%2===0),seg:i%4,t:i*6,speed:4+i,v:0,honkT:0,block:0};cars.push(c);placeCar(c,0)});
 var res=landRes([[0,-58,13],[54,-24,8],[-48,25,6]]);W_scatter(24,8,64,res,function(x,z){tree(x,z,0,0.9+rnd()*0.4)});
 [[-48,-10],[48,10],[-48,-30],[20,48],[-20,48]].forEach(function(p){lampu(p[0],p[1])});
 spaceKit(KIT);
 npcs4([{n:"Bang Rizky",ic:"👨",o:OF("k3","r_pendek","t_pet","a_batik","b6")},{n:"Mpok Siti",ic:"👩",o:OF("k2","r_panjang","t0","a_batik","b7")},{n:"Pak Joko (pemandu)",ic:"👨‍🦳",o:OF("k3","r_botak","t0","a_jas","b6",{wajah:"f_kc"})},{n:"Kak Dinda",ic:"👧",o:OF("k2","r_kuncir","t0","a_sma","b3")}]);
 buildBooks(bkFree([[0,-58,13],[54,-24,8],[-48,25,6]]),"wastra");buildLots()}

/* ---------- Tiongkok ---------- */
function panda(x,z){var g=new THREE.Group();var b=mesh(G.sph,"#f8fafc",0,1,0,g);b.scale.set(0.9,0.85,0.8);var hd=mesh(G.sph,"#f8fafc",0,2.05,0.2,g);hd.scale.set(0.6,0.55,0.55);
 [-0.4,0.4].forEach(function(s){mesh(G.sph,"#111",s,2.5,0.15,g).scale.setScalar(0.18);mesh(G.sph,"#111",s*0.5,2.1,0.66,g).scale.set(0.12,0.14,0.05);var lg=mesh(G.sph,"#111",s*1.2,0.45,0.4,g);lg.scale.set(0.3,0.35,0.4);var ar=mesh(G.sph,"#111",s*1.3,1.3,0.2,g);ar.scale.set(0.25,0.45,0.25)});
 B(0.8,0.6,0.85,"#111",0,1.55,0,g);var bb=mesh(cyl(0.05,0.05,1.2,5),"#65a30d",0.5,1.4,0.6,g);bb.rotation.z=0.5;placeFacing(g,x,z,[[0,0,1]]);return g}
function bambu(x,z){var b=new THREE.Group();for(var k=0;k<8;k++){var h=5+rnd()*3,s=mesh(cyl(0.1,0.12,h,6),"#65a30d",(rnd()-.5)*1.6,h/2,(rnd()-.5)*1.6,b);s.rotation.z=(rnd()-.5)*0.15;var lf=mesh(G.ico,"#4d7c0f",s.position.x,h,s.position.z,b);lf.scale.set(0.9,0.4,0.9)}b.position.set(x,0,z);scene.add(b);CIRC.push({x:x,z:z,r:1.1})}
function buildTiongkok(){setEnv("tiongkok");W_ground("#7a9a5f",["rgba(60,90,40,.3)","rgba(160,190,120,.25)"],45);
 W_mounts(["#5f7f4f","#6b8f5a","#4f6f40"],18,120,190,30,60);
 var pts=[[-140,-95],[-100,-80],[-70,-92],[-40,-76],[-12,-84],[16,-74],[40,-86],[70,-78],[100,-92],[140,-84]];
 for(var i=0;i<pts.length-1;i++){var a=pts[i],b=pts[i+1],dx=b[0]-a[0],dz=b[1]-a[1],L=Math.hypot(dx,dz),ang=Math.atan2(dz,dx),cx=(a[0]+b[0])/2,cz=(a[1]+b[1])/2,hy=3+((i%3)*2);
  var w=B(L+1,6,4,"#a8a29e",cx,hy,cz,scene,false);w.rotation.y=-ang;var top=B(L+1,0.4,4.6,"#78716c",cx,hy+3.2,cz,scene,false);top.rotation.y=-ang;
  for(var c=-L/2+1;c<L/2;c+=2){var mx=cx+Math.cos(ang)*c,mz=cz+Math.sin(ang)*c;[-1,1].forEach(function(sd){var cr=B(1,1,0.6,"#78716c",mx-Math.sin(ang)*sd*2.1,hy+3.8,mz+Math.cos(ang)*sd*2.1,scene,false);cr.rotation.y=-ang})}
  var tw=new THREE.Group();B(7,9,7,"#a8a29e",0,hy+1.5,0,tw,false);B(7.6,0.5,7.6,"#78716c",0,hy+6.2,0,tw,false);var tr=mesh(G.hip,"#57534e",0,hy+7.4,0,tw,false);tr.scale.set(4,1.8,4);for(var q=-2;q<=2;q+=2)B(1,1.6,0.1,"#292524",q,hy+3,3.52,tw,false);tw.position.set(a[0],0,a[1]);scene.add(tw)}
 signPost("🧱 TEMBOK BESAR TIONGKOK","#991b1b",-10,-56,4.6);
 var pf=new THREE.Group();[-4.5,-1.5,1.5,4.5].forEach(function(x){mesh(cyl(0.35,0.4,6,10),"#b91c1c",x,3,0,pf)});B(11,0.6,0.8,"#b91c1c",0,6.2,0,pf);B(10,1,0.5,"#1e3a8a",0,5.2,0,pf);var pr=mesh(G.hip,"#eab308",0,7.3,0,pf);pr.scale.set(6.4,1.4,1.2);B(3.6,0.7,0.2,"#facc15",0,5.2,0.3,pf);
 placeFacing(pf,0,-40,[[-4.5,0,0.5],[-1.5,0,0.5],[1.5,0,0.5],[4.5,0,0.5]]);
 [[-10,-30],[10,-30],[-10,-46],[10,-46]].forEach(function(p){mesh(cyl(0.12,0.12,3.4,6),"#7f1d1d",p[0],1.7,p[1],scene);var l=mesh(G.sph,MB("#ef4444"),p[0],3.6,p[1],scene);l.scale.set(0.6,0.7,0.6);B(0.08,0.5,0.08,"#facc15",p[0],2.85,p[1],scene);CIRC.push({x:p[0],z:p[1],r:0.3})});
 var res=landRes([[0,-40,7],[52,26,10],[-52,24,7]]);
 for(var bb=0;bb<9;bb++){var aa=Math.atan2(26,54)+0.9+bb/8*(Math.PI*2-1.8);bambu(54+Math.cos(aa)*7,26+Math.sin(aa)*7)}panda(52,24);panda(56,28);signPost("🐼 PANDA RAKSASA","#166534",44,14,3.6);
 var pv=new THREE.Group();[[-2.4,-2.4],[2.4,-2.4],[-2.4,2.4],[2.4,2.4]].forEach(function(q){mesh(cyl(0.2,0.2,3.4,8),"#b91c1c",q[0],2,q[1],pv)});B(6,0.6,6,"#9ca3af",0,0.3,0,pv);var pvr=mesh(G.hip,"#eab308",0,4.6,0,pv);pvr.scale.set(4,1.6,4);placeFacing(pv,-52,24,[[0,0,3.6]]);signPost("📜 PAVILIUN KERTAS (CAI LUN)","#991b1b",-44,16,4.4);
 W_scatter(22,8,64,res,function(x,z){tree(x,z,rnd()<.5?0:1,0.9+rnd()*0.4)});
 spaceKit(KIT);
 npcs4([{n:"Li Wei",ic:"👦",o:OF("k1","r_pendek","t0","a_km","b6")},{n:"Mei",ic:"👧",o:OF("k1","r_kuncir","t0","a_kk","b1")},{n:"Pak Zhang",ic:"👴",o:OF("k1","r_botak","t_caping","a_jas","b6")},{n:"Kak Rina (pelajar)",ic:"👩",o:OF("k2","r_panjang","t0","a_hoodie","b5",{leher:"l_kamera"})}]);
 buildBooks(bkFree([[0,-40,7],[52,26,10],[-52,24,7]]),"prangko");buildLots()}

/* =================================================================
   MAIN BERSAMA (multiplayer teman sekelas)
   ================================================================= */
var RT_DEFAULT=String((window.ZUPERVERSE_CONFIG||{}).realtimeUrl||"");
var RT_URL=(function(){var q=null;try{q=new URLSearchParams(location.search).get("rt")}catch(e){}if(q!=null){lsSet("zd2_rt",q);return q}var s=lsGet("zd2_rt",null);return s!=null?s:RT_DEFAULT})();
var RT={ws:null,on:false,retry:0,tm:null,stop:false,peers:{},roster:[],me:null,lastP:null,lastSend:0,scSig:"",chk:0,self:{emo:null,et:0},oT:null};
var EMO_LIST=["👋","😀","👍","🎉","❤️","🤔","😮","💪"],FRASA=["Ayo ke gedung mapel!","Ayo belajar bareng!","Selamat ya!","Aku butuh bantuan","Ikuti aku!","Terima kasih!"];
function rtWanted(){return!!((CL||GURU)&&RT_URL&&P.settings.mp!==false&&mode!=="landing"&&typeof WebSocket!=="undefined")}
function rtConnect(){if(RT.ws||RT.stop||!rtWanted())return;var ws;
 var base=RT_URL.replace(/\/+$/,"")+"/kelas?kode=";
 try{ws=new WebSocket(GURU?base+encodeURIComponent(GURU.kode)+"&guru=1":base+encodeURIComponent(CL.kode)+"&token="+encodeURIComponent(CL.token))}catch(e){rtLater();return}
 RT.ws=ws;ws.onopen=function(){if(GURU){try{ws.send(JSON.stringify({t:"auth",lic:licBody(),pin:GURU.pin,mode:"play"}))}catch(e){}return}RT.on=true;RT.retry=0;rtHello("hi");updOnline()};
 ws.onmessage=function(ev){var d;try{d=JSON.parse(ev.data)}catch(e){return}rtMsg(d)};
 ws.onclose=function(ev){RT.ws=null;RT.on=false;rtClearPeers();RT.roster=[];updOnline();if(GURU)updGuruUI();if(ev&&ev.code===4001){RT.stop=true;return}if(ev&&ev.code===4000){RT.stop=true;toast("👥 Akunmu dibuka di perangkat lain. Main bersama di perangkat ini dihentikan.",4500);return}rtLater()};
 ws.onerror=function(){}}
function rtLater(){if(RT.stop||RT.tm)return;var d=Math.min(30000,2000*Math.pow(2,RT.retry++));RT.tm=setTimeout(function(){RT.tm=null;rtConnect()},d)}
function rtClose(){clearTimeout(RT.tm);RT.tm=null;if(RT.ws){var w=RT.ws;RT.ws=null;w.onclose=null;try{w.close()}catch(e){}}RT.on=false;rtClearPeers();RT.roster=[];updOnline()}
function rtSend(o){if(RT.ws&&RT.on){try{RT.ws.send(JSON.stringify(o))}catch(e){}}}
function rtP(){var o=lobiOff()||{x:0,y:0,z:0};return[Math.round((pos.x-o.x)*100)/100,Math.round((pos.y-o.y)*100)/100,Math.round((pos.z-o.z)*100)/100,Math.round(heading*100)/100]}
function rtAbs(p){var o=lobiOff();return o&&p?[p[0]+o.x,p[1]+o.y,p[2]+o.z,p[3]]:p}
function rtSc(){return{lv:P.level,bh:dailyN(),g:Object.keys(P.stats.done).length}}
function rtHello(t){RT.scSig=JSON.stringify(rtSc());RT.stSig="";RT.lastP=rtP();rtSend({t:t,z:lobiZone(),o:P.outfit,p:RT.lastP,sc:rtSc()});if(WAIT&&!WAIT.go)rtSend({t:"siap",id:WAIT.id})}
function rtPeer(d,abs){if(d.id===RT.me)return;rtDrop(d.id);var g=buildAvatar(d.o||DEF_OUTFIT),tag=d.g?nameTag("👩‍🏫 "+(d.nama||"Guru")+" (Guru)","#fbbf24",3.2):nameTag((d.nama||"Teman")+" • Lv "+(d.lv||1),"#38bdf8",2.6);tag.position.set(0,6,0);g.add(tag);g.userData.dyn=true;
 var p=d.p?(abs?d.p:rtAbs(d.p)):(lobiOff()?[lobiOff().x,lobiOff().y,lobiOff().z,0]:[CUR.spawn[0],0,CUR.spawn[2],0]);g.position.set(p[0],p[1],p[2]);g.rotation.y=p[3];scene.add(g);RT.peers[d.id]={id:d.id,nama:d.nama,g:g,tgt:p.slice(),walk:0,emo:null,et:0,lv:d.lv||1,o:d.o,guru:d.g}}
function rtDrop(id){var pr=RT.peers[id];if(!pr)return;scene.remove(pr.g);pr.g.traverse(function(x){if(x.material&&x.material.map)x.material.map.dispose()});delete RT.peers[id]}
function rtClearPeers(){Object.keys(RT.peers).forEach(rtDrop)}
function rtMsg(d){
 if(rtGuruMsg(d))return;
 if(d.t==="all"){RT.me=d.me;rtClearPeers();(d.list||[]).forEach(rtPeer);if(d.list&&d.list.length&&mode==="play")toast("👥 "+d.list.length+" teman sekelas ada di sini",2500)}
 else if(d.t==="join"){rtPeer(d);if(mode==="play")toast((d.g?"👩‍🏫 "+d.nama+" (guru) datang ke sini":"👋 "+d.nama+" datang ke sini"),2200)}
 else if(d.t==="left")rtDrop(d.id);
 else if(d.t==="p"){var a=RT.peers[d.id];if(a&&d.p)a.tgt=rtAbs(d.p)}
 else if(d.t==="e"){var b=RT.peers[d.id];if(b)rtEmote(b.g,d.e,b)}
 else if(d.t==="o"){var c=RT.peers[d.id];if(c)rtPeer({id:d.id,nama:c.nama,o:d.o,p:c.tgt,lv:c.lv,g:c.guru},true)}
 else if(d.t==="go"){rtTanGo(d)}
 else if(d.t==="roster"){RT.roster=d.list||[];if(WAIT)setTimeout(waitUpd,0);RT.roster.forEach(function(r){var q=RT.peers[r.id];if(q&&!q.guru&&r.sc&&r.sc.lv!==q.lv){q.lv=r.sc.lv;rtPeer({id:q.id,nama:q.nama,o:q.o,p:q.tgt,lv:q.lv},true)}});updOnline();if($("ovOnline").classList.contains("show"))renderOnline()}}
function rtEmote(g,e,h){if(h.emo){if(h.emo.parent)h.emo.parent.remove(h.emo);if(h.emo.material.map)h.emo.material.map.dispose()}var long=e.length>3;
 var sp=sprite([{t:e,s:long?40:92,y:long?60:72,c:"#1f2550"}],long?512:160,long?120:144,(long?5:1.5)/0.62,(long?1.17:1.35)/0.62,{bg:"#ffffff",rad:34,border:"#fbbf24",bw:6});sp.position.set(0,7.7,0);g.add(sp);h.emo=sp;h.et=performance.now()+3500}
function rtTick(dt,now){
 if(now-RT.chk>1000){RT.chk=now;if(rtWanted()){if(!RT.ws&&!RT.tm)rtConnect()}else if(RT.ws||RT.tm)rtClose();
  if(RT.on){var sg=JSON.stringify(rtSc());if(sg!==RT.scSig){RT.scSig=sg;rtSend({t:"sc",sc:rtSc()})}if(!GURU){var st=rtStatus(),ss=st.s+"|"+st.m+"|"+(st.q?JSON.stringify(st.q):"");if(ss!==RT.stSig){RT.stSig=ss;rtSend({t:"st",s:st.s,m:st.m,q:st.q||null})}}}}
 Object.keys(RT.peers).forEach(function(id){var pr=RT.peers[id],g=pr.g,t=pr.tgt,k=Math.min(1,dt*9),dx=t[0]-g.position.x,dz=t[2]-g.position.z,dist=Math.hypot(dx,dz);
  if(dist>25){g.position.set(t[0],t[1],t[2])}else{g.position.x+=dx*k;g.position.z+=dz*k;g.position.y+=(t[1]-g.position.y)*k}
  var dr=t[3]-g.rotation.y;while(dr>Math.PI)dr-=Math.PI*2;while(dr<-Math.PI)dr+=Math.PI*2;g.rotation.y+=dr*Math.min(1,dt*10);
  var mv=dist>0.08;if(mv)pr.walk+=dt*11;else pr.walk*=0.85;var ry=t[1]-(lobiOff()?lobiOff().y:0);animAvatar(g,mv&&ry<0.4,pr.walk,ry>0.4,now,false);
  if(pr.emo&&now>pr.et){g.remove(pr.emo);pr.emo=null}});
 if(RT.self.emo&&now>RT.self.et){if(RT.self.emo.parent)RT.self.emo.parent.remove(RT.self.emo);RT.self.emo=null}
 if(RT.on&&mode==="play"&&now-RT.lastSend>250){var p=rtP(),l=RT.lastP;if(!l||Math.abs(p[0]-l[0])+Math.abs(p[2]-l[2])>0.05||Math.abs(p[1]-l[1])>0.05||Math.abs(p[3]-l[3])>0.05){RT.lastP=p;RT.lastSend=now;rtSend({t:"p",p:p})}}}
function rtOutfit(){if(!RT.on)return;clearTimeout(RT.oT);RT.oT=setTimeout(function(){rtSend({t:"o",o:P.outfit})},800)}
function sendEmote(e){if(!avatar)return;rtEmote(avatar,e,RT.self);rtSend({t:"e",e:e});$("emoPanel").classList.remove("show");SFX.click()}
function railUpd(){$("rgSoc").style.display=($("bEmo").style.display!=="none"||$("bGuruT").style.display!=="none")?"":"none"}
function updOnline(){var el=$("hOnline"),n=RT.roster.length;if(!RT.on){el.style.display="none";$("bEmo").style.display="none";railUpd();return}railUpd.q=1;setTimeout(railUpd,0);el.style.display="block";$("bEmo").style.display="";
 var here=Object.keys(RT.peers).length;if(tanCurId()){var zz=lobiZone(),np=RT.roster.filter(function(r){return!r.g&&r.z===zz}).length;el.textContent="👥 "+Math.max(1,np)+" peserta tantangan";return}el.textContent="👥 "+n+" online"+(here?" • "+here+" di sini":"")}
function zoneLabel(z){if(z==="kota")return"🏙️ Kota Ilmu";if(/^lobi\d/.test(z||""))return"🛫 Lobi tantangan";if(/^tg\d/.test(z||""))return"⚡ Sedang tantangan";var Z=ZONES[z];return Z?Z.ic+" "+Z.nama:"-"}
function openOnline(){if(mode==="play")setMode("menu");renderOnline();$("ovOnline").classList.add("show")}
function renderOnline(){var tz=tanCurId()?lobiZone():null,gl=RT.roster.filter(function(r){return r.g}),list=RT.roster.filter(function(r){return!r.g&&(!tz||r.z===tz)}).sort(function(a,b){return((b.sc&&b.sc.bh)||0)-((a.sc&&a.sc.bh)||0)||((b.sc&&b.sc.lv)||0)-((a.sc&&a.sc.lv)||0)});
 $("oSub").textContent=tz?"⚡ "+list.length+" peserta tantangan ini. Murid yang tidak ikut tidak ditampilkan.":(CL?"🏫 "+CL.kelas+" • ":"")+list.length+" teman sedang bermain. Peringkat menurut jawaban benar hari ini.";
 $("oList").innerHTML=(gl.length?gl.map(function(r){var me=r.id===RT.me;return'<div class="ostat" style="grid-template-columns:1fr auto"><span>👩‍🏫 <b>'+esc(r.nama)+'</b> (guru) • '+esc(zoneLabel(r.z))+'</span>'+(me||tz||inTanZone(r.z)||r.z===CUR.z?'<span></span>':'<button class="btn sm yel" data-goz="'+esc(r.z)+'">Datangi Guru</button>')+'</div>'}).join(""):"")+(list.length?'<div class="tbl-wrap" style="max-height:60vh"><table class="dt"><tr><th>#</th><th>Nama</th><th>Sedang di</th><th>Level</th><th>Benar hari ini</th><th></th></tr>'+list.map(function(r,i){var me=r.id===RT.me,sc=r.sc||{},lock=r.z!=="kota"&&ZONES[r.z]&&zoneLock(r.z);
  return'<tr'+(me?' style="background:rgba(251,191,36,.12)"':'')+'><td>'+(i<3?["🥇","🥈","🥉"][i]:i+1)+'</td><td><b>'+esc(r.nama)+'</b>'+(me?' <span class="badge b-mid">kamu</span>':'')+'</td><td>'+esc(zoneLabel(r.z))+'</td><td>'+(sc.lv||1)+'</td><td><b>'+(sc.bh||0)+'</b></td><td>'+(me||tz||inTanZone(r.z)||r.z===CUR.z?'':lock?'<span class="mut" title="'+esc(lock)+'">🔒</span>':'<button class="btn sm" data-goz="'+esc(r.z)+'">Datangi</button>')+'</td></tr>'}).join("")+'</table></div>':'<div class="mut" style="margin-top:12px">Belum ada teman yang online.</div>')}
$("oList").addEventListener("click",function(e){var b=e.target.closest("[data-goz]");if(!b)return;var z=b.dataset.goz;$("ovOnline").classList.remove("show");if(z==="kota")travelTo("kota","kota");else if(ZONES[z])travelTo(ZONES[z].w,z)});
$("oClose").onclick=function(){$("ovOnline").classList.remove("show");if(mode==="menu")setMode("play")};
$("hOnline").onclick=openOnline;
$("bEmo").onclick=function(){$("emoPanel").classList.toggle("show")};
$("emoPanel").innerHTML='<div class="emog">'+EMO_LIST.map(function(e){return'<button class="emob" data-emo="'+e+'">'+e+'</button>'}).join("")+'</div>'+FRASA.map(function(f){return'<button class="emof" data-emo="'+esc(f)+'">'+esc(f)+'</button>'}).join("")+["Ayo berkumpul!","Kerja bagus!","Tetap semangat!","Baca materinya dulu ya","Waktunya mengerjakan tantangan!"].map(function(f){return'<button class="emof gonly" style="display:none;background:#78350f" data-emo="'+esc(f)+'">👩‍🏫 '+esc(f)+'</button>'}).join("");
$("emoPanel").addEventListener("click",function(e){var b=e.target.closest("[data-emo]");if(b)sendEmote(b.dataset.emo)});
$("sMp").onclick=function(){P.settings.mp=P.settings.mp===false;save();RT.stop=false;$("sMp").textContent=P.settings.mp!==false?"👥 Main bersama: Nyala":"👤 Main bersama: Mati";if(P.settings.mp===false)rtClose()};

/* =================================================================
   GURU: pantau langsung (dashboard) & ikut masuk game
   ================================================================= */
var GURU=null,LV={adv:{},ws:null,on:false,roster:[],ev:[],err:"",kode:"",tm:null,want:false};
var ST_LABEL={petualangan:"🗺️ Sesi petualangan",main:"🎮 Menjelajah",kuis:"✏️ Kuis",tantangan:"⚡ Tantangan",materi:"📺 Membaca materi",warga:"💬 Menjawab pertanyaan warga",menu:"⏸️ Di menu"};
function stText(st){if(!st)return"🎮 Menjelajah";return(ST_LABEL[st.s]||"🎮 Menjelajah")+(st.m?" "+st.m:"")}
function rtQ(){if(Q.type==="ujian"){var j=0,b=0;Q.list.forEach(function(it,i){var p=Q.pick[i];if(p==null)return;j++;if(p&&typeof p==="object"?p.ok:p===it.s.jawab)b++});return{i:Q.i+1,n:Q.list.length,j:j,b:b,s:j-b,h:0}}
 var ans=Q.i+(Q.locked?1:0);return{i:Q.i+1,n:Q.list.length,j:ans,b:Q.benar,s:ans-Q.benar,h:Q.hearts}}
function rtStatus(){if(ADV&&!ADV.done){var ap=advProg();return{s:"petualangan",m:ADV.t.judul,q:{j:ap.g,b:ap.b,i:ap.c,s:Math.max(0,ap.a-ap.b),n:ADV.tg?ADV.tg.n:0,h:0}}}if(mode==="quiz"&&Q&&!Q.finished){if(Q.type==="ujian")return{s:"tantangan",m:Q.tan?Q.tan.judul:Q.m.nama,q:rtQ()};if(Q.type==="mapel")return{s:"kuis",m:Q.m.nama,q:rtQ()};return{s:"warga",m:""}}
 if($("ovGedung").classList.contains("show")&&curGedung)return{s:"materi",m:curGedung.nama};if(mode==="menu"||mode==="pause"||mode==="lemari")return{s:"menu",m:""};return{s:"main",m:""}}
function showAnn(html,ms){var b=$("annBox");b.innerHTML=html;b.classList.add("show");clearTimeout(showAnn.t);showAnn.t=setTimeout(function(){b.classList.remove("show")},ms||10000);SFX.coin()}
$("lvBigX").onclick=function(){LV.fixed=null;$("lvBig").classList.remove("show");try{if(document.fullscreenElement)document.exitFullscreen()}catch(e){}};
$("annBox").addEventListener("click",function(e){var g=e.target.closest("[data-goz]");if(g){var z=g.dataset.goz;$("annBox").classList.remove("show");if(z===CUR.z){toast("Kamu sudah di wilayah yang sama dengan guru.");return}if(z==="kota")travelTo("kota","kota");else if(ZONES[z]){var lk=zoneLock(z);if(lk){toast("🔒 "+lk,3500);return}travelTo(ZONES[z].w,z)}return}if(e.target.closest("[data-annx]"))$("annBox").classList.remove("show")});
function rtGuruMsg(d){
 if(d.t==="ok"){RT.on=true;RT.me=d.id;RT.retry=0;rtHello("hi");updOnline();updGuruUI();return true}
 if(d.t==="err"){RT.stop=true;toast("❌ "+(d.msg||"Guru tidak dikenali"),5000);return true}
 if(d.t==="ann"){if(!GURU)showAnn('<b>📢 '+esc(d.nama)+'</b><div style="margin-top:4px">'+esc(d.text)+'</div><button class="btn sm gray" data-annx style="margin-top:8px">Tutup</button>',12000);else toast("📢 Pengumuman terkirim ke murid",2500);return true}
 if(d.t==="call"){if(!GURU&&!tanCurId())showAnn('<b>📣 '+esc(d.nama)+' memanggilmu!</b><div style="margin-top:4px">Guru menunggu di '+esc(zoneLabel(d.z))+'.</div><div class="row" style="margin-top:8px;justify-content:center"><button class="btn sm yel" data-goz="'+esc(d.z)+'">🚶 Datangi Guru</button><button class="btn sm gray" data-annx>Nanti</button></div>',20000);return true}
 if(d.t==="ev"){if(GURU)toast("✅ "+d.nama+" menyelesaikan "+(d.k==="tantangan"?"tantangan ":"kuis ")+d.m+" (nilai "+d.n+")",3500);return true}
 if(d.t==="st")return true;
 return false}
function updGuruUI(){var on=!!GURU;$("hGuru").style.display=on?"block":"none";$("bGuruT").style.display=on?"":"none";if(on)$("hGuru").textContent="👩‍🏫 Mode Guru"+(RT.on?" • terhubung":" • menghubungkan...");
 Array.prototype.forEach.call(document.querySelectorAll(".gonly"),function(x){x.style.display=on?"":"none"});if(!on)$("guruPanel").classList.remove("show");$("tracker").style.display=on?"none":"";railUpd()}
function startGuruPlay(){if(!DB_)return;GURU={kode:dState.kode,pin:dState.pin,nama:DB_.kelas.guru||(LIC&&LIC.nama)||"Guru",kelas:DB_.kelas.nama};lvClose();clearInterval(dTimer);$("ovDash").classList.remove("show");$("ovGuru").classList.remove("show");
 RT.stop=false;rtClose();if(!P.name)P.name=GURU.nama;P.tipsShown=true;save();updGuruUI();
 if(mode==="landing")enterGame();else{setMode("play");$("hud").classList.add("show")}
 toast("👩‍🏫 Mode guru aktif. Murid melihat avatarmu, tetapi kamu tidak mengerjakan soal.",5000)}
function exitGuru(){GURU=null;rtClose();RT.stop=false;updGuruUI();goLanding();toast("Kamu keluar dari mode guru")}
$("bGuruT").onclick=function(){$("guruPanel").classList.toggle("show");$("emoPanel").classList.remove("show")};
$("gpSend").onclick=function(){var t=$("gpAnn").value.trim();if(!t){toast("Tulis pengumuman dulu");return}if(!RT.on){toast("Belum terhubung ke server main bersama");return}rtSend({t:"ann",text:t});$("gpAnn").value="";$("guruPanel").classList.remove("show")};
$("gpCall").onclick=function(){if(!RT.on){toast("Belum terhubung ke server main bersama");return}rtSend({t:"call"});toast("📣 Panggilan terkirim ke semua murid",3000);$("guruPanel").classList.remove("show")};
$("gpOnline").onclick=function(){$("guruPanel").classList.remove("show");openOnline()};
$("gpExit").onclick=function(){ask("Kamu akan kembali ke halaman awal.",exitGuru,{ic:"👩‍🏫",t:"Keluar dari mode guru?",ok:"Keluar"})};

/* ---------- dashboard: tab Live ---------- */
function lvConnect(){if(!RT_URL||typeof WebSocket==="undefined"){LV.err="Server main bersama belum dipasang.";return}if(LV.ws&&LV.kode===dState.kode)return;lvClose();LV.want=true;LV.kode=dState.kode;LV.err="";
 var ws;try{ws=new WebSocket(RT_URL.replace(/\/+$/,"")+"/kelas?kode="+encodeURIComponent(dState.kode)+"&guru=1")}catch(e){LV.err="Tidak bisa terhubung ke server main bersama.";return}LV.ws=ws;
 ws.onopen=function(){try{ws.send(JSON.stringify({t:"auth",lic:licBody(),pin:dState.pin,mode:"obs"}))}catch(e){}};
 ws.onmessage=function(ev){var d;try{d=JSON.parse(ev.data)}catch(e){return}
  if(d.t==="ok"){LV.on=true;LV.err=""}else if(d.t==="err"){LV.err=d.msg||"Guru tidak dikenali";LV.want=false}
  else if(d.t==="roster"){LV.roster=d.list||[];LV.roster.forEach(function(r){if(r.st&&r.st.s==="petualangan"){LV.adv=LV.adv||{};if(!LV.adv[r.id]||!LV.adv[r.id].fin)LV.adv[r.id]={st:r.st,fin:0}}});Array.prototype.forEach.call(document.querySelectorAll(".tsiap"),function(el){el.textContent=lvSiap(+el.dataset.tid)})}
  else if(d.t==="st"){LV.roster.forEach(function(r){if(r.id===d.id)r.st=d.st});if(d.st&&d.st.s==="petualangan"){LV.adv=LV.adv||{};LV.adv[d.id]={st:d.st,fin:0}}}
  else if(d.t==="ev"){LV.ev.unshift(d);LV.ev=LV.ev.slice(0,400);if(d.k==="petualangan"&&LV.adv&&LV.adv[d.id])LV.adv[d.id].fin=1}
  else if(d.t==="ann"){LV.ev.unshift({ann:1,nama:d.nama,text:d.text,at:d.at||Date.now()});LV.ev=LV.ev.slice(0,400)}
  lvRender()};
 ws.onclose=function(){LV.ws=null;LV.on=false;lvRender();if(LV.want&&$("ovDash").classList.contains("show")){clearTimeout(LV.tm);LV.tm=setTimeout(function(){if(LV.want)lvConnect()},5000)}};ws.onerror=function(){}}
function kunciBar(){var on=DB_&&DB_.kelas&&DB_.kelas.kunci;return'<div class="note" style="margin:8px 0;display:flex;gap:10px;align-items:center;flex-wrap:wrap;'+(on?'border-color:rgba(74,222,128,.6)':'')+'"><span style="flex:1;min-width:220px">'+(on?'🔒 <b>Kelas dikunci.</b> Murid baru tidak bisa masuk. Murid yang sudah terdaftar tetap bisa masuk.':'🔓 <b>Kelas terbuka.</b> Siapa pun yang tahu kode atau link kelas bisa masuk sebagai murid baru. Kunci kelas setelah semua murid bergabung agar tidak ada penyusup.')+'</span><button class="btn sm '+(on?'gray':'yel')+'" data-dact="kkunci" data-on="'+(on?0:1)+'">'+(on?'🔓 Buka kunci':'🔒 Kunci kelas')+'</button></div>'}
function blokList(){var L=(DB_&&DB_.blok)||[];if(!L.length)return"";return'<div class="scard" style="margin-top:10px;border-color:rgba(248,113,113,.5)"><div class="sh"><span>🚫 Murid yang dikeluarkan ('+L.length+')</span></div><div class="mut" style="font-size:12px;margin-bottom:6px">Mereka tidak bisa masuk lagi dengan nama dan nomor absen ini, dan nilainya tidak dihitung di dashboard.</div>'+L.map(function(u){return'<div class="ostat" style="grid-template-columns:50px 1fr auto"><span>'+u.absen+'</span><b>'+esc(u.nama)+'</b><span style="white-space:nowrap"><button class="btn sm" data-dact="munkick" data-mid="'+u.id+'">↩ Pulihkan</button> <button class="btn sm gray own" data-del="'+u.id+'" title="Hapus permanen: nomor absen bisa dipakai lagi">🗑 Hapus</button></span></div>'}).join("")+'</div>'}
function mKick(id){var u=(DB_.murid||[]).filter(function(x){return x.id===id})[0];if(!u)return;
 ask(u.nama+" (absen "+u.absen+") akan langsung keluar dari game dan tidak bisa masuk lagi dengan nama dan absen ini. Nilainya disembunyikan dari dashboard, bukan dihapus. Anda bisa memulihkannya kapan saja.",function(){api("/murid/blokir",{lic:licBody(),kode:dState.kode,pin:dState.pin,id:id,on:true}).then(function(){lvSendGo(-id,"akhiri");toast("🚫 "+u.nama+" dikeluarkan dari kelas",3000);return loadDash(false)},function(er){info(er.message)})},{ic:"🚫",t:"Keluarkan "+u.nama+"?",ok:"Ya, keluarkan",danger:true})}
function lvSiap(id){return LV.roster.filter(function(r){return!r.g&&r.siap===id}).length}
function lvSendGo(id,k){var send=function(){try{LV.ws.send(JSON.stringify({t:"go",id:id,k:k}))}catch(e){}};if(LV.ws&&LV.on){send();return}lvConnect();var n=0,iv=setInterval(function(){n++;if(LV.ws&&LV.on){clearInterval(iv);send()}else if(n>40)clearInterval(iv)},150)}
function serPanel(t){var n=DB_.now||Date.now();lvConnect();var h='<div class="note" style="margin:6px 0 8px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;border-color:rgba(251,191,36,.6)">';
 if(!t.go&&n<=t.selesai)h+='<span>⏳ <b>Belum dimulai</b> • <b class="tsiap" data-tid="'+t.id+'">'+lvSiap(t.id)+'</b> murid di ruang tunggu</span><button class="btn yel" data-dact="tgo" data-tid="'+t.id+'">▶ Mulai sekarang</button>';
 else if(t.go&&!t.akhir&&n<Math.min(t.selesai,t.go+t.menit*60000))h+='<span>🟢 <b>Berlangsung</b> sejak '+new Date(t.go).toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"})+' • berakhir '+new Date(Math.min(t.selesai,t.go+t.menit*60000)).toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"})+'</span><button class="btn sm red" data-dact="tend" data-tid="'+t.id+'">⏹ Akhiri sekarang</button><button class="btn sm" data-dact="lvbig">📺 Papan peringkat</button>';
 else h+='<span>⏹ <b>Sudah selesai</b>'+(t.akhir?' (diakhiri guru)':'')+'</span>'+(Object.keys(tanRes(t).by).length?'<button class="btn sm yel" data-dact="trank" data-tid="'+t.id+'">🏆 Papan peringkat</button>':'')+(n<t.selesai?'<button class="btn sm gray" data-dact="tulang" data-tid="'+t.id+'">↺ Siapkan ulang (ruang tunggu baru)</button>':'');
 return h+'</div>'}
function lvClose(){LV.adv={};LV.want=false;clearTimeout(LV.tm);if(LV.ws){var w=LV.ws;LV.ws=null;w.onclose=null;try{w.close()}catch(e){}}LV.on=false;LV.roster=[];LV.ev=[];LV.kode=""}
function liveTab(){lvConnect();
 return'<div class="scard" style="margin-top:0"><div class="sh"><span>📢 Pengumuman ke semua murid yang online</span></div><div class="row" style="margin-top:4px"><input class="gin" id="lvAnn" maxlength="140" placeholder="Contoh: 5 menit lagi kita bahas bersama, ya!" style="flex:1;min-width:200px"><button class="btn yel" data-dact="lvann">Kirim</button></div>'+
 '<div class="row" style="margin-top:8px"><button class="btn green own" data-dact="lvplay">🎮 Masuk ke game sebagai guru</button><span class="mut" style="font-size:12px">Kamu bisa berjalan bersama murid, menyapa, membaca materi, dan memanggil murid. Guru tidak mengerjakan soal.</span></div></div><div id="lvBody"></div>'}
function lvHelp(st){var q=st&&st.q;if(!q||!(st.s==="kuis"||st.s==="tantangan"))return false;return q.s>=2&&q.s>=q.b||(st.s==="kuis"&&q.h===1&&q.s>0)}
function lvProg(st){var q=st&&st.q;if(q&&st.s==="petualangan")return'<div style="min-width:170px;font-size:12px;font-weight:800">🏫 '+q.j+' gedung • ✅ '+q.b+' benar • 🪙 '+q.i+(q.n?'<div class="hbar" style="margin-top:3px"><i style="width:'+Math.min(100,Math.round(lvAdvVal(st)/q.n*100))+'%"></i></div>':'')+'</div>';if(!q||!(st.s==="kuis"||st.s==="tantangan"))return'<span class="mut">-</span>';
 var pc=q.n?Math.round(q.j/q.n*100):0;return'<div style="min-width:170px"><div style="font-size:12px;font-weight:800">Soal '+Math.min(q.i,q.n)+'/'+q.n+' • <span style="color:#4ade80">✅ '+q.b+'</span> • <span style="color:#fca5a5">❌ '+q.s+'</span>'+(st.s==="kuis"?' • '+(q.h>0?new Array(q.h+1).join("❤️"):"💔"):'')+'</div><div class="hbar" style="margin-top:3px"><i style="width:'+pc+'%"></i></div></div>'}
function lvAdvT(judul){return(DB_&&DB_.tantangan||[]).filter(function(t){return t.jenis==="petualangan"&&t.judul===judul}).sort(function(a,b){return(b.go||0)-(a.go||0)})[0]}
function lvAdvVal(st){var t=lvAdvT(st.m),tg=t?advTarget(t):null,q=st.q||{};return!tg?q.b:tg.k==="gedung"?q.j:tg.k==="koin"?q.i:q.b}
function lvAdvData(mu){var by={},L=[];mu.forEach(function(u){by[u.id]=u});Object.keys(LV.adv||{}).forEach(function(id){var x=LV.adv[id],u=by[id];if(!u)return;var t=lvAdvT(x.st.m),tg=t?advTarget(t):null,q=x.st.q||{};
  L.push({u:u,v:lvAdvVal(x.st),ket:(x.fin?"✅ selesai • ":"⏳ bertualang • ")+"🏫 "+q.j+" gedung • ✅ "+q.b+" benar • 🪙 "+q.i,fin:x.fin?1:0,t:x.st.m,unit:tg?ADV_LBL[tg.k]:"jawaban benar"})});return L.sort(function(a,b){return b.v-a.v})}
/* papan peringkat langsung saat tantangan/kuis berlangsung */
function lvBoardData(mu,on){if(LV.adv&&Object.keys(LV.adv).length)return lvAdvData(mu);var by={},L=[];mu.forEach(function(u){by[u.id]=u});
 var done={};LV.ev.forEach(function(e){if(!e.ann&&e.k==="tantangan"&&by[e.id]&&done[e.id]==null)done[e.id]=e});
 /* tambahkan nilai yang sudah tersimpan di server untuk tantangan serentak yang sedang berjalan (murid yang koneksi live-nya terputus tetap masuk papan) */
 var nw=DB_.now||Date.now(),info={},tj={};(DB_.tantangan||[]).filter(function(t){return t.serentak&&t.go&&t.jenis!=="petualangan"&&!t.akhir&&nw<Math.min(t.selesai,t.go+t.menit*60000)+600000}).forEach(function(t){tj[t.judul]=t;var R=tanRes(t);Object.keys(R.by).forEach(function(id){var x=R.by[id];if(by[id]&&x.t>=t.go-60000){info[id]={d:x.durasi,lr:t.jenis==="lari"?(x.lari||0):0,n:x.nilai};if(done[id]==null)done[id]={n:x.nilai,m:t.judul}}})});
 /* urutan papan langsung = urutan hasil akhir: nilai, (skor lari), lalu waktu pengerjaan tersingkat */
 Object.keys(done).forEach(function(id){var e=done[id],I=info[id],T=tj[e.m],d=I&&I.d!=null?I.d:(T&&e.at?Math.max(0,Math.round((e.at-T.go)/1000)):null),v=I&&I.n!=null?I.n:e.n;L.push({u:by[id],v:v,ket:"✅ selesai • nilai "+v+(d!=null?" • ⏱ "+fmtDur(d):""),fin:1,t:e.m,d:d,lr:I?I.lr:0})});
 mu.forEach(function(u){var r=on[u.id];if(!r||!r.st||r.st.s!=="tantangan"||!r.st.q||done[u.id])return;var q=r.st.q;L.push({u:u,v:q.n?Math.round(q.b/q.n*100):0,ket:"⏳ mengerjakan • soal "+Math.min(q.i,q.n)+"/"+q.n+" • benar "+q.b,fin:0,t:r.st.m})});
 return L.sort(function(a,b){return b.v-a.v||b.fin-a.fin||(b.lr||0)-(a.lr||0)||(a.d==null?9e9:a.d)-(b.d==null?9e9:b.d)||String(a.u.nama).localeCompare(String(b.u.nama))})}
function lvBoard(mu,on){var L=lvBoardData(mu,on);if(!L.length)return"";
 return'<div class="scard"><div class="sh"><span>'+(L[0].unit?'🗺️':'⚡')+' Papan peringkat langsung • '+esc(L[0].t||"Tantangan")+'</span><button class="btn sm yel" data-dact="lvbig">📺 Tampilkan di layar / proyektor</button></div>'+L.slice(0,10).map(function(x,i){return'<div class="ostat" style="grid-template-columns:40px 1fr 70px"><b style="font-size:18px">'+(i<3?["🥇","🥈","🥉"][i]:i+1)+'</b><span><b>'+esc(x.u.nama)+'</b> <small class="mut">'+x.ket+'</small></span><b style="text-align:right;font-size:18px">'+x.v+'</b></div>'}).join("")+'<div class="mut" style="font-size:12px;margin-top:4px">'+(L[0].unit?'Angka = jumlah '+esc(L[0].unit)+' selama petualangan.':'Nilai murid yang masih mengerjakan dihitung dari jawaban benar sejauh ini.')+'</div></div>'}
function fmtDur(d){d=Math.max(0,Math.round(+d||0));var m=Math.floor(d/60),s=d%60;return m?m+" mnt "+(s?s+" dtk":""):s+" dtk"}
function tanRankData(t){var R=tanRes(t),mu={},L=[];(DB_.murid||[]).forEach(function(u){mu[u.id]=u});Object.keys(R.by).forEach(function(id){var u=mu[id];if(u)L.push({u:u,o:R.by[id]})});
 var lk=t.jenis==="lari";return L.sort(function(a,b){return b.o.nilai-a.o.nilai||(lk?(b.o.lari||0)-(a.o.lari||0):0)||(a.o.durasi||9e9)-(b.o.durasi||9e9)||a.o.t-b.o.t})}
function tanRankHTML(t){var L=tanRankData(t),adv=t.jenis==="petualangan",sub=function(x){return(adv?"":x.o.benar+"/"+x.o.total+" benar • ")+(t.jenis==="lari"&&x.o.lari?"🏃 "+x.o.lari+" • ":"")+"⏱ "+fmtDur(x.o.durasi)};
 if(!L.length)return'<div style="text-align:center;opacity:.7;font-size:3vh;margin-top:10vh">Belum ada murid yang menyelesaikan tantangan ini.</div>';
 var pod=[1,0,2].filter(function(i){return L[i]}).map(function(i){var x=L[i];return'<div class="lbp p'+(i+1)+'"><div class="lbpm">'+["🥇","🥈","🥉"][i]+'</div><div class="lbpn">'+esc(x.u.nama)+'</div><div class="lbpv">'+x.o.nilai+'</div><div class="lbps">'+sub(x)+'</div><div class="lbpb">'+(i+1)+'</div></div>'}).join("");
 var rest=L.slice(3).map(function(x,k){return'<div class="lbr"><span class="lbn">'+(k+4)+'</span><span class="lbm">'+esc(x.u.nama)+'<small>'+sub(x)+'</small></span><span class="lbv">'+x.o.nilai+'</span></div>'}).join("");
 return'<div class="lbpod">'+pod+'</div>'+(rest?'<div class="lbb" style="margin-top:3vh">'+rest+'</div>':'')+'<div style="text-align:center;opacity:.65;font-size:1.8vh;margin-top:2.5vh">'+L.length+' murid • urutan: nilai tertinggi, lalu waktu tercepat</div>'}
function lvBigRender(){var el=$("lvBig");if(!el||!el.classList.contains("show")||!DB_)return;el.classList.remove("many","many3");
 if(LV.fixed){var ft=(DB_.tantangan||[]).filter(function(x){return x.id===LV.fixed})[0];if(ft){el.querySelector(".lbt").textContent="🏆 Hasil akhir • "+ft.judul+" • "+DB_.kelas.nama;el.querySelector(".lbb").innerHTML=tanRankHTML(ft);return}}var on={};LV.roster.forEach(function(r){on[r.id]=r});var L=lvBoardData(DB_.murid,on);
 el.classList.toggle("many",L.length>10);el.classList.toggle("many3",L.length>24);el.querySelector(".lbb").innerHTML=L.length?L.map(function(x,i){return'<div class="lbr'+(i<3?" top":"")+'"><span class="lbn">'+(i<3?["🥇","🥈","🥉"][i]:i+1)+'</span><span class="lbm">'+esc(x.u.nama)+'<small>'+(x.fin?"✅ selesai":"⏳ mengerjakan")+'</small></span><span class="lbv">'+x.v+'</span></div>'}).join(""):'<div style="text-align:center;opacity:.7;font-size:3vh;margin-top:10vh">Menunggu murid memulai tantangan...</div>';
 el.querySelector(".lbt").textContent="⚡ "+((L[0]&&L[0].t)||"Tantangan")+" • "+DB_.kelas.nama}
function lvRender(){lvBigRender();var el=$("lvBody");if(!el||dState.tab!=="live"||!DB_)return;var on={},K=dState.kktp;LV.roster.forEach(function(r){on[r.id]=r});
 var mu=DB_.murid.slice().sort(function(a,b){return(on[b.id]?1:0)-(on[a.id]?1:0)||a.absen-b.absen}),onl=mu.filter(function(u){return on[u.id]}),kuis=onl.filter(function(u){var s=on[u.id].st;return s&&(s.s==="kuis"||s.s==="tantangan")}).length,gurus=LV.roster.filter(function(r){return r.g});
 var h='<div class="mut" style="margin:8px 0">'+(LV.err?'<span style="color:#fca5a5">❌ '+esc(LV.err)+'</span>':LV.on?'🟢 Terhubung langsung. Data berubah otomatis tanpa perlu dimuat ulang.':'⏳ Menghubungkan ke server main bersama...')+'</div>';
 h+='<div class="tiles" style="margin-top:0"><div class="tile"><b>'+onl.length+' / '+mu.length+'</b><span>Murid sedang online</span></div><div class="tile"><b>'+kuis+'</b><span>Sedang mengerjakan soal</span></div><div class="tile"><b>'+(onl.length-kuis)+'</b><span>Menjelajah / membaca materi</span></div><div class="tile"><b>'+gurus.length+'</b><span>Guru di dalam game</span></div></div>';
 var sers=(DB_.tantangan||[]).filter(function(t){var n=DB_.now||Date.now();return t.aktif&&t.serentak&&n<=t.selesai&&!t.akhir&&(!t.go||n<t.go+t.menit*60000)});
 sers.forEach(function(t){h+='<div class="scard" style="margin:8px 0 0"><div class="sh"><span>'+(t.jenis==="petualangan"?'🗺️ ':'⚡ ')+esc(t.judul)+' <small class="mut">'+(t.jenis==="petualangan"?'sesi petualangan':'tantangan serentak')+'</small></span></div>'+serPanel(t)+'</div>'});
 var help=onl.filter(function(u){return lvHelp(on[u.id].st)});
 if(help.length)h+='<div class="note" style="margin:8px 0;border-color:#f87171">🆘 <b>Mungkin perlu dibantu sekarang:</b> '+help.map(function(u){var q=on[u.id].st.q;return esc(u.nama)+' <small>('+q.s+' salah'+(q.h&&on[u.id].st.s==="kuis"?', nyawa '+q.h:'')+')</small>'}).join(", ")+'</div>';
 h+=lvBoard(mu,on);
 h+='<div class="tbl-wrap"><table class="dt"><tr><th>Absen</th><th>Nama</th><th>Status</th><th>Sedang di</th><th>Sedang apa</th><th>Progres pengerjaan</th><th>Level</th><th>Benar hari ini</th><th></th></tr>';
 mu.forEach(function(u){var r=on[u.id],sc=r&&r.sc||{},hp=r&&lvHelp(r.st);h+='<tr'+(hp?' style="background:rgba(248,113,113,.14)"':'')+'><td>'+u.absen+'</td><td><b>'+esc(u.nama)+'</b></td><td>'+(r?'<span class="badge b-ok">🟢 Online</span>':'<span class="badge b-na">⚪ Offline</span>')+'</td><td>'+(r?esc(zoneLabel(r.z)):"-")+'</td><td>'+(r?esc(stText(r.st)):"-")+'</td><td>'+(r?lvProg(r.st):"-")+'</td><td>'+(r?(sc.lv||1):"-")+'</td><td>'+(r?(sc.bh||0):"-")+'</td><td><button class="btn sm red" data-dact="mkick" data-mid="'+u.id+'" title="Keluarkan dari kelas">🚫</button></td></tr>'});
 if(!mu.length)h+='<tr><td colspan="9" class="mut">Belum ada murid di kelas ini.</td></tr>';
 h+=kunciBar();
 h+='</table></div><h3 style="font-family:var(--fh);margin:14px 0 6px">📰 Kabar terbaru</h3>';
 h+=LV.ev.length?LV.ev.map(function(e){var tm=new Date(e.at||Date.now()).toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"});return'<div class="ostat" style="grid-template-columns:60px 1fr"><span class="mut">'+tm+'</span><span>'+(e.ann?'📢 <b>'+esc(e.nama)+'</b>: '+esc(e.text):(e.k==="petualangan"?'🗺️ <b>'+esc(e.nama)+'</b> selesai petualangan '+esc(e.m)+' • capaian <b>'+e.n+'%</b>':(e.n>=K?'✅':'📝')+' <b>'+esc(e.nama)+'</b> menyelesaikan '+(e.k==="tantangan"?"tantangan ":"kuis ")+esc(e.m)+' dengan nilai <b>'+e.n+'</b>'))+'</span></div>'}).join(""):'<div class="mut">Kabar muncul di sini saat murid menyelesaikan kuis atau tantangan selama halaman ini terbuka.</div>';
 el.innerHTML=h}

/* ---------- dialog konfirmasi bergaya game (pengganti confirm/alert/prompt) ---------- */
var ZD={cb:null};
function zDlg(o){var d=$("zDlg");$("zIc").textContent=o.ic||"❓";$("zT").textContent=o.t||"";$("zT").style.display=o.t?"":"none";$("zM").textContent=o.m||"";
 var inp=$("zIn");inp.style.display=o.input?"":"none";inp.value=o.val||"";inp.placeholder=o.ph||"";inp.type=o.pw?"password":"text";inp.inputMode=o.num?"numeric":"text";var eb=$("zInBox").querySelector(".eyeb");eb.style.display=o.input&&o.pw?"":"none";eb.textContent="👁️";
 $("zNo").style.display=o.alert?"none":"";$("zNo").textContent=o.no||"Batal";var ok=$("zOk");ok.textContent=o.ok||"OK";ok.className="btn "+(o.danger?"red":o.alert?"":"green");
 ZD.cb=o.cb||null;d.classList.add("show");setTimeout(function(){(o.input?inp:ok).focus()},30);try{SFX.click()}catch(e){}}
function zClose(v){var d=$("zDlg");if(!d.classList.contains("show"))return;d.classList.remove("show");var cb=ZD.cb;ZD.cb=null;if(cb)cb(v)}
$("zOk").onclick=function(){zClose($("zIn").style.display===""?$("zIn").value:true)};
$("zNo").onclick=function(){zClose(false)};
$("zDlg").addEventListener("click",function(e){if(e.target.id==="zDlg"&&$("zNo").style.display!=="none")zClose(false)});
document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest(".eyeb");if(!b)return;e.preventDefault();var i=b.previousElementSibling;if(!i)return;var sh=i.type==="password";i.type=sh?"text":"password";b.textContent=sh?"🙈":"👁️";b.title=sh?"Sembunyikan":"Tampilkan";i.focus()});
$("zIn").addEventListener("keydown",function(e){if(e.key==="Enter")$("zOk").click()});
document.addEventListener("keydown",function(e){if(!$("zDlg").classList.contains("show"))return;e.stopPropagation();if(e.key==="Escape"){e.preventDefault();zClose(false)}else if(e.key==="Enter"&&document.activeElement!==$("zIn")){e.preventDefault();$("zOk").click()}},true);
function ask(m,fn,o){o=o||{};zDlg({ic:o.ic||(o.danger?"🗑️":"❓"),t:o.t||"Yakin?",m:m,ok:o.ok||"Ya, lanjut",no:o.no,danger:o.danger,cb:function(v){if(v)fn()}})}
function info(m,o){o=o||{};zDlg({ic:o.ic||"⚠️",t:o.t||"",m:m,ok:"Oke",alert:true})}
/* =================================================================
   🏅 LENCANA & 🎓 SERTIFIKAT
   ================================================================= */
function studyDays(){var d={};(P.history||[]).forEach(function(r){var x=new Date(r.t);d[x.getFullYear()+"-"+(x.getMonth()+1)+"-"+x.getDate()]=1});if(P.stats.daily&&P.stats.daily.n>0&&P.stats.daily.d)d[P.stats.daily.d]=1;Object.keys(P.stats.days||{}).forEach(function(k){d[k]=1});return d}
function bestStreak(){var d=studyDays(),ks=Object.keys(d).map(function(k){var p=k.split("-");return new Date(+p[0],+p[1]-1,+p[2]).getTime()}).sort(function(a,b){return a-b}),best=0,cur=0,prev=null;
 ks.forEach(function(t){cur=prev!=null&&Math.round((t-prev)/86400000)===1?cur+1:1;if(cur>best)best=cur;prev=t});return best}
function worldsDone(){return WORLDS.filter(function(w){return data.mapel.length&&wCount(w.id)>=data.mapel.length})}
function tanTop(){return(P.history||[]).filter(function(r){return r.k==="tantangan"&&r.nilai!=null&&r.nilai>=90}).length}
var BADGES=[
 {id:"b_dunia1",ic:"🌍",nm:"Penjelajah Dunia",ds:"Tamatkan semua gedung di satu dunia",g:function(){return worldsDone().length},t:1,cert:true},
 {id:"b_dunia3",ic:"🧭",nm:"Petualang Semesta",ds:"Tamatkan 3 dunia",g:function(){return worldsDone().length},t:3,cert:true},
 {id:"b_duniaAll",ic:"🏆",nm:"Penakluk ZuperVerse",ds:"Tamatkan semua dunia yang dipakai guru",g:function(){return worldsDone().length},t:function(){return WORLDS.filter(function(w){return worldAllowed(w.id)}).length},cert:true},
 {id:"b_streak3",ic:"🔥",nm:"Semangat Belajar",ds:"Belajar 3 hari berturut-turut",g:bestStreak,t:3},
 {id:"b_streak7",ic:"🔥",nm:"Rajin Seminggu",ds:"Belajar 7 hari berturut-turut",g:bestStreak,t:7,cert:true},
 {id:"b_streak30",ic:"🌟",nm:"Bintang Ketekunan",ds:"Belajar 30 hari berturut-turut",g:bestStreak,t:30,cert:true},
 {id:"b_perfect1",ic:"💯",nm:"Nilai Sempurna",ds:"Dapat nilai 100 di satu kuis",g:function(){return P.stats.perfect||0},t:1},
 {id:"b_perfect10",ic:"🎖️",nm:"Ahli Nilai Sempurna",ds:"Dapat nilai 100 sebanyak 10 kali",g:function(){return P.stats.perfect||0},t:10,cert:true},
 {id:"b_benar100",ic:"🧠",nm:"Otak Cemerlang",ds:"Jawab benar 100 soal",g:function(){return P.stats.correct||0},t:100},
 {id:"b_benar500",ic:"🎓",nm:"Cendekiawan Muda",ds:"Jawab benar 500 soal",g:function(){return P.stats.correct||0},t:500,cert:true},
 {id:"b_tan",ic:"⚡",nm:"Juara Tantangan",ds:"Nilai 90 ke atas di tantangan guru",g:tanTop,t:1,cert:true},
 {id:"b_combo",ic:"🎯",nm:"Combo Hebat",ds:"Combo 10 jawaban benar berturut-turut",g:function(){return P.stats.maxCombo||0},t:10},
 {id:"b_materi",ic:"📚",nm:"Kutu Buku",ds:"Pelajari 15 materi dari guru",g:function(){return Object.keys(P.stats.read||{}).length},t:15},
 {id:"b_warga",ic:"🤝",nm:"Penolong Warga",ds:"Bantu warga 15 kali",g:function(){return P.stats.helped||0},t:15}
];
function bT(b){return typeof b.t==="function"?b.t():b.t}
function bState(b){var t=bT(b),g=Math.min(t,b.g()||0);return{g:g,t:t,done:g>=t}}
function checkBadges(){if(!P.badges)P.badges={};var baru=[];BADGES.forEach(function(b){if(!P.badges[b.id]&&bState(b).done){P.badges[b.id]=Date.now();baru.push(b)}});
 if(baru.length){baru.forEach(function(b,i){setTimeout(function(){toast("🏅 Lencana baru: "+b.ic+" "+b.nm+"! +50 koin",4000);SFX.win()},600+i*1600)});P.coins+=50*baru.length;hud();save()}}
var _cmOrig=checkMissions;checkMissions=function(){_cmOrig();try{checkBadges()}catch(e){}};
function badgesHTML(){if(!P.badges)P.badges={};var n=BADGES.filter(function(b){return P.badges[b.id]}).length;
 var h='<div class="mut" style="margin-bottom:8px">'+n+' dari '+BADGES.length+' lencana terkumpul. Setiap lencana baru memberi 🪙 50 koin. Lencana bertanda 🎓 bisa dicetak menjadi sertifikat.</div><div class="bgrid">';
 BADGES.forEach(function(b){var s=bState(b),got=P.badges[b.id];h+='<div class="bdg'+(got?" got":"")+'"><div class="bic">'+b.ic+'</div><div class="bnm">'+esc(b.nm)+(b.cert?' 🎓':'')+'</div><div class="bds">'+esc(b.ds)+'</div>'+(got?'<div class="bdt">✅ '+new Date(got).toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"})+'</div>'+(b.cert?'<button class="btn sm yel" data-cert="'+b.id+'">🎓 Cetak sertifikat</button>':''):'<div class="pbar"><i style="width:'+(s.g/s.t*100)+'%"></i></div><div class="bdt">'+s.g+' / '+s.t+'</div>')+'</div>'});
 return h+'</div>'}
/* ---------- sertifikat (cetak / simpan PDF dari browser) ---------- */
function printDoc(html){var w=null;try{w=window.open("","_blank")}catch(e){}
 if(w&&w.document){w.document.open();w.document.write(html);w.document.close();return}
 var fr=document.createElement("iframe");fr.style.cssText="position:fixed;right:0;bottom:0;width:0;height:0;border:0";document.body.appendChild(fr);fr.contentDocument.open();fr.contentDocument.write(html);fr.contentDocument.close();setTimeout(function(){try{fr.contentWindow.focus();fr.contentWindow.print()}catch(e){}setTimeout(function(){fr.remove()},60000)},400)}
var CERT_CSS='*{box-sizing:border-box}body{margin:0;background:#e2e8f0;font-family:Georgia,"Times New Roman",serif;color:#1e293b}.bar{position:sticky;top:0;background:#1e293b;color:#fff;padding:10px 16px;display:flex;gap:10px;align-items:center;justify-content:space-between;font:14px Arial,sans-serif;z-index:2}.bar button{background:#22c55e;color:#fff;border:0;border-radius:8px;padding:9px 16px;font-weight:700;cursor:pointer;font-size:14px}'+
 '.ct{width:297mm;height:210mm;margin:14px auto;background:#fffdf5;position:relative;overflow:hidden;page-break-after:always;box-shadow:0 6px 24px rgba(0,0,0,.18)}.ct:last-child{page-break-after:auto}'+
 '.fr{position:absolute;inset:9mm;border:3px solid #b45309;border-radius:6mm}.fr2{position:absolute;inset:12mm;border:1.5px solid #d97706;border-radius:4mm}'+
 '.cn{position:absolute;width:46mm;height:46mm;border-radius:50%;background:radial-gradient(circle,#fde68a 0,#f59e0b 60%,transparent 61%);opacity:.18}'+
 '.in{position:absolute;inset:20mm 26mm;display:flex;flex-direction:column;align-items:center;text-align:center}'+
 '.lg{font:800 15px Arial,sans-serif;letter-spacing:3px;color:#1e3a8a}.lg b{color:#f59e0b}.tt{font-size:46px;letter-spacing:6px;color:#92400e;margin:6mm 0 0;font-weight:700}.st{font:700 13px Arial,sans-serif;letter-spacing:4px;color:#b45309;margin-top:2mm}'+
 '.gv{margin-top:8mm;font-size:17px;color:#475569}.nm{font-size:44px;font-style:italic;color:#1e3a8a;margin:3mm 0 1mm;padding:0 14mm 2mm;border-bottom:2px solid #d97706;min-width:150mm}.ab{font-size:13px;color:#64748b;font-family:Arial,sans-serif}'+
 '.bd{margin-top:6mm;font-size:18px;line-height:1.55;max-width:210mm}.bd b{color:#92400e}.em{font-size:42px;margin-top:3mm}'+
 '.ft{position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:space-between;align-items:flex-end;font-family:Arial,sans-serif;font-size:13px}.sg{text-align:center;min-width:70mm}.sg .ln{border-top:1.5px solid #334155;margin-top:16mm;padding-top:2mm;font-weight:700;font-size:14px}.sg small{display:block;color:#64748b;font-weight:400}'+
 '@media print{body{background:#fff}.bar{display:none}.ct{margin:0;box-shadow:none}@page{size:A4 landscape;margin:0}}';
function certOne(o){return'<div class="ct"><div class="fr"></div><div class="fr2"></div><div class="cn" style="left:-12mm;top:-12mm"></div><div class="cn" style="right:-12mm;bottom:-12mm"></div><div class="in">'+
 '<div class="lg">ZUPER<b>VERSE</b> • SEMESTA BELAJAR 3D</div><div class="tt">SERTIFIKAT</div><div class="st">'+esc(o.jenis||"PENGHARGAAN")+'</div>'+
 '<div class="gv">Dengan bangga diberikan kepada</div><div class="nm">'+esc(o.nama||"Nama Murid")+'</div>'+(o.sub?'<div class="ab">'+esc(o.sub)+'</div>':'')+
 '<div class="em">'+(o.ic||"🏅")+'</div><div class="bd">'+o.isi+'</div>'+
 '<div class="ft"><div class="sg">'+esc(o.tempat||"")+(o.tempat?", ":"")+esc(o.tgl||new Date().toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"}))+'<div class="ln">'+(o.ttd?esc(o.ttd):"&nbsp;")+'<small>'+esc(o.ttdJab||"Guru")+'</small></div></div><div class="sg"><div class="ln">'+esc(o.ttd2||"ZuperVerse")+'<small>'+esc(o.ttd2Jab||"Semesta Belajar 3D")+'</small></div></div></div></div></div>'}
function certDoc(list,title){return'<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(title)+'</title><style>'+CERT_CSS+'</style></head><body><div class="bar"><span>'+esc(title)+' • '+list.length+' lembar • pilih ukuran A4 mendatar saat mencetak</span><button onclick="window.print()">🖨 Cetak / Simpan PDF</button></div>'+list.map(certOne).join("")+'</body></html>'}
function printBadgeCert(id){var b=BADGES.filter(function(x){return x.id===id})[0];if(!b||!P.badges||!P.badges[id])return;
 var isi='atas keberhasilannya meraih lencana <b>'+esc(b.ic+" "+b.nm)+'</b><br>('+esc(b.ds.toLowerCase())+') di ZuperVerse.';
 if(b.id.indexOf("b_dunia")===0){var wd=worldsDone().map(function(w){return w.ic+" "+w.nama});isi+='<br><span style="font-size:15px;color:#64748b">Dunia yang ditamatkan: '+esc(wd.join(", "))+'</span>'}
 printDoc(certDoc([{nama:P.name||(CL&&CL.nama)||"Pemain ZuperVerse",sub:CL?(CL.kelas+(CL.absen?" • absen "+CL.absen:"")):"",jenis:"PENCAPAIAN",ic:b.ic,isi:isi,tgl:new Date(P.badges[id]).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"}),ttd:CL&&CL.guru?CL.guru:"",ttdJab:CL&&CL.guru?"Guru":"Tanda tangan guru / orang tua"}],"Sertifikat "+b.nm))}
/* ---------- guru: sertifikat dari dashboard ---------- */
var CERT={jenis:"tuntas",sel:null,f:{}};
var CERT_JENIS={tuntas:{nm:"Tuntas Belajar",st:"KETUNTASAN BELAJAR",ic:"✅"},juara:{nm:"Juara Kelas (3 terbaik)",st:"JUARA KELAS",ic:"🏆"},sempurna:{nm:"Nilai Sempurna (100)",st:"NILAI SEMPURNA",ic:"💯"},rajin:{nm:"Paling Rajin (5 terbanyak berlatih)",st:"MURID TERAJIN",ic:"🔥"},tan:{nm:"Tantangan",st:"JUARA TANTANGAN",ic:"⚡"},ikut:{nm:"Partisipasi",st:"PARTISIPASI",ic:"🎉"}};
function certCand(M){var K=dState.kktp,mu=M.murid,j=CERT.jenis,out=[];
 if(j==="tuntas")out=mu.filter(function(u){return u.tuntas}).map(function(u){return{u:u,ket:"nilai terbaik "+u.best}});
 else if(j==="juara"){var r=mu.filter(function(u){return u.best!=null}).sort(function(a,b){return b.best-a.best||b.attempts-a.attempts}).slice(0,3);out=r.map(function(u,i){return{u:u,ket:"Juara "+(i+1)+" • nilai terbaik "+u.best,rank:i+1}})}
 else if(j==="sempurna")out=mu.filter(function(u){return u.best===100}).map(function(u){return{u:u,ket:"nilai 100"}});
 else if(j==="rajin")out=mu.filter(function(u){return u.attempts>0}).sort(function(a,b){return b.attempts-a.attempts}).slice(0,5).map(function(u){return{u:u,ket:u.attempts+" kali berlatih"}});
 else if(j==="tan"){var t=(DB_.tantangan||[]).filter(function(x){return x.id===+CERT.f.tan})[0]||(DB_.tantangan||[])[0];if(t){CERT.f.tan=t.id;var R=tanRes(t,M).by;out=mu.filter(function(u){return R[u.id]&&R[u.id].nilai>=K}).sort(function(a,b){return R[b.id].nilai-R[a.id].nilai}).map(function(u){return{u:u,ket:"nilai "+R[u.id].nilai,t:t,n:R[u.id].nilai}})}}
 else out=mu.filter(function(u){return u.tried}).map(function(u){return{u:u,ket:u.attempts+" kali berlatih"}});
 return out}
function certIsi(c,M){var j=CERT.jenis,mp=dState.mapel?mapName(M,dState.mapel):"",kel=DB_.kelas.nama,pk=DB_.paket&&DB_.paket.judul||"";
 if(j==="tuntas")return'atas keberhasilannya <b>tuntas belajar</b>'+(mp?' mapel <b>'+esc(mp)+'</b>':'')+' di ZuperVerse dengan '+esc(c.ket)+'.';
 if(j==="juara")return'sebagai <b>Juara '+c.rank+'</b> kelas '+esc(kel)+(mp?' mapel <b>'+esc(mp)+'</b>':'')+' di ZuperVerse ('+esc(c.ket.replace(/^Juara \d+ • /,""))+').';
 if(j==="sempurna")return'atas prestasinya meraih <b>nilai sempurna 100</b>'+(mp?' pada mapel <b>'+esc(mp)+'</b>':'')+' di ZuperVerse.';
 if(j==="rajin")return'sebagai <b>murid paling rajin berlatih</b> di kelas '+esc(kel)+' ('+esc(c.ket)+').';
 if(j==="tan")return'atas keberhasilannya dalam tantangan <b>'+esc(c.t.judul)+'</b> dengan <b>nilai '+c.n+'</b>.';
 return'atas partisipasi dan semangatnya belajar bersama ZuperVerse'+(pk?' pada paket <b>'+esc(pk)+'</b>':'')+'.'}
function certTab(M){var cs=certCand(M),f=CERT.f;if(!CERT.sel||CERT.selJ!==CERT.jenis+":"+(f.tan||"")){CERT.sel={};cs.forEach(function(c){CERT.sel[c.u.id]=1});CERT.selJ=CERT.jenis+":"+(f.tan||"")}
 var h='<div class="mut" style="margin-bottom:8px">Cetak sertifikat penghargaan untuk murid langsung dari nilai di ZuperVerse. Hasilnya bisa dicetak atau disimpan sebagai PDF (A4 mendatar).</div>';
 h+='<div class="scard" style="margin-top:0"><div class="gtop"><label class="fld">Jenis sertifikat<select id="cJenis">'+Object.keys(CERT_JENIS).map(function(k){return'<option value="'+k+'"'+(k===CERT.jenis?" selected":"")+'>'+CERT_JENIS[k].ic+" "+CERT_JENIS[k].nm+'</option>'}).join("")+'</select></label>';
 if(CERT.jenis==="tan")h+='<label class="fld">Tantangan<select id="cTan">'+(DB_.tantangan||[]).map(function(t){return'<option value="'+t.id+'"'+(t.id===+f.tan?" selected":"")+'>'+esc(t.judul)+'</option>'}).join("")+'</select></label>';
 h+='<label class="fld">Tempat (opsional)<input id="cTempat" value="'+esc(f.tempat||"")+'" placeholder="Contoh: Mbay"></label></div>';
 h+='<div class="gtop" style="margin-top:6px"><label class="fld">Nama guru (tanda tangan)<input id="cTtd" value="'+esc(f.ttd!=null?f.ttd:(DB_.kelas.guru||""))+'"></label><label class="fld">Jabatan<input id="cJab" value="'+esc(f.jab!=null?f.jab:"Guru Kelas "+DB_.kelas.nama)+'"></label><label class="fld">Kepala sekolah (opsional)<input id="cKs" value="'+esc(f.ks||"")+'" placeholder="Kosongkan bila tidak perlu"></label></div>';
 h+='<div class="mut" style="font-size:12px;margin-top:6px">Penerima dihitung dari filter dashboard saat ini'+(dState.mapel?' (mapel: '+esc(mapName(M,dState.mapel))+')':'')+(dState.paket||dState.per||dState.dunia?' • '+esc(filtLabel()):'')+'. KKTP '+dState.kktp+'.</div></div>';
 h+='<h4 style="margin:12px 0 6px">Penerima ('+cs.length+')</h4>';
 if(!cs.length)return h+'<div class="note">Belum ada murid yang memenuhi syarat untuk jenis sertifikat ini.</div>';
 h+='<div class="tbl-wrap"><table class="dt"><tr><th style="width:40px"><input type="checkbox" id="cAll"'+(cs.every(function(c){return CERT.sel[c.u.id]})?" checked":"")+'></th><th>Absen</th><th>Nama</th><th>Keterangan</th></tr>'+cs.map(function(c){return'<tr><td><input type="checkbox" data-csel="'+c.u.id+'"'+(CERT.sel[c.u.id]?" checked":"")+'></td><td>'+c.u.absen+'</td><td><b>'+esc(c.u.nama)+'</b></td><td>'+esc(c.ket)+'</td></tr>'}).join("")+'</table></div>';
 h+='<div class="row" style="margin-top:10px"><button class="btn yel" data-dact="certprint">🖨 Cetak sertifikat ('+cs.filter(function(c){return CERT.sel[c.u.id]}).length+')</button></div>';
 return h}
function certPrint(){var M=dModel(),cs=certCand(M).filter(function(c){return CERT.sel&&CERT.sel[c.u.id]}),J=CERT_JENIS[CERT.jenis],f=CERT.f;if(!cs.length){info("Pilih minimal 1 murid.");return}
 printDoc(certDoc(cs.map(function(c){return{nama:c.u.nama,sub:DB_.kelas.nama+" • absen "+c.u.absen,jenis:J.st,ic:c.rank?["🥇","🥈","🥉"][c.rank-1]:J.ic,isi:certIsi(c,M),tempat:f.tempat||"",ttd:f.ttd!=null?f.ttd:(DB_.kelas.guru||""),ttdJab:f.jab!=null?f.jab:"Guru Kelas "+DB_.kelas.nama,ttd2:f.ks||"ZuperVerse",ttd2Jab:f.ks?"Kepala Sekolah":"Semesta Belajar 3D"}}),"Sertifikat "+J.nm+" • "+DB_.kelas.nama))}
/* ---------- 🏆 PERINGKAT & STATISTIK NILAI ---------- */
var RK={basis:"best"};
var RK_BASIS={best:"Nilai terbaik",avg:"Rata-rata semua percobaan",first:"Nilai awal (percobaan pertama)",last:"Nilai terakhir"};
function rkVal(u){var sel=dState.mapel,ks=Object.keys(u.per).filter(function(k){return!sel||k===sel});if(!ks.length)return null;
 if(RK.basis==="first")return u.first;if(RK.basis==="best")return u.best;
 if(RK.basis==="last")return avg(ks.map(function(k){var l=u.per[k].list;return l[l.length-1]}));
 var all=[];ks.forEach(function(k){all=all.concat(u.per[k].list)});return avg(all)}
function median(a){if(!a.length)return null;var s=a.slice().sort(function(x,y){return x-y}),m=Math.floor(s.length/2);return s.length%2?s[m]:Math.round((s[m-1]+s[m])/2)}
function stdev(a){if(a.length<2)return 0;var m=a.reduce(function(x,y){return x+y},0)/a.length;return Math.sqrt(a.reduce(function(x,y){return x+(y-m)*(y-m)},0)/(a.length-1))}
function rkRows(M){var rows=M.murid.map(function(u){return{u:u,v:rkVal(u)}}).filter(function(r){return r.v!=null}).sort(function(a,b){return b.v-a.v||a.u.absen-b.u.absen});
 var rank=0,prev=null;rows.forEach(function(r,i){if(r.v!==prev){rank=i+1;prev=r.v}r.rank=rank});return rows}
/* grafik batang sederhana (SVG) */
function svgBars(items,o){o=o||{};var W=o.w||640,H=o.h||220,pl=34,pr=10,pt=14,pb=o.pb||46,n=items.length,mx=o.max||Math.max.apply(null,items.map(function(x){return x.v}).concat([1])),bw=(W-pl-pr)/Math.max(1,n),ys=function(v){return pt+(mx-v)*(H-pt-pb)/mx};
 var s='<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;max-width:'+W+'px;height:auto;display:block;margin:0 auto" role="img" aria-label="'+esc(o.label||"Grafik")+'">';
 var ticks=o.max===100?[0,25,50,75,100]:[0,Math.round(mx/2),mx];ticks.forEach(function(v){s+='<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+ys(v)+'" y2="'+ys(v)+'" stroke="rgba(255,255,255,.12)"/><text x="'+(pl-6)+'" y="'+(ys(v)+4)+'" font-size="11" text-anchor="end" fill="#a5b4fc">'+v+'</text>'});
 if(o.kk!=null){s+='<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+ys(o.kk)+'" y2="'+ys(o.kk)+'" stroke="#f59e0b" stroke-dasharray="6 4" stroke-width="2"/><text x="'+(W-pr-2)+'" y="'+(ys(o.kk)-5)+'" font-size="11" text-anchor="end" fill="#f59e0b">KKTP '+o.kk+'</text>'}
 items.forEach(function(it,i){var x=pl+i*bw+bw*0.14,w=bw*0.72,y=ys(it.v),h=H-pb-y;s+='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+Math.max(0,h)+'" rx="3" fill="'+(it.c||"#60a5fa")+'"><title>'+esc(it.t||it.l)+': '+it.v+'</title></rect>';
  if(it.v>0&&bw>14)s+='<text x="'+(x+w/2)+'" y="'+(y-4)+'" font-size="'+(bw>26?11:9)+'" text-anchor="middle" font-weight="700" fill="#fff">'+it.v+'</text>';
  var lb=String(it.l);if(o.rot)s+='<text transform="translate('+(x+w/2)+','+(H-pb+8)+') rotate(-45)" font-size="10" text-anchor="end" fill="#c7d2fe">'+esc(lb.length>12?lb.slice(0,11)+"…":lb)+'</text>';else s+='<text x="'+(x+w/2)+'" y="'+(H-pb+16)+'" font-size="11" text-anchor="middle" fill="#c7d2fe">'+esc(lb)+'</text>'});
 return s+'</svg>'}
function rankTab(M){var K=dState.kktp,rows=rkRows(M),vals=rows.map(function(r){return r.v}),sel=dState.mapel;
 var h='<div class="row" style="margin-top:0;align-items:center"><label class="fld" style="flex-direction:row;align-items:center;gap:8px">Dasar peringkat<select id="rkBasis">'+Object.keys(RK_BASIS).map(function(k){return'<option value="'+k+'"'+(k===RK.basis?" selected":"")+'>'+RK_BASIS[k]+'</option>'}).join("")+'</select></label><span style="flex:1"></span><button class="btn sm green" data-dact="rkcsv">⬇ Unduh peringkat (Excel)</button><button class="btn sm yel" data-dact="rkprint">🖨 Cetak</button></div>';
 h+='<div class="mut" style="font-size:12px;margin:4px 0 8px">'+(sel?'Mapel: <b>'+esc(mapName(M,sel))+'</b>':'Semua mapel (rata-rata dari tiap mapel)')+' • '+esc(filtLabel())+' • KKTP '+K+'</div>';
 if(!rows.length)return h+'<div class="note">Belum ada nilai untuk filter ini.</div>';
 var top=rows[0],low=rows[rows.length-1],tops=rows.filter(function(r){return r.v===top.v}),lows=rows.filter(function(r){return r.v===low.v}),nm=function(L){return L.slice(0,3).map(function(r){return esc(r.u.nama)}).join(", ")+(L.length>3?" +"+(L.length-3):"")};
 var tn=vals.filter(function(v){return v>=K}).length,sd=stdev(vals);
 h+='<div class="tiles" style="margin-top:0"><div class="tile"><b style="color:#4ade80">'+top.v+'</b><span>Nilai tertinggi • '+nm(tops)+'</span></div><div class="tile"><b style="color:#fca5a5">'+low.v+'</b><span>Nilai terendah • '+nm(lows)+'</span></div><div class="tile"><b>'+avg(vals)+'</b><span>Rata-rata kelas</span></div><div class="tile"><b>'+median(vals)+'</b><span>Median (nilai tengah)</span></div><div class="tile"><b>'+(top.v-low.v)+'</b><span>Rentang (tertinggi − terendah)</span></div><div class="tile"><b>'+sd.toFixed(1)+'</b><span>Simpangan baku</span></div><div class="tile"><b>'+tn+' / '+rows.length+'</b><span>Tuntas (≥ '+K+')</span></div></div>';
 // distribusi
 var bins=[["0–39",0,39],["40–49",40,49],["50–59",50,59],["60–69",60,69],["70–79",70,79],["80–89",80,89],["90–100",90,100]],bi=bins.map(function(b){var c=vals.filter(function(v){return v>=b[1]&&v<=b[2]}).length;return{l:b[0],v:c,c:b[2]<K?"#f87171":"#4ade80",t:c+" murid"}});
 h+='<div class="g2r"><div class="scard"><div class="sh"><span>📊 Sebaran nilai</span><small class="mut">jumlah murid per rentang</small></div>'+svgBars(bi,{w:520,h:220,label:"Sebaran nilai"})+'<div class="mut" style="font-size:12px">Batang merah = di bawah KKTP, hijau = tuntas.</div></div>';
 h+='<div class="scard"><div class="sh"><span>🥇 Tiga besar</span></div>'+rows.slice(0,3).map(function(r,i){return'<div class="ostat" style="grid-template-columns:34px 1fr 60px;font-size:15px"><span style="font-size:22px">'+["🥇","🥈","🥉"][r.rank-1<3?r.rank-1:2]+'</span><b>'+esc(r.u.nama)+' <small class="mut">absen '+r.u.absen+'</small></b><b style="text-align:right">'+r.v+'</b></div>'}).join("")+'<div class="sh" style="margin-top:10px"><span>🤝 Perlu perhatian</span></div>'+(rows.slice(-3).reverse().filter(function(r){return r.v<K}).map(function(r){return'<div class="ostat" style="grid-template-columns:1fr 60px"><span>'+esc(r.u.nama)+' <small class="mut">absen '+r.u.absen+'</small></span><b style="text-align:right;color:#fca5a5">'+r.v+'</b></div>'}).join("")||'<div class="mut">Semua murid sudah tuntas 🎉</div>')+'</div></div>';
 // grafik nilai per murid (urut peringkat)
 var lim=rows.slice(0,40);h+='<div class="scard"><div class="sh"><span>📈 Nilai setiap murid (urut peringkat)</span><small class="mut">'+(rows.length>40?"40 teratas dari "+rows.length:rows.length+" murid")+'</small></div>'+svgBars(lim.map(function(r){return{l:r.u.nama,v:r.v,c:r.v>=K?"#4ade80":"#f87171",t:r.u.nama}}),{w:Math.max(680,lim.length*46+60),h:260,max:100,kk:K,rot:true,pb:70,label:"Nilai per murid"})+'</div>';
 // per mapel
 if(!sel){var pm=M.ms.map(function(m){var L=M.murid.filter(function(u){return u.per[m.id]}).map(function(u){var p=u.per[m.id],v=RK.basis==="first"?p.first:RK.basis==="last"?p.list[p.list.length-1]:RK.basis==="avg"?avg(p.list):p.best;return{u:u,v:v}});if(!L.length)return null;L.sort(function(a,b){return b.v-a.v});var vs=L.map(function(x){return x.v});return{m:m,L:L,vs:vs}}).filter(Boolean);
  if(pm.length){h+='<h3 style="font-family:var(--fh);margin:14px 0 6px">📚 Tertinggi &amp; terendah per mapel</h3><div class="tbl-wrap"><table class="dt"><tr><th>Mapel</th><th>Peserta</th><th>Tertinggi</th><th>Terendah</th><th>Rata-rata</th><th>Median</th><th>Tuntas</th></tr>'+pm.map(function(x){var hi=x.L[0],lo=x.L[x.L.length-1];return'<tr><td><b>'+esc(x.m.nama)+'</b></td><td>'+x.L.length+'</td><td><b style="color:#4ade80">'+hi.v+'</b> <small class="mut">'+esc(hi.u.nama)+'</small></td><td><b style="color:#fca5a5">'+lo.v+'</b> <small class="mut">'+esc(lo.u.nama)+'</small></td><td>'+avg(x.vs)+'</td><td>'+median(x.vs)+'</td><td>'+x.vs.filter(function(v){return v>=K}).length+' / '+x.vs.length+'</td></tr>'}).join("")+'</table></div>';
   h+='<div class="scard"><div class="sh"><span>📊 Rata-rata, tertinggi, dan terendah per mapel</span></div>'+pmChart(pm,K)+'</div>'}}
 // tabel peringkat
 h+='<h3 style="font-family:var(--fh);margin:14px 0 6px">🏆 Peringkat kelas</h3><div class="tbl-wrap"><table class="dt"><tr><th>Peringkat</th><th>Absen</th><th>Nama</th><th>Nilai peringkat</th><th>Nilai awal</th><th>Nilai terbaik</th><th>Percobaan</th><th>Status</th></tr>'+rows.map(function(r){var u=r.u;return'<tr class="cl" data-mu="'+u.id+'"><td><b>'+(r.rank<=3?["🥇","🥈","🥉"][r.rank-1]+" ":"")+r.rank+'</b></td><td>'+u.absen+'</td><td><b>'+esc(u.nama)+'</b></td><td><b>'+r.v+'</b></td><td>'+(u.first==null?"-":u.first)+'</td><td>'+(u.best==null?"-":u.best)+'</td><td>'+u.attempts+'</td><td>'+(r.v>=K?'<span class="badge b-ok">✓ Tuntas</span>':'<span class="badge b-no">! Belum tuntas</span>')+'</td></tr>'}).join("");
 var none=M.murid.filter(function(u){return rkVal(u)==null});if(none.length)h+='<tr><td colspan="8" class="mut">Belum mengerjakan: '+none.map(function(u){return esc(u.nama)}).join(", ")+'</td></tr>';
 return h+'</table></div><div class="mut" style="margin-top:6px;font-size:12px">Murid dengan nilai sama mendapat peringkat yang sama. Klik nama murid untuk melihat detailnya. Ganti filter Mapel, Paket, atau Periode di atas untuk peringkat yang lebih spesifik.</div>'}
function pmChart(pm,K){var W=Math.max(640,pm.length*150),H=260,pl=34,pr=10,pt=14,pb=56,n=pm.length,gw=(W-pl-pr)/n,ys=function(v){return pt+(100-v)*(H-pt-pb)/100};
 var s='<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;max-width:'+W+'px;height:auto;display:block;margin:0 auto" role="img" aria-label="Nilai per mapel">';
 [0,25,50,75,100].forEach(function(v){s+='<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+ys(v)+'" y2="'+ys(v)+'" stroke="rgba(255,255,255,.12)"/><text x="'+(pl-6)+'" y="'+(ys(v)+4)+'" font-size="11" text-anchor="end" fill="#a5b4fc">'+v+'</text>'});
 s+='<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+ys(K)+'" y2="'+ys(K)+'" stroke="#f59e0b" stroke-dasharray="6 4" stroke-width="2"/>';
 pm.forEach(function(x,i){var cx=pl+gw*i+gw/2,hi=Math.max.apply(null,x.vs),lo=Math.min.apply(null,x.vs),a=avg(x.vs),bw=Math.min(36,gw*0.45);
  s+='<line x1="'+cx+'" x2="'+cx+'" y1="'+ys(hi)+'" y2="'+ys(lo)+'" stroke="#c7d2fe" stroke-width="2"/><line x1="'+(cx-8)+'" x2="'+(cx+8)+'" y1="'+ys(hi)+'" y2="'+ys(hi)+'" stroke="#4ade80" stroke-width="3"/><line x1="'+(cx-8)+'" x2="'+(cx+8)+'" y1="'+ys(lo)+'" y2="'+ys(lo)+'" stroke="#f87171" stroke-width="3"/>';
  s+='<rect x="'+(cx-bw/2)+'" y="'+(ys(a)-4)+'" width="'+bw+'" height="8" rx="3" fill="#60a5fa"/><text x="'+(cx+bw/2+4)+'" y="'+(ys(a)+4)+'" font-size="11" font-weight="700" fill="#fff">'+a+'</text><text x="'+cx+'" y="'+(ys(hi)-6)+'" font-size="10" text-anchor="middle" fill="#4ade80">'+hi+'</text><text x="'+cx+'" y="'+(ys(lo)+14)+'" font-size="10" text-anchor="middle" fill="#f87171">'+lo+'</text>';
  var lb=x.m.nama.length>14?x.m.nama.slice(0,13)+"…":x.m.nama;s+='<text x="'+cx+'" y="'+(H-pb+18)+'" font-size="11" text-anchor="middle" fill="#c7d2fe">'+esc(lb)+'</text>'});
 return s+'</svg><div class="mut" style="font-size:12px">Garis vertikal = rentang nilai; ujung hijau = tertinggi, ujung merah = terendah; balok biru = rata-rata; garis putus-putus = KKTP '+K+'.</div>'}
function rkCsv(){var M=dModel(),rws=rkRows(M),K=dState.kktp,vals=rws.map(function(r){return r.v});
 var rows=xlTop("PERINGKAT KELAS",["Kelas: "+DB_.kelas.nama+" • "+(dState.mapel?mapName(M,dState.mapel):"Semua mapel")+(filtLabel()?" • "+filtLabel():""),"Dasar peringkat: "+RK_BASIS[RK.basis]+" • KKTP "+K+" • Diunduh "+new Date().toLocaleString("id-ID")]),hr=rows.length;
 rows.push(["Peringkat","Absen","Nama",RK_BASIS[RK.basis],"Nilai awal","Nilai terbaik","Percobaan","Status"].map(function(h){return{v:h,s:3}}));
 rws.forEach(function(r){rows.push([{v:r.rank,s:7},{v:r.u.absen,s:5},{v:r.u.nama,s:4},{v:r.v,s:r.v<K?6:7},r.u.first==null?{v:"-",s:5}:numS(r.u.first,K),r.u.best==null?{v:"-",s:5}:numS(r.u.best,K),{v:r.u.attempts,s:5},{v:r.v>=K?"Tuntas":"Belum tuntas",s:4}])});
 M.murid.filter(function(u){return rkVal(u)==null}).forEach(function(u){rows.push([{v:"-",s:5},{v:u.absen,s:5},{v:u.nama,s:4},{v:"-",s:5},{v:"-",s:5},{v:"-",s:5},{v:0,s:5},{v:"Belum mengerjakan",s:4}])});
 xlStat(rows,null,vals,K);xlBook([{name:"Peringkat",rows:rows,widths:[10,7,24,14,11,12,10,16],freeze:hr+1,tab:true}],"peringkat-"+DB_.kelas.kode+".xlsx")}
function rkPrint(){var M=dModel(),rows=rkRows(M),K=dState.kktp,vals=rows.map(function(r){return r.v});if(!rows.length){info("Belum ada nilai.");return}
 var css='body{font-family:Arial,sans-serif;color:#1e293b;margin:0;background:#f1f5f9}.bar{position:sticky;top:0;background:#1e293b;color:#fff;padding:10px 16px;display:flex;justify-content:space-between;align-items:center;font-size:14px}.bar button{background:#22c55e;color:#fff;border:0;border-radius:8px;padding:9px 16px;font-weight:700;cursor:pointer}.pg{background:#fff;max-width:800px;margin:16px auto;padding:26px 30px;border-radius:8px}h1{font-size:22px;margin:0 0 4px;color:#1e3a8a}.s{color:#64748b;font-size:13px;margin-bottom:14px}.t{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px}.t div{border:1px solid #cbd5e1;border-radius:8px;padding:8px 10px}.t b{display:block;font-size:20px;color:#1e3a8a}.t span{font-size:11px;color:#64748b}table{width:100%;border-collapse:collapse;font-size:13px}th,td{border:1px solid #cbd5e1;padding:6px 8px;text-align:left}th{background:#eff6ff}.no{color:#b91c1c}.ok{color:#15803d}@media print{body{background:#fff}.bar{display:none}.pg{margin:0;max-width:none;padding:0}@page{size:A4;margin:14mm}}';
 var html='<!doctype html><html lang="id"><head><meta charset="utf-8"><title>Peringkat '+esc(DB_.kelas.nama)+'</title><style>'+css+'</style></head><body><div class="bar"><span>Peringkat kelas</span><button onclick="window.print()">🖨 Cetak / Simpan PDF</button></div><div class="pg"><h1>🏆 Peringkat Kelas '+esc(DB_.kelas.nama)+'</h1><div class="s">'+esc(dState.mapel?mapName(M,dState.mapel):"Semua mapel")+' • '+esc(filtLabel())+' • Dasar: '+esc(RK_BASIS[RK.basis])+' • KKTP '+K+' • dicetak '+new Date().toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"})+'</div>'+
  '<div class="t"><div><b>'+Math.max.apply(null,vals)+'</b><span>Tertinggi</span></div><div><b>'+Math.min.apply(null,vals)+'</b><span>Terendah</span></div><div><b>'+avg(vals)+'</b><span>Rata-rata</span></div><div><b>'+vals.filter(function(v){return v>=K}).length+' / '+vals.length+'</b><span>Tuntas</span></div></div>'+
  '<table><tr><th>Peringkat</th><th>Absen</th><th>Nama</th><th>Nilai</th><th>Nilai awal</th><th>Nilai terbaik</th><th>Percobaan</th><th>Status</th></tr>'+rows.map(function(r){return'<tr><td><b>'+r.rank+'</b></td><td>'+r.u.absen+'</td><td>'+esc(r.u.nama)+'</td><td><b>'+r.v+'</b></td><td>'+r.u.first+'</td><td>'+r.u.best+'</td><td>'+r.u.attempts+'</td><td class="'+(r.v>=K?"ok":"no")+'">'+(r.v>=K?"Tuntas":"Belum tuntas")+'</td></tr>'}).join("")+'</table></div></body></html>';
 printDoc(html)}
/* ---------- 📲 PWA: pasang di HP & mode offline ---------- */
var PWA={evt:null};
function isStandalone(){try{return(window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches)||(window.matchMedia&&window.matchMedia("(display-mode: fullscreen)").matches)||(window.matchMedia&&window.matchMedia("(display-mode: window-controls-overlay)").matches)||navigator.standalone===true}catch(e){return false}}
function isIOS(){return/iphone|ipad|ipod/i.test(navigator.userAgent||"")||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1)}
function updInstall(){var b=$("lpInstall");if(!b)return;b.style.display=!isStandalone()&&(PWA.evt||isIOS())?"":"none"}
window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();PWA.evt=e;updInstall()});
window.addEventListener("appinstalled",function(){PWA.evt=null;updInstall();toast("✅ ZuperVerse sudah terpasang. Buka dari ikon di layar HP, bisa dipakai walau tanpa sinyal.",5000)});
$("lpInstall").onclick=function(){if(PWA.evt){var ev=PWA.evt;ev.prompt();(ev.userChoice||Promise.resolve({})).then(function(c){if(c&&c.outcome==="accepted")PWA.evt=null;updInstall()});return}
 zDlg({ic:"📲",t:"Pasang di iPhone/iPad",m:"1. Buka halaman ini di Safari.\n2. Tekan tombol Bagikan (kotak dengan panah ke atas).\n3. Pilih \"Tambah ke Layar Utama\".\n4. Tekan \"Tambah\".\n\nSetelah itu ZuperVerse bisa dibuka dari ikon di layar, walau tanpa sinyal.",ok:"Mengerti",alert:true})};
updInstall();
if("serviceWorker" in navigator&&(location.protocol==="https:"||location.hostname==="localhost")){setTimeout(function(){navigator.serviceWorker.register("sw.js").catch(function(){})},1500)}
window.addEventListener("offline",function(){toast(CL?"📴 Sinyal hilang. Tetap bisa bermain; nilai disimpan di HP dan dikirim otomatis nanti.":"📴 Sinyal hilang. Tetap bisa bermain seperti biasa.",4500)});
window.addEventListener("online",function(){toast(CL&&outbox.length?"📶 Sinyal kembali. Mengirim "+outbox.length+" nilai ke guru...":"📶 Sinyal kembali.",3000)});
/* ---------- Peta wilayah, perjalanan, fakta ---------- */
var zoneW="angkasa";
function openZones(w){zoneW=WDEF[w]?w:(WDEF[CUR.w]?CUR.w:"angkasa");setModeMenuIfPlay();var W=WDEF[zoneW];$("zTitle").textContent=W.peta;$("zMut").textContent=W.mut;renderZones();$("ovWorld").classList.remove("show");$("ovZone").classList.add("show")}
function setModeMenuIfPlay(){if(mode==="play")setMode("menu")}
function renderZones(){var W=WDEF[zoneW];$("zoneList").innerHTML=W.zones.filter(function(z){return zoneUsed(z)}).map(function(z){var Z=ZONES[z],lock=zoneLock(z),here=CUR.z===z,ms=zoneMapel(z);
 return'<button class="world '+(lock?"soon":"ok")+'" data-zone="'+z+'" style="background:'+Z.bg+'"><span class="wb">'+(here?"📍 Kamu di sini":lock?"🔒 Terkunci":"✔ Terbuka")+'</span><div class="wi">'+Z.ic+'</div><h3>'+esc(Z.nama)+'</h3><p>'+esc(Z.desc)+'</p><p style="margin-top:8px;opacity:.9">🏫 '+(ms.length?ms.map(function(m){return(wDone(zoneW,m.id)?"✔ ":"")+esc(m.nama)}).join(", "):"Belum ada gedung")+'</p>'+(lock?'<p style="margin-top:8px;color:#fde68a">'+esc(lock)+'</p>':'<span class="go">'+(here?"Tetap di sini":W.go)+'</span>')+'</button>'}).join("")}
$("zoneList").addEventListener("click",function(e){var b=e.target.closest("[data-zone]");if(!b)return;var z=b.dataset.zone,lock=zoneLock(z);if(lock){toast("🔒 "+lock,3500);SFX.no();return}
 $("ovZone").classList.remove("show");if(CUR.z===z){afterTravel();return}travelTo(ZONES[z].w,z)});
$("zClose").onclick=function(){$("ovZone").classList.remove("show");$("ovWorld").classList.add("show")};
var traveling=false;
function travelTo(w,z){if(traveling)return;if(ADV&&!ADV.done&&ADV.t&&ADV.t.peta){toast("🗺️ Selama tantangan ini, tetap bermain di peta pilihan gurumu.",3500);return}if(LOBI&&WAIT)waitLeave();traveling=true;var tv=$("travel"),ct=$("tvCount"),tx=$("tvText"),n=3;
 var W=WDEF[w];tx.textContent=w==="kota"?"🌍 Kembali ke Kota Ilmu...":W.tv+ZONES[z].nama+"...";ct.textContent=n;tv.classList.add("show");tone(440,.15,"square",.05);
 var iv=setInterval(function(){n--;if(n>0){ct.textContent=n;tone(440,.15,"square",.05)}else{clearInterval(iv);ct.textContent=W?W.ic:"🏙️";[300,420,560,720].forEach(function(f,i){tone(f,.25,"sawtooth",.04,i*.12)});
  setTimeout(function(){try{loadWorld(w,z)}catch(er){console.error(er);toast("⚠️ Wilayah gagal dimuat: "+er.message,5000);try{loadWorld("kota","kota")}catch(e2){}}setTimeout(function(){tv.classList.remove("show");traveling=false;afterTravel();
   if(w!=="kota"&&CUR.z===z){var Z=ZONES[z];toast(Z.ic+" Selamat datang di "+Z.nama+"! "+(Z.hello||""),4200)}},350)},700)}},700)}
function afterTravel(){if(!$("landing").classList.contains("hide"))enterGame();else{setMode("play");$("hud").classList.add("show")}}
var curFact=null;
function openFact(it){setMode("menu");curFact=it;$("fText").innerHTML="<p>"+esc(it.fact)+"</p>";$("ovFact").classList.add("show");
 if(!P.stats.facts[it.fk]){P.stats.facts[it.fk]=1;addCoins(5);addXp(10);SFX.coin();toast("🔭 Fakta baru! +5 koin");save();checkMissions()}}
$("fOk").onclick=function(){$("ovFact").classList.remove("show");setMode("play")};
/* ---------- Menu jeda ---------- */
function openPause(){if(mode!=="play")return;setMode("pause");var w=CUR.w==="kota"?"🏙️ Kota Ilmu":ZONES[CUR.z].ic+" "+ZONES[CUR.z].nama;$("pWhere").textContent=(P.name||"Pemain")+" • "+w+" • Level "+P.level+" • 🪙 "+P.coins;$("ovPause").classList.add("show")}
function resumeGame(){$("ovPause").classList.remove("show");if(mode==="pause")setMode("play")}
$("bPause").onclick=openPause;$("pResume").onclick=resumeGame;
$("pWorld").onclick=function(){resumeGame();openWorld()};
$("pLari").onclick=function(){resumeGame();if(ARENA||LOBI||WAIT||DROP){toast("Selesaikan dulu lomba atau tantangan yang sedang berjalan.",3000);return}openMain()};
$("mnBuat").onclick=function(e){e.preventDefault();$("ovMain").classList.remove("show");if(LIC)openGuru();else openGuruFree()};
$("mnClose").onclick=function(){$("ovMain").classList.remove("show");if(mode==="menu")setMode("play")};
$("ovMain").addEventListener("click",function(e){var u=e.target.closest("[data-ulang]");if(u){this.classList.remove("show");quickEnter();belStart();return}var b=e.target.closest("[data-mn]");if(!b)return;var k=b.dataset.mn;this.classList.remove("show");
 if(k==="dunia"){openWorld();return}
 if(k==="detektif"){openDtk();return}
 if(k==="pasar"){openPsr();return}
 quickEnter();openLari(k)});
$("lrClose").onclick=function(){$("ovLari").classList.remove("show");if(mode==="menu")setMode("play")};
$("ovLari").addEventListener("click",function(e){var el=this,a=e.target.closest("[data-lra]");
 if(a){var k=a.dataset.lra;if(k==="lagi"){el.classList.remove("show");startLari(null,null,el._last)}else if(k==="ganti")openLari();
  else if(k==="wa"){var txt="🏃 Aku dapat skor "+el._sc+" di Lari Kilat ZuperVerse ("+el._b+"/"+el._n+" soal benar)! Berani kalahkan? 👉 "+lkShareUrl();window.open("https://wa.me/?text="+encodeURIComponent(txt),"_blank","noopener")}
  else{el.classList.remove("show");setMode("play")}return}
 var b=e.target.closest("[data-lr]");if(!b)return;var m=el._ms[+b.dataset.lr];el.classList.remove("show");if(el._kind==="arena"||el._kind==="jembatan")startLatihan(el._kind,m);else startLari(null,null,{m:m})});
$("pMisi").onclick=function(){resumeGame();openMisi()};
$("pLemari").onclick=function(){resumeGame();openLemari(false)};
$("pSet").onclick=function(){resumeGame();openSet()};
$("pHome").onclick=function(){$("ovPause").classList.remove("show");save();goLanding()};
document.addEventListener("visibilitychange",function(){if(document.hidden&&mode==="play")openPause()});
window.addEventListener("keydown",function(e){if(e.code==="KeyP"&&!typing(e)){if(mode==="play")openPause();else if(mode==="pause")resumeGame()}});
$("qExit").onclick=function(){stopSpeak();if(Q.type==="ujian"){var sisa=Q.list.length-Object.keys(Q.pick).length;ask(sisa?sisa+" soal belum dijawab dan akan dianggap salah.":"Semua soal sudah dijawab. Jawabanmu akan dikirim ke guru.",finishUjian,{ic:"📤",t:"Kirim tantangan sekarang?",ok:"Kirim",no:"Lanjut mengerjakan"});return}ask("Jawaban di sesi kuis ini tidak akan dihitung.",function(){clearInterval(qTimer);Q.finished=true;$("ovQuiz").classList.remove("show");setMode("play");toast("Kamu keluar dari kuis. Coba lagi kapan saja!")},{ic:"🚪",t:"Keluar dari kuis?",ok:"Keluar",no:"Lanjut kuis"})};

/* =================================================================
   MULAI
   ================================================================= */
loadWorld("kota","kota");
rebuildAvatar();avatar.visible=false;
applyGfx();resize();hud();landingStats();updTracker();updClassUI();refreshClass();flush();loadFromUrl();
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){buildLots();rebuildAvatar();if(mode==="landing")avatar.visible=false});
requestAnimationFrame(function(t){t0=t;loop(t)});
window.__zd={get ARENA(){return ARENA},fakePeer:function(id,nama,lv,p){var o={};CATS.forEach(function(c){var L=ITEMS.filter(function(i){return i.cat===c.id&&!i.lv});if(L.length)o[c.id]=L[Math.floor(Math.random()*L.length)].id});rtPeer({id:id,nama:nama,lv:lv,o:o,p:p},true);return RT.peers[id]},lkMk:function(t,l,z){return lkMk(ARENA,t,l,z)},get camera(){return camera},get pitchV(){return pitch},zoom:function(v){zSet(v);camDist=camWant},zmax:function(){return zMax()},recheckLic:function(){recheckLic()},openAkun:function(){openAkun()},arTileAt:function(x,z){return arTileAt(x,z)},zoneNow:function(){return lobiZone()},rtMe:function(v){RT.me=v},cl:function(){return CL},kicked:function(){kickedOut()},tanOff:function(v){TAN.off+=v},get ZN(){return ZN},zoneAt:function(t){return zoneAt(t)},waitEnter:waitEnter,rtTanGo:rtTanGo,get LOBI(){return LOBI},get DROP(){return DROP},get WAIT(){return WAIT},get pos(){return pos},P:P,get data(){return data},get ADV(){return ADV},startUjian:startUjian,checkMissions:function(){checkMissions()},refreshClass:refreshClass,get PKCUR(){return PKCUR},get RW(){return RW},renderMisi:renderMisi,setMisiTab:function(t){misiTab=t},openQuiz:openQuiz,openGuru:openGuru,openGuruPanel:openGuruPanel,openGuruFree:openGuruFree,psr:{get st(){return PSR},gen:psrGen,start:psrStart},dtk:{get st(){return DTK},open:dtkOpen,cases:DTK_CASES},bel:{rec:belRec,due:belDueList,prac:belPrac,db:belDb,game:belGame,setQ:function(v){Q=v}},get LIC(){return LIC},enterGame:enterGame,claim:claim,doInter:doInter,get INTER(){return INTER},get Q(){return Q},get CL(){return CL},loadWorld:loadWorld,travelTo:travelTo,openZones:openZones,CUR:CUR,zoneLock:zoneLock,WDEF:WDEF,ZONES:ZONES,RT:RT,rtTick:rtTick,LV:LV,get GURU(){return GURU},tanLoad:tanLoad,srv:srv,cam:function(y,p){yaw=y;if(p!=null)pitch=p},get camDist(){return camDist},get outbox(){return outbox},flush:flush,get mode(){return mode},encodePack:encodePack,decodePack:decodePack,pos:pos};
})();
