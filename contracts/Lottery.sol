pragma solidity ^0.4.18;

contract Lottery {
    address public manager;
    address[] public players;
    
    event LotteryDrawnEvent(address winner, uint gains);
    event PlayerEnteredEvent(address player, uint pool);

    bool public lotteryOpen;

    constructor() public {
        manager = msg.sender;
        lotteryOpen = true;
    }

    function enter() public payable {
        require(lotteryOpen);
        require(msg.value > .02 ether);

        players.push(msg.sender);

        emit PlayerEnteredEvent(msg.sender, address(this).balance);
    }

    function pickWinner(uint randomNumber) public restricted {
        require(players.length > 0);
        lotteryOpen = false;
        uint winningIndex = randomNumber % players.length;
        uint gains = address(this).balance;
        players[winningIndex].transfer(address(this).balance);

        emit LotteryDrawnEvent(players[winningIndex], gains);
        
        players = new address[](0);
        //lotteryOpen = true;
        //uint index = random() % players.length;
        //players[index].transfer(this.balance);
        //players = new address[](0);
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
}