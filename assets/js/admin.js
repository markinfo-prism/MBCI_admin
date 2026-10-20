
const ALGO_META=BSM_DATA.ALGO_META;
const STY16=BSM_DATA.STY16;

const AXES = [
 {key:0,name:"무게감",easy:"어떤 이미지일까",L:{c:"G",t:"진지함",s:"격식 · 신뢰 · 정중"},R:{c:"L",t:"친근함",s:"편안 · 유머 · 다정"}},
 {key:1,name:"에너지",easy:"목소리를 얼마나 크게 낼까",L:{c:"B",t:"강렬함",s:"진하게 · 눈에 띄게"},R:{c:"S",t:"부드러움",s:"은은하게 · 섬세하게"}},
 {key:2,name:"설득 방식",easy:"마음으로 vs 근거로",L:{c:"E",t:"감성적",s:"이야기 · 온기"},R:{c:"R",t:"이성적",s:"숫자 · 정확함"}},
 {key:3,name:"스타일",easy:"어제의 멋 vs 오늘의 멋",L:{c:"C",t:"클래식",s:"전통 · 손맛 · 유산"},R:{c:"M",t:"모던",s:"동시대 · 깔끔 · 기술"}},
];

/* 16 styles — hue/sat/bri: 허용 범위(가드레일), scheme: 기본 배색 방식 */
/* 스타일별 큐레이션 샘플 이미지 (관리자에서 등록 · 3칸) */
const STYLE_SAMPLES=BSM_DATA.STYLE_SAMPLES;
/* v2.14.0: 고객 화면은 실제로 등록된 이미지만 쓴다(빈 칸 없음). 4장이 등록되면 4장 모두 표시된다 */
function styleSamples(code){
  return (STYLE_SAMPLES[code]||[]).filter(s=>s&&s.url);
}
/* 관리자 편집용 — 등록 여부와 상관없이 최소 4칸을 보여준다 */
function styleSampleSlots(code){
  const arr=STYLE_SAMPLES[code]||[]; const n=Math.max(4,arr.length);
  return Array.from({length:n},(_,i)=>arr[i]||null);
}

/* ================= 브랜드 MBTI 레이어 (v11.3) — 좌표 코드를 키로 스튜디오·로고·인테리어를 연결 ================= */
const BRAND_MBTI={
studios:{
 maison:{name:"Studio Maison",tone:"클래식 & 고급",intro:"시간이 흘러도 변하지 않는 가치를 디자인합니다.",desc:"절제된 아름다움과 신뢰를 바탕으로 고급 브랜드 정체성을 시각화합니다.",values:["품격","신뢰","전통"]},
 formvoid:{name:"Form & Void",tone:"모던 & 미니멀",intro:"덜어낼수록 본질이 보입니다.",desc:"군더더기 없는 구조적 디자인으로 브랜드의 본질을 간결하게 표현합니다.",values:["단순함","세련됨","본질"]},
 moss:{name:"Moss Lab",tone:"내추럴 & 웰니스",intro:"사람과 자연 사이, 조화로운 브랜드를 만듭니다.",desc:"편안하고 건강한 브랜드를 위한 자연친화적 디자인을 제안합니다.",values:["편안함","자연","조화"]},
 blush:{name:"Studio Blush",tone:"러블리 & 페미닌",intro:"사랑스러운 디테일이 브랜드를 감동으로 만듭니다.",desc:"감성적이고 섬세한 디자인으로 부드러운 브랜드 이미지를 구축합니다.",values:["부드러움","사랑스러움","감성"]},
 bang:{name:"Bang! Studio",tone:"에너지틱 & 액티브",intro:"에너지 넘치는 브랜드엔 박력 있는 디자인이 필요합니다.",desc:"강렬하고 역동적인 시각 언어로 브랜드의 힘을 전합니다.",values:["역동성","활력","열정"]},
 yellow:{name:"Yellow Noise",tone:"유니크 & 크리에이티브",intro:"세상에 없던 감각, 우리만의 언어로 만듭니다.",desc:"독창성과 실험정신으로 차별화된 브랜드 정체성을 설계합니다.",values:["창의성","실험성","독특함"]},
 nostalgia:{name:"Studio Nostalgia",tone:"레트로 & 빈티지",intro:"추억의 감성, 오늘의 브랜드로.",desc:"과거의 감성을 현대적으로 재해석한 따뜻한 브랜딩을 만듭니다.",values:["감성","향수","따뜻함"]},
 hello:{name:"Hello Hello Studio",tone:"프렌들리 & 웜",intro:"반가운 인사처럼 친근한 브랜드를 디자인합니다.",desc:"포근하고 유쾌한 디자인으로 누구에게나 다가가는 브랜딩을 지향합니다.",values:["친근함","다정함","일상성"]},
 proto:{name:"Proto Studio",tone:"테크 & 인더스트리얼",intro:"기술과 구조의 언어로 브랜드를 설계합니다.",desc:"기능성과 논리성을 강조하는 기술 기반 브랜드를 위한 디자인을 제공합니다.",values:["기술","실용성","논리"]},
 tonestudio:{name:"TONE Studio",tone:"젠더뉴트럴 & 인클루시브",intro:"모두를 위한 디자인, 누구도 배제하지 않는 브랜드.",desc:"다양성과 포용을 시각 언어로 풀어내는 균형 잡힌 디자인을 제공합니다.",values:["균형","포용","다양성"]}
},
byCode:{
 GBEC:{s1:"maison",s2:"nostalgia",interior:{ko:"럭셔리",en:"luxury",mat:["marble","glass"]}},
 GBEM:{s1:"yellow",s2:"proto",interior:{ko:"인더스트리얼",en:"industrial",mat:["concrete","metal"]}},
 GBRC:{s1:"maison",s2:"formvoid",interior:{ko:"클래식",en:"classic",mat:["marble","wood"]}},
 GBRM:{s1:"proto",s2:"formvoid",interior:{ko:"모던",en:"modern",mat:["metal","glass"]}},
 GSEC:{s1:"moss",s2:"maison",interior:{ko:"아시안",en:"Asian",mat:["wood","pottery"]}},
 GSEM:{s1:"moss",s2:"tonestudio",interior:{ko:"내추럴",en:"natural",mat:["wood","ceramic"]}},
 GSRC:{s1:"tonestudio",s2:"maison",interior:{ko:"클래식",en:"classic",mat:["marble","wood"]}},
 GSRM:{s1:"formvoid",s2:"proto",interior:{ko:"미니멀",en:"minimal",mat:["wood","glass"]}},
 LBEC:{s1:"nostalgia",s2:"hello",interior:{ko:"빈티지",en:"vintage",mat:["wood","synthetic leather"]}},
 LBEM:{s1:"yellow",s2:"bang",interior:{ko:"인더스트리얼 · 네온 연출",en:"industrial",mat:["concrete","metal"]}},
 LBRC:{s1:"bang",s2:"hello",interior:{ko:"모던 · 팀 컬러 적용",en:"modern",mat:["metal","glass"]}},
 LBRM:{s1:"bang",s2:"proto",interior:{ko:"모던",en:"modern",mat:["metal","glass"]}},
 LSEC:{s1:"hello",s2:"nostalgia",interior:{ko:"북유럽",en:"Scandinavian",mat:["wood","fabric"]}},
 LSEM:{s1:"blush",s2:"hello",interior:{ko:"북유럽 · 파스텔 적용",en:"Scandinavian",mat:["wood","fabric"]}},
 LSRC:{s1:"formvoid",s2:"tonestudio",interior:{ko:"미니멀",en:"minimal",mat:["wood","glass"]}},
 LSRM:{s1:"proto",s2:"formvoid",interior:{ko:"미니멀",en:"minimal",mat:["wood","glass"]}}
}/*__MBTI_END__*/};
/* 로고 타입 상세값 — 스튜디오별 고정값 대신 축 조합으로 결정 (16좌표 자동 차별화) */
function mbtiLogoDetails(code){
  const g=code[0],e=code[1],p=code[2],s=code[3]; // 무게감·에너지·설득·스타일
  const symbol=p==='R'?'abstract geometric':(e==='S'?'organic abstract':'dynamic abstract');
  return [
    ["워드마크", s==='C'?(p==='E'?'handwritten':'serif'):(p==='R'?'geometric sans':'rounded sans')],
    ["레터마크", s==='C'?'classic monogram':'geometric initial'],
    ["심볼", symbol],
    ["일러스트", e==='S'?'minimal line illustration':'bold flat illustration'],
    ["마스코트", g==='L'?'friendly animal character':'emblem-style animal'],
    ["복합형", 'text + '+symbol+' symbol']
  ];
}
function mbtiHTML(code){
  const bc=BRAND_MBTI.byCode[code]; if(!bc)return '';
  const s1=BRAND_MBTI.studios[bc.s1], s2=BRAND_MBTI.studios[bc.s2];
  const logos=mbtiLogoDetails(code);
  return `
  <div class="mbti-grid">
    <div class="mbti-studio mb1">
      <div class="mbti-rank">1순위 스튜디오</div>
      <div class="mbti-name">${s1.name} <span class="mbti-tone">${s1.tone}</span></div>
      <div class="mbti-quote">“${s1.intro}”</div>
      <div class="mbti-desc">${s1.desc}</div>
      <div class="mbti-values">${s1.values.map(v=>`<span class="mbti-chip">${v}</span>`).join('')}</div>
    </div>
    <div class="mbti-side">
      <div class="mbti-studio mb2">
        <div class="mbti-rank">이런 스튜디오도 어울려요</div>
        <div class="mbti-name">${s2.name} <span class="mbti-tone">${s2.tone}</span></div>
        <div class="mbti-quote sm">“${s2.intro}”</div>
      </div>
      <div class="mbti-studio mbint">
        <div class="mbti-rank">공간 · 인테리어 가이드</div>
        <div class="mbti-interior"><b>${bc.interior.ko}</b><span class="mbti-mat">${bc.interior.mat.join(' · ')}</span></div>
      </div>
    </div>
  </div>
  <div class="mbti-g-col mbfull">
    <div class="mbti-g-title">로고 타입 가이드 <span>타입을 고르면 이 상세값이 제작 방향이 돼요</span></div>
    <div class="mbti-logo-grid">${logos.map(([k,v])=>`<div class="mbti-logo-item"><b>${k}</b><span>${v}</span></div>`).join('')}</div>
  </div>`;
}

/* ================= 브랜드 MBTI 전체 가이드 모달 ================= */
function openMbtiGuide(){
  let m=$('mbtiModal');
  if(!m){
    m=document.createElement('div');m.id='mbtiModal';m.className='mbti-modal hidden';
    m.innerHTML=`<div class="mm-bg" onclick="closeMbtiGuide()"></div>
      <div class="mm-card" role="dialog" aria-modal="true" aria-label="브랜드 MBTI 전체 가이드">
        <div class="mm-head"><div><div class="mm-title">브랜드 MBTI 전체 가이드</div>
          <div class="mm-sub">16가지 스타일 좌표 × 추천 스튜디오 × 로고 · 인테리어 가이드 — 행을 누르면 해당 스타일 결과로 이동해요</div></div>
          <button class="mm-x" onclick="closeMbtiGuide()" aria-label="닫기">×</button></div>
        <div class="mm-body"><table class="mm-tbl"><thead><tr>
          <th>코드</th><th>스타일</th><th>1순위 스튜디오</th><th>2순위</th><th>워드마크</th><th>심볼</th><th>인테리어 · 소재</th>
        </tr></thead><tbody id="mmRows"></tbody></table></div>
      </div>`;
    document.body.appendChild(m);
  }
  $('mmRows').innerHTML=Object.keys(STYLES).map(code=>{
    const st=STYLES[code],bc=BRAND_MBTI.byCode[code];
    const s1=BRAND_MBTI.studios[bc.s1],s2=BRAND_MBTI.studios[bc.s2];
    const lg=mbtiLogoDetails(code);
    return `<tr data-code="${code}" class="${code===curCode?'cur':''}">
      <td class="mm-code">${code.split('').join('·')}</td>
      <td class="mm-adj">${st.adj}${st.en?`<i class="mm-en">${st.en}</i>`:''}<small>${st.sub}</small></td>
      <td><b>${s1.name}</b><br><span class="mm-en">${s1.tone}</span></td>
      <td class="mm-s2">${s2.name}</td>
      <td class="mm-en">${lg[0][1]}</td>
      <td class="mm-en">${lg[2][1]}</td>
      <td><b>${bc.interior.ko}</b><br><span class="mm-en">${bc.interior.mat.join(' · ')}</span></td></tr>`;
  }).join('');
  $('mmRows').querySelectorAll('tr[data-code]').forEach(tr=>tr.onclick=()=>{gotoStyle(tr.dataset.code);closeMbtiGuide();});
  m.classList.remove('hidden');
}
function gotoStyle(code){
  [...code].forEach((ch,i)=>{sliders[i].value=AXES[i].L.c===ch?1:5;});
  showApp();render();
  setTimeout(()=>$('result').scrollIntoView({behavior:'smooth',block:'start'}),60);
}   // v2.11.0: 모바일에서 결과 인디케이터를 접어 코드·Core ID만 보이게 한다
let consultVals={};
/* 변형된 로고 영역의 외곽선 (관리자 가이드용) */
function warpGuidePath(x,p,wp){
  const mode=wp.mode||'flat';
  x.beginPath();
  if(mode==='tilt'){
    const q=tiltQuad(p,wp);
    x.moveTo(q[0][0],q[0][1]);for(let i=1;i<4;i++)x.lineTo(q[i][0],q[i][1]);x.closePath();
  }else if(mode==='cyl'){
    const k=Math.max(0,Math.min(100,wp.curve==null?45:wp.curve))/100;
    const arc=Math.max(0.001,k*Math.PI*0.92), R=(p.w/2)/Math.max(1e-6,Math.sin(arc/2));
    const bow=(wp.bow||0)/100*p.h*0.5, cx=p.x+p.w/2, N=40;
    const yOf=t=>bow*(Math.cos(t)-Math.cos(arc/2))/Math.max(1e-6,(1-Math.cos(arc/2)));
    for(let i=0;i<=N;i++){const t=(i/N-.5)*arc;const px=cx+R*Math.sin(t);
      i?x.lineTo(px,p.y+yOf(t)):x.moveTo(px,p.y+yOf(t));}
    for(let i=N;i>=0;i--){const t=(i/N-.5)*arc;x.lineTo(cx+R*Math.sin(t),p.y+p.h+yOf(t));}
    x.closePath();
  }else{ x.rect(p.x,p.y,p.w,p.h); }
}

/* ================= 관리자: 목업 이미지 라이브러리 ================= */
let amCurId=null, amImg=null, amSrc=null;
const AM_LAYER_MAX=3;
let amLayers=[null,null,null];        // 레이어별 data URL / URL
let amLayerImgs=[null,null,null];     // 로드된 Image 객체
let amLayerAbove=[false,false,false]; // true면 로고 위에 얹음(그림자·광택 오버레이용)
function renderAdminMockup(){
  const t=$('mockShowToggle');
  if(t){ t.checked=!!(MBCI.settings&&MBCI.settings.showMockup); t.onchange=()=>{ MBCI.settings.showMockup=t.checked; markDirty(); }; }
  amRenderList(); if(!amCurId){const ids=Object.keys(MOCKUP_IMGS); if(ids.length)amSelect(ids[0]); else amNew();}
}
function amRenderList(){
  const box=$('amList'); if(!box)return;
  box.innerHTML=Object.entries(MOCKUP_IMGS).map(([id,v])=>`
    <button type="button" class="am-item${id===amCurId?' on':''}" data-id="${id}">
      <img src="${v.src}" alt=""><span>${v.name||id}<em>${(v.biz||[]).length}개 업종 · ${v.layerMode?`레이어 ${(v.layers||[]).filter(Boolean).length}장`:(v.blend||'multiply')}${v.bgLock?' · 색잠금':''}${v.align&&v.align!=='center'?` · ${v.align==='left'?'좌':'우'}정렬`:''}</em></span>
    </button>`).join('')||'<span class="mock-none">등록된 이미지가 없어요</span>';
  box.querySelectorAll('.am-item').forEach(b=>b.onclick=()=>amSelect(b.dataset.id));
}
function amSelect(id){
  amCurId=id; const v=MOCKUP_IMGS[id]; if(!v)return;
  amSrc=v.src;
  $('amName').value=v.name||'';
  $('amBlend').value=v.blend||'multiply';
  $('amAlign').value=v.align||'center';
  $('amInkRole').value=(v.inkRole===undefined||v.inkRole===null)?'auto':String(v.inkRole);
  $('amIsPaper').checked=!!v.isPaper; amPaperToggle(true);
  const wv=Object.assign({},WARP_DEFAULT,v.warp||{});
  $('amWarpMode').value=wv.mode||'flat';
  $('amYaw').value=wv.yaw;$('amPitch').value=wv.pitch;$('amRoll').value=wv.roll;$('amRoll2').value=wv.roll;
  $('amCurve').value=wv.curve;$('amBow').value=wv.bow;$('amShade').value=wv.shade;
  $('amWarpTilt').classList.toggle('hidden',wv.mode!=='tilt');
  $('amWarpCyl').classList.toggle('hidden',wv.mode!=='cyl');
  $('amBgRole').value=String(v.bgRole||0);
  const lm=!!(v.layerMode||v.chroma);   // v13.0의 chroma 항목도 레이어 목업으로 승계
  $('amLayerMode').checked=lm;
  $('amBgColor').value=v.bgColor||'#333333';
  $('amBgLock').checked=!!v.bgLock;
  $('amLayerOpts').classList.toggle('hidden',!lm);
  amLayers=[0,1,2].map(i=>(v.layers&&v.layers[i])||(i===0?(v.src||null):null));
  amLayerAbove=[0,1,2].map(i=>!!(v.layerAbove&&v.layerAbove[i]));
  amLoadLayers(); amRenderSlots(); amBgLockToggle(true);
  const L=v.logo||{x:.34,y:.44,w:.32,h:.13};
  $('amX').value=Math.round(L.x*100);$('amY').value=Math.round(L.y*100);
  $('amW').value=Math.round(L.w*100);$('amH').value=Math.round(L.h*100);
  amRenderBiz(v.biz||[]);
  amLoadImg(v.src);
  amRenderList();
}
function amNew(){
  amCurId='m'+Date.now().toString(36); amSrc=null; amImg=null;
  $('amName').value='';$('amBlend').value='multiply';$('amAlign').value='center';
  $('amInkRole').value='auto';$('amBgRole').value='0';
  $('amIsPaper').checked=false; amPaperToggle(true);
  $('amWarpMode').value='flat';
  $('amYaw').value=0;$('amPitch').value=0;$('amRoll').value=0;$('amRoll2').value=0;
  $('amCurve').value=45;$('amBow').value=0;$('amShade').value=35;
  $('amWarpTilt').classList.add('hidden');$('amWarpCyl').classList.add('hidden');
  $('amLayerMode').checked=false;$('amBgColor').value='#333333';$('amBgLock').checked=false;
  $('amLayerOpts').classList.add('hidden');
  amLayers=[null,null,null];amLayerImgs=[null,null,null];amLayerAbove=[false,false,false];
  amRenderSlots(); amBgLockToggle(true);
  $('amX').value=34;$('amY').value=44;$('amW').value=32;$('amH').value=13;
  amRenderBiz([]); amDraw(); amRenderList();
  toast('새 이미지 — 파일을 올리고 업종을 체크한 뒤 저장하세요');
}
function amRenderBiz(checked){
  const box=$('amBizChecks'); if(!box)return;
  // 업종별 현재 등록 수 (자기 자신 제외)
  const cnt={};
  Object.entries(MOCKUP_IMGS).forEach(([id,v])=>{if(id===amCurId)return;(v.biz||[]).forEach(b=>cnt[b]=(cnt[b]||0)+1);});
  box.innerHTML=BIZ_LIST.map(([k,l])=>{
    const on=checked.includes(k), n=cnt[k]||0, full=!on&&n>=MOCK_BIZ_MAX;
    return `<label class="am-bz${on?' on':''}${full?' full':''}" data-k="${k}" title="${n?`이 업종에 ${n}개 등록됨`:''}">
      <input type="checkbox" ${on?'checked':''} ${full?'disabled':''}>${l}${n?` <em style="font-style:normal;font-weight:600;color:var(--ink3)">${n}</em>`:''}</label>`;
  }).join('');
  box.querySelectorAll('.am-bz:not(.full)').forEach(lb=>{
    const cb=lb.querySelector('input');
    cb.onchange=()=>lb.classList.toggle('on',cb.checked);
  });
}
function amCheckedBiz(){return [...document.querySelectorAll('#amBizChecks input:checked')].map(cb=>cb.closest('.am-bz').dataset.k);}
function amLoadImg(u){
  amImg=null; if(!u){amDraw();return;}
  const im=new Image();im.crossOrigin='anonymous';
  im.onload=()=>{amImg=im;amDraw();};
  im.onerror=()=>{amImg=null;amDraw();toast('이미지를 불러오지 못했어요');};
  im.src=u;
}
function amFilePick(inp){
  const f=inp.files[0]; if(!f)return;
  const r=new FileReader();
  r.onload=()=>{amSrc=r.result;chromaCache.delete('am:'+amCurId);chromaCache.delete(amCurId);
    if(!$('amName').value)$('amName').value=f.name.replace(/\.[^.]+$/,'');
    if($('amLayerMode').checked){amLayers[0]=amSrc;amLoadLayers(()=>{amRenderSlots();amDraw();});}
    amLoadImg(amSrc);};
  r.readAsDataURL(f); inp.value='';
}
function amUrlAsk(){const u=prompt('이미지 URL을 붙여 넣으세요');if(u&&u.trim()){amSrc=u.trim();chromaCache.delete('am:'+amCurId);chromaCache.delete(amCurId);amLoadImg(amSrc);}}
/* ---- v13.1 레이어 시스템: 배경색(자동) → 레이어 1·2·3 → 로고 ---- */
function amLayerToggle(){
  const on=$('amLayerMode').checked;
  $('amLayerOpts').classList.toggle('hidden',!on);
  if(on&&!amLayers.some(Boolean)&&amSrc)amLayers[0]=amSrc;   // 기존 단일 이미지를 레이어1로 승계
  amLoadLayers(); amRenderSlots(); amDraw();
}
function amBgLockToggle(silent){
  const lock=$('amBgLock').checked;
  const tag=$('amBgAutoTag');
  if(tag){
    tag.classList.toggle('locked',lock);
    tag.textContent=lock?'이 이미지는 지정한 색으로 고정됩니다':'선택한 팔레트 톤이 결과 화면에서 자동 적용';
  }
  if(!silent)amDraw();
}
function amRenderSlots(){
  const box=$('amLayerSlots'); if(!box)return;
  box.innerHTML=[0,1,2].map(i=>{
    const src=amLayers[i];
    return `<div class="am-slot${src?' filled':''}" data-i="${i}">
      <div class="am-slot-head">레이어 ${i+1}${i===0?' (기본)':''}
        ${src?`<button type="button" class="rm" data-rm="${i}" title="이 레이어 비우기">비우기</button>`:''}</div>
      <div class="am-slot-thumb">${src?`<img src="${src}" alt="">`:'<i>비어 있음</i>'}</div>
      <div class="am-slot-acts">
        <button type="button" data-up="${i}">파일</button>
        <button type="button" data-url="${i}">URL</button>
      </div>
      <label class="am-chk" style="font-size:10.5px"><input type="checkbox" data-above="${i}" ${amLayerAbove[i]?'checked':''} ${src?'':'disabled'}><b style="font-weight:700">로고 위</b></label>
    </div>`;}).join('');
  box.querySelectorAll('[data-up]').forEach(b=>b.onclick=()=>amSlotPick(+b.dataset.up));
  box.querySelectorAll('[data-url]').forEach(b=>b.onclick=()=>amSlotUrl(+b.dataset.url));
  box.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>amSlotClear(+b.dataset.rm));
  box.querySelectorAll('[data-above]').forEach(cb=>cb.onchange=()=>{amLayerAbove[+cb.dataset.above]=cb.checked;amDraw();});
}
let amSlotTarget=0;
function amSlotPick(i){amSlotTarget=i;$('amLayerFile').click();}
function amLayerFilePick(inp){
  const f=inp.files[0]; if(!f)return;
  const r=new FileReader();
  r.onload=()=>{
    amLayers[amSlotTarget]=r.result;
    if(amSlotTarget===0&&!$('amName').value)$('amName').value=f.name.replace(/\.[^.]+$/,'');
    amLoadLayers(()=>{amRenderSlots();amDraw();});
  };
  r.readAsDataURL(f); inp.value='';
}
function amSlotUrl(i){
  const u=prompt(`레이어 ${i+1} 이미지 URL을 붙여 넣으세요 (배경이 투명한 PNG 권장)`);
  if(u&&u.trim()){amLayers[i]=u.trim();amLoadLayers(()=>{amRenderSlots();amDraw();});}
}
function amSlotClear(i){amLayers[i]=null;amLayerImgs[i]=null;amLayerAbove[i]=false;amRenderSlots();amDraw();}
function amLoadLayers(done){
  let pending=0, called=false;
  const finish=()=>{if(!called&&pending===0){called=true;if(done)done();else amDraw();}};
  [0,1,2].forEach(i=>{
    const u=amLayers[i];
    if(!u){amLayerImgs[i]=null;return;}
    pending++;
    const im=new Image();im.crossOrigin='anonymous';
    im.onload=()=>{amLayerImgs[i]=im;pending--;finish();};
    im.onerror=()=>{amLayerImgs[i]=null;pending--;toast(`레이어 ${i+1} 이미지를 불러오지 못했어요`);finish();};
    im.src=u;
  });
  if(pending===0)finish();
}
function amRect(){return {x:+$('amX').value/100,y:+$('amY').value/100,w:+$('amW').value/100,h:+$('amH').value/100};}
function amDraw(){
  const cv=$('amCanvas'); if(!cv)return;
  const W=cv.width,H=cv.height,x=cv.getContext('2d');
  x.clearRect(0,0,W,H);
  const lmOn=$('amLayerMode')&&$('amLayerMode').checked;
  // v13.11: 미리보기 배경색 — 잠금이면 지정색, 아니면 선택한 팔레트 톤(결과 화면과 동일 규칙)
  const bgRoleIdx=Math.max(0,Math.min(4,+($('amBgRole')?$('amBgRole').value:0)));
  const bgc=($('amBgLock')&&$('amBgLock').checked)
    ? ($('amBgColor').value||'#333333')
    : ((curPal&&curPal[bgRoleIdx]&&curPal[bgRoleIdx].hex)||$('amBgColor').value||'#333333');
  const p=amRect();
  let bl=$('amBlend').value, logoC='#2A3A46';

  const px={x:p.x*W,y:p.y*H,w:p.w*W,h:p.h*H};
  const drawLogo=()=>{
    const layer=renderLogoLayer({w:px.w,h:px.h,ss:2,text:'브랜드 이름',
      fam:'Pretendard',fw:700,color:logoC,align:$('amAlign').value||'center'});
    compositeLogo(x,layer,px,amWarp(),bl,.94);
  };

  if(lmOn){
    const box=layerFitBox(amLayerImgs,W,H);
    x.fillStyle='#ECEAE6';x.fillRect(0,0,W,H);
    if(!box){
      x.fillStyle='#999';x.font='700 18px Pretendard, sans-serif';x.textAlign='center';
      x.fillText('레이어 1에 이미지를 올려 주세요 (배경 투명 PNG 권장)',W/2,H/2);x.textAlign='left';
    }else{
      x.fillStyle=bgc;x.fillRect(box.dx,box.dy,box.dw,box.dh);                   // ① 배경색
      [0,1,2].forEach(i=>{if(amLayerImgs[i]&&!amLayerAbove[i])x.drawImage(amLayerImgs[i],box.dx,box.dy,box.dw,box.dh);}); // ② 로고 아래 레이어
      if($('amIsPaper')&&$('amIsPaper').checked){bl='multiply';logoC='#22302C';}   // v0.19.0: 종이류 미리보기도 항상 어두운 글자로
      else{const light=yiq(bgc)>150; bl=light?'multiply':'screen'; logoC=light?'#22302C':'#FFFFFF';}
      drawLogo();                                                                // ③ 로고
      [0,1,2].forEach(i=>{if(amLayerImgs[i]&&amLayerAbove[i])x.drawImage(amLayerImgs[i],box.dx,box.dy,box.dw,box.dh);}); // ④ 로고 위 레이어(그림자·광택)
    }
  }else{
    if(amImg){const s=Math.min(W/amImg.width,H/amImg.height);
      const dw=amImg.width*s,dh=amImg.height*s;
      x.fillStyle='#ECEAE6';x.fillRect(0,0,W,H);
      x.drawImage(amImg,(W-dw)/2,(H-dh)/2,dw,dh);}
    else{x.fillStyle='#EEE';x.fillRect(0,0,W,H);
      x.fillStyle='#999';x.font='700 20px Pretendard, sans-serif';x.textAlign='center';
      x.fillText('파일 업로드 또는 URL 입력으로 이미지를 등록하세요',W/2,H/2);x.textAlign='left';}
    drawLogo();
  }
  // 가이드 외곽선 — 배경색과 같아 안 보이는 일이 없도록 흰 테두리를 깔고 초록 점선을 얹는다
  warpGuidePath(x,px,amWarp());
  x.strokeStyle='rgba(255,255,255,.85)';x.lineWidth=4.5;x.setLineDash([]);x.stroke();
  x.strokeStyle='#1F1F1F';x.lineWidth=2.2;x.setLineDash([8,6]);x.stroke();x.setLineDash([]);
}
/* 관리자 워프 컨트롤 값 */
function amWarp(){
  const g=id=>{const el=$(id);return el?+el.value:0;};
  const m=$('amWarpMode')?$('amWarpMode').value:'flat';
  return {mode:m,yaw:g('amYaw'),pitch:g('amPitch'),roll:g('amRoll'),
          curve:g('amCurve'),bow:g('amBow'),shade:g('amShade')};
}
function amRollSync(el){const r=$('amRoll');if(r)r.value=el.value;amDraw();}
/* v0.19.0: 종이류 체크 시 글자색을 '자동'으로 고정하고 선택을 잠근다 — 두 설정이
   동시에 다른 값을 주장하면 혼란스러우므로, 종이류가 우선한다는 것을 화면에서도 보여준다. */
