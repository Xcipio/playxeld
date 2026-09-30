import { useEffect } from "react";
import type { CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import SiteTopbar from "../components/SiteTopbar";
import {
  getMemoReStory,
  memoreStories,
  MemoReStoryImage,
} from "../data/memoreStories";
import { useTheme } from "../hooks/useTheme";

const siteUrl = "https://playxeld.com";

function StoryImage({ image, eager = false }: { image: MemoReStoryImage; eager?: boolean }) {
  return (
    <figure className="memore-story-figure">
      <a
        href={image.src}
        target="_blank"
        rel="noreferrer"
        aria-label={`打开原图：${image.caption}`}
      >
        <img src={image.src} alt={image.alt} loading={eager ? "eager" : "lazy"} />
      </a>
      <figcaption>{image.caption}</figcaption>
    </figure>
  );
}

function MemoReStoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const story = getMemoReStory(slug);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!story) {
      return;
    }

    const previousTitle = document.title;
    const previousLanguage = document.documentElement.lang;
    const canonicalUrl = `${siteUrl}/memore/stories/${story.slug}`;
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
    document.documentElement.lang = "zh-CN";
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
  }, [story]);

  if (!story) {
    return (
      <div className="page memore-page memore-story-page">
        <header className="hero memore-site-hero">
          <SiteTopbar locale="zh" theme={theme} onThemeToggle={toggleTheme} />
        </header>
        <main className="section memore-story-not-found">
          <p className="section-label">MEMORE</p>
          <h1>没有找到这篇故事</h1>
          <Link className="memore-primary-link" to="/memore#stories">
            返回功能与故事
          </Link>
        </main>
      </div>
    );
  }

  const storyIndex = memoreStories.findIndex((entry) => entry.slug === story.slug);
  const previousStory = storyIndex > 0 ? memoreStories[storyIndex - 1] : null;
  const nextStory =
    storyIndex < memoreStories.length - 1 ? memoreStories[storyIndex + 1] : null;
  const accentStyle = { "--story-accent": story.accent } as CSSProperties;

  return (
    <div className="page memore-page memore-story-page" style={accentStyle}>
      <header className="hero memore-site-hero">
        <SiteTopbar locale="zh" theme={theme} onThemeToggle={toggleTheme} />
      </header>

      <main>
        <section className="section memore-story-hero">
          <div className="memore-story-hero-copy">
            <nav className="memore-story-breadcrumb" aria-label="面包屑导航">
              <Link to="/memore">MemoRe</Link>
              <span aria-hidden="true">/</span>
              <Link to="/memore#stories">功能与故事</Link>
            </nav>
            <div className="memore-story-meta">
              <span>{story.category}</span>
              <span>{story.kind}</span>
              <span>{story.feature}</span>
            </div>
            <h1>{story.title}</h1>
            <p>{story.summary}</p>
          </div>

          <StoryImage image={story.cover} eager />
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
                  aria-label="苹果、橘子、香蕉、西瓜、葡萄、蓝莓、草莓、菠萝、猕猴桃、甜瓜、梨、芒果、桃、樱桃、柠檬、青苹果、椰子和青柠"
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
                    <StoryImage image={image} key={image.src} />
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

        <nav className="section memore-story-pagination" aria-label="MemoRe 故事导航">
          {previousStory ? (
            <Link to={`/memore/stories/${previousStory.slug}`}>
              <span>上一篇</span>
              <strong>{previousStory.title}</strong>
            </Link>
          ) : (
            <Link to="/memore#stories">
              <span>返回</span>
              <strong>功能与故事</strong>
            </Link>
          )}

          {nextStory ? (
            <Link to={`/memore/stories/${nextStory.slug}`}>
              <span>下一篇</span>
              <strong>{nextStory.title}</strong>
            </Link>
          ) : (
            <Link to="/memore">
              <span>返回</span>
              <strong>MemoRe 产品总览</strong>
            </Link>
          )}
        </nav>
      </main>
    </div>
  );
}

export default MemoReStoryPage;
