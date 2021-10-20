// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract KryptoDevelopers is ERC721, ERC721Enumerable {
    string[] public developers;
    mapping(string => bool) _developerExists;

    constructor() ERC721("KryptoDevelopers", "KDEV") {}

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function mint(string memory _developer) public {
        developers.push(_developer);
        uint256 _id = developers.length;
        _mint(msg.sender, _id);
        _developerExists[_developer] = true;
    }
}
