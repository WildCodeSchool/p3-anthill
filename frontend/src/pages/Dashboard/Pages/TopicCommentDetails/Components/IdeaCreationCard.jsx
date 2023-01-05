// import axios from "axios";
import { BiUpvote } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";

function IdeaCreationCard() {
  return (
    <div className="ideaCreationCard">
      <form className="ideaCreationCard__form">
        <label htmlFor="idea-input">Idea :</label>
        <input type="text" id="ideaInput" />
        <label htmlFor="description-input">Description :</label>
        <input type="text" id="descriptionInput" />
        <button type="submit" id="ideaCreationCard__button">
          Add
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
