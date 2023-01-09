import { GiAnt } from "react-icons/gi";
import "./PopUpTopic.css";
import TopicCreation from "./TopicCreation";

function PopUpTopic({ closePopUp }) {
  return (
    <div className="popup-container">
      <div className="popup-body">
        <div className="title">
          <span>CREATE </span>
          <span>
            <GiAnt size={50} />
          </span>
          <span> TOPIC</span>
          <button type="button" className="close__btn" onClick={closePopUp}>
            X
          </button>
        </div>
        <TopicCreation />
      </div>
    </div>
  );
}

export default PopUpTopic;
