import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "./lib/supabase";

type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  published_at: string;
  is_published: boolean;
};

function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (error) {
        console.error("Failed to fetch post:", error);
      } else {
        setPost(data);
      }

      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
        <p>Post not found.</p>
        <p>
          <Link to="/">← Back to home</Link>
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
      <p>
        <Link to="/">← Back to home</Link>
      </p>

      <h1>{post.title}</h1>
      <p>{post.excerpt}</p>
      <small>{new Date(post.published_at).toLocaleDateString()}</small>

      <div style={{ marginTop: "24px", lineHeight: 1.8 }}>{post.content}</div>
    </div>
  );
}

export default PostPage;