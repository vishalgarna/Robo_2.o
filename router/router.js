const express = require('express')
const router = express.Router()
const strategiesController = require('../controllers/Stragegiescontrollers')
const userservices = require('../controllers/userController')

// user routes
router.post('/api/user-create',userservices.create);
router.get('/api/all-users' , userservices.getalluers)

// strategy routes
router.post('/api/create-strategy', strategiesController.create);
router.get('/api/get-strategy', strategiesController.getstrateies);
router.put('/api/update-strategy', strategiesController.update);
router.delete('/api/delete-strategy', strategiesController.delete);


module.exports = router