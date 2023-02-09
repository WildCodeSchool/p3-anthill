import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useFetchLazy from "../../../../services/useFetchLazy";
import useFetch from "../../../../services/useFetch";
import IdeaCreationCard from "../TopicDetails/TopicCommentDetails/Components/IdeaCreationCard";

import Graph from "./Graph";
import "./BubbleDetails.css";

function BubbleDetails() {
  const currentDate = new Date();

  const { topicId } = useParams();

  const { trigger: triggerGetIdeas } = useFetchLazy({
    path: `/topics/${topicId}/ideas`,
    method: "get",
  });

  const { data: topic } = useFetch({
    path: `/topics/${topicId}`,
    method: "get",
  });
  const { data: ideas } = useFetch({
    path: `/topics/${topicId}/ideas`,
    method: "get",
  });
  const { data: userTopic } = useFetch({
    path: `/users/${{ ...topic }?.creator_id}`,
    method: "get",
  });
  const newDeadline = new Date(topic.deadline);
  useEffect(() => {
    triggerGetIdeas();
  }, []);

  const node = [
    {
      id: "a",
      text: `${topic.description}`.replace(/<\/?p>/g, ""),
      name: `${{ ...topic }?.title}`,
      photo: `${{ ...userTopic }.picture}`,
    },
  ];
  ideas.map((ele) =>
    node.push({
      id: `${ele.id}`,
      text: `${ele.idea_description.replace(/<\/?p>/g, "")}`,
      name: `${ele.idea_title.replace(/<\/?p>/g, "")}`,
    })
  );

  const link = [];

  ideas.map((ele) =>
    link.push({
      source: "a",
      target: `${ele.id}`,
      name: `${ele.idea_creator_name}`,
    })
  );

  const width = 1200;

  const height = 1400;
  const links = link.map((d) => Object.create(d));
  const nodes = node.map((d) => Object.create(d));

  return (
    <div className="bubbleTeas">
      {ideas?.length > 0 && { ...userTopic }.picture !== undefined ? (
        <Graph width={width} height={height} links={links} nodes={nodes} />
      ) : null}
      <div className="bb-title">
        {currentDate < newDeadline ? (
          <IdeaCreationCard
            topicId={topic.id}
            triggerGetIdeas={triggerGetIdeas}
            bubbles
          />
        ) : null}
      </div>
    </div>
  );
}

export default BubbleDetails;
