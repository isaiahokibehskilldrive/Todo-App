// app/layout.tsx
"use client"; // Mark this as client components
import "../styles/GlobalStyles";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
