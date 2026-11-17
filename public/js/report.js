import {PROFILE_YEARS} from './profile-fields.js';
import {dashboard} from './quiz-engine.js';

const NAVY='#162c49',GOLD='#e9b75e',INK='#243750',MUTED='#66758a',LINE='#dde4ed',PALE='#f4f7fb';
const M=16,W=178,BOTTOM=267;
const SUBJECTS={english:'English',mathematics:'Mathematics',science:'Science',mixed:'Campuran'};
const MODES={practice:'Latihan',examination:'Simulasi ujian',challenge:'Cabaran',daily:'Cabaran Harian'};
const YEARS=Object.fromEntries(PROFILE_YEARS);
const DISCLAIMER='PENAFIAN: Platform ini dibangunkan secara bebas untuk tujuan pendidikan dan latihan sahaja. Semua bahan bukan penerbitan rasmi dan tidak disokong, ditaja atau mempunyai sebarang kaitan dengan MARA, MRSM atau Cambridge.';
const pct=n=>Number.isFinite(n)?`${n.toLocaleString('ms-MY',{maximumFractionDigits:1})}%`:'-';
const time=n=>{n=Math.max(0,Math.round(Number(n)||0));return n>=3600?`${Math.floor(n/3600)}j ${Math.floor(n%3600/60)}m`:`${Math.floor(n/60)}m ${n%60}s`;};
const stamp=(value,withTime=false)=>{
  const d=new Date(value);if(!Number.isFinite(d.getTime()))return 'Tarikh tidak tersedia';
  return d.toLocaleString('ms-MY',{timeZone:'Asia/Kuala_Lumpur',day:'2-digit',month:'short',year:'numeric',...(withTime?{hour:'2-digit',minute:'2-digit',hour12:false}:{})});
};
let dependencies;
async function loadDependencies(){
  return dependencies ||= (async()=>{
    if(!window.jspdf?.jsPDF)await new Promise((resolve,reject)=>{
      const script=document.createElement('script');script.src='/assets/vendor/jspdf.umd.min.js';
      script.onload=resolve;script.onerror=()=>{script.remove();reject(new Error('Komponen PDF belum dapat dimuatkan. Semak sambungan dan cuba semula.'));};document.head.append(script);
    });
    const fonts=await Promise.all(['Regular','Bold'].map(async style=>{
      const response=await fetch(`/assets/fonts/NotoSans-${style}.ttf`);
      if(!response.ok)throw new Error('Fon laporan belum dapat dimuatkan. Cuba semula.');
      const bytes=new Uint8Array(await response.arrayBuffer());let binary='';
      for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
      return btoa(binary);
    }));
    return{jsPDF:window.jspdf.jsPDF,fonts};
  })().catch(error=>{dependencies=null;throw error;});
}

export function buildReportModel(data){
  if(!data?.profile?.id||!Array.isArray(data.attempts))throw new Error('Rekod pelajar tidak lengkap untuk laporan.');
  if(data.attempts.some(r=>r.studentId!==data.profile.id))throw new Error('Rekod cubaan tidak sepadan dengan profil pelajar.');
  const results=data.attempts.map(r=>({...r,answers:r.answers.map(a=>({...a,question:{...a.question,topicId:a.question.topicId||`${a.question.subject}:${a.question.topic}`}}))})).sort((a,b)=>(Date.parse(b.date)||0)-(Date.parse(a.date)||0));
  const stats=dashboard(results);
  return{profile:data.profile,results,stats,totalTime:results.reduce((n,r)=>n+(Number(r.duration)||0),0),period:results.length?`${stamp(results.at(-1).date)} hingga ${stamp(results[0].date)}`:'Belum ada cubaan selesai'};
}

