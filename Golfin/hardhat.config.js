require('@nomicfoundation/hardhat-toolbox')
require('@openzeppelin/hardhat-upgrades')
require('hardhat-contract-sizer')
require('dotenv').config()

/**
 * @dev Get the gas provider - deployer
 */
const PRIVATE_KEY = process.env.PRIVATE_KEY

/**
 * @dev Get explorer API keys.
 */
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY

/**
 * @dev Get the mainnet RPC urls.
 */
const ETHEREUM_RPC_URL = process.env.ETHEREUM_RPC_URL
const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL

/**
 * @dev Get the testnet RPC urls.
 */
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL

/**
 * @dev Export the configuration.
 */
module.exports = {
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY
  },

  solidity: {
    compilers: [
      {
        version: '0.8.0',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },

  networks: {
    ethereum: {
      url: ETHEREUM_RPC_URL,
      chainId: 1,
      accounts: [PRIVATE_KEY]
    },

    polygon: {
      url: POLYGON_RPC_URL,
      chainId: 137,
      accounts: [PRIVATE_KEY]
    },

    goerli: {
      url: GOERLI_RPC_URL,
      chainId: 5,
      accounts: [PRIVATE_KEY]
    },

    sepolia: {
      url: SEPOLIA_RPC_URL,
      chainId: 11155111,
      accounts: [PRIVATE_KEY]
    },

    mumbai: {
      url: MUMBAI_RPC_URL,
      chainId: 80001,
      accounts: [PRIVATE_KEY]
    }
  },

  gasReporter: {
    enabled: true
  },

  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true
  }
}