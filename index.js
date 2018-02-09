const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

app.get('/', (req, res) => {
  res.send('Get request')
})

app.post('/', (req, res) => {
  res.send('Post request')
})

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`)
})
