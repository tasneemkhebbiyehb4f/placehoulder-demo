
import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/Posts/PostCard";
import { UserContext } from "../../context/userContext"
import {
    getUserPosts,
} from "../../services/postService";

const MyPosts = () => {
    const { currentUser } =
        useContext(UserContext);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (!currentUser) {
            return;
        }

        const fetchPosts = async () => {
            try {
                const data =
                    await getUserPosts(
                        currentUser.id
                    );

                setPosts(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, [currentUser]);

    const handlePostDeleted = (postId) => {
        setPosts((prevPosts) =>
            prevPosts.filter(
                (post) => post.id !== postId
            )
        );
    };

    const handlePostUpdated = (updatedPost) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === updatedPost.id
                    ? updatedPost
                    : post
            )
        );
    };

    return (
        <>
            <Navbar />

            <main>
                <h1>My Posts</h1>

                {posts.length === 0 ? (
                    <p>No posts found.</p>
                ) : (
                    posts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onPostDeleted={
                                handlePostDeleted
                            }
                            onPostUpdated={
                                handlePostUpdated
                            }
                        />
                    ))
                )}
            </main>
        </>
    );
};

export default MyPosts;