'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');
const bcryptjs = require('bcryptjs');

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then((user) => {
      callback(null, user);
    })
    .catch((error) => {
      callback(error);
    });
});

passport.use(
  'local-sign-up',
  new LocalStrategy(
    {
      passReqToCallback: true
    },
    (req, username, password, callback) => {
      bcryptjs
        .hash(password, 10)
        .then((hash) => {
          return User.create({
            username,
            password,
            passwordHashAndSalt: hash
          });
        })
        .then((user) => {
          callback(null, user);
        })
        .catch((error) => {
          callback(error);
        });
    }
  )
);

passport.use(
  'local-sign-in',
  new LocalStrategy((username, password, callback) => {
    let user;
    User.findOne({
      username
    })
      .then((document) => {
        user = document;
        return bcryptjs.compare(password, user.passwordHashAndSalt);
      })
      .then((passwordMatchesHash) => {
        if (passwordMatchesHash) {
          return callback(null, user);
        } else {
          return callback(null, false, { message: 'Incorrect password.' });
        }
      })
      .catch((error) => {
        return callback(error);
      });
  })
);
