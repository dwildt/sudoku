# Sudoku Game

Um jogo de Sudoku moderno e responsivo desenvolvido em JavaScript Vanilla com suporte a múltiplos idiomas e temas.

## 🎮 Jogar Online

Acesse o jogo em: [https://dwildt.github.io/sudoku](https://dwildt.github.io/sudoku)

## ✨ Características

- **Múltiplos tamanhos de grid**: 4x4 Mini, 6x6 Médio e 9x9 Clássico
- **Múltiplos níveis de dificuldade**: Fácil, Médio e Difícil
- **Sistema de temas**: Wildtech (laranja/marrom) e Severance (tons de azul)
- **Multilíngue**: Português, Inglês e Espanhol
- **Sistema de recordes**: Armazena os melhores tempos por tamanho e dificuldade
- **Design responsivo**: Funciona perfeitamente em desktop e mobile
- **Sistema de dicas**: Ajuda quando você está preso
- **Validação em tempo real**: Destaca erros imediatamente
- **Timer integrado**: Acompanhe seu tempo de resolução

## 🚀 Tecnologias Utilizadas

- **JavaScript Vanilla**: Lógica do jogo e interações
- **CSS3**: Estilos e responsividade
- **HTML5**: Estrutura semântica
- **Jest**: Testes unitários
- **LocalStorage**: Persistência de recordes e preferências

## 🛠️ Como Executar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/dwildt/sudoku.git
cd sudoku
```

2. Abra o arquivo `index.html` em um navegador web moderno

Ou execute um servidor local:
```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (se tiver http-server instalado)
npx http-server
```

## 🧪 Desenvolvimento

### Executar Testes

Para executar os testes unitários:

```bash
# Instalar dependências
npm install

# Executar todos os testes
npm test

# Executar testes em modo watch (re-executa quando arquivos mudam)
npm run test:watch

# Executar testes com relatório de cobertura
npm run test:coverage
```

### Validação de Código (Lint)

Para verificar e corrigir a qualidade do código:

```bash
# Verificar problemas de lint
npm run lint

# Corrigir automaticamente problemas de lint (quando possível)
npm run lint:fix

# Executar ESLint diretamente
npx eslint js/ tests/ --ext .js

# ESLint com correção automática
npx eslint js/ tests/ --ext .js --fix
```

### Cobertura de Testes

O projeto possui **54 testes** cobrindo:
- **Geração de Sudoku**: Algoritmos para grids 4x4, 6x6 e 9x9
- **Validação**: Verificação de movimentos e soluções
- **Lógica do jogo**: Timer, recordes, dicas e reset
- **Internacionalização**: Sistema de traduções com fallbacks

### Qualidade do Código

- **ES6 Modules**: Código organizado em módulos com imports/exports
- **Zero Lint Warnings**: Código completamente limpo seguindo padrões ESLint
- **Tratamento de Erro Robusto**: Fallbacks e mensagens amigáveis ao usuário

## 🎯 Como Jogar

1. **Selecione o tamanho**: Escolha entre 4x4 Mini, 6x6 Médio ou 9x9 Clássico
2. **Selecione a dificuldade**: Escolha entre Fácil, Médio ou Difícil
3. **Clique em uma célula**: Selecione uma célula vazia para inserir um número
4. **Digite um número**: Use as teclas apropriadas para inserir números (1-4 para 4x4, 1-6 para 6x6, 1-9 para 9x9), ou Delete/Backspace para apagar
5. **Use as funcionalidades**:
   - **Verificar**: Destaca erros visíveis no tabuleiro
   - **Dica**: Revela o número correto em uma célula aleatória
   - **Reiniciar**: Volta ao estado inicial do puzzle
   - **Novo Jogo**: Gera um novo puzzle

## 📋 Regras do Sudoku

### Sudoku 4x4 Mini
- Preencha a grade 4x4 com números de 1 a 4
- Cada linha deve conter todos os números de 1 a 4
- Cada coluna deve conter todos os números de 1 a 4
- Cada região 2x2 deve conter todos os números de 1 a 4

### Sudoku 6x6 Médio
- Preencha a grade 6x6 com números de 1 a 6
- Cada linha deve conter todos os números de 1 a 6
- Cada coluna deve conter todos os números de 1 a 6
- Cada região 3x2 deve conter todos os números de 1 a 6

### Sudoku 9x9 Clássico
- Preencha a grade 9x9 com números de 1 a 9
- Cada linha deve conter todos os números de 1 a 9
- Cada coluna deve conter todos os números de 1 a 9
- Cada região 3x3 deve conter todos os números de 1 a 9

**Regra Universal**: Nenhum número pode se repetir na mesma linha, coluna ou região

## 🎨 Temas Disponíveis

### Wildtech
- Cores principais: Laranja (#ff7b00) e Marrom (#8b4513)
- Visual moderno e energético

### Severance
- Cores principais: Tons de azul (#2563eb, #1e40af)
- Visual elegante e profissional

## 🌍 Idiomas Suportados

- **Português**: Idioma padrão
- **English**: Tradução completa
- **Español**: Tradução completa

## 🏆 Sistema de Recordes

O jogo salva automaticamente seus melhores tempos no navegador. Os recordes são organizados por:
- Tamanho do grid (4x4, 6x6, 9x9)
- Tempo de conclusão
- Dificuldade do puzzle
- Data da conquista
- Número de dicas utilizadas

## 📱 Compatibilidade

- **Desktop**: Chrome, Firefox, Safari, Edge (versões modernas)
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Tablets**: Suporte completo com interface adaptada

## 🤝 Contribuindo

Este é um projeto educacional parte do desafio 100 Days of Code. Contribuições são bem-vindas!

### Como reportar bugs ou sugerir melhorias:
- Abra uma [issue](https://github.com/dwildt/sudoku/issues) no GitHub

## 📄 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

## 👨‍💻 Desenvolvido

Feito com [Claude Code](https://claude.ai/code)

## 🔗 Links

- [Código Fonte](https://github.com/dwildt/sudoku)
- [GitHub Sponsors](https://github.com/sponsors/dwildt)