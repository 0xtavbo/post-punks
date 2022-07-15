const { expect } = require("chai");
const { ethers } = require("hardhat");
const { beforeEach } = require("mocha");

describe("Post Punks test", () => {
  let testPunksContract;
  let owner;
  let address1;

  beforeEach(async () => {
    const TestPunksFactory = await ethers.getContractFactory("PostPunks");
    [owner, address1] = await ethers.getSigners();
    testPunksContract = await TestPunksFactory.deploy("TestPunks", "TPUNK");
  });

  it("Should initialize the Test Punks contract", async () => {
    expect(await testPunksContract.name()).to.equal("TestPunks");
    expect(await testPunksContract.symbol()).to.equal("TPUNK");
  });

  it("Should set the right owner", async () => {
    expect(await testPunksContract.owner()).to.equal(await owner.address);
  });

  it("Should mint an NFT", async () => {
    const initialBalance = await testPunksContract.balanceOf(owner.address);
    expect(initialBalance).to.equal(0);

    await testPunksContract.connect(owner).mint(owner.address, 30, { value: ethers.utils.parseEther("0.3") });
  
    const finalBalance = await testPunksContract.balanceOf(owner.address);
    expect(finalBalance).to.equal(30);
    
    expect(await testPunksContract.totalSupply()).to.equal(30);
  })
});