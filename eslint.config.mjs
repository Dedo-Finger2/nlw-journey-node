import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    files: [
      "**/*.{js,mjs,cjs,ts}"
    ]
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      }
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-console": "warn",
      "no-debugger": "error",
      "no-alert": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-param-reassign": ["error", { props: true }],
      "no-proto": "error",
      "no-return-assign": ["error", "except-parens"],
      "no-script-url": "error",
      "no-self-assign": "error",
      "no-self-compare": "error",
      "no-sequences": "error",
      "no-throw-literal": "error",
      "no-unmodified-loop-condition": "error",
      "no-unused-expressions": ["error", { allowShortCircuit: true }],
      "no-useless-call": "error",
      "no-useless-concat": "error",
      "no-with": "error",
      radix: "error",
      "require-await": "error",
      yoda: ["error", "never"],
      "block-scoped-var": "error",
      complexity: ["warn", 10],
      "consistent-return": "error",
      "default-case": "error",
      "dot-notation": ["error", { allowKeywords: true }],
      "guard-for-in": "error",
      "no-caller": "error",
      "no-else-return": ["error", { allowElseIf: false }],
      "no-labels": ["error", { allowLoop: false, allowSwitch: false }],
      "no-lone-blocks": "error",
      "no-multi-spaces": "error",
      "no-multi-str": "error",
      "no-redeclare": "error",
      "no-return-await": "error",
      "no-unneeded-ternary": ["error", { defaultAssignment: false }],
      "no-use-before-define": ["error", { functions: false, classes: true, variables: true }],
      "no-useless-return": "error",
      "require-atomic-updates": "error",
      "no-var": "error",
      "prefer-const": ["error", { destructuring: "all" }],
      "prefer-rest-params": "error",
      "prefer-spread": "error",
      strict: ["error", "global"],
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "comma-dangle": ["error", "never"],
      indent: ["error", 2, { SwitchCase: 1 }],
      "brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "space-before-blocks": ["error", "always"],
      "keyword-spacing": ["error", { before: true, after: true }],
      "space-infix-ops": "error",
      "eol-last": ["error", "always"],
      "no-trailing-spaces": "error",
      "newline-before-return": "error"
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
];
