tsParticles.load("hero-particles", {
    particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: "#7793FE" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        move: { enable: true, speed: 0.5, direction: "top", random: false, out_mode: "out" }
    },
    interactivity: {
        events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" } },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// Botão "Quero me Inspirar"
document.getElementById('inspire-btn').addEventListener('click', () => {
    document.querySelector('.motivacional').scrollIntoView({ behavior: 'smooth' });
});

// Animação de entrada com Intersection Observer
const observerOptions = {
    root: null,
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.hero, .proposal, .motivacional, .benefits, .testimonials, .books').forEach(section => {
    observer.observe(section);
});

// Carrossel de depoimentos
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active');
        if (i === index) testimonial.classList.add('active');
    });
}

prevBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
});

nextBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
});

// Auto-play do carrossel
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Destacar link ativo
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    if (link.getAttribute('href') === 'index.html') {
        link.classList.add('active');
    }
});

// Efeito de digitação nos títulos hero
const heroTitles = [
    document.getElementById('hero-title-1'),
    document.getElementById('hero-title-2'),
    document.getElementById('hero-title-3')
];

heroTitles.forEach((title, index) => {
    const text = title.textContent;
    title.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    setTimeout(typeWriter, index * 1000); // Atraso para cada título
});

// Modal para livros
const bookCards = document.querySelectorAll('.book-card');
const modal = document.getElementById('book-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeModal = document.getElementById('close-modal');

bookCards.forEach(card => {
    card.addEventListener('click', () => {
        modalTitle.textContent = card.querySelector('h4').textContent;
        modalDescription.textContent = card.getAttribute('data-description');
        modal.style.display = 'flex';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Botão Voltar ao Topo
const scrollTopBtn = document.getElementById('scroll-top-btn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Gerador de Citações Motivacionais
const quotes = [
    "O sucesso é a soma de pequenos esforços repetidos dia após dia. — Robert Collier",
    "Você não precisa ser ótimo para começar, mas precisa começar para ser ótimo. — Zig Ziglar",
    "Acredite que você pode, e você está a meio caminho de conseguir. — Theodore Roosevelt",
    "A disciplina é a ponte entre seus sonhos e suas conquistas. — Jim Rohn",
    "O único limite para o seu sucesso é a sua própria imaginação. — Albert Einstein"
];

const quoteBtn = document.getElementById('quote-btn');
const quoteText = document.getElementById('quote-text');

function showQuote() {
    quoteText.style.opacity = 0;
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteText.textContent = quotes[randomIndex];
        quoteText.style.opacity = 1;
    }, 300);
}

quoteBtn.addEventListener('click', showQuote);

// Mostrar uma citação inicial ao carregar a página
showQuote();