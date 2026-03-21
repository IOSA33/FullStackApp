const express = require('express')
const app = express()

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "040-123332132"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-324-234222"
    }
] 

app.use(express.json())

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const newPersons = persons.filter(n => n.id === id)

    if(newPersons.length === 0) {
        response.status(404).json({Error: "No such id"})
    }

    response.json(newPersons);
})

app.get('/info', (request, response) => {
    const timestamp = new Date();
    response.send('<p>Phonebook has info for '+persons.length+' people</p> <p>'+timestamp.toString()+'</p>');
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(note => note.id !== id)

    response.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'content missing' 
        })
    }

    if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({ 
            error: 'name must be unique'
        })    
    }

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson)

    response.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})