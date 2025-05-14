// const express = require("express");
// const router = express.Router();
// const { signup, login, getDetails } = require("../controllers/studentController");
// const { verifyStudent } = require("../middleware/auth");

// router.post("/signup", signup);
// router.post("/login", login);
// router.get("/details", verifyStudent, getDetails);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { signup, login, getDetails } = require("../controllers/studentController");
const { verifyStudent } = require("../middleware/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/details", verifyStudent, getDetails);

module.exports = router;

