const express = require('express')
const router = express.Router()
const Restaurant = require('../models/schema.js')
const { autenticated } = require('../config/auth')
// home page
router.get('/', autenticated, (req, res) => {
  Restaurant.find({ userId: req.user._id }, (err, list) => {
    if (err) return console.log(err);
    return res.render('index', { list })
  })
})
module.exports = router

