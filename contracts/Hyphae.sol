pragma solidity ^0.5.8;
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract Hyphae is Ownable{
    string public _name;
    address private _mycelium;

    constructor(string memory name) public {
        _name = name;
    }

    function getName() public view returns (string memory) {
        return _name;
    }
}