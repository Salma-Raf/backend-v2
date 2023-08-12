const express = require("express");

const {
  getproduit,
  deleteproduit,
  addproduit,
  updateProduit,
  chercheproduit,
  disactiverProduit,
} = require("../Controlleur/Produit_restau2");

const router = express.Router();

router.get("/", getproduit);
router.get("/cherche", chercheproduit);
router.post("/", addproduit);
router.post("/disactiver/:id", disactiverProduit);

router.delete("/:id", deleteproduit);
router.put("/:id", updateProduit);

module.exports = router;
