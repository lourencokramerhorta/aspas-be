'use strict';

const { Router } = require('express');

const passport = require('passport');

const router = new Router();

router.post(
  '/sign-up',
  passport.authenticate('local-sign-up', {
    successRedirect: '/user-profile',
    failureRedirect: '/sign-up'
  })
);

router.post(
  '/sign-in',
  passport.authenticate('local-sign-in', {
    successRedirect: '/user-profile',
    failureRedirect: '/sign-in'
  })
);

router.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});

router.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

module.exports = router;
