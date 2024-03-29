import { useState } from "react";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { useParams } from "react-router-dom";
import DOMPurify from "isomorphic-dompurify";
import { FaCommentAlt } from "react-icons/fa";
import TopicIdeasDetails from "./TopicIdeasDetails/TopicIdeaDetails";
import useFetchLazy from "../../../../../../services/useFetchLazy";
import useCurrentUser from "../../../../../../services/useCurrentUser";

function IdeaCard({
  id,
  creatorId,
  title,
  creatorName,
  description,
  nbUpVotes,
  nbComment,
  canVote,
  triggerGetIdeas,
  isTopicClosed,
}) {
  const { currentUser } = useCurrentUser();

  const { id: topicId } = useParams();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isViewCommentOpen, setIsViewCommentOpen] = useState(false);

  const { trigger: triggerDownvoteIdea } = useFetchLazy({
    path: `/votes/ideas/${id}/downvote`,
    method: "put",
  });

  const { trigger: triggerUpvoteIdea } = useFetchLazy({
    path: `/votes/ideas/${id}/upvote`,
    method: "post",
  });

  const { trigger: triggerDeleteIdea } = useFetchLazy({
    path: `/topics/${topicId}/ideas/${id}`,
    method: "delete",
  });

  const upvoteFunction = async () => {
    if (isTopicClosed) return alert("This topic is closed");

    await triggerUpvoteIdea();
    triggerGetIdeas();
    return null;
  };

  const downvoteFunction = async () => {
    if (isTopicClosed) return alert("This topic is closed");

    await triggerDownvoteIdea();
    triggerGetIdeas();
    return null;
  };

  const handleDelete = async () => {
    await triggerDeleteIdea();
    triggerGetIdeas();
  };

  return !isPopupOpen ? (
    <>
      <div className="ideaCard">
        <div className="ideaCard__open">
          <div className="ideaCard__main">
            <h3 className="ideaCard__title">{title}</h3>
            <div className="ideaCard__creatorName">by {creatorName}</div>
          </div>
          <div
            className="ideaCard__description"
            readOnly
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
          />
          <div className="ideaCard__interactions">
            <div className="ideaCard__nbUpVote">
              <div>{nbUpVotes}</div>
              {canVote ? (
                <div className="ideaCard__vote">
                  <BiUpvote
                    onClick={upvoteFunction}
                    style={{
                      paddingLeft: "5px",
                    }}
                  />
                </div>
              ) : (
                <div>
                  <BiDownvote
                    onClick={downvoteFunction}
                    style={{
                      paddingLeft: "5px",
                    }}
                  />
                </div>
              )}
            </div>
            <div className="ideaCard__nbComment">
              <div>{nbComment}</div>
              <div>
                <div style={{ padding: "1px 6px" }}>
                  <FaCommentAlt style={{ fontSize: "1rem" }} />
                </div>
              </div>
            </div>
          </div>
          <div className="ideaCard__delete">
            {creatorId === currentUser?.id && (
              <button
                type="button"
                className="button-delete"
                onClick={() => setIsPopupOpen(true)}
              >
                Delete
              </button>
            )}
            <button
              type="button"
              className="button-comments"
              onClick={() => setIsViewCommentOpen(!isViewCommentOpen)}
            >
              {isViewCommentOpen ? "Hide comments" : "View comments"}
            </button>
          </div>
        </div>
      </div>
      {isViewCommentOpen && (
        <div className="comments-container">
          <div className="divider" />
          <TopicIdeasDetails ideaId={id} />
        </div>
      )}
    </>
  ) : (
    <div className="ideaCard">
      <div className="popup__open">
        <p style={{ fontSize: "18px" }}>
          Are you sure you want to delete this idea?
        </p>
        <div className="popup__open__buttons">
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
    </div>
  );
}

export default IdeaCard;
