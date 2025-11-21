import { useEffect, useState } from 'react'
import { supabase } from '../client'

function PostPage({ postId, onEdit, onDeleted }) {
  // Holds the current post data loaded from Supabase
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  // Local state for a new comment being typed by the user
  const [newComment, setNewComment] = useState('')

  // Fetch the single post from Supabase based on the given postId
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select()
        .eq('id', postId)
        .single()

      if (error) {
        console.error('Error fetching post:', error)
      } else {
        setPost(data)
      }
      setLoading(false)
    }

    fetchPost()
  }, [postId])

  // Handle upvote clicks: increase the upvotes count for this post
  const handleUpvote = async () => {
    if (!post) return
    const current = post.upvotes ?? 0

    // Update upvotes in Supabase
    const { data, error } = await supabase
      .from('posts')
      .update({ upvotes: current + 1 })
      .eq('id', postId)
      .select()

    if (error) {
      console.error('Error upvoting:', error)
      return
    }

    // Update local state with fresh row data
    setPost(data[0])
  }

  // Handle adding a new comment to the comments array
  const handleAddComment = async (event) => {
    event.preventDefault()
    if (!post || !newComment.trim()) return

    // Append the new comment text to existing comments array
    const updatedComments = [...(post.comments || []), newComment.trim()]

    // Update comments in Supabase
    const { data, error } = await supabase
      .from('posts')
      .update({ comments: updatedComments })
      .eq('id', postId)
      .select()

    if (error) {
      console.error('Error adding comment:', error)
      return
    }

    // Refresh local post state and clear the comment input
    setPost(data[0])
    setNewComment('')
  }

  // Handle deleting this post from the database
  const handleDelete = async () => {
    const ok = window.confirm('Delete this post?')
    if (!ok) return

    const { error } = await supabase.from('posts').delete().eq('id', postId)

    if (error) {
      console.error('Error deleting post:', error)
      return
    }

    // Notify parent so it can navigate back to home after deletion
    onDeleted()
  }

  // Basic loading / not-found states
  if (loading) return <p>Loading post…</p>
  if (!post) return <p>Post not found.</p>

  // Format the creation timestamp for display
  const createdText = post.created_at
    ? new Date(post.created_at).toLocaleString()
    : 'Unknown time'

  // Render the full post detail page
  return (
    <div className="post-detail">
      {/* Show when the post was created */}
      <p className="feed-card-meta">Posted {createdText}</p>

      {/* Post title and content text */}
      <h1 className="post-detail-title">{post.title}</h1>

      {post.content && (
        <p className="post-detail-content">{post.content}</p>
      )}

      {/* Poster image, constrained to a fixed aspect ratio */}
      {post.image_url && (
        <div className="image-frame">
          <img src={post.image_url} alt={post.title} className="post-image" />
        </div>
      )}

      {/* Upvote, edit, and delete controls required for the project */}
      <div className="post-actions">
        <button className="primary-button" onClick={handleUpvote}>
          👍 {post.upvotes ?? 0}
        </button>
        <button
          className="secondary-button"
          onClick={() => onEdit(postId)}
        >
          Edit
        </button>
        <button className="danger-button" onClick={handleDelete}>
          Delete
        </button>
      </div>

      {/* list existing comments and form to add a new one */}
      <section className="comments-section">
        <h2>Comments</h2>

        {/* Show existing comments if present */}
        {post.comments && post.comments.length > 0 ? (
          <ul className="comments-list">
            {post.comments.map((c, i) => (
              <li key={i}>- {c}</li>
            ))}
          </ul>
        ) : (
          <p>No comments yet</p>
        )}

        {/* Form to add a new comment to this post */}
        <form className="form" onSubmit={handleAddComment}>
          <label>
            Post Comments
            <textarea
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </label>
          <button type="submit" className="primary-button">
            Post Comment
          </button>
        </form>
      </section>
    </div>
  )
}

export default PostPage