const express = require('express');
const router = express.Router();
const { createSong, getSong } = require('../controller/song');

router.get("/create", createSong);
router.get("/", getSong);

module.exports = router;