import traits from "./traits.json";

const kryptoDeveloperApi = async (req, res) => {
	const totalSupply = 20;

	const query = req.query.id;

	if (parseInt(query) < totalSupply) {
		const trait = traits[parseInt(query)];
		// cons OPENSEA METADATA STANDARD DOCUMENTATION https://docs.opensea.io/docs/metadata-standards
		let metadata = {};
		metadata = {
			description:
				"KryptoDevelopers are...",
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

		// console.log(metadata)

		res.statusCode = 200;
		res.json(metadata);
	} else {
		res.statuscode = 404;
		res.json({ error: "The developer you requested is out of range" });
	}
};

export default kryptoDeveloperApi;
