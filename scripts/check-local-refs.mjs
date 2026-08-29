#!/usr/bin/env node
// Scans src/frontend HTML files for href/src attributes pointing at local
// files (html/css/js/images/etc.) and fails if the referenced file is
// missing. External URLs, anchors, mailto:/tel:, and data: URIs are skipped.

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TARGET_DIR = path.join(ROOT, "src", "frontend");

const REF_ATTR_PATTERN = /\b(?:href|src)\s*=\s*"([^"]*)"/g;
const SKIP_PREFIXES = ["http://", "https://", "//", "mailto:", "tel:", "data:", "javascript:"];

function walkHtmlFiles(dir, results = []) {
  for (const entry of readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      walkHtmlFiles(fullPath, results);
    } else if (entry.toLowerCase().endsWith(".html")) {
      results.push(fullPath);
    }
  }
  return results;
}

function shouldSkip(ref) {
  if (!ref || ref.startsWith("#")) {
    return true;
  }
  const lowered = ref.toLowerCase();
  return SKIP_PREFIXES.some((prefix) => lowered.startsWith(prefix));
}

function stripFragmentAndQuery(ref) {
  return ref.split("#")[0].split("?")[0];
}

const htmlFiles = walkHtmlFiles(TARGET_DIR);
const brokenRefs = [];

for (const filePath of htmlFiles) {
  const content = readFileSync(filePath, "utf8");
  const baseDir = path.dirname(filePath);

  for (const match of content.matchAll(REF_ATTR_PATTERN)) {
    const rawRef = match[1];
    if (shouldSkip(rawRef)) {
      continue;
    }

    const cleanRef = stripFragmentAndQuery(rawRef);
    if (!cleanRef) {
      continue;
    }

    const resolved = path.resolve(baseDir, decodeURIComponent(cleanRef));
    if (!existsSync(resolved)) {
      brokenRefs.push({
        file: path.relative(ROOT, filePath),
        ref: rawRef,
        resolved: path.relative(ROOT, resolved)
      });
    }
  }
}

if (brokenRefs.length > 0) {
  console.error(`Found ${brokenRefs.length} broken local reference(s):\n`);
  for (const item of brokenRefs) {
    console.error(`  ${item.file} -> "${item.ref}" (resolved: ${item.resolved})`);
  }
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML file(s) under src/frontend. All local references are valid.`);
