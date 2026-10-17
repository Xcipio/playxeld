import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Markdown from 'react-markdown';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const locales = [
  { lang: 'zh-CN', prefix: '', suffix: '', privacy: '隐私政策', support: '支持', product: '产品介绍', contents: '本页内容', skip: '跳转至正文' },
  { lang: 'en', prefix: 'en/', suffix: '.en', privacy: 'Privacy Policy', support: 'Support', product: 'About MemoRe', contents: 'On this page', skip: 'Skip to content' },
  { lang: 'ja', prefix: 'ja/', suffix: '.ja', privacy: 'プライバシーポリシー', support: 'サポート', product: 'MemoRe について', contents: '目次', skip: '本文へ移動' },
];
const pages = locales.flatMap(locale => ['privacy', 'support'].map(slug => ({
  ...locale, slug,
  source: slug === 'privacy' && locale.lang === 'zh-CN' ? 'privacy.zh-CN.md' : `${slug}${locale.suffix}.md`,
  title: `MemoRe ${locale[slug]}`, label: slug === 'privacy' ? 'Privacy' : 'Support',
  description: `MemoRe ${locale[slug]}`, base: `/${locale.prefix}memore/`,
})));
const escape = (text) => text.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const css = `
:root{color-scheme:dark light;--bg:#080b12;--panel:#111622;--text:#edf0f6;--muted:#b8c1d0;--accent:#f0c2a0;--line:#303746}
*{box-sizing:border-box}html{scroll-padding-top:24px}body{margin:0;background:var(--bg);color:var(--text);font:16px/1.9 -apple-system,BlinkMacSystemFont,"PingFang SC","Hiragino Sans GB",sans-serif}
a{color:var(--accent);text-underline-offset:4px;overflow-wrap:anywhere}a:hover{text-decoration-thickness:2px}a:focus-visible{outline:2px solid var(--accent);outline-offset:5px;border-radius:3px}
.skip{position:absolute;left:20px;top:-100px}.skip:focus{top:10px;background:var(--bg);padding:12px;z-index:2}
header,main,footer{width:min(920px,calc(100% - 48px));margin:auto}header{padding:32px 0;display:flex;gap:24px;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line)}
.brand{display:flex;align-items:center;gap:12px;text-decoration:none;color:var(--text);font-weight:650;letter-spacing:.03em}.brand img{width:40px;height:40px;border-radius:10px}.brand small{display:block;color:var(--muted);font-size:11px;line-height:1.2;letter-spacing:.13em;font-weight:400}
nav{display:flex;flex-wrap:wrap;gap:12px 24px}nav a{font-size:14px;text-decoration:none}nav a[aria-current]{text-decoration:underline}
main{padding:44px 0 72px}.eyebrow{color:var(--accent);font-family:Georgia,serif;letter-spacing:.1em;margin:0 0 16px}
.layout{display:grid;grid-template-columns:180px minmax(0,1fr);gap:48px;align-items:start}.contents{position:sticky;top:24px;font-size:13px;line-height:1.65}.contents strong{display:block;color:var(--muted);margin-bottom:12px;font-weight:500}.contents a{display:block;text-decoration:none;margin:0 0 12px;color:var(--muted)}.contents a:hover{color:var(--accent)}
article{min-width:0}h1{font-size:clamp(30px,5vw,44px);letter-spacing:-.035em;line-height:1.3;margin:0 0 28px;font-weight:650}h2{font-size:21px;line-height:1.5;margin:42px 0 16px;padding-top:6px;letter-spacing:-.015em}h2:first-of-type{margin-top:30px}p{margin:0 0 20px;overflow-wrap:anywhere}ul{padding-left:1.4em;margin:0 0 22px}li{padding-left:.2em;margin-bottom:12px}strong{font-weight:650}article>p:first-of-type{color:var(--muted)}footer{border-top:1px solid var(--line);padding:28px 0 40px;color:var(--muted);font-size:13px}footer p{margin:12px 0 0}
@media(prefers-color-scheme:light){:root{--bg:#fcfaf7;--panel:#f3eee7;--text:#252a35;--muted:#5e6572;--accent:#815033;--line:#ded7ce}}
@media(max-width:720px){header,main,footer{width:calc(100% - 36px)}header{padding:22px 0;align-items:flex-start;gap:16px}header nav{gap:8px 16px;justify-content:flex-end}header nav a{font-size:13px}.brand{flex-shrink:0}.brand img{width:34px;height:34px}.layout{display:block}.contents{position:static;border-bottom:1px solid var(--line);padding-bottom:16px;margin-bottom:28px}.contents div{display:flex;flex-wrap:wrap;gap:8px 18px}.contents a{margin:0}main{padding-top:28px}h2{margin-top:34px}}
@media print{:root{--bg:white;--text:black;--muted:#333;--accent:black;--line:#aaa}header nav,.contents,.skip,header,main,footer{width:100%}.layout{display:block}main{padding-top:20px}h2{break-after:avoid}a{text-decoration:underline}}
`;

