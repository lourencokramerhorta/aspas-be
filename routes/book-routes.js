const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user.js');
const Book = require('../models/book-model');
const axios = require('axios');

const router = express.Router();

router.post('/books-list', (req, res, next) => {
  Book.find()
    .then((allBooksFromDB) => {
      res.json(allBooksFromDB);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post('/find-or-create', async (req, res, next) => {
  console.log('boddyyy', req.body);
  try {
    const result = await Book.findOne({ isbn: req.body.isbn[0] });
    let bookId = '';
    if (result) {
      bookId = result._id;
    } else {
      const newBook = await Book.create({
        title: req.body.title,
        author: req.body.author_name,
        isbn: req.body.isbn
      });
      bookId = newBook._id;
    }
    console.log(req.session.passport.user);
    //add book to user (findByIdAndUpdate da coleção de livros do user com o novo bookId)
    //console.log('req.session', req.session);

    User.findByIdAndUpdate(
      req.session.passport.user,
      {
        $push: { books: bookId }
      },
      { new: true }
    ).then((theResponse) => {
      res.json(theResponse);
    });
  } catch (error) {
    res.status(400).json({ message: 'deu erro na pesquisa ou criação' });
  }
});

router.post('/books-create', (req, res, next) => {
  Book.create({
    title: 'TresCouve',
    author: 'nos',
    ganre: 'bbb',
    owner: '606830ad95374501c614785a',
    isbn: ['333', '4444', '666666', '7777777']
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post('/book/:isbn', (req, res, next) => {
  Book.findOne({ isbn: req.params.isbn })
    .then((aBookFromDB) => {
      res.json(aBookFromDB);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.put('/user/:userId/book/:bookId', async (req, res, next) => {
  try {
    const { userId, bookId } = req.params;

    const result = await User.findByIdAndUpdate(
      userId,
      { $pull: { books: bookId } },
      { new: true }
    );
    if (result) {
      res.json(result);
    }
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
