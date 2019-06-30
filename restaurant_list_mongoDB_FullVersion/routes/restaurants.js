const express = require('express')
const router = express.Router()
const Restaurant = require('../models/schema.js')
const { autenticated } = require('../config/auth.js')
// load in express-validator
const { check, validationResult } = require('express-validator');

//get all datas
router.get('/sort', autenticated, (req, res) => {

  const sortPattern = {
    'a-z': { name: 'asc' },
    'z-a': { name: 'desc' },
    'location': { location: 'asc' },
    'ratings_desc': { rating: 'desc' },
    'ratings_asc': { rating: 'asc' }
  };
  Restaurant.find({ userId: req.user._id })
    .sort(sortPattern[req.query.filters])
    .exec((err, list) => {
      if (err) return console.log(err);
      return res.render('index', { list })
    })
})


// add new restaurant
router.get('/new', autenticated, (req, res) => {
  res.render('new')
})

router.post('/', autenticated, [
  check('name')
    .not().isEmpty(),
  check('email')
    .isEmail()
], (req, res) => {
  const restaurant = new Restaurant()
  Object.assign(restaurant, req.body)
  Object.assign(restaurant, { userId: req.user._id })
  restaurant.save(err => {
    if (err) return console.log(err);
    res.redirect('/')
  })

})

// search
router.get('/search', autenticated, (req, res) => {
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
router.get('/:id', autenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, list) => {
    if (err) return console.log(err);
    return res.render('detail', { list })
  })
})

// edit page
router.get('/:id/edit', autenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, list) => {
    if (err) return console.log(err);
    return res.render('edit', { list })
  })
})

router.post('/:id', autenticated, [
  check('name')
    .not().isEmpty(),
  check('email')
    .isEmail()
], (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, list) => {
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
router.post('/:id/delete', autenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, list) => {
    list.remove(err => {
      if (err) return console.log(err);
      res.redirect('/')
    })
  })
})

module.exports = router