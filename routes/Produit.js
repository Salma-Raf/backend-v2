const express = require("express");

const {
  getproduits,
  deletproduit,
  adproduit,
  updatePproduit,
  chercheproduit,disactiverAdmin,chercheprt
} = require("../Controlleur/Produit.js");

const router = express.Router();

router.get("/", getproduits);
router.get("/chercher", chercheproduit);
router.get("/parentre", chercheprt);

router.post("/", adproduit);
router.post("/disactiver/:id", disactiverAdmin);

router.delete("/:id", deletproduit);
router.put("/:id", updatePproduit);

module.exports = router;