for (const page of pages) {
  const markdown = await readFile(resolve(root, 'docs/memore', page.source), 'utf8');
  const headings = [...markdown.matchAll(/^## (.+)$/gm)].map((match, index) => ({ text: match[1], id: `section-${index + 1}` }));
  let headingIndex = 0;
  const body = renderToStaticMarkup(createElement(Markdown, {
    components: { h2: ({ children }) => createElement('h2', { id: headings[headingIndex++].id }, children) },
    children: markdown,
  }));
  const productURL = page.lang === 'en' ? '/en/memore/' : '/memore/';
  const navigation = `<a href="${productURL}">${page.product}</a><a href="${page.base}support/"${page.slug === 'support' ? ' aria-current="page"' : ''}>${page.support}</a><a href="${page.base}privacy/"${page.slug === 'privacy' ? ' aria-current="page"' : ''}>${page.privacy}</a>`;
  const languageNavigation = locales.map(locale => `<a href="/${locale.prefix}memore/${page.slug}/" lang="${locale.lang}" hreflang="${locale.lang}"${page.lang === locale.lang ? ' aria-current="page"' : ''}>${locale.lang === 'zh-CN' ? '中文' : locale.lang === 'en' ? 'English' : '日本語'}</a>`).join(' ');
  const html = `<!doctype html>
<html lang="${page.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="referrer" content="no-referrer"><meta name="description" content="${escape(page.description)}"><title>${escape(page.title)} | Playxeld</title><link rel="canonical" href="https://playxeld.com${page.base}${page.slug}/"><link rel="icon" href="/memore/app-icon.png"><style>${css}</style></head>
<body><a class="skip" href="#content">${page.skip}</a><header><a class="brand" href="/memore/"><img src="/memore/app-icon.png" alt="" width="40" height="40"><span>MemoRe<small>BY PLAYXELD</small></span></a><nav aria-label="MemoRe">${navigation}</nav></header>
<main id="content"><nav aria-label="Language">${languageNavigation}</nav><p class="eyebrow">MemoRe / ${page.label}</p><div class="layout"><aside class="contents" aria-label="${page.contents}"><strong>${page.contents}</strong><div>${headings.map((item) => `<a href="#${item.id}">${escape(item.text)}</a>`).join('')}</div></aside><article>${body}</article></div></main>
<footer><nav aria-label="Contact"><a href="mailto:support@playxeld.com">support@playxeld.com</a><a href="mailto:privacy@playxeld.com">privacy@playxeld.com</a></nav><p>MemoRe · Playxeld</p></footer></body></html>\n`;
  const directory = resolve(root, 'public', page.prefix, 'memore', page.slug);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), html);
  console.log(`Generated public/${page.prefix}memore/${page.slug}/index.html`);
}
