'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    description: {
      type: String
    },
    owners: [{ type: Schema.Types.ObjectId, ref: 'Owner' }],
    shelf: [{ type: Schema.Types.ObjectId, ref: 'Shelf' }],
    imageUrl: {
      type: String,
      default: ''
    },
    location: { type: { type: String }, coordinates: [Number] },
    schedule: [{ weekDay: String, time: Date }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Place', schema);
