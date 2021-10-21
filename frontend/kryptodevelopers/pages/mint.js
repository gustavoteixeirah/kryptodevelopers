import detectEthereumProvider from "@metamask/detect-provider";
import { useEffect, useState } from "react";
import Web3 from "web3";
import kryptoDevelopers from "./KryptoDevelopers.json";

export default function Mint() {
	// FOR WALLET
	const [signedIn, setSignedIn] = useState(false);

	const [walletAddress, setWalletAddress] = useState(null);

	useEffect(async () => {
		loadWeb3();
	}, []);

	async function loadWeb3() {
		const provider = await detectEthereumProvider();

		if (provider) {
			window.web3 = new Web3(provider);
			console.log("Ethereum wallet connected!");
		} else {
			console.log("Ethereum wallet not connected...");
			alert(
				"No Ethereum interface injected into browser. Read-only access"
			);
		}
		loadBlockchainData();
	}

	async function loadBlockchainData() {
		const web3 = window.web3;
		const accounts = await web3.eth.getAccounts();
		const networkId = await web3.eth.net.getId();
		// this.setState({ account: accounts[0] });
		console.log(accounts);
		const networkData = kryptoDevelopers.networks[networkId];
		if (networkData) {
			const abi = kryptoDevelopers.abi;
			const address = networkData.address;
			const contract = new web3.eth.Contract(abi, address);
			console.log(contract);
			// const totalSupply = await contract.methods.totalSupply().call();
		} else {
			window.alert("Smart contract not deployed yet.");
		}
	}

	return (
		<div>
			<h1>Mint page</h1>
		</div>
	);
}
