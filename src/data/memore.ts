export type MemoReScreenshot = {
  src: string;
  alt: string;
  label: string;
};

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
  screenshots: [
    {
      src: "/memore/recall.jpg",
      alt: "MemoRe 回忆主页，展示记忆内容与相关线索",
      label: "重新遇见一段记忆",
    },
    {
      src: "/memore/memory-grid.jpg",
      alt: "MemoRe 记忆主页，以照片网格浏览保存的记忆",
      label: "在照片之间寻找线索",
    },
    {
      src: "/memore/memory-browser.jpg",
      alt: "MemoRe 浏览页面，按照类型、主题、人物和地点整理记忆",
      label: "按不同线索连通记忆",
    },
    {
      src: "/memore/storybook.jpg",
      alt: "MemoRe 物语页面，将多段记忆慢慢组成一本书",
      label: "让记忆写成自己的物语",
    },
    {
      src: "/memore/capture.jpg",
      alt: "MemoRe 记录菜单，支持新记忆、随想和快速记录",
      label: "用适合当下的方式记录",
    },
    {
      src: "/memore/new-memory.jpg",
      alt: "MemoRe 新建记忆页面，依次填写名称、故事和细节",
      label: "从一个名称开始采摘记忆",
    },
    {
      src: "/memore/custom-types.jpg",
      alt: "MemoRe 新建记忆类型页面，支持自定义板块与显示顺序",
      label: "用自己的方式定义记忆",
    },
    {
      src: "/memore/recipe-details.jpg",
      alt: "MemoRe 食谱记忆详情页，记录菜品标签、食材与做法",
      label: "把食谱和生活细节留在一起",
    },
    {
      src: "/memore/share-memory.jpg",
      alt: "MemoRe 记忆分享页面，将一道菜的照片、故事和食谱整理成卡片",
      label: "把一段记忆分享出去",
    },
    {
      src: "/memore/memory-spaces.jpg",
      alt: "MemoRe 记忆空间页面，汇集回声、感官线索、作品、拾遗和颜色画廊",
      label: "在不同空间里重新遇见记忆",
    },
    {
      src: "/memore/sound-museum.jpg",
      alt: "MemoRe 声音博物馆页面，收藏自然、季节和生活环境的声音",
      label: "用声音保存一段氛围",
    },
    {
      src: "/memore/color-gallery.jpg",
      alt: "MemoRe 颜色画廊页面，以色块探索照片中的专属记忆色",
      label: "从颜色找回当时的感受",
    },
  ] satisfies MemoReScreenshot[],
} as const;

export const memoreEnglish = {
  title: "MemoRe",
  chineseName: "物语",
  tagline: "An app for gathering, connecting, and cherishing memories",
  question:
    "What if an app could preserve not just photos, but memories themselves?",
  introduction:
    "That question led me to build an app for finding your way back to your memories. I named it MemoRe—物语 in Chinese.",
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
  screenshots: [
    {
      src: "/memore/recall.jpg",
      alt: "MemoRe memory home showing a memory and its connected clues",
      label: "Meet a memory again",
    },
    {
      src: "/memore/memory-grid.jpg",
      alt: "MemoRe memory home showing saved memories in a photo grid",
      label: "Look for clues among your photos",
    },
    {
      src: "/memore/memory-browser.jpg",
      alt: "MemoRe browser organizing memories by type, theme, person, and place",
      label: "Connect memories through different clues",
    },
    {
      src: "/memore/storybook.jpg",
      alt: "MemoRe storybook turning several memories into a personal book",
      label: "Let memories become your own story",
    },
    {
      src: "/memore/capture.jpg",
      alt: "MemoRe capture menu for new memories, passing thoughts, and quick notes",
      label: "Record in the way that fits the moment",
    },
    {
      src: "/memore/new-memory.jpg",
      alt: "MemoRe new-memory screen for adding a name, story, and details",
      label: "Begin gathering a memory with a name",
    },
    {
      src: "/memore/custom-types.jpg",
      alt: "MemoRe custom memory-type screen for defining sections and their order",
      label: "Define a memory in your own way",
    },
    {
      src: "/memore/recipe-details.jpg",
      alt: "MemoRe recipe memory with dish tags, ingredients, and instructions",
      label: "Keep recipes together with the life around them",
    },
    {
      src: "/memore/share-memory.jpg",
      alt: "MemoRe sharing screen arranging a photo, story, and recipe into a card",
      label: "Share a memory with someone",
    },
    {
      src: "/memore/memory-spaces.jpg",
      alt: "MemoRe spaces for echoes, sensory clues, creations, fragments, and colors",
      label: "Meet memories again in different spaces",
    },
    {
      src: "/memore/sound-museum.jpg",
      alt: "MemoRe sound museum preserving sounds from nature, seasons, and daily life",
      label: "Preserve the atmosphere of a moment through sound",
    },
    {
      src: "/memore/color-gallery.jpg",
      alt: "MemoRe color gallery for exploring the distinctive colors inside photos",
      label: "Return to a feeling through color",
    },
  ] satisfies MemoReScreenshot[],
} as const;
