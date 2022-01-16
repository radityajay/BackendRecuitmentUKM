module.exports = app => {
  const ukms = require("../controllers/ukm.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", ukms.create);

  // Retrieve all Tutorials
  router.get("/", ukms.findAll);

  // Retrieve all published Tutorials
  // router.get("/published", ukms.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", ukms.findOne);

  // Update a Tutorial with id
  router.put("/:id", ukms.update);

  // Delete a Tutorial with id
  router.delete("/:id", ukms.delete);

  // Delete all Tutorials
  router.delete("/", ukms.deleteAll);

  app.use('/api/ukms', router);
};