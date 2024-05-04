const express = require('express');
const router = express.Router();
const tippingController = require('./tippingController');

// Send a tip
router.post('/send', tippingController.sendTip);

// Get user balance
router.get('/balance/:fid', tippingController.getUserBalance);

// Get tipping history
router.get('/history/:fid', tippingController.getTippingHistory);

module.exports = router;
