import express from "express";
import {
  authUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
  deleteUsers,
  getUserbyId,
  updateUser,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/").get(protect, admin, getUsers);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/profile").put(protect, updateUserProfile);
router.route("/:id").delete(protect, admin, deleteUsers);
router.route("/:id").get(protect, admin, getUserbyId);
router.route("/:id").put(protect, updateUser);

export default router;