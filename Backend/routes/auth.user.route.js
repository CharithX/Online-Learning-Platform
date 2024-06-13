import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.user.controller.js";



import { verifyUserToken } from "../middleware/verifyTokens.js";
import { enrollUser, getCourseEnrollments, getUserEnrollments } from "../controllers/enrollment.js";
import { getAllCoursesforStudent } from "../controllers/course.user.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);


router.get("/courses", verifyUserToken, getAllCoursesforStudent);

// Route to enroll a user in a course
router.post('/enroll', verifyUserToken, enrollUser);

// Route to view enrollments for a specific user
router.get('/user/:userId/enrollments', verifyUserToken, getUserEnrollments);

// Route to view enrollments for a specific course
router.get('/courses/:courseId/enrollments', verifyUserToken, getCourseEnrollments);




export default router;
