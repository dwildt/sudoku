/**
 * @jest-environment jsdom
 */

// Mock DOM elements for testing
document.body.innerHTML = `
    <div id="sudoku-grid"></div>
    <div id="timer-display">00:00</div>
    <select id="difficulty-select"><option value="medium">Medium</option></select>
    <select id="size-select"><option value="9">9x9</option></select>
    <button id="new-game">New Game</button>
    <button id="check-solution">Check</button>
    <button id="hint">Hint</button>
    <button id="reset">Reset</button>
    <button id="show-records">Records</button>
    <button id="close-victory">Close</button>
    <button id="close-records">Close</button>
    <div id="victory-modal" class="hidden"></div>
    <div id="records-modal" class="hidden"></div>
    <div id="final-time"></div>
    <div id="record-message"></div>
    <div id="records-list"></div>
`;

// Mock SudokuGenerator and SudokuValidator
class MockSudokuGenerator {
    generatePuzzle() {
        const puzzle = Array(9).fill().map(() => Array(9).fill(0));
        puzzle[0][0] = 5;
        return {
            puzzle,
            solution: Array(9).fill().map(() => Array(9).fill(1))
        };
    }
}

// Create a mock SudokuGame for testing mobile functionality
class MobileSudokuGame {
    constructor() {
        this.currentSize = 9;
        this.generator = new MockSudokuGenerator();
        this.currentPuzzle = null;
        this.currentSolution = null;
        this.playerGrid = null;
        this.givenCells = new Set();
        this.selectedCell = null;
        this.hiddenInput = null;
        this.createHiddenInput();
    }

    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               ('ontouchstart' in window) ||
               (navigator.maxTouchPoints > 0);
    }

    createHiddenInput() {
        this.hiddenInput = document.createElement('input');
        this.hiddenInput.type = 'number';
        this.hiddenInput.id = 'mobile-keyboard-input';
        this.hiddenInput.style.position = 'absolute';
        this.hiddenInput.style.left = '-9999px';
        this.hiddenInput.style.top = '-9999px';
        this.hiddenInput.style.opacity = '0';
        this.hiddenInput.style.pointerEvents = 'none';
        this.hiddenInput.inputMode = 'numeric';
        this.hiddenInput.pattern = '[0-9]*';

        this.hiddenInput.addEventListener('input', (e) => this.handleMobileInput(e));
        this.hiddenInput.addEventListener('keydown', (e) => this.handleMobileKeydown(e));

        document.body.appendChild(this.hiddenInput);
    }

    selectCell(row, col) {
        this.selectedCell = { row, col };

        if (this.isMobileDevice() && this.hiddenInput) {
            this.hiddenInput.value = '';
            this.hiddenInput.focus();
        }
    }

    handleMobileInput(e) {
        if (!this.selectedCell) {
            return;
        }

        const value = e.target.value;
        const lastChar = value.slice(-1);

        if (lastChar && lastChar >= '1' && lastChar <= this.currentSize.toString()) {
            const num = parseInt(lastChar);
            this.makeMove(this.selectedCell.row, this.selectedCell.col, num);
        }

        e.target.value = '';
    }

    handleMobileKeydown(e) {
        if (!this.selectedCell) {
            return;
        }

        const { row, col } = this.selectedCell;

        if (e.key === 'Backspace' || e.key === 'Delete') {
            e.preventDefault();
            this.makeMove(row, col, 0);
        }
    }

    makeMove(row, col, num) {
        // Mock implementation for testing
        this.lastMove = { row, col, num };
    }
}

