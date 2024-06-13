import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
     const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign({
      id: user.id

    }, process.env.JWT_SECRET,
      {expiresIn: age}
    );
       res.cookie("token", token, { maxAge: age, httpOnly: true });
    res.json({ message: "succesfully logged in" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};


export const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "User logged out" });
};



