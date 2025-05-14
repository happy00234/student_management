// Run this in a Node.js script or REPL:
const bcrypt = require("bcryptjs");

(async () => {
  const hashed = await bcrypt.hash("admin123", 10);
  console.log(hashed);
})();
