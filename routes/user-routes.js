const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user.js');
const uploader = require('../configs/cloudinary-setup.config');

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
    .populate('books')
    .populate('places')
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.get('/user/:id/edit', (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch((error) => res.json(error));
});

router.post('/upload', uploader.single('imageUrl'), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.json({ secure_url: req.file.path });
});

router.put('/user/:id/edit', (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.delete('/user/:id/delete', (req, res, next) => {
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
