import json
import random

backgrounds = ["The Office", "Beach", "Dark", "Tower", "Company", "Kitchen"]
backgroundweights = [35, 5, 18, 2, 30, 10]

skinphototype = ["Jack", "Rose", "Alien", "Robot"]
skinphototypeweights = [0, 0, 0, 100]

faceaccessory = ["None", "Guy Folkes", "Sunglasses", "Jason",
                 "Juliete", "Milos", "Eyeglasses", "Earring", "Eye Patch"]
faceaccessoryweights = [11.5, 2, 15, 3, 15, 10, 28, 0.5, 15]

hair = ["None", "Dr Dree", "Goku", "Long", "Moicano",
        "Nerd", "Nerd Medium", "Short", "Very Short"]
hairweights = [5, 2, 5, 9, 15, 15, 28, 6, 15]

femalehair = ["None", "Channel", "Long", "Ponytail",
              "Ponytail2",  "Short", "Vanda", "Vanda2"]
femalehairweights = [10, 2, 5, 9, 15, 15, 28, 16]

painting = ["None", "Java", "Javascript", "Go",
            "Python", "Ruby", "Solidity", "CSharp"]
paintingweights = [5, 17, 20, 9, 15, 15, 8, 11]

beverages = ["None", "Coffee", "Soda", "Juice",
             "Energetic", "Protein Shake", "Tea", "Water Bottle"]
beveragesweights = [10, 40, 13, 5, 15, 5, 2, 10]

# The weights sum must equal 100
print(sum(backgroundweights))
print(sum(skinphototypeweights))
print(sum(faceaccessoryweights))
print(sum(hairweights))
print(sum(paintingweights))
print(sum(beveragesweights))

TOTAL_DEVELOPERS = 1000

traits = []


def createCombo():

    trait = {}

    trait["Background"] = random.choices(backgrounds, backgroundweights)[0]
    trait["Developer"] = random.choices(skinphototype, skinphototypeweights)[0]

    trait["Accessory"] = random.choices(faceaccessory, faceaccessoryweights)[0]    
    
    if trait["Accessory"] == "Milos":
        trait["Hair"] = "None"
    else:    
        if trait["Developer"] == "Jack":
            trait["Hair"] = random.choices(hair, hairweights)[0]
        else:
            if trait["Developer"] == "Robot":
                # trait["Hair"] = "None";
                # trait["Hair"] = random.choices(hair, hairweights)[0]
                trait["Hair"] = random.choices(femalehair, femalehairweights)[0]
            else: 
                trait["Hair"] = random.choices(femalehair, femalehairweights)[0]

    trait["Painting"] = random.choices(painting, paintingweights)[0]
    trait["Beverage"] = random.choices(beverages, beveragesweights)[0]

    if trait in traits:
        return createCombo()
    else:
        return trait


for i in range(TOTAL_DEVELOPERS):
    newtraitcombo = createCombo()
    traits.append(newtraitcombo)
    # print(i)


def allUnique(x):
    seen = list()
    return not any(i in seen or seen.append(i) for i in x)


print("All unique?" + str(allUnique(traits)))

i = 0
for item in traits:
    item["tokenId"] = i
    i = i + 1


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
for item in hair + femalehair:
    haircounts[item] = 0

paintingcounts = {}
for item in painting:
    paintingcounts[item] = 0

beveragescounts = {}
for item in beverages:
    beveragescounts[item] = 0

for developer in traits:
    backgroundcounts[developer["Background"]] += 1
    skinphototypecounts[developer["Developer"]] += 1
    faceaccessorycounts[developer["Accessory"]] += 1
    haircounts[developer["Hair"]] += 1
    paintingcounts[developer["Painting"]] += 1
    beveragescounts[developer["Beverage"]] += 1

print(sum(backgroundcounts.values()), " -> Background:", backgroundcounts)
print(sum(skinphototypecounts.values()), " -> Developer:", skinphototypecounts)
print(sum(faceaccessorycounts.values()), " -> Accessory:", faceaccessorycounts)
print(sum(haircounts.values()), " -> Hair:", haircounts)
print(sum(haircounts.values()), " -> Painting:", haircounts)
print(sum(beveragescounts.values()), " -> Beverage:", beveragescounts)


with open('traits.json', 'w') as outfile:
    json.dump(traits, outfile, indent=4)
