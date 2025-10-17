// Import single translations object
import { translations } from "../constants/translations.js";

class I18n {
    constructor() {
        this.translations = translations;
        this.currentLang = localStorage.getItem("language") || "Eng";
        this.init();
    }

    init() {
        // Set initial language
        this.setLanguage(this.currentLang);

        // Add event listeners to language selector items
        document.querySelectorAll(".lang-selector__item").forEach(item => {
            item.addEventListener("click", e => {
                e.preventDefault();
                const lang = item.getAttribute("data-lang");
                this.setLanguage(lang);
            });
        });

        // Update button text on load
        const langButton = document.querySelector(".lang-selector__trigger span");
        if (langButton) {
            langButton.textContent = this.currentLang === "Eng" ? "English" : "German";
        }
    }

    setLanguage(lang) {
        if (!this.translations[lang]) {
            console.warn(`Language "${lang}" not found in translations`);
            return;
        }

        this.currentLang = lang;
        localStorage.setItem("language", lang);
        this.updateContent();

        // Update button text
        const langButton = document.querySelector(".lang-selector__trigger span");
        if (langButton) {
            langButton.textContent = lang === "Eng" ? "English" : "German";
        }

        // Update document <html lang="">
        document.documentElement.lang = lang;
    }

    updateContent() {
        document.querySelectorAll("[data-i18n]").forEach(element => {
            const key = element.getAttribute("data-i18n");
            const translation = this.getTranslation(key);
            if (translation) {
                // textContent yerine innerHTML — bəzi tərcümələr HTML tərkibli ola bilər
                element.innerHTML = translation;
            }
        });
    }

    getTranslation(key) {
        const keys = key.split(".");
        let translation = this.translations[this.currentLang];

        for (const k of keys) {
            if (translation && translation[k] !== undefined) {
                translation = translation[k];
            } else {
                console.warn(`Translation missing for key: ${key}`);
                return key;
            }
        }

        return translation;
    }
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
    window.i18n = new I18n();
});

export default I18n;
