var bcrypt = require('bcrypt')

module.exports = function (userSchema) {
  userSchema.pre('save', function (next) {
    var self = this

    if (!this.isModified('password')) {
      return next()
    }

    bcrypt.hash(this.password, 10, function (err, passwordHash) {
      if (err) return next(err)
      self.password = passwordHash
      next()
    })
  })

  userSchema.static('findByCredentials', function (credentials, next) {
    var q = this.findOne({
      email: credentials.email && credentials.email.toLowerCase()
    })
    q.select('+password')
    q.exec(function (err, user) {
      if (err) return next(err)
      if (!user) return next()
      bcrypt.compare(credentials.password, user.password, function (err, passwordsMatch) {
        if (passwordsMatch) {
          return next(err, user)
        } else {
          return next(null, null)
        }
      })
    })
  })
}
