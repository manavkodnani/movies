const movieQuery = require('../dbOperation.js')

var chai = require('chai')
var expect = chai.expect
var should = chai.should()

describe('when insert query is executed', function () {
  it("should return succes message if correct ID is passed", function (done) {
    movieQuery.insertMovie('abcd', 'jan-06-2015', 'dreamworks')
      .then((response) => {
        console.log(response)
        expect(response[1].rowCount).to.eqls(1)
        done()
      })
  })
})
