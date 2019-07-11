const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({

  protege_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Protege' },
  description: { type: String, required: true },
  expenditure: { type: Number },
  date: { type: Date },
}, {
  timestamps: true,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;