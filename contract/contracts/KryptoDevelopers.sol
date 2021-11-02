// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract KryptoDevelopers is ERC721Enumerable, Ownable {
    using SafeMath for uint256;
    using Strings for uint256;

    mapping(string => bool) _developerExists;

    string public developersBaseURI;

    uint256 private _reserved = 500;

    bool public saleIsActive = false;

    uint256 public constant MAX_MINT_QUANTITY = 25;

    uint256 public constant MAX_DEVELOPERS = 10000;

    uint256 public constant developerPrice = 2000000000000000; // 0.002 ETH

    // withdraw addresses
    address t1 = 0x4bd9736f70CbC26B8A0daC95d17aaca4bAEda360; // ETB Project
    address t2 = 0x869a4f9DE3E127D7Ae60f51E8cB86ABDF6ADe5B4; // Gustavo
    address t3 = 0x5A3ba050b8fD4cbBa0F0b10eA656EDC68E4A91e2; // Renan
    address t4 = 0xa840Fd4343A783aECC294e6f6eeD885B85fCA5c9; // Marcelo

    constructor() ERC721("KryptoDevelopers", "KDEV") {
        developersBaseURI = "https://kryptodevelopers.vercel.app/api/";
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
            msg.value >= developerPrice.mul(quantity),
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
        developersBaseURI = baseURI_;
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
        string memory base = developersBaseURI;
        return string(abi.encodePacked(base, tokenId.toString()));
    }

    function tokensOfOwner(address owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 count = balanceOf(owner);
        uint256[] memory ids = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            ids[i] = tokenOfOwnerByIndex(owner, i);
        }
        return ids;
    }

    function withdrawAll() public payable onlyOwner {
        uint256 _each = address(this).balance / 4;
        require(payable(t1).send(_each));
        require(payable(t2).send(_each));
        require(payable(t3).send(_each));
        require(payable(t4).send(_each));
    }

    function giveAway(address _to, uint256 _amount) external onlyOwner {
        require(_amount <= _reserved, "Exceeds reserved developer supply");

        uint256 supply = totalSupply();
        for (uint256 i; i < _amount; i++) {
            _safeMint(_to, supply + i);
        }

        _reserved -= _amount;
    }
}
