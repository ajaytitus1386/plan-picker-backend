import mongoose from "mongoose";

const PlanSchema = mongoose.Schema({
  planName: {
    type: String,
  },
  monthlyPrice: {
    type: Number,
  },
  yearlyPrice: {
    type: Number,
  },
  videoQuality: {
    type: String,
  },
  resolution: {
    type: String,
  },
  devices: {
    type: String,
  },
  screens: {
    type: Number,
  },
});

export default mongoose.model("plan", PlanSchema);
