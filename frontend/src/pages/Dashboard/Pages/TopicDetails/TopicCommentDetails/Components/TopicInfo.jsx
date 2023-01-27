import { RxLapTimer } from "react-icons/rx";
import formatDeadline from "../../../../../../services/formatDeadline";
import useFetchLazy from "../../../../../../services/useFetchLazy";

function TopicInfo(props) {
  const {
    id,
    title,
    creatorName,
    description,
    deadline,
    slackChannelLink,
    triggerGetTopic,
  } = props;
  let formatedDeadLine = [];

  if (deadline) {
    formatedDeadLine = formatDeadline(deadline);
  }
  const [year, month, day, hour, minutes] = [...formatedDeadLine];

  const { trigger: triggerCreateChannel } = useFetchLazy({
    path: `/topics/${id}/slack/channels/create`,
    method: "post",
  });

  const createSlackChannel = async () => {
    await triggerCreateChannel();
    triggerGetTopic();
  };

  return (
    <div className="topicInfo">
      <div className="topicInfo__left">
        <h2 className="topicInfo__title">{title}</h2>
        <p className="topicInfo__creatorName">{creatorName}</p>
      </div>

      <p className="topicInfo__description">{description}</p>
      <div className="topicInfo__deadline">
        <RxLapTimer />
        <p>{`${day}/${month}/${year} at ${hour}h${minutes}`}</p>
      </div>
      {!slackChannelLink ? (
        <button
          type="button"
          className="button-delete"
          onClick={createSlackChannel}
        >
          Create Slack Channel
        </button>
      ) : (
        <p>
          <a
            className="button-delete"
            href={slackChannelLink && slackChannelLink}
          >
            Join us on the Slack Channel !
          </a>
        </p>
      )}
    </div>
  );
}

export default TopicInfo;
