const { db } = require("../db.js");
const bcrypt = require("bcryptjs");

module.exports.getlivreur = (req, res, next) => {
  const q = "SELECT * FROM livreur ";

  db.query(q, [], (err, data) => {
    if (err) return next(err);
    return res.status(200).json(data);
  });
};

module.exports.adlivreur = (req, res, next) => {
  const {
    nom,
    prenom,
    id_ville,
    email,
    url_img,
    numero,
    quota_fixe,
    quota_km,
    disponible,
    mdp,
  } = req.body;
  const q = "SELECT * FROM livreur WHERE `email` = ?";

  db.query(q, [email], (err, data) => {
    if (err) return next(err); //500
    if (data.length) return next(err); //409

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(mdp, salt);
    const q =
      "INSERT INTO `livreur`(`nom`, `prenom`, `id-ville`, `email`, `url-img`, `numero`, `quota-fixe`, `quota-km`, `disponible`,mdp) VALUES(?)";
    const values = [
      nom,
      prenom,
      id_ville,
      email,
      url_img,
      numero,
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
  
};
module.exports.deletlivreur = (req, res, next) => {
  const postId = req.params.id;
  const q = "delete  FROM livreur WHERE `id-livreur` = ?";
  db.query(q, [postId], (err, data) => {
    if (err) return next(err); //403
    return res.status(200).json(data);
  });
};
module.exports.updatePlivreur = (req, res, next) => {
  const {
    nom,
    prenom,
    id_ville,
    email,
    url_img,
    numero,
    quota_fixe,
    quota_km,
    disponible,
    mdp,
  } = req.body;
  const postId = +req.params.id;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(mdp, salt);
  const q =
    "UPDATE `livreur` SET `nom`=? , `prenom`=? , `id-ville`=? ,`email`=? , `url-img`=? , `numero`=? ,  `quota-fixe`=? , `quota-km`=? , `disponible`=? , mdp=? where `id-livreur`=?";

  const values = [
    nom,
    prenom,
    id_ville,
    email,
    url_img,
    numero,
    quota_fixe,
    quota_km,
    disponible,
    hash,
    postId,
  ];
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

module.exports.disactivelivreur = (req, res) => {
  const disactive = req.body.disactive;
  const postId = req.params.id;

  const q = "UPDATE livreur SET  `disponible`=? where `id-livreur`=?";
  const values = [disactive, postId];
  db.query(q, [...values], (err, data) => {
    if (err) return next(err); //500
    return res.json("livreur  has been desactivated.");
  });
};