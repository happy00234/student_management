// const Student = require("../models/Student");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// exports.signup = async (req, res) => {
//   const { username, password } = req.body;
//   const hashed = await bcrypt.hash(password, 10);
//   const student = new Student({ username, password: hashed });
//   await student.save();
//   res.status(201).json({ message: "Signup success" });
// };

// exports.login = async (req, res) => {
//   const { username, password } = req.body;
//   const student = await Student.findOne({ username });
//   if (!student) return res.status(404).json({ message: "User not found" });

//   const match = await bcrypt.compare(password, student.password);
//   if (!match) return res.status(400).json({ message: "Wrong password" });

//   const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);
//   res.json({ token });
// };

// exports.getDetails = async (req, res) => {
//   const student = await Student.findById(req.user.id);
//   res.json({ username: student.username });
// };


const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { username, password, fullName, email, phoneNumber, attendance, feePaid } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const student = new Student({
    username,
    password: hashed,
    fullName,
    email,
    phoneNumber,
    attendance,
    feePaid,
  });

  await student.save();
  res.status(201).json({ message: "Signup success" });
};


exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const student = await Student.findOne({ username });
    if (!student) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, student.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

exports.getDetails = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    res.json({
      username: student.username,
      fullName: student.fullName,
      email: student.email,
      phoneNumber: student.phoneNumber,
      attendance: student.attendance,
      feePaid: student.feePaid,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch student details" });
  }
};

