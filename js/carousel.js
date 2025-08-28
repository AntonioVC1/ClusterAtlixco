document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel'); // Contenedor principal
    const carouselContainer = document.querySelector('.carousel__container');
    const prevButton = document.querySelector('.carousel__button--left');
    const nextButton = document.querySelector('.carousel__button--right');
    const dotsContainer = document.querySelector('.carousel__dots');

    const images = [];
    for (let i = 1; i <= 52; i++) {
        const pageNumber = i.toString().padStart(2, '0');
        images.push(`images/eventos/Agenda_Digital_page-00${pageNumber}.jpg`);
    }

    let items = []; // Para guardar referencia a los elementos del DOM

    images.forEach((imageSrc, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel__item');
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `Evento página ${index + 1}`;
        carouselItem.appendChild(img);
        carouselContainer.appendChild(carouselItem);
        items.push(carouselItem); // Guardamos el elemento

        const dot = document.createElement('button');
        dot.classList.add('carousel__dot');
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    });

    let currentIndex = 0;
    const totalItems = images.length;

    function updateCarousel() {
        const carouselWidth = carousel.clientWidth;
        const itemWidth = items[0].clientWidth;
        
        // Nueva lógica de cálculo para centrar el elemento activo
        const offset = (carouselWidth / 2) - (itemWidth / 2) - (currentIndex * itemWidth);
        carouselContainer.style.transform = `translateX(${offset}px)`;

        // Actualizar clases de los items y puntos
        items.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('carousel__item--active');
            } else {
                item.classList.remove('carousel__item--active');
            }
        });
        
        const dots = dotsContainer.querySelectorAll('.carousel__dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('carousel__dot--active');
            } else {
                dot.classList.remove('carousel__dot--active');
            }
        });
    }

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    // Pequeño retraso para asegurar que las imágenes tengan dimensiones
    setTimeout(updateCarousel, 100);

    window.addEventListener('resize', updateCarousel);
});