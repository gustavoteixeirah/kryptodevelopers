import random
import json

backgrounds = ["Dark Room", "Light Room", "Office", "Tower View", "Beach", "Bedroom"]
backgroundweights = [15, 10, 20, 5, 2, 48]

# Fitzpatrick skin phototype
# https://dermnetnz.org/topics/skin-phototype
skinphototype = ["Pale white", "Fair", "Darker white", "Light brown", "Brown", "Dark brown", "Blue", "Red"]
skinphototypeweights = [16, 16, 16, 16, 16, 16, 2, 2]

faceaccessory = ["None", "Round Eyeglasses", "Rectangle Eyeglasses", "Sunglasses", "Guy Fawkes Mask", "Jason Mask", "Bandana", "Pirate"]
faceaccessoryweights = [20, 25, 25, 6, 2, 2, 10, 10]

hair = ["None", "Long", "Medium", "Short", "Undercut", "Mohawk", "Afro"]
hairweights = [10, 10, 10, 15, 30, 10, 15]   

# The weights sum must equal 100
print(sum(backgroundweights))
print(sum(skinphototypeweights))
print(sum(faceaccessoryweights))
print(sum(hairweights))

TOTAL_DEVELOPERS = 10

traits = []

def createCombo():
    
    trait = {}

    trait["Background"] = random.choices(backgrounds, backgroundweights)[0]
    trait["Skin Phototype"] = random.choices(skinphototype, skinphototypeweights)[0]
    trait["Face Accessory"] = random.choices(faceaccessory, faceaccessoryweights)[0]
    trait["Hair"] = random.choices(hair, hairweights)[0]
    
    if trait in traits:
        return createCombo()
    else:
        return trait
    
for i in range(TOTAL_DEVELOPERS):
    
    newtraitcombo = createCombo()
    
    traits.append(newtraitcombo)



## ARE ALL DEVELOPERS  UNIQUE? I DUNNO KNOW HOW THIS WORKS BUT IT WORKS
def allUnique(x):
    seen = list()
    return not any(i in seen or seen.append(i) for i in x)

print(allUnique(traits))


# ADD TOKEN IDS TO JSON

i = 0
for item in traits:
    item["tokenId"] = i
    i = i + 1


# PRINT THE SHIT

print(traits)


# GET TRAIT COUNTS
backgroundcounts = {}
for item in backgrounds:
    backgroundcounts[item] = 0
    
skinphototypecounts = {}
for item in skinphototype:
    skinphototypecounts[item] = 0
    
faceaccessorycounts = {}
for item in faceaccessory:
    faceaccessorycounts[item] = 0
    
haircounts = {}
for item in hair:
    haircounts[item] = 0
    
# oneofonecounts = 0

# signatures = [137,883,1327,1781,2528,2763,3833,5568,5858,6585,6812,7154,8412]

for developer in traits:
        backgroundcounts[developer["Background"]] += 1
        skinphototypecounts[developer["Skin Phototype"]] += 1
        faceaccessorycounts[developer["Face Accessory"]] += 1
        haircounts[developer["Hair"]] += 1
    
print("background:", backgroundcounts)
print("skin phototypec:", skinphototypecounts)
print("face accessory:", faceaccessorycounts)
print("hair accessory:", haircounts)


with open('traits2.json', 'w') as outfile:
    json.dump(traits, outfile, indent=4)