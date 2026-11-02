"use client";

import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";

// Короткий лог диагностики — технический текст, не переводится
const TERMINAL_LINES: { tag: string; text: string; tone: "ok" | "fix" }[] = [
  { tag: "!!", text: "short to GND", tone: "fix" },
  { tag: "OK", text: "repaired", tone: "ok" },
];

const toneClass = {
  ok: "text-emerald-400",
  fix: "text-hyper-bright",
};

export default function Hero() {
  const { t } = useI18n();

  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 lg:pb-28">
      <div className="bg-grid absolute inset-0 -z-20" aria-hidden />
      <div className="bg-rays absolute inset-0 -z-10" aria-hidden />
      <div
        className="absolute -right-40 top-20 -z-10 h-[500px] w-[500px] rounded-full bg-hyper/20 blur-[140px]"
        aria-hidden
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 border border-red-600/40 bg-red-600/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-red-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-hyper-bright" />
            {t.hero.badge}
          </div>

          <h1 className="mt-6 text-4xl font-black uppercase italic leading-[0.95] tracking-tight text-white sm:text-6xl xl:text-7xl">
            {t.hero.title}
            <span className="text-glow mt-2 block text-hyper-bright">{t.hero.titleAccent}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-300 sm:text-lg">{t.hero.subtitle}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#register"
              className="clip-corner glow-red group inline-flex items-center justify-center gap-2 bg-hyper px-7 py-4 font-bold uppercase tracking-wide text-white transition hover:bg-hyper-bright"
            >
              {t.hero.cta}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#modules"
              className="inline-flex items-center justify-center gap-2 border border-white/15 px-7 py-4 font-mono text-sm uppercase tracking-widest text-neutral-200 transition hover:border-red-600/60 hover:text-white"
            >
              {t.hero.secondary}
              <ChevronDown className="h-4 w-4" />
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 divide-x divide-red-600/30 border-y border-red-600/30">
            {t.hero.stats.map((s) => (
              <div key={s.label} className="px-4 py-4 first:pl-0">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-black italic text-white sm:text-3xl">{s.value}</dd>
                <dd className="mt-1 font-mono text-[11px] uppercase tracking-widest text-neutral-500">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Логотип-постер и компактный лог диагностики */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div className="absolute -inset-3 border border-red-600/20" aria-hidden />
          <Image
            src="/logo.png"
            alt="HYPER — компьютердик сервис борбору"
            width={620}
            height={670}
            priority
            className="relative h-auto w-full bg-black shadow-[0_0_80px_-20px_rgb(229_9_20/0.5)]"
          />

          <div
            className="absolute -bottom-6 -left-4 border border-red-600/50 bg-ink/95 px-4 py-3 font-mono text-xs leading-6 shadow-xl backdrop-blur sm:-left-10"
            aria-hidden
          >
            <p className="text-neutral-500">
              <span className="text-hyper-bright">$</span> hyper --diag
            </p>
            {TERMINAL_LINES.map((line, i) => (
              <p key={line.text} className="animate-line-in" style={{ animationDelay: `${0.5 + i * 0.5}s` }}>
                <span className={toneClass[line.tone]}>[{line.tag}]</span> <span className="text-neutral-300">{line.text}</span>
                {i === TERMINAL_LINES.length - 1 && (
                  <span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 animate-blink bg-emerald-400" />
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
