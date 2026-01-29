window.addEventListener("load", () => {
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;

  const stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5,
      d: Math.random() * 0.5
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "white";
    ctx.beginPath();
    stars.forEach(s => {
      ctx.moveTo(s.x, s.y);
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2, true);
    });
    ctx.fill();
    update();
  }

  let angle = 0;
  function update() {
    angle += 0.01;
    stars.forEach(s => {
      s.x += Math.sin(angle + s.d);
      s.y += Math.cos(angle + s.d);
      if (s.x < 0) s.x = w;
      if (s.x > w) s.x = 0;
      if (s.y < 0) s.y = h;
      if (s.y > h) s.y = 0;
    });
  }

  setInterval(draw, 33);

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });
});

// Scroll suave para los paneles
function scrollToSection(id) {
  const el = document.getElementById(id);
  el.scrollIntoView({ behavior: "smooth" });
}
