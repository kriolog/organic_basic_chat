var expressJwt = require('express-jwt')

module.exports = function (app, dna) {
  var authorize = expressJwt({
    secret: dna.JWT.secret,
    getToken: function fromHeaderOrQuerystring (req) {
      if (req.headers.authtoken) {
        return req.headers.authtoken
      } else if (req.query && req.query.token) {
        return req.query.token
      }
      return null
    }
  })
  app.use(function (req, res, next) {
    // inject helper method
    req.getToken = require('../../lib/jwt-token')(dna.JWT)

    req.session = {}

    if (!req.headers.authtoken && !(req.query && req.query.token)) {
      return next()
    }

    authorize(req, res, function (err) {
      if (err) return next()
      if (req.user) {
        // move req.user to req.session
        req.session.userId = req.user.id
        req.session.user = req.user

        // leave req.user available for other middlewares to populate it
        delete req.user
      }
      next()
    })
  })
}
