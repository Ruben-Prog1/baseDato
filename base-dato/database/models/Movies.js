module.exports = function(sequelize, dataTypes) {
    let alias = "Movies";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
    
        },
        title: {
            type: dataTypes.STRING
    
        },
        awards: {
            type: dataTypes.INTEGER
        },
        rating: {
            type: dataTypes.DOUBLE
        },
        length: {
            type: dataTypes.INTEGER
        },
        genre_id: {
            type: dataTypes.INTEGER
        },
        release_date: {
            type: dataTypes.DATE
        }
    }
    
    let config = {
        tableName: "movies",
        timestamps: false
    }
    
    let Movies = sequelize.define(alias, cols, config);

    Movies.associate = function(models) {
        Movies.belongsTo(models.Genre, {
            as: "genre",
            foreignKey: "genre_id"
    
        });

        Movies.belongsToMany(models.Actor, {
            as: "actor",
            through: "actor_movie",
            foreignKey: "movie_id",
            otherKey: "actor_id",
            timestamps: false
    
        });
    
    }
    
    return Movies;
    }