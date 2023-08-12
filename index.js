const express = require("express");
const cors = require("cors");
const admin = require("./routes/Admin.js");
const client = require("./routes/client.js");
const livreur = require("./routes/livreur.js");
const ville=require("./routes/ville.js")
const produit=require("./routes/Produit.js")
const Produit_restau2=require("./routes/Produit2.js")

const commande=require("./routes/commande.js")

const restau=require("./routes/restau.js")

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/admin", admin);

app.use("/api/client", client);

app.use("/api/ville", ville);
app.use("/api/produit2", Produit_restau2);
app.get("/",(req,res)=>{
    return res.status(200).json({wefg:"ASDF"})

})
app.get("/x",(req,res)=>{
  setTimeout(()=>{
    return res.status(200).json({wefg:"ASDF"})

  },10000)
})

app.use("/api/commande", commande);
app.use("/api/resteu", restau);

app.use("/api/produit", produit);

app.use("/api/livreur", livreur);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    stt: err,
  });
});

app.listen(8800, () => {
  console.log("Connected!");
});
