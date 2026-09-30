import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const distRoot = path.join(projectRoot, "dist");
const envPath = path.join(projectRoot, ".env");
const templatePath = path.join(distRoot, "index.html");
const memoReStories = [
  {
    slug: "memory-colors",
    title: "用颜色点缀记忆",
    excerpt: "当记忆的细节慢慢消散，颜色仍能把当时的感受带回来。",
    image: "/memore/stories/memory-colors/01-cover.jpg",
  },
  {
    slug: "echoes",
    title: "用回声唤回记忆",
    excerpt: "有些人已经不在身边，但他们说过的话，仍然可以带来温暖和力量。",
    image: "/memore/stories/echoes/01-cover.jpg",
  },
  {
    slug: "color-capture",
    title: "采摘记忆的颜色",
    excerpt: "不必征服时间，只需要在颜色消失之前，把它轻轻摘下来。",
    image: "/memore/stories/color-capture/01-cover.jpg",
  },
  {
    slug: "fruit-moods",
    title: "用水果表达心情",
    excerpt: "今天的感受就是明天的记忆；有时一个水果，比几个情绪词更接近心情本身。",
    image: "/memore/stories/fruit-moods/01-cover.jpg",
  },
];
const memoReStoriesEnglish = [
  {
    slug: "memory-colors",
    title: "Color Your Memories",
    excerpt:
      "Even as the details of a memory fade, color can bring its feeling back.",
    image: "/memore/stories/memory-colors/01-cover.jpg",
  },
  {
    slug: "echoes",
    title: "Let Their Words Echo",
    excerpt:
      "Some people are no longer beside us, but their words can still give us warmth and strength.",
    image: "/memore/stories/echoes/01-cover.jpg",
  },
  {
    slug: "color-capture",
    title: "Gather the Colors of Memory",
    excerpt:
      "You do not need to conquer time—only gather a color gently before it disappears.",
    image: "/memore/stories/color-capture/01-cover.jpg",
  },
  {
    slug: "fruit-moods",
    title: "Express Your Mood with Fruit",
    excerpt:
      "Today’s feelings become tomorrow’s memories. Sometimes a fruit comes closer than a list of emotion words.",
    image: "/memore/stories/fruit-moods/01-cover.jpg",
  },
];

function parseEnvFile(content) {
  return content
    .split(/\r?\n/)
    .filter(Boolean)
    .reduce((acc, line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        return acc;
      }

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) {
        return acc;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = trimmed.slice(separatorIndex + 1).trim();
      acc[key] = value;
      return acc;
    }, {});
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildPageTitle(post) {
  return `${post.title} | Playxeld`;
}

function buildDescription(post, fallbackDescription) {
  const source = (post.excerpt ?? "").trim() || fallbackDescription;
  return source.length > 180 ? `${source.slice(0, 177)}...` : source;
}

function buildPostUrl(post) {
  const encodedSlug = encodeURIComponent(post.slug);
  return post.language === "en"
    ? `https://playxeld.com/en/post/${encodedSlug}`
    : `https://playxeld.com/post/${encodedSlug}`;
}

function buildFriendArticleUrl(article) {
  return `https://playxeld.com/friends/${encodeURIComponent(article.slug)}`;
}

