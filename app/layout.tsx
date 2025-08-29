import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ayushman Praharaj - Full Stack Developer",
  description: "Portfolio of Ayushman Praharaj, a passionate Full Stack Developer specializing in MERN Stack, Python, and modern web technologies.",
  keywords: ["Full Stack Developer", "MERN Stack", "React", "Node.js", "Python", "Web Development"],
  authors: [{ name: "Ayushman Praharaj" }],
  creator: "Ayushman Praharaj",
  icons: {
    icon: "/ayushman.png",
    shortcut: "/ayushman.png",
    apple: "/ayushman.png",
  },
  openGraph: {
    title: "Ayushman Praharaj - Full Stack Developer",
    description: "Portfolio of Ayushman Praharaj, a passionate Full Stack Developer specializing in MERN Stack, Python, and modern web technologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
