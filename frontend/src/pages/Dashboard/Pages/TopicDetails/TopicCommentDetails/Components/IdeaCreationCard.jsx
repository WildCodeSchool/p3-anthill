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

  const handleSubmit = async (event) => {
    event.preventDefault();
    await triggerPostIdea({
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
    });
    triggerGetIdeas();
    titleRef.current.value = "";
    descriptionRef.current.value = "";
  };

  return (
    <div>
      <div className="ideaCreationCard">
        <form className="ideaCreationCard__form" onSubmit={handleSubmit}>
          <div className="textareas">
            <label htmlFor="ideaTextarea">Idea :</label>
            <textarea type="text" id="ideaTextarea" ref={titleRef} />
            <label htmlFor="descriptiontextarea">Description :</label>
            <textarea
              type="text"
              id="descriptionTextarea"
              ref={descriptionRef}
            />
            {error && <p>{error.message}</p>}
          </div>

          <div className="ideaCreation_Card">
            <button type="submit" id="ideaCreationCard__button">
              {loading ? "Loading..." : "Add"}
            </button>
          </div>
        </form>
      </div>
      {isSuccess && (
        <p
          style={{
            textAlign: "center",
            color: "var(--light-color)",
            fontWeight: "600",
          }}
        >
          New idea created !
        </p>
      )}
    </div>
  );
}

export default IdeaCreationCard;
