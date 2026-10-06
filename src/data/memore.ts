export type MemoReScreenshot = {
  src: string;
  alt: string;
  label: string;
  width?: number;
  height?: number;
};

const memoreScreenshots = [
    {
      src: "/memore/en/recall-home.jpg",
      alt: "English Recall home showing the Mother memory and today's inspiration",
      label: "Meet a memory again",
      width: 1206,
      height: 2490,
    },
    {
      src: "/memore/en/recall.jpg",
      alt: "English Recall screen with connected memories, unfinished memories, and recent records",
      label: "Follow a clue or return to a recent memory",
      width: 1206,
      height: 2480,
    },
    {
      src: "/memore/en/memories-circles.jpg",
      alt: "English Memories screen showing saved memories in a circular photo view",
      label: "Explore memories in circles",
      width: 1206,
      height: 2476,
    },
    {
      src: "/memore/en/memories-grid.jpg",
      alt: "English Memories screen showing saved memories in a photo grid",
      label: "Look for clues among your photos",
      width: 1206,
      height: 2485,
    },
    {
      src: "/memore/en/browse-type.jpg",
      alt: "English memory browser organizing memories by item, food, and experience",
      label: "Browse memories by type",
      width: 1206,
      height: 2481,
    },
    {
      src: "/memore/en/browse-themes.jpg",
      alt: "English memory browser organizing memories by personal themes",
      label: "Find connections through themes",
      width: 1206,
      height: 2479,
    },
    {
      src: "/memore/en/browse-time.jpg",
      alt: "English memory browser grouping memories by year",
      label: "Revisit memories through time",
      width: 1206,
      height: 2474,
    },
    {
      src: "/memore/en/browse-color.png",
      alt: "English memory browser grouping memories by their colors",
      label: "Find a memory through its color",
      width: 1206,
      height: 2622,
    },
    {
      src: "/memore/en/new-memory.png",
      alt: "English New Memory form with a name, memory type, and photos or videos",
      label: "Begin gathering a memory with a name",
      width: 1206,
      height: 2622,
    },
    {
      src: "/memore/en/record.png",
      alt: "English Record menu with a new memory and quick capture for text, photos, and audio",
      label: "Record in the way that fits the moment",
      width: 1206,
      height: 2622,
    },
    {
      src: "/memore/en/storybook-overview.png",
      alt: "English Storybook overview showing a spider lily memory and its photos",
      label: "Let memories become your own story",
      width: 1206,
      height: 2622,
    },
    {
      src: "/memore/en/storybook-timeline.png",
      alt: "English Storybook timeline organizing memories by year and month",
      label: "Follow your story through time",
      width: 1206,
      height: 2622,
    },
    {
      src: "/memore/en/immersive-memory.png",
      alt: "English immersive memory view with a full-screen spider lily photo and its story",
      label: "Step back into a moment",
      width: 1206,
      height: 2622,
    },
    {
      src: "/memore/en/memory-story.png",
      alt: "English Pork Soup memory with its photo, color, and written story",
      label: "Keep a photo and the story behind it",
      width: 1206,
      height: 2622,
    },
    {
      src: "/memore/en/memory-details.png",
      alt: "English memory details showing people, place, dining notes, and later visits",
      label: "Keep the details and follow what happens later",
      width: 1206,
      height: 2622,
    },
    {
      src: "/memore/en/memory-space.png",
      alt: "English Memory Space menu for echoes, sensory clues, collections, rediscovery, and colors",
      label: "Meet memories again in different spaces",
      width: 1206,
      height: 2622,
    },
    {
      src: "/memore/en/collection.png",
      alt: "English Collection screen with music, books, and art connected to memories",
      label: "Gather the works that stay with you",
      width: 1206,
      height: 2622,
    },
    {
      src: "/memore/en/color-palette.png",
      alt: "English Color Gallery showing color families as a palette",
      label: "Explore the colors of memory",
      width: 1206,
      height: 2622,
    },
    {
      src: "/memore/en/color-list.png",
      alt: "English Color Gallery list with color names, hex values, and linked memory counts",
      label: "Find a color by its name and details",
      width: 1206,
      height: 2622,
    },
    {
      src: "/memore/en/sound-museum.png",
      alt: "English Sound Museum with curated sounds from nature, seasons, and daily life",
      label: "Preserve the atmosphere of a moment through sound",
      width: 1206,
      height: 2622,
    },
  ] satisfies MemoReScreenshot[];

