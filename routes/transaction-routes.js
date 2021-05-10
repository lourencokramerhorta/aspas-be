const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user.js');
const Transaction = require('../models/transaction-model');
const user = require('../models/user.js');

const router = express.Router();

router.post('/trade', (req, res, next) => {
  console.log('the body', req.body);
  Transaction.create({
    user1: req.session.passport.user,
    user2: req.body.profileUserId,
    book1: req.body.book1,
    book2: req.body.book2,
    type: req.body.type
  })
    .then((transaction) => {
      res.json(transaction);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.put('/trade/:id', (req, res, next) => {
  Transaction.findByIdAndUpdate(req.params.id, req.body)
    .then((confirmed) => {
      res.json(confirmed);
    })
    .catch((error) => res.json(error));
});

router.get('/trade/:id', (req, res, next) => {
  Transaction.find({
    $or: [{ user1: req.params.id }, { user2: req.params.id }]
  })
    .populate('book1 book2 user1 user2')
    .then((response) => {
      res.json(response);
    })
    .catch((error) => res.json(error));
});

router.get('/trade-list', (req, res, next) => {
  Transaction.find()
    .populate('book1 book2 user1 user2')
    .then((allTradesFromDB) => res.json(allTradesFromDB))
    .catch((err) => res.json(err));
});

router.put('/accept-trade', async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.body.tradeID);
    console.log('yoyoo', transaction);
    const user1 = await User.findByIdAndUpdate(
      transaction.user1,
      {
        $pull: { books: transaction.book2 }
      },
      { new: true, multi: true }
    );
    user1.books.push(transaction.book1);
    await user1.save();
    console.log(user1);

    const user2 = await User.findByIdAndUpdate(
      transaction.user2,
      {
        $pull: { books: transaction.book1 }
      },
      { new: true, multi: true }
    );
    user2.books.push(transaction.book2);
    await user2.save();
    await user2.populate('books places transactions');
    console.log(user2);
    transaction.status = 'complete';
    await transaction.save();
    res.json({ transaction, user2 });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
