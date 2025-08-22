# Claude Development Guide - Sudoku Game Multi-Size

## 📋 Comandos Essenciais

### Testes
```bash
npm test                 # Executar todos os testes
npm run test:watch      # Executar testes em modo watch
npm run test:coverage   # Executar testes com cobertura
```

### Desenvolvimento
```bash
# Servidor local (opções)
python -m http.server 8000
npx http-server
```

## 🏗️ Estrutura do Projeto

```
sudoku/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos principais com suporte multi-grid
├── js/
│   ├── app.js          # Lógica da aplicação e UI
│   ├── game.js         # Lógica do jogo Sudoku multi-size
│   ├── i18n.js         # Sistema de internacionalização
│   └── sudoku.js       # Algoritmos de geração/resolução multi-size
├── i18n/               # Arquivos de tradução (pt, en, es)
├── tests/              # Testes Jest (incluindo 4x4 e 6x6)
└── package.json        # Configurações do projeto
```

## 💻 Tecnologias

- **JavaScript Vanilla**: Sem frameworks, ES6+
- **CSS3**: Grid, Flexbox, Custom Properties
- **Jest**: Framework de testes
- **LocalStorage**: Persistência de dados

## 🎯 Funcionalidades Principais

### Core do Jogo (`js/game.js`)
- **Suporte Multi-Size**: 4x4, 6x6 e 9x9
- Geração de puzzles por dificuldade e tamanho
- Validação de movimentos adaptativa
- Sistema de timer
- Gerenciamento de estado por tamanho

### Interface (`js/app.js`)
- Manipulação do DOM
- Event handlers para seleção de tamanho
- Sistema de temas (Wildtech/Severance)
- Gerenciamento de recordes por tamanho

### Algoritmos (`js/sudoku.js`)
- **SudokuGenerator**: Suporte a grids 4x4 (2x2), 6x6 (3x2) e 9x9 (3x3)
- **SudokuValidator**: Validação dinâmica baseada no tamanho
- Dimensões de caixas configuráveis

### Internacionalização (`js/i18n.js`)
- Suporte a pt/en/es
- Carregamento dinâmico
- Fallback para português

## 📝 Convenções de Código

### JavaScript
- Use `const`/`let` (não `var`)
- Funções arrow quando apropriado
- Nomes descritivos em português/inglês
- Comentários em português
- Evite mutação direta de objetos

### CSS
- Custom properties para cores
- Classes semânticas
- Mobile-first approach
- Grid/Flexbox para layout

### Estrutura de Classes Multi-Size
```javascript
// Exemplo de convenção multi-size
class SudokuGame {
    constructor() {
        this.currentSize = 9; // 4, 6 ou 9
        this.generator = new SudokuGenerator(this.currentSize);
        this.board = [];
        this.solution = [];
    }
    
    validateMove(row, col, value) {
        // Lógica de validação adaptativa
        return SudokuValidator.isValidMove(this.playerGrid, row, col, value);
    }
}

class SudokuGenerator {
    constructor(size = 9) {
        this.size = size;
        this.boxWidth = size === 4 ? 2 : (size === 6 ? 3 : 3);
        this.boxHeight = size === 4 ? 2 : (size === 6 ? 2 : 3);
    }
}
```

## 🧪 Testes

### Cobertura Atual
- `sudoku.js`: Algoritmos de geração/validação para 4x4, 6x6 e 9x9
- `game.js`: Lógica do jogo multi-size
- `i18n.js`: Sistema de tradução
- **Novos testes**: Validação específica para grids 4x4 e 6x6

### Padrões de Teste Multi-Size
```javascript
describe('SudokuGenerator 4x4', () => {
    test('deve gerar tabuleiro 4x4 válido', () => {
        const generator = new SudokuGenerator(4);
        const { puzzle, solution } = generator.generatePuzzle();
        expect(puzzle).toHaveLength(4);
        expect(puzzle[0]).toHaveLength(4);
    });
});

describe('SudokuValidator Multi-Size', () => {
    test('deve validar corretamente caixas 2x2 para 4x4', () => {
        const dimensions = SudokuValidator.getBoxDimensions(4);
        expect(dimensions.width).toBe(2);
        expect(dimensions.height).toBe(2);
    });
});
```

