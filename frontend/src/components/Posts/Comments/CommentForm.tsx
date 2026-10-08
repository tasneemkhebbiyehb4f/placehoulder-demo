import { useContext, useState } from "react";
import { UserContext } from "../../../context/userContext";
import {
    createComment,
} from "../../../services/commentsService.tsx";

const CommentForm = ({
    postId,
    onCommentAdded,
}) => {
    const { currentUser } =
        useContext(UserContext);

    const [body, setBody] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!body.trim()) {
            return;
        }

        try {
            const newComment =
                await createComment({
                    postId,
                    name: currentUser.name,
                    email: currentUser.email,
                    body: body.trim(),
                });

            onCommentAdded(newComment);

            setBody("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={body}
                onChange={(e) =>
                    setBody(e.target.value)
                }
                placeholder="Write a comment..."
            />

            <button type="submit">
                Comment
            </button>
        </form>
    );
};

export default CommentForm;