const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => response.json(await User.find({})))

usersRouter.post('/', async (request, response) => {
  const newUser = new User(request.body)

  const result = newUser.save()
  return response.status(201).json(result)
})

module.exports = usersRouter