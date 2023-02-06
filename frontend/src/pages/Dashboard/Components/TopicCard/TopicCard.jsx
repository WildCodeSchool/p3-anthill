import { useContext, useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import { RxLapTimer } from "react-icons/rx";
import { Link } from "react-router-dom";
import { RiLightbulbLine } from "react-icons/ri";
import useCurrentUser from "../../../../services/useCurrentUser";
import ToggleModeContext from "../../../../contexts/ToggleModeContext";
import DeleteTopicButton from "../DeleteTopicButton/DeleteTopicButton";
import "./TopicCard.css";
import "./TopicCardList.css";

function TopicCard(props) {
  const {
    id,
    creatorId,
    title,
    creatorName,
    description,
    deadline,
    nbIdea,
    triggerGetTopics,
  } = props;

  const [isClosed, setIsClosed] = useState(false);

  const currentDate = new Date();
  const newDeadline = new Date(deadline);

  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatedDeadLine = newDeadline.toLocaleTimeString("gb-GB", options);

  const { toggleMode } = useContext(ToggleModeContext);

  const { currentUser } = useCurrentUser();

  useEffect(() => {
    if (currentDate > newDeadline) {
      setIsClosed(true);
    }
  }, [currentDate, newDeadline]);

  return (
    <article
      className={`${!toggleMode ? "topicCard__grid" : "topicCard__list"} ${
        isClosed && "topicCard__disabled"
      }`}
    >
      <div>
        <Link to={`/dashboard/topics/${id}`}>
          <h2
            className={`${
              !toggleMode ? "topicCard__title" : "topicCard__title__list"
            } ${isClosed && "topicCard__disabled"}`}
          >
            {title}
          </h2>
        </Link>
        <Link to={`/dashboard/user/topi${id}`}>
          <p
            className={
              !toggleMode
                ? "topicCard__creatorName"
                : "topicCard__creatorName__list"
            }
          >
            by {creatorName}
          </p>
        </Link>
      </div>

      <p
        className={
          !toggleMode
            ? "topicCard__description"
            : "topicCard__description__list"
        }
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
      />
      <div
        className={!toggleMode ? "topicCard__bottom" : "topicCard__right__list"}
      >
        <div
          className={
            !toggleMode ? "topicCard__deadline" : "topicCard__deadline__list"
          }
        >
          <RxLapTimer className="icon-timer" />
          <p>{`${formatedDeadLine}`}</p>
        </div>

        <div className="notification">
          <span className="notification-number">{nbIdea}</span>
          <RiLightbulbLine className="icon-ampule" />
        </div>
      </div>
      {isClosed ? (
        <p
          className={
            !toggleMode ? "topicCard__closed" : "topicCard__closed__list"
          }
        >
          This topic is closed
        </p>
      ) : (
        <p className="topicCard__notClosed">This line is invisible</p>
      )}
      {currentUser?.id === creatorId && (
        <DeleteTopicButton triggerGetTopics={triggerGetTopics} topicId={id} />
      )}
    </article>
  );
}

export default TopicCard;
