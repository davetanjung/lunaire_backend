import express from "express";
import { authController } from "../controllers/authController";
// import {
//   registerUser,
//   authenticateUser,
//   logoutUser,
// } from "../controllers/authController";

const router = express.Router();

router.post("/api/register", authController.register);
// router.post("/login", authenticateUser);
// router.post("/logout", logoutUser);

export default router;