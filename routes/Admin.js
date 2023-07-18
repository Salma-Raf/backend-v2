const express = require("express");

const {
 getAdmins, deleteAdmin ,addAdmin,updateadmin,chercherAdmin,disactiverAdmin
} = require("../Controlleur/admin.js");

const router = express.Router();


router.get("/", getAdmins);
router.get("/chercher", chercherAdmin);
router.post("/", addAdmin);
router.post("/disactiver", disactiverAdmin);

router.delete("/:id", deleteAdmin);
router.put("/:id", updateadmin);

module.exports = router;