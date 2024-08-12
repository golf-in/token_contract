# Hardhat Standard Environment

This project demonstrates a standard Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

````Get Started
npm install

```Compilation
npx hardhat compile

```Depolyment
npx hardhat run scripts/deploy.js --network <NETWORK_NAME>
npx hardhat run scripts/deployProxy.js --network <NETWORK_NAME>

```Verification
npx hardhat verify <ADDRESS> --network <NETWORK_NAME>

```Test
npx hardhat test
npx hardhat test test/script.js

--ENV File Structure

ETHERSCAN_API_KEY   = <YOUR SCAN API KEY>

ETHEREUM_RPC_URL    = "https://rpc.ankr.com/eth"

GOERLI_RPC_URL      = "https://rpc.ankr.com/eth_goerli"
SEPOLIA_RPC_URL     = "https://eth-sepolia.g.alchemy.com/v2/3ltQ_39-Ih6EU5-082Qdv5Qg8v4hjriP"

PRIVATE_KEY         = <YOUR WALLET PRIVATE KEY>
````
