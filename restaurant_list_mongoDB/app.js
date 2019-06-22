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

// search
app.get('/restaurants/search', (req, res) => {
  const re = new RegExp(req.query.keyword, 'i')
  let results = {
    $or: [{ name: re }, { category: re }]
  };
  Restaurant.find(results, (err, list) => {
    if (err) return console.log(err);
    res.render('index', { keyword: req.query.keyword, list })
  })
})

// detail page
app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, list) => {
    if (err) return console.log(err);
    return res.render('detail', { list })
  })
})

// edit page
app.get('/restaurants/:id/edit', (req, res) => {
  console.log(req.body);
  Restaurant.findById(req.params.id, (err, list) => {
    if (err) return console.log(err);
    return res.render('edit', { list })
  })
})

app.post('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, list) => {
    if (err) return console.log(err);
    for (let i in req.body) {
      list[i] = req.body[i]
    }
    list.save(err => {
      if (err) return console.log(err);
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

// remove page
app.post('/restaurants/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, list) => {
    list.remove(err => {
      if (err) return console.log(err);
      res.redirect('/')
    })
  })
})

// setting server
app.listen(3000, () => {
  console.log(chalk.green('You are now listening at port 3000'));
})