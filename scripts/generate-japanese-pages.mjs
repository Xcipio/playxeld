import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const entries = [
  ["", "Playxeld｜遊びながら、考える", "ゲーム、物語、言葉、創作について。遊びながら考えるための場所、Playxeld。"],
  ["games", "ゲームライブラリー", "記事から生まれた小さなゲームを、タグや難易度から探せます。"],
  ["art", "作品ギャラリー", "単独の作品、連作、実験的なビジュアルプロジェクトをご紹介します。"],
  ["friends", "みんなの文章", "Playxeld に寄せられた、友人たちの物語やエッセイを紹介します。"],
  ["friends/category/stories", "物語", "人物、経験、記憶を綴った寄稿記事。"],
  ["friends/category/features", "特集", "テーマ別の寄稿や連載をまとめたコーナー。"],
  ["friends/category/essays", "エッセイ", "日々の発見や思考の断片を綴った文章。"],
  ["whats-new", "最新情報", "Playxeld の新しいアプリ、ゲーム、制作中のプロジェクトをご紹介します。"],
  ["memore", "MemoRe｜記憶を集め、つなぎ、大切にするアプリ", "写真、人、場所、音、気持ちにもう一度出会うための iOS アプリ、MemoRe。"],
  ["memore/stories/memory-colors", "記憶を色で彩る", "細かな記憶が薄れても、色はその時の気持ちを連れ戻してくれます。"],
  ["memore/stories/echoes", "あの人の言葉を、もう一度", "そばにいなくなっても、その人の言葉がぬくもりや力をくれることがあります。"],
  ["memore/stories/color-capture", "記憶の色を集める", "色が消える前に、そっとすくい取る。MemoRe の色の採集機能について。"],
  ["memore/stories/fruit-moods", "フルーツで気持ちを表す", "今日の気持ちは、明日の記憶。フルーツで気分を記録する試み。"],
];

const escape = (value) => value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

export async function writeJapanesePages(templateHtml, distRoot) {
  for (const [route, title, description] of entries) {
    const url = `https://playxeld.com/ja${route ? `/${route}` : ""}`;
    const pageTitle = title.startsWith("Playxeld") ? title : `${title} | Playxeld`;
    const story = route.startsWith("memore/stories/");
    const image = story ? `https://playxeld.com/memore/stories/${route.split("/").at(-1)}/01-cover.jpg` : "https://playxeld.com/memore/app-icon.png";
    let html = templateHtml.replace(/<html\b[^>]*>/i, '<html lang="ja">').replace(/<title>[^<]*<\/title>/i, `<title>${escape(pageTitle)}</title>`);
    html = html.replace(/<meta\b[^>]*(?:name=["']description["']|property=["']og:(?:type|title|description|url|locale|image)["']|name=["']twitter:(?:card|title|description|image)["'])[^>]*>/gi, "")
      .replace(/<link\b[^>]*rel=["'](?:canonical|alternate)["'][^>]*>/gi, "");
    const metadata = `<meta name="description" content="${escape(description)}"><meta property="og:type" content="${story ? "article" : "website"}"><meta property="og:image" content="${image}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${url}"><meta property="og:locale" content="ja_JP"><meta name="twitter:card" content="${story ? "summary_large_image" : "summary"}"><meta name="twitter:image" content="${image}"><meta name="twitter:title" content="${escape(title)}"><meta name="twitter:description" content="${escape(description)}"><link rel="canonical" href="${url}">`;
    html = html.replace("</head>", `${metadata}</head>`);
    const directory = path.join(distRoot, "ja", route);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, "index.html"), html, "utf8");
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const distRoot = path.resolve("dist");
  await writeJapanesePages(await readFile(path.join(distRoot, "index.html"), "utf8"), distRoot);
  console.log(`Generated ${entries.length} Japanese pages`);
}
