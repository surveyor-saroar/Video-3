[...document.querySelectorAll("*")].forEach((el) => {
  const bg = getComputedStyle(el).backgroundColor;
  const r = el.getBoundingClientRect();
  if (
    (bg === "rgb(255, 255, 255)" || bg === "rgba(255, 255, 255, 1)") &&
    r.width > 100 &&
    r.height > 100
  ) {
    console.log("WHITE BG FOUND:", el, bg, r);
  }
});
