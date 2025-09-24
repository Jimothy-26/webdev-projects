// shows one resource card with a title, category, and a button.

const Card = (props) => {
  // groups the content into a single card.
  return (
    <article className="Card">
      {/* holds the text and the action. */}
      <div className="card-body">
        {/* shows the resource title. */}
        <h3 className="card-title">{props.title}</h3>

        {/* shows the category. */}
        <p className="card-category">{props.category}</p>

        {/* shows a button. */}
        <button type="button" className="card-button">
          View Resource
        </button>
      </div>
    </article>
  );
};

export default Card;