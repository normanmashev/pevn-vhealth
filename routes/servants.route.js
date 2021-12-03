const Router = require("express");
const router = new Router();
const ServantsController = require("../controllers/servants.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/most-active/", authMiddleware, ServantsController.getMostActive);
router.get("/", authMiddleware, ServantsController.getAll);
router.get("/:id", authMiddleware, ServantsController.getOne);
router.delete("/:id", authMiddleware, ServantsController.remove);

module.exports = router;
