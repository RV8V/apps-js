const { Model } = require('objection')

class ChannelModel extends Model {
  static get tableName() {
    return 'channels'
  }
}

module.exports = ChannelModel
