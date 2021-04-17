'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema(
  {
    from: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: Schema.Types.ObjectId },
    bookOffer: { type: Schema.Types.ObjectId, ref: 'Book' },
    bookRequest: { type: Schema.Types.ObjectId, ref: 'Book' },
    requestState: { type: String }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Transaction', schema);
