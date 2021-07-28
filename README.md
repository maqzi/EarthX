# EarthX

## About
At present, property titles are often paper-based, creating opportunities for errors and fraud. Title professionals find defects in 25% of all titles during the transaction process, according to the American Land Title Association.

Any identified defect makes it illegal to transfer a property title to a buyer until it is rectified. This means property owners often incur high legal fees to ensure authenticity and accuracy of their property titles.

Moreover, title fraud poses a risk to homeowners worldwide. US losses associated with title fraud reportedly averaged around $103,000 per case in 2015, compelling many property buyers to purchase title insurance.

These title management issues could potentially be mitigated by using blockchain technology to build immutable digital records of land titles and using blockchain for transparent transactions. This approach could simplify property title management, making it more transparent and helping to reduce the risk of title fraud and the need for additional insurance.

EarthX mints its own tokens to represent the title to the properties. Before minting a token, it verifies property ownership using a zk-SNARKs created verification system which works without revealing specific information on the property.

Once the token has been verified it is placed on a blockchain market place (OpenSea) for others to purchase.

### Development environment:
```
Truffle v5.3.14 (core: 5.3.14)
Solidity v0.5.16 (solc-js)
Node v10.19.0
Web3.js v1.4.0
```

### Deployment Info
The deployments can be seen on rinkeby.etherscan.io at the following transaction hashes:

```
Starting migrations...
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 29970677 (0x1c950f5)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x2682935b6337620c960e6982235b0da218312d29b1899561a7cbf6b787116f57
   > Blocks: 0            Seconds: 0
   > contract address:    0x78ab2BfB9B13dE69986a22CA8e38640701F51B1E
   > block number:        9011722
   > block timestamp:     1627414685
   > account:             0x1D3e665CE3C8a3004698dDE1F47c0016F3b24884
   > balance:             18.851773462998187704
   > gas used:            226537 (0x374e9)
   > gas price:           1.000000008 gwei
   > value sent:          0 ETH
   > total cost:          0.000226537001812296 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.000226537001812296 ETH


2_deploy_contracts.js
=====================

   Deploying 'Verifier'
   --------------------
   > transaction hash:    0x982d27d277387417e9f609cf47bf6767a2747f69d83c40582b63934f7b5e1d23
   > Blocks: 0            Seconds: 12
   > contract address:    0xbCbEeD3647A1A84Aa8aE1a167EF82C4aBAc58EC4
   > block number:        9011724
   > block timestamp:     1627414715
   > account:             0x1D3e665CE3C8a3004698dDE1F47c0016F3b24884
   > balance:             18.850759852990078824
   > gas used:            967847 (0xec4a7)
   > gas price:           1.000000008 gwei
   > value sent:          0 ETH
   > total cost:          0.000967847007742776 ETH


   Deploying 'SolnSquareVerifier'
   ------------------------------
   > transaction hash:    0x6533e3fdfae46f3c61342c1133cd6977b511c13198959a466358f9cf06ac7988
   > Blocks: 0            Seconds: 12
   > contract address:    0xe4AFb5A33D1fA7978fc4A62112224F38c835A46b
   > block number:        9011725
   > block timestamp:     1627414730
   > account:             0x1D3e665CE3C8a3004698dDE1F47c0016F3b24884
   > balance:             18.847020158960161272
   > gas used:            3739694 (0x39102e)
   > gas price:           1.000000008 gwei
   > value sent:          0 ETH
   > total cost:          0.003739694029917552 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.004707541037660328 ETH


Summary
=======
> Total deployments:   3
> Final cost:          0.004934078039472624 ETH

```
### Contract ABI
ABIs can be found in the built contracts. The SolnSquareVerifier contract that is already deployed on the Rinkeby network can be found here: https://github.com/maqzi/EarthX/blob/master/eth-contracts/build/contracts/SolnSquareVerifier.json

## Testing
The project has been built using truffle and can be tested easily with the following process:

1. Clone the repo: `git clone https://github.com/maqzi/EarthX.git`

2. Change directory: `cd ./EarthX/`

3. Install required packages: `npm install`

4. Change directory: `cd ./eth-contracts/`

5. Run tests: `truffle test`

The test cases should all pass. Other ways to test the tokens are mentioned below.

### Mint script
The mint10.js script in `eth-contracts/` has nodejs functions to mint tokens as the contract owner. Make sure to update the keys and contract addresses at the top of the script.

### 10 initial tokens
The contract's tokens can be seen here: https://rinkeby.etherscan.io/token/0xe4afb5a33d1fa7978fc4a62112224f38c835a46b
along with other information on minted tokens, holders and token transfers.

### Opensea storefront
The storefront can be found here: https://testnets.opensea.io/collection/earthx-v3 and can be used to interact with the tokens.


## Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
