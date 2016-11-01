var path = require('path')

module.exports = function (plasma, dna) {
  plasma.on(dna.attachToChemical.type, function (c) {
    var httpServer = c[dna.attachToChemical.propertyName] || c[0][dna.attachToChemical.propertyName]
    var wireHandlers = function (io) {
      if (dna.log) {
        console.log('socketio server ready')
      }
      plasma.on('kill', function () {
        io.close()
      })
      if (dna.emit.connection) {
        io.on('connection', function (socket) {
          plasma.emit({type: dna.emit.connection, socket: socket})
        })
      }
      if (dna.emit && dna.emit.ready) {
        plasma.emit({type: dna.emit.ready, io: io})
      }
      if (dna.store && dna.store.ready) {
        plasma.store({type: dna.store.ready, io: io})
      }
    }
    if (dna.initializerPath) {
      require(path.join(process.cwd(), dna.initializerPath))(plasma, dna, httpServer, function (err, io) {
        if (err) throw err
        wireHandlers(io)
      })
    } else {
      var io = require('socket.io')(httpServer, dna.options)
      wireHandlers(io)
    }
  })
}