const memoreScreenshotChineseCopy = [
  { label: "重新遇见一段记忆", alt: "MemoRe 回忆主页，展示 Mother 记忆和今日灵感" },
  { label: "沿着线索回到一段记忆", alt: "MemoRe 回忆主页，展示相关记忆、未完成记忆和最近记录" },
  { label: "在圆形照片之间浏览记忆", alt: "MemoRe 以圆形照片浏览保存的记忆" },
  { label: "在照片之间寻找线索", alt: "MemoRe 以照片网格浏览保存的记忆" },
  { label: "按类型整理记忆", alt: "MemoRe 按物品、食事和经历分类浏览记忆" },
  { label: "从主题找到记忆的联系", alt: "MemoRe 按个人主题分类浏览记忆" },
  { label: "沿着时间重温记忆", alt: "MemoRe 按年份浏览记忆" },
  { label: "从颜色找到一段记忆", alt: "MemoRe 按颜色分类浏览记忆" },
  { label: "从一个名称开始采摘记忆", alt: "MemoRe 新建记忆页面，填写名称、类型和照片或视频" },
  { label: "用适合当下的方式记录", alt: "MemoRe 记录菜单，支持新建记忆和文字、照片、声音的快速记录" },
  { label: "让记忆写成自己的物语", alt: "MemoRe 物语主页，展示彼岸花记忆和多张照片" },
  { label: "沿着时间读自己的物语", alt: "MemoRe 物语时间线，按年份和月份展示记忆" },
  { label: "再次走进当时的片刻", alt: "MemoRe 沉浸式记忆视图，展示全屏照片和故事" },
  { label: "留住照片背后的故事", alt: "MemoRe 猪肉汤记忆详情，展示照片、颜色和文字故事" },
  { label: "留住细节，续写后来的故事", alt: "MemoRe 记忆详情，展示人物、地点、餐厅笔记和后续经历" },
  { label: "在不同空间里重新遇见记忆", alt: "MemoRe 记忆空间，汇集回声、感官线索、作品、拾遗和颜色" },
  { label: "收藏那些留在心里的作品", alt: "MemoRe 作品收藏，展示与记忆有关的音乐、书籍和艺术" },
  { label: "探索记忆里的颜色", alt: "MemoRe 颜色画廊，以色块展示不同色系" },
  { label: "从名称和细节认识一种颜色", alt: "MemoRe 颜色画廊列表，展示颜色名称、色值和关联记忆数量" },
  { label: "用声音保存一段氛围", alt: "MemoRe 声音博物馆，收藏自然、季节和生活环境的声音" },
] as const;

export const memore = {
  title: "MemoRe",
  chineseName: "物语",
  tagline: "一个采摘、连通、珍藏记忆的 App",
  question:
    "如果有一个 App，保存的不只是照片，而是一段记忆本身，会是什么样的？",
  introduction:
    "凭着这样的想法，我开发了一个找回你的记忆的 App。我把它命名为 MemoRe（中文名：物语）。",
  memoryIngredients:
    "在这里，一段记忆的组成可以是照片、视频，也可以有文字、人物、地点、时间、颜色、声音、音乐，甚至只是一个很小的线索。",
  playfulFeatures: [
    "以前的记忆会在某一天重新出现",
    "照片里的颜色可以被保存下来",
    "一段记忆可以拥有自己的声音和光",
    "几段记忆可以慢慢组成一本物语",
    "一些很久没有见到的记忆，会用不同的方式重新回到你面前",
  ],
  originStory: [
    "做这个 App 的契机是因为想到我的外婆。外婆是一个很安静的人，总是一个人在家，不怎么和人往来，也没有什么娱乐活动。我每隔一两年回国一次去看望她，每次她见到我都会和我聊天，说一些平时她不会说的心里话。",
    "有一年，我从日本带了传统游戏花札和剑玉送给她，她像个小孩子一样玩得很开心。看她这么开心的样子，我于是教她如何玩花牌。花牌要记的图案和规则不算少，外婆当时虽然已经 80 岁了，还是非常努力地去学习，想要和我一起玩。我很久没有看到她那么开心兴奋的样子，没有想到一个游戏可以让外婆这么高兴。外婆已经去世很多年了，但是每当我看到花札，就会想起她来——",
    "我想，一个物品可以勾起一个人的记忆，很多物品可以唤回对很多人的记忆。不仅是事情和人本身，还有在背后埋藏的情感。这些记忆、人物和情感串联在一起，就构成了自己的过去，默默地影响着现在，也可以带着它们给自己的温暖和慰藉走向下一步。",
    "这个 App 是我对记录记忆的探索和尝试。不仅是物品，我也用它记录对我来说有趣的片段、难忘的体验和值得留念的经历，透过它们让我重温当时的感受，连系在生活中留下印记的人。",
  ],
  iconSrc: "/memore/app-icon.png",
  screenshots: memoreScreenshots.map((screenshot, index) => ({
    ...screenshot,
    ...memoreScreenshotChineseCopy[index],
  })),
} as const;

export const memoreEnglish = {
  title: "MemoRe",
  chineseName: "物语",
  tagline: "An app for gathering, connecting, and cherishing memories",
  question:
    "What if an app could preserve not just photos, but memories themselves?",
  introduction:
    "That question led me to build an app for finding your way back to your memories. I named it MemoRe.",
  memoryIngredients:
    "Here, a memory can hold photos and videos, but also words, people, places, time, colors, sounds, music, or even the smallest clue.",
  playfulFeatures: [
    "An old memory may reappear on an unexpected day",
    "The colors inside a photo can be saved",
    "A memory can have its own sound and light",
    "Several memories can slowly grow into a storybook",
    "Memories you have not seen for a long time can return in different ways",
  ],
  originStory: [
    "The idea for this app began with my grandmother. She was a quiet person who spent most of her time at home, rarely socialized, and had few forms of entertainment. I returned to China to visit her every year or two. Whenever she saw me, she would talk about thoughts and feelings she normally kept to herself.",
    "One year, I brought her hanafuda cards and a kendama from Japan. She played with them with the delight of a child. Seeing how happy she was, I taught her how to play hanafuda. There were many patterns and rules to remember, but even at eighty she worked hard to learn because she wanted to play with me. I had not seen her so excited in a long time, and I never imagined a game could bring her so much joy. She passed away many years ago, but whenever I see hanafuda, I still think of her—",
    "I began to wonder: one object can bring back the memory of one person, and many objects can bring back memories of many people. They recall not only events and people, but also the feelings hidden behind them. Linked together, those memories, people, and emotions become our past. They quietly shape the present and can give us warmth and comfort as we move forward.",
    "This app is my exploration of how memories can be recorded. Beyond objects, I use it to keep interesting fragments, unforgettable experiences, and moments worth holding on to. Through them, I can revisit how those moments felt and reconnect with the people who left their mark on my life.",
  ],
  iconSrc: "/memore/app-icon.png",
  screenshots: memoreScreenshots,
} as const;
