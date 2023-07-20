const { db } = require("../db.js");
// const jwt = require("jsonwebtoken");

module.exports.getvilles = (req, res,next) => {
    const q = "SELECT * FROM ville where supp !=1";
db.query(q, [], (err, data) => {
  if (err) return next(err);
  return res.status(200).json(data);
});
};
module.exports.addville = (req, res,next) => {
  const  {nom_ville}=req.body;
  console.log(nom_ville)
const q = "SELECT * FROM ville WHERE `nom_ville` = ?";

    db.query(q, [nom_ville], (err, data) => {
      if (err) return next(err)//500
      if (data.length) return next(err);//409

        const q =
          "INSERT INTO `ville`(nom_ville,supp) VALUES (?)";
        const values = [
          nom_ville,
          0
        ];
  
        db.query(q, [values], (err, data) => {
          if (err) return  next(err);
          const q2="SELECT * FROM ville WHERE id_ville = (SELECT MAX(id_ville) FROM ville);"
          db.query(q2, [], (err, data) => {
            if (err) next(err);
            return res.status(200).json(data[0]);
          });
        });
    });
};
module.exports. deletville = (req, res,next) => {
  const ville_id = req.params.id;
  const q = "delete  FROM ville WHERE `id_ville` = ?";
  db.query(q, [ville_id], (err, data) => {
    if (err) return next(err) //403
    return res.status(200).json("ville has been deleted!");
  });
};

module.exports.chercherville=(req,res,next)=>{

  const partOfPrenom=req.query.nom_ville
  console.log(partOfPrenom)
  const rechercheSQL = "SELECT * FROM ville WHERE `nom_ville`	  LIKE  ?";

  const rechercheValue = "%" + partOfPrenom + "%";

  // Exécutez la requête avec le prénom en tant que paramètre
  db.query(rechercheSQL, [rechercheValue], (err, resultats) => {
    if (err) {

  next(err);
    }
    return res.status(200).json(resultats);
  })
}