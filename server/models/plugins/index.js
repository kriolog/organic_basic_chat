var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
var createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin
var paginatorPlugin = require('mongoose-paginate')
var mongoose_delete = require('mongoose-delete')
var deepPopulate = require('mongoose-deep-populate')(mongoose)

module.exports = function (schema, struct) {
  schema.plugin(uniqueValidator, {message: '{PATH} already in use'})
  schema.plugin(createdModifiedPlugin, {index: true})
  schema.plugin(paginatorPlugin)
  schema.plugin(deepPopulate)
  schema.plugin(mongoose_delete, {
    deletedAt: true,
    deletedBy: true,
    overrideMethods: true
  })
  require('./transforms/tojson')(schema, struct)
  require('./transforms/fromjson')(schema, struct)
}
