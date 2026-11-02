# HYPER — лендинг курсов ремонта ПК (hyper.tech.hub)

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Lucide React · KG/RU · заявки → Google Таблица

## Структура

```
app/
  layout.tsx              шрифты (с кыргызскими ң ө ү), метаданные, I18nProvider
  page.tsx                сборка секций
  globals.css             цвета HYPER, сетка, «лучи», анимации
  api/register/route.ts   приём заявки → Google Apps Script
components/               Header, LangSwitch, Hero, Modules, Advantages, RegisterForm, Footer
lib/
  dictionaries.ts         ВСЕ тексты на KG и RU (редактируйте здесь)
  i18n.tsx                контекст языка (по умолчанию KG, выбор запоминается)
  validation.ts           общая валидация формы (клиент + сервер)
  site.ts                 телефон, WhatsApp, e-mail, соцсети
google-apps-script/Code.gs  скрипт для Google Таблицы
```

## 1. Локальный запуск

Нужен Node.js 18.18+ (лучше 20 или 22).

```bash
npm install
cp .env.example .env.local   # на Windows: copy .env.example .env.local
npm run dev
```

Откройте http://localhost:3000.

## 2. Подключение Google Таблицы

1. Создайте новую таблицу на https://sheets.google.com (например, «HYPER — заявки»).
2. Меню **Расширения → Apps Script**. Удалите шаблонный код и вставьте содержимое `google-apps-script/Code.gs`.
3. В строке `const SECRET = "..."` впишите длинную случайную строку, например `hyper-7f3k9q2xLm`. Сохраните (💾).
4. **Развернуть → Новое развертывание** → тип (⚙) **Веб-приложение**:
   - Выполнять как: **Я**
   - У кого есть доступ: **Все**
5. Нажмите «Развернуть» и разрешите доступ к своему аккаунту (Google предупредит о «непроверенном приложении»: **Дополнительно → Перейти к проекту**). Это ваш собственный скрипт.
6. Скопируйте **URL веб-приложения** (оканчивается на `/exec`).
7. Вставьте в `.env.local`:
   ```
   GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec
   GOOGLE_SCRIPT_SECRET=hyper-7f3k9q2xLm
   ```
8. Проверка: откройте URL `/exec` в браузере — должно отобразиться `{"ok":true,"status":"alive"}`. Отправьте тестовую заявку с сайта: появится лист **«Заявки»** с колонками «Дата, Имя, Телефон, Уровень, Язык, Статус, User-Agent».

> Если вы меняете код скрипта, нужно **Развернуть → Управление развертываниями → ✏ → Версия: новая**, иначе продолжит работать старая версия. URL при этом не меняется.

**Выгрузка в Excel:** в таблице **Файл → Скачать → Microsoft Excel (.xlsx)**.

## 3. Деплой на Vercel

1. Загрузите проект на GitHub (новый репозиторий → `git init`, `git add .`, `git commit -m "init"`, `git push`).
2. Зайдите на https://vercel.com → **Add New → Project** → выберите репозиторий. Framework определится автоматически (Next.js).
3. В **Environment Variables** добавьте `GOOGLE_SCRIPT_URL` и `GOOGLE_SCRIPT_SECRET` (те же значения, что в `.env.local`).
4. Нажмите **Deploy**. Через 1–2 минуты сайт будет доступен по адресу `*.vercel.app`.
5. Свой домен: **Project → Settings → Domains**.

Если заявки не доходят: **Vercel → Project → Logs**, ищите строки `[register]` — там будет причина (неверный URL, секрет, доступ к веб-приложению не «Все»).

## 4. Что поменять под себя

- **Тексты** (оба языка) — `lib/dictionaries.ts`. Тип `Dict` не даст забыть перевод: если добавить ключ в KG и не добавить в RU, TypeScript покажет ошибку.
- **Цифры в Hero** (80% практики, 6 модулей, 2 месяца), адрес, график, сертификат/стажировка — это шаблонные данные, замените на реальные.
- **Контакты и соцсети** — `lib/site.ts`.
- **Логотип-картинка** — положите файл в `public/logo.png` и в `components/Logo.tsx` замените текст на
  `<Image src="/logo.png" alt="HYPER" width={120} height={120} />` (импорт `import Image from "next/image"`).
- **Цвета** — `app/globals.css`, блок `@theme` (`--color-hyper`, `--color-hyper-bright`).
