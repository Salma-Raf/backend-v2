const express = require("express");

const {
 getcommandes ,adcommande,cherchecommande,disactivelivreur
} = require("../Controlleur/Livreur.js");

const router = express.Router();


router.get("/", getcommandes);
router.get("/chercher", cherchecommande);
router.get("/annuler", disactivelivreur);
router.post("/", adcommande);

module.exports = router;