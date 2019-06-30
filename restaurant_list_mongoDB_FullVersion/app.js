const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
  require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}
const exphbs = require('express-handlebars')
const chalk = require('chalk')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
app.use(flash())
// use static files
app.use(express.static('public'))

// setting tempaltes
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// setting db connection
mongoose.connect('mongodb://127.0.0.1/restaurant', { useNewUrlParser: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', () => {
  console.log(chalk.red('MongoDB connecting failed!'));
})

db.once('open', () => {
  console.log(chalk.green.inverse('MongoDB connected!'));
})

// setting passport and session
const session = require('express-session')
const passport = require('passport')

// using session
app.use(session({
  secret: 'my secret key',
  resave: false,
  saveUninitialized: false
}))

// using passport
app.use(passport.initialize())
app.use(passport.session())


// setting passport config
require('./config/passport')(passport)
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  // res.locals.errors = [{ message: req.flash('error')[0] }]
  next()
})

app.use('/restaurants', require('./routes/restaurants'))
app.use('/', require('./routes/home'))
app.use('/users', require('./routes/user.js'))
//adding social media login options
app.use('/auth', require('./config/social_auth.js'))
// setting server
app.listen(3000, () => {
  console.log(chalk.green('You are now listening at port 3000'));
})