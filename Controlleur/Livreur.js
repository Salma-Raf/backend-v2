const { db } = require("../db.js");
const jwt = require("jsonwebtoken");

module.exports.getlivreur = (req, res) => {
  const q = "SELECT * FROM livreur ";

  db.query(q, [], (err, data) => {
    if (err) return next(err);
    return res.status(200).json(data);
  });
};

module.exports.adlivreur = (req, res, next) => {
  const {
    id_livreur,
    nom,
    prenom,
    id_ville,
    email,
    url_img,
    numéro,
    quota_fixe,
    quota_km,
    disponible,
    mdp,
  } = req.body;
  const q = "SELECT * FROM livreur WHERE `email` = ?";

  db.query(q, [email], (err, data, next) => {
    if (err) return next(err); //500
    if (data.length) return next(err); //409

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(mdp, salt);
    const q =
      "INSERT INTO `livreur`(`id-livreur`, `nom`, `prenom`, `id-ville`, `email`, `url-img`, `numéro`, `quota-fixe`, `quota-km`, `disponible`,mdp) VALUES(?)";
    const values = [
      id_livreur,
      nom,
      prenom,
      id_ville,
      email,
      url_img,
      numéro,
      quota_fixe,
      quota_km,
      disponible,
      hash,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return next(err);
      return res.status(200).json("User has been created.");
    });
  });
  // });
};
module.exports.deletlivreur = (req, res, next) => {
  const postId = req.params.id;
  const q = "delete  FROM livreur WHERE `id-livreur` = ?";
  db.query(q, [postId], (err, data) => {
    if (err) return next(err); //403
    return res.status(200).json("livreur has been deleted!");
  });
};
module.exports.updatePlivreur = (req, res, next) => {
  const {
    id_livreur,
    nom,
    prenom,
    id_ville,
    email,
    url_img,
    numéro,
    quota_fixe,
    quota_km,
    disponible,
    mdp,
  } = req.body;
  const postId = req.params.id;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(mdp, salt);
  const q =
    "UPDATE `client` SET `id-client`=? and`nom-client`=? and,`numero-client`=? and,`ville`=? and where `id-livreur`=?";
  const values =
    [
      id_livreur,
      nom,
      prenom,
      id_ville,
      email,
      url_img,
      numéro,
      quota_fixe,
      quota_km,
      disponible,
      hash,
      postId,
    ] /
    db.query(q, [...values], (err, data) => {
      if (err) return next(err); //500
      return res.json("livreur  has been updated.");
    });
};

module.exports.cherchelivreur = (req, res, next) => {
  const partOfPrenom = req.query.prenom;
  const rechercheSQL = "SELECT * FROM livreur WHERE prenom  LIKE  ?";

  const rechercheValue = "%" + partOfPrenom + "%";

  // Exécutez la requête avec le prénom en tant que paramètre
  connection.query(rechercheSQL, [prenom], (err, resultats) => {
    if (err) {
      next(err);
    }
    return res.status(200).json(resultats);
  });
};

module.exports.disactivelivreur = (req, res) => {};
