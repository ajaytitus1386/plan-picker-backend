import mongoose from "mongoose";

const SubscriptionSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  planId: {
    type: String,
    required: true,
  },
  billingCycle: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  endDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  creditCardNumber: {
    type: String,
    required: true,
  },
  creditCardExpiry: {
    type: String,
    required: true,
  },
  creditCardCvv: {
    type: String,
    required: true,
  },
});

export default mongoose.model("subscription", SubscriptionSchema);
