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
  User.deleteMany()
  Restaurant.deleteMany()
  console.log('done delting');
})