const { Model } = require('objection')

class VideoModel extends Model {
  static get tableName() {
    return 'videos'
  }
}

module.exports = VideoModel
