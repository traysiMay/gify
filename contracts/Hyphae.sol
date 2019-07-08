pragma solidity ^0.5.8;
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


// Hyphae has a name
// Hyphae has 30 spores
contract Hyphae is Ownable{

    string public _name;
    address private _mycelium;

    struct Spore {
        uint8 r;
        uint8 g;
        uint8 b;
    }

    Spore[] spores;

    constructor(string memory name) public {
        _name = name;
        for (uint i = 0; i < 30 ; i++ ) {
            Spore memory _sporeR = Spore({ r:255, g:0, b: 0 });
            Spore memory _sporeG = Spore({ r:0, g:255, b:0 });
            Spore memory _sporeB = Spore({ r:0, g:0, b:255 });
            spores.push(_sporeR);
            spores.push(_sporeG);
            spores.push(_sporeB);
        }
    }

    function getName() public view returns (string memory) {
        return _name;
    }

    function getSpore(uint index) public view returns (uint8 r, uint8 g, uint8 b) {
        Spore memory _spore = spores[index];
        return (_spore.r, _spore.g, _spore.b);
    }
}