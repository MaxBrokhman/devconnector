const express = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { UserModel } = require('../../models/User')
const { makeAuth } = require('../../middleware/auth')

const authRouter = express.Router()

// Sign up
authRouter.get('/', makeAuth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select('-password')
    res.json({ user })
  } catch {
    res.status(404).json({
      message: 'User not found',
    })
  }
})

// Log in
authRouter.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
], 
async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }
  const { email, password } = req.body
  try {
    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(400).json({
        errors: [{
          message: 'Invalid credentials.',
        }]
      })
    }
    const isPasswordRight = await bcrypt.compare(password, user.password)
    if (!isPasswordRight) {
      return res.status(400).json({
        errors: [{
          message: 'Invalid credentials.',
        }]
      })
    }

    const payload = {
      user: {
        id: user.id,
      },
    }
    jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      {
        expiresIn: 360000,
      },
      (error, token) => {
        if (error) throw error
        res.status(200).json({ token })
      }
    )
  } catch {
    res.status(500).send('Server error')
  }
})

module.exports = {
  authRouter,
}
