const express = require('express')
const router = express.Router()
const Restaurant = require('../models/schema.js')

//get all datas
router.get('/sort/:filter', (req, res) => {
  let pattern;
  switch (req.params.filter) {
    case 'a-z':
      pattern = { name: 'asc' }
      break;
    case 'z-a':
      pattern = { name: 'desc' }
      break;
    case 'location':
      pattern = { location: 'asc' }
      break;
    case 'ratings_desc':
      pattern = { rating: 'desc' }
      break;
    case 'ratings_asc':
      pattern = { rating: 'asc' }
      break;
  }
  Restaurant.find({})
    .sort(pattern)
    .exec((err, list) => {
      if (err) return console.log(err);
      return res.render('index', { list })
    })
  // Restaurant.find((err, list) => {
  //   if (err) return console.log(err);
  //   return res.render('index', { list })
  // })
})


// add new restaurant
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
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
router.get('/search', (req, res) => {
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
router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, list) => {
    if (err) return console.log(err);
    return res.render('detail', { list })
  })
})

// edit page
router.get('/:id/edit', (req, res) => {
  console.log(req.body);
  Restaurant.findById(req.params.id, (err, list) => {
    if (err) return console.log(err);
    return res.render('edit', { list })
  })
})

router.post('/:id', (req, res) => {
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
router.post('/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, list) => {
    list.remove(err => {
      if (err) return console.log(err);
      res.redirect('/')
    })
  })
})

module.exports = router