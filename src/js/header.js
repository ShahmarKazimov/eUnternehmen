// ============================================
// HEADER FUNCTIONALITY
// ============================================

class Header {
    constructor() {
        this.init();
    }

    init() {
        this.initDropdowns();
        this.initLanguageSelector();
        this.initMobileMenu();
        this.initOutsideClick();
    }

    // Dropdown functionality
    initDropdowns() {
        document.querySelectorAll('[data-dropdown]').forEach(trigger => {
            const menuId = trigger.dataset.dropdown;
            const menu = document.getElementById(menuId);

            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                menu.classList.toggle('hidden');
                trigger.classList.toggle('open');
            });
        });
    }

    // Language selection functionality
    initLanguageSelector() {
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
    }

    // Mobile menu toggle with hamburger animation
    initMobileMenu() {
        const hamburgerBtn = document.querySelector('[data-toggle="mobile-menu"]');
        const mobileMenu = document.getElementById('mobile-menu');

        if (hamburgerBtn && mobileMenu) {
            hamburgerBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                hamburgerBtn.classList.toggle('active');
            });

            // Close mobile menu on desktop resize
            const closeMobileMenuOnDesktop = () => {
                if (window.innerWidth >= 1024 && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    hamburgerBtn.classList.remove('active');
                }
            };

            window.addEventListener('resize', closeMobileMenuOnDesktop);
            closeMobileMenuOnDesktop();
        }
    }

    // Close dropdowns on outside click
    initOutsideClick() {
        document.addEventListener('click', () => {
            document.querySelectorAll('.lang-selector__menu').forEach(menu => {
                menu.classList.add('hidden');
            });
            document.querySelectorAll('.lang-selector__trigger').forEach(trigger => {
                trigger.classList.remove('open');
            });
        });
    }
}

// Export for module usage or initialize directly
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Header;
} else {
    window.Header = Header;
}

const targetSections = document.querySelectorAll('#pricing, #incorporation,#footer');
const nav = document.querySelector('#nav');

window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY + 100;
    let isInsideSection = false;

    targetSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            isInsideSection = true;
        }
    });

    if (isInsideSection) {
        nav.style.background = '#fbfbfb';
    } else {
        nav.style.background = '';
    }
});


export default Header;