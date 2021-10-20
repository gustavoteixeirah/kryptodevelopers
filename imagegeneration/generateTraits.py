import json
import random

# backgrounds = ["Dark Room", "Light Room", "Office", "Tower View", "Beach", "Bedroom"]
# backgroundweights = [15, 10, 20, 5, 2, 48]
backgrounds = ["The Office"]
backgroundweights = [100]

# Fitzpatrick skin phototype
# https://dermnetnz.org/topics/skin-phototype
skinphototype = ["Jack"]
skinphototypeweights = [100]

faceaccessory = ["None", "Guy Folkes", "Sunglasses"]
faceaccessoryweights = [20, 40, 40]

hair = ["None", "Short", "Very Short"]
hairweights = [30, 30, 40]

painting = ["None", "Java", "Javascript"]
paintingweights = [30, 30, 40]

# The weights sum must equal 100
print(sum(backgroundweights))
print(sum(skinphototypeweights))
print(sum(faceaccessoryweights))
print(sum(hairweights))
print(sum(paintingweights))

TOTAL_DEVELOPERS = 27

traits = []


def createCombo():

    trait = {}

    trait["Background"] = random.choices(backgrounds, backgroundweights)[0]
    trait["Developer"] = random.choices(
        skinphototype, skinphototypeweights)[0]
    trait["Accessory"] = random.choices(
        faceaccessory, faceaccessoryweights)[0]
    trait["Hair"] = random.choices(hair, hairweights)[0]
    trait["Painting"] = random.choices(painting, paintingweights)[0]

    if trait in traits:
        return createCombo()
    else:
        return trait


for i in range(TOTAL_DEVELOPERS):
    newtraitcombo = createCombo()
    traits.append(newtraitcombo)


# ARE ALL DEVELOPERS  UNIQUE? I DUNNO KNOW HOW THIS WORKS BUT IT WORKS
def allUnique(x):
    seen = list()
    return not any(i in seen or seen.append(i) for i in x)


print("All unique?" + str(allUnique(traits)))


# ADD TOKEN IDS TO JSON

i = 0
for item in traits:
    item["tokenId"] = i
    i = i + 1


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

paintingcounts = {}
for item in painting:
    paintingcounts[item] = 0

# oneofonecounts = 0

# signatures = [137,883,1327,1781,2528,2763,3833,5568,5858,6585,6812,7154,8412]

for developer in traits:
    backgroundcounts[developer["Background"]] += 1
    skinphototypecounts[developer["Developer"]] += 1
    faceaccessorycounts[developer["Accessory"]] += 1
    haircounts[developer["Hair"]] += 1
    paintingcounts[developer["Painting"]] += 1

print("Background:", backgroundcounts)
print("Developer:", skinphototypecounts)
print("Accessory:", faceaccessorycounts)
print("Hair:", haircounts)
print("Painting:", haircounts)


with open('traits.json', 'w') as outfile:
    json.dump(traits, outfile, indent=4)
