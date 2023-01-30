import mongoose from "mongoose";

const { Schema } = mongoose;

const AttendanceSchema = new mongoose.Schema(
  {
    EmployeeID: {
      type: String,
      required: true,
    },
    EmployeeName: {
      type: String,
      required: true,
    },
    Date: {
      type: String,
      // required: true,
    },
    Month: {
      type: String,
      // required: true,
    },
    WeekDay: {
      type: String,
      // required: true,
    },
    CheckIn: {
      type: String,
      // required: true,
    },
    CheckOut: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AttendanceModel", AttendanceSchema);
