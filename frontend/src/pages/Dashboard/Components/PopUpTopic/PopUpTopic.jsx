import "./PopUpTopic.css";
import TopicCreation from "../TopicCreation/TopicCreation";

function PopUpTopic({ closePopUp }) {
  return (
    <div className="popup-container">
      <div className="popup-body">
        <div className="title">
          <p className="title-create-topic">Create Topic</p>
          <button type="button" className="close__btn" onClick={closePopUp}>
            X
          </button>
        </div>
        <TopicCreation closePopUp={closePopUp} />{" "}
      </div>
    </div>
  );
}

export default PopUpTopic;
