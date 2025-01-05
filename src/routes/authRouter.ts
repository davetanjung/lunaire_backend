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

export const sleepNoteRouter = express.Router();

// Route untuk mendapatkan semua catatan tidur
sleepNoteRouter.get("/api/getAllSleepNotes", SleepNoteController.getAllSleepNotes);
// Route untuk mendapatkan catatan tidur berdasarkan ID
sleepNoteRouter.get("/api/getSleepNoteById/:id", SleepNoteController.getSleepNoteById);
// Route untuk membuat catatan tidur baru
sleepNoteRouter.post("/api/createSleepNote", SleepNoteController.createSleepNote);
// Route untuk memperbarui catatan tidur berdasarkan ID
sleepNoteRouter.put("/api/updateSleepNoteById", SleepNoteController.updateSleepNoteById);
// Route untuk menghapus catatan tidur berdasarkan ID
sleepNoteRouter.delete("/api/deleteSleepNoteById/:id", SleepNoteController.deleteSleepNoteById);


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