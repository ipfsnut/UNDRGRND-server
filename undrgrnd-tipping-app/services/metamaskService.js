const { ethers } = require('ethers');

// Connect to Metamask
const connectToMetamask = async () => {
  try {
    // Request access to the user's Metamask wallet
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Create a new Ethereum provider using the Metamask provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    return provider;
  } catch (err) {
    console.error('Error connecting to Metamask:', err);
    throw err;
  }
};

// Get user's Ethereum address
const getUserAddress = async (provider) => {
  try {
    // Get the list of accounts from Metamask
    const accounts = await provider.listAccounts();

    // Return the first account (assuming only one account is used)
    return accounts[0];
  } catch (err) {
    console.error('Error getting user address:', err);
    throw err;
  }
};

// Sign a transaction
const signTransaction = async (provider, senderAddress, recipientAddress, amount) => {
  try {
    // Create a new Ethereum wallet instance using the sender's address
    const senderWallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    // Create the transaction object
    const tx = {
      to: recipientAddress,
      value: ethers.utils.parseEther(amount.toString()),
      gasLimit: 21000, // Adjust as needed
      gasPrice: ethers.utils.parseUnits('10', 'gwei'), // Adjust as needed
    };

    // Sign the transaction
    const signedTx = await senderWallet.signTransaction(tx);

    return signedTx;
  } catch (err) {
    console.error('Error signing transaction:', err);
    throw err;
  }
};

module.exports = {
  connectToMetamask,
  getUserAddress,
  signTransaction,
};
