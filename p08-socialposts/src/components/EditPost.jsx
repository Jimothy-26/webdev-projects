import { useEffect, useState } from 'react'
import { supabase } from '../client'

function EditPost({ postId, onUpdated, onCancel }) {
  // Form field state for the existing post's title, content, and image URL
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(true)

  // On mount, load the current post values from Supabase
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select()
        .eq('id', postId)
        .single()

      // If there's an error, log it; otherwise populate the form fields
      if (error) {
        console.error('Error fetching post for edit:', error)
      } else if (data) {
        setTitle(data.title || '')
        setContent(data.content || '')
        setImageUrl(data.image_url || '')
      }

      setLoading(false)
    }

    fetchPost()
  }, [postId])

  // Handle submit: validate title and update the existing post row
  const handleUpdate = async (event) => {
    event.preventDefault()

    // keep title required when editing
    if (!title.trim()) {
      alert('Title is required!')
      return
    }

    // Update the post row in Supabase with new values
    const { error } = await supabase
      .from('posts')
      .update({
        title: title.trim(),
        content: content.trim(),
        image_url: imageUrl.trim() || null,
      })
      .eq('id', postId)

    if (error) {
      console.error('Error updating post:', error)
      alert('Failed to update post.')
      return
    }

    // On success, notify parent so it can show the updated post page
    onUpdated(postId)
  }

  // Simple loading state while fetching existing post data
  if (loading) return <p>Loading post for editing…</p>

  // Render the edit form with current values
  return (
    <div>
      <h1 className="page-title">Edit Post</h1>

      <form className="form" onSubmit={handleUpdate}>
        {/* Title remains required */}
        <label>
          Title (required)
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        {/* Text content, still optional */}
        <label>
          Content (optional)
          <textarea
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>

        {/* Image URL, still optional */}
        <label>
          Image URL (optional)
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>

        {/* Buttons to submit changes or cancel back to the post page */}
        <div className="form-actions">
          <button type="submit" className="primary-button">
            Update Post
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditPost