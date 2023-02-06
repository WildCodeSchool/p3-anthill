import { BiUpvote, BiDownvote } from "react-icons/bi";
import DOMPurify from "isomorphic-dompurify";
import DeleteCommentButton from "./DeleteCommentButton";
import "./CommentCard.css";
import useFetchLazy from "../../../../../services/useFetchLazy";
import useCurrentUser from "../../../../../services/useCurrentUser";

function CommentCard({
  id,
  pseudo,
  content,
  upVote,
  canVote,
  triggerGetComments,
  comment,
  isClosed,
}) {
  const { trigger: triggerDownvoteComment } = useFetchLazy({
    path: `/votes/comments/${id}/downvote`,
    method: "put",
  });

  const { trigger: triggerUpvoteComment } = useFetchLazy({
    path: `/votes/comments/${id}/upvote`,
    method: "post",
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

  return (
    <div className="commentCard">
      <div className="commentCard__info">
        <div className="commentCard__main">
          <img src={currentUser?.picture} alt="avatar" />
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
        <DeleteCommentButton
          comment={comment}
          triggerGetComments={triggerGetComments}
        />
      </div>
    </div>
  );
}

export default CommentCard;
