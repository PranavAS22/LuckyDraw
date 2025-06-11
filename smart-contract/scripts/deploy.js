const hre = require("hardhat");

async function main() {
  const Lottery = await hre.ethers.getContractFactory("Lottery");
  const lottery = await Lottery.deploy(2); //inside the bracket the number of entries allowed

  await lottery.waitForDeployment();

  // Works with both ethers v5 and v6 (Hardhat wraps address)
  const address = lottery.target || lottery.address;

  console.log(`✅ Contract deployed at: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
