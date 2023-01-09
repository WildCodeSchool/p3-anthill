import { useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CommentCreate.css";

function CommentCreate() {
  const refContent = useRef();
  const { topicId, ideaId } = useParams();

  function handleSubmit(e) {
    e.preventDefault();
    const data = JSON.stringify({
      content: refContent.current.value,
      upVote: 0,
      userId: 1, // getCurrentUser
      ideaId,
      commentId: null,
    });

    const config = {
      method: "post",
      url: `${
        import.meta.env.VITE_BACKEND_URL
      }/api/topics/${topicId}/ideas/${ideaId}/comments`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    axios(config)
      .then(() => {})
      .catch(() => {});
  }

  return (
    <div className="commentCreate">
      <div className="commentCreate__main">
        <form className="commentCreate__form">
          <label htmlFor="commentContent">Your comment</label>
          <input type="textarea" ref={refContent} />
          <button onClick={handleSubmit} type="button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentCreate;