function injectMeta(html, entry, fallbackDescription, options = {}) {
  const {
    lang = "zh-CN",
    locale = "zh_CN",
    url = buildPostUrl(entry),
    image = "https://playxeld.com/site-icon.png?v=1",
    ogType = "article",
    twitterCard = "summary_large_image",
  } = options;
  const title = escapeHtml(buildPageTitle(entry));
  const description = escapeHtml(buildDescription(entry, fallbackDescription));
  const canonicalUrl = escapeHtml(url);
  const ogImage = image;
  const siteName = "Playxeld";

  let nextHtml = html;

  nextHtml = nextHtml.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`);
  nextHtml = nextHtml.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  nextHtml = nextHtml.replace(
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="description" content="${description}" />`,
  );
  nextHtml = nextHtml.replace(
    /<meta\s+property="og:type"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:type" content="${ogType}" />`,
  );
  nextHtml = nextHtml.replace(
    /<meta\s+property="og:site_name"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:site_name" content="${siteName}" />`,
  );
  nextHtml = nextHtml.replace(
    /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:title" content="${title}" />`,
  );
  nextHtml = nextHtml.replace(
    /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:description" content="${description}" />`,
  );
  nextHtml = nextHtml.replace(
    /<meta\s+property="og:image"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:image" content="${ogImage}" />`,
  );
  nextHtml = nextHtml.replace(
    /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:url" content="${canonicalUrl}" />`,
  );
  nextHtml = nextHtml.replace(
    /<meta\s+name="twitter:card"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="twitter:card" content="${twitterCard}" />`,
  );
  nextHtml = nextHtml.replace(
    /<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="twitter:title" content="${title}" />`,
  );
  nextHtml = nextHtml.replace(
    /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="twitter:description" content="${description}" />`,
  );
  nextHtml = nextHtml.replace(
    /<meta\s+name="twitter:image"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="twitter:image" content="${ogImage}" />`,
  );

  if (!nextHtml.includes('property="og:locale"')) {
    nextHtml = nextHtml.replace(
      "</head>",
      `    <meta property="og:locale" content="${locale}" />\n    <link rel="canonical" href="${canonicalUrl}" />\n  </head>`,
    );
  }

  return nextHtml;
}

async function fetchPublishedPosts({ supabaseUrl, supabaseAnonKey }) {
  const query = new URLSearchParams({
    select: "slug,title,excerpt,language,is_published",
    is_published: "eq.true",
    order: "published_at.desc",
  });

  const response = await fetch(`${supabaseUrl}/rest/v1/posts?${query.toString()}`, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch posts for static meta generation: ${response.status}`);
  }

  return response.json();
}

async function fetchPublishedFriendArticles({ supabaseUrl, supabaseAnonKey }) {
  const query = new URLSearchParams({
    select: "slug,title,excerpt,author_name,author_avatar_url,is_published",
    is_published: "eq.true",
    order: "published_at.desc",
  });

  const response = await fetch(
    `${supabaseUrl}/rest/v1/friend_articles?${query.toString()}`,
    {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch friend articles for static meta generation: ${response.status}`,
    );
  }

  return response.json();
}

async function writePostPage(templateHtml, post, fallbackDescription) {
  const targetDir =
    post.language === "en"
      ? path.join(distRoot, "en", "post", post.slug)
      : path.join(distRoot, "post", post.slug);

  await fs.mkdir(targetDir, { recursive: true });
  await fs.writeFile(
    path.join(targetDir, "index.html"),
    injectMeta(templateHtml, post, fallbackDescription, {
      lang: post.language === "en" ? "en" : "zh-CN",
      locale: post.language === "en" ? "en_US" : "zh_CN",
      url: buildPostUrl(post),
    }),
    "utf8",
  );
}

async function writeFriendArticlePage(templateHtml, article, fallbackDescription) {
  const targetDir = path.join(distRoot, "friends", article.slug);
  const fallbackImage = article.author_avatar_url || "https://playxeld.com/site-icon.png?v=1";

  await fs.mkdir(targetDir, { recursive: true });
  await fs.writeFile(
    path.join(targetDir, "index.html"),
    injectMeta(templateHtml, article, fallbackDescription, {
      lang: "zh-CN",
      locale: "zh_CN",
      url: buildFriendArticleUrl(article),
      image: fallbackImage,
    }),
    "utf8",
  );
}

async function writeWhatsNewPage(templateHtml) {
  const entry = {
    title: "What's New",
    excerpt: "Playxeld 最近开发、发布和推进中的 App、游戏与创作项目。",
  };
  const targetDir = path.join(distRoot, "whats-new");

  await fs.mkdir(targetDir, { recursive: true });
  await fs.writeFile(
    path.join(targetDir, "index.html"),
    injectMeta(templateHtml, entry, entry.excerpt, {
      lang: "zh-CN",
      locale: "zh_CN",
      url: "https://playxeld.com/whats-new",
      image: "https://playxeld.com/whats-new/memore/app-icon.png",
      ogType: "website",
      twitterCard: "summary",
    }),
    "utf8",
  );
}

