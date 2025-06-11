import { useEffect, useState } from "react";
import { getLotteryContract } from "./contract/lottery";
import { ethers } from "ethers";
import LuckyBanner from './assets/LuckyBanner.png';


function App() {
  const [wallet, setWallet] = useState("");
  const [players, setPlayers] = useState([]);
  const [winner, setWinner] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(0);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWallet(accounts[0]);
      fetchDetails();
    } catch (err) {
      alert("Please install or unlock MetaMask!");
    }
  };

  const fetchDetails = async () => {
    const contract = await getLotteryContract();
    const _players = await contract.getPlayers();
    const _winner = await contract.recentWinner();
    const _maxPlayers = await contract.maxPlayers();

    setPlayers(_players);
    setWinner(_winner);
    setMaxPlayers(Number(_maxPlayers));
  };

  const enterRaffle = async () => {
    setLoading(true);
    try {
      const contract = await getLotteryContract();
      const tx = await contract.enterRaffle({
        value: ethers.parseEther("0.001"),
      });
      await tx.wait();
      alert("You entered the raffle!");
      fetchDetails();
    } catch (err) {
      console.error(err);
      alert("Transaction failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (wallet) fetchDetails();
  }, [wallet]);

  return (
    <>
    <div className="px-4 py-8 border-b-2 mx-8">
    <h1 className="text-4xl font-sans font-bold">LuckyDraw</h1>
    </div>

    <div className="w-[90%] mx-auto my-8">
      <img src={LuckyBanner}></img>
    </div>
    

      {!wallet ? (
        <div className="flex justify-center">
          <button
            onClick={connectWallet}
            className="bg-black hover:bg-[#af8367] text-white  px-4 py-2 "
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <>
        <div className="flex flex-col md:flex-row mx-[5%] w-[90] gap-4 overflow-none">

  <div className="p-4 border-2 border-black w-full md:w-1/2">
    <p className="mb-4 text-xl">Wallet Connected: {wallet}</p>
    <div className="text-center">
      <button
        onClick={enterRaffle}
        disabled={loading}
        className="bg-black hover:bg-[#af8367] text-white px-5 py-2 disabled:opacity-50"
      >
        {loading ? "Entering..." : "Enter Raffle (0.001 ETH)"}
      </button>
    </div>
  </div>

  <div className="p-4 border-2 border-black w-full md:w-1/2">
    <p className="mb-4 text-2xl">
      Players Joined: {players.length} / {maxPlayers}
    </p>
     <h2 className="text-xl font-semibold mb-2 border-b pb-1 border-gray-600">
              Current Participants
            </h2>
            <ul className="list-disc ml-5 ">
              {players.length === 0 && <li>No players yet</li>}
              {players.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
  </div>

</div>
      <div className="mt-[20px] mb-[200px] p-4 border-2 border-black mx-[5%] w-[90%]">
        <h2 className="text-xl font-semibold mt-4 border-b pb-1 border-gray-600">
                    Last Winner
                  </h2>
                  <p className="text-black">{winner || "No winner yet"}</p>
      </div>

          
        </>
      )}
    </>
  );
}

export default App;
