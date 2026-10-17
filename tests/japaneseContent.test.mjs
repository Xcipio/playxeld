import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { build } from "esbuild";
import { writeJapanesePages } from "../scripts/generate-japanese-pages.mjs";

async function loadTypeScript(entry) {
  const { outputFiles } = await build({ entryPoints: [entry], bundle: true, write: false, platform: "node", format: "esm" });
  return import(`data:text/javascript;base64,${Buffer.from(outputFiles[0].text).toString("base64")}`);
}

test("Japanese MemoRe uses all 20 English screenshots with Japanese captions", async () => {
  const { memoreJapanese, memoreStoriesJapanese } = await loadTypeScript("src/data/memore.ja.ts");
  const { memoreEnglish } = await loadTypeScript("src/data/memore.ts");
  const { memoreStoriesEnglish } = await loadTypeScript("src/data/memoreStories.en.ts");
  assert.equal(memoreJapanese.screenshots.length, 20);
  assert.deepEqual(memoreJapanese.screenshots.map((image) => image.src), memoreEnglish.screenshots.map((image) => image.src));
  for (const image of memoreJapanese.screenshots) {
    assert.match(image.label, /[ぁ-んァ-ヶ]/u);
    assert.ok(image.width > 0 && image.height > image.width);
  }
  for (const [index, story] of memoreStoriesJapanese.entries()) {
    assert.deepEqual(story.sections, memoreStoriesEnglish[index].sections);
    assert.equal(story.cover.src, memoreStoriesEnglish[index].cover.src);
  }
});

test("generates Japanese static entry points with canonical and sharing metadata", async (context) => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "playxeld-ja-test-"));
  context.after(() => rm(directory, { recursive: true }));
  await writeJapanesePages('<html lang="zh-CN"><head><title>Playxeld</title><meta name="description" content="old"><link rel="canonical" href="https://playxeld.com/"></head><body><div id="root"></div></body></html>', directory);
  for (const route of ["", "games", "art", "friends", "whats-new", "memore", "memore/stories/echoes"]) {
    const html = await readFile(path.join(directory, "ja", route, "index.html"), "utf8");
    assert.match(html, /<html lang="ja">/);
    assert.match(html, /og:locale" content="ja_JP"/);
    assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1);
    assert.ok(html.includes(`https://playxeld.com/ja${route ? `/${route}` : ""}`));
    assert.ok(html.includes('id="root"'));
  }
});
