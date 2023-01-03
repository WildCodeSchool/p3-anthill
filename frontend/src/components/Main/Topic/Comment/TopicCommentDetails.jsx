import { useParams } from "react-router-dom";
import TopicInfo from "./TopicInfo";

import "./TopicCommentDetails.css";
import Navbar from "../../../Navbar";
import Sidebar from "../../../Sidebar";
import useFetch from "../../../../services/useFetch";

function TopicCommentDetails() {
  const { id } = useParams();
  const { data: topic, loading } = useFetch(`/topics/${id}`);

  return (
    <div className="topicCommentDeatils">
      <Navbar />
      <Sidebar />
      <div className="topicCommentDeatils_main">
        {loading && <h2>LOADING ...</h2>}
        {topic && (
          <TopicInfo
            key={topic.id}
            title={topic.title}
            creatorName={topic.creator_id}
            description={topic.description}
            deadline={topic.deadline}
          />
        )}
      </div>
    </div>
  );
}

export default TopicCommentDetails;
