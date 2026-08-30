#!/usr/bin/env node

import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const STORE_PATH = path.join(ROOT, "src", "frontend", "overallResultStore.js");
const MEMBER_SCORING_PATH = path.join(ROOT, "src", "frontend", "Otokogokoro", "memberQuizScoring.js");
const PRIVATE_MARKER = "PRIVATE-ANSWER-SHOULD-NOT-LEAK";
const AXES = ["常識", "対応力", "思いやり", "情報管理", "責任感"];
const THEMES = [
  { id: "house", name: "家庭・近隣", href: "house_Kiyose/house.html" },
  { id: "office", name: "オフィス・取引先", href: "office_Arita/office.html" },
  { id: "online", name: "オンライン・Web会議", href: "online_Suzuki/online.html" },
  { id: "outsideCompany", name: "社外交流", href: "outsideCompany_Fukazawa/outsideCompany.html" },
  { id: "publicSpace", name: "公共空間・移動", href: "publicSpace_Kudo/publicSpace.html" }
];
const MEMBERS = [
  { id: "arita", name: "有田", path: "Arita/arita.html" },
  { id: "kiyose", name: "清瀬", path: "Kiyose/kiyose.html" },
  { id: "suzuki", name: "鈴木", path: "Suzuki/suzuki.html" },
  { id: "kudo", name: "工藤", path: "Kudo/kudo.html" },
  { id: "fukazawa", name: "深澤", path: "Fukazawa/fukazawa.html" }
];

await import(pathToFileURL(STORE_PATH));

const store = globalThis.OverallResultStore;
assert.ok(store, "OverallResultStore must be exposed on globalThis");
assert.equal(typeof store.buildAiCommunicationProfile, "function");

function createMoralStore(completedCount, score = 72, axisPercents = null) {
  const themeSummaries = THEMES.map((theme, index) => ({
    ...theme,
    completed: index < completedCount,
    scorePercent: index < completedCount ? (index === 0 ? score : 80) : null,
    result: index < completedCount
      ? { answers: [{ selectedValue: PRIVATE_MARKER }] }
      : null
  }));
  const axisScores = Object.fromEntries(AXES.map((axis, index) => [
    axis,
    { percent: completedCount > 0 ? (axisPercents ? axisPercents[index] : index === 0 ? score : 60 + index) : null }
  ]));

  return {
    AXES,
    THEMES,
    buildAggregate() {
      return {
        anonymousId: PRIVATE_MARKER,
        completedCount,
        totalThemes: THEMES.length,
        totalScore: completedCount > 0 ? score : 0,
        axisScores,
        themeSummaries
      };
    },
    getThemeProgress() {
      return completedCount < THEMES.length
        ? { [THEMES[completedCount].id]: { answers: [PRIVATE_MARKER] } }
        : {};
    },
    getResultType() {
      return {
        name: "常識ガーディアン",
        description: "場のルールや社会的な前提を押さえるのが得意なタイプです。"
      };
    },
    getCommentDetails() {
      return {
        good: "確認できている範囲の強みです。",
        improvement: "確認できている範囲の振り返りポイントです。"
      };
    }
  };
}

function createInsightStore(completedCount, matchPercent = 68, progressAnsweredCount = 2) {
  const memberResults = {};
  const memberProgress = {};

  MEMBERS.forEach((member, index) => {
    if (index < completedCount) {
      memberResults[member.id] = {
        memberId: member.id,
        isComplete: true,
        matchPercent: index === 0 ? matchPercent : 50 + index,
        answeredCount: 5,
        questionCount: 5,
        privateNote: PRIVATE_MARKER
      };
    } else if (index === completedCount) {
      memberProgress[member.id] = {
        answeredCount: progressAnsweredCount,
        questionCount: 5,
        answers: [PRIVATE_MARKER]
      };
    }
  });

  const bestMatchMember = completedCount > 0 ? MEMBERS[0] : null;
  const bestMatchResult = completedCount > 0 ? memberResults[MEMBERS[0].id] : null;

  return {
    members: MEMBERS,
    getAggregate() {
      return {
        members: MEMBERS,
        memberResults,
        memberProgress,
        completedCount,
        totalMembers: MEMBERS.length,
        overallMatchPercent: completedCount > 0 ? matchPercent : null,
        bestMatchMember,
        bestMatchResult,
        suggestedMbti: completedCount > 0 ? "ENTJ" : "未測定",
        suggestedMbtiName: completedCount > 0 ? "指揮官" : "",
        suggestedLoveType: completedCount > 0 ? "FAPE" : "未測定",
        suggestedLoveTypeName: completedCount > 0 ? "最後の恋人" : ""
      };
    }
  };
}

