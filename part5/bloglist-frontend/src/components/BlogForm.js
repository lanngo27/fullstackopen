import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>title:
          <input
            id='title'
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder='title'
          />
        </div>
        <div>author:
          <input
            id='author'
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='author'
          />
        </div>
        <div>url:
          <input
            id='url'
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder='url'
          />
        </div>
        <button id='blog-button' type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm