const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
    comments: body.comments
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if (user._id.toString() !== blog.user.toString()) {
    return response.status(403).json({
      error: 'User is not authorized to delete this blog'
    })
  }
  await Blog.deleteOne(blog)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      comments: body.comments
    },
    { new: true, runValidators: true, context: 'query' }
  ).populate('user')

  response.json(updatedBlog)
})

blogRouter.post('/:id/comments', async (request, response) => {
  if (request.body.comment)
  {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { $push: { comments: request.body.comment } },
      { new: true }
    )
    response.json(updatedBlog)
  }
  else
    response.status(400).send({ error: 'Comment is missing' })
})

module.exports = blogRouter