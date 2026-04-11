import "./App.css";

type Post = {
  id: number;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  featured?: boolean;
  link?: string;
};

const posts: Post[] = [
  {
    id: 1,
    title: "How I Use Play as a Way to Think",
    date: "April 2026",
    tag: "Essay",
    excerpt:
      "A personal note on why I treat books, cities, games, and conversations not as content to consume, but as systems to play with.",
    featured: true,
    link: "#",
  },
  {
    id: 2,
    title: "Tokyo as a Puzzle Board",
    date: "March 2026",
    tag: "Design",
    excerpt:
      "What urban streets, station exits, and everyday signs can teach us about mystery design, navigation, and storytelling.",
    link: "#",
  },
  {
    id: 3,
    title: "Running, Language, and Repetition",
    date: "February 2026",
    tag: "Notes",
    excerpt:
      "Why improvement often looks boring from the outside: a thought on rhythm, habit, and building fluency through repeated motion.",
    link: "#",
  },
  {
    id: 4,
    title: "Why I Still Love Strange Games",
    date: "January 2026",
    tag: "Games",
    excerpt:
      "Some games do not just entertain. They reorganize attention, memory, and desire. Those are the ones worth keeping.",
    link: "#",
  },
];

function App() {
  const featuredPost = posts.find((post) => post.featured);
  const otherPosts = posts.filter((post) => !post.featured);

  return (
    <div className="site">
      <header className="topbar">
        <div className="brand">PlayXeld</div>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#blog">Blog</a>
          <a href="#notes">Notes</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">Artist / Engineer / Game Creator</p>
          <h1>
            A blog about play,
            <br />
            systems, cities, stories,
            <br />
            and becoming sharper.
          </h1>
          <p className="hero-text">
            I write about games, design, language, films, history, running, and
            the strange mechanics of everyday life.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#blog">
              Read the blog
            </a>
            <a className="button secondary" href="#about">
              About me
            </a>
          </div>
        </section>

        <section id="about" className="section about">
          <div className="section-heading">
            <span>About</span>
            <h2>What this site is for</h2>
          </div>
          <p>
            PlayXeld is my personal space for publishing essays, project notes,
            and ideas. I am interested in the way people think, the way cities
            hide stories, and the way games turn abstract systems into something
            tangible.
          </p>
          <p>
            This is not a corporate portfolio wearing a fake smile. It is a
            workshop, a notebook, and occasionally a small battlefield where I
            test ideas in public.
          </p>
        </section>

        {featuredPost && (
          <section className="section featured">
            <div className="section-heading">
              <span>Featured</span>
              <h2>Latest highlighted post</h2>
            </div>

            <article className="featured-card">
              <div className="post-meta">
                <span>{featuredPost.tag}</span>
                <span>{featuredPost.date}</span>
              </div>
              <h3>{featuredPost.title}</h3>
              <p>{featuredPost.excerpt}</p>
              <a className="text-link" href={featuredPost.link || "#"}>
                Read article →
              </a>
            </article>
          </section>
        )}

        <section id="blog" className="section blog">
          <div className="section-heading">
            <span>Blog</span>
            <h2>Recent writing</h2>
          </div>

          <div className="post-grid">
            {otherPosts.map((post) => (
              <article key={post.id} className="post-card">
                <div className="post-meta">
                  <span>{post.tag}</span>
                  <span>{post.date}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <a className="text-link" href={post.link || "#"}>
                  Read more →
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="notes" className="section notes">
          <div className="section-heading">
            <span>Notes</span>
            <h2>What I usually write about</h2>
          </div>

          <div className="note-list">
            <div className="note-item">
              <h3>Games & Systems</h3>
              <p>
                Mechanics, level design, player psychology, and why some games
                stay alive in the mind long after the screen goes dark.
              </p>
            </div>
            <div className="note-item">
              <h3>Cities & Observation</h3>
              <p>
                Tokyo, maps, walking, visual clues, quiet social rituals, and
                the hidden architecture of ordinary places.
              </p>
            </div>
            <div className="note-item">
              <h3>Language & Practice</h3>
              <p>
                Notes on English, Japanese, speaking, repetition, and the brutal
                comedy of trying to become more precise every day.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="section-heading">
            <span>Contact</span>
            <h2>Say hello</h2>
          </div>
          <p>
            You can replace this section with your email, social links, GitHub,
            or newsletter.
          </p>
          <div className="contact-links">
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://x.com/" target="_blank" rel="noreferrer">
              X / Twitter
            </a>
            <a href="mailto:hello@example.com">Email</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 PlayXeld. Built with React and stubbornness.</p>
      </footer>
    </div>
  );
}

export default App;
