"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";

// Лог диагностики в «мониторе» — технический текст, не переводится
const TERMINAL_LINES: { tag: string; text: string; value: string; tone: "ok" | "warn" | "fix" }[] = [
  { tag: "OK", text: "PSU 12V rail", value: "12.04V", tone: "ok" },
  { tag: "OK", text: "VRM CPU vcore", value: "1.21V", tone: "ok" },
  { tag: "!!", text: "PCH short to GND", value: "found", tone: "warn" },
  { tag: ">>", text: "reflow U2301", value: "fixed", tone: "fix" },
  { tag: "OK", text: "RAM dual-channel", value: "32GB", tone: "ok" },
  { tag: "OK", text: "POST code", value: "00", tone: "ok" },
];

const toneClass = {
  ok: "text-emerald-400",
  warn: "text-hyper-bright",
  fix: "text-amber-300",
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

        {/* Монитор с логом диагностики */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden>
          <div className="absolute -inset-3 border border-red-600/20" />
          <div className="relative overflow-hidden border border-red-600/50 bg-graphite shadow-[0_0_80px_-20px_rgb(229_9_20/0.5)]">
            <div className="flex items-center justify-between border-b border-red-600/30 bg-black/60 px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-hyper" />
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-600" />
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-600" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">hyper://diag</span>
            </div>

            <div className="relative p-5 font-mono text-[13px] leading-7 sm:p-6">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-scan bg-gradient-to-b from-transparent via-red-500/5 to-transparent" />
              <p className="text-neutral-500">
                <span className="text-hyper-bright">$</span> hyper --diagnose motherboard
              </p>
              {TERMINAL_LINES.map((line, i) => (
                <p
                  key={line.text}
                  className="flex animate-line-in gap-3"
                  style={{ animationDelay: `${0.4 + i * 0.35}s` }}
                >
                  <span className={toneClass[line.tone]}>[{line.tag}]</span>
                  <span className="flex-1 truncate text-neutral-300">
                    {line.text} <span className="text-neutral-700">{".".repeat(24)}</span>
                  </span>
                  <span className="text-white">{line.value}</span>
                </p>
              ))}
              <p className="mt-2 animate-line-in text-emerald-400" style={{ animationDelay: "2.8s" }}>
                &gt; system ready<span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-emerald-400" />
              </p>
            </div>

            <div className="grid grid-cols-3 border-t border-red-600/30 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
              <div className="border-r border-red-600/20 px-4 py-3">
                CPU <span className="block text-sm text-white">42°C</span>
              </div>
              <div className="border-r border-red-600/20 px-4 py-3">
                GPU <span className="block text-sm text-white">38°C</span>
              </div>
              <div className="px-4 py-3">
                STATUS <span className="block text-sm text-emerald-400">PASS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
