/**
 * @jest-environment jsdom
 */

// Mock classes for testing
class SudokuGenerator {
    generatePuzzle() {
        const puzzle = Array(9).fill().map(() => Array(9).fill(0));
        puzzle[0][0] = 5; // Add at least one given number
        return {
            puzzle,
            solution: Array(9).fill().map(() => Array(9).fill(1))
        };
    }
}

class SudokuValidator {
    static isComplete() { return false; }
    static getHint() { return { row: 0, col: 0, value: 1 }; }
}

class SudokuGame {
    constructor() {
        this.generator = new SudokuGenerator();
        this.currentPuzzle = null;
        this.currentSolution = null;
        this.playerGrid = null;
        this.givenCells = new Set();
        this.selectedCell = null;
        this.timer = null;
        this.startTime = null;
        this.currentDifficulty = 'medium';
        this.hintsUsed = 0;
    }

    newGame() {
        const { puzzle, solution } = this.generator.generatePuzzle();
        this.currentPuzzle = puzzle;
        this.currentSolution = solution;
        this.playerGrid = puzzle.map(row => [...row]);
        this.hintsUsed = 0;
        this.identifyGivenCells();
    }

    identifyGivenCells() {
        this.givenCells.clear();
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.currentPuzzle[row][col] !== 0) {
                    this.givenCells.add(`${row}-${col}`);
                }
            }
        }
    }

    makeMove(row, col, num) {
        if (this.givenCells.has(`${row}-${col}`)) {
            return;
        }
        this.playerGrid[row][col] = num;
    }

    formatTime(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const displaySeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${displaySeconds.toString().padStart(2, '0')}`;
    }

    saveRecord(time) {
        const records = this.getRecords();
        const newRecord = {
            time,
            difficulty: this.currentDifficulty,
            date: new Date().toISOString(),
            hintsUsed: this.hintsUsed
        };
        
        records.push(newRecord);
        records.sort((a, b) => a.time - b.time);
        
        const isNewBest = records[0] === newRecord;
        
        localStorage.setItem('sudoku-records', JSON.stringify(records.slice(0, 10)));
        return isNewBest;
    }

    getRecords() {
        const stored = localStorage.getItem('sudoku-records');
        return stored ? JSON.parse(stored) : [];
    }

    resetGame() {
        this.playerGrid = this.currentPuzzle.map(row => [...row]);
        this.selectedCell = null;
        this.hintsUsed = 0;
    }
}

// Mock DOM elements
document.body.innerHTML = `
    <div id="sudoku-grid"></div>
    <div id="timer-display">00:00</div>
    <select id="difficulty-select"><option value="medium">Medium</option></select>
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

// Mock i18n
global.i18n = {
    t: jest.fn((key) => key)
};

describe('SudokuGame', () => {
    let game;

    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
        game = new SudokuGame();
    });

    describe('constructor', () => {
        test('should initialize game properly', () => {
            expect(game.generator).toBeInstanceOf(SudokuGenerator);
            expect(game.currentDifficulty).toBe('medium');
            expect(game.hintsUsed).toBe(0);
        });
    });

    describe('newGame', () => {
        test('should generate new puzzle and solution', () => {
            game.newGame();
            
            expect(game.currentPuzzle).toBeTruthy();
            expect(game.currentSolution).toBeTruthy();
            expect(game.playerGrid).toBeTruthy();
            expect(game.hintsUsed).toBe(0);
        });

        test('should identify given cells correctly', () => {
            game.newGame();
            
            expect(game.givenCells).toBeInstanceOf(Set);
            expect(game.givenCells.size).toBeGreaterThan(0);
        });
    });

    describe('makeMove', () => {
        beforeEach(() => {
            game.newGame();
        });

        test('should not allow moves on given cells', () => {
            if (game.givenCells.size > 0) {
                const givenCell = Array.from(game.givenCells)[0];
                const [row, col] = givenCell.split('-').map(Number);
                const originalValue = game.playerGrid[row][col];
                
                game.makeMove(row, col, 9);
                expect(game.playerGrid[row][col]).toBe(originalValue);
            } else {
                expect(true).toBe(true); // Skip if no given cells
            }
        });

        test('should update player grid for valid moves', () => {
            let emptyCell = null;
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (!game.givenCells.has(`${row}-${col}`)) {
                        emptyCell = { row, col };
                        break;
                    }
                }
                if (emptyCell) break;
            }
            
            if (emptyCell) {
                game.makeMove(emptyCell.row, emptyCell.col, 5);
                expect(game.playerGrid[emptyCell.row][emptyCell.col]).toBe(5);
            }
        });
    });

    describe('formatTime', () => {
        test('should format milliseconds correctly', () => {
            expect(game.formatTime(0)).toBe('00:00');
            expect(game.formatTime(30000)).toBe('00:30');
            expect(game.formatTime(90000)).toBe('01:30');
            expect(game.formatTime(3661000)).toBe('61:01');
        });
    });

    describe('saveRecord', () => {
        test('should save record to localStorage', () => {
            game.currentDifficulty = 'easy';
            game.hintsUsed = 2;
            
            const time = 120000; // 2 minutes
            game.saveRecord(time);
            
            const records = JSON.parse(localStorage.getItem('sudoku-records'));
            expect(records).toHaveLength(1);
            expect(records[0].time).toBe(time);
            expect(records[0].difficulty).toBe('easy');
            expect(records[0].hintsUsed).toBe(2);
        });

        test('should return true for new best record', () => {
            game.currentDifficulty = 'medium';
            
            const isRecord = game.saveRecord(60000);
            expect(isRecord).toBe(true);
        });

        test('should sort records by time', () => {
            game.currentDifficulty = 'medium';
            
            game.saveRecord(120000); // 2 minutes
            game.saveRecord(60000);  // 1 minute
            game.saveRecord(180000); // 3 minutes
            
            const records = JSON.parse(localStorage.getItem('sudoku-records'));
            expect(records[0].time).toBe(60000);  // Best time first
            expect(records[1].time).toBe(120000);
            expect(records[2].time).toBe(180000);
        });
    });

    describe('getRecords', () => {
        test('should return empty array for no records', () => {
            const records = game.getRecords();
            expect(records).toEqual([]);
        });

        test('should return stored records', () => {
            const testRecords = [
                { time: 60000, difficulty: 'easy', date: '2023-01-01', hintsUsed: 0 }
            ];
            localStorage.setItem('sudoku-records', JSON.stringify(testRecords));
            
            const records = game.getRecords();
            expect(records).toEqual(testRecords);
        });
    });

    describe('resetGame', () => {
        test('should reset player grid to original puzzle', () => {
            game.newGame();
            const originalPuzzle = game.currentPuzzle.map(row => [...row]);
            
            // Make some moves
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (!game.givenCells.has(`${row}-${col}`)) {
                        game.makeMove(row, col, 5);
                        break;
                    }
                }
            }
            
            game.resetGame();
            expect(game.playerGrid).toEqual(originalPuzzle);
            expect(game.selectedCell).toBeNull();
            expect(game.hintsUsed).toBe(0);
        });
    });
});