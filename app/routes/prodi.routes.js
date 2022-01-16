module.exports = app => {
  const prodis = require("../controllers/prodi.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", prodis.create);

  // Retrieve all Tutorials
  router.get("/", prodis.findAll);

  // // Retrieve all published Tutorials
  // router.get("/published", prodis.findAllPublished);

  // // Retrieve a single Tutorial with id
  // router.get("/:id", prodis.findOne);

  // // Update a Tutorial with id
  // router.put("/:id", prodis.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", prodis.delete);

  // // Delete all Tutorials
  // router.delete("/", prodis.deleteAll);

  app.use('/api/prodis', router);
};