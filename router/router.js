const express = require('express')
const router = express.Router()
const strategiesController = require('../controllers/Stragegiescontrollers')


router.post('/api/create-stragies', strategiesController.create);


module.exports = router