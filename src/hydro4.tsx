import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoArrowBack } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import "./hydro4.css";

// Import gambar
import logo from "./assets/4 - Copy.png";
import menuIcon from "./assets/menu.png";
import searchIcon from "./assets/search.png";
import galon from "./assets/galon.jpeg";

// Import Loading component
import Loading from "./loadingpage";

interface HydroService {
  id: number;
  name: string;
  description: string;
  image: string;
}

const HydroPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const hydroServices: HydroService[] = [
    {
      id: 1,
      name: "Isi Ulang",
      description: "Pengisian Air Ulang Galon Langsung dari Sumber Air Gunung Manglayang",
      image: galon
    },
    {
      id: 2,
      name: "Bersihkan Galon",
      description: "Pembersihan Galon Secara Menyeluruh dan Mendetail",
      image: galon
    }
  ];

  const toggleProfilePopup = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleHistoryPopup = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  // Tambahkan useEffect untuk loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Tambahkan kondisi loading di awal return
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="hydro-page">
      <div className="hydro-topbar">
        <div className="hydro-left">
          <IoArrowBack className="hydro-back" onClick={() => navigate("/homepage")} />
          <img src={logo} alt="Logo" className="hydro-logo" />
        </div>
        <div className="hydro-search-container">
          <img src={menuIcon} alt="Menu Icon" className="hydro-menu-icon" />
          <input
            type="text"
            placeholder="Cari layanan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="hydro-search"
          />
          <img src={searchIcon} alt="Search Icon" className="hydro-search-icon" />
        </div>
      </div>

      <div className="hydro-header">
        <img src={galon} alt="Hydro4" className="hydro-banner" />
      </div>

      <div className="hydro-title-card">
        <div className="hydro-title-content">
          <img src={galon} alt="Hydro4 Icon" className="hydro-icon" />
          <h1>Hydro4</h1>
        </div>
      </div>

      <div className="hydro-services">
        {hydroServices.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-content">
              <img src={service.image} alt={service.name} className="service-image" />
              <div className="service-info">
                <h2 className="service-title">{service.name}</h2>
                <p className="service-description">{service.description}</p>
              </div>
            </div>
            <IoAdd className="service-add-btn" />
          </div>
        ))}
      </div>

      <div className="hydro-card">
        <h3>
          <IoHome 
            onClick={() => navigate("/homepage")} 
            style={{ cursor: "pointer" }} 
          />
          <FiMessageSquare 
            onClick={() => navigate("/msgpage")} 
            style={{ cursor: "pointer" }} 
          />
          <IoCartOutline 
            onClick={() => navigate("/keranjang")}
            style={{ cursor: "pointer" }} 
          />
          <MdHistory 
            onClick={toggleHistoryPopup}
            style={{ cursor: "pointer" }} 
          />
          <CgProfile 
            onClick={toggleProfilePopup}
            style={{ cursor: "pointer" }} 
          />
        </h3>
      </div>
    </div>
  );
};

export default HydroPage;
