const $=(s,p=document)=>p.querySelector(s);const $$=(s,p=document)=>[...p.querySelectorAll(s)];
const progress=$('.scroll-progress span');
const updateProgress=()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${h>0?scrollY/h*100:0}%`};addEventListener('scroll',updateProgress,{passive:true});updateProgress();

const glow=$('.cursor-glow');if(glow&&matchMedia('(pointer:fine)').matches){addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'},{passive:true})}

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){const delay=Number(entry.target.dataset.delay||0);setTimeout(()=>entry.target.classList.add('is-visible'),delay);revealObserver.unobserve(entry.target)}}),{threshold:.14,rootMargin:'0px 0px -6%'});$$('.reveal').forEach(el=>revealObserver.observe(el));

$$('.tilt-card').forEach(card=>{if(!matchMedia('(pointer:fine)').matches)return;const amount=Number(card.dataset.tilt||8);card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${-y*amount}deg) rotateY(${x*amount}deg) translateZ(4px)`});card.addEventListener('pointerleave',()=>card.style.transform='')});

$$('.magnetic').forEach(el=>{if(!matchMedia('(pointer:fine)').matches)return;el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.12}px,${y*.16}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});

const demo=$('.demo-trigger'),heroStage=$('.hero-stage');demo?.addEventListener('click',()=>{heroStage.classList.remove('demo-burst');void heroStage.offsetWidth;heroStage.classList.add('demo-burst');setTimeout(()=>heroStage.classList.remove('demo-burst'),2300)});

const productSteps=$$('.product-step');const deviceName=$('#device-name'),screenTitle=$('#screen-title'),screenCopy=$('#screen-copy'),screenIcon=$('.screen-icon'),screen=$('#device-screen');
const palettes={capture:['#0c3cc0','#155eef'],player:['#4c1d95','#7c3aed'],zip:['#047857','#10b981'],view:['#075985','#0ea5e9'],memo:['#92400e','#f59e0b']};
function activateProduct(step){productSteps.forEach(x=>x.classList.toggle('is-active',x===step));deviceName.textContent=step.dataset.name;screenTitle.textContent=step.dataset.title;screenCopy.textContent=step.dataset.copy;screenIcon.textContent=step.dataset.icon;const [a,b]=palettes[step.dataset.product]||palettes.capture;screen.style.background=`radial-gradient(circle at 72% 25%,${b},transparent 26%),linear-gradient(135deg,${a},${b})`;const panel=$('.screen-panel');panel.style.opacity='.35';panel.style.transform='translateY(12px)';requestAnimationFrame(()=>setTimeout(()=>{panel.style.opacity='1';panel.style.transform=''},110))}
const stepObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)activateProduct(e.target)})},{threshold:.6,rootMargin:'-20% 0px -30%'});productSteps.forEach(step=>{stepObserver.observe(step);step.addEventListener('mouseenter',()=>activateProduct(step));step.addEventListener('click',()=>activateProduct(step))});

const menu=$('.menu'),nav=$('.nav');menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));if(!open){nav.style.display='flex';nav.style.position='absolute';nav.style.top='70px';nav.style.left='15px';nav.style.right='15px';nav.style.padding='18px';nav.style.flexDirection='column';nav.style.border='1px solid #e8ebf1';nav.style.borderRadius='18px';nav.style.background='#fff';nav.style.boxShadow='0 20px 50px rgba(16,24,40,.12)'}else nav.removeAttribute('style')});
