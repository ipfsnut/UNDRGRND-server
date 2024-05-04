const warpcastService = require('./warpcastService');

// Get user profile
exports.getUserProfile = async (req, res, next) => {
  try {
    const { fid } = req.params;

    // Fetch user profile from Warpcast API
    const userProfile = await warpcastService.getUserProfile(fid);

    res.status(200).json(userProfile);
  } catch (err) {
    next(err);
  }
};

// Get channel details
exports.getChannelDetails = async (req, res, next) => {
  try {
    const { channelId } = req.params;

    // Fetch channel details from Warpcast API
    const channelDetails = await warpcastService.getChannelDetails(channelId);

    res.status(200).json(channelDetails);
  } catch (err) {
    next(err);
  }
};

// Get user's following channels
exports.getUserFollowingChannels = async (req, res, next) => {
  try {
    const { fid } = req.params;

    // Fetch user's following channels from Warpcast API
    const followingChannels = await warpcastService.getUserFollowingChannels(fid);

    res.status(200).json(followingChannels);
  } catch (err) {
    next(err);
  }
};

// Check if user is following a channel
exports.isUserFollowingChannel = async (req, res, next) => {
  try {
    const { fid, channelId } = req.params;

    // Check if user is following the channel using Warpcast API
    const isFollowing = await warpcastService.isUserFollowingChannel(fid, channelId);

    res.status(200).json({ isFollowing });
  } catch (err) {
    next(err);
  }
};
