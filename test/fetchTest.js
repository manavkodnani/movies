const chai = require('chai')
const assert = chai.assert

const request = require('request')

const options = {
  method: 'GET',
  url: 'http://localhost:3000/fetch',
  headers:
  {
    'postman-token': 'ac2124cb-7eeb-28c4-c4bb-b7323244c2e4',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded'
  }
}

describe('When get request is sent to fetch API', function () {
  it('should display successful fetched message', function (done) {
    this.timeout(90000)
    request(options, function (error, response, body) {
      if (error) throw new Error(error)
      assert.equal(body, 'fetched from url to db')
      done()
    })
  })
})
