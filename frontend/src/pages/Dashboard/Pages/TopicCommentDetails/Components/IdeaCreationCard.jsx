import axios from "axios";
import { useState } from "react";
import { BiUpvote } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";

function IdeaCreationCard({ commentModeId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    axios
      .post("http://localhost:5000/api/ideas", {
        title,
        description,
        commentModeId,
      })
      .then((res) => {
        setTitle(res.data);
        setDescription(res.data);
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
        <input
          type="text"
          id="ideaInput"
          value={title}
          onChange={handleTitleChange}
        />
        <label htmlFor="description-input">Description :</label>
        <input
          type="text"
          id="descriptionInput"
          value={description}
          onChange={handleDescriptionChange}
        />
        {error && <p>{error.message}</p>}
        <button type="submit" id="ideaCreationCard__button">
          {isLoading ? "Loading..." : "Add"}
        </button>
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
