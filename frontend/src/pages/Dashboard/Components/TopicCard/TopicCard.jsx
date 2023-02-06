import { useContext } from "react";
import DOMPurify from "isomorphic-dompurify";
import { RxLapTimer } from "react-icons/rx";
import { Link } from "react-router-dom";
import { RiLightbulbLine } from "react-icons/ri";
import useCurrentUser from "../../../../services/useCurrentUser";
import ToggleModeContext from "../../../../contexts/ToggleModeContext";
import formatDeadline from "../../../../services/formatDeadline";
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

  const formatedDeadLine = formatDeadline(deadline);
  const [year, month, day, hour, minutes] = [...formatedDeadLine];

  const { toggleMode } = useContext(ToggleModeContext);

  const { currentUser } = useCurrentUser();

  return (
    <article className={!toggleMode ? "topicCard__grid" : "topicCard__list"}>
      <div>
        <Link to={`/dashboard/topics/${id}`}>
          <h2
            className={
              !toggleMode ? "topicCard__title" : "topicCard__title__list"
            }
          >
            {title}
          </h2>
        </Link>
        <p
          className={
            !toggleMode
              ? "topicCard__creatorName"
              : "topicCard__creatorName__list"
          }
        >
          By {creatorName}
        </p>
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
          <RxLapTimer />
          <p>{`${day}/${month}/${year} at ${hour}h${minutes}`}</p>
        </div>

        <div className="notification">
          <span className="notification-number">{nbIdea}</span>
          <RiLightbulbLine className="icon-ampule" />
        </div>
      </div>
      {currentUser?.id === creatorId ? (
        <DeleteTopicButton triggerGetTopics={triggerGetTopics} topicId={id} />
      ) : (
        ""
      )}
    </article>
  );
}

export default TopicCard;
