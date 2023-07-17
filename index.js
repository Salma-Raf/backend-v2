const express = require("express");
const cors=require("cors")


const app = express();
app.use(cors());
app.use(express.json());






app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});


app.listen(8800, () => {
    console.log("Connected!");
  });