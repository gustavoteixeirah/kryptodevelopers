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
    mumbai: {
      provider: () =>
        new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
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
