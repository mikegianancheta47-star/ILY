// ============================================
// PAGE CONTENT FROM CONFIG
// ============================================
function initPageContent() {
    document.title = SITE_CONFIG.siteTitle;
    document.getElementById('main-title').textContent = SITE_CONFIG.siteTitle;
    document.getElementById('couple-photo').src = SITE_CONFIG.couplePhoto;
    document.getElementById('subtitle').textContent = SITE_CONFIG.subtitle;
    document.getElementById('romantic-paragraph').textContent = SITE_CONFIG.romanticParagraph;
    document.getElementById('letter-title').textContent = SITE_CONFIG.loveLetterTitle;
    document.getElementById('final-message').textContent = SITE_CONFIG.finalMessage;
    document.getElementById('final-submessage').textContent = SITE_CONFIG.finalSubmessage;
    document.getElementById('forever-message').textContent = SITE_CONFIG.foreverMessage;

    const loveLetter = SITE_CONFIG.loveLetter.replace(/\{name_1\}/g, SITE_CONFIG.name1);
    SITE_CONFIG.loveLetter = loveLetter;

    const galleryGrid = document.getElementById('gallery-grid');
    SITE_CONFIG.galleryImages.forEach((imgUrl, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item glass-card';
        item.innerHTML = `
            <img src="${imgUrl}" alt="Memory ${index + 1}" loading="lazy">
            <div class="overlay">
                <span>❤️ Moment ${index + 1}</span>
            </div>
        `;
        galleryGrid.appendChild(item);
    });

    if (SITE_CONFIG.musicPath) {
        document.getElementById('bg-music').src = SITE_CONFIG.musicPath;
    }
}

initPageContent();

// ============================================
// AUDIO / MUSIC PLAYER
// ============================================
const audio = document.getElementById('bg-music');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const volumeSlider = document.getElementById('volume-slider');

// If no music path is set, generate a gentle hum using oscillator
if (!SITE_CONFIG.musicPath) {
    // We'll use Web Audio API to create a gentle ambient sound
    let audioCtx = null;
    let oscillator = null;
    let gainNode = null;
    let isPlaying = false;

    playBtn.addEventListener('click', function() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            oscillator = audioCtx.createOscillator();
            gainNode = audioCtx.createGain();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.start();
            isPlaying = true;
            playBtn.textContent = '▶';
        } else if (audioCtx.state === 'suspended') {
            audioCtx.resume();
            isPlaying = true;
            playBtn.textContent = '▶';
        }
    });

    pauseBtn.addEventListener('click', function() {
        if (audioCtx && audioCtx.state === 'running') {
            audioCtx.suspend();
            isPlaying = false;
            playBtn.textContent = '▶';
        }
    });

    volumeSlider.addEventListener('input', function() {
        if (gainNode) {
            gainNode.gain.setValueAtTime(this.value * 0.1, audioCtx.currentTime);
        }
    });
} else {
    // Use actual audio file
    audio.src = SITE_CONFIG.musicPath;
    
    playBtn.addEventListener('click', function() {
        audio.play();
        playBtn.textContent = '🔊';
    });

    pauseBtn.addEventListener('click', function() {
        audio.pause();
        playBtn.textContent = '▶';
    });

    volumeSlider.addEventListener('input', function() {
        audio.volume = this.value;
    });
}

// ============================================
// STAR CANVAS
// ============================================
const starCanvas = document.getElementById('star-canvas');
const starCtx = starCanvas.getContext('2d');
let stars = [];
let starCount = 250;

function initStars() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * starCanvas.width,
            y: Math.random() * starCanvas.height,
            size: Math.random() * 2.5 + 0.5,
            opacity: Math.random() * 0.8 + 0.2,
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            twinklePhase: Math.random() * Math.PI * 2
        });
    }
}

function drawStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    const time = Date.now() * 0.001;

    for (const star of stars) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.4 + 0.6;
        starCtx.beginPath();
        starCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        starCtx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        starCtx.fill();

        // Add glow to brighter stars
        if (star.size > 1.8) {
            starCtx.beginPath();
            starCtx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
            starCtx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle * 0.1})`;
            starCtx.fill();
        }
    }

    requestAnimationFrame(drawStars);
}

initStars();
drawStars();

window.addEventListener('resize', initStars);

// ============================================
// PARTICLE CANVAS (Petals, Sparkles, Fireflies)
// ============================================
const particleCanvas = document.getElementById('particle-canvas');
const particleCtx = particleCanvas.getContext('2d');
let particles = [];
let particleTypes = ['petal', 'sparkle', 'firefly'];

function initParticles() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
    particles = [];

    // Rose petals
    for (let i = 0; i < 15; i++) {
        particles.push(createParticle('petal'));
    }
    // Sparkles
    for (let i = 0; i < 20; i++) {
        particles.push(createParticle('sparkle'));
    }
    // Fireflies
    for (let i = 0; i < 12; i++) {
        particles.push(createParticle('firefly'));
    }
}

function createParticle(type) {
    const base = {
        type: type,
        x: Math.random() * particleCanvas.width,
        y: Math.random() * particleCanvas.height * -1,
        size: 0,
        speedY: 0,
        speedX: 0,
        opacity: 1,
        rotation: 0,
        rotationSpeed: 0,
        life: 1,
        color: ''
    };

    switch (type) {
        case 'petal':
            base.size = Math.random() * 8 + 5;
            base.speedY = Math.random() * 0.5 + 0.3;
            base.speedX = Math.random() * 0.3 - 0.15;
            base.rotation = Math.random() * Math.PI * 2;
            base.rotationSpeed = Math.random() * 0.02 - 0.01;
            base.color = `hsla(${340 + Math.random() * 30}, 80%, ${60 + Math.random() * 20}%, 0.8)`;
            break;
        case 'sparkle':
            base.size = Math.random() * 2 + 1;
            base.speedY = Math.random() * 0.3 + 0.1;
            base.speedX = Math.random() * 0.2 - 0.1;
            base.color = `hsla(${Math.random() * 60 + 290}, 90%, 70%, 0.9)`;
            break;
        case 'firefly':
            base.size = Math.random() * 3 + 2;
            base.speedY = Math.random() * 0.2 - 0.1;
            base.speedX = Math.random() * 0.3 - 0.15;
            base.color = `rgba(255, 255, ${180 + Math.random() * 75}, ${0.6 + Math.random() * 0.3})`;
            break;
    }

    return base;
}

function drawParticles() {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    const time = Date.now() * 0.001;

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Update position
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + i) * 0.1;
        p.rotation += p.rotationSpeed || 0;

        // Firefly glow effect
        if (p.type === 'firefly') {
            const glow = Math.sin(time * 2 + i) * 0.3 + 0.5;
            particleCtx.beginPath();
            particleCtx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
            particleCtx.fillStyle = `rgba(255, 255, 200, ${glow * 0.15})`;
            particleCtx.fill();
        }

        // Draw particle
        particleCtx.save();
        particleCtx.translate(p.x, p.y);
        particleCtx.rotate(p.rotation);

        if (p.type === 'petal') {
            // Draw petal shape
            particleCtx.beginPath();
            particleCtx.ellipse(0, 0, p.size, p.size * 0.4, 0, 0, Math.PI * 2);
            particleCtx.fillStyle = p.color;
            particleCtx.fill();
            // Draw vein
            particleCtx.strokeStyle = `rgba(200, 50, 80, 0.3)`;
            particleCtx.lineWidth = 0.5;
            particleCtx.beginPath();
            particleCtx.moveTo(-p.size * 0.5, 0);
            particleCtx.lineTo(p.size * 0.5, 0);
            particleCtx.stroke();
        } else if (p.type === 'sparkle') {
            // Draw star sparkle
            const sparkleSize = p.size * (Math.sin(time * 3 + i) * 0.3 + 0.7);
            particleCtx.beginPath();
            for (let j = 0; j < 4; j++) {
                const angle = (j * Math.PI / 2) + (time * 0.5);
                const cx = Math.cos(angle) * sparkleSize;
                const cy = Math.sin(angle) * sparkleSize;
                if (j === 0) particleCtx.moveTo(cx, cy);
                else particleCtx.lineTo(cx, cy);
                
                const innerAngle = angle + Math.PI / 4;
                const ix = Math.cos(innerAngle) * sparkleSize * 0.3;
                const iy = Math.sin(innerAngle) * sparkleSize * 0.3;
                particleCtx.lineTo(ix, iy);
            }
            particleCtx.closePath();
            particleCtx.fillStyle = p.color;
            particleCtx.fill();
            // Glow
            particleCtx.beginPath();
            particleCtx.arc(0, 0, sparkleSize * 2, 0, Math.PI * 2);
            particleCtx.fillStyle = `rgba(255, 255, 255, 0.1)`;
            particleCtx.fill();
        } else if (p.type === 'firefly') {
            // Draw firefly body
            particleCtx.beginPath();
            particleCtx.arc(0, 0, p.size, 0, Math.PI * 2);
            particleCtx.fillStyle = p.color;
            particleCtx.fill();
        }

        particleCtx.restore();

        // Reset if off screen
        if (p.y > particleCanvas.height + 20) {
            particles[i] = createParticle(p.type);
            particles[i].y = -20;
        }
        if (p.x < -20) p.x = particleCanvas.width + 20;
        if (p.x > particleCanvas.width + 20) p.x = -20;
    }

    requestAnimationFrame(drawParticles);
}

initParticles();
drawParticles();

window.addEventListener('resize', initParticles);

// ============================================
// FLOATING HEART BALLOONS (HTML)
// ============================================
const balloonsContainer = document.getElementById('floating-balloons');

function createBalloon() {
    const balloon = document.createElement('div');
    const size = Math.random() * 40 + 40;
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 15 + 15;
    const swayAmount = Math.random() * 100 + 50;

    balloon.innerHTML = '🎈';
    balloon.style.cssText = `
        position: absolute;
        left: ${startX}px;
        bottom: -60px;
        font-size: ${size}px;
        animation: balloonFloat${Math.random() > 0.5 ? 'A' : 'B'} ${duration}s linear infinite;
        opacity: ${Math.random() * 0.4 + 0.6};
        filter: drop-shadow(0 0 10px rgba(255, 107, 157, 0.3));
        pointer-events: none;
    `;

    // Add unique animation
    const style = document.createElement('style');
    const animName = `balloonFloat${Date.now()}_${Math.random() * 100000}`;
    style.textContent = `
        @keyframes ${animName} {
            0% {
                transform: translateY(0) translateX(0) rotate(0deg);
                opacity: ${Math.random() * 0.4 + 0.6};
            }
            25% {
                transform: translateY(-25vh) translateX(${swayAmount}px) rotate(${Math.random() * 20 - 10}deg);
            }
            50% {
                transform: translateY(-50vh) translateX(-${swayAmount * 0.5}px) rotate(${Math.random() * 20 - 10}deg);
            }
            75% {
                transform: translateY(-75vh) translateX(${swayAmount * 0.7}px) rotate(${Math.random() * 20 - 10}deg);
            }
            100% {
                transform: translateY(-110vh) translateX(-${swayAmount * 0.3}px) rotate(0deg);
                opacity: 0.2;
            }
        }
    `;
    document.head.appendChild(style);
    balloon.style.animation = `${animName} ${duration}s linear infinite`;
    balloon.style.animationDelay = `${Math.random() * 20}s`;

    balloonsContainer.appendChild(balloon);

    // Cleanup and recreate
    setTimeout(() => {
        balloon.remove();
        createBalloon();
    }, (duration + parseFloat(balloon.style.animationDelay || 0)) * 1000);
}

// Create initial balloons
for (let i = 0; i < 15; i++) {
    createBalloon();
}

// ============================================
// HEART CURSOR TRAIL
// ============================================
let cursorTrail = [];
const maxTrail = 15;

document.addEventListener('mousemove', function(e) {
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        font-size: ${Math.random() * 10 + 12}px;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.8;
        transform: translate(-50%, -50%) scale(${Math.random() * 0.5 + 0.5});
        animation: cursorFade 1s ease-out forwards;
        filter: drop-shadow(0 0 5px rgba(255, 107, 157, 0.5));
    `;
    document.body.appendChild(heart);
    
    cursorTrail.push(heart);
    if (cursorTrail.length > maxTrail) {
        const old = cursorTrail.shift();
        old.remove();
    }

    setTimeout(() => {
        heart.remove();
        cursorTrail = cursorTrail.filter(h => h !== heart);
    }, 1000);
});

