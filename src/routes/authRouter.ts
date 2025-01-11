import express from "express";
import { authController } from "../controllers/authController";
import { activityController } from "../controllers/activityController";
import { categoryController } from "../controllers/categoryController";
import { SleepNoteController } from "../controllers/sleepnoteController";

// import {
//   registerUser,
//   authenticateUser,
//   logoutUser,
// } from "../controllers/authController";

const router = express.Router();

//router sleep note
export const sleepNoteRouter = express.Router();

router.get("/api/sleepNote/:userId", SleepNoteController.getAllSleepNotes);
router.post("/api/sleepNote", SleepNoteController.createSleepNote);
router.put("/api/sleepNote", SleepNoteController.updateSleepNoteById);
router.delete("/api/sleepNote/:id", SleepNoteController.deleteSleepNoteById);

router.post("/api/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// activity
router.post("/api/activity", activityController.createActivity)
router.get("/api/activity", activityController.getAllActivity)
router.get("/api/activity/:userId", activityController.getUserActivities)
router.put("/api/activity", activityController.updateActivity)
router.delete("/api/activity", activityController.deleteActivity)

router.get("/api/category", categoryController.getAllCategories)

// category
// router.post("/api/activity", activityController.createActivity)

export default router;