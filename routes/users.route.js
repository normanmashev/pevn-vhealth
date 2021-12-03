const Router = require("express");
const router = new Router();
const UserController = require("../controllers/users.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware, UserController.getAll);
router.get("/:id", authMiddleware, UserController.getOne);
router.put("/:id", authMiddleware, UserController.update);
router.delete("/:id", authMiddleware, UserController.remove);

module.exports = router;
