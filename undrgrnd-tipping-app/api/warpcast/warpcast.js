const express = require('express');
const router = express.Router();
const warpcastController = require('./warpcastController');

// Get user profile
router.get('/user/:fid', warpcastController.getUserProfile);

// Get channel details
router.get('/channel/:channelId', warpcastController.getChannelDetails);

// Get user's following channels
router.get('/user/:fid/following', warpcastController.getUserFollowingChannels);

// Check if user is following a channel
router.get('/user/:fid/following/:channelId', warpcastController.isUserFollowingChannel);

module.exports = router;
