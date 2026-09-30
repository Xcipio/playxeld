export type MemoReStoryCategory =
  | "采摘"
  | "连通"
  | "珍藏"
  | "Gather"
  | "Connect"
  | "Cherish";

export type MemoReStoryImage = {
  src: string;
  alt: string;
  caption: string;
};

export type MemoReStoryDetail = {
  symbol?: string;
  label: string;
  description: string;
};

export type MemoReStorySection = {
  kicker?: string;
  title?: string;
  paragraphs?: readonly string[];
  callout?: string;
  quote?: string;
  quoteSource?: string;
  sourceLink?: {
    href: string;
    label: string;
  };
  emojiLine?: string;
  details?: readonly MemoReStoryDetail[];
  images?: readonly MemoReStoryImage[];
  imageLayout?: "single" | "pair" | "grid";
};

export type MemoReStory = {
  slug: string;
  feature: string;
  title: string;
  category: MemoReStoryCategory;
  kind: "功能故事" | "设计实验" | "Feature Story" | "Design Experiment";
  summary: string;
  accent: string;
  cover: MemoReStoryImage;
  sections: readonly MemoReStorySection[];
  closing: string;
};

export const memoreStories: readonly MemoReStory[] = [
  {
    slug: "memory-colors",
    feature: "颜色画廊",
    title: "用颜色点缀记忆",
    category: "采摘",
    kind: "功能故事",
    summary: "当记忆的细节慢慢消散，颜色仍能把当时的感受带回来。",
    accent: "#5eb38a",
    cover: {
      src: "/memore/stories/memory-colors/01-cover.jpg",
      alt: "MemoRe 颜色画廊功能封面，以若竹色点缀 Mother 这段记忆",
      caption: "一段记忆，也可以拥有自己的颜色。",
    },
    sections: [
      {
        kicker: "THE COLOR OF A MEMORY",
        title: "除了照片，我们还会记住什么？",
        paragraphs: [
          "记录记忆，除了文字、图片、视频和语音之外，还有没有什么被忽略、却同样重要的方式？当我们回想起一段记忆时，有什么元素会萦绕在脑海中，甚至成为记忆的印象本身？",
        ],
        callout: "颜色。",
      },
      {
        title: "颜色留下的，不只是标签",
        paragraphs: [
          "记忆可能由具体的物品或事件触发，但最终在脑海中留下来的，常常是一种感觉，甚至是一种模糊的印象。颜色就是这些印象中的一种。",
          "在许多语境里，红色让人想到激情，蓝色让人想到忧郁，绿色让人想到清新，橙色让人想到活力。人们也会用颜色描述一段时期，比如说“回忆是粉红色的”，这里的粉色承载的是青春与恋爱相关的情绪。",
          "绘画里也能看到类似的变化。毕加索的创作常被人用“蓝色时期”和“粉色时期”来描述；进入立体主义之后，他的用色又变得克制，灰、褐、黑和暗黄占据了画面。颜色不仅装饰图像，也在塑造观看时的情绪。",
          "不过，比起这些具有代表性的联系，我觉得颜色的意义更依赖个人感受。特别是在记忆里，使用者的定义是唯一权威的：这段记忆给了你什么样的感受，它就是什么颜色。每个人对每一种颜色的感知，都是独一无二的。",
        ],
        quote: "在记忆之中，使用者的定义是唯一权威的。",
      },
      {
        kicker: "CHOOSE A FEELING",
        title: "为一段记忆选择颜色",
        paragraphs: [
          "为了标记这样的感受，也让使用者能用更丰富的色彩描述记忆，我在开发 MemoRe 时加入了颜色系统。在创建记忆时，可以选择多种颜色，赋予它一种由自己定义的感受。",
        ],
        images: [
          {
            src: "/memore/stories/memory-colors/02-create.jpg",
            alt: "MemoRe 创建记忆页面，可从底部的颜色按钮进入记忆色选择",
            caption: "从记录流程中选择记忆色",
          },
          {
            src: "/memore/stories/memory-colors/03-picker.jpg",
            alt: "MemoRe 选择记忆色页面，以色系和集合浏览大量颜色",
            caption: "按色系或集合寻找当下的感受",
          },
        ],
        imageLayout: "pair",
      },
      {
        kicker: "COLOR GALLERY",
        title: "让颜色自己成为入口",
        paragraphs: [
          "颜色画廊不只是一张色表。它可以用总览、卡片、色板或列表来浏览，也可以保存常用颜色、最近使用的颜色、采集到的颜色，以及从记忆里提取出来的颜色。",
          "当我想不起准确的标题，却还记得那段经历是某一种绿或某一种橙时，颜色就成了另一条回去的路。",
        ],
        images: [
          {
            src: "/memore/stories/memory-colors/07-gallery-overview.jpg",
            alt: "MemoRe 颜色画廊总览，以大量色块展示棕、橙、黄与绿色",
            caption: "总览视图",
          },
          {
            src: "/memore/stories/memory-colors/04-gallery-cards.jpg",
            alt: "MemoRe 颜色画廊卡片视图，展示薄青、柳鼠、常磐和若竹等颜色",
            caption: "卡片视图",
          },
          {
            src: "/memore/stories/memory-colors/05-gallery-palette.jpg",
            alt: "MemoRe 颜色画廊色板视图，集中展示橙色系色块",
            caption: "色板视图",
          },
          {
            src: "/memore/stories/memory-colors/06-gallery-list.jpg",
            alt: "MemoRe 颜色画廊列表视图，显示颜色名称、读音、色值与记忆数量",
            caption: "列表视图",
          },
          {
            src: "/memore/stories/memory-colors/08-collections.jpg",
            alt: "MemoRe 颜色画廊集合页面，包含颜色收藏、最近使用、采集和来自记忆",
            caption: "收藏与管理",
          },
        ],
        imageLayout: "grid",
      },
      {
        title: "让颜色回到记忆里",
        paragraphs: [
          "选择之后，这些颜色会以不同方式出现在记忆的展示中，比如照片的外边框和标题文字。也可以在搜索与颜色画廊中，从指定颜色找到与之关联的记忆。",
          "我希望颜色系统能给记录记忆这件事带来一种活力，并成为记忆本身的重要组成部分。",
        ],
        images: [
          {
            src: "/memore/stories/memory-colors/09-memory-borders.jpg",
            alt: "MemoRe 记忆主页，不同照片使用各自的记忆色作为圆形边框",
            caption: "颜色成为记忆的边框",
          },
          {
            src: "/memore/stories/memory-colors/10-memory-detail.jpg",
            alt: "MemoRe Mother 记忆详情页，以若竹色装饰照片边框、标题和颜色标记",
            caption: "颜色也进入记忆详情",
          },
        ],
        imageLayout: "pair",
      },
    ],
    closing: "当记忆的细节慢慢消散时，颜色能把它们的感受带回来。",
  },
  {
    slug: "echoes",
    feature: "回声",
    title: "用回声唤回记忆",
    category: "连通",
    kind: "功能故事",
    summary: "有些人已经不在身边，但他们说过的话，仍然可以带来温暖和力量。",
    accent: "#7870b8",
    cover: {
      src: "/memore/stories/echoes/01-cover.jpg",
      alt: "MemoRe 回声功能封面，展示听外婆的话与两条生活叮嘱",
      caption: "有些话，会在记忆里一直留下回声。",
    },
    sections: [
      {
        kicker: "WORDS I STILL HEAR",
        title: "小时候没有听进去的话",
        paragraphs: [
          "偶尔会想起外婆跟我说的话。小时候我总觉得她很啰嗦，总是阻止我做想做的事情。",
        ],
        quote: "“不要玩电脑玩太久，会伤眼睛。”\n“电视已经看够多了，休息一会儿吧。”\n“吃完饭不要马上坐下来，要活动一下。”",
      },
      {
        paragraphs: [
          "大多数时候我都没有理会她，继续做自己的事情。这时就会看到她失落的表情。虽然几乎每一次我都不听，她每一次还是会说：“听外婆的话吧，为了你的身体好。”",
          "直到长大后视力越来越差，肚子越来越大，我才真正明白她说的是对的。其实小时候也知道，只是那时不愿意听。外婆一直体弱多病，所以她最清楚身体不好带来的痛苦，也不希望我以后因为不好的习惯承受同样的痛苦。",
          "现在我明白了。我想多听听她的话，告诉她我早应该听她的，不该那么不懂事。我还想多和她聊一聊。",
          "但是外婆已经去世六年多了。我没有机会再和她聊天，也不能再和她玩花牌了。",
        ],
        callout: "不过我还记得她对我说的话。我仍然可以听她说的。",
      },
      {
        kicker: "ECHO",
        title: "把重要的人说过的话留下来",
        paragraphs: [
          "开发 Echo（回声）的契机，是我想留下那些对自己重要的人说过的话，也记录他们的声音。即使他们不在身边，这些话仍然能够给自己带来温暖和力量。",
          "看到这些话时，也会提醒自己：重要的人正在身边关心着你，自己也需要去关心他们、联系他们。",
        ],
        images: [
          {
            src: "/memore/stories/echoes/02-entry.jpg",
            alt: "MemoRe 从物语主页进入记忆空间并选择回声功能的操作说明",
            caption: "从记忆空间进入回声",
          },
        ],
        imageLayout: "single",
      },
      {
        title: "听谁的话？",
        paragraphs: [
          "添加人物时，MemoRe 会自动把人物名代入“听……的话”的格式中。比如记录“妈妈”，就会生成“听妈妈的话”。人物也可以选择绑定已有通讯录，让一句话与一个具体的人连在一起。",
        ],
        images: [
          {
            src: "/memore/stories/echoes/03-person.jpg",
            alt: "MemoRe 回声功能中新建人物页面，询问你想听谁的话",
            caption: "先记下说话的人",
          },
          {
            src: "/memore/stories/echoes/04-record.jpg",
            alt: "MemoRe 新增一句话页面，可输入文字、录音或导入语音文件",
            caption: "再留下文字与声音",
          },
        ],
        imageLayout: "pair",
      },
      {
        title: "一句话，也有自己的情绪",
        paragraphs: [
          "记录完成后，可以为这句话添加一个表情，表示自己对它的态度。🙏、❤️、👍，都是与这句话相遇时留下的小小回应。",
          "这里也可以记录对自己重要的名人名言，同样支持录音和语音文件导入。重要的不是说话的人是否在身边，而是这句话是否仍在生活中陪伴着你。",
        ],
        images: [
          {
            src: "/memore/stories/echoes/05-list.jpg",
            alt: "MemoRe 回声列表，按人物保存话语，并用表情记录回应",
            caption: "为记住的话留下回应",
          },
          {
            src: "/memore/stories/echoes/06-quote.jpg",
            alt: "MemoRe 新增一句话页面，示例记录凯撒的名言",
            caption: "也可以保存一直想记住的句子",
          },
        ],
        imageLayout: "pair",
      },
      {
        title: "听外婆的话",
        paragraphs: [
          "每当我看到“听外婆的话”里那句“感觉快要感冒的时候，就用手指上下搓鼻子 100 下，就不容易感冒”，就会想起外婆说，她这样做以后已经很多年没有感冒了。",
          "这是外婆留在我记忆里的一句生活经验。再次看到它，就会感觉外婆还在我身边。",
        ],
      },
    ],
    closing: "回声一直都在。",
  },
  {
    slug: "color-capture",
    feature: "颜色捕捉",
    title: "采摘记忆的颜色",
    category: "采摘",
    kind: "功能故事",
    summary: "不必征服时间，只需要在颜色消失之前，把它轻轻摘下来。",
    accent: "#d2483f",
    cover: {
      src: "/memore/stories/color-capture/01-cover.jpg",
      alt: "MemoRe 颜色捕捉功能封面，从红白彼岸花照片中采集颜色",
      caption: "Seize the colors——在颜色消失以前，将它采摘下来。",
    },
    sections: [
      {
        kicker: "CARPE DIEM",
        title: "摘下今天",
        paragraphs: [
          "Carpe diem——也许大家更熟悉它的英文版本“Seize the day”，即活在当下。看过电影《死亡诗社》的人，大概都会对基廷老师和学生们对这一人生态度的诠释留下印象。",
          "这句话来自古罗马诗人贺拉斯的《颂歌》（Odes 1.11）。很多人把它翻译成“活在当下”或“争分夺秒”，听起来像是在搞励志创业。但拉丁语 carpe 源自动词 carpere，也有采摘、收获的意思。",
        ],
        quote: "Carpe diem, quam minimum credula postero.\n采撷今日，尽可能少地信赖明日。",
        quoteSource: "贺拉斯《颂歌》1.11",
        sourceLink: {
          href: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0024%3Abook%3D1%3Apoem%3D11",
          label: "查看拉丁文原文",
        },
      },
      {
        paragraphs: [
          "我更喜欢“摘下今天”这个译法。它让我想到：生命像一朵花，或者一篮熟透的果实。你不需要去征服时间，只需要在它腐烂、坠落之前，把它轻轻摘下来。",
          "后半句提醒我，未来始终是不可控的变量，唯一真实的，是此时此刻指尖触碰果实的质感。比起及时行乐，这里面也有一种清醒的悲观：霜雪终会降临，既然无法向明天借债，就更应该认真感受今天。",
        ],
        callout: "你不需要征服时间，只需要把今天轻轻摘下来。",
      },
      {
        kicker: "SEIZE THE COLORS",
        title: "给颜色一条更短的路径",
        paragraphs: [
          "在为 MemoRe 加入颜色采集功能时，我想到了贺拉斯的这句话。原来的记忆系统已经可以从记录好的记忆中提取颜色，保存到收藏夹，但那更像是对过去内容的整理与编辑。",
          "如果我在路上看到一个很漂亮的东西，想马上保存它的颜色，就需要一种更快的方式。于是我增加了颜色采集入口，可以从锁定屏幕、App 快捷菜单或记忆记录入口快速打开。",
        ],
        images: [
          {
            src: "/memore/stories/color-capture/02-entry.jpg",
            alt: "MemoRe 记录菜单，通过加号按钮选择颜色采集器",
            caption: "从记录入口打开颜色采集器",
          },
          {
            src: "/memore/stories/color-capture/03-source.jpg",
            alt: "MemoRe 颜色采集器，可拍摄新照片或从已有照片中选择",
            caption: "拍摄此刻，或选择已有照片",
          },
        ],
        imageLayout: "pair",
      },
      {
        title: "用滴管采摘一小块此刻",
        paragraphs: [
          "拍下一张照片后，可以用滴管点按取色；也可以长按，在更精确的位置选择颜色。一次最多收集八种颜色，把一片花、一面墙或一场黄昏拆成自己的颜色样本。",
        ],
        images: [
          {
            src: "/memore/stories/color-capture/04-picker.jpg",
            alt: "MemoRe 采集颜色页面，使用滴管从红色彼岸花照片中点按或长按取色",
            caption: "点按取色，长按精确选择",
          },
          {
            src: "/memore/stories/color-capture/05-multiple.jpg",
            alt: "MemoRe 采集颜色页面，从同一张照片中保存四种红色",
            caption: "一次可以采集八种颜色",
          },
        ],
        imageLayout: "pair",
      },
      {
        title: "为颜色命名，再把它放回记忆",
        paragraphs: [
          "收集到的颜色会进入颜色画廊的“采集”集合。你可以为颜色命名，赋予它只有自己理解的含义，也可以查看 HEX、RGB、采集日期和来源。",
          "这些颜色之后可以成为记忆色，被应用到照片边框、标题和其他功能里。一次采摘没有停留在收藏夹里，而是重新回到了记忆之中。",
        ],
        images: [
          {
            src: "/memore/stories/color-capture/06-gallery.jpg",
            alt: "MemoRe 颜色画廊集合页面，可进入采集颜色列表",
            caption: "采集入口位于颜色画廊",
          },
          {
            src: "/memore/stories/color-capture/07-collected.jpg",
            alt: "MemoRe 采集颜色列表，颜色拥有名称、Hex 色值和记忆数量",
            caption: "为采集的颜色命名",
          },
          {
            src: "/memore/stories/color-capture/08-detail.jpg",
            alt: "MemoRe 彼岸花肆颜色详情页，展示 HEX、RGB 与采集信息",
            caption: "查看颜色的数值与来处",
          },
          {
            src: "/memore/stories/color-capture/09-applied.jpg",
            alt: "MemoRe 彼岸花田记忆详情页，使用采集的红色装饰照片边框与标题",
            caption: "把采集的颜色应用到记忆",
          },
        ],
        imageLayout: "grid",
      },
    ],
    closing: "采摘最新鲜的颜色，保存最鲜活的记忆，趁上面还有未干的露水。摘下今天吧——趁花还没谢，趁酒还没凉，趁我们还没变成墓碑上的名字。",
  },
  {
    slug: "fruit-moods",
    feature: "水果心情",
    title: "用水果表达心情",
    category: "采摘",
    kind: "设计实验",
    summary: "今天的感受就是明天的记忆；有时一个水果，比几个情绪词更接近心情本身。",
    accent: "#c9a32b",
    cover: {
      src: "/memore/stories/fruit-moods/01-cover.jpg",
      alt: "MemoRe 水果心情功能封面，以三个柠檬表达一段记忆的心情",
      caption: "如果心情有味道，今天会是什么水果？",
    },
    sections: [
      {
        kicker: "WHAT TODAY TASTES LIKE",
        title: "从一串水果开始",
        emojiLine: "🍎 🍊 🍌 🍉 🍇 🫐 🍓 🍍 🥝 🍈 🍐 🥭 🍑 🍒 🍋 🍏 🥥 🍋‍🟩",
        paragraphs: [
          "聊天时说到最喜欢的水果，我们开始给喜爱程度排序。我没有什么最喜欢的水果，吃得也没有那么频繁，但还是用 Emoji 排出了自己的顺序。",
          "我忽然想到：是不是也可以用水果来表示一种心情？就像颜色一样，它也可以成为 MemoRe 的一种元素。虽然我还说不清每一种水果究竟代表哪一种心情，但它们有不同的甜度、香味和口感，也就带来了不同的感觉。",
        ],
      },
      {
        title: "一种味道，一种感受",
        details: [
          {
            symbol: "🍎",
            label: "苹果",
            description: "清脆、多汁，甜中带一点清酸，香味干净，感觉利落。",
          },
          {
            symbol: "🍊",
            label: "橘子",
            description: "柔软多汁，酸甜鲜明，柑橘香很强，感觉明亮。",
          },
          {
            symbol: "🍌",
            label: "香蕉",
            description: "软糯绵密，甜度高、酸度低，香气浓而圆润，感觉厚实。",
          },
          {
            symbol: "🍓",
            label: "草莓",
            description: "柔软多汁，酸甜交错，香气突出，感觉轻盈而鲜明。",
          },
          {
            symbol: "🍍",
            label: "菠萝",
            description: "带一点纤维感，香气浓烈，还有一点刺舌的刺激感。",
          },
        ],
      },
      {
        title: "比“开心”或“难过”再具体一点",
        paragraphs: [
          "有时候，心情就是一种复杂、无法精确说清楚的感觉。与其只从“开心”“难过”“沮丧”几个词里挑一个，也许可以用某种东西来代表它。",
          "如果我用 🍍 代表沮丧，用 🍋 代表酸，那么今天的心情或许就是 🍍＋🍋。我还没有把这套符号系统想得很完整，但觉得值得做一次尝试，把它放进 MemoRe。",
        ],
        callout: "🍍 ＋ 🍋",
        images: [
          {
            src: "/memore/stories/fruit-moods/02-record.jpg",
            alt: "MemoRe 记忆详情页，提示点击表情按钮记录水果心情",
            caption: "从一段记忆里记录此刻的心情",
          },
          {
            src: "/memore/stories/fruit-moods/03-picker.jpg",
            alt: "MemoRe 水果心情选择器，以水果 Emoji 组合表达今天的味道",
            caption: "一枚水果，或一种只属于自己的组合",
          },
        ],
        imageLayout: "pair",
      },
      {
        title: "今天的感受，是明天的记忆",
        paragraphs: [
          "感受是记忆的一部分。今天的感受就是明天的记忆；如果它能够被记录下来，也许就能被保存得更久。水果的气味与口感，和颜色一样，可以让一段记忆重新变得鲜活。",
          "日历会留下每天记录过的水果。回头看时，不必先找到准确的形容词，也能从那几枚小小的图案里，想起那一天尝起来是什么味道。",
        ],
        images: [
          {
            src: "/memore/stories/fruit-moods/04-history.jpg",
            alt: "MemoRe 月历页面，在日期中显示每天记录的水果心情",
            caption: "在日历中回看过去的水果心情",
          },
        ],
        imageLayout: "single",
      },
    ],
    closing: "至于哪一种水果代表哪一种心情，每个人都有自己的定义。",
  },
] as const;

export function getMemoReStory(slug: string | undefined) {
  return memoreStories.find((story) => story.slug === slug) ?? null;
}