const emptySnapshot = store.createSnapshot(createMoralStore(0), createInsightStore(0));
assert.equal(emptySnapshot.status, "partial");
assert.equal(emptySnapshot.hasResults, false);
assert.equal(emptySnapshot.incompleteItems.length, 10);
assert.match(emptySnapshot.profile[0], /まだ診断結果がありません/);
assert.match(emptySnapshot.aiProfile.summary.join("\n"), /会話傾向は推測できません/);
assert.match(emptySnapshot.aiProfile.considerations[0].title, /推測せず本人へ確認/);

const partialSnapshot = store.createSnapshot(createMoralStore(1, 0), createInsightStore(1, 0));
assert.equal(partialSnapshot.status, "partial");
assert.equal(partialSnapshot.hasResults, true);
assert.equal(partialSnapshot.moral.totalScore, 0, "A measured zero score must remain zero");
assert.equal(partialSnapshot.insight.overallMatchPercent, 0, "A measured zero percent must remain zero");
assert.equal(partialSnapshot.incompleteItems[0].status, "in_progress");
assert.match(partialSnapshot.aiProfile.summary.join("\n"), /途中プロフィール/);
assert.match(partialSnapshot.aiProfile.safeguards.join("\n"), /現在のユーザーの明示的な指示/);

const completeSnapshot = store.createSnapshot(createMoralStore(5), createInsightStore(5));
assert.equal(completeSnapshot.status, "complete");
assert.equal(completeSnapshot.incompleteItems.length, 0);
assert.equal(completeSnapshot.insight.members.find((member) => member.name === "工藤").completed, true);

const zeroAnswerProgressSnapshot = store.createSnapshot(
  createMoralStore(0),
  createInsightStore(0, 68, 0)
);
assert.equal(
  zeroAnswerProgressSnapshot.incompleteItems.find((item) => item.name === "有田").status,
  "in_progress",
  "The existence of progress data must distinguish an in-progress item from an unstarted item"
);

const tiedAxesSnapshot = store.createSnapshot(
  createMoralStore(1, 80, [90, 90, 50, 40, 40]),
  createInsightStore(0)
);
assert.match(tiedAxesSnapshot.profile.join("\n"), /常識・対応力がともに90点で、同率/);
assert.match(tiedAxesSnapshot.profile.join("\n"), /情報管理・責任感が同率の振り返りポイント/);
assert.match(tiedAxesSnapshot.aiProfile.summary.join("\n"), /常識・対応力.*判断材料/);
assert.match(tiedAxesSnapshot.aiProfile.considerations.map((item) => item.title).join("\n"), /情報管理を補助的な確認項目/);

const insightOnlySnapshot = store.createSnapshot(createMoralStore(0), createInsightStore(1));
assert.match(insightOnlySnapshot.aiProfile.summary.join("\n"), /本人の性格や会話上の好みを直接示すものとしては扱いません/);
assert.match(insightOnlySnapshot.aiProfile.considerations[0].detail, /本人の希望を質問/);

const balancedAxesSnapshot = store.createSnapshot(
  createMoralStore(5, 80, [70, 70, 70, 70, 70]),
  createInsightStore(0)
);
assert.match(balancedAxesSnapshot.aiProfile.summary.join("\n"), /明確な優先差がなく/);
assert.match(balancedAxesSnapshot.aiProfile.considerations[0].title, /一つの診断軸に決めつけない/);

const sanitizedSnapshot = JSON.stringify(partialSnapshot);
assert.doesNotMatch(sanitizedSnapshot, /anonymousId|answers|selectedValue|privateNote/);
assert.doesNotMatch(sanitizedSnapshot, /"id":|memberId|answeredCount|questionCount/);
assert.doesNotMatch(sanitizedSnapshot, new RegExp(PRIVATE_MARKER));

