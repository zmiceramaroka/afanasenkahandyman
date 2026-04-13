/* ============================================================
   Afanasenka Handyman Services — Scripts
   ============================================================ */

// ── Navbar scroll effect ──────────────────────────────────
const navbar = document.getElementById('navbar');
function handleScroll() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// ── Mobile hamburger ──────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Sticky CTA hide/show ──────────────────────────────────
const stickyCta   = document.getElementById('sticky-cta');
const heroSection = document.querySelector('.hero');
const stickyObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    stickyCta.style.display = e.isIntersecting ? 'none' : '';
  });
}, { threshold: 0.1 });
if (heroSection) stickyObserver.observe(heroSection);

// ── Smooth scroll offset for fixed nav ───────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Animate cards on scroll (IntersectionObserver) ───────
const fadeEls = document.querySelectorAll('.service-card, .t-card, .why-feature');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  fadeObserver.observe(el);
});
