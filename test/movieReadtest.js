const chai = require('chai')
const assert = chai.assert
const request = require('request')

const options = {
  method: 'GET',
  url: 'http://localhost:3000/movie/Movie%202',
  headers:
  {
    'postman-token': '391680c8-8a3c-afdb-6432-e993ac438674',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded'
  }
}

const result = {
  "movieName": "Movie 2",
  "releaseDate": "Oct-01-2016",
  "actors": [
    "Actor 1",
    "Actor 2",
    "Actor 3"
  ],
  "studio": "paramount"
}

describe('When get request is sent to movies API', function () {
  it('should display movies json', function (done) {
    request(options, function (error, response, body) {
      if (error) throw new Error(error)
      assert.equal(body, result)
      done()
    })
  })
})
