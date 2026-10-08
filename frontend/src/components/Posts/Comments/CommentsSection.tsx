import { getPostComments } from "../../../services/commentsService";

import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { useEffect, useState } from "react";

const CommentsSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (!showComments) {
      return;
    }

    const fetchComments = async () => {
      try {
        const data = await getPostComments(postId);

        setComments(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [postId, showComments]);

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleCommentDeleted = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId),
    );
  };

  const handleCommentUpdated = (updatedComment) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment,
      ),
    );
  };

  return (
    <section>
      <button onClick={() => setShowComments(!showComments)}>
        {showComments ? "Hide comments" : "View comments"}
      </button>

      {showComments && (
        <div>
          <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />

          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onCommentDeleted={handleCommentDeleted}
              onCommentUpdated={handleCommentUpdated}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CommentsSection;
