"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_LANG, dictionaries, type Dict, type Lang } from "./dictionaries";

const STORAGE_KEY = "hyper-lang";

type I18nContextValue = {
  lang: Lang;
  t: Dict;
  setLang: (lang: Lang) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  // Восстанавливаем выбор пользователя после монтирования (по умолчанию — KG)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "kg" || saved === "ru") setLangState(saved);
    } catch {
      // localStorage может быть недоступен (приватный режим) — остаёмся на KG
    }
  }, []);

  useEffect(() => {
    // ISO-код кыргызского языка — "ky"
    document.documentElement.lang = lang === "kg" ? "ky" : "ru";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  return (
    <I18nContext.Provider value={{ lang, t: dictionaries[lang], setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
