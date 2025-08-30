class SudokuApp {
    constructor() {
        this.game = null;
        this.currentTheme = localStorage.getItem('sudoku-theme') || 'wildtech';

        this.initializeApp();
    }

    async initializeApp() {
        await i18n.loadTranslations();

        this.setupTheme();
        this.setupEventListeners();

        this.game = new SudokuGame();
        this.game.newGame();

        document.getElementById('language-select').value = i18n.currentLang;
        document.getElementById('theme-select').value = this.currentTheme;
    }

    setupTheme() {
        document.body.className = `${this.currentTheme}-theme`;
    }

    setupEventListeners() {
        document.getElementById('theme-select').addEventListener('change', (e) => {
            this.setTheme(e.target.value);
        });

        document.getElementById('language-select').addEventListener('change', (e) => {
            i18n.setLanguage(e.target.value);
        });

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.add('hidden');
            }
        });
    }

    setTheme(theme) {
        this.currentTheme = theme;
        localStorage.setItem('sudoku-theme', theme);
        this.setupTheme();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SudokuApp();
});
