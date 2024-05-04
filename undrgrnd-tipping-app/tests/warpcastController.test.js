const { getUserProfile } = require('../api/warpcast/warpcastController'); 
const warpcastService = require('../api/warpcast/warpcastService');

// Mock request, response, and next function
const mockReq = (params) => ({
  params,
});

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = jest.fn();

describe('getUserProfile controller', () => {
  it('should fetch user profile from Warpcast API and respond with status 200', async () => {
    // Mock parameters
    const fid = '1234';
    const req = mockReq({ fid });
    const res = mockRes();

    // Mock getUserProfile function from warpcastService
    const mockUserProfile = { username: 'testuser', displayName: 'Test User' };
    warpcastService.getUserProfile = jest.fn().mockResolvedValue(mockUserProfile);

    // Call the controller function
    await getUserProfile(req, res, mockNext);

    // Check if warpcastService.getUserProfile is called with the correct parameter
    expect(warpcastService.getUserProfile).toHaveBeenCalledWith(fid);

    // Check if response status is set to 200 and json is called with the correct data
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUserProfile);

    // Check if next function is not called (no errors occurred)
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should handle errors by calling next function', async () => {
    // Mock parameters
    const fid = '1234';
    const req = mockReq({ fid });
    const res = mockRes();

    // Mock error
    const mockError = new Error('Test error');
    warpcastService.getUserProfile = jest.fn().mockRejectedValue(mockError);

    // Call the controller function
    await getUserProfile(req, res, mockNext);

    // Check if next function is called with the error
    expect(mockNext).toHaveBeenCalledWith(mockError);

    // Check if response status and json are not called
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
