const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const caseSchema = new Schema({
  caseNumber: String,
  caseType: String,
  clientID: String,
  phoneNumber: String,
  address: String,
  paymentID: String
});

const Case = mongoose.model("Case", caseSchema);

module.exports = Case;
