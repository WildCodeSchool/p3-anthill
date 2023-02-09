import { useContext, useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import { RxLapTimer } from "react-icons/rx";
import { Link } from "react-router-dom";
import { RiLightbulbLine } from "react-icons/ri";
import useCurrentUser from "../../../../services/useCurrentUser";
import ToggleModeContext from "../../../../contexts/ToggleModeContext";
import useFetchLazy from "../../../../services/useFetchLazy";
import "./TopicCard.css";
import "./TopicCardList.css";

function TopicCard(props) {
  const {
    id,
    creatorId,
    title,
    creatorPseudo,
    description,
    deadline,
    nbIdea,
    triggerGetTopics,
  } = props;
  const { toggleMode } = useContext(ToggleModeContext);

  const { currentUser } = useCurrentUser();

  const [isTopicClosed, setIsTopicClosed] = useState(false);
  const [isPopupOpen, setisPopupOpen] = useState(false);

  const { trigger: triggerDeleteTopic } = useFetchLazy({
    path: `/topics/${id}`,
    method: "delete",
  });

  const currentDate = new Date();
  const newDeadline = new Date(deadline);

  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formatedDeadLine = newDeadline.toLocaleTimeString("gb-GB", options);

  const handleDelete = async () => {
    await triggerDeleteTopic();
    triggerGetTopics();
  };

  useEffect(() => {
    if (currentDate > newDeadline) {
      setIsTopicClosed(true);
    }
  }, [currentDate, newDeadline]);

  return (
    <article
      className={`${!toggleMode ? "topicCard__grid" : "topicCard__list"} ${
        isTopicClosed && "topicCard__disabled"
      }`}
    >
      {!isPopupOpen ? (
        <>
          <div>
            <Link to={`/dashboard/topics/${id}`}>
              <h2
                className={`${
                  !toggleMode ? "topicCard__title" : "topicCard__title__list"
                } ${isTopicClosed && "topicCard__disabled"}`}
              >
                {title}
              </h2>
            </Link>
            <Link to={`/dashboard/users/${id}`}>
              <p
                className={
                  !toggleMode
                    ? "topicCard__creatorName"
                    : "topicCard__creatorName__list"
                }
              >
                by {creatorPseudo}
              </p>
            </Link>
          </div>

          <p
            className={
              !toggleMode
                ? "topicCard__description"
                : "topicCard__description__list"
            }
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
          />
          <div
            className={
              !toggleMode ? "topicCard__bottom" : "topicCard__right__list"
            }
          >
            <div
              className={
                !toggleMode
                  ? "topicCard__deadline"
                  : "topicCard__deadline__list"
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
          {isTopicClosed ? (
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
            <div className="div-delete">
              <button
                type="button"
                className="button-delete"
                onClick={() => setisPopupOpen(true)}
              >
                Delete
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <p style={{ padding: "15px", fontSize: "18px" }}>
            Are you sure you want to delete this topic?
          </p>
          <div
            className="topicCard__popup-buttons"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <button
              type="button"
              className="button-delete"
              onClick={() => setisPopupOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="button-delete"
              style={{
                backgroundColor: "var(--error)",
                color: "var(--light-color)",
              }}
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </article>
  );
}

export default TopicCard;
