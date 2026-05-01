import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../hooks/useTheme";
import { fetchPublishedFriendArticles } from "../lib/friendArticles";
import { getTagStyle, sortTags } from "../lib/tags";
import { FriendArticle } from "../types/friendArticle";

function FriendsPage() {
  const { theme, toggleTheme } = useTheme();
  const [articles, setArticles] = useState<FriendArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      const { data, error } = await fetchPublishedFriendArticles();

      if (error) {
        console.error("Failed to fetch friend articles:", error);
      } else {
        setArticles(data ?? []);
      }

      setLoading(false);
    };

    void loadArticles();
  }, []);

  const featuredArticle = articles[0] ?? null;
  const remainingArticles = featuredArticle ? articles.slice(1) : [];

  return (
    <div className="page friends-page">
      <section className="section friends-page-section">
        <div className="tag-page-topbar">
          <p className="tag-page-back">
            <Link to="/">← 返回主页</Link>
          </p>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        <div className="friends-page-hero">
          <div className="friends-page-hero-copy">
            <p className="section-label">FRIENDS</p>
            <h1 className="tag-page-title">投稿</h1>
            <p className="tag-page-description">
              这里收录朋友们投稿到 Playxeld 的文章。
            </p>
            <p className="tag-page-subtitle">
              当前共公开 {articles.length}{" "}
              篇投稿文章。这里适合放客座写作、联动专题和朋友的长期专栏。
            </p>
          </div>

          <div className="friends-page-hero-side">
            <p className="friends-page-hero-side-label">Editorial Note</p>
            <p className="friends-page-hero-side-text">
              ’Tis the last rose of summer <br />
              Left blooming alone <br />
              All her lovely companions <br />
              Are faded and gone <br />
              No flower of her kindred <br />
              No rosebud is nigh <br />
              To reflect back her blushes <br />
              Or give sigh for sigh <br />
            </p>
          </div>
        </div>

        {loading ? (
          <div className="page-loading-placeholder" aria-hidden="true">
            <span />
          </div>
        ) : articles.length === 0 ? (
          <div className="friends-page-empty-card">
            <p className="friends-page-empty-label">Coming Soon</p>
            <h2 className="friends-page-empty-title">专栏入口已经就位</h2>
            <p className="friends-page-empty-text">
              第一篇朋友投稿上线后，这里会自动显示文章列表和详情入口。
            </p>
          </div>
        ) : (
          <>
            {featuredArticle && (
              <article className="tag-page-featured-card">
                <div className="tag-page-featured-copy">
                  <p className="tag-page-featured-label">Your Story</p>
                  <h2 className="tag-page-featured-title">
                    <Link to={`/friends/${featuredArticle.slug}`}>
                      {featuredArticle.title}
                    </Link>
                  </h2>
                  <p className="tag-page-featured-excerpt">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="tag-page-featured-actions">
                    <Link
                      to={`/friends/${featuredArticle.slug}`}
                      className="post-link"
                    >
                      阅读全文 →
                    </Link>
                  </div>
                </div>

                <div className="tag-page-featured-meta">
                  <p className="tag-page-featured-date">
                    {new Date(
                      featuredArticle.published_at,
                    ).toLocaleDateString()}
                  </p>
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
                        友
                      </span>
                    )}
                    <span className="friends-author-chip">
                      作者：{featuredArticle.author_name}
                    </span>
                  </div>
                  {featuredArticle.tags.length > 0 && (
                    <div className="tag-page-featured-tags">
                      {sortTags(featuredArticle.tags).map((tag) => (
                        <span
                          key={`${featuredArticle.id}-${tag}`}
                          className="hero-tag-button friends-tag-chip"
                          style={getTagStyle(tag, theme)}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            )}

            <div className="posts-grid friends-page-grid">
              {remainingArticles.map((article) => (
                <article
                  key={article.id}
                  className="post-card friends-page-card"
                >
                  <div className="post-meta">
                    {new Date(article.published_at).toLocaleDateString()}
                  </div>

                  <h2 className="post-title">
                    <Link to={`/friends/${article.slug}`}>{article.title}</Link>
                  </h2>

                  <p className="post-excerpt">{article.excerpt}</p>

                  <div className="friends-card-meta">
                    <div className="friends-author-summary">
                      {article.author_avatar_url ? (
                        <img
                          className="friends-author-avatar"
                          src={article.author_avatar_url}
                          alt={article.author_name}
                          loading="lazy"
                        />
                      ) : (
                        <span className="friends-author-avatar friends-author-avatar-fallback">
                          友
                        </span>
                      )}
                      <span className="friends-author-chip">
                        作者：{article.author_name}
                      </span>
                    </div>
                    {article.tags.length > 0 && (
                      <div className="friends-tag-row">
                        {sortTags(article.tags).map((tag) => (
                          <span
                            key={`${article.id}-${tag}`}
                            className="hero-tag-button friends-tag-chip"
                            style={getTagStyle(tag, theme)}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link to={`/friends/${article.slug}`} className="post-link">
                    阅读全文 →
                  </Link>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default FriendsPage;
