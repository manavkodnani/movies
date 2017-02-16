var Sequelize = require('sequelize')

var sequelize = new Sequelize('postgres://manavkodnani:competitivecoding@localhost:5432/moviedb')


let movieQuery = {
  insertMovie: function (moviename_, releasedate_, studio_) {
    let insertQuery = `INSERT INTO movies (moviename, releasedate, studio) VALUES (:moviename, :releasedate, :studio)`
    return sequelize.query(insertQuery, { replacements: { moviename: moviename_, releasedate: releasedate_, studio: studio_ } })
  },
  insertActor: function (actorname_) {
    let insertQuery = `INSERT INTO actor (actorname) VALUES (:actorname) returning actorid`
    return sequelize.query(insertQuery, { replacements: { actorname: actorname_ } })
  },
  insertGetMovie: function (actorID_, moviename_) {
    let insertQuery = `INSERT INTO getmovie (actorid, moviename) VALUES (:actorid, :moviename)`
    return sequelize.query(insertQuery, { replacements: { actorid: actorID_, moviename: moviename_ } })
  },
  readActor: function (moviename_) {
    let readQuery = `SELECT actorname from actor where actorid in (select actorid from getmovie where moviename = (:moviename))`
    return sequelize.query(readQuery, { replacements: { moviename: moviename_ } })
  },
  readMovie: function (moviename_) {
    let readQuery = `SELECT moviename, releasedate, studio from movies where moviename = (:moviename)`
    return sequelize.query(readQuery, { replacements: { moviename: moviename_ } })
  }
}


module.exports = movieQuery
