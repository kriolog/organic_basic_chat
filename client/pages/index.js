module.exports = function (plasma, dna, helpers) {
  return {
    '* *': helpers.locals,
    '* /app*': function (req, res, next) {
      res.template = 'app'
      next()
    }
  }
}
