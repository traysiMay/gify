pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Enumerable.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Toadstool is ERC721Enumerable, Ownable {
    string public name;
    string public symbol;

    constructor(string memory _name, string memory _symbol) public {
        name = _name;
        symbol = _symbol;
    }

    struct Shroom {
        uint8 r;
        uint8 g;
        uint8 b;
    }

    Shroom[] shrooms;

    struct Spore {
        uint8 r;
        uint8 g;
        uint8 b;
    }

    Spore[] spores;

    mapping(uint32 => bool) takenColors;

    function mint(uint8 _r, uint8  _g, uint8  _b, address forager) public onlyOwner {
        uint32 colorCombined = _r + _g + _b;
        require(takenColors[colorCombined] == false, 'this color is taken');

        Shroom memory _shroom = Shroom({r: _r, g: _g, b: _b});
        uint _shroomId = shrooms.push(_shroom) - 1;
        
        takenColors[colorCombined] = true;
        _mint(forager, _shroomId);
    }

    function getShroom(uint _shroomId) public view returns (uint8 r, uint8 g, uint8 b, uint id) {
        Shroom memory _shroom = shrooms[_shroomId];
        return (_shroom.r, _shroom.g, _shroom.b, _shroomId);
    }

    function getShroomsLength() public view returns (uint) {
        return shrooms.length;
    }

    function getSpore(uint _index) public view returns (uint8 r, uint8 g, uint8 b) {
        Spore memory _spore = spores[_index];
        return (_spore.r, _spore.g, _spore.b);
    }

    function makeSpore(uint8 _r, uint8 _g, uint8 _b) public onlyOwner {
        Spore memory _spore = Spore({r:_r,g:_g,b:_b});
        spores.push(_spore);
    }

    function getSporeLength() public view returns (uint) {
        return spores.length;
    }

}