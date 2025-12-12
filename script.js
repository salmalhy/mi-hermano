// messages and options
const frases = [
  "seeing you smile at the morning change my day, knowing that i am capable of making you smile, even for a short time, makes me feel like you are not lost completely ✨❤️",
  "you can do it, you know you are one of the strongest people i know, this will pass🏡💖",
  "thanks for existing in my life, you changed it a lot ❤️",
  "you made me realize that love existe even in friendships 💫",
  "anything in the present, it will be all a memory in the future, so never give up 💕",
  "never forget, people that loves, ready to help you, it's okay to feel unwell, but it's not okay to stay inside refusing getting out, just call for help, and everyone will rush out for you 💘",
  "i say that a lot, and i will say it again, i am not your bestie, i am more like your psycho ex, so as long as you hate people around you, u'r stuck there with me 🌙",
  "I am always here for you, no matter what 🚀❤️",
  "I love yoouu 💕",
  "be there for the next 80years, cause i can't imagine them without you",
  "as much as i hate seeing you cry, you look like and angel crying, you look amazing during all your states ✨",
  "you survived every bad day until now, you’ll survive this one too 💖",
  "I’m proud of you, even when you’re tired, even when you don’t notice your own progress ⭐",
  "you make ordinary days feel like memories worth keeping 💕",
  "you’re not alone, not now, not ever; keep me in your corner always ✨",
  "I would never ask you to wear a mask for me in order to hide what you’re going through. I love you, no matter what.",
  "Call or text me anytime you need to talk. I’m always here for you.",
  "I may not wholly understand everything you are going through, but I will try my best. I’m always here to listen anytime you need to talk.",

];

// DOM
const heartSVG = document.getElementById('heartSVG');
const bubbles = document.getElementById('bubbles');

const mainAudio = document.getElementById('mainAudio');
const popSound = document.getElementById('popSound');
const playBtn = document.getElementById('playBtn');
const progressEl = document.getElementById('progress');
const currentEl = document.getElementById('current');
const durationEl = document.getElementById('duration');

function fmt(t){
  if (isNaN(t)) return "0:00";
  const m = Math.floor(t/60), s = Math.floor(t%60);
  return m + ":" + (s<10? "0"+s : s);
}

mainAudio.addEventListener('loadedmetadata',()=>{
  durationEl.textContent = fmt(mainAudio.duration);
});
mainAudio.addEventListener('timeupdate',()=>{
  const pct = (mainAudio.currentTime / (mainAudio.duration||1)) * 100;
  progressEl.style.width = pct + '%';
  currentEl.textContent = fmt(mainAudio.currentTime);
});
mainAudio.addEventListener('ended', ()=> {
  playBtn.textContent = "▶";
});

playBtn.addEventListener('click', ()=>{
  if(mainAudio.paused){
    mainAudio.play().catch(()=>{});
    playBtn.textContent = "⏸";
  } else {
    mainAudio.pause();
    playBtn.textContent = "▶";
  }
});

heartSVG.addEventListener('click', (e)=>{
  heartSVG.classList.add('pulse');
  setTimeout(()=>heartSVG.classList.remove('pulse'),160);

  try{ popSound.currentTime = 0; popSound.play().catch(()=>{}); }catch(e){}

  if(mainAudio.paused){
    mainAudio.play().then(()=>{ playBtn.textContent = "⏸"; }).catch(()=>{/* blocked; user must press play */});
  }

  const count = 2 + Math.floor(Math.random()*2);
  for(let i=0;i<count;i++){
    setTimeout(()=>spawnBubble(), i*140);
  }
});

function spawnBubble(){
  const b = document.createElement('div');
  b.className = 'bubble';

  const txt = frases[Math.floor(Math.random()*frases.length)];

  const heartSpan = document.createElement('span');
  heartSpan.className = 'tiny-heart';

  const txtSpan = document.createElement('span');
  txtSpan.className = 'txt';
  txtSpan.textContent = txt;

  b.appendChild(heartSpan);
  b.appendChild(txtSpan);

  // coordinates relative to viewport
  const vw = window.innerWidth, vh = window.innerHeight;
  const cx = vw/2, cy = vh/2;
  // pick a random "lane" horizontally so bubbles don’t overlap each other
const lane = Math.floor(Math.random() * 4) - 2; // -2, -1, 0, +1
const offsetX = lane * 120 + (Math.random() * 40 - 20);  // spaced lanes

const startLeft = cx + offsetX;
const startTop = cy + (Math.random() * 40 - 20); // small randomness


  b.style.left = startLeft + 'px';
  b.style.top = startTop + 'px';

  const r0 = (Math.random()*20 - 10) + 'deg';
  const r1 = (Math.random()*10 - 5) + 'deg';
  const r2 = (Math.random()*60 - 30) + 'deg';
  b.style.setProperty('--r0', r0);
  b.style.setProperty('--r1', r1);
  b.style.setProperty('--r2', r2);

  const scale = 0.9 + Math.random()*0.35;
  b.style.transform = `translateX(-50%) translateY(0) scale(${scale}) rotate(${r0})`;

  bubbles.appendChild(b);

  // force reflow then use CSS animation only
  void b.offsetWidth;
  const dur = 4.5 + Math.random()*1.5;
  b.style.animation = `floatUp ${dur}s cubic-bezier(.2,.9,.2,1) forwards`;

  // remove after animation ends
  setTimeout(()=>{ b.remove(); }, (dur*1000) + 200);
}

window.addEventListener('resize', ()=>{});

