const { db } = require("../db.js");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");

module.exports.getcommandes = (req, res) => {
    const q1 =
      req.query.datedebut && req.query.datefin
        ? "SELECT DISTINCT  n_panie FROM commande  where  `date-achat`>=? and  `date-achat`<=? ORDER BY n_panie"
        : "SELECT DISTINCT  n_panie FROM commande";
  
    db.query(
      q1,
      [new Date(req.query.datedebut), new Date(req.query.datefin)],
      (err, data) => {
        if (err) return res.status(500).send(err);
  
        var t = data;
        let promises = [];
        for (let i = 0; i < t.length; i++) {
          const q =
            "SELECT * FROM commande,client,produit where  produit.id_prd=commande.`id-produit` and commande.`id-client`=client.`id_cl`  and n_panie=? ORDER BY `date-achat` ";
          const promise = new Promise((resolve, reject) => {
            db.query(q, [t[i].n_panie], (err, data) => {
              if (err) reject(err);
              var tab = [];
              var ob = {};
              var panie = [];
              var sum = 0;
              var annuler = true;
              var livraison = 0;
              for (let j = 0; j < data.length; j++) {
                ob.nom = data[j].nom;
                ob.id_panier = data[j].n_panie;
                ob.vendu = data[j].vendu;
                ob.numero = data[j].num_tel;
                panie.push([data[j].titre, data[j].prix, data[j].quantite]);
                sum += data[j].prix * data[j].quantite + data[j].livre;
                annuler = annuler && data[j].annuler === 1;
                livraison += data[j].livre;
              }
              ob.prix_total = sum;
              ob.panie = panie;
              ob.annuler = annuler ? 1 : 0;
              ob.livraison = livraison;
              tab.push(ob);
              if (
                tab[0].nom &&
                tab[0].numero &&
                tab[0].prix_total &&
                tab[0].panie[0].length == 3
              ) {
                resolve(tab);
              } else resolve(null);
            });
          });
          promises.push(promise);
        }
  
        Promise.all(promises)
          .then((results) => {
            let tab = [];
            for (let i = 0; i < results.length; i++) {
              if (results[i]) {
                tab.push(results[i]);
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
module.exports. adcommande = (req, res) => {
};
module.exports. disactivelivreur = (req, res) => {
};
module.exports. cherchecommande = (req, res) => {
};

