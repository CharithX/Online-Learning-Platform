import prisma from "../lib/prisma.js";


// enroll a user in a course
export const enrollUser = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.userId; // Assuming userId is already extracted from the token

  try {
    // Create a new enrollment record
    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
      },
    });

    // Respond with the enrollment record
    res.status(201).json(enrollment);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//  view enrollments for a user
export const getUserEnrollments = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find all enrollments for the user
    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: { course: true },
    });

    // Respond with enrollments
    res.status(200).json(enrollments);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Controller function to view enrollments for a course
export const getCourseEnrollments = async (req, res) => {
  const { courseId } = req.params;

  try {
    // Find all enrollments for the course
    const enrollments = await prisma.enrollment.findMany({
      where: { courseId },
      include: { user: true },
    });

    // Respond with enrollments
    res.status(200).json(enrollments);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


//view all enrollments for admin
export const getAllEnrollments = async (req, res) => {
  // Check if the user making the request is an admin
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    // Find all enrollments
    const enrollments = await prisma.enrollment.findMany({
      include: { user: true, course: true },
    });

    // Respond with enrollments
    res.status(200).json(enrollments);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
