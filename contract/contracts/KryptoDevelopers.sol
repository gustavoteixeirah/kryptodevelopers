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

    mapping(string => bool) _developerExists;

    string public developersBaseURI;

    uint256 public reserved = 500;

    bool public saleIsActive = false;

    bool public whitelistSaleIsActive = false;

    uint256 public constant MAX_MINT_QUANTITY = 25; 

    uint256 public constant MAX_DEVELOPERS = 10000;

    uint256 public constant WHITELIST_MAX_DEVELOPERS = 3000;

    // uint256 public constant developerPrice = 75000000000000000000; // 75 MATIC
    uint256 public constant developerPrice = 1000000000000000000; // 1 MATIC

    // WHITELIST
    mapping(address => bool) public _whiteListAllowed; //+1

    // WITHDRAW ADDRESSES
    // ETB Community funds
    address t1 = 0x7393A26c66E6b82944AaD564044dc8Ed28f786b0;
    // KryptoDevelopers Community funds
    address t2 = 0x7393A26c66E6b82944AaD564044dc8Ed28f786b0;
    // Gustavo
    address t3 = 0x3106B9112E18bcB0eBacaE0F9f69aa3A2F1fc9Bd;
    // Renan
    address t4 = 0x6CA165ac7f4cb3825b52602E19CF463D98b24B8C;
    // Marcelo
    address t5 = 0x470f4e0314E6f3D0ff52de741fFa5d4Ba93762Af;

    constructor() ERC721("KryptoDevelopers", "KDEV") {}

    function mint(uint256 quantity) public payable {
        require(
            saleIsActive || whitelistSaleIsActive,
            "Sale must be active to mint Developers"
        );
        require(
            quantity > 0 && quantity <= MAX_MINT_QUANTITY,
            "Can only mint 25 tokens at a time"
        );
        require(
            msg.value >= developerPrice.mul(quantity),
            "Matic value sent is not correct"
        );
        require(
            totalSupply().add(quantity) <
                (isWhitelistSale() ? WHITELIST_MAX_DEVELOPERS : MAX_DEVELOPERS),
            "Purchase would exceed max supply of Developers"
        );
        if (isWhitelistSale()) {
            require(
                _whiteListAllowed[msg.sender] == true,
                "Sender of the transaction is not in the whitelist"
            );
        }
        for (uint256 i = 0; i < quantity; i++) {
            uint256 mintIndex = totalSupply();
            if (totalSupply() < MAX_DEVELOPERS) {
                _safeMint(msg.sender, mintIndex);
            }
        }
    }

    function isWhitelistSale() private view returns (bool) {
        return whitelistSaleIsActive;
    }

    function addToWhitelist(address[] memory addresses) public onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            address currentAddress = addresses[i];

            require(currentAddress != address(0), "Can't add the null address");

            _whiteListAllowed[currentAddress] = true;
        }
    }

    function isWhitelisted(address addr) public view returns (bool) {
        return _whiteListAllowed[addr];
    }

    function removeFromAllowList(address[] calldata addresses)
        public
        onlyOwner
    {
        for (uint256 i = 0; i < addresses.length; i++) {
            address currentAddress = addresses[i];

            require(currentAddress != address(0), "Can't add the null address");

            _whiteListAllowed[currentAddress] = false;
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

    function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
    }

    function flipWhitelistSaleState() public onlyOwner {
        whitelistSaleIsActive = !whitelistSaleIsActive;
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

        if (bytes(base).length == 0) {
            return "ipfs://QmSWEwRXCKWcXfw89zTj8CzWbguBQkwVemdVXANeXZZCgw";
        }

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

    function withdrawAll() public onlyOwner {
        uint256 _each = address(this).balance / 5;
        require(payable(t1).send(_each));
        require(payable(t2).send(_each));
        require(payable(t3).send(_each));
        require(payable(t4).send(_each));
        require(payable(t5).send(_each));
    }
}
