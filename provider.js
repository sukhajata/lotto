//Provider Engine sub-modules

const ethers = require('ethers');
const Wallet = ethers.Wallet;
const Contract = ethers.Contract;
const utils = ethers.utils;
const providers = ethers.providers; 
const keys = require('./config/keys');
const Lottery = require('./build/contracts/Lottery.json');

//let network = "http://192.168.1.1:8545";

//let network = "kovan";
//let network = "ropsten";

//let network = "homestead";

//let provider = new providersJsonRpcProvider(network, 'homestead');

async function deploy() {
    let network = "rinkeby";
    try {
        let provider = new providers.InfuraProvider(network, keys.infura_api_key);
        
        let serverWallet = new Wallet(keys.private_key, provider);
        
        let factory = new ethers.ContractFactory(Lottery.abi, Lottery.bytecode, serverWallet);
    
        let contract = await factory.deploy();
        //console.log(contract);
   
        await contract.deployed();
        console.log(contract.address); //0x4A80E9FA9EB05eEf3cB8274e2d321614189920B6
        
    } catch (error) {
        console.log('Failed to deploy in TX:');
        console.log(error);
        throw error;
    }
}

deploy();