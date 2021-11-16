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

    uint256 public reserved = 500;

    bool public saleIsActive = false;

    uint256 public constant MAX_MINT_QUANTITY = 25;

    uint256 public constant MAX_DEVELOPERS = 10000;

    // uint256 public constant developerPrice = 75000000000000000000; // 75 MATIC
    uint256 public constant developerPrice = 1000000000000000000; // 1 MATIC

    // Withdraw addresses
    // ETB Project
    address t1 = 0x7393a26c66e6b82944aad564044dc8ed28f786b0;
    // KryptoDevelopers Project, to use for community events
    address t2 = xxxxxxxxx;
    // Gustavo
    address t3 = 0x3106B9112E18bcB0eBacaE0F9f69aa3A2F1fc9Bd;
    // Renan
    address t4 = 0x6CA165ac7f4cb3825b52602E19CF463D98b24B8C;
    // Marcelo
    address t5 = 0x470f4e0314E6f3D0ff52de741fFa5d4Ba93762Af;

    constructor() ERC721("KryptoDevelopers", "KDEV") {
        developersBaseURI = "https://kryptodevelopers.dev/api/";
    }

    function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
    }

    // TODO Add logic to mint to whitelist first
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

    // Function to be used to give NFT for the other participants of
    // the Eat The Blocks hackaton and also to give away on community
    // events as rewards
    function mintTo(uint256 quantity, address _to) public onlyOwner {
        require(
            quantity > 0 && quantity <= MAX_MINT_QUANTITY,
            "Can only mint 25 tokens at a time"
        );
        require(
            totalSupply().add(quantity) <= MAX_DEVELOPERS,
            "Minting would exceed max supply of Developers"
        );
        require(
            quantity <= reserved,
            "Minting would exceed max reserved Developers"
        );

        for (uint256 i = 0; i < quantity; i++) {
            uint256 mintIndex = totalSupply();
            if (totalSupply() < MAX_DEVELOPERS) {
                _safeMint(_to, mintIndex);
                reserved -= 1;
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
        uint256 _each = address(this).balance / 5;
        require(payable(t1).send(_each));
        require(payable(t2).send(_each));
        require(payable(t3).send(_each));
        require(payable(t4).send(_each));
        require(payable(t5).send(_each));
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
