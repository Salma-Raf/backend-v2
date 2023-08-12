const { db } = require("../db.js");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");

module.exports.getcommandes = (req, res) => {
  const q1 =
    req.query.datedebut && req.query.datefin
      ? "SELECT DISTINCT  `n_panier` FROM commande  where  `date_achat`>=? and  `date_achat`<=? ORDER BY `n_panier`"
      : "SELECT DISTINCT  `n_panier` FROM commande";

  db.query(
    q1,
    [new Date(req.query.datedebut), new Date(req.query.datefin)],
    (err, data) => {
      if (err) return res.status(500).send(err);

      var t = data;
      let promises = [];
      for (let i = 0; i < t.length; i++) {
        const q =
          "SELECT * FROM commande,client,produit,livreur,ville,restaurant   where  produit.`id_prod`=commande.`id_produit` and livreur.id_livreur=commande.id_livreur and  ville.id_ville=livreur.id_ville and  commande.`id_client`=client.`id_client` and produit.`id_restau`=restaurant.`id_restau`  and `n_panier`=? ORDER BY `date_achat` ";
        const promise = new Promise((resolve, reject) => {
          db.query(q, [t[i].n_panier], (err, data) => {
            if (err) reject(err);
            var tab = [];
            var ob = {};
            var panie = [];
            var sum = 0;
            var annuler = true;
            var livraison=null  
              livraison=data[0].prix_taxe
             var    prix_livraison_taoufik=  data[0].prix_livraison_ville	-livraison 
            // console.log(data[0].tarif)
            for (let j = 0; j < data.length; j++) {
               
              ob.nom_client = data[j].nom_client;
              ob.nom_livreur=data[j].nom_livreur
              ob.id_panier = data[j].n_panier;
              ob.vendu = data[j].vendu;
              ob.numero_client = data[j].numero_client;
              panie.push([data[j].nom, data[j].prix, data[j].quantite]);
              sum += data[j].prix * data[j].quantite;
              annuler = annuler && data[j].annuler === 1;
            }
            console.log(sum*data[0].tarif_cmd*1/100)
            ob.prix_total = sum+data[0].prix_livraison_ville;
            ob.panie = panie;
            ob.annuler = annuler ? 1 : 0;
            ob.livraison_livre = livraison;
            ob.livraison_taoufik=prix_livraison_taoufik
            ob.rbah_taoufik=prix_livraison_taoufik+sum*data[0].tarif_cmd*1/100
            
            // console.log(sum*data[0].tarif*sum/100,"A",data[0].tarif,sum)
            tab.push(ob);

            if (
              tab[0].nom_client &&
              // tab[0].numero_client &&
              tab[0].prix_total &&
              tab[0].panie[0].length == 3
            ) {
              resolve(tab);
            } else reject(null);
          });
        });
        promises.push(promise);
      }

      Promise.all(promises)
        .then((results) => {
          let tab = [];
          for (let i = 0; i < results.length; i++) {
            if (results[i]) {
              tab.push(results[i][0]);
            }
          }
          return res.status(200).json(tab);
        })
        .catch((err) => {
          return res.status(500).send(err);
        });
    }
  );
};
module.exports.adcommande = (req, res) => {
  var top = req.body;

  var id = 1;
  var num_panie;
  const q1 = "SELECT max(n_panier) as panie FROM commande";
  db.query(q1, [], (err, data) => {
    if (err) next(err);
    num_panie = data[0].panie;

    let promises = [];

    for (let i = 0; i < top.length; i++) {
      const q =
        "INSERT INTO commande(`id_client`,`id_produit`,`quantite`,`vendu`,`date_achat`,n_panier,annuler,`id_livreur`) VALUES (?)";
      const promise = new Promise((resolve, reject) => {
        const values = [id, top[i].id_prd, top[i].qnt];
        db.query(
          q,
          [[...values, 0, new Date(), +num_panie + 1, 0, 1]],
          (err, data) => {
            if (err) reject("sdf");
            resolve(data);
          }
        );
      });

      promises.push(promise);
    }

    Promise.all(promises)
      .then((resul) => {
        // x(req, res);
        return res.status(200).json("panier has been created");
      })
      .catch((e) => {
        return next(e);
      });
  });
};
module.exports.disactivercommande = (req, res) => {
  const cmd = req.body;
  console.log(cmd);

  const q = cmd.vendu
    ? "UPDATE commande SET `vendu`=? where n_panier=?"
    : "UPDATE commande SET `annuler`=? where n_panier=?";
  const val = cmd.vendu ? cmd.vendu : cmd.annuler;
  const values = [val, cmd.n_panie];
  db.query(q, [...values], (err, data) => {
    if (err) return next(err);
    return res.json("commentde  has been updated.");
  });
};

