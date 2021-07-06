module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': 0,
    'no-unused-vars': 0,
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-color-literals": 2,
    "react-native/no-raw-text": 2,
  },
  parserOptions: {
    "ecmaFeatures": {
      "jsx": true
    }
  },
};
