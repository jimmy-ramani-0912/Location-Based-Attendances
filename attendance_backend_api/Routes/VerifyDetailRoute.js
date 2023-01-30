import express from "express";
import {
  AddVeifyDetails,
  GetVeifyDetails,
} from "../Controllers/VerifyDetailController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../Utils/VerifyToken.js";

const router = express.Router();

// post for adding verify Details
router.post("/", verifyAdmin, AddVeifyDetails);

// Get Verify Details
router.get("/", verifyAdmin, verifyUser, GetVeifyDetails);


export default router;
