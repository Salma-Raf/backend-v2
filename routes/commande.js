const express = require("express");

const {
 getcommandes ,adcommande,disactivercommande,getcalcule,credit,getcommandes_par_restau
} = require("../Controlleur/commande.js");

const router = express.Router();


router.get("/", getcommandes);
router.get("/parresteau", getcommandes_par_restau);

router.put("/", disactivercommande);
router.post("/", adcommande);
router.get("/calculer", getcalcule);
router.get("/credit/:id", credit);


module.exports = router;