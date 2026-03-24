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
});
