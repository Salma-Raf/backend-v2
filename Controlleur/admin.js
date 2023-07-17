const { db } = require("../db.js");
const bcrypt = require("bcryptjs");


module.exports.getAdmins = (req, res,next) => {
const q = "SELECT * FROM admin ";

db.query(q, [], (err, data) => {
  if (err) return next(err);
  return res.status(200).json(data);
});
};
module.exports. addAdmin = (req, res,next) => {
  const  {nom_admin,prenom_admin,email_admin,numero_admin,url_img,role_admin,dispo_admin,mdp}=req.body
    const q = "SELECT * FROM admin WHERE `email-admin` = ?";

    db.query(q, [email_admin], (err, data) => {
      if (err) return next(err)//500
      if (data.length) return next(err);//409
  
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(mdp, salt);
        const q =
          "INSERT INTO `admin`(`nom-admin`,`prenom-admin`,`email_admin`,`numero_admin`,`url_img`,`role_admin`,`dispo_admin`,`mdp`) VALUES (?)";
        const values = [
            nom_admin ,
            prenom_admin,
            email_admin,
            numero_admin,
            url_img,
            role_admin,
            dispo_admin,
          hash,
        ];
  
        db.query(q, [values], (err, data) => {
          if (err) return  next(err);
          return res.status(200).json("User has been created.");
        });
    });
    // });

};
module.exports. deleteAdmin = (req, res,next) => {

      
      const postId = req.params.id;
      const q = "delete  FROM admin WHERE `id_admin` = ?";
      db.query(q, [postId], (err, data) => {
        if (err) return next(err) //403
        return res.status(200).json("admin has been deleted!");
      });
};
module.exports. updateProduit = (req, res) => {
    
    const  {nom_admin,prenom_admin,email_admin,numero_admin,url_img,role_admin,dispo_admin,mdp}=req.body  
  
    
        const q="UPDATE admin SET  `nom_admin`=? and `prenom-admin`=?  and  where n_panie=?";
      const val = cmd.vendu ? cmd.vendu : cmd.annuler;
      const values = [val, cmd.n_panie];
      db.query(q, [...values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("commentde  has been updated.");
      });
};

module.exports.chercherAdmin=(req,res)=>{
}