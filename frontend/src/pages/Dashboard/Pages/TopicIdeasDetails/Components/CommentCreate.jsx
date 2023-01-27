import { useRef } from "react";
import { useParams } from "react-router-dom";
import "./CommentCreate.css";
import useFetchLazy from "../../../../../services/useFetchLazy";

function CommentCreate({ triggerGetComments }) {
  const refContent = useRef();
  const { topicId, ideaId } = useParams();

  const { trigger: triggerPostComment } = useFetchLazy({
    path: `/topics/${topicId}/ideas/${ideaId}/comments`,
    method: "post",
  });

  const handleSubmit = async () => {
    await triggerPostComment({ content: refContent.current?.value });
    triggerGetComments();
    refContent.current.value = "";
  };

  return (
    <div className="commentCreate">
      <div className="commentCreate__main">
        <form className="commentCreate__form">
          <label htmlFor="commentContent" className="commentCreate__title">
            Your comment
          </label>
          <input type="textarea" ref={refContent} />
          <button onClick={handleSubmit} type="button" className="button-send">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentCreate;