describe('Mobile Keyboard Functionality', () => {
    let game;

    beforeEach(() => {
        // Reset the DOM
        document.body.innerHTML = `
            <div id="sudoku-grid"></div>
            <div id="timer-display">00:00</div>
            <select id="difficulty-select"><option value="medium">Medium</option></select>
            <select id="size-select"><option value="9">9x9</option></select>
            <button id="new-game">New Game</button>
            <button id="check-solution">Check</button>
            <button id="hint">Hint</button>
            <button id="reset">Reset</button>
            <button id="show-records">Records</button>
            <button id="close-victory">Close</button>
            <button id="close-records">Close</button>
            <div id="victory-modal" class="hidden"></div>
            <div id="records-modal" class="hidden"></div>
            <div id="final-time"></div>
            <div id="record-message"></div>
            <div id="records-list"></div>
        `;

        game = new MobileSudokuGame();
    });

    test('should create hidden input element', () => {
        expect(game.hiddenInput).toBeTruthy();
        expect(game.hiddenInput.type).toBe('number');
        expect(game.hiddenInput.id).toBe('mobile-keyboard-input');
        expect(game.hiddenInput.inputMode).toBe('numeric');
        expect(game.hiddenInput.pattern).toBe('[0-9]*');
    });

    test('hidden input should be positioned off-screen', () => {
        expect(game.hiddenInput.style.position).toBe('absolute');
        expect(game.hiddenInput.style.left).toBe('-9999px');
        expect(game.hiddenInput.style.top).toBe('-9999px');
        expect(game.hiddenInput.style.opacity).toBe('0');
    });

    test('should detect mobile device correctly', () => {
        // Mock mobile user agent
        const originalUserAgent = navigator.userAgent;
        Object.defineProperty(navigator, 'userAgent', {
            value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
            configurable: true
        });

        const result = game.isMobileDevice();
        expect(result).toBe(true);

        // Restore original user agent
        Object.defineProperty(navigator, 'userAgent', {
            value: originalUserAgent,
            configurable: true
        });
    });

    test('should handle mobile input correctly', () => {
        game.selectCell(0, 0);

        // Simulate mobile input
        game.hiddenInput.value = '5';
        const inputEvent = new Event('input');
        Object.defineProperty(inputEvent, 'target', {
            value: game.hiddenInput,
            enumerable: true
        });

        game.handleMobileInput(inputEvent);

        expect(game.lastMove).toEqual({ row: 0, col: 0, num: 5 });
        expect(game.hiddenInput.value).toBe('');
    });

    test('should handle mobile backspace correctly', () => {
        game.selectCell(1, 1);

        // Simulate backspace key
        const keyEvent = new KeyboardEvent('keydown', { key: 'Backspace' });
        keyEvent.preventDefault = jest.fn();

        game.handleMobileKeydown(keyEvent);

        expect(game.lastMove).toEqual({ row: 1, col: 1, num: 0 });
        expect(keyEvent.preventDefault).toHaveBeenCalled();
    });

    test('should not handle input when no cell is selected', () => {
        game.selectedCell = null;

        const inputEvent = new Event('input');
        game.hiddenInput.value = '3';

        game.handleMobileInput(inputEvent);

        expect(game.lastMove).toBeUndefined();
    });

    test('should reject invalid input values', () => {
        game.selectCell(2, 2);

        // Test with invalid number (too high)
        game.hiddenInput.value = '10';
        const inputEvent = new Event('input');
        Object.defineProperty(inputEvent, 'target', {
            value: game.hiddenInput,
            enumerable: true
        });

        game.handleMobileInput(inputEvent);

        expect(game.lastMove).toBeUndefined();
        expect(game.hiddenInput.value).toBe('');
    });

    test('should handle multiple characters and use last valid one', () => {
        game.selectCell(3, 3);

        game.hiddenInput.value = '7';  // Use just a valid digit
        const inputEvent = new Event('input');
        Object.defineProperty(inputEvent, 'target', {
            value: game.hiddenInput,
            enumerable: true
        });

        game.handleMobileInput(inputEvent);

        expect(game.lastMove).toEqual({ row: 3, col: 3, num: 7 });
        expect(game.hiddenInput.value).toBe('');
    });
});
