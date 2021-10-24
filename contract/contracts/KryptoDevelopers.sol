// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract KryptoDevelopers is ERC721, ERC721Enumerable, Ownable {
    using SafeMath for uint256;
    using Strings for uint256;

    mapping(string => bool) _developerExists;

    string private _developersBaseURI;

    bool public saleIsActive = false;

    uint256 public constant MAX_MINT_QUANTITY = 25;

    uint256 public constant MAX_DEVELOPERS = 27;

    uint256 public constant DEVELOPER_PRICE = 25000000000000000; // 0.025 ETH

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

    function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
    }

    function mint(uint256 quantity) public payable {
        require(saleIsActive, "Sale must be active to mint Developers");
        require(
            quantity > 0 && quantity <= MAX_MINT_QUANTITY,
            "Can only mint 25 tokens at a time"
        );
        require(
            totalSupply().add(quantity) <= MAX_DEVELOPERS,
            "Purchase would exceed max supply of Developers"
        );
        require(
            msg.value >= DEVELOPER_PRICE.mul(quantity),
            "Ether value sent is not correct"
        );

        for (uint256 i = 0; i < quantity; i++) {
            uint256 mintIndex = totalSupply();
            if (totalSupply() < MAX_DEVELOPERS) {
                _safeMint(msg.sender, mintIndex);
            }
        }
    }

    function setBaseURI(string memory baseURI_) external onlyOwner {
        _developersBaseURI = baseURI_;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        string memory base = _developersBaseURI;
        return string(abi.encodePacked(base, tokenId.toString()));
    }

    // function mergeNFT() {

    // }
}
