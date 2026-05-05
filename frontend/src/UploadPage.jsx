import React, { useState } from "react";
import axios from "axios";

export default function UploadPage() {
  const [userImage, setUserImage] = useState(null);
  const [dressImage, setDressImage] = useState(null);
  const [outputImage, setOutputImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateTryOn = async () => {
    if (!userImage || !dressImage) {
      alert("Please upload both images.");
      return;
    }

    const formData = new FormData();
    formData.append("user_image", userImage);
    formData.append("cloth_image", dressImage);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:8000/virtual-tryon",
        formData
      );

      const fullUrl =
        "http://127.0.0.1:8000" + res.data.output_image;

      setOutputImage(fullUrl);

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to generate try-on");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Page</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setUserImage(e.target.files[0])}
      />
      <br /><br />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setDressImage(e.target.files[0])}
      />
      <br /><br />

      <button onClick={handleGenerateTryOn}>
        {loading ? "Generating..." : "Generate Try-On"}
      </button>

      {outputImage && (
        <div>
          <h3>Result:</h3>
          <img src={outputImage} width="300" />
        </div>
      )}
    </div>
  );
}