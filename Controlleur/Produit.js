const { db } = require("../db.js");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports.getproduits = (req, res, next) => {
  const q = "SELECT dispo,id_prod,nom,prix,categorie,produit.supp as supp_prod,produit.id_restau as id_restau,url_image,nom_restau FROM produit,restaurant  where produit.id_restau=restaurant.id_restau and produit.supp!=1";

  db.query(q, [], (err, data) => {
    if (err) return next(err);
    return res.status(200).json(data);
  });
};
module.exports.adproduit = (req, res, next) => {
  const { nom, prix, categorie, supp, id_restau ,dispo,url_image} = req.body;
  const q =
    "INSERT INTO `produit`(`nom`, `prix`, `categorie`, `supp`, `id_restau`,`dispo`,`url_image`) VALUES(?)";
  const values = [nom, +prix, categorie, supp,+id_restau,dispo,url_image];
console.log(values)
  db.query(q, [values], (err, data) => {
    if (err) return next(err);
    const q2="SELECT  dispo,id_prod,nom,prix,categorie,produit.supp as supp_prod,produit.id_restau as id_restau,url_image,nom_restau FROM produit,restaurant  where produit.id_restau=restaurant.id_restau  and id_prod = (SELECT MAX(id_prod) FROM produit);"
    db.query(q2, [], (err, data) => {
      if (err) next(err);
      return res.status(200).json(data[0]);
    });  });
};
module.exports.chercheproduit = (req, res, next) => {
  const partOfPrenom = req.query.nom;
  const rechercheSQL = "SELECT dispo,id_prod,nom,prix,categorie,produit.supp as supp_prod,produit.id_restau as id_restau,url_image,nom_restau FROM produit,restaurant  where produit.id_restau=restaurant.id_restau and produit.supp!=1 and `nom`  LIKE  ?";

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

  console.log({ nom, prix, categorie, supp, id_restau },"asd")
  const postId = +req.params.id;

  const q =
    "UPDATE `produit` SET `nom`=? ,`prix`=? ,`categorie`=? ,`supp`=? ,`id_restau`=? WHERE `id_prod`=?";
  const values = [nom, prix, categorie, supp, id_restau, postId];

  db.query(q, [...values], (err, data) => {
    if (err) return next(err); //500

    const q2="SELECT dispo,id_prod,nom,prix,categorie,produit.supp as supp_prod,produit.id_restau as id_restau,url_image,nom_restau FROM produit,restaurant  where produit.id_restau=restaurant.id_restau and produit.supp!=1 and id_prod =? "
    db.query(q2, [postId], (err, data) => {
      if (err) next(err);
      return res.status(200).json(data[0]);
    });
  });
}


  module.exports.disactiverAdmin=(req,res,next)=>{

      const disactive= req.body.disactive;
      const postId = req.params.id;
    
          const q="UPDATE produit SET  `dispo`=? where `id_prod`=?";
        const values = [disactive,postId]
        db.query(q, [...values], (err, data) => {
          if (err) return next(err) //500
          return res.json("admin  has been updated.");
        });
     
   
  }


  module.exports.chercheprt = (req, res, next) => {
    
    const partOfPrenom =+ req.query.id;
    if(partOfPrenom){
      const rechercheSQL = "SELECT dispo,id_prod,nom,prix,categorie,produit.supp as supp_prod,produit.id_restau as id_restau,url_image,nom_restau FROM produit,restaurant  where produit.id_restau=restaurant.id_restau and produit.supp!=1 and produit.id_restau=?";
  
      const rechercheValue =   partOfPrenom ;
    
      // Exécutez la requête avec le prénom en tant que paramètre
      db.query(rechercheSQL, [rechercheValue], (err, resultats) => {
        if (err) {
          next(err);
        }
        return res.status(200).json(resultats);
      });
    }
    else{

      const q = "SELECT dispo,id_prod,nom,prix,categorie,produit.supp as supp_prod,produit.id_restau as id_restau,url_image,nom_restau FROM produit,restaurant  where produit.id_restau=restaurant.id_restau and produit.supp!=1";

      db.query(q, [], (err, data) => {
        if (err) return next(err);
        return res.status(200).json(data);
      });
    }
   
  };

  