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
  payment: { type: Schema.Types.ObjectId, ref: 'Payment'},
  contract: { type: Schema.Types.ObjectId, ref: "Contract"}
});



const Case = mongoose.model("Case", caseSchema);

module.exports = Case;