function amPaperToggle(silent){
  const on=$('amIsPaper').checked, sel=$('amInkRole');
  if(on){sel.value='auto'; sel.disabled=true;} else{sel.disabled=false;}
  if(!silent)amDraw();
}
function amWarpToggle(){
  const m=$('amWarpMode')?$('amWarpMode').value:'flat';
  const t=$('amWarpTilt'), c=$('amWarpCyl');
  if(t)t.classList.toggle('hidden',m!=='tilt');
  if(c)c.classList.toggle('hidden',m!=='cyl');
  amDraw();
}
function amSave(){
  const lm=$('amLayerMode').checked;
  const layers=amLayers.filter(Boolean);
  if(lm&&!layers.length){toast('레이어 1에 이미지를 먼저 올려 주세요');return;}
  if(!lm&&!amSrc){toast('먼저 이미지를 등록하세요');return;}
  const name=($('amName').value||'').trim()||'이름 없는 목업';
  MOCKUP_IMGS[amCurId]={name,
    src:lm?(amLayers[0]||amSrc):amSrc,     // 목록 썸네일용 대표 이미지
    logo:amRect(),blend:$('amBlend').value,align:$('amAlign').value,biz:amCheckedBiz(),
    layerMode:lm,
    layers:lm?amLayers.slice(0,AM_LAYER_MAX):null,
    layerAbove:lm?amLayerAbove.slice(0,AM_LAYER_MAX):null,
    bgColor:$('amBgColor').value,bgLock:$('amBgLock').checked,
    bgRole:+$('amBgRole').value,
    inkRole:$('amInkRole').value==='auto'?'auto':+$('amInkRole').value,
    isPaper:$('amIsPaper').checked,
    warp:amWarp()};
  chromaCache.delete(amCurId);   // 이미지 교체 대비 캐시 무효화
  markDirty(); amRenderList(); amRenderBiz(amCheckedBiz());
  if(curCode)drawMockup();
  toast(`'${name}' 저장 — 「데이터 파일 내보내기」로 영구 반영하세요`);
}
function amDelete(){
  if(!MOCKUP_IMGS[amCurId]){amNew();return;}
  const v=MOCKUP_IMGS[amCurId];
  if(!confirm(`'${v.name}' 이미지를 라이브러리에서 삭제할까요?`))return;
  delete MOCKUP_IMGS[amCurId];
  amCurId=null; markDirty(); renderAdminMockup();
  if(curCode)drawMockup();
  toast('삭제했어요');
}
/* 16 스타일 맵 전용 카테고리 색 — 실제 브랜드 색과 별개로, 한눈에 구분되도록 색상환에 고르게 배치 */
const TAG_HUES = (()=>{const codes=["GBEC","GBEM","GBRC","GBRM","GSEC","GSEM","GSRC","GSRM","LBEC","LBEM","LBRC","LBRM","LSEC","LSEM","LSRC","LSRM"];
  const t={}; codes.forEach((c,i)=>t[c]=Math.round(i*(360/codes.length))); return t;})();
function tagHex(code){return hsb2hex(TAG_HUES[code],68,80);}
/* 16맵 전용: 매번 다른 무작위 대신, 항상 같은 대표 팔레트를 보여주는 결정론적 조색 */
function previewPalette(st,scheme){
  const S=st.sat,B=st.bri;
  const midS=(S[0]+S[1])/2, midB=(B[0]+B[1])/2;
  const dark=B[1]<=25;
  const h=(st.hue[0][0]<=st.hue[0][1])?(st.hue[0][0]+st.hue[0][1])/2:st.hue[0][0];
  let p;
  if(scheme==='tot'){
    const s0=midS,b0=(B[0]+midB)/2;
    p=[[h,s0,b0],[h,s0*.82,clamp(b0+22,B[0],Math.max(B[1],b0+22))],[h,clamp(s0*1.15,0,100),clamp(b0+40,0,92)],[h,clamp(s0*.16,0,14),96],[h,clamp(s0*.5,0,30),14]];
  }else if(scheme==='tit'){
    const off=27,s0=midS,b0=clamp(midB,60,B[1]);
    p=[[h,s0,b0],[h+off,s0*.92,clamp(b0+4,B[0],100)],[h-off,s0*.96,clamp(b0-4,B[0],100)],[h,clamp(s0*.15,0,12),97],[h,clamp(s0*.55,0,32),16]];
  }else if(scheme==='acc'){
    const s0=clamp(Math.max(midS,55),S[0],100);
    if(dark) p=[[h,8,8],[h,10,15],[h,s0,72],[h,6,72],[h,4,96]];
    else p=[[h,4,98],[h,7,92],[h,s0,clamp(midB,55,95)],[h,10,62],[h,18,13]];
  }else{
    const h2=st.hue.length>1?((st.hue[1][0]+st.hue[1][1])/2):h+160;
    const s0=midS,b0=clamp(midB,40,85);
    p=[[h,s0,b0],[h2,s0*.9,clamp(b0-6,25,85)],[h,clamp(s0*1.1,0,95),clamp(b0+14,0,90)],[42,14,94],[28,30,15]];
  }
  const roles=["주조색","보조색","포인트","바탕색","글자색"];
  const out=p.map(([hh,ss,bb],i)=>({h:((hh%360)+360)%360,s:clamp(ss,0,100),b:clamp(bb,0,100),hex:hsb2hex(hh,ss,bb),role:roles[i]}));
  return applyAvoid(st,out,scheme);
}
const PRISM_URL='https://markinfo.kr/services/45';

/* ================= SLIDERS UI ================= */
function buildAxes(){
  const box=$('axes'); if(!box)return;   // v2.1.0: 직접 조절하기 삭제로 #axes가 더 이상 없다
  box.innerHTML=''; sliders.length=0;   // 저장본에 남은 마크업 제거 후 재생성
  AXES.forEach((ax,i)=>{
    const d=document.createElement('div');
    d.className='axis';
    d.innerHTML=`
      <div class="axis-head"><span class="axis-name">${ax.name}</span><span class="axis-easy">${ax.easy}</span></div>
      <div class="poles">
        <span class="pole pl"><b>${ax.L.t}</b><small>${ax.L.s}</small></span>
        <span class="pole pr" style="text-align:right"><b>${ax.R.t}</b><small>${ax.R.s}</small></span>
      </div>
      <div class="srow">
        <input type="range" min="0" max="6" step="1" value="3" aria-label="${ax.name}: ${ax.L.t}에서 ${ax.R.t}">
        <span class="strength center">미정</span>
      </div>`;
    box.appendChild(d);
    const inp=d.querySelector('input');
    sliders.push(inp);
    inp.addEventListener('input',()=>render());
  });
}
const STR=["강함","보통","약간",null,"약간","보통","강함"];
function axisState(i){
  if(!sliders[i])return {side:null,strength:null,v:3};   // v2.1.0: 슬라이더가 없으면 항상 '미정'
  const v=+sliders[i].value;
  if(v===3) return {side:null,strength:null,v};
  return {side:v<3?'L':'R', strength:STR[v], v};
}
function currentCode(){
  let code='';
  for(let i=0;i<4;i++){const st=axisState(i);if(!st.side)return null;code+=AXES[i][st.side].c;}
  return code;
}
function syncAxisUI(){
  sliders.forEach((s,i)=>{
    const st=axisState(i), ax=s.closest('.axis');
    ax.querySelector('.pl').classList.toggle('on',st.side==='L');
    ax.querySelector('.pr').classList.toggle('on',st.side==='R');
    const lab=ax.querySelector('.strength');
    lab.textContent=st.side?st.strength:'미정';
    lab.classList.toggle('center',!st.side);
    s.classList.toggle('center',!st.side);
  });
}

/* ================= MBCI TEST (v0.20.0) =================
   12개 질문 → 4개 축 점수 → 4자리 브랜드 코어 코드.
   답변의 A/B 글자는 점수 방향이 아니다 — 각 답변의 pole이 실제 점수 대상이다. */
const Q_PLACEHOLDER='assets/img/questions/placeholder.webp';
function imgFor(an){return (an.image&&an.image.src)||'';}

/* ================= 관리자 · MBCI 질문 관리 (v0.20.0) =================
   편집은 작업 사본(mqDraft)에서 하고 「이 문항 적용」으로 MBCI에 반영한다.
   문항 수는 12개 고정 — 순서·사용 여부·문구·축·극·가중치·이미지를 수정한다. */
let mqSel=null, mqDraft=null, mqSimAns={}, mqVw='d';
const MQ_MAX_BYTES=5*1024*1024, MQ_WARN_BYTES=500*1024, MQ_TYPES=['image/webp','image/png','image/jpeg'];

