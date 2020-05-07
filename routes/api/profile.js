const express = require('express')
const { check, validationResult } = require('express-validator')

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

profileRouter.post('/', [
  makeAuth, 
  check('status', 'Status is required').notEmpty(),
  check('skills', 'Skills are required').notEmpty(),
], 
async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  const profile = {
    ...req.body,
    user: req.user.id,
    skills: req.body.skills.split(',').map(skill => skill.trim()),
  }

  try {
    const existantProfile = await ProfileModel.findOne({ user: req.user.id })
    if (existantProfile) {
      await existantProfile.updateOne({ $set: profile }, { new: true })
      return res.json({ profile: existantProfile })
    }
    const newProfile = new ProfileModel(profile)
    await newProfile.save()
    res.json({ profile: newProfile })
  } catch {
    res.status(500).send('Server error')
  }
})

module.exports = {
  profileRouter,
}
