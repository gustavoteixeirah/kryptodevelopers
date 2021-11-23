// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract KryptoDevelopers is ERC721Enumerable, Ownable {
    using SafeMath for uint256;
    using Strings for uint256;
    using Address for address;

    uint256 public constant MAX_MINT_QUANTITY = 25;
    uint256 public constant MAX_DEVELOPERS = 10000;

    mapping(string => bool) _developerExists;

    string public developersBaseURI;

    bool public saleIsActive = false;

    uint256 public developerPrice;

    // KryptoDevelopers Community
    address t1 = 0x3106B9112E18bcB0eBacaE0F9f69aa3A2F1fc9Bd;
    address t2 = 0x5AAee7d64278929091D8e3beE3371B7A6f6bAaf3;
    address t3 = 0x6CA165ac7f4cb3825b52602E19CF463D98b24B8C;
    address t4 = 0x470f4e0314E6f3D0ff52de741fFa5d4Ba93762Af;

    constructor() ERC721("KryptoDevelopers", "KDEV") {
        developerPrice = 75000000000000000000;
        developersBaseURI = "https://www.kryptodevelopers.dev/api/";
    }

    function mint(uint256 quantity) public payable {
        require(saleIsActive, "Sale must be active to mint Developers");
        require(
            quantity > 0 && quantity <= MAX_MINT_QUANTITY,
            "Can only mint 25 tokens at a time"
        );
        require(
            msg.value >= developerPrice.mul(quantity),
            "Matic value sent is not correct"
        );
        require(
            totalSupply().add(quantity) < MAX_DEVELOPERS,
            "Purchase would exceed max supply of Developers"
        );

        for (uint256 i = 0; i < quantity; i++) {
            uint256 mintIndex = totalSupply();
            if (totalSupply() < MAX_DEVELOPERS) {
                _safeMint(msg.sender, mintIndex);
            }
        }
    }

    function setPrice(uint256 newPrice) public onlyOwner {
        developerPrice = newPrice;
    }

    function mintTo(address _to, uint256 quantity) public onlyOwner {
        require(
            quantity > 0 && quantity <= MAX_MINT_QUANTITY,
            "Can only mint 25 tokens at a time"
        );
        require(
            totalSupply().add(quantity) <= MAX_DEVELOPERS,
            "Minting would exceed max supply of Developers"
        );

        for (uint256 i = 0; i < quantity; i++) {
            uint256 mintIndex = totalSupply();
            if (totalSupply() < MAX_DEVELOPERS) {
                _safeMint(_to, mintIndex);
            }
        }
    }

    function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
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
        return string(abi.encodePacked(developersBaseURI, tokenId.toString()));
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

    function withdrawAll() public onlyOwner {
        uint256 _each = address(this).balance / 5;
        require(payable(t1).send(_each));
        require(payable(t2).send(_each));
        require(payable(t3).send(_each));
        require(payable(t4).send(_each));
    }
}
