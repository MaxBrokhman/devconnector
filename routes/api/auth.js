const express = require('express')
const {UserModel} = require('../../models/User')

const { makeAuth } = require('../../middleware/auth')

const authRouter = express.Router()

authRouter.get('/', makeAuth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select('-password')
    res.json(user)
  } catch {
    res.status(404).json({
      message: 'User not found',
    })
  }
})

module.exports = {
  authRouter,
}
