import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await prisma.admin.create({
      data: { email, password: hashedPassword },
    });
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering admin", error });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const age = 1000 * 60 * 60; // Token expires in 1 hour
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: age,
    });

    // Set the token in a cookie
    res.cookie("adminToken", token, { maxAge: age, httpOnly: true });

    res.json({ message: "Successfully logged in" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const logoutAdmin = (req, res) => {
  // Clear the adminToken cookie
  res.clearCookie("adminToken");
  res.json({ message: "Admin logged out" });
};
