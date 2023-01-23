import { useRef } from "react";
import useFetchLazy from "../../../../../../services/useFetchLazy";

function IdeaCreationCard({ topicId, triggerGetIdeas }) {
  const titleRef = useRef();
  const descriptionRef = useRef();

  const {
    trigger: triggerPostIdea,
    isSuccess,
    loading,
    error,
  } = useFetchLazy({
    path: `/topics/${topicId}/ideas`,
    method: "post",
  });

  const { token } = JSON.parse(localStorage.getItem("currentUser"));

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await triggerPostIdea(
      {
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
      },
      headers
    );
    triggerGetIdeas();
    titleRef.current.value = "";
    descriptionRef.current.value = "";
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
        {isSuccess && <p>New idea created !</p>}
      </form>
    </div>
  );
}

export default IdeaCreationCard;
