const express = require('express')
const router = express.Router();
const adminController = require('../controllers/userController')
const middlewareUser = require('../middleware/middlewareUserAccess')
const middlewareJournalist = require('../middleware/middlewareJournalistAccess')

// router.get('',userController.userGetAll)
router.get('',middlewareUser.auth, userController.userHome)
router.get(':id',userController.userGetOne) 
router.put('edit',userController.userEditUser)
router.post(':id/create-comment',middlewareJournalist.auth, userController.userCreateComment)
router.post('/register', userController.userRegister)
router.post('/login', userController.userLogin)

module.exports = router