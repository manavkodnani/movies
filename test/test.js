var chai = require('chai')
var expect = chai.expect
var should = chai.should()

var request = require("request");

    var optionsValidID = {
      method: 'DELETE',
      url: 'http://localhost:3000/destroy/22',
      headers:
      {
        'postman-token': 'c43a925a-53ac-0ca8-3e7e-3b44d4fc4fb3',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded'
      },
      form: {}
    };
    var optionsInvalidID = {
      method: 'DELETE',
      url: 'http://localhost:3000/destroy/abc',
      headers:
      {
        'postman-token': 'c43a925a-53ac-0ca8-3e7e-3b44d4fc4fb3',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded'
      },
      form: {}
    };
describe('when the delete API is called', function () {
  it('should return succes message when succesfully delete operation is done', function (done) {
    request(optionsValidID, function (error, response, body) {
      if (error) throw new Error(error);
      expect(body).to.eqls("successfully deleted")
      done()
    })
  })
  it('should return error message when no ID is passes', function (done) {
    request(optionsInvalidID, function (error, response, body) {
      if (error) throw new Error(error)
      expect(body).to.eqls("weird ID")
      done()
    })
  })
})
