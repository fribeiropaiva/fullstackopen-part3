const express = require('express');
const app = express();

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) =>{
  response.end('<h1>Hello World 1</h1>')
})

app.get('/api/persons', (request, response) => {
  if (!!persons.length) {
    return response.json(persons)
  }
});

app.get('/api/persons/:id', (request, response) => {
  const chosenId = persons.find(person => String(person.id) === request.params.id);
  if (!chosenId) {
    return response.status(404).end();
  }

  response.json(chosenId);
});

app.get('/info', (request, response) => {
  response.end(`<p>Phonebook has info for ${persons.length} people
                <p>${new Date()}</p>`);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(200).end(JSON.stringify(persons));
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});