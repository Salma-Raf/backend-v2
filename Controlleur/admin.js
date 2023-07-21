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
  setTimeout(()=>{

    console.log(req.body)
    const  {nom_admin,prenom_admin,email_admin,numero_admin,url_img,role_admin,dispo_admin,mdp}=req.body
      const q = "SELECT * FROM admin WHERE `email_admin` = ?";
  
      db.query(q, [email_admin], (err, data) => {
        if (err) return next(err)//500
        if (data.length) return next(err);//409
    
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(mdp, salt);
          const q =
            "INSERT INTO `admin`(`nom_admin`,`prenom_admin`,`email_admin`,`numero_admin`,`url_img`,`role_admin`,`dispo_admin`,`mdp`) VALUES (?)";
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
          const q2="SELECT * FROM admin WHERE id_admin = (SELECT MAX(id_admin) FROM admin);"
          db.query(q2, [], (err, data) => {
            if (err) next(err);
  
            return res.status(200).json(data[0]);
          });
        });
      });
  },2000)
 
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
module.exports.updateadmin = (req, res,next) => {
    setTimeout(()=>{
      console.log(req.body)
      const  {nom_admin,prenom_admin,email_admin,numero_admin,url_img,role_admin,dispo_admin,mdp}=req.body  
  
      const postId =req.params.id;
  
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(mdp, salt);
          const q="UPDATE admin SET  `nom_admin`=? , `prenom_admin`=? ,  `email_admin`=? ,  `numero_admin`=? ,  `url_img`=? , `role_admin`=? ,  `dispo_admin`=? , mdp=?  where `id_admin`=?";
        const values = [nom_admin,prenom_admin,email_admin,numero_admin,url_img,role_admin,dispo_admin,hash,postId]
         console.log(email_admin)
        db.query(q, [...values], (err, data) => {
          if (err) return next(err) //500
          const q2="SELECT * FROM admin WHERE id_admin =? "
          db.query(q2, [postId], (err, data) => {
            if (err) next(err);
            console.log(data,"ASDf")
            return res.status(200).json(data[0]);
          });
        });
    },2000)
 
};

module.exports.chercherAdmin=(req,res,next)=>{

    const partOfPrenom=req.query.prenom
    console.log(partOfPrenom)
    const rechercheSQL = "SELECT * FROM admin WHERE `prenom_admin`	  LIKE  ?";

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

      const q="UPDATE admin SET  `dispo_admin`=? where `id_admin`=?";
    const values = [disactive,postId]
    db.query(q, [...values], (err, data) => {
      if (err) return next(err) //500
      return res.json("admin  has been updated.");
    });
}