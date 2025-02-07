import React, { useState, useEffect } from "react";
import { IoHome } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegSquarePlus } from "react-icons/fa6";
import { BsQrCodeScan } from "react-icons/bs";
import { IoArrowDownCircleOutline, IoArrowUpCircleOutline } from "react-icons/io5";
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
import profile from "./assets/user.png";
import hydro from "./assets/galon.jpeg";

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
    navigate("/msgpage");  // Navigate to MsgPage when clicked
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
        <div className="saldo-title">Total Saldo</div>
        <div className="saldo-content">
          <div className="saldo-amount">Rp.999.999</div>
          <div className="saldo-icons">
            <div className="icon-item">
              <BsQrCodeScan />
              <span className="icon-label">QR</span>
            </div>
            <div className="icon-item">
              <FaRegSquarePlus />
              <span className="icon-label">Top Up</span>
            </div>
            <div className="icon-item">
              <IoArrowDownCircleOutline />
              <span className="icon-label">Tarik Tunai</span>
            </div>
            <div className="icon-item">
              <IoArrowUpCircleOutline />
              <span className="icon-label">Transfer</span>
            </div>
          </div>
        </div>
      </div>

      <div className="avatar-container">
        <div className="avatar"><img src={avatar1} alt="Avatar 1" /></div>
        <div className="avatar"><img src={avatar2} alt="Avatar 2" /></div>
        <div className="avatar"><img src={avatar3} alt="Avatar 3" /></div>
        <div className="avatar"><img src={avatar4} alt="Avatar 4" /></div>
        <div className="avatar"><img src={avatar5} alt="Avatar 5" /></div>
      </div>

      <div className="additional-cards">
        <div className="card">
          <img src={koperasi} alt="Koperasi" className="card-image" />
          <h3>Koperasi</h3>
          <p>ATK, makanan, minuman, dll.</p>
        </div>
        <div className="card">
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
        <div className="profile-card">
          <div className="card-content">
            <span className="close-btn" onClick={toggleProfilePopup}>&times;</span>
            <img src={profile} alt="Profile" className="profile-pic" />
            <h3 className="profile-name">Raka Pratama</h3>
            <p className="profile-info">(+62)1234567890</p>
            <p className="profile-info">2223119123</p>
          </div>
        </div>
      )}

      {isHistoryOpen && (
        <div className="history-card">
          <div className="card-content">
            <span className="close-btn" onClick={toggleHistoryPopup}>&times;</span>
            <h3>Aktifitas</h3>
            <ul>
              <li>Pembelian #1 - Rp. 20.000</li>
              <li>Pembelian #2 - Rp. 50.000</li>
              <li>Isi Saldo - Rp. 100.000</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
