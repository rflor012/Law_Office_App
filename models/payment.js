const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const paymentSchema = new Schema ({
  contract: {beginDate: String, endDate: String, totalRetainer: String, totalPayments: String, nextPayment: String},
  initialPayment: String,
  currentBalance: String,
  remainingPayments: String,
  delinquentPayments: String
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
