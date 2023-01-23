import { useContext } from "react";
import { RxLapTimer } from "react-icons/rx";
import { Link } from "react-router-dom";
import ToggleModeContext from "../../../../contexts/ToggleModeContext";
import formatDeadline from "../../../../services/formatDeadline";
import DeleteTopicButton from "../DeleteTopicButton/DeleteTopicButton";
import "./TopicCard.css";
import "./TopicCardList.css";

function TopicCard(props) {
  const {
    id,
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

  return (
    <article className={!toggleMode ? "topicCard__list" : "topicCard__grid"}>
      <div>
        <Link to={`/dashboard/topics/${id}`}>
          <h2
            className={
              !toggleMode ? "topicCard__title__list" : "topicCard__title"
            }
          >
            {title}
          </h2>
        </Link>
        <p
          className={
            !toggleMode
              ? "topicCard__creatorName__list"
              : "topicCard__creatorName"
          }
        >
          {creatorName}
        </p>
      </div>

      <p
        className={
          !toggleMode
            ? "topicCard__description__list"
            : "topicCard__description"
        }
      >
        {description}
      </p>
      <div
        className={!toggleMode ? "topicCard__right__list" : "topicCard__bottom"}
      >
        <div
          className={
            !toggleMode ? "topicCard__deadline__list" : "topicCard__deadline"
          }
        >
          <RxLapTimer />
          <p>{`${day}/${month}/${year} at ${hour}h${minutes}`}</p>
        </div>
        <div
          className={
            !toggleMode ? "topicCard__nbIdea__list" : "topicCard__nbIdea"
          }
        >
          {nbIdea}
        </div>
      </div>
      <DeleteTopicButton triggerGetTopics={triggerGetTopics} topicId={id} />
    </article>
  );
}

export default TopicCard;
