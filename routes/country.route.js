const Router = require("express");
const router = new Router();
const CountryController = require("../controllers/country.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, CountryController.create);
router.get("/", CountryController.getAll);
router.get("/:id", authMiddleware, CountryController.getOne);

module.exports = router;
