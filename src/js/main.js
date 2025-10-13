import TeamSlider from './team.js';
import Header from './header.js';
import FAQ from './faq.js';
import Homepage from './homepage.js';

// ============================================
// MAIN APPLICATION ENTRY POINT
// ============================================

class App {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeComponents();
            });
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        // Initialize all components
        try {
            // Header functionality (Navigation, dropdowns, mobile menu)
            if (Header) {
                new Header();
            }

            // Homepage functionality (Video player, pricing slider)
            if (Homepage) {
                new Homepage();
            }

            // FAQ functionality
            if (FAQ) {
                new FAQ();
            }
            // Team slider functionality
            if (TeamSlider) {
                new TeamSlider();
            }

        } catch (error) {
            console.error('❌ Error initializing components:', error);
        }
    }
}

// Initialize the application
new App();