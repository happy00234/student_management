const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  addStudent,
  deleteStudent,
  getStudents,
} = require("../controllers/adminController");

router.post("/login", loginAdmin);
router.post("/addStudent", addStudent);
router.delete("/deleteStudent/:id", deleteStudent);
router.get("/students", getStudents);

module.exports = router;
