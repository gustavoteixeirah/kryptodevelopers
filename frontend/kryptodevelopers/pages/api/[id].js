import Web3 from 'web3';
import { ABI } from '../../config.js';
import { connectToDatabase } from '../../database.js';

const INFURA_ADDRESS = process.env.INFURA_ADDRESS;
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const validInput = async (_input) => {
    try {
        let input = parseInt(_input);
        if (!(input >= 0 && input < 10000)) {
            throw new RangeError('The argument must be between 0 and 9999.');
        }
    } catch (e) {
        return false;
    }
    return true;
};

const getMetadata = async (tokenId) => {
	let db = await connectToDatabase();
	return db.collection('metadata').find({"tokenId":tokenId}).toArray();
};

const kryptoDeveloperApi = async (req, res) => {
    const query = req.query.id;
    const requestIsValid = await validInput(query);

    if (requestIsValid) {
        const provider = new Web3.providers.HttpProvider(INFURA_ADDRESS);
        const web3infura = new Web3(provider);
        const contract = new web3infura.eth.Contract(ABI, CONTRACT_ADDRESS);

        const totalSupply = await contract.methods.totalSupply().call();
        console.log(totalSupply);

        if (parseInt(query) < totalSupply) {
            const trait = (await getMetadata(parseInt(query)))[0];
            let metadata = {};
            metadata = {
                description:
                    'Developers are the key people behind any software that has ever been built. Software programs for simple led switching to space programs. Simple arithmetic to complex calculus. This NFT collection seeks to illustrate these hard-working people that expends their days in front of a computer to solve problems.',
                tokenId: parseInt(query),
                image: `https://gateway.pinata.cloud/ipfs/${trait['imageIPFS']}`,
                external_url: 'https://kryptodevelopers.dev',
                attributes: [
                    {
                        trait_type: 'Background',
                        value: trait['Background'],
                    },
                    {
                        trait_type: 'Developer',
                        value: trait['Developer'],
                    },
                    {
                        trait_type: 'Accessory',
                        value: trait['Accessory'],
                    },
                    {
                        trait_type: 'Hair',
                        value: trait['Hair'],
                    },
                    {
                        trait_type: 'Beverage',
                        value: trait['Beverage'],
                    },
                    {
                        trait_type: 'Painting',
                        value: trait['Painting'],
                    },
                ],
            };

            res.statusCode = 200;
            res.json(metadata);
        } else {
            res.statuscode = 404;
            res.json({
                error: 'The developer you requested has not yet arrived in our world!',
            });
        }
    } else {
        res.statuscode = 400;
        res.json({ error: 'Must enter a valid number! (0 - 9999)' });
    }
};

export default kryptoDeveloperApi;
