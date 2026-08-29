import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["src/frontend/moral/resultTypeImageData.js"]
  },
  js.configs.recommended,
  {
    files: ["src/frontend/**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
      globals: {
        ...globals.browser
      }
    },
    rules: {
      "no-unused-vars": ["error", { args: "none", caughtErrors: "none" }]
    }
  }
];
