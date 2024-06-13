import express from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
} from "../controllers/auth.user.admin.js";

import { verifyAdminToken } from "../middleware/verifyTokens.js";

import { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from "../controllers/course.admin.js";
const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

router.get("/courses", verifyAdminToken, getAllCourses);
router.post("/courses", verifyAdminToken, createCourse);
router.get("/courses/:id", verifyAdminToken, getCourseById);
router.put("/courses/:id", verifyAdminToken, updateCourse);
router.delete("/courses/:id", verifyAdminToken, deleteCourse);
export default router;
