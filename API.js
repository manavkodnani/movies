const movieQuery = require('./dbOperation.js')
const axios = require('axios')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

let actors = {}
let movies = {}

const getMovies1 = () => axios.get('https://movie-api-lyalzcwvbg.now.sh/paramount')

const getMovies2 = () => axios.get('https://movie-api-lyalzcwvbg.now.sh/dreamworks')

const getMovies3 = () => axios.get('https://movie-api-lyalzcwvbg.now.sh/actors')

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/fetch', function (req, res) {
  getMovies1().then(function (response) {
    console.log('Movies1')
    return (response.data)
  })
    .then(function (result) {
      const promiseAllQueries = []
      result.forEach(function (movie) {
        promiseAllQueries.push(movieQuery.insertMovie(movie.movieName, movie.releaseDate, 'paramount'))
      })
      return Promise.all(promiseAllQueries)
    })
    .then(function (response) {
      return getMovies2()
    })
    .then(function (response) {
      console.log('Movies2')
      return (response.data)
    })
    .then(function (response) {
      const promiseAllQueries = []
      response.forEach(function (movie) {
        promiseAllQueries.push(movieQuery.insertMovie(movie.movieName, movie.releaseDate, 'dreamworks'))
        console.log('Movies details inserted into db')
      })
      return Promise.all(promiseAllQueries)
    })
    .then(function (response) {
      return getMovies3()
    })
    .then(function (response) {
      console.log(response.data)
      response.data.forEach(function (actor) {
        movieQuery.insertActor(actor.actorName)
          .then(function (response) {
            console.log('check id')
            return (response[0].actorid)
          })
          .then(function (actorid) {
            const promiseAllQueries = []
            actor.movies.forEach(function (movie) {
              promiseAllQueries.push(movieQuery.insertGetMovie(actorid, movie))
            })
            return Promise.all(promiseAllQueries)
          })
          .then(function (response) {
            console.log('Inserted actor')
          })
      })
      res.send('fetched from url to db')
    })
    .catch(function (error) {
      console.log(error)
    })
})



app.get('/movie/:movieName', function (req, res) {
  const movieName = req.params.movieName
  movieQuery.readActor(movieName)
    .then(function (response) {
      actors = response[0]
      movieQuery.readMovie(movieName)
        .then(function (response) {
          movies = response[0]
          let resultActors = []
          let result = {}
          result.movieName = movies[0].moviename
          result.releaseDate = movies[0].releaseDate
          actors.forEach(function (actor) {
            resultActors.push(actor.actorname)
          })
          result.actors = resultActors
          result.studio = movies[0].studio
          res.send(result)
        })
    })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
