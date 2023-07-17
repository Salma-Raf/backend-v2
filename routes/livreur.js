const express = require("express");

const {
 getlivreur, deletlivreur ,adlivreur,updatePlivreur,cherchelivreur,disactivelivreur
} = require("../Controlleur/Livreur.js");

const router = express.Router();


router.get("/", getlivreur);
router.get("/chercher", cherchelivreur);
router.get("/disactiver", disactivelivreur);
router.post("/", adlivreur);
router.delete("/:id", deletlivreur);
router.put("/:id", updatePlivreur);

module.exports = router;