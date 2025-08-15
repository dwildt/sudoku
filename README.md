# Sudoku Game

Um jogo de Sudoku moderno e responsivo desenvolvido em JavaScript Vanilla com suporte a múltiplos idiomas e temas.

## 🎮 Jogar Online

Acesse o jogo em: [https://dwildt.github.io/sudoku](https://dwildt.github.io/sudoku)

## ✨ Características

- **Múltiplos níveis de dificuldade**: Fácil, Médio e Difícil
- **Sistema de temas**: Wildtech (laranja/marrom) e Severance (tons de azul)
- **Multilíngue**: Português, Inglês e Espanhol
- **Sistema de recordes**: Armazena os melhores tempos localmente
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

## 🧪 Executar Testes

Para executar os testes unitários:

```bash
# Instalar dependências
npm install

# Executar testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com coverage
npm run test:coverage
```

Consulte o arquivo [testing.md](testing.md) para mais detalhes sobre os testes.

## 🎯 Como Jogar

1. **Selecione a dificuldade**: Escolha entre Fácil, Médio ou Difícil
2. **Clique em uma célula**: Selecione uma célula vazia para inserir um número
3. **Digite um número**: Use as teclas 1-9 para inserir números, ou Delete/Backspace para apagar
4. **Use as funcionalidades**:
   - **Verificar**: Destaca erros visíveis no tabuleiro
   - **Dica**: Revela o número correto em uma célula aleatória
   - **Reiniciar**: Volta ao estado inicial do puzzle
   - **Novo Jogo**: Gera um novo puzzle

## 📋 Regras do Sudoku

- Preencha a grade 9x9 com números de 1 a 9
- Cada linha deve conter todos os números de 1 a 9
- Cada coluna deve conter todos os números de 1 a 9
- Cada região 3x3 deve conter todos os números de 1 a 9
- Nenhum número pode se repetir na mesma linha, coluna ou região

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