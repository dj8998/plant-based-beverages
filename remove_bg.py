from rembg import remove
from PIL import Image
import os

# Input and output directories
input_dir = "public/images/products"
output_dir = "public/images/products/transparent"

# Create output directory if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# Process each image
for filename in os.listdir(input_dir):
    if filename.endswith(('.png', '.jpg', '.jpeg')):
        input_path = os.path.join(input_dir, filename)
        output_path = os.path.join(output_dir, filename)
        
        # Open the image
        input_image = Image.open(input_path)
        
        # Remove the background
        output_image = remove(input_image)
        
        # Save the result
        output_image.save(output_path)
        print(f"Processed {filename}") 