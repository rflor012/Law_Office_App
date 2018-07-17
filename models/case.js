const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const caseSchema = new Schema({
  name: String,
  lastName: String,
  dateOfBirth: String,
  caseNumber: String,
  caseType: String,
  phoneNumber: String,
  address: String,
  paymentID: {type: Schema.Types.ObjectId, ref: 'Payment'},
});

const Case = mongoose.model("Case", caseSchema);

module.exports = Case;
