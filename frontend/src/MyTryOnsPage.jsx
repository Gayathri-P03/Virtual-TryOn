import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyTryOnsPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

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

  
  const fetchTryOns = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/results");

      console.log("RAW DATA:", res.data); 

      const formatted = res.data.map((item) => {
        let path = item.output_image || "";

        
        path = path.replace(/\\/g, "/");

       
        if (!path.startsWith("/outputs")) {
          const fileName = path.split("/").pop();
          path = `/outputs/${fileName}`;
        }

        return {
          ...item,
          output_image: `http://127.0.0.1:8000${path}`,
        };
      });

      console.log("FINAL URLs:", formatted); 

      setHistory(formatted);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch try-ons.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTryOns();
  }, []);

  const handleDownload = (imageUrl) => {
  
  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = "tryon.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  
  let downloads = JSON.parse(localStorage.getItem("downloads")) || [];

  if (!downloads.includes(imageUrl)) {
    downloads.push(imageUrl);
    localStorage.setItem("downloads", JSON.stringify(downloads));
  }
};

  return (
    <div className="min-h-screen flex">

      
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

      
      <div className="flex-1 ml-64 p-10 bg-gray-50 h-screen overflow-y-auto">

        <h1 className="text-3xl font-bold text-purple-900 mb-8">
          My Try-Ons
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : history.length === 0 ? (
          <p>No try-ons found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {history.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
              >
                
                <img
                  src={item.output_image}
                  alt="Try-On"
                  className="w-full h-64 object-cover rounded-lg border border-gray-200 shadow-sm"
                  onError={(e) => {
                    console.log("Image failed:", item.output_image); 
                    e.target.src =
                      "https://via.placeholder.com/300x250?text=Image+Not+Found";
                  }}
                />

                <p className="text-sm text-gray-500 mt-2">
                  {item.created_at}
                </p>

                <button
                  onClick={() => handleDownload(item.output_image)}
                  className="mt-3 w-full bg-purple-900 text-white py-2 rounded-lg hover:bg-purple-800 transition"
                >
                  View 
                </button>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}