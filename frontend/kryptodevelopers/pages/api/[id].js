import traits from "./traits.json";


const kryptoDeveloperApi = async (req, res) => {

	const totalSupply = 10000;

	const query = req.query.id;

	if (parseInt(query) < totalSupply) {
	37,883,1327,1781,2528,2763,3833,5568,5858,6585,6812,7154,8412]
		  const trait = traits[parseInt(query)]
		// cons OPENSEA METADATA STANDARD DOCUMENTATION https://docs.opensea.io/docs/metadata-standards
		let metadata = {};
		metadata = {
			description:
				"BoringBananasCo is a community-centered enterprise focussed on preserving our research about the emerging reports that several banana species have begun exhibiting strange characteristics following the recent worldwide pandemic. Our research team located across the globe has commenced efforts to study and document these unusual phenomena. Concerned about parties trying to suppress our research, the team has opted to store our findings on the blockchain to prevent interference. Although this is a costly endeavour, our mission has never been clearer. The fate of the world's bananas depends on it.",
			tokenId: parseInt(query),
			image: `https://gateway.pinata.cloud/ipfs/${trait["imageIPFS"]}`,
			external_url: "https://www.boringbananas.co",
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
