const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user.js');
const Place = require('../models/place-model');
const Shelf = require('../models/shelf-model');

const router = express.Router();

router.post('/create-place', async (req, res, next) => {
  console.log(req.body);
  const { name, description, imageUrl } = req.body;

  try {
    const newShelf = await Shelf.create({
      name: 'My new shelf'
    });

    const newPlace = await Place.create({
      name: name,
      description: description,
      shelf: newShelf._id,
      imageUrl: imageUrl,
      owners: [req.session.passport.user]
    });
    const user = await User.findByIdAndUpdate(
      req.session.passport.user,
      { $push: { places: newPlace._id } },
      { new: true }
    );
    res.status(200).json({ newPlace, user });
  } catch (error) {
    res.json(error);
  }
});

router.get('/place/:id', (req, res, next) => {
  Place.findById(req.params.id)
    .populate('shelf')
    .then((place) => {
      res.json(place);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.put('/place/:id', (req, res, next) => {
  Place.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({
        message: `Place with ${req.params.id} is updated successfully.`
      });
    })
    .catch((error) => {
      res.json(error);
    });
});

router.delete('/place/:placeID/shelf/:shelfID', async (req, res, next) => {
  try {
    await Shelf.findByIdAndRemove(req.params.shelfID);
    await Place.findByIdAndRemove(req.params.placeID);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
