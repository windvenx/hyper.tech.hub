/**
 * hyper.tech.hub — приём заявок с сайта в Google Таблицу.
 *
 * 1. Откройте таблицу → Расширения → Apps Script, вставьте этот код.
 * 2. Замените SECRET на свою случайную строку (та же, что в GOOGLE_SCRIPT_SECRET на Vercel).
 * 3. Развернуть → Новое развертывание → Веб-приложение:
 *      «Выполнять как» — Я, «У кого есть доступ» — Все.
 * 4. Скопируйте URL веб-приложения (заканчивается на /exec) в GOOGLE_SCRIPT_URL.
 */

const SECRET = "hyper_kib6ksj2j4WSvDs1U36lMgbTZq7n";
const SHEET_NAME = "Заявки";
const HEADERS = ["Дата", "Имя", "Телефон", "Уровень", "Язык", "Статус", "User-Agent"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // защищает от одновременной записи двух заявок в одну строку

  try {
    const data = JSON.parse(e.postData.contents);

    if (data.secret !== SECRET) {
      return json({ ok: false, error: "unauthorized" });
    }

    const sheet = getSheet();
    sheet.appendRow([
      data.date,
      data.name,
      // апостроф, чтобы Google Sheets не превратил номер в число/формулу
      "'" + data.phone,
      data.level,
      data.lang,
      "Новая",
      data.userAgent,
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Проверка в браузере: откройте URL /exec — должно показать {"ok":true,"status":"alive"}
function doGet() {
  return json({ ok: true, status: "alive" });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#E50914").setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
