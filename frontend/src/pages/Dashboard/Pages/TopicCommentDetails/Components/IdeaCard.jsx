import { BiUpvote } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import { useState } from "react";
import TopicIdeasDetails from "../../TopicIdeasDetails";

function IdeaCard({
  id,
  title,
  creatorName,
  description,
  nbUpVote,
  nbComment,
}) {
  const [isClicked, setIsClicked] = useState(false);
  function handleClick() {
    setIsClicked(!isClicked);
  }

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
          {nbComment} <FaCommentAlt onClick={() => handleClick()} />
          {isClicked ? <TopicIdeasDetails key={id} ideaId={id} /> : ""}
        </div>
      </div>
    </div>
  );
}

export default IdeaCard;
