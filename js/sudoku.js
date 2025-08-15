class SudokuGenerator {
    constructor() {
        this.grid = Array(9).fill().map(() => Array(9).fill(0));
    }

    isValid(grid, row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (grid[row][i] === num || grid[i][col] === num) {
                return false;
            }
        }

        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = boxRow; i < boxRow + 3; i++) {
            for (let j = boxCol; j < boxCol + 3; j++) {
                if (grid[i][j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    solveSudoku(grid) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (this.isValid(grid, row, col, num)) {
                            grid[row][col] = num;
                            if (this.solveSudoku(grid)) {
                                return true;
                            }
                            grid[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    fillGrid(grid) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                    this.shuffleArray(numbers);
                    
                    for (let num of numbers) {
                        if (this.isValid(grid, row, col, num)) {
                            grid[row][col] = num;
                            if (this.fillGrid(grid)) {
                                return true;
                            }
                            grid[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    removeNumbers(grid, difficulty) {
        const difficultyMap = {
            'easy': 35,
            'medium': 45,
            'hard': 55
        };
        
        const cellsToRemove = difficultyMap[difficulty] || 45;
        let removed = 0;
        
        // Versão simplificada para garantir que funcione
        while (removed < cellsToRemove) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            
            if (grid[row][col] !== 0) {
                grid[row][col] = 0;
                removed++;
            }
        }
    }

    hasUniqueSolution(grid) {
        const solutions = [];
        this.countSolutions(grid, solutions, 2);
        return solutions.length === 1;
    }

    countSolutions(grid, solutions, maxSolutions) {
        if (solutions.length >= maxSolutions) {
            return;
        }

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (this.isValid(grid, row, col, num)) {
                            grid[row][col] = num;
                            this.countSolutions(grid, solutions, maxSolutions);
                            grid[row][col] = 0;
                        }
                    }
                    return;
                }
            }
        }
        
        solutions.push(grid.map(row => [...row]));
    }

    generatePuzzle(difficulty = 'medium') {
        // Começar com uma grade válida simples para testes
        const baseSolution = [
            [5,3,4,6,7,8,9,1,2],
            [6,7,2,1,9,5,3,4,8],
            [1,9,8,3,4,2,5,6,7],
            [8,5,9,7,6,1,4,2,3],
            [4,2,6,8,5,3,7,9,1],
            [7,1,3,9,2,4,8,5,6],
            [9,6,1,5,3,7,2,8,4],
            [2,8,7,4,1,9,6,3,5],
            [3,4,5,2,8,6,1,7,9]
        ];
        
        const puzzle = baseSolution.map(row => [...row]);
        this.removeNumbers(puzzle, difficulty);
        
        return {
            puzzle,
            solution: baseSolution.map(row => [...row])
        };
    }
}

class SudokuValidator {
    static isValidMove(grid, row, col, num) {
        const tempGrid = grid.map(row => [...row]);
        tempGrid[row][col] = num;
        return this.isValidGrid(tempGrid, row, col);
    }

    static isValidGrid(grid, changedRow = -1, changedCol = -1) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const num = grid[row][col];
                if (num !== 0) {
                    if (!this.isValidPosition(grid, row, col, num)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    static isValidPosition(grid, row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (i !== col && grid[row][i] === num) {
                return false;
            }
            if (i !== row && grid[i][col] === num) {
                return false;
            }
        }

        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = boxRow; i < boxRow + 3; i++) {
            for (let j = boxCol; j < boxCol + 3; j++) {
                if ((i !== row || j !== col) && grid[i][j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    static isComplete(grid) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    return false;
                }
            }
        }
        return this.isValidGrid(grid);
    }

    static getHint(puzzle, solution) {
        const emptyCells = [];
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (puzzle[row][col] === 0) {
                    emptyCells.push({ row, col });
                }
            }
        }
        
        if (emptyCells.length === 0) {
            return null;
        }
        
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        return {
            row: randomCell.row,
            col: randomCell.col,
            value: solution[randomCell.row][randomCell.col]
        };
    }
}