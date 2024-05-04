const express = require('express');
const router = express.Router();
const tippingController = require('./tippingController');

router.post('/', tippingController.sendTip);
router.get('/user/:fid', tippingController.getTippingHistory);
router.get('/balance/:fid', tippingController.getUserBalance);

module.exports = router;
