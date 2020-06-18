const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
// todo: here to modify later
app.use(bodyParser.text({ type:"*/*" }))

function createInstruction (...operations) {
  return {
    operations
  }
}

function generateInstruction (workerContext) {
  return createInstruction({
    name: 'sleep',
    payload: 5
  })
}

app.post('/log', (req, res) => {
  try {
    console.log(req.body)
    const workerContext = JSON.parse(req.body)
    const log = workerContext.lastOperation
    // save log
    res.sendStatus(201)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

app.post('/instruction', (req, res) => {
  try {
    const workerContext = JSON.parse(req.body)
    const instruction = generateInstruction(workerContext)
    res.status(201).send(instruction)
  } catch (err) {
    res.sendStatus(500)
  }
})

app.listen(port)