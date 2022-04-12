import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('BlogForm component tests', () => {
  test('clicking the button calls event handler', () => {
    const blog = {
      title: 'React basic',
      author: 'Michael Bash',
      url: 'https://reactbasic.com'
    }

    const mockHandler = jest.fn()

    render(
      <BlogForm createBlog={mockHandler} />
    )

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')
    const button = screen.getByText('create')

    fireEvent.change(titleInput, { target: { value: blog.title } })
    fireEvent.change(authorInput, { target: { value: blog.author } })
    fireEvent.change(urlInput, { target: { value: blog.url } })
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0]).toEqual(blog)
  })
})