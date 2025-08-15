/**
 * @jest-environment jsdom
 */

// Mock i18n class for testing
class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('sudoku-language') || 'pt';
        this.translations = {};
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
            
            const select = document.getElementById('language-select');
            if (select) select.value = lang;
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

// Mock DOM
document.body.innerHTML = `
    <div data-i18n="title">Test Title</div>
    <div data-i18n="newGame">Test Button</div>
    <select id="language-select"></select>
`;

describe('I18n', () => {
    let i18n;

    beforeEach(() => {
        localStorage.clear();
        fetch.mockClear();
        
        // Mock successful fetch response
        fetch.mockResolvedValue({
            json: async () => ({
                "title": "Sudoku",
                "newGame": "New Game",
                "difficulty.easy": "Easy"
            })
        });
        
        i18n = new I18n();
    });

    describe('constructor', () => {
        test('should initialize with default language', () => {
            expect(i18n.currentLang).toBe('pt');
        });

        test('should use stored language preference', () => {
            localStorage.setItem('sudoku-language', 'en');
            const newI18n = new I18n();
            expect(newI18n.currentLang).toBe('en');
        });
    });

    describe('t (translate)', () => {
        test('should return translation for existing key', async () => {
            await i18n.loadTranslations();
            expect(i18n.t('title')).toBe('Sudoku');
            expect(i18n.t('newGame')).toBe('New Game');
        });

        test('should return key for missing translation', async () => {
            await i18n.loadTranslations();
            expect(i18n.t('nonexistent.key')).toBe('nonexistent.key');
        });
    });

    describe('setLanguage', () => {
        test('should change current language', async () => {
            await i18n.setLanguage('en');
            expect(i18n.currentLang).toBe('en');
        });

        test('should save language preference', async () => {
            await i18n.setLanguage('es');
            expect(localStorage.getItem('sudoku-language')).toBe('es');
        });

        test('should fetch new translations', async () => {
            await i18n.setLanguage('es');
            expect(fetch).toHaveBeenCalledWith('i18n/es.json');
        });
    });

    describe('loadTranslations', () => {
        test('should fetch translations for current language', async () => {
            await i18n.loadTranslations();
            expect(fetch).toHaveBeenCalledWith('i18n/pt.json');
        });

        test('should handle fetch errors gracefully', async () => {
            fetch.mockRejectedValueOnce(new Error('Network error'));
            fetch.mockResolvedValueOnce({
                json: async () => ({ "title": "Sudoku" })
            });
            
            await i18n.loadTranslations();
            expect(fetch).toHaveBeenCalledTimes(2);
            expect(i18n.currentLang).toBe('pt');
        });
    });

    describe('updateUI', () => {
        test('should update elements with data-i18n attributes', async () => {
            await i18n.loadTranslations();
            
            const titleElement = document.querySelector('[data-i18n="title"]');
            const buttonElement = document.querySelector('[data-i18n="newGame"]');
            
            expect(titleElement.textContent).toBe('Sudoku');
            expect(buttonElement.textContent).toBe('New Game');
        });

        test('should update document title', async () => {
            await i18n.loadTranslations();
            expect(document.title).toBe('Sudoku');
        });

        test('should update document language', async () => {
            await i18n.loadTranslations();
            expect(document.documentElement.lang).toBe('pt');
        });
    });
});