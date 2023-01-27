import { useContext } from "react";
import { RxLapTimer } from "react-icons/rx";
import { Link } from "react-router-dom";
import { RiLightbulbLine } from "react-icons/ri";
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
          {creatorName}
        </p>
      </div>

      <p
        className={
          !toggleMode
            ? "topicCard__description"
            : "topicCard__description__list"
        }
      >
        {description}
      </p>
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
        <div
          className={
            !toggleMode ? "topicCard__nbIdea" : "topicCard__nbIdea__list"
          }
        >
          {nbIdea}
          <RiLightbulbLine className="icon-ampule" />
        </div>
      </div>
      <DeleteTopicButton triggerGetTopics={triggerGetTopics} topicId={id} />
    </article>
  );
}

export default TopicCard;
