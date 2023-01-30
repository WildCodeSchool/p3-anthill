import TopicInfo from "./Components/TopicInfo";
import IdeaCard from "./Components/IdeaCard";
import IdeaCreationCard from "./Components/IdeaCreationCard";

import "./index.css";

function TopicCommentDetails({
  topic,
  loadingTopic,
  ideas,
  loadingIdeas,
  triggerGetIdeas,
  triggerGetTopic,
}) {
  return (
    <div className="ideaCard__page">
      {loadingTopic && <h2 className="loading">LOADING ...</h2>}
      {topic && (
        <TopicInfo
          key={topic.id}
          id={topic.id}
          title={topic.title}
          creatorName={topic.fullname}
          description={topic.description}
          deadline={topic.deadline}
          slackChannelLink={topic.slack_channel_link}
          triggerGetTopic={triggerGetTopic}
        />
      )}
      <div>
        <IdeaCreationCard
          topicId={topic.id}
          triggerGetIdeas={triggerGetIdeas}
        />
      </div>
      <div className="ideaContainer">
        {loadingIdeas && <h2 className="ideaCard__title">LOADING ...</h2>}
        {ideas?.length > 0 ? (
          ideas.map((idea) => (
            <IdeaCard
              key={idea.id}
              id={idea.id}
              title={idea.idea_title}
              creatorName={idea.idea_creator_name}
              description={idea.idea_description}
              nbUpVotes={idea.nbr_upvotes_idea}
              nbComment={idea.nb_comment}
              canVote={idea.canVote}
              triggerGetIdeas={triggerGetIdeas}
            />
          ))
        ) : (
          <h2 className="no-found">There is no idea yet</h2>
        )}
      </div>
    </div>
  );
}

export default TopicCommentDetails;
