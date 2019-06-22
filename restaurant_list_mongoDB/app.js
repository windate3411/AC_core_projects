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

// setting model
const Restaurant = require('./models/schema.js')

// setting router

// home page
app.get('/', (req, res) => {
  Restaurant.find((err, list) => {
    if (err) return console.log(err);
    return res.render('index', { list })
  })
})

// add new restaurant
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  const restaurant = new Restaurant()
  for (let i in req.body) {
    restaurant[i] = req.body[i]
  }
  restaurant.save(err => {
    if (err) return console.log(err);
    res.redirect('/')
  })

})

// setting server
app.listen(3000, () => {
  console.log(chalk.green('You are now listening at port 3000'));
})