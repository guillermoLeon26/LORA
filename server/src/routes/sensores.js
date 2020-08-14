const express = require('express')

const sensoresController = require('../controller/sensores')

const router = express.Router()

// GET /sensores/
router.get('/', sensoresController.getSensores)

module.exports = router
