// controllers/song.js

const Song = require('../models/Song');

async function fetchSongIds(req, res) {
  try {
    const { file_paths } = req.body;

    // Fetch the song IDs based on file paths
    const songs = await Song.find({ file: { $in: file_paths } }, '_id');
    const songIds = songs.map((song) => song._id);

    res.status(200).json({ songIds });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  fetchSongIds,
  getSong: async (req, res) => {
    try {
      const { title, singer } = req.body;
      if (title) {
        const songs = await Song.find({ title });
        return res.json({ songs });
      }

      const songs = await Song.find();
      return res.json({ songs });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  createSong: async (req, res) => {
    const { title, singer, file } = req.body;

    const newsong = await Song.create({ title, singer, file }).save();
    return res.json({ song: newsong });
  },
};
