import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoArrowBack } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import "./prdkkantin.css";

// Import gambar
import kantinHeader from "./assets/kantin.jpg";
import gorengKentang from "./assets/ayam.jpg";
import milkshake from "./assets/donat.jpg";
import ayamGeprek from "./assets/martabak.jpg";
import ayamKrispi from "./assets/oreo.jpg";
import menuIcon from "./assets/menu.png";
import searchIcon from "./assets/search.png";
import logo from "./assets/4 - Copy.png";

const products = [
  {
    id: 1,
    name: "Burger Burgar",
    description: "Steak Burger with Homemade Sauce, Freshly Fresh Veggies",
    price: 30000,
    image: gorengKentang
  },
  {
    id: 2,
    name: "French Fries",
    description: "Golden Fries With Homemade Dip And Fresh Toppings",
    price: 25000,
    image: milkshake
  },
  {
    id: 3,
    name: "Hot Dog",
    description: "Steamed Hot Dog with Homemade Sauce and Premium Toppings",
    price: 30000,
    image: ayamGeprek
  },
  {
    id: 4,
    name: "MilkShake",
    description: "Freshly Blended with Premium Flavors",
    price: 20000,
    image: ayamKrispi
  }
];

// Tambahkan interface
interface ProfileCardProps {
  onClose: () => void;
}

interface HistoryCardProps {
  onClose: () => void;
}

const PrdkKantinPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const toggleProfilePopup = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleHistoryPopup = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  return (
    <div className="prdkantin-page">
      <div className="prdkantin-topbar">
        <div className="prdkantin-left">
          <IoArrowBack className="prdkantin-back" onClick={() => navigate("/kantin")} />
          <img src={logo} alt="Logo" className="prdkantin-logo" />
        </div>
        <div className="prdkantin-search-container">
          <img src={menuIcon} alt="Menu Icon" className="prdkantin-menu-icon" />
          <input
            type="text"
            placeholder="Jajan apa hari ini?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="prdkantin-search"
          />
          <img src={searchIcon} alt="Search Icon" className="prdkantin-search-icon" />
        </div>
      </div>

      <div className="prdkantin-header">
        <img src={kantinHeader} alt="Kantin Op4t" className="prdkantin-profile" />
        <h1 className="prdkantin-name">Kantin Op4t</h1>
      </div>

      <div className="prdkantin-preview">
        <div className="prdkantin-grid">
          <img src={gorengKentang} alt="Menu 1" />
          <img src={milkshake} alt="Menu 2" />
          <img src={ayamGeprek} alt="Menu 3" />
          <img src={ayamKrispi} alt="Menu 4" />
        </div>
      </div>

      <div className="prdkantin-list">
        {products.map((product) => (
          <div key={product.id} className="prdkantin-item">
            <div className="prdkantin-content">
              <img src={product.image} alt={product.name} className="prdkantin-img" />
              <div className="prdkantin-info">
                <h3 className="prdkantin-title">{product.name}</h3>
                <p className="prdkantin-desc">{product.description}</p>
                <span className="prdkantin-price">Rp. {product.price.toLocaleString()}</span>
              </div>
            </div>
            <IoAdd className="prdkantin-add-btn" onClick={() => {
              console.log(`Add ${product.name} to cart`);
            }} />
          </div>
        ))}
      </div>

      <div className="new-card">
        <h3>
          <IoHome 
            onClick={() => navigate("/homepage")} 
            style={{ 
              cursor: "pointer",
              color: location.pathname === "/homepage" ? "#FFD700" : "white" 
            }} 
          />
          <FiMessageSquare 
            onClick={() => navigate("/msgpage")} 
            style={{ 
              cursor: "pointer",
              color: location.pathname === "/msgpage" ? "#FFD700" : "white" 
            }} 
          />
          <IoCartOutline 
            onClick={() => navigate("/cart")}
            style={{ 
              cursor: "pointer",
              color: location.pathname === "/cart" ? "#FFD700" : "white" 
            }} 
          />
          <MdHistory 
            onClick={toggleHistoryPopup}
            style={{ 
              cursor: "pointer",
              color: location.pathname === "/history" ? "#FFD700" : "white" 
            }} 
          />
          <CgProfile 
            onClick={toggleProfilePopup}
            style={{ 
              cursor: "pointer",
              color: location.pathname === "/profile" ? "#FFD700" : "white" 
            }} 
          />
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

// Tambahkan komponen ProfileCard
const ProfileCard = ({ onClose }: ProfileCardProps) => {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-pic">
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

// Tambahkan komponen HistoryCard
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
            <img src={gorengKentang} alt="Kantin" />
          </div>
          <div className="history-details">
            <div className="history-title">Kantin Op4t - Burger Burgar</div>
            <div className="history-date">17 Januari 2025, 10:05</div>
          </div>
          <div className="history-amount">1 x Rp. 30.000</div>
        </div>

        <div className="history-item">
          <div className="history-item-icon">
            <img src={ayamKrispi} alt="Koperasi" />
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

export default PrdkKantinPage;