async function writeMemoRePage(templateHtml) {
  const entry = {
    title: "MemoRe",
    excerpt:
      "MemoRe（物语）是一个采摘、连通、珍藏记忆的 iOS App，让照片、人物、地点、声音与情感重新相遇。",
  };
  const targetDir = path.join(distRoot, "memore");

  await fs.mkdir(targetDir, { recursive: true });
  await fs.writeFile(
    path.join(targetDir, "index.html"),
    injectMeta(templateHtml, entry, entry.excerpt, {
      lang: "zh-CN",
      locale: "zh_CN",
      url: "https://playxeld.com/memore",
      image: "https://playxeld.com/memore/app-icon.png",
      ogType: "website",
      twitterCard: "summary",
    }),
    "utf8",
  );
}

async function writeEnglishMemoRePage(templateHtml) {
  const entry = {
    title: "MemoRe",
    excerpt:
      "MemoRe is an iOS app for gathering, connecting, and cherishing memories—bringing photos, people, places, sounds, and feelings together again.",
  };
  const targetDir = path.join(distRoot, "en", "memore");

  await fs.mkdir(targetDir, { recursive: true });
  await fs.writeFile(
    path.join(targetDir, "index.html"),
    injectMeta(templateHtml, entry, entry.excerpt, {
      lang: "en",
      locale: "en_US",
      url: "https://playxeld.com/en/memore",
      image: "https://playxeld.com/memore/app-icon.png",
      ogType: "website",
      twitterCard: "summary",
    }),
    "utf8",
  );
}

async function writeMemoReStoryPages(templateHtml) {
  await Promise.all(
    memoReStories.map(async (story) => {
      const targetDir = path.join(distRoot, "memore", "stories", story.slug);
      const url = `https://playxeld.com/memore/stories/${story.slug}`;

      await fs.mkdir(targetDir, { recursive: true });
      await fs.writeFile(
        path.join(targetDir, "index.html"),
        injectMeta(templateHtml, story, story.excerpt, {
          lang: "zh-CN",
          locale: "zh_CN",
          url,
          image: `https://playxeld.com${story.image}`,
          ogType: "article",
          twitterCard: "summary_large_image",
        }),
        "utf8",
      );
    }),
  );
}

async function writeEnglishMemoReStoryPages(templateHtml) {
  await Promise.all(
    memoReStoriesEnglish.map(async (story) => {
      const targetDir = path.join(
        distRoot,
        "en",
        "memore",
        "stories",
        story.slug,
      );
      const url = `https://playxeld.com/en/memore/stories/${story.slug}`;

      await fs.mkdir(targetDir, { recursive: true });
      await fs.writeFile(
        path.join(targetDir, "index.html"),
        injectMeta(templateHtml, story, story.excerpt, {
          lang: "en",
          locale: "en_US",
          url,
          image: `https://playxeld.com${story.image}`,
          ogType: "article",
          twitterCard: "summary_large_image",
        }),
        "utf8",
      );
    }),
  );
}

async function main() {
  let fileEnv = {};

  try {
    const envContent = await fs.readFile(envPath, "utf8");
    fileEnv = parseEnvFile(envContent);
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code !== "ENOENT") {
      throw error;
    }
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL ?? fileEnv.VITE_SUPABASE_URL;
  const supabaseAnonKey =
    process.env.VITE_SUPABASE_ANON_KEY ?? fileEnv.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in environment or .env",
    );
  }

  const [templateHtml, posts, friendArticles] = await Promise.all([
    fs.readFile(templatePath, "utf8"),
    fetchPublishedPosts({ supabaseUrl, supabaseAnonKey }),
    fetchPublishedFriendArticles({ supabaseUrl, supabaseAnonKey }),
  ]);

  const defaultDescription =
    "Playxeld 的个人博客，记录关于游戏、故事、语言与创作系统的思考。";
  const friendArticlesDescription =
    "Playxeld 的朋友投稿栏目，收录客座作者的文章与创作。";

  await Promise.all(
    posts.map((post) => writePostPage(templateHtml, post, defaultDescription)),
  );

  await Promise.all(
    friendArticles.map((article) =>
      writeFriendArticlePage(templateHtml, article, friendArticlesDescription),
    ),
  );

  await writeWhatsNewPage(templateHtml);
  await writeMemoRePage(templateHtml);
  await writeEnglishMemoRePage(templateHtml);
  await writeMemoReStoryPages(templateHtml);
  await writeEnglishMemoReStoryPages(templateHtml);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
