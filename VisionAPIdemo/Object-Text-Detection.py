import os
import io
from google.cloud import vision_v1 as vision
from google.cloud.vision_v1 import types

# Set the path to your JSON key file
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r"groceryapi.json"

# Initialize the Google Cloud Vision client
client = vision.ImageAnnotatorClient()

def detect_objects_and_text(image_path):
    # Reading the image file
    with open(image_path, 'rb') as image_file:
        content = image_file.read()

    # Creating an image object
    image = vision.Image(content=content)

    # Specifying the desired features for our model
    features = [
        types.Feature(type=vision.Feature.Type.OBJECT_LOCALIZATION),
        types.Feature(type=vision.Feature.Type.TEXT_DETECTION)
    ]

    # Perform the annotation request
    response = client.annotate_image({
        'image': image,
        'features': features
    })

    # Extract object detection results
    objects = response.localized_object_annotations

    # Extract text detection results
    text_annotations = response.text_annotations

    # Sorting the objects by their score in descending order
    sorted_objects = sorted(objects, key=lambda obj: obj.score, reverse=True)

    # Selecting the object with the highest score
    if sorted_objects:
        highest_score_object = sorted_objects[0]
    detected_objects = highest_score_object.name
    detected_text = [text.description for text in text_annotations]

    return detected_objects, detected_text

# Usage example
file_name = 'IMG_20220318_183948.jpg' #Image name
image_path = f'.\images\{file_name}' #path for the image
objects, text = detect_objects_and_text(image_path) 
print('Detected Objects:', objects)
print('Detected Text:', text)
