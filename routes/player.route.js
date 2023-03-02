const playerController = require('../controllers/player.controller')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB in bytes
  }
});

//set controller route path
router.post('/controll',upload.single('file'),playerController.createPlayer)
router.get('/controll',playerController.readPlayer)
router.put('/controll/:id',upload.single('file'),playerController.upDatePlayer)
router.delete('/controll/:id',playerController.deletePlayer)

//using api from controller
const playerApis = require('../controllers/api/playerDataByID.api')
router.get('/api/playerDataByID/:id',playerApis.playerDataByID)

module.exports = router