const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const protegeSchema = new Schema({
  protegename: { type: String, required: true,
  },
  email:{type: String},
  expenditure: { type: Number },
  balance: { type: Number, required: true },
  date: { type: Date },
}, {
  timestamps: true,
});

const Protege = mongoose.model('Protege', protegeSchema);

module.exports = Protege;