document.addEventListener('DOMContentLoaded', () => {
  const chips = document.querySelectorAll('.elim-chip');

  chips.forEach((chip, index) => {
    chip.classList.remove('crossed');
    setTimeout(() => {
      chip.classList.add('anim-play');
    }, 150 + index * 140);
  });
});
