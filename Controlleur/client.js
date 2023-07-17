const { db } = require("../db.js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

module.exports.getclients = (req, res) => {
  const q = "SELECT * FROM client ";

  db.query(q, [], (err, data, next) => {
    if (err) return next(err);
    return res.status(200).json(data);
  });
};

module.exports.addclient = (req, res, next) => {
  const { id_client, nom_client, numero_client, ville, mdp } = req.body;
  console.log(numero_admin);
  const q = "SELECT * FROM client WHERE `numero-client` = ?";

  db.query(q, [email_admin], (err, data) => {
    if (err) return next(err); //500
    if (data.length) return next(err); //409

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(mdp, salt);
    const q =
      "INSERT INTO `client`(`id-client`, `nom-client`, `numero-client`, `ville`,'mdp')VALUES (?)";
    const values = [id_client, nom_client, numero_client, ville, mdp];

    db.query(q, [values], (err, data) => {
      if (err) return next(err);
      return res.status(200).json("User has been created.");
    });
  });
  // });
};
