
var io = require('socket.io-client')('/',  {
  'query': 'token=' + 'a user token', // change to a valid login
  forceNew: true,
  transports: ['websocket']
})
io.on('connect', function () {
  console.log('connected')
})
io.on('test', function (data) {
  console.log(data)
})


console.log('hello world!')
