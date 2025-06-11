// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Lottery {
    address public manager;
    address[] public players;
    address public recentWinner;
    uint public maxPlayers;

    address[] public winnersHistory;

    constructor(uint _maxPlayers) {
        manager = msg.sender;
        maxPlayers = _maxPlayers;
    }

    function enterRaffle() public payable {
        require(msg.value == 0.001 ether, "Entry fee is 0.001 ETH");
        require(players.length < maxPlayers, "Raffle is full");

        players.push(msg.sender);

        if (players.length == maxPlayers) {
            pickWinner();
        }
    }

    function pickWinner() private {
        uint index = random() % players.length;az
        recentWinner = players[index];
        winnersHistory.push(recentWinner);
        
        payable(recentWinner).transfer(address(this).balance);
        delete players;
    }

    function random() private view returns (uint) {
        return uint(
            keccak256(abi.encodePacked(block.prevrandao, players))
        );
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    function getWinners() public view returns (address[] memory) {
        return winnersHistory;
    }
}
