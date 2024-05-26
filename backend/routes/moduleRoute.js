const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/modulesController');

//get and add modules
router.post('/module/', moduleController.addModule);
router.get('/admin/module/', moduleController.getModulesAdmin);
router.get('/user/module/', moduleController.getModulesUser);

router.get('/admin/module/:moudleID/', moduleController.getDetailsAdmin)
router.get('/admin/module/:moudleID/', moduleController.getDetailsUser)

router.patch('/module/:moduleID/', moduleController.patchDetails);
router.delete('/module/:moduleID/', moduleController.deleteModule);

module.exports = router;