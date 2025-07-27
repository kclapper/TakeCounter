import js from '@eslint/js';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,jsx}"], 
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    plugins: { 
      js
    }, 
    extends: [
      "js/recommended"
    ]
  },
  { 
    files: ["**/*.js"], 
    languageOptions: { 
      sourceType: "commonjs" 
    }
  },
  globalIgnores([
    "./node_modules/"
  ])
]);
