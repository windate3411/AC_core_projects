const express = require('express')
const router = express.Router()
const Restaurant = require('../models/schema.js')
// home page
router.get('/', (req, res) => {
  Restaurant.find((err, list) => {
    if (err) return console.log(err);
    return res.render('index', { list })
  })
})
module.exports = router