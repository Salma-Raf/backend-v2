const express = require("express");

const {
 getAdmins, deleteAdmin ,addAdmin,updateProduit,chercherAdmin
} = require("../Controlleur/admin.js");

const router = express.Router();


router.get("/", getAdmins);
router.get("/chercher", chercherAdmin);
router.post("/", addAdmin);
router.delete("/:id", deleteAdmin);
router.put("/:id", updateProduit);

module.exports = router;