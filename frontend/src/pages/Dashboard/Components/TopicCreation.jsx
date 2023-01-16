import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import useFetchLazy from "../../../services/useFetchLazy";

import "./TopicCreation.css";

function TopicCreation({ closePopUp }) {
  const navigate = useNavigate();

  const refTitle = useRef();
  const refDescription = useRef();
  const refDeadline = useRef();

  const { trigger: triggerPostTopic, data } = useFetchLazy({
    path: "/topics",
    method: "post",
  });

  const submit = (e) => {
    e.preventDefault();
    triggerPostTopic({
      title: refTitle.current.value,
      description: refDescription.current.value,
      deadline: refDeadline.current.value,
      creatorId: 1, // pour l'instant c'est une fixture en attendant la bonne valeur venant de local storage
      isCommentMode: true, // pour l'instant c'est une fixture car mindmapmode n'est géré
    });
    refTitle.current.value = "";
    refDescription.current.value = "";
    refDeadline.current.value = "";
  };

  useEffect(() => {
    if (data?.insertId) {
      navigate(`/dashboard/topics/${data.insertId}`);
      closePopUp();
    }
  }, [data]);

  return (
    <form className="topicCreation_container" onSubmit={submit}>
      <label htmlFor="topic__nameTitle">TOPIC NAME</label>
      <input
        id="topic__nameTitle"
        className="topic__name"
        placeholder="NAME"
        name="Topic name"
        type="text"
        ref={refTitle}
        required
      />
      <label htmlFor="deadline">DATE</label>
      <input
        id="deadline"
        className="deadline"
        type="datetime-local"
        ref={refDeadline}
      />
      <label htmlFor="description__title">DESCRIPTION</label>
      <input
        id="description__title"
        className="description"
        placeholder="Write here a short description of your topic..."
        name="description"
        type="text"
        ref={refDescription}
        required
      />
      <button className="button" type="submit">
        START
      </button>
    </form>
  );
}

export default TopicCreation;
