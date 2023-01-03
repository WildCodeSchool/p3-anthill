function IdeaCard({ title, creatorName, description, nbUpVote, nbComment }) {
  return (
    <div className="ideaCard">
      <h3 className="ideaCard__title">{title}</h3>
      <div className="ideaCard__creatorName">{creatorName}</div>
      <p className="ideaCard__description">{description}</p>
      <div className="ideaCard__nbUpVote">{nbUpVote}</div>
      <div className="ideaCard__nbComment">{nbComment}</div>
    </div>
  );
}

export default IdeaCard;
