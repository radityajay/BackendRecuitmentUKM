module.exports = app => {
  const recuitmens = require("../controllers/recuitmen.controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", recuitmens.create);

  // Retrieve all Tutorials
  router.get("/", recuitmens.findAll);

  // Retrieve all published Tutorials
  router.get("/join", recuitmens.findAllJoin);
  // router.get("/futsal", recuitmens.findAllFutsal);
  router.get("/totUkm", recuitmens.findTotFutsal);
  router.get("/ukmAll", recuitmens.findAllUkm);

  // Retrieve a single Tutorial with id
  // router.get("/:id", recuitmens.findOne);

  // // Update a Tutorial with id
  // router.put("/:id", recuitmens.update);

  // // Delete a Tutorial with id
  router.delete("/:id", recuitmens.delete);

  // // Delete all Tutorials
  // router.delete("/", recuitmens.deleteAll);

  app.use('/api/recuitmens', router);
};