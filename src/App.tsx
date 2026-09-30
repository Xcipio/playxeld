import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EnglishHomePage from "./pages/EnglishHomePage";
import TagPage from "./pages/TagPage";
import ArtworkTagPage from "./pages/ArtworkTagPage";
import GamesPage from "./pages/GamesPage";
import FriendsPage from "./pages/FriendsPage";

const PostPage = lazy(() => import("./pages/PostPage"));
const ArtPage = lazy(() => import("./pages/ArtPage"));
const ArtworkDetailPage = lazy(() => import("./pages/ArtworkDetailPage"));
const FriendArticlePage = lazy(() => import("./pages/FriendArticlePage"));
const FriendCategoryPage = lazy(() => import("./pages/FriendCategoryPage"));
const WhatsNewPage = lazy(() => import("./pages/WhatsNewPage"));
const MemoRePage = lazy(() => import("./pages/MemoRePage"));
const MemoReStoryPage = lazy(() => import("./pages/MemoReStoryPage"));

function App() {
  return (
    <Suspense fallback={<div className="route-loading" aria-hidden="true" />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/en" element={<EnglishHomePage />} />
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
