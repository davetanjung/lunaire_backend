import express from "express";
import { authController } from "../controllers/authController";
import { activityController } from "../controllers/activityController";
// import {
//   registerUser,
//   authenticateUser,
//   logoutUser,
// } from "../controllers/authController";

const router = express.Router();

router.post("/api/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// activity
router.post("/api/activity", activityController.createActivity)
router.get("/api/activity", activityController.getAllActivity)
router.put("/api/activity", activityController.updateActivity)
router.delete("/api/activity", activityController.deleteActivity)

// category
// router.post("/api/activity", activityController.createActivity)

export default router;