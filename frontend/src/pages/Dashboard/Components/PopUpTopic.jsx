import { GiAnt } from "react-icons/gi";
import "./PopUpTopic.css";
import TopicCreation from "./TopicCreation";

function PopUpTopic({ closePopup }) {
  return (
    <div className="popup-container">
      <div className="popup-body">
        <h1>TOPIC CREATED SUCCEFULLY!</h1>
        <p>
          <GiAnt size={70} />
        </p>
        <button type="button" onClick={closePopup}>
          X
        </button>
        <TopicCreation />
      </div>
    </div>
  );
}

export default PopUpTopic;
