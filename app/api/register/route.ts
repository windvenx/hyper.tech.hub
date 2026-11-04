import { NextResponse } from "next/server";
import { ABOUT_MAX, normalizePhone, validateRegistration } from "@/lib/validation";

export const runtime = "nodejs";

const LEVEL_LABELS: Record<string, string> = {
  beginner: "С нуля",
  intermediate: "Знает основы",
  advanced: "Есть опыт",
};

export async function POST(req: Request) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  const secret = process.env.GOOGLE_SCRIPT_SECRET;

  if (!scriptUrl || !secret) {
    console.error("[register] GOOGLE_SCRIPT_URL или GOOGLE_SCRIPT_SECRET не заданы");
    return NextResponse.json({ ok: false, error: "server_not_configured" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Бот заполнил скрытое поле — делаем вид, что всё хорошо, но ничего не сохраняем
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const input = {
    name: String(body.name ?? "").trim().slice(0, 100),
    phone: String(body.phone ?? "").trim().slice(0, 30),
    level: String(body.level ?? ""),
    about: String(body.about ?? "").trim().slice(0, ABOUT_MAX),
  };

  const errors = validateRegistration(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const payload = {
    secret,
    date: new Date().toLocaleString("ru-RU", { timeZone: "Asia/Bishkek" }),
    name: input.name,
    phone: "+" + normalizePhone(input.phone),
    level: LEVEL_LABELS[input.level],
    about: input.about,
    userAgent: req.headers.get("user-agent")?.slice(0, 200) ?? "",
  };

  try {
    // Apps Script отвечает редиректом 302 — fetch проходит его автоматически
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
      cache: "no-store",
    });

    const text = await res.text();
    let result: { ok?: boolean; error?: string } = {};
    try {
      result = JSON.parse(text);
    } catch {
      // Если пришёл HTML — скорее всего, неверный URL или доступ к веб-приложению не «Все»
      throw new Error(`Unexpected response from Apps Script: ${text.slice(0, 200)}`);
    }

    if (!res.ok || !result.ok) {
      throw new Error(`Apps Script error: ${result.error ?? res.status}`);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[register]", err);
    return NextResponse.json({ ok: false, error: "sheet_write_failed" }, { status: 502 });
  }
}
