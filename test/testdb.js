const movieQuery = require('../dbOperation.js')

var chai = require('chai')
var expect = chai.expect
var should = chai.should()

describe('when insert movie query is executed', function () {
  it("should return succes message if query is successfully executed", function (done) {
    movieQuery.insertMovie('cmkldckl', 'jan-06-2015', 'dreamworks')
      .then(function (response) {
        console.log(response)
        expect(response[1].rowCount).to.eqls(1)
        done()
      })
      .catch((err) => {
        console.log(err)
      })
  })
})

// describe('when insert actor query is executed', function () {
//   it("should return succes message if correct ID is passed", function (done) {
//     movieQuery.insertMovie('abcjsckjan', 'jan-06-2015', 'dreamworks')
//       .then(function (response) {
//         console.log(response)
//         expect(response[1].rowCount).to.eqls(1)
//         done()
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   })
// })

