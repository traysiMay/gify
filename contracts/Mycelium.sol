pragma solidity ^0.5.8;
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./Hyphae.sol";
import "./Toadstool.sol";

contract Mycelium is Ownable {

    mapping(uint8 => address) public hyphaes;
    mapping(uint16 => address) public toads;
    uint8 public lastHyphae;
    uint16 public lastToad;

    function createHyphae(uint8 _index, string memory _name) public onlyOwner returns (address) {
        address _h = address(new Hyphae(_name));
        hyphaes[_index] = _h;
        return _h;
    }

    function createToadstool(uint16 _index, string memory _name, string memory _symbol) public onlyOwner {
        address _t = address(new Toadstool(_name, _symbol));
        toads[_index] = _t;
        lastToad = _index;
    }

    function mintToad(uint16 _toadIndex, uint8 _r, uint8 _g, uint8 _b) public {
        Toadstool _toad = Toadstool(toads[_toadIndex]);
        _toad.mint(_r,_g,_b, msg.sender);
    }

}