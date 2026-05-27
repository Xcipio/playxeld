import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../hooks/useTheme";
import { fetchPublishedArtworks } from "../lib/artworks";
import { Artwork } from "../types/artwork";

function ArtPage() {
  const { theme, toggleTheme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const isEnglish = searchParams.get("lang") === "en";

  const setGalleryLanguage = (nextIsEnglish: boolean) => {
    const nextParams = new URLSearchParams(searchParams);

    if (nextIsEnglish) {
      nextParams.set("lang", "en");
    } else {
      nextParams.delete("lang");
    }

    setSearchParams(nextParams, { replace: true });
  };

  const pageCopy = isEnglish
    ? {
        backHome: "← Back to home",
        empty: "No published artworks yet.",
        label: "ART",
        backHomePath: "/en",
        title: "Gallery",
        subtitle:
          "A collection of my publicly released visual works, including standalone pieces, image series, and experimental visual projects.",
        viewArtwork: "View artwork →",
        languageToggle: "中文",
        languageLabel: "Switch gallery to Chinese",
      }
    : {
        backHome: "← Back to home",
        empty: "这里还没有已发布的图片作品。",
        label: "ART",
        backHomePath: "/",
        title: "图片创作",
        subtitle:
          "这里收录我目前公开发布的图片作品，包括单幅创作、系列图像和实验性视觉项目。",
        viewArtwork: "查看作品 →",
        languageToggle: "EN",
        languageLabel: "Switch gallery to English",
      };

  useEffect(() => {
    const loadArtworks = async () => {
      const { data, error } = await fetchPublishedArtworks();

      if (error) {
        console.error("Failed to fetch artworks:", error);
      } else {
        setArtworks(data ?? []);
      }

      setLoading(false);
    };

    loadArtworks();
  }, []);

  return (
    <div className="page art-page">
      <section className="section art-page-section">
        <div className="tag-page-topbar">
          <p className="tag-page-back">
            <Link to={pageCopy.backHomePath}>{pageCopy.backHome}</Link>
          </p>
          <div className="art-page-topbar-actions">
            <button
              className="theme-toggle art-language-toggle"
              onClick={() => setGalleryLanguage(!isEnglish)}
              type="button"
              aria-label={pageCopy.languageLabel}
            >
              {pageCopy.languageToggle}
            </button>
            <ThemeToggle
              theme={theme}
              onToggle={toggleTheme}
              locale={isEnglish ? "en" : "zh"}
            />
          </div>
        </div>

        <div className="art-page-hero">
          <p className="section-label">{pageCopy.label}</p>
          <h1 className="art-page-title">{pageCopy.title}</h1>
          <p className="art-page-subtitle">{pageCopy.subtitle}</p>
        </div>

        {loading ? (
          <div className="page-loading-placeholder" aria-hidden="true">
            <span />
          </div>
        ) : artworks.length === 0 ? (
          <p className="tag-page-empty">{pageCopy.empty}</p>
        ) : (
          <div className="art-grid">
            {artworks.map((artwork, index) => (
              <article
                key={artwork.id}
                className={`art-card ${index < 3 ? `art-card-pinned art-card-pinned-${index + 1}` : ""}`}
              >
                <Link to={`/art/${artwork.slug}`} className="art-card-image-link">
                  {index < 3 && (
                    <span className="art-card-pin-badge" aria-label="Pinned artwork">
                      <span className="art-card-pin-head" aria-hidden="true" />
                      <span className="art-card-pin-needle" aria-hidden="true" />
                    </span>
                  )}
                  <img
                    className="art-card-image"
                    src={artwork.cover_image_url}
                    alt={artwork.title}
                    loading="lazy"
                  />
                </Link>

                <div className="art-card-body">
                  <div className="art-card-meta">
                    {artwork.year && <span>{artwork.year}</span>}
                    {artwork.medium && <span>{artwork.medium}</span>}
                    {artwork.series && <span>{artwork.series}</span>}
                  </div>

                  <h2 className="art-card-title">
                    <Link to={`/art/${artwork.slug}`}>{artwork.title}</Link>
                  </h2>

                  {artwork.subtitle && (
                    <p className="art-card-subtitle">{artwork.subtitle}</p>
                  )}

                  <Link to={`/art/${artwork.slug}`} className="post-link art-card-link">
                    {pageCopy.viewArtwork}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ArtPage;
