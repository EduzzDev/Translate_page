# Translate Project 🌍

Um aplicativo web moderno de tradução com detecção automática de idiomas, síntese de fala e interface intuitiva.

## ✨ Funcionalidades

- **Tradução em tempo real** entre múltiplos idiomas
- **Detecção automática de idioma** do texto de entrada
- **Síntese de fala** (Text-to-Speech) para o idioma selecionado
- **Copiar para área de transferência** com um clique
- **Interface responsiva** e moderna com Tailwind CSS
- **Ícones intuitivos** com Lucide React

## 🛠️ Tecnologias

- **React 19** - UI library
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Styling
- **TinyLD** - Detecção de idioma
- **Lucide React** - Ícones
- **Web Speech API** - Síntese de fala

## 📋 Pré-requisitos

- Node.js 16+
- npm ou yarn

## 🚀 Como Usar

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

O app estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

### Preview da Build

```bash
npm run preview
```

### Linter

```bash
npm run lint
```

## 📖 Como Funciona

1. Digite ou cole o texto que deseja traduzir
2. O idioma será detectado automaticamente
3. Selecione o idioma de destino
4. A tradução aparece após click no botão de Translate
5. Use os botões para:
   - 🔊 **Ouvir** a pronúncia
   - 📋 **Copiar** o texto traduzido
   - 🔄 **Inverter** idiomas

## 📁 Estrutura do Projeto
```
src/
├── components/          # Componentes React reutilizáveis
│   └── Button.jsx
├── assets/             # Imagens e ícones
├── App.jsx             # Componente principal
├── App.css             # Estilos do app
├── main.jsx            # Entry point
└── index.css           # Estilos globais
```

## 🌐 Idiomas Suportados

- 🇺🇸 English
- 🇫🇷 French
- 🇪🇸 Spanish

## 📝 Notas de Desenvolvimento

- Usa ESLint para manter a qualidade do código
- Hot Module Replacement (HMR) ativado em desenvolvimento
- TypeScript pode ser adicionado seguindo o [guia oficial](https://react-vite-ts-guide.com)

## 🤝 Contribuindo

Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Eduardo

---
**Dica**: A síntese de fala depende do navegador - funciona melhor em Chrome, Edge e Safari.
