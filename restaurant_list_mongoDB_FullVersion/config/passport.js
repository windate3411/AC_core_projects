const mongoose = require('mongoose')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const FaceBookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github').Strategy;

module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email: email })
        .then(user => {
          if (!user) return done(null, false, { message: '找不到使用者!' })
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err
            if (isMatch) {
              return done(null, user)
            } else {
              return done(null, false, { message: '信箱或密碼錯誤!' })
            }
          })
        })
    })
  )
  //FB login
  passport.use(
    new FaceBookStrategy({
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK,
      profileFields: ['email', 'displayName']
    }, (accessToken, refreshToken, profile, done) => {
      // find and create user
      User.findOne({
        email: profile._json.email
      }).then(user => {
        console.log(profile._json);
        // 如果 email 不存在就建立新的使用者
        if (!user) {
          // 因為密碼是必填欄位，所以我們可以幫使用者隨機產生一組密碼，然後用 bcrypt 處理，再儲存起來
          var randomPassword = Math.random().toString(36).slice(-8)
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(randomPassword, salt, (err, hash) => {
              var newUser = User({
                name: profile._json.name,
                email: profile._json.email,
                password: hash
              })
              newUser.save().then(user => {
                return done(null, user)
              }).catch(err => {
                console.log(err)
              })
            })
          )
        } else {
          console.log(profile._json);
          return done(null, user)
        }
      })
    })
  )
  //google login 
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    User.findOne({
      email: profile._json.email
    }).then(user => {
      if (!user) {
        var randomPassword = Math.random().toString(36).slice(-8)
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(randomPassword, salt, (err, hash) => {
            var newUser = User({
              name: profile._json.name,
              email: profile._json.email,
              password: hash
            })
            newUser.save().then(user => {
              return done(null, user)
            }).catch(err => {
              console.log(err)
            })
          })
        )
      } else {
        return done(null, user)
      }
    })
  })
  )
  //github login
  passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    User.findOne({
      email: profile._json.email
    }).then(user => {
      if (!user) {
        var randomPassword = Math.random().toString(36).slice(-8)
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(randomPassword, salt, (err, hash) => {
            var newUser = User({
              name: profile._json.name,
              email: profile._json.email,
              password: hash
            })
            newUser.save().then(user => {
              return done(null, user)
            }).catch(err => {
              console.log(err)
            })
          })
        )
      } else {
        return done(null, user)
      }
    })
  })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}