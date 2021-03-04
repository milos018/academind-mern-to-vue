const { Schema, model, Types } = require('mongoose')

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  places: [
    {
      type: Types.ObjectId,
      required: true,
      ref: "place"
    }
  ]
})

module.exports = model('user', userSchema)
