const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const paymentSchema = new Schema ({
  beginDate: String,
  totalRetainer: Number,
  totalPayments: Number,
  nextPaymentDates: [String],
  nextPaymentAmount: Number,
  initialPayment: Number,
  currentBalance: Number,
  remainingPayments: Number,
  delinquentPayments: Number,
  delinquentPaymentDates: String,
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
