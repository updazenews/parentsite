const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealItems.forEach((item) => revealObserver.observe(item));


const cookieConsent = document.getElementById('cookieConsent');
const cookieAccept = document.getElementById('cookieAccept');
const cookieDecline = document.getElementById('cookieDecline');
const cookieStorageKey = 'updaze_cookie_consent';

if (cookieConsent) {
  const savedChoice = localStorage.getItem(cookieStorageKey);

  if (savedChoice === 'accepted' || savedChoice === 'declined') {
    cookieConsent.classList.add('hidden');
  }

  cookieAccept?.addEventListener('click', () => {
    localStorage.setItem(cookieStorageKey, 'accepted');
    cookieConsent.classList.add('hidden');
  });

  cookieDecline?.addEventListener('click', () => {
    localStorage.setItem(cookieStorageKey, 'declined');
    cookieConsent.classList.add('hidden');
  });
}
