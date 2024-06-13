import prisma from "../lib/prisma.js";

export const getAllCoursesforStudent = async (req, res) => {
  try {
    // Fetch all available courses from the database
    const availableCourses = await prisma.course.findMany({
      where: {
        availability: true,
      },
    });

    // If there are no available courses, respond with a 404 Not Found status
    if (!availableCourses || availableCourses.length === 0) {
      return res.status(404).json({ message: "No available courses found" });
    }

    // If available courses are found, respond with them
    res.status(200).json(availableCourses);
  } catch (error) {
    // If an error occurs, respond with a 500 Internal Server Error status
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

