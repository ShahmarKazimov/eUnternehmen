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
            if (window.Header) {
                new window.Header();
            }

            // Homepage functionality (Video player, pricing slider)
            if (window.Homepage) {
                new window.Homepage();
            }

            // FAQ functionality
            if (window.FAQ) {
                new window.FAQ();
            }

        } catch (error) {
            console.error('❌ Error initializing components:', error);
        }
    }
}

// Initialize the application
new App();