let db = require("../database/models");
const { promiseImpl } = require("ejs");


let moviesController = {
    create: function (req, res, next) {
        
        db.Genre.findAll()
        .then(function(genre) {
            return res.render("creationMovies", {genre:genre});
        })

    },
    saved: function (req, res, next) {
        db.Movies.create({
            title: req.body.title,
            awards: req.body.awards,
            release_date: req.body.release_date,
            genre_id: req.body.genre,
            length: req.body.duration,
            rating: req.body.rating,
        });

        res.redirect("/movies");
    },
    listMovies: function (req, res, next) {
        db.Movies.findAll()
        .then(function (movies) {
            res.render("listMovies", {movies:movies});
        });
    },
    detailMovies: function (req, res, next) {
        db.Movies.findByPk(req.params.id, {
            include: [{association: "genre"}, {association: "actor"}]
        })
        .then(function (movies) {
            res.render("detailMovies", {movies:movies});
        })
    },
    editMovies: function (req, res, next) {
        let pedidoMovies = db.Movies.findByPk(req.params.id);

        let pedidoGenre = db.Genre.findAll();

        Promise.all([pedidoMovies, pedidoGenre])
        .then(function([movies, genre]) {
            res.render("editMovies", {movies:movies, genre:genre});
        })
    },
    updateMovies: function(req, res, next) {
        var errors = validationResult(req)

        
        db.Movies.update({
            title: req.body.title,
            awards: req.body.awards,
            release_date: req.body.release_date,
            genre_id: req.body.genre,
            length: req.body.duration,
            rating: req.body.rating,
        }, {
            where: {
                id: req.params.id
            }
        });
        res.redirect("/movies/" + req.params.id)
    
    },
    deleteMovies:function(req, res, next){
        db.Movies.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/movies')
    }
}
    
module.exports = moviesController;