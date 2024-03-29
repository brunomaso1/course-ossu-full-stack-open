const logger = require('./logger')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  request.token = (authorization && authorization.startsWith('Bearer ')) ?
    authorization.replace('Bearer ', '') : null

  next()
}

const userExtractor = (request, response, next) => {
  request.userId = (jwt.verify(request.token, process.env.SECRET)).id
  next()
}

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') return response.status(400).send({ error: 'malformatted id' })
  if (error.name === 'ValidationError') return response.status(400).json({ error: error.message })
  if (error.name === 'JsonWebTokenError') return response.status(401).json({ error: error.message })
  if (error.name === 'TokenExpiredError') { return response.status(401).json({ error: 'token expired' }) }
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}