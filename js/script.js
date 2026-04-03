// ===== CACHE DOM =====
const DOM = {
    hamburger: document.querySelector('.hamburger'),
    navMenu: document.querySelector('.nav-menu'),
    navLinks: document.querySelectorAll('.nav-link'),
    header: document.querySelector('.header'),
    backToTop: document.getElementById('backToTop'),
    sections: document.querySelectorAll('section'),
    statNumbers: document.querySelectorAll('.stat-number')
};

// ===== PRELOADER =====
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    setTimeout(() => {
        preloader.classList.add('hide');
        preloader.remove();
    }, 800);
});

// ===== MENU MOBILE =====
DOM.hamburger?.addEventListener('click', () => {
    DOM.hamburger.classList.toggle('active');
    DOM.navMenu?.classList.toggle('active');
    document.body.style.overflow =
        DOM.navMenu?.classList.contains('active') ? 'hidden' : '';
});

DOM.navLinks.forEach(link => {
    link.addEventListener('click', () => {
        DOM.hamburger?.classList.remove('active');
        DOM.navMenu?.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href'))
            ?.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== TYPING ANIMATION =====
const typedTextElement = document.querySelector('.typed-text');

if (typedTextElement) {
    const words = ['Desenvolvimento de Sistemas', 'Full Stack', 'Suporte TI', 'Programação'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        typedTextElement.textContent = isDeleting
            ? currentWord.substring(0, charIndex--)
            : currentWord.substring(0, charIndex++);

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            return setTimeout(typeEffect, 2000);
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(typeEffect, isDeleting ? 80 : 120);
    }

    typeEffect();
}

// ===== ANIMAÇÃO SKILLS (CORRIGIDA) =====
function animateSkills() {
    const bars = document.querySelectorAll('.skill-progress, .language-progress');

    bars.forEach(bar => {
        if (!bar.dataset.target) {
            bar.dataset.target = bar.style.width || '80%';
            bar.style.width = '0%';
        }

        const rect = bar.getBoundingClientRect();
        const visible = rect.top < window.innerHeight - 50;

        if (visible && !bar.classList.contains('animated')) {
            bar.style.width = bar.dataset.target;
            bar.classList.add('animated');
        }
    });
}

// ===== REVEAL =====
function revealOnScroll() {
    document.querySelectorAll('.about-card, .education-card, .timeline-item, .skills-category, .contact-card, .project-card')
        .forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100 && !el.classList.contains('revealed')) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.classList.add('revealed');
            }
        });
}

// ===== STATS =====
let statsAnimated = false;

function animateStats() {
    const statsSection = document.querySelector('.stats-card');
    if (!statsSection) return false;

    const rect = statsSection.getBoundingClientRect();
    if (!(rect.top < window.innerHeight && rect.bottom > 0)) return false;

    DOM.statNumbers.forEach(stat => {
        const target = +stat.dataset.count;
        let current = 0;
        const increment = target / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 30);
    });

    return true;
}

// ===== BACK TO TOP =====
DOM.backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SCROLL CENTRALIZADO =====
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // HEADER
    DOM.header?.classList.toggle('scrolled', scrollY > 50);

    // BACK TO TOP
    DOM.backToTop?.classList.toggle('show', scrollY > 300);

    // ACTIVE LINK
    let current = '';
    DOM.sections.forEach(section => {
        if (scrollY >= section.offsetTop - 200) {
            current = section.id;
        }
    });

    DOM.navLinks.forEach(link => {
        link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${current}`
        );
    });

    // ANIMAÇÕES
    animateSkills();
    revealOnScroll();

    if (!statsAnimated) {
        statsAnimated = animateStats();
    }
});

// ===== FOOTER YEAR =====
function updateFooterYear() {
    const footerText = document.querySelector('.footer-text p');
    if (footerText) {
        footerText.innerHTML = footerText.innerHTML.replace(/\d{4}/, new Date().getFullYear());
    }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    updateFooterYear();
    revealOnScroll();
    animateSkills();
});
