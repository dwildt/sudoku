class SudokuGame {
    constructor() {
        this.currentSize = 9;
        this.generator = new SudokuGenerator(this.currentSize);
        this.currentPuzzle = null;
        this.currentSolution = null;
        this.playerGrid = null;
        this.givenCells = new Set();
        this.selectedCell = null;
        this.timer = null;
        this.startTime = null;
        this.currentDifficulty = 'medium';
        this.hintsUsed = 0;
        
        this.initializeEventListeners();
        this.loadRecords();
    }

    initializeEventListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        document.getElementById('new-game').addEventListener('click', () => this.newGame());
        document.getElementById('check-solution').addEventListener('click', () => this.checkSolution());
        document.getElementById('hint').addEventListener('click', () => this.getHint());
        document.getElementById('reset').addEventListener('click', () => this.resetGame());
        document.getElementById('show-records').addEventListener('click', () => this.showRecords());
        document.getElementById('close-victory').addEventListener('click', () => this.closeVictoryModal());
        document.getElementById('close-records').addEventListener('click', () => this.closeRecordsModal());
        
        document.getElementById('difficulty-select').addEventListener('change', (e) => {
            this.currentDifficulty = e.target.value;
            this.newGame();
        });
        
        document.getElementById('size-select').addEventListener('change', (e) => {
            this.currentSize = parseInt(e.target.value);
            this.generator = new SudokuGenerator(this.currentSize);
            this.newGame();
        });
    }

    newGame() {
        this.stopTimer();
        this.hintsUsed = 0;
        
        const { puzzle, solution } = this.generator.generatePuzzle(this.currentDifficulty);
        this.currentPuzzle = puzzle;
        this.currentSolution = solution;
        this.playerGrid = puzzle.map(row => [...row]);
        
        this.identifyGivenCells();
        this.renderGrid();
        this.startTimer();
    }

    identifyGivenCells() {
        this.givenCells.clear();
        for (let row = 0; row < this.currentSize; row++) {
            for (let col = 0; col < this.currentSize; col++) {
                if (this.currentPuzzle[row][col] !== 0) {
                    this.givenCells.add(`${row}-${col}`);
                }
            }
        }
    }

    renderGrid() {
        const gridElement = document.getElementById('sudoku-grid');
        gridElement.innerHTML = '';
        gridElement.className = `sudoku-grid size-${this.currentSize}`;

        for (let row = 0; row < this.currentSize; row++) {
            for (let col = 0; col < this.currentSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'sudoku-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                const value = this.playerGrid[row][col];
                cell.textContent = value === 0 ? '' : value;
                
                if (this.givenCells.has(`${row}-${col}`)) {
                    cell.classList.add('given');
                }
                
                cell.addEventListener('click', () => this.selectCell(row, col));
                gridElement.appendChild(cell);
            }
        }
    }

    selectCell(row, col) {
        if (this.givenCells.has(`${row}-${col}`)) {
            return;
        }
        
        document.querySelectorAll('.sudoku-cell').forEach(cell => {
            cell.classList.remove('selected');
        });
        
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cell.classList.add('selected');
        this.selectedCell = { row, col };
    }

    handleKeyPress(e) {
        if (!this.selectedCell) return;
        
        const { row, col } = this.selectedCell;
        
        if (e.key >= '1' && e.key <= this.currentSize.toString()) {
            const num = parseInt(e.key);
            this.makeMove(row, col, num);
        } else if (e.key === 'Delete' || e.key === 'Backspace' || e.key === '0') {
            this.makeMove(row, col, 0);
        }
    }

    makeMove(row, col, num) {
        if (this.givenCells.has(`${row}-${col}`)) {
            return;
        }
        
        this.playerGrid[row][col] = num;
        
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cell.textContent = num === 0 ? '' : num;
        cell.classList.remove('error', 'hint');
        
        if (num !== 0 && !SudokuValidator.isValidMove(this.playerGrid, row, col, num)) {
            cell.classList.add('error');
        }
        
        if (SudokuValidator.isComplete(this.playerGrid)) {
            this.gameComplete();
        }
    }

    checkSolution() {
        let hasErrors = false;
        
        document.querySelectorAll('.sudoku-cell').forEach(cell => {
            cell.classList.remove('error');
        });
        
        for (let row = 0; row < this.currentSize; row++) {
            for (let col = 0; col < this.currentSize; col++) {
                const value = this.playerGrid[row][col];
                if (value !== 0 && !SudokuValidator.isValidMove(this.playerGrid, row, col, value)) {
                    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                    cell.classList.add('error');
                    hasErrors = true;
                }
            }
        }
        
        if (!hasErrors) {
            alert(i18n.t('noErrors'));
        }
    }

    getHint() {
        const hint = SudokuValidator.getHint(this.playerGrid, this.currentSolution);
        
        if (!hint) {
            alert(i18n.t('noHintsAvailable'));
            return;
        }
        
        this.hintsUsed++;
        this.makeMove(hint.row, hint.col, hint.value);
        
        const cell = document.querySelector(`[data-row="${hint.row}"][data-col="${hint.col}"]`);
        cell.classList.add('hint');
        
        setTimeout(() => {
            cell.classList.remove('hint');
        }, 2000);
    }

    resetGame() {
        this.playerGrid = this.currentPuzzle.map(row => [...row]);
        this.renderGrid();
        this.selectedCell = null;
        this.hintsUsed = 0;
        this.startTimer();
    }

    startTimer() {
        this.startTime = Date.now();
        this.timer = setInterval(() => {
            const elapsed = Date.now() - this.startTime;
            const seconds = Math.floor(elapsed / 1000);
            const minutes = Math.floor(seconds / 60);
            const displaySeconds = seconds % 60;
            
            document.getElementById('timer-display').textContent = 
                `${minutes.toString().padStart(2, '0')}:${displaySeconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    gameComplete() {
        this.stopTimer();
        const totalTime = Date.now() - this.startTime;
        const timeString = this.formatTime(totalTime);
        
        document.getElementById('final-time').textContent = timeString;
        
        const isRecord = this.saveRecord(totalTime);
        const recordMessage = document.getElementById('record-message');
        
        if (isRecord) {
            recordMessage.textContent = i18n.t('newRecord');
            recordMessage.style.color = 'var(--primary-color)';
        } else {
            recordMessage.textContent = '';
        }
        
        document.getElementById('victory-modal').classList.remove('hidden');
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
            size: this.currentSize,
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

    loadRecords() {
        // Records are loaded from localStorage when needed
    }

    showRecords() {
        const records = this.getRecords();
        const recordsList = document.getElementById('records-list');
        
        if (records.length === 0) {
            recordsList.innerHTML = `<p>${i18n.t('noRecords')}</p>`;
        } else {
            recordsList.innerHTML = records.map((record, index) => {
                const sizeText = record.size ? `${record.size}x${record.size}` : '9x9';
                return `
                    <div class="record-item">
                        <span>#${index + 1} - ${sizeText} ${i18n.t('difficulty.' + record.difficulty)}</span>
                        <span>${this.formatTime(record.time)}</span>
                    </div>
                `;
            }).join('');
        }
        
        document.getElementById('records-modal').classList.remove('hidden');
    }

    closeVictoryModal() {
        document.getElementById('victory-modal').classList.add('hidden');
    }

    closeRecordsModal() {
        document.getElementById('records-modal').classList.add('hidden');
    }
}