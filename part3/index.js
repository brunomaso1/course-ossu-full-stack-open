const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    return response.send('<h1>Server is up</h1>');
})

app.get('/info', (request, response) => {
    let htmlResp = `<p>Phonebook has info for ${persons.length} people</p>`;
    htmlResp += `<p>${Date().toLocaleString()}</p>`

    return response.send(htmlResp);
})

app.get('/api/persons', (request, response) => {
    return response.json(persons);
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

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})