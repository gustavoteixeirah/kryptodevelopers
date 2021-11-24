import json
## ADD IPFS HASH TO JSON, ASSUMING YOU HAVE A JSON FILE LIKE THIS:

# '''
# {
# "QmeBdP4zNCEEbqm9Y2UZb6skg8RVLkgDzQ2ojgZf71cBc8": "0",
# "QmWBLUBgVJfSGQDHDR5LNyccRatnsBDjUwtCv7DpiQ9N11": "1",
# "QmejsSBzpYyeG8SgyZejrCxrABS4t7e1fjysstBJkNr6Bg": "10",
# ...
# }
with open("./traits.json", 'r') as f:
    traits = json.load(f)

with open("./finalHashes.json", 'r') as f:
    hashes = json.load(f)
    
for k,v in hashes.items():
    print(k,v)
    traits[v]["imageIPFS"] = k


with open('metadata.json', 'w') as outfile:
    json.dump(traits, outfile, indent=4)