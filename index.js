const express = require("express");
const cors = require("cors");
const admin = require("./routes/Admin.js");
<<<<<<< HEAD
const client = require("./routes/client.js");
const livreur = require("./routes/livreur.js");
=======
const ville=require("./routes/ville.js")
>>>>>>> fa60f109fbac25636d88b2758f9c52edbd40485c

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/admin", admin);

<<<<<<< HEAD
app.use("/api/client", client);
app.use("/api/livreur", livreur);
=======
app.use("/api/ville", ville);



>>>>>>> fa60f109fbac25636d88b2758f9c52edbd40485c

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
