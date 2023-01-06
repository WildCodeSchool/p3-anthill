import axios from "axios";
import { useRef } from "react";

function TopicCreation() {
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
      .post("http://localhost:5000/api/topics", newData)
      .then((res) => res.newData)
      .catch((err, res) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };

  return (
    <form onSubmit={submit}>
      <label>
        <input
          placeholder="TOPIC NAME"
          name="Topic name"
          type="text"
          ref={refTitle}
          required
        />
      </label>
      <label>
        <input
          placeholder="DESCRIPTION"
          name="description"
          type="text"
          ref={refDescription}
          required
        />
      </label>
      <label>
        <input type="datetime-local" ref={refDeadline} />
      </label>
      <button type="submit">START</button>
    </form>
  );
}

export default TopicCreation;
