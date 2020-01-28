const express = require('express');
const router = express.Router();

const main = require('./main/mainController');

require('dotenv').config();

router.get('/', main.index);
router.post('/addUrlGeneration', main.addUrlGeneration);
router.get('/test' , main.test);
router.get('/image' , main.image);
router.get('/:url', main.url);



module.exports = router;
