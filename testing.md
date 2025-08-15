# Guia de Testes - Sudoku Game

Este documento descreve como executar e contribuir com os testes do jogo Sudoku.

## 📋 Visão Geral

O projeto utiliza **Jest** como framework de testes, com cobertura para:
- Geração e validação de puzzles Sudoku
- Lógica do jogo e estado
- Sistema de internacionalização (i18n)
- Funcionalidades de interface

## 🚀 Executando os Testes

### Pré-requisitos

```bash
# Instalar dependências
npm install
```

### Comandos de Teste

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch (reexecuta quando arquivos mudam)
npm run test:watch

# Executar testes com relatório de cobertura
npm run test:coverage
```

## 📁 Estrutura dos Testes

```
tests/
├── setup.js           # Configuração global dos testes
├── sudoku.test.js      # Testes da lógica do Sudoku
├── game.test.js        # Testes da classe SudokuGame
└── i18n.test.js        # Testes do sistema de internacionalização
```

## 🧪 Categorias de Teste

### 1. Testes da Lógica do Sudoku (`sudoku.test.js`)

**SudokuGenerator:**
- ✅ Validação de números em posições
- ✅ Geração de puzzles válidos
- ✅ Diferentes níveis de dificuldade
- ✅ Algoritmo de embaralhamento

**SudokuValidator:**
- ✅ Validação de movimentos
- ✅ Verificação de puzzle completo
- ✅ Sistema de dicas
- ✅ Detecção de erros

### 2. Testes do Jogo (`game.test.js`)

**SudokuGame:**
- ✅ Inicialização do jogo
- ✅ Geração de novos jogos
- ✅ Movimentos do jogador
- ✅ Sistema de recordes
- ✅ Formatação de tempo
- ✅ Reset do jogo

### 3. Testes de Internacionalização (`i18n.test.js`)

**I18n:**
- ✅ Carregamento de traduções
- ✅ Troca de idiomas
- ✅ Atualização da interface
- ✅ Persistência de preferências
- ✅ Tratamento de erros

## 🎯 Cobertura de Testes

O projeto visa manter alta cobertura de testes:

| Arquivo | Cobertura Alvo |
|---------|----------------|
| `sudoku.js` | > 90% |
| `game.js` | > 85% |
| `i18n.js` | > 90% |
| `app.js` | > 70% |

### Visualizar Cobertura

```bash
npm run test:coverage
```

Após executar, abra `coverage/lcov-report/index.html` no navegador para ver o relatório detalhado.

## 🛠️ Configuração dos Testes

### Jest Configuration (`package.json`)

```json
{
  "jest": {
    "testEnvironment": "jsdom",
    "setupFilesAfterEnv": ["<rootDir>/tests/setup.js"],
    "testMatch": ["<rootDir>/tests/**/*.test.js"]
  }
}
```

### Setup Global (`tests/setup.js`)

Configura:
- Mock do `localStorage`
- Mock do `alert`
- Mock do `fetch` para testes de i18n
- Ambiente JSDOM para testes de DOM

## ✍️ Escrevendo Novos Testes

### Estrutura Recomendada

```javascript
describe('NomeDaClasse', () => {
    let instance;

    beforeEach(() => {
        // Setup antes de cada teste
        instance = new NomeDaClasse();
    });

    describe('nomeDoMetodo', () => {
        test('should do something expected', () => {
            // Arrange
            const input = 'test input';
            
            // Act
            const result = instance.nomeDoMetodo(input);
            
            // Assert
            expect(result).toBe('expected output');
        });
    });
});
```

### Boas Práticas

1. **Nomes descritivos**: Use nomes claros para testes
2. **Arrange-Act-Assert**: Organize os testes em seções claras
3. **Isolamento**: Cada teste deve ser independente
4. **Mocks apropriados**: Use mocks para dependências externas
5. **Edge cases**: Teste casos extremos e de erro

### Exemplo de Teste

```javascript
describe('SudokuValidator', () => {
    describe('isValidMove', () => {
        test('should reject number in same row', () => {
            // Arrange
            const grid = Array(9).fill().map(() => Array(9).fill(0));
            grid[0][1] = 5; // Coloca 5 na primeira linha
            
            // Act
            const isValid = SudokuValidator.isValidMove(grid, 0, 0, 5);
            
            // Assert
            expect(isValid).toBe(false);
        });
    });
});
```

## 🐛 Debug de Testes

### Executar Teste Específico

```bash
# Executar apenas um arquivo de teste
npm test sudoku.test.js

# Executar teste específico por nome
npm test -- --testNamePattern="should validate correct number placement"
```

### Modo Verbose

```bash
npm test -- --verbose
```

### Debug no VS Code

Adicione esta configuração no `.vscode/launch.json`:

```json
{
    "type": "node",
    "request": "launch",
    "name": "Jest Debug",
    "program": "${workspaceFolder}/node_modules/.bin/jest",
    "args": ["--runInBand"],
    "console": "integratedTerminal",
    "internalConsoleOptions": "neverOpen"
}
```

## 🚨 Testes de Regressão

Antes de cada release:

1. Execute todos os testes: `npm test`
2. Verifique a cobertura: `npm run test:coverage`
3. Execute testes em diferentes navegadores (se aplicável)
4. Teste funcionalidade manual em dispositivos móveis

## 📈 Métricas de Qualidade

### Critérios de Aprovação

- ✅ Todos os testes passando
- ✅ Cobertura > 85% em arquivos principais
- ✅ Nenhum teste flaky (instável)
- ✅ Tempo de execução < 30 segundos

### Monitoramento Contínuo

- Execute `npm run test:watch` durante o desenvolvimento
- Configure hooks do Git para executar testes antes de commits
- Monitore a cobertura regularmente

## 🔄 Integração Contínua

Para projetos em produção, considere configurar:
- GitHub Actions para executar testes em PRs
- Relatórios automáticos de cobertura
- Testes em múltiplos navegadores

## 📚 Recursos Adicionais

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Best Practices](https://jestjs.io/docs/tutorial-react)
- [JSDOM Documentation](https://github.com/jsdom/jsdom)

---

**Dúvidas ou problemas com os testes?** Abra uma [issue](https://github.com/dwildt/sudoku/issues) no GitHub.