import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentsSection from "../components/CommentsSection";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../hooks/useTheme";
import { fetchPublishedFriendArticleBySlug } from "../lib/friendArticles";
import { getTagStyle, sortTags } from "../lib/tags";
import { FriendArticle } from "../types/friendArticle";

const PostContent = lazy(() => import("../components/PostContent"));

function FriendArticlePage() {
  const { slug } = useParams();
  const { theme, toggleTheme } = useTheme();
  const [article, setArticle] = useState<FriendArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      const { data, error } = await fetchPublishedFriendArticleBySlug(slug);

      if (error) {
        console.error("Failed to fetch friend article:", error);
      } else {
        setArticle(data ?? null);
      }

      setLoading(false);
    };

    void loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="page post-page">
        <section className="section post-page-section">
          <div className="page-loading-placeholder" aria-hidden="true">
            <span />
          </div>
        </section>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="page post-page">
        <section className="section post-page-section">
          <div className="tag-page-topbar">
            <p className="tag-page-back">
              <Link to="/friends">← 返回 Friends</Link>
            </p>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>

          <p>文章不存在。</p>
        </section>
      </div>
    );
  }

  return (
    <div className="page post-page">
      <section className="section post-page-section">
        <div className="tag-page-topbar">
          <p className="tag-page-back">
            <Link to="/friends">← 返回 Friends</Link>
          </p>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        <article className="post-detail-shell">
          <header className="post-detail-hero post-detail-enter-hero">
            <p className="section-label">STORY</p>
            <h1 className="post-detail-title">{article.title}</h1>

            <div className="post-detail-intro">
              <p className="post-detail-excerpt">{article.excerpt}</p>

              <div className="post-detail-meta-row friend-article-meta-row">
                <div className="friend-article-meta-primary">
                  <div className="post-detail-date-badge">
                    {new Date(article.published_at).toLocaleDateString()}
                  </div>
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
                    <span className="friends-author-chip">{article.author_name}</span>
                  </div>
                </div>

                {article.tags.length > 0 && (
                  <div className="post-detail-tags">
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

              {article.author_profile && (
                <aside className="friend-article-author-spotlight">
                  <div className="friend-article-author-card-top">
                    <p className="friend-article-author-label">作者简介</p>
                    <span className="friend-article-author-role">CONTRIBUTOR</span>
                  </div>

                  <div className="friend-article-author-card-body">
                    {article.author_avatar_url ? (
                      <img
                        className="friend-article-author-avatar"
                        src={article.author_avatar_url}
                        alt={article.author_name}
                        loading="lazy"
                      />
                    ) : (
                      <span className="friend-article-author-avatar friend-article-author-avatar-fallback">
                        友
                      </span>
                    )}

                    <div className="friend-article-author-copy">
                      <h2 className="friend-article-author-name">{article.author_name}</h2>
                      <p className="friend-article-author-bio">{article.author_profile}</p>
                      {(article.author_homepage_url || article.author_social_url) && (
                        <div className="friend-article-author-actions">
                          {article.author_homepage_url && (
                            <a
                              className="friend-article-author-link"
                              href={article.author_homepage_url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              作者主页
                            </a>
                          )}
                          {article.author_social_url && (
                            <a
                              className="friend-article-author-link"
                              href={article.author_social_url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {article.author_social_label?.trim() || "社交主页"}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </aside>
              )}
            </div>
          </header>

          <div className="post-detail-body post-detail-enter-body">
            <Suspense fallback={<p className="post-detail-loading">内容加载中...</p>}>
              <PostContent content={article.content} />
            </Suspense>

            <div className="friend-article-more">
              <Link className="friend-article-more-link" to="/friends">
                更多投稿 →
              </Link>
            </div>
          </div>
        </article>

        <CommentsSection
          postSlug={article.slug}
          postTitle={article.title}
          variant="friends"
        />
      </section>
    </div>
  );
}

export default FriendArticlePage;
