// This form takes in a title and optionally collects content and an image URL.

import { useState } from 'react'
import { supabase } from '../client'

function CreatePost({ onCreated, onCancel }) {
  // Form field state for title , content , and image URL 
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  // Handle form submission: validate title and insert new post into Supabase
  const handleSubmit = async (event) => {
    event.preventDefault()

    // REQUIRED: title must be provided for every post
    if (!title.trim()) {
      alert('Title is required!')
      return
    }

    // Insert new post row into table with title, content, and image URL
    const { data, error } = await supabase
      .from('posts')
      .insert({
        title: title.trim(),
        content: content.trim(),
        image_url: imageUrl.trim() || null,
      })
      .select()

    // If the insert fails, show an error and stop
    if (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post.')
      return
    }

    // On success, call onCreated with the new post's id so App can show the post page
    const newPost = data[0]
    onCreated(newPost.id)
  }

  // Render the create-post form with fields for title, content, and image URL
  return (
    <div>
      <h1 className="page-title">Create a New Movie Post</h1>

      <form className="form" onSubmit={handleSubmit}>
        {/* Title field (required by project) */}
        <label>
          Title 
          <input
            type="text"
            value={title}
            placeholder=""
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        {/* Additional textual content  */}
        <label>
          Content 
          <textarea
            value={content}
            placeholder=""
            rows={6}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>

        {/* Optional external image URL */}
        <label>
          Image URL 
          <input
            type="url"
            value={imageUrl}
            placeholder=""
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>

        {/* Form buttons: submit to create post, or cancel to return */}
        <div className="form-actions">
          <button type="submit" className="primary-button">
            Create Post
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

export default CreatePost