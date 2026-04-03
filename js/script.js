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
        const targetId = this.getAttribute('href');
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
    const navLinksElements = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksElements.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
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

// ===== SKILLS ANIMATION ON SCROLL =====
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress, .language-progress');
    
    skillBars.forEach(bar => {
        // Verificar se a barra já foi animada
        if (bar.classList.contains('animated')) return;
        
        // Verificar se a barra está visível
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 50 && rect.bottom > 0;
        
        if (isVisible) {
            // Salvar a largura original se ainda não foi salva
            if (!bar.hasAttribute('data-target-width')) {
                let targetWidth = bar.style.width;
                if (!targetWidth || targetWidth === '0%' || targetWidth === '0px') {
                    // Tenta pegar do inline style ou define um valor padrão
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
            
            const targetWidth = bar.getAttribute('data-target-width');
            if (targetWidth && targetWidth !== '0%' && targetWidth !== '0px') {
                setTimeout(() => {
                    bar.style.width = targetWidth;
                    bar.classList.add('animated');
                }, 100);
            }
        }
    });
}

// ===== SCROLL REVEAL ANIMATION =====
function revealOnScroll() {
    const revealElements = document.querySelectorAll('.about-card, .education-card, .timeline-item, .skills-category, .contact-card, .project-card');
    
    revealElements.forEach(element => {
        if (element.classList.contains('revealed')) return;
        
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible) {
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
}

// Inicializar estilos dos elementos reveal
function initRevealStyles() {
    const revealElements = document.querySelectorAll('.about-card, .education-card, .timeline-item, .skills-category, .contact-card, .project-card');
    revealElements.forEach(element => {
        if (!element.classList.contains('revealed')) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
        }
    });
}

// ===== PROJETOS E BLOG =====
function initProjects() {
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
}

// ===== MODAL PARA PROJETOS =====
function initModal() {
    const modal = document.getElementById('projectModal');
    const modalClose = document.querySelector('.modal-close');
    
    // Dados dos projetos baseados no HTML atual
    const projectsData = [
        {
            title: 'SIEA - Sistema Integrado de Educação e Avaliação',
            tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'Bootstrap', 'PostgreSQL'],
            description: 'Solução inteligente de gestão educacional que conecta dados acadêmicos, administrativos e financeiros.',
            fullDescription: 'O SIEA é uma plataforma completa para instituições de ensino que centraliza todas as informações acadêmicas, administrativas e financeiras. O sistema permite o gerenciamento de alunos, professores, turmas, notas, frequência, boletos e muito mais. Com relatórios detalhados e dashboard interativo, os gestores têm uma visão completa da instituição.',
            challenges: 'O principal desafio foi integrar diferentes módulos (acadêmico, financeiro e administrativo) em um único sistema coeso, garantindo consistência dos dados e performance mesmo com grande volume de informações.',
            solutions: 'Utilizei uma arquitetura MVC bem estruturada, com PostgreSQL como banco de dados relacional. Implementei triggers e stored procedures para garantir integridade referencial e otimizei as consultas com índices estratégicos.',
            technologies: 'PHP 8, PostgreSQL, HTML5, CSS3, JavaScript, Bootstrap 5, Chart.js para gráficos, TCPDF para geração de relatórios',
            link: '#',
            github: '#'
        },
        {
            title: 'GIRH - Gestão Integrada de Recursos Humanos',
            tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'Bootstrap', 'PostgreSQL'],
            description: 'ERP de recursos humanos desenvolvido para automatizar e centralizar a gestão de pessoas.',
            fullDescription: 'O GIRH é um sistema completo para gestão de recursos humanos que automatiza processos como controle de ponto, folha de pagamento, recrutamento e seleção, avaliação de desempenho e gestão de benefícios. O sistema oferece dashboards para gestores e colaboradores, com permissões granulares de acesso.',
            challenges: 'O maior desafio foi implementar as regras de negócio da legislação trabalhista brasileira, incluindo cálculos de horas extras, adicionais e descontos.',
            solutions: 'Desenvolvi um módulo específico para cálculos trabalhistas com validações automáticas. Utilizei triggers no banco de dados para auditoria de alterações e versionamento de informações dos colaboradores.',
            technologies: 'PHP 8, PostgreSQL, JavaScript, Bootstrap 5, HTML5, CSS3, jQuery para requisições AJAX',
            link: '#',
            github: '#'
        },
        {
            title: 'RiciBuild - Construindo eficiência, projetando lucro!',
            tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'PostgreSQL'],
            description: 'Plataforma completa para gerenciar obras, equipes, ferramentas e equipamentos.',
            fullDescription: 'O RiciBuild é uma plataforma de gestão para construtoras e empresas do ramo da construção civil. O sistema permite gerenciar múltiplas obras simultaneamente, controlar equipes de trabalho, alocar ferramentas e equipamentos, além de calcular projeções de lucro baseadas em custos e prazos.',
            challenges: 'O gerenciamento de múltiplas obras com calendários conflitantes de equipamentos e equipes foi o maior desafio técnico do projeto.',
            solutions: 'Implementei um algoritmo de alocação automática que sugere a melhor distribuição de recursos baseado em prioridade e disponibilidade. O sistema evita conflitos de agendamento e otimiza o uso dos equipamentos.',
            technologies: 'PHP 8, PostgreSQL, JavaScript, HTML5, CSS3, FullCalendar para agendamentos, Chart.js para gráficos financeiros',
            link: '#',
            github: '#'
        }
    ];
    
    function openProjectModal(projectIndex) {
        const project = projectsData[projectIndex];
        if (!project || !modal) return;
        
        const modalBody = document.getElementById('modalBody');
        if (modalBody) {
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
        }
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            if (modal) modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Adicionar evento aos botões "Ver detalhes" ou "Ler artigo"
    const readMoreBtns = document.querySelectorAll('.read-more');
    const projectCards = document.querySelectorAll('.project-card');
    
    readMoreBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectCard = btn.closest('.project-card');
            const projectIndex = Array.from(projectCards).indexOf(projectCard);
            if (projectsData[projectIndex]) {
                openProjectModal(projectIndex);
            }
        });
    });
}

