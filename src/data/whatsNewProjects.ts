export type WhatsNewLocale = "zh" | "en";

export type LocalizedText = Record<WhatsNewLocale, string>;

export type WhatsNewProject = {
  id: string;
  title: string;
  type: "app";
  status: "in-development" | "beta" | "released";
  platforms: string[];
  featured: boolean;
  tagline: LocalizedText;
  summary: LocalizedText;
  highlights?: LocalizedText[];
  iconSrc: string;
  screenshots: {
    src: string;
    alt: LocalizedText;
  }[];
  links?: {
    url: string;
    label: LocalizedText;
  }[];
  date?: string;
};

export const whatsNewProjects: WhatsNewProject[] = [
  {
    id: "memore",
    title: "MemoRe",
    type: "app",
    status: "in-development",
    platforms: ["iOS"],
    featured: true,
    tagline: {
      zh: "把散落的物品、食事与经历，慢慢写成自己的记忆世界。",
      en: "Turn the objects, meals, and experiences scattered through life into a memory world of your own.",
    },
    summary: {
      zh: "MemoRe 是一款本地优先的 iOS App，用来保存生活中的记忆，以及它们背后的人物、地点和故事。没有网络时，核心记录与浏览仍可在本机完成。",
      en: "MemoRe is a local-first iOS app for keeping memories from everyday life, along with the people, places, and stories behind them. Its core capture and browsing experience remains available offline.",
    },
    highlights: [
      {
        zh: "用照片、短声音、人物、时间与地点，为一份记忆保留完整语境。",
        en: "Keep a memory in context with photos, short audio, people, dates, and places.",
      },
      {
        zh: "在 Recall 中重新遇见过去，在 Storybook 中让记忆慢慢汇成一本书。",
        en: "Revisit the past in Recall, then let Storybook gather memories into an evolving book.",
      },
      {
        zh: "个人内容优先保存在本地，并可通过自己的 iCloud 私有数据库同步。",
        en: "Personal content stays local first and can sync through your own private iCloud database.",
      },
    ],
    iconSrc: "/whats-new/memore/app-icon.png",
    screenshots: [
      {
        src: "/whats-new/memore/recall.jpg",
        alt: {
          zh: "MemoRe Recall 页面，展示一段可重新遇见的记忆",
          en: "MemoRe Recall screen showing a memory ready to revisit",
        },
      },
      {
        src: "/whats-new/memore/memories.jpg",
        alt: {
          zh: "MemoRe Memories 页面，以照片组成可浏览的记忆画布",
          en: "MemoRe Memories screen with a visual canvas of saved memories",
        },
      },
      {
        src: "/whats-new/memore/storybook.jpg",
        alt: {
          zh: "MemoRe Storybook 页面，让记忆慢慢写成一段故事",
          en: "MemoRe Storybook screen turning memories into an evolving story",
        },
      },
      {
        src: "/whats-new/memore/color-gallery.jpg",
        alt: {
          zh: "MemoRe Color Gallery 页面，按颜色探索和整理记忆",
          en: "MemoRe Color Gallery screen for exploring memories by color",
        },
      },
    ],
  },
];
