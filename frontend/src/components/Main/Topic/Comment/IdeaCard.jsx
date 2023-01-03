import { BiUpvote } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";

function IdeaCard({ title, creatorName, description, nbUpVote, nbComment }) {
  return (
    <div className="ideaCard">
      <div className="ideaCard__main">
        <h3 className="ideaCard__title">{title}</h3>
        <div className="ideaCard__creatorName">{creatorName}</div>
      </div>
      <p className="ideaCard__description">{description}</p>
      <div className="ideaCard__interactions">
        <div className="ideaCard__nbUpVote">
          {nbUpVote} <BiUpvote />
        </div>
        <div className="ideaCard__nbComment">
          {nbComment} <FaCommentAlt />
        </div>
      </div>
    </div>
  );
}

export default IdeaCard;
