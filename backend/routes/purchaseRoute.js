const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purTranController');

router.post('/purchase/', purchaseController.purchasePost);

module.exports = router;