export async function createStudentReport(data,{generatedAt=new Date(),sample=false}={}){
  const model=buildReportModel(data),{profile,results,stats}=model;
  const {jsPDF,fonts}=await loadDependencies();
  const doc=new jsPDF({unit:'mm',format:'a4',compress:true,putOnlyUsedFonts:true});
  doc.addFileToVFS('NotoSans-Regular.ttf',fonts[0]);doc.addFont('NotoSans-Regular.ttf','NotoSans','normal');
  doc.addFileToVFS('NotoSans-Bold.ttf',fonts[1]);doc.addFont('NotoSans-Bold.ttf','NotoSans','bold');
  doc.setProperties({title:`Laporan Prestasi - ${profile.display_name}`,subject:'Ringkasan latihan MRSM IGCSE',author:'MRSM - Persediaan Ujian IGCSE',creator:'MRSM - Persediaan Ujian IGCSE'});
  let y=0,currentSize=9.5,currentBold=false,currentColor=INK;
  function font(size=9.5,bold=false,color=INK){currentSize=size;currentBold=bold;currentColor=color;doc.setFont('NotoSans',bold?'bold':'normal');doc.setFontSize(size);doc.setTextColor(color);}
  function needsFallback(text){return [...String(text)].some(c=>!doc.getFont().metadata.characterToGlyph(c.codePointAt(0)));}
  function canvasContext(){const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');ctx.font=`${currentBold?'700':'400'} ${currentSize*96/72}px sans-serif`;return{canvas,ctx};}
  function profileLines(text,width){
    text=String(text);if(!needsFallback(text))return doc.splitTextToSize(text,width);
    const{ctx}=canvasContext(),segments=typeof Intl.Segmenter==='function'?[...new Intl.Segmenter('ms',{granularity:'grapheme'}).segment(text)].map(s=>s.segment):[...text];
    const lines=[];let line='';for(const c of segments){if(line&&ctx.measureText(line+c).width*25.4/96>width){lines.push(line);line='';}line+=c;}if(line)lines.push(line);return lines;
  }
  function profileText(text,x,baseline){
    // Preserve names in scripts outside the embedded Latin font using local browser glyphs.
    // Only these profile fields become high-resolution images; report numbers/tables stay text.
    if(!needsFallback(text)){doc.text(text,x,baseline);return;}
    const{canvas,ctx}=canvasContext(),cssFont=ctx.font,metrics=ctx.measureText(text),scale=3,mm=25.4/96;
    const ascent=metrics.actualBoundingBoxAscent||currentSize*96/72,descent=metrics.actualBoundingBoxDescent||3,width=Math.ceil(metrics.width+4),height=Math.ceil(ascent+descent+4);
    canvas.width=width*scale;canvas.height=height*scale;ctx.scale(scale,scale);ctx.font=cssFont;ctx.fillStyle=currentColor;ctx.fillText(text,2,ascent+2);
    doc.addImage(canvas.toDataURL('image/png'),'PNG',x-2*mm,baseline-(ascent+2)*mm,width*mm,height*mm);
  }
  function newPage(){
    doc.addPage();font(10,true,NAVY);doc.text('MRSM - Persediaan Ujian IGCSE',M,14);
    font(8,false,MUTED);const name=profileLines(`Laporan prestasi: ${profile.display_name}`,W);name.forEach((line,i)=>profileText(line,M,20+i*3.7));
    const lineY=23+Math.max(0,name.length-1)*3.7;doc.setDrawColor(LINE);doc.line(M,lineY,194,lineY);y=lineY+8;
  }
  function ensure(height){if(y+height>BOTTOM)newPage();}
  function paragraph(text,{size=9.2,bold=false,color=INK,gap=4}={}){
    font(size,bold,color);const lines=doc.splitTextToSize(String(text),W),leading=size*0.352778*1.4;
    if(lines.length<=4)ensure(lines.length*leading+2);
    for(const line of lines){ensure(leading+2);font(size,bold,color);doc.text(line,M,y+leading);y+=leading;}
    y+=gap;
  }
  function heading(text){ensure(17);font(12.5,true,NAVY);doc.text(text,M,y+5);y+=11;}
  function table(title,columns,rows){
    const leading=3.8;
    function header(continuation=false){
      heading(title+(continuation?' (sambungan)':''));ensure(12);doc.setFillColor(NAVY);doc.rect(M,y,W,9,'F');
      font(7.7,true,'#ffffff');let x=M;for(const c of columns){doc.text(c.label,x+2,y+5.7);x+=c.width;}y+=9;
    }
    ensure(32);header();
    rows.forEach((row,index)=>{
      font(8.1);const cells=row.map((v,i)=>doc.splitTextToSize(String(v??'-'),columns[i].width-4));
      const height=Math.max(10,Math.max(...cells.map(lines=>lines.length))*leading+5);
      if(y+height>BOTTOM){newPage();header(true);}
      if(index%2===0){doc.setFillColor(PALE);doc.rect(M,y,W,height,'F');}
      let x=M;font(8.1);cells.forEach((lines,i)=>{lines.forEach((line,n)=>doc.text(line,x+2,y+4.6+n*leading));x+=columns[i].width;});
      doc.setDrawColor(LINE);doc.line(M,y+height,194,y+height);y+=height;
    });y+=8;
  }

  // Cover: restrained navy/gold branding, full name wraps without truncation.
  font(17,true);const names=profileLines(profile.display_name,W),headerHeight=64+(names.length-1)*8;
  doc.setFillColor(NAVY);doc.rect(0,0,210,headerHeight,'F');
  font(9,true,'#ffffff');doc.text('MRSM - Persediaan Ujian IGCSE',M,16);
  font(7.5,true,GOLD);doc.text(sample?'CONTOH - DATA REKAAN':'REKOD PEMBELAJARAN',194,16,{align:'right'});
  font(25,true,'#ffffff');doc.text('Laporan Prestasi',M,36);
  font(17,true,GOLD);names.forEach((name,i)=>profileText(name,M,49+i*8));
  y=headerHeight+7;font(8,false,MUTED);doc.text(`Dijana: ${stamp(generatedAt,true)} MYT`,M,y);doc.text('kuiz-igcse.web.app',194,y,{align:'right'});y+=9;
  const fields=[['TAHAP',YEARS[profile.year_level]||profile.year_level||'Tidak dinyatakan'],['PENJAGA',profile.guardian_name||profile.guardian_display_name||'Tidak dinyatakan'],['SEKOLAH / NEGERI',[profile.school_name,profile.state].filter(Boolean).join(' / ')||'Tidak dinyatakan'],['TEMPOH REKOD',model.period]];
  for(let i=0;i<fields.length;i+=2){
    font(9.2);const cells=fields.slice(i,i+2).map(([label,value])=>({label,lines:profileLines(String(value),82)}));
    const height=8+Math.max(...cells.map(c=>c.lines.length))*4.4;ensure(height);
    cells.forEach((cell,n)=>{const x=M+n*92;font(7.1,true,MUTED);doc.text(cell.label,x,y+2);font(9.2);cell.lines.forEach((line,k)=>profileText(line,x,y+7+k*4.4));});y+=height;
  }y+=4;
  ensure(37);
  const metrics=[['KUIZ SELESAI',String(stats.total)],['PURATA MARKAH',pct(stats.average)],['MARKAH TERBAIK',pct(stats.best)],['MASA LATIHAN',time(model.totalTime)]];
  metrics.forEach(([label,value],i)=>{const x=M+i*45.5;doc.setFillColor(PALE);doc.roundedRect(x,y,41.5,29,2,2,'F');font(7.1,true,MUTED);doc.text(label,x+3.5,y+7);font(i===3?16:21,true,NAVY);doc.text(value,x+3.5,y+20);doc.setDrawColor(GOLD);doc.setLineWidth(0.8);doc.line(x+3.5,y+25,x+38,y+25);doc.setLineWidth(0.2);});y+=38;
  heading('Prestasi mengikut subjek');ensure(55);
  stats.subjects.forEach(s=>{
    font(10,true);doc.text(SUBJECTS[s.id],M,y+4);font(7.7,false,MUTED);doc.text(`${s.count} soalan direkodkan | ${s.correct} betul`,M,y+9);
    doc.setFillColor(LINE);doc.roundedRect(91,y+1,77,3.5,1.5,1.5,'F');
    if(s.percentage>0){doc.setFillColor(s.id==='science'?'#639a86':s.id==='mathematics'?'#809bb9':GOLD);doc.roundedRect(91,y+1,77*s.percentage/100,3.5,1.2,1.2,'F');}
    font(10,true,NAVY);doc.text(pct(s.percentage),194,y+5,{align:'right'});y+=15;
  });
  paragraph('Purata markah dikira daripada peratus setiap cubaan. Ketepatan subjek dikira daripada semua soalan yang direkodkan, termasuk soalan belum dijawab. Cubaan berulang turut dikira.',{size:7.8,color:MUTED,gap:6});
  heading('Fokus latihan seterusnya');
  const weak=[...stats.weakTopics].sort((a,b)=>a.percentage-b.percentage).slice(0,2),strong=[...stats.strongTopics].sort((a,b)=>b.percentage-a.percentage).slice(0,2);
  if(!results.length)paragraph('Belum ada cubaan selesai. Mulakan satu kuiz ringkas, baca penerangan jawapan dan bina rutin ulang kaji yang selesa.');
  else if(weak.length)paragraph(`Utamakan ${weak.map(t=>`${t.name} (${SUBJECTS[t.subject_id]})`).join(' dan ')}. Semak penerangan, ulang konsep asas dan cuba set latihan baharu.`);
  else paragraph('Teruskan latihan dalam pelbagai topik. Jika rekod masih sedikit, tambah beberapa cubaan sebelum membuat kesimpulan tentang kekuatan atau kelemahan.');
  if(strong.length)paragraph(`Kekuatan semasa: ${strong.map(t=>`${t.name} (${SUBJECTS[t.subject_id]})`).join(' dan ')}. Kekalkan latihan berkala.`,{size:8.5});
  paragraph('Cadangan fokus memerlukan sekurang-kurangnya 3 soalan unik bagi sesuatu topik, menggunakan jawapan terkini setiap soalan. Pecahan topik dan subjek merangkumi semua jawapan termasuk ulangan. Ini ialah petunjuk latihan dalaman, bukan gred rasmi atau ramalan kemasukan MRSM.',{size:7.8,color:MUTED});

  if(results.length){
    newPage();heading('Rekod latihan');paragraph(`Tempoh: ${model.period}`,{size:8.5,color:MUTED});
    if(results.length>=2){
      heading('Trend markah');ensure(57);
      const recent=[...results].reverse().slice(-12),x0=M+12,y0=y+3,width=160,height=32;
      for(const tick of [0,25,50,75,100]){const yy=y0+height*(1-tick/100);font(7,false,MUTED);doc.text(String(tick),M,yy+1);doc.setDrawColor(LINE);doc.line(x0,yy,x0+width,yy);}
      doc.setDrawColor('#4f769b');doc.setLineWidth(0.6);
      const points=recent.map((r,i)=>({x:x0+i*width/(recent.length-1),y:y0+height*(1-r.percentage/100)}));
      points.forEach((point,i)=>{if(i)doc.line(points[i-1].x,points[i-1].y,point.x,point.y);doc.setFillColor(NAVY);doc.circle(point.x,point.y,1,'F');font(7,false,MUTED);doc.text(String(results.length-recent.length+i+1),point.x,y0+height+5,{align:'center'});});doc.setLineWidth(0.2);
      y=y0+height+9;paragraph('Paksi menegak: markah (%). Paksi bawah: urutan cubaan mengikut tarikh. Paparan sehingga 12 cubaan terkini.',{size:7.7,color:MUTED});
    }
    table('Sejarah kuiz',[{label:'No.',width:9},{label:'Tarikh (MYT)',width:31},{label:'Subjek',width:29},{label:'Mod',width:32},{label:'Soalan',width:16},{label:'Betul',width:15},{label:'Markah',width:23},{label:'Masa',width:23}],results.map((r,i)=>[i+1,stamp(r.date,true),SUBJECTS[r.subject]||r.subject,`${MODES[r.mode]||r.mode}${r.status==='expired'?' (masa tamat)':''}`,r.total,r.correct,pct(r.percentage),time(r.duration)]));
    const topics=[...stats.topics].sort((a,b)=>a.subject_id.localeCompare(b.subject_id)||a.name.localeCompare(b.name));
    table('Pecahan topik',[{label:'Subjek',width:30},{label:'Topik',width:83},{label:'Soalan',width:19},{label:'Betul',width:19},{label:'Ketepatan',width:27}],topics.map(t=>[SUBJECTS[t.subject_id],t.name,t.question_count,t.correct_count,pct(t.percentage)]));
  }
  // Add consistent privacy/footer furniture only after the final page count is known.
  const pages=doc.getNumberOfPages();
  for(let page=1;page<=pages;page++){
    doc.setPage(page);doc.setDrawColor(LINE);doc.line(M,274,194,274);
    font(7.3,true,MUTED);doc.text('SULIT - Untuk pelajar dan penjaga',M,279);doc.text(`Muka ${page} / ${pages}`,194,279,{align:'right'});
    font(6.8,false,MUTED);doc.text(doc.splitTextToSize(DISCLAIMER,W),M,284,{lineHeightFactor:1.35});
  }
  const name=profile.display_name.normalize('NFKC').replace(/[^\p{L}\p{N}._-]+/gu,'-').slice(0,60)||'Pelajar';
  const day=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kuala_Lumpur',year:'numeric',month:'2-digit',day:'2-digit'}).format(generatedAt);
  return{doc,filename:`Laporan-Prestasi-${name}-${day}.pdf`,model};
}

export async function downloadStudentReport(data){
  const {doc,filename}=await createStudentReport(data);
  await doc.save(filename,{returnPromise:true});
  return filename;
}
