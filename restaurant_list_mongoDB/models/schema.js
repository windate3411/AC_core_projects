const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String
  }
})

module.exports = mongoose.model('restaurantSchema', restaurantSchema, 'restaurant_list')