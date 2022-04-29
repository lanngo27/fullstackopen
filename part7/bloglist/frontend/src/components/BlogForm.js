import { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'
import { setVisible } from '../reducers/togglableReducer'

const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    props.createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <Form onSubmit={addBlog}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            className="w-50"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            className="w-50"
            type="text"
            placeholder="Enter author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>URL</Form.Label>
          <Form.Control
            className="w-50"
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="m-1">
          Create
        </Button>
        <Button
          variant="primary"
          onClick={() => props.setVisible('createBlog')}
          className="m-1"
        >
          Cancel
        </Button>
      </Form>
      <br />
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}
export default connect(null, {
  setVisible
})(BlogForm)
