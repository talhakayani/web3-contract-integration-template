import Web3 from 'web3';
import { networks } from './networksParams';

const isMetaMaskAvailable = () => {
  if (typeof window.ethereum !== 'undefined') {
    return true;
  }
  return false;
};

const getWeb3 = async () => {
  if (isMetaMaskAvailable()) {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    if (accounts?.length > 1)
      throw new Error(
        'You have to connect only one account at a time with the site. Goto MetaMask and diconnect all other accounts from this site'
      );
    return web3;
  }
};

// If Wallet is not available
// Mostly used in backend cases.
const getCustomRPCWeb3Instance = async (RPC) => {
  if (isMetaMaskAvailable()) {
    const web3Provider = new Web3.providers.HttpProvider(RPC);
    const web3 = new Web3(web3Provider);
    const accounts = await web3.eth.getAccounts();
    if (accounts?.length > 1)
      throw new Error(
        'You have to connect only one account at a time with the site. Goto MetaMask and diconnect all other accounts from this site'
      );
    return web3;
  }
};

const getChainId = async () => {
  return parseInt(await window.ethereum.request({ method: 'eth_chainId' }));
};

const addMultichainNetwork = async (networkParams) => {
  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [networkParams],
    });
  } catch (err) {
    console.log('🚀 ~ file: config.tsx ~ line 37 ~ err', err);
  }
};

const addingChainNetworkIfNotExsists = async (chainId, networkParams) => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
    return true;
  } catch (err) {
    console.error(
      'file: index.jsx ~ addingChainNetworkIfNotExsists ~ err:',
      err
    );
    if (err.code === 4902) {
      try {
        await addMultichainNetwork(networkParams);
        return true;
      } catch (err) {
        return false;
      }
    }
  }
};

const checkForMetamaskNetwork = async (selectedBlockChainType) => {
  if (!isMetaMaskAvailable()) return false;
  const chainId = await getChainId();

  // Ethereum
  if (selectedBlockChainType === 'ethereum') {
    if (process.env.REACT_APP_NETWORK !== 'devnet' && chainId !== 1) {
      return addingChainNetworkIfNotExsists('0x1', networks.ethereum.mainnet);
    }

    if (process.env.REACT_APP_NETWORK === 'devnet' && chainId !== 5) {
      return addingChainNetworkIfNotExsists('0x5', networks.ethereum.testnet);
    }
    return true;
  }

  // Binance
  if (selectedBlockChainType === 'binance') {
    if (process.env.REACT_APP_NETWORK !== 'devnet' && chainId !== 56) {
      return addingChainNetworkIfNotExsists('0x38', networks.binance.mainnet);
    }

    if (process.env.REACT_APP_NETWORK === 'devnet' && chainId !== 97) {
      return addingChainNetworkIfNotExsists('0x61', networks.binance.testnet);
    }
    return true;
  }

  // Polygon Chain
  if (selectedBlockChainType === 'polygon') {
    if (process.env.REACT_APP_NETWORK !== 'devnet' && chainId !== 137) {
      return addingChainNetworkIfNotExsists('0x89', networks.polygon.mainnet);
    }

    if (process.env.REACT_APP_NETWORK === 'devnet' && chainId !== 80001) {
      return addingChainNetworkIfNotExsists(
        '0x13881',
        networks.polygon.testnet
      );
    }
    return true;
  }

  // TODO: Custom chain copy/paste one of above condition and replce chainId and name with your chain's
};

const getAccounts = async () => {
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  return accounts;
};

const getAccountBalance = async (walletAddress, selectedBlockChainType) => {
  const web3 = await getWeb3(selectedBlockChainType);
  return web3.utils.fromWei(await web3.eth.getBalance(walletAddress));
};

const getAccountInformation = async (selectedBlockChainType, walletAddress) => {
  try {
    const accounts = await getAccounts();
    const balance = await getAccountBalance(
      walletAddress || accounts[0],
      selectedBlockChainType
    );
    return { accounts, balance };
  } catch (err) {
    console.log(
      '🚀 ~ file: config.tsx ~ line 104 ~ getAccountInformation ~ err',
      err
    );
  }
};
const connect = async (selectedBlockChainType) => {
  const data = await getAccountInformation(selectedBlockChainType);
  const wallet = {
    walletAddress: data.accounts[0],
    balance: data.balance,
  };
  return wallet;
};

const loginWithMetaMask = async (selectedBlockChainType) => {
  try {
    const networkResponse = await checkForMetamaskNetwork(
      selectedBlockChainType
    );

    if (!networkResponse) {
      return -1;
    }
    const walletInformation = await connect(selectedBlockChainType);

    // TODO:  Get Nonce With backend Intgration here

    return walletInformation;
  } catch (err) {
    console.log(
      '🚀 ~ file: config.tsx ~ line 138 ~ loginWithMetaMask ~ err',
      err
    );
  }
};

export {
  getWeb3,
  isMetaMaskAvailable,
  checkForMetamaskNetwork,
  getAccountInformation,
  connect,
  loginWithMetaMask,
  getCustomRPCWeb3Instance,
};
