// ===== QUIZ DATA =====
const quizData = [
  { question: "What describes your business best?", options: ["Agency Owner", "Coach / Consultant", "High-Ticket Service Provider", "Course Creator / Mentor", "Other"] },
  { question: "What's your current monthly revenue?", options: ["Below $3K/month", "$3K – $5K/month", "$5K – $10K/month", "$10K – $20K/month", "$20K+/month"] },
  { question: "What is your main source for attracting leads right now?", options: ["Referrals & word-of-mouth", "Cold outreach (DMs, emails, calls)", "Organic social content", "Inconsistent paid ads", "No fixed system yet"] },
  { question: "What is holding back your lead quality & brand growth?", options: ["Low quality leads / tire-kickers", "Not enough consistent lead inquiries", "Struggling to scale brand authority", "No predictable ad-to-client system", "Don't know how to run high-ROI ad funnels"] },
  { question: "Are you ready to build a system that delivers qualified leads & scales your brand?", options: ["Yes, ready to invest & scale", "Interested, want to see how it works", "Just exploring for now"] }
];

let currentStep = 0;
let quizAnswers = [];

// ===== DOM ELEMENTS =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const quizCard = document.getElementById('quizCard');
const quizResult = document.getElementById('quizResult');
const quizProgressBar = document.getElementById('quizProgressBar');
const quizStepLabel = document.getElementById('quizStepLabel');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

// ===== NAVBAR SCROLL =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 50);
  backToTop.classList.toggle('visible', scrollY > 600);
  lastScroll = scrollY;
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== QUIZ LOGIC =====
function renderQuiz() {
  const data = quizData[currentStep];
  quizProgressBar.style.width = `${((currentStep + 1) / quizData.length) * 100}%`;
  quizStepLabel.textContent = `Question ${currentStep + 1} of ${quizData.length}`;
  quizQuestion.textContent = data.question;
  quizOptions.innerHTML = '';
  data.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.setAttribute('id', `quiz-opt-${currentStep}-${i}`);
    btn.addEventListener('click', () => selectOption(btn, opt));
    quizOptions.appendChild(btn);
  });
}

function selectOption(btn, value) {
  document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
  btn.classList.add('selected');
  quizAnswers[currentStep] = value;
  // Auto-advance after short delay
  setTimeout(() => {
    if (currentStep < quizData.length - 1) {
      currentStep++;
      renderQuiz();
    } else {
      showQuizResult();
    }
  }, 350);
}

function showQuizResult() {
  quizCard.style.display = 'none';
  quizResult.style.display = 'block';
  quizResult.style.animation = 'fadeInUp .5s ease forwards';
}

// Initialize quiz
renderQuiz();

// ===== CONTACT FORM =====
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Submitting...';
  btn.disabled = true;
  // Simulate submission
  setTimeout(() => {
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';
    formSuccess.style.animation = 'fadeInUp .5s ease forwards';
  }, 1200);
});

// ===== SCROLL ANIMATIONS (Intersection Observer) =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Helper: observe a list of elements with staggered delays
function observeStaggered(selector, delayMs = 100) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('scroll-reveal');
    el.style.transitionDelay = `${i * delayMs}ms`;
    observer.observe(el);
  });
}

// Helper: observe elements without stagger
function observeAll(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
  });
}

// Hero elements (animate on load)
document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-note, .hero-cta').forEach((el, i) => {
  el.classList.add('scroll-reveal');
  el.style.transitionDelay = `${300 + i * 150}ms`;
  observer.observe(el);
});

// Ticker / results cards
observeStaggered('.ticker-card', 200);

// Quiz card
observeAll('.quiz-card');

// Section titles & subtitles
observeAll('.section-title');
observeAll('.section-subtitle');
observeAll('.section-note');
observeAll('.founder-story');

// Stat cards
observeStaggered('.stat-card', 80);

// Problem cards
observeStaggered('.problem-card', 100);

// How-it-works step cards
observeStaggered('.step-card', 150);

// Timeline items
observeStaggered('.timeline-item', 120);

// Qualify cards
observeStaggered('.qualify-card', 200);

// Value cards
observeStaggered('.value-card', 150);

// Contact section
observeAll('.contact-label');
observeAll('.contact-form');

// Labels
observeAll('.how-label');
observeAll('.program-label');
observeAll('.problems-closer');

// Observe any manually-added fade-in elements
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// ===== MODAL DIALOG LOGIC =====
const privacyModal = document.getElementById('privacyModal');
const termsModal = document.getElementById('termsModal');
const privacyLink = document.getElementById('privacyLink');
const termsLink = document.getElementById('termsLink');
const privacyClose = document.getElementById('privacyClose');
const termsClose = document.getElementById('termsClose');

if (privacyLink) {
  privacyLink.addEventListener('click', (e) => {
    e.preventDefault();
    privacyModal.classList.add('active');
  });
}

if (termsLink) {
  termsLink.addEventListener('click', (e) => {
    e.preventDefault();
    termsModal.classList.add('active');
  });
}

if (privacyClose) privacyClose.addEventListener('click', () => privacyModal.classList.remove('active'));
if (termsClose) termsClose.addEventListener('click', () => termsModal.classList.remove('active'));

window.addEventListener('click', (e) => {
  if (e.target === privacyModal) privacyModal.classList.remove('active');
  if (e.target === termsModal) termsModal.classList.remove('active');
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (privacyModal) privacyModal.classList.remove('active');
    if (termsModal) termsModal.classList.remove('active');
  }
});
