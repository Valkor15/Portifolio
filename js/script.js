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
    setTimeout(() => {
        if (preloader && preloader.parentNode) {
            preloader.remove();
        }
    }, 500);
});

// ===== MENU MOBILE =====
if (DOM.hamburger) {
    DOM.hamburger.addEventListener('click', () => {
        DOM.hamburger.classList.toggle('active');
        if (DOM.navMenu) {
            DOM.navMenu.classList.toggle('active');
        }
        document.body.style.overflow = 
            DOM.navMenu?.classList.contains('active') ? 'hidden' : '';
    });
}

DOM.navLinks.forEach(link => {
    link.addEventListener('click', () => {
        DOM.hamburger?.classList.remove('active');
        DOM.navMenu?.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== SCROLL SUAVE COM OFFSET =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== TYPING ANIMATION =====
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
            setTimeout(type, 2000);
            return;
        }

        if (del && j === 0) {
            del = false;
            i = (i + 1) % words.length;
        }

        setTimeout(type, del ? 60 : 100);
    }

    type();
}

// ===== SKILLS ANIMATION =====
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress:not(.animated), .language-progress:not(.animated)');
    
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
            // Salva a largura alvo se não estiver salva
            if (!bar.hasAttribute('data-target-width')) {
                let targetWidth = bar.style.width;
                if (!targetWidth || targetWidth === '0%' || targetWidth === '0px') {
                    const computedWidth = window.getComputedStyle(bar).width;
                    if (computedWidth && computedWidth !== '0px') {
                        targetWidth = computedWidth;
                    } else {
                        // Verifica se tem width inline
                        const inlineWidth = bar.getAttribute('style');
                        if (inlineWidth && inlineWidth.includes('width:')) {
                            const match = inlineWidth.match(/width:\s*([^;]+)/);
                            if (match) targetWidth = match[1];
                            else targetWidth = '80%';
                        } else {
                            targetWidth = '80%';
                        }
                    }
                }
                bar.setAttribute('data-target-width', targetWidth);
                bar.style.width = '0%';
            }
            
            const targetWidth = bar.getAttribute('data-target-width');
            if (targetWidth && targetWidth !== '0%') {
                setTimeout(() => {
                    bar.style.width = targetWidth;
                    bar.classList.add('animated');
                }, 100);
            }
        }
    });
}

// ===== REVEAL ON SCROLL =====
function revealOnScroll() {
    const elements = document.querySelectorAll('.about-card:not(.revealed), .education-card:not(.revealed), .project-card:not(.revealed), .timeline-item:not(.revealed), .skills-category:not(.revealed), .contact-card:not(.revealed)');
    
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.classList.add('revealed');
            }, 100);
        }
    });
}

// ===== STATS COUNTER =====
let statsDone = false;

function animateStats() {
    if (statsDone) return;

    const section = document.querySelector('.stats-card');
    if (!section) return;

    const rect = section.getBoundingClientRect();
    if (!(rect.top < window.innerHeight && rect.bottom > 0)) return;

    DOM.statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        if (isNaN(target)) return;
        
        let current = 0;
        const step = target / 40;
        const duration = 25;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, duration);
    });

    statsDone = true;
}

// ===== BACK TO TOP =====
if (DOM.backToTop) {
    DOM.backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== SCROLL OTIMIZADO (requestAnimationFrame) =====
let ticking = false;

function onScroll() {
    const y = window.scrollY;

    // Header scroll effect
    if (DOM.header) {
        if (y > 50) {
            DOM.header.classList.add('scrolled');
        } else {
            DOM.header.classList.remove('scrolled');
        }
    }

    // Back to top button visibility
    if (DOM.backToTop) {
        if (y > 300) {
            DOM.backToTop.classList.add('show');
        } else {
            DOM.backToTop.classList.remove('show');
        }
    }

    // Active navigation link
    let current = '';
    DOM.sections.forEach(sec => {
        const sectionTop = sec.offsetTop;
        const sectionHeight = sec.clientHeight;
        if (y >= sectionTop - 200) {
            current = sec.getAttribute('id');
        }
    });

    DOM.navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Animações
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

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    // Footer year
    const footer = document.querySelector('.footer-text p');
    if (footer) {
        footer.innerHTML = footer.innerHTML.replace(/\d{4}/, new Date().getFullYear());
    }
    
    // Inicializa estilos para reveal
    const revealElements = document.querySelectorAll('.about-card, .education-card, .project-card, .timeline-item, .skills-category, .contact-card');
    revealElements.forEach(el => {
        if (!el.classList.contains('revealed')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
    });
    
    // Pré-configura barras de skills
    const skillBars = document.querySelectorAll('.skill-progress, .language-progress');
    skillBars.forEach(bar => {
        if (!bar.hasAttribute('data-target-width')) {
            let targetWidth = bar.style.width;
            if (!targetWidth || targetWidth === '0%' || targetWidth === '0px') {
                const computedWidth = window.getComputedStyle(bar).width;
                if (computedWidth && computedWidth !== '0px') {
                    targetWidth = computedWidth;
                } else {
                    targetWidth = '80%';
                }
            }
            bar.setAttribute('data-target-width', targetWidth);
            bar.style.width = '0%';
        }
    });
    
    // Inicia animações
    setTimeout(() => {
        revealOnScroll();
        animateSkills();
        animateStats();
    }, 200);
});

// ===== FALLBACK PARA IMAGENS DOS PROJETOS =====
window.addEventListener('load', () => {
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach(img => {
        img.onerror = function() {
            if (!this.src.includes('placehold.co')) {
                this.src = 'https://placehold.co/400x250/4f46e5/white?text=Projeto';
            }
        };
    });
});

// ===== MODAL PARA PROJETOS (adicional) =====
function initModal() {
    const modal = document.getElementById('projectModal');
    const modalClose = document.querySelector('.modal-close');
    
    if (!modal) return;
    
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

// Inicializa modal se existir
if (document.getElementById('projectModal')) {
    initModal();
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    function showNotification(message, type = 'success') {
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const message = document.getElementById('message')?.value.trim();
        
        if (!name || !email || !message) {
            showNotification('Por favor, preencha todos os campos obrigatórios!', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Por favor, insira um e-mail válido!', 'error');
            return;
        }
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Simular envio
        setTimeout(() => {
            showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

initContactForm();

// ===== DOWNLOAD CV =====
const downloadBtn = document.getElementById('downloadCV');
if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const notification = document.createElement('div');
        notification.className = 'notification notification-info';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-info-circle"></i>
                <span>Currículo disponível para download em breve!</span>
            </div>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    });
}
