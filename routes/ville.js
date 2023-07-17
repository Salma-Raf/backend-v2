const express = require("express");

const {
 getvilles, deletville,addville
} = require("../Controlleur/ville.js");

const router = express.Router();

router.get("/", getvilles);
router.post("/", addville);
router.delete("/:id", deletville);


module.exports = router;