import { BiUpvote } from "react-icons/bi";

function CommentCard({ comment }) {
  return (
    <div className="commentCard">
      <div className="commentCard__main">
        <img src={comment.picture} alt="avatar" />
        <div className="commentCard__creatorName">{comment.pseudo}</div>
      </div>
      <p className="commentCard__description">{comment.content}</p>
      <div className="commentCard__interactions">
        <div className="commentCard__nbUpVote">
          {comment.up_vote} <BiUpvote />
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
