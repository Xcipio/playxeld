import { FriendArticle, FriendArticleCategory } from "../types/friendArticle";

export const friendArticleCategoryOrder: FriendArticleCategory[] = [
  "故事",
  "专题",
  "随笔",
];

export const friendArticleCategoryMeta: Record<
  FriendArticleCategory,
  {
    slug: string;
    englishLabel: string;
    title: string;
    description: string;
    emptyTitle: string;
    emptyDescription: string;
  }
> = {
  故事: {
    slug: "stories",
    englishLabel: "Stories",
    title: "故事",
    description: "适合人物、经历、记忆和带有叙事弧线的来稿。",
    emptyTitle: "故事栏目准备好了",
    emptyDescription: "带有故事分类的文章发布后，会优先出现在这里。",
  },
  专题: {
    slug: "features",
    englishLabel: "Features",
    title: "专题",
    description: "适合联动策划、主题征稿、系列观察和较重结构的写作。",
    emptyTitle: "专题栏目等待首篇稿件",
    emptyDescription: "带有专题分类的文章发布后，这里会形成专题档案。",
  },
  随笔: {
    slug: "essays",
    englishLabel: "Essays",
    title: "随笔",
    description: "适合短札、片段思考、日常观察和轻量个人表达。",
    emptyTitle: "随笔栏目还没有公开文章",
    emptyDescription: "带有随笔分类的文章发布后，会在这里持续更新。",
  },
};

export function isFriendArticleCategory(
  value: string | null | undefined,
): value is FriendArticleCategory {
  return friendArticleCategoryOrder.includes(value as FriendArticleCategory);
}

export function inferFriendArticleCategory(
  article: Pick<FriendArticle, "category" | "tags">,
): FriendArticleCategory {
  if (isFriendArticleCategory(article.category)) {
    return article.category;
  }

  const matchedTag = article.tags.find((tag) => isFriendArticleCategory(tag));

  return matchedTag ?? "随笔";
}

export function getFriendArticleCategoryPath(category: FriendArticleCategory) {
  return `/friends/category/${friendArticleCategoryMeta[category].slug}`;
}

export function getFriendArticleCategoryBySlug(slug: string | undefined) {
  if (!slug) {
    return null;
  }

  return (
    friendArticleCategoryOrder.find(
      (category) => friendArticleCategoryMeta[category].slug === slug,
    ) ?? null
  );
}
