document.addEventListener('DOMContentLoaded', function() {
    
    // --- Lógica para el Menú Hamburguesa ---
    const header = document.querySelector('.header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const overlay = document.querySelector('.overlay');

    const toggleMenu = () => {
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        header.classList.toggle('menu-open'); // Clase para elevar el z-index del header
    };

    const closeMenu = () => {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        header.classList.remove('menu-open');
    };

    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // --- Lógica para la Animación de Scroll (con Stagger) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // 1. Observamos los elementos generales (títulos, subtítulos, etc.)
    const hiddenElements = document.querySelectorAll('.section__title.hidden, .section__subtitle.hidden, .contact__grid.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // 2. Observamos las cuadrículas de TARJETAS y aplicamos animación escalonada
    const cardGrids = document.querySelectorAll('.vocation-grid.hidden, .ecosystem__grid.hidden');
    cardGrids.forEach(grid => {
        const cards = grid.querySelectorAll('.vocation-card, .ecosystem__card');
        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 100}ms`;
        });
        observer.observe(grid);
    });

    // 3. Observamos la GALERÍA de eventos y aplicamos animación escalonada a las IMÁGENES
    const masonryGallery = document.querySelector('.masonry-gallery.hidden');
    if (masonryGallery) {
        const images = masonryGallery.querySelectorAll('img');
        images.forEach((img, index) => {
            img.style.transitionDelay = `${index * 50}ms`;
        });
        observer.observe(masonryGallery);
    }
});