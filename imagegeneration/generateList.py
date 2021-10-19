import json
import os

backgrounds = []
face_accessories = []
hairs = []

traits = ["backgrounds", "face_accessories", "hairs"]
for trait in traits:
    folder = os.listdir('./images/'+trait)
    for image in folder:
        if trait == 'backgrounds':
            backgrounds.append(image)
        elif trait == 'face_accessories':
            face_accessories.append(image)
        elif trait == 'hairs':
            hairs.append(image)

images_names = {}
images_names["Backgrounds"] = backgrounds
images_names["Face Accessory"] = face_accessories
images_names["Hair"] = hairs

with open('imagesnames.json', 'w') as outfile:
    json.dump(images_names, outfile, indent=4)
