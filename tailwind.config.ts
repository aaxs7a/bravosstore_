/*
  ARQUIVO: tailwind.config.ts
  Função: configuração do Tailwind CSS.
  Define onde o Tailwind deve procurar classes usadas no projeto.
*/

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;