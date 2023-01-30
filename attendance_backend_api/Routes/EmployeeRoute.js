import express from "express";
import {
  DeleteUser,
  GetAllUser,
  GetSpecificUser,
  UpdateUser,
} from "../Controllers/EmployeesControllers.js";
import { verifyAdmin, verifyToken, verifyUser } from "../Utils/VerifyToken.js";

const router = express.Router();

// Put For Update User Details
router.put("/:id", verifyUser, verifyAdmin, UpdateUser);

// delet For Delete User Details
router.delete("/:id", verifyAdmin, DeleteUser);

// get For specific User Details
router.get("/:id", verifyUser, verifyAdmin, GetSpecificUser);

// get For all User Details
router.get("/", verifyAdmin, GetAllUser);

export default router;
