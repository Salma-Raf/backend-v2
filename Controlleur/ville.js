const { db } = require("../db.js");
// const jwt = require("jsonwebtoken");

module.exports.getvilles = (req, res,next) => {
    const q = "SELECT * FROM ville";
db.query(q, [], (err, data) => {
  if (err) return next(err);
  return res.status(200).json(data);
});
};
module.exports. addville = (req, res,next) => {
  const  {nom_ville}=req.body;
const q = "SELECT * FROM ville WHERE `nom-ville` = ?";

    db.query(q, [nom_ville], (err, data) => {
      if (err) return next(err)//500
      if (data.length) return next(err);//409

        const q =
          "INSERT INTO `ville`(`nom-ville`) VALUES (?)";
        const values = [
          nom_ville
        ];
  
        db.query(q, [values], (err, data) => {
          if (err) return  next(err);
          return res.status(200).json("ville has been created.");
        });
    });
};
module.exports. deletville = (req, res,next) => {
  const ville_id = req.params.id;
  const q = "delete  FROM ville WHERE `id-ville` = ?";
  db.query(q, [ville_id], (err, data) => {
    if (err) return next(err) //403
    return res.status(200).json("ville has been deleted!");
  });
};
