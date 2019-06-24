pragma solidity ^0.5.8;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract Morels is ERC20 {
    string public name = "Morels";
    string public symbol = "MRLS";
    uint public decimals = 0;
    uint public INITIAL_SUPPLY = 1000;

    function setName(string memory _newName) public {
        name = _newName;
    }
}