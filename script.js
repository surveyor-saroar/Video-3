document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.fanned-cards .fan-card');

  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('jump-in');
    }, 180 + index * 140);
  });
});
