const express = require("express");

const {
 getcommandes ,adcommande,disactivercommande
} = require("../Controlleur/commande.js");

const router = express.Router();


router.get("/", getcommandes);
router.put("/", disactivercommande);
router.post("/", adcommande);

module.exports = router;