var $require = require(process.cwd() + '/server/lib/require')

module.exports = function (plasma, dna) {
  var Message = $require('models/message')

  /*
    c = { type: 'NewUserSocket', userId: userId, socket: socket }
  */
  plasma.on('NewUserSocket', function (c) {
    /*
      message = { to: userId, content: content }
    */
    c.socket.on(dna.ws.newMessage, function (data) {
      if (!data.content || data.content.trim() === '') return
      Message.create({
        to: data.to,
        from: c.userId,
        content: data.content
      }, function (err, message) {
        if (err) return console.error('error while creating new message', err)
        message.populate(['to', 'from'], function (err, message) {
          if (err) return console.error('error while populating new message', err)
          plasma.emit({
            type: 'emit-to-users',
            users: [message.to.id, message.from.id],
            name: dna.ws.newMessage,
            data: message
          })
        })
      })
    })
  })
}
