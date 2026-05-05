import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DownloadsPage() {
  const navigate = useNavigate();
  const [downloads, setDownloads] = useState([]);

  const menuItems = [
    "Upload",
    "My Try-ons",
    "Downloads",
    "Compare outfits",
    "Profile",
    "Help & Support",
    "Logout",
  ];

  const handleMenuClick = (item) => {
    switch (item) {
      case "Upload":
        navigate("/dashboard");
        break;
      case "My Try-ons":
        navigate("/my-tryons");
        break;
      case "Downloads":
        navigate("/downloads");
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
        navigate("/dashboard");
    }
  };

  useEffect(() => {
    const savedDownloads =
      JSON.parse(localStorage.getItem("downloads")) || [];
    setDownloads(savedDownloads);
  }, []);

  return (
    <div className="min-h-screen flex">

      {/* ✅ SIDEBAR (FIXED) */}
      <div className="sidebar fixed top-0 left-0 h-full w-64 p-6 flex flex-col space-y-6 text-purple-900 bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        {menuItems.map((item) => (
          <button
            key={item}
            className="sidebar-btn text-left"
            onClick={() => handleMenuClick(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* ✅ CONTENT */}
      <div className="flex-1 ml-64 p-10 bg-gray-50 h-screen overflow-y-auto">

        <h1 className="text-3xl font-bold text-purple-900 mb-8">
          Downloaded Try-Ons
        </h1>

        {downloads.length === 0 ? (
          <p className="text-gray-600">
            No downloaded images yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {downloads.map((img, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300"
              >
                <img
                  src={img}
                  alt="Downloaded"
                  className="w-full h-64 object-cover rounded-lg"
                />

                <button
                  onClick={() => window.open(img, "_blank")}
                  className="mt-3 w-full bg-purple-900 text-white py-2 rounded-lg hover:bg-purple-800 transition"
                >
                  View Full Image
                </button>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}