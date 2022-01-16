const Prodi = require("../models/prodi.model");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Prodi
  const prodi = new Prodi({
    name: req.body.name
  });

  // Save Prodi in the database
  Prodi.create(prodi, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Prodi."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const name = req.query.name;

  Prodi.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// exports.findAllJoin = (req, res) => {
//   Prodi.getAllJoin((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     else res.send(data);
//   });
// };