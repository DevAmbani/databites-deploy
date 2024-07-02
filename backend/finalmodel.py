# Import Required Libraries
import os
import shutil
from operator import itemgetter
import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf
from PIL import Image
from flask import Flask, request, jsonify, send_file
import io
import json

from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.layers import (
    BatchNormalization,
    Conv2D,
    Dense,
    Dropout,
    Flatten,
    GlobalAveragePooling2D,
    Input,
    MaxPooling2D,
)
from tensorflow.keras.models import load_model, Model, Sequential
from tensorflow.keras.preprocessing.image import (
    ImageDataGenerator,
    img_to_array,
    load_img,
)
from tensorflow.keras.regularizers import l2
from image_segmentation import image_segment

# DEMO IMAGE
image = "20240503105936_image.jpg"


def run_model(image):

    # print("model start") #PRINT CHECK
    MODEL_PATH = "model.h5"
    model = tf.keras.models.load_model(MODEL_PATH)
    model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])

    # Input Image Starts Here
    # Image Segmentation Here
    # Call the function to extract the images
    extracted_images = image_segment(image)

    # for i, img in enumerate(extracted_images): #PRINT CHECK
    #     print(f"Visualizing extracted image {i+1}")
    #     img.show()

    # Define paths for pizza and sandwich images
    PIZZA_IMAGES = [
        "input_train_pizza/pizza_image_1.jpg",
        "input_train_pizza/pizza_image_2.jpg",
        "input_train_pizza/pizza_image_3.jpg",
    ]
    SANDWICH_IMAGES = [
        "input_train_sandwich/sandwich_image_1.jpg",
        "input_train_sandwich/sandwich_image_2.jpg",
        "input_train_sandwich/sandwich_image_3.jpg",
    ]

    # Hard-Encoded for Secondary Classifier
    IMAGE_SIZE = (150, 150)
    BATCH_SIZE = 6
    EPOCHS = 5

    # print(model.summary())
    base_model = Model(inputs=model.layers[0].input, outputs=model.layers[-2].output)

    # Preprocess and Extract Relevant Features
    def preprocess_image(image_path):
        """Load and preprocess an image."""
        img = load_img(image_path, target_size=IMAGE_SIZE)
        img = img_to_array(img)
        img = np.expand_dims(img, axis=0)
        img /= 255.0  # Since Model is Trained with Normalization
        return img

    def extract_features(image_paths):
        """Batch processing of images to extract features."""
        images = np.vstack([preprocess_image(img) for img in image_paths])
        return base_model.predict(images)

    # Train Secondary Classifier
    def train_new_classifier(features, labels):
        """Define and train a new classifier with adjusted regularization and dropout."""
        classifier = tf.keras.Sequential(
            [
                Dense(256, activation="relu", kernel_regularizer=l2(0.001)),
                BatchNormalization(),
                Dropout(0.7),  # Reduced dropout
                Dense(1, activation="sigmoid"),
            ]
        )

        classifier.compile(
            optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"]
        )
        early_stopping = EarlyStopping(
            monitor="val_loss", patience=5, restore_best_weights=True
        )

        classifier.fit(
            features,
            labels,
            batch_size=BATCH_SIZE,
            epochs=EPOCHS,
            callbacks=[early_stopping],
            validation_split=0.2,
        )
        return classifier

    def classify_trial_images(
        classifier, feature_extractor, folder_path, num_images=50
    ):
        """Classify images in a specified folder and return results."""
        results = []
        image_paths = [
            os.path.join(folder_path, fname)
            for fname in os.listdir(folder_path)
            if fname.lower().endswith(("png", "jpg", "jpeg"))
        ][:num_images]
        for image_path in image_paths:
            processed_image = preprocess_image(image_path)
            # Extract features using the base model
            features = feature_extractor.predict(processed_image)
            # Predict using the extracted features
            prediction = classifier.predict(features).flatten()[0]
            results.append((image_path, prediction))
        return results
    
    def scale_confidence(confidence):
        confidence = confidence * 100
        """Scale the confidence score to range [50, 100] with more granularity."""
        # Ensure confidence is in the range 0-100
        confidence = max(50, min(confidence, 98))
        # Scale to range [50, 100] with more granularity
        scaled_confidence = 50 + (confidence * 0.5)
        scaled_confidence = max(60, min(scaled_confidence, 98))
        # scaled_confidence = max(55, min(confidence, 98))
        return round(scaled_confidence)
    
    # def scale_confidence(confidence):
    #     # confidence = confidence * 100
    #     """Scale the confidence score based on the given ranges."""
    #     if confidence >= 75:
    #         # Scale to range [80, 95]
    #         return 80 + (confidence - 75) * (15 / 25)
    #     elif confidence >= 60:
    #         # Scale to range [65, 80]
    #         return 65 + (confidence - 60) * (15 / 15)
    #     elif confidence >= 50:
    #         # Scale to range [50, 65]
    #         return 50 + (confidence - 50) * (15 / 10)
    #     else:
    #         return 50
        
    # def invert_confidence(confidence):
    #     invert_confidence = 1 - confidence
    #     return invert_confidence



    def calculate_top_images(results, top_n=9):
        """Sort results by confidence and display the top N images for pizzas and sandwiches."""
        # Sort results for pizzas (high confidence) and sandwiches (low confidence)
        pizza_results = sorted(results, key=lambda x: x[1], reverse=True)[:top_n]
        sandwich_results = sorted(results, key=lambda x: x[1])[:top_n]
        print(pizza_results)
        print(sandwich_results)
        print("")
        
        # Apply scaling to confidence scores
        pizza_results_scaled = [(path, round(scale_confidence(conf))) for path, conf in pizza_results] 
        sandwich_results_scaled = [(path, round(scale_confidence((conf)))) for path, conf in sandwich_results] 
        print(pizza_results_scaled)
        print(sandwich_results_scaled)
        # # Display top pizza results
        # plt.figure(figsize=(15, 7.5))
        # plt.suptitle("Top 10 Pizza Images")
        # for i, (path, confidence) in enumerate(pizza_results_scaled, 1):
        #     plt.subplot(2, 5, i)
        #     img = Image.open(path)
        #     plt.imshow(img)
        #     plt.title(f"Conf: {confidence:.2f}")
        #     plt.axis("off")
        # plt.show()

        # # Display top sandwich results
        # plt.figure(figsize=(15, 7.5))
        # plt.suptitle("Top 10 Sandwich Images")
        # for i, (path, confidence) in enumerate(sandwich_results_scaled, 1):
        #     plt.subplot(2, 5, i)
        #     img = Image.open(path)
        #     plt.imshow(img)
        #     plt.title(f"Conf: {1-confidence:.2f}")
        #     plt.axis("off")
        # plt.show()

        return pizza_results_scaled, sandwich_results_scaled

    # List of Possible Output Images
    image_directory = "output_image_list"

    # Prepare and extract features for training data
    x_train = extract_features(PIZZA_IMAGES + SANDWICH_IMAGES)
    y_train = np.array([1] * 3 + [0] * 3)  # 1 for pizza, 0 for sandwich

    # Train a new classifier
    classifier = train_new_classifier(x_train, y_train)

    results = classify_trial_images(classifier, base_model, image_directory)
    pizza_results, sandwich_results = calculate_top_images(results)

    return pizza_results, sandwich_results


def main():

    pizza_results, sandwich_results = run_model(image)
    # print(pizza_results)


if __name__ == "__main__":
    main()
