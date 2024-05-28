const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/modulesController');

router.post('/', moduleController.createModule);

router.get('/list/admin/', moduleController.retrieveModuleListAdmin);
router.get('/user/module/', moduleController.retrieveModuleListUser);

router.get('/:moduleID/', moduleController.retrieveModule);
router.patch('/:moduleID/', moduleController.patchModule);
router.delete('/:moduleID/', moduleController.destroyModule);

module.exports = router;