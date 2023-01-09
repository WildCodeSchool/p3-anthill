import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./TopicCreation.css";

function TopicCreation() {
  const navigate = useNavigate();
  const newData = {
    title: "",
    description: "",
    deadline: "",
    creatorId: 1, // ne pas oublier que la valeur peut changer, pouvoir récuperer l'utilisateur courant pour la version definitive //
  };

  const refTitle = useRef();
  const refDescription = useRef();
  const refDeadline = useRef();

  const submit = (e) => {
    e.preventDefault();
    newData.title = refTitle.current.value;
    newData.description = refDescription.current.value;
    newData.deadline = refDeadline.current.value;

    axios
      .post("http://localhost:5500/api/topics", newData)
      .then((res) => navigate(`dashboard/topics/${res.data.insertId}`))
      .catch((err, res) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };

  return (
    <form className="form" onSubmit={submit}>
      <label htmlFor="topic__name">Topic name</label>
      <input
        id="topic__name"
        className="topic__name"
        placeholder="TOPIC NAME"
        name="Topic name"
        type="text"
        ref={refTitle}
        required
      />
      <label htmlFor="deadline" className="srOnly">
        Date
      </label>
      <input
        id="deadline"
        className="deadline"
        type="datetime-local"
        ref={refDeadline}
      />
      <label htmlFor="description">Description</label>
      <input
        id="description"
        className="description"
        placeholder="DESCRIPTION"
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
