import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";

import StyledComponentsRegistry from "../../lib/AntdRegistry";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
