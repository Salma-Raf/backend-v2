const { db } = require("../db.js");
const bcrypt = require("bcryptjs");

module.exports.getlivreur = (req, res, next) => {
  const q =
    "SELECT  id_livreur,mdp,nom_livreur,prenom,email,url_img,numero,quota_fixe,quota_km,disponible,livreur.supp as supp_liv,livreur.id_ville as id_ville, nom_ville  FROM livreur,ville where livreur.id_ville=ville.id_ville and livreur.supp!=1 ";
  db.query(q, [], (err, data) => {
    if (err) return next(err);
    return res.status(200).json(data);
  });
};

module.exports.adlivreur = (req, res, next) => {
  setTimeout(() => {
    const {
      nom_livreur,
      prenom,
      id_ville,
      email,
      url_img,
      numero,
      quota_fixe,
      quota_km,
      disponible,
      mdp,
      supp,
    } = req.body;
    const q = "SELECT * FROM livreur WHERE `email` = ?";
console.log(req.body)
    db.query(q, [email], (err, data) => {
      if (err) return next(err); //500
      if (data.length) return next(err); //409

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(mdp, salt);
      const q =
        "INSERT INTO `livreur`(`nom_livreur`, `prenom`, `id_ville`, `email`, `url_img`, `numero`, `quota_fixe`, `quota_km`, `disponible`,mdp,`supp`) VALUES(?)";
      const values = [
        nom_livreur,
        prenom,
        id_ville,
        email,
        url_img,
        numero,
        quota_fixe,
        quota_km,
        disponible,
        hash,
        0,
      ];

      db.query(q, [values], (err, data) => {
        if (err) return next(err);
        const q2 =
          "SELECT  id_livreur,nom_livreur,prenom,email,url_img,numero,quota_fixe,quota_km,disponible,livreur.supp as supp_liv,livreur.id_ville as id_ville, nom_ville  FROM livreur,ville where livreur.id_ville=ville.id_ville and id_livreur= (SELECT MAX(id_livreur) FROM livreur)";
        db.query(q2, [], (err, data) => {
          if (err) next(err);
          return res.status(200).json(data[0]);
        });
      });
    });
  }, 2000);
};
module.exports.deletlivreur = (req, res, next) => {
  const postId = req.params.id;
  const q = "UPDATE `livreur` SET `supp`=1  WHERE `id_livreur` = ?";
  db.query(q, [postId], (err, data) => {
    if (err) return next(err); //403
    return res.status(200).json("has been deleted");
  });
};
module.exports.updatePlivreur = (req, res, next) => {
  const {
    nom_livreur,
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
  const postId = req.params.id;
  console.log(    mdp   ,"apre")

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(mdp, salt);
  console.log(req.params.id,"avan")

  const q =
    "UPDATE `livreur` SET `nom_livreur`=? , `prenom`=? , `id_ville`=? ,`email`=? , `url_img`=? , `numero`=? ,  `quota_fixe`=? , `quota_km`=? , `disponible`=? , mdp=? where `id_livreur`=?";

  const values = [
    nom_livreur,
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
    const q2 =
      "SELECT  id_livreur,nom_livreur,prenom,email,url_img,numero,quota_fixe,quota_km,disponible,livreur.supp as supp_liv,livreur.id_ville as id_ville, nom_ville  FROM livreur,ville where livreur.id_ville=ville.id_ville and livreur.supp!=1 and id_livreur=? ";
    db.query(q2, [postId], (err, data) => {
      if (err) next(err);
      return res.status(200).json(data[0]);
    });
  });
};

module.exports.cherchelivreur = (req, res, next) => {
  const partOfPrenom = req.query.nom_livreur;
  const rechercheSQL =
    "SELECT  id_livreur,nom_livreur,prenom,email,url_img,numero,quota_fixe,quota_km,disponible,livreur.supp as supp_liv,livreur.id_ville as id_ville, nom_ville  FROM livreur,ville where livreur.id_ville=ville.id_ville and livreur.supp!=1 and `nom_livreur` LIKE ?";

  const rechercheValue = "%" + partOfPrenom + "%";

  // Exécutez la requête avec le prénom en tant que paramètre
  db.query(rechercheSQL, [rechercheValue], (err, resultats) => {
    if (err) {
      next(err);
    }
    return res.status(200).json(resultats);
  });
};

module.exports.disactivelivreur = (req, res, next) => {
  const disactive = req.body.disactive;
  const postId = req.params.id;
  const q = "UPDATE livreur SET  `disponible`=? where `id_livreur`=?";
  const values = [disactive, postId];
  console.log(values);
  db.query(q, [...values], (err, data) => {
    if (err) return next(err); //500
    return res.json("livreur  has been desactivated.");
  });
};
