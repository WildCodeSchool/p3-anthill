import { BiUpvote, BiDownvote } from "react-icons/bi";
import DeleteCommentButton from "./DeleteCommentButton";
import "./CommentCard.css";
import useFetchLazy from "../../../../../services/useFetchLazy";

function CommentCard({
  id,
  pseudo,
  picture,
  content,
  upVote,
  canVote,
  triggerGetComments,
  comment,
}) {
  const { trigger: triggerDownvoteComment } = useFetchLazy({
    path: `/votes/comments/${id}/downvote`,
    method: "put",
  });

  const { trigger: triggerUpvoteComment } = useFetchLazy({
    path: `/votes/comments/${id}/upvote`,
    method: "post",
  });

  const upvoteFunction = async () => {
    await triggerUpvoteComment();
    triggerGetComments();
  };

  const downvoteFunction = async () => {
    await triggerDownvoteComment();
    triggerGetComments();
  };

  return (
    <div className="commentCard">
      <div className="commentCard__info">
        <div className="commentCard__main">
          <img src={picture} alt="avatar" />
          <div className="commentCard__creatorName">{pseudo}</div>
        </div>
        <p className="commentCard__description">{content}</p>
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
