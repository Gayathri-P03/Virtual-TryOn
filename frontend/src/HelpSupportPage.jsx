import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HelpSupportPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

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
      case "My Try-ons":
        navigate("/dashboard");
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Support request submitted!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex">

      {/* SIDEBAR */}
      <div className="sidebar w-64 p-6 flex flex-col space-y-6 text-purple-900 bg-white shadow-md">
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

      {/* FULL CONTENT */}
      <div className="flex-1 p-10 bg-gray-50 overflow-y-auto">

        <h1 className="text-3xl font-bold text-purple-900 mb-8">
          Help & Support
        </h1>

        {/* 🔥 CHANGED: stacked layout */}
        <div className="flex flex-col gap-8">

          {/* FAQ */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-purple-900">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <div>
                <p className="font-medium">How to generate try-on?</p>
                <p className="text-gray-600 text-sm">
                  Upload your image and dress image, then click "Generate Try-On".
                </p>
              </div>

              <div>
                <p className="font-medium">Why is it not working?</p>
                <p className="text-gray-600 text-sm">
                  It may be due to API limits or network issues.
                </p>
              </div>

              <div>
                <p className="font-medium">Where are my results saved?</p>
                <p className="text-gray-600 text-sm">
                  You can view them in "My Try-ons".
                </p>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-purple-900">
              Contact Support
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />

              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                rows="4"
                required
              ></textarea>

              <button
                type="submit"
                className="bg-purple-900 text-white px-4 py-2 rounded-xl"
              >
                Submit
              </button>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}