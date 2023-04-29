const express = require("express");
const router = express.Router();
const {
  newTask,
  getMyTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.js");
const isAuthenticated = require("../middlewares/auth.js");

router.post("/new", isAuthenticated, newTask);
router.get("/my", isAuthenticated, getMyTask);
router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

module.exports = router;
