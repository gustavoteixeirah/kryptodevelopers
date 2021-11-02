const { assert } = require("chai");
const { BN } = require("@openzeppelin/test-helpers");
const KryptoDevelopers = artifacts.require("./KryptoDevelopers");

require("chai").use(require("chai-as-promised")).should();

contract("KryptoDevelopers", (accounts) => {
	let contract;

	before(async () => {
		contract = await KryptoDevelopers.deployed();
	});

	describe("deployment", async () => {
		it("deploys successfully", async () => {
			const address = contract.address;
			assert.notEqual(address, "");
			assert.notEqual(address, null);
			assert.notEqual(address, undefined);
			assert.notEqual(address, 0x0);
		});

		it("name and symbol matches", async () => {
			const name = await contract.name();
			const symbol = await contract.symbol();
			assert.equal(name, "KryptoDevelopers");
			assert.equal(symbol, "KDEV");
		});

		it("baseURI match", async () => {
			const name = await contract.developersBaseURI();
			assert.equal(name, "https://kryptodevelopers.vercel.app/api/");
		});
	});

	describe("basic functionalities", async () => {
		it("flip sale state", async () => {
			const currentState = await contract.saleIsActive();
			await contract.flipSaleState();
			const afterFlippingState = await contract.saleIsActive();
			assert.isFalse(currentState);
			assert.isTrue(afterFlippingState);
		});

		it("should not be able to mint more than 25 developers", async () => {
			await contract.mint(26, {
				from: accounts[1],
				value: web3.utils.toWei("10", "ether"),
			}).should.be.rejected;
		});
	});

	describe("minting", async () => {
		const minterAccount = accounts[1];

		it("minting to the minter account", async () => {
			const result = await contract.mint(1, {
				from: minterAccount,
				value: web3.utils.toWei("0.002", "ether"),
			});

			const event = result.logs[0].args;
			assert.equal(
				event.from,
				"0x0000000000000000000000000000000000000000",
				"from is the contract"
			);
			assert.equal(event.to, minterAccount, "to is msg.sender");
			assert.equal(event.tokenId, 0);
		});

		it("total supply now should be 1", async () => {
			const totalSupply = await contract.totalSupply();
			assert.equal(totalSupply, 1);
		});

		it("balance of minter account should be 1", async () => {
			const balance = await contract.balanceOf(minterAccount);
			assert.equal(balance.toString(), new BN(1).toString());
		});

		it("minter account should have 1 token with id 0", async () => {
			const tokensOfOwner = await contract.tokensOfOwner(minterAccount);
			assert.equal(tokensOfOwner[0].toString(), new BN(0).toString());
		});

		it("should be able to retrieve the token URI", async () => {
			const tokenURI = await contract.tokenURI(0);
			assert.equal(tokenURI, "https://kryptodevelopers.vercel.app/api/0");
		});

		it("minting many tokens to the minter account", async () => {
			const result = await contract.mint(9, {
				from: minterAccount,
				value: web3.utils.toWei("0.018", "ether"),
			});

			for (i = 0; i < 9; i++) {
				const event = result.logs[i].args;
				assert.equal(
					event.from,
					"0x0000000000000000000000000000000000000000",
					"from is the contract"
				);
				assert.equal(event.to, minterAccount, "to is msg.sender");
				assert.equal(event.tokenId, i + 1);
			}
		});

		it("total supply now should be 10", async () => {
			const totalSupply = await contract.totalSupply();
			assert.equal(totalSupply, 10);
		});

		it("balance of minter account should now be 10", async () => {
			const balance = await contract.balanceOf(minterAccount);
			assert.equal(balance.toString(), new BN(10).toString());
		});

		it("minter account should now have 10 tokens with ids 0 from 9", async () => {
			const tokensOfOwner = await contract.tokensOfOwner(minterAccount);
			assert.equal(
				tokensOfOwner.toString(),
				[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].toString()
			);
		});
	});

	describe("give away functionality", async () => {
		const luckyAccount = accounts[2];
		it("owner should be able to give away some nfts to a lucky account", async () => {
			const result = await contract.giveAway(luckyAccount, 5);

			for (i = 0; i < 5; i++) {
				const event = result.logs[i].args;
				assert.equal(
					event.from,
					"0x0000000000000000000000000000000000000000",
					"from is the contract"
				);
				assert.equal(event.to, luckyAccount, "to is msg.sender");
				assert.equal(event.tokenId, i + 10);
			}
		});

		it("total supply now should be 15", async () => {
			const totalSupply = await contract.totalSupply();
			assert.equal(totalSupply, 15);
		});

		it("balance of minter account should now be 10", async () => {
			const balance = await contract.balanceOf(luckyAccount);
			assert.equal(balance.toString(), new BN(5).toString());
		});

		it("lucky account should now have 5 tokens with ids 10 from 14", async () => {
			const tokensOfOwner = await contract.tokensOfOwner(luckyAccount);
			assert.equal(
				tokensOfOwner.toString(),
				[10, 11, 12, 13, 14].toString()
			);
		});
	});
});
