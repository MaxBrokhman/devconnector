const express = require('express')
const { check, validationResult } = require('express-validator')

const { PostModel } = require('../../models/Post')
const { UserModel } = require('../../models/User')
const { makeAuth } = require('../../middleware/auth')

const postRouter = express.Router()

postRouter.post('/', [
  makeAuth,
  check('text', 'Text is required').notEmpty(),
], 
async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  try {
    const user = await UserModel.findById(req.user.id).select('-password')
    const newPost = await new PostModel({
      ...req.body,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    }).save()

    res.json({ post: newPost })
  } catch {
    res.status(500).send('Server error')
  }
})

// Get all posts
postRouter.get('/', makeAuth, async (req, res) => {
  try {
    const posts = await PostModel.find().sort({ date: -1 })
    res.json({ posts })
  } catch {
    res.status(500).send('Server error')
  }
})

// Get post by id
postRouter.get('/:postId', makeAuth, async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId)
    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      })
    }
    res.json({ post })
  } catch {
    res.status(404).json({
      message: 'Post not found',
    })
  }
})

// Delete post
postRouter.delete('/:postId', makeAuth, async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId)
    if (!post || req.user.id !== post.user.toString()) {
      return res.status(404).json({
        message: 'Post not found',
      })
    }
    await post.remove()
    res.json({ post })
  } catch {
    res.status(404).json({
      message: 'Post not found',
    })
  }
})

module.exports = {
  postRouter,
}
