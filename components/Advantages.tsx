"use client";

import { Briefcase, GraduationCap, Wrench, type LucideIcon } from "lucide-react";
import { t } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import Poster from "./Poster";

const ICONS: LucideIcon[] = [Wrench, GraduationCap, Briefcase];

export default function Advantages() {
  return (
    <section id="advantages" className="relative overflow-hidden py-20 sm:py-28">
      <div className="bg-grid absolute inset-0 -z-10 opacity-60" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="lg:sticky lg:top-24">
            <SectionHeading tag={t.advantages.tag} title={t.advantages.title} />
            <Poster variant="solder" className="mt-10 hidden max-w-xs lg:block" />
          </div>

        <div className="grid gap-5">
          {t.advantages.items.map((item, i) => {
            const Icon = ICONS[i] ?? Wrench;
            return (
              <article
                key={i}
                className="clip-corner relative flex gap-5 border border-red-600/30 bg-gradient-to-br from-steel to-ink p-7 transition hover:border-red-600/70"
              >
                <div className="shrink-0">
                  <div className="grid h-14 w-14 place-items-center bg-hyper text-white shadow-[0_0_30px_-6px_rgb(229_9_20/0.8)]">
                    <Icon className="h-7 w-7" strokeWidth={1.75} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white sm:text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400 sm:text-base">{item.desc}</p>
                </div>
                <span className="absolute bottom-3 right-5 font-mono text-[10px] tracking-widest text-neutral-700">
                  0x{(i + 1).toString(16).padStart(2, "0").toUpperCase()}
                </span>
              </article>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
}
