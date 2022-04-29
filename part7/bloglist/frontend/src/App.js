import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { Button, Navbar, Container, Nav, Offcanvas } from 'react-bootstrap'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import userService from './services/users'
import { setVisible } from './reducers/togglableReducer'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { userLogout, findExistingUser } from './reducers/userReducer'

const App = (props) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users))
    props.initializeBlogs()
    props.findExistingUser()
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()
    props.userLogout()
  }

  const matchUsers = useMatch('/users/:id')
  const user = matchUsers
    ? users.find((u) => u.id === matchUsers.params.id)
    : null

  const matchBlogs = useMatch('/blogs/:id')
  const blog = matchBlogs
    ? props.blogs.find((b) => b.id === matchBlogs.params.id)
    : null

  return (
    <div>
      {props.user === null ? (
        <LoginForm />
      ) : (
        <div>
          <Navbar sticky="top" className="mb-3" bg="light" expand="md">
            <Container fluid>
              <Navbar.Brand>Blog App</Navbar.Brand>
              <Nav className="me-auto"></Nav>
              <Navbar.Toggle aria-controls={'offcanvasNavbar-expand-sm'} />
              <Navbar.Offcanvas
                id={'offcanvasNavbar-expand-sm'}
                aria-labelledby={'offcanvasNavbarLabel-expand-sm'}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={'offcanvasNavbarLabel-expand-sm'}>
                    Offcanvas
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-left flex-grow-1 pe-3">
                    <Nav.Link as={Link} to="/">
                      Blogs
                    </Nav.Link>
                    <Nav.Link as={Link} to="/users">
                      Users
                    </Nav.Link>
                  </Nav>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Navbar.Text>Signed in as: {props.user.name}</Navbar.Text>
                    <Button variant="link" type="submit" onClick={handleLogout}>
                      Logout
                    </Button>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>

          <Notification />

          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/blogs/:id" element={<Blog blog={blog} />} />
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/users/:id" element={<User user={user} />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    user: state.user,
    blogs: state.blogs
  }
}

export default connect(mapStateToProps, {
  setVisible,
  setNotification,
  initializeBlogs,
  userLogout,
  findExistingUser
})(App)
