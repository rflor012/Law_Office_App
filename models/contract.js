const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const contractSchema = new Schema({
  contract: String,
  caseID:{ type: Schema.Types.ObjectId, ref: 'Case'}
});



const Contract = mongoose.model("Contract", contractSchema);

module.exports = Contract;
