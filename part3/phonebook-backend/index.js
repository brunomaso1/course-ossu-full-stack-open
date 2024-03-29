require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

morgan.token('body', req => JSON.stringify(req.body))

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError')
        return response.status(400).json({ error: 'malformatted id' })
    if (error.name === 'ValidationError')
        return response.status(400).json({ error: error.message })

    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', (request, response, next) => {
    Person.countDocuments({})
        .then(result => {
            let htmlResp = `<p>Phonebook has info for ${result} people</p>`
            htmlResp += `<p>${Date().toLocaleString()}</p>`
            return response.send(htmlResp)
        })
        .catch(error => next(error))
})

app.route('/api/persons')
    .get((request, response, next) => {
        Person.find({})
            .then(persons => response.json(persons))
            .catch(error => next(error))
    })
    .post((request, response, next) => {
        const body = request.body

        if (!body) return response.status(400).json({ error: 'content missing' })
        if (!body.name) return response.status(400).json({ error: 'name missing' })
        if (!body.number) return response.status(400).json({ error: 'number missing' })

        Person.exists({ 'name': new RegExp(`^${body.name}$`, 'i') })
            .then(result => {
                if (result) {
                    return response.status(400).json({ error: 'name must be unique' })
                } else {
                    const newPerson = new Person({
                        name: body.name,
                        number: body.number
                    })

                    return newPerson.save().then(() => response.status(201).json(newPerson))
                }
            })
            .catch(error => next(error))
    })

app.route('/api/persons/:id')
    .get((request, response, next) => {
        const id = request.params.id

        Person.findById(id)
            .then(result => {
                return result ? response.json(result) : response.status(404).send()
            })
            .catch(error => next(error))
    })
    .delete((request, response, next) => {
        const id = request.params.id

        Person.findByIdAndRemove(id)
            .then(result => {
                console.log(result)
                return result ? response.status(204).end() : response.status(404).end()
            })
            .catch(error => next(error))
    })
    .put((request, response, next) => {
        const id = request.params.id
        const body = request.body

        const person = {
            name: body.name,
            number: body.number
        }

        Person.findByIdAndUpdate(id, person, { new: true, runValidators: true, context: 'query' })
            .then(updatedPerson => {
                return updatedPerson ? response.send(updatedPerson) : response.status(404).end()
            })
            .catch(error => next(error))
    })

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})