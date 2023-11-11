const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => response.json(await User.find({}).populate('blogs', { user: 0 })))

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password) return response.status(400).json({ error: 'password can not be empty' })
  if (password.length < 3) return response.status(400).json({ error: 'password must be at least 3 characters' })

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    name,
    passwordHash
  })

  const result = await newUser.save()
  return response.status(201).json(result)
})

module.exports = usersRouter