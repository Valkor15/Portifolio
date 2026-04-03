// ===== PRELOADER =====
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hide');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// ===== MENU MOBILE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
});

// ===== ACTIVE NAVIGATION LINK ON SCROLL =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop?.classList.add('show');
    } else {
        backToTop?.classList.remove('show');
    }
});

backToTop?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
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
        
        if (isDeleting) {
            typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
        
        const speed = isDeleting ? 100 : 150;
        setTimeout(typeEffect, speed);
    }
    
    typeEffect();
}

// ===== STATS COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

function animateStats() {
    if (animated) return;
    
    const statsSection = document.querySelector('.stats-card');
    if (!statsSection) return;
    
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
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
        animated = true;
    }
}

window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);

// ===== SKILLS ANIMATION ON SCROLL =====
const skillBars = document.querySelectorAll('.skill-progress, .language-progress');

skillBars.forEach(bar => {
    const originalWidth = bar.style.width;
    if (originalWidth && originalWidth !== '0%') {
        bar.setAttribute('data-target-width', originalWidth);
    } else {
        bar.setAttribute('data-target-width', '0%');
    }
    bar.style.width = '0%';
    bar.classList.remove('animated');
});

function animateSkills() {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 50 && rect.bottom > 0;
        
        if (isVisible && !bar.classList.contains('animated')) {
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

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.about-card, .education-card, .timeline-item, .skills-category, .contact-card, .project-card');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible && !element.classList.contains('revealed')) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.classList.add('revealed');
            }, 100);
        }
    });
};

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
});

// ===== PROJETOS E BLOG =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== MODAL PARA PROJETOS =====
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');

const projectsData = {
    0: {
        title: 'Portfólio Profissional',
        tags: ['HTML5', 'CSS3', 'JavaScript'],
        date: '2024',
        description: 'Site de portfólio pessoal com design moderno, responsivo e animações interativas.',
        fullDescription: 'Este projeto foi desenvolvido com foco em design moderno e animações suaves. Utilizei HTML5 semântico, CSS3 com Flexbox e Grid, além de JavaScript para interações dinâmicas. O site é totalmente responsivo e otimizado para SEO.',
        challenges: 'O principal desafio foi criar animações fluidas sem comprometer o desempenho. Utilizei técnicas de lazy loading e otimizei as transições CSS.',
        solutions: 'Implementei scroll reveal animations e otimizei as imagens para garantir carregamento rápido.',
        technologies: 'HTML5, CSS3, JavaScript, Font Awesome, Google Fonts',
        link: '#',
        github: '#'
    },
    1: {
        title: 'Sistema de Gerenciamento de Tarefas',
        tags: ['PHP', 'MySQL', 'JavaScript'],
        date: '2024',
        description: 'Sistema completo para gerenciamento de tarefas com autenticação.',
        fullDescription: 'Sistema desenvolvido em PHP com MySQL para gerenciar tarefas de usuários. Inclui autenticação, CRUD completo, categorias e prazos.',
        challenges: 'Implementar autenticação segura e relacionamentos entre tabelas.',
        solutions: 'Utilizei prepared statements para prevenir SQL injection e bcrypt para hash de senhas.',
        technologies: 'PHP 8, MySQL, JavaScript, Bootstrap, HTML5/CSS3',
        link: '#',
        github: '#'
    },
    2: {
        title: 'Loja Virtual - E-commerce',
        tags: ['React', 'Node.js', 'MongoDB'],
        date: '2024',
        description: 'Plataforma de e-commerce completa com carrinho de compras.',
        fullDescription: 'E-commerce completo com React no frontend, Node.js no backend e MongoDB para banco de dados.',
        challenges: 'Gerenciamento de estado global e integração com API de pagamento.',
        solutions: 'Utilizei Context API para estado global e Stripe para pagamentos.',
        technologies: 'React, Node.js, MongoDB, Stripe API, JWT',
        link: '#',
        github: '#'
    },
    3: {
        title: 'Design System para App Mobile',
        tags: ['Figma', 'Photoshop', 'UI/UX'],
        date: '2023',
        description: 'Sistema de design completo para aplicativo mobile.',
        fullDescription: 'Design system completo com componentes reutilizáveis e documentação.',
        challenges: 'Criar um sistema consistente e escalável.',
        solutions: 'Desenvolvi um guia de estilos completo com componentes modulares.',
        technologies: 'Figma, Adobe Photoshop, Adobe XD',
        link: '#',
        github: '#'
    }
};

function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;
    
    modalBody.innerHTML = `
        <div class="modal-header">
            <h2>${project.title}</h2>
            <div class="modal-tags">
                ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
            </div>
        </div>
        <div class="modal-body">
            <div class="modal-content-section">
                <h3>Sobre o Projeto</h3>
                <p>${project.fullDescription || project.description}</p>
            </div>
            <div class="modal-content-section">
                <h3>Desafios</h3>
                <p>${project.challenges || 'Durante o desenvolvimento, enfrentei desafios técnicos que me permitiram aprender e crescer como desenvolvedor.'}</p>
            </div>
            <div class="modal-content-section">
                <h3>Soluções Implementadas</h3>
                <p>${project.solutions || 'Utilizei as melhores práticas de desenvolvimento e ferramentas modernas para garantir qualidade e performance.'}</p>
            </div>
            <div class="modal-content-section">
                <h3>Tecnologias Utilizadas</h3>
                <p>${project.technologies}</p>
            </div>
            <div class="modal-links">
                <a href="${project.link}" class="btn btn-primary" target="_blank">
                    <i class="fas fa-external-link-alt"></i> Ver Projeto
                </a>
                <a href="${project.github}" class="btn btn-outline" target="_blank">
                    <i class="fab fa-github"></i> Ver Código
                </a>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

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

document.querySelectorAll('.read-more').forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectCard = btn.closest('.project-card');
        const projectIndex = Array.from(projectCards).indexOf(projectCard);
        if (projectsData[projectIndex]) {
            openProjectModal(projectIndex);
        }
    });
});

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const subject = document.getElementById('subject')?.value.trim();
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
    
    setTimeout(() => {
        showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth > 768) {
        hero.style.backgroundPosition = `center ${scrolled * 0.3}px`;
    }
});

// ===== HOVER EFFECT FOR CARDS =====
const cards = document.querySelectorAll('.about-card, .education-card, .timeline-content, .contact-card, .skills-category');

cards.forEach(card => {
    let originalTransform = '';
    
    card.addEventListener('mouseenter', () => {
        originalTransform = card.style.transform;
        card.style.transform = 'translateY(-10px)';
        card.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = originalTransform || 'translateY(0)';
    });
});

// ===== DYNAMIC YEAR IN FOOTER =====
const footerText = document.querySelector('.footer-text p');
if (footerText) {
    const year = new Date().getFullYear();
    footerText.innerHTML = footerText.innerHTML.replace(/\d{4}/, year);
}

// ===== DOWNLOAD CV FUNCTION =====
const downloadBtn = document.getElementById('downloadCV');
if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Currículo disponível para download em breve!', 'info');
    });
}

// ===== INITIAL LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        animateSkills();
        revealOnScroll();
        animateStats();
    }, 300);
});

// Adicionar keyframes para slideOutRight
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);
