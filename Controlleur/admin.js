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
  console.log(numero_admin)
    const q = "SELECT * FROM admin WHERE `email-admin` = ?";

    db.query(q, [email_admin], (err, data) => {
      if (err) return next(err)//500
      if (data.length) return next(err);//409
  
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(mdp, salt);
        const q =
          "INSERT INTO `admin`(`nom-admin`,`prenom-admin`,`email-admin`,`numero-admin`,`url-img`,`role-admin`,`dispo-admin`,`mdp`) VALUES (?)";
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
      const q = "delete  FROM admin WHERE `id-admin` = ?";
      db.query(q, [postId], (err, data) => {
        if (err) return next(err) //403
        return res.status(200).json("admin has been deleted!");
      });
};
module.exports.updateadmin = (req, res,next) => {
    
    const  {nom_admin,prenom_admin,email_admin,numero_admin,url_img,role_admin,dispo_admin,mdp}=req.body  
    const postId = req.params.id;
    console.log(postId)

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(mdp, salt);
        const q="UPDATE admin SET  `nom-admin`=? , `prenom-admin`=? ,  `email-admin`=? ,  `numero-admin`=? ,  `url-img`=? , `role-admin`=? ,  `dispo-admin`=? , mdp=?  where `id-admin`=?";
      const values = [nom_admin,prenom_admin,email_admin,numero_admin,url_img,role_admin,dispo_admin,hash,postId]
    //   console.log(email_admin)
      db.query(q, [...values], (err, data) => {
        if (err) return next(err) //500
        return res.json("admin  has been updated.");
      });
};

module.exports.chercherAdmin=(req,res,next)=>{

    const partOfPrenom=req.query.prenom
    console.log(partOfPrenom)
    const rechercheSQL = "SELECT * FROM admin WHERE `prenom-admin`	  LIKE  ?";

    const rechercheValue = "%" + partOfPrenom + "%";
    console.log(rechercheValue)

    // Exécutez la requête avec le prénom en tant que paramètre
    db.query(rechercheSQL, [rechercheValue], (err, resultats) => {
      if (err) {

    next(err);
      }
      return res.status(200).json(resultats);
    })

}
module.exports.disactiverAdmin=(req,res,next)=>{
     
 const disactive= req.body.disactive;
  const postId = req.params.id;

      const q="UPDATE admin SET  `dispo-admin`=? where `id-admin`=?";
    const values = [disactive,postId]
    db.query(q, [...values], (err, data) => {
      if (err) return next(err) //500
      return res.json("admin  has been updated.");
    });
}