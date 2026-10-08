import { useState } from "react";
import {
    deletePost,
    updatePost,
} from "../../services/postService";

const PostMenu = ({
    post,
    onPostDeleted,
    onPostUpdated,
}) => {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(false);

    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);

    const handleDelete = async () => {
        try {
            await deletePost(post.id);

            onPostDeleted(post.id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async () => {
        try {
            const updatedPost = await updatePost(
                post.id,
                {
                    title,
                    body,
                }
            );

            onPostUpdated(updatedPost);

            setEditing(false);
            setOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    if (editing) {
        return (
            <div>
                <input
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <textarea
                    value={body}
                    onChange={(e) =>
                        setBody(e.target.value)
                    }
                />

                <button onClick={handleUpdate}>
                    Save
                </button>

                <button
                    onClick={() => setEditing(false)}
                >
                    Cancel
                </button>
            </div>
        );
    }

    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
            >
                ⋮
            </button>

            {open && (
                <div>
                    <button
                        onClick={() => setEditing(true)}
                    >
                        Edit
                    </button>

                    <button
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default PostMenu;