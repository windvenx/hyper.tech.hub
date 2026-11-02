"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import Logo from "./Logo";
import LangSwitch from "./LangSwitch";

export default function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#modules", label: t.nav.modules },
    { href: "#advantages", label: t.nav.advantages },
    { href: "#register", label: t.nav.register },
    { href: "#contacts", label: t.nav.contacts },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        scrolled || open ? "border-red-600/30 bg-ink/85 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-[0.18em] text-neutral-400 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitch />
          <a
            href="#register"
            className="clip-corner hidden items-center gap-2 bg-hyper px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-hyper-bright sm:inline-flex"
          >
            {t.nav.cta}
            <ArrowRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center border border-red-600/30 text-neutral-200 lg:hidden"
            aria-expanded={open}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-red-600/20 px-4 pb-6 pt-2 lg:hidden" aria-label="Mobile">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/5 py-3 font-mono text-sm uppercase tracking-[0.18em] text-neutral-300"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#register"
            onClick={() => setOpen(false)}
            className="clip-corner mt-5 flex items-center justify-center gap-2 bg-hyper py-3 font-bold uppercase tracking-wide text-white"
          >
            {t.nav.cta}
            <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
      )}
    </header>
  );
}
