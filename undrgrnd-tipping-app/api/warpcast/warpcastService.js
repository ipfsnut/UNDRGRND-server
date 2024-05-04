const axios = require('axios');

// Fetch user profile from Warpcast API
const getUserProfile = async (fid) => {
  try {
    const response = await axios.get(`${process.env.WARPCAST_API_URL}/users/${fid}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching user profile:', err);
    throw err;
  }
};

// Fetch channel details from Warpcast API
const getChannelDetails = async (channelId) => {
  try {
    const response = await axios.get(`${process.env.WARPCAST_API_URL}/channels/${channelId}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching channel details:', err);
    throw err;
  }
};

// Fetch user's following channels from Warpcast API
const getUserFollowingChannels = async (fid) => {
  try {
    const response = await axios.get(`${process.env.WARPCAST_API_URL}/users/${fid}/following`);
    return response.data;
  } catch (err) {
    console.error('Error fetching user following channels:', err);
    throw err;
  }
};

// Check if user is following a channel on Warpcast API
const isUserFollowingChannel = async (fid, channelId) => {
  try {
    const response = await axios.get(`${process.env.WARPCAST_API_URL}/users/${fid}/following/${channelId}`);
    return response.data.isFollowing;
  } catch (err) {
    console.error('Error checking if user is following channel:', err);
    throw err;
  }
};

module.exports = {
  getUserProfile,
  getChannelDetails,
  getUserFollowingChannels,
  isUserFollowingChannel,
};
