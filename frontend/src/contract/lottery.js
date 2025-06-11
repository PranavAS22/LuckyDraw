import { ethers } from "ethers";

const contractAddress = "0x5b95431A99588A0EEA9F7Be88F77745156AAe45C";

const abi = [
  "constructor(uint256 _maxPlayers)",
  "function enterRaffle() public payable",
  "function getPlayers() public view returns (address[])",
  "function getWinners() public view returns (address[])",
  "function recentWinner() public view returns (address)",
  "function maxPlayers() public view returns (uint256)",

];

export const getLotteryContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not found");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(contractAddress, abi, signer);
};
