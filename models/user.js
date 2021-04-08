'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    passwordHashAndSalt: {
      type: String
    },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    photo: {
      type: String,
      default: ''
    },
    location: { type: { type: String }, coordinates: [Number] }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', schema);
