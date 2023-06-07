# React Atomic Design

React and Prismic CMS.

[Demo](https://adrienloup.github.io/react-atomic-design/)

## Requirements

* `node` : `^19.2.0 || >=19`
* `npm` : `^8.19.3`

## Installation

Install the correct version of Node and the npm packages required for the project.

```bash
nvm use
npm i
```

## Development

Starts a local web server with hot module replacement for development.

```bash
npm run dev
```

## Production

Builds the project, and outputs to the folder `./dist`.

```bash
npm run build
```

Start a local web server that serves the built solution from `./dist` for previewing.

```bash
npm run preview
```

## Code Quality Check

Start using lint in project and fix all auto-fixable Problems.

```bash
npm run lint
npm run lint:fix
```

## Features

- [Vite](https://vitejs.dev/)
  - [Sass](https://sass-lang.com/)
- [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [ReactRouter](https://reactrouter.com/en/main/)
- [ESLint](https://eslint.org/)
  - [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)
  - [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) [(WCAG 2.1)](https://www.w3.org/WAI/WCAG21/Understanding/)
- [Prismic](https://prismic.io/)
