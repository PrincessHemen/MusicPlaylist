const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
    playlistName:String,
    songs:  [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Song", // Assuming your song model is named "Song"
    }],

});

const Playlist = mongoose.model("Playlist", PlaylistSchema);
module.exports = Playlist;