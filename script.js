// messages and options
const frases = [
  "Aunque estemos lejos, sigues siendo parte de todo aquí en casa. Nada se siente completo sin ti. ✨❤️",
  "Puede que no confíes en mí, pero ahora soy diferente. Puedes hablar con tu hermana pequeña, Hatim 🏡💖",
  "Gracias por estar en mi vida; la has cambiado muchísimo. ❤️",
  "Extraño tu presencia en casa más de lo que imaginas, pero me alegra que estés construyendo el futuro que deseas.💫",
  "Lo que hoy duele, mañana será solo un recuerdo. No te rindas. 💕",
  "Nunca olvides que hay gente que te quiere y está lista para ayudarte. Está bien no estar bien, pero no te encierres. Pide ayuda y todos correrán hacia ti. 💘",
  "Siempre lo digo y lo repetiré: no soy tu hermana… soy más bien tu ex psicópata, estás atrapada conmigo. 🌙",
  "Siempre voy a estar aquí para ti, pase lo que pase. 🚀❤️",
  "Te quiiiiiero muchísimo. 💕",
  "Quédate conmigo los próximos 80 años, porque no puedo imaginar mi vida sin ti.",
  "Sé que intentas ser fuerte todo el tiempo, pero también tienes derecho a sentirte solo y débil. Solo no te guardes todo por dentro. ✨",
  "Has sobrevivido todos tus días difíciles hasta hoy; vas a superar este también. 💖",
  "Ojalá tuviéramos más contacto.⭐",
  "Estoy empezando a olvidar cómo eres. Mándame una foto antes de que te confunda con cualquier desconocido.💕",
  "No estás sola, ni ahora ni nunca. Siempre me tendrás de tu lado. ✨",
  "Te fuiste cuando yo aún era pequeña, y siento que no me conoces del todo. Ojalá pudiéramos hablar más entre nosotros.🌸",
  "Llámame o mándame un mensaje cuando quieras hablar. Aquí estoy para ti🌼",
  "Tú puedes con esto. Eres de las personas más fuertes que conozco, y esta etapa también pasará",

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


