const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  protegename: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date },
}, {
  timestamps: true,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;