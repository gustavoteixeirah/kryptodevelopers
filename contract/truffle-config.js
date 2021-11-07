const HDWalletProvider = require("@truffle/hdwallet-provider");
const dotenv = require("dotenv");
dotenv.config();
const mnemonic = process.env.WALLET_MNEMONIC;

module.exports = {
	networks: {
		development: {
			host: "127.0.0.1",
			port: 7545,
			network_id: "*",
		},
		testnet: {
			provider: () =>
				new HDWalletProvider(
					mnemonic,
					`https://data-seed-prebsc-1-s1.binance.org:8545`
				),
			network_id: 97,
			confirmations: 10,
			timeoutBlocks: 200,
			skipDryRun: true,
		},
		bsc: {
			provider: () =>
				new HDWalletProvider(
					mnemonic,
					`https://bsc-dataseed1.binance.org`
				),
			network_id: 56,
			confirmations: 10,
			timeoutBlocks: 200,
			skipDryRun: true,
		},
	},

	contracts_build_directory: "./abis",
	compilers: {
		solc: {
			version: "0.8.0",
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
};
