import { useRef } from "react";
import { BiUpvote } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import useFetchLazy from "../../../../../services/useFetchLazy";

function IdeaCreationCard({ commentModeId }) {
  const titleRef = useRef();
  const descriptionRef = useRef();

  const { trigger, loading, error } = useFetchLazy({
    path: `/topics/${commentModeId}/ideas/`,
    method: "post",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    trigger({
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      commentModeId,
    });
  };

  return (
    <div className="ideaCreationCard">
      <form className="ideaCreationCard__form" onSubmit={handleSubmit}>
        <label htmlFor="ideaInput">Idea :</label>
        <input type="text" id="ideaInput" ref={titleRef} />
        <label htmlFor="descriptionInput">Description :</label>
        <input type="text" id="descriptionInput" ref={descriptionRef} />
        {error && <p>{error.message}</p>}
        <button type="submit" id="ideaCreationCard__button">
          {loading ? "Loading..." : "Add"}
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
