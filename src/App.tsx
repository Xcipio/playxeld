import React, { useState, useEffect } from 'react';

// --- 图标组件 (内嵌 SVG 以解决依赖缺失问题) ---
const IconBase = ({ size = 24, className = "", children, ...props }: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className}`} 
    {...props}
  >
    {children}
  </svg>
);

const Sparkles = (props: any) => (
  <IconBase {...props}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </IconBase>
);

const Layout = (props: any) => (
  <IconBase {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
  </IconBase>
);

const X = (props: any) => (
  <IconBase {...props}>
    <path d="M18 6 6 18" /><path d="m6 6 18 18" />
  </IconBase>
);

const Plus = (props: any) => (
  <IconBase {...props}>
    <path d="M5 12h14" /><path d="M12 5v14" />
  </IconBase>
);

const ChevronLeft = (props: any) => (
  <IconBase {...props}>
    <path d="m15 18-6-6 6-6" />
  </IconBase>
);

const ChevronRight = (props: any) => (
  <IconBase {...props}>
    <path d="m9 18 6-6-6-6" />
  </IconBase>
);

const Play = (props: any) => (
  <IconBase {...props}>
    <polygon points="5 3 19 12 5 21 5 3" />
  </IconBase>
);

const Pause = (props: any) => (
  <IconBase {...props}>
    <rect width="4" height="16" x="6" y="4" /><rect width="4" height="16" x="14" y="4" />
  </IconBase>
);

const Twitter = (props: any) => (
  <IconBase {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </IconBase>
);

const Github = (props: any) => (
  <IconBase {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" />
  </IconBase>
);

const Mail = (props: any) => (
  <IconBase {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </IconBase>
);

const ArrowRight = (props: any) => (
  <IconBase {...props}>
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </IconBase>
);

// --- 类型定义 ---
interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  readTime?: string;
}

interface Podcast {
  id: number;
  title: string;
  description: string;
  duration: string;
  cover: string;
  date: string;
  tags: string[];
}

interface NewPostState {
  title: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
}

// --- 模拟数据 ---
const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    title: "探索城市的光影瞬间",
    excerpt: "在繁忙的街道上，每个人都有自己的故事。这次我带上了相机，捕捉那些被遗忘的角落，寻找光与影的对话。",
    content: "这是一篇关于城市摄影的深度文章。在现代都市中，光影的变化赋予了建筑物生命。我发现清晨六点的阳光最为迷人，它斜射在老旧的磁砖墙上，营造出一种怀旧的氛围。\n\n当我们慢下脚步，会发现街角的咖啡厅、生锈的铁门、甚至是地上的雨水倒影，都充满了诗意。这就是摄影的魅力，让我们重新认识习以为常的世界。",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1000",
    date: "2023-12-25",
    category: "视觉日记",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "极简主义的生活美学",
    excerpt: "减少不必要的杂物，是为了让灵魂有更多空间去呼吸。分享我的居家改造心得，以及如何通过做减法来丰富生活。",
    content: "断舍离不只是丢掉东西，更是一种心态的整理。当我把书桌上多余的文具清除，只留下一盆绿植和一盏台灯时，我的专注力得到了显著提升。\n\n这篇文章记录了我从杂乱到极简的转变过程，希望能带给你一些启发。",
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1000",
    date: "2023-12-20",
    category: "生活方式",
    readTime: "3 min read"
  },
  {
    id: 3,
    title: "冬日里的温暖手冲咖啡",
    excerpt: "寒冷的午後，一杯耶加雪菲的香气足以抚平所有的焦虑。关于选豆、研磨与冲煮的私人笔记。",
    content: "水温 92 度，闷蒸 30 秒。看着咖啡粉在滤纸中微微隆起，释放出迷人的果香，这是我一天中最享受的时刻。\n\n每种豆子都有它的个性，水流的速度、研磨的粗细都会影响最终的味道。这就像生活一样，细节决定了品质。",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000",
    date: "2023-12-15",
    category: "味蕾探索",
    readTime: "4 min read"
  },
   {
    id: 4,
    title: "富士山下的露营记",
    excerpt: "逃离城市的喧嚣，在湖边搭起帐篷。清晨的雾气、夜晚的篝火，以及那座永恒的山。",
    content: "没有什么比在自然中醒来更治愈的事情了。这次我们选择了富士山脚下的露营地，这里的空气清新得让人想打包带走。\n\n夜晚，我们围坐在篝火旁，烤着棉花糖，聊着那些平时没空聊的话题。头顶是璀璨的星空，远处是富士山模糊的轮廓。",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=1000",
    date: "2023-12-10",
    category: "旅行日志",
    readTime: "6 min read"
  }
];

const INITIAL_PODCASTS: Podcast[] = [
  {
    id: 101,
    title: "EP01. 为什么我们需要「玩」？",
    description: "在效率至上的时代，重新找回玩乐的纯粹快乐。聊聊游戏化思维如何改变生活。",
    duration: "24:15",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1000",
    date: "2024-01-10",
    tags: ["思维", "生活"]
  },
  {
    id: 102,
    title: "EP02. 声音的风景：东京地铁录音",
    description: "戴上耳机，闭上眼睛。这是一集纯粹的声音纪录片，带你穿梭在东京的地下迷宫。",
    duration: "18:30",
    cover: "https://images.unsplash.com/photo-1596280846682-14f7b243449b?auto=format&fit=crop&q=80&w=1000",
    date: "2024-01-05",
    tags: ["ASMR", "旅行"]
  },
  {
    id: 103,
    title: "EP03. 数字游民的背包",
    description: "采访了三位在世界各地工作的设计师，看看他们的背包里都装了什么生产力工具。",
    duration: "32:00",
    cover: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=1000",
    date: "2023-12-28",
    tags: ["访谈", "科技"]
  }
];

const App = () => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [podcasts] = useState<Podcast[]>(INITIAL_PODCASTS);
  
  type ViewState = 'home' | 'detail' | 'create';
  type TabState = 'blog' | 'podcast';

  const [view, setView] = useState<ViewState>('home');
  const [activeTab, setActiveTab] = useState<TabState>('blog');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // 音频播放器状态
  const [currentTrack, setCurrentTrack] = useState<Podcast | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 表单状态
  const [newPost, setNewPost] = useState<NewPostState>({
    title: '',
    category: '视觉日记',
    image: '',
    excerpt: '',
    content: ''
  });

  // 监听滚动以优化导航栏效果
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const togglePlay = (track: Podcast) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const openDetail = (post: Post) => {
    setSelectedPost(post);
    setView('detail');
    window.scrollTo(0, 0);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    const postToAdd: Post = {
      ...newPost,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      readTime: "1 min read"
    };
    setPosts([postToAdd, ...posts]);
    setView('home');
    setActiveTab('blog');
    setNewPost({ title: '', category: '视觉日记', image: '', excerpt: '', content: '' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1D1D1F] font-sans selection:bg-[#0071E3] selection:text-white">
      {/* 导航栏 - 优化毛玻璃和阴影效果 */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b 
        ${scrolled ? 'bg-white/80 backdrop-blur-xl border-gray-200/60 shadow-sm' : 'bg-transparent border-transparent'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[60px] flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group hover:opacity-80 transition-opacity"
            onClick={() => setView('home')}
          >
            <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center">
                <Sparkles size={16} strokeWidth={2.5} className="animate-pulse-slow"/>
            </div>
            <span className="text-lg font-bold tracking-tight text-[#1D1D1F]">Playxeld</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 bg-gray-100/80 p-1.5 rounded-full border border-gray-200/50 backdrop-blur-sm">
            <button 
              onClick={() => { setView('home'); setActiveTab('blog'); }}
              className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${view === 'home' && activeTab === 'blog' ? 'bg-white text-black shadow-sm ring-1 ring-black/5' : 'text-gray-500 hover:text-black hover:bg-gray-200/50'}`}
            >
              Stories
            </button>
            <button 
              onClick={() => { setView('home'); setActiveTab('podcast'); }}
              className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${view === 'home' && activeTab === 'podcast' ? 'bg-white text-black shadow-sm ring-1 ring-black/5' : 'text-gray-500 hover:text-black hover:bg-gray-200/50'}`}
            >
              Podcasts
            </button>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-400 hover:text-black transition-colors">
               <span className="sr-only">Search</span>
               {/* Search icon placeholder for future use */}
            </button>
            <button 
              onClick={() => setView('create')}
              className="bg-[#1D1D1F] text-white px-5 py-2 rounded-full text-xs font-semibold hover:bg-black hover:scale-105 transition-all active:scale-95 flex items-center gap-1.5 shadow-lg shadow-black/10"
            >
              <Plus size={14} strokeWidth={3} />
              <span>Create</span>
            </button>
          </div>

          <button className="md:hidden text-[#1D1D1F] p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Layout size={24} />}
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100 p-6 space-y-4 absolute w-full animate-in fade-in slide-in-from-top-4 z-40 shadow-xl">
            <button onClick={() => {setView('home'); setActiveTab('blog'); setIsMenuOpen(false);}} className="w-full text-left py-3 font-semibold text-lg text-[#1D1D1F] border-b border-gray-100">
              Stories
            </button>
            <button onClick={() => {setView('home'); setActiveTab('podcast'); setIsMenuOpen(false);}} className="w-full text-left py-3 font-semibold text-lg text-[#1D1D1F] border-b border-gray-100">
              Podcasts
            </button>
            <button 
              onClick={() => {setView('create'); setIsMenuOpen(false);}}
              className="w-full bg-[#0071E3] text-white p-4 rounded-2xl font-semibold flex items-center justify-center gap-2 mt-4 text-base"
            >
              <Plus size={20} />
              <span>Create New</span>
            </button>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-32">
        {view === 'home' && (
          <div className="space-y-24 animate-in fade-in duration-700">
            {/* Hero Section - 视觉重构：左右布局或大标题+图片拼贴 */}
            <section className="relative py-12 md:py-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0071E3] text-xs font-bold uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-pulse"></span>
                        New Updates
                    </div>
                    <h1 className="text-6xl md:text-8xl font-semibold text-[#1D1D1F] tracking-tighter leading-[0.95]">
                      All We Need<br/>Is <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#42a1ff]">Play.</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-md leading-relaxed font-light">
                      Playxeld 是一个数字游乐场。在这里，我们将简单、纯粹的灵感转化为视觉与声音的故事。
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2">
                         <button className="px-8 py-3 bg-[#1D1D1F] text-white rounded-full font-semibold hover:bg-black transition-transform hover:scale-105 active:scale-95">
                             Start Exploring
                         </button>
                         <button className="px-8 py-3 bg-white text-[#1D1D1F] border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-colors">
                             Read Manifesto
                         </button>
                    </div>
                </div>
                
                {/* 视觉拼贴 Hero Image */}
                <div className="relative h-[400px] md:h-[500px] hidden lg:block">
                    <div className="absolute top-0 right-0 w-2/3 h-full rounded-[40px] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700 z-10">
                         <img src={posts[0].image} className="w-full h-full object-cover" alt="Hero 1"/>
                    </div>
                    <div className="absolute top-12 right-1/3 w-1/2 h-3/4 rounded-[32px] overflow-hidden shadow-xl -rotate-6 hover:-rotate-3 transition-all duration-700 bg-white p-2 z-0">
                         <div className="w-full h-full rounded-[24px] overflow-hidden relative">
                             <img src={posts[1].image} className="w-full h-full object-cover" alt="Hero 2"/>
                             <div className="absolute inset-0 bg-black/10"></div>
                         </div>
                    </div>
                    {/* 装饰元素 */}
                    <div className="absolute bottom-20 left-10 p-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg z-20 flex items-center gap-3 animate-bounce-slow">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                            <Sparkles size={20}/>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-900">Featured</p>
                            <p className="text-[10px] text-gray-500">Editor's Choice</p>
                        </div>
                    </div>
                </div>
              </div>
            </section>

            {/* 内容区域：博客模式 */}
            {activeTab === 'blog' && (
              <div className="space-y-12">
                <div className="flex items-end justify-between border-b border-gray-200 pb-6 sticky top-[60px] bg-[#FAFAFA]/95 backdrop-blur z-30 pt-4">
                  <div>
                      <h2 className="text-3xl font-bold tracking-tight text-[#1D1D1F]">Latest Stories</h2>
                      <p className="text-gray-500 mt-1 text-sm">探索生活中的每一个微小瞬间</p>
                  </div>
                  <div className="flex gap-2 hidden sm:flex">
                    {['全部', '摄影', '生活', '美食', '旅行'].map((tag, idx) => (
                      <button key={tag} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${idx === 0 ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-black'}`}>
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                  {posts.map((post, idx) => (
                    <article 
                      key={post.id} 
                      className="group cursor-pointer flex flex-col gap-5"
                      onClick={() => openDetail(post)}
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-gray-200 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:translate-y-[-4px]">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000"; }}
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-black uppercase tracking-wide shadow-sm">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2.5 px-1">
                        <div className="flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wide">
                          <span>{post.date}</span>
                          <span className="flex items-center gap-1">{post.readTime}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors leading-tight">
                          {post.title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed font-normal">
                          {post.excerpt}
                        </p>
                        <div className="pt-2 flex items-center gap-1 text-[#0071E3] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                             Read Story <ArrowRight size={12}/>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'podcast' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8">
                 <div className="flex items-end justify-between border-b border-gray-200 pb-6">
                  <div>
                      <h2 className="text-3xl font-bold tracking-tight text-[#1D1D1F]">Weekly Podcasts</h2>
                      <p className="text-gray-500 mt-1 text-sm">戴上耳机，听见世界的另一种声音</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {podcasts.map((podcast, idx) => (
                    <div 
                      key={podcast.id}
                      style={{ animationDelay: `${idx * 100}ms` }}
                      className={`relative bg-white rounded-[32px] p-6 pr-10 transition-all duration-300 flex flex-col md:flex-row gap-8 items-center group hover:shadow-xl hover:translate-y-[-2px] border border-gray-100
                        ${currentTrack?.id === podcast.id ? 'ring-2 ring-[#0071E3] ring-offset-2' : ''}
                      `}
                    >
                      <div className="relative w-full md:w-48 aspect-square shrink-0 rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
                        <img src={podcast.cover} alt={podcast.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <button 
                          onClick={() => togglePlay(podcast)}
                          className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]"
                        >
                          <div className="w-14 h-14 bg-white/95 backdrop-blur rounded-full flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-all text-black">
                             {currentTrack?.id === podcast.id && isPlaying ? <Pause size={24} className="fill-current"/> : <Play size={24} className="fill-current ml-1"/>}
                          </div>
                        </button>
                      </div>
                      
                      <div className="flex-1 space-y-4 text-center md:text-left w-full py-2">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                           <span className="px-2.5 py-0.5 rounded-md bg-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider">{podcast.date}</span>
                           <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[10px] font-bold text-blue-600 uppercase tracking-wider">{podcast.duration}</span>
                        </div>
                        
                        <div>
                          <h3 className="text-2xl font-bold text-[#1D1D1F] mb-2">{podcast.title}</h3>
                          <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">{podcast.description}</p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                          {podcast.tags.map(tag => (
                            <span key={tag} className="text-xs font-medium text-gray-400 hover:text-[#0071E3] cursor-pointer transition-colors">#{tag}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="hidden md:block">
                          <button 
                             onClick={() => togglePlay(podcast)}
                             className={`flex items-center justify-center w-12 h-12 rounded-full border transition-all
                                ${currentTrack?.id === podcast.id && isPlaying 
                                    ? 'bg-[#1D1D1F] text-white border-transparent' 
                                    : 'border-gray-200 text-gray-400 hover:border-[#1D1D1F] hover:text-[#1D1D1F]'}
                             `}
                           >
                             {currentTrack?.id === podcast.id && isPlaying ? <Pause size={20} fill="currentColor"/> : <Play size={20} fill="currentColor" className="ml-1"/>}
                           </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 文章详情视图 - 沉浸式阅读体验 */}
        {view === 'detail' && selectedPost && (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-500 pt-8">
            <button 
              onClick={() => setView('home')}
              className="flex items-center space-x-2 text-gray-500 hover:text-black transition-colors mb-4 group text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-100 w-fit"
            >
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
            
            <div className="space-y-8 text-center max-w-2xl mx-auto">
               <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#0071E3] text-xs font-bold tracking-wide uppercase">
                  {selectedPost.category}
               </div>
               <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1D1D1F] leading-[1.1]">
                  {selectedPost.title}
               </h1>
               <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-medium">
                  <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                      <span className="text-gray-900">Playxeld Team</span>
                  </div>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
               </div>
            </div>

            <div className="rounded-[32px] overflow-hidden shadow-2xl aspect-[21/9]">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="prose prose-lg prose-slate max-w-2xl mx-auto pb-20">
                 <p className="text-2xl text-gray-600 font-normal leading-relaxed mb-12 first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left">
                   {selectedPost.excerpt}
                 </p>
                 {selectedPost.content.split('\n').map((para, i) => (
                   <p key={i} className="text-[#1D1D1F] leading-8 mb-8 text-lg font-light tracking-wide text-justify">
                     {para}
                   </p>
                 ))}
                 
                 <div className="my-12 pt-12 border-t border-gray-100 flex justify-between items-center">
                     <div className="text-sm font-bold text-gray-900">Share this story</div>
                     <div className="flex gap-4">
                        <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-colors"><Twitter size={18}/></button>
                        <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-colors"><Mail size={18}/></button>
                     </div>
                 </div>
            </div>
          </div>
        )}

        {/* 发布视图 - 模态框样式 */}
        {view === 'create' && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
             <div className="absolute inset-0" onClick={() => setView('home')}></div>
             <div className="relative w-full max-w-2xl bg-white p-8 md:p-12 rounded-[40px] shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-8 sticky top-0 bg-white pb-4 border-b border-gray-100 z-10">
                  <h2 className="text-3xl font-bold text-[#1D1D1F]">
                    Create Story
                  </h2>
                  <button onClick={() => setView('home')} className="p-2 rounded-full hover:bg-gray-100 transition-colors bg-gray-50">
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>
                
                <form onSubmit={handlePublish} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Title</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter a captivating title..."
                      className="w-full py-3 px-4 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:ring-2 focus:ring-[#0071E3] focus:outline-none transition-all text-xl font-semibold placeholder:text-gray-300 placeholder:font-normal"
                      value={newPost.title}
                      onChange={e => setNewPost({...newPost, title: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Category</label>
                      <div className="relative">
                          <select 
                            className="w-full py-3 px-4 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:ring-2 focus:ring-[#0071E3] focus:outline-none font-medium appearance-none"
                            value={newPost.category}
                            onChange={e => setNewPost({...newPost, category: e.target.value})}
                          >
                            <option>视觉日记</option>
                            <option>生活方式</option>
                            <option>味蕾探索</option>
                            <option>灵感笔记</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                              <ChevronRight size={16} className="rotate-90"/>
                          </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Cover Image URL</label>
                      <input 
                        type="url" 
                        placeholder="https://..."
                        className="w-full py-3 px-4 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:ring-2 focus:ring-[#0071E3] focus:outline-none transition-all font-light"
                        value={newPost.image}
                        onChange={e => setNewPost({...newPost, image: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Excerpt</label>
                    <input 
                      type="text" 
                      required
                      placeholder="A short summary..."
                      className="w-full py-3 px-4 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:ring-2 focus:ring-[#0071E3] focus:outline-none font-light"
                      value={newPost.excerpt}
                      onChange={e => setNewPost({...newPost, excerpt: e.target.value})}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Content</label>
                    <textarea 
                      required
                      rows={8}
                      placeholder="Start writing your story..."
                      className="w-full py-3 px-4 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:ring-2 focus:ring-[#0071E3] focus:outline-none resize-none leading-relaxed font-light"
                      value={newPost.content}
                      onChange={e => setNewPost({...newPost, content: e.target.value})}
                    ></textarea>
                  </div>

                  <div className="pt-4 flex gap-4">
                     <button type="button" onClick={() => setView('home')} className="flex-1 py-4 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-100 transition-colors">Cancel</button>
                     <button 
                      type="submit"
                      className="flex-[2] bg-[#1D1D1F] text-white py-4 rounded-xl font-bold text-sm hover:bg-black transition-colors shadow-xl shadow-black/10 active:scale-[0.98]"
                    >
                      Publish Story
                    </button>
                  </div>
                </form>
             </div>
          </div>
        )}
      </main>

      {/* 固定底部播放器 - 动态岛风格 */}
      {currentTrack && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-[500px] bg-[#1D1D1F]/90 backdrop-blur-2xl text-white p-3 pr-6 rounded-[24px] shadow-2xl z-50 animate-in slide-in-from-bottom-20 flex items-center gap-4 ring-1 ring-white/10">
           <div className={`relative w-12 h-12 rounded-full overflow-hidden shrink-0 ${isPlaying ? 'animate-spin-slow' : ''}`}>
              <img src={currentTrack.cover} className="w-full h-full object-cover" alt="cover"/>
              <div className="absolute inset-0 bg-black/10 border border-white/10 rounded-full"></div>
           </div>
           
           <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
              <h4 className="font-bold text-sm text-white truncate">{currentTrack.title}</h4>
              <p className="text-[10px] text-gray-400 font-medium truncate uppercase tracking-wider">Now Playing • {currentTrack.duration}</p>
           </div>

           <div className="flex items-center gap-5">
               <button className="text-gray-400 hover:text-white transition-colors"><ChevronLeft size={22} className="rotate-180"/></button>
               <button 
                 onClick={() => setIsPlaying(!isPlaying)}
                 className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
               >
                  {isPlaying ? <Pause size={18} fill="currentColor"/> : <Play size={18} fill="currentColor" className="ml-1"/>}
               </button>
               <button className="text-gray-400 hover:text-white transition-colors"><ChevronLeft size={22}/></button>
           </div>
           
           <button onClick={() => setCurrentTrack(null)} className="absolute -top-3 -right-3 p-1.5 bg-gray-200 text-black rounded-full shadow-md hover:scale-110 transition-transform">
             <X size={12} strokeWidth={3}/>
           </button>
        </div>
      )}

      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2 space-y-4">
              <div className="flex items-center gap-2 text-[#1D1D1F]">
                <div className="w-6 h-6 bg-black text-white rounded-md flex items-center justify-center">
                    <Sparkles size={12} strokeWidth={3}/>
                </div>
                <span className="font-bold tracking-tight text-lg">Playxeld</span>
              </div>
              <p className="text-sm text-gray-400 max-w-xs leading-relaxed font-medium">
                Designed for storytellers. <br/>Crafted with precision and joy.
              </p>
            </div>
            
            <div className="space-y-4">
               <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Platform</h4>
               <ul className="space-y-2 text-sm text-gray-500 font-medium">
                   <li><button className="hover:text-[#0071E3] transition-colors">Stories</button></li>
                   <li><button className="hover:text-[#0071E3] transition-colors">Podcasts</button></li>
                   <li><button className="hover:text-[#0071E3] transition-colors">Creators</button></li>
               </ul>
            </div>

            <div className="space-y-4">
               <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Company</h4>
               <ul className="space-y-2 text-sm text-gray-500 font-medium">
                   <li><button className="hover:text-[#0071E3] transition-colors">About</button></li>
                   <li><button className="hover:text-[#0071E3] transition-colors">Careers</button></li>
                   <li><button className="hover:text-[#0071E3] transition-colors">Privacy</button></li>
               </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[11px] text-gray-400 font-medium">
                © 2024 Playxeld Inc. All rights reserved.
            </div>
            <div className="flex gap-6">
               <button className="text-gray-400 hover:text-black transition-colors"><Twitter size={18}/></button>
               <button className="text-gray-400 hover:text-black transition-colors"><Github size={18}/></button>
               <button className="text-gray-400 hover:text-black transition-colors"><Mail size={18}/></button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
