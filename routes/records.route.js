const Router = require("express");
const router = new Router();
const RecordsController = require("../controllers/records.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/servant/:id", authMiddleware, RecordsController.getServantRecords);
router.get("/", authMiddleware, RecordsController.getAll);
router.post("/", authMiddleware, RecordsController.create);
router.get("/:id", authMiddleware, RecordsController.getOne);
router.patch("/", authMiddleware, RecordsController.update);
router.delete("/", authMiddleware, RecordsController.remove);

module.exports = router;
