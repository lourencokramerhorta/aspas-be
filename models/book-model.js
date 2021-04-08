'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  author: [{ type: String, required: true, trim: true }],
  genre: {
    type: String
  },
  isbn: [{ type: String, required: true, trim: true }]
});

module.exports = mongoose.model('Book', schema);
