pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Transhroomtation is ERC721, Ownable {
    string public constant name = "NewdShroom";
    string public constant symbol = "SHRM";
    
    struct Shroom {
        uint8 r;
        uint8 g;
        uint8 b;
    }

    Shroom[] shrooms;

    function mint(uint8 _r, uint8  _g, uint8  _b) public onlyOwner returns (uint) {
        Shroom memory _shroom = Shroom({r: _r, g: _g, b: _b});
        uint _shroomId = shrooms.push(_shroom) - 1;

        _mint(msg.sender, _shroomId);
        return _shroomId;
    }

    function getShroom(uint _shroomId) public view returns (uint8 r, uint8 g, uint8 b) {
        Shroom memory _shroom = shrooms[_shroomId];
        return (_shroom.r, _shroom.g, _shroom.b);
    }

    function getShroomsLength() public view returns (uint) {
        return shrooms.length;
    }

    function deathToMushrooms() public {
        for (uint i = 0; i < shrooms.length ; i++ ) {
            delete shrooms[i];
            shrooms.length--;
        }
    }

}