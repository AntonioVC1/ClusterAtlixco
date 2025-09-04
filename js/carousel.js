document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const carouselContainer = document.querySelector('.carousel__container');
    const prevButton = document.querySelector('.carousel__button--left');
    const nextButton = document.querySelector('.carousel__button--right');
    const dotsContainer = document.querySelector('.carousel__dots');

    const images = [];
    for (let i = 1; i <= 52; i++) {
        const pageNumber = i.toString().padStart(2, '0');
        images.push(`images/eventos/Agenda_Digital_page-00${pageNumber}.webp`);
    }

    let items = [];
    let currentIndex = 0;
    const totalItems = images.length;

    // --- Creación de los elementos del carrusel ---
    images.forEach((imageSrc, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel__item');
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `Evento página ${index + 1}`;
        carouselItem.appendChild(img);
        carouselContainer.appendChild(carouselItem);
        items.push(carouselItem);

        const dot = document.createElement('button');
        dot.classList.add('carousel__dot');
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    });

    function updateCarousel(instant = false) {
        if (instant) {
            carouselContainer.style.transition = 'none'; // Desactiva la transición para el arrastre
        } else {
            carouselContainer.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
        }

        const carouselWidth = carousel.clientWidth;
        const itemWidth = items[0].clientWidth;
        const offset = (carouselWidth / 2) - (itemWidth / 2) - (currentIndex * itemWidth);
        carouselContainer.style.transform = `translateX(${offset}px)`;

        items.forEach((item, index) => {
            item.classList.toggle('carousel__item--active', index === currentIndex);
        });

        // La barra de progreso ya no necesita los dots, pero mantenemos la lógica por si se usa
    }
    
    // --- LÓGICA PARA NAVEGACIÓN (BOTONES) ---
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    // --- LÓGICA PARA EL SCROLL/SWIPE ---
    let isDown = false;
    let startX;
    let scrollLeft;
    let walk = 0;

    const startSwipe = (e) => {
        isDown = true;
        carouselContainer.classList.add('active');
        startX = e.pageX || e.touches[0].pageX - carouselContainer.offsetLeft;
        scrollLeft = carouselContainer.style.transform.replace('translateX(', '').replace('px)', '') || 0;
    };

    const moveSwipe = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX || e.touches[0].pageX - carouselContainer.offsetLeft;
        walk = (x - startX);
        const newTransform = parseFloat(scrollLeft) + walk;
        carouselContainer.style.transition = 'none'; // Movimiento instantáneo al arrastrar
        carouselContainer.style.transform = `translateX(${newTransform}px)`;
    };

    const endSwipe = () => {
        isDown = false;
        carouselContainer.classList.remove('active');
        
        // Si el swipe es mayor a un umbral (ej. 50px), navega. Si no, lo considera un clic.
        const swipeThreshold = 50;
        if (walk < -swipeThreshold) {
            nextButton.click(); // Simula un clic en el botón de siguiente
        } else if (walk > swipeThreshold) {
            prevButton.click(); // Simula un clic en el botón de anterior
        } else {
            updateCarousel(); // Vuelve a la posición original si el swipe fue corto
        }
        walk = 0; // Resetea el recorrido
    };
    
    // Eventos para el mouse
    carouselContainer.addEventListener('mousedown', startSwipe);
    carouselContainer.addEventListener('mousemove', moveSwipe);
    carouselContainer.addEventListener('mouseup', endSwipe);
    carouselContainer.addEventListener('mouseleave', endSwipe);

    // Eventos para el tacto (móviles)
    carouselContainer.addEventListener('touchstart', startSwipe);
    carouselContainer.addEventListener('touchmove', moveSwipe);
    carouselContainer.addEventListener('touchend', endSwipe);


    // --- LÓGICA PARA ABRIR LA VENTANA MODAL ---
    function openModal(imageSrc) {
        // Crear los elementos del modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <button class="modal__close">&times;</button>
            <img src="${imageSrc}" alt="Imagen del evento ampliada" class="modal__image">
        `;

        // Función para cerrar el modal
        const closeModal = () => {
            modal.classList.remove('modal--visible');
            document.body.classList.remove('modal-open');
            // Eliminar el modal del DOM después de la transición para limpiar
            modal.addEventListener('transitionend', () => modal.remove(), { once: true });
        };

        // Eventos para cerrar
        modal.querySelector('.modal__close').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) { // Cierra solo si se hace clic en el fondo
                closeModal();
            }
        });

        document.body.appendChild(modal);
        document.body.classList.add('modal-open');
        
        // Forzar un reflow para que la transición de entrada funcione
        setTimeout(() => modal.classList.add('modal--visible'), 10);
        
        // Cerrar con la tecla "Escape"
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                window.removeEventListener('keydown', escapeHandler);
            }
        };
        window.addEventListener('keydown', escapeHandler);
    }
    
    // Asignar evento de clic a cada item del carrusel
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Solo abre el modal si el item es el activo Y no se está arrastrando
            if (index === currentIndex && Math.abs(walk) < 10) {
                openModal(item.querySelector('img').src);
            } else if (index !== currentIndex) {
                 // Si se hace clic en un item no activo, lo centra.
                currentIndex = index;
                updateCarousel();
            }
        });
    });


    // --- INICIALIZACIÓN ---
    setTimeout(() => updateCarousel(true), 100);
    window.addEventListener('resize', () => updateCarousel(true));
});