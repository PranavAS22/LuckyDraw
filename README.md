# 🎲 LuckyDraw - Web3 Lottery DApp

LuckyDraw is a decentralized lottery application built with Solidity, React.js, and Hardhat. Participants can join the lottery using MetaMask, and once the maximum number of players is reached, a random winner is selected automatically and rewarded.

---

## 🚀 Features

- Connect wallet using MetaMask
- Enter the raffle by paying a small ETH fee (0.01 ETH)
- Automatically pick a winner when the max limit is reached
- Display current participants and past winners
- Fully deployed smart contract on the blockchain

---

## 🛠️ Tech Stack

- **Frontend:** React.js + Tailwind CSS  
- **Smart Contract:** Solidity (0.8.18)  
- **Blockchain Tools:** Hardhat, Ethers.js  
- **Wallet Integration:** MetaMask  
- **Network:** (Sepolia Testnet)

---

## 📂 Project Structure

root/
├── contracts/ # Solidity smart contracts
├── scripts/ # Deployment scripts
├── test/ # Contract tests
├── frontend/ # React.js frontend
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── contract/
│ │ └── App.jsx
├── hardhat.config.js # Hardhat configuration
└── README.md # Project readme


## ⚙️ How to Run Locally

### 📦 Prerequisites

- Node.js & npm
- MetaMask browser extension
- Hardhat installed globally:  
  ```bash
  npm install --save-dev hardhat

  git clone https://github.com/yourusername/LuckyDraw.git

  cd LuckyDraw

  npm install
