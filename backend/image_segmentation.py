from PIL import Image
import os

def image_segment(img_path):
    image_trial = Image.open(img_path)

    print('segmentation starts')
    
    regions = [
        (60,35,457,447),
        (492,39,884,453),
        (917,57,1306,459),
        (27,537,439,970),  
        (481,541,887,968),  
        (910,548,1316,960)
    ]

    # Directory paths
    pizza_path = 'input_train_pizza'
    sandwich_path = 'input_train_sandwich'

    # Ensure the directories exist
    os.makedirs(pizza_path, exist_ok=True)
    os.makedirs(sandwich_path, exist_ok=True)

    # File names for each cropped image
    specific_image_paths = [
        os.path.join(pizza_path, 'pizza_image_1.jpg'),
        os.path.join(pizza_path, 'pizza_image_2.jpg'),
        os.path.join(pizza_path, 'pizza_image_3.jpg'),
        os.path.join(sandwich_path, 'sandwich_image_1.jpg'),
        os.path.join(sandwich_path, 'sandwich_image_2.jpg'),
        os.path.join(sandwich_path, 'sandwich_image_3.jpg')
    ]

    # Extract and save each region
    extracted_images = []
    for i, region in enumerate(regions):
        # Crop the image according to the region
        cropped_image = image_trial.crop(region)
        cropped_image.save(specific_image_paths[i])
        extracted_images.append(cropped_image)
    
    return extracted_images
