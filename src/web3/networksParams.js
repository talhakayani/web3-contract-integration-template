export const networks = {
  // TODO: Please copy and paste the template below, replacing the placeholder text with the details of your chain:
  /**

    CHAIN_MAINNET_TITLE: {
    mainnet: {
      chainId: 'CHAIN_MAINNET_ID_IN_HEX',
      chainName: 'CHAIN_MAINNET_TITLE_FOR_WALLET',
      nativeCurrency: {
        name: 'CHAIN_MAINNET_CURRENCY_NAME',
        symbol: 'CHAIN_MAINNET_CURRENCY_SYMBOL',
        decimals: CHAIN_MAINNET_CURRECNY_DECIMALS,
      },
      rpcUrls: ["CHAIN_MAINNET_RPC_URL"],
      blockExplorerUrls: ['CHAIN_MAINNET_BLOCK_EXPOLOER_URL'],
    },
    testnet: {
      chainId: 'CHAIN_TESTNET_ID_IN_HEX',
      chainName: 'CHAIN_TESTNET_TITLE_FOR_WALLET',
      nativeCurrency: {
        name: 'CHAIN_TESTNET_CURRENCY_NAME',
        symbol: 'CHAIN_TESTNET_CURRENCY_SYMBOL',
        decimals: CHAIN_TESTNET_CURRECNY_DECIMALS,
      },
      rpcUrls: ["CHAIN_TESTNET_RPC_URL"],
      blockExplorerUrls: ['CHAIN_TESTNET_BLOCK_EXPOLOER_URL'],
    },
  },

  */
  ethereum: {
    mainnet: {
      chainId: '0x1',
      chainName: 'Ethereum Mainnet',
      nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 1,
      },
      rpcUrls: ['https://mainnet.infura.io/v3/'],
      blockExplorerUrls: ['https://etherscan.io'],
    },
    testnet: {
      chainId: '0x5',
      chainName: 'Goerli Testnet',
      nativeCurrency: {
        name: 'Goerli Ethereum',
        symbol: 'GoerliETH',
        decimals: 5,
      },
      rpcUrls: ['https://goerli.infura.io/v3/'],
      blockExplorerUrls: ['https://goerli.etherscan.io'],
    },
  },
  binance: {
    mainnet: {
      chainId: '0x38',
      chainName: 'Binance Mainnet',
      nativeCurrency: {
        name: 'Binance',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: ['https://bsc-dataseed.binance.org/'],
      blockExplorerUrls: ['https://bscscan.com'],
    },
    testnet: {
      chainId: '0x61',
      chainName: 'Binance Testnet',
      nativeCurrency: {
        name: 'Binance',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
      blockExplorerUrls: ['https://testnet.bscscan.com'],
    },
  },
  polygon: {
    mainnet: {
      chainId: '0x89',
      chainName: 'Polygon Mainnet',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: ['https://polygon-rpc.com/'],
      blockExplorerUrls: ['https://polygonscan.com/'],
    },
    testnet: {
      chainId: '0x13881',
      chainName: 'Polygon Testnet',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: [
        'https://polygon-mumbai.infura.io/v3/7a9d2a7b9c6f459ea3cddcd3a917c460',
      ],
      blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    },
  },
};
