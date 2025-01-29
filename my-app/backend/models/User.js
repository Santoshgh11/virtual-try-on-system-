// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   scannedData: Object,  // Store body scan data here
// });

// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  saved_outfits: [{ type: Object }], // Stores recommended outfits
  preferences: { type: Object, default: {} } // AI-based preferences
});

module.exports = mongoose.model('User', userSchema);
