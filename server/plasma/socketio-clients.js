var $require = require(process.cwd() + '/server/lib/require')

module.exports = function (plasma, dna) {
  var User = $require('models/user')

  /* var io */
  var user_sockets = {
    /*
      role: String,
      userId: {
        sockets: [ Socket, ... ]
      }
    */
  }

  plasma.on('SocketIO', function (c) {
    /* io = c.io */
  })

  plasma.on('emit-to-users', function (c) {
    var userIds = c.users.map((id) => id.toString())
    for (var userId in user_sockets) {
      if (userIds.indexOf(userId) !== -1) {
        user_sockets[userId].sockets.forEach(function (s) {
          s.emit(c.name, c.data)
        })
      }
    }
  })

  plasma.on('emit-to-sockets', function (c) {
    for (var userId in user_sockets) {
      user_sockets[userId].sockets.forEach(function (s) {
        s.emit(c.name, c.data)
      })
    }
  })

  // handle new incoming socketio connections
  plasma.on('SocketIOConnection', function (c) {
    console.log('new socket')
    var socket = c.socket
    if (!socket.decoded_token) {
      socket.emit('test', {whatever: 1})
      return
    }
    var userId = socket.decoded_token.id

    // store reference to the socket instance per User
    User.findById(userId, function (err, user) {
      if (err) return console.error(err)
      if (!user) return console.warn('user is not found but tried to open socketio', userId)

      if (!user_sockets[userId]) user_sockets[userId] = {sockets: [], role: user.role}
      user_sockets[userId].sockets.push(socket)

      socket.on('disconnect', function () {
        // remove reference to the socket instance per User
        var socketIndex = user_sockets[userId].sockets.indexOf(socket)
        user_sockets[userId].sockets.splice(socketIndex, 1)
      })

      plasma.emit({type: 'NewUserSocket', userId: userId, socket: socket})
    })
  })
}
