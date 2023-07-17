const { db } = require("../db.js");
const jwt = require("jsonwebtoken");

module.exports.getvilles = (req, res) => {
    const q = "SELECT * FROM ville";
db.query(q, [], (err, data) => {
  if (err) return next(err);
  return res.status(200).json(data);
});
};
module.exports. addville = (req, res) => {
};
module.exports. deletville = (req, res) => {
};
