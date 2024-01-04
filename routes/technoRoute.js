const express = require('express')
const router = express.Router();
const adminController = require('../controllers/technoController')
const middleware = require('../middleware/middlewareUserAccess')

router.get('', technoController.technoGetAll)

module.exports = router