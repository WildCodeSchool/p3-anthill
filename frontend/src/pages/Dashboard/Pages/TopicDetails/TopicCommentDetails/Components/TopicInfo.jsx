import { RxLapTimer } from "react-icons/rx";
import DOMPurify from "isomorphic-dompurify";
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

  const newDeadline = new Date(deadline);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatedDeadLine = newDeadline.toLocaleTimeString("gb-GB", options);

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

      <div
        className="topicInfo__description"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
      />
      <div className="topicInfo__deadline">
        <RxLapTimer />
        <p>{`${formatedDeadLine}`}</p>
      </div>
      <div className="topicInfo__slack">
        {!slackChannelLink ? (
          <button
            type="button"
            className="button-slack"
            onClick={createSlackChannel}
          >
            Create Slack Channel
          </button>
        ) : (
          <p>
            <a
              className="button-slack"
              href={slackChannelLink && slackChannelLink}
              target="_blank"
              rel="noreferrer"
            >
              Join us on the Slack Channel !
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default TopicInfo;
