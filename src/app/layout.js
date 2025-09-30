import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Further Academy",
  description: "Landing base con Next.js (JS) + Tailwind",
  icons: {
    icon: "https://raw.githubusercontent.com/fedeval98/FurtherLibTest/refs/heads/main/favicon%20(1).ico",
  },
};


export default function RootLayout({ children }) {
return (
<html lang="es">
<body className="min-h-dvh bg-white text-gray-900 antialiased">
{children}
</body>
</html>
);
}