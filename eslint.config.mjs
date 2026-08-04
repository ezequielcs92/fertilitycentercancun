import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Scripts de un solo uso para la migración desde WordPress: son Node/CommonJS
    // y no forman parte del bundle de la aplicación.
    "scripts/**",
    "download_all_images.js",
    "test-supa.ts",
  ]),
  {
    rules: {
      // Permite marcar como intencionalmente no usados los argumentos y
      // desestructuraciones con prefijo `_` (p. ej. descartar campos derivados).
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
]);

export default eslintConfig;
