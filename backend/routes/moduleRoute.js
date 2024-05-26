const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/modulesController');

//get and add modules
router.post('/module/', moduleController.addModule);
router.get('/admin/module/', moduleController.getModulesAdmin);
router.get('/user/module/', moduleController.getModulesUser);

router.get('/module/:moduleID/', moduleController.getDetails);
router.patch('/module/:moduleID/', moduleController.patchDetails);

router.delete('/module/:moduleID/', moduleController.deleteModule);

//for lessons
router.post('/:moduleID/lesson', moduleController.lessonPost);

module.exports = router;