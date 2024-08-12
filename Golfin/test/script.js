const {
  time,
  loadFixture
} = require('@nomicfoundation/hardhat-network-helpers')
const { anyValue } = require('@nomicfoundation/hardhat-chai-matchers/withArgs')
const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('FAKT token test', function () {
  let fakt
  let owner, ownerBalance, ownerAllowance
  let user1, user1Balance, user1Allowance
  let user2, user2Balance, user2Allowance
  let user3, user3Balance, user3Allowance
  let hacker, hackerBalance, hackerAllowance
  let name, symbol, decimals, totalSupply

  const getBalance = async (account) => {
    return Number((await fakt.balanceOf(account)) / BigInt(10 ** decimals))
  }

  const getAllowance = async (from, to) => {
    return Number((await fakt.allowance(from, to)) / BigInt(10 ** decimals))
  }

  it('Token deployment', async () => {
    ;[owner, user1, user2, user3, hacker] = await ethers.getSigners()
    const faktFactory = await ethers.getContractFactory('MEDIFAKT')
    fakt = await faktFactory.deploy()
    await fakt.waitForDeployment()
    expect(fakt.runner.address).to.equal(owner.address)
    expect(fakt.target).to.be.a('string')
  })

  describe('Read functions test', () => {
    it('name match', async () => {
      name = await fakt.name()
      expect(name).to.equal('MEDIFAKT')
    })

    it('symbol match', async () => {
      symbol = await fakt.symbol()
      expect(symbol).to.equal('FAKT')
    })

    it('decimals match', async () => {
      decimals = Number(await fakt.decimals())
      expect(decimals).to.equal(18)
    })

    it('owner address', async () => {
      const ownerAddress = await fakt.owner()
      expect(ownerAddress).to.equal(owner.address)
    })

    it('total supply', async () => {
      totalSupply = Number((await fakt.totalSupply()) / BigInt(10 ** decimals))
      expect(totalSupply).to.equal(999999999)
    })

    it('Owner balance', async () => {
      ownerBalance = Number(
        (await fakt.balanceOf(owner.address)) / BigInt(10 ** 18)
      )
      expect(ownerBalance).to.equal(totalSupply)
    })

    it('Owner Allowance', async () => {
      ownerAllowance = Number(
        (await fakt.allowance(owner.address, user1.address)) / BigInt(10 ** 18)
      )
      expect(ownerAllowance).to.equal(0)
    })

    it('Contract is unpaused', async () => {
      const state = await fakt.paused()
      expect(state).to.equal(false)
    })
  })

  describe('Write functions test', () => {
    it('mint by owner', async () => {
      const mintAmount = BigInt(10 ** decimals)
      const tx = await fakt.connect(owner).mint(mintAmount)
      await tx.wait()

      const ownerBalance = await getBalance(owner.address)
      expect(ownerBalance).to.equal(1000000000)
    })

    it('burn from owner', async () => {
      const burnAmount = BigInt(10 ** decimals)
      const tx = await fakt.connect(owner).burn(burnAmount)
      await tx.wait()

      const ownerBalance = await getBalance(owner.address)
      expect(ownerBalance).to.equal(999999999)
    })

    it('approve', async () => {
      const amount = BigInt(100 * 10 ** decimals)
      const tx = await fakt.connect(owner).approve(user1.address, amount)
      await tx.wait()

      const allowance = await getAllowance(owner.address, user1.address)
      expect(allowance).to.equal(100)
    })

    it('increase allowance', async () => {
      const addedAmount = BigInt(900 * 10 ** decimals)
      const tx = await fakt
        .connect(owner)
        .increaseAllowance(user1.address, addedAmount)
      await tx.wait()

      const addedAllowance = Number(
        (await fakt.allowance(owner.address, user1.address)) /
          BigInt(10 ** decimals)
      )
      expect(addedAllowance).to.equal(1000)
    })

    it('decrease allowance', async () => {
      const removedAmount = BigInt(1000 * 10 ** decimals)
      const tx = await fakt
        .connect(owner)
        .decreaseAllowance(user1.address, removedAmount)
      await tx.wait()

      const removedAllowance = Number(
        (await fakt.allowance(owner.address, user1.address)) /
          BigInt(10 ** decimals)
      )
      expect(removedAllowance).to.equal(0)
    })

    it('transfer', async () => {
      const amount = BigInt(100 * 10 ** decimals)
      const tx = await fakt.connect(owner).transfer(user1.address, amount)
      await tx.wait()

      const balanceFrom = await getBalance(owner.address)
      const balanceTo = await getBalance(user1.address)

      expect(balanceFrom).to.equal(999999899)
      expect(balanceTo).to.equal(100)
    })

    it('transferFrom', async () => {
      const amount = BigInt(30 * 10 ** decimals)
      const tx1 = await fakt.connect(user1).approve(owner.address, amount)
      await tx1.wait()
      const tx2 = await fakt
        .connect(owner)
        .transferFrom(user1.address, user2.address, amount)
      await tx2.wait()

      const balanceUser1 = await getBalance(user1.address)
      const balanceUser2 = await getBalance(user2.address)
      const allowance = await getAllowance(user1.address, owner.address)
      expect(balanceUser1).to.equal(70)
      expect(balanceUser2).to.equal(30)
      expect(allowance).to.equal(0)
    })
  })
})
