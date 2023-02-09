import { useParams } from "react-router-dom";
import { useState } from "react";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import DOMPurify from "isomorphic-dompurify";
import "./CommentCard.css";
import useFetchLazy from "../../../../../../../../services/useFetchLazy";
import useCurrentUser from "../../../../../../../../services/useCurrentUser";

function CommentCard({
  id,
  pseudo,
  content,
  upVote,
  canVote,
  triggerGetComments,
  creatorId,
  isClosed,
}) {
  const { id: topicId, ideaId } = useParams();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { trigger: triggerDownvoteComment } = useFetchLazy({
    path: `/votes/comments/${id}/downvote`,
    method: "put",
  });

  const { trigger: triggerUpvoteComment } = useFetchLazy({
    path: `/votes/comments/${id}/upvote`,
    method: "post",
  });

  const { trigger: triggerDeleteComment } = useFetchLazy({
    path: `/topics/${topicId}/ideas/${ideaId}/comments/${id}`,
    method: "delete",
  });

  const { currentUser } = useCurrentUser();

  const upvoteFunction = async () => {
    if (isClosed) return alert("This topic is closed");

    await triggerUpvoteComment();
    triggerGetComments();
    return null;
  };

  const downvoteFunction = async () => {
    if (isClosed) return alert("This topic is closed");

    await triggerDownvoteComment();
    triggerGetComments();
    return null;
  };

  const handleDelete = async () => {
    await triggerDeleteComment();
    triggerGetComments();
  };

  return (
    <div className="commentCard">
      {!isPopupOpen ? (
        <>
          <div className="commentCard__info">
            <div className="commentCard__main">
              <img
                src={currentUser?.picture}
                alt="avatar"
                className="commentCard__avatar"
              />
              <div className="commentCard__creatorName">{pseudo}</div>
            </div>
            <p
              className="commentCard__description"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
            />
          </div>

          <div className="commentCard__interactions">
            <div className="commentCard__nbUpVote">
              {upVote}
              {canVote ? (
                <BiUpvote onClick={upvoteFunction} />
              ) : (
                <BiDownvote onClick={downvoteFunction} />
              )}
            </div>
            {creatorId === currentUser?.id && (
              <button
                type="button"
                className="button-delete"
                onClick={() => setIsPopupOpen(true)}
              >
                Delete
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="commentCard__popup">
          <p style={{ fontSize: "18px" }}>
            Are you sure you want to delete this comment?
          </p>
          <div className="commentCard__popup-buttons">
            <button
              type="button"
              className="button-delete"
              onClick={() => setIsPopupOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="button-delete"
              style={{
                backgroundColor: "var(--error)",
                color: "var(--light-color)",
              }}
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentCard;
