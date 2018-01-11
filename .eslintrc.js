module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules": {
        "indent": ["error", 2, { "SwitchCase": 1 }],
        "semi": ["error", "never"],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/prefer-stateless-function": [0, { "ignorePureComponents": true }],
        "jsx-quotes": ["error", "prefer-single"],
    }
};
