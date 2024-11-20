// styles/GlobalStyles.ts
"use client"; // Mark this as a client component
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
  font-family: Arial, sans-serif;
  background: linear-gradient(to right, #4682b4, #1e3a5f);
  height: 100vh;
  margin: 0;
  }
`;
