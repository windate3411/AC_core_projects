const Restaurant = require('./models/schema.js')
const mongoose = require('mongoose')
const restaurant_json = require('../../restaurant.json')
const chalk = require('chalk')

// setting db connection
mongoose.connect('mongodb://127.0.0.1/restaurant', { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', () => {
  console.log(chalk.red('MongoDB connecting failed!'));
})

db.once('open', () => {
  restaurant_json.results.forEach(item => {
    Restaurant.create({
      name: item.name,
      rating: item.rating,
      image: item.image,
      category: item.category,
      location: item.location,
      phone: item.phone,
      description: item.description
    })

  });
  console.log(chalk.green.inverse('MongoDB connected!'));
  console.log(chalk.green('Done!'));
})

