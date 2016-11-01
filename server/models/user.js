var mongoose = require('mongoose')
var userStruct = {
  email: {type: String, required: true, unique: true, lowercase: true},
  password: {type: String, required: true, select: false},
}
var userSchema = new mongoose.Schema(userStruct)
require('./plugins')(userSchema, userStruct)
require('./plugins/user-password')(userSchema)

var Model = mongoose.model('User', userSchema)
Model.autoPopulateFields = [
  /* {
    path: '',
    select: ''
  }, */
]

module.exports = Model
