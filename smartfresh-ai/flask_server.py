from flask import Flask, request, jsonify
from flask_cors import CORS
from ml_model import train_model, get_ai_recommendation
from datetime import datetime
import pandas as pd

# Train model
model, label_encoder = train_model()

app = Flask(__name__)
CORS(app)  # allow all origins
 # CORS for frontend

# 🧠 Prediction Endpoint
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    product = data["product"]
    temp = data["temp"]
    humidity = data["humidity"]
    days = data["days_since_harvest"]
    packaging = data["packaging"]

    # Encode
    product_encoded = label_encoder.transform([product])[0]
    packaging_encoded = 1 if packaging == "GreenPod" else 0

    X = [[temp, humidity, days, product_encoded, packaging_encoded]]
    prediction = model.predict(X)[0]
    freshness = min(100, round((prediction / 7) * 100))

    # GPT suggestion
    ai_text = get_ai_recommendation(product, temp, humidity, days, packaging)

    return jsonify({
        "shelf_life": round(prediction, 2),
        "freshness": freshness,
        "gpt_suggestion": ai_text
    })


@app.route("/smart-cart", methods=["POST"])
def smart_cart():
    data = request.json
    purchase_history = data["history"]  # From Node/React backend
    smart_cart = []

    for item in purchase_history:
        product = item["name"]
        date = item.get("date") or datetime.now().strftime("%Y-%m-%d")

        # 🛠️ Parse ISO format safely (e.g., 2024-07-13T15:31:22.323Z)
        try:
            parsed_date = datetime.fromisoformat(date.rstrip("Z"))
        except ValueError:
            parsed_date = datetime.strptime(date.split("T")[0], "%Y-%m-%d")

        days_since = max(0, (datetime.now() - parsed_date).days)

        temp = 25
        humidity = 70
        packaging = "Normal"

        # Encode
        product_encoded = label_encoder.transform([product])[0]
        packaging_encoded = 1 if packaging == "GreenPod" else 0
        X = [[temp, humidity, days_since, product_encoded, packaging_encoded]]
        prediction = model.predict(X)[0]

        if prediction < 4:
            ai_text = get_ai_recommendation(product, temp, humidity, days_since, packaging)
            smart_cart.append({
                "product": product,
                "shelf_life": round(prediction, 2),
                "recommendation": ai_text
            })

    return jsonify({"smart_cart": smart_cart})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
