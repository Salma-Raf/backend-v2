const { db } = require("../db.js");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports.getproduits = (req, res, next) => {
  const q = "SELECT * FROM produit ";

  db.query(q, [], (err, data) => {
    if (err) return next(err);
    return res.status(200).json(data);
  });
};
module.exports.adproduit = (req, res, next) => {
  const { nom, prix, categorie, supp, id_restau } = req.body;

  const q =
    "INSERT INTO `produit`(`id_prod`, `nom`, `prix`, `categorie`, `supp`, `id_restau`) VALUES(?)";
  const values = [nom, prix, categorie, supp, id_restau];

  db.query(q, [values], (err, data) => {
    if (err) return next(err);
    return res.status(200).json("product has been created.");
  });
};
module.exports.chercheproduit = (req, res, next) => {
  const partOfPrenom = req.query.nom;
  const rechercheSQL = "SELECT * FROM produit WHERE `nom`  LIKE  ?";

  const rechercheValue = "%" + partOfPrenom + "%";

  // Exécutez la requête avec le prénom en tant que paramètre
  db.query(rechercheSQL, [rechercheValue], (err, resultats) => {
    if (err) {
      next(err);
    }
    return res.status(200).json(resultats);
  });
};
module.exports.deletproduit = (req, res, next) => {
  const postId = req.params.id;
  const q = "UPDATE `produit` SET `supp`=1 WHERE `id_prod` = ?";
  db.query(q, [postId], (err, data) => {
    if (err) return next(err); //403
    return res.status(200).json("produit has been deleted!");
  });
};

module.exports.updatePproduit = (req, res, next) => {
  const { nom, prix, categorie, supp, id_restau } = req.body;

  const postId = +req.params.id;

  const q =
    "UPDATE `produit` SET `nom`=? ,`prix`=? ,`categorie`=? ,`supp`=? ,`id_restau`=? WHERE `id_prod`=?";
  const values = [nom, prix, categorie, supp, id_restau, postId];

  db.query(q, [...values], (err, data) => {
    if (err) return next(err); //500
    return res.json("product has been updated.");
  });
};
