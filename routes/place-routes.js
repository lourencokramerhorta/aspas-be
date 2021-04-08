const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user.js');
const Place = require('../models/places-model');
const Shelf = require('../models/shelf-model');


const router = express.Router();

router.post('/create-place', async (req, res, next) => {
  const { name, description } = req.body;
  /////// create shelf em await para poder por o id no place! (dar update a shelf com o id do place)
  console.log('place/shelf body', req.body);

  try {
    const newShelf = await Shelf.create({
      name: 'My new shelf'
    });
    console.log(newShelf);

    const newPlace = await Place.create({
      name: name,
      description: description,
      shelf: newShelf._id,
      owners: [req.session.passport.user]
    });
    res.status(200).json(newPlace);
  } catch (error) {
    res.json(error);
  }
});

router.get('/place/:id', (req, res, next) => {
  Place.findById(req.params.id)
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
