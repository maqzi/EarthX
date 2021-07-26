pragma solidity >=0.4.21 <0.6.0;

import './ERC721Mintable.sol';

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is EarthX{
    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address add;
        bool exists;
        bool minted;
    }

    // TODO define an array of the above struct
    Solution[] private solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private uniqueSolutions;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 index, address add);

    // TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
    SQVerifier verifier;

    constructor(
        address verifierAddress
    )
    EarthX()
    public
    {
        verifier = SQVerifier(verifierAddress);
    }


    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
        )
    public{
        bytes32 solutionHash = getHash(a, b, c, input);
        require(!uniqueSolutions[solutionHash].exists, "Solution is not unique.");

        // ensures solution is valid
        require(isSolution(a, b, c, input),"invalid solution.");

        Solution memory sol = Solution(solutions.length, msg.sender, true, false);
        uniqueSolutions[solutionHash] = sol;
        emit SolutionAdded(solutions.length, msg.sender);

        solutions.push(sol);
    }

    function getSolution(
        uint256 index
    )
    public
    returns(uint256, address, bool, bool){
        Solution memory sol = solutions[index];
        return (sol.index, sol.add, sol.exists, sol.minted);
    }

    function getHash(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    )
    private
    returns(bytes32)
    {
        return keccak256(abi.encodePacked(a, b, c, input));
    }

    function isSolution(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    )
    private
    returns(bool)
    {
        return verifier.verifyTx(a, b, c, input);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSupply
    function mint(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input,
        address to
    )
    public
    returns(bool){
        bytes32 hash = getHash(a, b, c, input);
        if(!uniqueSolutions[hash].exists){
            // uniqueness ensured inside addSolution
            addSolution(a, b, c, input);
        }

        require(msg.sender == uniqueSolutions[hash].add, "only the solution address can mint it.");
        require(!uniqueSolutions[hash].minted, "token already minted!");
        uniqueSolutions[hash].minted = true;

        // parent contract handles metadata and token supply
        return super.mint(to, solutions.length - 1);
    }

}


contract SQVerifier{
    function verifyTx(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    )
    public
    returns (bool r);
}
