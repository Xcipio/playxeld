import React, { useState, useEffect } from 'react';

// 定义数据类型
interface Comment {
  id: number;
  author: string;
  text: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  comments: Comment[];
}

export default function App() {
  // 从本地缓存读取数据，如果没有则显示默认文章
  const [posts, setPosts] = useState<Post[]>(() => {
    const savedPosts = localStorage.getItem('playxeld_posts');
    if (savedPosts) {
      return JSON.parse(savedPosts);
    }
    return [
      {
        id: 1,
        title: "深入理解苏格拉底的质问",
        content: "苏格拉底的处方：治疗现代人的“回声室效应”与“概念通胀”...\n我们在推特/微博上互相叫骂，却从来没想过这些词到底是什么意思。",
        comments: [{ id: 1, author: "读者", text: "非常受启发！" }]
      }
    ];
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [commentInputs, setCommentInputs] = useState<Record<number, { author: string; text: string }>>({});

  // 每次文章数据改变时，保存到本地缓存
  useEffect(() => {
    localStorage.setItem('playxeld_posts', JSON.stringify(posts));
  }, [posts]);

  // 保存或发布文章
  const handleSavePost = () => {
    if (!editTitle || !editContent) {
      alert('标题和内容不能为空！');
      return;
    }

    if (currentPostId !== null) {
      // 更新现有文章
      setPosts(posts.map(p => (p.id === currentPostId ? { ...p, title: editTitle, content: editContent } : p)));
    } else {
      // 发布新文章
      const newPost: Post = {
        id: Date.now(),
        title: editTitle,
        content: editContent,
        comments: []
      };
      setPosts([newPost, ...posts]);
    }
    cancelEdit();
  };

  const startEdit = (post: Post) => {
    setIsEditing(true);
    setCurrentPostId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
    window.scrollTo(0, 0);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentPostId(null);
    setEditTitle('');
    setEditContent('');
  };

  // 提交评论
  const handleAddComment = (postId: number) => {
    const input = commentInputs[postId] || { author: '', text: '' };
    if (!input.text) {
      alert('评论内容不能为空！');
      return;
    }

    const newComment: Comment = {
      id: Date.now(),
      author: input.author || '匿名',
      text: input.text
    };

    setPosts(
      posts.map(p => {
        if (p.id === postId) {
          return { ...p, comments: [...p.comments, newComment] };
        }
        return p;
      })
    );

    setCommentInputs({ ...commentInputs, [postId]: { author: '', text: '' } });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif', color: '#333' }}>
      <h1 style={{ textAlign: 'center', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>PlayxelD 思想博客</h1>

      {/* 发布/编辑区域 */}
      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2>{isEditing ? '编辑文章' : '发布新文章'}</h2>
        <input
          type="text"
          placeholder="文章标题"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
        <textarea
          placeholder="正文内容..."
          rows={6}
          value={editContent}
          onChange={e => setEditContent(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
        <button onClick={handleSavePost} style={{ padding: '10px 20px', background: '#333', color: 'white', border: 'none', cursor: 'pointer' }}>
          {isEditing ? '保存修改' : '发布文章'}
        </button>
        {isEditing && (
          <button onClick={cancelEdit} style={{ padding: '10px 20px', background: '#ccc', color: 'black', border: 'none', cursor: 'pointer', marginLeft: '10px' }}>
            取消
          </button>
        )}
      </div>

      {/* 文章列表区域 */}
      <div>
        {posts.map(post => (
          <div key={post.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0 }}>{post.title}</h2>
              <button onClick={() => startEdit(post)} style={{ padding: '5px 10px', cursor: 'pointer' }}>编辑</button>
            </div>
            <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{post.content}</p>

            {/* 评论区 */}
            <div style={{ marginTop: '20px', borderTop: '1px dashed #ccc', paddingTop: '10px' }}>
              <h4 style={{ margin: '10px 0' }}>评论区 ({post.comments.length})</h4>
              {post.comments.map(c => (
                <div key={c.id} style={{ background: '#f1f1f1', padding: '8px', marginBottom: '5px', borderRadius: '4px', fontSize: '14px' }}>
                  <strong>{c.author}: </strong> {c.text}
                </div>
              ))}
              
              <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="昵称"
                  value={commentInputs[post.id]?.author || ''}
                  onChange={e => setCommentInputs({ ...commentInputs, [post.id]: { ...commentInputs[post.id], author: e.target.value } })}
                  style={{ flex: 1, padding: '5px' }}
                />
                <input
                  type="text"
                  placeholder="说点什么..."
                  value={commentInputs[post.id]?.text || ''}
                  onChange={e => setCommentInputs({ ...commentInputs, [post.id]: { ...commentInputs[post.id], text: e.target.value } })}
                  style={{ flex: 3, padding: '5px' }}
                />
                <button onClick={() => handleAddComment(post.id)} style={{ padding: '5px 15px' }}>提交</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
