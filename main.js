import './style.css';

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg', 'bg-background/80');
        navbar.classList.remove('bg-background/50', 'border-b', 'border-white/10');
    } else {
        navbar.classList.remove('shadow-lg', 'bg-background/80');
        navbar.classList.add('bg-background/50', 'border-b', 'border-white/10');
    }
});

// Scroll Reveal Animation Initialization
export function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();

    // 2. Timeline Progress & Glow Logic
    const timelineContainer = document.getElementById('timeline-container');
    const timelineProgress = document.getElementById('timeline-progress');
    const timelineDots = document.querySelectorAll('.timeline-dot');

    if (timelineContainer && timelineProgress) {
        window.addEventListener('scroll', () => {
            const containerRect = timelineContainer.getBoundingClientRect();
            // Start filling when the top of the container hits the middle of the screen
            const fillStart = window.innerHeight * 0.6; 
            
            if (containerRect.top < fillStart) {
                const scrolledLength = fillStart - containerRect.top;
                let percentage = (scrolledLength / containerRect.height) * 100;
                percentage = Math.max(0, Math.min(100, percentage));
                timelineProgress.style.height = percentage + '%';
            } else {
                timelineProgress.style.height = '0%';
            }

            // Light up dots
            timelineDots.forEach(dot => {
                const dotRect = dot.getBoundingClientRect();
                if (dotRect.top < fillStart + 50) { // Slight offset for triggering
                    dot.classList.add('bg-primary', 'shadow-[0_0_15px_rgba(139,92,246,0.6)]');
                    dot.classList.remove('bg-slate-300', 'dark:bg-slate-700');
                } else {
                    dot.classList.remove('bg-primary', 'shadow-[0_0_15px_rgba(139,92,246,0.6)]');
                    dot.classList.add('bg-slate-300', 'dark:bg-slate-700');
                }
            });
        });
    }

    // 3. Floating Nav Bar Logic
    const floatingNav = document.getElementById('floating-nav');
    const topNavbar = document.getElementById('navbar');
    const heroSection = document.getElementById('home');

    if (floatingNav && heroSection) {
        window.addEventListener('scroll', () => {
            const heroRect = heroSection.getBoundingClientRect();
            if (heroRect.bottom < 100) { // Scrolled past hero
                floatingNav.classList.remove('translate-y-32', 'opacity-0');
                if (topNavbar) topNavbar.classList.add('-translate-y-full'); // Hide top nav
            } else { // In hero
                floatingNav.classList.add('translate-y-32', 'opacity-0');
                if (topNavbar) topNavbar.classList.remove('-translate-y-full'); // Show top nav
            }
        });
    }

    // 4. Magnetic Buttons Physics
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            // Elastic distance formula
            btn.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px) scale(1.1)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px) scale(1)`;
            btn.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'transform 0.1s linear';
        });
    });

    // 1. Interactive Tech Background via tsParticles
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "grab" },
                },
                modes: {
                    grab: { distance: 200, links: { opacity: 0.5 } }
                }
            },
            particles: {
                color: { value: "#8b5cf6" }, // Primary purple
                links: {
                    color: "#3b82f6", // Secondary blue
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: "bounce",
                    random: true,
                    speed: 0.8,
                    straight: false
                },
                number: {
                    density: { enable: true, area: 800 },
                    value: 60 // Sparse tech grid
                },
                opacity: { value: 0.5 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } }
            },
            detectRetina: true
        });
    }

    // 1. Interactive Tech Background via tsParticles
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "grab" },
                },
                modes: {
                    grab: {
                        distance: 200,
                        links: { opacity: 0.5 }
                    }
                }
            },
            particles: {
                color: { value: "#8b5cf6" }, // Primary purple
                links: {
                    color: "#3b82f6", // Secondary blue
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: "bounce",
                    random: true,
                    speed: 0.8,
                    straight: false
                },
                number: {
                    density: { enable: true, area: 800 },
                    value: 50 // Sparse tech grid
                },
                opacity: { value: 0.5 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } }
            },
            detectRetina: true
        });
    }

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    function updateThemeIcon() {
        if (!themeToggleBtn) return;
        if (htmlElement.classList.contains('dark')) {
            themeToggleBtn.innerHTML = '<svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 4.22a1 1 0 011.415 0l.708.707a1 1 0 01-1.414 1.414l-.708-.707a1 1 0 010-1.414zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM14.22 15.636a1 1 0 01-1.415 0l-.707-.707a1 1 0 011.414-1.415l.707.707a1 1 0 010 1.415zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.22-4.22a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zm2.93-5.636a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.415l-.707-.707a1 1 0 010-1.415zM10 5a5 5 0 100 10 5 5 0 000-10z" clip-rule="evenodd" /></svg>';
        } else {
            themeToggleBtn.innerHTML = '<svg class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>';
        }
    }

    if (localStorage.getItem('theme') === 'light') {
        htmlElement.classList.remove('dark');
    } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }

    updateThemeIcon();

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            updateThemeIcon();
            localStorage.setItem('theme', htmlElement.classList.contains('dark') ? 'dark' : 'light');
        });
    }

    // Custom Ambient Cursor Glow
    const glow = document.createElement('div');
    glow.className = 'pointer-events-none fixed w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] -z-10 transition-opacity duration-500 hidden md:block dark:mix-blend-screen';
    glow.style.transform = 'translate(-50%, -50%)';
    glow.style.top = '0';
    glow.style.left = '0';
    glow.style.opacity = '0';
    document.body.appendChild(glow);

    let mouseTimeout;
    window.addEventListener('mousemove', (e) => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
        glow.style.opacity = '1';
        
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            glow.style.opacity = '0';
        }, 1500);
    });
});
