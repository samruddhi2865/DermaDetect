import sys
import os
import json

import torch
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image

# -----------------------------
# Image transformation
# -----------------------------
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# -----------------------------
# Load model
# -----------------------------
model = models.resnet50(weights=None)
num_classes = 10
model.fc = torch.nn.Linear(model.fc.in_features, num_classes)

model_path = os.path.abspath('model/resnet50_custom.pth')

try:
    state_dict = torch.load(model_path, map_location=torch.device('cpu'))
    model.load_state_dict(state_dict)
except Exception as e:
    # send error to stderr so Node can see it, then exit with non‑zero code
    print(f"Model loading error: {e}", file=sys.stderr)
    sys.exit(1)

model.eval()

# -----------------------------
# Disease labels & precautions
# -----------------------------
DISEASE_INFO = {
    "Normal": {
        "precautions": [
            "Maintain good skin hygiene with gentle cleansing.",
            "Use broad-spectrum SPF 30+ sunscreen daily.",
            "Moisturize regularly to keep skin hydrated.",
            "Avoid excessive sun exposure between 10 AM - 4 PM."
        ]
    },
    "acne": {
        "precautions": [
            "Wash face twice daily with gentle, non-comedogenic cleanser.",
            "Avoid touching face with unwashed hands.",
            "Don't pick or squeeze pimples to prevent scarring.",
            "Use oil-free, non-comedogenic moisturizers and makeup.",
            "Avoid high-glycemic foods and maintain hydration."
        ]
    },
    "bullous": {
        "precautions": [
            "Avoid trauma to blisters; do not pop them.",
            "Keep blisters clean and covered with sterile dressing.",
            "Avoid tight clothing that causes friction.",
            "Seek medical attention for widespread blisters.",
            "Watch for signs of infection such as pus or fever."
        ]
    },
    "chickenpox": {
        "precautions": [
            "Keep infected person isolated to reduce spread.",
            "Use calamine lotion and cool baths to relieve itching.",
            "Keep nails short to avoid scratching lesions.",
            "Do not give aspirin to children.",
            "Discuss vaccination with a healthcare provider."
        ]
    },
    "dermatitis": {
        "precautions": [
            "Avoid trigger substances such as harsh soaps or metals.",
            "Use fragrance-free, hypoallergenic moisturizers.",
            "Wear soft cotton clothes; avoid wool and rough fabrics.",
            "Moisturize immediately after bathing.",
            "Avoid very hot showers which dry out skin."
        ]
    },
    "eczema": {
        "precautions": [
            "Apply thick moisturizer 2–3 times daily.",
            "Take short, lukewarm baths or showers.",
            "Use mild, fragrance-free cleansers only.",
            "Avoid known triggers such as dust or pet dander.",
            "Keep nails trimmed to reduce skin damage from scratching."
        ]
    },
    "hives": {
        "precautions": [
            "Avoid known triggers like specific foods or medicines.",
            "Use cool compresses to reduce itching.",
            "Wear loose, cotton clothing.",
            "Avoid very hot showers and tight clothes.",
            "Keep a diary to help identify new triggers."
        ]
    },
    "measles": {
        "precautions": [
            "Isolate the patient during the contagious period.",
            "Ensure good hydration and rest.",
            "Discuss MMR vaccination with a doctor.",
            "Monitor for breathing difficulty or high fever.",
            "Seek medical care promptly for complications."
        ]
    },
    "monkeypox": {
        "precautions": [
            "Isolate and avoid close contact with others.",
            "Keep lesions covered with clean dressings.",
            "Do not share bedding, clothing, or towels.",
            "Wash hands frequently with soap and water.",
            "Seek medical evaluation for testing and guidance."
        ]
    },
    "psoriasis": {
        "precautions": [
            "Moisturize skin frequently with thick creams.",
            "Avoid smoking and limit alcohol.",
            "Protect skin from injuries and sunburn.",
            "Manage stress through relaxation or exercise.",
            "Discuss treatment options with a dermatologist."
        ]
    }
}

# Preserve the order of labels – must match how the model was trained
LABELS = list(DISEASE_INFO.keys())


# -----------------------------
# Prediction function
# -----------------------------
def predict(image_path: str):
    try:
        image = Image.open(image_path).convert('RGB')
        image = transform(image).unsqueeze(0)
    except Exception as e:
        print(f"Image processing error: {e}", file=sys.stderr)
        sys.exit(1)

    with torch.no_grad():
        outputs = model(image)
        _, predicted = torch.max(outputs, 1)

    idx = predicted.item()
    if idx < 0 or idx >= len(LABELS):
        print("Invalid prediction index.", file=sys.stderr)
        sys.exit(1)

    predicted_label = LABELS[idx]

    result = {
        "prediction": predicted_label,
        "precautions": DISEASE_INFO[predicted_label]["precautions"]
    }
    return result


# -----------------------------
# CLI entry point
# -----------------------------
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("No image path provided.", file=sys.stderr)
        sys.exit(1)

    image_path_arg = sys.argv[1]
    result_obj = predict(image_path_arg)

    # print pure JSON string to stdout for Node.js
    print(json.dumps(result_obj))
