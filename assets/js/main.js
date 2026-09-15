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

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      formStatus.textContent = 'Please complete all required fields before sending your enquiry.';
      formStatus.classList.add('error');
      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);
    const enquiry = [
      `Name: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      `Company / Organisation: ${formData.get('company') || 'Not provided'}`,
      `Service Required: ${formData.get('service')}`,
      '',
      'Message:',
      formData.get('message'),
    ].join('\n');

    formStatus.textContent = 'Opening your email application with your enquiry.';
    formStatus.classList.remove('error');
    window.location.href = `mailto:info@updaze.co.za?subject=${encodeURIComponent('Website enquiry')}&body=${encodeURIComponent(enquiry)}`;
  });
}


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
