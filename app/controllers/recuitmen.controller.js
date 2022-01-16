const Recuitmen = require("../models/recuitment.model");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Recuitmen
  const recuitmen = new Recuitmen({
    name: req.body.name,
    nim: req.body.nim,
    angkatan: req.body.angkatan,
    noTlp: req.body.noTlp,
    ukmId: req.body.ukmId,
    prodiId: req.body.prodiId,
  });

  // Save Recuitmen in the database
  Recuitmen.create(recuitmen, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Recuitmen."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const name = req.query.name;

  Recuitmen.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

exports.findAllJoin = (req, res) => {
  Recuitmen.getAllJoin((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

exports.findAllUkm = (req, res) => {
  Recuitmen.getAllUkm(req.query.ukmName, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

exports.findTotFutsal = (req, res) => {
  Recuitmen.getTotUkm(req.query.ukmName, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};


exports.delete = (req, res) => {
  Recuitmen.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Recuitment with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Recuitmen with id " + req.params.id
        });
      }
    } else res.send({ message: `Recuitmen was deleted successfully!` });
  });
};