import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { I18nProvider } from "@/lib/i18n";
import "./globals.css";

// cyrillic-ext нужен для кыргызских букв ң, ө, ү
const inter = Inter({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  style: ["normal", "italic"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HYPER — Компьютер оңдоо курстары | Курсы ремонта ПК",
  description:
    "HYPER: компьютер оңдоо жана тейлөө боюнча практикалык курстар. Практические курсы по ремонту и обслуживанию ПК в Бишкеке.",
  openGraph: {
    title: "HYPER — Курсы ремонта ПК",
    description: "Диагностика, пайка, сборка ПК, софт и компонентный ремонт.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ky" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
