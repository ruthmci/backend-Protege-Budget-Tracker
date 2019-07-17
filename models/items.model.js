// Model for items purchased
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({

  // description and expenditure are validated because they are entered by the user
  protege_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Protege' },
  description: { type: String, required: [true, 'Description required'] },
  expenditure: { type: Number,
                  required: [true,'Expenditure required'],
                  min: [0, 'Needs to be a positive number'],
                  max: [1000, 'Outside protege budget'], 
                   }, 
  date: { type: Date },
}, {
  timestamps: true,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;