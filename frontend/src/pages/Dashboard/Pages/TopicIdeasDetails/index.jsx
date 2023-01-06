import { useParams } from "react-router-dom";
import useFetch from "../../../../services/useFetch";
import CommentCard from "./Components/CommentCard";
import "./index.css";

function TopicIdeasDetails({ ideaId }) {
  const { id } = useParams();
  const { data: comments, loading } = useFetch(
    `/topics/${id}/ideas/${ideaId}/comments`
  );

  return (
    <div className="topicIdeasDetails__main">
      {(loading || loading) && <h2>LOADING ...</h2>}
      {comments &&
        comments.map((elt) => <CommentCard key={elt.id} comment={elt} />)}
    </div>
  );
}

export default TopicIdeasDetails;
