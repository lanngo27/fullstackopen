import { useState, useEffect, useRef } from 'react'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (Exception) {
      setNotification({
        message: 'wrong username or password',
        error: true
      })
      setTimeout(() => { setNotification(null) }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const addBlog = async ({ title, author, url }) => {
    try {
      const createdBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(createdBlog))
      setNotification({
        message: `a new blog ${title} by ${author} added`,
        error: false
      })
      blogFormRef.current.toggleVisibility()
      setTimeout(() => { setNotification(null) }, 5000)
    } catch (Exception){
      setNotification({
        message: `new blog can't be added. Error: ${Exception.response.data.error}`,
        error: true
      })
      setTimeout(() => { setNotification(null) }, 5000)
    }
  }

  const updateBlog = async (blog) => {
    try {
      const returnedBlog = await blogService.update(blog.id, blog)
      setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog))
      setNotification({
        message: `Updated blog ${blog.title}`,
        error: false
      })
      setTimeout(() => { setNotification(null) }, 5000)
    } catch (Exception) {
      setNotification({
        message: `can't update blog ${blog.title}`,
        error: true
      })
      setTimeout(() => { setNotification(null) }, 5000)
    }
  }

  const deleteBlog = async (blogToDelete) => {
    try {
      if (window.confirm(`Remove blog ${blogToDelete.title}?`)){
        await blogService.deleteBlog(blogToDelete.id)
        setBlogs(blogs.filter(b => b.id !== blogToDelete.id))

        setNotification({
          message: `Removed blog ${blogToDelete.title}`,
          error: false
        })
        setTimeout(() => { setNotification(null) }, 5000)
      }
    } catch (Exception) {
      setNotification({
        message: `can't delete blog ${blogToDelete.title}`,
        error: true
      })
      setTimeout(() => { setNotification(null) }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>

      {notification !== null
        ? <Notification message={notification.message} error={notification.error} />
        : <Notification message={null}/>
      }

      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    </div>
  )

  const blogDisplay = () => (
    <div>
      <h2>blogs</h2>

      {notification !== null
        ? <Notification message={notification.message} error={notification.error} />
        : <Notification message={null}/>
      }

      <p>{user.name} logged in
        <button type="submit" onClick={handleLogout}>
          logout
        </button>
      </p>

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            removable={user && user.username === blog.user.username}
          />
        )}
    </div>
  )

  return (
    <div>
      {user === null
        ? loginForm()
        : blogDisplay()
      }
    </div>
  )
}

export default App
