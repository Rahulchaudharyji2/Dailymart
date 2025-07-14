import React, { useEffect, useState } from "react";

function SmartCart({ userId }) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // 1. Fetch user's history from Node backend
    const fetchHistory = async () => {
      const res = await fetch(`http://localhost:8080/purchase/user123`);
      const historyData = await res.json();

      // Flatten all items from multiple orders
      const allItems = historyData.flatMap(p => p.products);

      // 2. Send to Flask
      const flaskRes = await fetch("http://localhost:5000/smart-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: allItems }),
      });

      const data = await flaskRes.json();
      setSuggestions(data.smart_cart);
    };

    fetchHistory();
  }, [userId]);

  return (
    <div className="smart-cart">
      <h2>🧠 Smart Cart Recommendations</h2>
      {suggestions.length === 0 ? (
        <p>No suggestions yet.</p>
      ) : (
        suggestions.map((item, index) => (
          <div key={index} className="smart-card">
            <h3>{item.product}</h3>
            <p>Predicted Shelf Life: {item.shelf_life} days</p>
            <p>🧠 AI Tip: {item.recommendation}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default SmartCart;
