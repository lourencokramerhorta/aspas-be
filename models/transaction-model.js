'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema(
  {
    user1: { type: Schema.Types.ObjectId },
    user2: { type: Schema.Types.ObjectId },
    book1: {},
    book2: {},
    type: { type: String, enum: ['shelf', 'user'] },
    status: { enum: ['pending', 'complete'] }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Transaction', schema);
