const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const paymentSchema = new Schema ({
  beginDate: String,
  totalRetainer: Number,
  totalPayments: Number,
  nextPaymentDates: [String],
  nextPaymentAmount: Number,
  initialPayment: Number,
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
