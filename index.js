const express = require('express')
const app = express()
const logger = require('./loggerMidlewere')
const cors = require('cors')
app.use(cors())
app.use(express.json())

app.use(logger)

let notes = [
  {
    id: 1,
    content: 'Estoy aprendiendo node',
    date: '2021-05-30-t17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Estoy aprendiendo express',
    date: '2021-05-30-t17:30:31.098Z',
    important: true
  },
  {
    id: 3,
    content: 'Estoy en estadias que loco',
    date: '2021-05-30-t17:30:31.098Z',
    important: true
  },
  {
    id: 4,
    content: 'Las apis rest son muy importantes',
    date: '2021-05-30-t17:30:31.098Z',
    important: true
  },
  {
    id: 5,
    content: 'Esto es un ejemplo de documento nuevo',
    date: '2021-05-30-t17:30:31.098Z',
    important: false
  },
  {
    id: 6,
    content: 'Esto es un ejemplo de documento nuevo',
    date: '2021-05-30-t17:30:31.098Z',
    important: false
  },
  {
    id: 6,
    content: 'Esto es un ejemplo de documento nuevo',
    date: '2021-05-30-t17:30:31.098Z',
    important: false
  }
]

app.get('/', (request, response) => {
  response.send('<h3>Prueba con Express</h3>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find((note) => note.id === id)
  response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter((note) => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map((note) => note.id)
  const Maxid = Math.max(...ids)

  const newNote = {
    id: Maxid + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }

  notes = [...notes, newNote]

  response.status(201).json(newNote)
})
app.use((request, response) => {
  response.status(404).json({
    error: 'Not Found'
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
