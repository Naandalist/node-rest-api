const router = require("express").Router();
const {
  createUser,
  getUser,
  getUsers,
  editUser,
  deleteUser,
} = require("../controllers");
const upload = require("../utils/multer");

router.post("/user", createUser);
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.put("/user/:id", upload.single("avatar"), editUser);
router.delete("/user/:id", deleteUser);

module.exports = router;
