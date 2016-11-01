var jwt = require('jsonwebtoken')
var _ = require('lodash')

module.exports = function (JWT) {
  return function (user, options) {
    var userProfile = {
      id: user.id.toString(),
      email: user.email
    }
    var jwtoptions = _.extend({}, JWT.options, options)
    return jwt.sign(userProfile, JWT.secret, jwtoptions)
  }
}