const specialYamlValue = "日本語: \"引用\"\n改行\\backslash\u2028separator";
assert.equal(store.quoteYamlString(specialYamlValue), JSON.stringify(specialYamlValue).replace(/\u2028/g, "\\u2028"));

const generatedAt = new Date(2026, 7, 29, 12, 34, 56);
const filename = store.buildFilename(generatedAt);
assert.equal(filename, "kuukiyomi-ai-profile-20260829-1234.md");

const document = store.buildOkfMarkdown(partialSnapshot, generatedAt);
assert.equal(document.charCodeAt(0), 45, "The file must begin with '-' and not a BOM");
assert.ok(document.startsWith("---\n"));
assert.match(document, /\n---\n\n# 空気読メーター AIコミュニケーションプロフィール\n/);
assert.match(document, /type: "Personal Communication Profile"/);
assert.match(document, /generated:\n  by: "kuukiyomi-meter\/2"/);
assert.match(document, /  at: "\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}"/);
assert.match(document, /status: "draft"/);
assert.match(document, /result_status: "partial"/);
assert.match(document, /profile_scope: "AI-assisted conversation"/);
assert.match(document, /schema_version: 2/);
assert.match(document, /sources:\n  - id: "diagnostic-result"\n    resource: "browser-local completed diagnostic results"/);
assert.doesNotMatch(document, /^verified:/m, "The automatically generated profile must remain unverified");
assert.match(document, /- 総合スコア: 0 \/ 100/);
assert.match(document, /- 総合一致度: 0%/);
assert.match(document, /## この文書の使い方/);
assert.match(document, /## AI向け要約/);
assert.match(document, /## 会話で考慮するとよいこと/);
assert.match(document, /## AIが本人へ確認すべきこと/);
assert.match(document, /## AIが断定・推測してはいけないこと/);
assert.match(document, /## 根拠となる回答傾向/);
assert.match(document, /## 診断結果の詳細（参考資料）/);
assert.match(document, /### 完了状況/);
assert.match(document, /### 未完了項目/);
assert.match(document, /### モラル編/);
assert.match(document, /### 男心編/);
assert.match(document, /## プライバシーと限界/);
assert.match(document, /現在のユーザーの明示的な指示と会話内の訂正を優先/);
assert.match(document, /本人のMBTIではありません/);
assert.doesNotMatch(document, /ユーザー本人のMBTIは[A-Z]{4}/);
assert.ok(
  document.indexOf("## AI向け要約") < document.indexOf("## 診断結果の詳細（参考資料）"),
  "AI communication guidance must appear before diagnostic details"
);
assert.doesNotMatch(document, /\r/);
assert.doesNotMatch(document, /\n- 総合点:/);
assert.doesNotMatch(document, new RegExp(PRIVATE_MARKER));

const completeDocument = store.buildOkfMarkdown(completeSnapshot, generatedAt);
assert.match(completeDocument, /status: "stable"/);
assert.match(completeDocument, /result_status: "complete"/);

let savedKudoResult = null;
globalThis.window = globalThis;
globalThis.OtokogokoroResultStore = {
  saveMemberResult(memberId, result) {
    assert.equal(memberId, "kudo");
    savedKudoResult = result;
    return result;
  }
};
await import(pathToFileURL(MEMBER_SCORING_PATH));

globalThis.OtokogokoroMemberScoring.saveKudoResult([
  { optionIndex: 3, score: 0 },
  { optionIndex: 0, score: 100 },
  { optionIndex: 1, score: 50 },
  { optionIndex: 2, score: 25 },
  { optionIndex: 1, score: 50 }
], 5);
assert.equal(savedKudoResult.isComplete, true);
assert.equal(savedKudoResult.answeredCount, 5);
assert.equal(savedKudoResult.matchPercent, 45, "Kudo aggregate must match the existing result-screen percent");
assert.ok(Object.keys(savedKudoResult.mbtiScores).length > 0);
assert.ok(Object.keys(savedKudoResult.loveTypeScores).length > 0);

console.log("Overall result aggregation and OKF Markdown checks passed.");
