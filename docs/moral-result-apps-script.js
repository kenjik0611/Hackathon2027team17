const SPREADSHEET_ID = "";
const SHEET_NAME = "moral_results";

const AXES = ["常識", "対応力", "思いやり", "情報管理", "責任感"];
const THEMES = [
  "家庭・近隣",
  "オフィス・取引先",
  "オンライン・Web会議",
  "社外交流",
  "公共空間・移動"
];

const HEADERS = [
  "匿名ID",
  "送信日時",
  "作成日時",
  "完了テーマ数",
  "総合スコア",
  "診断タイプ",
  "タイプ説明",
  ...AXES,
  ...THEMES.map((theme) => `${theme}スコア`),
  "良い点",
  "気をつけたい点",
  "コメント",
  "Markdown"
];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const sheet = getResultSheet_();
    ensureHeaders_(sheet);

    const row = buildRow_(payload);
    const targetRow = findRowByAnonymousId_(sheet, payload.anonymousId);

    if (targetRow) {
      sheet.getRange(targetRow, 1, 1, row.length).setValues([row]);
    } else {
      sheet.appendRow(row);
    }

    return createJsonResponse_({
      ok: true,
      mode: targetRow ? "updated" : "inserted",
      anonymousId: payload.anonymousId
    });
  } catch (error) {
    return createJsonResponse_({
      ok: false,
      error: String(error)
    });
  }
}

function getResultSheet_() {
  const spreadsheet = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function ensureHeaders_(sheet) {
  const currentHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const shouldSetHeaders = HEADERS.some((header, index) => currentHeaders[index] !== header);
  if (shouldSetHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
}

function findRowByAnonymousId_(sheet, anonymousId) {
  if (!anonymousId || sheet.getLastRow() < 2) {
    return null;
  }

  const ids = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues();
  const index = ids.findIndex((row) => row[0] === anonymousId);
  return index === -1 ? null : index + 2;
}

function buildRow_(payload) {
  const axisScores = payload.axisScores || {};
  const themeScores = payload.themeScores || [];
  const resultType = payload.resultType || {};

  return [
    payload.anonymousId || "",
    formatDate_(payload.submittedAt),
    formatDate_(payload.generatedAt),
    `${payload.completedCount || 0}/${payload.totalThemes || 0}`,
    payload.totalScore || 0,
    resultType.name || "",
    resultType.description || "",
    ...AXES.map((axis) => getPercent_(axisScores[axis])),
    ...THEMES.map((themeName) => {
      const theme = themeScores.find((item) => item.name === themeName);
      return getPercent_(theme);
    }),
    payload.commentGood || "",
    payload.commentImprovement || "",
    payload.comment || "",
    payload.markdown || ""
  ];
}

function getPercent_(item) {
  if (!item || item.percent === null || item.percent === undefined) {
    if (item && item.scorePercent !== null && item.scorePercent !== undefined) {
      return item.scorePercent;
    }
    return "";
  }
  return item.percent;
}

function formatDate_(value) {
  if (!value) {
    return "";
  }
  return Utilities.formatDate(new Date(value), "Asia/Tokyo", "yyyy/MM/dd HH:mm:ss");
}

function createJsonResponse_(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
