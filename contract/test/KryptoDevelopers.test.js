const { assert } = require("chai");

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
	});
});
