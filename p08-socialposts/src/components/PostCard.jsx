function PostCard({ post, onView }) {
  // Format the creation timestamp
  const createdText = post.created_at
    ? new Date(post.created_at).toLocaleString()
    : 'Unknown time'

  // Render one card in the home feed with poster image, time, title, and upvotes
  return (
    // Entire card is clickable to open the post page
    <article className="feed-card" onClick={onView}>
      <div className="feed-card-inner">
        {/* Left side: thumbnail image if available, otherwise an empty frame */}
        {post.image_url ? (
          <div className="feed-thumb">
            <img
              src={post.image_url}
              alt={post.title}
              className="feed-thumb-img"
            />
          </div>
        ) : (
          <div className="feed-thumb feed-thumb-placeholder">
            {/* Placeholder frame when there is no image */}
          </div>
        )}

        {/* Right side: creation time, title, and upvotes count */}
        <div className="feed-info">
          <p className="feed-card-meta">Posted {createdText}</p>
          <h2 className="feed-card-title">{post.title}</h2>
          <p className="feed-card-upvotes">{post.upvotes ?? 0}👍</p>
        </div>
      </div>
    </article>
  )
}

export default PostCard