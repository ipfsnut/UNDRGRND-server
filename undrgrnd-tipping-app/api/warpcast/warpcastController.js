const axios = require('axios');

// Warpcast API URL
const WARPCAST_API_URL = process.env.WARPCAST_API_URL;

// Get user profile
exports.getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Make a request to the Warpcast API to fetch the user profile
    const response = await axios.get(`${WARPCAST_API_URL}/users/${userId}`);

    // Return the user profile data
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

// Get channel details
exports.getChannelDetails = async (req, res, next) => {
  try {
    const { channelId } = req.params;

    // Make a request to the Warpcast API to fetch the channel details
    const response = await axios.get(`${WARPCAST_API_URL}/channels/${channelId}`);

    // Return the channel details
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

// Get user following channels
exports.getUserFollowingChannels = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Make a request to the Warpcast API to fetch the channels the user is following
    const response = await axios.get(`${WARPCAST_API_URL}/users/${userId}/following/channels`);

    // Return the list of channels the user is following
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

// Check if user is following a channel
exports.isUserFollowingChannel = async (req, res, next) => {
  try {
    const { userId, channelId } = req.params;

    // Make a request to the Warpcast API to check if the user is following the channel
    const response = await axios.get(`${WARPCAST_API_URL}/users/${userId}/following/channels/${channelId}`);

    // Return the result (true or false)
    res.json({ isFollowing: response.data });
  } catch (err) {
    next(err);
  }
};
