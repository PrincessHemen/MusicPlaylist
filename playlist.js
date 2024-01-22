const mongoose = require('mongoose');
const PlaylistSchema = new mongoose.Schema({
    playlistName:String,
    songs: {
        type: mongoose.SchemaTypes.DocumentArray,
        ref: "songs",
    },

});
const Playlist = mongoose.model("Playlist", PlaylistSchema);
module.exports = Playlist;