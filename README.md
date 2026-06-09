# 🌍 Translate Page

Um aplicativo web moderno e intuitivo para tradução instantânea com detecção automática de idiomas, síntese de fala integrada e interface responsiva.

---

<div align="center">

[![Issues](https://img.shields.io/github/issues/usuario/translate-page?color=0891b2)](https://github.com)
[![Last commit](https://img.shields.io/github/last-commit/usuario/translate-page?color=0891b2)](https://github.com)
[![License](https://img.shields.io/badge/license-ISC-green)](LICENSE)
[![Status](https://img.shields.io/badge/status-Em%20Desenvolvimento-blue)](https://github.com)

</div>

<div align="center">

![React](https://img.shields.io/badge/React-19-61dafb?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5+-646cff?style=flat&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38b2ac?style=flat&logo=tailwind-css)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-f7df1e?style=flat&logo=javascript)

</div>

---

## ✨ Funcionalidades

- ⚡ **Tradução em tempo real** entre múltiplos idiomas
- 🎯 **Detecção automática de idioma** inteligente do texto de entrada
- 🔊 **Síntese de fala** (Text-to-Speech) com pronúncia natural
- 📋 **Copiar para área de transferência** com um clique
- 📱 **Interface totalmente responsiva** e moderna
- 🎨 **Design intuitivo** com ícones visuais Lucide React
- 🔄 **Inversor de idiomas** para troca rápida

## 🛠️ Tecnologias

| Tecnologia         | Versão | Propósito               |
| ------------------ | ------ | ----------------------- |
| **React**          | 19     | Framework UI            |
| **Vite**           | 5+     | Build tool e dev server |
| **Tailwind CSS**   | Latest | Styling responsivo      |
| **TinyLD**         | Latest | Detecção de idioma      |
| **Lucide React**   | Latest | Ícones SVG              |
| **Web Speech API** | Native | Síntese de fala         |

## 📋 Pré-requisitos

- **Node.js** 16 ou superior
- **npm** ou **yarn** como gerenciador de pacotes

## 🚀 Guia de Inicio Rápido

### 1️⃣ Instalação de Dependências

```bash
npm install
```

### 2️⃣ Executar em Desenvolvimento

```bash
npm run dev
```

> 🌐 O app estará disponível em [`http://localhost:5173`](http://localhost:5173)

### 3️⃣ Build para Produção

```bash
npm run build
```

### 4️⃣ Preview da Build

```bash
npm run preview
```

### 5️⃣ Verificar Código com Linter

```bash
npm run lint
```

## 📖 Como Usar

1. 📝 Digite ou cole o texto que deseja traduzir
2. 🎯 O idioma será **detectado automaticamente**
3. 🌐 Selecione o **idioma de destino**
4. ✅ Clique em **Translate** para ver a tradução
5. Use os botões de ação:
   - 🔊 **Ouvir** a pronúncia em voz alta
   - 📋 **Copiar** o texto traduzido
   - 🔄 **Inverter** os idiomas de origem e destino

## 📁 Estrutura do Projeto

```
Translate_page/
├── src/
│   ├── components/
│   │   └── Button.jsx          # Componente reutilizável
│   ├── assets/                 # Imagens e recursos
│   ├── App.jsx                 # Componente principal
│   ├── App.css                 # Estilos do aplicativo
│   ├── main.jsx                # Ponto de entrada
│   └── index.css               # Estilos globais
├── public/                     # Arquivos públicos estáticos
├── design/                     # Arquivos de design e prototipagem
├── vite.config.js              # Configuração do Vite
├── eslint.config.js            # Configuração do ESLint
├── package.json                # Dependências do projeto
└── README.md                   # Você está aqui!
```

## 🌐 Idiomas Suportados

| Bandeira | Idioma    | Código |
| -------- | --------- | ------ |
| 🇺🇸       | English   | `en`   |
| 🇫🇷       | Français  | `fr`   |
| 🇪🇸       | Español   | `es`   |
| 🇵🇹       | Português | `pt`   |
| 🇩🇪       | Deutsch   | `de`   |

## 💻 Desenvolvimento

### Ferramentas Utilizadas

- **ESLint** - Manter qualidade e consistência do código
- **Vite HMR** - Hot Module Replacement para desenvolvimento ágil
- **Modern JavaScript** - ES6+ com suporte nativo

### Extensões Recomendadas (VS Code)

- [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## 📝 Notas Importantes

- ✅ Hot Module Replacement (HMR) está ativado em desenvolvimento
- 🔒 TypeScript pode ser adicionado seguindo o [guia oficial do React + Vite](https://vitejs.dev/guide/)
- 🎨 Tailwind CSS pré-configurado para estilização rápida
- 🚀 Otimizado para performance em produção

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. 🍴 Faça um fork do projeto
2. 📦 Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. 📝 Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push para a branch (`git push origin feature/AmazingFeature`)
5. 🔄 Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença **ISC** - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Eduardo** - [GitHub](https://github.com)

---

<div align="center">

### 💡 Dica Importante

A síntese de fala depende do navegador - funciona melhor em **Chrome**, **Edge** e **Safari**.

**Desenvolvido com ❤️ usando React + Vite**

</div>
