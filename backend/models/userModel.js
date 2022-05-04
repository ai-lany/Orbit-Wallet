const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            unique: true
        },
        lastName:{
            
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
        quote: { type: String },
        coins_owned: {
            type: Array,
        },
        watchlist: {
            type: Array,
        }
    },
    { collection: 'users'}
 )
  
  const User = mongoose.model("User", userSchema)

  module.exports = User