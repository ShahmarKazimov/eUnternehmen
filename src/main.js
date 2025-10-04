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
        thumbnail.style.display = 'none';
        iframe.classList.remove('hidden');
        iframe.style.display = 'block';
    }
}
