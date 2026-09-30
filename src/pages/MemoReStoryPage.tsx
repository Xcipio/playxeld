import { useEffect, useLayoutEffect } from "react";
import type { CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import SiteTopbar from "../components/SiteTopbar";
import {
  memoreStories,
  MemoReStoryImage,
} from "../data/memoreStories";
import { memoreStoriesEnglish } from "../data/memoreStories.en";
import { useTheme } from "../hooks/useTheme";

const siteUrl = "https://playxeld.com";
const useClientLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type MemoReStoryLocale = "zh" | "en";

type MemoReStoryPageProps = {
  locale?: MemoReStoryLocale;
};

const pageCopy = {
  zh: {
    openOriginal: (caption: string) => `打开原图：${caption}`,
    notFound: "没有找到这篇故事",
    backToStories: "返回功能与故事",
    breadcrumb: "面包屑导航",
    featuresAndStories: "功能与故事",
    emojiLabel:
      "苹果、橘子、香蕉、西瓜、葡萄、蓝莓、草莓、菠萝、猕猴桃、甜瓜、梨、芒果、桃、樱桃、柠檬、青苹果、椰子和青柠",
    storyNavigation: "MemoRe 故事导航",
    previous: "上一篇",
    next: "下一篇",
    back: "返回",
    overview: "MemoRe 产品总览",
  },
  en: {
    openOriginal: (caption: string) => `Open full-size image: ${caption}`,
    notFound: "This story could not be found",
    backToStories: "Back to features and stories",
    breadcrumb: "Breadcrumb navigation",
    featuresAndStories: "Features & Stories",
    emojiLabel:
      "apple, mandarin, banana, watermelon, grapes, blueberries, strawberry, pineapple, kiwi, melon, pear, mango, peach, cherries, lemon, green apple, coconut, and lime",
    storyNavigation: "MemoRe story navigation",
    previous: "Previous story",
    next: "Next story",
    back: "Back",
    overview: "MemoRe overview",
  },
} as const;

function scrollToPageTop() {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  root.style.scrollBehavior = "auto";
  window.scrollTo({ top: 0, left: 0 });
  root.style.scrollBehavior = previousScrollBehavior;
}

function StoryImage({
  image,
  locale,
  eager = false,
}: {
  image: MemoReStoryImage;
  locale: MemoReStoryLocale;
  eager?: boolean;
}) {
  const copy = pageCopy[locale];

  return (
    <figure className="memore-story-figure">
      <a
        href={image.src}
        target="_blank"
        rel="noreferrer"
        aria-label={copy.openOriginal(image.caption)}
      >
        <img src={image.src} alt={image.alt} loading={eager ? "eager" : "lazy"} />
      </a>
      <figcaption>{image.caption}</figcaption>
    </figure>
  );
}

function MemoReStoryPage({ locale = "zh" }: MemoReStoryPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const isEnglish = locale === "en";
  const copy = pageCopy[locale];
  const stories = isEnglish ? memoreStoriesEnglish : memoreStories;
  const story = stories.find((entry) => entry.slug === slug) ?? null;
  const { theme, toggleTheme } = useTheme();
  const memorePath = isEnglish ? "/en/memore" : "/memore";
  const storyPathPrefix = `${memorePath}/stories`;

  useClientLayoutEffect(() => {
    scrollToPageTop();
  }, [locale, slug]);

  useEffect(() => {
    if (!story) {
      return;
    }

    const previousTitle = document.title;
    const previousLanguage = document.documentElement.lang;
    const canonicalUrl = `${siteUrl}${storyPathPrefix}/${story.slug}`;
    const socialImageUrl = `${siteUrl}${story.cover.src}`;
    const metadataUpdates = [
      ["meta[name='description']", "content", story.summary],
      ["meta[property='og:type']", "content", "article"],
      ["meta[property='og:title']", "content", `${story.title} | MemoRe`],
      ["meta[property='og:description']", "content", story.summary],
      ["meta[property='og:image']", "content", socialImageUrl],
      ["meta[property='og:url']", "content", canonicalUrl],
      ["meta[name='twitter:card']", "content", "summary_large_image"],
      ["meta[name='twitter:title']", "content", `${story.title} | MemoRe`],
      ["meta[name='twitter:description']", "content", story.summary],
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
    let canonical = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    const previousCanonical = canonical?.href;
    const createdCanonical = !canonical;

    document.title = `${story.title}｜MemoRe`;
    document.documentElement.lang = isEnglish ? "en" : "zh-CN";
    metadataUpdates.forEach(([selector, attribute, value]) => {
      document.querySelector<HTMLMetaElement>(selector)?.setAttribute(attribute, value);
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
  }, [isEnglish, story, storyPathPrefix]);

  if (!story) {
    return (
      <div className="page memore-page memore-story-page">
        <header className="hero memore-site-hero">
          <SiteTopbar locale={locale} theme={theme} onThemeToggle={toggleTheme} />
        </header>
        <main className="section memore-story-not-found">
          <p className="section-label">MEMORE</p>
          <h1>{copy.notFound}</h1>
          <Link className="memore-primary-link" to={`${memorePath}#stories`}>
            {copy.backToStories}
          </Link>
        </main>
      </div>
    );
  }

  const storyIndex = stories.findIndex((entry) => entry.slug === story.slug);
  const previousStory = storyIndex > 0 ? stories[storyIndex - 1] : null;
  const nextStory =
    storyIndex < stories.length - 1 ? stories[storyIndex + 1] : null;
  const accentStyle = { "--story-accent": story.accent } as CSSProperties;

  return (
    <div className="page memore-page memore-story-page" style={accentStyle}>
      <header className="hero memore-site-hero">
        <SiteTopbar locale={locale} theme={theme} onThemeToggle={toggleTheme} />
      </header>

      <main>
        <section className="section memore-story-hero">
          <div className="memore-story-hero-copy">
            <nav className="memore-story-breadcrumb" aria-label={copy.breadcrumb}>
              <Link to={memorePath}>MemoRe</Link>
              <span aria-hidden="true">/</span>
              <Link to={`${memorePath}#stories`}>{copy.featuresAndStories}</Link>
            </nav>
            <div className="memore-story-meta">
              <span>{story.category}</span>
              <span>{story.kind}</span>
              <span>{story.feature}</span>
            </div>
            <h1>{story.title}</h1>
            <p>{story.summary}</p>
          </div>

          <StoryImage image={story.cover} locale={locale} eager />
        </section>

        <article className="section memore-story-article">
          {story.sections.map((section, sectionIndex) => (
            <section
              className="memore-story-content-section"
              key={`${story.slug}-section-${sectionIndex}`}
            >
              {(section.kicker || section.title) && (
                <header>
                  {section.kicker && <p className="section-label">{section.kicker}</p>}
                  {section.title && <h2>{section.title}</h2>}
                </header>
              )}

              {section.paragraphs?.map((paragraph, paragraphIndex) => (
                <p key={`${story.slug}-${sectionIndex}-paragraph-${paragraphIndex}`}>
                  {paragraph}
                </p>
              ))}

              {section.emojiLine && (
                <p
                  className="memore-story-emoji-line"
                  aria-label={copy.emojiLabel}
                >
                  {section.emojiLine}
                </p>
              )}

              {section.details && (
                <ul className="memore-story-detail-list">
                  {section.details.map((detail) => (
                    <li key={detail.label}>
                      {detail.symbol && <span aria-hidden="true">{detail.symbol}</span>}
                      <div>
                        <h3>{detail.label}</h3>
                        <p>{detail.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {section.quote && (
                <blockquote className="memore-story-quote">
                  <p>{section.quote}</p>
                  {section.quoteSource && <cite>{section.quoteSource}</cite>}
                </blockquote>
              )}

              {section.sourceLink && (
                <p className="memore-story-source">
                  <a href={section.sourceLink.href} target="_blank" rel="noreferrer">
                    {section.sourceLink.label} ↗
                  </a>
                </p>
              )}

              {section.callout && <p className="memore-story-callout">{section.callout}</p>}

              {section.images && (
                <div
                  className={`memore-story-images memore-story-images-${section.imageLayout ?? "single"}`}
                >
                  {section.images.map((image) => (
                    <StoryImage image={image} locale={locale} key={image.src} />
                  ))}
                </div>
              )}
            </section>
          ))}

          <footer className="memore-story-closing">
            <span>{story.feature}</span>
            <p>{story.closing}</p>
          </footer>
        </article>

        <nav className="section memore-story-pagination" aria-label={copy.storyNavigation}>
          {previousStory ? (
            <Link
              to={`${storyPathPrefix}/${previousStory.slug}`}
              reloadDocument
            >
              <span>{copy.previous}</span>
              <strong>{previousStory.title}</strong>
            </Link>
          ) : (
            <Link to={`${memorePath}#stories`}>
              <span>{copy.back}</span>
              <strong>{copy.featuresAndStories}</strong>
            </Link>
          )}

          {nextStory ? (
            <Link
              to={`${storyPathPrefix}/${nextStory.slug}`}
              reloadDocument
            >
              <span>{copy.next}</span>
              <strong>{nextStory.title}</strong>
            </Link>
          ) : (
            <Link to={memorePath}>
              <span>{copy.back}</span>
              <strong>{copy.overview}</strong>
            </Link>
          )}
        </nav>
      </main>
    </div>
  );
}

export default MemoReStoryPage;
