const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quotesSchema = new Schema({
  name: String,
  quote: String
})
module.exports = mongoose.model('Quote', quotesSchema, "quotes")