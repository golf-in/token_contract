require('@nomicfoundation/hardhat-toolbox')
require('@openzeppelin/hardhat-upgrades')
require('hardhat-contract-sizer')
require('dotenv').config()
require("@nomicfoundation/hardhat-verify");


/**
 * @dev Get the gas provider - deployer
 */
const PRIVATE_KEY = ""

/**
 * @dev Get explorer API keys.
 */
const ETHERSCAN_API_KEY = "VTSAHFUXDCSJ3ZKSYI86F8SFPBUEQ767B2"
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY

/**
 * @dev Get the mainnet RPC urls.
 */
const ETHEREUM_RPC_URL = "https://ethereum.blockpi.network/v1/rpc/5c99352ef58b30ddeab7b85729199df03717b329"
const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL

/**
 * @dev Get the testnet RPC urls.
 */
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const SEPOLIA_RPC_URL ="https://ethereum-sepolia-rpc.publicnode.com"
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL

/**
 * @dev Export the configuration.
 */
module.exports = {
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
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

    sepolia: {
      url: SEPOLIA_RPC_URL,
      chainId: 11155111,
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