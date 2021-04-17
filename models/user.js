'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: false,
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
    location: { type: { type: String }, coordinates: [Number] },
    places: [{ type: Schema.Types.ObjectId, ref: 'Place' }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', schema);
