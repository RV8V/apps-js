const { Model } = require('objection')

class ActorModel extends Model {
  static get tableName() {
    return 'actors'
  }

  static get relationMappings() {
    const ChannelModel = require('./channel.js')

    return {
      channel: {
        relation: Model.HasOneRelation,
        modelClass: ChannelModel,
        join: {
          from: 'actors.channel_id',
          to: 'channels.id'
        }
      }
    }
  }
}

module.exports = ActorModel
