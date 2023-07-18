const express = require("express");

const {
 getrestau, deletrestau ,adrestau,updaterestau,chercherestau,disactiverestau
} = require("../Controlleur/restau.js");

const router = express.Router();



router.get("/", getrestau);
router.get("/chercher", chercherestau);
router.post("/disactiver/:id", disactiverestau);
router.post("/", adrestau);
router.delete("/:id", deletrestau);
router.put("/:id", updaterestau);

module.exports = router;