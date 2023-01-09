import { useRef, useState } from "react";
import useFetchLazy from "../../../../../services/useFetchLazy";

function IdeaCreationCard({ commentModeId, triggerGetIdeas }) {
  const [ideaCreate, setIdeaCreate] = useState(false);
  const titleRef = useRef();
  const descriptionRef = useRef();

  const {
    trigger: triggerPostIdea,
    loading,
    error,
  } = useFetchLazy({
    path: `/topics/${commentModeId}/ideas/`,
    method: "post",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await triggerPostIdea({
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      commentModeId,
    });
    setIdeaCreate(true);
    triggerGetIdeas();
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
        {ideaCreate && <p>New idea created !</p>}
      </form>
    </div>
  );
}

export default IdeaCreationCard;
