(function () {
  function runBounceAnimation(el, delay) {
    if (!el || el.dataset.doneBounce === "true") return;
    el.dataset.doneBounce = "true";

    setTimeout(() => {
      try {
        el.style.opacity = "1";
        el.style.visibility = "visible";

        if (typeof el.animate === "function") {
          const anim = el.animate(
            [
              {
                opacity: 0,
                transform: "translateY(38px) scale(0.82)"
              },
              {
                opacity: 1,
                transform: "translateY(-14px) scale(1.07)",
                offset: 0.58
              },
              {
                opacity: 1,
                transform: "translateY(5px) scale(0.97)",
                offset: 0.78
              },
              {
                opacity: 1,
                transform: "translateY(-3px) scale(1.02)",
                offset: 0.9
              },
              {
                opacity: 1,
                transform: "translateY(0px) scale(1)"
              }
            ],
            {
              duration: 720,
              delay: 0,
              easing: "cubic-bezier(0.22, 1.45, 0.36, 1)",
              fill: "both"
            }
          );

          anim.onfinish = () => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0px) scale(1)";
          };
        } else {
          el.style.transition = "transform 0.5s ease, opacity 0.5s ease";
          el.style.transform = "translateY(0px) scale(1)";
        }
      } catch (err) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0px) scale(1)";
      }
    }, delay);
  }

  function initAutoBounce() {
    const allElements = Array.from(document.querySelectorAll("body *"));

    const targets = allElements.filter((el) => {
      const tag = el.tagName;
      if (
        ["SCRIPT", "STYLE", "LINK", "META", "HEAD", "HTML", "BODY", "SVG", "PATH", "G", "CIRCLE", "RECT", "LINE", "POLYGON", "BR", "HR"].includes(tag)
      ) {
        return false;
      }
      if (el.classList && el.classList.contains("fan-card")) {
        return false;
      }

      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);

      const isVisibleBox = rect.width >= 30 && rect.height >= 20 && style.display !== "none";
      const looksLikeCardOrItem =
        style.borderRadius !== "0px" ||
        style.boxShadow !== "none" ||
        style.backgroundColor !== "rgba(0, 0, 0, 0)" ||
        tag === "BUTTON" ||
        tag === "A" ||
        tag === "H1" ||
        tag === "H2" ||
        tag === "H3";

      return isVisibleBox && looksLikeCardOrItem && el.children.length <= 8;
    });

    targets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(38px) scale(0.82)";
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          let idx = 0;
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            runBounceAnimation(entry.target, idx * 90);
            idx += 1;
            obs.unobserve(entry.target);
          });
        },
        { threshold: 0.05 }
      );

      targets.forEach((el) => observer.observe(el));
    }

    // Immediate run for items on screen or fallback if observer doesn't fire
    let immediateIdx = 0;
    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        runBounceAnimation(el, 100 + immediateIdx * 90);
        immediateIdx += 1;
      }
    });

    // Safety fallback so nothing stays stuck at opacity: 0
    setTimeout(() => {
      targets.forEach((el, i) => {
        if (el.dataset.doneBounce !== "true") {
          runBounceAnimation(el, i * 60);
        }
      });
    }, 1800);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAutoBounce);
  } else {
    initAutoBounce();
  }
})();
