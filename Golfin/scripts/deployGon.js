const { ethers } = require('hardhat')

const main = async () => {
  const contractName = 'GONTOKEN'

  const contractFactory = await ethers.getContractFactory(contractName)

  const contractObject = await contractFactory.deploy()

  const contractAddress = await contractObject.getAddress()

  console.log(`\nContract deployed to :\n${contractAddress}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
