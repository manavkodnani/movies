const movieQuery = require('./dbOperation.js')
const axios = require('axios')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const getMovies1 = () => axios.get('https://movie-api-lyalzcwvbg.now.sh/paramount')

const getMovies2 = () => axios.get('https://movie-api-lyalzcwvbg.now.sh/dreamworks')

const getMovies3 = () => axios.get('https://movie-api-lyalzcwvbg.now.sh/actors')

app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// app.use(express.static('public'))

// app.set('view engine', 'ejs')
//./node_modules/.bin/eslint fileReadWrite.js --fix
app.get('/', function (req, res) {
  res.send('hello')
})
app.get('/fetch', function (req, res) {
  getMovies1().then(function (response) {
    console.log('Movies1')
    return (response.data)
  })
    .then(function (result) {
      result.forEach(function (movie) {
        movieQuery.insertMovie(movie.movieName, movie.releaseDate, 'paramount')
      })
      return getMovies2()
    })
    .then(function (response) {
      console.log('Movies2')
      return (response.data)
    })
    .then(function (response) {
      response.forEach(function (movie) {
        movieQuery.insertMovie(movie.movieName, movie.releaseDate, 'dreamworks')
        console.log('Movies details inserted into db')
      })
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
            actor.movies.forEach(function (movie) {
              movieQuery.insertGetMovie(actorid, movie)
            })
          })
        console.log('Inserted actor')
      })
    })
    .catch(function (error) {
      console.log(error)
    })
})



app.get('/movie/:movieName', function (req, res) {
  const movieName = req.params.movieName
  movieQuery.readActor(movieName)
  .then(function )
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
