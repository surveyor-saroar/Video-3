document.addEventListener('DOMContentLoaded', () => {
  const popTargets = document.querySelectorAll('.pop-up-ready, .pop-up');

  function runPopUp(el) {
    el.classList.remove('pop-up', 'pop-up-ready');
    void el.offsetWidth; // reflow for clean replay
    el.classList.add('pop-up');
  }

  popTargets.forEach((el) => {
    el.classList.add('pop-up-ready');
    el.classList.remove('pop-up');

    el.addEventListener('click', () => {
      runPopUp(el);
    });
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      visibleEntries.forEach((entry, idx) => {
        const el = entry.target;
        const delay = el.dataset.popDelay ? Number(el.dataset.popDelay) : idx * 120;

        setTimeout(() => {
          runPopUp(el);
        }, delay);

        obs.unobserve(el);
      });
    },
    { threshold: 0.15 }
  );

  popTargets.forEach((el) => observer.observe(el));
});
