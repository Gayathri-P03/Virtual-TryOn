import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: "Anu",
    email: "anu@gmail.com",
    age:"29",
    size:"S",
    phone: "9876543210",
    gender: "Female",
    dob: "2003-01-01",
    address: "Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

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
      case "Logout":
        navigate("/");
        break;
      default:
        navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex">
      
      
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

      
      <div className="flex-1 p-10 bg-gray-50">

        <h1 className="text-3xl font-bold text-purple-900 mb-8">
          My Profile
        </h1>

        <div className="w-full bg-white p-8 rounded-2xl shadow-lg">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            
            <div>
              <label className="text-gray-600 font-medium">Name</label>
              {isEditing ? (
                <input name="name" value={user.name} onChange={handleChange} className="w-full mt-2 p-2 border rounded-lg" />
              ) : (
                <p className="mt-2 text-lg">{user.name}</p>
              )}
            </div>

            
            <div>
              <label className="text-gray-600 font-medium">Email</label>
              {isEditing ? (
                <input name="email" value={user.email} onChange={handleChange} className="w-full mt-2 p-2 border rounded-lg" />
              ) : (
                <p className="mt-2 text-lg">{user.email}</p>
              )}
            </div>

            
            <div>
              <label className="text-gray-600 font-medium">Age</label>
              {isEditing ? (
                <input name="age" value={user.age} onChange={handleChange} className="w-full mt-2 p-2 border rounded-lg" />
              ) : (
                <p className="mt-2 text-lg">{user.age}</p>
              )}
            </div>

            
            <div>
             <label className="text-gray-600 font-medium">Size</label>

                {isEditing ? (
                    <select
                    name="size"
                    value={user.size}
                    onChange={handleChange}
                    className="w-full mt-2 p-2 border rounded-lg"
                    >
                    <option value="">Select Size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="XXXL">XXXL</option>
                    </select>
                    ) : (
                        <p className="mt-2 text-lg">{user.size}</p>
                    )}
            </div>

            
            <div>
              <label className="text-gray-600 font-medium">Phone</label>
              {isEditing ? (
                <input name="phone" value={user.phone} onChange={handleChange} className="w-full mt-2 p-2 border rounded-lg" />
              ) : (
                <p className="mt-2 text-lg">{user.phone}</p>
              )}
            </div>

            
            <div>
              <label className="text-gray-600 font-medium">Gender</label>
              {isEditing ? (
                <select name="gender" value={user.gender} onChange={handleChange} className="w-full mt-2 p-2 border rounded-lg">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              ) : (
                <p className="mt-2 text-lg">{user.gender}</p>
              )}
            </div>

            
            <div>
              <label className="text-gray-600 font-medium">Date of Birth</label>
              {isEditing ? (
                <input type="date" name="dob" value={user.dob} onChange={handleChange} className="w-full mt-2 p-2 border rounded-lg" />
              ) : (
                <p className="mt-2 text-lg">{user.dob}</p>
              )}
            </div>

            
            <div>
              <label className="text-gray-600 font-medium">Address</label>
              {isEditing ? (
                <input name="address" value={user.address} onChange={handleChange} className="w-full mt-2 p-2 border rounded-lg" />
              ) : (
                <p className="mt-2 text-lg">{user.address}</p>
              )}
            </div>

            
            <div>
              <label className="text-gray-600 font-medium">City</label>
              {isEditing ? (
                <input name="city" value={user.city} onChange={handleChange} className="w-full mt-2 p-2 border rounded-lg" />
              ) : (
                <p className="mt-2 text-lg">{user.city}</p>
              )}
            </div>

            
            <div>
              <label className="text-gray-600 font-medium">State</label>
              {isEditing ? (
                <input name="state" value={user.state} onChange={handleChange} className="w-full mt-2 p-2 border rounded-lg" />
              ) : (
                <p className="mt-2 text-lg">{user.state}</p>
              )}
            </div>

          </div>

          
          <button
            onClick={handleEditToggle}
            className="mt-8 bg-purple-900 text-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>

        </div>

      </div>
    </div>
  );
}