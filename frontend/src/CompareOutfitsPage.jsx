import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CompareOutfitsPage() {
  const navigate = useNavigate();

  const [userImage, setUserImage] = useState("");
  const [outputImage, setOutputImage] = useState("");

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
        navigate("/dashboard");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("compare_user");
    const output = localStorage.getItem("compare_output");

    if (user) setUserImage(user);
    if (output) setOutputImage(output);
  }, []);

  return (
    <div className="min-h-screen flex">

      {/* SIDEBAR */}
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

      {/* CONTENT */}
      <div className="flex-1 ml-64 p-10 bg-gray-50 h-screen overflow-y-auto">

        <h1 className="text-3xl font-bold text-purple-900 mb-8">
          Compare Outfits
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* ORIGINAL IMAGE */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-purple-800 mb-4">
              Original Image
            </h2>

            {userImage ? (
              <img
                src={userImage}
                alt="User"
                className="w-full h-96 object-contain rounded-xl border border-gray-200"
              />
            ) : (
              <p className="text-gray-500">No original image found</p>
            )}
          </div>

          {/* GENERATED IMAGE */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-purple-800 mb-4">
              Generated Try-On
            </h2>

            {outputImage ? (
              <img
                src={outputImage}
                alt="Try-On"
                className="w-full h-96 object-contain rounded-xl border border-gray-200"
              />
            ) : (
              <p className="text-gray-500">No generated image found</p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}