const express = require('express')

const sensorRouter = require('./routes/sensores')

let app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/sensores', sensorRouter)

app.use((error, req, res, next) => {
  console.log(error)
  res.status(500).send('')
})

app.use((req, res) => {
  console.log('sin ruta')
  res.status(404).send('')
})


let server = app.listen(4000, () => {
  console.log('Server is listening on port 4000')
})
