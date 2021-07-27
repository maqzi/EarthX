var Verifier = artifacts.require('Verifier');
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const fs = require('fs');

contract('TestSolnSquareVerifier', accounts => {

    const account_one = accounts[0];

    describe('test solution square verifier', function () {
        beforeEach(async function () {
            const verifier = await Verifier.new({from: account_one});
            this.contract = await SolnSquareVerifier.new(verifier.address, {from: account_one});

            try {
                const jsonString = fs.readFileSync('../zokrates/code/square/proof.json');
                this.json = JSON.parse(jsonString);
            } catch(err) {
                if (err) assert.equal(err, null, "cant read file");
            }
        });

        it('can add new solutions', async function () {
            // Test if a new solution can be added for contract - SolnSquareVerifier
            let json = this.json;
            await this.contract.addSolution(json["proof"]["a"], json["proof"]["b"], json["proof"]["c"], json["inputs"]);
            let solution = await this.contract.getSolution.call(0);
            assert.equal(solution[2], true, "solution doesn't exist");

        })

        it('can mint tokens', async function () {
            // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
            let json = this.json;
            assert.equal(await this.contract.totalSupply.call(), 0, "nfts shouldnt exist");
            await this.contract.mint(json["proof"]["a"], json["proof"]["b"], json["proof"]["c"], json["inputs"], accounts[1], 0);
            let solution = await this.contract.getSolution.call(0);
            assert.equal(solution[2], true, "solution doesn't exist");
            assert.equal(solution[3], true, "nft wasn't minted");
            assert.equal(await this.contract.totalSupply.call(), 1, "nft wasn't minted");
        })
    })
});