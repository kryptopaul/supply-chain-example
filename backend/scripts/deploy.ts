import { ethers } from "hardhat";

async function main() {


  console.log("Starting deployment...");
  const SupplyChainGreenwich = await ethers.getContractFactory("SupplyChainGreenwich");
  const supplyChainGreenwich = await SupplyChainGreenwich.deploy();

  await supplyChainGreenwich.deployed();
  console.log("SupplyChainGreenwich deployed to:", supplyChainGreenwich.address);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
