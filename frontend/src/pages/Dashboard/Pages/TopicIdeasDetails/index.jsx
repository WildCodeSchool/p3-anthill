import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../services/useFetch";
import useFetchLazy from "../../../../services/useFetchLazy";
import CommentCard from "./Components/CommentCard";
import CommentCreate from "./Components/CommentCreate";
import "./index.css";

function TopicIdeasDetails() {
  const { topicId, ideaId } = useParams();
  const [isClicked, setIsClicked] = useState(false);

  const {
    trigger: triggerGetComments,
    data: comments,
    loading: loadingComments,
  } = useFetchLazy({
    path: `/topics/${topicId}/ideas/${ideaId}/comments`,
    method: "get",
  });
  const { data: idea, loadingIdea } = useFetch({
    path: `/ideas/${ideaId}`,
    method: "get",
  });
  function handleClick() {
    setIsClicked(true);
  }

  useEffect(() => {
    triggerGetComments();
  }, []);

  return (
    <div className="topicIdeasDetails__main">
      {(loadingComments || loadingIdea) && <h2>LOADING ...</h2>}
      <div>
        <div className="topicIdeasDetails__title">{idea && idea.title}</div>
        <div className="topicIdeaDetails__comments">
          <div className="topicIdeaDetails__commentsList">
            {comments &&
              comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  id={comment.id}
                  pseudo={comment.pseudo}
                  picture={comment.picture}
                  content={comment.content}
                  upVote={comment.up_vote}
                  canVote={comment.canVote}
                  triggerGetComments={triggerGetComments}
                  comment={comment}
                />
              ))}
          </div>
          <div
            className="topicIdeaDetails__create__comment"
            onClick={() => {
              handleClick();
            }}
            tabIndex={0}
            onKeyDown={() => {}}
            role="button"
          >
            {isClicked ? (
              <CommentCreate triggerGetComments={triggerGetComments} />
            ) : (
              <div id="createComment">+</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopicIdeasDetails;
