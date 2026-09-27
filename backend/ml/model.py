"""
Attentive Convolutional Recurrent Neural Network (ACRNN) Architecture
Combines Transfer Learning (MobileNetV2 feature extractor) with
Convolutional refinement, Bidirectional Recurrent sequential processing,
and an Attention Mechanism for focused crop lesion diagnosis.
"""

import os
import tensorflow as tf
from tensorflow.keras import layers, models, backend as K

class SpatialAttention(layers.Layer):
    """
    Attention mechanism layer that computes spatial attention weights
    across feature map locations, highlighting regions corresponding
    to leaf spots, lesions, or chlorotic zones.
    """
    def __init__(self, **kwargs):
        super(SpatialAttention, self).__init__(**kwargs)

    def build(self, input_shape):
        self.conv = layers.Conv2D(
            filters=1,
            kernel_size=(7, 7),
            padding="same",
            activation="sigmoid",
            use_bias=False,
            name="attention_conv"
        )
        super(SpatialAttention, self).build(input_shape)

    def call(self, inputs):
        # inputs shape: (batch, height, width, channels)
        avg_pool = tf.reduce_mean(inputs, axis=-1, keepdims=True)
        max_pool = tf.reduce_max(inputs, axis=-1, keepdims=True)
        concat = tf.concat([avg_pool, max_pool], axis=-1)
        attention_map = self.conv(concat)
        return inputs * attention_map

    def get_config(self):
        config = super(SpatialAttention, self).get_config()
        return config

def build_acrnn_model(num_classes: int = 41, input_shape: tuple = (224, 224, 3)) -> models.Model:
    """
    Constructs the end-to-end ACRNN model:
    1. Input Layer: (224, 224, 3)
    2. Transfer Learning: MobileNetV2 pretrained backbone (weights='imagenet', include_top=False)
    3. Convolutional refinement block
    4. Spatial Attention Layer for disease lesion localization
    5. Reshape to feature sequence for contextual recurrent processing
    6. Bidirectional GRU / LSTM recurrent layer
    7. Global Pooling and Dense classification head with Dropout
    """
    inputs = layers.Input(shape=input_shape, name="input_image")
    
    # 1. Transfer Learning Feature Extractor (MobileNetV2)
    base_model = tf.keras.applications.MobileNetV2(
        input_shape=input_shape,
        include_top=False,
        weights="imagenet"
    )
    base_model.trainable = False  # Freeze backbone for transfer learning
    
    features = base_model(inputs)  # Output: (batch, 7, 7, 1280)
    
    # 2. Convolutional refinement
    conv_refined = layers.Conv2D(256, (3, 3), padding="same", activation="relu", name="conv_refine")(features)
    conv_refined = layers.BatchNormalization(name="conv_bn")(conv_refined)
    
    # 3. Spatial Attention Mechanism
    attended_features = SpatialAttention(name="spatial_attention")(conv_refined)  # (batch, 7, 7, 256)
    
    # 4. Sequential Contextual Processing (Recurrent Layer)
    # Reshape (7, 7, 256) into a sequence of 49 spatial steps each with 256 features
    sequence = layers.Reshape((49, 256), name="spatial_sequence")(attended_features)
    recurrent_out = layers.Bidirectional(
        layers.GRU(128, return_sequences=False),
        name="bidirectional_gru"
    )(sequence)  # (batch, 256)
    
    # 5. Classification Head
    dense_1 = layers.Dense(256, activation="relu", name="dense_features")(recurrent_out)
    dense_1 = layers.BatchNormalization(name="dense_bn")(dense_1)
    dense_1 = layers.Dropout(0.4, name="dropout")(dense_1)
    
    outputs = layers.Dense(num_classes, activation="softmax", name="prediction_probabilities")(dense_1)
    
    model = models.Model(inputs=inputs, outputs=outputs, name="ACRNN_Crop_Model")
    return model

def get_model_summary_dict() -> dict:
    """Returns metadata and architectural description of the ACRNN model."""
    return {
        "model_name": "ACRNN (Attentive Convolutional Recurrent Neural Network)",
        "backbone": "MobileNetV2 Transfer Learning",
        "input_resolution": "224x224x3 RGB",
        "attention_layer": "Spatial Attention Mechanism (7x7 receptive field)",
        "recurrent_layer": "Bidirectional Gated Recurrent Unit (Bi-GRU 128 units)",
        "classification_classes": 41,
        "datasets": [
            "PlantVillage Dataset (54,303 leaf images across 14 crop species)",
            "Sentinel-2 Multispectral MSI Imagery (Band 4 Red, Band 8 NIR)",
            "Drone / UAV High-Resolution RGB & Multispectral Canopy Data"
        ],
        "pipeline_stages": [
            {"stage": 1, "name": "Input Image", "description": "Leaf or canopy photograph (RGB)"},
            {"stage": 2, "name": "Image Preprocessing", "description": "OpenCV blur/dark validation, bilinear resize to 224x224, pixel normalization [0, 1]"},
            {"stage": 3, "name": "Transfer Learning Backbone", "description": "MobileNetV2 feature extractor initialized on ImageNet"},
            {"stage": 4, "name": "CNN Feature Extraction", "description": "256-channel Conv2D block with Batch Normalization"},
            {"stage": 5, "name": "Spatial Attention Mechanism", "description": "Computes spatial weight matrix focusing on necrotic lesions and chlorosis"},
            {"stage": 6, "name": "Contextual Recurrent Processing", "description": "Spatial-to-sequence reshape with Bidirectional GRU to model spatial context"},
            {"stage": 7, "name": "Softmax Classification", "description": "Dense projection yielding normalized crop and disease probabilities"}
        ]
    }
