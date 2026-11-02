"use client";

import { useState, type FormEvent } from "react";
import { AlertTriangle, CheckCircle2, ChevronDown, Loader2, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";
import { LEVELS, validateRegistration, type RegistrationInput } from "@/lib/validation";
import SectionHeading from "./SectionHeading";
import Poster from "./Poster";

type Status = "idle" | "sending" | "success" | "error";

const EMPTY: RegistrationInput = { name: "", phone: "", level: "" };

export default function RegisterForm() {
  const { t, lang } = useI18n();
  const [values, setValues] = useState<RegistrationInput>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<keyof RegistrationInput, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  // Honeypot: скрытое поле, которое заполняют только боты
  const [company, setCompany] = useState("");

  // Ошибки хранятся кодами, поэтому мгновенно переводятся при смене языка
  const errors = validateRegistration(values);
  const showError = (field: keyof RegistrationInput) =>
    touched[field] && errors[field] ? t.form.errors[errors[field]!] : null;

  const update = (field: keyof RegistrationInput, value: string) =>
    setValues((v) => ({ ...v, [field]: value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched({ name: true, phone: true, level: true });
    if (Object.keys(errors).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, lang, company }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setValues(EMPTY);
      setTouched({});
    } catch {
      setStatus("error");
    }
  }

  const inputBase =
    "w-full border bg-black/50 px-4 py-3.5 text-white placeholder:text-neutral-600 outline-none transition focus:bg-black/80 focus:ring-2 focus:ring-red-600/40";
  const borderFor = (field: keyof RegistrationInput) =>
    showError(field) ? "border-hyper-bright" : "border-red-600/30 focus:border-red-600";

  return (
    <section id="register" className="relative overflow-hidden border-t border-red-600/20 bg-graphite py-20 sm:py-28">
      <div className="bg-rays absolute inset-0 opacity-70" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="lg:pt-6">
          <SectionHeading tag={t.form.tag} title={t.form.title} subtitle={t.form.subtitle} />
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 font-mono text-sm text-neutral-300 transition hover:text-white"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgb(52_211_153)]" />
            WhatsApp: {site.phone}
          </a>
          <div className="mt-10 hidden max-w-sm grid-cols-2 gap-4 lg:grid">
            <Poster variant="chip" />
            <Poster variant="meter" />
          </div>
        </div>

        <div className="clip-corner relative border border-red-600/40 bg-ink/90 p-6 shadow-[0_0_80px_-30px_rgb(229_9_20/0.7)] backdrop-blur sm:p-10">
          <div className="mb-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
            <span>form://enroll</span>
            <span className="text-hyper-bright">● secure</span>
          </div>

          {status === "success" ? (
            <div className="flex flex-col items-center py-10 text-center" role="status">
              <CheckCircle2 className="h-16 w-16 text-emerald-400" strokeWidth={1.5} />
              <h3 className="mt-5 text-2xl font-black uppercase italic text-white">{t.form.successTitle}</h3>
              <p className="mt-3 text-neutral-400">{t.form.successText}</p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-8 font-mono text-xs uppercase tracking-widest text-hyper-bright underline-offset-4 hover:underline"
              >
                {t.form.again}
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-6">
              {/* Honeypot */}
              <input
                type="text"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden
              />

              <Field id="name" label={t.form.name} error={showError("name")}>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder={t.form.namePh}
                  value={values.name}
                  onChange={(e) => update("name", e.target.value)}
                  onBlur={() => setTouched((s) => ({ ...s, name: true }))}
                  aria-invalid={!!showError("name")}
                  aria-describedby="name-error"
                  className={`${inputBase} ${borderFor("name")}`}
                />
              </Field>

              <Field id="phone" label={t.form.phone} error={showError("phone")}>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder={t.form.phonePh}
                  value={values.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  onBlur={() => setTouched((s) => ({ ...s, phone: true }))}
                  aria-invalid={!!showError("phone")}
                  aria-describedby="phone-error"
                  className={`${inputBase} ${borderFor("phone")} font-mono`}
                />
              </Field>

              <Field id="level" label={t.form.level} error={showError("level")}>
                <div className="relative">
                  <select
                    id="level"
                    value={values.level}
                    onChange={(e) => {
                      update("level", e.target.value);
                      setTouched((s) => ({ ...s, level: true }));
                    }}
                    onBlur={() => setTouched((s) => ({ ...s, level: true }))}
                    aria-invalid={!!showError("level")}
                    aria-describedby="level-error"
                    className={`${inputBase} ${borderFor("level")} appearance-none pr-12 ${
                      values.level ? "" : "text-neutral-500"
                    }`}
                  >
                    <option value="" disabled>
                      {t.form.levelPh}
                    </option>
                    {LEVELS.map((lvl) => (
                      <option key={lvl} value={lvl} className="bg-graphite text-white">
                        {t.form.levels[lvl]}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-hyper-bright" />
                </div>
              </Field>

              {status === "error" && (
                <p className="flex items-start gap-2 border border-hyper-bright/50 bg-red-600/10 p-3 text-sm text-red-200" role="alert">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  {t.form.error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="clip-corner glow-red flex w-full items-center justify-center gap-2 bg-hyper py-4 text-base font-bold uppercase tracking-wide text-white transition hover:bg-hyper-bright disabled:cursor-wait disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {t.form.sending}
                  </>
                ) : (
                  <>
                    {t.form.submit}
                    <Send className="h-5 w-5" />
                  </>
                )}
              </button>

              <p className="text-center text-xs leading-relaxed text-neutral-500">{t.form.privacy}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error: string | null;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-neutral-400">
        {label} <span className="text-hyper-bright">*</span>
      </label>
      {children}
      <p id={`${id}-error`} className="mt-1.5 min-h-[1.25rem] text-sm text-hyper-bright" aria-live="polite">
        {error}
      </p>
    </div>
  );
}
