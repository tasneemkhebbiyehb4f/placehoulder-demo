import { UserContext } from "../../context/userContext";
import PostMenu from "./PostMenu";
import CommentsSection from "./Comments/CommentsSection";
import { useContext } from "react";

const PostCard = ({
    post,
    onPostDeleted,
    onPostUpdated,
}) => {
    const { currentUser } = useContext(UserContext);

    const isOwner =
       Number(currentUser?.id)  === Number(post.userId);

    return (
        <article>
            <div>
                <strong>
                    User {post.userId}
                </strong>

                {isOwner && (
                    <PostMenu
                        post={post}
                        onPostDeleted={onPostDeleted}
                        onPostUpdated={onPostUpdated}
                    />
                )}
            </div>

            <h2>{post.title}</h2>

            <p>{post.body}</p>

            <CommentsSection
                postId={post.id}
            />
        </article>
    );
};

export default PostCard;