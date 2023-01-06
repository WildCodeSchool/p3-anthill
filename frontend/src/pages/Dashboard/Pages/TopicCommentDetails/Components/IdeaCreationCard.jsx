import axios from "axios";
import { useState, useRef } from "react";
import { BiUpvote } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";

function IdeaCreationCard({ commentModeId }) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [isCreated, setIsCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    axios
      .post(`${URL}/api/topics/${commentModeId}/ideas/`, {
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        commentModeId,
      })
      .then(() => {
        setIsCreated(true);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="ideaCreationCard">
      <form className="ideaCreationCard__form" onSubmit={handleSubmit}>
        <label htmlFor="idea-input">Idea :</label>
        <input type="text" id="ideaInput" ref={titleRef} />
        <label htmlFor="description-input">Description :</label>
        <input type="text" id="descriptionInput" ref={descriptionRef} />
        {error && <p>{error.message}</p>}
        <button type="submit" id="ideaCreationCard__button">
          {isLoading ? "Loading..." : "Add"}
        </button>
        {isCreated ? <div>Idea created !</div> : <div> </div>}
      </form>

      <div className="ideaCreationCard__interactions">
        <div className="ideaCreationCard__nbUpVote">
          <BiUpvote />
        </div>
        <div className="ideaCreationCard__nbComment">
          <FaCommentAlt />
        </div>
      </div>
    </div>
  );
}

export default IdeaCreationCard;
