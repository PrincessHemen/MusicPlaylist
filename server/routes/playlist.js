const express = require('express');
const router = express.Router();
const Playlist = require('../models/playlist');

// Create a playlist with songs
router.post('/create', async (req, res) => {
  try {
    const { title, songs } = req.body;
    const playlist = new Playlist({ playlistName: title, songs });
    await playlist.save(); 
    res.status(201).send(playlist);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/view', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const playlists = await Playlist.find().populate("songs").skip(skip).limit(limit).exec();
    res.status(200).send(playlists);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get a specific playlist by ID
router.get('/view/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate("songs");
    if (!playlist) {
      return res.status(404).send('Playlist not found');
    }
    res.status(200).send(playlist);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
