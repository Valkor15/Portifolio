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

    preloader.classList.add('hide');
    setTimeout(() => preloader.remove(), 500);
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

// ===== TYPING =====
const typed = document.querySelector('.typed-text');

if (typed) {
    const words = ['Desenvolvimento de Sistemas', 'Full Stack', 'Suporte TI', 'Programação'];
    let i = 0, j = 0, del = false;

    function type() {
        const word = words[i];

        typed.textContent = del
            ? word.substring(0, j--)
            : word.substring(0, j++);

        if (!del && j === word.length) {
            del = true;
            return setTimeout(type, 1500);
        }

        if (del && j === 0) {
            del = false;
            i = (i + 1) % words.length;
        }

        setTimeout(type, del ? 60 : 100);
    }

    type();
}

// ===== SKILLS =====
function animateSkills() {
    document.querySelectorAll('.skill-progress:not(.animated), .language-progress:not(.animated)')
        .forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                bar.style.width = bar.dataset.target || bar.style.width || '80%';
                bar.classList.add('animated');
            }
        });
}

// ===== REVEAL =====
function revealOnScroll() {
    document.querySelectorAll('.about-card:not(.revealed), .education-card:not(.revealed), .project-card:not(.revealed)')
        .forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add('revealed');
            }
        });
}

// ===== STATS =====
let statsDone = false;

function animateStats() {
    if (statsDone) return;

    const section = document.querySelector('.stats-card');
    if (!section) return;

    const rect = section.getBoundingClientRect();
    if (!(rect.top < window.innerHeight && rect.bottom > 0)) return;

    DOM.statNumbers.forEach(stat => {
        const target = +stat.dataset.count;
        let current = 0;
        const step = target / 40;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 25);
    });

    statsDone = true;
}

// ===== BACK TO TOP =====
DOM.backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SCROLL OTIMIZADO =====
let ticking = false;

function onScroll() {
    const y = window.scrollY;

    DOM.header?.classList.toggle('scrolled', y > 50);
    DOM.backToTop?.classList.toggle('show', y > 300);

    let current = '';
    DOM.sections.forEach(sec => {
        if (y >= sec.offsetTop - 200) current = sec.id;
    });

    DOM.navLinks.forEach(link => {
        link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${current}`
        );
    });

    animateSkills();
    revealOnScroll();
    animateStats();

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
    }
});

// ===== FOOTER =====
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('.footer-text p');
    if (footer) {
        footer.innerHTML = footer.innerHTML.replace(/\d{4}/, new Date().getFullYear());
    }

    // inicia leve
    revealOnScroll();
    animateSkills();
});
