const Admin = require("../models/Admin");
const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  res.json({ token });
};

exports.addStudent = async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const student = new Student({ username, password: hashed });
  await student.save();
  res.status(201).json({ message: "Student added" });
};

exports.deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted" });
};

exports.getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};
