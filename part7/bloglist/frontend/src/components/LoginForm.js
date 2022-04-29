import { connect } from 'react-redux'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { setVisible } from '../reducers/togglableReducer'
import { setNotification } from '../reducers/notificationReducer'
import { userLogin } from '../reducers/userReducer'
import Togglable from '../components/Togglable'
import Notification from '../components/Notification'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      props.userLogin({ username, password })
      props.setVisible('login')
    } catch (Exception) {
      props.setNotification(
        {
          message: 'Wrong username or password',
          error: true
        },
        5000
      )
    }
  }

  return (
    <div className="container">
      <h2>Log in to the application</h2>

      <Notification />

      <Togglable buttonLabel="Login" type="login">
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              className="w-50"
              id="username"
              type="text"
              name="Username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="w-50"
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Group>
          <Button
            id="login-button"
            type="submit"
            variant="primary"
            className="m-1"
          >
            Login
          </Button>
        </Form>
        <Button
          variant="primary"
          onClick={() => props.setVisible('login')}
          className="m-1"
        >
          Cancel
        </Button>
      </Togglable>
    </div>
  )
}

export default connect(null, {
  setVisible,
  setNotification,
  userLogin
})(LoginForm)
