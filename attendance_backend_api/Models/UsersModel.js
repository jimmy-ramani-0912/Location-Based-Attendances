import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    EmployeeID: {
      type: String,
      required: true,
    },
    EmployeeName: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: Number,
      required: false,
      unique: true, // define a unique value
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    // Attendance: [],
  },
  { timestamps: true }
);

export default mongoose.model("UsersModel", UserSchema);