/* 전체 검증 — errors가 있으면 저장·내보내기 차단, warnings는 알림만 */
function validateMbci(m){
  m=m||MBCI;
  const errors=[], warnings=[];
  const act=m.questions.filter(q=>q.active!==false);
  const ids=act.map(q=>q.id);
  ids.filter((x,i)=>ids.indexOf(x)!==i).forEach(x=>errors.push(`문항 ID 중복: ${x}`));
  const perAxis={};
  m.axes.forEach(a=>{perAxis[a.id]={text:0,image:0};});
  act.forEach(q=>{
    const tag=q.id;
    if(!String(q.text||'').trim())errors.push(`${tag}: 질문 문구가 비어 있음`);
    const ax=m.axes.find(a=>a.id===q.axisId);
    if(!ax){errors.push(`${tag}: 존재하지 않는 축 ${q.axisId}`);return;}
    const type=q.type==='image'?'image':'text';
    perAxis[ax.id][type]++;
    const poles=[ax.left.code,ax.right.code];
    q.answers.forEach(an=>{
      if(!String(an.text||'').trim())errors.push(`${tag}-${an.id}: 답변 문구가 비어 있음`);
      if(!poles.includes(an.pole))errors.push(`${tag}-${an.id}: 극 ${an.pole}은(는) ${ax.id} 축에 속하지 않음`);
      if(an.weight!==1)errors.push(`${tag}-${an.id}: 문항당 1점 고정입니다(가중치 ${an.weight})`);
    });
    if(q.answers.length===2&&q.answers[0].pole===q.answers[1].pole)errors.push(`${tag}: A/B가 같은 극(${q.answers[0].pole})을 가리킴`);
    if(type==='image'){
      const im=q.image||{};
      if(!im.src)errors.push(`${tag}: 이미지형 문항인데 질문 이미지가 없음 — 이미지를 등록해 주세요`);
      else if(!String(im.alt||'').trim())warnings.push(`${tag}: 질문 이미지 대체 텍스트(alt) 없음 — 접근성`);
    }
  });
  m.axes.forEach(a=>{
    const c=perAxis[a.id], tot=c.text+c.image;
    if(c.text!==3||c.image!==2)errors.push(`${a.left.code}${a.right.code} 축: 지문형 ${c.text} · 이미지형 ${c.image} (총 ${tot}) — 지문형 3 + 이미지형 2 = 5문항이어야 합니다. 구성을 바꾸면 채점 규칙이 달라지므로 승인 전에는 배포할 수 없어요`);
  });
  // 결과 콘텐츠 점검(경고) — 참고 브랜드는 이름·로고 4쌍이 기본
  const short=[], noLogo=[];
  Object.entries(m.results||{}).forEach(([c,r])=>{
    const bl=(r.refBrands||[]).filter(b=>b&&String(b.name||'').trim());
    if(bl.length<4)short.push(`${c}(${bl.length})`);
    if(bl.some(b=>!(b.logo&&b.logo.url)))noLogo.push(c);
  });
  if(short.length)warnings.push(`참고 브랜드가 4개 미만인 코어: ${short.join(', ')} — 이름·로고 4쌍을 채워 주세요`);
  if(noLogo.length)warnings.push(`로고 이미지가 없는 참고 브랜드가 있는 코어: ${noLogo.join(', ')}`);
  const total=act.length;
  if(total!==20)errors.push(`활성 문항 ${total}개 — 지문형 12 + 이미지형 8 = 20개여야 합니다`);
  return {errors,warnings};
}
function renderMbciCheck(){
  const v=validateMbci(), box=$('mqCheck'); if(!box)return v;
  const cnt=$('tabCntMbci'); if(cnt)cnt.textContent=`${mbciQs().length}문항${v.errors.length?` · 오류 ${v.errors.length}`:''}`;
  if(!v.errors.length&&!v.warnings.length){box.innerHTML='<div class="mq-ok">✓ 검증 통과 — 저장·내보내기 가능</div>';return v;}
  box.innerHTML=(v.errors.length?`<div class="mq-err"><b>오류 ${v.errors.length} — 해결 전에는 내보낼 수 없습니다</b><ul>${v.errors.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:'')
    +(v.warnings.length?`<details class="mq-warn"><summary>경고 ${v.warnings.length}</summary><ul>${v.warnings.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></details>`:'');
  return v;
}
/* ================= 관리자 · 결과 (v2.1.0) =================
   16개 브랜드 코어의 코드·이름·키워드·설명을 관리하는 마스터 페이지.
   코드 자체는 4개 축 조합으로 정해지므로 편집하지 않고, 이름·키워드·설명만 편집한다. */
function shareUrlFor(code){
  const pub=(SITE_META.publicUrl||'').trim();
  const base=pub?pub.replace(/#.*$/,'').replace(/index\.html$/,'').replace(/\/?$/,'/'):new URL('./',document.baseURI).href;   // 공개 주소가 없으면 이 폴더 자신의 주소
  return base+'#/core/'+code;
}
/* ================= 관리자 · 내보내기 (v2.3.0) =================
   사이트 이름·파비콘·썸네일 설정 + 데이터/zip 내보내기·불러오기를 한 탭에 모은다. */
const DEFAULT_FAVICON='assets/img/brand/favicon-32.png';
const DEFAULT_OG='assets/img/og/default.png';
/* ================= v2.11.0 관리자 · 메인 페이지 편집 ================= */
const HOME_DEFAULTS={
  eyebrow:'디자인을 몰라도 3분이면 충분해요',
  h1:'내 브랜드 코어는 뭘까?\nMBCI 테스트로 확인해 보세요!',
  sub:'간단한 질문을 통해 내 브랜드가 추구하는\n비주얼 감성과 로고 스타일을 알 수 있어요.'
};
/* ================= v2.12.0 관리자 · 업종 보정 편집 ================= */
function renderAdminIndustry(){
  const box=$('industryGrid'); if(!box)return;
  const axes=mbciAxes();
  const iw=MBCI.industryWeights=MBCI.industryWeights||{};
  const wt=$('indWeightToggle');
  if(wt){wt.checked=!(MBCI.settings&&MBCI.settings.industryWeightEnabled===false);wt.onchange=()=>{MBCI.settings=MBCI.settings||{};MBCI.settings.industryWeightEnabled=wt.checked;box.classList.toggle('ind-off',!wt.checked);markDirty();};box.classList.toggle('ind-off',!wt.checked);}
  const cellOpts=(ax,cur)=>{
    const sel=v=>JSON.stringify(v)===JSON.stringify(cur)?'selected':'';
    return `<option value="" ${!cur?'selected':''}>-</option>
      <option value='["${ax.left.code}",1]' ${sel([ax.left.code,1])}>${ax.left.code} ◇ (+1)</option>
      <option value='["${ax.left.code}",2]' ${sel([ax.left.code,2])}>${ax.left.code} ◆ (+2)</option>
      <option value='["${ax.right.code}",1]' ${sel([ax.right.code,1])}>${ax.right.code} ◇ (+1)</option>
      <option value='["${ax.right.code}",2]' ${sel([ax.right.code,2])}>${ax.right.code} ◆ (+2)</option>`;
  };
  box.innerHTML = `<table class="ind-table"><thead><tr><th>업종</th>${axes.map(a=>`<th>${esc(a.left.code+a.right.code)} · ${esc(a.name)}</th>`).join('')}</tr></thead>
    <tbody>${BIZ_LIST.map(([k,l])=>`<tr><td class="ind-biz">${bizIcon(k)} ${esc(l)}</td>${axes.map(a=>
      `<td><select class="af-in" data-biz="${k}" data-axis="${a.id}">${cellOpts(a,(iw[k]||{})[a.id])}</select></td>`).join('')}</tr>`).join('')}<tr class="ind-etc"><td class="ind-biz">${bizIcon('etc')} 기타</td><td colspan="${axes.length}">업종 보정 없음 — 업종을 고르지 않으면 자동으로 적용되며 가중치를 갖지 않습니다</td></tr></tbody></table>`;
  box.querySelectorAll('select[data-biz]').forEach(sel=>{
    sel.onchange=()=>{
      const k=sel.dataset.biz, axisId=sel.dataset.axis;
      iw[k]=iw[k]||{};
      if(sel.value)iw[k][axisId]=JSON.parse(sel.value);
      else delete iw[k][axisId];
      markDirty();
    };
  });
}
function renderAdminHome(){
  const m=SITE_META;
  $('heEyebrow').value=homeToText(m.homeEyebrow)||HOME_DEFAULTS.eyebrow;
  $('heH1').value=homeToText(m.homeH1)||HOME_DEFAULTS.h1;
  $('heSub').value=homeToText(m.homeSub)||HOME_DEFAULTS.sub;
  $('heHeaderTitle').value=m.headerTitle||'';
  $('heConsultUrl').value=m.consultUrl||'';
  $('hePrismUrl').value=m.prismUrl||'';
  $('heRecordUrl').value=m.recordUrl||''; $('hePublicUrl').value=m.publicUrl||'';
  // ---- CTA 편집(라벨 문구·메인 문구·이미지 1장·버튼 문구·안내 문구) — 초안(draft)에서 편집하고 「적용」으로 반영
  const draft=JSON.parse(JSON.stringify(ctaCfg()));
  const imgBox=$('heCtaImg');
  const ctaPaint=()=>{
    draft.head=$('heCtaHead').value; draft.chip=$('heCtaChip').value; draft.foot=$('heCtaFoot').value; draft.copyNote=$('heCtaCopy').value;
    draft.saveNote=$('heCtaSaveNote').value; draft.consultLabel=$('heCtaConsultLbl').value; draft.prismLabel=$('heCtaPrismLbl').value; draft.saveLabel=$('heCtaSaveLbl').value;
    $('heCtaPvNew').innerHTML=ctaSaveHTML(ctaCfg(draft),true)+ctaCardHTML(ctaCfg(draft),true);
    $('heCtaPvOld').innerHTML=ctaSaveHTML(ctaCfg(),true)+ctaCardHTML(ctaCfg(),true);
  };
  const imgDraw=()=>{
    const im=draft.image||(draft.image={src:'',alt:''});
    imgBox.innerHTML=`<div class="cie">
      <div class="cie-thumb">${im.src?`<img src="${esc(im.src)}" alt="">`:'<span>이미지 없음</span>'}</div>
      <div class="cie-f">
        <div class="mq-btnrow"><button type="button" class="chip-btn" data-cimg="up">${im.src?'이미지 교체':'이미지 업로드'}</button>${im.src?'<button type="button" class="chip-btn" data-cimg="rm">이미지 삭제</button>':''}</div>
        <div class="cie-note" id="heCtaImgNote">${im.src?'':'이미지를 올리지 않으면 이미지 칸 없이 표시돼요'}</div>
        <input class="af-in" data-cf="alt" value="${esc(im.alt||'')}" maxlength="80" placeholder="이미지 설명(대체 텍스트)" ${im.src?'':'disabled'}>
      </div></div>`;
    imgBox.querySelector('[data-cimg="up"]').onclick=()=>$('heCtaFile').click();
    const rm=imgBox.querySelector('[data-cimg="rm"]'); if(rm)rm.onclick=()=>{draft.image={src:'',alt:''};imgDraw();ctaPaint();};
    imgBox.querySelector('[data-cf="alt"]').oninput=e=>{draft.image.alt=e.target.value;ctaPaint();};
    if(im.src){ const t=new Image(); t.onload=()=>{ const n=$('heCtaImgNote'); if(!n)return; const w=t.naturalWidth,h=t.naturalHeight;
      n.innerHTML=w?`가로 ${w}px × 세로 ${h}px`+(w===1080?' · 권장 크기예요':` · <b>권장은 가로 1080px</b> 예요${w<1080?' (화면에서 흐릿해 보일 수 있어요)':''}`):'';
      n.classList.toggle('warn',!!w&&w!==1080); }; t.src=im.src; }
  };
  $('heCtaFile').onchange=e=>{
    const f=e.target.files[0]; e.target.value=''; if(!f)return;
    if(!/^image\/(png|jpeg|webp|svg\+xml)$/.test(f.type)){toast('PNG·JPG·WEBP·SVG 이미지만 올릴 수 있어요');return;}
    if(f.size>5*1024*1024){toast('파일이 너무 커요 — 5MB 이하로 올려 주세요');return;}
    const rd=new FileReader(); rd.onload=()=>{draft.image={src:rd.result,alt:(draft.image&&draft.image.alt)||''};imgDraw();ctaPaint();}; rd.readAsDataURL(f);
  };
  $('heCtaHead').value=draft.head; $('heCtaChip').value=draft.chip; $('heCtaFoot').value=draft.foot; $('heCtaCopy').value=draft.copyNote;
  $('heCtaSaveNote').value=draft.saveNote; $('heCtaConsultLbl').value=draft.consultLabel; $('heCtaPrismLbl').value=draft.prismLabel; $('heCtaSaveLbl').value=draft.saveLabel;
  ['heCtaHead','heCtaChip','heCtaFoot','heCtaCopy','heCtaSaveNote','heCtaConsultLbl','heCtaPrismLbl','heCtaSaveLbl'].forEach(id=>$(id).oninput=ctaPaint);
  imgDraw(); ctaPaint();
  const sp=savePartsCfg(), showMock=!!(MBCI.settings&&MBCI.settings.showMockup);
  $('spRef').checked=sp.ref; $('spFont').checked=sp.font; $('spColor').checked=sp.color;
  // 목업은 결과 화면의 「적용 예시」 표시 여부(목업 탭)를 따른다 — 꺼져 있으면 선택할 수 없다
  $('spMock').checked=showMock&&sp.mock; $('spMock').disabled=!showMock;
  $('spMockLbl').classList.toggle('fixed',!showMock);
  $('spMockNote').textContent=showMock?'':'(목업이 표시 중일 때만 선택 가능)';
  const preview=()=>{
    $('hePvEyebrow').textContent=$('heEyebrow').value||HOME_DEFAULTS.eyebrow;
    $('hePvH1').innerHTML=homeToHtml($('heH1').value||HOME_DEFAULTS.h1,true);
    $('hePvSub').innerHTML=homeToHtml($('heSub').value||HOME_DEFAULTS.sub);
  };
  preview();
  ['heEyebrow','heH1','heSub'].forEach(id=>{ $(id).oninput=preview; });
  const okUrl=v=>/^https?:\/\/\S+$/i.test(v.trim());
  const warn=(inpId,warnId)=>{const bad=!okUrl($(inpId).value); $(warnId).classList.toggle('hidden',!bad); $(inpId).classList.toggle('af-bad',bad); return !bad;};
  const recOk=()=>{const v=$('heRecordUrl').value.trim(), ok=!v||/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(v); $('heRecordWarn').classList.toggle('hidden',ok); return ok;};
  const checkUrls=()=>{const a=warn('heConsultUrl','heConsultWarn'), b=warn('hePrismUrl','hePrismWarn'), c=recOk(); return a&&b&&c;};
  $('heConsultUrl').oninput=checkUrls; $('hePrismUrl').oninput=checkUrls; $('heRecordUrl').oninput=checkUrls;
  checkUrls();
  $('heRevert').onclick=()=>{ renderAdminHome(); };
  $('heApply').onclick=()=>{
    if(!checkUrls()){toast('CTA 링크가 비어 있거나 올바르지 않아요');return;}
    m.homeEyebrow=$('heEyebrow').value.trim();
    m.homeH1=$('heH1').value.trim();
    m.homeSub=$('heSub').value.trim();
    m.homeBg='';
    m.headerTitle=$('heHeaderTitle').value.trim();
    m.cta=JSON.parse(JSON.stringify(draft)); delete m.cta.steps;   // v2.23.0: 옛 「절차 3단계」는 없어졌다
    m.consultUrl=$('heConsultUrl').value.trim();
    m.prismUrl=$('hePrismUrl').value.trim();
    m.recordUrl=$('heRecordUrl').value.trim(); m.publicUrl=$('hePublicUrl').value.trim();
    m.savePng={ref:$('spRef').checked,font:$('spFont').checked,color:$('spColor').checked,mock:$('spMock').disabled?savePartsCfg().mock:$('spMock').checked};
    applyHomeContent();
    markDirty();
    ctaPaint(); if(curCode&&document.body.classList.contains('results-shown'))renderStyle();
    toast('적용했어요 — 「내보내기」 탭에서 저장하면 실제 사이트에 반영돼요');
  };
}
const DEFAULT_DESC='간단한 질문으로 내 브랜드의 코어 이미지를 진단하세요';
function renderAdminExport(){
  const t=$('expTitle'); if(t)t.value=SITE_META.title||'MBCI — Markinfo Brand Core Indicator';
  const favImg=$('expFaviconImg'); if(favImg)favImg.src=SITE_META.faviconSrc||DEFAULT_FAVICON;
  const ogImg=$('expOgImg'); if(ogImg)ogImg.src=SITE_META.ogImageSrc||DEFAULT_OG;

  if(t&&!t.dataset.bound){
    t.dataset.bound='1';
    t.oninput=()=>{SITE_META.title=t.value; markDirty();};
  }
  /* v2.33.1: 링크 미리보기(og:description)·검색 설명 문구 */
  const dsc=$('expDesc'), dcn=$('expDescCnt');
  if(dsc){
    dsc.value=SITE_META.desc!=null?SITE_META.desc:DEFAULT_DESC;
    const cnt=()=>{ if(dcn)dcn.textContent=dsc.value.length+' / 120자'; };
    cnt();
    if(!dsc.dataset.bound){ dsc.dataset.bound='1'; dsc.oninput=()=>{SITE_META.desc=dsc.value; cnt(); markDirty();}; }
  }
  const bindImg=(btnId,fileId,resetId,imgId,key,accept)=>{
    const btn=$(btnId); if(!btn||btn.dataset.bound)return; btn.dataset.bound='1';
    btn.onclick=()=>$(fileId).click();
    $(fileId).onchange=e=>{
      const f=e.target.files[0]; e.target.value=''; if(!f)return;
      if(f.size>2*1024*1024){alert('2MB 이하 이미지를 올려 주세요.');return;}
      const r=new FileReader();
      r.onload=()=>{ SITE_META[key]=r.result; $(imgId).src=r.result; markDirty(); };
      r.readAsDataURL(f);
    };
    $(resetId).onclick=()=>{ SITE_META[key]=''; $(imgId).src=key==='faviconSrc'?DEFAULT_FAVICON:DEFAULT_OG; markDirty(); };
  };
  bindImg('expFaviconUp','expFaviconFile','expFaviconReset','expFaviconImg','faviconSrc');
  bindImg('expOgUp','expOgFile','expOgReset','expOgImg','ogImageSrc');

  document.querySelectorAll('.exp-opt').forEach(lbl=>{
    if(lbl.dataset.bound)return; lbl.dataset.bound='1';
    lbl.querySelector('input').onchange=()=>{
      document.querySelectorAll('.exp-opt').forEach(x=>x.classList.toggle('on',x.querySelector('input').checked));
    };
  });
  const ib=$('expImportBtn');
  if(ib&&!ib.dataset.bound){ib.dataset.bound='1'; ib.onclick=()=>$('adImport').click();}
}
function runExportSave(){
  const kind=document.querySelector('input[name="expKind"]:checked')?.value||'zip';
  if(kind==='zip')exportSiteZip(); else exportDataFile();
}
/* v2.16.0: 저장 전 미리보기 — 지금 편집 중인 데이터(저장 전 상태)를 그대로 넣은 사이트를 전체 화면으로 보여준다.
   내보내기 버튼은 미리보기 우측 상단에 항상 떠 있다. */
let spvMode='d';
async function openSitePreview(){
  if(location.protocol==='file:'){alert('미리보기는 웹 서버(http://)로 열었을 때 사용할 수 있어요.\n\n터미널에서 이 폴더 안에서 python3 -m http.server 8080 을 실행한 뒤 http://localhost:8080 으로 접속해 주세요.');return;}
  const btn=$('adPreviewBtn'); if(btn){btn.disabled=true;btn.textContent='불러오는 중…';}
  try{
    let html=await (await fetchWithRetry('index.html')).text();
    const dataJs='window.BSM_DATA='+JSON.stringify(currentDataObject()).replace(/</g,'\\u003c')+';';
    const re=/<script src="assets\/data\/bsm-data\.js[^"]*"><\/script>/;
    if(!re.test(html))throw new Error('데이터 스크립트를 찾지 못했어요');
    html=html.replace(re,()=>'<script>'+dataJs+'<\/script>');
    html=html.replace('<head>',()=>'<head><base href="'+new URL('./',location.href).href+'">');
    let ov=$('spvOv');
    if(!ov){
      ov=document.createElement('div'); ov.id='spvOv'; ov.className='spv-ov';
      ov.innerHTML=`<div class="spv-bar"><b>미리보기</b><span class="spv-sub">저장 전 상태 그대로 보여요</span>
        <div class="spv-dev"><button type="button" data-d="d">데스크톱</button><button type="button" data-d="m">모바일</button></div>
        <div class="spv-right"><button type="button" class="spv-export" id="spvExport">⇩ 내보내기</button><button type="button" class="spv-close" id="spvClose" aria-label="미리보기 닫기">✕</button></div></div>
        <div class="spv-stage"><iframe id="spvFrame" title="사이트 미리보기"></iframe></div>`;
      document.body.appendChild(ov);
      $('spvClose').onclick=closeSitePreview;
      $('spvExport').onclick=()=>runExportSave();
      ov.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{spvMode=b.dataset.d;paintSpvMode();});
      document.addEventListener('keydown',e=>{if(e.key==='Escape'&&ov.classList.contains('on'))closeSitePreview();});
    }
    $('spvFrame').srcdoc=html;
    ov.classList.add('on'); document.body.classList.add('spv-open'); paintSpvMode();
  }catch(e){
    console.error(e); toast('미리보기를 열지 못했어요 — '+(e&&e.message||e));
  }finally{ if(btn){btn.disabled=false;btn.textContent='👁 미리보기';} }
}
function paintSpvMode(){
  const ov=$('spvOv'); if(!ov)return;
  ov.classList.toggle('mobile',spvMode==='m');
  ov.querySelectorAll('[data-d]').forEach(b=>b.classList.toggle('on',b.dataset.d===spvMode));
}
function closeSitePreview(){
  const ov=$('spvOv'); if(ov){ov.classList.remove('on');const f=$('spvFrame'); if(f)f.srcdoc='';}
  document.body.classList.remove('spv-open');
}
function renderAdminResults(){
  const box=$('rsList'); if(!box)return;
  const codes=allCoreCodes();
  const results=MBCI.results=MBCI.results||{};
  box.innerHTML=codes.map((code,i)=>{
    const v=results[code]||{code,name:'',keywords:[],desc:'',order:i};
    const done=v.name&&v.desc;
    return `<div class="rs-row${done?'':' rs-empty'}" data-code="${code}">
      <div class="rs-row-h">
        <span class="rs-code">${code}</span>
        <input class="af-in rs-name" data-code="${code}" data-f="name" value="${esc(v.name||'')}" placeholder="예: 시그널코어">
        <a class="rs-link" href="${esc(shareUrlFor(code))}" target="_blank" rel="noopener" title="이 결과 페이지 열기">링크 ↗</a>
        <button type="button" class="chip-btn rs-copy" data-code="${code}">복사</button>
      </div>
      <input class="af-in rs-kw" data-code="${code}" data-f="keywords" value="${esc((v.keywords||[]).join(', '))}" placeholder="키워드 3개 · 쉼표로 구분 (예: 강렬, 명확, 구조)">
      <textarea class="af-in rs-desc" rows="4" data-code="${code}" data-f="desc" placeholder="이 코어에 대한 설명 — 엔터로 줄을 나누고, 빈 줄은 문단 구분이에요 (비워 두면 문장마다 자동으로 나눠요)">${esc(v.desc||'')}</textarea>
      <div class="rs-hero">
        <div class="rs-hero-thumb"><img src="${v.heroImageSrc||''}" alt="" style="${v.heroImageSrc?'':'display:none'}"></div>
        <div class="rs-hero-ctl">
          <div class="rs-hero-label">코어 캐릭터 이미지 <span>16:9 · 1920×1080 권장 · 결과 화면 상단</span></div>
          <div class="rs-hero-btns">
            <button type="button" class="chip-btn" data-hero-up="${code}">파일 업로드</button>
            ${v.heroImageSrc?`<button type="button" class="chip-btn" data-hero-clear="${code}">제거</button>`:''}
          </div>
        </div>
        <input type="file" class="hidden" data-hero-file="${code}" accept="image/png,image/jpeg,image/webp">
      </div>
    </div>`;
  }).join('');
  box.querySelectorAll('[data-f]').forEach(el=>{
    const handler=()=>{
      const code=el.dataset.code, f=el.dataset.f;
      const v=results[code]=results[code]||{code,order:codes.indexOf(code)};
      v.code=code;
      if(f==='keywords')v.keywords=el.value.split(',').map(x=>x.trim()).filter(Boolean).slice(0,4);
      else v[f]=el.value;
      const row=el.closest('.rs-row'); if(row)row.classList.toggle('rs-empty',!(v.name&&v.desc));
      markDirty(); updateTabCounts();
    };
    el.addEventListener(el.tagName==='TEXTAREA'?'input':'input',handler);
  });
  box.querySelectorAll('[data-hero-up]').forEach(b=>b.onclick=()=>box.querySelector(`[data-hero-file="${b.dataset.heroUp}"]`).click());
  box.querySelectorAll('[data-hero-file]').forEach(inp=>inp.onchange=e=>{
    const f=e.target.files[0]; e.target.value=''; if(!f)return;
    if(f.size>3*1024*1024){alert('3MB 이하 이미지를 올려 주세요.');return;}
    const code=inp.dataset.heroFile, r=new FileReader();
    r.onload=()=>{
      const v=results[code]=results[code]||{code,order:codes.indexOf(code)}; v.code=code;
      v.heroImageSrc=r.result; markDirty(); renderAdminResults();
      if(mbciCodeFor(curCode)===code)renderStyle();
    };
    r.readAsDataURL(f);
  });
  box.querySelectorAll('[data-hero-clear]').forEach(b=>b.onclick=()=>{
    const v=results[b.dataset.heroClear]; if(v){delete v.heroImageSrc; markDirty(); renderAdminResults();
      if(mbciCodeFor(curCode)===b.dataset.heroClear)renderStyle();}
  });
  box.querySelectorAll('.rs-copy').forEach(b=>b.onclick=()=>{
    const url=shareUrlFor(b.dataset.code);
    navigator.clipboard?.writeText(url).then(()=>toast(`${b.dataset.code} 링크를 복사했어요`)).catch(()=>toast(url));
  });
}
$('rsCopyAll')&&($('rsCopyAll').onclick=()=>{
  const lines=allCoreCodes().map(c=>{
    const v=(MBCI.results||{})[c];
    return `${c}${v&&v.name?' · '+v.name:''}\t${shareUrlFor(c)}`;
  }).join('\n');
  navigator.clipboard?.writeText(lines).then(()=>toast('16개 결과 링크를 전부 복사했어요')).catch(()=>toast('복사에 실패했어요'));
});

function renderAdminMbci(){
  const qs=MBCI.questions.slice().sort((a,b)=>a.order-b.order);
  if(!mqSel||!MBCI.questions.find(q=>q.id===mqSel))mqSel=qs[0]&&qs[0].id;
  $('mqNeutral').checked=(MBCI.settings||{}).neutralEnabled!==false;
  $('mqNeutralLabel').value=(MBCI.settings||{}).neutralLabel||'';
  $('mqList').innerHTML=qs.map((q,i)=>`<div class="mq-row${q.id===mqSel?' on':''}${q.active===false?' off':''}" data-q="${q.id}">
      <div class="mq-r-top"><b>${i+1}. ${esc(q.id)}</b><span class="mq-ax">${(()=>{const ax=mbciAxis(q.axisId);return ax?esc(ax.left.code+ax.right.code):esc(q.axisId);})()}</span>
        <span class="mq-pts">${q.type==='image'?`이미지형${(q.image&&q.image.src)?'':' · <em style="color:#B3452F;font-style:normal">이미지 없음</em>'}`:'지문형'} · A ${esc(q.answers[0].pole)} / B ${esc(q.answers[1].pole)}</span></div>
      <div class="mq-r-txt">${esc(q.text)}</div>
      <div class="mq-r-acts">
        <label class="mq-chk" onclick="event.stopPropagation()"><input type="checkbox" data-act="${q.id}" ${q.active!==false?'checked':''}> 사용</label>
        <button type="button" data-mv="${q.id}:-1" ${i===0?'disabled':''} title="위로">↑</button>
        <button type="button" data-mv="${q.id}:1" ${i===qs.length-1?'disabled':''} title="아래로">↓</button>
      </div></div>`).join('');
  $('mqList').querySelectorAll('.mq-row').forEach(r=>r.onclick=e=>{
    if(e.target.closest('button,input,label'))return;
    if(mqDraft&&mqDirty()&&!confirm('적용하지 않은 편집이 있습니다. 버리고 다른 문항으로 이동할까요?'))return;
    mqSel=r.dataset.q; mqDraft=null; renderAdminMbci();
  });
  $('mqList').querySelectorAll('[data-act]').forEach(cb=>cb.onchange=()=>{
    const q=MBCI.questions.find(x=>x.id===cb.dataset.act); q.active=cb.checked;
    const v=validateMbci();
    if(v.errors.some(x=>x.includes('활성 문항이 없음'))){q.active=!cb.checked;cb.checked=!cb.checked;alert('이 문항을 끄면 해당 축에 활성 문항이 하나도 남지 않습니다. 끌 수 없습니다.');return;}
    markDirty(); renderAdminMbci();
  });
  $('mqList').querySelectorAll('[data-mv]').forEach(b=>b.onclick=()=>{
    const [id,d]=b.dataset.mv.split(':'); const arr=MBCI.questions.slice().sort((a,b)=>a.order-b.order);
    const i=arr.findIndex(q=>q.id===id), j=i+(+d); if(j<0||j>=arr.length)return;
    [arr[i],arr[j]]=[arr[j],arr[i]]; arr.forEach((q,k)=>q.order=k+1);
    markDirty(); renderAdminMbci();
  });
  const addBtn=$('mqAdd');
  if(addBtn)addBtn.onclick=()=>{
    if(MBCI.questions.length>=20){alert('문항은 최대 20개까지 만들 수 있어요.');return;}
    if(mqDraft&&mqDirty()&&!confirm('적용하지 않은 편집이 있습니다. 버리고 새 문항을 만들까요?'))return;
    const nums=MBCI.questions.map(q=>+((/^q(\d+)$/.exec(q.id)||[])[1])||0);
    const nextNum=Math.max(0,...nums)+1, nid='q'+String(nextNum).padStart(2,'0');
    const ax=mbciAxes()[0];
    const nq={id:nid, axisId:ax.id, order:MBCI.questions.length+1, active:false, text:'', memo:'', type:'text', image:{src:'',alt:'',sourceNote:''},
      answers:[{id:'A',pole:ax.left.code,weight:1,text:''},
               {id:'B',pole:ax.right.code,weight:1,text:''}]};
    MBCI.questions.push(nq);
    mqSel=nid; mqDraft=JSON.parse(JSON.stringify(nq));
    markDirty(); renderAdminMbci();
    toast('새 문항 '+nid+' — 축과 문구를 채운 뒤 「이 문항 적용」을 눌러 주세요');
  };
  $('panelMbci').querySelectorAll('[data-vw]').forEach(b=>b.onclick=()=>{mqVw=b.dataset.vw;
    $('panelMbci').querySelectorAll('[data-vw]').forEach(x=>x.classList.toggle('on',x===b));renderMqPreview();});
  if(!mqDraft){const q=MBCI.questions.find(x=>x.id===mqSel); mqDraft=q?JSON.parse(JSON.stringify(q)):null;}
  renderMqForm(); renderMqPreview(); renderMqSim(); renderMbciCheck();
}
function mqDirty(){const q=MBCI.questions.find(x=>x.id===mqSel);return q&&JSON.stringify(q)!==JSON.stringify(mqDraft);}
function mqSetting(){
  MBCI.settings=MBCI.settings||{};
  MBCI.settings.neutralEnabled=$('mqNeutral').checked;
  MBCI.settings.neutralLabel=$('mqNeutralLabel').value.trim()||'둘 다 애매해요';
  markDirty(); renderMqPreview();
}
function renderMqForm(){
  const q=mqDraft, box=$('mqForm'); if(!q){box.innerHTML='';return;}
  const ax=mbciAxis(q.axisId)||MBCI.axes[0];
  const poleOpts=an=>[ax.left,ax.right].map(p=>`<option value="${p.code}" ${an.pole===p.code?'selected':''}>${p.code} · ${esc(p.label)}</option>`).join('');
  const ansForm=an=>`<div class="mq-ans">
      <div class="mq-ans-h">답변 ${an.id}</div>
      <label class="af-l">답변 문구</label><textarea class="af-in" rows="2" data-f="text" data-a="${an.id}">${esc(an.text)}</textarea>
      <div class="mq-grid2">
        <div><label class="af-l">점수 극 <em>문항당 1점</em></label><select class="af-in" data-f="pole" data-a="${an.id}">${poleOpts(an)}</select></div>
      </div></div>`;
  const qim=q.image||(q.image={src:'',alt:'',sourceNote:''});
  const qImgForm=q.type==='image'?`<div class="mq-imgbox mq-qimgbox">
      <div class="mq-qthumb">${qim.src?`<img src="${esc(qim.src)}" alt="">`:'<span>이미지 없음</span>'}</div>
      <div class="mq-imgctl">
        <div class="af-l" style="margin-top:0">질문 이미지 <em>질문 문구와 A/B 선택지 사이에 한 장 · 필수</em></div>
        <div class="mq-btnrow"><button type="button" class="chip-btn" data-qup="1">파일 업로드</button>
          <button type="button" class="chip-btn" data-qurl="1">URL</button>
          ${qim.src?`<button type="button" class="chip-btn" data-qrm="1">이미지 제거</button>`:''}</div>
        <label class="af-l">대체 텍스트(alt)</label><input class="af-in" data-f="image.alt" value="${esc(qim.alt||'')}" placeholder="이미지가 보여주는 내용을 짧게">
        <label class="af-l">출처·라이선스 메모</label><input class="af-in" data-f="image.sourceNote" value="${esc(qim.sourceNote||'')}" placeholder="예: 자체 제작 예시">
      </div></div>`:'';
  box.innerHTML=`<div class="mq-form-h"><b>${esc(q.id)}</b><span>문항 ID는 내부 식별자라 변경하지 않습니다</span>
    <button type="button" class="chip-btn" id="mqDel" style="margin-left:auto;color:#B3452F;border-color:#E8B7A8">문항 삭제</button></div>
    <label class="af-l">질문 문구</label><textarea class="af-in" rows="2" data-f="text">${esc(q.text)}</textarea>
    <div class="mq-grid2">
      <div><label class="af-l">유형</label><select class="af-in" data-f="type"><option value="text" ${q.type!=='image'?'selected':''}>지문형</option><option value="image" ${q.type==='image'?'selected':''}>이미지형 · 질문 이미지 필수</option></select></div>
      <div><label class="af-l">활성</label><label class="mq-chk" style="display:flex;gap:6px;align-items:center;padding:9px 0"><input type="checkbox" id="mqActive" ${q.active!==false?'checked':''}> 이 문항 사용</label></div>
    </div>
    <div class="mq-grid2">
      <div><label class="af-l">축</label><select class="af-in" data-f="axisId">${mbciAxes().map(a=>`<option value="${a.id}" ${q.axisId===a.id?'selected':''}>${a.left.code}${a.right.code} · ${esc(a.name)}</option>`).join('')}</select></div>
      <div><label class="af-l">내부 운영 메모</label><input class="af-in" data-f="memo" value="${esc(q.memo||'')}"></div>
    </div>
    ${qImgForm}
    <div class="mq-anss">${q.answers.map(ansForm).join('')}</div>
    <div class="mq-form-acts"><span id="mqFormMsg"></span>
      <button type="button" class="chip-btn" id="mqRevert">되돌리기</button>
      <button type="button" class="chip-btn solid" id="mqApply">이 문항 적용</button></div>
    <input type="file" id="mqFile" accept="image/webp,image/png,image/jpeg" hidden>`;
  box.querySelectorAll('[data-f]').forEach(el=>el[el.tagName==='SELECT'?'onchange':'oninput']=()=>{
    const tgt=el.dataset.a?q.answers.find(x=>x.id===el.dataset.a):q;
    const path=el.dataset.f.split('.');
    let o=tgt; while(path.length>1)o=o[path.shift()];
    o[path[0]]=el.value;
    if(el.dataset.f==='axisId'){ // 축을 바꾸면 극을 새 축의 좌/우로 다시 맞춘다
      const na=mbciAxis(q.axisId); q.answers[0].pole=na.left.code; q.answers[1].pole=na.right.code; renderMqForm();
    }
    if(el.dataset.f==='type'){q.image=q.image||{src:'',alt:'',sourceNote:''}; renderMqForm();}
    renderMqPreview(); mqFormMsg();
  });
  const act=$('mqActive'); if(act)act.onchange=()=>{q.active=act.checked;renderMqPreview();mqFormMsg();};
  let upFor=null;
  box.querySelectorAll('[data-qup]').forEach(b=>b.onclick=()=>{upFor=1;$('mqFile').click();});
  $('mqFile').onchange=e=>{
    const f=e.target.files[0]; e.target.value=''; if(!f||!upFor)return;
    if(!MQ_TYPES.includes(f.type)){alert('WebP · PNG · JPEG 이미지만 올릴 수 있습니다.');return;}
    if(f.size>MQ_MAX_BYTES){alert(`파일이 너무 큽니다 (${(f.size/1048576).toFixed(1)}MB). 5MB 이하로 올려 주세요.`);return;}
    if(f.size>MQ_WARN_BYTES)toast(`권장 용량(500KB)보다 커요 — ${Math.round(f.size/1024)}KB`);
    const r=new FileReader(); r.onload=()=>{q.image=q.image||{}; q.image.src=r.result;
      if(!q.image.sourceNote)q.image.sourceNote=f.name; renderMqForm(); renderMqPreview(); mqFormMsg();}; r.readAsDataURL(f);
  };
  box.querySelectorAll('[data-qurl]').forEach(b=>b.onclick=()=>{
    const u=prompt('이미지 주소를 입력하세요\n(외부 주소는 내보내기·캔버스에서 문제가 생길 수 있어 로컬 파일을 권장합니다)','assets/img/questions/'+q.id+'.webp');
    if(u===null)return; q.image=q.image||{}; q.image.src=u.trim(); renderMqForm(); renderMqPreview(); mqFormMsg();
  });
  box.querySelectorAll('[data-qrm]').forEach(b=>b.onclick=()=>{q.image.src='';renderMqForm();renderMqPreview();mqFormMsg();});
  $('mqRevert').onclick=()=>{mqDraft=null;renderAdminMbci();};
  $('mqApply').onclick=mqApply;
  const delBtn=$('mqDel');
  if(delBtn)delBtn.onclick=()=>{
    const q=MBCI.questions.find(x=>x.id===mqDraft.id); if(!q)return;
    const sameAxis=MBCI.questions.filter(x=>x.axisId===q.axisId);
    if(sameAxis.length<=1){alert('이 축(축: '+q.axisId+')에 남은 문항이 이것 하나뿐이라 삭제할 수 없습니다.');return;}
    if(MBCI.questions.length<=8){alert('문항은 최소 8개(축당 2개) 이상이어야 합니다.');return;}
    if(!confirm(q.id+' 문항을 삭제할까요? 되돌릴 수 없습니다.'))return;
    const idx=MBCI.questions.findIndex(x=>x.id===q.id);
    MBCI.questions.splice(idx,1);
    MBCI.questions.slice().sort((a,b)=>a.order-b.order).forEach((x,k)=>x.order=k+1);
    mqSel=null; mqDraft=null;
    markDirty(); renderAdminMbci();
    toast(q.id+' 삭제했어요 — 「데이터 파일 내보내기」로 영구 반영하세요');
  };
  mqFormMsg();
}
function mqFormMsg(){const m=$('mqFormMsg'); if(m)m.textContent=mqDirty()?'● 적용하지 않은 편집이 있어요':'';}
function mqApply(){
  // 이 문항을 반영한 상태로 전체 검증 — 오류가 있으면 적용하지 않는다
  const trial=JSON.parse(JSON.stringify(MBCI));
  const i=trial.questions.findIndex(x=>x.id===mqDraft.id); trial.questions[i]=JSON.parse(JSON.stringify(mqDraft));
  const v=validateMbci(trial), mine=v.errors.filter(x=>x.startsWith(mqDraft.id)&&!x.includes('질문 이미지가 없음'));   // 이미지 누락은 전체 검증(배포 차단)에서 따로 표시
  if(mine.length){alert('적용할 수 없습니다:\n\n'+mine.join('\n'));return;}
  const alt=v.warnings.filter(x=>x.startsWith(mqDraft.id)&&x.includes('alt'));
  if(alt.length&&!confirm('대체 텍스트(alt)가 비어 있습니다. 그대로 적용할까요?\n\n'+alt.join('\n')))return;
  const idx=MBCI.questions.findIndex(x=>x.id===mqDraft.id);
  MBCI.questions[idx]=JSON.parse(JSON.stringify(mqDraft));
  markDirty(); mqDraft=null; renderAdminMbci(); toast(`${MBCI.questions[idx].id} 적용 — 「데이터 파일 내보내기」로 영구 반영하세요`);
}
function renderMqPreview(){
  const box=$('mqPreview'); if(!box||!mqDraft)return;
  const qs=mbciQs(), idx=Math.max(0,qs.findIndex(x=>x.id===mqDraft.id));
  const st=MBCI.settings||{};
  box.className='mq-preview'+(mqVw==='m'?' mobile':'');
  box.innerHTML=`<div class="mq-pv-frame"><div id="qWrapPv">${mbciQuestionHTML(mqDraft,idx,qs.length||1,null,true)}
    ${st.neutralEnabled!==false?`<button type="button" class="opt opt-skip mb-neutral">${esc(st.neutralLabel||'둘 다 애매해요')}</button>`:''}</div></div>`;
  box.querySelectorAll('.mb-opt').forEach(b=>b.onclick=()=>{box.querySelectorAll('.mb-opt').forEach(x=>x.classList.toggle('on',x===b));});
}
function renderMqSim(){
  const box=$('mqSim'); if(!box)return;
  const qs=mbciQs();
  const r=scoreMbci(mqSimAns,qs);
  const line=mbciAxes().map(a=>`${a.left.code} ${r.scores[a.left.code]||0} / ${a.right.code} ${r.scores[a.right.code]||0}`).join(' · ');
  const code=r.resultCode||mbciAxes().map(a=>r.axisResult[a.id]||'?').join('');
  box.innerHTML=`<div class="mq-sim-bar"><button type="button" class="chip-btn" data-all="A">모두 A</button><button type="button" class="chip-btn" data-all="B">모두 B</button><button type="button" class="chip-btn" data-all="">초기화</button>
      <span class="mq-sim-res">${line} → <b>${esc(code)}</b>${r.ties.length?` <em>(미정: ${r.ties.join(', ')})</em>`:''}</span></div>
    <div class="mq-sim-rows">${qs.map((q,i)=>`<div class="mq-sim-row"><span>${i+1}. ${esc(q.axisId)}</span><span class="mq-sim-q">${esc(q.text)}</span>
      <span class="mq-seg">${['A','B','N'].map(k=>`<button type="button" data-sq="${q.id}:${k}" class="${mqSimAns[q.id]===k?'on':''}">${k==='N'?'중립':k}</button>`).join('')}</span></div>`).join('')}</div>`;
  box.querySelectorAll('[data-sq]').forEach(b=>b.onclick=()=>{const [id,k]=b.dataset.sq.split(':');mqSimAns[id]=mqSimAns[id]===k?undefined:k;renderMqSim();});
  box.querySelectorAll('[data-all]').forEach(b=>b.onclick=()=>{const k=b.dataset.all;mqSimAns={};if(k)qs.forEach(q=>mqSimAns[q.id]=k);renderMqSim();});
}

/* ================= RESULT RENDER ================= */
function render(){
  syncAxisUI();
  const code=currentCode();
  if(!code){renderPlaceholder();curCode=null;markMap();return;}
  if(code!==curCode){curCode=code;curScheme=STYLES[code].scheme;curAnchor={h:null,s:null,b:null};curLocks=[false,false,false,false,false];curFontIdx=0;fontTypeFilter='전체';curPal=genPalette(STYLES[code],curScheme);}
  renderStyle();
  markMap();
}
function renderPlaceholder(){
  const decided=AXES.map((ax,i)=>({ax,st:axisState(i)}));
  const n=decided.filter(d=>d.st.side).length;
  const chips=decided.map(d=>`<span class="achip ${d.st.side?'done':''}">${d.ax.name} · ${d.st.side?d.ax[d.st.side].t:'미정'}</span>`).join('');
  $('result').innerHTML=`
    <div class="placeholder">
      <div class="big">${n===0?'슬라이더를 움직여 스타일을 찾아보세요':`좋아요, ${n}개 기준이 정해졌어요`}</div>
      <p>${n===0?'네 개의 기준이 모두 한쪽으로 기울면 어울리는 스타일이 나타납니다.':`나머지 ${4-n}개 기준도 마음 가는 쪽으로 움직여 보세요.`}</p>
      <div class="axis-chips">${chips}</div>
    </div>`;
}

/* ---------- exports ---------- */
function strengthLine(){
  return AXES.map((ax,i)=>{const st=axisState(i);return `${ax.name}: ${ax[st.side].t}(${st.strength})`;}).join(' / ');
}
function copyPreset(){
  const st=STYLES[curCode], fm=FONTMAP[curCode];
  const preset={v:1,source:"brand-style-matrix-16",code:curCode,
    style:{adj:st.adj,sub:st.sub},
    fontFilter:fm.filter,           // 폰트 분류 스키마 (type/mood/weight)
    fonts:fm.fonts.map(f=>f.name),
    palette:curPal.map(c=>({role:c.role,hex:c.hex}))};
  navigator.clipboard?.writeText(JSON.stringify(preset,null,2)).then(()=>toast('스튜디오 프리셋(JSON)이 복사됐어요'));
}

/* ================= 16 MAP ================= */
function buildMap(){
  const g=$('grid16'); if(!g)return;   // v2.1.0: 16유형 지도(mapSec)가 삭제되어 더 이상 없다
  g.innerHTML='';
  Object.entries(STYLES).forEach(([code,st])=>{
    const pal=previewPalette(st,st.scheme); // 고정 미리보기 — 새로고침해도 항상 같은 인상
    const cell=document.createElement('button');
    cell.className='cell';cell.dataset.code=code;
    cell.title=st.sub;
    cell.innerHTML=`<span class="c-top"><span class="c-code">${code.split('').join('·')}</span></span>
      <span class="c-adj">${st.adj}</span><span class="c-meta">${st.sub}</span>
      <span class="dots">${pal.slice(0,4).map(c=>`<span class="dot16" style="background:${c.hex}"></span>`).join('')}</span>`;
    cell.onclick=()=>{
      [...code].forEach((ch,i)=>{sliders[i].value=AXES[i].L.c===ch?1:5;});
      showApp();render();
      $('result').scrollIntoView({behavior:'smooth',block:'start'});
    };
    g.appendChild(cell);
  });
}
function markMap(){document.querySelectorAll('.cell').forEach(c=>c.classList.toggle('active',c.dataset.code===curCode));}

/* ================= HOME ================= */
function exitAdminMode(){
  document.body.classList.remove('admin-mode');
  const s=$('adminSec'); if(s)s.classList.add('hidden');
  ['brOv','afOv','ivOv'].forEach(id=>{const o=$(id);if(o)o.style.display='none';});
  document.body.style.overflow='';
  document.title='MBCI — Markinfo Brand Core Indicator';
  if(location.hash==='#admin')history.replaceState(null,'',location.pathname+location.search);
  window.scrollTo(0,0);
}
/* ================= 관리자 (스튜디오 통합 · 4탭) ================= */
let adminTab='fonts', flShown=60, clsIdx=0, adminDirty=false;
/* v2.16.0: 날짜는 사용자 컴퓨터의 현지 날짜 기준(UTC로 계산하면 한국 오전 9시 이전엔 전날로 찍힌다) */
function localDateStr(d){d=d||new Date();const p=n=>String(n).padStart(2,'0');return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate());}
function bumpVersion(){
  const p=APP_VERSION.split('.').map(Number);
  while(p.length<3)p.push(0);
  p[2]=p[2]+1;                          // 웹 배포판은 패치 단위로 올린다
  APP_VERSION=p.join('.');
  const el=document.getElementById('verLabel');
  if(el)el.textContent='v'+APP_VERSION;
  paintVersion();
  return APP_VERSION;
}
function versionFileName(){return 'bsm-data.js';}
function moodBlockedBy(m,list){
  // m을 추가하면 상충이 생기는지 → 상대 무드 반환
  for(const [a,b] of MOOD_CONFLICT){
    if(m===a&&list.includes(b))return b;
    if(m===b&&list.includes(a))return a;
  }
  return null;
}
/* v0.19.0: 대표체로 고정한 유형의 FONTMAP을 즉시 맨 앞으로 옮긴다 — 다음 전체 재계산까지
   기다리지 않고 저장 즉시 결과 화면에 반영되게 한다. */
function pinRepFont(f){
  (f.repStyles||[]).forEach(code=>{
    const fm=FONTMAP[code]; if(!fm)return;
    fm.fonts=fm.fonts.filter(x=>x.family!==f.family);
    fm.fonts.unshift({name:f.name,family:f.family,type:f.cls.type,weight:f.cls.weight,mood:(f.cls.mood||[]).slice()});
  });
}
const CLS_SAMPLE_DEFAULT={big:'다람쥐 헌 쳇바퀴에 타고파',lines:'브랜드의 첫인상은 글자에서 시작됩니다\nABCDEFG abcdefg 0123456789'};
let CLS_SAMPLE=BSM_DATA.CLS_SAMPLE;
function markDirty(){adminDirty=true;const b=$('adSaveBtn');if(b)b.classList.add('dirty');scheduleDraftSave();}
function clearDirty(){adminDirty=false;const b=$('adSaveBtn');if(b)b.classList.remove('dirty');clearDraft();}

/* ================= v2.1.0 관리자 임시저장 =================
   수정 중 실수로 새로고침해도 잃지 않도록, 편집할 때마다(디바운스) 세션에 임시 저장한다.
   내보내기(파일·zip)를 하면 임시본은 지운다 — 내보낸 파일이 곧 "확정본"이라는 뜻이다.
   브라우저를 완전히 닫으면(세션 종료) 임시본도 함께 사라진다 — 내보내기만이 영구 저장이다. */
const DRAFT_KEY='mbciAdminDraft.v1';
let draftSaveTimer=null;
function scheduleDraftSave(){
  clearTimeout(draftSaveTimer);
  draftSaveTimer=setTimeout(saveDraftNow,700);
}
function saveDraftNow(){
  try{
    const obj=currentDataObject();
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify({savedAt:new Date().toISOString(), data:obj}));
    const txt='임시 저장됨 · '+new Date().toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'});
    ['draftStatus','draftStatusExp'].forEach(id=>{const el=$(id); if(el)el.textContent=txt;});
  }catch(e){ console.warn('[임시저장 실패]',e); }
}
function clearDraft(){ try{sessionStorage.removeItem(DRAFT_KEY);}catch(e){} ['draftStatus','draftStatusExp'].forEach(id=>{const el=$(id); if(el)el.textContent='';}); }
function checkDraftOnLoad(){
  let raw=null; try{raw=sessionStorage.getItem(DRAFT_KEY);}catch(e){return;}
  if(!raw)return;
  let parsed; try{parsed=JSON.parse(raw);}catch(e){return;}
  if(!parsed||!parsed.data)return;
  const when=parsed.savedAt?new Date(parsed.savedAt).toLocaleString('ko-KR'):'알 수 없음';
  if(!confirm(`내보내지 않은 임시 저장본이 있습니다 (${when} 저장).\n\n이어서 편집할까요?\n\n취소하면 임시 저장본을 지우고 서버의 원본으로 시작합니다.`)){
    clearDraft(); return;
  }
  const obj=parsed.data;
  Object.keys(BSM_DATA).forEach(k=>{ if(obj[k]!==undefined)replaceData(k,obj[k]); });
  markDirty();
  toast('임시 저장본을 불러왔어요');
}
function guardLeave(){
  if(!adminDirty)return true;
  return confirm('저장하지 않은 변경사항이 있습니다.\n\n먼저 「데이터 파일 내보내기」를 눌러 bsm-data.js를 내려받으세요.\n\n그래도 나가시겠습니까? (변경 내용이 사라집니다)');
}
const CODES=Object.keys(STY16);
const codeName=c=>{
  const nm=STY16[c]?STY16[c].name:c, mb=LEGACY_TO_MBCI[c];
  return mb?`${nm} (${mb})`:nm;
};

/* v0.17.0: 스타일 이름이 바뀔 수 있으므로 코드 매핑 select는 매번 새로 채운다.
   정적 HTML에 예전 이름이 남아 있으면 길이 가드(!options.length) 때문에
   영원히 갱신되지 않는 문제가 있었다 — 항상 초기화하고 선택값만 보존한다. */
function initAdminSelects(){
  const sel=$('adminStyleSel');
  { const keep=sel.value;
    sel.innerHTML=Object.entries(STYLES).map(([c,st])=>`<option value="${c}">${st.adj} (${mbciCodeFor(c)})</option>`).join('');
    sel.value=curCode||keep||Object.keys(STYLES)[0]; }
  const fs=$('fFilterStyle');
  { const keep=fs.value;
    fs.innerHTML='<option value="">전체 16유형</option>'+CODES.map(c=>`<option value="${c}">${codeName(c)}</option>`).join('');
    fs.value=keep||''; }
  // v2.9.0: 정적 HTML에 남아있을 수 있는 옛 옵션이 CLS_AXES와 어긋나지 않도록, 값이 있어도 항상 다시 채운다
  const ft=$('fFilterType');
  {
    const keep=ft.value;
    ft.innerHTML='<option value="">전체 형태</option>'+CLS_AXES.type.opts.map(t=>`<option>${t}</option>`).join('');
    ft.value=CLS_AXES.type.opts.includes(keep)?keep:'';
  }
  const fm=$('fFilterMood');
  if(fm){
    const keep=fm.value;
    fm.innerHTML='<option value="">전체 인상</option>'+CLS_AXES.mood.opts.map(t=>`<option>${t}</option>`).join('');
    fm.value=CLS_AXES.mood.opts.includes(keep)?keep:'';
  }
  const fw=$('fFilterWeight');
  if(fw){
    const keep=fw.value;
    fw.innerHTML='<option value="">전체 웨이트</option>'+CLS_AXES.weight.opts.map(t=>`<option>${t}</option>`).join('');
    fw.value=CLS_AXES.weight.opts.includes(keep)?keep:'';
  }
  const at=$('algoType');
  {
    const keep=at.value;
    at.innerHTML=CLS_AXES.type.opts.map(t=>`<option>${t}</option>`).join('');
  }
  const isel=$('imgStyleSel');
  if(isel){
    const keep=isel.value;
    isel.innerHTML=Object.entries(STYLES).map(([c,st])=>`<option value="${c}">${st.adj} (${mbciCodeFor(c)})</option>`).join('');
    isel.value=curCode||keep||Object.keys(STYLES)[0];
  }
}
/* v2.0.0: 관리자 접근 비밀번호 — 이 사이트는 서버가 없는 정적 배포이므로
   진짜 보안이 아니라 우연한 진입을 막는 1차 방어선이다(코드를 보면 누구나 알 수 있다).
   같은 탭에서는 한 번 확인하면 다시 묻지 않는다(sessionStorage). */
const ADMIN_PW='prism2026';
function tryEnterAdmin(){
  const clearHash=()=>{if(location.hash==='#admin')history.replaceState(null,'',location.pathname+location.search);};
  let authed=false;
  try{authed=sessionStorage.getItem('mbciAdminAuth')==='1';}catch(e){}
  if(authed){enterAdminMode();return;}
  openPwModal(clearHash);
}
/* v2.1.0: 브라우저 기본 prompt() 대신 화면 중앙에 뜨는 모달로 비밀번호를 받는다 */
function openPwModal(onCancel,onSuccess,title,sub){
  let m=$('pwModal');
  if(!m){
    m=document.createElement('div'); m.id='pwModal'; m.className='pw-modal';
    m.innerHTML=`<div class="pw-bg"></div>
      <form class="pw-card" id="pwForm" role="dialog" aria-modal="true" aria-label="비밀번호">
        <div class="pw-title" id="pwTitle">관리자 비밀번호</div>
        <p class="pw-sub" id="pwSub">이 영역은 마크인포 관리자만 접근할 수 있어요.</p>
        <input type="password" id="pwInput" class="pw-input" placeholder="비밀번호" autocomplete="off">
        <div class="pw-err hidden" id="pwErr">비밀번호가 올바르지 않습니다.</div>
        <div class="pw-acts">
          <button type="button" class="chip-btn" id="pwCancel">취소</button>
          <button type="submit" class="chip-btn solid" id="pwOk">확인</button>
        </div>
      </form>`;
    document.body.appendChild(m);
  }
  m.classList.add('on');
  $('pwTitle').textContent=title||'관리자 비밀번호';
  $('pwSub').textContent=sub||'이 영역은 마크인포 관리자만 접근할 수 있어요.';
  const inp=$('pwInput'), err=$('pwErr');
  inp.value=''; err.classList.add('hidden');
  setTimeout(()=>inp.focus(),30);
  const close=(cancelled)=>{ m.classList.remove('on'); if(cancelled&&onCancel)onCancel(); };
  $('pwCancel').onclick=()=>close(true);
  m.querySelector('.pw-bg').onclick=()=>close(true);
  const esc=e=>{if(e.key==='Escape'){close(true);document.removeEventListener('keydown',esc);}};
  document.addEventListener('keydown',esc);
  $('pwForm').onsubmit=e=>{
    e.preventDefault();
    if(inp.value===ADMIN_PW){
      try{sessionStorage.setItem('mbciAdminAuth','1');}catch(ex){}
      document.removeEventListener('keydown',esc);
      m.classList.remove('on');
      (onSuccess||enterAdminMode)();
    }else{
      err.classList.remove('hidden');
      inp.value=''; inp.focus();
      inp.classList.add('shake'); setTimeout(()=>inp.classList.remove('shake'),300);
    }
  };
}
/* v2.15.0: 상담용 페이지(#consult)도 주소로 바로 열었을 때 같은 비밀번호를 먼저 확인한다.
   인증 전에는 홈·테스트 화면까지 포함해 아무것도 보이지 않는다(html.consult-locked). */
function gateConsult(){
  let authed=false;
  try{authed=sessionStorage.getItem('mbciAdminAuth')==='1';}catch(e){}
  const unlock=()=>document.documentElement.classList.remove('consult-locked');
  if(authed){unlock();enterConsultMode();return;}
  document.documentElement.classList.add('consult-locked');
  openPwModal(
    ()=>{ unlock(); history.replaceState(null,'',location.pathname+location.search); },   // 취소하면 일반 홈으로
    ()=>{ unlock(); enterConsultMode(); },
    '상담용 페이지 비밀번호','상담용 페이지는 마크인포 관리자만 열 수 있어요.');
}
let draftCheckedThisSession=false;
function enterAdminMode(){
  document.body.classList.add('admin-mode'); try{fontmapRestore();}catch(e){}
  $('intro').classList.add('hidden');
  $('app').classList.remove('on');
  const veil=$('dimVeil'); if(veil)veil.remove();
  $('adminSec').classList.remove('hidden');
  document.title='관리자 — MBCI';
  initAdminSelects(); setAdminTab('home');
  if(!draftCheckedThisSession){ draftCheckedThisSession=true; checkDraftOnLoad(); }
  window.scrollTo(0,0);
}
function toggleAdmin(){const s=$('adminSec');s.classList.toggle('hidden');if(!s.classList.contains('hidden')){initAdminSelects();setAdminTab(adminTab);s.scrollIntoView({behavior:'smooth',block:'start'});}}
function setAdminTab(t){
  adminTab=t;
  const topTab=(t==='classify'||t==='algorithm')?'fonts':t;   // v2.16.0: 분류·알고리즘은 「폰트」 탭 안의 서브 탭
  document.querySelectorAll('.ad-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===topTab));
  [['home','panelHome'],['fonts','panelFonts'],['classify','panelClassify'],['algorithm','panelAlgorithm'],['industry','panelIndustry'],['color','panelColor'],['image','panelImage'],['mockup','panelMockup'],['mbci','panelMbci'],['results','panelResults'],['export','panelExport']]
    .forEach(([k,id])=>{const p=$(id);if(p)p.classList.toggle('hidden',k!==t);});
  if(t==='home')renderAdminHome();
  if(t==='industry')renderAdminIndustry();
  if(t==='fonts')renderFontList();
  if(t==='classify')renderClassify();
  if(t==='algorithm')renderAlgo();
  if(t==='color')renderAdminColor();
  if(t==='image')renderAdminImage();
  if(t==='mockup')renderAdminMockup();
  if(t==='mbci')renderAdminMbci();
  if(t==='results')renderAdminResults();
  if(t==='export')renderAdminExport();
  updateTabCounts();
}
function fontErrExclude(){
  // 오류/숨김 플래그가 켜진 폰트를 결과 추천 목록에서 자동 제거
  let removed=0;
  Object.keys(FONTMAP).forEach(code=>{
    const before=FONTMAP[code].fonts.length;
    FONTMAP[code].fonts=FONTMAP[code].fonts.filter(x=>{
      const src=fontDbOf(x);
      return !src||(!src.wfError&&!src.hideFromSearch);
    });
    removed+=before-FONTMAP[code].fonts.length;
  });
  if(removed&&curCode){curFontIdx=0;renderStyle();}
  return removed;
}
function fontStatus(f){
  if(f.wfError)return{k:'err',t:'웹폰트 오류'};
  const noMood=!(f.cls.mood||[]).length, noTag=!(f.style16||[]).length;
  if(noMood||noTag||f.clsHold)return{k:'warn',t:f.clsHold?'분류 보류':(noTag?'유형 미지정':'인상 미지정')};
  return{k:'ok',t:'정상'};
}
function updateTabCounts(){
  const err=FONT_DB.filter(f=>f.wfError).length;
  const todo=FONT_DB.filter(f=>fontStatus(f).k!=='ok').length;
  const emptyAlgo=Object.values(ALGO16).filter(v=>!v.length).length;
  const setCnt=(k,t)=>document.querySelectorAll(`[data-cnt="${k}"]`).forEach(e=>e.textContent=t);
  setCnt('fonts',`${FONT_DB.length}`+(err?` · 오류 ${err}`:''));
  setCnt('cls',todo?`미완 ${todo}`:'완료');
  setCnt('algo',emptyAlgo?`빈칸 ${emptyAlgo}`:'135');
  const ft=$('tabCntFontsTop'); if(ft)ft.textContent=err?`오류 ${err}`:'';
  const rs=MBCI.results||{}, filled=allCoreCodes().filter(c=>rs[c]&&rs[c].name&&rs[c].desc).length;
  const rc=$('tabCntResults'); if(rc)rc.textContent=`${filled}/16`;
}
/* ---------- 탭1: 폰트 리스트 ---------- */
function flFiltered(){
  const q=($('fSearch').value||'').trim().toLowerCase();
  const st=$('fFilterStyle').value, ty=$('fFilterType').value, stt=$('fFilterState').value;
  const mo=$('fFilterMood')?$('fFilterMood').value:'', we=$('fFilterWeight')?$('fFilterWeight').value:'';
  return FONT_DB.filter(f=>{
    if(q&&!f.name.toLowerCase().includes(q))return false;
    if(st&&!(f.style16||[]).includes(st))return false;
    if(ty&&f.cls.type!==ty)return false;
    if(mo&&!(f.cls.mood||[]).includes(mo))return false;   // v0.17.0: 인상 필터
    if(we&&f.cls.weight!==we)return false;                 // v0.17.0: 웨이트 필터
    if(stt==='err'&&!f.wfError)return false;
    if(stt==='notag'&&(f.style16||[]).length)return false;
    if(stt==='nomood'&&(f.cls.mood||[]).length)return false;
    if(stt==='hold'&&!f.clsHold)return false;
    if(stt==='hide'&&!f.hideFromSearch)return false;
    return true;
  }).sort((a,b)=>(a.wfError?1:0)-(b.wfError?1:0));   // v12.2: 웹폰트 오류는 항상 리스트 맨 아래
}
function fontListMore(){flShown+=60;renderFontList(true);}
let flIO=null;
function setupInfiniteScroll(){
  const sent=$('flSentinel'); if(!sent)return;
  if(flIO)flIO.disconnect();
  flIO=new IntersectionObserver(es=>{
    if(es[0].isIntersecting && flFiltered().length>flShown) fontListMore();
  },{rootMargin:'240px'});
  flIO.observe(sent);
}
/* v0.17.0: 폰트 로드 현황 리포트 — 전체·표시(고객이 실제로 만날 수 있는 폰트)·검색 제외·오류를 한눈에 */
function renderFontReport(){
  const box=$('flReport'); if(!box)return;
  const total=FONT_DB.length;
  const err=FONT_DB.filter(f=>f.wfError).length;
  const hidden=FONT_DB.filter(f=>f.hideFromSearch&&!f.wfError).length;   // 오류이면서 검색제외인 경우는 오류로 집계
  const visible=customerFontCount();
  const pct=n=>total?Math.round(n/total*100):0;
  box.innerHTML=`
    <div class="fr-card"><b>${total}</b><span>전체 폰트</span></div>
    <div class="fr-card ok"><b>${visible}</b><span>고객에게 표시됨 <i>${pct(visible)}%</i></span></div>
    <div class="fr-card warn"><b>${hidden}</b><span>검색 제외 <i>${pct(hidden)}%</i></span></div>
    <div class="fr-card err"><b>${err}</b><span>웹폰트 오류 <i>${pct(err)}%</i></span></div>`;
}
/* v0.17.0: 현재 필터·검색이 적용된 목록을 CSV로 내보낸다 — 사내 여러 사람이 스프레드시트로 다룰 수 있게 */
function csvCell(v){
  const s=String(v==null?'':v);
  return /[",\n]/.test(s) ? '"'+s.replace(/"/g,'""')+'"' : s;
}
function exportFontListCsv(){
  const list=flFiltered();
  const head=['이름','글꼴군(family)','형태','인상','웨이트','16유형 매칭','상태','웹폰트오류','분류보류','검색제외'];
  const rows=list.map(f=>{
    const s=fontStatus(f);
    return [f.name, f.family, f.cls.type||'', (f.cls.mood||[]).join('/'), f.cls.weight||'',
            (f.style16||[]).join('/'), s.t, f.wfError?'Y':'N', f.clsHold?'Y':'N', f.hideFromSearch?'Y':'N'];
  });
  const csv='\uFEFF'+[head,...rows].map(r=>r.map(csvCell).join(',')).join('\r\n');
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});
  const a=document.createElement('a');
  const ts=new Date().toISOString().slice(0,10);
  a.download=`폰트리스트_${ts}_${list.length}종.csv`;
  a.href=URL.createObjectURL(blob); a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),4000);
  toast(`${list.length}종을 CSV로 내려받았어요`);
}
function renderFontList(keep){
  if(!keep)flShown=60;
  renderFontReport();
  const list=flFiltered(), show=list.slice(0,flShown);
  show.forEach(f=>injectFontCss(f));
  const ld=$('flLoading'); if(ld)ld.style.display=list.length>show.length?'':'none';
  $('fontListRows').innerHTML=show.map((f,di)=>{
    const gi=FONT_DB.indexOf(f), s=fontStatus(f);
    return `<div class="fl-row${f.wfError?' is-err':''}" data-gi="${gi}">
      <div class="fl-idx">${di+1}</div>
      <div class="fl-main">
        <div class="fl-name">
          <button class="fl-nm" data-open-edit title="편집창 열기">${f.name}</button>
          <span class="fl-badge ${s.k}" data-badge>${s.t}</span>
          <span class="fl-row-acts">
            <button class="fl-act" data-open-edit>편집</button>
            <button class="fl-act" data-open-cls>분류</button>
          </span>
        </div>
        <div class="fl-sample" style="font-family:${f.family};font-weight:${fontFw(f)}">가나다라 한글로고 Aa 123</div>
        <div class="fl-tags">${(f.style16||[]).map(c=>`<span class="fl-t code${(f.style16p||[]).includes(c)?'':' sub'}">${codeName(c)}</span>`).join('')||'<span class="fl-t">유형 없음 — 인상을 지정해 주세요</span>'}</div>
      </div>
      <div class="fl-sel">
        <select data-k="type">${CLS_AXES.type.opts.map(t=>`<option ${t===f.cls.type?'selected':''}>${t}</option>`).join('')}</select>
        <select data-k="weight">${CLS_AXES.weight.opts.map(t=>`<option ${t===f.cls.weight?'selected':''}>${t}</option>`).join('')}</select>
      </div>
      <div class="fl-moods">${CLS_AXES.mood.opts.map(m=>{
        const on=(f.cls.mood||[]).includes(m), blk=!on&&moodBlockedBy(m,f.cls.mood||[]);
        return `<label class="fl-mood${on?' on':''}${blk?' blocked':''}" ${blk?`title="'${blk}'과 함께 고를 수 없어요"`:''}><input type="checkbox" data-mood="${m}" ${on?'checked':''} ${blk?'disabled':''}>${m}</label>`;}).join('')}</div>
      <div class="fl-flags">
        <button class="fl-flag${f.wfError?' on':''}" data-flag="wfError"><span class="sw"></span>웹폰트 오류</button>
        <button class="fl-flag neutral${f.clsHold?' on':''}" data-flag="clsHold"><span class="sw"></span>분류 보류</button>
        <button class="fl-flag neutral${f.hideFromSearch?' on':''}" data-flag="hideFromSearch"><span class="sw"></span>검색 제외</button>
      </div>
    </div>`;}).join('');
  bindFontRows();
  setupInfiniteScroll();
  updateTabCounts();
}
function bindFontRows(){
  document.querySelectorAll('#fontListRows .fl-row').forEach(row=>{
    const f=FONT_DB[+row.dataset.gi];
    const refresh=()=>{const s=fontStatus(f);const b=row.querySelector('[data-badge]');b.className='fl-badge '+s.k;b.textContent=s.t;row.classList.toggle('is-err',!!f.wfError);};
    row.querySelectorAll('[data-open-edit]').forEach(b=>b.onclick=()=>openAddFont(FONT_DB.indexOf(f)));
    row.querySelector('[data-open-cls]').onclick=()=>{clsIdx=FONT_DB.indexOf(f);setAdminTab('classify');};
    const reclass=()=>{const a=applyAutoStyles(f);refresh();syncFontmapFrom(f);markDirty();
      const tg=row.querySelector('.fl-tags');
      if(tg)tg.innerHTML=(f.style16||[]).map(c=>`<span class="fl-t code${(f.style16p||[]).includes(c)?'':' sub'}">${codeName(c)}</span>`).join('')||'<span class="fl-t">유형 없음</span>';
      return a;};
    row.querySelector('[data-k="type"]').onchange=e=>{f.cls.type=e.target.value;reclass();};
    row.querySelector('[data-k="weight"]').onchange=e=>{f.cls.weight=e.target.value;reclass();};
    row.querySelectorAll('[data-mood]').forEach(cb=>cb.onchange=()=>{
      const picked=[...row.querySelectorAll('[data-mood]')].filter(x=>x.checked).map(x=>x.dataset.mood);
      if(cb.checked){
        const conf=moodBlockedBy(cb.dataset.mood,picked.filter(m=>m!==cb.dataset.mood));
        if(conf){cb.checked=false;toast(`'${cb.dataset.mood}'과 '${conf}'은 함께 고를 수 없어요`);return;}
        if(picked.length>CLS_AXES.mood.max){cb.checked=false;toast(`인상은 최대 ${CLS_AXES.mood.max}개까지예요`);return;}
      }
      f.cls.mood=[...row.querySelectorAll('[data-mood]')].filter(x=>x.checked).map(x=>x.dataset.mood);
      row.querySelectorAll('.fl-mood').forEach(l=>{
        const inp=l.querySelector('input'), m=inp.dataset.mood;
        l.classList.toggle('on',inp.checked);
        const blk=!inp.checked&&moodBlockedBy(m,f.cls.mood);
        inp.disabled=!!blk; l.classList.toggle('blocked',!!blk);
        l.title=blk?`'${blk}'과 함께 고를 수 없어요`:'';
      });
      reclass();
    });
    row.querySelectorAll('[data-flag]').forEach(btn=>btn.onclick=()=>{
      const k=btn.dataset.flag; f[k]=!f[k];
      if(k==='wfError')f.wfManual=!!f[k];   // 사용자가 직접 켠 오류 플래그는 자동검사가 못 지움
      btn.classList.toggle('on',f[k]);
      refresh(); markDirty();
      if(k==='wfError'||k==='hideFromSearch'){
        const n=f[k]?fontErrExclude():0;
        if(f[k])toast(f.name+` — ${k==='wfError'?'웹폰트 오류':'검색 제외'}로 표시${n?`하고 추천 ${n}곳에서 제외했어요`:'했어요'}`);
        else{const add=rebuildQuiet();toast(f.name+' — 플래그를 해제했어요'+(add?` (추천 ${add}종 보충)`:''));}
      }
    });
    row.querySelector('[data-badge]').onclick=()=>{
      const s=fontStatus(f);
      if(s.k==='err'){f.wfError=false;f.wfManual=false;row.querySelector('[data-flag="wfError"]').classList.remove('on');refresh();markDirty();toast('오류 플래그를 해제했어요');}
      else{setAdminTab('classify');clsIdx=FONT_DB.indexOf(f);renderClassify();}
    };
  });
}
/* ---- 폰트 로드 유틸 (v12): 선언된 웨이트를 존중해 로드·검사한다 ---- */
function famKey(fam){return (fam||'').replace(/["']/g,'').split(',')[0].trim();}
async function loadFontFaces(fam,css,sample){
  // 선언 웨이트 전부 로드 시도 — 하나라도 실제 로드되면 정상
  if(!document.fonts)return true;
  const key=famKey(fam), text=sample||'가나다한글Aa123';
  let ok=false;
  for(const w of declaredWeights(css)){
    try{
      await document.fonts.load(`${w} 16px "${key}"`,text);
      if(document.fonts.check(`${w} 16px "${key}"`,'가'))ok=true;
    }catch(e){}
  }
  return ok;
}
/* v14.0 네트워크 상태 판정 — 폰트 CDN이 막힌 환경에서 자동검사가 멀쩡한 폰트를
   무더기로 오류 처리하고, 그 상태로 저장되면 폰트 자산이 통째로 망가진다.
   그래서 (1) 오프라인이면 검사 자체를 건너뛰고 (2) 실패율이 비정상으로 높으면
   결과를 되돌린 뒤 경고만 남긴다. */
const NET_FAIL_RATIO=0.25, NET_FAIL_MIN=12;
async function autoFlagOnLoad(){
  // 결과창 추천 폰트 자동 검사 — 선언 웨이트 기준. 실패 시 플래그, 통과하면 과거 오탐도 자동 복구
  if(!document.fonts)return;
  if(navigator.onLine===false){
    console.warn('[웹폰트 자동검사] 오프라인 — 검사를 건너뜁니다 (기존 플래그 유지)');
    return;
  }
  const fams=new Set();
  Object.values(FONTMAP).forEach(v=>v.fonts.forEach(f=>fams.add(f.family)));
  FONT_DB.forEach(f=>{if(f.wfError&&f.css)fams.add(f.family);});   // 과거 오탐(웨이트 미인지 검사) 복구 대상 포함
  const newlyBad=[]; let healed=0, checked=0;
  for(const fam of fams){
    const src=FONT_DB.find(f=>f.family===fam); if(!src)continue;
    checked++;
    injectFontCss(src);
    const ok=await loadFontFaces(src.family,src.css);
    if(!ok&&!src.wfError){src.wfError=true;newlyBad.push(src);}
    else if(ok&&src.wfError&&!src.wfManual){src.wfError=false;healed++;}   // 자동 플래그만 복구 — 수동 플래그(wfManual)는 보존
  }
  // 실패가 비정상적으로 많으면 폰트가 아니라 네트워크 문제로 본다 → 되돌린다
  if(newlyBad.length>=NET_FAIL_MIN && checked && newlyBad.length/checked>NET_FAIL_RATIO){
    newlyBad.forEach(f=>f.wfError=false);
    console.warn(`[웹폰트 자동검사] ${checked}종 중 ${newlyBad.length}종 실패 — 네트워크 문제로 판단해 플래그를 적용하지 않았습니다`);
    if(document.body.classList.contains('admin-mode'))toast('인터넷 연결이 불안정해 글꼴 검사 결과를 반영하지 않았어요');   // 고객 화면에는 띄우지 않는다
    if(healed){rebuildQuiet();if(curCode)renderStyle();}
    return;
  }
  const bad=newlyBad.length;
  if(bad){const n=fontErrExclude();rebuildQuiet();}
  if(healed){rebuildQuiet();if(curCode)renderStyle();}
  if(bad||healed)console.info(`[웹폰트 자동검사] 오류 ${bad}종 · 복구 ${healed}종`);
}
async function checkAllWebfonts(){
  if(!document.fonts){toast('이 브라우저는 자동 검사를 지원하지 않아요');return;}
  if(navigator.onLine===false){toast('오프라인이라 검사할 수 없어요 — 기존 플래그를 유지합니다');return;}
  const list=flFiltered().slice(0,flShown);
  toast(`${list.length}종 검사 중…`);
  const newlyBad=[]; let healed=0;
  for(const f of list){
    injectFontCss(f);
    const ok=await loadFontFaces(f.family,f.css);
    if(!ok){if(!f.wfError){f.wfError=true;newlyBad.push(f);}}
    else if(f.wfError&&!f.wfManual){f.wfError=false;healed++;}   // 자동 플래그만 복구 — 수동 플래그는 보존
  }
  if(newlyBad.length>=NET_FAIL_MIN && list.length && newlyBad.length/list.length>NET_FAIL_RATIO){
    newlyBad.forEach(f=>f.wfError=false);
    renderFontList(true);
    alert(`${list.length}종 중 ${newlyBad.length}종이 실패했습니다.\n\n글꼴 문제라기보다 인터넷 연결이 끊겼거나 CDN이 막힌 상황으로 보입니다.\n폰트 데이터를 지키기 위해 이번 검사 결과는 반영하지 않았습니다.\n연결을 확인한 뒤 다시 시도해 주세요.`);
    return;
  }
  const bad=newlyBad.length;
  if(bad||healed){markDirty();fontErrExclude();rebuildQuiet();}
  renderFontList(true);
  toast(bad||healed?`오류 ${bad}종 · 복구 ${healed}종${bad?' — 오류는 추천에서 제외했어요':''}`:'모두 정상 로드됩니다');
}
/* ---------- 폰트 추가 / 편집 (동일 구성) ---------- */
let afEditIdx=-1;   // -1이면 신규 추가, 그 외엔 FONT_DB 인덱스
function openAddFont(editIdx){
  afEditIdx=(typeof editIdx==='number')?editIdx:-1;
  const isEdit=afEditIdx>=0;
  const f=isEdit?FONT_DB[afEditIdx]:null;
  let ov=$('afOv');
  if(ov&&!ov.dataset.bound){ov.remove();ov=null;}   // 저장본에 베이크된 팝업은 핸들러가 없으므로 재생성
  if(!ov){
    ov=document.createElement('div'); ov.id='afOv'; ov.className='br-ov'; ov.dataset.bound='1';
    ov.innerHTML=`<div class="br-box" style="width:min(660px,96vw)" role="dialog" aria-label="폰트 정보">
      <div class="br-head"><div><b id="afTitle">폰트 추가</b><span id="afSub"></span></div>
        <button class="cp-x" id="afClose" aria-label="닫기">×</button></div>
      <div style="padding:18px 20px;overflow-y:auto">
        <label class="af-l">@font-face CSS <em>붙여 넣으면 이름·family를 자동으로 읽어옵니다</em></label>
        <textarea id="afCss" class="af-ta" rows="7" spellcheck="false" placeholder="@font-face {
    font-family: 'MyFont';
    src: url('https://.../MyFont.woff2') format('woff2');
    font-weight: normal;
    font-display: swap;
}"></textarea>
        <div class="ad-row2" style="margin-top:12px">
          <div><label class="af-l">폰트 이름</label><input id="afName" class="af-in" placeholder="예: 마크인포 산스"></div>
          <div><label class="af-l">font-family</label><input id="afFam" class="af-in" placeholder="예: 'MyFont'"></div>
        </div>
        <div class="ad-row2" style="margin-top:10px">
          <div><label class="af-l">형태</label><select id="afType" class="af-in"></select></div>
          <div><label class="af-l">웨이트</label><select id="afWeight" class="af-in"></select></div>
        </div>
        <label class="af-l" style="margin-top:10px">인상 <em>최대 2개 · 부드러운↔강한, 진지한↔귀여운은 함께 고를 수 없어요</em></label>
        <div class="fl-moods" id="afMoods"></div>
        <div class="af-auto" id="afAuto"></div>
        <div class="af-rep" id="afRep"></div>
        <div class="af-flags" id="afFlags"></div>
        <div class="af-prev" id="afPrev">미리보기 — CSS를 붙여 넣으면 이곳에 표시됩니다</div>
        <div class="af-warn" id="afWarn"></div>
      </div>
      <div class="br-foot">
        <button class="chip-btn" id="afTest">로드 테스트</button>
        <button class="ad-mini danger" id="afDelete" style="display:none">이 폰트 삭제</button>
        <button class="chip-btn solid" id="afSave" style="margin-left:auto">추가하기</button>
      </div>
    </div>`;
    document.body.appendChild(ov);
    ov.addEventListener('click',e=>{if(e.target===ov)ov.style.display='none';});
    $('afClose').onclick=()=>ov.style.display='none';
    $('afType').innerHTML=CLS_AXES.type.opts.map(t=>`<option>${t}</option>`).join('');
    $('afWeight').innerHTML=CLS_AXES.weight.opts.map(t=>`<option ${t==='보통'?'selected':''}>${t}</option>`).join('');
    $('afCss').oninput=parseAddFontCss;
    $('afTest').onclick=testAddFont;
    $('afSave').onclick=saveAddFont;
    $('afDelete').onclick=deleteEditFont;
  }
  // ---- 값 채우기 ----
  $('afTitle').textContent=isEdit?'폰트 편집':'폰트 추가';
  $('afSub').textContent=isEdit?`${f.name} · 웹폰트 CSS와 분류를 수정합니다`:'눈누 등에서 복사한 @font-face CSS를 붙여 넣으세요';
  $('afSave').textContent=isEdit?'변경 저장':'추가하기';
  $('afDelete').style.display=isEdit?'':'none';
  $('afCss').value=isEdit?(f.css||''):'';
  $('afName').value=isEdit?f.name:'';
  $('afFam').value=isEdit?f.family:'';
  $('afType').value=isEdit?(f.cls.type||'고딕'):'고딕';
  $('afWeight').value=isEdit?(f.cls.weight||'보통'):'보통';
  const mood=isEdit?(f.cls.mood||[]).slice():[];
  afRepWorking=isEdit?(f.repStyles||[]).slice():[];
  renderAfMoods(mood);
  renderAfFlags(isEdit?f:null);
  $('afWarn').textContent='';
  const pv=$('afPrev');
  if(isEdit){injectFontCss(f);pv.style.fontFamily=f.family;pv.style.fontWeight=f.weight||'';pv.textContent='가나다라 한글로고 Aa 123';}
  else{pv.style.fontFamily='';pv.style.fontWeight='';pv.textContent='미리보기 — CSS를 붙여 넣으면 이곳에 표시됩니다';}
  ov.style.display='flex';
  setTimeout(()=>$(isEdit?'afName':'afCss').focus(),40);
}
function afCurrentMoods(){
  return [...$('afMoods').querySelectorAll('input:checked')].map(x=>x.dataset.mood);
}
function renderAfMoods(sel){
  const cur=sel||afCurrentMoods();
  $('afMoods').innerHTML=CLS_AXES.mood.opts.map(m=>{
    const on=cur.includes(m);
    const blocked=!on&&moodBlockedBy(m,cur);
    return `<label class="fl-mood${on?' on':''}${blocked?' blocked':''}" ${blocked?`title="'${blocked}'과 함께 고를 수 없어요"`:''}>
      <input type="checkbox" data-mood="${m}" ${on?'checked':''} ${blocked?'disabled':''}>${m}</label>`;
  }).join('');
  $('afMoods').querySelectorAll('input').forEach(cb=>cb.onchange=()=>{
    let cur2=afCurrentMoods();
    if(cb.checked){
      const conf=moodBlockedBy(cb.dataset.mood,cur2.filter(m=>m!==cb.dataset.mood));
      if(conf){cb.checked=false;toast(`'${cb.dataset.mood}'과 '${conf}'은 함께 고를 수 없어요`);return;}
      if(cur2.length>CLS_AXES.mood.max){cb.checked=false;toast('인상은 최대 2개까지예요');return;}
    }
    renderAfMoods(afCurrentMoods());
    renderAfAuto();
  });
  renderAfAuto();
}
function renderAfAuto(){
  const cls={type:$('afType').value,weight:$('afWeight').value,mood:afCurrentMoods()};
  const a=autoStyles(cls);
  const box=$('afAuto');
  if(!cls.mood.length){
    box.innerHTML=`<div class="af-auto-empty">인상을 고르면 알고리즘이 어울리는 16유형을 자동으로 정합니다</div>`;
    return;
  }
  box.innerHTML=`
    <div class="af-auto-head">어울리는 16유형 <em>알고리즘 자동 판정 · 직접 고르지 않습니다</em></div>
    <div class="af-auto-tags">
      ${a.primary.map(c=>`<span class="af-at p">${codeName(c)}</span>`).join('')}
      ${a.secondary.map(c=>`<span class="af-at s" title="두 번째 인상으로 들어온 유형 — 추천에서 후순위입니다">${codeName(c)} <i>보조</i></span>`).join('')}
      ${a.codes.length?'':'<span class="af-auto-empty">이 조합에 지정된 유형이 없습니다 — 알고리즘 탭에서 조건을 확인해 주세요</span>'}
    </div>`;
  renderAfRep(a.codes);
}
/* v0.19.0: 스타일 대표체 — 이 폰트가 매칭된 유형 중, 결과 화면에서 항상 맨 앞(대표)으로
   보여줄 유형을 관리자가 직접 고정한다. 고정하지 않으면 기존처럼 알고리즘 순위로 정렬된다. */
let afRepWorking=[];
function renderAfRep(codes){
  const box=$('afRep'); if(!box)return;
  if(!codes.length){box.innerHTML='';return;}
  box.innerHTML=`<label class="af-l" style="margin-top:10px">스타일 대표체 <em>체크한 유형에서는 이 폰트를 결과 화면 맨 앞(대표)으로 고정합니다</em></label>
    <div class="af-rep-tags">${codes.map(c=>{
      const on=afRepWorking.includes(c);
      return `<label class="af-rep-tag${on?' on':''}"><input type="checkbox" data-rep="${c}" ${on?'checked':''}>${codeName(c)}</label>`;
    }).join('')}</div>`;
  box.querySelectorAll('[data-rep]').forEach(cb=>cb.onchange=()=>{
    const c=cb.dataset.rep;
    if(cb.checked){if(!afRepWorking.includes(c))afRepWorking.push(c);}
    else afRepWorking=afRepWorking.filter(x=>x!==c);
    cb.closest('.af-rep-tag').classList.toggle('on',cb.checked);
  });
}
function renderAfFlags(f){
  const flags=[['wfError','웹폰트 오류'],['clsHold','분류 보류'],['hideFromSearch','검색 제외']];
  $('afFlags').innerHTML=flags.map(([k,label])=>
    `<button class="fl-flag${f&&f[k]?' on':''}${k==='wfError'?'':' neutral'}" data-afflag="${k}"><span class="sw"></span>${label}</button>`).join('');
  $('afFlags').querySelectorAll('[data-afflag]').forEach(b=>b.onclick=()=>b.classList.toggle('on'));
}
function parseAddFontCss(){
  let css=$('afCss').value;
  // http 웹폰트 URL은 https 페이지에서 차단되므로 자동 교정
  const fixed=css.replace(/url\('http:\/\//g,"url('https://").replace(/@import url\('http:\/\//g,"@import url('https://");
  if(fixed!==css){css=fixed;$('afCss').value=css;}
  const m=css.match(/font-family\s*:\s*(['"]?)([^;'"]+)\1/i);
  if(m){
    const fam=m[2].trim();
    if(!$('afFam').value)$('afFam').value=`'${fam}'`;
    if(!$('afName').value)$('afName').value=fam;
  }
  const ws=declaredWeights(css);
  const rep=ws.length>1?ws[Math.floor(ws.length/2)]:ws[0];   // 다중 웨이트면 중간값으로 분류
  $('afWeight').value=rep>=600?'두꺼운':(rep<=300?'얇은':'보통');
  if(ws.length>1)$('afWarn').innerHTML=`<span style="color:var(--ink2);font-size:11px">ⓘ 웨이트 ${ws.join('·')}가 한 패밀리로 감지됐어요 — 전부 로드되고, 분류는 중간 웨이트 기준입니다</span>`;
  renderAfAuto();
}
function testAddFont(){
  const css=$('afCss').value.trim(), fam=$('afFam').value.trim();
  if(!css||!fam){$('afWarn').innerHTML='<span class="ad-warn-line">⚠ CSS와 font-family를 먼저 입력해 주세요</span>';return;}
  const s=document.createElement('style'); s.dataset.fontcss='1'; s.textContent=css.replace(/url\('http:\/\//g,"url('https://"); document.head.appendChild(s);
  const ws=declaredWeights(css);
  const pv=$('afPrev'); pv.style.fontFamily=fam; pv.style.fontWeight=nearestWeight(css,400);
  pv.textContent='가나다라 한글로고 Aa 123';
  if(document.fonts){
    loadFontFaces(fam,css).then(ok=>{
      $('afWarn').innerHTML=ok
        ?`<span style="color:var(--green-deep);font-size:11px;font-weight:700">✓ 정상 로드됩니다 · 감지된 웨이트: ${ws.join(' · ')}</span>`
        :'<span class="ad-warn-line">⚠ 로드되지 않아요 — URL이 정확한지, CORS가 허용되는지 확인해 주세요</span>';
    });
  }
}
function saveAddFont(){
  const name=$('afName').value.trim(), fam=$('afFam').value.trim(), css=$('afCss').value.trim();
  const isEdit=afEditIdx>=0;
  if(!name||!fam||!css){$('afWarn').innerHTML='<span class="ad-warn-line">⚠ 이름 · family · CSS는 필수입니다</span>';return;}
  const dup=FONT_DB.findIndex(f=>f.name===name);
  if(dup>-1&&dup!==afEditIdx){$('afWarn').innerHTML='<span class="ad-warn-line">⚠ 같은 이름의 폰트가 이미 있어요</span>';return;}
  const mood=afCurrentMoods();
  const conf=moodConflict(mood);
  if(conf){$('afWarn').innerHTML=`<span class="ad-warn-line">⚠ '${conf[0]}'과 '${conf[1]}'은 함께 고를 수 없어요</span>`;return;}
  const flags={};
  $('afFlags').querySelectorAll('[data-afflag]').forEach(b=>flags[b.dataset.afflag]=b.classList.contains('on'));
  const target=isEdit?FONT_DB[afEditIdx]:{style:[],bici:false,embedRestrict:false};
  Object.assign(target,{name,family:fam,css,cat:$('afType').value,
    cls:{type:$('afType').value,mood,weight:$('afWeight').value},
    wfError:!!flags.wfError,clsHold:!!flags.clsHold,hideFromSearch:!!flags.hideFromSearch,wfManual:!!flags.wfError});
  const a=applyAutoStyles(target);
  // v0.19.0: 대표체로 체크한 유형은 이 폰트의 매칭 대상으로만 유효하다 (전에 대표였다가
  // 이번 분류 변경으로 더 이상 매칭되지 않는 유형은 자동으로 빠진다)
  target.repStyles=afRepWorking.filter(c=>a.codes.includes(c));
  if(!isEdit)FONT_DB.unshift(target);
  cssInjected.delete(name); injectFontCss(target);
  pinRepFont(target);
  markDirty();
  $('afOv').style.display='none';
  if(isEdit){
    syncFontmapFrom(target);
    if(target.wfError||target.hideFromSearch)fontErrExclude();
  }
  const add=rebuildQuiet();
  if(adminTab==='fonts'){
    if(isEdit){
      // v12.2: 편집 저장 시 검색어·필터·표시 개수·스크롤 위치 전부 유지
      const sy=window.scrollY;
      renderFontList(true);
      requestAnimationFrame(()=>window.scrollTo(0,sy));
    }else{$('fSearch').value=name;renderFontList();}
  }
  else renderClassify();
  toast(`${name} ${isEdit?'수정':'추가'} 완료 · 유형 ${a.codes.length}개 자동 지정${add?` · 추천 ${add}종 반영`:''}`);
}
function deleteEditFont(){
  if(afEditIdx<0)return;
  const f=FONT_DB[afEditIdx];
  if(!confirm(`'${f.name}' 을 목록에서 완전히 삭제할까요?\n\n추천 목록에서도 제거되고, 되돌릴 수 없습니다.`))return;
  const fam=f.family;
  FONT_DB.splice(afEditIdx,1);
  Object.keys(FONTMAP).forEach(code=>{
    FONTMAP[code].fonts=FONTMAP[code].fonts.filter(x=>x.family!==fam);
  });
  if(clsIdx>=FONT_DB.length)clsIdx=Math.max(0,FONT_DB.length-1);
  markDirty();
  $('afOv').style.display='none';
  const add=rebuildQuiet();
  if(curCode){curFontIdx=0;renderStyle();}
  if(adminTab==='fonts'){const sy=window.scrollY;renderFontList(true);requestAnimationFrame(()=>window.scrollTo(0,sy));}
  else renderClassify();
  toast(`${f.name} 삭제 완료${add?` · 추천 ${add}종 보충`:''}`);
}
/* ---------- 탭2: 폰트 분류 (한 종씩 집중) ---------- */
function algoSuggest(f){
  const key=`${f.cls.type}|${(f.cls.mood||[])[0]||''}|${f.cls.weight}`;
  return ALGO16[key]||[];
}
function clsNext(){const t=$('clsOnlyTodo').checked;for(let n=1;n<=FONT_DB.length;n++){const i=(clsIdx+n)%FONT_DB.length;if(!t||fontStatus(FONT_DB[i]).k!=='ok'){clsIdx=i;break;}}renderClassify();}
function clsPrev(){const t=$('clsOnlyTodo').checked;for(let n=1;n<=FONT_DB.length;n++){const i=(clsIdx-n+FONT_DB.length)%FONT_DB.length;if(!t||fontStatus(FONT_DB[i]).k!=='ok'){clsIdx=i;break;}}renderClassify();}
function clsJumpTodo(){if($('clsOnlyTodo').checked&&fontStatus(FONT_DB[clsIdx]).k==='ok')clsNext();else renderClassify();}
function renderClassify(){
  const f=FONT_DB[clsIdx]; if(!f)return;
  injectFontCss(f);
  const s=fontStatus(f), sug=algoSuggest(f);
  const todo=FONT_DB.filter(x=>fontStatus(x).k!=='ok').length;
  $('clsStat').textContent=`${clsIdx+1} / ${FONT_DB.length} · 미완료 ${todo}종`;
  $('clsCard').innerHTML=`
  <div class="cls-card">
    <div class="cls-name">${f.name}<span class="fl-badge ${s.k}">${s.t}</span>
      <button class="fl-flag${f.wfError?' on':''}" style="width:auto;margin-left:auto" data-flag="wfError"><span class="sw"></span>웹폰트 오류</button></div>
    <div class="cls-sample-wrap">
      <div class="cls-big" id="clsBig" style="font-family:${f.family};font-weight:${fontFw(f)}" title="클릭하면 문구를 바꿀 수 있어요">${CLS_SAMPLE.big.replace(/</g,'&lt;')}</div>
      <div class="cls-lines" id="clsLines" style="font-family:${f.family};font-weight:${fontFw(f)}" title="클릭하면 문구를 바꿀 수 있어요">${CLS_SAMPLE.lines.replace(/</g,'&lt;').replace(/\n/g,'<br>')}</div>
      <button class="cls-edit-btn" id="clsEditBtn">✎ 문구 수정</button>
      <div class="cls-edit hidden" id="clsEdit">
        <label>큰 문구</label><input id="clsBigIn" value="${CLS_SAMPLE.big.replace(/"/g,'&quot;')}" maxlength="40">
        <label>작은 문구 <span class="ad-optional">줄바꿈 가능</span></label><textarea id="clsLinesIn" rows="2">${CLS_SAMPLE.lines.replace(/</g,'&lt;')}</textarea>
        <div class="cls-edit-acts">
          <button class="ad-mini" id="clsSampleReset">초기화</button>
          <button class="ad-apply" id="clsSampleSave" style="width:auto;padding:8px 18px;margin:0">저장</button>
        </div>
      </div>
    </div>
    <div class="cls-axes">
      <div class="cls-ax"><label>형태 (계열)</label><div class="cls-opts">${CLS_AXES.type.opts.map(t=>`<button class="cls-opt${f.cls.type===t?' on':''}" data-ax="type" data-v="${t}">${t}</button>`).join('')}</div></div>
      <div class="cls-ax"><label>인상 (최대 ${CLS_AXES.mood.max}개) <span class="ad-optional">부드러운↔강한 · 진지한↔귀여운 동시 선택 불가</span></label><div class="cls-opts">${CLS_AXES.mood.opts.map(t=>{
        const on=(f.cls.mood||[]).includes(t), blk=!on&&moodBlockedBy(t,f.cls.mood||[]);
        return `<button class="cls-opt${on?' on':''}${blk?' blocked':''}" data-ax="mood" data-v="${t}" ${blk?`title="'${blk}'과 함께 고를 수 없어요"`:''}>${t}</button>`;}).join('')}</div></div>
      <div class="cls-ax"><label>웨이트</label><div class="cls-opts">${CLS_AXES.weight.opts.map(t=>`<button class="cls-opt${f.cls.weight===t?' on':''}" data-ax="weight" data-v="${t}">${t}</button>`).join('')}</div></div>
    </div>
    <div class="cls-codes">
      <span style="font-size:10.5px;font-weight:800;color:var(--ink3);align-self:center;margin-right:4px">어울리는 16유형 <em style="font-style:normal;font-weight:500">알고리즘 자동</em></span>
      <span class="cls-algo-key">${f.cls.type} · ${(f.cls.mood||[]).join('+')||'인상 미정'} · ${f.cls.weight}</span>
      ${(()=>{const a=autoStyles(f.cls||{});
        const key=`${f.cls.type}|${(f.cls.mood||[])[0]||''}|${f.cls.weight}`;
        const meta=(typeof ALGO_META!=='undefined'&&ALGO_META[key])||null;
        const sc=FONT_ALGO?Object.fromEntries(CODES.map(c=>[c,faScoreFor(f,c)])):(meta?meta.scores||{}:{});   // v2.27.0: 코어 4축 점수
        return CODES.map(c=>{
          const pri=a.primary.includes(c), sec=a.secondary.includes(c);
          const pt=sc[c]!=null?` · 적합도 ${Math.round(sc[c])}점`:'';
          const cls=pri?'on':(sec?'on sub':'off');
          return `<span class="cls-code auto ${cls}" title="${c}${sec?' · 두 번째 인상에서 온 보조 유형(추천 후순위)':''}${pt}">${codeName(c)}${sc[c]!=null?`<em>${Math.round(sc[c])}</em>`:''}</span>`;
        }).join('');})()}
    </div>
    <div class="cls-foot">
      <label class="ad-check"><input type="checkbox" id="clsHoldChk" ${f.clsHold?'checked':''}> 분류 보류 (판단이 어려운 폰트)</label>
      <div style="display:flex;gap:8px">
        <button class="chip-btn" id="clsOpenEdit">✎ 폰트 편집</button>
        <button class="chip-btn" id="clsGoAlgo">알고리즘 조건 보기</button>
        <button class="chip-btn solid" onclick="clsNext()">저장하고 다음 ›</button>
      </div>
    </div>
  </div>`;
  const card=$('clsCard');
  card.querySelectorAll('[data-ax]').forEach(b=>b.onclick=()=>{
    const ax=b.dataset.ax, v=b.dataset.v;
    if(ax==='mood'){
      const m=f.cls.mood||[];
      const i=m.indexOf(v);
      if(i>-1)m.splice(i,1);
      else{
        const conf=moodBlockedBy(v,m);
        if(conf){toast(`'${v}'과 '${conf}'은 함께 고를 수 없어요`);return;}
        if(m.length>=CLS_AXES.mood.max){toast(`인상은 최대 ${CLS_AXES.mood.max}개까지예요`);return;}
        m.push(v);
      }
      f.cls.mood=m;
    }else f.cls[ax]=v;
    applyAutoStyles(f); syncFontmapFrom(f); markDirty();
    renderClassify();
  });
  /* 16유형은 알고리즘이 정합니다 — 수동 토글 없음 */
  card.querySelector('[data-flag]').onclick=()=>{f.wfError=!f.wfError;f.wfManual=!!f.wfError;markDirty();renderClassify();};
  $('clsHoldChk').onchange=e=>{f.clsHold=e.target.checked;renderClassify();};
  const clsBind=()=>{
    const eb=$('clsEditBtn'), ed=$('clsEdit');
    const open=()=>{ed.classList.remove('hidden');$('clsBigIn').focus();};
    eb.onclick=open;
    $('clsBig').onclick=open; $('clsLines').onclick=open;
    $('clsSampleSave').onclick=()=>{
      const b=$('clsBigIn').value.trim(), l=$('clsLinesIn').value;
      if(!b){toast('큰 문구는 비울 수 없어요');return;}
      CLS_SAMPLE.big=b; CLS_SAMPLE.lines=l;
      markDirty(); renderClassify(); toast('샘플 문구를 저장했어요');
    };
    $('clsSampleReset').onclick=()=>{
      CLS_SAMPLE={...CLS_SAMPLE_DEFAULT};
      markDirty(); renderClassify(); toast('기본 문구로 되돌렸어요');
    };
  };
  clsBind();
  $('clsOpenEdit').onclick=()=>openAddFont(clsIdx);
  $('clsGoAlgo').onclick=()=>{
    setAdminTab('algorithm');
    const sel=$('algoType'); if(sel){sel.value=f.cls.type;renderAlgo();}
    toast(`${f.cls.type} 계열의 조건을 확인해 보세요`);
  };
  updateTabCounts();
}
/* ---------- 탭3: 알고리즘 ---------- */
const ALGO_SAMPLE_CAP=16;   // v13.5: 개수 제한 해제 · 웹폰트 과다 로드만 막는 상한
function algoSampleFonts(type,mood,weight){
  // 이 분류(형태·무드·웨이트)에 실제로 속하는 폰트 — 한 줄에 들어가는 만큼 표시(fitAlgoSamples)
  return FONT_DB.filter(f=>!f.wfError&&f.css&&f.cls&&f.cls.type===type&&f.cls.weight===weight&&(f.cls.mood||[]).includes(mood)).slice(0,ALGO_SAMPLE_CAP);
}
/* 한 줄을 넘치는 샘플은 숨기고 「+N」으로 요약 — 폰트 로드 후에도 다시 계산
   줄바꿈 판정은 offsetLeft 기준: 같은 줄에서는 좌표가 계속 커지고, 줄이 바뀌면 되돌아간다.
   (offsetTop은 폰트별 baseline 차이로 같은 줄에서도 값이 달라 쓸 수 없다) */
function fitAlgoSamples(root){
  (root||document).querySelectorAll('.algo-samples').forEach(box=>{
    const items=[...box.querySelectorAll('.algo-sample')].filter(e=>!e.classList.contains('none'));
    if(!items.length)return;
    items.forEach(e=>{e.style.display='';});
    const prevMore=box.querySelector('.algo-more'); if(prevMore)prevMore.remove();
    let vis=items.length;
    for(let i=1;i<items.length;i++){
      if(items[i].offsetLeft<=items[i-1].offsetLeft){vis=i;break;}
    }
    if(vis>=items.length)return;                       // 전부 한 줄에 들어감
    for(let i=vis;i<items.length;i++)items[i].style.display='none';
    const more=document.createElement('span');
    more.className='algo-more'; box.appendChild(more);
    const setN=()=>{more.textContent=`+${items.length-vis}`;
      more.title=items.slice(vis).map(e=>e.title).join(', ');};
    setN();
    // 「+N」 칩까지 줄을 넘기면 샘플을 하나씩 더 접는다
    while(vis>1&&more.offsetLeft<=items[vis-1].offsetLeft){
      items[--vis].style.display='none'; setN();
    }
  });
}
function algoNoticeHtml(){
  if(!FONT_ALGO)return '';
  faInit();
  const rows=faCores().map(c=>{
    const br=(FONT_ALGO.brief||{})[c.mb]||{}, sh=br.typeShare||{};
    const top=poolFor(c.legacy,[]).slice(0,3).map(f=>f.name).join(', ');
    return `<tr><td><b>${c.mb}</b> ${codeName(c.legacy)}</td><td>${Object.keys(sh).sort((a,b)=>sh[b]-sh[a]).map(t=>t+' '+Math.round(sh[t]*100)+'%').join(' · ')}</td><td>${(br.weightBand||[]).join('·')}</td><td>${(br.moodPrimary||[]).join('·')}${(br.moodExclude||[]).length?' <em style="color:var(--warn);font-style:normal">제외 '+br.moodExclude.join('·')+'</em>':''}</td><td style="color:var(--ink3)">${top}</td></tr>`;}).join('');
  return `<div class="algo-new" style="margin:0 0 16px;padding:14px 16px;border:1px solid #333;border-radius:12px;background:#fff;font-size:12px;line-height:1.7">
    <b style="font-size:13px">v2.27.0 · 서체 추천은 「코어 4축 점수」로 계산돼요</b><br>
    서체의 형태·인상·굵기를 4축(E/I · N/S · F/T · J/P) 점수로 바꿔 코어와의 거리를 구하고, 아래 「코어 브리프」(유형 비율·굵기·인상)와 유형 쿼터로 상위 ${FONT_ALGO.topN}개를 고릅니다.
    아래 결정표(형태 · 인상 · 굵기)는 <b>이전 방식의 참고용</b>이며, 고쳐도 추천에는 반영되지 않아요. 서체를 다시 분류하면 점수가 자동으로 바뀝니다.
    <details style="margin-top:8px"><summary style="cursor:pointer;font-weight:800">코어 브리프 · 현재 상위 3개 보기</summary>
    <div style="overflow:auto;margin-top:8px"><table style="border-collapse:collapse;width:100%;font-size:11.5px"><thead><tr style="text-align:left;color:var(--ink3)"><th>코어</th><th>유형 비율</th><th>굵기</th><th>인상</th><th>상위 서체</th></tr></thead><tbody>${rows}</tbody></table></div></details></div>`;
}
function renderAlgo(){
  const ty=$('algoType').value||CLS_AXES.type.opts[0];
  const keys=Object.keys(ALGO16).filter(k=>k.startsWith(ty+'|'));
  const empty=keys.filter(k=>!ALGO16[k].length).length;
  $('algoStat').textContent=`${ty} · ${keys.length}개 조합${empty?` · 미지정 ${empty}개`:''}`;
  $('algoRows').innerHTML=algoNoticeHtml()+keys.map(k=>{
    const [,mood,weight]=k.split('|');
    const sel=ALGO16[k]||[];
    const samples=algoSampleFonts(ty,mood,weight);
    samples.forEach(injectFontCss);
    return `<div class="algo-row${sel.length?'':' empty'}" data-key="${k}">
      <div class="algo-key">${mood} · ${weight}<em>${sel.length?sel.length+'개 지정':'미지정'}</em>${(()=>{
        const m=(typeof ALGO_META!=='undefined'&&ALGO_META[k])||null;
        return m&&m.reason?`<span class="algo-reason" title="${m.reason.replace(/"/g,'&quot;')}">근거 ⓘ</span>`:'';})()}</div>
      <div class="algo-codes">${CODES.map(c=>`<button class="algo-c${sel.includes(c)?' on':''}" data-code="${c}" title="${c}">${codeName(c)}</button>`).join('')}
        <div class="algo-samples">${samples.length?samples.map(f=>`<span class="algo-sample" style="font-family:${f.family},Pretendard;font-weight:${fontFw(f)}" title="${f.name}">${f.name}</span>`).join(''):'<span class="algo-sample none">이 분류에 해당하는 폰트가 아직 없어요</span>'}</div>
      </div>
    </div>`;}).join('');
  fitAlgoSamples($('algoRows'));
  requestAnimationFrame(()=>fitAlgoSamples($('algoRows')));           // 레이아웃 확정 후 1회 더
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>fitAlgoSamples($('algoRows')));  // 웹폰트 로드 후 재계산
  $('algoRows').querySelectorAll('.algo-row').forEach(row=>{
    const k=row.dataset.key;
    row.querySelectorAll('[data-code]').forEach(b=>b.onclick=()=>{
      const arr=ALGO16[k]||(ALGO16[k]=[]);
      const c=b.dataset.code, i=arr.indexOf(c);
      if(i>-1)arr.splice(i,1);else arr.push(c);
      b.classList.toggle('on');
      row.classList.toggle('empty',!arr.length);markDirty();
      row.querySelector('em').textContent=arr.length?arr.length+'개 지정':'미지정';
      updateTabCounts();
    });
  });
  updateTabCounts();
}
/* ---------- FONTMAP 동기화 (결과창 추천과 연결) ---------- */
function syncFontmapFrom(f){
  Object.entries(FONTMAP).forEach(([code,v])=>{
    const hit=v.fonts.find(x=>x.name===f.name)||v.fonts.find(x=>x.family===f.family&&!FONT_DB.some(d=>d.name===x.name));   // 이름 우선 — 같은 계열의 다른 굵기를 덮어쓰지 않는다
    if(hit){hit.name=f.name;hit.type=f.cls.type;hit.weight=f.cls.weight;hit.mood=f.cls.mood.slice();}
  });
  if(curCode)renderStyle();
}
function rebuildQuiet(){
  let added=0;
  Object.keys(FONTMAP).forEach(code=>{
    const arr=FONTMAP[code].fonts;
    if(arr.length>=8)return;
    const before=arr.length;
    FONTMAP[code].fonts=fontmapFill(code,arr,8);
    added+=FONTMAP[code].fonts.length-before;
  });
  if(added&&curCode)renderStyle();
  return added;
}
function rebuildFontmapFromDB(){
  let changed=0;
  CODES.forEach(code=>{
    if(!FONTMAP[code])return;
    const keep=FONTMAP[code].fonts.filter(x=>{
      const src=fontDbOf(x);
      return src&&!src.wfError&&!src.hideFromSearch;
    });
    const out=fontmapFill(code,keep,8);
    changed+=out.length-keep.length;
    FONTMAP[code].fonts=out.slice(0,8);
  });
  if(curCode){curFontIdx=0;renderStyle();}
  toast(changed?`추천 목록을 갱신했어요 (${changed}종 보충)`:'추천 목록이 최신 상태예요');
}
/* ---------- 탭5: 참고 이미지 관리 ---------- */
function renderAdminImage(){
  const code=$('imgStyleSel').value||Object.keys(STYLES)[0];
  const st=STYLES[code];
  // 코드 순서(codeOrder 기준)로 이전/다음 스타일을 넘나들며 여러 값을 빠르게 비교·수정
  const styleCodes=allCoreCodes().map(c=>(MBCI.results||{})[c]&&(MBCI.results||{})[c].legacyStyleCode).filter(c=>c&&STYLES[c]);
  const pIdx=styleCodes.indexOf(code);
  const pv=$('imgStylePrev'), nx=$('imgStyleNext');
  if(pv&&nx&&styleCodes.length){
    pv.disabled=pIdx<=0; nx.disabled=pIdx<0||pIdx>=styleCodes.length-1;
    pv.onclick=()=>{if(pIdx>0){$('imgStyleSel').value=styleCodes[pIdx-1];renderAdminImage();}};
    nx.onclick=()=>{if(pIdx>=0&&pIdx<styleCodes.length-1){$('imgStyleSel').value=styleCodes[pIdx+1];renderAdminImage();}};
  }
  const mb=mbciCodeFor(code), res=(MBCI.results=MBCI.results||{});
  const LR=res[mb]||(res[mb]={code:mb,legacyStyleCode:code});
  const fit=(LR.fitFields&&LR.fitFields.length?LR.fitFields:(st.use||[])).slice(0,4);
  const brands=Array.from({length:4},(_,i)=>{const b=(LR.refBrands||[])[i]||{};return {name:b.name||'',logo:Object.assign({url:'',src:'',credit:'',alt:''},b.logo||{})};});
  const q=v=>String(v==null?'':v).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
  $('imgStat').textContent=`${mb} ${st.adj} · 적합 분야 ${fit.length}/4 · 참고 브랜드 ${brands.filter(b=>b.name.trim()).length}/4`;
  const prevHTML=()=>{
    const bl=[...pane.querySelectorAll('.ad-brand')].map(r=>({name:r.querySelector('[data-bk="name"]').value.trim(),logo:{url:r.dataset.uri||r.querySelector('[data-bk="url"]').value.trim(),alt:(r.querySelector('[data-bk="name"]').value.trim())+' 로고'}})).filter(b=>b.name);
    const fl=[...pane.querySelectorAll('[data-fit]')].map(i=>i.value.trim()).filter(Boolean);
    const sk=pane.querySelector('[data-ik="skw"]').value.trim();
    return `<div class="fit-row" style="margin-bottom:12px">${fl.map(u=>`<span class="fit-chip">${esc(u)}</span>`).join('')||'<span style="font-size:11px;color:var(--ink3)">적합 분야가 없습니다</span>'}</div>
      ${sk?`<p class="logo-ref-style"><b>스타일 키워드</b>${esc(sk)}</p>`:''}
      ${bl.length?`<div class="ref-cap">참고 브랜드</div>`+refTilesHTML(bl,true):'<span style="font-size:11px;color:var(--ink3)">참고 브랜드가 없습니다</span>'}`;
  };
  $('adminImagePane').innerHTML=`
    <div class="ad-img-grid">
      <div class="ad-color-form">
        <label>적합 분야 <span class="ad-optional">최대 4개 · 비워 둔 칸은 화면에 만들지 않아요</span></label>
        ${Array.from({length:4},(_,i)=>`<input data-fit="${i}" value="${q(fit[i])}" maxlength="20" placeholder="예: 전문 서비스" style="margin-bottom:6px">`).join('')}
        <label style="margin-top:12px">스타일 키워드 <span class="ad-optional">한 줄 · · 로 구분 (예: 중앙 집중형 심볼 · 균형 잡힌 조형 · 따뜻한 프리미엄 컬러)</span></label>
        <textarea data-ik="skw" rows="2" maxlength="120" placeholder="이 코어의 로고 스타일을 설명하는 키워드">${q(LR.styleKeywords||'')}</textarea>
        <button type="button" class="ad-apply" id="imgApply" style="margin-top:14px">적합 분야 · 스타일 키워드 적용</button>
      </div>
      <div class="ad-color-preview">
        <div class="ad-prev-label">참고 브랜드 <span style="font-weight:500;color:var(--ink3)">· 브랜드 이름과 로고를 한 쌍으로 입력(최대 4쌍, 같은 순서로 표시) · 저작권·상표 이용 조건 확인 후 등록</span></div>
        <div class="ad-samp-list">${brands.map((b,i)=>`
          <div class="ad-samp ad-brand" data-bi="${i}">
            <div class="ad-samp-thumb${b.logo.url?' filled':''}">${b.logo.url?`<img src="${q(b.logo.url)}" alt="" onerror="this.style.display='none'">`:`<span>${i+1}</span>`}</div>
            <div class="ad-samp-fields">
              <input data-bk="name" value="${q(b.name)}" maxlength="30" placeholder="브랜드 이름 (예: NAVER)">
              <div class="ad-samp-up"><button type="button" class="ad-mini" data-bpick="${i}">📁 로고 파일 올리기</button><input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif" hidden data-bfile="${i}"><span class="ad-samp-fname" data-bfname></span></div>
              <input data-bk="url" value="${q(b.logo.url&&!b.logo.url.startsWith('data:')?b.logo.url:'')}" placeholder="또는 로고 이미지 주소 (https://…)">
              <input data-bk="src" value="${q(b.logo.src)}" placeholder="출처 페이지 링크 (파일 정보·라이선스 페이지)">
              <input data-bk="credit" value="${q(b.logo.credit)}" placeholder="출처 표기 (예: Wikimedia Commons · NAVER)">
            </div>
            <button type="button" class="ad-mini danger" data-bclear="${i}">비우기</button>
          </div>`).join('')}</div>
        <p style="font-size:11px;color:var(--ink2);line-height:1.6;margin-top:10px">PNG·JPG·WEBP·SVG·GIF, 파일당 5MB 이하. 올린 파일은 <b>「⇩ 내보내기」</b> 시 <code>assets/img/brands/</code> 폴더의 파일로 저장되고 데이터에는 경로만 남습니다. 이름은 있는데 로고가 없으면 「로고 준비 중」으로 표시돼요.</p>
        <button type="button" class="ad-apply" id="brandApply" style="margin-top:10px">참고 브랜드 저장</button>
        <div class="ad-prev-label" style="margin-top:16px">고객 화면 미리보기 <span style="font-weight:500;color:var(--ink3)">· 입력 중인 값이 바로 반영돼요</span></div>
        <div class="ad-img-prev" id="imgPrev"></div>
      </div>
    </div>`;
  const pane=$('adminImagePane');
  const repaint=()=>{ $('imgPrev').innerHTML=prevHTML(); };
  pane.querySelectorAll('[data-fit],[data-ik="skw"]').forEach(i=>i.oninput=repaint);
  $('imgApply').onclick=()=>{
    LR.fitFields=[...pane.querySelectorAll('[data-fit]')].map(i=>i.value.trim()).filter(Boolean).slice(0,4);
    LR.styleKeywords=pane.querySelector('[data-ik="skw"]').value.trim();
    st.use=LR.fitFields.slice();
    markDirty();
    if(curCode===code)renderStyle();
    renderAdminImage();
    toast(`${st.adj} 적합 분야·스타일 키워드를 적용했어요`);
  };
  const readBrands=()=>[...pane.querySelectorAll('.ad-brand')].map(r=>{
    const name=r.querySelector('[data-bk="name"]').value.trim();
    return {name,logo:{url:r.dataset.uri||r.querySelector('[data-bk="url"]').value.trim(),src:r.querySelector('[data-bk="src"]').value.trim(),credit:r.querySelector('[data-bk="credit"]').value.trim(),alt:name?name+' 로고':''}};
  });
  $('brandApply').onclick=()=>{
    const arr=readBrands();
    const bad=arr.find(b=>b.logo.url&&!/^https?:\/\//i.test(b.logo.url)&&!/^data:image\//i.test(b.logo.url)&&!/^assets\//.test(b.logo.url));
    if(bad){toast('로고 주소는 http:// 또는 https:// 로 시작해야 해요');return;}
    const half=arr.find(b=>(!b.name&&b.logo.url));
    if(half){toast('로고만 있고 브랜드 이름이 비어 있는 칸이 있어요 — 이름과 로고는 한 쌍으로 입력해 주세요');return;}
    LR.refBrands=arr.filter(b=>b.name);
    markDirty();
    if(curCode===code)renderStyle();
    renderAdminImage();
    toast(`${st.adj} 참고 브랜드 ${LR.refBrands.length}쌍을 저장했어요`);
  };
  pane.querySelectorAll('[data-bk]').forEach(i=>i.oninput=()=>{ if(i.dataset.bk==='url'){const r=i.closest('.ad-brand');delete r.dataset.uri;r.querySelector('[data-bfname]').textContent='';} repaint(); });
  pane.querySelectorAll('[data-bk="url"]').forEach(inp=>inp.onchange=()=>{
    const th=inp.closest('.ad-brand').querySelector('.ad-samp-thumb'), v=inp.value.trim();
    if(v){th.classList.add('filled');th.innerHTML=`<img src="${q(v)}" alt="" onerror="this.style.display='none'">`;}
  });
  /* 로컬 이미지 파일 올리기 — 긴 변 1600px 이하로 줄여 data URI로 담고, 내보낼 때 실제 파일로 뽑는다 */
  pane.querySelectorAll('[data-bpick]').forEach(b=>b.onclick=()=>b.parentNode.querySelector('input[type=file]').click());
  pane.querySelectorAll('input[data-bfile]').forEach(fi=>fi.onchange=()=>{
    const f=fi.files&&fi.files[0]; fi.value=''; if(!f)return;
    const r=fi.closest('.ad-brand');
    if(!/^image\/(png|jpeg|webp|gif|svg\+xml)$/.test(f.type)){toast('PNG·JPG·WEBP·GIF·SVG 이미지 파일만 올릴 수 있어요');return;}
    if(f.size>5*1024*1024){toast('파일이 너무 커요 — 5MB 이하로 올려 주세요');return;}
    const done=uri=>{
      r.dataset.uri=uri;
      r.querySelector('[data-bk="url"]').value='';
      r.querySelector('[data-bfname]').textContent=f.name+' (저장 전)';
      const th=r.querySelector('.ad-samp-thumb'); th.classList.add('filled'); th.innerHTML=`<img src="${uri}" alt="">`;
      repaint();
    };
    const rd=new FileReader();
    rd.onerror=()=>toast('파일을 읽지 못했어요');
    rd.onload=()=>{
      if(f.type==='image/svg+xml'||f.type==='image/gif'){done(rd.result);return;}
      const im=new Image();
      im.onerror=()=>toast('이미지를 열지 못했어요');
      im.onload=()=>{
        const k=Math.min(1,1600/Math.max(im.naturalWidth,im.naturalHeight));
        const c=document.createElement('canvas'); c.width=Math.max(1,Math.round(im.naturalWidth*k)); c.height=Math.max(1,Math.round(im.naturalHeight*k));
        c.getContext('2d').drawImage(im,0,0,c.width,c.height);
        done(c.toDataURL(f.type==='image/jpeg'?'image/jpeg':'image/png',0.9));
      };
      im.src=rd.result;
    };
    rd.readAsDataURL(f);
  });
  pane.querySelectorAll('[data-bclear]').forEach(b=>b.onclick=()=>{
    const r=b.closest('.ad-brand'); delete r.dataset.uri; r.querySelector('[data-bfname]').textContent='';
    r.querySelectorAll('input[data-bk]').forEach(i=>i.value='');
    r.querySelector('.ad-samp-thumb').classList.remove('filled');
    r.querySelector('.ad-samp-thumb').innerHTML=`<span>${+b.dataset.bclear+1}</span>`;
    repaint();
  });
  repaint();
}
/* ---------- 탭4: 색상 가이드라인 ---------- */
function adminRangeBarsHTML(v,ref){
  const mid=Math.round(ref.h);
  const hueStops=[]; for(let i=0;i<=36;i++) hueStops.push(`${hsb2hex(i*10,65,90)} ${(i/36*100).toFixed(1)}%`);
  const spans=v.hue.map(([a,b])=>a<=b?[[a,b]]:[[a,360],[0,b]]).flat().sort((x,y)=>x[0]-y[0]);
  let cur=0,hueMasks='';
  spans.forEach(([a,b])=>{if(a>cur)hueMasks+=`<span class="mask" style="left:${cur/3.6}%;width:${(a-cur)/3.6}%"></span>`;cur=b;});
  if(cur<360)hueMasks+=`<span class="mask" style="left:${cur/3.6}%;width:${(360-cur)/3.6}%"></span>`;
  hueMasks+=v.hue.map(([a,b])=>a<=b
    ?`<span class="win" style="left:${a/3.6}%;width:${(b-a)/3.6}%"></span>`
    :`<span class="win" style="left:${a/3.6}%;width:${(360-a)/3.6}%"></span><span class="win" style="left:0%;width:${b/3.6}%"></span>`).join('');
  const sGrad=[0,25,50,75,100].map(x=>hsb2hex(mid,x,Math.max(ref.b,45))).join(',');
  const bGrad=[0,25,50,75,100].map(x=>hsb2hex(mid,Math.max(ref.s,30),x)).join(',');
  const mini=(grad,lo,hi,dot)=>`<div class="rb" style="background:linear-gradient(90deg,${grad})">
    <span class="mask" style="left:0;width:${lo}%"></span><span class="mask" style="left:${hi}%;width:${100-hi}%"></span>
    <span class="win" style="left:${lo}%;width:${hi-lo}%"></span><span class="dot" style="left:${dot}%;background:${ref.hex}"></span></div>`;
  return `
    <div class="rb-label"><span>색상</span><span class="val">허용 ${v.hue.map(([a,b])=>a+'°–'+b+'°').join(' · ')}</span></div>
    <div class="rb" style="background:linear-gradient(90deg,${hueStops.join(',')})">${hueMasks}<span class="dot" style="left:${ref.h/3.6}%;background:${ref.hex}"></span></div>
    <div class="rb-label" style="margin-top:12px"><span>채도</span><span class="val">허용 ${v.sat[0]}–${v.sat[1]}</span></div>${mini(sGrad,v.sat[0],v.sat[1],ref.s)}
    <div class="rb-label" style="margin-top:12px"><span>명도</span><span class="val">허용 ${v.bri[0]}–${v.bri[1]}</span></div>${mini(bGrad,v.bri[0],v.bri[1],ref.b)}`;
}
function readColorForm(){
  const g=k=>document.querySelector(`#adminColorPane [data-k="${k}"]`).value;
  const hue=[[+g('h1a'),+g('h1b')]];
  if(g('h2a')!==''&&g('h2b')!=='') hue.push([+g('h2a'),+g('h2b')]);
  return {adj:g('adj'),sub:g('sub'),hue,sat:[+g('s0'),+g('s1')],bri:[+g('b0'),+g('b1')],scheme:g('scheme'),note:g('note'),forbid:g('forbid')};
}
function colorFormWarnings(v){
  const w=[],ok=n=>Number.isFinite(n)&&n>=0&&n<=360;
  if(!(ok(v.hue[0][0])&&ok(v.hue[0][1])))w.push('색상역 1의 값은 0~360 사이 숫자여야 해요');
  if(v.hue[1]&&!(ok(v.hue[1][0])&&ok(v.hue[1][1])))w.push('색상역 2의 값은 0~360 사이 숫자여야 해요');
  if(!(v.sat[0]>=0&&v.sat[1]<=100&&v.sat[0]<=v.sat[1]))w.push('채도는 0~100 사이, 최소가 최대보다 작아야 해요');
  if(!(v.bri[0]>=0&&v.bri[1]<=100&&v.bri[0]<=v.bri[1]))w.push('명도는 0~100 사이, 최소가 최대보다 작아야 해요');
  return w;
}
function renderColorPreview(v){
  const warns=colorFormWarnings(v);
  $('colorWarn').innerHTML=warns.map(x=>`<div class="ad-warn-line">⚠ ${x}</div>`).join('');
  if(warns.length){$('colorPrevRanges').innerHTML='';$('colorPrevPal').innerHTML='';return;}
  const pal=previewPalette(v,v.scheme), ref=pal[v.scheme==='acc'?2:0];
  $('colorPrevRanges').innerHTML=adminRangeBarsHTML(v,ref);
  $('colorPrevPal').innerHTML=pal.map(c=>`<div class="prev-chip-wrap"><span class="prev-chip" style="background:${c.hex}"></span><em>${c.hex}</em></div>`).join('');
}
function bindColorForm(code){
  document.querySelectorAll('#adminColorPane [data-k]').forEach(el=>el.oninput=()=>renderColorPreview(readColorForm()));
  $('colorApplyBtn').onclick=()=>{
    const v=readColorForm();
    if(colorFormWarnings(v).length){toast('경고를 먼저 해결해 주세요');return;}
    const st=STYLES[code];
    Object.assign(st,{adj:v.adj,sub:v.sub,hue:v.hue,sat:v.sat,bri:v.bri,scheme:v.scheme,note:v.note,forbid:v.forbid});
    if(STY16[code])STY16[code].name=v.adj;
    buildMap();
    const opt=[...$('adminStyleSel').options].find(o=>o.value===code);
    if(opt)opt.textContent=`${v.adj} (${code})`;
    if(curCode===code){curScheme=v.scheme;curAnchor={h:null,s:null,b:null};curLocks=[false,false,false,false,false];curPal=genPalette(STYLES[code],curScheme);renderStyle();}
    markDirty();toast(v.adj+' 색상 가이드라인이 적용됐어요');
  };
}
function renderAdminColor(){
  const code=$('adminStyleSel').value||Object.keys(STYLES)[0];
  const st=STYLES[code], h2=st.hue[1]||['',''];
  $('adminStat').textContent=`${st.adj} · 색상 가이드라인`;
  $('adminColorPane').innerHTML=`
    <div class="ad-color-grid">
      <div class="ad-color-form">
        <label>메인 이름</label><input data-k="adj" value="${st.adj.replace(/"/g,'&quot;')}">
        <label>보조 설명</label><input data-k="sub" value="${st.sub.replace(/"/g,'&quot;')}">
        <div class="ad-row2"><div><label>색상역 1 · 시작°</label><input type="number" min="0" max="360" data-k="h1a" value="${st.hue[0][0]}"></div>
        <div><label>색상역 1 · 끝°</label><input type="number" min="0" max="360" data-k="h1b" value="${st.hue[0][1]}"></div></div>
        <div class="ad-row2"><div><label>색상역 2 · 시작°<span class="ad-optional">선택</span></label><input type="number" min="0" max="360" data-k="h2a" value="${h2[0]}"></div>
        <div><label>색상역 2 · 끝°<span class="ad-optional">선택</span></label><input type="number" min="0" max="360" data-k="h2b" value="${h2[1]}"></div></div>
        <div class="ad-row2"><div><label>채도 최소</label><input type="number" min="0" max="100" data-k="s0" value="${st.sat[0]}"></div>
        <div><label>채도 최대</label><input type="number" min="0" max="100" data-k="s1" value="${st.sat[1]}"></div></div>
        <div class="ad-row2"><div><label>명도 최소</label><input type="number" min="0" max="100" data-k="b0" value="${st.bri[0]}"></div>
        <div><label>명도 최대</label><input type="number" min="0" max="100" data-k="b1" value="${st.bri[1]}"></div></div>
        <label>배색 방식</label>
        <select data-k="scheme">${Object.entries(SCHEMES).map(([k,s])=>`<option value="${k}" ${k===st.scheme?'selected':''}>${s.name} · ${s.easy}</option>`).join('')}</select>
        <label>이렇게 (운용 노트)</label><textarea data-k="note" rows="2">${st.note.replace(/</g,'&lt;')}</textarea>
        <label>피하세요</label><textarea data-k="forbid" rows="2">${(st.forbid||'').replace(/</g,'&lt;')}</textarea>
        <button class="ad-apply" id="colorApplyBtn" style="margin-top:14px">이 스타일에 적용</button>
        <div id="colorWarn"></div>
      </div>
      <div class="ad-color-preview">
        <div class="ad-prev-label">실시간 미리보기</div>
        <div id="colorPrevRanges"></div>
        <div id="colorPrevPal" class="ad-prev-pal"></div>
        <div style="margin-top:16px;padding-top:14px;border-top:1px solid var(--line)">
          <div class="ad-prev-label">추천 폰트 목록 재생성</div>
          <p style="font-size:11px;color:var(--ink2);line-height:1.6;margin-bottom:9px">폰트 탭(목록·분류)에서 16유형 태그나 오류 플래그를 바꾼 뒤 누르면, 결과창의 추천 8종을 다시 채웁니다.</p>
          <button class="ad-apply" onclick="rebuildFontmapFromDB()">추천 목록 갱신</button>
        </div>
      </div>
    </div>`;
  bindColorForm(code);
  renderColorPreview(readColorForm());
  // v2.19.0: 컬러 사용 비율(모든 코어 공통) — 합계 100이어야 저장되고, 비워 두면 결과 화면에 바를 그리지 않는다
  const cur=colorRatioCfg()||['','','',''];
  const box=document.createElement('div'); box.className='ad-ratio-box';
  box.innerHTML=`<div class="ad-prev-label">컬러 사용 비율 <span style="font-weight:500;color:var(--ink3)">· 모든 코어 공통 · 합계 100% · 결과 화면 「색상 조합」 아래 비율 바</span></div>
    <div class="ad-ratio-row">${COLOR_ROLE_NAMES.map((n,i)=>`<label>${n}<input type="number" min="0" max="100" step="1" data-ratio="${i}" value="${cur[i]}" placeholder="%"></label>`).join('')}
      <span class="ad-ratio-sum" id="ratioSum"></span></div>
    <div class="ad-ratio-prev" id="ratioPrev"></div>
    <div class="mq-btnrow" style="margin-top:8px"><button type="button" class="chip-btn solid" id="ratioApply">비율 적용</button><button type="button" class="chip-btn" id="ratioClear">비우기(바 숨김)</button></div>
    <p style="font-size:11px;color:var(--ink2);line-height:1.6;margin-top:6px">디자인에서 확정한 수치만 입력하세요. 값이 비어 있거나 합계가 100이 아니면 고객 화면에는 비율 바가 나오지 않아요.</p>`;
  $('adminColorPane').appendChild(box);
  const vals=()=>[...box.querySelectorAll('[data-ratio]')].map(i=>i.value===''?NaN:+i.value);
  const paint=()=>{
    const v=vals(), ok=v.every(isFinite), sum=ok?Math.round(v.reduce((a,b)=>a+b,0)*100)/100:null;
    $('ratioSum').textContent=ok?`합계 ${sum}%`:'모든 칸을 입력해 주세요'; $('ratioSum').style.color=(ok&&sum===100)?'#2E7D4F':'#B3452F';
    const pal=genPalette(st,st.scheme);
    const saved=(MBCI.settings||{}).colorRatio; MBCI.settings=MBCI.settings||{};
    $('ratioPrev').innerHTML=(ok&&sum===100)?(()=>{MBCI.settings.colorRatio=v;const h=colorRatioHTML(pal);MBCI.settings.colorRatio=saved;return h;})():'';
  };
  box.querySelectorAll('[data-ratio]').forEach(i=>i.oninput=paint); paint();
  $('ratioApply').onclick=()=>{
    const v=vals(); const sum=Math.round(v.reduce((a,b)=>a+b,0)*100)/100;
    if(!v.every(x=>isFinite(x)&&x>=0)||sum!==100){toast('네 값을 모두 입력하고 합계를 100으로 맞춰 주세요');return;}
    MBCI.settings=MBCI.settings||{}; MBCI.settings.colorRatio=v; markDirty();
    if(curCode)renderStyle(); renderAdminColor(); toast('컬러 사용 비율을 적용했어요');
  };
  $('ratioClear').onclick=()=>{ if(MBCI.settings)delete MBCI.settings.colorRatio; markDirty(); if(curCode)renderStyle(); renderAdminColor(); toast('비율 바를 숨겼어요'); };
}
function adminClose(){
  if(!guardLeave())return;
  exitAdminMode();
  window.close();            // 새 창이면 닫히고, 같은 탭이면 진단 화면으로 복귀
  $('intro').classList.remove('hidden');
  requestAnimationFrame(()=>$('intro').classList.add('show'));
}
window.addEventListener('beforeunload',e=>{
  // v14.0: 관리자 미저장 변경 + 세션 한정 업로드 로고를 함께 경고
  const dirtyAdmin=document.body.classList.contains('admin-mode')&&adminDirty;
  if(dirtyAdmin||userLogoActive()){e.preventDefault();e.returnValue='';}
});
/* ============================================================
   v0.15.0 웹 배포판 — 데이터 저장 방식 전환
   단일 HTML을 다시 굽는 방식은 정적 호스팅에서 쓸 수 없다.
   대신 화면에서 편집한 데이터를 assets/data/bsm-data.js 와
   똑같은 형태로 내려받아, 서버의 같은 파일을 덮어쓰면 반영된다.
   ============================================================ */
