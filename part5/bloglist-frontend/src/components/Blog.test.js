import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('Blog component tests', () => {
  const blog = {
    title: 'React basic',
    author: 'Michael Bash',
    url: 'https://reactbasic.com',
    likes: 4
  }

  test('renders only title and author by default', () => {
    const mockUpdateBlog = jest.fn()
    const mockDeleteBlog = jest.fn()

    const component = render(
      <Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
    )

    expect(component.container)
      .toHaveTextContent(`${blog.title} ${blog.author}`)

    expect(component.container)
      .not.toHaveTextContent(`${blog.url}`)

    expect(component.container)
      .not.toHaveTextContent(`${blog.likes}`)
  })

  test('renders url and likes when view button is clicked', () => {
    const mockUpdateBlog = jest.fn()
    const mockDeleteBlog = jest.fn()

    const component = render(
      <Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
    )

    const button = screen.getByText('view')
    fireEvent.click(button)

    expect(component.container)
      .toHaveTextContent(`${blog.title} ${blog.author}`)

    expect(component.container)
      .toHaveTextContent(`${blog.url}`)

    expect(component.container)
      .toHaveTextContent(`${blog.likes}`)
  })

  test('clicking like button twice calls event handler twice', () => {
    const mockUpdateBlog = jest.fn()
    const mockDeleteBlog = jest.fn()

    render(
      <Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
    )

    const button = screen.getByText('view')
    fireEvent.click(button)

    const likeButton = screen.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockUpdateBlog.mock.calls)
      .toHaveLength(2)
  })
})