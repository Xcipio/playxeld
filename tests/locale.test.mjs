import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../src/lib/locale.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { resolveLocale, localizedPath } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);

test("recognizes explicit locale routes and legacy language parameters", () => {
  assert.equal(resolveLocale("/"), "zh");
  assert.equal(resolveLocale("/en/memore"), "en");
  assert.equal(resolveLocale("/ja/memore"), "ja");
  assert.equal(resolveLocale("/art", "?lang=ja"), "ja");
  assert.equal(resolveLocale("/ja/art", "?lang=en"), "ja");
  assert.equal(resolveLocale("/january"), "zh");
});

test("switches MemoRe and each story without losing the selected resource", () => {
  for (const resource of ["/memore", "/memore/stories/memory-colors", "/memore/stories/echoes", "/memore/stories/color-capture", "/memore/stories/fruit-moods"]) {
    assert.equal(localizedPath(`/en${resource}`, "ja"), `/ja${resource}`);
    assert.equal(localizedPath(`/ja${resource}`, "en"), `/en${resource}`);
    assert.equal(localizedPath(`/ja${resource}`, "zh"), resource);
    assert.equal(localizedPath(`/ja${resource}`, "ja"), `/ja${resource}`);
  }
});

test("keeps filters, tags and anchors and supports legacy English sections", () => {
  assert.equal(localizedPath("/art?lang=en&tag=paint#gallery", "ja"), "/ja/art?tag=paint#gallery");
  assert.equal(localizedPath("/ja/art?tag=paint", "en"), "/art?tag=paint&lang=en");
  assert.equal(localizedPath("/friends/category/stories", "ja"), "/ja/friends/category/stories");
  assert.equal(localizedPath("/#posts", "ja"), "/ja#essays");
  assert.equal(localizedPath("/ja#essays", "zh"), "/#posts");
  assert.equal(localizedPath("/whats-new?lang=en", "ja"), "/ja/whats-new");
  assert.equal(localizedPath("/tag/%E9%9A%8F%E7%AC%94", "ja"), "/ja/tag/%E9%9A%8F%E7%AC%94");
});

test("Japanese article UI reuses real Chinese or English content, never Japanese database rows", () => {
  assert.equal(localizedPath("/post/an-essay", "ja"), "/ja/post/an-essay");
  assert.equal(localizedPath("/en/post/an-essay#chapter", "ja"), "/ja/post/an-essay?content=en#chapter");
  assert.equal(localizedPath("/ja/post/an-essay?content=en#chapter", "ja"), "/ja/post/an-essay?content=en#chapter");
  assert.equal(localizedPath("/ja/post/an-essay?content=en", "en"), "/en/post/an-essay");
});

test("leaves external, mail and fragment-only destinations untouched", () => {
  for (const href of ["https://example.com/ja", "mailto:playxeld@gmail.com", "//example.com/path", "#story"]) {
    assert.equal(localizedPath(href, "ja"), href);
  }
});
