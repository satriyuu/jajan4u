import React, { useState, useEffect } from "react";
import { IoHome } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Loading from "./loadingpage";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "./homepage.css";
import logo from "./assets/4 - Copy.png";
import menuIcon from "./assets/menu.png";
import searchIcon from "./assets/search.png";
import avatar1 from "./assets/ayam.jpg";
import avatar2 from "./assets/donat.jpg";
import avatar3 from "./assets/martabak.jpg";
import avatar4 from "./assets/oreo.jpg";
import avatar5 from "./assets/risol.jpg";
import koperasi from "./assets/koperasi.jpeg";
import kantin from "./assets/kantin.jpg";
import hydro from "./assets/galon.jpeg";

interface ProfileCardProps {
  onClose: () => void;
}

interface HistoryCardProps {
  onClose: () => void;
}

const Homepage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      alert(`Searching for: ${searchQuery}`);
    }
  };

  const toggleProfilePopup = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleHistoryPopup = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  const navigateToMsgPage = () => {
    navigate("/msgpage");  
  };

  const navigateToKantin = () => {
    navigate("/kantin");  // Pastikan path sesuai dengan route
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="homepage">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="SuperMarket Logo" className="logo-image" />
        </div>
        <nav className="navbar">
          <form className="search-form">
            <img src={menuIcon} alt="Menu Icon" className="menu-icon" />
            <input
              type="text"
              placeholder="Jajan apa hari ini?"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              className="search-input"
            />
            <img src={searchIcon} alt="Search Icon" className="search-icon" />
          </form>
        </nav>
      </header>

      <div className="saldo-card">
        <div className="led-text">Selamat Datang di Jajan4U!</div>
      </div>

      <div className="avatar-container">
        <div className="avatar">
          <img src={avatar1} alt="Avatar 1" />
          <div className="avatar-hover-text">Burger</div>
        </div>
        <div className="avatar">
          <img src={avatar2} alt="Avatar 2" />
          <div className="avatar-hover-text">Pizza</div>
        </div>
        <div className="avatar">
          <img src={avatar3} alt="Avatar 3" />
          <div className="avatar-hover-text">Sushi</div>
        </div>
        <div className="avatar">
          <img src={avatar4} alt="Avatar 4" />
          <div className="avatar-hover-text">Pasta</div>
        </div>
        <div className="avatar">
          <img src={avatar5} alt="Avatar 5" />
          <div className="avatar-hover-text">Salad</div>
        </div>
      </div>

      <div className="additional-cards">
        <div className="card">
          <img src={koperasi} alt="Koperasi" className="card-image" />
          <h3>Koperasi</h3>
          <p>ATK, makanan, minuman, dll.</p>
        </div>
        <div className="card" onClick={navigateToKantin} style={{ cursor: 'pointer' }}>
          <img src={kantin} alt="Kantin" className="card-image" />
          <h3>Kantin</h3>
          <p>Makanan, minuman, dll.</p>
        </div>
        <div className="card">
          <img src={hydro} alt="Camilan" className="card-image" />
          <h3>Hydro4</h3>
          <p>Isi ulang galon</p>
        </div>
      </div>

      <div className="new-card">
        <h3>
          <IoHome />
          <FiMessageSquare onClick={navigateToMsgPage} style={{ cursor: "pointer" }} /> {/* Add onClick */}
          <IoCartOutline />
          <MdHistory onClick={toggleHistoryPopup} style={{ cursor: "pointer" }} />
          <CgProfile onClick={toggleProfilePopup} style={{ cursor: "pointer" }} />
        </h3>
      </div>

      {isProfileOpen && (
        <ProfileCard onClose={toggleProfilePopup} />
      )}

      {isHistoryOpen && (
        <HistoryCard onClose={toggleHistoryPopup} />
      )}
    </div>
  );
};

const ProfileCard = ({ onClose }: ProfileCardProps) => {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-pic">
          {/* Icon user */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <span>Profile</span>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="profile-content">
        <div className="profile-item">
          <span className="profile-label">Nama lengkap</span>
          <span className="profile-value">Raka Pratama Domingoz</span>
        </div>

        <div className="profile-item">
          <span className="profile-label">Nomor ponsel</span>
          <span className="profile-value">(+62) 12345678</span>
        </div>

        <div className="profile-item">
          <span className="profile-label">NIS</span>
          <span className="profile-value">2223119599</span>
        </div>

        <div className="profile-item">
          <span className="profile-label">Alamat email</span>
          <span className="profile-value">rakaprtmd@example.com</span>
        </div>

        <div className="profile-item">
          <span className="profile-label">Jenis kelamin</span>
          <span className="profile-value">Laki-laki</span>
        </div>

        <button className="sign-out-btn">Sign Out</button>
      </div>
    </div>
  );
};

const HistoryCard = ({ onClose }: HistoryCardProps) => {
  return (
    <div className="history-card">
      <div className="history-header">
        <div className="history-icon">
          <MdHistory />
        </div>
        <span>Aktifitas</span>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="history-content">
        <div className="history-item">
          <div className="history-item-icon">
            <img src={avatar1} alt="Kantin" />
          </div>
          <div className="history-details">
            <div className="history-title">Kantin Op4t - Burger Burgar</div>
            <div className="history-date">17 Januari 2025, 10:05</div>
          </div>
          <div className="history-amount">1 x Rp. 30.000</div>
        </div>

        <div className="history-item">
          <div className="history-item-icon">
            <img src={avatar5} alt="Koperasi" />
          </div>
          <div className="history-details">
            <div className="history-title">Koperasi Op4t - Risoles Mamayo</div>
            <div className="history-date">17 Januari 2025, 10:25</div>
          </div>
          <div className="history-amount">1 x Rp. 5.000</div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
