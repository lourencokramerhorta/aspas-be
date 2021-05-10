'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema(
  {
    user1: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    user2: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    book1: {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    },
    book2: {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    },
    type: {
      type: String,
      enum: ['shelf', 'user']
    },
    status: {
      type: String,
      enum: ['pending', 'complete'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Transaction', schema);
