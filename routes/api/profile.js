const express = require('express')
const { check, validationResult } = require('express-validator')
const request = require('request')
const config = require('config')

const { makeAuth } = require('../../middleware/auth')
const { ProfileModel } = require('../../models/Profile')
const { UserModel } = require('../../models/User')

const profileRouter = express.Router()

profileRouter.get('/me', makeAuth, async (req, res) => {
  try {
    const profile = await ProfileModel
      .findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])

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

// Creation and update of profile
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
    res.status(201).json({ profile: newProfile })
  } catch {
    res.status(500).send('Server error')
  }
})

// Get all profiles
profileRouter.get('/', async (req, res) => {
  try {
    const profiles = await ProfileModel.find().populate('user', ['name', 'avatar'])
    res.json(profiles)
  } catch {
    res.status(500).send('Server error')
  }
})

// Get profile by user id
profileRouter.get('/user/:userId', async (req, res) => {
  try {
    const profile = await ProfileModel
      .findOne({ user: req.params.userId })
      .populate('user', ['name', 'avatar'])

    if (!profile) {
      return res.status(404).json({
        message: 'Profile not found',
      })
    }
    res.json(profile)
  } catch {
    res.status(500).send('Server error')
  }
})

// Delete profile
profileRouter.delete('/', makeAuth, async (req, res) => {
  try {
    await ProfileModel.findOneAndRemove({ user: req.user.id })
    await UserModel.findOneAndRemove({ _id: req.user.id })
    res.status(200).json({ message: 'User successfully deleted' })
  } catch {
    res.status(500).send('Server error')
  }
})

// Update profile expirience
profileRouter.put('/experience', [
  makeAuth,
  check('title', 'Title is required').notEmpty(),
  check('company', 'Company is required').notEmpty(),
  check('from', 'From date is required').notEmpty(),
], 
async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }
  const newExpirence = {
    ...req.body,
  }
  try {
    const profile = await ProfileModel.findOne({ user: req.user.id })
    profile.experience = [
      newExpirence,
      ...profile.experience,
    ]
    await profile.save()
    res.json({ profile })
  } catch {
    res.status(500).send({ message: 'Server error' })
  }
})

// Delete experience
profileRouter.delete('/experience/:expId', makeAuth, async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({ user: req.user.id })
    const removeIdx = profile.experience.findIndex(item => item._id === req.params.expId)
    profile.experience.splice(removeIdx, 1)
    await profile.save(profile)
    res.json({ profile })
  } catch {
    res.status(500).send('Server error')
  }
})

// Update profile education
profileRouter.put('/education', [
  makeAuth,
  check('school', 'School is required').notEmpty(),
  check('degree', 'Degree is required').notEmpty(),
  check('fieldOfStudy', 'Field of study is required').notEmpty(),
  check('from', 'From date is required').notEmpty(),
], 
async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }
  const newEducation = {
    ...req.body,
  }
  try {
    const profile = await ProfileModel.findOne({ user: req.user.id })
    profile.education = [
      newEducation,
      ...profile.education,
    ]
    await profile.save()
    res.json({ profile })
  } catch {
    res.status(500).send('Server error')
  }
})

// Delete education
profileRouter.delete('/education/:eduId', makeAuth, async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({ user: req.user.id })
    const removeIdx = profile.education.findIndex(item => item._id === req.params.eduId)
    profile.education.splice(removeIdx, 1)
    await profile.save(profile)
    res.json({ profile })
  } catch {
    res.status(500).send('Server error')
  }
})

// Get user repos from github
profileRouter.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientSecret')}`,
      method: 'GET',
      headers: {
        'user-agent': 'node.js',
      }
    }
    request(options, (error, response, body) => {
      if (error) throw error
      if (response.statusCode !== 200) {
        return res.status(404).json({
          message: 'No github profile found',
        })
      }

      res.json({ repos: body })
    })
  } catch {
    res.status(500).send('Server error')
  }
})

module.exports = {
  profileRouter,
}
