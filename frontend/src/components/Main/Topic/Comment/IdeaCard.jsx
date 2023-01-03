function IdeaCard() {
  return (
    <div className="ideaCard">
      <div className="ideaCard__main">
        <h3 className="ideaCard__title">ideaCard__title</h3>
        <div className="ideaCard__creatorName">ideaCard__creatorName</div>
      </div>
      <p className="ideaCard__description">ideaCard__description</p>
      <div className="ideaCard__interactions">
        <div className="ideaCard__nbUpVote">ideaCard__nbUpVote</div>
        <div className="ideaCard__nbComment">ideaCard__nbComment</div>
      </div>
    </div>
  );
}

export default IdeaCard;
