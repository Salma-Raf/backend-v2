const express = require("express");

const {
 getrestau, deletrestau ,adrestau,updaterestau,chercherestau,disactiverestau
} = require("../controllers/admin.js");

const router = express.Router();



router.get("/", getrestau);
router.get("/chercher", chercherestau);
router.get("/disactiver", disactiverestau);
router.post("/", adrestau);
router.delete("/:id", deletrestau);
router.put("/:id", updaterestau);

module.exports = router;