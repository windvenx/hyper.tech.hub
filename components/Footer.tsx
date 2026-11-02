"use client";

import { Clock, Instagram, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";
import Logo from "./Logo";

export default function Footer() {
  const { t } = useI18n();

  const socials = [
    { href: site.instagram, label: "Instagram", Icon: Instagram },
    { href: site.telegram, label: "Telegram", Icon: Send },
    { href: `https://wa.me/${site.whatsapp}`, label: "WhatsApp", Icon: MessageCircle },
  ];

  return (
    <footer id="contacts" className="border-t border-red-600/30 bg-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-neutral-400">{t.footer.tagline}</p>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-hyper-bright">{t.footer.contacts}</h3>
          <ul className="mt-5 space-y-3 text-sm text-neutral-300">
            <li>
              <a href={`tel:+${site.whatsapp}`} className="flex items-center gap-3 hover:text-white">
                <Phone className="h-4 w-4 text-hyper-bright" /> {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-white">
                <Mail className="h-4 w-4 text-hyper-bright" /> {site.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-hyper-bright" /> {t.footer.address}
            </li>
            <li className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-hyper-bright" /> {t.footer.hours}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-hyper-bright">{t.footer.socials}</h3>
          <div className="mt-5 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center border border-red-600/30 text-neutral-300 transition hover:border-hyper hover:bg-hyper hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 font-mono text-[11px] uppercase tracking-widest text-neutral-600 sm:flex-row sm:px-6 lg:px-8">
          <span>
            © {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </span>
          <span>компьютердик сервис борбору</span>
        </div>
      </div>
    </footer>
  );
}
