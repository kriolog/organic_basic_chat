var _ = require('lodash')

module.exports = function (schema, schemaStruct) {
  schema.static('fromJSON', function (body) {
    var result = _.clone(body)
    for (var property in schema.tree) {
      var pDefinition = schema.tree[property][0] || schema.tree[property]
      if (body[property] && pDefinition.ref) {
        if (!Array.isArray(body[property])) {
          result[property] = body[property].id || body[property]
        } else {
          result[property] = body[property].map(function (i) {
            return i.id || i
          })
        }
      }
    }
    return result
  })
}
