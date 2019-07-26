pragma solidity ^0.5.8;
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./Hyphae.sol";
import "./Toadstool.sol";


// Executive controls
contract Mycelium is Ownable {

    mapping(uint8 => address) public hyphaes;
    mapping(uint8 => address) public toads;
    uint8 private lastHyphae;
    uint private lastToad;

    constructor() public {
        createHyphae(0, "genesis");
        lastHyphae = 0;
    }

    function createHyphae(uint8 _index, string memory _name) public onlyOwner returns (address) {
        address _h = address(new Hyphae(_name));
        hyphaes[_index] = _h;
        return _h;
    }

    function createToadstool(uint8 _index, string memory _name, string memory _symbol) public onlyOwner returns (address) {
        address _t = address(new Toadstool(_name, _symbol));
        toads[_index] = _t;
        return _t;
    }

    // needs to have an index
    function mintToad(uint r, uint g, uint b) public {
        Toadstool toad = Toadstool(toads[0]);
        toad.mint(r,g,b);
    }

    function setToad(uint8 _index, address _address) public {
        toads[_index] = _address;
        lastToad = _index;
    }

}