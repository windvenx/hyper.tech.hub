"use client";

import { Activity, Cpu, Flame, HandCoins, MonitorCog, type LucideIcon } from "lucide-react";
import { t } from "@/lib/content";
import SectionHeading from "./SectionHeading";

// Порядок иконок соответствует порядку modules.items в словаре
const ICONS: LucideIcon[] = [Activity, Flame, Cpu, MonitorCog, HandCoins];

export default function Modules() {
  return (
    <section id="modules" className="relative border-t border-red-600/20 bg-graphite py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading tag={t.modules.tag} title={t.modules.title} subtitle={t.modules.subtitle} />

        <div className="mt-14 grid gap-px border border-red-600/30 bg-red-600/30 sm:grid-cols-2 lg:grid-cols-6">
          {t.modules.items.map((item, i) => {
            const Icon = ICONS[i] ?? Cpu;
            return (
              <article
                key={i}
                className={`group relative overflow-hidden bg-graphite p-7 transition-colors hover:bg-[#170b0c] sm:p-8 ${
                  // 5 карточек: 3 в первом ряду, 2 широких во втором
                  i < 3 ? "lg:col-span-2" : "lg:col-span-3"
                } ${i === t.modules.items.length - 1 && i % 2 === 0 ? "sm:col-span-2" : ""}`}
              >
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-hyper-bright transition-transform duration-500 group-hover:scale-x-100" />
                <div className="flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center border border-red-600/40 bg-red-600/10 text-hyper-bright transition group-hover:bg-hyper group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <span className="font-mono text-xs tracking-widest text-neutral-600 group-hover:text-red-400">
                    MOD_{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">{item.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
