import React from "react";
import { useNavigate } from "react-router-dom";
import topImage from "./assets/top_image.webp"; // make sure this image exists

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-purple-400">
      
      <nav className="flex justify-between items-center px-10 py-6 backdrop-blur-md bg-white/30 rounded-b-2xl shadow-md sticky top-0 z-50">
        <div className="text-2xl font-bold text-purple-900">AI</div>

        <div className="hidden md:flex space-x-8 text-purple-900 font-medium">
          <a href="#" className="hover:text-purple-700 transition">
            Try On AI
          </a>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gradient-to-r from-purple-300 to-purple-400 text-purple-900 px-6 py-2 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition duration-300"
        >
          Free Trial
        </button>
      </nav>

      
      <div className="text-center mt-20 px-6 md:px-20">
        <h1 className="text-5xl md:text-6xl font-bold text-purple-900 leading-relaxed tracking-tight drop-shadow-lg">
          <span className="block">Create Fashion Image with</span>
          <span className="block mt-4 text-purple-800">Virtual Try On AI</span>
        </h1>

        <p className="mt-6 text-purple-800 max-w-2xl mx-auto text-lg">
          Experience Virtual Try On AI – the revolutionary fashion tool
          that lets you try outfits virtually in seconds.
        </p>

        
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gradient-to-r from-purple-300 to-purple-400 text-purple-900 px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition duration-300"
          >
            Clothes Try On →
          </button>
        </div>
      </div>

      
      <div className="mt-24 mx-6 md:mx-20 bg-white/50 backdrop-blur-md rounded-3xl shadow-xl p-10 hover:scale-105 transition transform duration-500">
        <div className="flex justify-center">
          <img
            src={topImage}
            alt="model"
            className="w-[1200px] h-[400px] object-cover rounded-3xl shadow-lg hover:shadow-2xl transition duration-300"
          />
        </div>
      </div>
    </div>
  );
}