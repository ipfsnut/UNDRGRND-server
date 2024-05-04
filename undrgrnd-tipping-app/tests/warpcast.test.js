const axios = require('axios');
const warpcastService = require('../api/warpcast/warpcastService');

jest.mock('axios');

describe('Warpcast Service', () => {
  describe('getUserProfile', () => {
    it('should fetch user profile from Warpcast API', async () => {
      const fid = '1234';
      const mockResponse = { data: { username: 'testuser', displayName: 'Test User' } };
      axios.get.mockResolvedValueOnce(mockResponse);

      const userProfile = await warpcastService.getUserProfile(fid);

      expect(axios.get).toHaveBeenCalledWith(`${process.env.WARPCAST_API_URL}/users/${fid}`);
      expect(userProfile).toEqual(mockResponse.data);
    });
  });

  describe('getChannelDetails', () => {
    it('should fetch channel details from Warpcast API', async () => {
      const channelId = 'abc123';
      const mockResponse = { data: { name: 'Test Channel', description: 'This is a test channel' } };
      axios.get.mockResolvedValueOnce(mockResponse);

      const channelDetails = await warpcastService.getChannelDetails(channelId);

      expect(axios.get).toHaveBeenCalledWith(`${process.env.WARPCAST_API_URL}/channels/${channelId}`);
      expect(channelDetails).toEqual(mockResponse.data);
    });
  });

  // Add more test cases for other functions in warpcastService
});
