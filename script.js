// Criar partículas douradas
function createParticles() {
    const particlesContainer = document.getElementById('particles');

    const getParticleCount = () => {
        const width = window.innerWidth;
        if (width < 480) return 35;
        if (width < 768) return 60;
        return 85;
    };

    const particleCount = getParticleCount();
    particlesContainer.innerHTML = '';

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 2) + 's';
        const size = Math.random() * 3 + 0.5;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        const animationType = Math.floor(Math.random() * 3);
        switch (animationType) {
            case 0: particle.style.animationName = 'float'; break;
            case 1: particle.style.animationName = 'sparkle'; break;
            case 2: particle.style.animationName = 'drift'; break;
        }

        particle.style.opacity = Math.random() * 0.6 + 0.4;
        particlesContainer.appendChild(particle);
    }
}

// Criar partículas especiais
function createSpecialParticles() {
    const particlesContainer = document.getElementById('particles');
    const specialCount = Math.floor(window.innerWidth < 768 ? 8 : 15);

    for (let i = 0; i < specialCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle special-particle';

        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 6 + 4) + 's';
        const size = Math.random() * 2 + 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = '#ffed4e';
        particle.style.boxShadow = '0 0 6px #ffd700, 0 0 12px #ffd700';
        particle.style.animationName = 'twinkle';

        particlesContainer.appendChild(particle);
    }
}

// Partículas seguindo o cursor
function createCursorTrail() {
    if (window.innerWidth < 768 || isTouchDevice()) return;

    document.addEventListener('mousemove', (e) => {
        if (Math.random() < 0.3) createTrailParticle(e.clientX, e.clientY);
    });

    function createTrailParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'trail-particle';
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = '#ffd700';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '3';
        particle.style.opacity = '1';
        particle.style.transition = 'all 1.5s ease-out';

        document.body.appendChild(particle);

        requestAnimationFrame(() => {
            particle.style.opacity = '0';
            particle.style.transform = 'translate(' +
                (Math.random() - 0.5) * 100 + 'px, ' +
                (Math.random() - 0.5) * 100 + 'px) scale(0)';
        });

        setTimeout(() => {
            if (particle.parentNode) particle.parentNode.removeChild(particle);
        }, 1500);
    }
}

// Contador regressivo global
function initCountdown() {
    const targetDate = new Date('2025-10-31T00:00:00');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(interval);
            const countdownEl = document.getElementById('countdown');
            if (countdownEl) {
                countdownEl.innerHTML = '<h2 style="color: #ffd700; font-size: clamp(1.5rem, 4vw, 2rem); text-align: center;">🎭 O espetáculo começou! 🎭</h2>';
            }
        }
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return interval;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

const handleResize = debounce(() => {
    createParticles();
    createSpecialParticles();
}, 250);

function addCountdownInteractions() {
    const timeUnits = document.querySelectorAll('.time-unit');
    timeUnits.forEach(unit => {
        unit.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.05)';
            this.style.borderColor = 'rgba(255, 215, 0, 0.8)';
        });
        unit.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.borderColor = 'rgba(255, 215, 0, 0.3)';
        });
    });
}

function supportsReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function handleReducedMotion() {
    if (supportsReducedMotion()) {
        document.body.classList.add('reduced-motion');
        const style = document.createElement('style');
        style.textContent = `
            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
            .reduced-motion .particle {
                display: none;
            }
        `;
        document.head.appendChild(style);
    }
}

function handleVisibilityChange() {
    const particles = document.querySelectorAll('.particle');
    const spotlights = document.querySelectorAll('.spotlight');

    if (document.hidden) {
        particles.forEach(p => p.style.animationPlayState = 'paused');
        spotlights.forEach(s => s.style.animationPlayState = 'paused');
    } else {
        particles.forEach(p => p.style.animationPlayState = 'running');
        spotlights.forEach(s => s.style.animationPlayState = 'running');
    }
}

function initParallaxEffect() {
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const particles = document.getElementById('particles');
        if (particles) particles.style.transform = `translateY(${rate}px)`;
        ticking = false;
    }
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    window.addEventListener('scroll', requestTick);
}

function isTouchDevice() {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}

function adaptForTouch() {
    if (isTouchDevice()) {
        const timeUnits = document.querySelectorAll('.time-unit');
        timeUnits.forEach(unit => {
            unit.addEventListener('touchstart', function (e) {
                e.preventDefault();
                this.style.transform = 'translateY(-8px) scale(1.05)';
                this.style.borderColor = 'rgba(255, 215, 0, 0.8)';
                setTimeout(() => {
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                }, 200);
            });
        });
    }
}

function optimizeForPerformance() {
    const isLowEndDevice = navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 4;
    if (isLowEndDevice) {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index % 2 === 0) particle.remove();
        });
        document.body.classList.add('low-performance');
        const style = document.createElement('style');
        style.textContent = `
            .low-performance .curtain-left,
            .low-performance .curtain-right {
                animation-duration: 1s !important;
            }
            .low-performance .particle {
                animation-duration: 8s !important;
            }
        `;
        document.head.appendChild(style);
    }
}

let countdownInterval;

function initializeApp() {
    handleReducedMotion();
    createParticles();
    createSpecialParticles();
    createCursorTrail();
    countdownInterval = initCountdown();
    addCountdownInteractions();
    adaptForTouch();
    optimizeForPerformance();
    initParallaxEffect();
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', () => {
        if (countdownInterval) clearInterval(countdownInterval);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
