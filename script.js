document.addEventListener('DOMContentLoaded', () => {
  const chips = document.querySelectorAll('.elim-chip');

  function triggerPopUp(chip) {
    chip.classList.remove('pop-up-active', 'crossed', 'cross-animate');
    void chip.offsetWidth; // reflow for instant replay
    chip.classList.add('pop-up-active');
  }

  chips.forEach((chip, index) => {
    setTimeout(() => {
      triggerPopUp(chip);
    }, 150 + index * 140);

    // Click to replay pop-up animation
    chip.addEventListener('click', () => {
      triggerPopUp(chip);
    });
  });
});
