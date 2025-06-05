// Firework configuration
const FIREWORK_CONFIG = {
    launchSpeed: 7,        // Speed of firework traveling to target
    explosionSpeed: 3,     // Speed of particles after explosion
    explosionRadius: 5,    // Size of explosion particles
    particleDensity: 60,   // Number of particles in explosion
    particleDecay: 0.96,   // How quickly particles fade (0-1)
    gravity: 0.05,          // Gravity effect on particles
    minTargetDistance: 100,  // Minimum distance from edges
    numberOfFireworks: 5,    // Number of fireworks to launch per click
    minDelay: 500,          // Minimum delay between fireworks (milliseconds)
    maxDelay: 1000           // Maximum delay between fireworks (milliseconds)
};

// Add helper function for random colors
function getRandomColor() {
    const hue = Math.random() * 360;
    return `hsl(${hue}, 70%, 70%)`; // Using HSL for vibrant rainbow colors
}

class Firework {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.speed = FIREWORK_CONFIG.launchSpeed;
        this.angle = Math.atan2(targetY - y, targetX - x);
        this.velocity = {
            x: Math.cos(this.angle) * this.speed,
            y: Math.sin(this.angle) * this.speed
        };
        this.particles = [];
        this.alive = true;
        this.color = getRandomColor(); // Add color property
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
        for (let i = 0; i < FIREWORK_CONFIG.particleDensity; i++) {
            // Add random variation to the angle
            const angleVariation = (Math.random() - 0.5) * 0.5; // ±0.25 radians variation
            const angle = (Math.PI * 2 / FIREWORK_CONFIG.particleDensity) * i + angleVariation;
            
            // Add random variation to velocity
            const velocityVariation = Math.random() * 2 + 0.5; // 0.5 to 2.5 multiplier
            const velocity = FIREWORK_CONFIG.explosionSpeed * velocityVariation;

            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                alpha: 1,
                color: this.color // Add color to particle
            });
        }
    }

    draw(ctx) {
        if (this.alive) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, FIREWORK_CONFIG.explosionRadius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        this.particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += FIREWORK_CONFIG.gravity;
            p.alpha *= FIREWORK_CONFIG.particleDecay;

            ctx.beginPath();
            ctx.arc(p.x, p.y, FIREWORK_CONFIG.explosionRadius, 0, Math.PI * 2);
            ctx.fillStyle = `${p.color.replace(')', `, ${p.alpha})`).replace('rgb', 'rgba')}`;
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

    document.getElementById('trigger-firework').addEventListener('click', () => {
        // Launch multiple fireworks with delays
        for (let i = 0; i < FIREWORK_CONFIG.numberOfFireworks; i++) {
            setTimeout(() => {
                const startX = canvas.width / 2;
                const startY = canvas.height;
                
                const targetX = FIREWORK_CONFIG.minTargetDistance + 
                    Math.random() * (canvas.width - 2 * FIREWORK_CONFIG.minTargetDistance);
                const targetY = FIREWORK_CONFIG.minTargetDistance + 
                    Math.random() * (canvas.height - 2 * FIREWORK_CONFIG.minTargetDistance);
                
                fireworks.push(new Firework(startX, startY, targetX, targetY));
            }, Math.random() * (FIREWORK_CONFIG.maxDelay - FIREWORK_CONFIG.minDelay) + FIREWORK_CONFIG.minDelay * i);
        }
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