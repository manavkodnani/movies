const movieQuery = require('../dbOperation.js')

var chai = require('chai')
var expect = chai.expect
var should = chai.should()

describe('when insert movie query is executed', function () {
  it('should return succes message if query is successfully executed', function (done) {
    movieQuery.insertMovie('inferno', 'jan-06-2015', 'dreamworks')
      .then(function (response) {
        console.log(response)
        expect(response).to.eqls([])
        done()
      })
      .catch((err) => {
        console.log(err)
        done(err)
      })
  })
})

describe('when insert actor query is executed', function () {
  it('should return succes message if query is successfully executed', function (done) {
    movieQuery.insertActor('Tom Hanks')
      .then(function (response) {
        console.log(response)
        expect(response[0].actorid).to.eqls(151)
        done()
      })
      .catch((err) => {
        console.log(err)
        done(err)
      })
  })
})

// describe('when insert get movie query is executed', function () {
//   it('should return succes message if query is successfully executed', function (done) {
//     movieQuery.insertGetMovie('Tom Hanks')
//       .then(function (response) {
//         console.log(response)
//         expect(response[0].actorid).to.eqls(150)
//         done()
//       })
//       .catch((err) => {
//         console.log(err)
//         done(err)
//       })
//   })
// })

