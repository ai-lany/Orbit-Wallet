const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName:{
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        coins_owned: {
            type: Array,
            default: []
        },
        watchlist: {
            type: Array,
            default: []
        },
        widgets: {
            type: Array,
            default: []
        }
    },
    { collection: 'users'}
 )
  
  const User = mongoose.model("User", userSchema)

  module.exports = User