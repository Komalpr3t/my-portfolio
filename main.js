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
