import { BiUpvote } from "react-icons/bi";
import { Link } from "react-router-dom";
import CommentPopover from "./CommentPopover";
import DeleteIdeaButton from "./DeleteIdeaButton";

function IdeaCard({
  id,
  title,
  creatorName,
  description,
  nbUpVote,
  nbComment,
  triggerGetIdeas,
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
          <div>{nbComment}</div>
          <div>
            <CommentPopover ideaId={id} />
          </div>
        </div>
      </div>
      <DeleteIdeaButton ideaId={id} triggerGetIdeas={triggerGetIdeas} />
    </div>
  );
}

export default IdeaCard;
