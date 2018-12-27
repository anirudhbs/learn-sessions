const express = require('express')
const app = express()
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const path = require('path')
const bodyParser = require('body-parser')

const redisStoreOptions = {
  host: 'localhost',
  port: 6379,
  ttl: 60000
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(
  session({
    store: new RedisStore(redisStoreOptions),
    secret: '2pac',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000
    }
  })
)

app.use(express.static('public'))

const checkUser = (req, res, next) => {
  if (!('email' in req.session)) {
    res.sendFile(path.join(__dirname, '../public/login.html'))
  } else {
    next()
  }
}

app.get('/', checkUser, (req, res) => {
  req.session.views += 1
  res.json({
    email: req.session.email,
    views: req.session.views
  })
})

app.post('/login', (req, res) => {
  const { email } = req.body
  req.session.email = email
  req.session.views = 0
  res.redirect('/')
})

app.use('*', (req, res) => {
  res.redirect('/')
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`)
})
