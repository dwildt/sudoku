# GitHub Copilot Instructions - Sudoku Game

## 🎯 Contexto do Projeto

Este é um jogo de Sudoku moderno desenvolvido em **JavaScript Vanilla** com suporte multi-size (4x4, 6x6, 9x9) e internacionalização (pt/en/es).

## 🏗️ Arquitetura

### Estrutura de Classes Principais
- `SudokuGame`: Lógica principal do jogo
- `SudokuGenerator`: Geração de puzzles multi-size  
- `SudokuValidator`: Validação dinâmica baseada no tamanho
- `I18n`: Sistema de internacionalização

### Arquivos Principais
- `js/app.js`: Interface e manipulação DOM
- `js/game.js`: Lógica do jogo multi-size
- `js/sudoku.js`: Algoritmos de geração/validação
- `js/i18n.js`: Sistema de tradução

## 📝 Convenções de Código

### JavaScript
- Use `const`/`let` (nunca `var`)
- Funções arrow quando apropriado
- Nomes descritivos em português/inglês
- Comentários em português
- ESLint: 4 espaços de indentação, aspas simples

### Multi-Size Support
Sempre considere os tamanhos suportados:
```javascript
// ❌ Evitar valores fixos
const boxSize = 3;

// ✅ Usar dimensões dinâmicas
const dimensions = SudokuValidator.getBoxDimensions(this.currentSize);
```

### CSS
- Custom properties para temas
- Classes `.size-4`, `.size-6`, `.size-9` para diferentes grids
- Mobile-first approach

## 🎨 Temas (Wildtech Colors)
- Primary: `#ff7b00` (laranja)
- Secondary: `#8b4513` (marrom)

## 🧪 Testes
- Framework: Jest
- Cobertura alvo: >85% nos arquivos principais
- Sempre rodar testes após mudanças: `npm test`

## 🔧 Comandos Importantes
```bash
npm test              # Executar testes
npm run lint          # Verificar lint
npm run lint:fix      # Corrigir lint automaticamente
npm run test:coverage # Cobertura de testes
```

## 🚫 Evitar
- Mutar objetos diretamente
- Valores hardcoded para dimensões de grid
- Uso de `var`
- Console.log em produção
- Quebrar compatibilidade multi-size

## ✅ Priorizar
- Manter compatibilidade com todos os tamanhos (4x4, 6x6, 9x9)
- Preservar sistema de i18n
- Responsividade mobile
- Performance em dispositivos móveis
- Testes unitários para novas funcionalidades