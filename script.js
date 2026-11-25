document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.pop-return-init');

  targets.forEach((el, index) => {
    const customDelay = el.dataset.returnDelay ? Number(el.dataset.returnDelay) : index * 140;
    setTimeout(() => {
      el.classList.add('pop-return-active');
      el.classList.remove('pop-return-init');
    }, 150 + customDelay);
  });
});
