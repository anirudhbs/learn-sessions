const express = require('express')
const app = express()
const session = require('express-session')

app.use(
  session({
    secret: '2pac',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000
    }
  })
)

app.get('/', (req, res) => {
  if (req.session.views) {
    req.session.views += 1
  } else {
    req.session.views = 1
  }
  res.json({
    views: req.session.views
  })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`)
})
