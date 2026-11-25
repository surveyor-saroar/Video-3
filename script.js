/* Simple Auto Pop-Up Bounce Without Hiding Screen */
window.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll("section > *, .elim-chip, .fanned-cards");

  items.forEach((el, i) => {
    if (!el.animate) return;
    el.animate(
      [
        { transform: "translateY(26px) scale(0.92)" },
        { transform: "translateY(-10px) scale(1.04)", offset: 0.6 },
        { transform: "translateY(3px) scale(0.99)", offset: 0.82 },
        { transform: "translateY(0) scale(1)" }
      ],
      {
        duration: 650,
        delay: Math.min(i * 90, 700),
        easing: "cubic-bezier(0.22, 1.35, 0.36, 1)",
        fill: "both"
      }
    );
  });
});
