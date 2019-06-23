const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const chalk = require('chalk')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// use static files
app.use(express.static('public'))

// setting tempaltes
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// setting db connection
mongoose.connect('mongodb://127.0.0.1/restaurant', { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', () => {
  console.log(chalk.red('MongoDB connecting failed!'));
})

db.once('open', () => {
  console.log(chalk.green.inverse('MongoDB connected!'));
})

app.use('/restaurants', require('./routes/restaurants'))
app.use('/', require('./routes/home'))

// setting server
app.listen(3000, () => {
  console.log(chalk.green('You are now listening at port 3000'));
})