const mongoose = require('mongoose');

const SongsSchema = new mongoose.Schema({
 title: String,
 singer: String,
 file: String
});

const Song = mongoose.model("Song", SongsSchema);
module.exports = Song;