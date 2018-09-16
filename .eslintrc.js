module.exports = {
  "parser": "babel-eslint",
  "env": {
      "browser": true,
      "es6": true
  },
  "settings": {
        "ecmascript": 6,
        "jsx": true
  },
  "parserOptions": {
      "ecmaVersion": 2017,
      "ecmaFeatures": {
          "experimentalObjectRestSpread": true,
          "experimentalDecorators": true,
          "jsx": true
      },
      "sourceType": "module"
  },
  "plugins": [
      "react"
  ],
  "extends": "airbnb",
  "rules": {
    "react/jsx-filename-extension": 0,
    "function-paren-newline": 0,
    "linebreak-style": 0,
    "react/no-did-mount-set-state": 0,
    "react/prefer-stateless-function": 0,
    "react/no-multi-comp": 0,
    "react/destructuring-assignment": 0,
    "implicit-arrow-linebreak": 0,
    "jsx-a11y/anchor-is-valid": 0
  }
};