document.addEventListener('DOMContentLoaded', () => {
  const selector = [
    '.elim-chip',
    '.bonus-card',
    '.skill-card',
    '.feature-card',
    '.module-card',
    '.faq-item',
    '.cta-btn',
    'section .card'
  ].join(', ');

  const autoTargets = Array.from(document.querySelectorAll(selector)).filter(
    (el) => !el.classList.contains('fan-card')
  );

  function runAutoAnimation(el) {
    if (el.dataset.autoAnimated === 'true') return;
    el.dataset.autoAnimated = 'true';
    el.classList.remove('auto-pop-hidden');
    void el.offsetWidth;
    el.classList.add('auto-pop-active');
  }

  autoTargets.forEach((el) => {
    el.classList.add('auto-pop-hidden');
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      visible.forEach((entry, index) => {
        const el = entry.target;
        setTimeout(() => {
          runAutoAnimation(el);
        }, index * 120);
        obs.unobserve(el);
      });
    },
    { threshold: 0.12 }
  );

  autoTargets.forEach((el) => observer.observe(el));

  // Immediately run for items already visible on screen at load
  setTimeout(() => {
    autoTargets.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) {
        setTimeout(() => runAutoAnimation(el), index * 120);
      }
    });
  }, 120);
});
