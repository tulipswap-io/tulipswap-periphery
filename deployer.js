'use strict';
const fs = require('fs');
const HDWalletProvider = require('truffle-hdwallet-provider');

const TulipRouter02 = require('./build/TulipRouter02.json');
const WOETH = require('./buildV1/WOETH.json');
const IERC20 = require('./buildFactory/IERC20.json');
const ITulipFactory = require('./buildFactory/ITulipFactory.json');


function get_data(_message) {
  return new Promise(function(resolve, reject) {
      fs.readFile('./installation_data.json', (err, data) => {
          if (err) throw err;
          resolve(data);
      });
  });
}

function write_data(_message) {
  return new Promise(function(resolve, reject) {
      fs.writeFile('./installation_data.json', _message, (err) => {
          if (err) throw err;
          console.log('Data written to file');
          resolve();
      });
  });
}

var privateKeys = [];
var URL = "";

(async () => {
  // Read in the configuration information
  var data = await get_data();
  var data_object = JSON.parse(data);
  // Add keys
  console.log("Adding Alice key ...");
  privateKeys.push(data_object.private_key.alice);
  // RPC
  URL = data_object.provider.rpc_endpoint;

  // Web3 - keys and accounts
  const Web3 = require("web3");
  const provider = new HDWalletProvider(privateKeys, URL, 0, 1);
  const web3 = new Web3(provider);
  await web3.eth.net.isListening();
  console.log('Web3 is connected.');
  console.log("Private keys: " + privateKeys);
  let accounts = await web3.eth.getAccounts();
  console.log(`accounts: ${JSON.stringify(accounts)}`);

  let woETH;
  woETH = await new web3.eth.Contract(WOETH.abi).deploy({
                            data: "0x" + WOETH.evm.bytecode.object
                          })
                          .send({
                            from: accounts[0]
                          })

  console.log(`\WOETH contract deployed at ${woETH.options.address}`);
  console.log(`Please store this wrapper OETH address for future use ^^^`);
  data_object.contract_address.woeth = woETH.options.address;


  let tulipRouter02;
  tulipRouter02 = await new web3.eth.Contract(TulipRouter02.abi)
                          .deploy({
                            data: "0x" + TulipRouter02.evm.bytecode.object, 
                            arguments: [
                              data_object.contract_address.tulip_factory,
                              woETH.options.address]})
                          .send({
                            from: accounts[0]
                          })


  console.log(`\nTulipRouter02 contract deployed at ${tulipRouter02.options.address}`);
  console.log(`Please store this router address for future use ^^^`);

  // data_object.contract_address.tulip_router_02 = tulipRouter02.options.address;
  
  // let erc20_1 = await new web3.eth.Contract(IERC20.abi,erc20_address_1)
  // let erc20_2 = await new web3.eth.Contract(IERC20.abi,erc20_address_2)
  
  // console.log("Started approval on erc20 1");

  // // var approvalAmount = web3.utils.toWei(999,'ether');
  // await erc20_1.methods.approve(data_object.contract_address.tulip_router_02,approvalAmount).send({from: accounts[0]});
  
  // console.log("Started approval on erc20 2");

  // await erc20_2.methods.approve(data_object.contract_address.tulip_router_02,approvalAmount).send({from: accounts[0]});


  // const allowance1 = await erc20_1.methods.allowance(accounts[0],data_object.contract_address.tulip_router_02).call();
  // const allowance2 = await erc20_2.methods.allowance(accounts[0],data_object.contract_address.tulip_router_02).call();
  // const bal1 = await erc20_1.methods.balanceOf(accounts[0]).call();
  // const bal2 = await erc20_2.methods.balanceOf(accounts[0]).call();

  // console.log("Allowances");
  // console.log(allowance1);
  // console.log(allowance2);
  // console.log("Balances");
  // console.log(bal1);
  // console.log(bal2);



  // //let tulip_factory = await new web3.eth.Contract(ITulipFactory.abi,data_object.contract_address.tulip_factory)
  // //await tulip_factory.methods.createPair(erc20_address_1,erc20_address_2).send({from: accounts[0]});
  // console.log("Started add liq");

  // await tulipRouter02.methods.addLiquidity(erc20_address_1,erc20_address_2, 100000, 100000, 0, 0, accounts[0], 1699992120).send({from: accounts[0]});
  
  // console.log("Finished add liq");
  
  let data_to_write = JSON.stringify(data_object, null, 2);

  //createpair
  //addliquidity
  await write_data(data_to_write);


  await provider.engine.stop();
})();