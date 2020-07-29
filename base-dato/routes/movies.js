var express = require('express');
var router = express.Router();
var moviesController = require("../controllers/moviesController");


// Creacion

router.get("/create", moviesController.create);

router.post("/create", moviesController.saved);

// Lectura

router.get("/", moviesController.listMovies);

// Detalle

router.get("/:id", moviesController.detailMovies);

// Actuaulizacion

router.get("/edit/:id", moviesController.editMovies);

router.post("/edit/:id", moviesController.updateMovies);

// Borrado

router.post("/delete/:id", moviesController.deleteMovies);


module.exports = router;
