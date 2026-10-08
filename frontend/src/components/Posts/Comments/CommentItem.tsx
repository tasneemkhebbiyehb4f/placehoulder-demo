import { useContext, useState } from "react";
import { UserContext } from "../../../context/userContext";
import {
    updateComment,
    deleteComment,
} from "../../../services/commentsService";

const CommentItem = ({
    comment,
    onCommentDeleted,
    onCommentUpdated,
}) => {
    const { currentUser } =
        useContext(UserContext);

    const [editing, setEditing] = useState(false);
    const [body, setBody] =
        useState(comment.body);

    const isOwner =
        currentUser?.email === comment.email;

    const handleUpdate = async () => {
        if (!body.trim()) {
            return;
        }

        try {
            const updatedComment =
                await updateComment(
                    comment.id,
                    body.trim()
                );

            onCommentUpdated(updatedComment);

            setEditing(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteComment(comment.id);

            onCommentDeleted(comment.id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <strong>{comment.name}</strong>

            {editing ? (
                <>
                    <textarea
                        value={body}
                        onChange={(e) =>
                            setBody(e.target.value)
                        }
                    />

                    <button
                        onClick={handleUpdate}
                    >
                        Save
                    </button>

                    <button
                        onClick={() =>
                            setEditing(false)
                        }
                    >
                        Cancel
                    </button>
                </>
            ) : (
                <p>{comment.body}</p>
            )}

            {isOwner && !editing && (
                <>
                    <button
                        onClick={() =>
                            setEditing(true)
                        }
                    >
                        Edit
                    </button>

                    <button
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </>
            )}
        </div>
    );
};

export default CommentItem;