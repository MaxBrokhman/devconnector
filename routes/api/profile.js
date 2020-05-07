const express = require('express')

const { makeAuth } = require('../../middleware/auth')
const { ProfileModel } = require('../../models/Profile')

const profileRouter = express.Router()

profileRouter.get('/me', makeAuth, async (req, res) => {
  try {
    const profile = await ProfileModel
      .findOne({ user: req.user.id })
      .populate('User', ['name', 'avatar'])

    if (!profile) {
      return res.status(400).json({
        message: 'There is no profile for this user',
      })
    }

    res.json({ profile })
  } catch {
    res.status(500).send('Server error')
  }
})

module.exports = {
  profileRouter,
}
