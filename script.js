// Staggered Bounce / Pop-up Trigger
const popBounceElements = document.querySelectorAll('.pop-bounce-init');

const popBounceObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const delay = Number(el.dataset.bounceDelay || 0);

      setTimeout(() => {
        el.classList.add('pop-bounce');
        el.classList.remove('pop-bounce-init');
      }, delay);

      obs.unobserve(el);
    });
  },
  { threshold: 0.15 }
);

popBounceElements.forEach((el, index) => {
  if (!el.dataset.bounceDelay) {
    el.dataset.bounceDelay = index * 110;
  }
  popBounceObserver.observe(el);
});
