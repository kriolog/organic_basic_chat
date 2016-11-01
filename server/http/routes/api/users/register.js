var $require = require(process.cwd() + '/server/lib/require')

module.exports = function (plasma, dna, helpers) {
  var User = $require('models/user')
  return {
    'POST': function (req, res, next) {
      User.create(req.body, function (err, result) {
        if (err) return next(err)
        res.body = result.toJSON()
        res.body.token = req.getToken(result)
        next()
      })
    }
  }
}
