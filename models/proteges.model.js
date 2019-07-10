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

// const itemSchema = new Schema({
//   protegename: {type: String},
//   _protegeId: { type: Schema.Types.ObjectId, ref: 'Protege' },
//   description: { type: String, required: true },
//   amount: { type: Number, required: true },
//   date: { type: Date },
// }, {
//   timestamps: true,
// });


const Protege = mongoose.model('Protege', protegeSchema);
// const Item = mongoose.model('Item', itemSchema);

module.exports = Protege;