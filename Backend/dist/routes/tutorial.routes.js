"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TutorialController_1 = require("../controller/TutorialController");
const router = (0, express_1.Router)();
const tutorialController = new TutorialController_1.TutorialController();
router.get("/tutorials", async (req, res) => {
    if (req.query.title) {
        await tutorialController.findByTitle(req, res);
    }
    else {
        await tutorialController.all(req, res);
    }
});
router.get("/tutorials/:id", async (req, res) => {
    await tutorialController.one(req, res);
});
router.post("/tutorials", async (req, res) => {
    await tutorialController.save(req, res);
});
router.put("/tutorials/:id", async (req, res) => {
    await tutorialController.update(req, res);
});
router.delete("/tutorials/:id", async (req, res) => {
    await tutorialController.remove(req, res);
});
router.delete("/tutorials", async (req, res) => {
    await tutorialController.removeAll(req, res);
});
exports.default = router;
//# sourceMappingURL=tutorial.routes.js.map