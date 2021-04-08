const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user.js');

const router = express.Router();

router.get('/user-list', (req, res, next) => {
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