module.exports.getcalcule = (req, res,next) => {

   const q1 = "SELECT DISTINCT `id_restau` FROM  produit,commande where produit.id_prod=commande.id_produit  and payee=0 and  annuler!=1";

  db.query(
    q1,
    [],
    (err, data) => {
      if (err) return res.status(500).send(err);

      var t = data;
      let promises = [];
      for (let i = 0; i < t.length; i++) {
        const q ="SELECT * FROM commande,produit,restaurant where produit.`id_prod`=commande.`id_produit` and produit.`id_restau`=restaurant.`id_restau` and payee=0 and restaurant.id_restau=? and annuler!=1";
        const promise = new Promise((resolve, reject) => {
          db.query(q, [t[i].id_restau], (err, data) => {
            if (err) reject(err);
            var tab = [];
            var ob = {};
            var sum = 0;
            ob.nom_restau=data[0]?.nom_restau
            for (let j = 0; j < data.length; j++) {
              sum+=data[j].prix*data[j].quantite*(100-data[j].tarif_cmd)/100
            }
            ob.prix_total=sum
            ob.id_restau=data[0]?.id_restau
            tab.push(ob);
            if (
            true
            ) {
              resolve(tab);
            } else reject(null);           
          });
        });
        promises.push(promise);
      }

      Promise.all(promises)
        .then((results) => {
          let tab = [];
          for (let i = 0; i < results.length; i++) {
            if (results[i]) {
              tab.push(results[i][0]);
            }
        }
          return res.status(200).json(tab);
        })
        .catch((err) => {
          return res.status(500).send(err);
        });
    }
  );

};



module.exports.credit = (req, res,next) => {
  console.log(id_restau)
 const q="update commande,produit,restaurant set payee=1 where commande.id_produit=produit.id_prod and restaurant.id_restau=produit.id_restau and restaurant.id_restau=?";
    db.query(q, [id_restau], (err, data) => {
      if (err) return next(err) //500
      return res.json("commande  has been updated.");
    });
 
const id_restau=+req.params.id

};



module.exports.getcommandes_par_restau = (req, res) => {
  id_restau=1;
  const q1 =
    req.query.datedebut && req.query.datefin
      ? "SELECT DISTINCT  `n_panier` FROM commande,produit,restaurant  where  produit.`id_prod`=commande.`id_produit` and  produit.`id_restau`=restaurant.`id_restau` and  restaurant.id_restau=? and `date_achat`>=? and  `date_achat`<=?    ORDER BY `n_panier`  "
      : "SELECT DISTINCT  `n_panier` FROM commande,produit,restaurant  where  produit.`id_prod`=commande.`id_produit` and  produit.`id_restau`=restaurant.`id_restau` and  restaurant.id_restau=?  ORDER BY `n_panier`  ";

  db.query(
    q1,
    [id_restau,new Date(req.query.datedebut), new Date(req.query.datefin)],
    (err, data) => {
      if (err) return res.status(500).send(err);

      var t = data;
      console.log(t)
      let promises = [];
      for (let i = 0; i < t.length; i++) {
        const q =
          "SELECT * FROM commande,client,produit,livreur,ville,restaurant   where  produit.`id_prod`=commande.`id_produit` and livreur.id_livreur=commande.id_livreur and  ville.id_ville=livreur.id_ville and  commande.`id_client`=client.`id_client` and produit.`id_restau`=restaurant.`id_restau`  and `n_panier`=? ORDER BY `date_achat` ";
        const promise = new Promise((resolve, reject) => {
          db.query(q, [t[i].n_panier], (err, data) => {
            if (err) reject(err);
            var tab = [];
            var ob = {};
            var panie = [];
            var sum = 0;
            var annuler = true;
            var livraison=null  
              livraison=data[0].prix_taxe
             var    prix_livraison_taoufik=  data[0].prix_livraison_ville	-livraison 
            // console.log(data[0].tarif)
            for (let j = 0; j < data.length; j++) {
              ob.payee=data[j].payee 
              ob.nom_client = data[j].nom_client;
              ob.nom_livreur=data[j].nom_livreur
              ob.id_panier = data[j].n_panier;
              ob.vendu = data[j].vendu;
              ob.numero_client = data[j].numero_client;
              panie.push([data[j].nom, data[j].prix, data[j].quantite]);
              sum += data[j].prix * data[j].quantite;
              annuler = annuler && data[j].annuler === 1;
            }
            console.log(sum*data[0].tarif_cmd*1/100)
            ob.panie = panie;
            ob.annuler = annuler ? 1 : 0;
            // ob.livraison_livre = livraison;
            // ob.livraison_taoufik=prix_livraison_taoufik
            ob.rbah_resteau=sum*(100-data[0].tarif_cmd)*1/100
            
            tab.push(ob);
            if (
              tab[0].nom_client &&
              // tab[0].numero_client &&
              tab[0].panie[0].length == 3
            ) {
              resolve(tab);
            } else reject(null);
          });
        });
        promises.push(promise);
      }

      Promise.all(promises)
        .then((results) => {
          let tab = [];
          for (let i = 0; i < results.length; i++) {
            if (results[i]) {
              tab.push(results[i][0]);
            }
          }
          return res.status(200).json(tab);
        })
        .catch((err) => {
          return res.status(500).send(err);
        });
    }
  );
};