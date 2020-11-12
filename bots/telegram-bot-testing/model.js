module.exports = {
  film_schema: require('mongoose').Schema({ name: { type: String, required: true }, type: { type: String, required: true }, uuid: { type: String, required: true }, year: { type: String }, rate: { type: Number }, length: { type: Number }, link: { type: String } }),
  cinema_schema: require('mongoose').Schema({ name: { type: String, required: true }, url: { type: String, required: true }, type: { type: String, required: true }, uuid: { type: String, required: true }, rate: { type: Number }, length: { type: Number }, link: { type: String } }),
  user_schema: require('mongoose').Schema({ telegram_id: { type: Number, required: true }, films: { type: [String], default: null } })
}
