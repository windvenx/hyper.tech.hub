"use client";

import { useI18n } from "@/lib/i18n";
import type { Lang } from "@/lib/dictionaries";

const OPTIONS: { value: Lang; label: string; title: string }[] = [
  { value: "kg", label: "KG", title: "Кыргызча" },
  { value: "ru", label: "RU", title: "Русский" },
];

export default function LangSwitch() {
  const { lang, setLang } = useI18n();

  return (
    <div
      role="group"
      aria-label="Language / Тил / Язык"
      className="relative flex items-center border border-red-600/40 bg-black/60 p-0.5 font-mono text-xs"
    >
      {OPTIONS.map((opt) => {
        const active = opt.value === lang;
        return (
          <button
            key={opt.value}
            type="button"
            title={opt.title}
            aria-pressed={active}
            onClick={() => setLang(opt.value)}
            className={`relative px-2.5 py-1.5 font-bold tracking-widest transition-colors ${
              active ? "bg-hyper text-white shadow-[0_0_14px_-2px_rgb(229_9_20/0.8)]" : "text-neutral-400 hover:text-white"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
