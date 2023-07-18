const { db } = require("../db.js");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");

module.exports.getcommandes = (req, res) => {
  const q1 =
    req.query.datedebut && req.query.datefin
      ? "SELECT DISTINCT  `n_panier` FROM commande  where  `date-achat`>=? and  `date-achat`<=? ORDER BY `n_panier`"
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
          "SELECT * FROM commande,client,produit where  produit.`id-prod`=commande.`id-produit` and commande.`id-client`=client.`id-client`  and `n_panier`=? ORDER BY `date-achat` ";
        const promise = new Promise((resolve, reject) => {
          db.query(q, [t[i].n_panier], (err, data) => {
            if (err) reject(err);
            var tab = [];
            var ob = {};
            var panie = [];
            var sum = 0;
            var annuler = true;
            var livraison = 0;
            for (let j = 0; j < data.length; j++) {
              ob.nom = data[j].nom_client;
              ob.id_panier = data[j].n_panier;
              ob.vendu = data[j].vendu;
              ob.numero = data[j].numero_client;
              panie.push([data[j].nom, data[j].prix, data[j].quantite]);
              sum += data[j].prix * data[j].quantite;
              annuler = annuler && data[j].annuler === 1;
              livraison += data[j].livre;
            }
            ob.prix_total = sum;
            ob.panie = panie;
            ob.annuler = annuler ? 1 : 0;
            ob.livraison = livraison;

            tab.push(ob);

            console.log(tab[0].numero_client);
            if (
              tab[0].nom &&
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
          console.log(results);
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
        "INSERT INTO commande(`id-client`,`id-produit`,`quantite`,`vendu`,`date-achat`,n_panier,annuler,`id-livreur`) VALUES (?)";
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
