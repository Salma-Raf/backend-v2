const { db } = require("../db.js");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports.getproduit = (req, res, next) => {
  const id_restau = 1;
  const q =
    "SELECT dispo,id_prod,nom,prix,categorie,produit.supp as supp_prod,produit.id_restau as id_restau,url_image,nom_restau FROM produit,restaurant  where produit.id_restau=restaurant.id_restau and produit.supp!=1 and restaurant.id_restau=?";

  db.query(q, [id_restau], (err, data) => {
    if (err) return next(err);
    return res.status(200).json(data);
  });
};
module.exports.addproduit = (req, res, next) => {
  const { nom, prix, categorie, supp, dispo, url_image } = req.body;
 console.log(req.body)
 const id_restau = 1;

  const q =
    "INSERT INTO `produit`(`nom`, `prix`, `categorie`, `supp`, `id_restau`,`dispo`,`url_image`) VALUES(?)";
  const values = [nom, +prix, categorie, supp, +id_restau, dispo, url_image];
  console.log(values);
  db.query(q, [values], (err, data) => {
    if (err) return next(err);
    const q2 =
      "SELECT  dispo,id_prod,nom,prix,categorie,produit.supp as supp_prod,produit.id_restau as id_restau,url_image,nom_restau FROM produit,restaurant  where produit.id_restau=restaurant.id_restau   and  restaurant.id_restau=? and id_prod =(SELECT MAX(id_prod) FROM produit)";
    db.query(q2, [id_restau], (err, data) => {
      if (err) next(err);
      return res.status(200).json(data[0]);
    });
  });
};
module.exports.chercheproduit = (req, res, next) => {
  const partOfPrenom = req.query.nom;
  const id_restau = 1;
  const rechercheSQL =
    "SELECT dispo,id_prod,nom,prix,categorie,produit.supp as supp_prod,produit.id_restau as id_restau,url_image,nom_restau FROM produit,restaurant  where produit.id_restau=restaurant.id_restau and produit.supp!=1 and  restaurant.id_restau=? and `nom`  LIKE  ?";

  const rechercheValue = "%" + partOfPrenom + "%";

  // Exécutez la requête avec le prénom en tant que paramètre
  db.query(rechercheSQL, [id_restau,rechercheValue], (err, resultats) => {
    if (err) {
      next(err);
    }
    return res.status(200).json(resultats);
  });
};
module.exports.deleteproduit = (req, res, next) => {
  const id_restau = 1;
  const postId = req.params.id;
  const q =
    "UPDATE `produit` SET `supp` = 1 WHERE  `id_restau` IN (SELECT `id_restau` FROM `restaurant` WHERE  `id_prod`=? and`id_restau` = ?  )";
  db.query(q, [postId, id_restau], (err, data) => {
    if (err) return next(err); //403
    return res.status(200).json("produit has been deleted!");
  });
};

module.exports.updateProduit = (req, res, next) => {
  const id_restau = 1;
  const { nom, prix, categorie, supp, url_image } = req.body;
  console.log(req.body);
  const postId = +req.params.id;
  const q =
    " UPDATE `produit` SET `produit`.`nom` = ?,`produit`.`prix` = ?,`produit`.`categorie` = ?,`produit`.`supp` = ?,`produit`.`url_image` = ?  WHERE  `produit`.`id_restau` =? and `produit`.`id_prod`=?;";

  const values = [nom, prix, categorie, supp, url_image, id_restau, postId];
  console.log(values);

  db.query(q, [...values], (err, data) => {
    if (err) return next(err); //500

    const q2="SELECT dispo,id_prod,nom,prix,categorie,produit.supp as supp_prod,produit.id_restau as id_restau,url_image,nom_restau FROM produit,restaurant  where produit.id_restau=restaurant.id_restau and produit.supp!=1 and id_prod =? "
    db.query(q2, [postId], (err, data) => {
      if (err) next(err);
      return res.status(200).json(data[0]);

  });
})
};

module.exports.disactiverProduit = (req, res, next) => {
  setTimeout(()=>{
    const disactive = req.body.disactive;
    const id_restau = 1;
    const postId = req.params.id;
  
    const q =
      "UPDATE produit SET  `dispo`=? where `id_prod`=? and `produit`.`id_restau`=?";
    // "UPDATE `produit`  SET `dispo` = ? WHERE `id_prod`=? and `id_restau` = ? ";
    const values = [disactive, postId, id_restau];
    console.log(values);
    db.query(q, [...values], (err, data) => {
      if (err) return next(err); //500
      return res.json("admin  has been updated.");
    });

  },2000)

};