// ===== CONTACT FORM SUBMISSION =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    function showNotification(message, type = 'success') {
        // Remove notificações existentes
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
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
            
            // Simulação de envio (substituir por chamada real à API)
            setTimeout(() => {
                showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// ===== HOVER EFFECT FOR CARDS =====
function initHoverEffects() {
    const cards = document.querySelectorAll('.about-card, .education-card, .timeline-content, .contact-card, .skills-category, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// ===== DYNAMIC YEAR IN FOOTER =====
function updateFooterYear() {
    const footerText = document.querySelector('.footer-text p');
    if (footerText) {
        const year = new Date().getFullYear();
        footerText.innerHTML = footerText.innerHTML.replace(/\d{4}/, year);
    }
}

// ===== DOWNLOAD CV FUNCTION =====
function initDownloadCV() {
    const downloadBtn = document.getElementById('downloadCV');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Currículo disponível para download em breve!', 'info');
        });
    }
}

// Função auxiliar para notificações (para uso no download CV)
function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== PARALLAX EFFECT =====
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero');
        if (hero && window.innerWidth > 768) {
            hero.style.backgroundPosition = `center ${scrolled * 0.3}px`;
        }
    });
}

// ===== ADICIONAR CSS ANIMATION KEYFRAMES =====
function addAnimationKeyframes() {
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
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
}

// ===== ANIMAÇÃO DAS HABILIDADES NA SEÇÃO SKILLS =====
function animateSkillsOnLoad() {
    // Aguarda um pouco para garantir que tudo esteja carregado
    setTimeout(() => {
        const skillBars = document.querySelectorAll('.skill-progress, .language-progress');
        skillBars.forEach(bar => {
            const targetWidth = bar.style.width;
            if (targetWidth && targetWidth !== '0%' && targetWidth !== '0px') {
                bar.setAttribute('data-target-width', targetWidth);
                bar.style.width = '0%';
            }
        });
        animateSkills();
    }, 500);
}

// ===== INICIALIZAR TUDO =====
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar estilos
    initRevealStyles();
    addAnimationKeyframes();
    
    // Inicializar funcionalidades
    initProjects();
    initModal();
    initContactForm();
    initHoverEffects();
    initDownloadCV();
    initParallax();
    updateFooterYear();
    
    // Inicializar animações
    animateSkillsOnLoad();
    setTimeout(() => {
        revealOnScroll();
        animateStats();
    }, 300);
});

// Adicionar event listeners para scroll
window.addEventListener('scroll', () => {
    animateSkills();
    revealOnScroll();
    animateStats();
});

// Garantir que as imagens dos projetos tenham fallback
window.addEventListener('load', () => {
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach(img => {
        img.onerror = function() {
            if (!this.src.includes('placehold.co')) {
                this.src = 'https://placehold.co/400x250/4f46e5/white?text=Em+Breve';
            }
        };
    });
    
    // Re-animar elementos após carregamento completo
    setTimeout(() => {
        revealOnScroll();
        animateSkills();
    }, 200);
});
