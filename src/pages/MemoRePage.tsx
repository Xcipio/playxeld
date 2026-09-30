import { useEffect } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import SiteTopbar from "../components/SiteTopbar";
import { memore, memoreEnglish } from "../data/memore";
import { memoreStories } from "../data/memoreStories";
import { useTheme } from "../hooks/useTheme";

const socialImageUrl = "https://playxeld.com/memore/app-icon.png";

type MemoReLocale = "zh" | "en";

type MemoRePageProps = {
  locale?: MemoReLocale;
};

const pageCopy = {
  zh: {
    metadataDescription:
      "MemoRe（物语）是一个采摘、连通、珍藏记忆的 iOS App，让照片、人物、地点、声音与情感重新相遇。",
    iconAlt: "MemoRe App 图标",
    status: "iOS App · 开发中",
    visualLabel: "MemoRe 界面预览",
    readOrigin: "阅读它的故事",
    viewFeatures: "看功能与故事",
    verbsLabel: "MemoRe 的三个动作",
    verbs: [
      ["采摘", "从照片、声音、颜色或一个微小线索开始，留下此刻。"],
      ["连通", "让物品、人物、地点与情感重新找到彼此。"],
      ["珍藏", "把散落的经历慢慢写成只属于自己的物语。"],
    ],
    memoryTitle: "一段记忆，可以不只是一张照片",
    playfulLead: "我还加了一些“不太实用”的东西：",
    storiesTitle: "功能从一段经历开始",
    storyCount: (count: number) => `${count} 篇`,
    storiesIntro:
      "这里记录 MemoRe 的功能，也记录它们为什么会出现。每一个入口背后，都有一段想要留下来的感受。",
    readAria: (title: string) => `阅读：${title}`,
    readStory: "阅读故事",
    galleryTitle: "把记忆放回可以触碰的地方",
    screenshotCount: (count: number) => `${count} 张公开界面`,
    openOriginal: (label: string) => `打开原图：${label}`,
    originTitle: "从一副花札开始的记忆",
    originNote: "MemoRe 的起点，是我和外婆的一段回忆。",
    closingLead: "记忆从来不只是过去。",
    closingTitle:
      "它们默默影响着现在，也可以带着温暖和慰藉，陪我们走向下一步。",
    closingMeta: "MemoRe · 物语 · iOS App · 开发中",
  },
  en: {
    metadataDescription:
      "MemoRe is an iOS app for gathering, connecting, and cherishing memories—bringing photos, people, places, sounds, and feelings together again.",
    iconAlt: "MemoRe app icon",
    status: "iOS App · In Development",
    visualLabel: "Preview of the MemoRe interface",
    readOrigin: "Read its story",
    viewFeatures: "Explore features and stories",
    verbsLabel: "The three actions at the heart of MemoRe",
    verbs: [
      ["Gather", "Begin with a photo, a sound, a color, or the smallest clue—and keep this moment."],
      ["Connect", "Help objects, people, places, and feelings find one another again."],
      ["Cherish", "Let scattered experiences slowly become a story that belongs only to you."],
    ],
    memoryTitle: "A memory can be more than a photo",
    playfulLead: "I also added a few things that are not entirely practical:",
    storiesTitle: "Every feature begins with an experience",
    storyCount: (count: number) => `${count} stories`,
    storiesIntro:
      "This is where I write about MemoRe’s features and why they came to exist. Behind every doorway is a feeling I wanted to preserve.",
    readAria: (title: string) => `Read: ${title}`,
    readStory: "Read the story",
    galleryTitle: "Put memories back within reach",
    screenshotCount: (count: number) => `${count} interface views`,
    openOriginal: (label: string) => `Open full-size image: ${label}`,
    originTitle: "A memory that began with hanafuda",
    originNote: "MemoRe began with a memory of my grandmother.",
    closingLead: "Memories are never only about the past.",
    closingTitle:
      "They quietly shape the present, and their warmth and comfort can stay with us as we take our next step.",
    closingMeta: "MemoRe · 物语 · iOS App · In Development",
  },
} as const;

const storyCopy: Record<
  string,
  { feature: string; title: string; category: string; kind: string; summary: string }
