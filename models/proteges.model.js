// Model for proteges

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const protegeSchema = new Schema({
  protegename: { type: String, required: true,
  },
  protegeemail:{type: String,
    unique: true,},
  expenditure: { type: Number },
  balance: { type: Number},
  date: { type: Date },
}, {
    timestamps: true,
});



const Protege = mongoose.model('Protege', protegeSchema);

module.exports = Protege;