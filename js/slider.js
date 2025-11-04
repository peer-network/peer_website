document.addEventListener('DOMContentLoaded', () => {
    const handy = document.querySelector('.handy');
    const slides = document.querySelectorAll('.handy img');
    const indicators = document.querySelectorAll('.slide-indicators p');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                const currentSlide = Array.from(slides).indexOf(entry.target);
                updateIndicators(currentSlide);
            }
        });
    }, {
        root: handy,
        threshold: 0.5
    });

    slides.forEach(slide => observer.observe(slide));

    function updateIndicators(activeIndex) {
        indicators.forEach((indicator, index) => {
            if (index === activeIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            const targetSlide = slides[index];
            targetSlide.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            });
        });
    });
});