function currentDataObject(){
  return {__meta:{version:APP_VERSION,exportedAt:new Date().toISOString(),
                  fonts:FONT_DB.length,mockups:Object.keys(MOCKUP_IMGS).length},
    FONT_DB,ALGO16,ALGO_META,...(FONT_ALGO?{FONT_ALGO}:{}),STY16,STYLES,STYLE_SAMPLES,CLS_SAMPLE,FONTMAP:Object.fromEntries(Object.entries(FONTMAP).map(([k,v])=>[k,{...v,fonts:(v.fonts||[]).filter(f=>!f.added)}])),MOCKUP_IMGS,MBCI_TEST:MBCI,SITE_META};   // v2.32.0: 화면에서 임시로 추가한 폰트(added)는 저장 데이터에 넣지 않는다
}
function saveHtmlFile(){ exportDataFile(); }      // 기존 호출부 호환

/* v0.17.0: 깃허브 등 정적 호스팅에 그대로 올릴 수 있는 폴더 전체를 .zip으로 내보낸다.
   index.html · app.js · app.css · 기존 이미지는 서버에 이미 있는 원본을 그대로 담고,
   바뀌는 것(데이터·새로 올린 이미지·버전 표시)만 새로 만들어 넣는다. */
function loadJSZip(){
  // v0.17.0: CDN 의존을 없애기 위해 압축 라이브러리를 assets/js/에 함께 배포한다 (오프라인·사내망에서도 동작)
  if(window.JSZip)return Promise.resolve(window.JSZip);
  return new Promise((res,rej)=>{
    const s=document.createElement('script');
    s.src='assets/js/jszip.min.js';
    s.onload=()=>res(window.JSZip);
    s.onerror=()=>rej(new Error('압축 라이브러리(assets/js/jszip.min.js)를 불러오지 못했어요'));
    document.head.appendChild(s);
  });
}
/* 세션 중 새로 올린 이미지(data: URI)를 실제 파일로 뽑아내고, 데이터의 참조를
   파일 경로로 바꿔 bsm-data.js가 커지지 않게 한다. */
function extractDataUris(obj){
  const files=[]; let n=0;
  const put=(uri,dir,stem)=>{
    const m=/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/.exec(uri);
    if(!m)return uri;
    const ext=m[1].replace('jpeg','jpg').replace('svg+xml','svg');
    const bin=atob(m[2]); const arr=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++)arr[i]=bin.charCodeAt(i);
    n++;
    const path=`${dir||'assets/img/mockups'}/${stem||'upload'}-${Date.now().toString(36)}-${n}.${ext}`;
    files.push({path,bytes:arr});
    return path;
  };
  Object.values(obj.MOCKUP_IMGS).forEach(v=>{
    if(v.src&&v.src.startsWith('data:'))v.src=put(v.src);
    if(Array.isArray(v.layers))v.layers=v.layers.map(u=>(u&&u.startsWith('data:'))?put(u):u);
  });
  // v2.19.0: 참고 브랜드 로고(관리자에서 올린 파일) → assets/img/brands/{코어}-{번호}-{시각}.{확장자}
  Object.entries((obj.MBCI_TEST&&obj.MBCI_TEST.results)||{}).forEach(([code,r])=>(r.refBrands||[]).forEach((b,i)=>{
    if(b&&b.logo&&b.logo.url&&b.logo.url.startsWith('data:'))b.logo.url=put(b.logo.url,'assets/img/brands',code+'-'+(i+1));
  }));
  // v2.19.0: 질문 이미지 → assets/img/questions/{문항ID}-{시각}.{확장자} (선택지 이미지는 폐지)
  ((obj.MBCI_TEST&&obj.MBCI_TEST.questions)||[]).forEach(q=>{
    if(q.image&&q.image.src&&q.image.src.startsWith('data:'))q.image.src=put(q.image.src,'assets/img/questions',q.id);
  });
  // v2.23.0: CTA 이미지(1장) → assets/img/cta/cta-{시각}.{확장자}   (옛 절차 이미지는 더 이상 쓰지 않으므로 데이터에서 뺀다)
  if(obj.SITE_META&&obj.SITE_META.cta){
    delete obj.SITE_META.cta.steps;
    const ci=obj.SITE_META.cta.image;
    if(ci&&ci.src&&ci.src.startsWith('data:'))ci.src=put(ci.src,'assets/img/cta','cta');
  }
  return files;
}
/* v0.18.0: 파일을 그대로 열었을 때(file://)는 브라우저가 자신의 파일을 fetch()로
   읽는 것 자체를 막기 때문에 이 기능이 항상 실패한다 — 원인을 짐작하기 어려운
   "app.js를 담지 못했어요" 경고 대신, 원인과 해결책을 바로 알려준다. */
