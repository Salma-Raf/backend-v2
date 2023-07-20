const express = require("express");

const {
 getvilles, deletville,addville,chercherville
} = require("../Controlleur/ville.js");

const router = express.Router();

router.get("/", getvilles);
router.post("/", addville);
router.get("/chercher", chercherville);

router.delete("/:id", deletville);


module.exports = router;