# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
# SoftSell - Unlock the Future with Seamless Software License Selling

SoftSell is an innovative platform designed to facilitate the seamless and secure selling of unused software licenses. The platform leverages AI and real-time chat functionality to guide users in evaluating their software licenses and connecting with potential buyers. Built with modern web technologies, SoftSell offers a clean and responsive user interface, ensuring an enjoyable and smooth experience across all devices.

## Features

- **AI-Powered Chat Widget:** A built-in AI chat assistant that helps users with license valuations and other queries.
- **Dark/Light Mode Toggle:** A flexible UI that adapts to user preferences with a dark mode and light mode toggle.
- **Floating Icons and Animations:** Engaging floating icons with smooth animations for an interactive experience.
- **Real-Time Data Visualization:** Bar charts generated dynamically with random data to visualize key metrics.
- **Responsive Design:** A fully responsive layout optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend:** React, Framer Motion, TailwindCSS
- **Backend:** (If any backend is used, mention here. E.g., Node.js, Express)
- **Database:** (If applicable, specify database like MongoDB, MySQL, etc.)
- **Icons & UI Components:** Lucide React, Custom Button, Input, Select components
- **Animations:** Framer Motion for smooth transitions and interactive effects

## Installation

To run the project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/softsell.git
