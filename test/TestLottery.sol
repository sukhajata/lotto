pragma solidity ^0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Lottery.sol";

contract TestLottery {

    Lottery lotto = Lottery(DeployedAddresses.Lottery());

    function testInitialBalanceUsingDeployedContract() public {
        uint expected = 0;

        Assert.equal(lotto.getBalance(), expected, "Initial balance should be zero");
    }

    function testEnterWithWrongValue() public {
        address[] memory players = lotto.getPlayers();
        lotto.enter();
        address[] memory players2 = lotto.getPlayers();
        Assert.equal(players.length, players2.length, "No player was added");
        
    }

}
