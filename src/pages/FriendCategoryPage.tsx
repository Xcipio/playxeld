import { useI18n } from "../hooks/useI18n";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Link from "../components/LocalizedLink";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../hooks/useTheme";
import {
  friendArticleCategoryMeta,
  getFriendArticleCategoryBySlug,
  getFriendArticleCategoryPath,
  inferFriendArticleCategory,
} from "../lib/friendArticleCategories";
import { fetchPublishedFriendArticles } from "../lib/friendArticles";
import { getTagStyle, sortTags } from "../lib/tags";
import { FriendArticle } from "../types/friendArticle";

function FriendCategoryPage() {
  const { t, dateLocale } = useI18n();
  const { categorySlug } = useParams();
  const { theme, toggleTheme } = useTheme();
  const [articles, setArticles] = useState<FriendArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const category = getFriendArticleCategoryBySlug(categorySlug);

  useEffect(() => {
    const loadArticles = async () => {
      if (!category) {
        setLoading(false);
        return;
      }

      const { data, error } = await fetchPublishedFriendArticles();

      if (error) {
        console.error("Failed to fetch friend articles:", error);
      } else {
        setArticles(
          (data ?? []).filter(
            (article) => inferFriendArticleCategory(article) === category,
          ),
        );
      }

      setLoading(false);
    };

    void loadArticles();
  }, [category]);

  if (!category) {
    return (
      <div className="page friends-page">
        <section className="section friends-page-section">
          <div className="tag-page-topbar">
            <p className="tag-page-back">
              <Link to="/friends">{t("← 返回 Friends")}</Link>
            </p>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
          <p>{t("栏目不存在。")}</p>
        </section>
      </div>
    );
  }

  const meta = friendArticleCategoryMeta[category];
  const featuredArticle = articles[0] ?? null;
  const remainingArticles = featuredArticle ? articles.slice(1) : [];

  return (
    <div className="page friends-page">
      <section className="section friends-page-section">
        <div className="tag-page-topbar">
          <p className="tag-page-back">
            <Link to="/friends">{t("← 返回 Friends")}</Link>
          </p>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        <div className="friends-page-hero friends-category-hero">
          <div className="friends-page-hero-copy">
            <p className="section-label">{t(meta.englishLabel)}</p>
            <h1 className="tag-page-title">{t(meta.title)}</h1>
            <p className="tag-page-description">{t(meta.description)}</p>
            <p className="tag-page-subtitle">
              {t("当前这个栏目共有")}{articles.length} {t("篇公开文章。")}</p>
          </div>

          <div className="friends-category-nav-card">
            <p className="friends-page-overview-label">{t("Category Index")}</p>
            <div className="friends-category-nav-list">
              {Object.entries(friendArticleCategoryMeta).map(
                ([entryCategory, entryMeta]) => (
                  <Link
                    key={entryCategory}
                    className={`friends-category-nav-link ${
                      entryCategory === category ? "active" : ""
                    }`}
                    to={getFriendArticleCategoryPath(entryCategory as typeof category)}
                  >
                    <span>{t(entryMeta.title)}</span>
                    <span>{t(entryMeta.englishLabel)}</span>
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="page-loading-placeholder" aria-hidden="true">
            <span />
          </div>
        ) : featuredArticle ? (
          <div className="friends-category-layout">
            <article className="friends-category-featured-card">
              <div className="friends-column-featured-top">
                <span className="friend-article-category-link">
                  <span
                    className="friend-article-category-mark"
                    aria-hidden="true"
                  />
                  {t(category)}
                </span>
                <span className="friends-column-featured-date">
                  {new Date(featuredArticle.published_at).toLocaleDateString(dateLocale)}
                </span>
              </div>

              <h2 className="friends-column-featured-title">
                <Link to={`/friends/${featuredArticle.slug}`}>
                  {featuredArticle.title}
                </Link>
              </h2>

              {featuredArticle.excerpt && (
                <p className="friends-column-featured-excerpt">
                  {featuredArticle.excerpt}
                </p>
              )}

              <div className="friends-card-meta">
                <div className="friends-author-summary">
                  {featuredArticle.author_avatar_url ? (
                    <img
                      className="friends-author-avatar"
                      src={featuredArticle.author_avatar_url}
                      alt={featuredArticle.author_name}
                      loading="lazy"
                    />
                  ) : (
                    <span className="friends-author-avatar friends-author-avatar-fallback">
                      {t("友")}</span>
                  )}
                  <span className="friends-author-chip">
                    {t("作者：")}{featuredArticle.author_name}
                  </span>
                </div>
                {featuredArticle.tags.length > 0 && (
                  <div className="friends-tag-row">
                    {sortTags(featuredArticle.tags).map((tag) => (
                      <span
                        key={`${featuredArticle.id}-${tag}`}
                        className="hero-tag-button friends-tag-chip"
                        style={getTagStyle(tag, theme)}
                      >
                        {t(tag)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>

            <div className="friends-category-list">
              {remainingArticles.map((article) => (
                <article key={article.id} className="friends-column-compact-card">
                  <div className="friends-column-compact-meta">
                    <span>{new Date(article.published_at).toLocaleDateString(dateLocale)}</span>
                    <span>{article.author_name}</span>
                  </div>

                  <h3 className="friends-column-compact-title">
                    <Link to={`/friends/${article.slug}`}>{article.title}</Link>
                  </h3>

                  {article.excerpt && (
                    <p className="friends-column-compact-excerpt">
                      {article.excerpt}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="friends-page-empty-card">
            <p className="friends-page-empty-label">{t("Empty Column")}</p>
            <h2 className="friends-page-empty-title">{t(meta.emptyTitle)}</h2>
            <p className="friends-page-empty-text">{t(meta.emptyDescription)}</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default FriendCategoryPage;
