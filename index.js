const express = require('express')
const app = express()
const session = require('express-session')
const PORT = process.env.PORT || 8080

app.use(session({
  secret: '2pac',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000
  }
}))

app.get('/', (req, res, next) => {
  if (req.session.views) {
    req.session.views += 1
  } else {
    req.session.views = 1
  }
  res.json({
    views: req.session.views
  })
})

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`)
})
