require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const Phone = require('./models/phone');

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error);
}

app.use(express.static('build'));

app.use(express.json());

app.use(morgan('tiny'));

app.use(cors());

app.use(errorHandler);

morgan.token('method', (req, res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body)
  }
})

app.get('/', (request, response) =>{
  response.end('<h1>Hello World 1</h1>')
})

app.get('/api/persons', (request, response) => {
  Phone.find({}).then(phones => {
    response.json(phones)
  })
});

app.get('/api/persons/:id', (request, response, next) => {
  Phone.findById(request.params.id).then(phone => {
    if (phone) {
      response.json(phone);
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
});

app.get('/info', (request, response) => {
  response.end(`<p>Phonebook has info for ${persons.length} people
                <p>${new Date()}</p>`);
});

app.delete('/api/persons/:id', (request, response) => {
  Phone.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.post('/api/persons', (request, response) => {
  const person = request.body;

  Phone.find({name: person.name}).then(result => {
    if (result) {
      response.status(200).send(result);
    } else {
      const phone = new Phone({
        name: person.name,
        number: person.number
      })

      phone.save().then(savedPhone => {
        response.json(savedPhone)
      })
    }
  })

  // if (!person.name || !person.number) {
  //   return response.status(404).send({ error: 'name and number can not be empty' });
  // }

  // if (persons.find(p => p.name === person.name)) {
  //   return response.status(404).send({ error: 'this name has already been saved' });
  // }

  // if (persons.find(p => p.number === person.number)) {
  //   return response.status(404).send({ error: 'this number has already been saved' });
  // }
});

app.put('/api/persons/:id', (request, response) => {
  const newNumber = request.body.number
  Phone.findByIdAndUpdate(request.params.id, {number: newNumber}, (error, result) => {
    if (error) {
      response.status(404).send({ error: error.message} )
    } else {
      response.send(result)
    }
  })
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});