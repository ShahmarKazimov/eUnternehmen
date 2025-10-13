// ============================================
// FAQ FUNCTIONALITY
// ============================================

class FAQ {
    constructor() {
        this.init();
    }

    init() {
        this.initAccordion();
    }

    // FAQ Accordion functionality
    initAccordion() {
        const faqItems = document.querySelectorAll('.faq__item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq__question');
            const answer = item.querySelector('.faq__answer');

            if (question && answer) {
                question.addEventListener('click', () => {
                    // Close all other FAQ items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            const otherAnswer = otherItem.querySelector('.faq__answer');
                            if (otherAnswer) {
                                otherAnswer.style.maxHeight = null;
                            }
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
            }
        });
    }
}

// Export for module usage or initialize directly
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FAQ;
} else {
    window.FAQ = FAQ;
}

export default FAQ;