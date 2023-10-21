require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

morgan.token('body', req => JSON.stringify(req.body))


app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/info', (request, response) => {
    let htmlResp = `<p>Phonebook has info for ${persons.length} people</p>`;
    htmlResp += `<p>${Date().toLocaleString()}</p>`

    return response.send(htmlResp);
})

app.route('/api/persons')
    .get((request, response) => {
        Person.find({}).then(persons => response.json(persons))
    })
    .post((request, response) => {
        const body = request.body;

        if (!body) return response.status(400).json({ error: 'content missing' });
        if (!body.name) return response.status(400).json({ error: 'name missing' });
        if (!body.number) return response.status(400).json({ error: 'number missing' });

        // if (persons.some(person => person.name.toLocaleLowerCase() === body.name.toLocaleLowerCase()))
        //     return response.status(400).json({ error: 'name must be unique' });

        const newPerson = new Person({
            name: body.name,
            number: body.number
        })

        newPerson.save().then(() => response.status(201).json(newPerson))
    })

app.route('/api/persons/:id')
    .get((request, response) => {
        const id = Number(request.params.id);

        const person = persons.find(person => person.id === id)

        return person ? response.json(person) : response.status(404).send();
    })
    .delete((request, response) => {
        const id = Number(request.params.id);

        const person = persons.find(person => person.id === id);
        if (person) {
            persons = persons.filter(person => person.id !== id)
            return response.status(204).end()
        } else {
            return response.status(404).end()
        }
    })

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})