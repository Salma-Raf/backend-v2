const express = require("express");

const {
 getclients ,addclient
} = require("../Controlleur/Livreur.js");

const router = express.Router();


router.get("/", getclients);
router.post("/",addclient)


module.exports = router;