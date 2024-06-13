import prisma from "../lib/prisma.js";

export const getAllCourses = async (req, res) => {
  try {
    // Fetch all courses from the database
    const courses = await prisma.course.findMany();

    // If there are no courses, respond with a 404 Not Found status
    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }

    // If courses are found, respond with the courses
    res.status(200).json(courses);
  } catch (error) {
    // If an error occurs, respond with a 500 Internal Server Error status
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createCourse = async (req, res) => {
  try {
    // Extract course data from request body
    const { title, description, moduleCode, price, availability } = req.body;

    // Create a new course object
    const newCourse = await prisma.course.create({
      data: {
        title,
        description,
        moduleCode,
        price,
        availability,
      },
    });

    // Respond with the saved course
    res.status(201).json(newCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id; // Assuming the course ID is provided in the request parameters

    // Fetch the course by ID from the database
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      // If no course is found with the provided ID, return a 404 status code
      return res.status(404).json({ message: "Course not found" });
    }

    // If the course is found, return it
    res.status(200).json(course);
  } catch (error) {
    // If an error occurs, respond with a 500 Internal Server Error status
    console.error(error);
    res.status(500).json({ message: "Invalid token" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id; // Assuming the course ID is provided in the request parameters
    const { title, description, moduleCode, price, availability } = req.body; // Extract updated course data from request body

    // Check if the course exists
    const existingCourse = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!existingCourse) {
      // If no course is found with the provided ID, return a 404 status code
      return res.status(404).json({ message: "Course not found" });
    }

    // Update the course with the new data
    const updatedCourse = await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        title,
        description,
        moduleCode,
        price,
        availability,
      },
    });

    // Respond with the updated course
    res.status(200).json(updatedCourse);
  } catch (error) {
    // If an error occurs, respond with a 500 Internal Server Error status
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id; // Assuming the course ID is provided in the request parameters

    // Check if the course exists
    const existingCourse = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!existingCourse) {
      // If no course is found with the provided ID, return a 404 status code
      return res.status(404).json({ message: "Course not found" });
    }

    // Delete the course from the database
    await prisma.course.delete({
      where: {
        id: courseId,
      },
    });

    // Respond with a success message
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    // If an error occurs, respond with a 500 Internal Server Error status
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
