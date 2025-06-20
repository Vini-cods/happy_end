// Criar partículas douradas
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    
    // Ajusta o número de partículas baseado no tamanho da tela - AUMENTADO
    const getParticleCount = () => {
        const width = window.innerWidth;
        if (width < 480) return 35;  // Aumentado de 20 para 35
        if (width < 768) return 60;  // Aumentado de 35 para 60
        return 85;  // Aumentado de 50 para 85
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
        
        // Animação com delays e durações aleatórias - mais variação
        particle.style.animationDelay = Math.random() * 8 + 's';  // Aumentado de 6 para 8
        particle.style.animationDuration = (Math.random() * 4 + 2) + 's';  // Mais variação
        
        // Tamanho variável das partículas - mais variação
        const size = Math.random() * 3 + 0.5;  // Tamanhos de 0.5px a 3.5px
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Adicionar diferentes tipos de animação
        const animationType = Math.floor(Math.random() * 3);
        switch(animationType) {
            case 0:
                particle.style.animationName = 'float';
                break;
            case 1:
                particle.style.animationName = 'sparkle';
                break;
            case 2:
                particle.style.animationName = 'drift';
                break;
        }
        
        // Variação na opacidade
        particle.style.opacity = Math.random() * 0.6 + 0.4;  // Entre 0.4 e 1.0
        
        particlesContainer.appendChild(particle);
    }
}

// Criar partículas especiais adicionais
function createSpecialParticles() {
    const particlesContainer = document.getElementById('particles');
    
    // Criar algumas partículas maiores e mais brilhantes
    const specialCount = Math.floor(window.innerWidth < 768 ? 8 : 15);
    
    for (let i = 0; i < specialCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle special-particle';
        
        // Posicionamento
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Propriedades especiais
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 6 + 4) + 's';
        
        // Tamanho maior
        const size = Math.random() * 2 + 3;  // 3px a 5px
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Cor mais intensa
        particle.style.background = '#ffed4e';
        particle.style.boxShadow = '0 0 6px #ffd700, 0 0 12px #ffd700';
        
        // Animação especial
        particle.style.animationName = 'twinkle';
        
        particlesContainer.appendChild(particle);
    }
}

// Criar partículas que seguem o cursor (apenas em desktop)
function createCursorTrail() {
    if (window.innerWidth < 768 || isTouchDevice()) return;
    
    let mouseX = 0, mouseY = 0;
    const trailParticles = [];
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Criar partícula ocasionalmente
        if (Math.random() < 0.3) {
            createTrailParticle(mouseX, mouseY);
        }
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
        
        // Animar e remover
        requestAnimationFrame(() => {
            particle.style.opacity = '0';
            particle.style.transform = 'translate(' + 
                (Math.random() - 0.5) * 100 + 'px, ' + 
                (Math.random() - 0.5) * 100 + 'px) scale(0)';
        });
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1500);
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
    createSpecialParticles();
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
    
    // Criar partículas normais
    createParticles();
    
    // Criar partículas especiais
    createSpecialParticles();
    
    // Criar trail do cursor (apenas desktop)
    createCursorTrail();
    
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