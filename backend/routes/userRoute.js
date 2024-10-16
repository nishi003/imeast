const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/currentuser/', userController.currentuser);
router.post('/admin/signup/', userController.adminSignup);


router.post('/user/signup/', userController.userSignup);
router.post('/login/', userController.login);

router.get('/user/', userController.user);
router.post('/user/purchases/', userController.userPurchases);
router.get('/user/:userID/', userController.userDetails);
router.patch('/user/:userID/', userController.userPatch);

module.exports = router;