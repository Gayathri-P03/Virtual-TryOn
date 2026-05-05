import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TryOnsPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchTryOns();
  }, []);

  const fetchTryOns = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/results");
      setHistory(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch history");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Try-On History</h2>

      {history.map((item) => (
        <div key={item.id}>
          <img
            src={"http://127.0.0.1:8000" + item.output_image}
            width="250"
          />
        </div>
      ))}
    </div>
  );
}