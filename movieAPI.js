const movieQuery = require('./dbOperation.js')
const axios = require('axios')
const express = require('express')
const app = express()

let actors = {}
let movies = {}

const urlMovies1 = 'https://movie-api-lyalzcwvbg.now.sh/paramount'
const urlMovies2 = 'https://movie-api-lyalzcwvbg.now.sh/dreamworks'
const getMovies1 = () => axios.get(urlMovies1)
const getMovies2 = () => axios.get(urlMovies2)

const getActors = () => axios.get('https://movie-api-lyalzcwvbg.now.sh/actors')

const fetchUrl = [getMovies1(), getMovies2(), getActors()]

const studio1 = (urlMovies1.split('/')[3])
const studio2 = (urlMovies2.split('/')[3])

app.get('/fetch', function (req, res) {
  Promise.all(fetchUrl).then((response) => {
    let movies1 = response[0].data
    let movies2 = response[1].data
    let actors = response[2].data
    Promise.all(movies1.map((movie) => {
      return movieQuery.insertMovie(movie.movieName, movie.releaseDate, studio1)
    }))
      .then(() => {
        return Promise.all(movies2.map((movie) => {
          return movieQuery.insertMovie(movie.movieName, movie.releaseDate, studio2)
        }))
      })
      .then(() => {
        return Promise.all(actors.map((actor) => {
          return movieQuery.insertActor(actor.actorName)
        }))
      })
      .then((response) => {
        let promiseAllQueries = []
        return Promise.all(actors.map((actor, index) => {
          return Promise.all(actor.movies.map((movie) => {
            promiseAllQueries.push(movieQuery.insertGetMovie(response[index][0].actorid, movie))
          }))
        }))
      })
      .then(() => {
        res.send('Fetched')
      })
      .catch((err) => {
        console.log(err)
      })
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
          console.log(movies)
          let resultActors = []
          let result = {}
          result.movieName = movies[0].moviename
          result.releaseDate = movies[0].releasedate
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
