'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');
const User = require('../models/user');

router.get('/', (req, res, next) => {
  console.log(req.user);
  res.json({ type: 'success', data: { title: 'Hello World' } });
});

router.get('/user-profile', (req, res, next) => {
  res.json(req.user);
});

router.get('/private', routeGuard, (req, res, next) => {
  res.json({});
});

module.exports = router;
