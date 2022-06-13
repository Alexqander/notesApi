require('dotenv').config()
require('./mongo')
const express = require('express')
const app = express()
const logger = require('./loggerMidlewere')
const cors = require('cors')
const Note = require('./models/Note')
const notFound = require('./midleweres/notFound')
const handleError = require('./midleweres/handleError')

app.use(cors())
app.use(express.json())
app.use(logger)

app.get('/', (request, response) => {
  response.send('<h3>Prueba con Express</h3>')
})
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  }).catch(err => {
    console.log(err)
  })
})
app.get('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  Note.findById(id).then(note => {
    if (note) {
      return response.json(note)
    } else {
      response.status(404).end()
    }
  }).catch(err => {
    next(err)
  })
})
app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }
  const newNote = new Note({
    content: note.content,
    date: new Date(),
    important: note.important || false

  })

  newNote.save().then(savedNote => {
    response.json(savedNote)
  })
})
app.put('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  const note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => {
      response.json(result)
    })
}
)
app.delete('/api/notes/:id', (request, response, next) => {
  const { id } = request.params

  Note.findByIdAndDelete(id).then(result => {
    response.status(204).end()
  }).catch(err => next(err))
})

app.use(notFound)
app.use(handleError)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
