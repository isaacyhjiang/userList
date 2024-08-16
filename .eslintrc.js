module.exports = {
  parser: "@typescript-eslint/parser", // 如果使用 TypeScript
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended", // 如果使用 TypeScript
    "prettier",
    "plugin:prettier/recommended",
  ],
  plugins: [
    "react",
    "@typescript-eslint", // 如果使用 TypeScript
    "prettier",
  ],
  rules: {
    "prettier/prettier": "error",
    // 在这里添加其他规则
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
