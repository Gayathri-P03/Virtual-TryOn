import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import DashboardPage from "./DashboardPage.jsx";
import UploadPage from "./UploadPage.jsx";
import TryOnsPage from "./TryOnsPage.jsx";
import HelpSupportPage from "./HelpSupportPage.jsx"; // <-- new import
import ProfilePage from "./ProfilePage";
import MyTryOnsPage from "./MyTryOnsPage";
import DownloadsPage from "./DownloadsPage";
import CompareOutfitsPage from "./CompareOutfitsPage";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/tryons" element={<TryOnsPage history={JSON.parse(localStorage.getItem("tryonHistory")) || []} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/help-support" element={<HelpSupportPage />} />  {/* <-- new route */}
        <Route path="/my-tryons" element={<MyTryOnsPage />} />
        <Route path="/downloads" element={<DownloadsPage />} />
        <Route path="/compare-outfits" element={<CompareOutfitsPage />} />
        
      </Routes>
    </Router>
  </StrictMode>
);