// Add keyframe for cursor trail
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    @keyframes cursorFade {
        0% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -150%) scale(0.3); }
    }
`;
document.head.appendChild(cursorStyle);

// ============================================
// RIPPLE EFFECT ON CLICK
// ============================================
document.addEventListener('click', function(e) {
    const ripple = document.createElement('div');
    const size = Math.random() * 40 + 30;
    ripple.className = 'ripple';
    ripple.style.cssText = `
        left: ${e.clientX - size/2}px;
        top: ${e.clientY - size/2}px;
        width: ${size}px;
        height: ${size}px;
    `;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
});

// ============================================
// TIMER FUNCTION
// ============================================
function updateTimer() {
    const startDate = new Date(SITE_CONFIG.startDate);
    const now = new Date();
    let totalSeconds = Math.max(0, Math.floor((now - startDate) / 1000));

    const secondsPerYear = Math.floor(365.25 * 24 * 60 * 60);
    const secondsPerMonth = Math.floor(30.44 * 24 * 60 * 60);
    const secondsPerDay = 24 * 60 * 60;
    const secondsPerHour = 60 * 60;

    const years = Math.floor(totalSeconds / secondsPerYear);
    totalSeconds -= years * secondsPerYear;

    const months = Math.floor(totalSeconds / secondsPerMonth);
    totalSeconds -= months * secondsPerMonth;

    const days = Math.floor(totalSeconds / secondsPerDay);
    totalSeconds -= days * secondsPerDay;

    const hours = Math.floor(totalSeconds / secondsPerHour);
    totalSeconds -= hours * secondsPerHour;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds - minutes * 60;

    document.getElementById('timer-years').textContent = String(years).padStart(2, '0');
    document.getElementById('timer-months').textContent = String(months).padStart(2, '0');
    document.getElementById('timer-days').textContent = String(days).padStart(2, '0');
    document.getElementById('timer-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('timer-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('timer-seconds').textContent = String(seconds).padStart(2, '0');
}

updateTimer();
setInterval(updateTimer, 1000);

// ============================================
// NAVIGATION / SECTION SCROLLING
// ============================================
const sections = ['landing', 'timer-section', 'letter-section', 'gallery-section', 'final-section'];
const navDots = document.querySelectorAll('.nav-dot');
let currentSectionIndex = 0;

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Hide all sections
    document.querySelectorAll('section').forEach(s => {
        s.classList.add('section-hidden');
        s.classList.remove('section-visible');
    });

    // Show target section
    section.classList.remove('section-hidden');
    section.classList.add('section-visible');

    // Update nav dots
    const index = sections.indexOf(sectionId);
    if (index !== -1) {
        currentSectionIndex = index;
        navDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

navDots.forEach(dot => {
    dot.addEventListener('click', function() {
        scrollToSection(this.dataset.section);
    });
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const next = (currentSectionIndex + 1) % sections.length;
        scrollToSection(sections[next]);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = (currentSectionIndex - 1 + sections.length) % sections.length;
        scrollToSection(sections[prev]);
    }
});

// Show first section by default
scrollToSection('landing');

// ============================================
// LOVE LETTER TYPING ANIMATION
// ============================================
function typeLetter() {
    const letterContent = document.getElementById('letter-content');
    const text = SITE_CONFIG.loveLetter;
    let index = 0;
    letterContent.innerHTML = '';

    function type() {
        if (index < text.length) {
            const char = text.charAt(index);
            if (char === '\n') {
                letterContent.innerHTML += '<br>';
            } else {
                letterContent.innerHTML += char;
            }
            index++;
            // Random delay for realistic typing
            const delay = char === '.' || char === ',' || char === '\n' ? 80 : 
                        char === ' ' ? 20 : Math.random() * 30 + 20;
            setTimeout(type, delay);
        } else {
            // Add blinking cursor at the end
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            letterContent.appendChild(cursor);
        }
    }

    // Start typing when letter section becomes visible
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.classList.contains('section-visible') && !mutation.target.dataset.typed) {
                mutation.target.dataset.typed = 'true';
                setTimeout(type, 500);
            }
        });
    });

    const letterSection = document.getElementById('letter-section');
    observer.observe(letterSection, { attributes: true, attributeFilter: ['class'] });

    // Also type if already visible
    if (letterSection.classList.contains('section-visible') && !letterSection.dataset.typed) {
        letterSection.dataset.typed = 'true';
        setTimeout(type, 500);
    }
}

typeLetter();

// ============================================
// HEART CONFETTI
// ============================================
function releaseConfetti() {
    const colors = ['#ff6b9d', '#ff2d55', '#c44dff', '#ff9f43', '#f59e0b', '#ff6b6b', '#a29bfe', '#fd79a8'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const size = Math.random() * 20 + 10;
            const startX = Math.random() * window.innerWidth;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const duration = Math.random() * 3 + 2;
            const drift = Math.random() * 200 - 100;

            confetti.textContent = '❤️';
            confetti.style.cssText = `
                position: fixed;
                left: ${startX}px;
                top: -30px;
                font-size: ${size}px;
                color: ${color};
                pointer-events: none;
                z-index: 999;
                animation: confettiFall${i} ${duration}s ease-in forwards;
                filter: drop-shadow(0 0 5px ${color});
            `;

            // Create unique animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes confettiFall${i} {
                    0% {
                        transform: translateY(0) translateX(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(${window.innerHeight + 50}px) translateX(${drift}px) rotate(${Math.random() * 720 - 360}deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
                style.remove();
            }, duration * 1000);
        }, i * 30);
    }
}

// ============================================
// HEART FIREWORKS (Canvas-based)
// ============================================
const fireworkCanvas = document.getElementById('firework-canvas');
const fireworkCtx = fireworkCanvas.getContext('2d');
let fireworks = [];
let fireworkLaunched = false;

function initFireworkCanvas() {
    fireworkCanvas.width = window.innerWidth;
    fireworkCanvas.height = window.innerHeight;
}
initFireworkCanvas();
window.addEventListener('resize', initFireworkCanvas);

class HeartFirework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
        this.exploded = false;
        this.life = 1;
        
        // Colors for particles
        this.colors = [
            `hsl(${Math.random() * 360}, 100%, 60%)`,
            `hsl(${Math.random() * 360}, 80%, 70%)`,
            `hsl(${Math.random() * 360}, 100%, 50%)`,
            '#ff6b9d', '#ff2d55', '#c44dff', '#f59e0b', '#ff9f43'
        ];
    }

    explode() {
        this.exploded = true;
        const numParticles = 80;
        
        // Generate heart shape points
        for (let i = 0; i < numParticles; i++) {
            const t = (i / numParticles) * Math.PI * 2;
            // Parametric heart equation
            const hx = 16 * Math.pow(Math.sin(t), 3);
            const hy = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
            
            // Scale and rotate
            const scale = Math.random() * 40 + 20;
            const angle = Math.atan2(hy, hx);
            const distance = Math.sqrt(hx*hx + hy*hy) * scale / 16;
            
            const speed = distance * 0.03;
            const startAngle = angle + (Math.random() - 0.5) * 0.3;
            
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(startAngle) * speed,
                vy: Math.sin(startAngle) * speed,
                size: Math.random() * 3 + 2,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                life: 1,
                decay: Math.random() * 0.01 + 0.005,
                gravity: 0.03
            });
        }

        // Add extra sparkles
        for (let i = 0; i < 30; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 8 + 2;
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * speed * 0.1,
                vy: Math.sin(angle) * speed * 0.1,
                size: Math.random() * 1.5 + 0.5,
                color: '#ffffff',
                life: 1,
                decay: Math.random() * 0.02 + 0.01,
                gravity: 0.01
            });
        }
    }

    update() {
        if (!this.exploded) return;

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.vx *= 0.99;
            p.life -= p.decay;
            
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }

        if (this.particles.length === 0) {
            this.life = 0;
        }
    }

    draw() {
        if (!this.exploded) return;

        for (const p of this.particles) {
            fireworkCtx.beginPath();
            fireworkCtx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            fireworkCtx.fillStyle = p.color;
            fireworkCtx.globalAlpha = p.life;
            fireworkCtx.fill();
            
            // Glow effect
            fireworkCtx.beginPath();
            fireworkCtx.arc(p.x, p.y, p.size * p.life * 3, 0, Math.PI * 2);
            fireworkCtx.fillStyle = `rgba(255, 255, 255, ${p.life * 0.1})`;
            fireworkCtx.fill();
        }
        fireworkCtx.globalAlpha = 1;
    }
}

// Launch a single firework
function launchFirework() {
    const x = Math.random() * (fireworkCanvas.width * 0.8) + fireworkCanvas.width * 0.1;
    const y = Math.random() * (fireworkCanvas.height * 0.4) + fireworkCanvas.height * 0.1;
    const fw = new HeartFirework(x, y);
    fireworks.push(fw);
    
    // Explode with slight delay (like rocket reaching peak)
    setTimeout(() => {
        fw.explode();
        
        // Try to play explosion sound
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.3);
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.3);
        } catch(e) { /* Silently fail if audio not available */ }
    }, 200);

    // Launch more from different positions
    setTimeout(() => {
        if (fireworkLaunched) {
            const x2 = Math.random() * (fireworkCanvas.width * 0.8) + fireworkCanvas.width * 0.1;
            const y2 = Math.random() * (fireworkCanvas.height * 0.4) + fireworkCanvas.height * 0.1;
            const fw2 = new HeartFirework(x2, y2);
            fireworks.push(fw2);
            setTimeout(() => fw2.explode(), 200);
        }
    }, 400);

    setTimeout(() => {
        if (fireworkLaunched) {
            const x3 = Math.random() * (fireworkCanvas.width * 0.8) + fireworkCanvas.width * 0.1;
            const y3 = Math.random() * (fireworkCanvas.height * 0.4) + fireworkCanvas.height * 0.1;
            const fw3 = new HeartFirework(x3, y3);
            fireworks.push(fw3);
            setTimeout(() => fw3.explode(), 200);
        }
    }, 800);
}

// Firework animation loop
function animateFireworks() {
    fireworkCtx.clearRect(0, 0, fireworkCanvas.width, fireworkCanvas.height);
    
    for (let i = fireworks.length - 1; i >= 0; i--) {
        const fw = fireworks[i];
        fw.update();
        fw.draw();
        if (fw.life <= 0) {
            fireworks.splice(i, 1);
        }
    }

    requestAnimationFrame(animateFireworks);
}
animateFireworks();

// Launch fireworks function (called by button)
let fireworkInterval = null;

function launchFireworks() {
    if (!fireworkLaunched) {
        fireworkLaunched = true;
        
        // Launch multiple fireworks
        launchFirework();
        
        // Launch more with delays
        setTimeout(launchFirework, 400);
        setTimeout(launchFirework, 800);
        setTimeout(launchFirework, 1200);
        setTimeout(launchFirework, 1600);
        
        // Keep launching for a while
        let count = 0;
        fireworkInterval = setInterval(() => {
            if (count < 6) {
                launchFirework();
                count++;
            } else {
                clearInterval(fireworkInterval);
            }
        }, 800);

        // Release confetti
        setTimeout(releaseConfetti, 600);
        setTimeout(releaseConfetti, 1400);

        // Navigate to final section after fireworks
        setTimeout(() => {
            scrollToSection('final-section');
            // More confetti when reaching final section
            setTimeout(releaseConfetti, 500);
            setTimeout(releaseConfetti, 1500);
            setTimeout(releaseConfetti, 3000);
        }, 3000);
    }
}

// ============================================
// EXTRA FLOATING HEARTS (for final section)
// ============================================
function createFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    
    setInterval(() => {
        if (document.getElementById('final-section').classList.contains('section-visible')) {
            const heart = document.createElement('div');
            const size = Math.random() * 20 + 15;
            const startX = Math.random() * window.innerWidth;
            const duration = Math.random() * 5 + 4;
            const drift = Math.random() * 150 - 75;

            heart.textContent = '❤️';
            heart.style.cssText = `
                position: absolute;
                left: ${startX}px;
                bottom: -30px;
                font-size: ${size}px;
                opacity: ${Math.random() * 0.5 + 0.3};
                animation: floatUp${Date.now()}_${Math.random() * 100000} ${duration}s ease-in forwards;
                filter: drop-shadow(0 0 8px rgba(255, 107, 157, 0.4));
                pointer-events: none;
            `;

            const style = document.createElement('style');
            const animName = `floatUp${Date.now()}_${Math.random() * 100000}`;
            style.textContent = `
                @keyframes ${animName} {
                    0% {
                        transform: translateY(0) translateX(0) rotate(0deg);
                        opacity: ${Math.random() * 0.5 + 0.3};
                    }
                    100% {
                        transform: translateY(-110vh) translateX(${drift}px) rotate(${Math.random() * 360}deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            heart.style.animation = `${animName} ${duration}s ease-in forwards`;

            container.appendChild(heart);

            setTimeout(() => {
                heart.remove();
                style.remove();
            }, duration * 1000 + 100);
        }
    }, 400);
}

createFloatingHearts();

// ============================================
// SMOOTH SCROLLING & PARALLAX
// ============================================
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    const moon = document.querySelector('.moon');
    if (moon) {
        moon.style.transform = `translateY(${scrollY * 0.05}px)`;
    }
});

console.log('❤️ Happy 45th Monthsary! ❤️');
console.log('Made with love for the most beautiful 45 months.');

