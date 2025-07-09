import streamlit as st
import pandas as pd
from datetime import datetime
from ml_model import train_model, get_ai_recommendation
  # ✅ ML model + GPT suggestion

model, label_encoder = train_model()

st.title("🥬 SmartFresh AI – Shelf Life Prediction")
st.write("Enter product conditions to predict shelf life and get recommendations.")

# 📝 Inputs
product = st.selectbox("Product", ["Lettuce", "Tomatoes", "Spinach", "Mango", "Banana", "Carrot"])
temp = st.slider("Temperature (°C)", 0, 35, 5)
humidity = st.slider("Humidity (%)", 30, 100, 70)
days_since_harvest = st.slider("Days Since Harvest", 0, 10, 2)
packaging = st.selectbox("Packaging", ["Normal", "GreenPod"])

if st.button("Predict Shelf Life"):
    product_encoded = label_encoder.transform([product])[0]
    packaging_encoded = 1 if packaging == "GreenPod" else 0
    X = [[temp, humidity, days_since_harvest, product_encoded, packaging_encoded]]

    prediction = model.predict(X)[0]
    st.subheader("📈 Predicted Shelf Life")
    st.success(f"✅ Shelf Life: {prediction:.1f} days")

    # 🍃 Freshness Score
    st.subheader("🍃 Freshness Score")
    freshness_score = min(100, round((prediction / 7) * 100))  # Assuming 7 is max shelf life
    st.metric(label="Freshness", value=f"{freshness_score}%")

    # 📦 Rule-based suggestion
    st.subheader("📦 Manual Suggestion")
    if prediction <= 1:
        st.warning("⚠️ Mark down and donate if unsold today.")
    elif prediction <= 3:
        st.info("📦 Move to fast-sell area or apply 20–30% discount.")
    else:
        st.success("👍 Store normally and monitor.")

    # 💬 GPT Suggestion
    st.subheader("💬 WasteGPT Recommendation")
    with st.spinner("WasteGPT is thinking..."):
        ai_text = get_ai_recommendation(product, temp, humidity, days_since_harvest, packaging)
        st.write(ai_text)

    # 🚚 Routing Logic
    st.subheader("🚚 Routing Recommendation")
    if prediction < 2:
        st.warning("📍 Route to nearby store to minimize spoilage.")
    elif prediction < 4:
        st.info("📍 Route to medium-distance store with good demand.")
    else:
        st.success("📍 Safe to deliver to far-away high-demand store.")

    # 📁 Log prediction (optional)
    st.subheader("📁 Log Prediction to CSV")
    if st.checkbox("💾 Save this result"):
        log_data = {
            "Timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "Product": product,
            "Temperature": temp,
            "Humidity": humidity,
            "Days Since Harvest": days_since_harvest,
            "Packaging": packaging,
            "Predicted Shelf Life": round(prediction, 2),
            "Freshness Score": freshness_score,
            "WasteGPT Suggestion": ai_text
        }

        try:
            df_log = pd.DataFrame([log_data])
            df_log.to_csv("shelf_life_log.csv", mode="a", header=False, index=False)
            st.success("📁 Logged successfully to shelf_life_log.csv")
        except Exception as e:
            st.error(f"❌ Failed to log: {e}")
