// load in models
const Restaurant = require('../schema.js')
const User = require('../user.js')
const mongoose = require('mongoose')
// load in datas
const restaurant_json = require('../../restaurant.json')
const users_json = require('../../users.json')
// load in tools
const chalk = require('chalk')
const bcrypt = require('bcryptjs')
// setting db connection
mongoose.connect('mongodb://127.0.0.1/restaurant', { useNewUrlParser: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', () => {
  console.log(chalk.red('MongoDB connecting failed!'));
})

db.once('open', () => {
  users_json.results.forEach((item, index) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(item.password, salt, (err, hash) => {
        const newUser = new User({
          name: item.name,
          email: item.email,
          password: hash
        })
        newUser.save().then(user => {
          for (let i = index * 3; i < (index + 1) * 3; i++) {
            Restaurant.create({
              name: restaurant_json.results[i].name,
              rating: restaurant_json.results[i].rating,
              image: restaurant_json.results[i].image,
              category: restaurant_json.results[i].category,
              location: restaurant_json.results[i].location,
              phone: restaurant_json.results[i].phone,
              description: restaurant_json.results[i].description,
              userId: user._id
            })
          }
        })
          .catch(err => {
            console.log(err);
          })
      })
    })
  })

  console.log(chalk.green.inverse('MongoDB connected!'));
  console.log(chalk.green('Done!'));
})

