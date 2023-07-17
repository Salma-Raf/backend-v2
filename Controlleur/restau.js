const { db } = require("../db.js");
// const jwt = require("jsonwebtoken");

module.exports.getrestau = (req, res) => {
    
    const q = "SELECT * FROM restaurant";

db.query(q, [], (err, data) => {
  if (err) return next(err);
  return res.status(200).json(data);
});

};
module.exports. deletrestau = (req, res) => {
    const id_restau = req.params.id;
    const q = "delete  FROM restaurant  WHERE `id-restau` = ?";
    db.query(q, [id_restau], (err, data) => {
      if (err) return next(err) //403
      return res.status(200).json("restaurant has been deleted!");
    });
};
module.exports.adrestau = (req, res) => {
    const  {nom_restau,ville_restau,tarif,contact,disponibilite,email,logo,mdp}=req.body
    console.log(numero_admin)
      const q = "SELECT * FROM restaurant WHERE `nom_restau` = ? or  email=?  ";
  
      db.query(q, [nom_restau,email], (err, data) => {
        if (err) return next(err)//500
        if (data.length) return next(err);//409
    
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(mdp, salt);
          const q =
            "INSERT INTO `restaurant`(`nom-restau`,`ville-restau`,`tarif`,`contact`,`disponibilite`,`email`,`logo`,`mdp`) VALUES (?)";
          const values = [
            nom_restau,ville_restau,tarif,contact,disponibilite,email,logo,hash
          ];
          db.query(q, [values], (err, data) => {
            if (err) return  next(err);
            return res.status(200).json("restau has been created.");
          });
      });
};
module.exports. updaterestau = (req, res) => {

    const  {nom_restau,ville_restau,tarif,contact,disponibilite,email,logo,mdp}=req.body
    const id_restau = req.params.id;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(mdp, salt);
        const q="UPDATE restaurant SET  `nom-restau`=? and `ville-restau`=? and  `tarif`=? and  `contact`=? and  `disponibilite`=? and `email`=? and  `logo`=? and mdp=?  where `id-restau`=?";
    //   console.log(email_admin)
    const values = [
        nom_restau,ville_restau,tarif,contact,disponibilite,email,logo,hash];
      db.query(q, [...values], (err, data) => {
        if (err) return next(err) //500
        return res.json("restau  has been updated.");
      });
};

module.exports.chercherestau=(req,res)=>{
    const nom_restau=req.query.nom_restau
    const rechercheSQL = "SELECT * FROM restaurant WHERE nom-restau  LIKE  ?";

    const rechercheValue = "%" + nom_restau + "%";

    // Exécutez la requête avec le prénom en tant que paramètre
    connection.query(rechercheSQL, [rechercheValue], (err, resultats) => {
      if (err) {
    next(err);
      }
      return res.status(200).json(resultats);
    })
}

module.exports.disactiverestau=(req,res)=>{
    const nom_restau=req.query.nom_restau
    const rechercheSQL = "SELECT * FROM restaurant WHERE nom-restau  LIKE  ?";

    const rechercheValue = "%" + nom_restau + "%";

    // Exécutez la requête avec le prénom en tant que paramètre
    connection.query(rechercheSQL, [rechercheValue], (err, resultats) => {
      if (err) {
    next(err);
      }
      return res.status(200).json(resultats);
    })

}