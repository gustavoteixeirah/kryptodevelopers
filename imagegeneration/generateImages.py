import json
import os

from IPython.display import display
from PIL import Image, ImageOps

path = os.getcwd()
print(path)


# READ METADATA
with open("./traits.json", 'r') as f:
    traits = json.load(f)

# IMAGE GENERATION
for trait in traits:
    # BACKGROUND
    background = Image.open(
        f'{path}/images/background/{trait["Background"]}.png').convert('RGBA')

    # DEVELOPER
    developer = Image.open(
        f'{path}/images/developer/{trait["Developer"]}.png').convert('RGBA')

    # HAIR
    if (trait["Accessory"] == "Milos"):
        hair = Image.open(f'{path}/images/hair_male/None.png').convert('RGBA')
    else:
        if (trait["Developer"] == "Jack" or trait["Developer"] == "Robot"):
            hair = Image.open(
                f'{path}/images/hair_male/{trait["Hair"]}.png').convert('RGBA')
        else:
            hair = Image.open(
                f'{path}/images/hair_female/{trait["Hair"]}.png').convert('RGBA')

    # ACCESSORY
    if (trait["Accessory"] == "Earring" and trait["Developer"] == "Rose"):
        accessory = Image.open(
            f'{path}/images/accessoryFemale/{trait["EarringFemale"]}.png').convert('RGBA')
    else:
        accessory = Image.open(
            f'{path}/images/accessoryMale/{trait["Accessory"]}.png').convert('RGBA')

    # PAINTING
    if (trait["Background"] == "Company"):
        painting = Image.open(
            f'{path}/images/Painting_Company/{trait["Painting"]}.png').convert('RGBA')
    elif (trait["Background"] == "Kitchen"):
        painting = Image.open(
            f'{path}/images/Painting_Kitchen/{trait["Painting"]}.png').convert('RGBA')
    elif (trait["Background"] == "Tower"):
        painting = Image.open(
            f'{path}/images/Painting_Tower/{trait["Painting"]}.png').convert('RGBA')
    else:
        painting = Image.open(
            f'{path}/images/painting/{trait["Painting"]}.png').convert('RGBA')

    # BEVERAGE
    beverage = Image.open(
        f'{path}/images/beverage/{trait["Beverage"]}.png').convert('RGBA')

    # Create each composite
    com1 = Image.alpha_composite(background, painting)
    com2 = Image.alpha_composite(com1, developer)
    com3 = Image.alpha_composite(com2, hair)
    com4 = Image.alpha_composite(com3, accessory)
    com5 = Image.alpha_composite(com4, beverage)

    # Convert to RGB
    rgb_im = com5.convert('RGB')
    resizedImage = rgb_im.resize((512, 512), Image.NEAREST)

    file_name = str(trait["tokenId"]) + ".png"
    resizedImage.save("./output/" + file_name)
    print(f'{str(trait["tokenId"])} done')


# with open("imagegeneration/hashes2.json", 'r') as f:
#     hashes = json.load(f)

# for k,v in hashes.items():
#     print(k,v)
#     traits[v]["imageIPFS"] = k

# with open('traits.json', 'w') as outfile:
#     json.dump(traits, outfile, indent=4)
