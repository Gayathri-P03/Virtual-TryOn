// DashboardPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DashboardPage() {
  const navigate = useNavigate();

  const [showHistory, setShowHistory] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [history, setHistory] = useState([]);

  const [userImage, setUserImage] = useState(null);
  const [dressImage, setDressImage] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const menuItems = [
    "Upload",
    "My Try-ons",
    "Downloads",
    "Compare outfits",
    "Profile",
    "Help & Support",
    "Logout",
  ];

  const fetchTryOns = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/results");
      setHistory(res.data);
      setShowHistory(true);
      setShowUpload(false);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch history");
    }
  };

  const handleMenuClick = (item) => {
    switch (item) {
      case "Upload":
        setShowUpload(true);
        setShowHistory(false);
        break;
      case "My Try-ons":
        navigate("/my-tryons");
        break;
      case "Downloads":
        navigate("/downloads");
        break;
      case "Compare outfits":
        navigate("/compare-outfits");
        break;
      case "Profile":
        navigate("/profile");
        break;
      case "Help & Support":
        navigate("/help-support");
        break;
      case "Logout":
        navigate("/");
        break;
      default:
        break;
    }
  };

  const handleGenerateTryOn = async () => {
  if (!userImage || !dressImage) {
    alert("Please select both user and dress images.");
    return;
  }

  const formData = new FormData();
  formData.append("user_image", userImage);
  formData.append("cloth_image", dressImage);

  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/virtual-tryon",
      formData
    );

    const outputUrl =
      "http://127.0.0.1:8000" + res.data.output_image;

    setOutputImage(outputUrl);

    // ✅ STORE USER IMAGE (BASE64)
    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("compare_user", reader.result);
      localStorage.setItem("compare_output", outputUrl);
    };
    reader.readAsDataURL(userImage);

    alert("Try-On generated successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to generate try-on.");
  }
};
  const handleDownload = (imageUrl) => {
  // download file
  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = "tryon.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // ✅ save to localStorage
  let downloads = JSON.parse(localStorage.getItem("downloads")) || [];

  if (!downloads.includes(imageUrl)) {
    downloads.push(imageUrl);
    localStorage.setItem("downloads", JSON.stringify(downloads));
  }
};

  return (
    <div className="min-h-screen flex">
      <div className="sidebar w-64 p-6 flex flex-col space-y-6 text-purple-900">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        {menuItems.map((item) => (
          <button
            key={item}
            className="sidebar-btn"
            onClick={() => handleMenuClick(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex-1 bg-white p-10">
        {showUpload ? (
          <>
            <h1 className="text-3xl font-bold text-purple-900 mb-6">
              Upload Images
            </h1>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-purple-700 font-medium">
                  User Image:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setUserImage(e.target.files[0])}
                  className="mt-2"
                />
              </div>

              <div>
                <label className="text-purple-700 font-medium">
                  Dress Image:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setDressImage(e.target.files[0])}
                  className="mt-2"
                />
              </div>

              <button
                onClick={handleGenerateTryOn}
                className="mt-4 bg-purple-900 text-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition duration-300 font-semibold"
              >
                {loading ? "Generating..." : "Generate Try-On"}
              </button>

              {!outputImage && !loading && (
                <p className="text-gray-500">No result yet</p>
              )}

              {outputImage && (
                <div className="mt-4">
                  <p className="text-purple-700 font-medium">
                    Generated Try-On:
                  </p>

                  <img
                    src={outputImage}
                    alt="Output"
                    className="w-full h-auto object-contain rounded-lg"
                  />

                  <button
                    onClick={() => handleDownload(outputImage)}
                    className="mt-2 bg-purple-900 text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition duration-300 font-semibold"
                  >
                    Download
                  </button>
                </div>
              )}
            </div>
          </>
        ) : showHistory ? (
          <>
            <h1 className="text-3xl font-bold text-purple-900 mb-6">
              My Try-Ons History
            </h1>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-purple-900">
              Welcome to Your Dashboard
            </h1>
          </>
        )}
      </div>
    </div>
  );
}