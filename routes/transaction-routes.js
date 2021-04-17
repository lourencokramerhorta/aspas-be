const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user.js');
const Transaction = require('../models/transaction-model');

const router = express.Router();

router.post('/transaction/:id/:book2', (req, res, next) => {
  Transaction.create({
    user1: req.session.passport.user,
    user2: req.params.id,
    book2: req.params.book2,
    type: req.params.type
  }).then(() => {
    res.redirect(`/user/${req.params.id}/transactions`);
  });
});

router.get('/transaction', (req, res, next) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.get('/user/:id', (req, res, next) => {
  User.findById(req.params.id)
    .populate('books')
    .populate('places')
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.put('/user/:id', (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({
        message: `User with ${req.params.id} is updated successfully.`
      });
    })
    .catch((error) => {
      res.json(error);
    });
});

router.delete('/user/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `User with ${req.params.id} is removed successfully.`
      });
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
