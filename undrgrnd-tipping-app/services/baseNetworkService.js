const { ethers } = require('ethers');

// Connect to the Base network
const connectToBaseNetwork = async () => {
  try {
    // Create a new Ethereum provider using the Base network RPC URL
    const provider = new ethers.providers.JsonRpcProvider(process.env.BASE_NETWORK_RPC_URL);

    return provider;
  } catch (err) {
    console.error('Error connecting to Base network:', err);
    throw err;
  }
};

// Send a transaction to the Base network
const sendTransaction = async (signedTransaction) => {
  try {
    // Connect to the Base network
    const provider = await connectToBaseNetwork();

    // Send the signed transaction to the Base network
    const txResponse = await provider.sendTransaction(signedTransaction);

    // Wait for the transaction to be mined
    const receipt = await txResponse.wait();

    // Return the transaction hash
    return receipt.transactionHash;
  } catch (err) {
    console.error('Error sending transaction:', err);
    throw err;
  }
};

// Get user's $GRND balance
const getUserBalance = async (baseAddress) => {
  try {
    // Connect to the Base network
    const provider = await connectToBaseNetwork();

    // Get the user's $GRND balance
    const balance = await provider.getBalance(baseAddress);

    // Convert the balance from Wei to $GRND
    const grndBalance = ethers.utils.formatEther(balance);

    return grndBalance;
  } catch (err) {
    console.error('Error getting user balance:', err);
    throw err;
  }
};

module.exports = {
  connectToBaseNetwork,
  sendTransaction,
  getUserBalance,
};
