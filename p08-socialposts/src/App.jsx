import { useEffect, useState } from 'react'
import { supabase } from './client'
import './App.css'

import PostCard from './components/PostCard.jsx'
import CreatePost from './components/CreatePost.jsx'
import PostPage from './components/PostPage.jsx'
import EditPost from './components/EditPost.jsx'

function App() {
  // Which page is currently shown
  const [view, setView] = useState('home')
  // Which post is currently selected for viewing or editing
  const [selectedPostId, setSelectedPostId] = useState(null)
  // List of posts to display on the home feed
  const [posts, setPosts] = useState([])

  // users can sort posts by creation time or upvotes
  const [orderBy, setOrderBy] = useState('created_at')

  // users can search for posts by title
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch posts from Supabase whenever we are on the home view,
  // and whenever orderBy or searchTerm changes
  useEffect(() => {
    // Only fetch when we're on the home view
    if (view !== 'home') return

    const fetchPosts = async () => {
      // Start query from posts table
      let query = supabase.from('posts').select()

      // Filter posts by title if user provided a search term
      if (searchTerm.trim() !== '') {
        query = query.ilike('title', `%${searchTerm.trim()}%`)
      }

      // Order posts by the selected column (created_at or upvotes)
      const { data, error } = await query.order(orderBy, { ascending: false })

      if (error) {
        console.error('Error fetching posts:', error)
      } else {
        setPosts(data)
      }
    }

    fetchPosts()
  }, [view, orderBy, searchTerm])

  // go back to the home feed
  const goHome = () => {
    setView('home')
    setSelectedPostId(null)
  }

  // go to create-post page
  const goToCreate = () => {
    setView('create')
    setSelectedPostId(null)
  }

  // go to single-post page by id
  const goToPost = (id) => {
    setSelectedPostId(id)
    setView('post')
  }

  // go to edit page for a specific post
  const goToEdit = (id) => {
    setSelectedPostId(id)
    setView('edit')
  }

  // This variable will hold whichever "page" we want to show
  let content = null

  // shows feed of previously created posts
  if (view === 'home') {
    content = (
      <main className="home-main">
        {/* choose order by creation time or upvotes */}
        <div className="home-controls">
          <span className="controls-label">Order by:</span>
          <button
            className={orderBy === 'created_at' ? 'chip chip-active' : 'chip'}
            onClick={() => setOrderBy('created_at')}
          >
            Newest
          </button>
          <button
            className={orderBy === 'upvotes' ? 'chip chip-active' : 'chip'}
            onClick={() => setOrderBy('upvotes')}
          >
            Most Popular
          </button>
        </div>

        {/* show either "no posts" or a list of PostCard components */}
        <div className="home-feed">
          {posts.length === 0 ? (
            <p className="empty-text">No posts yet</p>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                // Clicking a card opens the separate post page
                onView={() => goToPost(post.id)}
              />
            ))
          )}
        </div>
      </main>
    )
  }

  // shows the form to create a new post
  if (view === 'create') {
    content = (
      <main className="page-main">
        <div className="card">
          <CreatePost
            // After creating a post, go directly to its post page
            onCreated={(newId) => goToPost(newId)}
            onCancel={goHome}
          />
        </div>
      </main>
    )
  }

  // shows content, image, comments, upvote, edit, and delete for one post
  if (view === 'post' && selectedPostId) {
    content = (
      <main className="page-main">
        <div className="card">
          <PostPage
            postId={selectedPostId}
            onEdit={goToEdit}
            onDeleted={goHome}
          />
        </div>
      </main>
    )
  }

  // allows the user to update an existing post
  if (view === 'edit' && selectedPostId) {
    content = (
      <main className="page-main">
        <div className="card">
          <EditPost
            postId={selectedPostId}
            onUpdated={(id) => goToPost(id)}
            onCancel={() => goToPost(selectedPostId)}
          />
        </div>
      </main>
    )
  }

  // Render the top navigation (title + search + nav buttons) and the current page content
  return (
    <div className="app">
      {/* Top navbar with app title and search-by-title input */}
      <header className="navbar">
        <div className="navbar-inner">
          {/* Clicking title returns to home feed */}
          <div className="nav-left" onClick={goHome}>
            MovieRecs
          </div>

          {/* users can search posts by title */}
          <div className="nav-center">
            <input
              type="text"
              placeholder="Search"
              className="nav-search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Simple nav links to home and create pages */}
          <div className="nav-right">
            <button className="nav-link" onClick={goHome}>
              Home
            </button>
            <button className="nav-link" onClick={goToCreate}>
              Create New Post
            </button>
          </div>
        </div>
      </header>

      {/* Layout wrapper that centers the main content panel */}
      <div className="app-layout">
        <div className="main-content">
          <div className="page-panel">
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App