async function fetchWithRetry(url,tries){
  tries=tries||3; let lastErr=null;
  for(let i=0;i<tries;i++){
    try{
      const bust=url+(url.indexOf('?')>-1?'&':'?')+'_r='+Date.now()+i;
      const r=await fetch(bust,{cache:'no-store'});
      if(r.ok)return r;
      lastErr=new Error('HTTP '+r.status);
    }catch(e){ lastErr=e; }
    if(i<tries-1)await new Promise(res=>setTimeout(res,250*(i+1)));
  }
  throw lastErr||new Error('알 수 없는 오류');
}
/* ================= v2.21.0 내보내기 — 고객용 파일 + 관리자 저장본 =================
   이 관리자 폴더는 그 자체로 완결된 사이트(고객 화면 + 관리자)다. 내보내기는 이 폴더의 파일과 이번 편집 내용으로
   한 번에 두 묶음을 만든다.
     customer/    → 고객용 GitHub 저장소에 올릴 내용물 (관리자 HTML·스크립트·비밀번호·시트 ID 없음, 담기 전에 검사)
     admin-sync/  → 이 관리자 저장소에 덮어쓸 내용물 (편집한 데이터·새 이미지·질문 이력). 다음 관리자 세션이 이어서 시작하게 한다.
   지원 파일: apps-script/QUESTION_MAP.txt (수신 코드의 선택적 재검산 설정값), 읽어주세요.txt */
