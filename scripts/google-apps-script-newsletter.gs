/**
 * Google Apps Script — lidh me faqen DARA (POST nga /api/newsletter)
 *
 * 1. Krijo një Google Sheet (rreshti 1: email | subscribedAt).
 * 2. Script properties (Project settings → Script properties):
 *    - SPREADSHEET_ID = ID nga URL e sheet-it (.../d/THIS_PART/edit)
 *    - SHEET_NAME = emri i tab-it (opsionale, default "Sheet1")
 *    - WEBHOOK_SECRET = i njëjtë me GOOGLE_SHEETS_NEWSLETTER_SECRET në .env
 * 3. Deploy → Web app → Execute as: Me → Who has access: Anyone
 * 4. GOOGLE_SHEETS_NEWSLETTER_URL = URL e deployment-it
 *
 * Shënim: getActiveSpreadsheet() nuk punon nëse skripti është “standalone”;
 * prandaj përdoret openById(SPREADSHEET_ID).
 */
function doPost(e) {
  const props = PropertiesService.getScriptProperties();
  const expected = props.getProperty("WEBHOOK_SECRET");
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonOut(false, "INVALID_JSON");
  }

  if (expected && data.secret !== expected) {
    return jsonOut(false, "UNAUTHORIZED");
  }

  var email = (data.email || "").toString().trim().toLowerCase();
  if (!email || email.indexOf("@") < 1) {
    return jsonOut(false, "INVALID_EMAIL");
  }

  var id = props.getProperty("SPREADSHEET_ID");
  var ss;
  try {
    ss = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
  } catch (err) {
    return jsonOut(false, "SPREADSHEET_OPEN_FAILED");
  }
  if (!ss) {
    return jsonOut(false, "NO_SPREADSHEET");
  }

  var sheetName = props.getProperty("SHEET_NAME") || "Sheet1";
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.getSheets()[0];
  }
  if (!sheet) {
    return jsonOut(false, "NO_SHEET");
  }

  var when = data.subscribedAt || new Date().toISOString();
  sheet.appendRow([email, when]);

  return jsonOut(true);
}

function jsonOut(ok, error) {
  var payload = ok ? { ok: true } : { ok: false, error: error || "ERROR" };
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
