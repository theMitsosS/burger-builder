module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
	  'max-len': ["error", { "code": 120 }],
	  'no-mixed-spaces-and-tabs': [2, "smart-tabs"],
	  // "indent": [2, "tab"],
	  "no-tabs": 0,
	  "require-jsdoc" : 0
  },
};
