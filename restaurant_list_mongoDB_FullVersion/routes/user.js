const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')
// login page
router.get('/login', (req, res) => {
  res.render('login', { errors: [{ message: req.flash('error') }] })
})
// login check
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next)
})

// register page
router.get('/register', (req, res) => {
  res.render('register')
})
// register check
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  let errors = []
  if (!name || !email || !password || !password2) {
    errors.push({ message: '所有欄位都是必填!' })
  }
  if (password !== password2) {
    errors.push({ message: '兩次密碼輸入不一致!' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    User.findOne({ email: email }).then(user => {
      //if user already exsist,redirect to login page
      if (user) {
        errors.push({ message: '此信箱已被註冊過!' })
        console.log('User already exsist!');
        res.render('register', { errors, name, email, password, password2 })

      } else {
        //else add new user to DB
        const newUser = new User({
          name,
          email,
          password
        })
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.log(err);
            newUser.password = hash
            newUser
              .save()
              .then(user => {
                res.redirect('/')
              })
              .catch(err => {
                console.log(err);
              })
          }))
      }
    })
  }
})
// logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})

module.exports = router