import express from "express";
import {
  Attenance,
  AttenanceCheckOutCheckOut,
  GetSpecificEmployeeAttendace,
  GetAllEmployeeAttendace,
} from "../Controllers/AttendanceControllers.js";
import { verifyAdmin, verifyToken, verifyUser } from "../Utils/VerifyToken.js";

const router = express.Router();

// post empty details for attendace
router.post("/:employeeid", verifyUser, verifyAdmin, Attenance);

// put for checkout
router.put(
  "/:employeeid/:todayid",
  verifyUser,
  verifyAdmin,
  AttenanceCheckOutCheckOut
);

// get For specific Employee Attendace
router.get(
  "/:employeeid",
  verifyUser,
  verifyAdmin,
  GetSpecificEmployeeAttendace
);

// get For specific Employee as well as specific Day Attendace
router.get(
  "/:employeeid/:todayid",
  verifyUser,
  verifyAdmin,
  GetSpecificEmployeeAttendace
);

// get For all Employee Attendace
router.get("/", verifyAdmin, GetAllEmployeeAttendace);

export default router;
