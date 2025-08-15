class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('sudoku-language') || 'pt';
        this.translations = {};
        this.loadTranslations();
    }

    async loadTranslations() {
        try {
            const response = await fetch(`i18n/${this.currentLang}.json`);
            this.translations = await response.json();
            this.updateUI();
        } catch (error) {
            console.error('Error loading translations:', error);
            this.currentLang = 'pt';
            const response = await fetch(`i18n/${this.currentLang}.json`);
            this.translations = await response.json();
            this.updateUI();
        }
    }

    t(key) {
        return this.translations[key] || key;
    }

    async setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('sudoku-language', lang);
        
        try {
            const response = await fetch(`i18n/${lang}.json`);
            this.translations = await response.json();
            this.updateUI();
            
            document.getElementById('language-select').value = lang;
        } catch (error) {
            console.error('Error loading language:', error);
        }
    }

    updateUI() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.t(key);
        });

        document.title = this.t('title');
        document.documentElement.lang = this.currentLang;
    }
}

const i18n = new I18n();