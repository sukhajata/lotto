const Lottery = artifacts.require("Lottery");

module.exports = function(deployer) {
    const result = deployer.deploy(Lottery);
    console.log(result);
}