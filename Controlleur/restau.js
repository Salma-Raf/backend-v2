const { db } = require("../db.js");
const bcrypt = require("bcryptjs");

module.exports.getrestau = (req, res,next) => {
    
    const q = "SELECT * FROM restaurant where supp!=1";

db.query(q, [], (err, data) => {
  if (err) return next(err);
  return res.status(200).json(data);
});

};
module.exports. deletrestau = (req, res,next) => {
    const id_restau = req.params.id;
    const q = "update   restaurant set supp=1 WHERE `id_restau` = ?";
    db.query(q, [id_restau], (err, data) => {
      if (err) return next(err) //403
      return res.status(200).json("restaurant has been deleted!");
    });
};
module.exports.adrestau = (req, res,next) => {
    const  {nom_restau,ville_restau,tarif,contact,disponibilite,email,logo,mdp}=req.body
    console.log({nom_restau,ville_restau,tarif,contact,disponibilite,email,logo,mdp})
      const q = "SELECT * FROM restaurant WHERE `nom_restau` = ? or  email=?  ";
  
      db.query(q, [nom_restau,email], (err, data) => {
        if (err) return next(err)//500
        if (data.length) return next(err);//409
    
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(mdp, salt);
          const q =
            "INSERT INTO `restaurant`(`nom_restau`,`ville_restau`,`tarif`,`contact`,`disponibilite`,`email`,`logo`,`mdp`,`supp`) VALUES (?)";
          const values = [
            nom_restau,ville_restau,tarif,contact,disponibilite,email,logo,hash,0
          ];
          db.query(q, [values], (err, data) => {
            if (err) return  next(err);
            const q2="SELECT * FROM restaurant WHERE id_restau = (SELECT MAX(id_restau) FROM restaurant);"
            db.query(q2, [], (err, data) => {
              if (err) next(err);
              return res.status(200).json(data[0]);
            });
          });
      });
};
module.exports. updaterestau = (req, res,next) => {

    const  {nom_restau,ville_restau,tarif,contact,disponibilite,email,logo,mdp}=req.body
    const id_restau = req.params.id;
console.log(req.body,id_restau)
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(mdp, salt);
        const q="UPDATE restaurant SET  `nom_restau`=? , `ville_restau`=? ,  `tarif`=? ,  `contact`=? ,  `disponibilite`=? , `email`=? ,  `logo`=? , mdp=?  where `id_restau`=?";
    //   console.log(email_admin)
    const values = [
        nom_restau,ville_restau,tarif,contact,disponibilite,email,logo,hash,id_restau];
      db.query(q, [...values], (err, data) => {
        if (err) return next(err) //500
        const q2="SELECT * FROM restaurant WHERE id_restau =? "
        db.query(q2, [id_restau], (err, data) => {
          if (err) next(err);
          return res.status(200).json(data[0]);
        });
      });
};

module.exports.chercherestau=(req,res,next)=>{
    const nom_restau=req.query.nom_restau
    const rechercheSQL = "SELECT * FROM restaurant WHERE supp!=1 and `nom_restau`  LIKE  ?";

    const rechercheValue = "%" + nom_restau + "%";

    db.query(rechercheSQL, [rechercheValue], (err, resultats) => {
      if (err) {
    next(err);
      }
      return res.status(200).json(resultats);
    })
}

module.exports.disactiverestau=(req,res,next)=>{

    const disactive= req.body.disactive;
    const postIde = +req.params.id;
        const q="UPDATE restaurant SET  `disponibilite`=? where `id_restau`=?";
      const values = [disactive,postIde]
      db.query(q, [...values], (err, data) => {
        if (err) return next(err) //500
        return res.json("restaurant  has been updated.");
      });
}