window.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(
    "section > *, .elim-chip, .fanned-cards, .fan-card, button, .btn"
  );

  const uniqueTargets = Array.from(new Set(targets));

  uniqueTargets.forEach((el, index) => {
    el.style.opacity = "1";
    el.style.visibility = "visible";

    if (typeof el.animate !== "function") return;

    el.animate(
      [
        { transform: "translateY(26px) scale(0.92)" },
        { transform: "translateY(-10px) scale(1.04)", offset: 0.6 },
        { transform: "translateY(3px) scale(0.99)", offset: 0.82 },
        { transform: "translateY(0) scale(1)" }
      ],
      {
        duration: 650,
        delay: Math.min(index * 90, 720),
        easing: "cubic-bezier(0.22, 1.35, 0.36, 1)",
        fill: "both"
      }
    );
  });
});
