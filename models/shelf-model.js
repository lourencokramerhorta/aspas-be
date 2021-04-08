'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    photo: {
      type: String,
      default: ''
    },
    place: {
      type: Schema.Types.ObjectId
    },
    books: [{ type: Schema.Types.ObjectId }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Shelf', schema);
