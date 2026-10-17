import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EnglishHomePage from "./pages/EnglishHomePage";
import TagPage from "./pages/TagPage";
import ArtworkTagPage from "./pages/ArtworkTagPage";
import GamesPage from "./pages/GamesPage";
import FriendsPage from "./pages/FriendsPage";
import { useI18n } from "./hooks/useI18n";

const PostPage = lazy(() => import("./pages/PostPage"));
const ArtPage = lazy(() => import("./pages/ArtPage"));
const ArtworkDetailPage = lazy(() => import("./pages/ArtworkDetailPage"));
const FriendArticlePage = lazy(() => import("./pages/FriendArticlePage"));
const FriendCategoryPage = lazy(() => import("./pages/FriendCategoryPage"));
const WhatsNewPage = lazy(() => import("./pages/WhatsNewPage"));
const MemoRePage = lazy(() => import("./pages/MemoRePage"));
const MemoReStoryPage = lazy(() => import("./pages/MemoReStoryPage"));

function App() {
  const { locale } = useI18n();
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : locale;
    if (locale === "ja" && !pathname.startsWith("/ja/memore") && pathname !== "/ja" && pathname !== "/ja/whats-new") {
      const title = pathname.startsWith("/ja/art") ? "作品ギャラリー" : pathname.startsWith("/ja/games") ? "ゲームライブラリー" : pathname.startsWith("/ja/friends") ? "みんなの文章" : pathname.startsWith("/ja/post/") ? "記事" : "タグ別の記事";
      document.title = `${title} | Playxeld`;
    }
  }, [locale, pathname]);
  return (
    <Suspense fallback={<div className="route-loading" aria-hidden="true" />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/en" element={<EnglishHomePage />} />
        <Route path="/ja" element={<EnglishHomePage />} />
        <Route path="/ja/games" element={<GamesPage />} />
        <Route path="/ja/art" element={<ArtPage />} />
        <Route path="/ja/art/tag/:tagName" element={<ArtworkTagPage />} />
        <Route path="/ja/art/:slug" element={<ArtworkDetailPage />} />
        <Route path="/ja/friends" element={<FriendsPage />} />
        <Route path="/ja/friends/category/:categorySlug" element={<FriendCategoryPage />} />
        <Route path="/ja/friends/:slug" element={<FriendArticlePage />} />
        <Route path="/ja/whats-new" element={<WhatsNewPage />} />
        <Route path="/ja/memore" element={<MemoRePage locale="ja" />} />
        <Route path="/ja/memore/stories/:slug" element={<MemoReStoryPage locale="ja" />} />
        <Route path="/ja/post/:slug" element={<PostPage />} />
        <Route path="/ja/tag/:tagName" element={<TagPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/art" element={<ArtPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/whats-new" element={<WhatsNewPage />} />
        <Route path="/memore" element={<MemoRePage />} />
        <Route path="/en/memore" element={<MemoRePage locale="en" />} />
        <Route path="/memore/stories/:slug" element={<MemoReStoryPage />} />
        <Route
          path="/en/memore/stories/:slug"
          element={<MemoReStoryPage locale="en" />}
        />
        <Route
          path="/friends/category/:categorySlug"
          element={<FriendCategoryPage />}
        />
        <Route path="/friends/:slug" element={<FriendArticlePage />} />
        <Route path="/art/tag/:tagName" element={<ArtworkTagPage />} />
        <Route path="/art/:slug" element={<ArtworkDetailPage />} />
        <Route path="/post/:slug" element={<PostPage language="zh" />} />
        <Route path="/en/post/:slug" element={<PostPage language="en" />} />
        <Route path="/tag/:tagName" element={<TagPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
