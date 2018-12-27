const express = require('express')
const app = express()
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const redisStoreOptions = {
  host: 'localhost',
  port: 6379,
  ttl: 60000
}

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
