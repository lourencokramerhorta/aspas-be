const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user.js');
const Transaction = require('../models/transaction-model');

const router = express.Router();

router.post('/trade', (req, res, next) => {
  Transaction.create({
    user1: req.session.passport.user,
    user2: req.body.profileUserId,
    book1: req.body.book1,
    book2: req.body.book2,
    type: req.body.type
  }).then(() => {
    res.redirect(`/`);
  });
});

/* router.get('/transaction', (req, res, next) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.json(error);
    });
}); */

module.exports = router;
