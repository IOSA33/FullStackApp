const blogRouter = require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.status(200).json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  let { title, author, url, likes } = request.body

  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  if (likes === undefined) {
    likes = 0
  }

  if (!title || !author || !url === undefined) {
    return response.status(400).json({
      error: 'missing required fields'
    })
  }

  const blog = new Blog({
    title, 
    author, 
    url, 
    likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  await savedBlog.populate('user')
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  if (!blog) {
    return response.status(400).json({ error: 'blogId missing or not valid' })
  }

  if (blog.user.toString() !== user.id) {
    return response.status(400).json({ error: 'youre not the correct user'})
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', userExtractor, async (request, response) => {
  const { likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes },
    { new: true, runValidators: true, context: 'query' }
  ).populate('user')
  
  if (updatedBlog) {
    response.status(200).json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

module.exports = blogRouter