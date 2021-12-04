const Router = require("express");
const router = new Router();
const DiseaseController = require("../controllers/disease.controller");
const DiseaseTypeController = require("../controllers/diseasetype.controller");
const authMiddleware = require("../middleware/auth.middleware");

// DON'T SWAP, OTHERWISE IT WON'T WORK

// First, initialize disease type routes
router.post("/type", authMiddleware, DiseaseTypeController.create);
router.get("/type", authMiddleware, DiseaseTypeController.getAll);
router.get("/type/:id", authMiddleware, DiseaseTypeController.getOne);

router.delete(
	"/encounter",
	authMiddleware,
	DiseaseController.deleteDiseaseEncounter
);

router.get(
	"/most-dangerous",
	authMiddleware,
	DiseaseController.getMostDangerous
);

// After that disease routes
router.post("/", authMiddleware, DiseaseController.create);
router.get("/", authMiddleware, DiseaseController.getAll);
router.get("/:id", authMiddleware, DiseaseController.getOne);

module.exports = router;
