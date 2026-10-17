import { useI18n } from "../hooks/useI18n";
import { useParams, useSearchParams } from "react-router-dom";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Link from "../components/LocalizedLink";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import CommentsSection from "../components/CommentsSection";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../hooks/useTheme";
import { sendLikeNotification } from "../lib/notifications";
import {
  activatePostLike,
  deactivatePostLike,
  fetchPostLikeCount,
  fetchPostLikeState,
} from "../lib/postLikes";
import {
  fetchPublishedPostBySlug,
  fetchPublishedPosts,
  fetchPublishedPostTranslation,
} from "../lib/posts";
import { getPostTags, getTagStyle } from "../lib/tags";
import { Post } from "../types/post";

const PostContent = lazy(() => import("../components/PostContent"));
const READ_COMPLETE_STORAGE_KEY = "post-read-complete";

function PostPage({ language: sourceLanguage = "zh" }: { language?: "zh" | "en" }) {
  const { t, dateLocale, locale } = useI18n();
  const [searchParams] = useSearchParams();
  const language = locale === "ja" && searchParams.get("content") === "en" ? "en" : sourceLanguage;
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [alternatePost, setAlternatePost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasCompletedReading, setHasCompletedReading] = useState(false);
  const [hasLikedPost, setHasLikedPost] = useState(false);
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [likeUpdating, setLikeUpdating] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const [showMobileBackToTop, setShowMobileBackToTop] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [previousPost, setPreviousPost] = useState<Post | null>(null);
  const [nextPost, setNextPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const postBodyRef = useRef<HTMLDivElement | null>(null);
  const postContentRef = useRef<HTMLDivElement | null>(null);
  const headingElementsRef = useRef<HTMLElement[]>([]);
  const { theme, toggleTheme } = useTheme();
  const isEnglish = language === "en";
  const uiText = {
    loading: isEnglish ? t("Loading...") : t("Loading..."),
    notFound: isEnglish ? t("Post not found.") : t("文章不存在。"),
    backHome: isEnglish ? t("← Back to home") : t("← 返回首页"),
    shareOpened: isEnglish ? t("Share sheet opened") : t("已调起分享"),
    copied: isEnglish ? t("Link copied") : t("链接已复制"),
    shareFailed: isEnglish ? t("Unable to share right now") : t("暂时无法分享"),
    loadingContent: isEnglish ? t("Loading content...") : t("内容加载中..."),
    readDone: isEnglish ? t("Marked as read") : t("已读完"),
    readAction: isEnglish ? t("Mark as read") : t("读完了"),
    likeAction: isEnglish ? t("Like") : t("喜欢"),
    likedAction: isEnglish ? t("Liked") : t("已喜欢"),
    shareArticle: isEnglish ? t("Share article") : t("分享文章"),
    backToTop: isEnglish ? t("Top") : t("顶部"),
    continueLabel: isEnglish ? t("NEXT") : t("NEXT"),
    continueReading: isEnglish ? t("Continue Reading") : t("继续阅读"),
    previousPost: isEnglish ? t("Previous Post") : t("上一篇"),
    nextPost: isEnglish ? t("Next Post") : t("下一篇"),
    relatedPosts: isEnglish ? t("Related Posts") : t("相关文章"),
  };
  const currentPostUrl = `${window.location.origin}${window.location.pathname}${window.location.search}`;

  useEffect(() => {
    if (locale === "ja" && post) document.title = `${post.title} | Playxeld`;
  }, [locale, post]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setPost(null);
    const fetchPost = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      setAlternatePost(null);

      const { data, error } = await fetchPublishedPostBySlug(slug, language);
      if (!active) return;

      if (error) {
        console.error("Failed to fetch post:", error);
      } else {
        setPost(data);

        if (data) {
          const { data: allPosts, error: allPostsError } = await fetchPublishedPosts(language);
          if (!active) return;

          if (allPostsError) {
            console.error("Failed to fetch surrounding posts:", allPostsError);
            setPreviousPost(null);
            setNextPost(null);
            setRelatedPosts([]);
          } else {
            const orderedPosts = allPosts ?? [];
            const currentIndex = orderedPosts.findIndex(
              (candidate) => candidate.slug === data.slug,
            );
            const currentTags = getPostTags(data);

            setPreviousPost(
              currentIndex > 0 ? orderedPosts[currentIndex - 1] : null,
            );
            setNextPost(
              currentIndex >= 0 && currentIndex < orderedPosts.length - 1
                ? orderedPosts[currentIndex + 1]
                : null,
            );

            const related = orderedPosts
              .filter((candidate) => candidate.slug !== data.slug)
              .map((candidate) => ({
                post: candidate,
                score: getPostTags(candidate).filter((tag) => currentTags.includes(tag)).length,
              }))
              .filter(({ score }) => score > 0)
              .sort((left, right) => {
                if (right.score !== left.score) {
                  return right.score - left.score;
                }

                return (
                  new Date(right.post.published_at).getTime() -
                  new Date(left.post.published_at).getTime()
                );
              })
              .slice(0, 1)
              .map(({ post: candidate }) => candidate);

            setRelatedPosts(related);
          }

          if (data.translation_group) {
            const targetLanguage = language === "zh" ? "en" : "zh";
            const { data: translationData, error: translationError } =
              await fetchPublishedPostTranslation(data.translation_group, targetLanguage);
            if (!active) return;

            if (translationError) {
              console.error("Failed to fetch translated post:", translationError);
            } else {
              setAlternatePost(translationData ?? null);
            }
          } else {
            setAlternatePost(null);
          }
        } else {
          setPreviousPost(null);
          setNextPost(null);
          setRelatedPosts([]);
          setAlternatePost(null);
        }
      }

      setLoading(false);
    };

    void fetchPost();
    return () => { active = false; };
  }, [slug, language]);

  useEffect(() => {
    const syncInteractionState = async () => {
      if (!slug) {
        setHasCompletedReading(false);
        setHasLikedPost(false);
        setLikeCount(null);
        return;
      }

      const stored = window.localStorage.getItem(READ_COMPLETE_STORAGE_KEY);
      const completedMap = stored ? (JSON.parse(stored) as Record<string, boolean>) : {};
      setHasCompletedReading(Boolean(completedMap[slug]));

      const [
        { data: likeState, error: likeStateError },
        { count, error: likeCountError },
      ] = await Promise.all([
        fetchPostLikeState(slug),
        fetchPostLikeCount(slug),
      ]);

      if (likeStateError) {
        console.error("Failed to fetch like state:", likeStateError);
      } else {
        setHasLikedPost(Boolean(likeState?.is_active));
      }

      if (likeCountError) {
        console.error("Failed to fetch like count:", likeCountError);
      } else {
        setLikeCount(count ?? 0);
      }
    };

    void syncInteractionState();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const isMobileViewport = window.innerWidth <= 768;
      if (!isMobileViewport) {
        setShowMobileBackToTop(false);
        return;
      }

      const postBodyBottom = postBodyRef.current?.getBoundingClientRect().bottom;
      if (!postBodyBottom) {
        setShowMobileBackToTop(false);
        return;
      }

      const hasReachedPostEnd = postBodyBottom <= window.innerHeight - 16;

      setShowMobileBackToTop(hasReachedPostEnd);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [post]);

  useEffect(() => {
    const content = postContentRef.current;
    if (!content) {
      return;
    }

    let mutationObserver: MutationObserver | null = null;

    const collectHeadings = () => {
      headingElementsRef.current = Array.from(
        content.querySelectorAll<HTMLElement>("h2[id], h3[id]"),
      );
      return headingElementsRef.current.length > 0;
    };

    if (!collectHeadings()) {
      mutationObserver = new MutationObserver(() => {
        if (collectHeadings()) {
          mutationObserver?.disconnect();
          mutationObserver = null;
        }
      });

      mutationObserver.observe(content, { childList: true, subtree: true });
    }

    return () => {
      mutationObserver?.disconnect();
    };
  }, [post?.slug, language]);

  useEffect(() => {
    const updateReadingFeedback = () => {
      const content = postContentRef.current;
      if (!content) {
        return;
      }

      const rect = content.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progressStart = viewportHeight * 0.22;
      const progressRange = Math.max(rect.height - viewportHeight * 0.44, 1);
      const nextProgress = Math.min(
        1,
        Math.max(0, (progressStart - rect.top) / progressRange),
      );

      setReadingProgress((current) =>
        Math.abs(current - nextProgress) > 0.01 ? nextProgress : current,
      );

      const activationLine = viewportHeight * 0.28;
      let activeHeadingId = "";

      headingElementsRef.current.forEach((heading) => {
        if (heading.getBoundingClientRect().top <= activationLine) {
          activeHeadingId = heading.id;
        }
      });

      headingElementsRef.current.forEach((heading) => {
        heading.classList.toggle("is-active", heading.id === activeHeadingId);
      });
    };

    updateReadingFeedback();
    window.addEventListener("scroll", updateReadingFeedback, { passive: true });
    window.addEventListener("resize", updateReadingFeedback);

    return () => {
      window.removeEventListener("scroll", updateReadingFeedback);
      window.removeEventListener("resize", updateReadingFeedback);
    };
  }, [post?.slug, language]);

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

  if (!post) {
    return (
      <div className="page post-page">
        <section className="section post-page-section">
          <div className="tag-page-topbar">
            <p className="tag-page-back">
              <Link to={isEnglish ? "/en" : "/"}>{uiText.backHome}</Link>
            </p>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>

          <p>{uiText.notFound}</p>
        </section>
      </div>
    );
  }

  const postTags = getPostTags(post);

  const handleCompleteReading = () => {
    if (!slug) {
      return;
    }

    const stored = window.localStorage.getItem(READ_COMPLETE_STORAGE_KEY);
    const completedMap = stored ? (JSON.parse(stored) as Record<string, boolean>) : {};
    completedMap[slug] = true;
    window.localStorage.setItem(READ_COMPLETE_STORAGE_KEY, JSON.stringify(completedMap));
    setHasCompletedReading(true);
  };

  const handleToggleLike = async () => {
    if (!slug || !post) {
      return;
    }

    const nextLikedState = !hasLikedPost;
    const previousLikedState = hasLikedPost;
    const previousLikeCount = likeCount ?? 0;

    setHasLikedPost(nextLikedState);
    setLikeCount(Math.max(0, previousLikeCount + (nextLikedState ? 1 : -1)));
    setLikeUpdating(true);

    if (nextLikedState) {
      const { error } = await activatePostLike(slug);

      if (error) {
        console.error("Failed to activate like:", error);
        setHasLikedPost(previousLikedState);
        setLikeCount(previousLikeCount);
        setLikeUpdating(false);
        return;
      }
    } else {
      const { error } = await deactivatePostLike(slug);

      if (error) {
        console.error("Failed to deactivate like:", error);
        setHasLikedPost(previousLikedState);
        setLikeCount(previousLikeCount);
        setLikeUpdating(false);
        return;
      }
    }

    setLikeUpdating(false);

    if (nextLikedState) {
      void sendLikeNotification({
        postSlug: post.slug,
        postTitle: post.title,
        postUrl: currentPostUrl,
        language,
      }).then(({ error }) => {
        if (error) {
          console.error("Failed to send like notification:", error);
        }
      });
    }
  };

  const handleShareArticle = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.excerpt ?? post.title,
          url: currentPostUrl,
        });
        setShareFeedback(uiText.shareOpened);
        return;
      }

      await navigator.clipboard.writeText(currentPostUrl);
      setShareFeedback(uiText.copied);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      try {
        await navigator.clipboard.writeText(currentPostUrl);
        setShareFeedback(uiText.copied);
      } catch {
        setShareFeedback(uiText.shareFailed);
      }
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getPostPath = (targetPost: Post) =>
    targetPost.language === "en" ? `/en/post/${targetPost.slug}` : `/post/${targetPost.slug}`;

  return (
    <div className={`page post-page ${isEnglish ? "post-page-en" : "post-page-zh"}`}>
      <div className="post-reading-rail" aria-hidden="true">
        <div
          className="post-reading-rail-progress"
          style={{ transform: `scaleY(${readingProgress})` }}
        />
      </div>

      <section className="section post-page-section">
        <div className="tag-page-topbar">
          <div className="article-topbar-nav">
            <Link
              className="article-home-button"
              to={isEnglish ? "/en" : "/"}
              aria-label={isEnglish ? t("Back to home") : t("返回主页")}
            >
              <svg
                aria-hidden="true"
                className="article-home-icon"
                viewBox="0 0 24 24"
              >
                <path d="M4.5 10.8 12 4.6l7.5 6.2" />
                <path d="M6.8 9.7v8.5h10.4V9.7" />
              </svg>
            </Link>
            <p className="tag-page-back">
              <Link to={isEnglish ? "/en" : "/"}>{uiText.backHome}</Link>
            </p>
          </div>
          <div className="post-detail-topbar-actions">
            <LanguageSwitcher alternates={{
              zh: post.language === "zh" ? `/post/${post.slug}` : alternatePost ? `/post/${alternatePost.slug}` : "/",
              en: post.language === "en" ? `/en/post/${post.slug}` : alternatePost ? `/en/post/${alternatePost.slug}` : "/en",
              ja: `/ja/post/${post.slug}${post.language === "en" ? "?content=en" : ""}`,
            }} />
            <ThemeToggle
              theme={theme}
              onToggle={toggleTheme}
              locale={language === "en" ? "en" : "zh"}
              showLanguages={false}
            />
          </div>
        </div>

        <article className="post-detail-shell">
          {locale === "ja" && <p className="original-language-note">本文は{language === "en" ? "英語" : "中国語"}の原文で表示しています。</p>}
          <header className="post-detail-hero post-detail-enter-hero">
            <p className="section-label">{t("ESSAY")}</p>
            <h1 className="post-detail-title">{post.title}</h1>

            <div className="post-detail-intro">
              {post.excerpt && <p className="post-detail-excerpt">{post.excerpt}</p>}

              <div className="post-detail-meta-row">
                <div className="post-detail-date-badge">
                  {new Date(post.published_at).toLocaleDateString(dateLocale)}
                </div>

                {postTags.length > 0 && (
                  <div className="post-detail-tags">
                    {postTags.map((tag) => (
                      <Link
                        key={`${post.id}-${tag}`}
                        className="post-tag-badge"
                        style={getTagStyle(tag, theme)}
                        to={`/tag/${encodeURIComponent(tag)}`}
                      >
                        {t(tag)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="post-detail-body post-detail-enter-body" ref={postBodyRef}>
            <div ref={postContentRef} lang={language === "en" ? "en" : "zh-CN"}>
              <Suspense fallback={<p className="post-detail-loading">{uiText.loadingContent}</p>}>
                <PostContent content={post.content} />
              </Suspense>
            </div>

            <div className="post-read-complete">
              <button
                className={`post-read-complete-button ${hasCompletedReading ? "is-complete" : ""}`}
                type="button"
                onClick={handleCompleteReading}
                disabled={hasCompletedReading}
              >
                {hasCompletedReading ? uiText.readDone : uiText.readAction}
              </button>

              <button
                className={`post-like-button ${hasLikedPost ? "is-liked" : ""}`}
                type="button"
                onClick={() => void handleToggleLike()}
                aria-label={locale === "ja" ? (hasLikedPost ? "いいねを取り消す" : "この記事にいいね") : hasLikedPost ? "Remove from favorites" : "Add to favorites"}
                aria-pressed={hasLikedPost}
                disabled={likeUpdating}
              >
                <span>{hasLikedPost ? uiText.likedAction : uiText.likeAction}</span>
                <span className="post-like-icon" aria-hidden="true">♥</span>
              </button>

              <button
                className="post-share-button"
                type="button"
                onClick={handleShareArticle}
              >
                {uiText.shareArticle}
              </button>
            </div>

            {shareFeedback && <p className="post-share-feedback">{shareFeedback}</p>}
          </div>
        </article>

        {(previousPost || nextPost || relatedPosts.length > 0) && (
          <section className="post-continue-reading">
            <div className="section-header post-continue-reading-header">
              <p className="section-label">{uiText.continueLabel}</p>
              <h2 className="section-title post-continue-reading-title">
                {uiText.continueReading}
              </h2>
            </div>

            {(previousPost || nextPost) && (
              <div className="post-neighbor-grid">
                {previousPost && (
                  <article className="post-neighbor-card">
                    <p className="post-neighbor-label">{uiText.previousPost}</p>
                    <h3 className="post-neighbor-title">
                      <Link to={getPostPath(previousPost)}>{previousPost.title}</Link>
                    </h3>
                    {previousPost.excerpt && (
                      <p className="post-neighbor-excerpt">{previousPost.excerpt}</p>
                    )}
                  </article>
                )}

                {nextPost && (
                  <article className="post-neighbor-card">
                    <p className="post-neighbor-label">{uiText.nextPost}</p>
                    <h3 className="post-neighbor-title">
                      <Link to={getPostPath(nextPost)}>{nextPost.title}</Link>
                    </h3>
                    {nextPost.excerpt && (
                      <p className="post-neighbor-excerpt">{nextPost.excerpt}</p>
                    )}
                  </article>
                )}
              </div>
            )}

            {relatedPosts.length > 0 && (
              <div className="post-related-block">
                <p className="post-related-label">{uiText.relatedPosts}</p>
                <div className="post-related-grid">
                  {relatedPosts.map((relatedPost) => (
                    <article key={relatedPost.id} className="post-related-card">
                      <div className="post-related-meta">
                        {new Date(relatedPost.published_at).toLocaleDateString(
                          isEnglish ? "en-US" : undefined,
                        )}
                      </div>
                      <h3 className="post-related-title">
                        <Link to={getPostPath(relatedPost)}>{relatedPost.title}</Link>
                      </h3>
                      {relatedPost.excerpt && (
                        <p className="post-related-excerpt">{relatedPost.excerpt}</p>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        <CommentsSection postSlug={post.slug} postTitle={post.title} language={language} />
      </section>

      <button
        className={`post-mobile-back-to-top ${showMobileBackToTop ? "is-visible" : ""}`}
        type="button"
        onClick={handleBackToTop}
        aria-label={uiText.backToTop}
      >
        <span aria-hidden="true">↑</span>
      </button>
    </div>
  );
}

export default PostPage;
