// ============================================
// HOMEPAGE FUNCTIONALITY
// ============================================

class Homepage {
    constructor() {
        this.init();
    }

    init() {
        this.initVideoPlayer();
        this.initPricingSlider();
        this.initPricingPlanButtons();
    }

    // Video play functionality
    initVideoPlayer() {
        const playVideo = () => {
            const thumbnail = document.querySelector('.hero__video-thumbnail');
            const iframe = document.querySelector('.hero__video-iframe');

            if (thumbnail && iframe) {
                // Add autoplay parameter to src when playing
                const currentSrc = iframe.src;
                if (!currentSrc.includes('autoplay=1')) {
                    iframe.src = currentSrc + '&autoplay=1';
                }

                thumbnail.style.display = 'none';
                iframe.classList.remove('hidden');
                iframe.style.display = 'block';
            }
        };

        // Add event listeners for video play
        const videoThumbnail = document.querySelector('.hero__video-thumbnail');
        const playButton = document.querySelector('.hero__video-play-button');

        if (videoThumbnail) {
            videoThumbnail.addEventListener('click', playVideo);
        }

        if (playButton) {
            playButton.addEventListener('click', playVideo);
        }
    }

    // Mobile Pricing Slider
    initPricingSlider() {
        const slides = document.querySelectorAll('.pricing__slide');
        const dots = document.querySelectorAll('.pricing__dot');
        let currentSlide = 0;

        if (slides.length === 0) return;

        const showSlide = (index) => {
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('pricing__slide--active');
            });

            // Show current slide
            slides[index].classList.add('pricing__slide--active');

            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('pricing__dot--active', i === index);
            });
        };

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Touch/swipe support
        this.initSwipeSupport(slides, showSlide, currentSlide);

        // Additional services slider
        this.initAdditionalServicesSlider();

        // Initialize first slide
        showSlide(0);
    }

    // Swipe support for pricing slider
    initSwipeSupport(slides, showSlide, currentSlide) {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        const sliderWrapper = document.querySelector('.pricing__slider-wrapper');

        if (sliderWrapper) {
            sliderWrapper.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                isDragging = true;
            });

            sliderWrapper.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                currentX = e.touches[0].clientX;
            });

            sliderWrapper.addEventListener('touchend', () => {
                if (!isDragging) return;

                const diffX = startX - currentX;
                const threshold = 50; // Minimum swipe distance

                if (Math.abs(diffX) > threshold) {
                    if (diffX > 0 && currentSlide < slides.length - 1) {
                        // Swipe left - next slide
                        currentSlide++;
                    } else if (diffX < 0 && currentSlide > 0) {
                        // Swipe right - previous slide
                        currentSlide--;
                    }
                    showSlide(currentSlide);
                }

                isDragging = false;
            });
        }
    }

    initPricingPlanButtons() {
        document.getElementById('starterBtn').addEventListener('click', () => {
            sessionStorage.setItem('selectedPlan', 'Starter');
            window.location.href = '/contact.html'; 
        });

        document.getElementById('proBtn').addEventListener('click', () => {
            sessionStorage.setItem('selectedPlan', 'Pro');
            window.location.href = '/contact.html';
        });
    }

    // Additional Services Slider
    initAdditionalServicesSlider() {
        const additionalSlides = document.querySelectorAll('.pricing__additional-wrapper .pricing__service');
        const additionalWrapper = document.querySelector('.pricing__additional-wrapper');
        let currentAdditionalSlide = 0;

        if (additionalSlides.length === 0) return;

        const showAdditionalSlide = (index) => {
            const slideWidth = additionalSlides[0].offsetWidth + 16; // 16px gap
            additionalWrapper.scrollTo({
                left: index * slideWidth,
                behavior: 'smooth'
            });
        };

        // Touch/swipe support for additional services
        let additionalStartX = 0;
        let additionalCurrentX = 0;
        let additionalIsDragging = false;

        if (additionalWrapper) {
            additionalWrapper.addEventListener('touchstart', (e) => {
                additionalStartX = e.touches[0].clientX;
                additionalIsDragging = true;
            });

            additionalWrapper.addEventListener('touchmove', (e) => {
                if (!additionalIsDragging) return;
                additionalCurrentX = e.touches[0].clientX;
            });

            additionalWrapper.addEventListener('touchend', () => {
                if (!additionalIsDragging) return;

                const diffX = additionalStartX - additionalCurrentX;
                const threshold = 50; // Minimum swipe distance

                if (Math.abs(diffX) > threshold) {
                    if (diffX > 0 && currentAdditionalSlide < additionalSlides.length - 1) {
                        // Swipe left - next slide
                        currentAdditionalSlide++;
                    } else if (diffX < 0 && currentAdditionalSlide > 0) {
                        // Swipe right - previous slide
                        currentAdditionalSlide--;
                    }
                    showAdditionalSlide(currentAdditionalSlide);
                }

                additionalIsDragging = false;
            });

            // Initialize additional services slider
            showAdditionalSlide(0);
        }
    }
}

// Export for module usage or initialize directly
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Homepage;
} else {
    window.Homepage = Homepage;
}

export default Homepage;