> = {
  "memory-colors": {
    feature: "Color Gallery",
    title: "Color Your Memories",
    category: "Gather",
    kind: "Feature Story",
    summary: "Even as the details of a memory fade, color can bring its feeling back.",
  },
  echoes: {
    feature: "Echoes",
    title: "Let Their Words Echo",
    category: "Connect",
    kind: "Feature Story",
    summary: "Some people are no longer beside us, but their words can still give us warmth and strength.",
  },
  "color-capture": {
    feature: "Color Capture",
    title: "Gather the Colors of Memory",
    category: "Gather",
    kind: "Feature Story",
    summary: "You do not need to conquer time—only gather a color gently before it disappears.",
  },
  "fruit-moods": {
    feature: "Fruit Moods",
    title: "Express Your Mood with Fruit",
    category: "Gather",
    kind: "Design Experiment",
    summary: "Today’s feelings become tomorrow’s memories. Sometimes a fruit comes closer than a list of emotion words.",
  },
};

function MemoRePage({ locale = "zh" }: MemoRePageProps) {
  const { theme, toggleTheme } = useTheme();
  const isEnglish = locale === "en";
  const copy = pageCopy[locale];
  const content = isEnglish ? memoreEnglish : memore;
  const canonicalUrl = `https://playxeld.com${isEnglish ? "/en" : ""}/memore`;

  useEffect(() => {
    const previousTitle = document.title;
    const previousLanguage = document.documentElement.lang;
    const metadataUpdates = [
      ["meta[name='description']", "content", copy.metadataDescription],
      ["meta[property='og:type']", "content", "website"],
      ["meta[property='og:title']", "content", `${content.title} | Playxeld`],
      ["meta[property='og:description']", "content", copy.metadataDescription],
      ["meta[property='og:image']", "content", socialImageUrl],
      ["meta[property='og:url']", "content", canonicalUrl],
      ["meta[name='twitter:card']", "content", "summary"],
      ["meta[name='twitter:title']", "content", `${content.title} | Playxeld`],
      ["meta[name='twitter:description']", "content", copy.metadataDescription],
      ["meta[name='twitter:image']", "content", socialImageUrl],
    ] as const;
    const previousMetadata = metadataUpdates.map(([selector, attribute]) => {
      const element = document.querySelector<HTMLMetaElement>(selector);
      return {
        element,
        attribute,
        value: element ? element.getAttribute(attribute) : null,
      };
    });
    let canonical = document.querySelector<HTMLLinkElement>(
      "link[rel='canonical']",
    );
    const previousCanonical = canonical?.href;
    const createdCanonical = !canonical;

    document.title = `${content.title}｜${content.tagline}`;
    document.documentElement.lang = isEnglish ? "en" : "zh-CN";
    metadataUpdates.forEach(([selector, attribute, value]) => {
      document
        .querySelector<HTMLMetaElement>(selector)
        ?.setAttribute(attribute, value);
    });

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    return () => {
      document.title = previousTitle;
      document.documentElement.lang = previousLanguage;
      previousMetadata.forEach(({ element, attribute, value }) => {
        if (!element) {
          return;
        }
        if (value === null) {
          element.removeAttribute(attribute);
        } else {
          element.setAttribute(attribute, value);
        }
      });
      if (createdCanonical) {
        canonical?.remove();
      } else if (canonical && previousCanonical) {
        canonical.href = previousCanonical;
      }
    };
  }, [canonicalUrl, content.tagline, content.title, copy.metadataDescription, isEnglish]);

  return (
    <div className="page memore-page">
      <header className="hero memore-site-hero">
        <SiteTopbar locale={locale} theme={theme} onThemeToggle={toggleTheme} />
      </header>

      <main>
        <section className="section memore-hero-section">
          <div className="memore-hero-copy">
            <p className="section-label">A MEMORY APP BY PLAYXELD</p>
            <div className="memore-hero-identity">
              <img
                className="memore-hero-icon"
                src={content.iconSrc}
                alt={copy.iconAlt}
                width="1024"
                height="1024"
              />
              <div>
                <p className="memore-hero-kind">{copy.status}</p>
                <h1>{content.title}</h1>
              </div>
            </div>

            <p className="memore-hero-tagline">{content.tagline}</p>
            <blockquote>{content.question}</blockquote>
            <p className="memore-hero-introduction">{content.introduction}</p>

            <div className="memore-hero-actions">
              <a className="memore-primary-link" href="#story">
                {copy.readOrigin} <span aria-hidden="true">↓</span>
              </a>
              <a className="memore-secondary-link" href="#stories">
                {copy.viewFeatures}
              </a>
            </div>
          </div>

          <div className="memore-hero-visual" aria-label={copy.visualLabel}>
            <figure className="memore-hero-screen memore-hero-screen-one">
              <img
                src={content.screenshots[0].src}
                alt={content.screenshots[0].alt}
                width="1172"
                height="1564"
              />
            </figure>
            <figure className="memore-hero-screen memore-hero-screen-two">
              <img
                src={content.screenshots[1].src}
                alt={content.screenshots[1].alt}
                width="1172"
                height="1564"
                loading="lazy"
              />
            </figure>
            <figure className="memore-hero-screen memore-hero-screen-three">
              <img
                src={content.screenshots[3].src}
                alt={content.screenshots[3].alt}
                width="1172"
                height="1564"
                loading="lazy"
              />
            </figure>
          </div>
        </section>

        <section className="section memore-verbs" aria-label={copy.verbsLabel}>
          {copy.verbs.map(([title, description], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </section>

        <section className="section memore-possibilities-section">
          <div className="memore-possibilities-copy">
            <p className="section-label">A MEMORY CAN BE</p>
            <h2 className="section-title">{copy.memoryTitle}</h2>
            <p>{content.memoryIngredients}</p>
          </div>

          <div className="memore-possibilities-list">
            <p>{copy.playfulLead}</p>
            <ol>
              {content.playfulFeatures.map((feature, index) => (
                <li key={feature}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{feature}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="stories" className="section memore-stories-section">
          <div className="section-header">
            <div>
              <p className="section-label">FEATURES & STORIES</p>
              <h2 className="section-title">{copy.storiesTitle}</h2>
            </div>
            <p className="section-meta">{copy.storyCount(memoreStories.length)}</p>
          </div>

          <p className="memore-stories-intro">
            {copy.storiesIntro}
          </p>

          <div className="memore-stories-grid">
            {memoreStories.map((story) => {
              const localizedStory = isEnglish
                ? (storyCopy[story.slug] ?? story)
                : story;

              return (
                <article
                  className="memore-story-card"
                  key={story.slug}
                  style={{ "--story-accent": story.accent } as CSSProperties}
                >
                  <Link
                    className="memore-story-card-image"
                    to={`/memore/stories/${story.slug}`}
                    aria-label={copy.readAria(localizedStory.title)}
                  >
                    <img
                      src={story.cover.src}
                      alt={isEnglish ? `${localizedStory.title} feature cover` : story.cover.alt}
                      loading="lazy"
                    />
                  </Link>
                  <div className="memore-story-card-copy">
                    <p>
                      <span>{localizedStory.category}</span>
                      {localizedStory.kind} · {localizedStory.feature}
                    </p>
                    <h3>
                      <Link to={`/memore/stories/${story.slug}`}>
                        {localizedStory.title}
                      </Link>
                    </h3>
                    <p>{localizedStory.summary}</p>
                    <Link
                      className="memore-story-card-link"
                      to={`/memore/stories/${story.slug}`}
                    >
                      {copy.readStory} <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="inside-memore" className="section memore-gallery-section">
          <div className="section-header">
            <div>
              <p className="section-label">INSIDE MEMORE</p>
              <h2 className="section-title">{copy.galleryTitle}</h2>
            </div>
            <p className="section-meta">{copy.screenshotCount(content.screenshots.length)}</p>
          </div>

          <div className="memore-gallery-grid">
            {content.screenshots.map((screenshot, index) => (
              <figure
                key={screenshot.src}
                className={`memore-gallery-item memore-gallery-item-${index + 1}`}
              >
                <a
                  href={screenshot.src}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={copy.openOriginal(screenshot.label)}
                >
                  <img
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width="1172"
                    height="1564"
                    loading="lazy"
                  />
                </a>
                <figcaption>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {screenshot.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="story" className="section memore-story-section">
          <aside className="memore-story-heading">
            <p className="section-label">WHY MEMORE</p>
            <h2 className="section-title">{copy.originTitle}</h2>
            <p className="memore-story-note">{copy.originNote}</p>
          </aside>

          <article className="memore-story-body">
            {content.originStory.map((paragraph, index) => (
              <p key={`memore-story-${index}`}>{paragraph}</p>
            ))}
          </article>
        </section>

        <section className="section memore-closing-section">
          <img
            src={content.iconSrc}
            alt=""
            width="1024"
            height="1024"
            aria-hidden="true"
          />
          <p>{copy.closingLead}</p>
          <h2>{copy.closingTitle}</h2>
          <span>{copy.closingMeta}</span>
        </section>
      </main>
    </div>
  );
}

export default MemoRePage;
