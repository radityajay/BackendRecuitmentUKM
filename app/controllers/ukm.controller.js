const Ukm = require("../models/ukm.model");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Ukm
  const ukm = new Ukm({
    name: req.body.name
  });

  // Save Ukm in the database
  Ukm.create(ukm, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ukm."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const name = req.query.name;

  Ukm.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ukms."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Ukm.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ukm with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Ukm with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Ukm.updateById(
    req.params.id,
    new Ukm(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Ukm with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Ukm with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Ukm.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ukm with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Ukm with id " + req.params.id
        });
      }
    } else res.send({ message: `Ukm was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Ukm.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Ukms were deleted successfully!` });
  });
};