## 🎨 Sistema de Temas

### Wildtech Theme
- Primary: `#ff7b00` (laranja)
- Secondary: `#8b4513` (marrom)

### Severance Theme  
- Primary: `#2563eb` (azul)
- Secondary: `#1e40af` (azul escuro)

### Implementação Multi-Size
```css
:root {
    --primary-color: #ff7b00;
    --secondary-color: #8b4513;
}

/* Grid sizes */
.sudoku-grid.size-4 {
    grid-template-columns: repeat(4, 1fr);
    width: 300px;
    height: 300px;
}

.sudoku-grid.size-6 {
    grid-template-columns: repeat(6, 1fr);
    width: 360px;
    height: 360px;
}

.sudoku-grid.size-9 {
    grid-template-columns: repeat(9, 1fr);
    width: 450px;
    height: 450px;
}

/* Theme-specific borders for different sizes */
body.wildtech-theme .sudoku-grid.size-4 .sudoku-cell:nth-child(2) {
    border-right-color: var(--wildtech-primary);
}
```

## 🌍 Internacionalização

### Arquivos de Tradução
- `i18n/pt.json`: Português (padrão)
- `i18n/en.json`: Inglês  
- `i18n/es.json`: Espanhol

### Uso no Código
```javascript
const i18n = new I18n();
await i18n.loadLanguage('en');
const text = i18n.t('game.difficulty.easy');
```

## 💾 Persistência

### LocalStorage Keys
- `sudoku-records`: Recordes dos jogadores (agora inclui tamanho do grid)
- `sudoku-theme`: Tema selecionado
- `sudoku-language`: Idioma atual

### Estrutura de Records
```javascript
{
  time: 180000, // milliseconds
  difficulty: 'medium',
  size: 6, // 4, 6, ou 9
  date: '2024-01-01T12:00:00.000Z',
  hintsUsed: 2
}
```

## 🚀 Deployment

O projeto é deployado automaticamente via GitHub Pages:
- URL: https://dwildt.github.io/sudoku
- Branch: `main`
- Arquivos estáticos apenas

## 🛠️ Instruções Específicas para Claude

1. **Sempre execute testes após mudanças**: `npm test` (inclui testes multi-size)
2. **Mantenha compatibilidade mobile**: Teste responsividade em todos os tamanhos
3. **Preserve i18n**: Atualize todas as traduções quando necessário
4. **Valide Sudoku Multi-Size**: Use `SudokuValidator.getBoxDimensions(size)` para dimensões corretas
5. **CSS Multi-Grid**: Use classes `.size-4`, `.size-6`, `.size-9` para estilos específicos
6. **JS**: Mantenha vanilla JavaScript, sempre considere `this.currentSize` em mudanças
7. **Construtor de Classes**: Sempre passe `size` para `SudokuGenerator(size)`
8. **Testes**: Adicione testes para novos tamanhos quando implementar funcionalidades

## 🎯 Dificuldades Conhecidas

### Geração de Puzzles Multi-Size
- Algoritmo pode ser lento para nível Difícil em grids 9x9
- Grids 4x4 e 6x6 são mais rápidos de gerar
- Usar cache quando possível
- Soluções fixas implementadas para performance

### Performance Mobile Multi-Size
- Animações podem ser lentas em dispositivos antigos
- CSS transforms preferíveis a mudanças de layout
- Grids menores (4x4) têm melhor performance em mobile
- Tamanhos responsivos implementados para diferentes breakpoints

### CSS Multi-Grid Challenges
- Bordas de caixas complexas para diferentes tamanhos
- nth-child selectors específicos para cada grid size
- Manter consistência visual entre tamanhos

### Browser Compatibility
- LocalStorage pode não estar disponível
- Implementar fallbacks apropriados
- Recordes agora incluem campo `size` (compatibilidade com registros antigos)