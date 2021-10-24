import detectEthereumProvider from "@metamask/detect-provider";
import { useEffect, useState } from "react";
import Web3 from "web3";
import kryptoDevelopers from "./KryptoDevelopers.json";

const CONTRACT_ADDRESS = "0xb72296B78aBfc7f3BB156DEd531eA82B4f3F035E";

export default function Mint() {
	// FOR WALLET
	const [signedIn, setSignedIn] = useState(false);

	const [walletAddress, setWalletAddress] = useState(null);

	const [totalSupply, setTotalSupply] = useState(0);

	const [saleStatus, setSaleStatus] = useState(false);

	const [contract, setContract] = useState(null);

	const [developersMintQtty, setDevelopersMintQtty] = useState(1);

	const [developerPrice, setDeveloperPrice] = useState(0);

	const [ownedTokens, setOwnedTokens] = useState([]);

	const [balance, setBalance] = useState(0);

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
		const networkId = await web3.eth.net.getId();
		const networkData = kryptoDevelopers.networks[networkId];
		if (networkData) {
			const abi = kryptoDevelopers.abi;

			const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
			setContract(contract);

			const saleStatus = await contract.methods.saleIsActive().call();
			setSaleStatus(saleStatus);

			const totalSupply = await contract.methods.totalSupply().call();
			setTotalSupply(totalSupply);

			const developerPrice = await contract.methods
				.developerPrice()
				.call();
			setDeveloperPrice(developerPrice);

			const accounts = await web3.eth.getAccounts();
			setWalletAddress(accounts[0]);

			const balance = await contract.methods
				.balanceOf(accounts[0])
				.call();
			console.log(balance);
			if (balance != 0) {
				console.log(balance);
				setBalance(balance);
				for (var index = 0; index < balance; index++) {
					console.log("index", index);
					console.log("walletAddress", accounts[0]);
					const ownedToken = await contract.methods
						.tokenOfOwnerByIndex(accounts[0], index)
						.call();
					console.log("ownedToken", ownedToken);
					// setOwnedTokens([...ownedTokens, ownedToken]);
					setOwnedTokens(arr => [...arr, ownedToken]);
				}
			}
		} else {
			window.alert("Smart contract not deployed yet.");
		}
		setSignedIn(true);
	}

	async function mintDeveloper(quantity) {
		if (contract) {
			const price = Number(developerPrice) * quantity;

			const gasAmount = await contract.methods
				.mint(quantity)
				.estimateGas({ from: walletAddress, value: price });
			console.log("estimated gas", gasAmount);

			console.log({ from: walletAddress, value: price });

			contract.methods
				.mint(quantity)
				.send({
					from: walletAddress,
					value: price,
					gas: String(gasAmount),
				})
				.on("transactionHash", function (hash) {
					console.log("transactionHash", hash);
				});
		} else {
			console.log("Wallet not connected");
		}
	}

	return (
		<div>
			<div className="title">
				<h1>Mint page</h1>
			</div>
			<div className="mintInfo">
				<div>
					Wallet status: {signedIn ? "Connected" : "Disconnected"}
				</div>
				<div>Total Supply: {totalSupply} </div>
				<div>
					Sale have started: {saleStatus ? "Active" : "Not active"}{" "}
				</div>
				<div>Wallet Address: {walletAddress} </div>
				<div>Developer Price: {developerPrice} </div>
			</div>

			<div className="mintForm">
				<div id="mint" className="">
					<span className="">Give me</span>

					<input
						type="number"
						min="1"
						max="20"
						value={developersMintQtty}
						onChange={(e) => setDevelopersMintQtty(e.target.value)}
						name=""
						className=""
					/>

					<span className="">Developers!</span>
				</div>
				{saleStatus ? (
					<button
						onClick={() => mintDeveloper(developersMintQtty)}
						className=""
					>
						MINT {developersMintQtty} developers for{" "}
						{(developerPrice * developersMintQtty) / 10 ** 18} ETH +
						GAS
					</button>
				) : (
					<button className="">
						SALE IS NOT ACTIVE OR NO WALLET IS CONNECTED
					</button>
				)}
			</div>
			<div>
				<h3>Your NFTs:</h3>
				<div>
					<span>
						{balance == 0
							? "You don't own any developer at the moment."
							: "Your currenty own " + balance + " developers."}
					</span>
					{balance != 0 ? (
						<ul>
							{ownedTokens.map((value, index) => {
								return <li key={index}>tokenId: {value}</li>;
							})}
						</ul>
					) : (
						<div></div>
					)}
				</div>
			</div>
		</div>
	);
}
