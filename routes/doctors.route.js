const Router = require("express");
const router = new Router();
const DoctorsController = require("../controllers/doctors.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware, DoctorsController.getAll);
router.patch("/", authMiddleware, DoctorsController.update);

module.exports = router;
