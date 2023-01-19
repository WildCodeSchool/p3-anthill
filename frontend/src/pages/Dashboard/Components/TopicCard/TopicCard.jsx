import { FaCommentAlt } from "react-icons/fa";
import { RxLapTimer } from "react-icons/rx";
import { Link } from "react-router-dom";
import formatDeadline from "../../../../services/formatDeadline";
import DeleteTopicButton from "../DeleteTopicButton/DeleteTopicButton";

import "./TopicCard.css";

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

  return (
    <article className="topicCard">
      <Link to={`/dashboard/topics/${id}`}>
        <h2 className="topicCard__title">{title}</h2>
      </Link>
      <div className="topicCard__creatorName">{creatorName}</div>
      <p className="topicCard__description">{description}</p>
      <div className="topicCard__bottom">
        <div className="topicCard__deadline">
          {" "}
          <RxLapTimer />
          <p>{`${day}/${month}/${year} at ${hour}h${minutes}`}</p>
        </div>
        <div className="topicCard__nbIdea">
          {nbIdea} <FaCommentAlt />
        </div>
      </div>
      <DeleteTopicButton triggerGetTopics={triggerGetTopics} topicId={id} />
    </article>
  );
}

export default TopicCard;
