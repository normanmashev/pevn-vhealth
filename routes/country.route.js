const Router = require("express");
const router = new Router();
const CountryController = require("../controllers/country.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, CountryController.create);
router.get("/", CountryController.getAll);
router.patch("/", authMiddleware, CountryController.update);
router.get("/:id", authMiddleware, CountryController.getOne);
router.delete("/:id", authMiddleware, CountryController.remove);

module.exports = router;
