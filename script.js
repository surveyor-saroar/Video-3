(function () {
  function startAutoBounce() {
    const candidates = document.querySelectorAll(
      '.elim-chip, .bonus-card, .skill-card, .feature-card, .module-card, .faq-item, .cta-btn, .card, [class*="card"], [class*="chip"], [class*="box"]'
    );

    const targets = Array.from(candidates).filter((el) => {
      if (el.classList.contains('fan-card')) return false;
      if (el.tagName === 'BODY' || el.tagName === 'HTML' || el.tagName === 'SECTION') return false;
      const rect = el.getBoundingClientRect();
      return rect.width > 20 && rect.height > 15;
    });

    function playBounce(el, delay) {
      if (el.dataset.bounced === 'true') return;
      el.dataset.bounced = 'true';
      setTimeout(() => {
        el.classList.remove('force-pop-hide');
        void el.offsetWidth;
        el.classList.add('force-pop-run');
      }, delay);
    }

    targets.forEach((el) => {
      el.classList.add('force-pop-hide');
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        let step = 0;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          playBounce(entry.target, step * 110);
          step += 1;
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.08 }
    );

    targets.forEach((el) => observer.observe(el));

    // Also trigger immediately for elements already visible on screen
    let visibleStep = 0;
    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        playBounce(el, 120 + visibleStep * 110);
        visibleStep += 1;
        observer.unobserve(el);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startAutoBounce);
  } else {
    startAutoBounce();
  }
})();
