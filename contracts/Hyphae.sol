pragma solidity ^0.5.8;
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

// Hyphae has a name
// Hyphae has 30 spores
contract Hyphae is Ownable{

    string public name;
    address private mycelium;

    struct Spore {
        uint8 r;
        uint8 g;
        uint8 b;
    }

    Spore[] spores;

    constructor(string memory _name) public {

        name = _name;

        for (uint i = 0; i < 10 ; i++ ) {
            Spore memory _sporeR = Spore({ r:255, g:0, b: 0 });
            Spore memory _sporeG = Spore({ r:0, g:255, b:0 });
            Spore memory _sporeB = Spore({ r:0, g:0, b:255 });
            spores.push(_sporeR);
            spores.push(_sporeG);
            spores.push(_sporeB);
        }
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function getSpore(uint _index) public view returns (uint8 r, uint8 g, uint8 b) {
        Spore memory _spore = spores[_index];
        return (_spore.r, _spore.g, _spore.b);
    }
}