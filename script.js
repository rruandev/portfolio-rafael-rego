// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.innerHTML = navLinks.classList.contains('open') ? '✕' : '&#9776;';
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.innerHTML = '&#9776;';
  });
});

// Particle canvas
(function () {
  const container = document.getElementById('particles');
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedY = -(Math.random() * 0.4 + 0.1);
    this.speedX = (Math.random() - 0.5) * 0.2;
    this.opacity = Math.random() * 0.6 + 0.1;
  }

  Particle.prototype.update = function () {
    this.y += this.speedY;
    this.x += this.speedX;
    this.opacity -= 0.0015;
    if (this.y < 0 || this.opacity <= 0) {
      this.y = canvas.height + 10;
      this.x = Math.random() * canvas.width;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
    ctx.fill();
  };

  for (let i = 0; i < 90; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();

// Counter animation
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  function fmt(v) {
    return prefix + (v >= 1000 ? v.toLocaleString('pt-BR') : v) + suffix;
  }

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(ease * target);
    el.textContent = fmt(value);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = fmt(target);
  }
  requestAnimationFrame(step);
}

// Scroll reveal
const revealEls = document.querySelectorAll(
  'section > .container, .evento-card, .servico-card, .depo-card, .numero-card'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
revealEls.forEach(el => observer.observe(el));

// Counter trigger
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.counter').forEach(animateCounter);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
const numerosSection = document.getElementById('numeros');
if (numerosSection) counterObserver.observe(numerosSection);

// Form submit
document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('.btn-primary');
  btn.textContent = 'Mensagem Enviada! ✓';
  btn.style.background = '#2a6b3a';
  btn.style.color = '#fff';
  setTimeout(() => {
    btn.textContent = 'Enviar Mensagem';
    btn.style.background = '';
    btn.style.color = '';
    this.reset();
  }, 3500);
});

// ── Barra de progresso
const rrProg = document.getElementById('rr-progress');
if (rrProg) {
  window.addEventListener('scroll', () => {
    const s = document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    rrProg.style.width = (h > 0 ? (s/h)*100 : 0) + '%';
  }, { passive: true });
}

// ── Sticky bar mobile
const rrSticky = document.getElementById('rr-sticky');
if (rrSticky) {
  rrSticky.style.display = 'flex';
  window.addEventListener('scroll', () => {
    rrSticky.style.transform = window.scrollY > 400 ? 'translateY(0)' : 'translateY(100%)';
  }, { passive: true });
}

// ── FAQ
const faqData = [
  { q: 'Qual o prazo mínimo para contratar?', a: 'Depende do porte do evento. Para festas e eventos menores, 30 dias já são suficientes. Para shows, festivais e grandes feiras, recomendo iniciar o contato com pelo menos 90 dias de antecedência para garantir a melhor estrutura e fornecedores.' },
  { q: 'Que tipos de evento você produz?', a: 'Produzo shows, festivais, feiras, baladas, eventos corporativos, casamentos, formaturas e eventos culturais. Se tem logística, palco, som ou público — é comigo.' },
  { q: 'Você atende fora de Brasília?', a: 'Sim! Atendo todo o Distrito Federal, Entorno e também posso ir para outras regiões dependendo do projeto. Me conta onde é o seu evento e a gente conversa.' },
  { q: 'Como funciona o orçamento?', a: 'O orçamento é gratuito e sem compromisso. Me chama no WhatsApp, me conta sobre o evento — tipo, data, estimativa de público e local — e eu monto uma proposta personalizada.' },
  { q: 'Você cuida de tudo ou posso contratar só alguns serviços?', a: 'Você escolhe! Posso fazer a produção completa ou atuar em partes específicas como sonorização, logística, gestão de equipe ou planejamento estratégico. É a sua necessidade que define o escopo.' },
  { q: 'Como começo a contratar?', a: 'É simples: me manda uma mensagem no WhatsApp ou no Instagram. Vamos marcar uma conversa rápida, entender o que você precisa e a partir daí eu apresento a proposta.' }
];

const faqList = document.getElementById('faq-list');
if (faqList) {
  faqData.forEach((item, i) => {
    const id = 'fq' + i;
    faqList.innerHTML += `
      <div style="border-bottom:1px solid rgba(255,255,255,.07);" id="${id}">
        <button onclick="(function(el){var b=el.nextElementSibling;var open=b.style.maxHeight!=='0px'&&b.style.maxHeight!=='';b.style.maxHeight=open?'0px':b.scrollHeight+'px';b.style.opacity=open?'0':'1';el.querySelector('.fq-icon').textContent=open?'+':'−';})(this)" style="width:100%;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 0;background:none;border:none;cursor:pointer;font-family:inherit;font-size:16px;font-weight:500;color:#fff;text-align:left;">
          <span>${item.q}</span>
          <span class="fq-icon" style="color:#d4af37;font-size:20px;flex-shrink:0;">+</span>
        </button>
        <div style="max-height:0;overflow:hidden;transition:max-height .4s cubic-bezier(.16,1,.3,1),opacity .35s;opacity:0;">
          <p style="font-size:15px;color:rgba(255,255,255,.55);font-weight:300;line-height:1.8;padding-bottom:20px;">${item.a}</p>
        </div>
      </div>`;
  });
}
