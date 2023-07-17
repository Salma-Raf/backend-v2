const express = require("express");

const {
 getclients 
} = require("../Controlleur/Livreur.js");

const router = express.Router();


router.get("/", getclients);


module.exports = router;