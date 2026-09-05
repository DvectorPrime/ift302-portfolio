document.addEventListener('DOMContentLoaded', () => {
  initScrollSpy();
  initRevealOnScroll();
  initBackToTop();
  initTagline();
  initSeeMoreButton();
});

function initScrollSpy() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('#navbar a');

  const linkFor = (id) =>
    [...navLinks].find((a) => a.getAttribute('href') === `#${id}`);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = linkFor(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((a) => a.classList.remove('active-link'));
          link.classList.add('active-link');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' } 
  );

  sections.forEach((section) => observer.observe(section));

  const style = document.createElement('style');
  style.textContent = `#navbar a.active-link { background-color: var(--p-blue); }`;
  document.head.appendChild(style);
}

function initRevealOnScroll() {
  const tiles = document.querySelectorAll('.project-tile');

  tiles.forEach((tile) => {
    tile.style.opacity = '0';
    tile.style.transform = 'translateY(25px)';
    tile.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  tiles.forEach((tile) => observer.observe(tile));
}

function initBackToTop() {
  const btn = document.createElement('button');
  btn.textContent = '↑';
  btn.setAttribute('aria-label', 'Back to top');
  Object.assign(btn.style, {
    position: 'fixed',
    bottom: '25px',
    right: '25px',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'var(--p-red)',
    color: 'var(--p-white)',
    fontSize: '1.3rem',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
    opacity: '0',
    pointerEvents: 'none',
    transition: 'opacity 0.3s ease',
    zIndex: '200',
  });
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    const show = window.scrollY > window.innerHeight / 2;
    btn.style.opacity = show ? '1' : '0';
    btn.style.pointerEvents = show ? 'auto' : 'none';
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initTagline() {
  const el = document.getElementById('h1tag');
  if (!el) return;

  const phrases = [
    'a web developer',
    'a backend engineer',
    'an ML enthusiast',
    'a problem solver',
  ];
  let i = 0;

  setInterval(() => {
    i = (i + 1) % phrases.length;
    el.style.opacity = '0';
    setTimeout(() => {
      el.textContent = phrases[i];
      el.style.opacity = '1';
    }, 300);
  }, 2800);

  el.style.transition = 'opacity 0.3s ease';
}

function initSeeMoreButton() {
  const btn = document.querySelector('.btn-div .btn');
  if (!btn) return;

  btn.style.cursor = 'pointer';
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const contact = document.getElementById('contact-info');
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth' });
    }
  });
}