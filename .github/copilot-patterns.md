# GitHub Copilot Development Patterns - Sudoku Game

## 🤖 Copilot-Friendly Code Patterns

Este guia documenta padrões que funcionam bem com GitHub Copilot no projeto Sudoku.

### 📦 Estrutura de Classes Multi-Size

```javascript
// ✅ Padrão recomendado - Classes com size parameter
class SudokuGenerator {
    constructor(size = 9) {
        this.size = size;
        this.boxWidth = size === 4 ? 2 : (size === 6 ? 3 : 3);
        this.boxHeight = size === 4 ? 2 : (size === 6 ? 2 : 3);
    }
    
    generatePuzzle(difficulty = 'medium') {
        // Implementação adaptativa baseada em this.size
    }
}

// ✅ Uso consistente
const generator = new SudokuGenerator(6); // Para 6x6
const puzzle = generator.generatePuzzle('easy');
```

### 🎯 Validação Dinâmica

```javascript
// ✅ Padrão para validação multi-size
class SudokuValidator {
    static getBoxDimensions(size) {
        switch (size) {
            case 4: return { width: 2, height: 2 };
            case 6: return { width: 3, height: 2 };
            case 9: return { width: 3, height: 3 };
        }
    }
    
    static isValidMove(grid, row, col, value) {
        const size = grid.length;
        const { width, height } = this.getBoxDimensions(size);
        // Validação dinâmica baseada nas dimensões
    }
}
```

### 🎨 CSS Multi-Grid Patterns

```css
/* ✅ Padrão para estilos responsivos multi-size */
.sudoku-grid {
    display: grid;
    gap: 1px;
    background-color: var(--border-color);
}

.sudoku-grid.size-4 {
    grid-template-columns: repeat(4, 1fr);
    width: min(300px, 80vw);
    height: min(300px, 80vw);
}

.sudoku-grid.size-6 {
    grid-template-columns: repeat(6, 1fr);
    width: min(360px, 85vw);
    height: min(360px, 85vw);
}

.sudoku-grid.size-9 {
    grid-template-columns: repeat(9, 1fr);
    width: min(450px, 90vw);
    height: min(450px, 90vw);
}
```

### 🌍 I18n Patterns

```javascript
// ✅ Padrão para textos internacionalizados
function updateGameUI() {
    const title = i18n.t('game.title');
    const difficulty = i18n.t(`game.difficulty.${currentDifficulty}`);
    
    document.getElementById('game-title').textContent = title;
    document.getElementById('difficulty-display').textContent = difficulty;
}

// ✅ Chaves estruturadas nos arquivos JSON
{
    "game": {
        "title": "Sudoku",
        "difficulty": {
            "easy": "Fácil",
            "medium": "Médio",
            "hard": "Difícil"
        },
        "size": {
            "4x4": "4x4 (Iniciante)",
            "6x6": "6x6 (Intermediário)", 
            "9x9": "9x9 (Clássico)"
        }
    }
}
```

### 🧪 Teste Patterns

```javascript
// ✅ Padrão para testes multi-size
describe('SudokuGenerator Multi-Size', () => {
    const sizes = [4, 6, 9];
    
    sizes.forEach(size => {
        test(`deve gerar tabuleiro ${size}x${size} válido`, () => {
            const generator = new SudokuGenerator(size);
            const { puzzle, solution } = generator.generatePuzzle();
            
            expect(puzzle).toHaveLength(size);
            expect(puzzle[0]).toHaveLength(size);
            expect(solution).toHaveLength(size);
        });
    });
});
```

### 📱 Mobile-First Patterns

```css
/* ✅ Padrão mobile-first responsivo */
.game-controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
}

@media (min-width: 768px) {
    .game-controls {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
}

/* ✅ Botões touch-friendly */
.game-button {
    min-height: 44px; /* iOS/Android touch target */
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 0.5rem;
}
```

### 🎨 Theme Patterns

```css
/* ✅ Wildtech theme (cores principais) */
:root {
    --wildtech-primary: #ff7b00;
    --wildtech-secondary: #8b4513;
    --wildtech-background: #fff5f0;
}

body.wildtech-theme {
    --primary-color: var(--wildtech-primary);
    --secondary-color: var(--wildtech-secondary);
    --background-color: var(--wildtech-background);
}

/* ✅ Severance theme alternativo */
body.severance-theme {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --background-color: #f8fafc;
}
```

### ⚡ Performance Patterns

```javascript
// ✅ Cache para puzzles fixos (performance)
class SudokuGame {
    constructor() {
        this.puzzleCache = new Map();
        this.currentSize = 9;
    }
    
    getCachedPuzzle(size, difficulty) {
        const key = `${size}-${difficulty}`;
        if (this.puzzleCache.has(key)) {
            return this.puzzleCache.get(key);
        }
        
        const puzzle = this.generator.generatePuzzle(difficulty);
        this.puzzleCache.set(key, puzzle);
        return puzzle;
    }
}
```

### 🚫 Anti-Patterns (Evitar)

```javascript
// ❌ Evitar valores hardcoded
const boxSize = 3; // Quebra 4x4 e 6x6

// ❌ Evitar dependências de tamanho específico
if (grid.length !== 9) throw new Error('Only 9x9 supported');

// ❌ Evitar CSS não responsivo
.sudoku-cell {
    width: 50px; /* Fixo demais para mobile */
    height: 50px;
}

// ❌ Evitar textos hardcoded
alert('Game completed!'); // Usar i18n.t('game.completed')
```

## 🔧 Comandos de Desenvolvimento

```bash
# Verificar código antes de commit
npm run lint          # Verificar problemas
npm run lint:fix       # Corrigir automaticamente
npm test              # Executar todos os testes
npm run test:coverage # Ver cobertura

# Desenvolvimento local
python -m http.server 8000  # Servidor simples
npx http-server            # Alternativa Node.js
```

Este documento ajuda GitHub Copilot a entender os padrões do projeto e gerar código consistente.