var $require = require(process.cwd() + '/server/lib/require')

module.exports = function (plasma, dna, helpers) {
  var User = $require('models/user')
  return helpers.buildCRUD(User, {
    populate: User.autoPopulateFields,
    actions: {
      'create': false,
    }
  })
}