const CUSTOMER_STATIC=['site.webmanifest','assets/css/app.css','assets/js/app.js','assets/js/record.js'];
/* v2.32.2: 관리자 저장소에 site.webmanifest 를 올리지 않았어도 내보내기가 멈추지 않도록 같은 내용의 기본값을 내장한다 */
const DEFAULT_MANIFEST="{\n  \"name\": \"MBCI — Markinfo Brand Core Indicator\",\n  \"short_name\": \"MBCI\",\n  \"description\": \"간단한 질문으로 내 브랜드의 코어 이미지를 진단하세요 — 마크인포\",\n  \"start_url\": \"./\",\n  \"display\": \"standalone\",\n  \"background_color\": \"#F4F8F6\",\n  \"theme_color\": \"#12B97E\",\n  \"icons\": [\n    {\n      \"src\": \"assets/img/brand/favicon-192.png\",\n      \"sizes\": \"192x192\",\n      \"type\": \"image/png\"\n    },\n    {\n      \"src\": \"assets/img/brand/favicon-512.png\",\n      \"sizes\": \"512x512\",\n      \"type\": \"image/png\",\n      \"purpose\": \"any maskable\"\n    }\n  ]\n}";
const CUSTOMER_BRAND_IMGS=['assets/img/brand/markinfo-logo.webp','assets/img/brand/favicon.ico','assets/img/brand/favicon-16.png','assets/img/brand/favicon-32.png','assets/img/brand/favicon-48.png','assets/img/brand/favicon-180.png','assets/img/brand/favicon-192.png','assets/img/brand/favicon-512.png','assets/img/brand/apple-touch-icon.png','assets/img/og/default.png','assets/img/questions/placeholder.webp','assets/img/cta/steps-default.png'];
const LEDGER_PATH='assets/data/content-versions.json', LEDGER_KEEP=20;
const nextPatch=v=>{const p=String(v).split('.').map(Number);while(p.length<3)p.push(0);p[2]++;return p.join('.');};
/* 검사 — 문제가 있으면 목록을 돌려준다(빈 배열이면 통과) */
function verifyCustomerBundle(files, obj){
  const errs=[], paths=new Set(Object.keys(files));
  ['index.html','version.json','.nojekyll','site.webmanifest','assets/css/app.css','assets/js/app.js','assets/js/record.js','assets/data/bsm-data.js'].forEach(p=>{ if(!paths.has(p))errs.push('필수 파일 누락: '+p); });
  paths.forEach(p=>{ if(/(^|\/)(admin|gas|apps-script|export-template)(\/|$)|admin\.(js|css)$|jszip|\.htaccess$|\.zip$|(^|\/)README|\.md$|content-versions|QUESTION_MAP/i.test(p))errs.push('고객용 폴더에 들어가면 안 되는 파일: '+p); });
  const TOKENS=['prism2026','ADMIN_PW','mbciAdminAuth','adminSec','exportSiteZip','buildExportBundle','openPwModal','gateConsult','enterAdminMode','SHEET_ID','SPREADSHEET_ID','openById','SpreadsheetApp','getSheetById','docs.google.com/spreadsheets','MBCI_ADMIN_PAGE'];
  const SHEETID=/\b1[A-Za-z0-9_-]{43}\b/;
  const dec=new TextDecoder();
  paths.forEach(p=>{
    if(!/\.(html|js|css|json|webmanifest)$/.test(p))return;
    const v=files[p]; const t=typeof v==='string'?v:dec.decode(v);
    TOKENS.forEach(k=>{ if(t.indexOf(k)>-1)errs.push(`금지 문구 「${k}」 발견: ${p}`); });
    if(SHEETID.test(t))errs.push('구글 시트/파일 ID로 보이는 문자열 발견: '+p);
    if(p==='index.html'&&/(admin|jszip)/i.test(t.replace(/<!--[\s\S]*?-->/g,'')))errs.push('index.html 에 관리자 관련 문구가 있습니다');
  });
  const need=new Set(); const add=u=>{ if(u&&typeof u==='string'&&!u.startsWith('data:')&&!/^(https?:)?\/\//i.test(u))need.add(u.split('?')[0]); };
  Object.values(obj.MOCKUP_IMGS||{}).forEach(v=>{add(v.src);(v.layers||[]).forEach(add);});
  (obj.MBCI_TEST.questions||[]).forEach(q=>{ if(q.active!==false)add(q.image&&q.image.src); });
  Object.values(obj.MBCI_TEST.results||{}).forEach(r=>(r.refBrands||[]).forEach(b=>add(b&&b.logo&&b.logo.url)));
  add((((obj.SITE_META||{}).cta||{}).image||{}).src);
  need.forEach(u=>{ if(!paths.has(u))errs.push('데이터가 가리키는 이미지가 폴더에 없음: '+u); });
  const html=typeof files['index.html']==='string'?files['index.html']:'';
  for(const m of html.matchAll(/(?:src|href)="([^"#?]+)(?:\?[^"]*)?"/g)){ const u=m[1]; if(/^(https?:|mailto:|data:)/.test(u)||u==='./'||u.endsWith('/'))continue; if(!paths.has(u))errs.push('index.html 이 가리키는 파일이 폴더에 없음: '+u); }
  const dd=files['assets/data/bsm-data.js']; if(typeof dd==='string'&&/data:image\//.test(dd))errs.push('데이터 파일에 아직 data: 이미지가 남아 있습니다');
  return errs;
}
/* 질문 구성 이력(ledger) — content_version 이 가리키는 구성을 나중에 해석할 수 있게 누적한다 */
function ledgerEntryFromLive(newVer){
  const s=mbciContentSnapshot();
  return {firstExportedAt:new Date().toISOString(), siteVersion:newVer, questionCount:s.questions.length, snapshot:s};
}
function questionMapText(ledger){
  const ents=Object.entries(ledger.versions||{}).sort((a,b)=>String(a[1].firstExportedAt).localeCompare(String(b[1].firstExportedAt))).slice(-LEDGER_KEEP);
  const build=list=>{ const map={}; list.forEach(([cv,e])=>{ map[cv]=e.snapshot.questions.map(q=>{ const A=(q.answers.find(x=>x.id==='A')||{}).pole, B=(q.answers.find(x=>x.id==='B')||{}).pole; return [q.axis,A,B]; }); }); return JSON.stringify(map); };
  let list=ents, t=build(list);
  while(t.length>8500&&list.length>1){ list=list.slice(1); t=build(list); }   // Apps Script 속성 값은 9KB 제한 — 오래된 구성부터 뺀다
  return t;
}
const bytesOfUri=uri=>{ const m=/^data:image\/[a-zA-Z0-9+]+;base64,(.+)$/.exec(uri); if(!m)return null; const bin=atob(m[1]); const arr=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++)arr[i]=bin.charCodeAt(i); return arr; };
/* 번들을 만든다(다운로드·버전 갱신은 하지 않는다). opts.bump===false 면 현재 버전 그대로(기준본 생성용). */
async function buildExportBundle(opts){ try{fontmapRestore();}catch(e){}
  opts=opts||{};
  const failed=[], store={};
  const grab=async(rel,asText,optional)=>{ try{ const r=await fetchWithRetry(rel,optional?1:3); store[rel]=asText?await r.text():await r.arrayBuffer(); return true; }catch(e){ if(!optional)failed.push(rel); return false; } };
  for(const rel of CUSTOMER_STATIC){
    if(rel==='site.webmanifest'){ if(!await grab(rel,true,true))store[rel]=DEFAULT_MANIFEST; continue; }   // v2.32.2: 없으면 내장 기본값 사용
    if(!await grab(rel,true))return {errs:[`${rel} 을(를) 불러오지 못했습니다`]};
  }
  if(!await grab('export-template/customer-index.html',true))return {errs:['export-template/customer-index.html 을(를) 불러오지 못했습니다 — 관리자 폴더에 export-template 폴더가 있는지 확인해 주세요']};
  if(!await grab('index.html',true))return {errs:['관리자 index.html 을(를) 불러오지 못했습니다']};
  const newVer=opts.bump===false?APP_VERSION:nextPatch(APP_VERSION), today=localDateStr();
  let obj=JSON.parse(JSON.stringify(currentDataObject()));
  obj.__meta.version=newVer; obj.__meta.exportedAt=new Date().toISOString(); obj.__meta.buildDate=today;
  const newImgFiles=extractDataUris(obj);
  const cv=mbciContentVersion();
  /* 이력 */
  let ledger={versions:{}};
  if(await grab(LEDGER_PATH,true,true)){ try{ ledger=JSON.parse(store[LEDGER_PATH]); if(!ledger.versions)ledger={versions:{}}; }catch(e){ return {errs:['content-versions.json 형식이 올바르지 않습니다 — 파일을 확인해 주세요(삭제하지 말고 복원)']}; } }
  if(!ledger.versions[cv])ledger.versions[cv]=ledgerEntryFromLive(newVer);
  /* ---- customer ---- */
  const C={};
  C['assets/js/app.js']=store['assets/js/app.js'].replace(/let APP_VERSION='[\d.]+';/, `let APP_VERSION='${newVer}';`).replace(/(?:const|let) BUILD_DATE='[\d-]+';/, `let BUILD_DATE='${today}';`);
  C['assets/js/record.js']=store['assets/js/record.js']; C['assets/css/app.css']=store['assets/css/app.css']; C['site.webmanifest']=store['site.webmanifest'];
  const verQ=h=>h.replace(/(assets\/(?:css\/app\.css|css\/admin\.css|data\/bsm-data\.js|js\/app\.js|js\/admin\.js|js\/record\.js))\?v=[\w.]+/g,`$1?v=${newVer}`);
  let html=verQ(store['export-template/customer-index.html']);
  if(SITE_META.title&&SITE_META.title.trim()){ const tt=esc(SITE_META.title.trim()); html=html.replace(/<title>[^<]*<\/title>/, `<title>${tt}</title>`).replace(/(<meta property="og:title" content=")[^"]*(">)/, `$1${tt}$2`); }
  { const dd=esc(String(SITE_META.desc!=null?SITE_META.desc:DEFAULT_DESC).replace(/\s+/g,' ').trim()||DEFAULT_DESC);   // v2.33.1: 링크 미리보기 문구
    html=html.replace(/(<meta name="description" content=")[^"]*(">)/,`$1${dd}$2`).replace(/(<meta property="og:description" content=")[^"]*(">)/,`$1${dd}$2`); }
  const pub=(SITE_META.publicUrl||'').trim().replace(/#.*$/,'').replace(/index\.html$/,'').replace(/\/?$/,'/');
  if(/^https:\/\//.test(pub)){ html=html.replace(/(<meta property="og:image" content=")[^"]*(">)/,`$1${pub}assets/img/og/default.png$2`); if(!/property="og:url"/.test(html))html=html.replace(/(<meta property="og:image" )/,`<meta property="og:url" content="${pub}">\n$1`); }
  C['index.html']=html;
  /* 이미지 */
  const EXIST=new Set(CUSTOMER_BRAND_IMGS);
  const keep=u=>{ if(u&&!u.startsWith('data:')&&!/^(https?:)?\/\//i.test(u))EXIST.add(u.split('?')[0]); };
  Object.values(obj.MOCKUP_IMGS).forEach(v=>{keep(v.src);(v.layers||[]).forEach(keep);});
  obj.MBCI_TEST.questions.forEach(q=>keep(q.image&&q.image.src));
  Object.values(obj.MBCI_TEST.results||{}).forEach(r=>(r.refBrands||[]).forEach(b=>keep(b.logo&&b.logo.url)));
  keep((((obj.SITE_META||{}).cta||{}).image||{}).src);
  const added={}; newImgFiles.forEach(f=>{added[f.path]=f.bytes;});
  const replaced={};   // 파비콘·썸네일처럼 같은 경로를 덮어쓰는 파일
  if(SITE_META.ogImageSrc){ const b=bytesOfUri(SITE_META.ogImageSrc); if(b)replaced['assets/img/og/default.png']=b; }
  if(SITE_META.faviconSrc){ const b=bytesOfUri(SITE_META.faviconSrc); if(b)['favicon-32.png','favicon-192.png','apple-touch-icon.png'].forEach(n=>replaced['assets/img/brand/'+n]=b); }
  for(const rel of EXIST){ if(added[rel]||replaced[rel])continue; await grab(rel,false); C[rel]=store[rel]; }
  Object.assign(C,added,replaced);
  obj.SITE_META=Object.assign({},obj.SITE_META); delete obj.SITE_META.faviconSrc; delete obj.SITE_META.ogImageSrc;
  const dataJs='/* MBCI (Markinfo Brand Core Indicator) — 데이터 파일\n   생성: '+new Date().toISOString()+' · 버전 v'+newVer+' · 질문 구성 '+cv+'\n   글꼴 '+FONT_DB.length+'종 · 목업 '+Object.keys(MOCKUP_IMGS).length+'개 */\nwindow.BSM_DATA = '+JSON.stringify(obj)+';\n';
  C['assets/data/bsm-data.js']=dataJs;
  const verJson=JSON.stringify({version:newVer,buildDate:today,contentVersion:cv,fonts:FONT_DB.length,mockups:Object.keys(MOCKUP_IMGS).length,styles:Object.keys(STYLES).length,mbciQuestions:obj.MBCI_TEST.questions.filter(q=>q.active!==false).length,name:'MBCI — Markinfo Brand Core Indicator'},null,2)+'\n';
  C['version.json']=verJson; C['.nojekyll']='';
  /* ---- admin-sync ---- */
  const S={};
  S['assets/data/bsm-data.js']=dataJs; S['version.json']=verJson; S[LEDGER_PATH]=JSON.stringify(ledger,null,1)+'\n';
  S['assets/js/app.js']=C['assets/js/app.js'];
  S['index.html']=verQ(store['index.html']); S['export-template/customer-index.html']=verQ(store['export-template/customer-index.html']);
  Object.assign(S,added,replaced);
  /* ---- 지원 파일 ---- */
  const X={};
  X['apps-script/QUESTION_MAP.txt']=questionMapText(ledger)+'\n';
  X['읽어주세요.txt']=`MBCI 내보내기 v${newVer}  (${today})  질문 구성 ${cv}\n\n`+
`1) customer 폴더의 "내용물"을 고객용 GitHub 저장소에 올립니다. (이 zip 이나 customer 폴더 자체를 올리지 마세요)\n`+
`2) admin-sync 폴더의 "내용물"을 관리자 GitHub 저장소에 덮어씁니다. (그래야 다음에 관리자를 열 때 방금 편집한 상태에서 이어집니다)\n`+
`3) apps-script/QUESTION_MAP.txt 는 선택 사항입니다. 질문·선택지를 바꿨다면, 수신 코드(Apps Script)의 스크립트 속성 QUESTION_MAP 값을 이 파일 내용으로 교체하면 서버가 점수를 다시 검산합니다.\n`+
`자세한 순서는 docs 폴더의 설명서를 보세요.\n`;
  const errs=verifyCustomerBundle(C,obj).concat(failed.map(f=>'가져오지 못한 파일: '+f));
  Object.keys(added).forEach(p=>{ if(!(p in S))errs.push('관리자 저장본에 새 이미지가 빠짐: '+p); });
  return {errs, version:newVer, contentVersion:cv, obj, customer:C, adminSync:S, extra:X};
}
async function bundleToZip(b,JSZipLib){
  const zip=new JSZipLib(), root=`mbci-export-v${b.version}`;
  const put=(dir,files)=>Object.keys(files).forEach(p=>{ if(!p.endsWith('/'))zip.file(`${root}/${dir}${p}`,files[p]); });
  put('customer/',b.customer); put('admin-sync/',b.adminSync); put('',b.extra);
  return {zip,root};
}
async function exportSiteZip(){
  if(!mbciExportGuard())return;
  if(location.protocol==='file:'){
    alert('이 기능은 파일을 더블클릭해 열었을 때(file://)는 사용할 수 없습니다.\n\n'
      +'관리자 폴더를 GitHub Pages 에 올려 주소(https://…)로 열거나, 폴더 안의 「관리자 시작」 파일을 실행해 http://localhost:8080 으로 접속해 주세요.');
    return;
  }
  const rec=(SITE_META.recordUrl||'').trim();
  if(rec&&!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(rec)){ alert('「결과 기록 주소」 형식이 올바르지 않습니다.\n관리자 → 일반 에서 확인해 주세요.\n(https://script.google.com/macros/s/…/exec)'); return; }
  let back;
  try{ back=JSON.parse(JSON.stringify(currentDataObject())); }catch(e){ alert('데이터 직렬화에 실패했습니다: '+e.message); return; }
  const curErr=FONT_DB.filter(f=>f.wfError).length, bakErr=back.FONT_DB.filter(f=>f.wfError).length;
  if(back.FONT_DB.length!==FONT_DB.length||curErr!==bakErr||Object.keys(back.MOCKUP_IMGS).length!==Object.keys(MOCKUP_IMGS).length){
    alert(`내보내기 검증 실패 — 글꼴 ${FONT_DB.length}종/오류 ${curErr}건이 내보낼 데이터(${back.FONT_DB.length}종/${bakErr}건)와 다릅니다.\n저장을 중단했습니다.`); return;
  }
  toast('내보내기 파일을 준비하고 있어요…');
  let JSZipLib;
  try{ JSZipLib=await loadJSZip(); }catch(e){ alert('압축 라이브러리를 불러오지 못했어요. assets/js/jszip.min.js 가 있는지 확인해 주세요.'); return; }
  try{
    const b=await buildExportBundle({bump:true});
    if(b.errs&&b.errs.length){
      console.error('[내보내기] 검사 실패',b.errs);
      alert('내보내기 검사에서 문제가 발견되어 내려받기를 중단했습니다.\n(버전은 올리지 않았습니다)\n\n'+b.errs.slice(0,10).join('\n')+(b.errs.length>10?`\n…외 ${b.errs.length-10}건 (콘솔 확인)`:''));
      return;
    }
    const {zip}=await bundleToZip(b,JSZipLib);
    const blob=await zip.generateAsync({type:'blob'});
    const a=document.createElement('a'); a.download=`mbci-export-v${b.version}.zip`;
    a.href=URL.createObjectURL(blob); a.click();
    setTimeout(()=>URL.revokeObjectURL(a.href),8000);
    APP_VERSION=b.version; BUILD_DATE=localDateStr(); paintVersion(); clearDirty();
    toast(`v${b.version} 내보내기 zip 을 내려받았어요 — 압축을 풀어 customer·admin-sync 내용물을 각각 올리세요`);
  }catch(e){
    console.error(e); alert('내보내기 중 오류가 발생해 중단했습니다 (버전은 올리지 않았습니다).\n'+e.message);
  }
}
function mbciExportGuard(){
  const v=validateMbci();
  if(v.errors.length){
    alert('MBCI 질문 데이터에 오류가 있어 내보낼 수 없습니다.\n\n'+v.errors.slice(0,8).join('\n')+(v.errors.length>8?`\n…외 ${v.errors.length-8}건`:'')+'\n\n관리자 「MBCI 질문 관리」 탭에서 확인해 주세요.');
    return false;
  }
  return true;
}
function exportDataFile(){
  if(!mbciExportGuard())return;
  let obj;
  try{ obj=currentDataObject(); }
  catch(e){ alert('데이터를 모으는 중 오류가 발생했습니다: '+e.message); return; }
  // 내보내기 검증 — 직렬화 후 되읽어 폰트 수·오류 플래그 수가 같은지 확인한다
  let text, back;
  try{
    text=JSON.stringify(obj);
    back=JSON.parse(text);
  }catch(e){ alert('데이터 직렬화에 실패했습니다: '+e.message); return; }
  const curErr=FONT_DB.filter(f=>f.wfError).length;
  const bakErr=back.FONT_DB.filter(f=>f.wfError).length;
  if(back.FONT_DB.length!==FONT_DB.length||curErr!==bakErr||
     Object.keys(back.MOCKUP_IMGS).length!==Object.keys(MOCKUP_IMGS).length){
    alert(`내보내기 검증 실패 — 글꼴 ${FONT_DB.length}종/오류 ${curErr}건이 내보낼 데이터(${back.FONT_DB.length}종/${bakErr}건)와 다릅니다.\n저장을 중단했습니다.`);
    return;
  }
  const newVer=bumpVersion();
  obj.__meta.version=newVer;
  const body='/* MBCI (Markinfo Brand Core Indicator) — 데이터 파일\n'
    +'   생성: '+new Date().toISOString()+' · 버전 v'+newVer+'\n'
    +'   이 파일을 서버의 assets/data/bsm-data.js 위에 덮어쓰면 반영됩니다.\n'
    +'   글꼴 '+FONT_DB.length+'종 · 목업 '+Object.keys(MOCKUP_IMGS).length+'개 */\n'
    +'window.BSM_DATA = '+JSON.stringify(obj)+';\n';
  const a=document.createElement('a');
  a.download='bsm-data.js';
  a.href=URL.createObjectURL(new Blob([body],{type:'text/javascript'}));
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),4000);
  clearDirty();
  toast(`v${newVer} 데이터 파일을 내려받았어요 — 서버의 bsm-data.js를 덮어쓰세요`);
}
/* 내려받은 bsm-data.js(또는 JSON)를 현재 화면으로 되돌려 넣기 */
function importDataFile(inp){
  const f=inp.files&&inp.files[0]; inp.value='';
  if(!f)return;
  const r=new FileReader();
  r.onload=()=>{
    let txt=String(r.result).trim();
    try{
      const m=txt.match(/window\.BSM_DATA\s*=\s*([\s\S]*?);?\s*$/);
      const obj=JSON.parse(m?m[1]:txt);
      const need=['FONT_DB','STYLES','STY16','FONTMAP','MOCKUP_IMGS'];
      const miss=need.filter(k=>!obj[k]);
      if(miss.length){alert('데이터 파일이 아닙니다 — 없는 항목: '+miss.join(', '));return;}
      if(obj.MBCI_TEST!==undefined){
        const me=mbciSchemaErrors(obj.MBCI_TEST);
        if(me.length){alert('MBCI 질문 데이터 형식이 올바르지 않아 불러오지 않았습니다. 현재 데이터는 그대로 유지됩니다.\n\n'+me.slice(0,6).join('\n'));return;}
      }
      if(!confirm(`불러오면 현재 화면의 데이터를 덮어씁니다.\n\n글꼴 ${obj.FONT_DB.length}종 · 목업 ${Object.keys(obj.MOCKUP_IMGS).length}개\n버전 ${(obj.__meta&&obj.__meta.version)||'미기재'}\n\n계속할까요?`))return;
      Object.keys(BSM_DATA).forEach(k=>{ if(obj[k]!==undefined)replaceData(k,obj[k]); });
      // v0.19.1: 심각한 버그 수정 — 여기서 location.reload()를 부르면 서버의 정적 파일은
      // 그대로이므로 방금 불러온 내용이 전부 사라지고 예전 데이터로 되돌아간다.
      // 새로고침 없이 화면만 다시 그린다.
      afRepWorking=[];
      mqSel=null; mqDraft=null; mqSimAns={}; resetQ();
      if(obj.MBCI_TEST===undefined)toast('예전 형식 파일이라 MBCI 질문은 현재 값을 유지했어요');
      initAdminSelects();
      if(curCode){curFontIdx=0;renderStyle();}
      if(document.body.classList.contains('admin-mode')){
        if(adminTab==='fonts')renderFontList();
        else if(adminTab==='classify'){clsIdx=Math.min(clsIdx,FONT_DB.length-1);renderClassify();}
        else if(adminTab==='mockup'){amCurId=null;renderAdminMockup();}
        else if(adminTab==='mbci')renderAdminMbci();
        else setAdminTab(adminTab);
      }
      clearDirty();
      syncFontmapAttrs();
      toast(`데이터를 불러왔어요 · 글꼴 ${obj.FONT_DB.length}종 · 목업 ${Object.keys(obj.MOCKUP_IMGS).length}개`);
    }catch(e){ alert('읽을 수 없는 파일입니다: '+e.message); }
  };
  r.readAsText(f);
}
/* 데이터 객체는 const로 잡혀 있으므로 내용만 갈아 끼운다 */
function replaceData(key,val){
  const tgt=BSM_DATA[key];
  if(Array.isArray(tgt)&&Array.isArray(val)){tgt.length=0;val.forEach(v=>tgt.push(v));}
  else if(tgt&&typeof tgt==='object'){Object.keys(tgt).forEach(k=>delete tgt[k]);Object.assign(tgt,val);}
  else BSM_DATA[key]=val;
}
/* 관리자 스크롤 시 우하단 '맨 위로' 버튼 */
(function(){
  const b=document.createElement('button');b.id='toTopBtn';b.title='맨 위로';b.textContent='↑';
  b.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});
  document.body.appendChild(b);
  window.addEventListener('scroll',()=>{
    b.classList.toggle('show',document.body.classList.contains('admin-mode')&&window.scrollY>420);
  },{passive:true});
})();
/* v2.1.0: 관리자 「결과」 탭에서 복사한 공유 링크(#/core/ESTJ)를 직접 열었을 때
   테스트 없이 그 결과를 바로 보여준다. 왼쪽은 안내 카드로 대체하고, 오른쪽은 평소와 같은 결과 패널을 쓴다. */
/* ================= v2.11.0 상담용 페이지 — 질문 없이 축을 슬라이더로 직접 조절해 원하는 Core ID를 만든다 ================= */
function enterConsultMode(){
  document.body.classList.add('consult-mode');
  showApp();
  const stage=$('qStage'), gauges=$('mbciGauges'), cp=$('consultPanel');
  if(stage)stage.classList.add('hidden');
  if(gauges)gauges.classList.add('hidden');
  if(cp)cp.classList.remove('hidden');
  if(mbciResult&&!csOrig){   // 같은 화면에서 테스트를 마친 결과가 있으면 그 값을 출발점이자 「원본」으로 쓴다
    const ar={...mbciResult.axisResult,...mbciTieFix}; csOrig={};
    mbciAxes().forEach(a=>{const r=mbciResult.scores[a.right.code]; csOrig[a.id]=csSnap(isFinite(r)?r:50); consultVals[a.id]=csOrig[a.id]; if(!ar[a.id])consultVals[a.id]=50;});
  }
  mbciAxes().forEach(a=>{ if(consultVals[a.id]===undefined)consultVals[a.id]=50; });
  renderConsultPanel();
}
/* v2.19.0: 상담 수동 조정 결과 — 슬라이더 값(우측 극 %, 5% 단위)으로 만든 결과. 테스트 응답에서 나온 원본(csOrig)과 구분해서 표시한다.
   방향 = 50%를 넘는 쪽, 강도(Core ID 점수) = round(우세 % ÷ 10)  (환산 규칙은 20문항 채점의 1점 = 10%와 같다) */
let csOrig=null;   // 같은 화면에서 테스트를 마치고 왔다면 그 응답의 원본 값 {축ID: 우측 극 %}
function consultStrength(v){return Math.min(9,Math.round(Math.max(v,100-v)/10));}
function consultIsManual(){
  if(!csOrig)return true;   // 원본이 없으면 전부 수동 입력
  return mbciAxes().some(a=>(consultVals[a.id]!==undefined?consultVals[a.id]:50)!==csOrig[a.id]);
}
function consultResult(){
  const axisResult={}, scores={}, weight={};
  mbciAxes().forEach(a=>{
    const v=consultVals[a.id]!==undefined?consultVals[a.id]:50;
    axisResult[a.id]=v<=50?a.left.code:a.right.code;
    scores[a.left.code]=100-v; scores[a.right.code]=v;
    weight[a.id]=consultStrength(v);
  });
  const order=MBCI.codeOrder||mbciAxes().map(a=>a.id);
  return {resultCode:order.map(id=>axisResult[id]).join(''),axisResult,scores,qScores:{},ties:[],confidence:{},weight,bonus:{},
    coreId:order.map(id=>diamondNotation(weight[id])).join('-'),manual:consultIsManual()};
}
function consultCode(){
  const order=MBCI.codeOrder||mbciAxes().map(a=>a.id);
  return order.map(id=>{
    const a=mbciAxis(id), v=consultVals[id]!==undefined?consultVals[id]:50;
    return v<=50?a.left.code:a.right.code;
  }).join('');
}
const CS_STEP=5;
const csSnap=v=>Math.max(0,Math.min(100,Math.round((+v||0)/CS_STEP)*CS_STEP));
let csRaf=0;
function csRefresh(){
  const cp=$('consultPanel'); if(!cp)return;
  mbciAxes().forEach(a=>{
    const v=consultVals[a.id]!==undefined?consultVals[a.id]:50, row=cp.querySelector(`.cs-row[data-axis="${a.id}"]`);
    if(!row)return;
    const winLeft=v<=50;
    row.querySelector('.cs-h-l').classList.toggle('win',winLeft);
    row.querySelector('.cs-h-r').classList.toggle('win',!winLeft);
    row.querySelector('.cs-pl').classList.toggle('win',winLeft);
    row.querySelector('.cs-pr').classList.toggle('win',!winLeft);
    const sl=row.querySelector('.cs-slider'); if(+sl.value!==v)sl.value=v;
    const nl=row.querySelector('.cs-num-l'), nr=row.querySelector('.cs-num-r');
    if(document.activeElement!==nl)nl.value=100-v;
    if(document.activeElement!==nr)nr.value=v;
    const info=row.querySelector('.cs-info');
    if(info){
      const o=csOrig?csOrig[a.id]:null, changed=o===null||o!==v, win=winLeft?a.left.code:a.right.code;
      info.innerHTML=`<span class="cs-i-orig">${o===null?'테스트 원본 없음':`테스트 원본 ${a.left.code} ${100-o}% : ${a.right.code} ${o}%`}</span>
        <span class="cs-i-cur">조정값 ${a.left.code} ${100-v}% : ${a.right.code} ${v}%</span>
        <span class="cs-i-dir">방향 <b>${win}</b> · 강도 <b>${consultStrength(v)}</b></span>
        ${changed?'<em class="cs-manual">수동 조정</em>':'<em class="cs-orig">원본 그대로</em>'}`;
    }
  });
  const cr=consultResult();
  const d=cp.querySelector('.cs-code-display');
  if(d)d.innerHTML=`<span>예상 결과</span> <b>${esc(cr.resultCode)}</b> <span class="cs-cid">${esc(cr.coreId)}</span> ${cr.manual?'<em class="cs-manual">수동 조정 결과</em>':'<em class="cs-orig">테스트 원본 결과</em>'}`;
  window.MBCI_LAST_RESULT={resultCode:cr.resultCode,axisResult:cr.axisResult,scores:cr.scores,manual:cr.manual};
  cancelAnimationFrame(csRaf);
  csRaf=requestAnimationFrame(()=>{const code=consultCode();renderBrandCoreResult(code,code);});
}
function renderConsultPanel(){
  const cp=$('consultPanel'); if(!cp)return;
  const rows=mbciAxes().map(a=>{
    const v=consultVals[a.id]!==undefined?consultVals[a.id]:50;
    return `<div class="cs-row" data-axis="${a.id}">
      <div class="cs-row-h">
        <span class="cs-h-l">${esc(a.left.label)} <b>${esc(a.left.code)}</b></span>
        <b class="cs-axname">${esc(a.name)}</b>
        <span class="cs-h-r"><b>${esc(a.right.code)}</b> ${esc(a.right.label)}</span>
      </div>
      <input type="range" class="cs-slider" min="0" max="100" step="${CS_STEP}" value="${v}" data-axis="${a.id}" aria-label="${esc(a.name)} 비율 조절">
      <div class="cs-info"></div>
      <div class="cs-pct">
        <span class="cs-pl"><input type="number" class="cs-num cs-num-l" min="0" max="100" step="${CS_STEP}" inputmode="numeric" value="${100-v}" aria-label="${esc(a.left.code)} 비율(%)">%</span>
        <span class="cs-pr"><input type="number" class="cs-num cs-num-r" min="0" max="100" step="${CS_STEP}" inputmode="numeric" value="${v}" aria-label="${esc(a.right.code)} 비율(%)">%</span>
      </div>
    </div>`;
  }).join('');
  cp.innerHTML=`<div class="cs-head"><b>상담용 페이지</b><span>각 축을 슬라이더(5% 단위)로 조절하거나, 숫자를 직접 입력해 원하는 Core ID를 만들어 보세요</span><a class="cs-home-link" href="./">← 일반 테스트로</a></div>
    <div class="cs-sliders">${rows}</div>
    <div class="cs-code-display"></div>
    <div class="cs-brand">
      <label class="af-l">브랜드 이름</label><input class="af-in" id="csBrandName" value="${esc(brandName||'')}" placeholder="예: 마크인포">
      <label class="af-l" style="margin-top:10px">업종 <span class="ad-optional">목업에 반영돼요</span></label>
      <select class="af-in" id="csBizSel"><option value="">기타 (업종 보정 없음)</option>${BIZ_LIST.map(([k,l])=>`<option value="${k}" ${bizCode===k?'selected':''}>${esc(l)}</option>`).join('')}</select>
    </div>`;
  cp.querySelectorAll('.cs-row').forEach(row=>{
    const id=row.dataset.axis;
    row.querySelector('.cs-slider').oninput=e=>{ consultVals[id]=csSnap(e.target.value); csRefresh(); };
    // 숫자 입력: 입력 중에는 건드리지 않고, 확정(Enter·포커스 이동)될 때 0~100·5% 단위로 맞춘다. 반대쪽은 100에서 뺀 값.
    const commit=(side)=>e=>{
      const raw=e.target.value; if(raw==='')return csRefresh();
      const n=csSnap(raw);
      consultVals[id]=side==='r'?n:100-n; csRefresh();
      e.target.value=side==='r'?consultVals[id]:100-consultVals[id];
    };
    row.querySelector('.cs-num-l').onchange=commit('l');
    row.querySelector('.cs-num-r').onchange=commit('r');
    row.querySelectorAll('.cs-num').forEach(n=>n.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();n.blur();}});
  });
  $('csBrandName').oninput=e=>{ brandName=e.target.value; renderBrandCoreResult(consultCode(), consultCode()); };
  $('csBizSel').onchange=e=>{ bizCode=e.target.value||null; renderBrandCoreResult(consultCode(), consultCode()); };
  csRefresh();
}
setTimeout(()=>{try{autoFlagOnLoad();}catch(e){}},1200);

/* ================= v2.21.0 관리자 부팅 ================= */
Object.assign(window.MBCI_ADMIN,{
  consultResult,
  leave(){ if(!guardLeave())return false; exitAdminMode(); return true; }
});
window.addEventListener('hashchange',()=>{
  if(location.hash==='#consult'&&!document.body.classList.contains('consult-mode'))gateConsult();
  else if(location.hash!=='#consult'&&document.body.classList.contains('consult-mode'))location.reload();
});
(function adminBoot(){
  const go=()=>{ if(location.hash==='#consult')gateConsult(); else tryEnterAdmin(); };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go); else go();
})();
