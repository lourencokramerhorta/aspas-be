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
  cover_i: {
    type: String
  },
  isbn: [{ type: String, required: true, trim: true }],
  first_publish_year: { type: Number }
});

module.exports = mongoose.model('Book', schema);
