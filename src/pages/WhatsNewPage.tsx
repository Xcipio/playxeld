import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SiteTopbar from "../components/SiteTopbar";
import {
  whatsNewProjects,
  type WhatsNewLocale,
  type WhatsNewProject,
} from "../data/whatsNewProjects";
import { useTheme } from "../hooks/useTheme";

const canonicalUrl = "https://playxeld.com/whats-new";
const socialImageUrl =
  "https://playxeld.com/whats-new/memore/app-icon.png";

const pageCopy = {
  zh: {
    title: "What's New",
    description:
      "最近完成、刚上线，或仍在慢慢打磨的作品，都放在这里。",
    featured: "Featured Project",
    type: "App",
    highlights: "它正在做什么",
    screenshots: "Inside MemoRe",
    openScreenshot: "打开原尺寸截图",
    projectDetails: "项目信息",
    projectIcon: (title: string) => `${title} App 图标`,
    screenCount: (count: number) => `${count} 张界面`,
    status: {
      "in-development": "开发中",
      beta: "测试中",
      released: "已发布",
    },
    metadataDescription:
      "Playxeld 最近开发、发布和推进中的 App、游戏与创作项目。",
  },
  en: {
    title: "What's New",
    description:
      "Recent work: things just released, still in the making, and worth sharing.",
    featured: "Featured Project",
    type: "App",
    highlights: "What it does",
    screenshots: "Inside MemoRe",
    openScreenshot: "Open full-size screenshot",
    projectDetails: "Project details",
    projectIcon: (title: string) => `${title} app icon`,
    screenCount: (count: number) => `${count} screens`,
    status: {
      "in-development": "In Development",
      beta: "Beta",
      released: "Released",
    },
    metadataDescription:
      "Latest apps, games and creative projects from Playxeld.",
  },
} as const;

function ProjectShowcase({
  project,
  locale,
}: {
  project: WhatsNewProject;
  locale: WhatsNewLocale;
}) {
  const copy = pageCopy[locale];

  return (
    <article className="whats-new-project-card">
      <div className="whats-new-project-copy">
        <p className="whats-new-featured-label">{copy.featured}</p>

        <div className="whats-new-project-identity">
          <img
            className="whats-new-project-icon"
            src={project.iconSrc}
            alt={copy.projectIcon(project.title)}
            width="1024"
            height="1024"
          />
          <div>
            <p className="whats-new-project-kind">
              {project.platforms.join(" · ")} · {copy.type}
            </p>
            <h2 className="whats-new-project-title">{project.title}</h2>
          </div>
        </div>

        <p className="whats-new-project-tagline">
          {project.tagline[locale]}
        </p>
        <p className="whats-new-project-summary">
          {project.summary[locale]}
        </p>

        <ul
          className="whats-new-project-meta"
          aria-label={copy.projectDetails}
        >
          {project.platforms.map((platform) => (
            <li key={platform}>{platform}</li>
          ))}
          <li>{copy.type}</li>
          <li className="whats-new-status">
            <span aria-hidden="true" />
            {copy.status[project.status]}
          </li>
        </ul>

        {project.highlights && project.highlights.length > 0 && (
          <div className="whats-new-highlights">
            <h3>{copy.highlights}</h3>
            <ul>
              {project.highlights.map((highlight, index) => (
                <li key={`${project.id}-highlight-${index}`}>
                  <span aria-hidden="true">0{index + 1}</span>
                  <p>{highlight[locale]}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.links && project.links.length > 0 && (
          <div className="whats-new-project-links">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.label[locale]} ↗
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="whats-new-project-visual">
        <div className="whats-new-screenshot-heading">
          <p>{copy.screenshots}</p>
          <span>{copy.screenCount(project.screenshots.length)}</span>
        </div>
        <div className="whats-new-screenshot-grid">
          {project.screenshots.map((screenshot, index) => (
            <a
              key={screenshot.src}
              className="whats-new-screenshot-link"
              href={screenshot.src}
              target="_blank"
              rel="noreferrer"
              aria-label={`${copy.openScreenshot}: ${screenshot.alt[locale]}`}
            >
              <img
                src={screenshot.src}
                alt={screenshot.alt[locale]}
                width="900"
                height="1947"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

function WhatsNewPage() {
  const [searchParams] = useSearchParams();
  const locale: WhatsNewLocale =
    searchParams.get("lang") === "en" ? "en" : "zh";
  const { theme, toggleTheme } = useTheme();
  const copy = pageCopy[locale];
  const featuredProjects = whatsNewProjects.filter(
    (project) => project.featured,
  );

  useEffect(() => {
    const previousTitle = document.title;
    const previousLanguage = document.documentElement.lang;
    const metadataUpdates = [
      ["meta[name='description']", "content", copy.metadataDescription],
      ["meta[property='og:type']", "content", "website"],
      ["meta[property='og:title']", "content", "What's New | Playxeld"],
      [
        "meta[property='og:description']",
        "content",
        copy.metadataDescription,
      ],
      ["meta[property='og:image']", "content", socialImageUrl],
      ["meta[property='og:url']", "content", canonicalUrl],
      ["meta[name='twitter:card']", "content", "summary"],
      ["meta[name='twitter:title']", "content", "What's New | Playxeld"],
      [
        "meta[name='twitter:description']",
        "content",
        copy.metadataDescription,
      ],
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

    document.title = "What's New | Playxeld";
    document.documentElement.lang = locale === "en" ? "en" : "zh-CN";
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
  }, [copy.metadataDescription, locale]);

  return (
    <div className="page whats-new-page">
      <header className="hero whats-new-site-hero">
        <SiteTopbar
          locale={locale}
          theme={theme}
          onThemeToggle={toggleTheme}
        />
      </header>

      <main className="section whats-new-page-section">
        <header className="whats-new-page-intro">
          <p className="section-label">NOW AT PLAYXELD</p>
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
        </header>

        <section aria-label={copy.featured}>
          {featuredProjects.map((project) => (
            <ProjectShowcase
              key={project.id}
              project={project}
              locale={locale}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default WhatsNewPage;
