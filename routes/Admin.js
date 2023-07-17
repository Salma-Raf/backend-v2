const express = require("express");

const {
 getAdmins, deleteAdmin ,addAdmin,updateProduit,chercherAdmin
} = require("../Controller/admin.js");

const router = express.Router();


router.get("/", getAdmins);
router.get("/chercher", chercherAdmin);
router.get("/disactiver", disactiverestau);
router.post("/", addAdmin);
router.delete("/:id", deleteAdmin);
router.put("/:id", updateProduit);

module.exports = router;