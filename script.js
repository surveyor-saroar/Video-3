(function () {
  function animateSafeBounce() {
    const targets = document.querySelectorAll(
      "section > *, .headline-lg, .subcopy, .fanned-cards, .fan-card, .elim-chip, [class*='card'], [class*='chip'], [class*='box'], button, .btn, .cta"
    );

    const unique = Array.from(new Set(targets)).filter((el) => {
      const tag = el.tagName;
      if (["SCRIPT", "STYLE", "LINK", "META", "HEAD", "HTML", "BODY", "SVG", "PATH", "BR", "HR"].includes(tag)) {
        return false;
      }
      const rect = el.getBoundingClientRect();
      return rect.width > 10 && rect.height > 10;
    });

    unique.forEach((el, index) => {
      el.style.opacity = "1";
      el.style.visibility = "visible";

      if (typeof el.animate === "function") {
        el.animate(
          [
            {
              transform: "translateY(28px) scale(0.9)",
              opacity: 0.35
            },
            {
              transform: "translateY(-12px) scale(1.05)",
              opacity: 1,
              offset: 0.6
            },
            {
              transform: "translateY(4px) scale(0.98)",
              opacity: 1,
              offset: 0.82
            },
            {
              transform: "translateY(0px) scale(1)",
              opacity: 1
            }
          ],
          {
            duration: 720,
            delay: Math.min(index * 85, 900),
            easing: "cubic-bezier(0.22, 1.45, 0.36, 1)",
            fill: "both"
          }
        );
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", animateSafeBounce);
  } else {
    animateSafeBounce();
  }
})();
