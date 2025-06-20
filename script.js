// Criar partículas douradas
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    
    // Ajusta o número de partículas baseado no tamanho da tela
    const getParticleCount = () => {
        const width = window.innerWidth;
        if (width < 480) return 20;  // Menos partículas em telas pequenas
        if (width < 768) return 35;
        return 50;
    };
    
    const particleCount = getParticleCount();
    
    // Limpa partículas existentes
    particlesContainer.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posicionamento aleatório
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Animação com delays e durações aleatórias
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        // Tamanho variável das partículas
        const size = Math.random() * 2 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particlesContainer.appendChild(particle);
    }
}

// Contador regressivo
function initCountdown() {
    // Define uma data futura (30 dias a partir de agora)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        // Calcula o tempo restante
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Atualiza os elementos DOM
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        
        // Verifica se o contador chegou ao fim
        if (distance < 0) {
            const countdownEl = document.getElementById('countdown');
            if (countdownEl) {
                countdownEl.innerHTML = '<h2 style="color: #ffd700; font-size: clamp(1.5rem, 4vw, 2rem); text-align: center;">🎭 O espetáculo começou! 🎭</h2>';
            }
        }
    }
    
    // Atualiza imediatamente e depois a cada segundo
    updateCountdown();
    return setInterval(updateCountdown, 1000);
}

// Otimização de performance para redimensionamento
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Recriar partículas quando a tela é redimensionada
const handleResize = debounce(() => {
    createParticles();
}, 250);

// Adicionar efeito de hover nos elementos do contador
function addCountdownInteractions() {
    const timeUnits = document.querySelectorAll('.time-unit');
    
    timeUnits.forEach(unit => {
        unit.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
            this.style.borderColor = 'rgba(255, 215, 0, 0.8)';
        });
        
        unit.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.borderColor = 'rgba(255, 215, 0, 0.3)';
        });
    });
}

// Verificar se o dispositivo suporta animações (economia de bateria)
function supportsReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Reduzir animações se o usuário preferir
function handleReducedMotion() {
    if (supportsReducedMotion()) {
        // Adiciona classe para reduzir animações
        document.body.classList.add('reduced-motion');
        
        // Adiciona CSS inline para sobrescrever animações
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

// Função para verificar visibilidade da página (pause/resume animações)
function handleVisibilityChange() {
    const particles = document.querySelectorAll('.particle');
    const spotlights = document.querySelectorAll('.spotlight');
    
    if (document.hidden) {
        // Página não está visível - pausar animações pesadas
        particles.forEach(particle => {
            particle.style.animationPlayState = 'paused';
        });
        spotlights.forEach(spotlight => {
            spotlight.style.animationPlayState = 'paused';
        });
    } else {
        // Página está visível - retomar animações
        particles.forEach(particle => {
            particle.style.animationPlayState = 'running';
        });
        spotlights.forEach(spotlight => {
            spotlight.style.animationPlayState = 'running';
        });
    }
}

// Função para adicionar efeito parallax suave no scroll
function initParallaxEffect() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const particles = document.getElementById('particles');
        
        if (particles) {
            particles.style.transform = `translateY(${rate}px)`;
        }
        
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

// Função para detectar se é um dispositivo touch
function isTouchDevice() {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
}

// Ajustar interações para dispositivos touch
function adaptForTouch() {
    if (isTouchDevice()) {
        const timeUnits = document.querySelectorAll('.time-unit');
        
        timeUnits.forEach(unit => {
            // Substituir hover por tap em dispositivos touch
            unit.addEventListener('touchstart', function(e) {
                e.preventDefault();
                this.style.transform = 'translateY(-8px) scale(1.05)';
                this.style.borderColor = 'rgba(255, 215, 0, 0.8)';
                
                // Reverter após um tempo
                setTimeout(() => {
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                }, 200);
            });
        });
    }
}

// Função para otimizar performance em dispositivos lentos
function optimizeForPerformance() {
    const isLowEndDevice = navigator.hardwareConcurrency <= 2 || 
                          navigator.deviceMemory <= 4;
    
    if (isLowEndDevice) {
        // Reduzir número de partículas
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index % 2 === 0) {
                particle.remove();
            }
        });
        
        // Simplificar animações
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

// Variável global para o intervalo do contador
let countdownInterval;

// Função de inicialização principal
function initializeApp() {
    // Verificar preferências do usuário
    handleReducedMotion();
    
    // Criar partículas
    createParticles();
    
    // Inicializar contador
    countdownInterval = initCountdown();
    
    // Adicionar interações
    addCountdownInteractions();
    
    // Adaptar para dispositivos touch
    adaptForTouch();
    
    // Otimizar performance se necessário
    optimizeForPerformance();
    
    // Inicializar efeito parallax
    initParallaxEffect();
    
    // Event listeners
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Cleanup quando a página for fechada
    window.addEventListener('beforeunload', () => {
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
    });
}

// Aguardar o DOM estar pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}