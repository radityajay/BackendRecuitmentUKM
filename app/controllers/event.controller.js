const Event = require("../models/event.model");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.judul) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Event
  const event = new Event({
    judul: req.body.judul,
    description: req.body.description,
  });

  // Save Event in the database
  Event.create(event, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Event."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const judul = req.query.judul;

  Event.getAll(judul, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving events."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Event.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Event with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Event with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Event.updateById(
    req.params.id,
    new Event(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Event with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Event with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Event.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Event with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Event with id " + req.params.id
        });
      }
    } else res.send({ message: `Event was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Event.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Events were deleted successfully!` });
  });
};