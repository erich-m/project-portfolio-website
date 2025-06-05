class Firework {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.speed = 2;
        this.angle = Math.atan2(targetY - y, targetX - x);
        this.velocity = {
            x: Math.cos(this.angle) * this.speed,
            y: Math.sin(this.angle) * this.speed
        };
        this.particles = [];
        this.alive = true;
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (Math.abs(this.x - this.targetX) < 5 && Math.abs(this.y - this.targetY) < 5) {
            this.explode();
            this.alive = false;
        }
    }

    explode() {
        for (let i = 0; i < 50; i++) {
            const angle = (Math.PI * 2 / 50) * i;
            const velocity = 3;
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                alpha: 1
            });
        }
    }

    draw(ctx) {
        if (this.alive) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = '#EAD8B5';
            ctx.fill();
        }

        this.particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05;
            p.alpha *= 0.96;

            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(234, 216, 181, ${p.alpha})`;
            ctx.fill();

            if (p.alpha < 0.01) {
                this.particles.splice(index, 1);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('firework-canvas');
    const ctx = canvas.getContext('2d');
    const fireworks = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    document.getElementById('trigger-firework').addEventListener('click', (e) => {
        const rect = e.target.getBoundingClientRect();
        const startX = canvas.width / 2;
        const startY = canvas.height;
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;
        
        fireworks.push(new Firework(startX, startY, targetX, targetY));
    });

    function animate() {
        ctx.fillStyle = 'rgba(8, 11, 20, 0)';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        fireworks.forEach((fw, index) => {
            fw.update();
            fw.draw(ctx);
            if (!fw.alive && fw.particles.length === 0) {
                fireworks.splice(index, 1);
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
});