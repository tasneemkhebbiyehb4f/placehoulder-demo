import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/Posts/PostCard";

import { getPosts } from "../../services/postService";

const PublicPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();

        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostDeleted = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post,
      ),
    );
  };

  return (
    <>
      <Navbar />

      <main>
        <h1>Public Posts</h1>

        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onPostDeleted={handlePostDeleted}
            onPostUpdated={handlePostUpdated}
          />
        ))}
      </main>
    </>
  );
};

export default PublicPosts;
