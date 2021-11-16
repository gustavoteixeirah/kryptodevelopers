import traits from "./traits.json";

const kryptoDeveloperApi = async (req, res) => {
	const totalSupply = 10000;

	const query = req.query.id;

	if (parseInt(query) < totalSupply) {
		const trait = traits[parseInt(query)];
		// cons OPENSEA METADATA STANDARD DOCUMENTATION https://docs.opensea.io/docs/metadata-standards
		let metadata = {};
		metadata = {
			description:
				"Developers are the key people behind any software that has ever been built. Software programs for simple led switching to space programs. Simple arithmetic to complex calculus. This NFT collection seeks to illustrate these hard-working people that expends their days in front of a computer to solve problems.",
			tokenId: parseInt(query),
			image: `https://gateway.pinata.cloud/ipfs/${trait["imageIPFS"]}`,
			external_url: "https://kryptodevelopers.vercel.app",
			attributes: [
				{ 
					trait_type: "Background",
					value: trait["Background"],
				},
				{
					trait_type: "Developer",
					value: trait["Developer"],
				},
				{
					trait_type: "Accessory",
					value: trait["Accessory"],
				},
				{
					trait_type: "Hair",
					value: trait["Hair"],
				},
				{
					trait_type: "Beverage",
					value: trait["Beverage"],
				},
				{
					trait_type: "Painting",
					value: trait["Painting"],
				},
			],
		};

		res.statusCode = 200;
		res.json(metadata);
	} else {
		res.statuscode = 404;
		res.json({ error: "The developer you requested is out of range!" });
	}
};

export default kryptoDeveloperApi;
