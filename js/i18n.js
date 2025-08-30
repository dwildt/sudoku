export class I18n {
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
        } catch {
            this.showUserMessage('Erro ao carregar traduções. Usando português como padrão.');
            this.currentLang = 'pt';
            try {
                const response = await fetch(`i18n/${this.currentLang}.json`);
                this.translations = await response.json();
                this.updateUI();
            } catch {
                this.showUserMessage('Erro crítico: não foi possível carregar as traduções.');
                this.translations = {};
            }
        }
    }

    t(key) {
        return this.translations[key] || key;
    }

    async setLanguage(lang) {
        const previousLang = this.currentLang;
        const previousTranslations = { ...this.translations };

        this.currentLang = lang;
        localStorage.setItem('sudoku-language', lang);

        try {
            const response = await fetch(`i18n/${lang}.json`);
            this.translations = await response.json();
            this.updateUI();

            document.getElementById('language-select').value = lang;
        } catch {
            // Fallback: restaura idioma anterior
            this.currentLang = previousLang;
            this.translations = previousTranslations;
            localStorage.setItem('sudoku-language', previousLang);

            this.showUserMessage(`Erro ao carregar idioma ${lang}. Mantendo ${previousLang}.`);

            // Restaura select para o valor anterior
            const select = document.getElementById('language-select');
            if (select) {
                select.value = previousLang;
            }
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

    showUserMessage(message, duration = 3000) {
        // Remove mensagem anterior se existir
        const existingMessage = document.getElementById('i18n-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Cria nova mensagem
        const messageDiv = document.createElement('div');
        messageDiv.id = 'i18n-message';
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff6b35;
            color: white;
            padding: 12px 16px;
            border-radius: 4px;
            z-index: 1000;
            font-size: 14px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        `;

        document.body.appendChild(messageDiv);

        // Remove automaticamente após duração especificada
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, duration);
    }
}

export const i18n = new I18n();
