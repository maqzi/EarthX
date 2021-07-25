var ERC721MintableComplete = artifacts.require('EarthX');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_one, 1,{from:account_one});
            await this.contract.mint(account_one, 2,{from:account_one});
            await this.contract.mint(account_two, 3,{from:account_one});

        })

        it('should return total supply', async function () { 
            let count = await this.contract.totalSupply.call();
            assert.equal(count, 3, "Should equal 3");
        })

        it('should get token balance', async function () {
            let count = await this.contract.balanceOf.call(account_one);
            assert.equal(count, 2, "Should equal 2");

            count = await this.contract.balanceOf.call(account_two);
            assert.equal(count, 1, "Should equal 1");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            let uri = await this.contract.tokenURI.call(1);
            assert.equal(uri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "Should equal https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1");
        })

        it('should transfer token from one owner to another', async function () {
            await this.contract.transferFrom(account_one, account_two, 2, {from:account_one});
            let owner = await this.contract.ownerOf.call(2);
            assert.equal(owner, account_two, "ownership should be transferred.");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () {
            let failed = false;
            try{
                await this.contract.mint.call(account_one, 1,{from:account_two});
            }catch (e){
                failed = true;
            }
            assert.equal(failed, true, "minter is not contract owner");
        })

        it('should return contract owner', async function () {
            let owner = await this.contract.owner.call({from:account_two});

            assert.equal(owner, account_one, "incorrect contract owner");
        })

    });
})