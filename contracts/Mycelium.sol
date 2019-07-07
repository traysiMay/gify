pragma solidity ^0.5.8;
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import './Hyphae.sol';

contract Mycelium is Ownable{

    mapping(uint8 => Hyphae) private _hyphaes;
    uint8 private lastHyphae;

    constructor() public {
        _hyphaes[0] = new Hyphae('genesis'); 
        lastHyphae = 0;
    }

    function newHyphae(uint8 index, string memory name) public onlyOwner {
        _hyphaes[index] = new Hyphae(name);
    }

    function getHyphae(uint8 index) public view returns (Hyphae) {
        return _hyphaes[index];
    }

}