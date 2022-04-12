import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({
  blog,
  updateBlog,
  deleteBlog,
  removable
}) => {
  const [viewDetails, setViewDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonStyle = {
    background: '#0288d1'
  }

  const increaseLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    updateBlog(updatedBlog)
  }

  return (<div style={blogStyle}>
    {viewDetails
      ? <div>
        {`${blog.title} ${blog.author}`}
        <button onClick={() => setViewDetails(false)}>hide</button>
        {blog.url
          ? <p>{blog.url}</p>
          : null
        }
        <p className='likes'>likes {blog.likes} <button onClick={increaseLikes}>like</button></p>
        {blog.user
          ? <p>{blog.user.name}</p>
          : null
        }
        {removable
          ? <button style={removeButtonStyle} onClick={() => deleteBlog(blog)}>remove</button>
          : null
        }
      </div>
      : <div>
        {`${blog.title} ${blog.author}`}
        <button className='view-button' onClick={() => setViewDetails(true)}>view</button>
      </div>
    }
  </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog