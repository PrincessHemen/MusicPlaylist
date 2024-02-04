const express = require('express');
const router = express.Router();
const { fetchSongIds } = require('../controller/song');

const { createSong, getSong } = require('../controller/song'); 

router.get("/create", createSong);
router.get("/", getSong);

router.post('/fetchIds', fetchSongIds);

module.exports = router;