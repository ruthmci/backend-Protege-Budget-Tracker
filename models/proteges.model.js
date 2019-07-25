// Model for proteges

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

// Name and email are validated because they are entered by the user
const protegeSchema = new Schema({
  protegename: { type: String, required: [true, 'Please enter the protege name']},
  protegeemail:{type: String,
                unique: [true, 'That email address is already registered'], 
                validate: [validateEmail, 'Please enter a valid email address'],
                match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
                required: [true, 'Please enter the protege email']
              },
  expenditure: { type: Number },
  balance: { type: Number},
  date: { type: Date },
}, {
    timestamps: true,
});


const Protege = mongoose.model('Protege', protegeSchema);

module.exports = Protege;