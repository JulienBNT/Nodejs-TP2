const express = require('express')
const router = express.Router();
const adminController = require('../controllers/adminController')
const middleware = require('../middleware/middlewareAdminAccess')

router.get('', middleware.auth, adminController.adminGetAll)
router.post('create-user', adminController.adminCreateUser)
router.post('create-techno', adminController.adminCreateTechno)
router.delete('deleteUser/:id', adminController.adminDeleteUser)
router.delete('deleteTechno/:id', adminController.adminDeleteTechno)
app.put('editUser/:id', adminController.adminModifyUser)
app.put('editTechno/:id', adminController.adminModifyTechno)

module.exports = router