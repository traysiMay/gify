pragma solidity ^0.5.8;
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./Hyphae.sol";


// Executive controls
contract Mycelium is Ownable{

    mapping(uint8 => address) public _hAddys;
    uint8 private lastHyphae;

    constructor() public {
        newHyphae2(0, "genesis");
        lastHyphae = 0;
    }

    function newHyphae2(uint8 index, string memory name) public onlyOwner returns (address) {
        address _h = address(new Hyphae(name));
        _hAddys[index] = _h;
        return _h;
    }

}