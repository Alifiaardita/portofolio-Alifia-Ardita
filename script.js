/* =============================================
   ALIFIA ARDITA — PORTFOLIO (REVISED)
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── CUSTOM CURSOR ─── */
  const cursor = document.createElement('div');
  cursor.id = 'cursor-dot';
  cursor.style.cssText = `
    width:14px;height:14px;
    background:var(--orange, #FF8C42);
    border-radius:50%;
    position:fixed;top:0;left:0;
    pointer-events:none;z-index:9999;
    transition:width .2s,height .2s,background .2s;
    mix-blend-mode:multiply;
    will-change:transform;
  `;
  document.body.appendChild(cursor);

  const cursorRing = document.createElement('div');
  cursorRing.style.cssText = `
    width:36px;height:36px;
    border:2px solid rgba(255,140,66,0.4);
    border-radius:50%;
    position:fixed;top:0;left:0;
    pointer-events:none;z-index:9998;
    transition:width .2s,height .2s,border-color .2s;
    will-change:transform;
  `;
  document.body.appendChild(cursorRing);

  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx-7}px,${my-7}px)`;
  });
  (function animRing(){
    rx += (mx-rx)*0.12; ry += (my-ry)*0.12;
    cursorRing.style.transform = `translate(${rx-18}px,${ry-18}px)`;
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a,button,.project-card,.stat-card,.softskill-card,.org-card,.contact-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width='20px'; cursor.style.height='20px';
      cursor.style.background='rgba(255,140,66,0.5)';
      cursorRing.style.width='54px'; cursorRing.style.height='54px';
      cursorRing.style.borderColor='rgba(255,140,66,0.6)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width='14px'; cursor.style.height='14px';
      cursor.style.background='var(--orange, #FF8C42)';
      cursorRing.style.width='36px'; cursorRing.style.height='36px';
      cursorRing.style.borderColor='rgba(255,140,66,0.4)';
    });
  });

  /* ─── TYPED GREETING ─── */
  const words = ['seorang Designer', 'seorang Developer', 'seorang Kreator'];
  let wIndex=0, cIndex=0, isDeleting=false;
  const typedEl = document.getElementById('typedGreeting');
  if (typedEl) {
    function typeLoop(){
      const w = words[wIndex];
      typedEl.textContent = isDeleting ? w.slice(0, cIndex--) : w.slice(0, ++cIndex);
      let speed = isDeleting ? 50 : 90;
      if (!isDeleting && cIndex === w.length) {
        speed = 1800;
        isDeleting = true;
      } else if (isDeleting && cIndex === 0) {
        isDeleting = false;
        wIndex = (wIndex+1) % words.length;
        speed = 300;
      }
      setTimeout(typeLoop, speed);
    }
    setTimeout(typeLoop, 1000);
  }

  /* ─── PARTICLE CANVAS ─── */
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles=[];
    function resizeCanvas(){
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor(){
        this.reset();
        this.y = Math.random()*H;
      }
      reset(){
        this.x = Math.random()*W;
        this.y = H + 20;
        this.size = Math.random()*3+1;
        this.speedY = Math.random()*0.6+0.2;
        this.speedX = (Math.random()-0.5)*0.3;
        this.alpha = Math.random()*0.4+0.1;
        this.color = Math.random()>0.5 ? '#FF8C42' : '#FFCB9A';
      }
      update(){
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < -10) this.reset();
      }
      draw(){
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();
      }
    }

    for(let i=0;i<60;i++) particles.push(new Particle());

    function animParticles(){
      ctx.clearRect(0,0,W,H);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animParticles);
    }
    animParticles();
  }

  /* ─── NAVBAR SCROLL & ACTIVE ─── */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    let current='';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href')==='#'+current) a.classList.add('active');
    });
  }, { passive: true });

  /* ─── MOBILE NAV ─── */
  const navToggle = document.getElementById('navToggle');
  const navLinksList = document.querySelector('.nav-links');
  navToggle.addEventListener('click', () => navLinksList.classList.toggle('open'));
  navLinksList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinksList.classList.remove('open')));

  /* ─── SCROLL REVEAL ─── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ─── SKILL BAR ANIMATION ─── */
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('animated');
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-fill').forEach(el => skillObserver.observe(el));

  /* ─── PROJECT FILTER ─── */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const projectCards = document.querySelectorAll('.project-card');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      projectCards.forEach(card => {
        const show = tab==='all' || card.dataset.category===tab;
        if(show){
          card.removeAttribute('data-hidden');
          card.style.animation='fadeInUp 0.4s ease forwards';
        } else {
          card.setAttribute('data-hidden','true');
        }
      });
    });
  });

  /* ─── SMOOTH SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); }
    });
  });

  /* ─── TILT EFFECT on stat cards ─── */
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y*10}deg) rotateY(${x*10}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ─── MAGNETIC BUTTON ─── */
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width/2) * 0.2;
      const y = (e.clientY - rect.top - rect.height/2) * 0.2;
      btn.style.transform = `translate(${x}px, ${y}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* ─── FLOATING BADGES PARALLAX ─── */
  document.addEventListener('mousemove', e => {
    const badges = document.querySelectorAll('.floating-badge');
    const cx = window.innerWidth/2, cy = window.innerHeight/2;
    const dx = (e.clientX-cx)/cx, dy = (e.clientY-cy)/cy;
    badges.forEach((b,i) => {
      const f = (i+1)*6;
      b.style.transform = `translate(${dx*f}px, ${dy*f}px)`;
    });
  });

  /* ─── STAT COUNTER ─── */
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        const target = parseInt(el.textContent);
        const suffix = el.textContent.replace(/[0-9]/g,'');
        if(isNaN(target)) return;
        let count=0;
        const step = Math.ceil(target/30);
        const iv = setInterval(()=>{
          count = Math.min(count+step, target);
          el.textContent = count+suffix;
          if(count>=target) clearInterval(iv);
        }, 40);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

  /* ─── FADEUP KEYFRAME ─── */
  const style = document.createElement('style');
  style.textContent = `@keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }`;
  document.head.appendChild(style);

/* ─── CERTIFICATE POPUP ─── */

window.openCertificate = function(pdfFile) {
  const modal = document.getElementById('certificateModal');
  const frame = document.getElementById('certificateFrame');

  frame.src = pdfFile;
  modal.classList.add('active');

  document.body.style.overflow = 'hidden';
}

window.closeCertificate = function() {
  const modal = document.getElementById('certificateModal');
  const frame = document.getElementById('certificateFrame');

  modal.classList.remove('active');
  frame.src = '';

  document.body.style.overflow = '';
}

/* close ketika klik background */
document.getElementById('certificateModal')
  .addEventListener('click', function(e) {
    if (e.target === this) {
      closeCertificate();
    }
  });

});