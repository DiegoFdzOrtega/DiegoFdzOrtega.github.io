window.addEventListener("load", () => {
    const canvas = document.getElementById("stars");
    const ctx = canvas.getContext("2d");
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    let mouseX = 0;
    let mouseY = 0;

    const stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.5,
            d: Math.random() * 0.5,
            z: Math.random() * 0.7 + 0.1 // Factor parallax (0.1 a 0.8)
        });
    }

    window.addEventListener("mousemove", (e) => {
        mouseX = (e.clientX - w / 2) / 30;
        mouseY = (e.clientY - h / 2) / 30;
    });

    function draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "white";
        
        stars.forEach(s => {
            ctx.beginPath();
            // El movimiento se multiplica por la profundidad 'z'
            let visualX = s.x + (mouseX * s.z);
            let visualY = s.y + (mouseY * s.z);
            
            ctx.arc(visualX, visualY, s.r, 0, Math.PI * 2);
            ctx.fill();
        });
        update();
        requestAnimationFrame(draw);
    }

    let angle = 0;
    function update() {
        angle += 0.01;
        stars.forEach(s => {
            s.x += Math.sin(angle + s.d) * 0.1;
            s.y += Math.cos(angle + s.d) * 0.1;

            if (s.x < -20) s.x = w + 20;
            if (s.x > w + 20) s.x = -20;
            if (s.y < -20) s.y = h + 20;
            if (s.y > h + 20) s.y = -20;
        });
    }

    draw();

    window.addEventListener("resize", () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });
});

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: "smooth" });
    }
}
