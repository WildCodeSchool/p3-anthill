import { RxLapTimer } from "react-icons/rx";
import formatDeadline from "../../../../../services/formatDeadline";

function TopicInfo(props) {
  const { title, creatorName, description, deadline } = props;
  let formatedDeadLine = [];

  if (deadline) {
    formatedDeadLine = formatDeadline(deadline);
  }
  const [year, month, day, hour, minutes] = [...formatedDeadLine];

  return (
    <div className="topicInfo">
      <h2 className="topicInfo__title">{title}</h2>
      <div className="topicInfo__creatorName">{creatorName}</div>
      <p className="topicInfo__description">{description}</p>
      <div className="topicInfo__deadline">
        <RxLapTimer />
        <p>{`${day}/${month}/${year} à ${hour}h${minutes}`}</p>
      </div>
    </div>
  );
}

export default TopicInfo;
