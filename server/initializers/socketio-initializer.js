var socketioJwt = require('socketio-jwt')

module.exports = function (plasma, dna, httpServer, done) {
  var io = require('socket.io')(httpServer, dna.options)
  plasma.io = io
  /* io.use(socketioJwt.authorize({ // uncoment it after changin the token to a valid one
    secret: dna.JWT.secret,
    handshake: true
  })) */
  done(null, io)
}
