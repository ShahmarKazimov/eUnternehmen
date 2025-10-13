import { teamMembers } from '../constants/teamMembers.js';

class TeamSlider {
    constructor() {
        this.teamMembers = teamMembers;
        this.slider = document.querySelector('.team-section__slider');
        this.wrapper = document.querySelector('.team-section__slider-wrapper');
        this.dotsContainer = document.querySelector('.team-section__dots');
        this.createSlides();

        if (!this.slider || !this.wrapper || !this.slides.length) return;

        this.currentIndex = 0;
        this.slideWidth = 0;
        this.slideCount = this.teamMembers.length;
        this.isTransitioning = false;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.dragStartX = 0;
        this.currentTranslate = 0;
        this.prevTranslate = 0;
        this.isDragging = false;

        this.init();
    }

    createSlides() {
        if (!this.wrapper) return;

        // Clear existing content
        this.wrapper.innerHTML = '';

        // Create slides for each team member
        this.teamMembers.forEach(member => {
            const slide = document.createElement('div');
            slide.className = 'team-section__slide';

            slide.innerHTML = `
                <img src="${member.image}" alt="${member.name}" class="team-section__member-image">
                <div class="team-section__member-info">
                    <h3>${member.name}</h3>
                    <p>${member.position}</p>
                </div>
            `;

            this.wrapper.appendChild(slide);
        });

        // Update slides NodeList after creating them
        this.slides = document.querySelectorAll('.team-section__slide');
    }

    init() {
        // Setup infinite slider first
        this.setupInfiniteSlider();

        // Calculate dimensions and set initial position
        this.updateDimensions();
        this.setInitialPosition();

        // Create navigation buttons
        this.createDots();

        // Add event listeners
        this.addEventListeners();

        // Start autoplay
        this.startAutoplay();
    }

    setupInfiniteSlider() {
        // Clone all slides and append to wrapper for infinite effect
        this.teamMembers.forEach(member => {
            const slide = document.createElement('div');
            slide.className = 'team-section__slide';

            slide.innerHTML = `
                <img src="${member.image}" alt="${member.name}" class="team-section__member-image">
                <div class="team-section__member-info">
                    <h3>${member.name}</h3>
                    <p>${member.position}</p>
                </div>
            `;

            this.wrapper.appendChild(slide);
        });

        // Update slides NodeList
        this.slides = document.querySelectorAll('.team-section__slide');
        this.totalSlides = this.slides.length;
    }

    updateDimensions() {
        if (!this.slides.length) return;

        const slide = this.slides[0];
        const style = window.getComputedStyle(slide);
        const width = slide.offsetWidth;
        const gap = parseFloat(style.marginRight) || 30;
        this.slideWidth = width + gap;
    }

    setInitialPosition() {
        this.currentIndex = 0;
        this.wrapper.style.transition = 'none';
        this.wrapper.style.transform = `translate3d(0, 0, 0)`;
        requestAnimationFrame(() => {
            this.wrapper.style.transition = 'transform 0.5s ease';
        });
    }

    createDots() {
        if (!this.dotsContainer) return;

        // Create navigation buttons container
        this.dotsContainer.innerHTML = `
            <button class="team-section__nav-button team-section__prev" aria-label="Previous slide">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button class="team-section__nav-button team-section__next" aria-label="Next slide">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        `;

        // Add event listeners for navigation buttons
        const prevButton = this.dotsContainer.querySelector('.team-section__prev');
        const nextButton = this.dotsContainer.querySelector('.team-section__next');

        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.prev();
        });
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.next();
        });
    }

    updateDots(index) {
        const realIndex = index % this.slideCount;
        const dots = this.dotsContainer?.querySelectorAll('.team-section__dot') || [];
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === realIndex);
        });
    }

    addEventListeners() {
        // Resize handler
        window.addEventListener('resize', this.handleResize.bind(this));

        // Transition end handler
        this.wrapper.addEventListener('transitionend', this.handleTransitionEnd.bind(this));

        // Mouse events
        this.slider.addEventListener('mousedown', this.handleDragStart.bind(this));
        window.addEventListener('mousemove', this.handleDragMove.bind(this));
        window.addEventListener('mouseup', this.handleDragEnd.bind(this));

        // Touch events
        this.slider.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        this.slider.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
        this.slider.addEventListener('touchend', this.handleTouchEnd.bind(this));

        // Hover events for autoplay
        this.slider.addEventListener('mouseenter', this.stopAutoplay.bind(this));
        this.slider.addEventListener('mouseleave', this.startAutoplay.bind(this));
    }

    handleResize() {
        this.updateDimensions();
        this.goToSlide(this.currentIndex);
    }

    handleTransitionEnd() {
        if (!this.wrapper) return;
        this.isTransitioning = false;

        // When we reach the cloned slides, instantly reset to the beginning
        if (this.currentIndex >= this.slideCount) {
            this.wrapper.style.transition = 'none';
            this.currentIndex = 0;
            this.currentTranslate = 0;
            this.prevTranslate = 0;
            this.wrapper.style.transform = `translate3d(0, 0, 0)`;
            requestAnimationFrame(() => {
                this.wrapper.style.transition = 'transform 0.5s ease';
            });
        }
    }

    handleDragStart(e) {
        if (e.type === 'mousedown') {
            e.preventDefault();
            this.dragStartX = e.clientX;
        }
        this.isDragging = true;
        this.slider.style.cursor = 'grabbing';
        this.stopAutoplay();
    }

    handleDragMove(e) {
        if (!this.isDragging || !this.wrapper) return;

        const currentPosition = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const diff = (this.dragStartX - currentPosition) * 1.5;
        const translation = this.prevTranslate - diff;

        this.wrapper.style.transform = `translate3d(${translation}px, 0, 0)`;
    }

    handleDragEnd() {
        if (!this.isDragging) return;

        this.isDragging = false;
        this.slider.style.cursor = '';

        const movedBy = this.prevTranslate - this.currentTranslate;

        if (Math.abs(movedBy) > this.slideWidth * 0.3) {
            if (movedBy > 0) {
                this.next();
            } else {
                this.prev();
            }
        } else {
            this.goToSlide(this.currentIndex);
        }

        this.startAutoplay();
    }

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.dragStartX = this.touchStartX;
        this.handleDragStart(e);
    }

    handleTouchMove(e) {
        if (!this.isDragging) return;
        this.touchEndX = e.touches[0].clientX;
        this.handleDragMove(e);
    }

    handleTouchEnd() {
        this.handleDragEnd();
    }

    goToSlide(index) {
        if (!this.wrapper) return;

        this.currentIndex = index;
        this.currentTranslate = -this.currentIndex * this.slideWidth;
        this.prevTranslate = this.currentTranslate;
        this.wrapper.style.transform = `translate3d(${this.currentTranslate}px, 0, 0)`;
        this.updateDots(index);
    }

    next() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        this.currentIndex++;
        this.goToSlide(this.currentIndex);
    }

    prev() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        if (this.currentIndex <= 0) {
            this.currentIndex = this.slideCount - 1;
        } else {
            this.currentIndex--;
        }
        this.goToSlide(this.currentIndex);
    }

    startAutoplay() {
        if (this.autoplayInterval) return;
        this.autoplayInterval = setInterval(() => this.next(), 3000);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

// Export for module usage or initialize directly
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TeamSlider;
} else {
    window.TeamSlider = TeamSlider;
}

export default TeamSlider;
