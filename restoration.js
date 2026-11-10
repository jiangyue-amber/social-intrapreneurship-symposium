const header=document.querySelector('#header');
function measure(){if(header)document.documentElement.style.setProperty('--header-height',header.getBoundingClientRect().height+'px');}
measure();window.addEventListener('resize',measure);
document.querySelectorAll('.header-burger button,.header-burger-btn').forEach(b=>b.addEventListener('click',()=>{const open=document.body.classList.toggle('header--menu-open');b.setAttribute('aria-expanded',open);document.querySelector('.header-menu')?.setAttribute('aria-hidden',!open);}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.body.classList.remove('header--menu-open');});
document.querySelectorAll('.accordion-item__click-target').forEach(b=>b.addEventListener('click',()=>{let open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',open);const item=b.closest('.accordion-item');item.classList.toggle('is-open',open);let panel=document.getElementById(b.getAttribute('aria-controls'));if(panel){panel.style.height=open?'auto':'0px';panel.style.maxHeight=open?'none':'0px';panel.style.opacity=open?'1':'0';panel.style.visibility=open?'visible':'hidden';}}));
document.querySelectorAll('form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();let note=f.querySelector('[role=status]');if(!note){note=document.createElement('p');note.setAttribute('role','status');f.append(note);}note.textContent='This restored contact form is not connected to a delivery service. Your message has not been sent.';}));
// Automatic gallery; all thumbnails remain visible, without a zoom interaction.
document.querySelectorAll('.restored-gallery').forEach(gallery=>{
 const slides=[...gallery.querySelectorAll('.restored-gallery-photo')];
 const thumbs=[...gallery.querySelectorAll('.restored-gallery-thumbnails img')];
 let index=0,timer;
 function show(next){
  index=(next+slides.length)%slides.length;
  slides.forEach((slide,i)=>{slide.hidden=i!==index;});
  thumbs.forEach((thumb,i)=>thumb.classList.toggle('is-current',i===index));
  const strip=gallery.querySelector('.restored-gallery-thumbnails');
  const active=thumbs[index];
  const gap=parseFloat(getComputedStyle(strip).gap)||0;
  const step=active.clientWidth+gap;
  const visible=Math.max(1,Math.floor((strip.clientWidth-4+gap)/step));
  const start=Math.min(Math.max(0,index-Math.floor(visible/2)),Math.max(0,thumbs.length-visible));
  const target=start*step;
  strip.scrollTo({left:target,behavior:'smooth'});
 }
 function restart(){clearInterval(timer);timer=setInterval(()=>{if(!document.hidden&&slides.length>1)show(index+1);},3000);}
 gallery.querySelector('.gallery-arrow-prev').addEventListener('click',()=>{show(index-1);restart();});
 gallery.querySelector('.gallery-arrow-next').addEventListener('click',()=>{show(index+1);restart();});
 restart();
});
// Associate portrait rows with the original biographies, in their supplied order.
document.querySelectorAll('.bios-flow').forEach(group=>{
 const buttons=[...group.querySelectorAll('.accordion-item__click-target')];
 const portraits=[...group.querySelectorAll('.bio-photo-block img')];
 const originalButtons=buttons.filter(b=>!b.id.includes('hannah'));
 portraits.forEach((image,i)=>{const button=originalButtons[i];if(!button)return;image.tabIndex=0;image.setAttribute('role','button');image.setAttribute('aria-label','Read biography: '+button.textContent.trim());const open=()=>{if(button.getAttribute('aria-expanded')!=='true')button.click();button.scrollIntoView({block:'center',behavior:'smooth'});button.focus({preventScroll:true});};image.addEventListener('click',open);image.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});});
});
// Animate the saved SVG text along its original path and spacing.
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
 document.querySelectorAll('.Marquee-svg-text[startoffset]').forEach(path=>{
 const spans=[...path.querySelectorAll('tspan')];if(spans.length<2)return;
 const distance=Number(spans[1].getAttribute('x'))-Number(spans[0].getAttribute('x'));const start=Number(path.getAttribute('startoffset'))||0;
 let time;function animate(now){if(!time)time=now;path.setAttribute('startOffset',start-((now-time)*0.035)%distance);requestAnimationFrame(animate);}requestAnimationFrame(animate);
 });
}
