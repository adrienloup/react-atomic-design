module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    'plugin:jsx-a11y/recommended'
  ],
  "overrides": [
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint",
    "jsx-a11y"
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  // https://eslint.org/docs/rules/
  "rules": {
    "react/react-in-jsx-scope": 0,
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "jsx-a11y/aria-role": 2,
    "no-unexpected-multiline": "off"
  }
}
