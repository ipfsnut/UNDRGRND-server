const axios = require('axios');

const WARPCAST_API_URL = process.env.WARPCAST_API_URL;

/**
 * Fetch user profile data from the Warpcast API.
 *
 * @param {string} userId - The user's Farcaster ID.
 * @returns {Promise<Object>} The user profile data.
 */
const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${WARPCAST_API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

/**
 * Fetch channel details from the Warpcast API.
 *
 * @param {string} channelId - The channel ID.
 * @returns {Promise<Object>} The channel details.
 */
const getChannelDetails = async (channelId) => {
  try {
    const response = await axios.get(`${WARPCAST_API_URL}/channels/${channelId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching channel details:', error);
    throw error;
  }
};

/**
 * Fetch the list of channels a user is following from the Warpcast API.
 *
 * @param {string} userId - The user's Farcaster ID.
 * @returns {Promise<Object[]>} The list of channels the user is following.
 */
const getUserFollowingChannels = async (userId) => {
  try {
    const response = await axios.get(`${WARPCAST_API_URL}/users/${userId}/following/channels`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user following channels:', error);
    throw error;
  }
};

/**
 * Check if a user is following a specific channel based on the Warpcast API data.
 *
 * @param {string} userId - The user's Farcaster ID.
 * @param {string} channelId - The channel ID.
 * @returns {Promise<boolean>} True if the user is following the channel, false otherwise.
 */
const isUserFollowingChannel = async (userId, channelId) => {
  try {
    const followingChannels = await getUserFollowingChannels(userId);
    return followingChannels.some((channel) => channel.id === channelId);
  } catch (error) {
    console.error('Error checking if user is following channel:', error);
    throw error;
  }
};

module.exports = {
  getUserProfile,
  getChannelDetails,
  getUserFollowingChannels,
  isUserFollowingChannel,
};
