// // mints 10 coins on the chosen network
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();
// const infuraKey = fs.readFileSync(".infura").toString().trim();
//
// var Web3 = require('web3')
// let web3Provider = new Web3.providers.WebsocketProvider(`https://ropsten.infura.io/v3/${infuraKey}`);
// var web3 = new Web3(web3Provider);
//
//
// var earthX = require('./build/contracts/SolnSquareVerifier.json');
// const TruffleContract = require("@truffle/contract");
// let eX = TruffleContract(earthX);
// eX.setProvider(web3Provider);
//
//
// // let getAccounts = async function(){
// //     return await web3.eth.getAccounts();
// // }
//
// var myAccounts = new Promise((resolve, reject) => {
//     resolve([
//         '0x1D3e665CE3C8a3004698dDE1F47c0016F3b24884',
//         '0x14c98F02Dd6c0d65842988fE72bb739cb8cf5881',
//         '0x013a06be9E3613b9C7a48918834f3666F26d4556'
//     ]);
// });
//
// const { initialize } = require('zokrates-js-node');
// var solnSquareVerifierAddress = '0x6C0C687021ae205798a193f9aBe54A98623d2627'//'0xF7d1fA31393731d849EAf5E8CF30a5f6b801DA43';
//
// async function mintX(){
//     let instance = eX.at(solnSquareVerifierAddress);
//     instance.then(ins=>{
//         // or getAccounts()
//         myAccounts.then(acc=>{
//             initialize().then(async zP => {
//                 var source = await fs.readFileSync("../zokrates/code/square/square.code").toString();
//                 const artifacts = zP.compile(source, "main", () => {});
//                 for(var i=0; i<1; i++){
//                     // console.log(i);
//                     // const {witness, output}= zP.computeWitness(artifacts,[i.toString(),(i*i).toString()]);
//                     // var keypair = zP.setup(artifacts.program);
//                     // var proof = zP.generateProof(artifacts.program, witness, keypair.pk);
//                     // console.log(proof);
//                     const jsonString = fs.readFileSync('../zokrates/code/square/proof.json');
//                     let json = JSON.parse(jsonString);
//                     await ins.mint(json["proof"]['a'],json["proof"]['b'],json["proof"]['c'],json['inputs'],acc[0], 0, {from:acc[0], gas:6721975});
//                 }
//                 console.log(await ins.totalSupply.call());
//             })
//         })
//     })
//
// }
//
// module.exports.mintX = mintX;

///////////////////////////////////////////////////////////////////////////////

// user variables
let tokenID = 9 // update to reflect new tokenId
let privateKey = '00acf5234e5cfb0e28ad4a9a70bbbf232001b34da7abba926488134da1ce8690'; // your private key (this is OBVIOUSLY fake right now)
var solnSquareVerifierAddress = '0xe4AFb5A33D1fA7978fc4A62112224F38c835A46b'; // your contract address

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim(); // your secret phrase for the wallet
const infuraKey = fs.readFileSync(".infura").toString().trim();  // your infura project id
const jsonString = fs.readFileSync('../zokrates/code/square/proof.json'); // your zokrates generated proof
var earthX = require('./build/contracts/SolnSquareVerifier.json'); // your built contract for abi

/////////////////

var Web3 = require('web3')
const HDWalletProvider = require('truffle-hdwallet-provider');

const provider = new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`)
const web3 = new Web3(provider);

const eX = new web3.eth.Contract(earthX['abi'], solnSquareVerifierAddress);

let json = JSON.parse(jsonString);

var tx = {
    from: provider.addresses[0],
    // target address, this could be a smart contract address
    to: solnSquareVerifierAddress,
    // this encodes the ABI of the method and the arguments
    data: eX.methods.mint(json["proof"]['a'],
        json["proof"]['b'], json["proof"]['c'],
        json['inputs'], provider.addresses[0], tokenID).encodeABI(),
    gas: web3.utils.toHex('1000000'),
};

let signPromise = web3.eth.accounts.signTransaction(tx, privateKey);

signPromise.then((signedTx) => {
    // raw transaction string may be available in .raw or
    // .rawTransaction depending on which signTransaction
    // function was called
    const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);

    sentTx.on("receipt", receipt => {
        // do something when receipt comes back
        console.log(receipt)
    });

    sentTx.on("error", err => {
        // do something on transaction error
        console.log("ERROR revert:", err);
    });
}).catch((err) => {
    // do something when promise fails
    console.log("ERROR:", err);
});
