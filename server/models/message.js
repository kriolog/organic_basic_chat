var mongoose = require('mongoose')
var messageStruct = {
}
var messageSchema = new mongoose.Schema(messageStruct)
require('./plugins')(messageSchema, messageStruct)

var Model = mongoose.model('Message', messageSchema)
Model.autoPopulateFields = [
  /* {
    path: '',
    select: ''
  }, */
]

module.exports = Model
