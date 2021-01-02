const assert = require('assert');
//const ganache = require('ganache-cli');
//const Web3 = require('web3');
//const web3 = new Web3(ganache.provider());

const Lottery = artifacts.require("Lottery");

contract('Lottery Contract', async (accounts) => {
    let lottery;

    beforeEach(async () => {
        lottery = await Lottery.deployed();

        /*register for events
        lottery.PlayerEnteredEvent().watch((error, result) => {
            if (error)
                console.log('Error in event handler: ' + error);
            else
                console.log('PlayerEnteredEvent: ' + JSON.stringify(result.args));
        });
        lottery.LotteryDrawnEvent().watch((error, result) => {
            if (error) {
                console.log('Error in event handler: ' + error);
            } else {
                //assert(result.args[1] > 0);
                console.log(result.args);
            }
        });
        */
    });

    it('Initial balance is zero', async () => {
        //let lottery = await Lottery.deployed();
        //console.log(lottery);
        const balance = await lottery.getBalance();
        assert.equal(balance, 0, "Initial balance is not zero");
        //assert.ok(lottery);
    });

    it('allows one account to enter', async () => {

        await lottery.enter.sendTransaction({
            from: accounts[0],
            value: 2.01e+16
            });

            const players = await lottery.getPlayers();

            assert.equal(accounts[0], players[0]);
            assert.equal(1, players.length);
        });

    it('allows multiple accounts to enter', async () => {
        //let lottery = await Lottery.deployed();
        await lottery.enter.sendTransaction({
            from: accounts[1],
            value: 2.01e+16
        });
        await lottery.enter.sendTransaction({
            from: accounts[2],
            value: 2.01e+16
        });
        await lottery.enter.sendTransaction({
            from: accounts[3],
            value: 2.01e+16
        });

        const players = await lottery.getPlayers();

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(4, players.length);
    });

    it('requires a minimum amount of ether to enter', async () => {
        //let lottery = await Lottery.deployed();
        try {
            await lottery.enter.sendTransaction({
                from: accounts[3],
                value: 0
            });
            const players = await lottery.getPlayers();
            assert.equal(4, players.length);
        } catch (err) {
            assert(err);
        }
    });

    it('only manager can call pickWinner', async () => {
        try {
            await lottery.pickWinner(24234234, {from: accounts[6]});
            const isOpen = await lottery.lotteryOpen();
            assert(isOpen, "lottery should still be open");
        } catch (err) {
            assert(err);
        }
    });

    it('close the lottery and resets the players array', async () => {
        const manager = await lottery.manager();
        await lottery.pickWinner(23423423, { from: manager });
        const isOpen = await lottery.lotteryOpen();
        assert(!isOpen, "lottery should be closed");
        const players = await lottery.getPlayers();
        assert.equal(0, players.length);
    });

});