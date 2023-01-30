import mongoose from "mongoose";

const { Schema } = mongoose;

const VerifyDetailsSchema = new mongoose.Schema(
  {
    WiFi_IP: {
      type: String,
      required: true,
    },
    radius: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("VerifyDetailsModel", VerifyDetailsSchema);
