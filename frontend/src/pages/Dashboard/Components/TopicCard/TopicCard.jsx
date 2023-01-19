import { BiMessageDetail } from "react-icons/bi";
import { RxLapTimer } from "react-icons/rx";
import { TbMessageCircle2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import formatDeadline from "../../../../services/formatDeadline";

import "./TopicCard.css";

function TopicCard(props) {
  const {
    id,
    title,
    creatorName,
    description,
    deadline,
    nbIdea,
    nbBubble,
    isCommentMode,
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
          <RxLapTimer />
          <p>{`${day}/${month}/${year} at ${hour}h${minutes}`}</p>
        </div>
        {isCommentMode ? (
          <div className="topicCard__nbIdea notification">
            <div className="notification-number">{nbIdea}</div>
            <BiMessageDetail />
          </div>
        ) : (
          <div className="topicCard__nbIdea notification">
            <div className="notification-bubble-number">{nbBubble}</div>
            <TbMessageCircle2 />
          </div>
        )}
      </div>
    </article>
  );
}

export default TopicCard;
