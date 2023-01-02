import "./TopicCard.css";
import { FaCommentAlt } from "react-icons/fa";
import { RxLapTimer } from "react-icons/rx";

function TopicCard(props) {
  const { title, creatorName, description, nbIdea } = props;
  let { deadline } = props;
  // Transform deadline initial format "2022-12-26T23:00:00.000Z" into split variables
  deadline = deadline.split("-");
  deadline[2] = deadline[2].replace("T", ".");
  deadline[2] = deadline[2].split(".");
  deadline[2][1] = deadline[2][1].split(":");
  deadline = deadline.flat(2);
  deadline.pop();

  const [year, month, day, hour, minutes] = [...deadline];

  return (
    <article className="topicCard">
      <h2 className="topicCard__Title">{title}</h2>
      <div className="topicCard__CreatorName">{creatorName}</div>
      <p className="topicCard__Description">{description}</p>
      <div className="topicCard__Deadline">
        <RxLapTimer />
        <p>{`${day}/${month}/${year} à ${hour}h${minutes}`}</p>
      </div>
      <div className="topicCard__nbIdea">
        {nbIdea} <FaCommentAlt />
      </div>
    </article>
  );
}

export default TopicCard;
