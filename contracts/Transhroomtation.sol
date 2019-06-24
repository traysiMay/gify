pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
contract Transhroomtation is ERC721, Ownable {
    string public constant name = 'NewdShroom';
    string public constant symbol = 'SHRM';
    
    struct Shroom {
        string outer;
        string inner;
    }

    Shroom[] shrooms;

    function mint(string memory _outer, string memory _inner) public onlyOwner returns (uint) {
        Shroom memory _shroom = Shroom({outer: _outer, inner: _inner});
        uint _shroomId = shrooms.push(_shroom) - 1;

        _mint(msg.sender, _shroomId);
        return _shroomId;
    }

    function getShroom(uint _shroomId) public view returns (string memory outer, string memory inner) {
        Shroom memory _shroom = shrooms[_shroomId];

        outer = _shroom.outer;
        inner = _shroom.inner;
    }
}