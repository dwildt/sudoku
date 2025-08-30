class SudokuGenerator {
    constructor(size = 9) {
        this.size = size;
        this.grid = Array(size).fill().map(() => Array(size).fill(0));
        this.boxWidth = size === 4 ? 2 : (size === 6 ? 3 : 3);
        this.boxHeight = size === 4 ? 2 : (size === 6 ? 2 : 3);
    }

    isValid(grid, row, col, num) {
        const size = grid.length;

        for (let i = 0; i < size; i++) {
            if (grid[row][i] === num || grid[i][col] === num) {
                return false;
            }
        }

        const boxRow = Math.floor(row / this.boxHeight) * this.boxHeight;
        const boxCol = Math.floor(col / this.boxWidth) * this.boxWidth;
        for (let i = boxRow; i < boxRow + this.boxHeight; i++) {
            for (let j = boxCol; j < boxCol + this.boxWidth; j++) {
                if (grid[i][j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    solveSudoku(grid) {
        const size = grid.length;
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (grid[row][col] === 0) {
                    for (let num = 1; num <= size; num++) {
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
        const size = grid.length;
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (grid[row][col] === 0) {
                    const numbers = Array.from({ length: size }, (_, i) => i + 1);
                    this.shuffleArray(numbers);

                    for (const num of numbers) {
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
        const size = grid.length;
        const totalCells = size * size;

        const difficultyMap = {
            4: { 'easy': Math.floor(totalCells * 0.4), 'medium': Math.floor(totalCells * 0.5), 'hard': Math.floor(totalCells * 0.6) },
            6: { 'easy': Math.floor(totalCells * 0.45), 'medium': Math.floor(totalCells * 0.55), 'hard': Math.floor(totalCells * 0.65) },
            9: { 'easy': 35, 'medium': 45, 'hard': 55 }
        };

        const cellsToRemove = difficultyMap[size][difficulty] || difficultyMap[size]['medium'];
        let removed = 0;

        while (removed < cellsToRemove) {
            const row = Math.floor(Math.random() * size);
            const col = Math.floor(Math.random() * size);

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

        const size = grid.length;
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (grid[row][col] === 0) {
                    for (let num = 1; num <= size; num++) {
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
        let baseSolution;

        if (this.size === 4) {
            baseSolution = [
                [1, 2, 3, 4],
                [3, 4, 1, 2],
                [2, 1, 4, 3],
                [4, 3, 2, 1]
            ];
        } else if (this.size === 6) {
            baseSolution = [
                [1, 2, 3, 4, 5, 6],
                [4, 5, 6, 1, 2, 3],
                [2, 3, 1, 5, 6, 4],
                [5, 6, 4, 2, 3, 1],
                [3, 1, 2, 6, 4, 5],
                [6, 4, 5, 3, 1, 2]
            ];
        } else {
            baseSolution = [
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
        }

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

    static getBoxDimensions(size) {
        if (size === 4) {
            return { width: 2, height: 2 };
        }
        if (size === 6) {
            return { width: 3, height: 2 };
        }
        return { width: 3, height: 3 };
    }

    static isValidGrid(grid, changedRow = -1, changedCol = -1) {
        const size = grid.length;
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
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
        const size = grid.length;
        const { width, height } = this.getBoxDimensions(size);

        for (let i = 0; i < size; i++) {
            if (i !== col && grid[row][i] === num) {
                return false;
            }
            if (i !== row && grid[i][col] === num) {
                return false;
            }
        }

        const boxRow = Math.floor(row / height) * height;
        const boxCol = Math.floor(col / width) * width;
        for (let i = boxRow; i < boxRow + height; i++) {
            for (let j = boxCol; j < boxCol + width; j++) {
                if ((i !== row || j !== col) && grid[i][j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    static isComplete(grid) {
        const size = grid.length;
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (grid[row][col] === 0) {
                    return false;
                }
            }
        }
        return this.isValidGrid(grid);
    }

    static getHint(puzzle, solution) {
        const size = puzzle.length;
        const emptyCells = [];
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
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
