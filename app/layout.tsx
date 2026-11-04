import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HYPER — практические занятия по ремонту ПК",
  description:
    "Практические занятия по ремонту ПК в Бишкеке с дальнейшим трудоустройством: диагностика, пайка, сборка ПК, софт. Стоимость 30 000 сом.",
  openGraph: {
    title: "HYPER — практические занятия по ремонту ПК",
    description: "Диагностика, пайка, сборка ПК и софт. С дальнейшим трудоустройством.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
