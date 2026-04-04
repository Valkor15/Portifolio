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
// ===== MENU MOBILE CORRIGIDO =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinksMobile = document.querySelectorAll('.nav-links-mobile .nav-link');
const navLinksDesktop = document.querySelectorAll('.nav-links .nav-link');
const allNavLinks = [...navLinksMobile, ...navLinksDesktop];

// Abrir/fechar menu mobile
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Previne scroll quando menu está aberto
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Fechar menu ao clicar em um link
allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Fechar menu ao clicar fora (opcional)
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Atualizar link ativo no scroll
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    allNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// ===== SCROLL SUAVE COM OFFSET =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId === '#' || targetId === '') return;
        
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
        let target = parseInt(stat.getAttribute('data-count'));
        if (isNaN(target)) {
            // Se não tiver data-count, tenta pegar do texto
            const text = stat.textContent;
            target = parseInt(text);
            if (isNaN(target)) target = 100;
        }
        
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

// ===== MODAL PARA PROJETOS =====
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
        // Remove notificações existentes
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
        
        // Animação de saída
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification && notification.parentNode) {
                    notification.remove();
                }
            }, 300);
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
        if (!submitBtn) return;
        
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Simular envio (substitua por envio real quando tiver backend)
        setTimeout(() => {
            showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Inicializa formulário de contato
initContactForm();

// ===== DOWNLOAD CV =====
const downloadBtn = document.getElementById('downloadCV');
if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Adiciona animação de loading
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparando...';
        downloadBtn.disabled = true;
        
        // Simula preparação do download
        setTimeout(() => {
            const notification = document.createElement('div');
            notification.className = 'notification notification-info';
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas fa-info-circle"></i>
                    <span>Currículo disponível para download em breve!</span>
                </div>
            `;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (notification && notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }, 3000);
            
            // Restaura o botão
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        }, 1000);
    });
}

// ===== FILTRO DE PROJETOS =====
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active de todos os botões
            filterBtns.forEach(b => b.classList.remove('active'));
            // Adiciona active ao clicado
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'todos' || filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    const tags = card.querySelectorAll('.project-tags span');
                    let hasTag = false;
                    tags.forEach(tag => {
                        if (tag.textContent.toLowerCase() === filter.toLowerCase()) {
                            hasTag = true;
                        }
                    });
                    
                    if (hasTag) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// Inicializa filtros de projetos
initProjectFilters();

// ===== FUNÇÃO PARA LER MAIS (MODAL) =====
function initReadMoreButtons() {
    const readMoreBtns = document.querySelectorAll('.read-more');
    const modal = document.getElementById('projectModal');
    
    if (!modal) return;
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectCard = btn.closest('.project-card');
            if (!projectCard) return;
            
            // Extrai dados do projeto
            const title = projectCard.querySelector('h3')?.textContent || 'Projeto';
            const description = projectCard.querySelector('p')?.textContent || '';
            const tags = Array.from(projectCard.querySelectorAll('.project-tags span')).map(tag => tag.textContent);
            const imageSrc = projectCard.querySelector('.project-image img')?.src || '';
            
            // Preenche o modal
            const modalTitle = modal.querySelector('.modal-header h2');
            const modalTags = modal.querySelector('.modal-tags');
            const modalDescription = modal.querySelector('.modal-content-section p');
            const modalImage = modal.querySelector('.modal-image');
            
            if (modalTitle) modalTitle.textContent = title;
            if (modalDescription) modalDescription.textContent = description;
            
            if (modalTags) {
                modalTags.innerHTML = tags.map(tag => `<span>${tag}</span>`).join('');
            }
            
            if (modalImage) {
                modalImage.innerHTML = `<img src="${imageSrc}" alt="${title}" style="width: 100%; border-radius: var(--border-radius);">`;
            }
            
            // Mostra o modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
}

// Inicializa botões de leitura
setTimeout(() => {
    initReadMoreButtons();
}, 500);

// ===== CORREÇÃO PARA O MENU MOBILE =====
function fixMobileMenu() {
    if (window.innerWidth <= 968) {
        if (DOM.navMenu && !DOM.navMenu.classList.contains('nav-menu')) {
            // Garante que o nav-menu existe
            const navMenu = document.querySelector('.nav-links');
            if (navMenu && !navMenu.parentElement.classList.contains('nav-menu')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'nav-menu';
                navMenu.parentNode.insertBefore(wrapper, navMenu);
                wrapper.appendChild(navMenu);
                DOM.navMenu = wrapper;
            }
        }
    }
}

// Executa correção do menu
fixMobileMenu();

// ===== ANIMAÇÃO DE SAÍDA PARA NOTIFICAÇÕES =====
const style = document.createElement('style');
style.textContent = `
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
document.head.appendChild(style);

// ===== PREVENÇÃO DE ERROS =====
window.addEventListener('error', (e) => {
    console.error('Erro capturado:', e.message);
});

console.log('JavaScript inicializado com sucesso!');