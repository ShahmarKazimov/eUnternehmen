// Dropdown functionality
document.querySelectorAll('[data-dropdown]').forEach(trigger => {
    const menuId = trigger.dataset.dropdown;
    const menu = document.getElementById(menuId);

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('hidden');
        trigger.classList.toggle('open');
    });
});

// Language selection functionality
document.querySelectorAll('.lang-selector__item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        const selectedLang = item.dataset.lang;
        const selectedFlag = item.dataset.flag;

        const menu = item.closest('.lang-selector__menu');
        const trigger = menu.previousElementSibling;
        const langText = trigger.querySelector('span');

        langText.textContent = selectedLang;

        menu.classList.add('hidden');
        trigger.classList.remove('open');

        menu.querySelectorAll('.lang-selector__item').forEach(menuItem => {
            menuItem.classList.remove('active');
        });
        item.classList.add('active');
    });
});

// Close dropdowns on outside click
document.addEventListener('click', () => {
    document.querySelectorAll('.lang-selector__menu').forEach(menu => {
        menu.classList.add('hidden');
    });
    document.querySelectorAll('.lang-selector__trigger').forEach(trigger => {
        trigger.classList.remove('open');
    });
});

// Mobile menu toggle with hamburger animation
const hamburgerBtn = document.querySelector('[data-toggle="mobile-menu"]');
const mobileMenu = document.getElementById('mobile-menu');

hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');
});

function closeMobileMenuOnDesktop() {
    if (window.innerWidth >= 1024 && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
    }
}

window.addEventListener('resize', closeMobileMenuOnDesktop);

closeMobileMenuOnDesktop();

// Video play functionality
function playVideo() {
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
}

// Add event listener for video play
document.addEventListener('DOMContentLoaded', function () {
    const videoThumbnail = document.querySelector('.hero__video-thumbnail');
    const playButton = document.querySelector('.hero__video-play-button');

    if (videoThumbnail) {
        videoThumbnail.addEventListener('click', playVideo);
    }

    if (playButton) {
        playButton.addEventListener('click', playVideo);
    }
});

// Mobile Pricing Slider
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.pricing__slide');
    const dots = document.querySelectorAll('.pricing__dot');
    let currentSlide = 0;

    function showSlide(index) {
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
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Touch/swipe support
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

    // Initialize
    showSlide(0);
});

// Additional Services Mobile Slider
document.addEventListener('DOMContentLoaded', () => {
    const additionalSlides = document.querySelectorAll('.pricing__additional-slider .pricing__service');
    const additionalDots = document.querySelectorAll('.pricing__additional-dot');
    const additionalWrapper = document.querySelector('.pricing__additional-wrapper');

    if (!additionalSlides.length || !additionalDots.length || !additionalWrapper) return;

    let currentAdditionalSlide = 0;

    function showAdditionalSlide(index) {
        // Update active dot
        additionalDots.forEach((dot, i) => {
            dot.classList.toggle('pricing__additional-dot--active', i === index);
        });

        // Scroll to the slide
        const slideWidth = additionalSlides[0].offsetWidth + 16; // width + gap
        additionalWrapper.scrollTo({
            left: slideWidth * index,
            behavior: 'smooth'
        });

        currentAdditionalSlide = index;
    }

    // Dot navigation for additional services
    additionalDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentAdditionalSlide = index;
            showAdditionalSlide(currentAdditionalSlide);
        });
    });

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
    }

    // Initialize additional services slider
    showAdditionalSlide(0);
});

// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        const answer = item.querySelector('.faq__answer');

        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq__answer');
                    otherAnswer.style.maxHeight = null;
                }
            });

            // Toggle current item
            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
});
