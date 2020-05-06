const express = require('express')
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

const {UserModel} = require('../../models/User')

const userRouter = express.Router()

userRouter.post('/', [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  const {
    name,
    email,
    password,
  } = req.body

  try {
    const user = await UserModel.findOne({ email })

    if (user) {
      return res.status(400).json({
        errors: [{
          message: 'User with this email already exists',
        }]
      })
    }

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    })

    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    const newUser = await new UserModel({
      name,
      email,
      avatar,
      password: hashedPassword,
    }).save()

    res.send('User registered')

  } catch {
    res.status(500).send('Server error')
  }
  
})

module.exports = {
  userRouter,
}
