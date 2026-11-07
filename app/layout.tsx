import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const heading = Archivo_Black({
  variable: "--font-heading",
  weight: "400",
  subsets: ["latin"],
});

const body = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const label = Space_Mono({
  variable: "--font-label",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Epic Atlas",
  description:
    "Follow the Odyssey, the Iliad, the Ramayana and the Mahabharata across an interactive map, one episode at a time.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} ${label.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
