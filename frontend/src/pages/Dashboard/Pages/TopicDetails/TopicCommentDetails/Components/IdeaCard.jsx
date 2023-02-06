import { BiUpvote, BiDownvote } from "react-icons/bi";
import { Link } from "react-router-dom";
import DOMPurify from "isomorphic-dompurify";
import CommentPopover from "./CommentPopover";
import DeleteIdeaButton from "./DeleteIdeaButton";
import useFetchLazy from "../../../../../../services/useFetchLazy";

function IdeaCard({
  id,
  title,
  creatorName,
  description,
  nbUpVotes,
  nbComment,
  canVote,
  triggerGetIdeas,
  isClosed,
}) {
  const { trigger: triggerDownvoteIdea } = useFetchLazy({
    path: `/votes/ideas/${id}/downvote`,
    method: "put",
  });

  const { trigger: triggerUpvoteIdea } = useFetchLazy({
    path: `/votes/ideas/${id}/upvote`,
    method: "post",
  });

  const upvoteFunction = async () => {
    if (isClosed) return alert("This topic is closed");

    await triggerUpvoteIdea();
    triggerGetIdeas();
    return null;
  };

  const downvoteFunction = async () => {
    if (isClosed) return alert("This topic is closed");

    await triggerDownvoteIdea();
    triggerGetIdeas();
    return null;
  };

  return (
    <div className="ideaCard">
      <div className="ideaCard__main">
        <Link to={`ideas/${id}`}>
          <h3 className="ideaCard__title">{title}</h3>
        </Link>
        <div className="ideaCard__creatorName">{creatorName}</div>
      </div>
      <div
        className="ideaCard__description"
        readOnly
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
      />
      <div className="ideaCard__interactions">
        <div className="ideaCard__nbUpVote">
          {nbUpVotes}
          {canVote ? (
            <BiUpvote onClick={upvoteFunction} />
          ) : (
            <BiDownvote onClick={downvoteFunction} />
          )}
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
