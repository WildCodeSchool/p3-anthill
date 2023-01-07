import { BiUpvote } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import CommentPopover from "./CommentPopover";

function IdeaCard({
  id,
  title,
  creatorName,
  description,
  nbUpVote,
  nbComment,
}) {
  return (
    <div className="ideaCard">
      <div className="ideaCard__main">
        <Link to={`ideas/${id}`}>
          <h3 className="ideaCard__title">{title}</h3>
        </Link>
        <div className="ideaCard__creatorName">{creatorName}</div>
      </div>
      <p className="ideaCard__description">{description}</p>
      <div className="ideaCard__interactions">
        <div className="ideaCard__nbUpVote">
          {nbUpVote} <BiUpvote />
        </div>
        <div className="ideaCard__nbComment">
          {nbComment} <CommentPopover ideaId={id} />
          <FaCommentAlt />
        </div>
      </div>
    </div>
  );
}

export default IdeaCard;
