const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  username: String,
  password: String,
  fullName: String,
  email: String,
  phoneNumber: String,
  attendance: Number,
  feePaid: Boolean,
});

module.exports = mongoose.model("Student", studentSchema);
